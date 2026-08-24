# Homepage Hero Video Design

> **Status:** Superseded on 2026-08-24. This design is retained only as historical context. The source footage is not approved for public use; the current hero intentionally contains no factory video.

**Date:** 2026-04-07

**Historical goal:** Replace the homepage hero's right-side capability panel with a muted, autoplaying, looping factory video. The source was assumed to be approved at the time; that assumption was not subsequently verified.

## Scope

- Change only the homepage hero media block in `src/App.jsx`.
- Keep the left-side headline, supporting copy, CTA buttons, and metrics unchanged.
- Preserve the current rounded panel frame, border treatment, and dark hero atmosphere.
- Do not change other pages or site navigation behavior.

## Media Strategy

- Do not ship the original 131 MB source video to GitHub Pages.
- Transcode the approved source into a smaller web MP4 under `public/videos/`.
- Configure the video for `muted`, `autoPlay`, `loop`, and `playsInline`.
- If autoplay is blocked, the element should still render a playable video frame inside the hero shell.

## Implementation Notes

- Replace the static capability cards with a single media card that holds the video.
- Expose a stable `aria-label` on the video so homepage behavior can be tested.
- Build the video URL from `import.meta.env.BASE_URL` so the asset remains correct under Vite's relative base path.
- Add minimal CSS only if the existing utility classes are not enough to preserve layout and cropping.

## Verification

- Add a homepage test proving the video element exists with the expected autoplay, muted, loop, and inline playback attributes.
- Run the focused test first to watch it fail before implementation.
- After implementation, run the full test suite and a production build.
