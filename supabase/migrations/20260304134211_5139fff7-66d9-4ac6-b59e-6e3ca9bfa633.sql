
-- Drop existing student view policies
DROP POLICY IF EXISTS "student_view_assignments" ON public.assignments;
DROP POLICY IF EXISTS "student_view_projects" ON public.projects;

-- Recreate with proper class+section matching
CREATE POLICY "student_view_assignments"
  ON public.assignments FOR SELECT TO authenticated
  USING (
    school_id IN (SELECT school_id FROM students WHERE user_id = auth.uid())
    AND target_class IN (
      SELECT class || '-' || section FROM students WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "student_view_projects"
  ON public.projects FOR SELECT TO authenticated
  USING (
    school_id IN (SELECT school_id FROM students WHERE user_id = auth.uid())
    AND target_class IN (
      SELECT class || '-' || section FROM students WHERE user_id = auth.uid()
    )
  );
