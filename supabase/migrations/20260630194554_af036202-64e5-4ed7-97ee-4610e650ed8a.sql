
CREATE OR REPLACE FUNCTION public.set_updated_at_now()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE public.training_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  company_name text,
  company_website text,
  city text NOT NULL,
  state_region text NOT NULL,
  country text NOT NULL,
  preferred_location text,
  interests text[] NOT NULL DEFAULT '{}',
  notes text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT training_signups_first_name_len CHECK (char_length(first_name) BETWEEN 1 AND 100),
  CONSTRAINT training_signups_last_name_len  CHECK (char_length(last_name)  BETWEEN 1 AND 100),
  CONSTRAINT training_signups_email_len      CHECK (char_length(email) BETWEEN 3 AND 255),
  CONSTRAINT training_signups_city_len       CHECK (char_length(city) BETWEEN 1 AND 120),
  CONSTRAINT training_signups_region_len     CHECK (char_length(state_region) BETWEEN 1 AND 120),
  CONSTRAINT training_signups_country_len    CHECK (char_length(country) BETWEEN 1 AND 120),
  CONSTRAINT training_signups_notes_len      CHECK (notes IS NULL OR char_length(notes) <= 2000)
);

GRANT INSERT ON public.training_signups TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.training_signups TO authenticated;
GRANT ALL ON public.training_signups TO service_role;

ALTER TABLE public.training_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a training signup"
  ON public.training_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins read training signups"
  ON public.training_signups
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins update training signups"
  ON public.training_signups
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins delete training signups"
  ON public.training_signups
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE TRIGGER training_signups_set_updated_at
  BEFORE UPDATE ON public.training_signups
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at_now();
