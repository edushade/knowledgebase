import { ImageZoom } from 'fumadocs-ui/components/image-zoom';

/**
 * A screenshot of the real product, with a caption underneath.
 *
 * Every screenshot in this knowledge base is a picture of the actual screen the
 * reader is being asked to open, so the caption says what they are looking at
 * rather than repeating the sentence above it. Click to enlarge — the pictures
 * are wide and the detail matters.
 *
 * `src` is a path under `/public`, e.g. `/kb/courses/new-course.png`.
 */
export function Screenshot({
  src,
  alt,
  caption,
  frame = true,
}: {
  src: string;
  alt: string;
  caption?: string;
  /** Set to false for an image that already carries its own border, e.g. a badge. */
  frame?: boolean;
}) {
  return (
    <figure className="my-6 not-prose">
      <ImageZoom src={src} alt={alt} zoomInProps={{ src, alt }}>
        {/* biome-ignore lint/performance/noImgElement: static docs asset, no layout shift budget to spend */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={
            frame
              ? 'w-full cursor-zoom-in rounded-xl border border-fd-border bg-fd-card shadow-sm'
              : 'w-full cursor-zoom-in rounded-xl'
          }
        />
      </ImageZoom>
      {caption ? (
        <figcaption className="mt-2.5 text-center text-[13px] leading-relaxed text-fd-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
