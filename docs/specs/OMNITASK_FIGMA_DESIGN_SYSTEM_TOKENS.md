# OmniTask — Figma Design Tokens & Component Specification (Master v4.4)

> **Document Type:** Figma Design System Tokens, Variables, Component Specs & Auto-Layout Architecture  
> **Project:** OmniTask (Task Manager & Life Operating System)  
> **Design Target:** Desktop/Laptop (1440dp), Tablet/iPad (1024dp), Mobile Phone (iPhone 16 / 393dp)  
> **Accessibility Compliance:** WCAG 2.1 Level AAA (7:1 Text Contrast, 56dp Senior Touch Targets)  

---

## 1. Color System (Figma Variables & Color Tokens)

OmniTask uses semantic color tokens mapped to life-domain modules. In Figma, define these as **Color Variables** with `Dark Mode` (Default) and `Light Mode` modes.

### 1.1 Base Surfaces & Neutrals

| Token Name | Dark Mode Value | Light Mode Value | Usage / Semantic Role |
| :--- | :---: | :---: | :--- |
| `color/bg/canvas` | `#090D16` | `#F8FAFC` | Global viewport background canvas |
| `color/surface/primary` | `#101624` | `#FFFFFF` | Navbars, headers, bottom bars, panels |
| `color/surface/card` | `#121929` | `#FFFFFF` | Module cards, timeline items, interactive containers |
| `color/surface/hover` | `#162032` | `#F1F5F9` | Hover states, active tab backgrounds |
| `color/border/subtle` | `#1C2638` | `#E2E8F0` | Dividers, panel borders |
| `color/border/card` | `#1E2B40` | `#CBD5E1` | Card outlines, modal box strokes |
| `color/text/primary` | `#F8FAFC` | `#0F172A` | Primary titles, headlines, bold values (AAA contrast) |
| `color/text/muted` | `#94A3B8` | `#64748B` | Subtitles, metadata, secondary descriptions |

---

### 1.2 Domain-Specific Semantic Colors

| Domain / Life Module | Solid Accent Token | 15% Tint Background Token | Semantic Purpose & Figma Mapping |
| :--- | :---: | :---: | :--- |
| **Accent / Home / Master** | `color/accent/primary`<br>`#6366F1` (Indigo) | `color/accent/subtle`<br>`rgba(99,102,241, 0.15)` | Calendar aggregator, primary CTAs, master badges |
| **Medicine & Health (Pills)** | `color/domain/health`<br>`#10B981` (Emerald) | `color/domain/health-subtle`<br>`rgba(16,185,129, 0.15)` | Pill doses, course progress, adherence 96% badges |
| **Bills & Expense Ledger** | `color/domain/finance`<br>`#F59E0B` (Amber) | `color/domain/finance-subtle`<br>`rgba(245,158,11, 0.15)` | Daily spend totals, budget remaining, paid status |
| **Caregiver & Escalation** | `color/domain/caregiver`<br>`#F43F5E` (Rose) | `color/domain/caregiver-subtle`<br>`rgba(244,63,94, 0.15)` | Caregiver banner, overdue dose alarms, emergency alerts |
| **Habits & Emoji Clusters** | `color/domain/habits`<br>`#06B6D4` (Cyan) | `color/domain/habits-subtle`<br>`rgba(6,182,212, 0.15)` | Same-day habit chips, calendar event density markers |
| **Fitness & Smart Streaks** | `color/domain/fitness`<br>`#A855F7` (Purple) | `color/domain/fitness-subtle`<br>`rgba(168,85,247, 0.15)` | Workout routine sets, exercise reps, streak badges |

---

## 2. Typography System (Figma Text Styles)

### 2.1 Font Families
1. **Primary UI Typography:** `Plus Jakarta Sans` (Weights: 400 Regular, 500 Medium, 600 SemiBold, 700 Bold, 800 ExtraBold)
2. **Numeric & Data Typography:** `JetBrains Mono` (Weights: 600 SemiBold, 700 Bold) — *Used for PINs, monetary amounts ($120.00), timestamps, and pill day counts (Day 18/30).*

### 2.2 Standard Viewport Typography Scale (Desktop & Mobile)

