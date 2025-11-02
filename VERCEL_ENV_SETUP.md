# Vercel Environment Variables Setup

## Required Environment Variables

Your application requires the following environment variables to be configured in Vercel:

### 🔐 Supabase Configuration

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Where to find these:**
1. Go to your Supabase project dashboard
2. Click on "Project Settings" (gear icon)
3. Go to "API" section
4. Copy the values:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role (secret) → `SUPABASE_SERVICE_ROLE_KEY`

### 🔑 JWT Secret

```
JWT_SECRET=your_random_secure_secret_key_minimum_32_characters
```

**Generate a secure JWT secret:**
- Use a long random string (32+ characters)
- Or generate one using: `openssl rand -base64 32`
- Keep this secret safe!

### 📧 Email Configuration (Gmail)

```
GMAIL_USER=your_gmail_address@gmail.com
GMAIL_PASS=your_gmail_app_password
SENDER_EMAIL=noreply@yourdomain.com
JOBS_EMAIL=hr@yourdomain.com
CONTACT_EMAIL=contact@yourdomain.com
```

**To get Gmail App Password:**
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to "Security" → "2-Step Verification"
4. Scroll to "App passwords"
5. Generate a new app password for "Mail"
6. Use that 16-character password as `GMAIL_PASS`

---

## 🚀 How to Add Environment Variables to Vercel

### Option 1: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. For each variable:
   - Enter the **Key** (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - Enter the **Value**
   - Select which environments (Production, Preview, Development)
   - Click **Save**

### Option 2: Via Vercel CLI

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Enter the value when prompted
# Select the environments (Production, Preview, Development)

# Repeat for each variable
```

---

## ✅ After Adding Variables

1. **Redeploy your application:**
   ```bash
   git commit --allow-empty -m "Trigger redeploy with env vars"
   git push origin main
   ```

2. **Or trigger redeploy from Vercel Dashboard:**
   - Go to your project
   - Click "Deployments"
   - Click the "..." menu on the latest deployment
   - Click "Redeploy"

---

## 🧪 Testing

After deployment, verify the environment variables are working:

1. Check the deployment logs for any environment variable errors
2. Try logging in to your admin panel
3. Check the browser console for specific errors

---

## 📋 Quick Checklist

- [ ] Added `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Added `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Added `JWT_SECRET` (32+ characters)
- [ ] Added `GMAIL_USER`
- [ ] Added `GMAIL_PASS` (app password, not regular password)
- [ ] Added `SENDER_EMAIL`
- [ ] Added `JOBS_EMAIL`
- [ ] Added `CONTACT_EMAIL`
- [ ] Redeployed the application

---

## 🐛 Troubleshooting

### Still getting 401 errors?

1. **Check Vercel logs:**
   ```
   Visit: https://vercel.com/[your-username]/[project-name]/logs
   ```

2. **Verify environment variables are set:**
   - In Vercel Dashboard → Settings → Environment Variables
   - Make sure they're assigned to "Production"

3. **Check Supabase connection:**
   - Make sure your Supabase URL is correct
   - Verify the service role key has proper permissions

4. **Check JWT_SECRET:**
   - Must be the same value across all environments
   - If changed, users need to log in again

### Missing logo-dark.png error?

Add the missing logo file to your repository:
```
public/assets/images/logo/logo-dark.png
```

Or update your code to reference an existing logo file.

