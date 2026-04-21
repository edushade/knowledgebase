import Link from 'next/link';
import { source } from '@/lib/source';

const moduleHighlights: Record<
  string,
  { blurb: string; accent: string; highlights: string[] }
> = {
  'auth-module': {
    blurb:
      'Identity, access control, and user lifecycle for the EduShade platform.',
    accent: 'from-indigo-500 via-violet-500 to-fuchsia-500',
    highlights: [
      'Registration & multi-factor verification',
      'Session & device management',
      'RBAC with granular permissions',
      'Admin tools: impersonation, analytics, lifecycle',
    ],
  },
};

const defaultAccent = 'from-sky-500 via-cyan-500 to-emerald-500';

export default function HomePage() {
  const tree = source.pageTree;
  const modules = tree.children.filter((node) => node.type === 'folder');
  const totalPages = source.getPages().length;

  return (
    <main className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b border-fd-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.indigo.500/0.15),transparent_55%),radial-gradient(ellipse_at_bottom_right,theme(colors.fuchsia.500/0.12),transparent_55%)]"
        />
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-20 sm:py-28">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-fd-border bg-fd-card/60 px-3 py-1 text-xs font-medium text-fd-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            EduShade Knowledge Base
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-fd-foreground sm:text-5xl md:text-6xl">
            Everything you need to build, ship, and operate{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
              EduShade
            </span>
            .
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-fd-muted-foreground">
            Technical references, product guides, and operational playbooks for
            every module of the platform. Organized by module so teams can
            onboard fast and ship faster.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/docs/knowledgebase"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-fd-primary px-5 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
            >
              Browse the docs
              <svg
                aria-hidden
                className="ml-2 size-4"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path d="M4 10h12M12 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/docs/knowledgebase/auth-module"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-fd-border bg-fd-card px-5 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
            >
              Start with Auth module
            </Link>
          </div>
          <dl className="mt-6 grid w-fit grid-cols-3 gap-8 border-t border-fd-border pt-6 text-sm">
            <div>
              <dt className="text-fd-muted-foreground">Modules</dt>
              <dd className="text-2xl font-semibold text-fd-foreground">
                {modules.length}
              </dd>
            </div>
            <div>
              <dt className="text-fd-muted-foreground">Pages</dt>
              <dd className="text-2xl font-semibold text-fd-foreground">
                {totalPages}
              </dd>
            </div>
            <div>
              <dt className="text-fd-muted-foreground">Last sync</dt>
              <dd className="text-2xl font-semibold text-fd-foreground">
                live
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between gap-4 pb-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-fd-foreground">
              Modules
            </h2>
            <p className="mt-1 text-sm text-fd-muted-foreground">
              Browse documentation grouped by product module.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((moduleNode) => {
            if (moduleNode.type !== 'folder') return null;
            const indexPage = moduleNode.index;
            const moduleSlug =
              indexPage?.url?.split('/').filter(Boolean).at(-1) ?? '';
            const meta = moduleHighlights[moduleSlug] ?? {
              blurb:
                typeof moduleNode.description === 'string'
                  ? moduleNode.description
                  : 'Technical documentation.',
              accent: defaultAccent,
              highlights: [],
            };
            const pages = moduleNode.children.filter(
              (c) => c.type === 'page',
            ).length;

            return (
              <Link
                key={moduleNode.$id ?? moduleSlug}
                href={indexPage?.url ?? `/docs/knowledgebase/${moduleSlug}`}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-fd-border bg-fd-card p-6 transition-all hover:border-fd-primary/40 hover:shadow-lg hover:shadow-fd-primary/5"
              >
                <div
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${meta.accent} opacity-60`}
                />
                <div
                  aria-hidden
                  className={`mb-5 inline-flex size-10 items-center justify-center rounded-lg bg-gradient-to-br ${meta.accent} text-white shadow-sm`}
                >
                  <svg
                    className="size-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-fd-foreground">
                  {String(moduleNode.name ?? moduleSlug)}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-fd-muted-foreground">
                  {meta.blurb}
                </p>
                {meta.highlights.length > 0 ? (
                  <ul className="mt-4 space-y-1.5 text-sm text-fd-muted-foreground">
                    {meta.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <svg
                          aria-hidden
                          className="mt-0.5 size-4 shrink-0 text-fd-primary"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 10l4 4 8-8" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-6 flex items-center justify-between border-t border-fd-border pt-4 text-xs text-fd-muted-foreground">
                  <span>{pages} pages</span>
                  <span className="inline-flex items-center gap-1 text-fd-foreground/80 transition-colors group-hover:text-fd-primary">
                    Explore
                    <svg
                      aria-hidden
                      className="size-3.5 transition-transform group-hover:translate-x-0.5"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M4 10h12M12 5l5 5-5 5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
