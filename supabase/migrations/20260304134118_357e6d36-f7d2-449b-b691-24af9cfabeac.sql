
-- Drop ALL existing policies on assignments (both restrictive and permissive)
DO $$ 
DECLARE
  pol record;
BEGIN
  FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'assignments' AND schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.assignments', pol.policyname);
  END LOOP;
  FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'projects' AND schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.projects', pol.policyname);
  END LOOP;
END $$;

-- Recreate as PERMISSIVE (default) for assignments
CREATE POLICY "admin_manage_assignments"
  ON public.assignments FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "school_view_assignments"
  ON public.assignments FOR SELECT TO authenticated
  USING (school_id IN (SELECT id FROM schools WHERE user_id = auth.uid()));

CREATE POLICY "teacher_manage_assignments"
  ON public.assignments FOR ALL TO authenticated
  USING (teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid()));

CREATE POLICY "student_view_assignments"
  ON public.assignments FOR SELECT TO authenticated
  USING (
    target_class IN (SELECT class FROM students WHERE user_id = auth.uid())
    AND school_id IN (SELECT school_id FROM students WHERE user_id = auth.uid())
  );

-- Recreate as PERMISSIVE (default) for projects
CREATE POLICY "admin_manage_projects"
  ON public.projects FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "school_view_projects"
  ON public.projects FOR SELECT TO authenticated
  USING (school_id IN (SELECT id FROM schools WHERE user_id = auth.uid()));

CREATE POLICY "teacher_manage_projects"
  ON public.projects FOR ALL TO authenticated
  USING (teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid()));

CREATE POLICY "student_view_projects"
  ON public.projects FOR SELECT TO authenticated
  USING (
    target_class IN (SELECT class FROM students WHERE user_id = auth.uid())
    AND school_id IN (SELECT school_id FROM students WHERE user_id = auth.uid())
  );
