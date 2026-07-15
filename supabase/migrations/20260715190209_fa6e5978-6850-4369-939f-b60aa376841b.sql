
DROP POLICY IF EXISTS "Public reads contractor media files" ON storage.objects;

CREATE POLICY "Public reads media of published contractors"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'contractor-media'
  AND array_length(storage.foldername(name), 1) >= 1
  AND EXISTS (
    SELECT 1 FROM public.contractor_profiles cp
    WHERE cp.user_id::text = (storage.foldername(name))[1]
      AND cp.is_published = true
  )
);

CREATE POLICY "Owners read own contractor media"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'contractor-media'
  AND (
    auth.uid()::text = (storage.foldername(name))[1]
    OR public.has_role(auth.uid(), 'admin')
  )
);
