# chjremote.com

Public marketing site for CHJ Remotes, built as a static multi-entry React application with Vite and Tailwind CSS.

## Local development

```bash
npm ci
npm run dev
```

Validation commands:

```bash
npm test
npm run build
npm audit --omit=dev
```

The production build is written to `dist/`. Use `npm run preview` to inspect it locally.

## Site structure

- `/`, `/about/`, `/products/`, `/blog/`, and `/contact/` each have a static Vite HTML entry.
- React handles in-page navigation and updates page-specific title, description, canonical, and Open Graph metadata.
- Contact actions go directly to email, telephone, and WhatsApp. There is no form backend and no simulated submission.
- Blog detail views are still client state; independent `/blog/{slug}/` pages are a pending architecture task.

## Content governance

Public business and technical claims are controlled by [`docs/content/claim-register.md`](docs/content/claim-register.md). Do not add certifications, customer evidence, product specifications, delivery promises, or media without an identified source and publication approval.

Unapproved source media and the invalid catalog archive are retained locally under ignored `docs/media-source/`; they are not part of the public build or repository.

## Deployment status

`.github/workflows/deploy.yml` builds and deploys GitHub Pages when changes are merged or pushed to `main`. A successful local build or draft PR does not mean the production site has changed.

As of 2026-08-24, the hardening changes are in draft PR #1 and production still serves `main` at commit `e19c285`.
