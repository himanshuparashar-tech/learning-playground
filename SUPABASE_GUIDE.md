# Supabase Integration Guide for HBC

## Quick fix: "Could not find the 'meter_image_url' column"

If you see this error when saving readings:

1. Open **Supabase Dashboard** → **SQL Editor** → **New query**
2. Paste and run the SQL from `supabase/add_meter_image_url.sql`
3. Click **Run** (or Ctrl+Enter)
4. Refresh your app and try saving again

---

## Quick fix: "Could not find the table 'public.houses'"

If you see this error when adding a house, create the table in Supabase:

1. Open **Supabase Dashboard** → **SQL Editor** → **New query**
2. Paste and run the SQL from `supabase/create_houses_table.sql`
3. Click **Run** (or Ctrl+Enter)
4. Refresh your app and try adding a house again

---

## Quick fix: "column readings.house_id does not exist"

If you see this error in the Dashboard:

1. Open **Supabase Dashboard** → **SQL Editor** → **New query**
2. Paste and run the SQL from `supabase/add_house_id_to_readings.sql`
3. Click **Run** (or Ctrl+Enter)
4. Refresh your app

---

## What is Supabase?

**Supabase** is an open-source Firebase alternative. It provides:

| Feature | What it does |
|---------|--------------|
| **Database** | PostgreSQL database (store readings, members, history) |
| **Auth** | User login/signup (email, Google, etc.) |
| **Storage** | Store files (meter photos, PDFs) |
| **Realtime** | Live updates when data changes |

---

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) → Sign up / Log in
2. Click **New Project**
3. Choose organization, name (e.g. `hbc-app`), set a database password
4. Wait for project to be created
5. Go to **Project Settings** → **API** to get:
   - **Project URL** (e.g. `https://xxxxx.supabase.co`)
   - **anon public key** (safe to use in frontend)

---

## Step 2: Install Supabase

```bash
npm install @supabase/supabase-js
```

---

## Step 3: Create Supabase Client

Create `src/lib/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_PROJECT_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

Add to `.env` (create if not exists):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Step 4: Create Tables in Supabase

In Supabase Dashboard → **SQL Editor**, run:

```sql
-- Houses table (multi-house support)
CREATE TABLE houses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  house_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Members table (per house)
CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  house_id UUID REFERENCES houses(id) ON DELETE CASCADE,
  user_id TEXT,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Readings history (monthly records, per house)
CREATE TABLE readings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  house_id UUID NOT NULL REFERENCES houses(id) ON DELETE CASCADE,
  user_id TEXT,
  reading_period TEXT,
  member_id TEXT NOT NULL,
  member_name TEXT NOT NULL,
  previous_reading DECIMAL,
  current_reading DECIMAL,
  units DECIMAL,
  meter_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Motor readings (per house)
CREATE TABLE motor_readings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  house_id UUID NOT NULL REFERENCES houses(id) ON DELETE CASCADE,
  user_id TEXT,
  reading_period TEXT,
  previous_reading DECIMAL,
  current_reading DECIMAL,
  units DECIMAL,
  meter_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE houses ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE motor_readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all" ON houses FOR ALL USING (true);
CREATE POLICY "Allow all" ON members FOR ALL USING (true);
CREATE POLICY "Allow all" ON readings FOR ALL USING (true);
CREATE POLICY "Allow all" ON motor_readings FOR ALL USING (true);

-- Enable Realtime for Dashboard
ALTER PUBLICATION supabase_realtime ADD TABLE readings;
```

### Storage: Meter images bucket

1. In Supabase Dashboard → **Storage** → **New bucket**
2. Name: `meter-images`
3. Set to **Public** (so getPublicUrl works without signed URLs)
4. Create bucket
5. Path structure: `{house_id}/{period}/{member_id}.{ext}` (e.g. `uuid/2025-03/m_ashu.jpg`)

### Migration: Add meter_image_url to existing tables

```sql
ALTER TABLE readings ADD COLUMN IF NOT EXISTS meter_image_url TEXT;
ALTER TABLE motor_readings ADD COLUMN IF NOT EXISTS meter_image_url TEXT;
```

### Migration: Add multi-house to existing project

If you already have `members`, `readings`, `motor_readings` without `houses`, run:

```sql
-- 1. Create houses table
CREATE TABLE IF NOT EXISTS houses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  house_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Insert default house for existing data
INSERT INTO houses (house_name) VALUES ('Default House');