| Figma Text Style | Font Family | Size / Line-Height | Weight | Tracking | Usage |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `Heading / Display` | Plus Jakarta Sans | `32px / 40px` | 800 ExtraBold | `-0.02em` | Main dashboard greeting, login hero |
| `Heading / H1` | Plus Jakarta Sans | `24px / 32px` | 700 Bold | `-0.01em` | Page titles, modal headings |
| `Heading / H2` | Plus Jakarta Sans | `18px / 24px` | 700 Bold | `0` | Module panel titles, card titles |
| `Body / Large` | Plus Jakarta Sans | `16px / 24px` | 500 Medium | `0` | Primary inputs, high-priority list rows |
| `Body / Default` | Plus Jakarta Sans | `14px / 20px` | 400 Regular | `0` | Standard descriptions, body copy |
| `Body / Subtitle` | Plus Jakarta Sans | `12px / 16px` | 500 Medium | `0` | Card subtitles, prescription doctor notes |
| `Caption / Badge` | Plus Jakarta Sans | `11px / 14px` | 700 Bold | `+0.04em` | Pill badges, status tags, streak counters |
| `Data / Mono Amount` | JetBrains Mono | `16px / 20px` | 700 Bold | `0` | Expense prices (`$120.00`), Daily spend |
| `Data / Mono PIN` | JetBrains Mono | `24px / 28px` | 800 ExtraBold | `+0.25em` | Senior 4-digit PIN (`1 2 3 4`) |

---

### 2.3 Senior Shield Accessible Typography Scale (Senior Mode)

| Figma Text Style | Font Family | Size / Line-Height | Weight | Accessibility Rationale |
| :--- | :--- | :---: | :---: | :--- |
| `Senior / Hero Alert` | Plus Jakarta Sans | `32px / 40px` | 800 ExtraBold | High-visibility emergency banners & dates |
| `Senior / Card Title` | Plus Jakarta Sans | `24px / 32px` | 800 ExtraBold | Ultra-legible medication & bill names |
| `Senior / Instructions` | Plus Jakarta Sans | `20px / 28px` | 600 SemiBold | *"Take 1 pill with water after breakfast"* |
| `Senior / Action Button` | Plus Jakarta Sans | `22px / 28px` | 800 ExtraBold | Inside 56dp oversized touch buttons |
| `Senior / Time Mono` | JetBrains Mono | `20px / 24px` | 700 Bold | High-legibility dosage alarm times (`08:30 AM`) |

---

## 3. Spacing, Corner Radius & Elevation Tokens

### 3.1 8pt Spatial Scale (Figma Spacing Variables)
* `space/2` = `2px` (Fine stroke alignment)
* `space/4` = `4px` (Badge vertical padding, chip gaps)
* `space/8` = `8px` (Icon gaps, card internal sub-element padding)
* `space/12` = `12px` (Button internal padding, form input padding)
* `space/16` = `16px` (Standard card padding, panel column gaps)
* `space/24` = `24px` (Modal internal padding, section margins)
* `space/32` = `32px` (Major viewport section padding)

### 3.2 Corner Radius Variables
* `radius/sm` = `6px` (Status badges, emoji chips)
* `radius/md` = `10px` (Buttons, form input fields)
* `radius/lg` = `14px` (Default module cards, panel containers)
* `radius/xl` = `20px` (Modal dialog boxes, onboarding gateway cards)
* `radius/full` = `9999px` (Pill switcher buttons, avatar circles)

### 3.3 Elevation & Shadow Styles
* `shadow/sm` = `0px 2px 8px rgba(0, 0, 0, 0.30)` (Cards, dropdown items)
* `shadow/md` = `0px 8px 24px rgba(0, 0, 0, 0.45)` (Modals, floating toast popups, login card)
* `shadow/glow-emerald` = `0px 0px 16px rgba(16, 185, 129, 0.35)` (Active senior dose CTA)

---

## 4. Key Figma Master Components (Auto-Layout Specifications)

### Component 1: `Card / Pill-Course-Progress`
* **Auto-Layout:** Vertical, Hug contents width, `padding: 16px`, `gap: 12px`, `radius: 14px`.
* **Fill:** `color/surface/card`, **Stroke:** `1px solid color/border/card`.
* **Elements:**
  1. **Top Row (Horizontal Hug):** Medication Title (`Metformin 500mg`, 16px Bold) + Badge (`Day 18 / 30`, Emerald 15%).
  2. **Sub Row:** Doctor Name & Rx# (`Dr. Sarah Lin • Rx #89421 • 2x Daily`, 12px Muted).
  3. **Progress Bar Frame:**
     - Background track: `height: 8px`, `radius: 9999px`, fill `color/surface/hover`.
     - Fill indicator: `width: 60%`, `height: 8px`, `radius: 9999px`, fill `color/domain/health`.
  4. **Progress Meta Row (Horizontal Space-Between):**
     - Left: `Course Progress: 60%` (12px Bold).
     - Right: `12 Days Left` (12px Muted).
  5. **Proactive Refill Warning Banner (Conditional Component Variant):**
     - Fill: `color/domain/finance-subtle`, Stroke: `1px solid #F59E0B`.
     - Text: `⚠️ Refill Alert: Pharmacy renewal in 5 days.`
  6. **CTA Button (Horizontal Hug, Height 44px):**
     - Fill: `color/domain/health`, Radius: `10px`, Text: `✓ Take Dose (Day 18 / 30)`.

