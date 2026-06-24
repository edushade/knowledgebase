import Link from 'next/link';
import type { ReactNode } from 'react';

export type ModuleCardData = {
  num: string;
  slug: string;
  name: string;
  blurb: string;
  pages: number;
  topics: string[];
  /* kept for source compatibility — drives the soft pastel card foot */
  tone: 'rust' | 'ochre' | 'blue' | 'moss' | 'ink';
  icon: ReactNode;
};

/* Brand pastel feet — same family the marketing site uses on feature cards
   (#C5D1FF / #C5FFE6 / #F2FFC5 / #FFC5F0), all anchored to brand blue. */
const TONE: Record<ModuleCardData['tone'], string> = {
  rust: '#FFC5F0',
  ochre: '#F2FFC5',
  blue: '#C5D1FF',
  moss: '#C5FFE6',
  ink: '#D9E2FF',
};

export function ModuleCard({ module: m }: { module: ModuleCardData }) {
  const foot = TONE[m.tone];
  return (
    <Link
      href={`/docs/knowledgebase/${m.slug}`}
      className="eb-card-shadow group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--eb-border)] bg-[color:var(--eb-bg)] p-6 transition-all duration-300 hover:-translate-y-1"
    >
      {/* soft pastel foot — fades in on hover, brand signature */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${foot} 220%)`,
        }}
      />

      {/* header row */}
      <div className="relative flex items-start justify-between">
        <span
          aria-hidden
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--eb-border-strong)] bg-[color:var(--eb-bg-soft)] text-[color:var(--eb-brand)] transition-all duration-300 group-hover:border-[color:var(--eb-brand)]/40 group-hover:bg-[color:var(--eb-brand-tint)]"
        >
          {m.icon}
        </span>
        <span className="text-[12px] font-semibold tabular-nums tracking-[0.12em] text-[color:var(--eb-ink-mute)]">
          {m.num}
        </span>
      </div>

      {/* name */}
      <h3 className="relative mt-5 text-[1.35rem] font-medium leading-tight tracking-tight text-[color:var(--eb-ink)]">
        {m.name}
      </h3>

      {/* blurb — clamped to a uniform 2-line height so chips + footer
          align across every card in a row */}
      <p className="relative mt-2.5 line-clamp-2 min-h-[2.9rem] text-[0.925rem] leading-relaxed text-[color:var(--eb-ink-soft)]">
        {m.blurb}
      </p>

      {/* topics */}
      <ul className="relative mt-5 flex flex-wrap gap-1.5">
        {m.topics.map((t) => (
          <li
            key={t}
            className="rounded-full border border-[color:var(--eb-border)] bg-[color:var(--eb-bg-soft)] px-2.5 py-1 text-[11.5px] font-medium text-[color:var(--eb-ink-soft)]"
          >
            {t}
          </li>
        ))}
      </ul>

      {/* footer */}
      <div className="relative mt-auto flex items-center justify-between border-t border-[color:var(--eb-border)] pt-4 text-[12.5px]">
        <span className="font-medium text-[color:var(--eb-ink-mute)]">
          {m.pages} pages
        </span>
        <span className="inline-flex items-center gap-1.5 font-semibold text-[color:var(--eb-brand)] transition-all duration-300 group-hover:gap-2.5">
          Read
          <svg
            width="18"
            height="8"
            viewBox="0 0 20 8"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden
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
      </div>
    </Link>
  );
}
