# 🏠 Homepage Featured Products - Complete Guide

## ✅ What This Feature Does

This feature allows you (the admin) to **choose exactly which 6 products** appear in the "Popular Products" section on your homepage. You can:
- Select any products from your catalog
- Change them anytime
- See changes instantly on the live site

---

## ⚠️ ONE-TIME SETUP (Required First!)

Before you can use this feature, you MUST create a database table in Supabase.

### Step-by-Step Setup:

#### 1️⃣ Go to Supabase Dashboard
- Visit: https://supabase.com/dashboard
- Log in to your account
- Click on your **Belloo** project

#### 2️⃣ Open SQL Editor
- Click **"SQL Editor"** in the left sidebar
- Click **"New Query"** button (top right)

#### 3️⃣ Copy This SQL:
```sql
-- CREATE TABLE FOR HOMEPAGE FEATURED PRODUCTS (CORRECTED FOR UUID)
CREATE TABLE IF NOT EXISTS homepage_featured_products (
  id SERIAL PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  position INTEGER NOT NULL CHECK (position >= 1 AND position <= 6),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(position)
);

CREATE INDEX IF NOT EXISTS idx_homepage_featured_position
ON homepage_featured_products(position);

ALTER TABLE homepage_featured_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON homepage_featured_products
FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage" ON homepage_featured_products
FOR ALL USING (auth.role() = 'authenticated');
```

#### 4️⃣ Run the SQL
- Paste the SQL into the editor
- Click the green **"RUN"** button (▶)
- Wait for the success message
- ✅ You should see: **"Success. No rows returned"**

---

## 🎯 How to Use

### Step 1: Open Website Editor
1. Go to: http://localhost:3000/website-editor
2. Click the **"Homepage"** tab (between "News & Blog" and "Replace Images")

### Step 2: Select Your Products
You'll see 6 dropdown menus labeled "Position 1" through "Position 6":

1. **Position 1:** Click dropdown → Select a product (e.g., Whole Green Olives)
2. **Position 2:** Click dropdown → Select a product (e.g., Sliced Black Olives)
3. **Position 3:** Click dropdown → Select a product (e.g., Pepperoncini Pepper)
4. **Position 4:** Click dropdown → Select a product (e.g., Pitted Green Olives)
5. **Position 5:** Click dropdown → Select a product (e.g., Cherry Pepper)
6. **Position 6:** Click dropdown → Select a product (e.g., Artichoke Hearts)

💡 **Tip:** After selecting a product, you'll see a preview with the product image and category!

### Step 3: Save Your Selection
- Click the **"Save Featured Products"** button at the bottom
- Wait for the success message: **"Featured products updated successfully!"**
- ✅ Done!

### Step 4: View on Homepage
1. Go to: http://localhost:3000
2. Scroll down to the **"Popular Products"** section
3. You'll see your 6 selected products displayed beautifully!

---

## 🔄 Changing Products

Want to change which products are featured?

1. Go back to **Website Editor → Homepage tab**
2. Change any of the 6 dropdowns
3. Click **"Save Featured Products"**
4. Refresh the homepage to see the changes!

**You can do this as many times as you want!**

---

## 📋 Requirements

### Products Must Be:
- ✅ **Published** (marked as published in the Products section)
- ✅ **In your database** (added through the Website Editor)

### You Can Choose From:
All 28 products in your catalog, including:
- Whole Green Olives
- Pitted Green Olives
- Sliced Green Olives
- Whole Black Olives
- Pitted Black Olives
- Sliced Black Olives
- All Kalamata Olives variants
- All Picual Olives variants
- All Pepper variants (Pepperoncini, Cherry, Jalapeno, etc.)
- All Artichoke variants
- And more!

---

## ❓ Troubleshooting

### Problem: "Failed to save featured products"
**Solution:** You haven't run the SQL setup yet. Go back to the "ONE-TIME SETUP" section above.

### Problem: Dropdown is empty or shows "Loading products..."
**Solution:** 
1. Make sure you have products in your database
2. Check that products are marked as "Published"
3. Refresh the Website Editor page

### Problem: Selected product doesn't show on homepage
**Solution:**
1. Make sure you clicked "Save Featured Products"
2. Refresh the homepage (Ctrl+F5 or Cmd+Shift+R)
3. Check browser console for errors (F12)

### Problem: Images not loading correctly
**Solution:** This was already fixed! The images now show complete jars without cropping.

---

## 🎨 Features

### Visual Preview
- See product image after selection
- Shows product name and category
- Confirms you selected the right product

### Smart Interface
- Dropdowns show product ID and name
- Only shows published products
- Can't select the same product twice (optional)

### Responsive Design
- Works on all devices
- Cards are compact but don't touch
- Beautiful hover effects

### Multi-Language Support
- Products display in English, Arabic, or Russian
- Based on visitor's language preference

---

## 💡 Best Practices

### Recommended Selections:
1. **Mix categories:** Choose products from different categories (olives, peppers, artichokes)
2. **Show variety:** Display different types (whole, pitted, sliced)
3. **Feature bestsellers:** Put your most popular products first
4. **Seasonal rotation:** Change products based on season or promotions

### Example Selection:
- Position 1: Whole Green Olives (classic)
- Position 2: Sliced Black Olives (popular)
- Position 3: Pepperoncini Pepper (unique)
- Position 4: Pitted Green Olives (convenient)
- Position 5: Cherry Pepper (colorful)
- Position 6: Artichoke Hearts (premium)

---

## 🆘 Need Help?

If you encounter any issues:
1. Copy the exact error message
2. Check the browser console (F12 → Console tab)
3. Check the server terminal for errors
4. Send me the error message and I'll help fix it!

---

## ✨ Summary

This feature gives you **complete control** over your homepage. You can:
- ✅ Choose any 6 products to feature
- ✅ Change them anytime
- ✅ See results instantly
- ✅ Promote seasonal products
- ✅ Highlight bestsellers
- ✅ Test different combinations

**No coding required - just select and save!** 🎉

