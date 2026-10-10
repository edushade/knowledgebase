import { ArrowUpRight } from 'lucide-react';
import { featurePageFor } from '@/lib/feature-pages';

/**
 * Sends a reader who landed on a section of the manual to the page that
 * explains why they would want the thing it documents.
 *
 * It is deliberately a plain anchor out to edushade.com and deliberately
 * visible rather than tucked in a footer: it is the only signal on the page
 * that says the marketing site owns this topic commercially and these docs
 * are its reference material. See `lib/feature-pages.ts` for what went wrong
 * without it.
 */
export function FeaturePageLink({ url }: { url: string }) {
  const feature = featurePageFor(url);
  if (!feature) return null;

  return (
    <a
      href={feature.href}
      className="not-prose mb-6 flex items-center justify-between gap-4 rounded-lg border border-fd-border bg-fd-card px-4 py-3 text-sm no-underline transition-colors hover:bg-fd-accent"
    >
      <span className="text-fd-muted-foreground">
        Looking for what this does, rather than how to use it? See{' '}
        <span className="font-medium text-fd-foreground">{feature.label}</span>{' '}
        on edushade.com.
      </span>
      <ArrowUpRight className="size-4 shrink-0 text-fd-muted-foreground" />
    </a>
  );
}
