# Edushade Knowledge Base — Structure

All paths are under `content/docs/`. Each folder has `index.mdx` + `meta.json`.
196 pages across 18 sections.

**Existing folders and page slugs are never renamed.** They carry search traffic that
took months to earn (see `lib/feature-pages.ts`). New material is added beside them.

Root `meta.json` order:

```
["index",
 "---Start here---", "start",
 "---Teaching---", "courses", "enrollment-access", "progress-grading", "assessments", "certificates",
 "---Business---", "selling-payments", "website",
 "---Engage---", "communication", "community", "bookings",
 "---Insights---", "analytics",
 "---Platform---", "account-people", "settings", "files", "search",
 "---For learners---", "learner",
 "---Step by step---", "how-to"]
```

---

## start/ — "Start Here" (Rocket) — 7
index, what-you-can-build, admin-tour, learner-tour, launch-checklist, who-does-what,
glossary

## courses/ — "Courses & Content" (BookOpen) — 17
index, creating-a-course, course-types, course-settings, publishing-and-catalog,
course-structure, curriculum-builder, lesson-types, files-and-resources, content-bank,
reusable-content, importing-and-exporting, cohorts, terms-and-breakpoints,
learning-paths, instructors, reported-problems

## enrollment-access/ — "Enrollment & Access" (LockKeyhole) — 12
index, how-learners-enroll, admin-and-bulk-enrollment, enrollment-windows,
how-access-works-together, partial-access, drip-scheduling, prerequisites,
eligibility-rules, transfers, progression, resetting-progress

## progress-grading/ — "Progress & Grading" (LineChart) — 15
index, progress-tracking, completion-rules, learning-streaks, grading-schemes,
course-grading-setup, weighted-grading, rounding-and-precision, retakes-and-replacement,
gpa-and-results, terms-and-periods, learner-grades, transcripts, marksheets,
assessment-report

## assessments/ — "Assessments & Quizzes" (ListChecks) — 20
index, creating-quizzes, question-types, question-bank, quiz-settings, quiz-availability,
taking-quizzes, attempts-and-retakes, reschedules, exams, proctoring, makeup-assessments,
alternative-assessments, assignments, assignment-submissions, grading-quizzes,
quiz-analytics, question-reports, merit-lists, leaderboards

## certificates/ — "Certificates & Documents" (Award) — 8
index, certificate-types, certificate-requirements, issuing-certificates,
verifying-certificates, certificate-templates, transcript-designs, designing-a-document

## selling-payments/ — "Selling & Payments" (CreditCard) — 15
index, pricing, installments, subscriptions, bundles, products-catalog,
coupons-and-offers, scholarships, scholarship-applications, checkout, payment-methods,
manual-payments, transactions, refunds, revenue-reports

## website/ — "Website & Pages" (Globe) — 10
index, pages-and-blocks, templates-and-themes, navigation-menus, languages, blog, seo,
forms-and-leads, publishing, versions-and-redirects

## communication/ — "Communication" (Megaphone) — 11
index, channels, notification-preferences, quiet-hours, campaigns, audiences,
message-templates, announcements, delivery-and-analytics, notification-inbox,
push-notifications

## community/ — "Community & Feedback" (MessagesSquare) — 5
index, discussions, comments, reactions, reviews-and-ratings

## bookings/ — "Live Sessions & Events" (CalendarClock) — 10
index, meeting-plans, availability, booking-page, group-and-request-bookings,
managing-bookings, payments, integrations, events, event-participants

## analytics/ — "Analytics & Reports" (BarChart3) — 10
index, dashboard, programmes, enrollments, progress, learners, grades, certificates,
instructors, course-statistics

## account-people/ — "People & Access" (Users) — 14
index, adding-people, people-and-roles, merging-accounts, student-ids,
accounts-and-sign-in, verification, security, profiles-and-devices, activity-history,
privacy-and-consent, support-login, your-platform-settings, categories-and-tags

## settings/ — "Settings" (Settings) — 4
index, control-panel, integrations, holidays

## files/ — "Files & Media" (FolderOpen) — 7
index, uploading-files, organizing-files, previewing-files, sharing-and-limits,
learner-uploads, video-playback

## search/ — "Search & Discovery" (Search) — 6
index, search-basics, autocomplete, filters, trending-and-popular, search-history

## learner/ — "The Learner Experience" (GraduationCap) — 13
index, learner-dashboard, my-courses, taking-a-lesson, saved, assignments, exams,
results-and-certificates, my-calendar, notices-and-notifications, payment-history,
profile-and-settings, report-a-problem

## how-to/ — "How-To Library" (Wrench) — 11
index, set-up-email, launch-a-batch, set-up-grading, sell-by-semester, run-an-exam,
publish-results, fix-a-wrong-answer-key, move-a-learner, bring-back-learners,
chase-overdue-payments

---

## Notes on retitled sections

| Folder | Was | Now | Why |
|---|---|---|---|
| `account-people` | Account & People | People & Access | Platform configuration moved to `settings/`. |
| `bookings` | Bookings & Appointments | Live Sessions & Events | It absorbed the Events pages. |
| `certificates` | Certificates | Certificates & Documents | It absorbed the document builder and transcript designs. |

Slugs are unchanged in every case.

## Pages rewritten to correct a false claim

| Page | What it said | What is true |
|---|---|---|
| `assessments/proctoring` | Proctoring features | There is no proctoring. The page now covers what *is* available for exam integrity. |
| `certificates/verifying-certificates` | Verifiable certificates | There is no public verification page. |
| `selling-payments/subscriptions` | A subscriptions feature | Not a payment mode, and not in the menu. Limited access is the supported shape. |
| `communication/announcements` | Announcements | Notices are in-app only, and recurring notices are not functional. |

## Tooling

| Script | What it does |
|---|---|
| `scripts/check-links.mjs` | Fails if any internal link, screenshot or `meta.json` entry does not resolve. Run before every push. |
| `scripts/shot.py` | Turns a browser capture into a published screenshot, masking the signed-in account. |
| `scripts/extract-ui.mjs` | Pulls the user-visible strings out of a slice of the product, so a page can quote labels exactly. |

See also `KB_STYLE_GUIDE.md`, `KB_UPDATE_RULE.md` and `KB_SCREENSHOTS.md`.
