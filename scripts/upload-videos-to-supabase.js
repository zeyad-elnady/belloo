const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function uploadVideos() {
  console.log('📹 Starting video upload to Supabase Storage...\n');

  const videosDir = path.join(process.cwd(), 'public', 'assets', 'video');
  const videoFiles = [
    'world-map.mp4',
    'world-map-arabic.mp4'
  ];

  try {
    // First, ensure the 'videos' bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Error listing buckets:', listError);
      return;
    }

    const videoBucket = buckets.find(bucket => bucket.name === 'videos');
    
    if (!videoBucket) {
      console.log('📦 Creating "videos" bucket...');
      const { data: newBucket, error: createError } = await supabase.storage.createBucket('videos', {
        public: true,
        fileSizeLimit: 52428800, // 50MB limit
        allowedMimeTypes: ['video/mp4', 'video/quicktime']
      });

      if (createError) {
        console.error('❌ Error creating bucket:', createError);
        return;
      }
      console.log('✅ Bucket created successfully\n');
    } else {
      console.log('✅ Bucket "videos" already exists\n');
    }

    // Upload each video file
    for (const fileName of videoFiles) {
      const filePath = path.join(videosDir, fileName);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${fileName}`);
        continue;
      }

      const fileBuffer = fs.readFileSync(filePath);
      const fileSize = (fileBuffer.length / (1024 * 1024)).toFixed(2);
      
      console.log(`📤 Uploading ${fileName} (${fileSize} MB)...`);

      const { data, error } = await supabase.storage
        .from('videos')
        .upload(fileName, fileBuffer, {
          contentType: 'video/mp4',
          cacheControl: '3600',
          upsert: true // Overwrite if exists
        });

      if (error) {
        console.error(`❌ Error uploading ${fileName}:`, error.message);
      } else {
        console.log(`✅ Successfully uploaded ${fileName}`);
        
        // Get the public URL
        const { data: urlData } = supabase.storage
          .from('videos')
          .getPublicUrl(fileName);
        
        console.log(`   URL: ${urlData.publicUrl}\n`);
      }
    }

    console.log('🎉 Video upload complete!');
    console.log('\n📝 Next steps:');
    console.log('1. Commit and push your code changes');
    console.log('2. The videos will now load from Supabase instead of local files');
    console.log('3. This solves the Vercel file size limit issue');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

uploadVideos();

