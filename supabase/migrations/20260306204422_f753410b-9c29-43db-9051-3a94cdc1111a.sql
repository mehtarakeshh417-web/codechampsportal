
CREATE TABLE public.project_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  notes text NOT NULL DEFAULT '',
  submitted_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(project_id, student_id)
);

ALTER TABLE public.project_submissions ENABLE ROW LEVEL SECURITY;

-- Students can insert their own submissions
CREATE POLICY "students_insert_project_submissions" ON public.project_submissions
  FOR INSERT TO authenticated
  WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- Students can view own submissions
CREATE POLICY "students_view_own_project_submissions" ON public.project_submissions
  FOR SELECT TO authenticated
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- Teachers can view submissions for their projects
CREATE POLICY "teachers_view_project_submissions" ON public.project_submissions
  FOR SELECT TO authenticated
  USING (project_id IN (
    SELECT id FROM projects WHERE teacher_id = get_teacher_id_for_user(auth.uid())
  ));

-- Admins can manage all
CREATE POLICY "admins_manage_project_submissions" ON public.project_submissions
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- Schools can view
CREATE POLICY "schools_view_project_submissions" ON public.project_submissions
  FOR SELECT TO authenticated
  USING (project_id IN (
    SELECT id FROM projects WHERE school_id = get_school_id_for_user(auth.uid())
  ));