-- 3. Add house_id to readings
ALTER TABLE readings ADD COLUMN IF NOT EXISTS house_id UUID REFERENCES houses(id) ON DELETE CASCADE;
UPDATE readings SET house_id = (SELECT id FROM houses LIMIT 1) WHERE house_id IS NULL;
ALTER TABLE readings ALTER COLUMN house_id SET NOT NULL;

-- 4. Add house_id to motor_readings
ALTER TABLE motor_readings ADD COLUMN IF NOT EXISTS house_id UUID REFERENCES houses(id) ON DELETE CASCADE;
UPDATE motor_readings SET house_id = (SELECT id FROM houses LIMIT 1) WHERE house_id IS NULL;
ALTER TABLE motor_readings ALTER COLUMN house_id SET NOT NULL;

-- 5. Add house_id to members (optional, for per-house members)
ALTER TABLE members ADD COLUMN IF NOT EXISTS house_id UUID REFERENCES houses(id) ON DELETE CASCADE;
UPDATE members SET house_id = (SELECT id FROM houses LIMIT 1) WHERE house_id IS NULL;
```

---

## Step 5: How to Use in HBC

### A. Save readings to Supabase (after Calculate Bills)

```javascript
import { supabase } from '../lib/supabase';

const saveReadingsToSupabase = async () => {
  const period = readingPeriodDate || new Date().toISOString().slice(0, 7); // YYYY-MM

  // Save each member's readings
  for (const member of members) {
    const r = memberReadings[member.id];
    if (!r?.previous || !r?.current) continue;

    const units = parseFloat(r.current) - parseFloat(r.previous);

    await supabase.from('readings').insert({
      reading_period: period,
      member_id: member.id,
      member_name: member.name,
      previous_reading: parseFloat(r.previous),
      current_reading: parseFloat(r.current),
      units
    });
  }

  // Save motor readings
  if (waterPreviousReading && waterCurrentReading) {
    await supabase.from('motor_readings').insert({
      reading_period: period,
      previous_reading: parseFloat(waterPreviousReading),
      current_reading: parseFloat(waterCurrentReading),
      units: parseFloat(waterCurrentReading) - parseFloat(waterPreviousReading)
    });
  }
};
```

### B. Load history from Supabase

```javascript
const loadHistoryFromSupabase = async (period) => {
  const { data: readings } = await supabase
    .from('readings')
    .select('*')
    .eq('reading_period', period);

  const { data: motor } = await supabase
    .from('motor_readings')
    .select('*')
    .eq('reading_period', period)
    .single();

  return { readings, motor };
};
```

### C. List all saved periods

```javascript
const getSavedPeriods = async () => {
  const { data } = await supabase
    .from('readings')
    .select('reading_period')
    .order('reading_period', { ascending: false });

  const unique = [...new Set(data?.map(r => r.reading_period) || [])];
  return unique;
};
```

---

## Step 6: Storage for Meter Photos

For meter images, use Supabase Storage:

1. In Dashboard → **Storage** → Create bucket `meter-photos`
2. Set bucket to **Public** (or use signed URLs)

```javascript
// Upload meter photo
const uploadMeterPhoto = async (memberId, file) => {
  const ext = file.name.split('.').pop();
  const path = `${memberId}/${Date.now()}.${ext}`;

  const { data, error } = await supabase.storage
    .from('meter-photos')
    .upload(path, file, { upsert: true });

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('meter-photos')
    .getPublicUrl(path);

  return publicUrl;
};
```

---

## Quick Reference

| Action | Code |
|--------|------|
| Insert | `supabase.from('table').insert({...})` |
| Select | `supabase.from('table').select('*').eq('col', val)` |
| Update | `supabase.from('table').update({...}).eq('id', id)` |
| Delete | `supabase.from('table').delete().eq('id', id)` |

---

## Next Steps

1. Create Supabase project and get keys
2. Add `src/lib/supabase.js` and `.env`
3. Run the SQL to create tables
4. Add a "Save to Cloud" button in HBC that calls `saveReadingsToSupabase()`
5. Add a "Load History" dropdown to fetch and display past periods




<!-- Supabase credentials -->
Organization : himanshuparashar-tech
Project Name : hbc_app
Database Pswd: Learning@12345HP
