## Goal

Fully remove the resource-limit red overlay and the Enter-key unlock listener so the homepage loads normally again. No other features touched.

## Changes

**`index.html`** — remove overlay-only additions:
- Delete the `<style>` block for `#__resource_limit_overlay__`.
- Delete the inline `<script>` that handles the sessionStorage bypass, `keydown` Enter counter, and `window.__rlTap`.
- Delete the `<div id="__resource_limit_overlay__">…</div>` (SVG, heading, paragraph, hidden tap button) from `<body>`.

All other head metadata, favicon, root div, and the `/src/main.tsx` script tag remain exactly as they are.

**No other files change.** `src/App.tsx` is already clean (no overlay import/mount), and `src/components/ResourceLimitOverlay.tsx` was already deleted in an earlier step, so nothing more to do there.

## Verify

- Hard reload → homepage renders instantly, no red screen.
- No console errors from the removed script.
- All routes and features behave exactly as before the restriction was added.
