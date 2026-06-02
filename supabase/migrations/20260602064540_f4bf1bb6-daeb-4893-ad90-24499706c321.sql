
-- Helper
CREATE OR REPLACE FUNCTION public.is_partner(_user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('architect','builder')
  )
$$;

-- partner_profiles
CREATE TABLE public.partner_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  kind text NOT NULL DEFAULT 'architect',
  first_name text, last_name text, email text, phone text,
  company text, address text, country text, website text,
  professional_number text, specialty text,
  service_areas text[] DEFAULT '{}', languages text[] DEFAULT '{}',
  years_experience integer, avatar_url text, logo_url text,
  admin_documents jsonb DEFAULT '[]'::jsonb,
  private_gallery jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_profiles TO authenticated;
GRANT ALL ON public.partner_profiles TO service_role;
ALTER TABLE public.partner_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pp_select" ON public.partner_profiles FOR SELECT TO authenticated USING (auth.uid() = user_id OR has_role(auth.uid(),'admin'));
CREATE POLICY "pp_insert" ON public.partner_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "pp_update" ON public.partner_profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id OR has_role(auth.uid(),'admin'));
CREATE POLICY "pp_delete" ON public.partner_profiles FOR DELETE TO authenticated USING (auth.uid() = user_id OR has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_pp_upd BEFORE UPDATE ON public.partner_profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- partner_clients
CREATE TABLE public.partner_clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  first_name text, last_name text NOT NULL,
  email text, phone text, address text, country text, notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_clients TO authenticated;
GRANT ALL ON public.partner_clients TO service_role;
ALTER TABLE public.partner_clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pc_all" ON public.partner_clients FOR ALL TO authenticated USING (auth.uid() = user_id OR has_role(auth.uid(),'admin')) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_pc_upd BEFORE UPDATE ON public.partner_clients FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- partner_projects
CREATE TABLE public.partner_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'study',
  property_type text, classification text,
  surface_m2 numeric, surface_sqft numeric,
  rooms integer, floors integer, location_kind text,
  estimated_price numeric DEFAULT 0,
  cost_material numeric DEFAULT 0,
  cost_labor numeric DEFAULT 0,
  total_budget numeric DEFAULT 0,
  private_notes text, internal_comments text,
  history jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_projects TO authenticated;
GRANT ALL ON public.partner_projects TO service_role;
ALTER TABLE public.partner_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pproj_all" ON public.partner_projects FOR ALL TO authenticated USING (auth.uid() = user_id OR has_role(auth.uid(),'admin')) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_pproj_upd BEFORE UPDATE ON public.partner_projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- partner_project_clients
CREATE TABLE public.partner_project_clients (
  project_id uuid NOT NULL REFERENCES public.partner_projects(id) ON DELETE CASCADE,
  client_id uuid NOT NULL REFERENCES public.partner_clients(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  PRIMARY KEY (project_id, client_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_project_clients TO authenticated;
GRANT ALL ON public.partner_project_clients TO service_role;
ALTER TABLE public.partner_project_clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ppc_all" ON public.partner_project_clients FOR ALL TO authenticated USING (auth.uid() = user_id OR has_role(auth.uid(),'admin')) WITH CHECK (auth.uid() = user_id);

-- partner_project_documents
CREATE TABLE public.partner_project_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.partner_projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  kind text NOT NULL DEFAULT 'document',
  name text NOT NULL, url text NOT NULL, size_bytes bigint,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_project_documents TO authenticated;
GRANT ALL ON public.partner_project_documents TO service_role;
ALTER TABLE public.partner_project_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ppd_all" ON public.partner_project_documents FOR ALL TO authenticated USING (auth.uid() = user_id OR has_role(auth.uid(),'admin')) WITH CHECK (auth.uid() = user_id);

-- partner_project_media
CREATE TABLE public.partner_project_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.partner_projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  kind text NOT NULL DEFAULT 'photo',
  url text NOT NULL, caption text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_project_media TO authenticated;
GRANT ALL ON public.partner_project_media TO service_role;
ALTER TABLE public.partner_project_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ppm_all" ON public.partner_project_media FOR ALL TO authenticated USING (auth.uid() = user_id OR has_role(auth.uid(),'admin')) WITH CHECK (auth.uid() = user_id);

-- partner_media_library
CREATE TABLE public.partner_media_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL, description text, category text,
  url text NOT NULL, thumbnail_url text,
  tags text[] DEFAULT '{}',
  downloadable boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_media_library TO authenticated;
GRANT ALL ON public.partner_media_library TO service_role;
ALTER TABLE public.partner_media_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pml_select" ON public.partner_media_library FOR SELECT TO authenticated USING (is_partner(auth.uid()) OR has_role(auth.uid(),'admin'));
CREATE POLICY "pml_insert" ON public.partner_media_library FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "pml_update" ON public.partner_media_library FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin'));
CREATE POLICY "pml_delete" ON public.partner_media_library FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'));

-- partner_ai_simulations
CREATE TABLE public.partner_ai_simulations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  project_id uuid REFERENCES public.partner_projects(id) ON DELETE SET NULL,
  source_image_url text, result_image_url text,
  product text, color text, finish text,
  surface_m2 numeric, tech_sheet jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_ai_simulations TO authenticated;
GRANT ALL ON public.partner_ai_simulations TO service_role;
ALTER TABLE public.partner_ai_simulations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pas_all" ON public.partner_ai_simulations FOR ALL TO authenticated USING (auth.uid() = user_id OR has_role(auth.uid(),'admin')) WITH CHECK (auth.uid() = user_id);

-- partner_appointments
CREATE TABLE public.partner_appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  kind text NOT NULL DEFAULT 'call',
  scheduled_at timestamptz NOT NULL,
  duration_min integer NOT NULL DEFAULT 30,
  status text NOT NULL DEFAULT 'pending',
  subject text, notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_appointments TO authenticated;
GRANT ALL ON public.partner_appointments TO service_role;
ALTER TABLE public.partner_appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pa_all" ON public.partner_appointments FOR ALL TO authenticated USING (auth.uid() = user_id OR has_role(auth.uid(),'admin')) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_pa_upd BEFORE UPDATE ON public.partner_appointments FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- partner_events
CREATE TABLE public.partner_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL, description text, event_type text,
  starts_at timestamptz NOT NULL, ends_at timestamptz,
  location text, capacity integer NOT NULL DEFAULT 0,
  cover_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_events TO authenticated;
GRANT ALL ON public.partner_events TO service_role;
ALTER TABLE public.partner_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pe_select" ON public.partner_events FOR SELECT TO authenticated USING (is_partner(auth.uid()) OR has_role(auth.uid(),'admin'));
CREATE POLICY "pe_insert" ON public.partner_events FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "pe_update" ON public.partner_events FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin'));
CREATE POLICY "pe_delete" ON public.partner_events FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'));

-- partner_event_registrations
CREATE TABLE public.partner_event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES public.partner_events(id) ON DELETE CASCADE,
  user_id uuid NOT NULL, seats integer NOT NULL DEFAULT 1,
  status text NOT NULL DEFAULT 'confirmed',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (event_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_event_registrations TO authenticated;
GRANT ALL ON public.partner_event_registrations TO service_role;
ALTER TABLE public.partner_event_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "per_select" ON public.partner_event_registrations FOR SELECT TO authenticated USING (auth.uid() = user_id OR has_role(auth.uid(),'admin'));
CREATE POLICY "per_insert" ON public.partner_event_registrations FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND is_partner(auth.uid()));
CREATE POLICY "per_update" ON public.partner_event_registrations FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "per_delete" ON public.partner_event_registrations FOR DELETE TO authenticated USING (auth.uid() = user_id OR has_role(auth.uid(),'admin'));

-- partner_activity_log
CREATE TABLE public.partner_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  action text NOT NULL, entity text, entity_id uuid,
  meta jsonb, ip text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.partner_activity_log TO authenticated;
GRANT ALL ON public.partner_activity_log TO service_role;
ALTER TABLE public.partner_activity_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pal_select" ON public.partner_activity_log FOR SELECT TO authenticated USING (auth.uid() = user_id OR has_role(auth.uid(),'admin'));
CREATE POLICY "pal_insert" ON public.partner_activity_log FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- partner_access_requests
CREATE TABLE public.partner_access_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL DEFAULT 'architect',
  first_name text NOT NULL, last_name text NOT NULL,
  email text NOT NULL, phone text, company text, country text,
  message text, status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.partner_access_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.partner_access_requests TO authenticated;
GRANT ALL ON public.partner_access_requests TO service_role;
ALTER TABLE public.partner_access_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "par_insert" ON public.partner_access_requests FOR INSERT TO anon, authenticated WITH CHECK (length(first_name)>=1 AND length(last_name)>=1 AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$');
CREATE POLICY "par_select" ON public.partner_access_requests FOR SELECT TO authenticated USING (has_role(auth.uid(),'admin'));
CREATE POLICY "par_update" ON public.partner_access_requests FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin'));

-- Auto-create partner profile when role granted
CREATE OR REPLACE FUNCTION public.handle_new_partner_role()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE u_email text;
BEGIN
  IF NEW.role IN ('architect','builder') THEN
    SELECT email INTO u_email FROM auth.users WHERE id = NEW.user_id;
    INSERT INTO public.partner_profiles (user_id, kind, email)
    VALUES (NEW.user_id, NEW.role::text, u_email)
    ON CONFLICT (user_id) DO UPDATE SET kind = EXCLUDED.kind;
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_handle_new_partner_role ON public.user_roles;
CREATE TRIGGER trg_handle_new_partner_role AFTER INSERT ON public.user_roles
FOR EACH ROW EXECUTE FUNCTION public.handle_new_partner_role();

-- Private storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('partner-media','partner-media', false) ON CONFLICT (id) DO NOTHING;
CREATE POLICY "partner_media_read" ON storage.objects FOR SELECT TO authenticated USING (bucket_id='partner-media' AND (auth.uid()::text = (storage.foldername(name))[1] OR has_role(auth.uid(),'admin')));
CREATE POLICY "partner_media_insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id='partner-media' AND auth.uid()::text = (storage.foldername(name))[1] AND is_partner(auth.uid()));
CREATE POLICY "partner_media_update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id='partner-media' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "partner_media_delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id='partner-media' AND (auth.uid()::text = (storage.foldername(name))[1] OR has_role(auth.uid(),'admin')));
