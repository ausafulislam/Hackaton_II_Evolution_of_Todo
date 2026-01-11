---
name: frontend-accessibility-ux
description: Ensure frontend accessibility, UX best practices, and proper environment setup in Next.js projects. Use for creating user-friendly, responsive web interfaces.
---

# Frontend Accessibility, UX, and Environment Setup

## Instructions

This Skill guides you to:

1. Ensure accessibility standards.
2. Apply UX best practices.
3. Setup environment variables for frontend.
4. Prepare frontend project for development.

---

## 1. Accessibility Guidelines

1. **Semantic HTML**  
   Use proper HTML tags (`<header>`, `<main>`, `<nav>`, `<footer>`) for screen readers.

2. **Alt text for images**  
   Every image should have descriptive `alt` text:

```tsx
<img src="/logo.svg" alt="Company Logo" />
```
````

3. **Keyboard navigation**
   Ensure all interactive elements are reachable with `Tab` key.

4. **ARIA attributes**
   Use ARIA roles where needed:

```tsx
<button aria-label="Close menu">X</button>
```

5. **Color contrast**
   Maintain at least 4.5:1 contrast ratio between text and background.

---

## 2. UX Best Practices

1. **Consistent layout**
   Keep headers, footers, and navigation consistent across pages.

2. **Responsive design**
   Ensure mobile-first design using TailwindCSS or custom CSS.

3. **User feedback**
   Provide loading states and hover/focus effects for buttons and interactive elements.

4. **Accessible forms**
   Label each input properly:

```tsx
<label htmlFor="email">Email</label>
<input id="email" type="email" placeholder="Enter email" />
```

5. **Avoid layout shift**
   Use fixed sizes for images or CSS aspect ratio to prevent layout shifts.

---

## 3. Environment Setup

1. **Create `.env.local`** in frontend root:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_ANALYTICS_KEY=your-key
```

2. **Access variables in code:**

```tsx
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

3. **Ignore `.env.local` in git**:

```
# .gitignore
.env.local
```

---

## 4. Recommended Project Structure

```
frontend/
├── app/
├── components/
├── sections/
├── data/
├── public/
├── styles/
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

---

## 5. Testing Accessibility

1. Use **Lighthouse** in Chrome DevTools for accessibility score.
2. Run **axe** browser extension to check for violations.
3. Test **keyboard navigation** manually.
4. Validate **color contrast** with online tools.

---

## 6. Best Practices Summary

- Always use semantic HTML and ARIA attributes.
- Keep layout responsive and consistent.
- Use environment variables for API URLs and keys.
- Avoid committing secrets to git.
- Ensure forms, buttons, and links are fully accessible.
- Regularly test accessibility and UX on multiple devices.

---

This Skill ensures your frontend is **accessible, user-friendly, and ready for development** with Next.js and Prebuilt UI components.
