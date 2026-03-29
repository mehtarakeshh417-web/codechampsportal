
-- Drop the overly permissive insert policy
DROP POLICY IF EXISTS "system_insert_notifications" ON public.notifications;

-- Create a more restrictive insert policy - users can only insert notifications for themselves or for users they manage
CREATE POLICY "authenticated_insert_notifications" ON public.notifications
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    OR has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'teacher'::app_role)
    OR has_role(auth.uid(), 'school'::app_role)
  );
