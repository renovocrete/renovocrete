CREATE TABLE public.site_content (
 key text PRIMARY KEY CHECK (key IN ('website')),
 content jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(content) = 'object' AND octet_length(content::text) <= 1000000),
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Website content visible to visitors" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Active admins manage website content" ON public.site_content FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') AND public.is_account_active(auth.uid())) WITH CHECK (public.has_role(auth.uid(), 'admin') AND public.is_account_active(auth.uid()));
CREATE TRIGGER site_content_updated BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "View website photos" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'site-media');
CREATE POLICY "Active admins upload website photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin') AND public.is_account_active(auth.uid()));
CREATE POLICY "Active admins update website photos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin') AND public.is_account_active(auth.uid())) WITH CHECK (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin') AND public.is_account_active(auth.uid()));
CREATE POLICY "Active admins remove website photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin') AND public.is_account_active(auth.uid()));