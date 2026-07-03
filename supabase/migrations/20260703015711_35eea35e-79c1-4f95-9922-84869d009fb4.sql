DROP POLICY IF EXISTS "anyone inserts chatbot msg" ON public.chatbot_messages;
REVOKE INSERT ON public.chatbot_messages FROM anon, authenticated;