# Upload Videos to Supabase Storage

## Problem
The video files (25MB each) are too large for Vercel's static file deployment limits. Videos need to be hosted on Supabase Storage instead.

## Solution
Run the upload script to upload your videos to Supabase Storage.

## Steps

### 1. Run the Upload Script

```bash
node scripts/upload-videos-to-supabase.js
```

### 2. What the Script Does
- Creates a `videos` bucket in Supabase Storage (if it doesn't exist)
- Uploads `world-map.mp4` and `world-map-arabic.mp4` to the bucket
- Makes the videos publicly accessible
- Shows you the public URLs

### 3. Verify Upload
After running the script, you should see:
```
✅ Successfully uploaded world-map.mp4
   URL: https://[your-project].supabase.co/storage/v1/object/public/videos/world-map.mp4

✅ Successfully uploaded world-map-arabic.mp4
   URL: https://[your-project].supabase.co/storage/v1/object/public/videos/world-map-arabic.mp4
```

### 4. Test Locally
```bash
npm run dev
```

Visit `http://localhost:3000` and check if the video loads on the homepage.

### 5. Deploy
```bash
git add -A
git commit -m "Add Supabase video loading for large files"
git push origin main
```

## How It Works

1. **API Route** (`/api/videos/get-map-video`):
   - Fetches video URL from Supabase Storage based on locale
   - Returns the public URL with cache-busting
   - Falls back to local files if Supabase fails

2. **Homepage** (`pages/index.jsx`):
   - Fetches video URL on component mount
   - Shows loading state while fetching
   - Displays video when URL is ready
   - Falls back to local files if API fails

## Benefits
- ✅ No file size limits (Supabase handles large files)
- ✅ Faster page loads (videos served from CDN)
- ✅ Works with Vercel deployment
- ✅ Automatic fallback to local files if Supabase fails
- ✅ Locale-aware (English/Russian use one video, Arabic uses another)

## Troubleshooting

### Error: Missing Supabase credentials
Make sure your `.env.local` file has:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Error: Bucket creation failed
Manually create a bucket named `videos` in Supabase Dashboard:
1. Go to Storage in Supabase Dashboard
2. Create New Bucket → Name it `videos`
3. Make it **Public**
4. Set file size limit to 50MB
5. Run the script again

### Video still not loading after upload
1. Check browser console for errors
2. Verify the video URLs are accessible (copy from script output and paste in browser)
3. Check Supabase Storage dashboard to confirm files are uploaded
4. Clear browser cache and try again

