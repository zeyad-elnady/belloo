# 🔧 Gmail SMTP Setup Instructions

## Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click **Security** in the left sidebar
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the steps to enable 2FA (required for App Passwords)

## Step 2: Generate App Password

1. Go back to **Security** → **App passwords**
2. Select **Mail** from the dropdown
3. Click **Generate**
4. **Copy the 16-character password** (something like `abcd efgh ijkl mnop`)

## Step 3: Update Your .env File

Replace your current `.env` file content with:

```env
# Gmail SMTP Configuration
GMAIL_USER=zeyadelnady2@gmail.com
GMAIL_PASS=abcd efgh ijkl mnop

# Email Configuration
SENDER_EMAIL=zeyadelnady2@gmail.com
SENDER_NAME=Belloo Jobs Portal
JOBS_EMAIL=zeyadelnady2@gmail.com
CONTACT_EMAIL=zeyadelnady2@gmail.com

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Application Settings
NODE_ENV=development
```

**Replace `abcd efgh ijkl mnop` with your actual App Password!**

## Step 4: Restart Server

1. Stop current server: **Ctrl+C**
2. Start again: **npm run dev**
3. Look for: `🔄 Using Gmail SMTP (recommended)...`

## Step 5: Test

Submit a test job application and you should see:
```
✅ Email server is ready to send emails
✅ Job application email sent successfully
```

## Troubleshooting

- **If you can't find App passwords**: Enable 2FA first
- **If password doesn't work**: Copy it exactly with spaces
- **If still getting Mailtrap errors**: Make sure GMAIL_USER and GMAIL_PASS are in your .env file
