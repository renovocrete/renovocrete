
-- Switch views to security_invoker (run as caller, RLS applies)
ALTER VIEW public.contractor_profiles_public SET (security_invoker = on);
ALTER VIEW public.projects_public SET (security_invoker = on);

-- Allow anon to read published rows from base tables (RLS), then restrict columns via GRANT
CREATE POLICY "Anon views published profile safe cols"
  ON public.contractor_profiles
  FOR SELECT
  TO anon
  USING (is_published = true);

CREATE POLICY "Anon views public project safe cols"
  ON public.projects
  FOR SELECT
  TO anon
  USING (
    is_public = true
    AND EXISTS (
      SELECT 1 FROM public.contractor_profiles cp
      WHERE cp.user_id = projects.user_id AND cp.is_published = true
    )
  );

-- Column-level grants: anon can only read non-sensitive columns
GRANT SELECT (
  id, user_id, slug, company_name, contact_name, tagline, bio,
  avatar_url, cover_url, website, city, country,
  specialties, certifications, years_experience,
  is_published, is_featured, service_areas,
  show_phone, show_email, show_address, show_social,
  created_at, updated_at
) ON public.contractor_profiles TO anon;

GRANT SELECT (
  id, user_id, title, short_description,
  product_type, color, surface_m2,
  before_photo, after_photo,
  start_date, end_date, status, is_public, created_at
) ON public.projects TO anon;
