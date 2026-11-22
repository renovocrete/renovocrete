DROP POLICY IF EXISTS "View website photos" ON storage.objects;
CREATE POLICY "View published website photos" ON storage.objects FOR SELECT TO anon, authenticated
USING (
  bucket_id = 'site-media' AND EXISTS (
    SELECT 1 FROM public.site_content sc
    WHERE sc.key = 'website' AND position(('"site-media:' || storage.objects.name || '"') IN sc.content::text) > 0
  )
);
CREATE POLICY "Active admins view website photos" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin') AND public.is_account_active(auth.uid()));