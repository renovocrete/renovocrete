
-- price tier + SXM flag on contractor profile
ALTER TABLE public.contractor_profiles
  ADD COLUMN IF NOT EXISTS price_tier TEXT NOT NULL DEFAULT 'conseille'
    CHECK (price_tier IN ('conseille','gros_chantier','premium')),
  ADD COLUMN IF NOT EXISTS is_sxm BOOLEAN NOT NULL DEFAULT true;

-- shipping fee + tier snapshot on orders
ALTER TABLE public.contractor_orders
  ADD COLUMN IF NOT EXISTS shipping_fee_amount NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS shipping_fee_note TEXT,
  ADD COLUMN IF NOT EXISTS applied_price_tier TEXT NOT NULL DEFAULT 'conseille',
  ADD COLUMN IF NOT EXISTS total_amount NUMERIC GENERATED ALWAYS AS (COALESCE(subtotal,0) + COALESCE(shipping_fee_amount,0)) STORED;

-- Admin can update orders (shipping fees, status, assignment)
DROP POLICY IF EXISTS "Admins can update all orders" ON public.contractor_orders;
CREATE POLICY "Admins can update all orders"
  ON public.contractor_orders FOR UPDATE
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Admin can update contractor profiles (price tier)
DROP POLICY IF EXISTS "Admins can update all contractor profiles" ON public.contractor_profiles;
CREATE POLICY "Admins can update all contractor profiles"
  ON public.contractor_profiles FOR UPDATE
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));
