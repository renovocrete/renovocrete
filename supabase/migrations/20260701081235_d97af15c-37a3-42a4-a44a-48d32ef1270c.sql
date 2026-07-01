
ALTER TABLE public.chatbot_conversations
  ADD COLUMN IF NOT EXISTS visitor_name text,
  ADD COLUMN IF NOT EXISTS visitor_email text,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'bot',
  ADD COLUMN IF NOT EXISTS assigned_admin_id uuid,
  ADD COLUMN IF NOT EXISTS unread_admin integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS unread_visitor integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='chatbot_conversations_status_check') THEN
    ALTER TABLE public.chatbot_conversations
      ADD CONSTRAINT chatbot_conversations_status_check CHECK (status IN ('bot','human','closed'));
  END IF;
END $$;

ALTER TABLE public.chatbot_messages DROP CONSTRAINT IF EXISTS chatbot_messages_role_check;
ALTER TABLE public.chatbot_messages
  ADD CONSTRAINT chatbot_messages_role_check CHECK (role IN ('user','assistant','system','admin'));

-- Admin write access to messages (for the admin live-chat UI directly)
DROP POLICY IF EXISTS "admin writes chatbot msg" ON public.chatbot_messages;
CREATE POLICY "admin writes chatbot msg" ON public.chatbot_messages
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS idx_chatbot_conv_status ON public.chatbot_conversations(status, last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_chatbot_msg_conv ON public.chatbot_messages(conversation_id, created_at);
