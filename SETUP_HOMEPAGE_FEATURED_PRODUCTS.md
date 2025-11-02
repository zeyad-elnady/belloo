# Setup Homepage Featured Products

## ⚠️ IMPORTANT: Run this SQL in Supabase FIRST

Before using the Homepage Featured Products feature, you MUST create the database table.

### Step-by-Step Instructions:

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New Query" button

3. **Copy and Paste This SQL:**

```sql
-- Create homepage featured products table (CORRECTED FOR UUID)
CREATE TABLE IF NOT EXISTS homepage_featured_products (
  id SERIAL PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  position INTEGER NOT NULL CHECK (position >= 1 AND position <= 6),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(position)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_homepage_featured_position 
ON homepage_featured_products(position);

-- Enable Row Level Security
ALTER TABLE homepage_featured_products ENABLE ROW LEVEL SECURITY;

-- Allow public to read featured products
CREATE POLICY "Allow public read access" ON homepage_featured_products
FOR SELECT USING (true);

-- Allow authenticated users to manage featured products
CREATE POLICY "Allow authenticated users to manage" ON homepage_featured_products
FOR ALL USING (auth.role() = 'authenticated');
```

4. **Click the "Run" button** (green play button in top right)

5. **You should see:** `Success. No rows returned`

6. **Done!** Now the feature will work.

---

## How to Use (After Setup):

1. Go to: http://localhost:3000/website-editor
2. Click the "Homepage" tab
3. Select 6 products from the dropdowns
4. Click "Save Featured Products"
5. Visit homepage to see your selection!

---

## Troubleshooting:

**Error: "Failed to save featured products"**
- ✅ Make sure you ran the SQL above in Supabase
- ✅ Check that you're logged into the admin panel
- ✅ Verify your Supabase connection is working

**Products not showing on homepage**
- ✅ Make sure products are marked as "Published"
- ✅ Refresh the homepage after saving
- ✅ Check browser console for errors

**Can't select products**
- ✅ Make sure you have published products in your database
- ✅ Go to Products tab and publish at least 6 products

