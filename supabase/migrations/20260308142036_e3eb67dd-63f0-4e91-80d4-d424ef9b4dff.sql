
-- Add new columns to projects table
ALTER TABLE public.projects 
  ADD COLUMN IF NOT EXISTS learning_objective text DEFAULT '',
  ADD COLUMN IF NOT EXISTS instructions jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS reference_resources jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS expected_output text DEFAULT '',
  ADD COLUMN IF NOT EXISTS max_marks integer DEFAULT 100,
  ADD COLUMN IF NOT EXISTS difficulty_level text DEFAULT 'Medium',
  ADD COLUMN IF NOT EXISTS estimated_time text DEFAULT '';

-- Add new columns to project_submissions table
ALTER TABLE public.project_submissions 
  ADD COLUMN IF NOT EXISTS submission_type text DEFAULT 'screenshot',
  ADD COLUMN IF NOT EXISTS file_url text DEFAULT '',
  ADD COLUMN IF NOT EXISTS code_content text DEFAULT '',
  ADD COLUMN IF NOT EXISTS link_url text DEFAULT '',
  ADD COLUMN IF NOT EXISTS checklist_progress jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS marks integer,
  ADD COLUMN IF NOT EXISTS grade text DEFAULT '',
  ADD COLUMN IF NOT EXISTS feedback text DEFAULT '',
  ADD COLUMN IF NOT EXISTS strengths text DEFAULT '',
  ADD COLUMN IF NOT EXISTS improvements text DEFAULT '',
  ADD COLUMN IF NOT EXISTS evaluation_status text DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS evaluated_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS evaluated_by uuid,
  ADD COLUMN IF NOT EXISTS allow_resubmission boolean DEFAULT true;

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'info',
  reference_id text DEFAULT '',
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own notifications
CREATE POLICY "users_view_own_notifications" ON public.notifications
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Users can update their own notifications (mark as read)
CREATE POLICY "users_update_own_notifications" ON public.notifications
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- Allow insert for authenticated users (system inserts via service role or edge function)
CREATE POLICY "system_insert_notifications" ON public.notifications
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Allow admins to manage all notifications
CREATE POLICY "admins_manage_notifications" ON public.notifications
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create storage bucket for project files
INSERT INTO storage.buckets (id, name, public) VALUES ('project-files', 'project-files', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for project files
CREATE POLICY "authenticated_upload_project_files" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'project-files');

CREATE POLICY "public_read_project_files" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'project-files');

CREATE POLICY "owner_delete_project_files" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'project-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
