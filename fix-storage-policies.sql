-- =====================================================
-- FIX STORAGE POLICIES - Allow Authenticated Uploads
-- =====================================================
--
-- This fixes the upload error by allowing authenticated 
-- admin users to upload images (not just service_role)
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Products bucket policies (UPDATED)
DROP POLICY IF EXISTS "Service role can upload product images" ON storage.objects;
CREATE POLICY "Authenticated users can upload product images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'products' AND 
        auth.role() IN ('authenticated', 'service_role')
    );

DROP POLICY IF EXISTS "Service role can delete product images" ON storage.objects;
CREATE POLICY "Authenticated users can delete product images" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'products' AND 
        auth.role() IN ('authenticated', 'service_role')
    );

-- News bucket policies (UPDATED)
DROP POLICY IF EXISTS "Service role can upload news images" ON storage.objects;
CREATE POLICY "Authenticated users can upload news images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'news' AND 
        auth.role() IN ('authenticated', 'service_role')
    );

DROP POLICY IF EXISTS "Service role can delete news images" ON storage.objects;
CREATE POLICY "Authenticated users can delete news images" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'news' AND 
        auth.role() IN ('authenticated', 'service_role')
    );

-- Website bucket policies (UPDATED)
DROP POLICY IF EXISTS "Service role can upload website images" ON storage.objects;
CREATE POLICY "Authenticated users can upload website images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'website' AND 
        auth.role() IN ('authenticated', 'service_role')
    );

DROP POLICY IF EXISTS "Service role can delete website images" ON storage.objects;
CREATE POLICY "Authenticated users can delete website images" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'website' AND 
        auth.role() IN ('authenticated', 'service_role')
    );

-- Verify policies
SELECT 'Storage policies updated successfully!' as status;


