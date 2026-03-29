
-- Create assignments table
CREATE TABLE public.assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  assignment_type text NOT NULL DEFAULT 'mcq',
  target_class text NOT NULL,
  subject text DEFAULT '',
  school_id uuid REFERENCES public.schools(id) ON DELETE CASCADE NOT NULL,
  teacher_id uuid REFERENCES public.teachers(id) ON DELETE CASCADE NOT NULL,
  difficulty_level text DEFAULT 'Medium',
  questions jsonb NOT NULL DEFAULT '[]'::jsonb,
  due_date text DEFAULT '',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  target_class text NOT NULL,
  technology text NOT NULL DEFAULT '',
  submission_type text DEFAULT 'Screenshot',
  school_id uuid REFERENCES public.schools(id) ON DELETE CASCADE NOT NULL,
  teacher_id uuid REFERENCES public.teachers(id) ON DELETE CASCADE NOT NULL,
  due_date text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- RLS for assignments
CREATE POLICY "Teachers can manage own assignments"
  ON public.assignments FOR ALL TO authenticated
  USING (teacher_id IN (SELECT id FROM public.teachers WHERE user_id = auth.uid()));

CREATE POLICY "Students can view assignments for their class"
  ON public.assignments FOR SELECT TO authenticated
  USING (
    target_class IN (SELECT class FROM public.students WHERE user_id = auth.uid())
    AND school_id IN (SELECT school_id FROM public.students WHERE user_id = auth.uid())
  );

CREATE POLICY "Schools can view own assignments"
  ON public.assignments FOR SELECT TO authenticated
  USING (
    school_id IN (SELECT id FROM public.schools WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage all assignments"
  ON public.assignments FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS for projects
CREATE POLICY "Teachers can manage own projects"
  ON public.projects FOR ALL TO authenticated
  USING (teacher_id IN (SELECT id FROM public.teachers WHERE user_id = auth.uid()));

CREATE POLICY "Students can view projects for their class"
  ON public.projects FOR SELECT TO authenticated
  USING (
    target_class IN (SELECT class FROM public.students WHERE user_id = auth.uid())
    AND school_id IN (SELECT school_id FROM public.students WHERE user_id = auth.uid())
  );

CREATE POLICY "Schools can view own projects"
  ON public.projects FOR SELECT TO authenticated
  USING (
    school_id IN (SELECT id FROM public.schools WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage all projects"
  ON public.projects FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
