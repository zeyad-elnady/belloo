-- CMS Extension for Belloo Application
-- Run this in Supabase SQL Editor AFTER running supabase-schema-v2.sql

-- =====================================================
-- PRODUCTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    display_id SERIAL UNIQUE NOT NULL,
    
    -- Product Info
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255),
    name_ru VARCHAR(255),
    
    slug VARCHAR(255) UNIQUE NOT NULL, -- URL friendly name
    
    -- Description
    description_en TEXT,
    description_ar TEXT,
    description_ru TEXT,
    
    short_description_en VARCHAR(500),
    short_description_ar VARCHAR(500),
    short_description_ru VARCHAR(500),
    
    -- Images
    main_image VARCHAR(500), -- Path to main product image
    gallery_images JSONB DEFAULT '[]', -- Array of image paths
    
    -- Specifications
    specifications JSONB DEFAULT '{}', -- Custom specs {weight, size, etc}
    
    -- Category
    category VARCHAR(100), -- olive-oil, pickles, etc
    
    -- Pricing (optional)
    price DECIMAL(10, 2),
    currency VARCHAR(10) DEFAULT 'USD',
    
    -- Display
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    
    -- Tracking
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- =====================================================
-- NEWS/BLOG TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS news (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    display_id SERIAL UNIQUE NOT NULL,
    
    -- Title
    title_en VARCHAR(255) NOT NULL,
    title_ar VARCHAR(255),
    title_ru VARCHAR(255),
    
    slug VARCHAR(255) UNIQUE NOT NULL,
    
    -- Content
    content_en TEXT,
    content_ar TEXT,
    content_ru TEXT,
    
    excerpt_en TEXT,
    excerpt_ar TEXT,
    excerpt_ru TEXT,
    
    -- Images
    featured_image VARCHAR(500),
    gallery_images JSONB DEFAULT '[]',
    
    -- Category
    category VARCHAR(100), -- news, events, announcements
    tags JSONB DEFAULT '[]', -- ['sustainability', 'organic', etc]
    
    -- Author
    author_name VARCHAR(255),
    author_id UUID REFERENCES users(id),
    
    -- Publishing
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    
    -- Tracking
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- WEBSITE SETTINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS website_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    
    category VARCHAR(50), -- general, homepage, contact, etc
    description TEXT,
    
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES users(id)
);

-- =====================================================
-- MEDIA LIBRARY TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS media_library (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    display_id SERIAL UNIQUE NOT NULL,
    
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER,
    file_type VARCHAR(100), -- image/jpeg, image/png, etc
    mime_type VARCHAR(100),
    
    -- Categorization
    folder VARCHAR(255) DEFAULT 'general', -- products, news, hero, etc
    alt_text VARCHAR(255),
    caption TEXT,
    
    -- Image specific
    width INTEGER,
    height INTEGER,
    
    -- Usage tracking
    used_in JSONB DEFAULT '[]', -- [{type: 'product', id: 'xxx'}, ...]
    
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

-- Products indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_published ON products(is_published);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_display_order ON products(display_order);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- News indexes
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_is_published ON news(is_published);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at DESC);

-- Media indexes
CREATE INDEX IF NOT EXISTS idx_media_folder ON media_library(folder);
CREATE INDEX IF NOT EXISTS idx_media_file_type ON media_library(file_type);
CREATE INDEX IF NOT EXISTS idx_media_created_at ON media_library(created_at DESC);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Auto-update updated_at for products
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Auto-update updated_at for news
DROP TRIGGER IF EXISTS update_news_updated_at ON news;
CREATE TRIGGER update_news_updated_at
    BEFORE UPDATE ON news
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Auto-update updated_at for settings
DROP TRIGGER IF EXISTS update_settings_updated_at ON website_settings;
CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON website_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

-- Products RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view published products" ON products;
CREATE POLICY "Anyone can view published products" ON products
    FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Service role can manage products" ON products;
CREATE POLICY "Service role can manage products" ON products
    FOR ALL USING (auth.role() = 'service_role');

-- News RLS
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view published news" ON news;
CREATE POLICY "Anyone can view published news" ON news
    FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Service role can manage news" ON news;
