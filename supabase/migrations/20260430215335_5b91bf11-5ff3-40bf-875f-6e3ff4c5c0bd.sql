
-- Roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'contractor', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Contractor profiles
CREATE TABLE public.contractor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  slug TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  contact_name TEXT,
  tagline TEXT,
  bio TEXT,
  avatar_url TEXT,
  cover_url TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'Saint-Martin',
  specialties TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT ARRAY['Elite Crete Systems Certified'],
  years_experience INTEGER,
  instagram TEXT,
  facebook TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contractor_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone views published profiles" ON public.contractor_profiles FOR SELECT USING (is_published = true OR auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owner inserts own profile" ON public.contractor_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owner updates own profile" ON public.contractor_profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owner deletes own profile" ON public.contractor_profiles FOR DELETE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Contractor media (gallery)
CREATE TABLE public.contractor_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contractor_id UUID REFERENCES public.contractor_profiles(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'image',
  caption TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contractor_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone views media of published profiles" ON public.contractor_media FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.contractor_profiles cp WHERE cp.id = contractor_id AND (cp.is_published = true OR cp.user_id = auth.uid() OR public.has_role(auth.uid(), 'admin')))
);
CREATE POLICY "Owner manages own media" ON public.contractor_media FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.contractor_profiles cp WHERE cp.id = contractor_id AND cp.user_id = auth.uid())
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.contractor_profiles cp WHERE cp.id = contractor_id AND cp.user_id = auth.uid())
);

-- Projects (chantier dashboard)
CREATE TYPE public.project_status AS ENUM ('planned', 'in_progress', 'completed', 'on_hold');
CREATE TYPE public.project_priority AS ENUM ('low', 'medium', 'high', 'urgent');

CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  client_name TEXT,
  address TEXT,
  surface_m2 NUMERIC,
  product_type TEXT,
  color TEXT,
  status project_status NOT NULL DEFAULT 'planned',
  priority project_priority NOT NULL DEFAULT 'medium',
  revenue NUMERIC DEFAULT 0,
  start_date DATE,
  end_date DATE,
  notes TEXT,
  before_photo TEXT,
  after_photo TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owner views own projects" ON public.projects FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owner inserts own projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owner updates own projects" ON public.projects FOR UPDATE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owner deletes own projects" ON public.projects FOR DELETE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Quote requests (public)
CREATE TABLE public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contractor_id UUID REFERENCES public.contractor_profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  project_type TEXT,
  surface_m2 NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit quote requests" ON public.quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read all quote requests" ON public.quote_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Contractors read their quote requests" ON public.quote_requests FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.contractor_profiles cp WHERE cp.id = contractor_id AND cp.user_id = auth.uid())
);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_contractor_profiles_updated BEFORE UPDATE ON public.contractor_profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_projects_updated BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-assign 'contractor' role on signup + create empty profile shell
CREATE OR REPLACE FUNCTION public.handle_new_contractor() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  i INTEGER := 0;
BEGIN
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'contractor') ON CONFLICT DO NOTHING;
  base_slug := lower(regexp_replace(coalesce(NEW.raw_user_meta_data->>'company_name', split_part(NEW.email, '@', 1)), '[^a-z0-9]+', '-', 'gi'));
  base_slug := trim(both '-' from base_slug);
  final_slug := base_slug;
  WHILE EXISTS (SELECT 1 FROM public.contractor_profiles WHERE slug = final_slug) LOOP
    i := i + 1;
    final_slug := base_slug || '-' || i;
  END LOOP;
  INSERT INTO public.contractor_profiles (user_id, slug, company_name, contact_name, email)
  VALUES (NEW.id, final_slug, coalesce(NEW.raw_user_meta_data->>'company_name', 'Mon entreprise'), NEW.raw_user_meta_data->>'contact_name', NEW.email);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_contractor();

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('contractor-media', 'contractor-media', true);

CREATE POLICY "Public reads contractor media" ON storage.objects FOR SELECT USING (bucket_id = 'contractor-media');
CREATE POLICY "Auth users upload to own folder" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'contractor-media' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Auth users update own files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'contractor-media' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Auth users delete own files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'contractor-media' AND (storage.foldername(name))[1] = auth.uid()::text);