---

### Component 2: `Card / Bill-to-Expense-Bridge`
* **Auto-Layout:** Vertical, `padding: 16px`, `gap: 12px`, `radius: 14px`.
* **Elements:**
  1. **Top Row:** Payee Name (`Electric Utility Bill`) + Due Badge (`Due Oct 8 • 2 Days Left`, Amber 15%).
  2. **Amount Row:** Price (`$120.00`, 22px JetBrains Mono Bold) + Status (`⚡ Pending Payment`).
  3. **Action Button:**
     - State `Unpaid`: Fill `color/accent/primary`, Text `💳 Pay Bill & Auto-Link to Expense`.
     - State `Paid`: Fill `color/domain/health-subtle`, Stroke `1px solid #10B981`, Text `✅ Paid & Logged ($120.00)`.

---

### Component 3: `Senior / Oversized-Action-Card`
* **Auto-Layout:** Vertical, `min-height: 120px`, `padding: 24px`, `gap: 16px`, `radius: 18px`.
* **Fill:** `color/surface/card`, **Stroke:** `2px solid color/domain/health`.
* **Elements:**
  1. **Medication Name:** `24pt ExtraBold` (`💊 Metformin — 500mg`).
  2. **Instructions:** `20pt Medium` (`Take 1 tablet after breakfast`).
  3. **Touch Button (Minimum 56dp Height):**
     - Fill: `#10B981`, Radius: `14px`, `padding: 18px 24px`.
     - Text: `22pt Bold` (`✓ TAKE PILL NOW`).

---

### Component 4: `Navigation / Master-Profile-Dropdown`
* **Auto-Layout:** Vertical, `width: 320px`, `padding: 12px`, `gap: 8px`, `radius: 16px`, Elevation `shadow/md`.
* **Fill:** `color/surface/primary`, **Stroke:** `1px solid color/border/card`.
* **Section Partitioning:**
  1. **User Identity Header:** Avatar + Name (`Aswin`) + Email + Badge (`⚡ Master User`).
  2. **Divider Stroke:** `height: 1px`, fill `color/border/subtle`.
  3. **Household Actions Group:**
     - `🛡️ Open Household Oversight Hub` (Link with chevron).
     - `👨‍👩‍👧 Family Circle & Senior PIN Hub` (Opens PIN modal).
     - `🔄 'View As' Persona Switcher` (Pill selector: Aswin / Eleanor / John).
  4. **Divider Stroke:** `height: 1px`, fill `color/border/subtle`.
  5. **Reports & Exports Group:**
     - `📋 Export Doctor Visit Summary (PDF)`.
     - `📊 Household Expense & Bill Statement (CSV/PDF)`.
  6. **Divider Stroke:** `height: 1px`, fill `color/border/subtle`.
  7. **Security Group:**
     - `👆 Biometric / FaceID Quick-Unlock`.
     - `🔒 Lock Screen`.
     - `🚪 Sign Out`.

---

## 5. Viewport Breakpoints & Responsive Grids (Figma Frames)

| Viewport Target | Frame Dimensions | Grid Configuration | Layout Behavior |
| :--- | :---: | :---: | :--- |
| **Desktop / Laptop** | `1440 × 900 px` | 12 Columns, Margin `48px`, Gutter `24px` | 4-Pillar modular split columns (`Calendar`, `Pills`, `Bills`, `Fitness`) side-by-side |
| **Tablet (iPad / Senior)** | `1024 × 768 px` | 8 Columns, Margin `32px`, Gutter `16px` | 2-Column split or Single-Stream Senior Shield feed |
| **Mobile (iPhone 16)** | `393 × 852 px` | 4 Columns, Margin `16px`, Gutter `12px` | Vertical stacked single column with persistent 4-tab bottom navigation |

---

*This specification is saved in [`docs/specs/OMNITASK_FIGMA_DESIGN_SYSTEM_TOKENS.md`](docs/specs/OMNITASK_FIGMA_DESIGN_SYSTEM_TOKENS.md).*
