# chjremote.com landing (React + Vite)

Static React build ready for GitHub Pages deployment. The UI matches the provided single-page layout and uses the logo from `logo/LOGO.png`.

## Getting started
- Install deps: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`

## Deploying to GitHub Pages
1. Run `npm run build` (outputs to `dist/`).
2. Publish `dist/` to GitHub Pages (e.g., configure Pages to serve from `dist` on `gh-pages` branch, or upload `dist` as the Pages artifact).
3. If the site is served from a subpath (like `/your-repo/`), update `base` in `vite.config.js` to that subpath before building.

## Notes
- Tailwind CSS + typography/line-clamp plugins are wired for the supplied class names.
- SEO meta title/description are set from the React component on load.
- Inquiry/comment actions are simulated for static hosting; wire them to Formspree/EmailJS or your backend if needed.
