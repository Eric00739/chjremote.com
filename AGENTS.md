# CHJ Remotes project guide

## Purpose

This repository builds the public CHJ Remotes marketing site. Product and company claims must be traceable; `docs/content/claim-register.md` is the authority for what may be published.

## Commands

- Install exactly: `npm ci`
- Develop locally: `npm run dev`
- Test: `npm test`
- Production build: `npm run build`
- Preview the build: `npm run preview`

## Stack and structure

- React 18, Vite 5, Tailwind CSS 3, Vitest, and Testing Library.
- `src/App.jsx` contains the current client-side page and blog rendering.
- Root and `about/`, `products/`, `blog/`, `contact/` HTML files are Vite build entries.
- `public/` contains deployable static files; `docs/media-source/` is local-only and ignored.
- `.github/workflows/deploy.yml` builds and deploys GitHub Pages only after changes reach `main`.

## Working rules

- Do not invent certifications, customer proof, product specifications, lead times, MOQ, range, or manufacturing claims.
- Do not publish watermarked or unapproved media. Keep invalid or unapproved source assets out of `public/` and Git.
- Page navigation and calls to action should use real links; reserve buttons for UI state.
- Update or add tests for behavior changes, then run the focused check and production build.
- Keep static page metadata, runtime metadata, sitemap URLs, and canonical URLs aligned.

## Current state

- The adversarial hardening work is on `codex/adversarial-site-hardening` in draft PR #1; it is not merged or deployed as of 2026-08-24.
- Published contact details still require owner confirmation.
- Next architecture task: give each published blog article a static, crawlable URL and unique metadata.
