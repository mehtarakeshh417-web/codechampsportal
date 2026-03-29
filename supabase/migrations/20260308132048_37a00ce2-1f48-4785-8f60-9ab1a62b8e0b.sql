
-- Function to update student XP when topics are completed/uncompleted
CREATE OR REPLACE FUNCTION public.update_student_xp_on_topic_completion()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE students SET xp = COALESCE(xp, 0) + 50 WHERE id = NEW.student_id;
    -- Also update progress percentage
    UPDATE students SET progress = (
      SELECT CASE WHEN total > 0 THEN ROUND((completed::numeric / total) * 100) ELSE 0 END
      FROM (
        SELECT COUNT(*) as completed FROM topic_completions WHERE student_id = NEW.student_id
      ) c,
      (SELECT 20 as total) t -- approximate total, will be overridden by app
    ) WHERE id = NEW.student_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE students SET xp = GREATEST(COALESCE(xp, 0) - 50, 0) WHERE id = OLD.student_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Create trigger
CREATE TRIGGER trigger_update_xp_on_topic_completion
AFTER INSERT OR DELETE ON public.topic_completions
FOR EACH ROW
EXECUTE FUNCTION public.update_student_xp_on_topic_completion();
