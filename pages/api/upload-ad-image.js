import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public', 'uploads', 'banners'),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'banners');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        return res.status(500).json({ success: false, error: 'Failed to parse form data' });
      }

      const file = files.adImage;
      if (!file) {
        return res.status(400).json({ success: false, error: 'No file uploaded' });
      }

      // Get the first file if it's an array
      const uploadedFile = Array.isArray(file) ? file[0] : file;

      try {
        // Read the file
        const fileData = fs.readFileSync(uploadedFile.filepath);
        // Use "promo" instead of "ad" to avoid ad blockers
        const fileName = `promo-${Date.now()}${path.extname(uploadedFile.originalFilename || uploadedFile.newFilename)}`;

        // Upload to Supabase Storage (use "banners" folder instead of "ads")
        const { data, error: uploadError } = await supabase.storage
          .from('website-images')
          .upload(`banners/${fileName}`, fileData, {
            contentType: uploadedFile.mimetype,
            upsert: true
          });

        // Clean up temp file
        fs.unlinkSync(uploadedFile.filepath);

        if (uploadError) {
          console.error('Supabase upload error:', uploadError);
          return res.status(500).json({ success: false, error: 'Failed to upload to storage' });
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('website-images')
          .getPublicUrl(`banners/${fileName}`);

        const publicUrl = urlData.publicUrl;

        // Update site settings with new ad image
        const { data: existingData } = await supabase
          .from('site_settings')
          .select('id')
          .eq('id', 1)
          .single();

        if (existingData) {
          await supabase
            .from('site_settings')
            .update({ ad_image: publicUrl, updated_at: new Date().toISOString() })
            .eq('id', 1);
        } else {
          await supabase
            .from('site_settings')
            .insert({ id: 1, ad_image: publicUrl });
        }

        res.status(200).json({
          success: true,
          message: 'Ad image uploaded successfully',
          imageUrl: publicUrl
        });
      } catch (error) {
        console.error('File processing error:', error);
        // Clean up temp file if it exists
        if (fs.existsSync(uploadedFile.filepath)) {
          fs.unlinkSync(uploadedFile.filepath);
        }
        res.status(500).json({ success: false, error: 'Failed to process file' });
      }
    });
  } catch (error) {
    console.error('Upload handler error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

