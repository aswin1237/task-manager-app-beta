# Task Manager App — Information Architecture Spec (v1 Baseline)

> ⚠️ **Note:** This document represents the initial **v1 baseline specification**. For the complete, unabridged specification with all 16 sections, 6 system flows, role permissions, and escalation ladders, see the **[Master Information Architecture Specification (v4.1)](INFORMATION_ARCHITECTURE_MASTER_SPEC.md)**.

## 1. Core concept
A calendar-centric task manager where the Home screen is a live calendar, and four separate life-domain modules feed into it: **Fitness, Reminders (Pill / Payment / Appointment / Custom), and Expense**. The calendar is a pure aggregator — it displays and previews, it doesn't own the underlying data.

## 2. Navigation structure
Bottom nav, 4 tabs:

| Tab | Role |
|---|---|
| **Home** | Calendar view. Aggregates and previews entries from all modules. |
| **Fitness** | Workout logs + goals. |
| **Reminders** | Pill, Payment, Appointment, and Custom reminders — grouped under one tab, each with its own icon. |
| **Expense** | Spending ledger, categorized, rolls up into daily/weekly/monthly totals. |

**Why merged, not 5+ tabs:** Pill and Payment reminders are functionally the same object type (a due date/time + a "mark done" action) — domain differs, structure doesn't. Merging keeps the nav uncluttered (Principle of Choices) while icons preserve visual distinctness per entry.

## 3. The "+" add flow (module-first)
- Tapping "+" globally → shows module picker first (Fitness / Reminders / Expense), then that module's own categories. Never one flat combined list.
- Tapping a **specific date** on Home → shows module options directly (Pill, Fitness, Payment, Appointment, Custom) with that date pre-filled.

## 4. Reminders module
Sub-categories, each with a distinct icon:
1. **Pill** 💊 — name, dosage, time(s)/day, expiry, photo. Functions as a lightweight medical ID (for showing a doctor/pharmacist what someone takes). **MVP = manual entry only.** Auto-lookup of drug details by name/scan is a planned v2 feature (needs an external drug database — real scope, not a v1 build).
2. **Payment / Bill** 💳 — payee, amount, due date, recurring?
3. **Appointment** 📅 — title, location, time.
4. **Custom** 🔔 — freeform task + user-picked emoji icon (from device emoji keyboard) as the category representation.

**Reminder timing is module-specific**, not one universal setting:
- Pill → times-per-day picker
- Payment → days-before-due picker
- Fitness / Custom → simple time picker

## 5. Custom category rules
- Each Custom item gets a user-chosen emoji as its icon/category.
- **Same emoji, same date** → does not create a duplicate top-level entry. Instead it groups as another task under that emoji's "bucket" for that day. Each grouped task must carry a distinct timestamp.
- Calendar cell shows the emoji once with a count badge (e.g. "🎸 ×3"); tapping expands the list with timestamps.
- Custom items get their own tracking, chosen per-item at creation: **streak/checklist** (did I do it today) or **numeric** (how long / how much).

## 6. Expense module
- Categorized ledger (Food, Transport, Bills/Utilities, Shopping, Health, Other).
- Tapping a date on Home shows that day's total spend (auto-populated from ledger entries).
- Calendar month view shows a small end-of-month summary column with total spend, to help plan the next month.
- **Payment ↔ Expense link:** when a Payment reminder is marked paid, it auto-creates a linked Expense entry (Bills category) so the amount isn't manually re-entered and double-counted. User gets a toggle at creation time ("count this toward my expenses?") to opt out per-payment (e.g. paying on someone else's behalf).
- Both paid and unpaid payment amounts show in monthly spend totals — unpaid represents committed/upcoming spend, not just actual spend. (Recommend visually distinguishing paid vs unpaid in the totals — solid vs outlined style.)

## 7. Fitness module (open — not yet finalized)
Two object types identified:
- **Workout log** — retrospective, "I did this."
- **Goal** — prospective, "I'm aiming for this."
Open questions still to resolve:
- Does a goal show *planned* workout days on the calendar, or does the calendar only reflect *logged* (completed) workouts?
- Manual entry only for v1, or eventual step-counter/wearable sync (scope decision, same shape as the pill auto-lookup question)?

## 8. Onboarding
- New users are **forced through setup of at least 2 modules** before a skip option appears, to build familiarity with the system.
- **If user age is above 45**, force them through setup of **all 4 modules** (extra hand-holding assumed to help most where the app's value — e.g. Pill medical-ID — is highest).

## 9. Deferred / v2 scope (explicitly not in MVP)
- Drug database auto-lookup for Pill entries (name/scan → auto-filled details).
- Wearable/step-counter sync for Fitness.

## 10. Still to design
- Fitness module detail (see open questions above).
- Home calendar screen visual layout.
- Full onboarding flow content (what exactly the 2 forced modules teach).
