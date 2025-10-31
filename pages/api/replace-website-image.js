const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const IncomingForm = formidable.IncomingForm || formidable.formidable || formidable;

export const config = {
  api: {
    bodyParser: false,
  },
};

// Map of image IDs to their file paths
const IMAGE_PATHS = {
  // Hero Section
  'hero-1': 'public/assets/images/hero/hero_two-slider-1.jpg',
  'hero-2': 'public/assets/images/hero/hero_two-slider-2.jpg',
  'hero-3': 'public/assets/images/hero/hero_two-slider-3.jpg',
  
  // Skills Section
  'skill-4': 'public/assets/images/skill/skill-4.png',
  'skill-5': 'public/assets/images/skill/skill-5.png',
  
  // About Section
  'about-1': 'public/assets/images/about/about-1.jpg',
  'about-3': 'public/assets/images/about/about-3.jpg',
  'about-4': 'public/assets/images/about/about-4.jpg',
  'about-5': 'public/assets/images/about/about-5.jpg',
  
  // Gallery Section
  'gallery-cta-1': 'public/assets/images/gallery/cta-1.jpg',
  'gallery-widget-1': 'public/assets/images/gallery/thumb-widget-1.jpg',
  'gallery-widget-2': 'public/assets/images/gallery/thumb-widget-2.png',
  'gallery-widget-3': 'public/assets/images/gallery/thumb-widget-3.png',
  'gallery-widget-4': 'public/assets/images/gallery/thumb-widget-4.png',
  'gallery-widget-5': 'public/assets/images/gallery/thumb-widget-5.png',
  'gallery-widget-6': 'public/assets/images/gallery/thumb-widget-6.png',
  
  // Background Images
  'bg-about': 'public/assets/images/bg/about-bg-1.jpg',
  'bg-page': 'public/assets/images/bg/page-bg-1.jpg',
  'bg-features': 'public/assets/images/bg/features-bg-1.jpg',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
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

    const targetImage = Array.isArray(fields.targetImage) ? fields.targetImage[0] : fields.targetImage;
    const file = files.file ? (Array.isArray(files.file) ? files.file[0] : files.file) : null;
    
    if (!file || file.size === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'No file uploaded' 
      });
    }

    if (!targetImage || !IMAGE_PATHS[targetImage]) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid target image' 
      });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      fs.unlinkSync(file.filepath);
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid file type. Only images allowed.' 
      });
    }

    // Get target file path
    const targetPath = path.join(process.cwd(), IMAGE_PATHS[targetImage]);
    
    console.log('\n🔄 REPLACING IMAGE:');
    console.log('   Target:', targetPath);
    console.log('   Source:', file.filepath);
    console.log('   Size:', file.size, 'bytes');
    
    // Read the uploaded file
    const fileBuffer = fs.readFileSync(file.filepath);
    
    // Create backup of original (just in case)
    const backupPath = targetPath + '.backup';
    if (fs.existsSync(targetPath)) {
      fs.copyFileSync(targetPath, backupPath);
      console.log('   ✅ Backup created');
    }
    
    // Replace the file
    fs.writeFileSync(targetPath, fileBuffer);
    console.log('   ✅ File replaced successfully!');
    
    // Clean up temp file
    fs.unlinkSync(file.filepath);
    
    // Verify the new file
    const stats = fs.statSync(targetPath);
    console.log('   ✅ New file size:', stats.size, 'bytes');
    console.log('   ✅ Last modified:', stats.mtime);
    
    return res.status(200).json({
      success: true,
      message: 'Image replaced successfully!',
      data: {
        path: IMAGE_PATHS[targetImage],
        size: stats.size,
        lastModified: stats.mtime
      },
    });
    
  } catch (error) {
    console.error('❌ Replace error:', error);
    console.error('Error stack:', error.stack);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message
    });
  }
}

