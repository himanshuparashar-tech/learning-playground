-- Fix: "column readings.house_id does not exist"
-- Run this in Supabase Dashboard → SQL Editor → New query

-- 1. Ensure houses table exists

CREATE TABLE IF NOT EXISTS houses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  house_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE houses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON houses FOR ALL USING (true);

-- 2. Insert default house if none exists

INSERT INTO houses (house_name)
SELECT 'Default House' WHERE NOT EXISTS (SELECT 1 FROM houses);

-- 3. Add house_id to readings

ALTER TABLE readings ADD COLUMN IF NOT EXISTS house_id UUID REFERENCES houses(id) ON DELETE CASCADE;
UPDATE readings SET house_id = (SELECT id FROM houses ORDER BY created_at LIMIT 1) WHERE house_id IS NULL;
ALTER TABLE readings ALTER COLUMN house_id SET NOT NULL;

-- 4. Add house_id to motor_readings (if table exists)

ALTER TABLE motor_readings ADD COLUMN IF NOT EXISTS house_id UUID REFERENCES houses(id) ON DELETE CASCADE;
UPDATE motor_readings SET house_id = (SELECT id FROM houses ORDER BY created_at LIMIT 1) WHERE house_id IS NULL;
ALTER TABLE motor_readings ALTER COLUMN house_id SET NOT NULL;

-- 5. Add house_id to members (optional)

ALTER TABLE members ADD COLUMN IF NOT EXISTS house_id UUID REFERENCES houses(id) ON DELETE CASCADE;
UPDATE members SET house_id = (SELECT id FROM houses ORDER BY created_at LIMIT 1) WHERE house_id IS NULL;
