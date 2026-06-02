
-- 1) Tighten base table policies: drop public/anon SELECT, keep owner+admin SELECT
DROP POLICY IF EXISTS "Anyone views published profiles" ON public.contractor_profiles;
CREATE POLICY "Owner or admin views profile"
  ON public.contractor_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Public reads published showcased projects" ON public.projects;
-- Owner/admin SELECT policy already exists on projects

-- Revoke broad table grants from anon (views will expose safe subset)
REVOKE SELECT ON public.contractor_profiles FROM anon;
REVOKE SELECT ON public.projects FROM anon;

-- 2) Safe public view of contractor profiles (security_invoker=off => bypasses RLS, view itself filters)
DROP VIEW IF EXISTS public.contractor_profiles_public;
CREATE VIEW public.contractor_profiles_public
WITH (security_invoker = off) AS
SELECT
  id, user_id, slug, company_name, contact_name, tagline, bio,
  avatar_url, cover_url, website, city, country,
  specialties, certifications, years_experience,
  is_published, is_featured, service_areas,
  show_phone, show_email, show_address, show_social,
  CASE WHEN show_phone   THEN phone     ELSE NULL END AS phone,
  CASE WHEN show_email   THEN email     ELSE NULL END AS email,
  CASE WHEN show_address THEN address   ELSE NULL END AS address,
  CASE WHEN show_social  THEN instagram ELSE NULL END AS instagram,
  CASE WHEN show_social  THEN facebook  ELSE NULL END AS facebook,
  created_at, updated_at
FROM public.contractor_profiles
WHERE is_published = true;

GRANT SELECT ON public.contractor_profiles_public TO anon, authenticated;

-- 3) Safe public view of projects (presentation fields only)
DROP VIEW IF EXISTS public.projects_public;
CREATE VIEW public.projects_public
WITH (security_invoker = off) AS
SELECT
  p.id, p.user_id, p.title, p.short_description,
  p.product_type, p.color, p.surface_m2,
  p.before_photo, p.after_photo,
  p.start_date, p.end_date, p.status,
  p.created_at
FROM public.projects p
WHERE p.is_public = true
  AND EXISTS (
    SELECT 1 FROM public.contractor_profiles cp
    WHERE cp.user_id = p.user_id AND cp.is_published = true
  );

GRANT SELECT ON public.projects_public TO anon, authenticated;
