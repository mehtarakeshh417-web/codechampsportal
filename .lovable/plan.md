## Goal
Replace the current student Word editor (WordPro / TinyMCE-based) with an embedded Zoho Writer via a public iframe. No login flow, no API keys.

## Scope
Only the Word editor is touched. HTML/Python/Java/Paint editors, routing, roles, and topic→lab mapping stay exactly as-is.

## Changes

1. **New component** `src/components/coding-lab/ZohoWordEditor.tsx`
   - Renders an `<iframe>` pointing to Zoho Writer's public entry URL (`https://writer.zoho.com/writer/`).
   - `width="100%"`, full height, `allow="clipboard-read; clipboard-write; fullscreen"`, `sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"`.
   - Dark neon themed wrapper container (rounded border, matches existing editors).
   - A small header note: "Opens Zoho Writer — sign in inside the frame if prompted to save."

2. **`src/components/coding-lab/editors.tsx`**
   - Swap `import WordPro from "./WordPro"` → `import ZohoWordEditor from "./ZohoWordEditor"`.
   - `MsWordEditor` renders `<ZohoWordEditor />` inside the existing `EditorWrapper` (keeps Save-to-Local + fullscreen toggle).
   - Update the `export { default as WordProEditor }` line to re-export `ZohoWordEditor` (keeping the name so no other imports break), or leave WordPro file untouched and just stop using it.

3. **Leave untouched**
   - `WordPro.tsx` file stays on disk (unused) so it can be restored later.
   - `StudentCodingLab.tsx`, `topicLabMap.ts`, `PremiumContentSections.tsx`, all other editors, routes, and styling.

## Caveats to flag to the user
- Zoho Writer's public site requires a Zoho/Google login for saving; the iframe itself loads without keys, but Zoho may set `X-Frame-Options` that blocks embedding. If the iframe is blank in preview, the only fixes are (a) switch to Zoho Office Integrator API (needs a paid key) or (b) open Zoho Writer in a new tab via a button instead of embedding. I'll add a "Open in new tab" fallback button in the header for that case.