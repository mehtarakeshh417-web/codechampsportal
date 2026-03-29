
CREATE TABLE public.topic_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  topic_id text NOT NULL,
  completed_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(student_id, topic_id)
);

ALTER TABLE public.topic_completions ENABLE ROW LEVEL SECURITY;

-- Students can insert their own completions
CREATE POLICY "students_insert_completions" ON public.topic_completions
  FOR INSERT TO authenticated
  WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- Students can view own completions
CREATE POLICY "students_view_own_completions" ON public.topic_completions
  FOR SELECT TO authenticated
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- Students can delete own completions (unmark)
CREATE POLICY "students_delete_own_completions" ON public.topic_completions
  FOR DELETE TO authenticated
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- Teachers can view completions for their students
CREATE POLICY "teachers_view_completions" ON public.topic_completions
  FOR SELECT TO authenticated
  USING (student_id IN (
    SELECT id FROM students WHERE teacher_id = get_teacher_id_for_user(auth.uid())
  ));

-- Schools can view all completions in their school
CREATE POLICY "schools_view_completions" ON public.topic_completions
  FOR SELECT TO authenticated
  USING (student_id IN (
    SELECT id FROM students WHERE school_id = get_school_id_for_user(auth.uid())
  ));

-- Admins manage all
CREATE POLICY "admins_manage_completions" ON public.topic_completions
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));
