# Screenshots — what exists, what is still to capture

Screenshots live in `public/kb/<section>/<name>.png` and are placed with the
`<Screenshot>` component. The rules for taking them are in `KB_STYLE_GUIDE.md` §4.

## How they are produced

1. Sign in to the reference academy and open the screen at **1512px wide**.
2. Capture the full window.
3. Run it through `scripts/shot.py` (kept with the authoring tools), which masks the
   signed-in person's name, address and avatar — these pages are published — and saves
   a PNG into `public/kb/<section>/`.
4. Reference it with `<Screenshot src="/kb/<section>/<name>.png" alt="…" caption="…" />`.

`node scripts/check-links.mjs` fails the build if a referenced screenshot is not on
disk, so a missing file cannot ship.

## Where to capture from

| Source | Use it for |
|---|---|
| The reference academy | Everything. It has real data, which is what makes a screenshot readable. |
| A local build of `main` | Screens newer than the reference academy's deploy. |

The reference academy runs slightly behind `main`. Anything added in the last fortnight
may not be there yet — capture those from a local build rather than faking them.

## Already captured

34 screenshots, all placed on a page. `check-links.mjs` fails the build if one goes
missing, so this list cannot silently rot.

| File | Screen |
|---|---|
| `account-people/roles-list.png` | The roles list |
| `account-people/sign-in.png` | The sign-in screen |
| `analytics/admin-dashboard.png` | The admin dashboard |
| `assessments/create-quiz-step-1.png` | Step 1 of the quiz builder |
| `assessments/question-type-picker.png` | The question type picker |
| `assessments/quiz-result.png` | A learner's quiz result, with attempts remaining |
| `certificates/certificate-templates-list.png` | The certificate templates list |
| `communication/campaign-audience.png` | Campaign step 2, estimated audience size |
| `communication/campaign-channels.png` | Campaign step 3, channel selection |
| `communication/campaign-review.png` | Campaign step 5, review and estimated cost |
| `communication/campaign-schedule.png` | Campaign step 4, schedule and sending options |
| `communication/new-campaign.png` | Campaign step 1, name and type |
| `communication/segments.png` | The built-in audiences, with live counts |
| `courses/choose-course-type.png` | The Choose Course Type dialog |
| `courses/cohorts-step.png` | The batch cards |
| `courses/content-bank.png` | The Content Bank |
| `courses/course-builder.png` | The builder, four tabs |
| `courses/course-settings.png` | The settings step |
| `courses/courses-list.png` | The course list |
| `courses/create-cohort.png` | Create New Cohort, upper half |
| `courses/create-cohort-schedule.png` | Create New Cohort, dates |
| `courses/create-course-step-1.png` | Step 1 of the course form |
| `courses/curriculum-item-menu.png` | The item ⋯ menu, open |
| `courses/learning-path-builder.png` | The path builder |
| `enrollment-access/enrollment-list.png` | The enrolment list |
| `enrollment-access/transfer-trail.png` | The Transfer Trail |
| `learner/learner-dashboard.png` | A learner's Overview |
| `progress-grading/grading-schemes-list.png` | The grading schemes list |
| `selling-payments/billing-overview.png` | Billing, Outstanding & at-risk |
| `selling-payments/emi-plans.png` | The EMI plans list |
| `selling-payments/pricing-list.png` | The pricing list |
| `settings/control-panel.png` | Control Panel, Platform Settings |
| `settings/integrations.png` | Integrations, Payment Gateways |
| `website/website-dashboard.png` | The Website dashboard |

## Still to capture

In rough order of how much they would help a reader.

| Screen | Page |
|---|---|
| Programme grading config form | `progress-grading/course-grading-setup` |
| The weights editor, totalling 100% | `progress-grading/weighted-grading` |
| A rendered transcript | `progress-grading/transcripts` |
| Alternative Assessment Groups dialog | `assessments/alternative-assessments` |
| A merit list | `assessments/merit-lists` |
| Assign Content Scope | `enrollment-access/partial-access` |
| Drip Schedule tab, strategies | `enrollment-access/drip-scheduling` |
| Progression roster | `enrollment-access/progression` |
| Certificate type, requirements and basis | `certificates/certificate-types` |
| The document builder, three panels | `certificates/designing-a-document` |
| Manual payment form | `selling-payments/manual-payments` |
| Progress analytics, Need attention | `analytics/progress` |
| The website block picker | `website/pages-and-blocks` |
| Theme panel, light and dark | `website/templates-and-themes` |
| The file manager | `files/uploading-files` |
| A learner taking a lesson | `learner/taking-a-lesson` |

### Never capture from a customer's installation

A local build carries whatever academy's data is loaded into it — that academy's name,
its logo, its course titles, its learners. A screenshot taken there shows a customer's
business on a page published under ours, and no amount of blurring fixes the course
titles and the branding.

**Capture from the reference academy only.** If a feature is too new to be there, the
page ships without a picture until the reference academy has the deploy. That rule has
no exceptions, including "just for now".

Four screenshots were taken from a local build and then removed for exactly this
reason — `courses/reported-problems`, `account-people/student-ids`,
`bookings/meeting-plans` and `search/search-basics` are waiting on the next deploy.

### Still blocked

| Screen | Page | Why |
|---|---|---|
| Report a problem dialog, learner side | `learner/report-a-problem` | Needs a learner account with an enrolment. The local admin account has none, and the reference academy is behind. |
| Meeting Schedules list | `bookings/managing-bookings` | **Deliberately not captured.** Every row is a real person's name, email, phone and the personal question they wrote. Masking it would leave nothing worth showing. |
| Analytics screens, grading weights editor | `analytics/*`, `progress-grading/weighted-grading` | The reference academy runs an older version; capture from local when convenient. |

## A note on the live session

Signing in to the reference academy holds for one batch of actions and then drops. Put
the sign-in, the navigation and the capture in a **single** browser batch; split across
two and the second lands on the login screen.

## What not to do

- **No red circles or arrows.** If something is hard to point at, say where it is in
  words.
- **No faked screens.** A feature too new to photograph gets a page without a picture.
- **No real people's names, emails or phone numbers.** The masking in `shot.py` covers
  the signed-in account; check the body of the screen as well — learner lists and
  assignment screens show real names and are usually not worth photographing at all.
