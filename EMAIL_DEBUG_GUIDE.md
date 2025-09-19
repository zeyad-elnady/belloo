# 📧 Email Debug Guide - Fix Email Not Sending

## 🚨 Current Issue
Emails are not being sent from the Vercel deployment. Let's debug and fix this step by step.

## 🔍 Step 1: Check Environment Variables in Vercel

### Go to Vercel Dashboard:
1. Visit [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your "belloo" project
3. Go to **Settings** → **Environment Variables**
4. **Make sure these variables are set:**

```
GMAIL_USER = zeyadelnady2@gmail.com
GMAIL_PASS = xxsuwtbaqdsmrnvb
SENDER_EMAIL = zeyadelnady2@gmail.com
SENDER_NAME = Belloo Jobs Portal
JOBS_EMAIL = zeyadelnady2@gmail.com
CONTACT_EMAIL = zeyadelnady2@gmail.com
NODE_ENV = production
```

## 🧪 Step 2: Test Email Configuration

After setting environment variables, test your email:

### Method 1: Debug Endpoint
Visit: `https://your-vercel-app.vercel.app/api/debug-email`

This will show you:
- ✅ Which environment variables are set
- ❌ Which ones are missing
- 🌍 Current environment info

### Method 2: Send Test Email
Make a POST request to: `https://your-vercel-app.vercel.app/api/debug-email`

Or use this curl command:
```bash
curl -X POST https://your-vercel-app.vercel.app/api/debug-email
```

## 🔧 Step 3: Common Fixes

### Fix 1: Missing Environment Variables
If variables show as "❌ Missing":
1. Add them in Vercel Dashboard
2. Redeploy your app (or trigger a new deployment)

### Fix 2: Gmail App Password Issues
If you get authentication errors:
1. Make sure 2-Factor Authentication is enabled on Gmail
2. Generate a new App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App Passwords
   - Generate new password for "Mail"
   - Update `GMAIL_PASS` in Vercel

### Fix 3: Wrong Email Configuration
Update your environment variables to use Gmail properly:
```
GMAIL_USER = your-actual-gmail@gmail.com
GMAIL_PASS = your-16-character-app-password
SENDER_EMAIL = your-actual-gmail@gmail.com
JOBS_EMAIL = where-you-want-to-receive-emails@gmail.com
```

## 🚀 Step 4: Redeploy and Test

1. **Push changes to GitHub:**
```bash
git add .
git commit -m "Add email debugging and fixes"
git push origin main
```

2. **Test the form submission** on your live site
3. **Check Vercel logs** for email debug messages
4. **Check your Gmail inbox** for the notification

## 🎯 Expected Results

After fixing:
- ✅ Form submissions work
- ✅ Emails arrive in your Gmail inbox  
- ✅ No email errors in Vercel logs
- ✅ Debug endpoint shows all variables set

## 🆘 Still Not Working?

If emails still don't work:
1. Check Vercel function logs
2. Try the test email endpoint
3. Verify Gmail settings
4. Consider switching to a different email service (SendGrid, etc.)

## 📞 Quick Test Commands

```bash
# Check environment variables
curl https://your-app.vercel.app/api/debug-email

# Send test email
curl -X POST https://your-app.vercel.app/api/debug-email

# Submit test form (replace with your actual form data)
curl -X POST https://your-app.vercel.app/api/job-application-vercel \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "position=Test Position" \
  -F "phone=123456789" \
  -F "title=Test Title"
```
