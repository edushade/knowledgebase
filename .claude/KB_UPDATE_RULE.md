# The standing rule: a change ships with its documentation

**A change that reaches `main` is not finished until the knowledge base says so.**

This file is the short version of how to honour that. The long version is
`.claude/KB_STYLE_GUIDE.md`, which governs how the pages are written.

---

## Why this rule exists

The knowledge base was written in April 2026 and last touched in June 2026. Between
June and November 2026 the product took **1,722 commits** across `backend`, `frontend`,
`website-builder-v2` and `packages`. Whole features arrived with no page at all —
analytics, enrollment transfers, semester progression, alternative assessments,
document design, student IDs, account merging, reported problems — while pages that
existed quietly went wrong: grading options that no longer match the screen, a
Subscriptions page for a menu item nobody can see.

Nobody decided that would happen. It happened because documenting was a separate job
that was always going to be done later. This rule makes it part of the same job.

---

## When it applies

Ask one question: **can a customer see the difference?**

| Change | Update the knowledge base? |
|---|---|
| New screen, tab, dialog or menu item | **Yes** |
| A button, field, column or option renamed | **Yes** — the docs quote these exactly |
| A default changed, an option added or removed | **Yes** |
| A rule changed (what counts as passing, who may enrol, when access opens) | **Yes** |
| A feature hidden, retired or made unreachable | **Yes** — stop documenting it |
| A customer-visible bug fixed where the docs described the broken behaviour | **Yes** |
| Refactor, test, performance, logging, infrastructure | No |
| An internal-only screen no customer reaches | No |

If you cannot decide, it applies.

---

## What to do

1. **Find the pages.** Search `content/docs/` for the screen's name, the button's old
   name, or the feature's noun. Most changes touch one or two pages; a new feature
   touches its section's `index.mdx` and `meta.json` too.
2. **Rewrite in place.** Never rename or delete a page file — those URLs carry search
   traffic. If a feature is gone, rewrite the page to say what replaced it.
3. **A new feature needs more than a paragraph.** It needs its concept page, its entry
   in the section index and `meta.json`, and — if a customer has to *do* something — a
   how-to page in `how-to/` with steps and a screenshot.
4. **Re-take the screenshot** if the screen in it no longer looks like that. A stale
   screenshot is worse than none: it tells the reader they are in the wrong place.
5. **Check the chain.** If your change makes an existing answer longer than five
   sentences, it has outgrown its accordion — move it to a how-to page and link it.
6. **Build before you push.** `npm run build` in `knowledgebase/` catches broken links
   and bad MDX.

---

## What "done" looks like

- [ ] Every affected page names the buttons, fields and options as the screen now does.
- [ ] A new screen has a page, a card in its section index, and a line in `meta.json`.
- [ ] A removed screen is no longer described as if it were there.
- [ ] Screenshots match the current build.
- [ ] `npm run build` passes in `knowledgebase/`.

---

## Reviewing someone else's change

A review of a customer-visible change asks the same question the author asked: can a
customer see the difference? If they can, and no documentation came with it, the change
is not ready — say so in the review, and name the page that needs to change.
