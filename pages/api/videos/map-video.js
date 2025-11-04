import { supabaseAdmin } from '../../../lib/supabaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { locale = 'en' } = req.query;
    
    // Determine which video file to get based on locale
    const videoFileName = locale === 'ar' 
      ? 'world map arabic.mp4' 
      : 'world map.mp4';

    // Get the public URL from Supabase Storage (videos are in root of bucket)
    const { data } = supabaseAdmin.storage
      .from('website-assets')
      .getPublicUrl(videoFileName);

    if (!data?.publicUrl) {
      return res.status(404).json({ 
        success: false, 
        error: 'Video not found' 
      });
    }

    // Return the video URL
    return res.status(200).json({
      success: true,
      videoUrl: data.publicUrl
    });

  } catch (error) {
    console.error('Error fetching video URL:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to load video URL' 
    });
  }
}

