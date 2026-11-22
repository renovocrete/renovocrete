DROP POLICY IF EXISTS "Anyone can submit quote requests" ON public.quote_requests;
CREATE POLICY "Anyone can submit quote requests" ON public.quote_requests
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 200
  AND length(email) BETWEEN 3 AND 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(message)) BETWEEN 1 AND 5000
  AND (phone IS NULL OR length(phone) <= 50)
  AND (project_type IS NULL OR length(project_type) <= 200)
  AND (surface_m2 IS NULL OR (surface_m2 >= 0 AND surface_m2 <= 1000000))
);

DROP POLICY IF EXISTS "Anyone can submit a training signup" ON public.training_signups;
CREATE POLICY "Anyone can submit a training signup" ON public.training_signups
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(first_name)) BETWEEN 1 AND 100
  AND length(btrim(last_name)) BETWEEN 1 AND 100
  AND length(email) BETWEEN 3 AND 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(city)) BETWEEN 1 AND 120
  AND length(btrim(state_region)) BETWEEN 1 AND 120
  AND length(btrim(country)) BETWEEN 1 AND 120
  AND (company_name IS NULL OR length(company_name) <= 200)
  AND (company_website IS NULL OR length(company_website) <= 500)
  AND (preferred_location IS NULL OR length(preferred_location) <= 200)
  AND (notes IS NULL OR length(notes) <= 5000)
  AND coalesce(array_length(interests, 1), 0) <= 50
);

DROP POLICY IF EXISTS "anyone creates chatbot conv" ON public.chatbot_conversations;
CREATE POLICY "anyone creates chatbot conv" ON public.chatbot_conversations
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(session_id) BETWEEN 8 AND 200
  AND (user_id IS NULL OR user_id = auth.uid())
  AND assigned_admin_id IS NULL
  AND unread_admin = 0 AND unread_visitor = 0
  AND (visitor_name IS NULL OR length(visitor_name) <= 200)
  AND (visitor_email IS NULL OR length(visitor_email) <= 255)
);