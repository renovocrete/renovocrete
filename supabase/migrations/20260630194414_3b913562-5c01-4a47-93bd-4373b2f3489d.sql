
-- 1. Revoke EXECUTE on SECURITY DEFINER helper functions from anon/public
REVOKE EXECUTE ON FUNCTION public.is_conv_participant(uuid, uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_partner(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_account_active(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_partner_role() FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.is_partner(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_conv_participant(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_account_active(uuid) TO authenticated;

-- 2. chatbot_conversations: drop overly-permissive UPDATE policy
DROP POLICY IF EXISTS "service updates" ON public.chatbot_conversations;
CREATE POLICY "admin updates chatbot conv"
  ON public.chatbot_conversations
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 3. contractor_profiles: remove anon SELECT on base table; rely on public view
DROP POLICY IF EXISTS "Anon views published profile safe cols" ON public.contractor_profiles;
REVOKE SELECT ON public.contractor_profiles FROM anon;
GRANT SELECT ON public.contractor_profiles_public TO anon, authenticated;

-- 4. partner_media_update: add is_partner / admin guard
DROP POLICY IF EXISTS "partner_media_update" ON storage.objects;
CREATE POLICY "partner_media_update"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'partner-media'
    AND (auth.uid())::text = (storage.foldername(name))[1]
    AND (public.is_partner(auth.uid()) OR public.has_role(auth.uid(), 'admin'::public.app_role))
  )
  WITH CHECK (
    bucket_id = 'partner-media'
    AND (auth.uid())::text = (storage.foldername(name))[1]
    AND (public.is_partner(auth.uid()) OR public.has_role(auth.uid(), 'admin'::public.app_role))
  );

-- 5. Remove private message tables from realtime publication to prevent any
-- cross-user channel leakage. RLS on base tables already protects reads, but
-- this ensures change events are not broadcast at all.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='messages'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.messages';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='conversations'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.conversations';
  END IF;
END $$;
