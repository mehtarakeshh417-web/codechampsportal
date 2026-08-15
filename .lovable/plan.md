# Fix student creation beyond 1,000

## Confirmed causes

- The displayed count is capped because `DataContext.fetchData()` performs one unrestricted `students.select("*")` request. The data API returns at most 1,000 rows per request, so the local student list and every count derived from it stop at 1,000 even when later rows exist.
- Manual and bulk creation currently call browser-side Auth `signUp`. This is the wrong path for school-managed accounts: it is subject to public sign-up limits and does not guarantee a confirmed, login-ready account.
- The app already has a server-side `manage-users` function whose `create_user` action uses the admin Auth API, confirms the email, assigns the requested role, and returns the real user ID. Student creation is not currently using that path.

## Implementation

1. **Make student account creation server-managed**
   - Update the shared student-account helper to invoke `manage-users` with `create_user`, role `student`, normalized username/email/password, and student metadata.
   - Keep the school user's browser session untouched.
   - Treat the operation as successful only after both the login account and the `students` profile row are confirmed.
   - Surface the real error in manual and bulk UI instead of showing “Student created” for partial or failed creation.

2. **Load every student, not only the first 1,000**
   - Add paginated student fetching in `DataContext`, requesting deterministic pages until no rows remain.
   - Preserve existing school/teacher filtering and mappings.
   - Refresh and merge successful creations so 1,000 becomes 1,001 immediately and remains correct after reload.

3. **Keep manual and bulk behavior consistent**
   - Route both flows through the same login-account helper.
   - Preserve class/section/teacher mapping, row-level bulk statuses, retries, and the 10,000-row file boundary.
   - Do not add RLS bypass policies or database workarounds.

## Verification

- Create one student while signed in as a school with at least 1,000 students.
- Confirm the success message appears only after the profile is stored, the count changes to 1,001 without a reload, and remains 1,001 after a fresh reload.
- Sign out and perform a real login with the newly created student credentials; confirm the student dashboard/profile loads with the correct role, school, class, and section.
- Repeat with a small bulk sheet and confirm every “Created” row can log in. If an authenticated school session is unavailable in the preview, report the end-to-end login check as unverified rather than claiming it passed.