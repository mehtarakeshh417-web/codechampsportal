## Goal
Enable the teacher role to add students — both manually and via bulk upload — exactly like the school (Principal) role, but scoped to the classes that teacher is assigned to.

## Changes

### 1. New teacher page: `src/pages/teacher/TeacherStudents.tsx`
Mirror `SchoolStudents.tsx` with these differences:
- Class dropdown limited to the teacher's assigned classes (from `teachers.classes` for the logged-in teacher).
- Section dropdown uses the school's custom sections (same `school.sections` source).
- Teacher field is auto-set to the current teacher (hidden, no picker).
- `schoolId` resolved from the teacher's record (not `user.id`).
- Student list shows only students belonging to this teacher.
- Reuses `addStudent`, `deleteStudent`, `updateStudent` from `DataContext` and `BulkStudentUpload` component.

### 2. Bulk upload scoping
Update `src/components/BulkStudentUpload.tsx` to accept optional `allowedClasses` and `defaultTeacherId` props:
- When provided (teacher mode), validate every CSV row's class against `allowedClasses` and force `teacherId` to `defaultTeacherId`.
- When omitted (school mode), behavior is unchanged.

### 3. Routing + navigation
- Add `<Route path="students" element={<TeacherStudents />} />` to `teacherRoutes` in `src/pages/Dashboard.tsx`.
- Add a "Students" nav item for the teacher role in `src/components/DashboardLayout.tsx` (matches existing teacher nav style).

### 4. Backend permission
`supabase/functions/manage-users/index.ts` currently allows only `admin` and `school` roles to create users. Extend the role check to also allow `teacher`:
- Permit `teacher` callers to use `create_user` and `create_users_bulk` with role `student` only.
- For `delete_user`, allow a teacher to delete only students whose `teacher_id` matches the teacher's id in the same school.
- Reject any other action for teachers.

### 5. No schema changes
The `students` table already has `teacher_id` and `school_id`. RLS policies for school-scoped student inserts via the edge function continue to apply (the edge function runs with the service role).

## Out of scope
- No change to school admin flows.
- No change to student/teacher dashboards beyond the new page + nav link.
