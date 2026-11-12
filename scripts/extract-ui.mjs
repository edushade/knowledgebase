#!/usr/bin/env node
/**
 * Pull the user-visible strings out of a slice of the admin frontend.
 *
 * The knowledge base has to name buttons, fields and options exactly as the
 * screen does. Reading each component by hand does not scale across ~190 pages,
 * so this walks a directory and reports only the strings a person can actually
 * see: field labels, placeholders, card and dialog titles, select options,
 * tab names, button text and the sentences shown under a field.
 *
 * Usage: node extract-ui.mjs <dir> [<dir> ...]
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOTS = process.argv.slice(2);
if (ROOTS.length === 0) {
  console.error('usage: extract-ui.mjs <dir> [<dir> ...]');
  process.exit(1);
}

const SKIP_DIR = /node_modules|\.next|__tests__|\.git/;
const FILE_OK = /\.(tsx|ts)$/;
const IS_TEST = /\.(test|spec)\.(tsx|ts)$/;

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const p = join(dir, name);
    let st;
    try {
      st = statSync(p);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      if (!SKIP_DIR.test(p)) walk(p, out);
    } else if (FILE_OK.test(p) && !IS_TEST.test(p)) {
      out.push(p);
    }
  }
  return out;
}

// Each pattern captures one user-visible string in group 1 (or 2).
const PATTERNS = [
  ['label', /\blabel=\{?['"]([^'"]{2,90})['"]/g],
  ['label', /<FormLabel[^>]*>\s*([A-Z][^<{>]{2,80}?)\s*</g],
  ['placeholder', /\bplaceholder=\{?['"]([^'"]{2,90})['"]/g],
  ['title', /\b(?:title|heading)=\{?['"]([^'"]{2,90})['"]/g],
  ['title', /<(?:CardTitle|DialogTitle|SheetTitle|AlertDialogTitle)[^>]*>\s*([A-Z][^<{>]{2,80}?)\s*</g],
  ['description', /\bdescription=\{?['"]([^'"]{4,140})['"]/g],
  ['description', /<(?:CardDescription|DialogDescription|FormDescription|AlertDialogDescription)[^>]*>\s*([A-Z][^<{>]{4,140}?)\s*</g],
  ['option', /<SelectItem[^>]*value=\{?['"][^'"]*['"][^>]*>\s*([^<{>]{2,70}?)\s*</g],
  ['option', /\{\s*(?:label|name)\s*:\s*['"]([^'"]{2,70})['"]\s*,\s*value\s*:/g],
  ['option', /\bvalue\s*:\s*['"][^'"]+['"]\s*,\s*(?:label|name)\s*:\s*['"]([^'"]{2,70})['"]/g],
  ['tab', /<TabsTrigger[^>]*>\s*([A-Z][^<{>]{2,50}?)\s*</g],
  ['button', /<Button[^>]*>\s*([A-Z][^<{>]{2,50}?)\s*</g],
  ['toast', /toast\.(?:success|error|info|warning)\(\s*['"]([^'"]{4,140})['"]/g],
  ['empty', /\b(?:emptyMessage|emptyText|noResultsText|emptyTitle)=\{?['"]([^'"]{4,140})['"]/g],
];

const NOISE =
  /^(true|false|null|undefined|className|default|sm|md|lg|xl|outline|ghost|icon|primary|secondary|destructive|submit|button|text|number|email|password|date|time|search|hidden|none|auto|div|span|flex|grid|w-|h-|p-|m-|text-|bg-)/i;

const byKind = new Map();
const files = ROOTS.flatMap((r) => walk(r));

for (const file of files) {
  let src;
  try {
    src = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  // Drop JSX comment blocks so commented-out UI is not reported as shipping.
  src = src.replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '');
  for (const [kind, re] of PATTERNS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(src)) !== null) {
      const v = (m[1] || '').trim();
      if (!v || NOISE.test(v) || !/[a-z]/.test(v)) continue;
      if (/^[a-z_]+$/.test(v) && v.length < 6) continue;
      if (!byKind.has(kind)) byKind.set(kind, new Map());
      const bucket = byKind.get(kind);
      if (!bucket.has(v)) bucket.set(v, new Set());
      bucket.get(v).add(relative(process.cwd(), file));
    }
  }
}

console.log(`# files scanned: ${files.length}\n`);
for (const kind of ['title', 'tab', 'label', 'option', 'placeholder', 'description', 'button', 'toast', 'empty']) {
  const bucket = byKind.get(kind);
  if (!bucket) continue;
  console.log(`\n## ${kind.toUpperCase()} (${bucket.size})`);
  for (const [v] of [...bucket.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    console.log(`- ${v}`);
  }
}
