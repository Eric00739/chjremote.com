# Website Brand Refresh Implementation Plan

> **Status:** Historical implementation plan. The site has since been revised by the 2026-08-24 adversarial hardening work. Do not treat the sample copy, claims, or unchecked tasks below as current requirements; use the code, tests, README, and claim register as current authority.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the marketing site into a stronger international manufacturing brand presentation while preserving the existing static multi-page routing and core inquiry actions.

**Architecture:** Replace the current card-heavy home experience with a brand-led landing flow, then align shared chrome and secondary pages to the same visual system. Add a minimal React test harness so the key homepage hierarchy and navigation behavior are verified before and after the refactor.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, Vitest, Testing Library

---

### Task 1: Add Test Harness

**Files:**
- Modify: `package.json`
- Create: `vitest.config.js`
- Create: `src/test/setup.js`
- Create: `src/App.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("shows the new brand-led hero and primary CTA on the homepage", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: /RF control manufacturing for global access brands/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /request oem quote/i })).toBeInTheDocument();
});

test("navigates to the contact page from the global nav", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole("button", { name: /^contact$/i }));
  expect(
    screen.getByRole("heading", { name: /start an oem conversation/i })
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL because the current homepage copy and contact heading do not match the new design.

- [ ] **Step 3: Add minimal test tooling**

```js
// vitest.config.js
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.js"
  }
});
```

- [ ] **Step 4: Run test to verify the suite executes and still fails for the expected reason**

Run: `npm test`
Expected: FAIL with missing expected content, not a test environment error.

### Task 2: Rebuild Shared Shell and Homepage

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/index.css`

- [ ] **Step 1: Implement the new global shell**

```jsx
// Add a cleaner header, overlay mobile menu, darker footer,
// and a shared brand system used across pages.
```

- [ ] **Step 2: Implement the new homepage hierarchy**

```jsx
// Build sections in this order:
// 1. Hero
// 2. Factory proof
// 3. Product families
// 4. Capability story
// 5. Case proof / testimonials
// 6. Final CTA
```

- [ ] **Step 3: Run the tests**

Run: `npm test`
Expected: PASS for the homepage hero and nav behavior tests.

- [ ] **Step 4: Refine spacing, color, and motion in CSS**

```css
/* Add brand tokens, restrained gradients, section surfaces,
   and a small set of consistent motion utilities. */
```

### Task 3: Align Secondary Pages

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Restyle About and Contact pages to match the homepage system**

```jsx
// Convert secondary pages from card-heavy sections into
// cleaner editorial/manufacturing layouts.
```

- [ ] **Step 2: Lightly align Products and Blog pages**

```jsx
// Keep their existing content purpose while updating spacing,
// type scale, filters, and CTA treatment to the new system.
```

- [ ] **Step 3: Run the full test suite and production build**

Run: `npm test`
Expected: PASS

Run: `npm run build`
Expected: exit 0 with Vite build output

### Task 4: Final Verification

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/index.css`
- Modify: `package-lock.json`
- Modify: `package.json`

- [ ] **Step 1: Review for visual consistency and dead code**

```jsx
// Remove unused imports, stale helpers, and duplicated section logic.
```

- [ ] **Step 2: Re-run verification**

Run: `npm test`
Expected: PASS

Run: `npm run build`
Expected: PASS
