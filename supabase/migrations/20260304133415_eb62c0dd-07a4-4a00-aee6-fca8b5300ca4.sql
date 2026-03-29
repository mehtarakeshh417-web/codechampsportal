
-- Fix assignments RLS: drop RESTRICTIVE policies and recreate as PERMISSIVE
DROP POLICY IF EXISTS "Admins can manage all assignments" ON public.assignments;
DROP POLICY IF EXISTS "Schools can view own assignments" ON public.assignments;
DROP POLICY IF EXISTS "Students can view assignments for their class" ON public.assignments;
DROP POLICY IF EXISTS "Teachers can manage own assignments" ON public.assignments;

CREATE POLICY "Admins can manage all assignments"
  ON public.assignments FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Schools can view own assignments"
  ON public.assignments FOR SELECT TO authenticated
  USING (school_id IN (SELECT id FROM schools WHERE user_id = auth.uid()));

CREATE POLICY "Students can view assignments for their class"
  ON public.assignments FOR SELECT TO authenticated
  USING (
    target_class IN (SELECT class FROM students WHERE user_id = auth.uid())
    AND school_id IN (SELECT school_id FROM students WHERE user_id = auth.uid())
  );

CREATE POLICY "Teachers can manage own assignments"
  ON public.assignments FOR ALL TO authenticated
  USING (teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid()));

-- Fix projects RLS: drop RESTRICTIVE policies and recreate as PERMISSIVE
DROP POLICY IF EXISTS "Admins can manage all projects" ON public.projects;
DROP POLICY IF EXISTS "Schools can view own projects" ON public.projects;
DROP POLICY IF EXISTS "Students can view projects for their class" ON public.projects;
DROP POLICY IF EXISTS "Teachers can manage own projects" ON public.projects;

CREATE POLICY "Admins can manage all projects"
  ON public.projects FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Schools can view own projects"
  ON public.projects FOR SELECT TO authenticated
  USING (school_id IN (SELECT id FROM schools WHERE user_id = auth.uid()));

CREATE POLICY "Students can view projects for their class"
  ON public.projects FOR SELECT TO authenticated
  USING (
    target_class IN (SELECT class FROM students WHERE user_id = auth.uid())
    AND school_id IN (SELECT school_id FROM students WHERE user_id = auth.uid())
  );

CREATE POLICY "Teachers can manage own projects"
  ON public.projects FOR ALL TO authenticated
  USING (teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid()));
