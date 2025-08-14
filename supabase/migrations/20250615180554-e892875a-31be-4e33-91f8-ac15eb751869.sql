

-- Create an 'orders' table for tracking one-off Stripe payments (optional for logging)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  stripe_session_id TEXT UNIQUE,
  amount INTEGER,
  currency TEXT DEFAULT 'usd',
  status TEXT,
  raffle_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read orders
CREATE POLICY "Allow anyone to read orders"
  ON public.orders
  FOR SELECT
  USING (true);

-- Policy: Allow anyone to insert orders
CREATE POLICY "Allow anyone to insert orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow anyone to update orders
CREATE POLICY "Allow anyone to update orders"
  ON public.orders
  FOR UPDATE
  USING (true);

-- Policy: Allow anyone to delete orders
CREATE POLICY "Allow anyone to delete orders"
  ON public.orders
  FOR DELETE
  USING (true);

