import Link from 'next/link';
import { source } from '@/lib/source';
import { ModuleCard, type ModuleCardData } from '@/components/home/ModuleCard';
import { Reveal } from '@/components/home/Reveal';

/* ── Section icons (clean line icons, brand-blue) ───────────────────── */
const ICON: Record<string, React.ReactNode> = {
  courses: (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 4h5a2 2 0 0 1 2 2v10a2 2 0 0 0-2-2H3z" />
      <path d="M17 4h-5a2 2 0 0 0-2 2v10a2 2 0 0 1 2-2h5z" />
    </svg>
  ),
  'enrollment-access': (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="9" width="12" height="8" rx="1.5" />
      <path d="M7 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  ),
  'progress-grading': (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 16V4" />
      <path d="M3 16h14" />
      <path d="M6 13l3-3 2 2 4-5" />
    </svg>
  ),
  assessments: (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="3" width="12" height="14" rx="1" />
      <path d="M6.5 7l1.4 1.4L10.5 6" />
      <path d="M7 12h6" />
    </svg>
  ),
  certificates: (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="10" cy="8" r="4" />
      <path d="M7.5 11.5L6 18l4-2 4 2-1.5-6.5" />
    </svg>
  ),
  'selling-payments': (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="14" height="10" rx="1.5" />
      <path d="M3 8h14" />
      <path d="M6 12h3" />
    </svg>
  ),
  website: (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="10" cy="10" r="7" />
      <path d="M3 10h14" />
      <path d="M10 3c2.4 2.5 2.4 11.5 0 14M10 3c-2.4 2.5-2.4 11.5 0 14" />
    </svg>
  ),
  communication: (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 8v4l9 4V4z" />
      <path d="M4 8H3v4h1" />
      <path d="M13.5 8a2 2 0 0 1 0 4" />
    </svg>
  ),
  community: (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 5h9a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H8l-4 3z" />
      <path d="M7 8h5" />
    </svg>
  ),
  bookings: (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="14" height="13" rx="1.5" />
      <path d="M3 8h14M7 3v3M13 3v3" />
      <path d="M10 11v2l1.5 1" />
    </svg>
  ),
  files: (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 6V4h5l2 2h7v10H3z" />
      <path d="M3 8h14" />
    </svg>
  ),
  search: (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="9" r="5" />
      <path d="M16 16l-3.5-3.5" />
    </svg>
  ),
  'account-people': (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="7" cy="7" r="2.5" />
      <path d="M3 16c0-2.5 1.8-4 4-4s4 1.5 4 4" />
      <path d="M13 6.5a2.3 2.3 0 0 1 0 4.5" />
      <path d="M13.5 12.2c1.7.4 3 1.6 3 3.8" />
    </svg>
  ),
};

const MODULES: ModuleCardData[] = [
  {
    num: '01',
    slug: 'courses',
    name: 'Courses & Content',
    blurb: 'Courses, learning paths, and cohorts — with lessons, videos, live sessions, and files.',
    pages: 10,
    topics: ['Courses & lessons', 'Learning paths', 'Cohorts'],
    tone: 'blue',
    icon: ICON.courses,
  },
  {
    num: '02',
    slug: 'enrollment-access',
    name: 'Enrollment & Access',
    blurb: 'Enroll learners, release content on a schedule, and set who can access what.',
    pages: 8,
    topics: ['Enrollment', 'Drip scheduling', 'Prerequisites'],
    tone: 'moss',
    icon: ICON['enrollment-access'],
  },
  {
    num: '03',
    slug: 'progress-grading',
    name: 'Progress & Grading',
    blurb: 'Track progress, set completion rules, grade with weights, and build marksheets.',
    pages: 8,
    topics: ['Completion rules', 'Weighted grading', 'Marksheets'],
    tone: 'ochre',
    icon: ICON['progress-grading'],
  },
  {
    num: '04',
    slug: 'assessments',
    name: 'Assessments & Quizzes',
    blurb: 'Quizzes and exams with many question types, auto and manual grading, and proctoring.',
    pages: 14,
    topics: ['Question types', 'Exams', 'Proctoring'],
    tone: 'blue',
    icon: ICON.assessments,
  },
  {
    num: '05',
    slug: 'certificates',
    name: 'Certificates',
    blurb: 'Award verifiable certificates when learners finish or pass an approved review.',
    pages: 4,
    topics: ['Requirements', 'Issuing', 'Verification'],
    tone: 'ink',
    icon: ICON.certificates,
  },
  {
    num: '06',
    slug: 'selling-payments',
    name: 'Selling & Payments',
    blurb: 'Price courses and run bundles, subscriptions, installments, coupons, and payments.',
    pages: 12,
    topics: ['Pricing & bundles', 'Coupons', 'Payments'],
    tone: 'rust',
    icon: ICON['selling-payments'],
  },
  {
    num: '07',
    slug: 'website',
    name: 'Website & Pages',
    blurb: 'Build your public site — pages, blocks, themes, menus, forms, a blog, and SEO.',
    pages: 10,
    topics: ['Pages & blocks', 'Themes & menus', 'Forms & SEO'],
    tone: 'moss',
    icon: ICON.website,
  },
  {
    num: '08',
    slug: 'communication',
    name: 'Communication',
    blurb: 'Post announcements and send campaigns by email, SMS, push, and chat apps.',
    pages: 11,
    topics: ['Announcements', 'Campaigns', 'Channels'],
    tone: 'blue',
    icon: ICON.communication,
  },
  {
    num: '09',
    slug: 'community',
    name: 'Community & Feedback',
    blurb: 'Let learners take part with discussions, comments, star reviews, and reactions.',
    pages: 5,
    topics: ['Discussions', 'Reviews', 'Reactions'],
    tone: 'ochre',
    icon: ICON.community,
  },
  {
    num: '10',
    slug: 'bookings',
    name: 'Bookings & Appointments',
    blurb: 'Offer bookable meetings and office hours with availability, payments, and video.',
    pages: 8,
    topics: ['Meeting plans', 'Availability', 'Calendar & video'],
    tone: 'ink',
    icon: ICON.bookings,
  },
  {
    num: '11',
    slug: 'files',
    name: 'Files & Media',
    blurb: 'Upload, organize, and preview the files and media you use across your academy.',
    pages: 6,
    topics: ['Uploading', 'Organizing', 'Learner uploads'],
    tone: 'moss',
    icon: ICON.files,
  },
  {
    num: '12',
    slug: 'search',
    name: 'Search & Discovery',
    blurb: 'Help learners find courses fast with search, filters, autocomplete, and trends.',
    pages: 6,
    topics: ['Search & filters', 'Autocomplete', 'Trending'],
    tone: 'rust',
    icon: ICON.search,
  },
  {
    num: '13',
    slug: 'account-people',
    name: 'Account & People',
    blurb: 'Manage platform settings, sign-in, roles, categories, and activity history.',
    pages: 10,
    topics: ['Accounts & sign-in', 'People & roles', 'Activity'],
    tone: 'blue',
    icon: ICON['account-people'],
  },
];

/* ── Brand decorative sparkle (the marketing hero's blue asterisk) ──── */
function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      style={{ filter: 'drop-shadow(0 8px 20px rgba(0,102,255,0.32))' }}
    >
      <defs>
        <linearGradient id="eb-sparkle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="100%" stopColor="#2B80FF" />
        </linearGradient>
      </defs>
      <path
        d="M30 2 C31.2 20, 38 26.8, 56 28 C38 29.2, 31.2 36, 30 54 C28.8 36, 22 29.2, 4 28 C22 26.8, 28.8 20, 30 2 Z"
        fill="url(#eb-sparkle)"
      />
      <path
        d="M62 50 C62.6 58, 65.4 60.6, 73 61.5 C65.4 62.4, 62.6 65, 62 73 C61.4 65, 58.6 62.4, 51 61.5 C58.6 60.6, 61.4 58, 62 50 Z"
        fill="#0066FF"
        fillOpacity="0.7"
      />
    </svg>
  );
}

