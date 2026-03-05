# Supabase Integration Guide for HBC

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
-- Members table (for each household)
CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT,  -- optional: link to auth user
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Readings history (monthly records)
CREATE TABLE readings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT,
  reading_period TEXT,  -- e.g. '2025-03'
  member_id TEXT NOT NULL,
  member_name TEXT NOT NULL,
  previous_reading DECIMAL,
  current_reading DECIMAL,
  units DECIMAL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Motor readings
CREATE TABLE motor_readings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT,
  reading_period TEXT,
  previous_reading DECIMAL,
  current_reading DECIMAL,
  units DECIMAL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS) - allow all for now (you can restrict later)
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE motor_readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all" ON members FOR ALL USING (true);
CREATE POLICY "Allow all" ON readings FOR ALL USING (true);
CREATE POLICY "Allow all" ON motor_readings FOR ALL USING (true);
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
