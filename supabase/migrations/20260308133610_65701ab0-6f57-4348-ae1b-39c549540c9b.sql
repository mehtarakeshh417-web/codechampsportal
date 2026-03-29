-- Add unique constraint on user_security.user_id so upsert works correctly
ALTER TABLE public.user_security ADD CONSTRAINT user_security_user_id_unique UNIQUE (user_id);