CREATE POLICY "Service role can manage news" ON news
    FOR ALL USING (auth.role() = 'service_role');

-- Settings RLS
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view settings" ON website_settings;
CREATE POLICY "Anyone can view settings" ON website_settings
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role can manage settings" ON website_settings;
CREATE POLICY "Service role can manage settings" ON website_settings
    FOR ALL USING (auth.role() = 'service_role');

-- Media Library RLS
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view media" ON media_library;
CREATE POLICY "Anyone can view media" ON media_library
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role can manage media" ON media_library;
CREATE POLICY "Service role can manage media" ON media_library
    FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- STORAGE BUCKETS
-- =====================================================

-- Products images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'products',
    'products',
    true, -- Public for product images
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- News images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'news',
    'news',
    true,
    5242880,
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- General/Website images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'website',
    'website',
    true,
    10485760, -- 10MB for hero images, etc
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- STORAGE POLICIES
-- =====================================================

-- Products bucket policies
DROP POLICY IF EXISTS "Anyone can view product images" ON storage.objects;
CREATE POLICY "Anyone can view product images" ON storage.objects
    FOR SELECT USING (bucket_id = 'products');

DROP POLICY IF EXISTS "Service role can upload product images" ON storage.objects;
CREATE POLICY "Service role can upload product images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'products' AND auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can delete product images" ON storage.objects;
CREATE POLICY "Service role can delete product images" ON storage.objects
    FOR DELETE USING (bucket_id = 'products' AND auth.role() = 'service_role');

-- News bucket policies
DROP POLICY IF EXISTS "Anyone can view news images" ON storage.objects;
CREATE POLICY "Anyone can view news images" ON storage.objects
    FOR SELECT USING (bucket_id = 'news');

DROP POLICY IF EXISTS "Service role can upload news images" ON storage.objects;
CREATE POLICY "Service role can upload news images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'news' AND auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can delete news images" ON storage.objects;
CREATE POLICY "Service role can delete news images" ON storage.objects
    FOR DELETE USING (bucket_id = 'news' AND auth.role() = 'service_role');

-- Website bucket policies
DROP POLICY IF EXISTS "Anyone can view website images" ON storage.objects;
CREATE POLICY "Anyone can view website images" ON storage.objects
    FOR SELECT USING (bucket_id = 'website');

DROP POLICY IF EXISTS "Service role can upload website images" ON storage.objects;
CREATE POLICY "Service role can upload website images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'website' AND auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can delete website images" ON storage.objects;
CREATE POLICY "Service role can delete website images" ON storage.objects
    FOR DELETE USING (bucket_id = 'website' AND auth.role() = 'service_role');

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Sample product
INSERT INTO products (
    name_en, name_ar, name_ru,
    slug,
    description_en,
    short_description_en,
    category,
    is_featured,
    is_published
) VALUES (
    'Extra Virgin Olive Oil',
    'زيت زيتون بكر ممتاز',
    'Экстра вирджин оливковое масло',
    'extra-virgin-olive-oil',
    'Premium quality extra virgin olive oil from Syria',
    'High-quality olive oil',
    'olive-oil',
    true,
    true
) ON CONFLICT DO NOTHING;

-- Sample news
INSERT INTO news (
    title_en, title_ar,
    slug,
    content_en,
    excerpt_en,
    category,
    is_published
) VALUES (
    'New Harvest Season 2024',
    'موسم الحصاد الجديد 2024',
    'new-harvest-season-2024',
    'We are excited to announce the beginning of our 2024 harvest season...',
    'Announcing the 2024 harvest season',
    'news',
    true
) ON CONFLICT DO NOTHING;

-- =====================================================
-- VERIFICATION
-- =====================================================
SELECT 'CMS Tables Created Successfully!' as status;
SELECT 'Products:' as table_name, COUNT(*) as count FROM products;
SELECT 'News:' as table_name, COUNT(*) as count FROM news;
SELECT 'Media Library:' as table_name, COUNT(*) as count FROM media_library;
SELECT 'Website Settings:' as table_name, COUNT(*) as count FROM website_settings;

