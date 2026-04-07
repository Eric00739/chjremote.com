# Homepage Hero Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage hero capability panel with a web-optimized factory video that autoplays silently and loops.

**Architecture:** Keep the existing homepage content structure intact, add one focused homepage regression test for the video behavior, transcode the approved source into `public/videos/`, then swap the hero media block in `src/App.jsx` to a video-based panel that respects Vite's base path.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, Vitest, Testing Library

---

### Task 1: Add Homepage Video Regression Test

**Files:**
- Modify: `src/App.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
test("shows the homepage factory video as muted looping media", () => {
  render(<App />);

  const video = screen.getByLabelText(/factory floor video/i);

  expect(video).toHaveAttribute("autoplay");
  expect(video).toHaveAttribute("muted");
  expect(video).toHaveAttribute("loop");
  expect(video).toHaveAttribute("playsinline");
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- src/App.test.jsx -t "shows the homepage factory video as muted looping media"`
Expected: FAIL because the homepage does not render a video element yet.

### Task 2: Prepare Web Video Asset

**Files:**
- Create: `public/videos/factory-hero.mp4`

- [ ] **Step 1: Transcode the approved source video**

Run a web-focused H.264 transcode from `\\192.168.5.254\公司资料\业务\02黄\Factory video-90S.mp4` into `public/videos/factory-hero.mp4`.

- [ ] **Step 2: Verify the output asset exists and is materially smaller than the source**

Run: PowerShell file size check on `public/videos/factory-hero.mp4`
Expected: output file exists and is suitable for homepage delivery.

### Task 3: Replace the Homepage Hero Media Block

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/index.css` (only if utility classes are insufficient)

- [ ] **Step 1: Add the video asset URL constant**

Use `import.meta.env.BASE_URL` so the homepage can resolve the asset under Vite's relative base path.

- [ ] **Step 2: Replace the right-side capability panel with a video card**

Render a labeled `<video>` element configured with `muted`, `autoPlay`, `loop`, and `playsInline`, wrapped in the current panel shell.

- [ ] **Step 3: Run the focused test to verify the change**

Run: `npm test -- src/App.test.jsx -t "shows the homepage factory video as muted looping media"`
Expected: PASS

### Task 4: Final Verification

**Files:**
- Modify: `src/App.test.jsx`
- Modify: `src/App.jsx`
- Create: `public/videos/factory-hero.mp4`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: Vite build exits with code 0 and emits the updated homepage bundle.
