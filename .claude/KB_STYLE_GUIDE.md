# Edushade Knowledge Base — Authoring Style Guide (MANDATORY)

This guide governs every page in the Edushade Knowledge Base. The audience is the
**Edushade customer** — a course-business owner, their admins, their instructors, and
their learners. They are **not technical**. Write for a smart person who has never
written code, never heard of an API, and does not care how the software is built.

If a sentence would only make sense to an engineer, it does not belong here.

---

## 1. The golden rules (never break these)

### 1.1 NEVER mention multi-tenancy — in any form
This product is sold as the customer's **own** branded platform (white-label). The
customer must never learn that the system is shared infrastructure.

**Banned words and ideas — never write any of these, anywhere:**
`tenant`, `multi-tenant`, `multi-tenancy`, `tenant_id`, `tenant isolation`,
`organization isolation`, `per-tenant`, `tenant-scoped`, `white-label`, `whitelabel`,
`system default tenant`, "scoped to a tenant", "each tenant", "your tenant".

**Instead, always say:** "your platform", "your site", "your academy", "your account",
"your organization", or just describe the thing directly (e.g. "your categories",
"your learners"). Everything in the docs is implicitly about the reader's own platform.

> If you are ever tempted to explain *why* data is separated or *how* isolation works —
> stop. Delete the sentence. The customer's platform is simply *theirs*; there is
> nothing to explain.

### 1.2 No technical internals — ever
Never mention or hint at any of the following:
- **API / web internals:** endpoints, URLs like `/v1/...`, HTTP methods (`GET`/`POST`),
  JSON, payloads, status codes (401, 404), webhooks (describe the *capability*, e.g.
  "connect another app", not the mechanism), tokens, JWT, `localStorage`, cookies,
  sessions-as-tokens, refresh tokens, OAuth flow internals.
- **Code / infra:** file names, service names (`auth-service`, `learning-service`…),
  programming languages (Go, Gin), databases (PostgreSQL, Redis), search engines
  (Typesense), pub/sub, queues, microservices, "backend", "frontend", caching,
  fail-closed/fail-open, idempotency.
- **Internal field names:** never write database column names or flags like
  `is_learner`, `locked_until`, `enrollment_open`, `course_type`, `program_type`,
  `max_enrollments`. Describe the *setting in plain words* ("the **Enrollment** toggle",
  "the **seat limit**").
- **Admin URL paths:** never write `/admin/users/{id}/edit`. Say *where in the UI*:
  "in **Admin → Users**, open a learner and click **Edit**".

When the underlying behavior matters to the user, translate it into what they see and
do — not how it works.

### 1.3 Only document what actually exists (accuracy guardrails)
Do **not** invent features, and respect these confirmed corrections:
- **Quizzes have NO IELTS / band-score / Listening-Reading-Writing-Speaking features.**
  Never claim IELTS support.
- **Selling is single-item today.** There is **no shopping cart, no multi-item orders,
  no order numbers, no inventory/stock, no shipping, no tax engine, no wishlist, no
  product reviews storage, no gift cards.** A buyer purchases one thing per checkout.
  Do not document any of the missing items as if they exist.
- **Coupons are entered manually at checkout** — there is no automatic apply.
- **Recurring notices are not functional** — do not document recurring announcements.
- **Notice board delivery is in-app only** (notifications module handles email/SMS/push).
- **Transcripts/marksheets are an admin tool** — learners do not self-download a transcript.
- **Access/eligibility rules do not show the learner a detailed "why"** — restricted
  content simply does not appear. Note this honestly where relevant.
- If you are unsure whether something exists, leave it out rather than guess.

---

## 2. Voice & tone

- **Second person, friendly, direct.** "You", "your learners". Warm but efficient.
- **Plain English. Short sentences.** Prefer a 12-word sentence over a 30-word one.
- **Task-first.** Lead with what the reader wants to accomplish.
- **No hype, no marketing fluff, no buzzwords.** No "robust", "powerful", "seamless",
  "leverage", "cutting-edge", "enterprise-grade", "revolutionize".
