---
name: nextjs-app-router-patterns
description: Patterns and best practices for structuring pages, layouts, and routes in a Next.js App Router project. Use this when working with prebuilt UI components and custom layouts.
---

# Next.js App Router Patterns for Prebuilt UI

## Purpose
Guide Claude to:
- Organize Next.js pages and layouts
- Integrate prebuilt UI components
- Follow scalable folder and routing conventions

## Instructions

1. **Main App Folder Structure**
- Keep `app` as the root for all routes
- Each route can have `page.tsx` and optional `layout.tsx`
- Shared components go in `/components`
- Sections or reusable parts go in `/sections`
```bash
/app
  layout.tsx          # Main layout
  page.tsx            # Homepage
  /dashboard
    layout.tsx
    page.tsx
  /about
    page.tsx
/components
/sections
/public/assets
````

2. **Page Creation**

* Create simple pages for each route:

```tsx
export default function AboutPage() {
  return <div>About Page Content</div>
}
```

3. **Layout Creation**

* Layout wraps pages automatically

```tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
```

4. **Nested Layouts**

* Each subdirectory can have its own `layout.tsx`
* Nested layout automatically wraps child pages
* Example: `/dashboard/layout.tsx` with sidebar

5. **Integrating Prebuilt UI Components**

* Components from prebuilt UI can be imported directly into pages or layouts
* No installation required, just copy-paste the component

```tsx
import { HeroSection } from '../sections/hero-section'

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
    </div>
  )
}
```

6. **Best Practices**

* One layout per major section
* Keep pages minimal, let layouts handle shared structure
* Store reusable components in `/components`
* Use descriptive file/folder names for clarity
* Always use Tailwind + shadcn for styling consistency
* Prebuilt UI components can be reused across pages

## Examples

* Homepage: `/app/page.tsx` uses main `layout.tsx`
* Dashboard: `/app/dashboard/page.tsx` uses `/app/dashboard/layout.tsx` with sidebar
* Sections: Hero, Features, Pricing, Team, Testimonials imported from `/sections`

