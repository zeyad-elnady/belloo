import { supabaseAdmin } from '../../../lib/supabase';

// Default image paths (fallback to local files)
const DEFAULT_IMAGES = {
  'hero-1': '/assets/images/hero/hero_two-slider-1.jpg',
  'hero-2': '/assets/images/hero/hero_two-slider-2.jpg',
  'hero-3': '/assets/images/hero/hero_two-slider-3.jpg',
  'skill-4': '/assets/images/skill/skill-4.png',
  'skill-5': '/assets/images/skill/skill-5.png',
  'about-1': '/assets/images/about/about-1.jpg',
  'about-3': '/assets/images/about/about-3.jpg',
  'about-4': '/assets/images/about/about-4.jpg',
  'about-5': '/assets/images/about/about-5.jpg',
  'gallery-cta-1': '/assets/images/gallery/cta-1.jpg',
  'gallery-widget-1': '/assets/images/gallery/thumb-widget-1.jpg',
  'gallery-widget-2': '/assets/images/gallery/thumb-widget-2.png',
  'gallery-widget-3': '/assets/images/gallery/thumb-widget-3.png',
  'gallery-widget-4': '/assets/images/gallery/thumb-widget-4.png',
  'gallery-widget-5': '/assets/images/gallery/thumb-widget-5.png',
  'gallery-widget-6': '/assets/images/gallery/thumb-widget-6.png',
  'bg-about': '/assets/images/bg/about-bg-1.jpg',
  'bg-page': '/assets/images/bg/page-bg-1.jpg',
  'bg-features': '/assets/images/bg/features-bg-1.jpg',
};

export default async function handler(req, res) {
  try {
    const imageConfig = { ...DEFAULT_IMAGES };

    // Check each image in Supabase Storage
    for (const [imageId, defaultPath] of Object.entries(DEFAULT_IMAGES)) {
      try {
        // Parse the default path to get folder and filename
        const pathParts = defaultPath.replace('/assets/images/', '').split('/');
        const folder = pathParts[0];
        const filename = pathParts[pathParts.length - 1];
        
        // Check if file exists in Supabase Storage
        const { data } = await supabaseAdmin
          .storage
          .from('website')
          .list(folder, {
            limit: 100,
            search: filename
          });

        if (data && data.length > 0) {
          // File exists in Supabase, get the public URL
          const { data: { publicUrl } } = supabaseAdmin
            .storage
            .from('website')
            .getPublicUrl(`${folder}/${filename}`);
          
          // Add cache-busting timestamp
          imageConfig[imageId] = `${publicUrl}?t=${Date.now()}`;
          console.log(`✅ Using Supabase URL for ${imageId}`);
        }
      } catch (err) {
        console.log(`Using default path for ${imageId}`);
        // Keep default path if Supabase check fails
      }
    }

    return res.status(200).json({
      success: true,
      images: imageConfig
    });
  } catch (error) {
    console.error('Error getting image config:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to get image configuration',
      images: DEFAULT_IMAGES // Fallback to defaults
    });
  }
}

