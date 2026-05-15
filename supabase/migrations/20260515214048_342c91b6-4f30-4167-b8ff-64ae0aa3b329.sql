
ALTER TABLE public.contractor_profiles
  ADD COLUMN IF NOT EXISTS show_phone boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS show_email boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS show_address boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS show_social boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS service_areas text[] NOT NULL DEFAULT '{}'::text[];

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS is_public boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS cost_material numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS cost_labor numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS short_description text;

-- Public read of projects when contractor is published AND project is_public
DROP POLICY IF EXISTS "Public reads published showcased projects" ON public.projects;
CREATE POLICY "Public reads published showcased projects"
ON public.projects FOR SELECT
TO anon, authenticated
USING (
  is_public = true
  AND EXISTS (
    SELECT 1 FROM public.contractor_profiles cp
    WHERE cp.user_id = projects.user_id AND cp.is_published = true
  )
);
