---
name: shadcn-setup-and-usage
description: Complete shadcn/ui setup, installation, configuration, and usage guide for a Next.js App Router project. Use this skill whenever building, editing, or maintaining frontend UI components.
---

# shadcn/ui Complete Setup and Usage Guide

## Purpose
This Skill defines the **single source of truth** for using shadcn/ui in this project.  
All UI components must follow these rules to ensure consistency, accessibility, and maintainability.

---

## Tech Stack Assumptions
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui as the **only UI component system**

No other UI libraries are allowed.

---

## Installation (One Time Setup)

### 1. Ensure Tailwind CSS is installed
Project must already have Tailwind configured.

### 2. Initialize shadcn/ui
Run the following command:

```
npx shadcn@latest init

```

Choose these options:
- Framework: **Next.js**
- App Router: **Yes**
- TypeScript: **Yes**
- CSS variables: **Yes**
- Base color: **Neutral**
- Global CSS file: **app/globals.css**
- Components directory: **components/ui**

---

## Adding shadcn Components

Add components using the CLI only:

```
npx shadcn@latest add button card dialog sheet dropdown-menu input

```

Rules:
- Never copy shadcn components manually
- Always use the CLI
- Components must live in `components/ui`

---

## Import Rules

Always import like this:

```
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

```

Do NOT:
- Import from node_modules
- Duplicate components
- Rename shadcn components

---

## Usage Rules (Very Important)

- Prefer shadcn components over raw HTML
- Use Tailwind utility classes only
- No inline styles
- Use variants instead of custom CSS
- Compose UI using Card, Sheet, Dialog, etc

### Example Button
```
<Button variant="default">Submit</Button>

```

### Example Card
```
<Card>
  <CardContent className="p-6">
    Content here
  </CardContent>
</Card>

```

---

## Design Tokens and Theme Rules

### Border Radius

Use the CSS variable only:

```
rounded-[var(--radius)]
```

### Colors

* Use Tailwind semantic classes
* Do not hardcode colors
* Dark mode must rely on CSS variables

### Dark Mode

* Use `class="dark"`
* Ensure readable contrast
* Test buttons and text in both modes

---

## Accessibility Rules

shadcn components already support accessibility, but you must:

* Use semantic HTML
* Add `aria-label` where required
* Ensure keyboard navigation works
* Keep visible focus states

Never remove accessibility props.

---

## Layout and Composition Rules

* Use shadcn `Sheet` for mobile navigation
* Use `Dialog` for modals
* Use `DropdownMenu` for menus
* Avoid deeply nested divs

---

## What NOT to Do

* Do not install other UI libraries
* Do not modify shadcn base components
* Do not add inline CSS
* Do not break component variants
* Do not duplicate UI logic

---

## When to Use This Skill

Use this Skill when:

* Creating any UI component
* Editing existing frontend UI
* Refactoring layout or styles
* Integrating copied UI with shadcn components

This Skill must be followed for **every frontend change**.

