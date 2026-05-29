## Plan

1. **Fix the actual permission gate in `manage-users`**
   - Change teacher authorization so a logged-in teacher is allowed to run `create_users_bulk` for students even if their `user_roles` row is missing or stale.
   - Resolve the teacher profile from `teachers.user_id = auth.uid()` first, then treat that profile as permission to create students in the same school.
   - Keep teachers restricted to student creation only; no teacher creation/admin access.

2. **Make teacher bulk upload behave like school bulk upload**
   - In the bulk create path, force each teacher-uploaded student to the teacher’s own `school_id` and `teacher_id` server-side.
   - Ignore/override any client-sent school or teacher IDs for teacher users so the permission check is safe and consistent.

3. **Add a safety database migration**
   - Ensure `authenticated` and `service_role` have the needed table grants for `students`, `teachers`, `schools`, and `user_roles`.
   - Add/replace a clear teacher insert policy on `students` allowing teachers to insert students assigned to their own teacher record.

4. **Improve the error message if something still blocks creation**
   - Return a specific reason like “teacher profile not found” or “teacher can only create students” instead of the generic “Insufficient permissions”.

5. **Validate the flow**
   - Check the updated function and migration for correct permission logic and make sure the teacher bulk-upload request path can create auth users plus student rows.