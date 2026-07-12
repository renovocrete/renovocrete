
CREATE TABLE public.contractor_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL DEFAULT ('CMD-' || to_char(now(),'YYYYMMDD-HH24MISS') || '-' || substr(gen_random_uuid()::text,1,4)),
  status TEXT NOT NULL DEFAULT 'draft',
  currency TEXT NOT NULL DEFAULT 'EUR',
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
  notes TEXT,
  contact_phone TEXT,
  shipping_address TEXT,
  client_sheet_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.contractor_orders TO authenticated;
GRANT ALL ON public.contractor_orders TO service_role;

ALTER TABLE public.contractor_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owner manages own orders"
  ON public.contractor_orders FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins see all orders"
  ON public.contractor_orders FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update orders"
  ON public.contractor_orders FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_contractor_orders_updated_at
  BEFORE UPDATE ON public.contractor_orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_now();
