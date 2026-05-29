GRANT SELECT, INSERT, UPDATE, DELETE ON public.schools TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.teachers TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.students TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;

GRANT ALL ON public.schools TO service_role;
GRANT ALL ON public.teachers TO service_role;
GRANT ALL ON public.students TO service_role;
GRANT ALL ON public.user_roles TO service_role;

DROP POLICY IF EXISTS "teacher_manage_school_students" ON public.students;
DROP POLICY IF EXISTS "school_manage_legacy_userid_students" ON public.students;

CREATE POLICY "teacher_manage_school_students"
ON public.students
FOR ALL
TO authenticated
USING (school_id = public.get_teacher_school_id(auth.uid()))
WITH CHECK (school_id = public.get_teacher_school_id(auth.uid()));

CREATE POLICY "school_manage_legacy_userid_students"
ON public.students
FOR ALL
TO authenticated
USING (school_id = auth.uid())
WITH CHECK (school_id = auth.uid());
