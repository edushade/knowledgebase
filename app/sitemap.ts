import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { KB_ORIGIN } from '@/lib/site';

/**
 * There was no sitemap here at all.
 *
 * Google spends most of its crawl budget for the edushade.com domain property
 * on this host — 18,129 requests against 4,813 for the marketing site over
 * ninety days — and 99% of that is re-crawling pages it already knows, with
 * only 1% spent discovering anything new. A sitemap is how a 113-page docs
 * site tells Google what exists instead of making it find out by following
 * links.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages();

  return [
    {
      url: KB_ORIGIN,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...pages.map((page) => ({
      url: `${KB_ORIGIN}${page.url}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
