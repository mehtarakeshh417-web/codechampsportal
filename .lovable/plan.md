## Goal

Make the red warning screen appear the instant the page loads — before React, fonts, or any homepage code paints — and update its text. Leave everything else untouched.

## Approach

1. **Inject the overlay directly into `index.html`** as a static `<div id="__resource_limit_overlay__">` placed at the end of `<body>`, with inline styles so it shows the moment the HTML is parsed (no JS, no React, no FOUC). Includes:
   - Full-viewport bright red background (`#c00000`), `position: fixed`, `z-index: 2147483647`.
   - Large inline SVG warning triangle (yellow, bold stroke) so no icon font/network is needed.
   - Bold heading + paragraph with the exact new copy:
     *"CRITICAL SYSTEM ERROR: RESOURCE LIMIT EXCEEDED. This website has exceeded its allowed user traffic bandwidth and has been ceased. Please contact the developer immediately."*

2. **Inline `<script>` in `<head>`** that:
   - On load, checks `sessionStorage['__resource_limit_bypass_v2__']`; if set, hides the overlay immediately.
   - Adds a global `keydown` listener for 5 consecutive Enter presses within 3 seconds (ignoring inputs/textareas/contenteditable; any non-Enter key resets the counter). On trigger, sets the sessionStorage flag and removes the overlay element so the homepage works exactly as normal for the rest of the session.

3. **Remove the React-based overlay** mount from `src/App.tsx` and delete `src/components/ResourceLimitOverlay.tsx`, since the HTML/JS version supersedes it and renders earlier. (This is the only React-side change; no pages, routes, or features touched.)

### Files changed

- `index.html` — add overlay markup + tiny inline script.
- `src/App.tsx` — remove the two lines that imported and rendered `<ResourceLimitOverlay />`.
- `src/components/ResourceLimitOverlay.tsx` — deleted.

### Verify

- Hard reload → red screen with warning triangle and new copy is visible before anything else.
- Press Enter 5× quickly (outside any input) → overlay vanishes, homepage works normally for the rest of the tab session.
- Reopen tab → red screen returns.