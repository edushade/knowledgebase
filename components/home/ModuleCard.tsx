import Link from 'next/link';
import type { ReactNode } from 'react';

export type ModuleCardData = {
  num: string;
  slug: string;
  name: string;
  blurb: string;
  pages: number;
  topics: string[];
  /* kept for source compatibility */
  tone: 'rust' | 'ochre' | 'blue' | 'moss' | 'ink';
  icon: ReactNode;
};

/**
 * One line of the index.
 *
 * A contents page, not a tile: the number lives in the margin, the title
 * and its note sit in the measure, and the page count is flush right where
 * the eye already looks for it. Everything the card used to say is still
 * here — it is set, rather than boxed.
 */
export function ModuleCard({ module: m }: { module: ModuleCardData }) {
  return (
    <Link
      href={`/docs/knowledgebase/${m.slug}`}
      className="eb-row group grid grid-cols-[2.5rem_1fr] items-start gap-x-4 border-b border-[color:var(--eb-border)] py-6 pl-4 pr-3 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-x-6 sm:py-7 sm:pl-6 sm:pr-5"
    >
      {/* marginal numeral */}
      <span
        aria-hidden
        className="eb-numeral pt-0.5 text-[1.35rem] leading-none text-[color:var(--eb-ink-mute)] transition-colors duration-300 group-hover:text-[color:var(--eb-brand)] sm:text-[1.6rem]"
      >
        {m.num}
      </span>

      {/* title, note, topics */}
      <div className="min-w-0">
        <div className="flex items-baseline gap-3">
          <h3 className="eb-display text-[1.3rem] leading-snug text-[color:var(--eb-ink)] sm:text-[1.5rem]">
            {m.name}
          </h3>
          <span
            aria-hidden
            className="hidden h-px flex-1 translate-y-[-0.35rem] bg-[color:var(--eb-border)] sm:block"
          />
          <span className="hidden shrink-0 translate-y-[-0.1rem] text-[0.95rem] text-[color:var(--eb-ink-mute)] transition-opacity duration-300 group-hover:opacity-0 sm:inline">
            <span className="eb-numeral">{m.pages}</span> pages
          </span>
        </div>

        <p className="mt-2 max-w-[58ch] text-[0.95rem] leading-relaxed text-[color:var(--eb-ink-soft)]">
          {m.blurb}
        </p>

        <ul className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {m.topics.map((t, i) => (
            <li
              key={t}
              className="flex items-center gap-3 text-[0.8125rem] text-[color:var(--eb-ink-mute)]"
            >
              {i > 0 && (
                <span aria-hidden className="text-[color:var(--eb-border-strong)]">
                  /
                </span>
              )}
              {t}
            </li>
          ))}
          <li className="text-[0.8125rem] text-[color:var(--eb-ink-mute)] sm:hidden">
            · {m.pages} pages
          </li>
        </ul>
      </div>

      {/* read affordance — appears in place of the page count on hover */}
      <span className="col-start-2 mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-[color:var(--eb-brand)] sm:col-start-3 sm:row-start-1 sm:mt-1 sm:translate-x-2 sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:translate-x-0 sm:group-hover:opacity-100">
        Read
        <svg
          width="18"
          height="8"
          viewBox="0 0 20 8"
          fill="none"
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        >
          <path
            d="M1 4h17M14 1l4 3-4 3"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
