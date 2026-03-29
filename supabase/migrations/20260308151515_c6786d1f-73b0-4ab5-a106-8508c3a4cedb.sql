
CREATE OR REPLACE FUNCTION public.update_student_xp_on_quiz()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  UPDATE students SET xp = COALESCE(xp, 0) + NEW.xp_earned WHERE id = NEW.student_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_quiz_attempt_insert ON public.quiz_attempts;
CREATE TRIGGER on_quiz_attempt_insert
  AFTER INSERT ON public.quiz_attempts
  FOR EACH ROW EXECUTE FUNCTION public.update_student_xp_on_quiz();
