# Raise bulk student upload capacity to 10,000

## Why the limit is 1,000 today

There is no 1,000-row cap anywhere in the upload code. `src/components/ClientStudentBulkUpload.tsx` parses the whole sheet and processes every valid row — no `maxRows` check exists.

The ceiling comes from **Cloud Auth sign-up rate limiting**. Each student row calls a client-side `signUp` (via `src/lib/studentAccounts.ts`). The hourly sign-up rate limit in the Cloud Auth settings is what caps throughput — it was previously raised to 1000/hour, which is exactly why uploads stop succeeding right around 1,000 students. Beyond that, rows come back with "Request rate limit reached" (HTTP 429) and are marked Failed.

So: 1,000 = the Auth setting, not the app.

## What needs to happen

### 1. Setting change (owner action, free, ~30 seconds)
In the Cloud dashboard: **Users → Auth settings → Rate Limits → sign-ups/hour** → change `1000` to `10000` → Save. I cannot change this from code; there is no tool exposed to the agent for it.

### 2. Code changes I will make

In `src/components/ClientStudentBulkUpload.tsx`:

- Add an explicit `MAX_ROWS = 10000` guard at parse time with a clear message if the sheet exceeds it, so the boundary is visible in the UI instead of surfacing as random 429s.
- Increase throughput for large files: raise `CHUNK_SIZE` from 5 to 25 and lower `CHUNK_DELAY_MS` from 1200 to 300, keeping the existing exponential-backoff retry (`RETRY_BACKOFFS`) for any row that still hits a 429.
- Raise the "large batch" warning threshold from 30 to 500, and make the message show an estimated completion time based on row count.
- Add a live progress indicator (`x / y processed`) during the run, since a 10,000-row upload takes several minutes.
- Keep the existing per-row failure isolation and "click Create again to retry only failed rows" behaviour — this stays the safety net if the Auth limit is still hit.

No other component, route, or database change is required. Manual single-student creation is untouched.

## Note on very large files

Even at 10,000/hour, a full 10,000-row upload will run for several minutes in one browser tab and must stay open. Splitting into files of ~1,000–2,000 rows remains the more reliable workflow; the code will support the full 10,000 either way.
