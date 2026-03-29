
-- Drop ALL existing policies on schools, teachers, students to fix infinite recursion
DROP POLICY IF EXISTS "Admins can manage all schools" ON schools;
DROP POLICY IF EXISTS "Schools can view own record" ON schools;
DROP POLICY IF EXISTS "Schools can update own record" ON schools;
DROP POLICY IF EXISTS "Teachers can view own school" ON schools;
DROP POLICY IF EXISTS "Students can view own school" ON schools;

DROP POLICY IF EXISTS "Admins can manage all teachers" ON teachers;
DROP POLICY IF EXISTS "Schools can manage own teachers" ON teachers;
DROP POLICY IF EXISTS "Teachers can view own record" ON teachers;
DROP POLICY IF EXISTS "Teachers can update own record" ON teachers;
DROP POLICY IF EXISTS "Students can view own teacher" ON teachers;

DROP POLICY IF EXISTS "Admins can manage all students" ON students;
DROP POLICY IF EXISTS "Schools can manage own students" ON students;
DROP POLICY IF EXISTS "Teachers can view own students" ON students;
DROP POLICY IF EXISTS "Teachers can update own students" ON students;
DROP POLICY IF EXISTS "Students can view own record" ON students;

-- Helper: get school_id for current user (avoids cross-table recursion)
CREATE OR REPLACE FUNCTION public.get_school_id_for_user(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM schools WHERE user_id = _user_id LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.get_teacher_school_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT school_id FROM teachers WHERE user_id = _user_id LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.get_teacher_id_for_user(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM teachers WHERE user_id = _user_id LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.get_student_school_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT school_id FROM students WHERE user_id = _user_id LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.get_student_teacher_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT teacher_id FROM students WHERE user_id = _user_id LIMIT 1
$$;

-- SCHOOLS policies (no cross-table references)
CREATE POLICY "admin_all_schools" ON schools FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "school_own_select" ON schools FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "school_own_update" ON schools FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "teacher_view_school" ON schools FOR SELECT TO authenticated
  USING (id = get_teacher_school_id(auth.uid()));
CREATE POLICY "student_view_school" ON schools FOR SELECT TO authenticated
  USING (id = get_student_school_id(auth.uid()));

-- TEACHERS policies (no cross-table references)
CREATE POLICY "admin_all_teachers" ON teachers FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "school_manage_teachers" ON teachers FOR ALL TO authenticated
  USING (school_id = get_school_id_for_user(auth.uid()))
  WITH CHECK (school_id = get_school_id_for_user(auth.uid()));
CREATE POLICY "teacher_own_select" ON teachers FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "teacher_own_update" ON teachers FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "student_view_teacher" ON teachers FOR SELECT TO authenticated
  USING (id = get_student_teacher_id(auth.uid()));

-- STUDENTS policies (no cross-table references)
CREATE POLICY "admin_all_students" ON students FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "school_manage_students" ON students FOR ALL TO authenticated
  USING (school_id = get_school_id_for_user(auth.uid()))
  WITH CHECK (school_id = get_school_id_for_user(auth.uid()));
CREATE POLICY "teacher_view_students" ON students FOR SELECT TO authenticated
  USING (teacher_id = get_teacher_id_for_user(auth.uid()));
CREATE POLICY "teacher_update_students" ON students FOR UPDATE TO authenticated
  USING (teacher_id = get_teacher_id_for_user(auth.uid()));
CREATE POLICY "student_own_select" ON students FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
