#!/usr/bin/env python3
"""
Turn a raw browser capture into a knowledge-base screenshot.

Two things happen on the way in. The signed-in person's name and address sit in
the bottom-left of every admin screen, and these pages are published, so that
block is painted over with a generic one. And the capture arrives as JPEG,
which rings around small UI text, so it is re-saved as PNG.

A third thing happens on request. Admin lists show real learners' names and
addresses, and a published screenshot must not carry them, so `--blur` pixelates
a rectangle — legible as a column of names, unreadable as anybody's name.

Usage: shot.py <source.jpg> <section> <name> [--no-mask] [--crop=L,T,R,B]
                [--blur=L,T,R,B ...]
Writes knowledgebase/public/kb/<section>/<name>.png
"""
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

KB = Path("/home/tanjir/WorkStation/softimist/edushade/knowledgebase/public/kb")

# Where the account block sits in a 1568x760 admin capture, and what replaces it.
MASK_BOX = (14, 686, 238, 760)
AVATAR_BOX = (1498, 12, 1532, 44)
FAKE_NAME = "Academy Admin"
FAKE_MAIL = "admin@northlight.edu"

FONT_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]


def _font(size: int, bold: bool = False):
    path = FONT_PATHS[1] if bold and len(FONT_PATHS) > 1 else FONT_PATHS[0]
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default()


def mask_account(img: Image.Image) -> Image.Image:
    w, h = img.size
    if w < 400 or h < 400:
        return img
    # Scale the box if the capture is not the usual width.
    sx, sy = w / 1568, h / 760
    box = tuple(
        int(v * (sx if i % 2 == 0 else sy)) for i, v in enumerate(MASK_BOX)
    )
    if box[3] > h or box[2] > w:
        return img

    # Sample the sidebar's own background just above the block so the patch
    # disappears into it in both light and dark themes.
    bg = img.getpixel((box[0] + 6, max(0, box[1] - 14)))
    draw = ImageDraw.Draw(img)
    draw.rectangle(box, fill=bg)

    # A small avatar circle and two lines of text, roughly where they were.
    ax, ay = box[0] + 8, box[1] + 12
    r = int(16 * sy)
    ink = (120, 130, 145) if sum(bg[:3]) > 380 else (150, 160, 175)
    strong = (40, 44, 52) if sum(bg[:3]) > 380 else (235, 238, 244)
    draw.ellipse((ax, ay, ax + r * 2, ay + r * 2), fill=ink)
    tx = ax + r * 2 + int(10 * sx)
    draw.text((tx, ay + int(1 * sy)), FAKE_NAME, font=_font(int(12 * sy), True), fill=strong)
    draw.text((tx, ay + int(16 * sy)), FAKE_MAIL, font=_font(int(11 * sy)), fill=ink)

    # The same person's photo sits in the top-right corner of every screen.
    abox = tuple(int(v * (sx if i % 2 == 0 else sy)) for i, v in enumerate(AVATAR_BOX))
    if abox[2] <= w and abox[3] <= h:
        topbg = img.getpixel((max(0, abox[0] - 24), abox[1] + 4))
        draw.rectangle(abox, fill=topbg)
        draw.ellipse(abox, fill=ink)
    return img


def blur_region(img: Image.Image, box: tuple[int, int, int, int]) -> Image.Image:
    """Pixelate a rectangle, so a column of personal data reads as data and not as names."""
    left, top, right, bottom = box
    left, top = max(0, left), max(0, top)
    right, bottom = min(img.size[0], right), min(img.size[1], bottom)
    if right <= left or bottom <= top:
        return img
    region = img.crop((left, top, right, bottom))
    small = region.resize(
        (max(1, region.width // 14), max(1, region.height // 14)), Image.BILINEAR
    )
    img.paste(small.resize(region.size, Image.NEAREST), (left, top))
    return img


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = {a for a in sys.argv[1:] if a.startswith("--")}
    crop = next((a for a in sys.argv[1:] if a.startswith("--crop=")), None)

    if len(args) < 3:
        print(__doc__)
        return 1
    src, section, name = args[0], args[1], args[2]

    img = Image.open(src).convert("RGB")
    if crop:
        left, top, right, bottom = (int(v) for v in crop.split("=", 1)[1].split(","))
        img = img.crop((left, top, right, bottom))
    elif "--no-mask" not in flags:
        img = mask_account(img)

    for flag in sys.argv[1:]:
        if flag.startswith("--blur="):
            img = blur_region(
                img, tuple(int(v) for v in flag.split("=", 1)[1].split(","))
            )

    out_dir = KB / section
    out_dir.mkdir(parents=True, exist_ok=True)
    out = out_dir / f"{name}.png"
    img.save(out, "PNG", optimize=True)
    print(f"{out}  {img.size[0]}x{img.size[1]}  {out.stat().st_size // 1024}KB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
