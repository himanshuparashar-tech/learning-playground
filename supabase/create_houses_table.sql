-- Fix: "Could not find the table 'public.houses' in the schema cache"
-- Run this in Supabase Dashboard → SQL Editor → New query

CREATE TABLE IF NOT EXISTS houses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  house_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS and allow access
ALTER TABLE houses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON houses FOR ALL USING (true);
