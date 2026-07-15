
ALTER TABLE public.contractor_orders
  ADD COLUMN IF NOT EXISTS company_name TEXT,
  ADD COLUMN IF NOT EXISTS contact_name TEXT,
  ADD COLUMN IF NOT EXISTS contact_email TEXT,
  ADD COLUMN IF NOT EXISTS project_name TEXT,
  ADD COLUMN IF NOT EXISTS project_city TEXT,
  ADD COLUMN IF NOT EXISTS system_key TEXT,
  ADD COLUMN IF NOT EXISTS system_label TEXT,
  ADD COLUMN IF NOT EXISTS surface_m2 NUMERIC,
  ADD COLUMN IF NOT EXISTS delivery_mode TEXT,
  ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS layers_snapshot JSONB,
  ADD COLUMN IF NOT EXISTS assigned_to UUID,
  ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS email_error TEXT;

CREATE OR REPLACE FUNCTION public.set_order_number()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := 'RC-' || to_char(now(),'YYMMDD') || '-' || upper(substring(replace(NEW.id::text,'-',''),1,6));
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_order_number ON public.contractor_orders;
CREATE TRIGGER trg_order_number BEFORE INSERT ON public.contractor_orders
FOR EACH ROW EXECUTE FUNCTION public.set_order_number();

CREATE TABLE IF NOT EXISTS public.contractor_order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.contractor_orders(id) ON DELETE CASCADE,
  from_status TEXT,
  to_status TEXT NOT NULL,
  note TEXT,
  changed_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.contractor_order_status_history TO authenticated;
GRANT ALL ON public.contractor_order_status_history TO service_role;
ALTER TABLE public.contractor_order_status_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "history readable by owner or admin" ON public.contractor_order_status_history;
CREATE POLICY "history readable by owner or admin"
ON public.contractor_order_status_history FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.contractor_orders o
    WHERE o.id = order_id
      AND (o.user_id = auth.uid() OR public.has_role(auth.uid(),'admin'))
  )
);

DROP POLICY IF EXISTS "admin can insert history" ON public.contractor_order_status_history;
CREATE POLICY "admin can insert history"
ON public.contractor_order_status_history FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "admin can read all orders" ON public.contractor_orders;
CREATE POLICY "admin can read all orders"
ON public.contractor_orders FOR SELECT TO authenticated
USING (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "admin can update all orders" ON public.contractor_orders;
CREATE POLICY "admin can update all orders"
ON public.contractor_orders FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(),'admin'))
WITH CHECK (public.has_role(auth.uid(),'admin'));
