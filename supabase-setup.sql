-- Run this in your Supabase SQL editor
-- https://supabase.com/dashboard/project/grclykrieequkoxgzujo/sql

CREATE TABLE IF NOT EXISTS restaurant_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  address TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 2.99,
  total DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE restaurant_orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (place an order)
CREATE POLICY "Anyone can place orders"
  ON restaurant_orders FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read their own order by ID (for order status page)
CREATE POLICY "Anyone can read orders"
  ON restaurant_orders FOR SELECT
  USING (true);

-- Allow authenticated users (admin) to update order status
CREATE POLICY "Admin can update orders"
  ON restaurant_orders FOR UPDATE
  USING (auth.role() = 'authenticated');
