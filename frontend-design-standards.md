# Frontend Skills & Design Standards

## Objective
Build interfaces that feel like they were designed by an experienced product designer and frontend developer, not generated from a generic AI template. Every screen must prioritize clarity, usability, accessibility, and maintainability.

---

## Design Philosophy
The application is a productivity tool used daily. 

### The interface should feel:
* **Professional**
* **Clean**
* **Fast**
* **Trustworthy**
* **Calm**
* **Practical**

### Avoid designs that feel:
* Overly colorful
* Startup-like / Trendy for the sake of trends
* Dashboard cluttered with cards
* AI-generated templates

> **Core Goal:** Users should immediately understand what they need to do without cognitive overload.

---

## Visual Principles

### 1. White Space
* Use generous spacing.
* Do not place components too close together.
* Prefer breathing room over density.

### 2. Typography
Use a modern sans-serif font. Recommended fonts include **Inter**, **Geist**, or **IBM Plex Sans**. Never rely on font weight alone to create hierarchy; always use spacing and sizing.

| Element | Size Range |
| :--- | :--- |
| **Page Title** | 32px – 36px |
| **Section Title** | 20px – 24px |
| **Card Title** | 16px – 18px |
| **Body** | 14px – 16px |
| **Caption** | 12px – 13px |

### 3. Colors
Use color only to communicate meaning. Avoid excessive gradients and rainbow color schemes.
* **Primary:** `#2563EB` (Blue)
* **Success:** `#16A34A` (Green)
* **Warning:** `#D97706` (Amber/Orange)
* **Danger:** `#DC2626` (Red)
* **Neutral:** Use gray scale exclusively for text, borders, and backgrounds.

---

## Layout Principles

### Dashboard Guidelines
Do not create dashboards filled with decorative cards. Every widget must answer a specific functional question.

* **Good Examples:**
    * How many tasks are unfinished?
    * How many tasks completed this month?
    * Most requested unit?
    * Productive hours this week?
* **Bad Examples:**
    * Welcome cards ("Good morning, User!")
    * Motivational quotes
    * Decorative statistics without context

### Content Width
* Use max-width containers to maintain readability.
* Avoid ultra-wide layouts.
* **Recommended Maximum:** `1200px` – `1400px`.

### Data Tables
Tables are primary components because users heavily work with operational data.
* **Requirements:** Sticky header, Search, Filter, Sort, Pagination, and Responsive behavior.
* *Rule:* Never hide important data behind multiple clicks.

### Forms
Forms must be fast and frictionless to complete.
* **Requirements:** Logical grouping, clear labels, inline validation, and keyboard-friendly navigation.
* **Avoid:** Long single-column vertical forms, multiple unnecessary multi-step flows, and complex modal chains.

---

## Component Standards

### Buttons
* **Primary Action:** Filled button.
* **Secondary Action:** Outline button.
* **Danger Action:** Red button.
* *Rule:* Never place more than one primary button within the same section.

### Cards
* Cards should contain actionable information, not decoration.
* Every card must have an explicit operational purpose.
* Avoid excessive box shadows; prefer subtle, crisp borders.

### Dialogs (Modals)
* Use dialogs strictly for: **Confirmation**, **Quick Edit**, or **Delete Actions**.
* *Rule:* Do not build entire workflows or multi-page forms inside modals.

### Data Visualization
* **Preferred:** Bar charts, Line charts, and Simple progress indicators.
* **Avoid:** 3D charts, Pie charts with many segments, and decorative animations.
* *Rule:* The chart must accurately communicate information within **3 seconds** of viewing.

---

## Accessibility (a11y) & Responsiveness

### Accessibility Requirements
Every page must structurally adhere to the following:
1.  Support full keyboard navigation.
2.  Have clearly visible focus states (`:focus-visible`).
3.  Maintain sufficient color contrast ratios (WCAG AA standard).
4.  Use semantic HTML tags (`<main>`, `<nav>`, `<article>`, `<header>`, etc.).
5.  *Rule:* Never use color as the single indicator for state or errors.

### Breakpoints (Mobile-First Approach)
Every screen must be functional on mobile before applying desktop enhancements.
* **Mobile:** `320px+`
* **Tablet:** `768px+`
* **Desktop:** `1024px+`
* **Large Desktop:** `1440px+`

---

## UX Mechanics & State Handling

### Loading States
* Always implement **Skeleton loaders**, progress indicators, or defined empty states.
* *Rule:* Never show blank screens during data fetching.

### Empty States
Every empty state should clearly explain three things: What happened, why there is no data, and what action the user should take next.
* **Example:** *"No activities have been recorded for this month. Create your first activity to start tracking your work."*

### Error Handling
Error messages must be explicit and human-readable.
* **Bad:** *Unexpected Error*
* **Good:** *Unable to save activity. Please check your internet connection and try again.*

### Animation
* Animations must be subtle and functional, supporting user understanding rather than decoration.
* **Duration:** `150ms` – `250ms`.

### Icons
* Use **Lucide Icons**.
* Only use icons when they actively improve visual recognition.
* *Rule:* Never place icons blindly next to every single text label.

---

## Frontend Architecture & Code Standards

### Tech Stack
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI Components:** shadcn/ui
* **Form Management:** React Hook Form
* **Validation:** Zod
* **Data Fetching:** TanStack Query (React Query)
* *Rule:* Avoid adding unnecessary external dependencies.

### Code Quality
* Prioritize readability over clever or overly concise code.
* Keep components small, modular, and single-purpose.
* Extract reusable business and presentation logic into custom hooks or utils.
* Avoid deeply nested JSX layouts.
* **Clear Component Naming Examples:**
    * *Good:* `ActivityTable`, `MonthlySummaryCard`, `TaskForm`
    * *Bad:* `ComponentA`, `DataThing`, `MainWidget`

---

## AI Generation Rules
When prompting or generating UI components through AI, enforce the following constraints:
1.  **Usability over Aesthetics:** Design for daily operational use, not visual flair.
2.  **Real-world Layouts:** Use realistic data and structures; avoid generic placeholder or fake demo data.
3.  **Reduce Friction:** Minimize required clicks and optimize layouts for rapid data entry. Assume the user is busy and working under a high cognitive load.
4.  **Purpose-Driven:** Every screen must have a single, unambiguous core purpose. If unsure, choose the simpler, more minimalist solution.

> **Final Litmus Test:** The final application interface should look and feel like professional software used in universities, healthcare facilities, and enterprise organizations, rather than a trendy marketing or SaaS landing page.
