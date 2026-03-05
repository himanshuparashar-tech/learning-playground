-- Add bill_periods table to store total bill per house+period
-- Run this in Supabase Dashboard → SQL Editor → New query

CREATE TABLE IF NOT EXISTS bill_periods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  house_id UUID NOT NULL REFERENCES houses(id) ON DELETE CASCADE,
  reading_period TEXT NOT NULL,
  total_bill DECIMAL,
  per_unit_cost DECIMAL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(house_id, reading_period)
);

-- Enable RLS and allow access
ALTER TABLE bill_periods ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON bill_periods FOR ALL USING (true);
