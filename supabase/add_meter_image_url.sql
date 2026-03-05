-- Fix: "Could not find the 'meter_image_url' column of 'readings' in the schema cache"
-- Run this in Supabase Dashboard → SQL Editor → New query

ALTER TABLE readings ADD COLUMN IF NOT EXISTS meter_image_url TEXT;
ALTER TABLE motor_readings ADD COLUMN IF NOT EXISTS meter_image_url TEXT;