- **Define any necessary term in one short clause** the first time it appears.
- **Concrete examples** beat abstract description ("for example, release one module
  every Monday").
- Indian/Bangladeshi English is fine; the platform is Bangladesh-first. Use simple,
  globally understandable wording. Currency examples can use ৳ / Taka where natural.

---

## 3. Page structure (use this shape)

Every page is a `.mdx` file with frontmatter:

```mdx
---
title: "Short, Clear Page Title"
description: "One sentence a non-technical person understands, for search and previews."
---
```

(Do **not** add `module:`, `order:`, `feature:` keys — ordering is controlled by
`meta.json`.)

Then the body, roughly in this order (adapt as needed — not every page needs every part):

1. **One- to three-sentence intro** — what this is and why it helps. No heading.
2. **"What you can do" / "What it does"** — a short bullet list or small table of
   capabilities, in plain language.
3. **Step-by-step "how to"** — numbered lists. Use real button/menu names in **bold**
   (e.g. **Save**, **Publish**, **Admin → Courses → New Course**). Keep steps short.
4. **What the learner sees** — when admin actions change the learner experience,
   describe it from the learner's side. This is highly valued.
5. **Tips / Good to know / Common questions** — short practical notes, gotchas,
   recommendations.

Keep pages focused. If a topic gets long, split it into sibling pages.

---

## 4. Allowed MDX components (and nothing exotic)

Use standard Markdown plus these Fumadocs components (already globally available):

- **Tables** — great for "setting → what it does" and option lists.
- **`<Callout type="info">…</Callout>`** — also `type="warn"`, `type="error"`,
  `type="success"`. Use for tips, warnings, and "good to know". Keep them short.
- **`<Cards>` / `<Card title="…" description="…" href="/docs/knowledgebase/…" />`** —
  use on overview/index pages to link to child pages.

Do **not** use `<Steps>`, `<Tabs>`, `<TypeTable>`, JSX imports, or any component not
listed above (they may not be registered and will break the build). Numbered Markdown
lists are the way to show steps.

---

## 5. Links & file conventions

- File names: **kebab-case**, `.mdx` (e.g. `drip-scheduling.mdx`).
- Cross-link generously with absolute doc paths:
  `[Drip scheduling](/docs/knowledgebase/enrollment-access/drip-scheduling)`.
- Every folder has a `meta.json`:
  ```json
  {
    "title": "Courses & Content",
    "icon": "BookOpen",
    "defaultOpen": true,
    "pages": ["index", "creating-a-course", "..."]
  }
  ```
  `icon` is a **lucide-react** icon name (e.g. `BookOpen`, `GraduationCap`,
  `CreditCard`, `Globe`, `Megaphone`, `MessagesSquare`, `CalendarClock`, `FolderOpen`,
  `Search`, `Users`, `Award`, `ListChecks`, `LockKeyhole`, `LineChart`).
- Each folder has an `index.mdx` overview page that introduces the section and links to
  its pages (use `<Cards>`).

---

## 6. Preferred vocabulary (internal term → what to write)

| Internal / technical | Write this instead |
|---|---|
| tenant / your tenant | your platform / your academy / your account |
| learner / user / `is_learner` | learner (or "student") |
| instructor / `is_instructor` | instructor (or "teacher") |
| admin / `is_admin` | admin (or "you", for the owner) |
| RBAC / roles & permissions | roles & permissions (keep simple: "what each team member can do") |
| enrollment | enrollment (fine) |
| program (course/path/cohort) | "a course, learning path, or cohort" (say the real type) |
| curriculum tree / curriculum item | course content / lessons and sections |
| drip schedule | drip scheduling / scheduled content release |
| completion condition | completion rule |
| access rule / "Prerequisite" tab | eligibility rules / who can access |
| prerequisite (completion-based drip) | prerequisite (must finish X before Y) |
| breakpoint | term / period (e.g. semester) |
| transcript | marksheet / transcript / grade report |
| scope (enrollment scope) | partial access (e.g. "Semester 1 only") |
| provider (notifications) | sending service / connected service |
| segment | audience |
| facet | filter |

---

## 7. Quality bar

Before finishing a page, check:
- [ ] Zero banned words (section 1.1) — search your text for "tenant".
- [ ] Zero technical internals (section 1.2) — no endpoints, files, field names, infra.
- [ ] Every claim is something the investigation confirmed exists (section 1.3).
- [ ] A non-technical reader could follow every step.
- [ ] Frontmatter present; links valid; uses only allowed components.
