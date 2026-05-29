GRANT SELECT, INSERT, UPDATE, DELETE ON public.students TO authenticated;
GRANT ALL ON public.students TO service_role;

DROP POLICY IF EXISTS "teacher_insert_students" ON public.students;
DROP POLICY IF EXISTS "teacher_view_students" ON public.students;
DROP POLICY IF EXISTS "teacher_update_students" ON public.students;
DROP POLICY IF EXISTS "teacher_manage_school_students" ON public.students;

CREATE POLICY "teacher_manage_school_students"
ON public.students
FOR ALL
TO authenticated
USING (school_id = public.get_teacher_school_id(auth.uid()))
WITH CHECK (school_id = public.get_teacher_school_id(auth.uid()));
