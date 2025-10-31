const { supabaseAdmin } = require('../../../lib/supabase');
const { verifyAuth } = require('../../../lib/auth');
const formidable = require('formidable');
const fs = require('fs');

const IncomingForm = formidable.IncomingForm || formidable.formidable || formidable;

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
    // Verify authentication
    const { authenticated, user } = await verifyAuth(req);

    if (!authenticated) {
      return res.status(401).json({ 
        success: false, 
        error: 'Not authenticated' 
      });
    }

    const form = new IncomingForm({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      keepExtensions: true,
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const mediaId = Array.isArray(fields.mediaId) ? fields.mediaId[0] : fields.mediaId;
    const oldPath = Array.isArray(fields.oldPath) ? fields.oldPath[0] : fields.oldPath;
    const folder = Array.isArray(fields.folder) ? fields.folder[0] : (fields.folder || 'general');
    
    const file = files.file ? (Array.isArray(files.file) ? files.file[0] : files.file) : null;
    
    if (!file || file.size === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'No file uploaded' 
      });
    }

    if (!mediaId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Media ID required' 
      });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!allowedTypes.includes(file.mimetype)) {
      fs.unlinkSync(file.filepath);
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid file type. Only images allowed.' 
      });
    }

    // Get existing media info
    const { data: existingMedia, error: fetchError } = await supabaseAdmin
      .from('media_library')
      .select('*')
      .eq('id', mediaId)
      .single();

    if (fetchError || !existingMedia) {
      fs.unlinkSync(file.filepath);
      return res.status(404).json({ 
        success: false, 
        error: 'Media not found' 
      });
    }

    const path = require('path');
    const isStaticFile = existingMedia.file_path && existingMedia.file_path.startsWith('/assets/');
    
    let finalPath, finalUrl;

    if (isStaticFile) {
      // For static website assets, replace the actual file in /public folder
      const publicPath = path.join(process.cwd(), 'public', existingMedia.file_path);
      const fileBuffer = fs.readFileSync(file.filepath);
      
      // Create directory if it doesn't exist
      const dir = path.dirname(publicPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Replace the physical file
      fs.writeFileSync(publicPath, fileBuffer);
      
      console.log('✅ Replaced static file at:', publicPath);
      
      finalPath = existingMedia.file_path;
      finalUrl = existingMedia.file_path;
      
      // Update media library record with new file size
      const { data: mediaData, error: mediaError } = await supabaseAdmin
        .from('media_library')
        .update({
          file_size: file.size,
          file_type: file.mimetype,
          mime_type: file.mimetype,
          // Keep everything else the same
          file_name: existingMedia.file_name,
          file_path: existingMedia.file_path,
          folder: existingMedia.folder,
          alt_text: existingMedia.alt_text,
          caption: existingMedia.caption
        })
        .eq('id', mediaId)
        .select()
        .single();

      if (mediaError) {
        console.error('Error updating media library:', mediaError);
      }
      
    } else {
      // For uploaded files, use Supabase Storage
      const fileBuffer = fs.readFileSync(file.filepath);
      const fileName = `${Date.now()}-${file.originalFilename || file.newFilename}`;
      
      // Determine bucket based on folder
      let bucket = 'website';
      if (folder === 'products' || folder.startsWith('product')) {
        bucket = 'products';
      } else if (folder === 'news' || folder.startsWith('news')) {
        bucket = 'news';
      }

      // Upload to Supabase Storage
      const storagePath = `${folder}/${fileName}`;
      const { data: uploadData, error: uploadError } = await supabaseAdmin
        .storage
        .from(bucket)
        .upload(storagePath, fileBuffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (uploadError) {
        console.error('❌ Supabase upload error:', uploadError);
        fs.unlinkSync(file.filepath);
        return res.status(500).json({ 
          success: false, 
          error: `Upload to storage failed: ${uploadError.message || 'Unknown error'}`,
          details: uploadError.message
        });
      }

      // Get public URL
      const { data: { publicUrl } } = supabaseAdmin
        .storage
        .from(bucket)
        .getPublicUrl(storagePath);

      finalPath = uploadData.path;
      finalUrl = publicUrl;

      // Update media library record
      const { data: mediaData, error: mediaError } = await supabaseAdmin
        .from('media_library')
        .update({
          file_name: file.originalFilename || file.newFilename,
          file_path: publicUrl,
          file_size: file.size,
          file_type: file.mimetype,
          mime_type: file.mimetype,
          folder,
          alt_text: existingMedia.alt_text,
          caption: existingMedia.caption
        })
        .eq('id', mediaId)
        .select()
        .single();

      if (mediaError) {
        console.error('Error updating media library:', mediaError);
      }

      // Delete old file from storage
      if (existingMedia.file_path && !existingMedia.file_path.startsWith('/assets/')) {
        try {
          const oldFilePath = existingMedia.file_path.split('/').slice(-2).join('/');
          await supabaseAdmin
            .storage
            .from(bucket)
            .remove([oldFilePath]);
        } catch (err) {
          console.log('Note: Could not delete old file:', err.message);
        }
      }
    }

    // Clean up temp file
    fs.unlinkSync(file.filepath);

    return res.status(200).json({
      success: true,
      message: 'Image replaced successfully! The website now shows the new image.',
      data: {
        id: mediaId,
        file_path: finalPath,
        public_url: finalUrl,
        file_name: existingMedia.file_name,
        file_size: file.size,
        mime_type: file.mimetype,
        is_static: isStaticFile
      },
    });
  } catch (error) {
    console.error('❌ Replace error:', error);
    console.error('Error stack:', error.stack);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message,
      details: error.toString()
    });
  }
}

