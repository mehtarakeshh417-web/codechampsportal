I found two concrete failure paths to fix instead of retrying the same patch:

1. The visible error text `Bulk creation failed: Insufficient permissions` is not present anywhere in the current local `manage-users` source. That means the app is still hitting a stale/deployed permission path or a frontend path that surfaces an older function response. I will replace the bulk upload call with a clean, versioned action path and make the function response include a version marker so the UI cannot silently use the old behavior.

2. Dashboard counts depend only on `students` rows in `DataContext`. If bulk upload returns auth users, partial rows, or stale rows instead of real `students` table records, `mergeStudents()` cannot count them because `school_id` / `teacher_id` are missing. I will make bulk creation return normalized student rows and also refetch by created IDs from the database before merging into dashboard state.

Implementation plan:

- Update `supabase/functions/manage-users/index.ts`
  - Add a new action name for student bulk upload, e.g. `bulk_create_students_v2`, to bypass any stale `create_users_bulk` permission branch.
  - Allow authenticated school and teacher profiles to create students through the exact same code path.
  - For teacher callers, resolve `teachers.user_id = caller.id` server-side and force `school_id` and `teacher_id` from that teacher record.
  - For school callers, resolve `schools.user_id = caller.id` server-side and force `school_id` from that school record.
  - Use service-role client only for actual Auth user + student row creation, so RLS does not block teachers.
  - Return `{ ok, version, students, errors }` where `students` are actual `students` table rows, not auth user objects.
  - Remove/avoid all “Insufficient permissions” responses for this bulk student path; return specific diagnostics like `Teacher profile not found` only if the logged-in teacher has no teacher row.

- Update `src/components/BulkStudentUpload.tsx`
  - Call the new action `bulk_create_students_v2` instead of the old action.
  - Treat only returned `students` rows as successful created students.
  - If the old/stale response comes back without the version marker, show a clear deployment/version mismatch error instead of silently failing.
  - After upload, fetch/merge the exact created rows and pass them to `onComplete`.

- Update `src/contexts/DataContext.tsx`
  - Make `mapStudent()` tolerate both database snake_case rows and already-normalized camelCase rows.
  - Add a `refreshStudents()` or strengthen `refreshData()`/`mergeStudents()` so newly created bulk rows immediately update `students` state with correct `schoolId` and `teacherId`.
  - Keep dashboard counts derived from the same canonical `students` state.

- Update `src/pages/school/SchoolStudents.tsx` and `src/pages/teacher/TeacherStudents.tsx`
  - After bulk upload, merge returned rows immediately.
  - Then run a real background refresh and merge again so dashboard count becomes manual + bulk count, e.g. `1 + 25 = 26`.

- Add a database migration for final safety
  - Ensure `students`, `teachers`, `schools`, and `user_roles` have authenticated/service-role grants needed by the app.
  - Keep teacher student management scoped to their own school/teacher record, but the edge function will no longer depend on teacher RLS for bulk inserts.

Validation I will perform after implementation:

- Confirm the old text `Insufficient permissions` no longer exists in the repo bulk path.
- Confirm teacher bulk upload calls the new action.
- Confirm the edge function returns real student rows with `school_id` and `teacher_id`.
- Confirm `mergeStudents()` maps those rows into `schoolId`/`teacherId`.
- Confirm dashboards count from the same merged state.

<presentation-actions>
  <presentation-open-history>View History</presentation-open-history>
</presentation-actions>

<presentation-actions>
<presentation-link url="https://docs.lovable.dev/tips-tricks/troubleshooting">Troubleshooting docs</presentation-link>
</presentation-actions>