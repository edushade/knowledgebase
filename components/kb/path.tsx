import type { ReactNode } from 'react';

/**
 * Where to click, written the way the screen reads.
 *
 * `<Path>Courses > New Course</Path>` renders the trail as a single chip with
 * proper arrows, so a reader skimming a page can spot "where do I go?" without
 * reading the sentence around it. Separate the steps with `>`.
 */
export function Path({ children }: { children: ReactNode }) {
  const raw = typeof children === 'string' ? children : String(children ?? '');
  const parts = raw
    .split(/>|›|→/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <span className="inline-flex flex-wrap items-center gap-1 rounded-md border border-fd-border bg-fd-muted/60 px-2 py-0.5 align-middle text-[13px] font-medium text-fd-foreground">
      {parts.map((part, i) => (
        <span key={part + String(i)} className="inline-flex items-center gap-1">
          {i > 0 ? (
            <span aria-hidden className="text-fd-muted-foreground">
              ›
            </span>
          ) : null}
          <span>{part}</span>
        </span>
      ))}
    </span>
  );
}

/**
 * Who is allowed to do the thing this page describes.
 *
 * Shown as a small line under the page's intro. Keep the value to plain role
 * names the reader recognises — "Admin", "Instructor", "Learner".
 */
export function WhoCan({ roles }: { roles: string }) {
  return (
    <p className="not-prose my-4 flex flex-wrap items-center gap-2 text-[13px] text-fd-muted-foreground">
      <span className="font-medium text-fd-foreground">Who can do this:</span>
      {roles.split(',').map((role) => (
        <span
          key={role}
          className="rounded-full border border-fd-border bg-fd-card px-2 py-0.5 font-medium text-fd-foreground"
        >
          {role.trim()}
        </span>
      ))}
    </p>
  );
}
