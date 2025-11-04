import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { locale } = req.query;
    
    // Determine which video file to fetch based on locale
    const videoFileName = locale === 'ar' ? 'world-map-arabic.mp4' : 'world-map.mp4';
    
    // Get the public URL for the video from Supabase Storage
    const { data, error } = supabase.storage
      .from('videos')
      .getPublicUrl(videoFileName);

    if (error) {
      console.error('Error fetching video URL:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch video URL',
        fallback: `/assets/video/${videoFileName}`
      });
    }

    // Add cache-busting
    const videoUrl = `${data.publicUrl}?v=${Date.now()}`;

    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.status(200).json({ 
      success: true, 
      videoUrl: videoUrl,
      fallback: `/assets/video/${videoFileName}`
    });

  } catch (error) {
    console.error('Error in get-map-video API:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      fallback: '/assets/video/world-map.mp4'
    });
  }
}

