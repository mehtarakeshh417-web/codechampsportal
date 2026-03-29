-- Fix 1: Allow any authenticated user to insert notifications for any user_id
-- This is needed for student→teacher and teacher→student notifications
DROP POLICY IF EXISTS "authenticated_insert_notifications" ON public.notifications;
CREATE POLICY "authenticated_insert_notifications"
  ON public.notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Fix 2: Allow teachers to UPDATE project_submissions (for evaluation)
CREATE POLICY "teachers_update_project_submissions"
  ON public.project_submissions
  FOR UPDATE
  TO authenticated
  USING (project_id IN (
    SELECT id FROM projects WHERE teacher_id = get_teacher_id_for_user(auth.uid())
  ))
  WITH CHECK (project_id IN (
    SELECT id FROM projects WHERE teacher_id = get_teacher_id_for_user(auth.uid())
  ));

-- Fix 3: Allow students to UPDATE their own project_submissions (for resubmission & checklist)
CREATE POLICY "students_update_own_project_submissions"
  ON public.project_submissions
  FOR UPDATE
  TO authenticated
  USING (student_id IN (
    SELECT id FROM students WHERE user_id = auth.uid()
  ))
  WITH CHECK (student_id IN (
    SELECT id FROM students WHERE user_id = auth.uid()
  ));