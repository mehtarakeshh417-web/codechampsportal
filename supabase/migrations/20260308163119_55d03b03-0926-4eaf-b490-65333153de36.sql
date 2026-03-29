-- Announcements table
CREATE TABLE public.announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  author_id uuid NOT NULL,
  author_role text NOT NULL DEFAULT 'school',
  author_name text NOT NULL DEFAULT '',
  title text NOT NULL,
  message text NOT NULL DEFAULT '',
  target_class text DEFAULT NULL,
  priority text NOT NULL DEFAULT 'normal',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Schools can manage their announcements
CREATE POLICY "schools_manage_announcements" ON public.announcements
FOR ALL TO authenticated
USING (school_id = get_school_id_for_user(auth.uid()))
WITH CHECK (school_id = get_school_id_for_user(auth.uid()));

-- Teachers can manage announcements for their school
CREATE POLICY "teachers_manage_announcements" ON public.announcements
FOR ALL TO authenticated
USING (school_id = get_teacher_school_id(auth.uid()))
WITH CHECK (school_id = get_teacher_school_id(auth.uid()));

-- Students can view announcements from their school
CREATE POLICY "students_view_announcements" ON public.announcements
FOR SELECT TO authenticated
USING (school_id = get_student_school_id(auth.uid()));

-- Admins manage all
CREATE POLICY "admins_manage_announcements" ON public.announcements
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Student notes table
CREATE TABLE public.student_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  topic_id text NOT NULL,
  content text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(student_id, topic_id)
);

ALTER TABLE public.student_notes ENABLE ROW LEVEL SECURITY;

-- Students manage their own notes
CREATE POLICY "students_manage_notes" ON public.student_notes
FOR ALL TO authenticated
USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()))
WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- Teachers can view their students' notes
CREATE POLICY "teachers_view_notes" ON public.student_notes
FOR SELECT TO authenticated
USING (student_id IN (SELECT id FROM students WHERE teacher_id = get_teacher_id_for_user(auth.uid())));

-- Admins manage all
CREATE POLICY "admins_manage_notes" ON public.student_notes
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));