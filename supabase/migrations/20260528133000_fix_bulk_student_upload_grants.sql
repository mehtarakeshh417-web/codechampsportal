GRANT SELECT, INSERT, UPDATE, DELETE ON public.schools TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.teachers TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.students TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;

GRANT ALL ON public.schools TO service_role;
GRANT ALL ON public.teachers TO service_role;
GRANT ALL ON public.students TO service_role;
GRANT ALL ON public.user_roles TO service_role;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'students'
      AND policyname = 'teacher_insert_students'
  ) THEN
    CREATE POLICY "teacher_insert_students"
    ON public.students
    FOR INSERT
    TO authenticated
    WITH CHECK (teacher_id = public.get_teacher_id_for_user(auth.uid()));
  END IF;
END $$;
