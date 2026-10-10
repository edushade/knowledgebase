import type { MetadataRoute } from 'next';
import { KB_ORIGIN } from '@/lib/site';

/**
 * `robots.txt` answered 404 before this, so Google had no directives and no
 * pointer to a sitemap for the busiest host on the domain.
 *
 * Everything here is public documentation and should be crawled. `/api/` is
 * excluded because nothing under it is a page.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${KB_ORIGIN}/sitemap.xml`,
  };
}
