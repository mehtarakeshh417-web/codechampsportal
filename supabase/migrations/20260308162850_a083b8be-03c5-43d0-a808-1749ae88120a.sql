CREATE TABLE public.typing_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  wpm integer NOT NULL DEFAULT 0,
  accuracy numeric(5,2) NOT NULL DEFAULT 0,
  duration integer NOT NULL DEFAULT 0,
  passage_level text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.typing_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "students_insert_typing" ON public.typing_scores
FOR INSERT TO authenticated
WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "students_view_typing" ON public.typing_scores
FOR SELECT TO authenticated
USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "teachers_view_typing" ON public.typing_scores
FOR SELECT TO authenticated
USING (student_id IN (SELECT id FROM students WHERE teacher_id = get_teacher_id_for_user(auth.uid())));

CREATE POLICY "schools_view_typing" ON public.typing_scores
FOR SELECT TO authenticated
USING (student_id IN (SELECT id FROM students WHERE school_id = get_school_id_for_user(auth.uid())));

CREATE POLICY "admins_manage_typing" ON public.typing_scores
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));