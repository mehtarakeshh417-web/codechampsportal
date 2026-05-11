# Replace Office Editors with Real Office Online (Shared Doc Mode)

## Goal
In the Coding Lab, swap the three simulated editors (`MsWordEditor`, `MsExcelEditor`, `MsPowerPointEditor`) for **real Microsoft Office Online editors** loaded inside an iframe. Each editor uses one blank document hosted in your connected OneDrive. All students who open the editor will edit the *same shared document* (chosen trade-off).

We will **not** touch:
- The Pro editors (`word2`, `excel2`, `ppt2`) — kept as offline alternatives.
- Curriculum, lessons, dashboards, or any other lab editor.

## How it will work

1. A new edge function (`office-embed-url`) ensures three blank files exist in your OneDrive (`/CodeChamps/blank.docx`, `/blank.xlsx`, `/blank.pptx`):
   - On first call per file, it creates the file via `PUT /me/drive/root:/CodeChamps/{name}:/content` with an empty Office document body.
   - It then calls `POST /me/drive/items/{id}/createLink` with `{ type: "edit", scope: "anonymous" }` to get a shareable edit link.
   - Returns the embed URL (`webUrl` with `action=embedview` / `?em=2`).
   - Caches file IDs and links in a small Supabase table `office_embed_links` so subsequent calls are instant.

2. Three new editor components (`OfficeWordEditor`, `OfficeExcelEditor`, `OfficePowerPointEditor`) replace the simulated ones in `src/components/coding-lab/editors.tsx`:
   - On mount, call the edge function for the corresponding `kind` (`word`/`excel`/`powerpoint`).
   - Render the returned URL in an iframe (full-height, fullscreen toggle preserved).
   - Show a clear notice banner: "This is a shared practice document — everyone in the class edits together."

3. The exports `MsWordEditor`, `MsExcelEditor`, `MsPowerPointEditor` are repointed to the new components, so `StudentCodingLab` and `TeacherCodingLab` pick them up automatically — no tab/menu changes needed.

## Files to create

- `supabase/functions/office-embed-url/index.ts` — Deno function. Inputs: `{ kind: "word" | "excel" | "powerpoint" }`. Auth via `LOVABLE_API_KEY` + the matching connector key (`MICROSOFT_WORD_API_KEY`, etc.) through `https://connector-gateway.lovable.dev/microsoft_word|excel|powerpoint`. Output: `{ embedUrl }`.
- Migration: table `public.office_embed_links (kind text primary key, item_id text, embed_url text, updated_at timestamptz)` with RLS allowing service-role only (function uses service role).
- `src/components/coding-lab/OfficeLiveEditor.tsx` — generic component that takes `kind`, fetches URL, shows iframe + notice + reload + fullscreen.

## Files to modify

- `src/components/coding-lab/editors.tsx` — replace bodies of `MsWordEditor`, `MsExcelEditor`, `MsPowerPointEditor` to render `<OfficeLiveEditor kind="word|excel|powerpoint" />`. Keep `EditorWrapper` for fullscreen.
- `supabase/config.toml` — register the new function (public, no JWT verification needed since it doesn't touch user data; rate-limited by being read-only of cached link).

## Technical notes / risks

- **Anonymous edit link availability**: requires the OneDrive plan to allow anonymous sharing links. If your tenant blocks anonymous links, the function will fall back to `scope: "organization"` which won't embed without sign-in — we'll surface a clear error and suggest enabling anonymous sharing in OneDrive admin.
- **Embed URL format**: We'll prefer the `webUrl` returned by `createLink` and append `?action=embedview` (or use the `embedHtml` returned by `?$select=embedHtml` when available) so the iframe renders the editor, not just a viewer.
- **Blank file bytes**: We'll ship three minimal valid OOXML blank files as base64 constants in the function (a 4KB blank docx/xlsx/pptx each).
- **Shared editing caveat**: The notice banner is critical so students/teachers understand it's not a private sandbox.

## Out of scope
- Per-student private documents (would require per-user Microsoft sign-in — not possible with these connectors).
- Saving to a student's personal account.
- Changing the curriculum lab linking.
