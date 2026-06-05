
-- =======================================================
-- ACCOUNT STATUS
-- =======================================================
DO $$ BEGIN
  CREATE TYPE public.account_status_enum AS ENUM ('active','disabled','suspended','pending','deleted');
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS public.account_status (
  user_id uuid PRIMARY KEY,
  status public.account_status_enum NOT NULL DEFAULT 'active',
  reason text,
  updated_by uuid,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.account_status TO authenticated;
GRANT ALL ON public.account_status TO service_role;
ALTER TABLE public.account_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user reads own status" ON public.account_status FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin manages status" ON public.account_status FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.is_account_active(_uid uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE((SELECT status = 'active' FROM public.account_status WHERE user_id = _uid), true)
$$;

-- =======================================================
-- ADMIN PERMISSIONS (per-user JSON, evolutive)
-- =======================================================
CREATE TABLE IF NOT EXISTS public.admin_permissions (
  user_id uuid PRIMARY KEY,
  permissions jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_by uuid,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.admin_permissions TO authenticated;
GRANT ALL ON public.admin_permissions TO service_role;
ALTER TABLE public.admin_permissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user reads own perms" ON public.admin_permissions FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin manages perms" ON public.admin_permissions FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- =======================================================
-- ADMIN IMPERSONATION LOG
-- =======================================================
CREATE TABLE IF NOT EXISTS public.admin_impersonation_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid NOT NULL,
  target_user_id uuid NOT NULL,
  reason text,
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz
);
GRANT SELECT, INSERT, UPDATE ON public.admin_impersonation_log TO authenticated;
GRANT ALL ON public.admin_impersonation_log TO service_role;
ALTER TABLE public.admin_impersonation_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin only" ON public.admin_impersonation_log FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- =======================================================
-- INTERNAL MESSAGING
-- =======================================================
CREATE TABLE IF NOT EXISTS public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text,
  created_by uuid NOT NULL,
  last_message_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.conversations TO authenticated;
GRANT ALL ON public.conversations TO service_role;

CREATE TABLE IF NOT EXISTS public.conversation_participants (
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  role text NOT NULL DEFAULT 'member',
  last_read_at timestamptz,
  PRIMARY KEY (conversation_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.conversation_participants TO authenticated;
GRANT ALL ON public.conversation_participants TO service_role;

CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL,
  body text NOT NULL,
  attachments jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;

CREATE OR REPLACE FUNCTION public.is_conv_participant(_conv uuid, _uid uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.conversation_participants WHERE conversation_id = _conv AND user_id = _uid)
$$;

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "participant or admin read conv" ON public.conversations FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.is_conv_participant(id, auth.uid()));
CREATE POLICY "admin or participant create" ON public.conversations FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "admin updates conv" ON public.conversations FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.is_conv_participant(id, auth.uid()));

ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "self or admin read participants" ON public.conversation_participants FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin') OR public.is_conv_participant(conversation_id, auth.uid()));
CREATE POLICY "admin manages participants" ON public.conversation_participants FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "user updates own row" ON public.conversation_participants FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "participant or admin read msg" ON public.messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.is_conv_participant(conversation_id, auth.uid()));
CREATE POLICY "participant sends" ON public.messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id AND (public.has_role(auth.uid(),'admin') OR public.is_conv_participant(conversation_id, auth.uid())));

-- realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversations;

-- =======================================================
-- CHATBOT PUBLIC
-- =======================================================
CREATE TABLE IF NOT EXISTS public.chatbot_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_id uuid,
  started_at timestamptz NOT NULL DEFAULT now(),
  last_message_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS chatbot_conv_session ON public.chatbot_conversations(session_id);
GRANT SELECT, INSERT, UPDATE ON public.chatbot_conversations TO anon, authenticated;
GRANT ALL ON public.chatbot_conversations TO service_role;
ALTER TABLE public.chatbot_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone creates chatbot conv" ON public.chatbot_conversations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admin reads all chatbot conv" ON public.chatbot_conversations FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR user_id = auth.uid());
CREATE POLICY "service updates" ON public.chatbot_conversations FOR UPDATE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS public.chatbot_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.chatbot_conversations(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user','assistant','system')),
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.chatbot_messages TO anon, authenticated;
GRANT ALL ON public.chatbot_messages TO service_role;
ALTER TABLE public.chatbot_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone inserts chatbot msg" ON public.chatbot_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admin reads chatbot msg" ON public.chatbot_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE TABLE IF NOT EXISTS public.chatbot_knowledge (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  tags text[] DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.chatbot_knowledge TO anon, authenticated;
GRANT ALL ON public.chatbot_knowledge TO service_role;
ALTER TABLE public.chatbot_knowledge ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public reads active kb" ON public.chatbot_knowledge FOR SELECT TO anon, authenticated USING (is_active = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin manages kb" ON public.chatbot_knowledge FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- triggers updated_at
CREATE TRIGGER set_chatbot_kb_updated BEFORE UPDATE ON public.chatbot_knowledge FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_account_status_updated BEFORE UPDATE ON public.account_status FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_admin_perms_updated BEFORE UPDATE ON public.admin_permissions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
