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
  start: (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 2.5c3 2 4.5 5 4.5 8L10 15 5.5 10.5c0-3 1.5-6 4.5-8z" />
      <circle cx="10" cy="8" r="1.5" />
      <path d="M7 15.5c-.8 1-.9 2-.9 2s1.2-.1 2-.9" />
    </svg>
  ),
  analytics: (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 17h14" />
      <rect x="4" y="10" width="3" height="5" rx="0.6" />
      <rect x="8.5" y="6" width="3" height="9" rx="0.6" />
      <rect x="13" y="12" width="3" height="3" rx="0.6" />
    </svg>
  ),
  settings: (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="10" cy="10" r="2.5" />
      <path d="M10 2.5v2M10 15.5v2M17.5 10h-2M4.5 10h-2M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4M15.3 15.3l-1.4-1.4M6.1 6.1 4.7 4.7" />
    </svg>
  ),
  learner: (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 3.5 17 7l-7 3.5L3 7z" />
      <path d="M6 8.8V13c0 1.1 1.8 2 4 2s4-.9 4-2V8.8" />
    </svg>
  ),
  'how-to': (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12.8 3.6a3.6 3.6 0 0 0-4.6 4.6l-5 5a1.5 1.5 0 0 0 2.1 2.1l5-5a3.6 3.6 0 0 0 4.6-4.6l-2 2-1.6-.5-.5-1.6z" />
    </svg>
  ),
};

const MODULES: ModuleCardData[] = [
  {
    num: '01',
    slug: 'start',
    name: 'Start Here',
    blurb: 'What you can build, a tour of the admin, and a checklist for before you take money.',
    pages: 7,
    topics: ['What you can build', 'Admin tour', 'Launch checklist'],
    tone: 'blue',
    icon: ICON['start'],
  },
  {
    num: '02',
    slug: 'courses',
    name: 'Courses & Content',
    blurb: 'Courses, batches and learning paths — lessons, videos, live sessions and the library behind them.',
    pages: 17,
    topics: ['Creating a course', 'The course builder', 'Cohorts & terms'],
    tone: 'blue',
    icon: ICON['courses'],
  },
  {
    num: '03',
    slug: 'enrollment-access',
    name: 'Enrollment & Access',
    blurb: 'Getting learners in, and the six separate rules that decide what each of them can open.',
    pages: 12,
    topics: ['Enrolment windows', 'Drip scheduling', 'Partial access'],
    tone: 'moss',
    icon: ICON['enrollment-access'],
  },
  {
    num: '04',
    slug: 'progress-grading',
    name: 'Progress & Grading',
    blurb: 'Completion rules, grading schemes, weights, rounding — and the two settings behind most wrong marks.',
    pages: 15,
    topics: ['Grading schemes', 'Weighted grading', 'Transcripts'],
    tone: 'ochre',
    icon: ICON['progress-grading'],
  },
  {
    num: '05',
    slug: 'assessments',
    name: 'Assessments & Quizzes',
    blurb: 'Quizzes, exams and assignments — the ten question types that work, marking, and exam integrity.',
    pages: 20,
    topics: ['Question types', 'Exams', 'Grading quizzes'],
    tone: 'blue',
    icon: ICON['assessments'],
  },
  {
    num: '06',
    slug: 'certificates',
    name: 'Certificates & Documents',
    blurb: 'Who earns a certificate, what the document looks like, and the six gates that hold one back.',
    pages: 8,
    topics: ['Requirements', 'Templates', 'Document builder'],
    tone: 'ink',
    icon: ICON['certificates'],
  },
  {
    num: '07',
    slug: 'selling-payments',
    name: 'Selling & Payments',
    blurb: 'Pricing, instalments, coupons, scholarships, refunds — and the four lists worth working weekly.',
    pages: 15,
    topics: ['Pricing', 'Instalments', 'Transactions'],
    tone: 'rust',
    icon: ICON['selling-payments'],
  },
  {
    num: '08',
    slug: 'website',
    name: 'Website & Pages',
    blurb: 'Your public site, built from blocks that show your real catalogue and stay current by themselves.',
    pages: 10,
    topics: ['Pages & blocks', 'Themes', 'SEO'],
    tone: 'moss',
    icon: ICON['website'],
  },
  {
    num: '09',
    slug: 'communication',
    name: 'Communication',
    blurb: 'Notifications the platform sends, campaigns you write, and the noticeboard that never leaves the site.',
    pages: 11,
    topics: ['Channels', 'Campaigns', 'Audiences'],
    tone: 'rust',
    icon: ICON['communication'],
  },
  {
    num: '10',
    slug: 'community',
    name: 'Community & Feedback',
    blurb: 'Discussions, comments, reactions and the reviews the next buyer reads.',
    pages: 5,
    topics: ['Discussions', 'Reactions', 'Reviews'],
    tone: 'ochre',
    icon: ICON['community'],
  },
  {
    num: '11',
    slug: 'bookings',
    name: 'Live Sessions & Events',
    blurb: 'Bookable meetings and scheduled events — office hours, tutorials, webinars and open days.',
    pages: 10,
    topics: ['Meeting plans', 'Availability', 'Events'],
    tone: 'ink',
    icon: ICON['bookings'],
  },
  {
    num: '12',
    slug: 'analytics',
    name: 'Analytics & Reports',
    blurb: 'Nine screens, nine questions — and the lists that produce an action rather than a number.',
    pages: 10,
    topics: ['Programmes', 'Progress', 'Grades'],
    tone: 'blue',
    icon: ICON['analytics'],
  },
  {
    num: '13',
    slug: 'account-people',
    name: 'People & Access',
    blurb: 'Your team and your learners, roles that decide what each can do, and the records behind it.',
    pages: 14,
    topics: ['Roles & permissions', 'Sign-in', 'Privacy'],
    tone: 'moss',
    icon: ICON['account-people'],
  },
  {
    num: '14',
    slug: 'settings',
    name: 'Settings',
    blurb: 'Identity, security, retention and the services your academy connects to.',
    pages: 4,
    topics: ['Control Panel', 'Integrations', 'Holidays'],
    tone: 'ink',
    icon: ICON['settings'],
  },
  {
    num: '15',
    slug: 'files',
    name: 'Files & Media',
    blurb: 'The library behind your courses — uploads, limits, and how your videos actually play.',
    pages: 7,
    topics: ['Uploading', 'Limits', 'Video playback'],
    tone: 'ochre',
    icon: ICON['files'],
  },
  {
    num: '16',
    slug: 'search',
    name: 'Search & Discovery',
    blurb: 'How visitors find your courses, and the one field most academies never fill in.',
    pages: 6,
    topics: ['Search basics', 'Filters', 'Trending'],
    tone: 'rust',
    icon: ICON['search'],
  },
  {
    num: '17',
    slug: 'learner',
    name: 'The Learner Experience',
    blurb: 'Every screen a learner sees, so you can answer their questions without taking the course.',
    pages: 13,
    topics: ['Their dashboard', 'Exams', 'Certificates'],
    tone: 'blue',
    icon: ICON['learner'],
  },
  {
    num: '18',
    slug: 'how-to',
    name: 'How-To Library',
    blurb: 'Step-by-step recipes for the jobs that cross several screens, start to finish.',
    pages: 11,
    topics: ['Launch a batch', 'Run an exam', 'Publish results'],
    tone: 'rust',
    icon: ICON['how-to'],
  },
];


