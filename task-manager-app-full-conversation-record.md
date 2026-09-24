# Task Manager App — Complete Conversation Record

Every decision, clarification, and open question from the full design discussion, in the order they came up. Nothing summarized away — this is the raw record behind the polished spec PDFs.

---

## 1. Original idea
- A task managing website and app.
- Home page/main interface is a calendar view showing all tasks assigned to specific dates and times.
- Planned modules: fitness, pill reminder, payment reminder, daily expenditure calculator (which cumulates into a total expenditure calculator).
- Wants options to redirect into each individual app/module as needed.
- Wants to discuss and design this using information architecture principles.

## 2. Modules vs. calendar — first structural decision
- Fitness / Pills / Payments / Expenses are **separate modules**; the calendar just aggregates entries from them — not one unified "task" type.
- Early navigation idea: bottom header with ~4 options — pill reminder, editing the calendar, fitness goal setting, expense/ledger. *(Later revised — see Section 4.)*
- Expense module: tapping a specific date on the calendar shows how much was spent that day (auto-populated from ledger entries).
- Calendar month view should show a small column/summary at the end of the month displaying total spend for that month.

## 3. Pill module — medical ID concept
- Pill reminders should function like a medical ID: full drug info, dosage, expiry, so users can show doctors/pharmacists what they take.
- Wants auto-lookup of drug details by name/scan eventually.
- **Agreed:** start with manual entry (name, dosage, time, expiry, photo) as MVP; auto-lookup deferred to v2.

## 4. Navigation — revised
- Bottom nav finalized as: **Home** (calendar) / **Fitness** / **Reminders** (Pill + Payment + Appointment + Custom, each with its own icon) / **Expense** (ledger with categories).
- Reasoning: Pill and Payment are structurally the same object type (due date/time + mark-done action), differing only by domain — so they share a tab rather than each getting their own nav slot.

## 5. The "+" add flow
- Module-first: tap "+" → pick module → then see that module's categories. Never one flat combined list.
- Tapping a specific date on Home shows module options directly (Pill, Fitness, Payment, Appointment, Custom) with that date pre-filled.

## 6. Custom category
- Custom lets users add any freeform task and pick a custom icon from their emoji keyboard to represent it.
- Custom entries get their own tracking (not just record-and-remind) — progress/habit tracking wanted.
- Same-day rule: the same emoji can't appear twice as separate entries on one date. Reusing an emoji groups the new task under that emoji's bucket for that day; each grouped task must have a distinct timestamp.
- Calendar cell shows a grouped emoji once with a count badge (e.g. "🎸 ×3"); tapping expands the list with timestamps.
- Custom tracking is set per-item at creation as either a **streak/checklist** (did I do it today) or a **number** (how long/how much).

## 7. Payment ↔ Expense linking
- Payment reminders (paid and unpaid) show their amount in monthly spend totals.
- When marked paid, a Payment auto-creates a linked Expense entry (Bills category) to avoid double counting.
- User gets a toggle at creation ("count this toward my expenses?") to opt out per-payment.

## 8. Notifications — module-specific
- Notifications/reminders are module-specific rather than one universal setting:
  - Pill → times-per-day picker
  - Payment → days-before-due picker
  - Fitness / Custom → simple time picker

## 9. Onboarding — early version
- Forces new users through setting up at least 2 modules before giving a skip option.
- If the user's age is above 45, force them through all 4 modules.
- *(Refined later — see Section 15.)*

## 10. Fitness module
- Calendar shows **planned** workout days in advance, driven by goals — not retrospective-only.
- Wants AI integration to generate day-specific workout plans the user can then edit.
- Two user-controlled paths to build a plan:
  1. AI-assisted chatbox — gathers user details conversationally, generates workout routines (and originally diet plans too).
  2. Fully manual multi-day workout plan entry by the user.
