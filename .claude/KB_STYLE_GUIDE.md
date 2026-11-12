# Edushade Knowledge Base — Authoring Style Guide (MANDATORY)

This guide governs every page in the Edushade Knowledge Base. The audience is the
**Edushade customer** — a course-business owner, their admins, their instructors, and
their learners. They are **not technical**. Write for a smart person who has never
written code, never heard of an API, and does not care how the software is built.

If a sentence would only make sense to an engineer, it does not belong here.

---

## 1. The golden rules (never break these)

### 1.1 NEVER mention multi-tenancy — in any form
This product is sold as the customer's **own** branded platform. The customer must never
learn that the system is shared infrastructure.

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
  programming languages, databases, search engines, pub/sub, queues, microservices,
  "backend", "frontend", caching, fail-closed/fail-open, idempotency.
- **Internal field names:** never write database column names or flags like
  `is_learner`, `locked_until`, `enrollment_open`, `course_type`, `program_type`,
  `max_enrollments`. Describe the *setting in plain words* ("the **Enrollment Open**
  toggle", "the **Maximum Enrollments** box").
- **Admin URL paths:** never write `/admin/users/{id}/edit`. Say *where in the UI*
  using the `<Path>` component: `<Path>People > All Users</Path>`, then "open a learner
  and click **Edit**".

When the underlying behavior matters to the user, translate it into what they see and
do — not how it works.

### 1.3 Only document what actually exists (accuracy guardrails)

**The rule: every claim on a page must be traceable to something checked.** Before you
write a page, you must have (a) read the screen's own code for its labels and options,
or (b) opened the screen on the reference site — preferably both. If you cannot confirm
it, leave it out. A missing paragraph is a small problem; a wrong one destroys trust in
every other page.

**Three things are easy to get wrong, so check them every time:**

1. **A control that exists in the code may be commented out.** Commented-out UI is not
   shipping. (Pass Mark and Password Protection on course settings are commented out —
   do not document them.)
2. **A page that exists may not be reachable.** If nothing in the menus leads to a
   screen, the reader cannot use it. Say so, or leave the page out.
3. **The reference site runs slightly behind the current build.** Something absent there
   may still be shipping. Trust the current code for *what exists*; trust the reference
   site for *what it looks like*.

**Confirmed corrections — do not undo these:**
- **Quizzes have NO IELTS / band-score features.** Never claim IELTS support.
- **Selling is single-item today.** There is **no shopping cart, no multi-item orders,
  no inventory/stock, no shipping, no tax engine, no wishlist, no gift cards.** A buyer
  purchases one thing per checkout.
- **Coupons are entered manually at checkout** — there is no automatic apply.
- **Recurring notices are not functional** — do not document recurring announcements.
- **Noticeboard delivery is in-app only** (notifications handle email/SMS/push).
- **Marksheets and transcripts are an admin tool** — learners do not self-serve one.
- **Access and eligibility rules do not show the learner a detailed "why"** — restricted
  content simply does not appear. Note this honestly where relevant.
- **Learner-to-learner messaging is not switched on.** The learner menu has no Message
  item. Do not document chat, servers, channels or direct messages.
- **Subscriptions exist but are not in the Billing menu.** Document subscription
  *pricing* where it is set; do not send readers to a menu item that is not there.

---

## 2. Voice & tone

- **Second person, friendly, direct.** "You", "your learners". Warm but efficient.
- **Plain English. Short sentences.** Prefer a 12-word sentence over a 30-word one.
- **Task-first.** Lead with what the reader wants to accomplish.
- **No hype, no marketing fluff, no buzzwords.** No "robust", "powerful", "seamless",
  "leverage", "cutting-edge", "enterprise-grade", "revolutionize", "simply", "just".
- **Define any necessary term in one short clause** the first time it appears.
- **Concrete examples** beat abstract description ("for example, release one module
  every Monday").
- **Never say a thing is easy.** If it were, the reader would not be here.
- Indian/Bangladeshi English is fine; the platform is Bangladesh-first. Use simple,
  globally understandable wording. Currency examples can use ৳ / Taka where natural.

---

## 3. The two page shapes

Every page is one of two shapes. Pick one before you start writing.

### 3.1 A **concept page** — "what this is and how it behaves"

Answers *what is this, what are my options, what will happen*. Lives in a feature
section (`courses/`, `progress-grading/`, …).

```mdx
---
title: "Grading Schemes"
description: "One sentence a non-technical person understands."
---

<intro: one to three sentences, no heading>

<WhoCan roles="Admin" />

## What a grading scheme does
## Setting it up            ← short; the long version is a how-to page
## What the learner sees
## Good to know
## Common questions         ← <Accordions>, each answer 1–5 sentences
```

### 3.2 A **how-to page** — "do this one task, start to finish"

Answers *how do I actually do it*. One task per page. Numbered steps with real button
names and at least one screenshot.

Most how-to pages live in `how-to/`. The exception is a task whose URL a feature section
already owns — `courses/creating-a-course` is the walkthrough for creating a course and
keeps that address. Do not duplicate it under `how-to/`; link to it from the how-to
index instead.

```mdx
---
title: "How to create a course"
description: "..."
---

<one-sentence promise: what you will have at the end>

<WhoCan roles="Admin, Instructor" />

**Before you start** — what must already exist.

<Steps>
<Step>### Open the new course form …</Step>
…
</Steps>

## What happens next
## If something goes wrong    ← the two or three real failure modes
## Related questions          ← links onward to more how-to pages
```

### 3.3 The question chain (this is the house style)

A concept page must never swallow a long procedure, and a how-to page must never
swallow a second task. They hand off to each other:

> **Concept page** → its *Common questions* → a question whose honest answer is long
> → **a how-to page of its own** → its *Related questions* → further how-to pages.

Keep going until nothing is left unexplained. The rules:

- An answer that fits in **five sentences** stays in the accordion.
- An answer that needs **steps, a screenshot, or a decision table** becomes a how-to page
  and the accordion holds a two-sentence summary plus the link.
- **Never leave a dead end.** Every how-to page ends with at least two onward links.
- **Never link to a page that does not exist.** Write the destination, or do not link.

---

## 4. Screenshots

Screenshots are part of the documentation, not decoration. A reader who cannot find a
button is stuck no matter how good the sentence is.

**Use the `<Screenshot>` component:**

```mdx
<Screenshot
  src="/kb/courses/choose-course-type.png"
  alt="The Choose Course Type dialog, with Self Paced and Cohort-Based side by side"
  caption="Pick the type first — it decides how many steps the rest of the form has."
/>
```

Rules:

- **One screenshot per step that is hard to find**, not one per step. A form everyone
  can read does not need a picture; a dialog hidden behind a three-dot menu does.
- **Capture the real product**, signed in to the reference academy, at 1512px wide.
- **`alt` describes what is on screen** for someone who cannot see it. **`caption` says
  what to notice** — never repeat the sentence above the image.
- **Never annotate with red circles.** If a thing is hard to point at, say where it is
  in words ("top right, next to **Save Draft**").
- **No real people's names, emails or phone numbers** in a screenshot. The reference
  academy's seeded demo names are fine.
- Files live in `public/kb/<section>/<name>.png`, kebab-case.
- If a feature is too new to appear on the reference site, write the page without a
  screenshot rather than faking one.

---

## 5. Allowed MDX components

Standard Markdown plus these, all registered in `components/mdx.tsx`:

| Component | Use it for |
|---|---|
| `<Callout type="info\|warn\|error\|success">` | a tip, a warning, a "good to know" |
| `<Cards>` / `<Card title description href>` | linking onward from an index page |
| `<Accordions type="single">` / `<Accordion title>` | the *Common questions* block |
| `<Steps>` / `<Step>` | a numbered walkthrough on a how-to page |
| `<Screenshot src alt caption>` | a picture of a real screen |
| `<Path>People > All Users</Path>` | where to click, as one chip |
| `<WhoCan roles="Admin, Instructor" />` | who is allowed to do this |
| `<Tabs>` / `<Tab>` | the same task done two ways (use sparingly) |
| Tables | "setting → what it does" and option lists |

Do **not** import anything, and do not use components outside this list.

Inside `<Steps>`, each `<Step>` starts with a `###` heading — that heading is the step's
name, and it is what shows in the page's own table of contents.

---

## 6. Links & file conventions

- File names: **kebab-case**, `.mdx` (e.g. `drip-scheduling.mdx`).
- **Never rename or delete an existing page's file.** These URLs carry real search
  traffic. Rewrite a page in place; add new pages beside it.
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
  `icon` is a **lucide-react** icon name.
- Each folder has an `index.mdx` overview that introduces the section and links to its
  pages with `<Cards>`.

---

## 7. Preferred vocabulary (internal term → what to write)

| Internal / technical | Write this instead |
|---|---|
| tenant / your tenant | your platform / your academy / your account |
| user / `is_learner` | learner (or "student") |
| instructor / `is_instructor` | instructor (or "teacher") |
| admin / `is_admin` | admin (or "you", for the owner) |
| RBAC | roles & permissions ("what each team member can do") |
| program (course/path/cohort) | programme — or name the real type |
| curriculum tree / curriculum item | course content / lessons and sections |
| drip schedule | drip scheduling / scheduled content release |
| completion condition | completion rule |
| access rule / "Prerequisite" tab | eligibility rules / who can access |
| prerequisite (completion-based drip) | prerequisite (must finish X before Y) |
| breakpoint | term / semester |
| transcript | marksheet / transcript / grade report |
| scope (enrollment scope) | partial access (e.g. "Semester 1 only") |
| provider (notifications) | sending service / connected service |
| segment | audience |
| facet | filter |
| attempt | attempt (fine) |
| entity type | what it applies to |

---

## 8. Quality bar

Before finishing a page, check:
- [ ] Zero banned words (§1.1) — search your text for "tenant".
- [ ] Zero technical internals (§1.2) — no endpoints, files, field names, infra.
- [ ] Every button, field and option name matches the product **exactly**, including
      capitalisation (§1.3).
- [ ] No commented-out or unreachable feature is documented as shipping.
- [ ] A non-technical reader could follow every step without guessing.
- [ ] The page is one shape (§3), not a hybrid.
- [ ] Every long answer became a how-to page; every how-to page links onward.
- [ ] Frontmatter present; every internal link resolves to a page that exists.
- [ ] Screenshots have real `alt` text and a caption that adds something.

---

## 9. Keeping this true (the standing rule)

**A change that reaches `main` is not finished until the knowledge base says so.**

When anything ships in `backend`, `frontend`, `website-builder-v2` or `packages` that a
customer can see — a new screen, a renamed button, a changed default, a removed option —
the same work updates the pages that describe it. See `.claude/KB_UPDATE_RULE.md` for
how to find the affected pages and what counts as done.
