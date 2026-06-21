## Why the homepage is showing instead of the red screen

The overlay component is mounted correctly in `src/App.tsx` and renders at `z-index: 2147483647` over the entire viewport. The only way the homepage shows through is if the bypass flag got set in `sessionStorage` under the key `__resource_limit_bypass__` — most likely because Enter was pressed 5 times (e.g. while typing/submitting something in the preview), which is exactly the "hide for the session" behavior we built in.

Once that flag is set, the overlay stays hidden until the browser tab is closed or the key is cleared.

## Fix

1. **Bump the bypass key** in `src/components/ResourceLimitOverlay.tsx` from `__resource_limit_bypass__` to `__resource_limit_bypass_v2__` so any previously-set flag is ignored and the red screen comes back immediately for everyone (including you).

2. **Make the unlock harder to trigger accidentally**, so normal Enter presses in forms/chat don't disable it:
   - Require 5 Enter presses within 3 seconds *with no other keys in between* (any non-Enter key resets the counter).
   - Ignore Enter presses that originate inside an `<input>`, `<textarea>`, or `contenteditable` element.

3. **Add a tiny "tap here 5× to unlock" invisible hit target** in a corner as a backup, in case the keyboard path is ever blocked by a focused iframe (Coding Lab editors capture keystrokes). It will be a 40×40 transparent div in the bottom-right of the overlay — invisible but clickable.

4. No other files touched. All existing pages, routes, and logic remain exactly as they are underneath.

### Files changed

- `src/components/ResourceLimitOverlay.tsx` — updated key, stricter Enter detection, ignore typing fields, add hidden 5-tap unlock zone.

### How to verify

- Reload the preview → red "RESOURCE LIMIT EXCEEDED" screen covers everything.
- Press Enter 5× rapidly on the page (not inside an input) → overlay disappears for the rest of the tab session.
- Reopen the tab → red screen is back.