/* ── Hairline rule, optionally drawn in on load ─────────────────────── */
function Rule({
  className = '',
  delay,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <div
      aria-hidden
      className={`h-px w-full bg-[color:var(--eb-border)] ${delay !== undefined ? 'eb-rule-draw' : ''} ${className}`}
      style={delay !== undefined ? { animationDelay: `${delay}s` } : undefined}
    />
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

  const stats = [
    { k: 'Sections', v: MODULES.length.toString().padStart(2, '0') },
    { k: 'Pages', v: totalPages.toString() },
    { k: 'Updated', v: 'Live' },
  ];

  return (
    <main className="eb relative isolate flex flex-1 flex-col">
      {/* ═══ MASTHEAD ═════════════════════════════════════════════ */}
      <section className="relative">
        <div className="mx-auto max-w-[78rem] px-5 sm:px-10">
          {/* running head */}
          <div className="eb-rise flex items-baseline justify-between pb-3 pt-6" style={{ animationDelay: '0.02s' }}>
            <span className="eb-folio">Edushade Knowledge Base</span>
            <span className="eb-folio hidden sm:inline">
              {MODULES.length} sections · {totalPages} pages
            </span>
          </div>
          <Rule delay={0.1} className="bg-[color:var(--eb-ink)]/25" />

          <div className="grid grid-cols-1 gap-x-16 gap-y-16 pb-16 pt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:pb-24 lg:pt-16">
            {/* ── headline column ── */}
            <div className="flex flex-col">
              <h1 className="eb-display max-w-[16ch] text-[clamp(2.6rem,6vw,4.4rem)] leading-[1.02] text-[color:var(--eb-ink)]">
                <span className="eb-wordrise" style={{ animationDelay: '0.14s' }}>
                  Everything you need
                </span>{' '}
                <span className="eb-wordrise" style={{ animationDelay: '0.22s' }}>
                  to run your
                </span>{' '}
                <span
                  className="eb-wordrise eb-display-ital text-[color:var(--eb-brand)]"
                  style={{ animationDelay: '0.3s' }}
                >
                  academy
                </span>
                <span className="eb-wordrise" style={{ animationDelay: '0.38s' }}>
                  {' '}— in plain words.
                </span>
              </h1>

              <p className="eb-rise mt-8 max-w-[46ch] text-[1.0625rem] leading-[1.65] text-[color:var(--eb-ink-soft)]" style={{ animationDelay: '0.44s' }}>
                A complete, step-by-step guide to building courses, enrolling
                learners, selling, awarding certificates, and publishing your
                website. No technical know-how needed.
              </p>

              <div className="eb-rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ animationDelay: '0.5s' }}>
                <Link
                  href="/docs/knowledgebase"
                  className="eb-action group inline-flex h-12 items-center gap-2.5 px-6 text-[0.9375rem] font-medium"
                >
                  Browse the guide
                  {ArrowRight}
                </Link>
                <Link
                  href="/docs/knowledgebase/courses"
                  className="eb-action-quiet group inline-flex items-center gap-2 text-[0.9375rem] font-medium"
                >
                  Start with Courses
                  <span aria-hidden className="text-[color:var(--eb-ink-mute)] transition-transform duration-300 group-hover:translate-x-0.5">›</span>
                </Link>
              </div>

              {/* colophon — the vital statistics, set as figures */}
              <dl className="eb-rise mt-14 flex max-w-lg items-end" style={{ animationDelay: '0.56s' }}>
                {stats.map((s, i) => (
                  <div
                    key={s.k}
                    className={`flex-1 ${i > 0 ? 'border-l border-[color:var(--eb-border)] pl-6 sm:pl-8' : ''} ${i < stats.length - 1 ? 'pr-6 sm:pr-8' : ''}`}
                  >
                    <dt className="eb-folio">{s.k}</dt>
                    <dd className="eb-numeral mt-2 text-[2.35rem] leading-none text-[color:var(--eb-ink)]">
                      {s.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* ── contents page ── */}
            <div className="eb-rise lg:pt-3" style={{ animationDelay: '0.3s' }}>
              <div className="eb-panel overflow-hidden">
                <div className="flex items-baseline justify-between border-b border-[color:var(--eb-border-strong)] px-5 py-4">
                  <span className="eb-folio text-[color:var(--eb-ink)]">
                    Table of contents
                  </span>
                  <kbd className="font-sans text-[0.6875rem] font-medium tracking-wide text-[color:var(--eb-ink-mute)]">
                    ⌘K to search
                  </kbd>
                </div>

                <ol>
                  {preview.map((m) => (
                    <li key={m.slug} className="border-b border-[color:var(--eb-border)]">
                      <Link
                        href={`/docs/knowledgebase/${m.slug}`}
                        className="eb-row group flex items-baseline gap-4 px-5 py-3.5"
                      >
                        <span aria-hidden className="eb-numeral w-7 shrink-0 text-[0.9375rem] text-[color:var(--eb-ink-mute)] transition-colors duration-300 group-hover:text-[color:var(--eb-brand)]">
                          {m.num}
                        </span>
                        <span className="shrink-0 text-[0.9375rem] text-[color:var(--eb-ink)]">
                          {m.name}
                        </span>
                        <span aria-hidden className="eb-leader h-px min-w-6 flex-1 translate-y-[-0.2rem]" />
                        <span className="shrink-0 text-[0.9375rem] text-[color:var(--eb-ink-mute)]">
                          <span className="eb-numeral">{m.pages}</span> pages
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>

                <Link
                  href="/docs/knowledgebase"
                  className="group flex items-center justify-between px-5 py-4 text-[0.8125rem] font-medium text-[color:var(--eb-brand)] transition-colors hover:bg-[color:var(--eb-bg-soft)]"
                >
                  See all {MODULES.length} sections
                  {ArrowRight}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE INDEX ════════════════════════════════════════════ */}
      <section className="relative border-t border-[color:var(--eb-ink)]/20 bg-[color:var(--eb-bg-soft)]">
        <div className="mx-auto max-w-[78rem] px-5 sm:px-10">
          <Reveal>
            <div className="grid grid-cols-1 items-baseline gap-x-16 gap-y-5 pb-10 pt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:pt-20">
              <div>
                <span className="eb-folio">Sections</span>
                <h2 className="eb-display mt-3 text-[clamp(1.9rem,4vw,2.9rem)] leading-tight text-[color:var(--eb-ink)]">
                  Find your way around
                </h2>
              </div>
              <p className="max-w-[46ch] text-[1.0125rem] leading-[1.65] text-[color:var(--eb-ink-soft)]">
                Each section covers one part of running your academy. Start
                anywhere — every page is written in plain language, no jargon.
              </p>
            </div>
          </Reveal>

          <div className="border-t border-[color:var(--eb-ink)]/20 pb-20 lg:pb-24">
            {MODULES.map((m, i) => (
              <Reveal key={m.slug} delay={Math.min(i, 6) * 45}>
                <ModuleCard module={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THREE PILLARS ════════════════════════════════════════ */}
      <section className="relative border-t border-[color:var(--eb-ink)]/20">
        <div className="mx-auto max-w-[78rem] px-5 sm:px-10">
          <Reveal>
            <div className="grid grid-cols-1 items-baseline gap-x-16 gap-y-5 pb-12 pt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:pt-20">
              <div>
                <span className="eb-folio">At a glance</span>
                <h2 className="eb-display mt-3 text-[clamp(1.9rem,4vw,2.9rem)] leading-tight text-[color:var(--eb-ink)]">
                  How Edushade fits together
                </h2>
              </div>
              <p className="max-w-[46ch] text-[1.0125rem] leading-[1.65] text-[color:var(--eb-ink-soft)]">
                Every academy does three things: teach, sell, and grow. Edushade
                gives you all three in one place.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 border-t border-[color:var(--eb-ink)]/20 pb-20 sm:grid-cols-3 lg:pb-24">
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
                <div
                  className={`flex h-full flex-col border-b border-[color:var(--eb-border)] py-9 sm:border-b-0 sm:py-10 ${i > 0 ? 'sm:border-l sm:border-[color:var(--eb-border)] sm:pl-8 lg:pl-10' : ''} ${i < 2 ? 'sm:pr-8 lg:pr-10' : ''}`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="eb-numeral text-[1.5rem] leading-none text-[color:var(--eb-brand)]">
                      {col.num}
                    </span>
                    <span className="eb-folio">Pillar</span>
                  </div>
                  <h3 className="eb-display mt-5 text-[1.75rem] leading-tight text-[color:var(--eb-ink)]">
                    {col.title}
                  </h3>
                  <p className="mt-3 max-w-[40ch] text-[0.95rem] leading-relaxed text-[color:var(--eb-ink-soft)]">
                    {col.body}
                  </p>
                  <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-[color:var(--eb-border)] pt-5 text-[0.8125rem] text-[color:var(--eb-ink-mute)]">
                    {col.tags.map((t, j) => (
                      <li key={t} className="flex items-center gap-3">
                        {j > 0 && (
                          <span aria-hidden className="text-[color:var(--eb-border-strong)]">
                            /
                          </span>
                        )}
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLOSING NOTE ═════════════════════════════════════════ */}
      <section className="relative border-t border-[color:var(--eb-ink)]/20 bg-[color:var(--eb-bg-soft)]">
        <div className="mx-auto max-w-[78rem] px-5 sm:px-10">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-10 py-16 lg:flex-row lg:items-end lg:py-20">
              <div>
                <h2 className="eb-display max-w-[14ch] text-[clamp(1.9rem,3.8vw,2.9rem)] leading-tight text-[color:var(--eb-ink)]">
                  Ready to dive in?
                </h2>
                <p className="mt-4 max-w-md text-[1.0125rem] leading-[1.65] text-[color:var(--eb-ink-soft)]">
                  Start with Courses — the heart of your academy.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href="/docs/knowledgebase/courses"
                  className="eb-action group inline-flex h-12 items-center gap-2.5 px-6 text-[0.9375rem] font-medium"
                >
                  Open Courses
                  {ArrowRight}
                </Link>
                <Link
                  href="/docs/knowledgebase"
                  className="eb-action-quiet group inline-flex items-center gap-2 text-[0.9375rem] font-medium"
                >
                  See everything
                  <span aria-hidden className="text-[color:var(--eb-ink-mute)] transition-transform duration-300 group-hover:translate-x-0.5">›</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ COLOPHON ═════════════════════════════════════════════ */}
      <section className="relative border-t border-[color:var(--eb-ink)]/20">
        <div className="mx-auto max-w-[78rem] px-5 py-8 sm:px-10">
          <div className="flex flex-wrap items-center justify-between gap-y-3">
            <span className="eb-folio">Edushade · Knowledge Base</span>
            <div className="eb-folio flex items-center gap-3">
              <span>{MODULES.length} sections</span>
              <span aria-hidden className="text-[color:var(--eb-border-strong)]">/</span>
              <span>{totalPages} pages</span>
              <span aria-hidden className="text-[color:var(--eb-border-strong)]">/</span>
              <span>Always up to date</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
