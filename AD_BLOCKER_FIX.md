# Ad Blocker Fix - Important!

## The Problem
Ad blockers automatically block any URLs containing:
- `/ads/` in the path
- `ad-` in the filename
- Files named `ads.jpg` or similar

## The Solution
We changed the upload system to use ad-blocker-friendly names:

### Before (BLOCKED):
```
/assets/images/ads.jpg
/storage/website-images/ads/ad-1762966734742.jpg
```

### After (NOT BLOCKED):
```
/assets/images/promo-banner.jpg
/storage/website-images/banners/promo-1762966734742.jpg
```

## How to Upload New Ads

1. **Go to Admin Panel**: `http://localhost:3001/admin/ad-management`
2. **Select Image**: Choose your promotional image
3. **Upload**: The system will automatically:
   - Upload to `/banners/` folder (not `/ads/`)
   - Name it `promo-*.jpg` (not `ad-*.jpg`)
   - Update the database
   - Clear caches

4. **Test**: Open in incognito window to see the new ad

## If Still Not Working

### Check for Ad Blocker:
1. Look for ad blocker icon in browser toolbar
2. Temporarily disable it for `localhost`
3. Refresh the page

### Clear Browser Cache:
```
Ctrl + Shift + Delete
→ Select "Cached images and files"
→ Clear data
```

### Hard Refresh:
- Windows: `Ctrl + F5`
- Mac: `Cmd + Shift + R`

### Test in Clean Environment:
- Open **Incognito/Private window**
- Go to `http://localhost:3001`
- Wait for popup (appears after 1 second)

## Database Structure

The `site_settings` table stores:
- `id`: Always 1 (single row)
- `ad_image`: Full URL to current ad
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Supabase Storage

Bucket: `website-images`
Folder: `banners/` (not `ads/`)
Files: `promo-*.jpg` (not `ad-*.jpg`)

## Support

If you still see the old ad:
1. Check `/api/debug-ad` to see current database URL
2. Check browser console for blocked requests
3. Verify the URL doesn't contain `/ads/` or `ad-`