const ArrowRight = (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
    <path d="M1 5h11M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function HomePage() {
  const totalPages = source.getPages().length;
  const preview = MODULES.slice(0, 5);

  return (
    <main className="eb relative isolate flex flex-1 flex-col">
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* signature dot-grid texture */}
        <div aria-hidden className="eb-dotgrid pointer-events-none absolute inset-0 -z-10" />
        {/* soft blue wash from the top */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]"
          style={{
            background:
              'radial-gradient(60% 100% at 50% 0%, rgba(0,102,255,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="mx-auto grid max-w-[80rem] grid-cols-1 items-center gap-x-12 gap-y-14 px-4 pb-20 pt-14 sm:px-8 lg:grid-cols-2 lg:pb-28 lg:pt-20">
          {/* headline column */}
          <div className="flex flex-col">
            <span className="eb-eyebrow eb-rise inline-flex w-fit items-center gap-2 px-3.5 py-1.5" style={{ animationDelay: '0.02s' }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="eb-ping-soft absolute inline-flex h-full w-full rounded-full bg-[color:var(--eb-brand)]" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--eb-brand)]" />
              </span>
              <span className="eb-kicker text-[color:var(--eb-ink-soft)]">
                Edushade Knowledge Base
              </span>
            </span>

            <h1 className="mt-6 text-[clamp(2.5rem,5.4vw,3.85rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[color:var(--eb-ink)]">
              <span className="eb-wordrise" style={{ animationDelay: '0.06s' }}>
                Everything you need
              </span>{' '}
              <span className="eb-wordrise" style={{ animationDelay: '0.14s' }}>
                to run your
              </span>{' '}
              <span
                className="eb-wordrise text-[color:var(--eb-brand)]"
                style={{ animationDelay: '0.22s' }}
              >
                academy
              </span>
              <span className="eb-wordrise" style={{ animationDelay: '0.3s' }}>
                {' '}— in plain words.
              </span>
            </h1>

            <p className="eb-rise mt-6 max-w-lg text-[1.075rem] leading-relaxed text-[color:var(--eb-ink-soft)]" style={{ animationDelay: '0.36s' }}>
              A complete, step-by-step guide to building courses, enrolling
              learners, selling, awarding certificates, and publishing your
              website. No technical know-how needed.
            </p>

            <div className="eb-rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: '0.42s' }}>
              <Link
                href="/docs/knowledgebase"
                className="eb-btn-primary group inline-flex h-12 items-center gap-2.5 rounded-full px-6 text-[15px] font-medium"
              >
                Browse the guide
                {ArrowRight}
              </Link>
              <Link
                href="/docs/knowledgebase/courses"
                className="eb-btn-ghost group inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-medium"
              >
                Start with Courses
                <span aria-hidden className="text-[color:var(--eb-ink-mute)] transition-transform duration-300 group-hover:translate-x-0.5">›</span>
              </Link>
            </div>

            {/* vital stats */}
            <dl className="eb-rise mt-11 grid max-w-md grid-cols-3 gap-x-6 border-t border-[color:var(--eb-border)] pt-6" style={{ animationDelay: '0.48s' }}>
              {[
                { k: 'Sections', v: MODULES.length.toString().padStart(2, '0') },
                { k: 'Pages', v: totalPages.toString() },
                { k: 'Updated', v: 'Live' },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="text-[12px] font-medium uppercase tracking-[0.1em] text-[color:var(--eb-ink-mute)]">
                    {s.k}
                  </dt>
                  <dd className="mt-1.5 text-[1.75rem] font-medium leading-none tracking-tight text-[color:var(--eb-ink)]">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* preview column — branded "table of contents" card */}
          <div className="relative">
            <Sparkle className="eb-float pointer-events-none absolute -left-4 -top-5 z-20 h-14 w-12 lg:-left-7 lg:-top-7 lg:h-20 lg:w-[4.5rem]" />

            <div className="eb-rise eb-card-shadow relative overflow-hidden rounded-3xl border border-[color:var(--eb-border)] bg-[color:var(--eb-bg)]" style={{ animationDelay: '0.2s' }}>
              {/* header strip */}
              <div className="flex items-center justify-between border-b border-[color:var(--eb-border)] bg-[color:var(--eb-bg-soft)] px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[color:var(--eb-brand)] text-white">
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M3 4h5a2 2 0 0 1 2 2v10a2 2 0 0 0-2-2H3z" />
                      <path d="M17 4h-5a2 2 0 0 0-2 2v10a2 2 0 0 1 2-2h5z" />
                    </svg>
                  </span>
                  <span className="text-[14px] font-medium text-[color:var(--eb-ink)]">
                    Table of contents
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--eb-border-strong)] bg-[color:var(--eb-bg)] px-2.5 py-1 text-[11px] font-medium text-[color:var(--eb-ink-mute)]">
                  ⌘K to search
                </span>
              </div>

              {/* rows */}
              <ul className="divide-y divide-[color:var(--eb-border)]">
                {preview.map((m) => (
                  <li key={m.slug}>
                    <Link
                      href={`/docs/knowledgebase/${m.slug}`}
                      className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-[color:var(--eb-brand-tint)]"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[color:var(--eb-border-strong)] bg-[color:var(--eb-bg-soft)] text-[color:var(--eb-brand)] transition-colors group-hover:border-[color:var(--eb-brand)]/40">
                        {m.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14.5px] font-medium text-[color:var(--eb-ink)]">
                          {m.name}
                        </span>
                        <span className="block text-[12.5px] text-[color:var(--eb-ink-mute)]">
                          {m.pages} pages
                        </span>
                      </span>
                      <span className="text-[color:var(--eb-ink-mute)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[color:var(--eb-brand)]">
                        ›
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* footer link */}
              <Link
                href="/docs/knowledgebase"
                className="group flex items-center justify-between border-t border-[color:var(--eb-border)] bg-[color:var(--eb-bg-soft)] px-5 py-3.5 text-[13.5px] font-medium text-[color:var(--eb-brand)]"
              >
                See all {MODULES.length} sections
                {ArrowRight}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION GRID ────────────────────────────────────────── */}
      <section className="relative border-t border-[color:var(--eb-border)] bg-[color:var(--eb-bg-soft)]">
        <div className="mx-auto max-w-[80rem] px-4 py-20 sm:px-8 lg:py-24">
          <Reveal>
            <div className="grid grid-cols-1 items-end gap-6 pb-12 lg:grid-cols-2 lg:gap-24">
              <div>
                <span className="eb-kicker text-[color:var(--eb-brand)]">
                  Sections
                </span>
                <h2 className="mt-3 text-[clamp(1.85rem,4vw,2.75rem)] font-medium leading-tight tracking-tight text-[color:var(--eb-ink)]">
                  Find your way around
                </h2>
              </div>
              <p className="text-[1.05rem] leading-relaxed text-[color:var(--eb-ink-soft)]">
                Each section covers one part of running your academy. Start
                anywhere — every page is written in plain language, no jargon.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m, i) => (
              <Reveal key={m.slug} delay={(i % 3) * 70}>
                <ModuleCard module={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT FITS TOGETHER ────────────────────────────────── */}
      <section className="relative border-t border-[color:var(--eb-border)]">
        <div className="mx-auto max-w-[80rem] px-4 py-20 sm:px-8 lg:py-24">
          <Reveal>
            <div className="grid grid-cols-1 items-end gap-6 pb-12 lg:grid-cols-2 lg:gap-24">
              <div>
                <span className="eb-kicker text-[color:var(--eb-brand)]">
                  At a glance
                </span>
                <h2 className="mt-3 text-[clamp(1.85rem,4vw,2.75rem)] font-medium leading-tight tracking-tight text-[color:var(--eb-ink)]">
                  How Edushade fits together
                </h2>
              </div>
              <p className="text-[1.05rem] leading-relaxed text-[color:var(--eb-ink-soft)]">
                Every academy does three things: teach, sell, and grow. Edushade
                gives you all three in one place.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              {
                num: '01',
                title: 'Teach',
                body: 'Build courses, learning paths, and cohorts; release content on a schedule; set prerequisites; track progress; grade work; and award certificates.',
                tags: ['Courses', 'Assessments', 'Certificates'],
              },
              {
                num: '02',
                title: 'Sell',
                body: 'Price your courses one-time, free, by subscription, or in installments. Run bundles, coupons, and scholarships, and collect payments online or offline.',
                tags: ['Pricing', 'Payments', 'Scholarships'],
              },
              {
                num: '03',
                title: 'Grow',
                body: 'Publish your own website, send announcements and campaigns, and build a community with discussions, reviews, and bookable meetings.',
                tags: ['Website', 'Communication', 'Community'],
              },
            ].map((col, i) => (
              <Reveal key={col.title} delay={i * 80}>
                <div className="eb-card-shadow flex h-full flex-col rounded-3xl border border-[color:var(--eb-border)] bg-[color:var(--eb-bg)] p-7 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--eb-brand-tint)] text-[15px] font-semibold text-[color:var(--eb-brand)]">
                      {col.num}
                    </span>
                    <span className="eb-kicker text-[color:var(--eb-ink-mute)]">
                      Pillar
                    </span>
                  </div>
                  <h3 className="mt-5 text-[1.5rem] font-medium leading-tight tracking-tight text-[color:var(--eb-ink)]">
                    {col.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-[color:var(--eb-ink-soft)]">
                    {col.body}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-[color:var(--eb-border)] pt-5">
                    {col.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[color:var(--eb-border)] bg-[color:var(--eb-bg-soft)] px-2.5 py-1 text-[11.5px] font-medium text-[color:var(--eb-ink-soft)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────── */}
      <section className="relative border-t border-[color:var(--eb-border)] bg-[color:var(--eb-bg-soft)]">
        <div className="mx-auto max-w-[80rem] px-4 py-20 sm:px-8">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-[2rem] border border-[color:var(--eb-border)] bg-[color:var(--eb-bg)]">
              {/* brand dot-grid + blue wash */}
              <div aria-hidden className="eb-dotgrid pointer-events-none absolute inset-0" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(80% 120% at 100% 0%, rgba(0,102,255,0.1) 0%, transparent 60%)',
                }}
              />
              <div className="relative flex flex-col items-start justify-between gap-8 px-7 py-12 sm:px-12 sm:py-14 lg:flex-row lg:items-center">
                <div>
                  <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium leading-tight tracking-tight text-[color:var(--eb-ink)]">
                    Ready to dive in?
                  </h2>
                  <p className="mt-3 max-w-md text-[1.05rem] leading-relaxed text-[color:var(--eb-ink-soft)]">
                    Start with Courses — the heart of your academy.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/docs/knowledgebase/courses"
                    className="eb-btn-primary group inline-flex h-12 items-center gap-2.5 rounded-full px-6 text-[15px] font-medium"
                  >
                    Open Courses
                    {ArrowRight}
                  </Link>
                  <Link
                    href="/docs/knowledgebase"
                    className="eb-btn-ghost group inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-medium"
                  >
                    See everything
                    <span aria-hidden className="text-[color:var(--eb-ink-mute)] transition-transform duration-300 group-hover:translate-x-0.5">›</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── COLOPHON ────────────────────────────────────────────── */}
      <section className="relative border-t border-[color:var(--eb-border)]">
        <div className="mx-auto max-w-[80rem] px-4 py-10 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-y-4">
            <span className="text-[12.5px] font-medium text-[color:var(--eb-ink-mute)]">
              Edushade · Knowledge Base
            </span>
            <div className="flex items-center gap-4 text-[12.5px] font-medium text-[color:var(--eb-ink-mute)]">
              <span>{MODULES.length} sections</span>
              <span aria-hidden className="text-[color:var(--eb-brand)]">•</span>
              <span>{totalPages} pages</span>
              <span aria-hidden className="text-[color:var(--eb-brand)]">•</span>
              <span>Always up to date</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
