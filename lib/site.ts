/**
 * Where this knowledge base and the main site live.
 *
 * Both are needed in several places — the sitemap, robots.txt, canonical URLs
 * and the link back to the marketing site — so they are declared once here
 * rather than spelled out at each call site.
 */

export const KB_ORIGIN =
  process.env.NEXT_PUBLIC_KB_ORIGIN ?? 'https://knowledgebase.edushade.com';

export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://www.edushade.com';
