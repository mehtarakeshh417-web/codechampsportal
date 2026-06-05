## Why the error happens

The toast "Request rate limit reached" comes from Supabase Auth, not from our database. The bulk uploader currently calls `createStudentAuthAccount()` once per row inside a tight `for` loop (see `src/components/ClientStudentBulkUpload.tsx` lines 126–129). Each call hits `auth.signUp` on the GoTrue endpoint.

Supabase enforces a hard rate limit on `/auth/v1/signup` (default ~30 sign‑ups per hour per IP on hosted projects, and a per‑second burst limit). For 36 rows the burst limit trips almost immediately — the screenshot shows the loop firing as fast as the browser can, so GoTrue rejects further sign‑ups with HTTP 429 "Request rate limit reached". Because the loop aborts on the first thrown error, none of the 36 students get inserted into the `students` table.

There is nothing wrong with the spreadsheet, RLS, or the insert step — it is purely a sign‑up throttling problem.

## How to fix it

Make the uploader respect the auth rate limit and keep the user informed:

1. **Throttle sign‑ups.** Replace the tight loop with a controlled queue: process rows in small chunks (e.g. 5 at a time) and add a delay between chunks (e.g. 1.2s) so we stay well under the per‑second burst limit. Use sequential awaits inside each chunk to avoid parallel `signUp` storms.
2. **Retry on 429.** Wrap each `createStudentAuthAccount` call in a retry helper that detects `rate limit` / status 429 in the error message and waits with exponential backoff (e.g. 2s → 4s → 8s, max 3 retries) before giving up on that row.
3. **Per‑row error isolation.** Catch sign‑up failures per row instead of aborting the whole batch. Mark the failing row's status as "Failed: <reason>" in the table, keep its data visible, and continue with the remaining rows. Only insert into `students` for rows whose auth account succeeded.
4. **Live progress UI.** Show "Creating X of N…" on the Create button and update each row's Status column from "Ready" → "Creating" → "Created"/"Failed" so the user can see progress for large batches (36+).
5. **Resumable retry.** After the run, if some rows failed, leave only the failed rows in the table and enable a "Retry failed" action that re‑runs only those rows.
6. **Optional: warn for very large batches.** If `validRows.length > 30`, show a non‑blocking toast: "Large batch — this will take ~1 minute due to sign‑up limits" so users don't think it has hung.

No DB schema, RLS, or edge function changes are needed. Only `src/components/ClientStudentBulkUpload.tsx` (and a tiny helper in `src/lib/studentAccounts.ts` for the retry wrapper) need to change.

## Expected behavior after the fix

- Uploading 36 students completes successfully in ~30–60s without hitting the rate limit.
- If a sign‑up still 429s after retries, only that specific row is marked Failed; all other students are created and visible immediately (cache invalidation already in place).
- The user sees per‑row status and can re‑run only failed rows without re‑uploading the file.
- Students can log in with the username/password from the spreadsheet exactly as today.

## Technical details

- File: `src/components/ClientStudentBulkUpload.tsx` — refactor `createStudents()`:
  - Add `CHUNK_SIZE = 5`, `CHUNK_DELAY_MS = 1200`.
  - Add `signUpWithRetry(row)` that calls `createStudentAuthAccount` and retries on `/rate limit|429/i` with `[2000, 4000, 8000]` ms backoff.
  - Track `status` per row in React state: `ready | creating | created | failed` plus optional `errorMessage`.
  - Build `studentRows` only from successfully signed‑up rows; insert them in one `supabase.from("students").insert(...).select()` call (existing logic kept).
  - Keep existing `stripContextColumns` fallback and `queryClient.invalidateQueries` calls.
- File: `src/lib/studentAccounts.ts` — optionally export a small `sleep(ms)` helper used by the retry wrapper; no behavior change to `createStudentAuthAccount`.
- No migration, no edge function, no config changes.
