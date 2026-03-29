CREATE OR REPLACE FUNCTION public.get_user_profile(_user_id uuid)
RETURNS json
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  result json;
  _role text;
  _display_name text;
  _school_name text;
  _class_name text;
BEGIN
  -- Get role
  SELECT role::text INTO _role FROM user_roles WHERE user_id = _user_id LIMIT 1;
  IF _role IS NULL THEN _role := 'student'; END IF;

  IF _role = 'admin' THEN
    _display_name := 'Master Admin';
  ELSIF _role = 'school' THEN
    SELECT s.name INTO _display_name FROM schools s WHERE s.user_id = _user_id LIMIT 1;
    _school_name := _display_name;
  ELSIF _role = 'teacher' THEN
    SELECT CONCAT_WS(' ', t.first_name, t.last_name), sc.name
    INTO _display_name, _school_name
    FROM teachers t LEFT JOIN schools sc ON sc.id = t.school_id
    WHERE t.user_id = _user_id LIMIT 1;
  ELSIF _role = 'student' THEN
    SELECT st.name, CONCAT(st.class, ' (', st.section, ')'), sc.name
    INTO _display_name, _class_name, _school_name
    FROM students st LEFT JOIN schools sc ON sc.id = st.school_id
    WHERE st.user_id = _user_id LIMIT 1;
  END IF;

  result := json_build_object(
    'role', _role,
    'display_name', COALESCE(_display_name, ''),
    'school_name', _school_name,
    'class_name', _class_name
  );
  RETURN result;
END;
$$;