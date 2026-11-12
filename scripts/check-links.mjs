#!/usr/bin/env node
/**
 * Every internal link in the docs must land on a page that exists.
 *
 * Fumadocs renders a link to a missing page happily; the reader finds out by
 * clicking it. This walks `content/docs`, collects every page that exists, and
 * reports any `/docs/knowledgebase/...` link that points at none of them.
 *
 * It also reports screenshots referenced from `/kb/...` with no file behind
 * them, and pages listed in a `meta.json` that are not on disk.
 *
 * Usage: node scripts/check-links.mjs
 * Exits non-zero when anything is broken, so it can gate a build.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = join(ROOT, 'content/docs');
const PUBLIC = join(ROOT, 'public');
const BASE = '/docs/knowledgebase';

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = walk(DOCS);
const mdx = files.filter((f) => f.endsWith('.mdx'));

/** Every URL the docs will serve. */
const pages = new Set(
  mdx.map((f) => {
    const rel = relative(DOCS, f).replace(/\.mdx$/, '');
    const url = rel === 'index' ? BASE : `${BASE}/${rel}`;
    return url.replace(/\/index$/, '');
  }),
);

const problems = [];

// 1. Internal doc links.
const LINK = /\]\((\/docs\/knowledgebase[^)\s#]*)(#[^)\s]*)?\)/g;
const HREF = /href="(\/docs\/knowledgebase[^"#]*)(#[^"]*)?"/g;
// 2. Screenshots.
const IMG = /(?:src=")(\/kb\/[^"]+)"/g;

for (const f of mdx) {
  const src = readFileSync(f, 'utf8');
  const where = relative(ROOT, f);
  for (const re of [LINK, HREF]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(src)) !== null) {
      const target = m[1].replace(/\/$/, '');
      if (!pages.has(target)) problems.push(`${where}: link to missing page ${target}`);
    }
  }
  IMG.lastIndex = 0;
  let im;
  while ((im = IMG.exec(src)) !== null) {
    if (!existsSync(join(PUBLIC, im[1]))) {
      problems.push(`${where}: screenshot not on disk ${im[1]}`);
    }
  }
}

// 3. meta.json entries that name a page that is not there.
for (const f of files.filter((x) => x.endsWith('meta.json'))) {
  const dir = dirname(f);
  let meta;
  try {
    meta = JSON.parse(readFileSync(f, 'utf8'));
  } catch {
    problems.push(`${relative(ROOT, f)}: not valid JSON`);
    continue;
  }
  for (const entry of meta.pages ?? []) {
    if (typeof entry !== 'string' || entry.startsWith('---')) continue;
    const asPage = join(dir, `${entry}.mdx`);
    const asFolder = join(dir, entry, 'index.mdx');
    if (!existsSync(asPage) && !existsSync(asFolder)) {
      problems.push(`${relative(ROOT, f)}: lists "${entry}", which does not exist`);
    }
  }
  // And pages on disk that no meta.json mentions — they fall to the bottom of
  // the sidebar in whatever order the filesystem gives, which is never right.
  const listed = new Set((meta.pages ?? []).filter((p) => typeof p === 'string'));
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.mdx')) continue;
    const slug = name.replace(/\.mdx$/, '');
    if (!listed.has(slug)) {
      problems.push(`${relative(ROOT, f)}: does not list "${slug}"`);
    }
  }
}

if (problems.length === 0) {
  console.log(`OK — ${pages.size} pages, every link and screenshot resolves.`);
  process.exit(0);
}

console.error(`${problems.length} problem(s):\n`);
for (const p of problems.sort()) console.error('  ' + p);
process.exit(1);
