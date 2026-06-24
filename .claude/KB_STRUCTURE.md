# Edushade Knowledge Base — Target Structure (task-based, client-focused)

All paths are under `content/docs/`. Each folder has `index.mdx` + `meta.json`.
Root `meta.json` `pages` order (top-level sidebar):

```
["index",
 "---Teaching---", "courses", "enrollment-access", "progress-grading", "assessments", "certificates",
 "---Business---", "selling-payments", "website",
 "---Engage---", "communication", "community", "bookings",
 "---Platform---", "files", "search", "account-people"]
```

## courses/  (title: "Courses & Content", icon: BookOpen)
index, creating-a-course, course-structure, lesson-types, files-and-resources,
reusable-content, learning-paths, cohorts, instructors, publishing-and-catalog

## enrollment-access/  (title: "Enrollment & Access", icon: LockKeyhole)
index, how-learners-enroll, admin-and-bulk-enrollment, partial-access,
drip-scheduling, prerequisites, eligibility-rules, how-access-works-together

## progress-grading/  (title: "Progress & Grading", icon: LineChart)
index, progress-tracking, completion-rules, terms-and-periods, grading-schemes,
weighted-grading, marksheets, learning-streaks

## assessments/  (title: "Assessments & Quizzes", icon: ListChecks)
index, creating-quizzes, question-types, quiz-settings, quiz-availability,
taking-quizzes, grading-quizzes, proctoring, leaderboards, assignments, exams,
makeup-assessments, question-reports, quiz-analytics

## certificates/  (title: "Certificates", icon: Award)
index, certificate-requirements, issuing-certificates, verifying-certificates

## selling-payments/  (title: "Selling & Payments", icon: CreditCard)
index, products-catalog, pricing, bundles, subscriptions, installments,
coupons-and-offers, scholarships, checkout, payment-methods, refunds, revenue-reports

## website/  (title: "Website & Pages", icon: Globe)
index, pages-and-blocks, templates-and-themes, navigation-menus, forms-and-leads,
blog, seo, languages, versions-and-redirects, publishing

## communication/  (title: "Communication", icon: Megaphone)
index, announcements, notification-inbox, notification-preferences, channels,
campaigns, message-templates, audiences, push-notifications, quiet-hours,
delivery-and-analytics

## community/  (title: "Community & Feedback", icon: MessagesSquare)
index, discussions, comments, reviews-and-ratings, reactions

## bookings/  (title: "Bookings & Appointments", icon: CalendarClock)
index, meeting-plans, availability, booking-page, payments, integrations,
group-and-request-bookings, managing-bookings

## files/  (title: "Files & Media", icon: FolderOpen)
index, uploading-files, organizing-files, previewing-files, learner-uploads,
sharing-and-limits

## search/  (title: "Search & Discovery", icon: Search)
index, search-basics, filters, autocomplete, trending-and-popular, search-history

## account-people/  (title: "Account & People", icon: Users)
index, your-platform-settings, accounts-and-sign-in, verification,
profiles-and-devices, people-and-roles, support-login, categories-and-tags,
activity-history, security

---

## Notes
- The OLD folders (auth-module, audit-module, booking-module, comm-module,
  engagement-module, filemanager-module, misc-module, notification-module,
  quiz-module, search-module, tenant-module) are being REPLACED by the above and will be
  deleted at the end. tenant-module is deleted outright (no replacement).
- Homepage (`app/(home)/page.tsx`) and root `meta.json` are updated LAST, after all new
  folders exist, so the build never references a missing folder mid-flight.
