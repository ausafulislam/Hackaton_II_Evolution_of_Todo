---
name: page-layout-composition
description: Guidelines for composing pages using layouts and reusable sections/components in a Next.js project with prebuilt UI. Use this when building or updating pages.
---

# Page Layout Composition for Next.js + Prebuilt UI

## Purpose
Teach Claude to:
- Compose pages using layouts
- Integrate prebuilt UI sections/components
- Ensure reusability and clean structure

## Instructions

1. **Layout Usage**
- Every page should have a parent layout (`layout.tsx`) for shared structure:
```tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
````

2. **Page Composition**

* Pages should import and use sections/components
* Keep pages focused on content composition

```tsx
import { HeroSection } from '../sections/hero-section'
import { FeaturesSection } from '../sections/features-section'

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
    </div>
  )
}
```

3. **Section Reusability**

* Store sections in `/sections`
* Each section should be self-contained with its own styling and animations
* Example:

```tsx
export function HeroSection() {
  return (
    <section className="hero bg-gradient-to-r from-indigo-500 to-pink-500">
      <h1 className="text-white text-4xl font-bold">Welcome</h1>
      <p className="text-white mt-2">Your landing page hero</p>
    </section>
  )
}
```

4. **Prebuilt UI Components**

* Copy-paste components directly into pages/sections
* Modify props, content, or styling as needed
* No installation required

5. **Best Practices**

* Pages: minimal logic, focus on structure
* Layouts: handle shared navigation, footers, modals
* Sections/components: reusable and self-contained
* Maintain consistent styling with Tailwind + shadcn
* Keep folder/file naming consistent for clarity

## Examples

* Homepage: `/app/page.tsx` imports Hero, Features, Pricing
* About page: `/app/about/page.tsx` imports Team and Testimonials
* Dashboard: `/app/dashboard/page.tsx` imports Stats, Charts, and Sidebar
