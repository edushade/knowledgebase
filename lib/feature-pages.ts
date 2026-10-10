import { SITE_ORIGIN } from './site';

/**
 * Each documentation section and the marketing page that sells the same thing.
 *
 * ── WHY THIS EXISTS ────────────────────────────────────────────────────────
 *
 * These docs and edushade.com were competing instead of supporting each other,
 * and the docs were winning. Over ninety days Search Console showed, for the
 * same topic:
 *
 *   /docs/knowledgebase/courses      position 3.5   vs  /features/courses  5.2
 *   /docs/knowledgebase/assessments  position 5.6   vs  /features/assessments-exams  7.3
 *   /docs/knowledgebase/website      57 impressions vs  /features/website-builder — absent
 *
 * On the brand query "edushade" the sitelinks under the main result were
 * "Courses & Content", "Assessments & Quizzes", "Account & People" and
 * "Enrollment & Access" — internal documentation — rather than Pricing,
 * Features or Demos. Someone searching the company name was being handed the
 * manual instead of the product.
 *
 * The cause was that no link ran between the two sites in either direction, so
 * there was nothing telling Google that one of these pages is the commercial
 * answer for a topic and the other is its reference material. A visible,
 * contextual link on each section says which is which, and sends the reader
 * who landed on the manual to the page that explains why they would want it.
 *
 * ── WHY ONLY NINE ──────────────────────────────────────────────────────────
 *
 * A link is a promise that the destination answers the same question. Four
 * sections have no honest counterpart:
 *
 *   files             no feature page is about file storage
 *   search            no feature page is about search
 *   selling-payments  nothing on the marketing site covers the storefront;
 *                     /pricing is what Edushade costs, not what a merchant
 *                     charges their learners
 *   community         /features/community is still `comingSoon`, so it is
 *                     noindexed and absent from the sitemap — linking to it
 *                     consolidates nothing
 *
 * Those keep no link rather than a misleading one.
 */
export const SECTION_FEATURE_PAGES: Readonly<
  Record<string, { slug: string; label: string }>
> = {
  'account-people': { slug: 'user-management', label: 'User Management' },
  assessments: { slug: 'assessments-exams', label: 'Assessments & Exams' },
  bookings: { slug: 'live-bookings', label: 'Live Bookings' },
  certificates: { slug: 'certificates', label: 'Certificates' },
  communication: { slug: 'announcements', label: 'Announcements' },
  courses: { slug: 'courses', label: 'Courses' },
  'enrollment-access': { slug: 'access-control', label: 'Access Control' },
  'progress-grading': { slug: 'progress-tracking', label: 'Progress Tracking' },
  website: { slug: 'website-builder', label: 'Website Builder' },
};

/** The docs base path, so a section can be read back out of a page URL. */
const DOCS_BASE = '/docs/knowledgebase';

/**
 * The feature page for a section's landing page, or undefined.
 *
 * Only the section landing page gets the link — `/docs/knowledgebase/courses`
 * but not `/docs/knowledgebase/courses/cohorts`. The landing pages are the
 * ones that read like a feature page and take the sitelinks; a page about
 * grading one quiz competes with nothing.
 */
export function featurePageFor(
  url: string,
): { href: string; label: string } | undefined {
  if (!url.startsWith(`${DOCS_BASE}/`)) return undefined;
  const rest = url.slice(DOCS_BASE.length + 1);
  if (rest === '' || rest.includes('/')) return undefined;
  const match = SECTION_FEATURE_PAGES[rest];
  if (!match) return undefined;
  return { href: `${SITE_ORIGIN}/features/${match.slug}`, label: match.label };
}
