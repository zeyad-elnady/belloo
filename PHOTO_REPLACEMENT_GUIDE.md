# Photo Replacement Guide

## ✅ New Feature: Replace Any Website Photo!

You can now **edit and replace any photo** in the Media Library directly from the admin panel. The new photo will automatically apply across the entire website!

---

## 🎯 How to Replace a Photo

### Step-by-Step Instructions:

#### 1. **Access Media Library**
   - Go to: `http://localhost:3000/admin`
   - Click: **"Website Editor"** tab
   - Click: **"Media Library"** tab

#### 2. **Find the Photo to Replace**
   - Browse by category (Hero, About, Backgrounds, etc.)
   - Or view "All" to see everything
   - Each photo shows:
     - Thumbnail preview
     - File name
     - Alt text & usage info
     - File size

#### 3. **Click the Edit Button**
   - Find the **blue Edit button** (✏️) below the photo
   - Click it to open the Replace Image modal

#### 4. **Review Current Photo**
   - Modal shows the current image
   - Displays photo information:
     - File name
     - Category
     - Alt text
     - Usage location
     - Current file size

#### 5. **Select New Photo**
   - Click **"Choose File"** button
   - Select new image from your device
   - Supported formats: JPG, PNG, WebP, GIF, SVG
   - Max size: 10MB

#### 6. **Preview New Photo**
   - Preview appears automatically
   - Review to make sure it's the right image
   - Can cancel and choose different image

#### 7. **Replace the Image**
   - Click **"Replace Image"** button
   - Upload happens automatically
   - Success message confirms replacement

#### 8. **Done!**
   - New photo is now live on website
   - Old photo is removed from storage
   - Database updated with new image info
   - All pages using this image automatically updated

---

## 💡 What Happens Behind the Scenes

### Upload Process:
1. New image uploads to Supabase Storage
2. Gets a new public URL
3. Database record updates with new image info
4. Old image file is deleted from storage
5. Website immediately uses new image

### Data Preserved:
- ✅ Alt text stays the same
- ✅ Usage/caption information kept
- ✅ Category doesn't change
- ✅ Image location consistent

---

## 🎨 Use Cases

### Hero Section
**Problem:** Hero banner needs seasonal update  
**Solution:** Replace hero slider images with fresh photos

### About Section
**Problem:** Team photos outdated  
**Solution:** Replace about section images with current team

### Testimonials
**Problem:** Customer photos need update  
**Solution:** Replace testimonial images with new customer photos

### Certifications
**Problem:** New certification received  
**Solution:** Replace old certification logo with new one

### Backgrounds
**Problem:** Section background needs refresh  
**Solution:** Replace background image with updated design

---

## 🔒 Special Notes

### Website Assets
- Images marked as **"Website Asset"** can also be replaced
- Original static file remains unchanged
- New uploaded version takes priority
- Website uses the new uploaded image

### Image Requirements
- **Formats:** JPG, PNG, WebP, GIF, SVG
- **Max Size:** 10MB
- **Recommendation:** Optimize images before uploading for faster loading

### Quality Tips
- Use high-resolution images for hero sections
- Keep file sizes reasonable (under 500KB when possible)
- Match aspect ratio of original image when possible
- Use WebP format for best quality/size balance

---

## ⚡ Quick Reference

| Action | Button | Location |
|--------|--------|----------|
| Browse photos | Filter buttons | Top of Media Library |
| Copy URL | 📋 Copy | Below each photo |
| Replace photo | ✏️ Edit | Below each photo |
| Delete photo | 🗑️ Delete | Below each photo (uploaded only) |

---

## 🚀 Advanced Features

### Batch Updates
Want to update multiple images?
1. Replace first image
2. Wait for success
3. Replace next image
4. Repeat as needed

### Reverting Changes
Made a mistake?
1. Click Edit button again
2. Upload the original image
3. Replaces the incorrect one

### Testing Changes
Before replacing important images:
1. Take note of current image URL
2. Replace with new image
3. Check website to see changes
4. If needed, revert using original image

---

## 📊 Technical Details

### API Endpoint
- **Path:** `/api/media/replace`
- **Method:** POST
- **Auth:** Required (admin only)
- **Body:** FormData with file and media ID

### Storage
- **Location:** Supabase Storage
- **Buckets:** website, products, news
- **Access:** Public URLs for all images

### Database
- **Table:** media_library
- **Updates:** file_path, file_size, file_name
- **Preserved:** alt_text, caption, folder

---

## ❓ FAQ

**Q: Can I replace product images?**  
A: Not through Media Library. Product images are managed in the Products section.

**Q: Will this break anything on the website?**  
A: No! The system updates everything automatically.

**Q: Can I undo a replacement?**  
A: Yes, just upload the original image again using the Edit button.

**Q: How long does replacement take?**  
A: Usually 2-5 seconds depending on image size.

**Q: Can I replace multiple images at once?**  
A: Currently one at a time, but it's very quick!

**Q: What happens to the old image?**  
A: It's automatically deleted from storage to save space.

**Q: Can other users see my changes immediately?**  
A: Yes! Changes apply instantly across the website.

---

## 🎉 Benefits

✅ **Quick Updates** - No developer needed  
✅ **Visual Preview** - See before you replace  
✅ **Automatic Application** - Changes apply everywhere  
✅ **Safe Process** - Can revert if needed  
✅ **No Broken Links** - Everything updates automatically  
✅ **Storage Management** - Old files auto-deleted  

---

## 🌟 Best Practices

1. **Test First** - Try on non-critical images first
2. **Optimize Images** - Compress before uploading
3. **Match Dimensions** - Use similar sizes to originals
4. **Check Preview** - Always review preview before replacing
5. **Document Changes** - Keep notes of what you changed

---

## 📞 Need Help?

If you encounter any issues:
1. Check the success/error message
2. Verify file format and size
3. Ensure you're logged in as admin
4. Refresh the page and try again
5. Check browser console for errors

---

## ✨ Summary

The photo replacement feature gives you **complete control** over all website images:

- **68 website photos** available to replace
- **All categories** supported
- **Instant updates** across website
- **Simple 3-click process**
- **Preview before replacing**
- **No technical knowledge required**

**Start managing your website photos with ease!** 🚀

