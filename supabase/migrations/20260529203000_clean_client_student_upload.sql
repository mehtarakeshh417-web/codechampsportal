ALTER TABLE public.students
ADD COLUMN IF NOT EXISTS tenant_id uuid,
ADD COLUMN IF NOT EXISTS created_by uuid;

UPDATE public.students
SET tenant_id = school_id
WHERE tenant_id IS NULL;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.students TO authenticated;

DROP POLICY IF EXISTS "client_school_insert_students" ON public.students;
DROP POLICY IF EXISTS "client_teacher_insert_students" ON public.students;
DROP POLICY IF EXISTS "client_school_select_students" ON public.students;
DROP POLICY IF EXISTS "client_teacher_select_students" ON public.students;

CREATE POLICY "client_school_insert_students"
ON public.students
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.schools
    WHERE schools.id = students.school_id
      AND schools.user_id = auth.uid()
  )
);

CREATE POLICY "client_teacher_insert_students"
ON public.students
FOR INSERT
TO authenticated
WITH CHECK (
  school_id = public.get_teacher_school_id(auth.uid())
);

CREATE POLICY "client_school_select_students"
ON public.students
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.schools
    WHERE schools.id = students.school_id
      AND schools.user_id = auth.uid()
  )
);

CREATE POLICY "client_teacher_select_students"
ON public.students
FOR SELECT
TO authenticated
USING (
  school_id = public.get_teacher_school_id(auth.uid())
);