- **Diet plan generation removed from scope** — chatbox covers workout routines only.
- AI chatbox proactively drafts a plan once it has enough info (fitness level, goal, equipment, days) rather than open-ended chat with no clear end; user can keep refining after the draft.
- **Plan vs. actual reconciliation:** once a user edits an AI-suggested workout, the edited version becomes the real plan (not the AI's original). Actual logged results are compared against that edited plan for goal/streak tracking.
- Deferred to v2: wearable/step-counter sync.

## 11. Reminders module — depth
- **Appointment** stays simple (title, location, time) — no extra fields like doctor name or maps link.
- **Recurrence** is fully user-defined: quick preset options (next day, 2 days after, after 3 days, same day next week, same day next month) *plus* full custom flexibility — arbitrary future occurrences on whichever specific dates the user wants (e.g. next month on the 2nd, then again 2 months later on the 4th).
- **Missed/overdue** items trigger escalated notifications by default, with a per-user toggle to switch that off.
- **Escalation ladder** (finalized):
  - Step 1 — normal notification at scheduled time.
  - Step 2 — stronger alert 5 minutes later.
  - Step 3 — 7 minutes after that (~12 min total) — distress notification sent to the linked caregiver.
  - Missed pills specifically are visible to the caregiver.

## 12. Home calendar — visual system
- Month view is the default/landing view; dates dive into detail on tap rather than showing icons in the month grid.
- Dates with tasks shown as a colored square/shape, not icons. Color reflects busyness:
  - 0 tasks → translucent/neutral (no color)
  - 1–4 tasks → green
  - 5–7 tasks → orange
  - 8+ tasks → red
- Busy days (red) get rougher/sharper edges; light-task days get softer/rounded edges — a shape-based accessibility cue alongside color (for color-blind users).
- After each month, a gap/section shows weekly expense breakdowns (e.g. days 1–7 total spend).
- Day cells stay clean — density color/shape only, no in-cell numbers. Daily expense total is viewed by tapping into that date, not shown inside the cell.

## 13. Onboarding — refined
- The 2 forced modules are **fixed as Pill + Payment** (the highest-consequence ones), not user-chosen.
- Forced modules can vary by account/profile type based on real-life risk assessment (not necessarily identical for a child profile vs. an elderly profile vs. a self profile).
- Login/signup page collects: name, age, location permission, phone number, email.
- Separate setup path offered for "for a child" or "for an elderly person" (caregiver setting the app up on someone else's behalf).
- The forced module walkthrough offers 2 choices: enter real data, or watch a pre-recorded demo video.

## 14. Caregiver monitoring — core design
- Monitoring option exists for child/elderly profiles set up by another person.
- If the monitored person is above 18, monitoring has restrictions to respect that person's privacy.
- Caregiver sees **full detail** (all medication names, dosages, expiry, etc.), not just a status signal.
- The monitored person can always see that they are being watched — monitoring is never silent.
- The monitored person must **approve** monitoring before it starts — never silently added by the caregiver.
- Caregiver access must be enabled by **both people** (mutual consent) to begin.

## 15. Caregiver monitoring — revocation & teardown
- The caregiver can revoke access **anytime**.
- The elderly person can also revoke access independently, via either:
  - A 6-digit code sent to the caregiver's phone (the mutual/routine path), or
  - Stating a reason via mail/email and revoking that way (the one-sided path — doesn't need the caregiver's cooperation).
- A child profile above 18 can revoke access themselves; a child profile below 18 cannot revoke access once granted.
- There's an option to change/replace the caregiver (e.g. if the current caregiver decides to quit).
- Historical data is preserved when caregivers change; the elderly person or the Admin can assign a new caregiver.
- When the Admin revokes a caregiver's access, that access ends **immediately** and all data is wiped from the former caregiver's view/account — no lingering historical access.

> **Design note flagged during discussion:** the original rule (elderly person cannot revoke, only caregiver can) was identified as an autonomy problem — an asymmetry where the person being watched had no way out. This was resolved by adding the independent elderly-person revocation path above (6-digit code / written reason), which doesn't depend on the caregiver's cooperation.

## 16. App architecture — User / Admin / Caregiver roles
- The app has 3 versions: **User**, **Caregiver**, and **Admin**.
- **User** = the person themselves — an elderly person using their own account and a regular user are the same role.
- **Admin** = the role when someone is overseeing another person's account (e.g. parents/children of elderly people, or a common user managing things).
- **Caregiver** = a role the Admin assigns to someone (could be the Admin themselves, or a different person, e.g. a hired nurse) specifically to monitor the elderly person day-to-day.
- Admin is the overall authority over the account, but the User (elderly person) can take back control in certain ways when needed. **Exact scope of this override is not yet fully specified — open item.**
- Admin-level access can also be revoked by the user, using the same mechanism as caregiver revocation — via mail/written reason, or a 6-digit code entered on the admin's device.

## 17. Offline & connectivity handling
- Reminders still fire **locally** on the elderly/monitored person's phone even with no network — the schedule doesn't depend on connectivity.
- The caregiver only receives missed-dose/distress data once connectivity is restored, at which point all queued data syncs at once.
- A separate notification tells the caregiver that the monitored person's phone is offline.
- The caregiver can see scheduled/upcoming reminders in real time (pre-known data) but cannot see completion status (done/not done) until connectivity is restored.
- Offline detection is **real-time** — the moment a monitored phone goes offline, a notification is sent on the spot to the caregiver's phone, not retroactively after reconnection.

## 18. Timezone handling
- Reminders and escalation timing run according to the **monitored/user's own timezone**, not the caregiver's. The caregiver's app only needs to display timestamps intelligibly across timezones.

## 19. Later additions (final round)
- **Search:** a search option is added within each respective module (Pill, Payment, Fitness, Expense, etc.) — not just one global search.
- **Streaks:** a missed day reduces the streak by 1 unit as a penalty, rather than fully resetting it to zero.
- **Accessibility:** settings menu provides editable text color, font, and font size.
- **Accessibility/localization:** an AI voice assistant with multilanguage understanding and voice recognition will be provided. *(Flagged as a major v2-scope item — bigger than any other deferred feature in this spec.)*

## 20. Open items — not yet resolved
- **User override scope:** Admin holds overall authority, but the User can reportedly take back control in certain ways — exact mechanics undefined.
- **Elderly-simplicity vs. system depth:** needs a UX pass once real screens exist, to confirm the simple path (add a pill, view calendar, get reminded) never requires touching AI plans, emoji grouping, or multi-role account management.
- **Notification delivery engine:** escalation timing is defined; the underlying push infrastructure to deliver it reliably is still a build item.
- **Data security/encryption:** not an IA concern, but flagged so it isn't forgotten given the medical and financial data involved — needs an engineering-level design pass.
- **Account/relationship full exit:** whether someone set up under Admin oversight can later fully detach and become a self-managing User was raised as a gap but not resolved.

## 21. Deferred / v2 scope — consolidated
| Item | Why deferred |
|---|---|
| Pill drug-database auto-lookup (name/scan → auto-filled details) | Requires integrating an external medicine database — a real subsystem, not a form field. |
| Fitness wearable/step-counter sync | Real integration project (Google Fit / Apple Health / device APIs). |
| Multi-profile / multi-role permission system | Core privacy/consent rules are defined, but the full permission-scoping engine is bigger than a first release. |
| AI voice assistant + multilingual voice recognition | Substantial standalone AI/speech engineering project. |

## 22. Deliverables produced during this conversation
- **v1 spec PDF** — initial structure: navigation, modules, add flow, Reminders, Expense, Home calendar basics, onboarding (early version), Fitness (open questions).
- **v2 spec PDF** — added: full Fitness module, Reminders depth (recurrence, escalation), Home calendar visual system, onboarding (refined), caregiver monitoring model, consolidated open risks & v2 scope.
- **v3 spec PDF** — added: User/Admin/Caregiver role architecture, offline handling, timezone handling, full revocation/teardown model (incl. autonomy safeguard), caregiver reassignment, two lifecycle flowcharts (missed-reminder escalation; caregiver access lifecycle).
- **v4 spec PDF** — added Section 16, "Full app flow": four new diagrams (entry flow, add-entry flow, Fitness plan flow, Payment→Expense link flow) plus references to the two existing lifecycle diagrams — six flows covering the app end to end.
- **This document** — the complete unabridged record behind all four spec versions.
