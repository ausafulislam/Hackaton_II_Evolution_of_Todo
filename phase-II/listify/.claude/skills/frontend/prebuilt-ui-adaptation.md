---
name: prebuilt-ui-adaptation
description: How to adapt prebuilt UI components for Next.js pages with Tailwind and shadcn integration. Use when adding or modifying components from PrebuiltUI.
---

# Prebuilt UI Adaptation for Next.js + shadcn + Tailwind

## Purpose
Teach Claude to:
- Integrate prebuilt UI components into Next.js pages or sections
- Ensure compatibility with Tailwind and shadcn
- Allow reuse across multiple pages

## Instructions

1. **Component Copy-Paste**
- Copy desired component from [Prebuilt UI](https://prebuiltui.com/components)
- Place it in `/components` or `/sections` depending on scope
- Example:
```tsx
// components/CustomCard.tsx
export default function CustomCard() {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-bold">Card Title</h2>
      <p className="mt-2 text-gray-600">Card description goes here.</p>
    </div>
  )
}
````

2. **Integration in Pages/Sections**

* Import the component where needed

```tsx
import CustomCard from '../components/CustomCard'

export function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto grid gap-8 grid-cols-1 md:grid-cols-3">
        <CustomCard />
        <CustomCard />
        <CustomCard />
      </div>
    </section>
  )
}
```

3. **Styling with Tailwind + shadcn**

* Use Tailwind utility classes to adjust spacing, colors, responsiveness
* Use shadcn UI patterns for consistency if combining with custom buttons, modals, or inputs

4. **Props & Reusability**

* Convert repeated values into props for dynamic content

```tsx
export default function CustomCard({ title, description }: { title: string, description: string }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  )
}
```

5. **Best Practices**

* Keep each prebuilt component self-contained
* Do not modify the original source directly; wrap if needed
* Maintain consistent design using Tailwind + shadcn conventions
* Avoid heavy dependencies; prebuilt UI is copy-paste ready

## Examples

* Using Hero Section from Prebuilt UI in `/sections/hero-section.tsx`
* Adapting Card components with dynamic props for FeaturesSection
* Combining buttons from shadcn UI with prebuilt forms
