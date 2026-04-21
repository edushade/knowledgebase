import type { ReactNode } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      sidebar={{
        banner: (
          <Link
            key="sidebar-banner"
            href="/docs/knowledgebase"
            className="group flex items-center gap-2.5 rounded-lg border border-fd-border bg-gradient-to-br from-brand-500/10 via-fd-card to-fd-card p-3 transition-colors hover:border-brand-500/40 hover:bg-fd-accent/50"
          >
            <span
              aria-hidden
              className="inline-flex size-8 items-center justify-center rounded-md bg-brand-500 text-white shadow-sm shadow-brand-500/40 transition-transform group-hover:scale-105"
            >
              <BookOpen className="size-4" />
            </span>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-semibold text-fd-foreground">
                Knowledge Base
              </span>
              <span className="truncate text-[11px] text-fd-muted-foreground">
                EduShade platform docs
              </span>
            </div>
          </Link>
        ),
        footer: (
          <div
            key="sidebar-footer"
            className="flex w-full items-center justify-between text-[11px] text-fd-muted-foreground"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1 transition-colors hover:text-fd-foreground"
            >
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-emerald-500"
              />
              edushade.com
            </Link>
            <span>v1.0</span>
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
