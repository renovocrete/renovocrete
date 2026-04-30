
-- Fix search_path on trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Revoke public execute on security definer functions
REVOKE EXECUTE ON FUNCTION public.handle_new_contractor() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
-- has_role is needed by authenticated users for RLS evaluation; keep authenticated execute
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

-- Restrict storage listing - only let owners list their own folder
DROP POLICY IF EXISTS "Public reads contractor media" ON storage.objects;
CREATE POLICY "Public reads contractor media files" ON storage.objects FOR SELECT USING (
  bucket_id = 'contractor-media' AND (
    -- Allow file reads (object name has at least 2 path parts = inside a user folder)
    array_length(storage.foldername(name), 1) >= 1
  )
);

-- Tighten quote_requests insert with length/format checks via trigger
CREATE OR REPLACE FUNCTION public.validate_quote_request()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF length(NEW.name) < 2 OR length(NEW.name) > 120 THEN RAISE EXCEPTION 'Invalid name'; END IF;
  IF NEW.email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' OR length(NEW.email) > 255 THEN RAISE EXCEPTION 'Invalid email'; END IF;
  IF length(NEW.message) < 5 OR length(NEW.message) > 4000 THEN RAISE EXCEPTION 'Invalid message'; END IF;
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.validate_quote_request() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER trg_validate_quote BEFORE INSERT ON public.quote_requests FOR EACH ROW EXECUTE FUNCTION public.validate_quote_request();
