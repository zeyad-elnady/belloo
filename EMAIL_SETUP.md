# 📧 Email Notification Setup Guide

Email notifications are now set up for both **Contact Form** and **Job Applications** using **Mailtrap**!

## 🚀 Quick Setup

### 1. Create `.env` file in your project root:

```env
# Mailtrap SMTP Configuration
MAILTRAP_USER=d145a3141ff346
MAILTRAP_PASS=your-mailtrap-password

# Email Configuration
SENDER_EMAIL=hello@www.smartbookingcrm.live
SENDER_NAME=Belloo Jobs Portal
JOBS_EMAIL=zeyadelnady2@gmail.com
CONTACT_EMAIL=zeyadelnady2@gmail.com

# JWT Secret for Admin Authentication  
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 2. Mailtrap SMTP Setup ✅

Your Mailtrap SMTP is configured with:
- **SMTP Host**: `sandbox.smtp.mailtrap.io`
- **Port**: `2525`
- **Username**: `d145a3141ff346`
- **Password**: `your-mailtrap-password` (add your full password)
- **Sender Email**: `hello@www.smartbookingcrm.live`

## 📧 What Gets Sent

### Job Applications → `zeyadelnady2@gmail.com` (Testing)
- **Subject**: `🎯 New Job Application: [Name] - [Position]`
- **Content**: Professional HTML email with applicant info, contact details, and CV attachment

### Contact Form → `zeyadelnady2@gmail.com` (Testing)
- **Subject**: `💌 New Contact: [Subject] - [Name]`
- **Content**: Professional HTML email with contact details and message

## 🎨 Email Features

✅ **Professional HTML Templates** with Belloo branding  
✅ **CV File Attachments** automatically included  
✅ **Mobile-Responsive** design  
✅ **Error Handling** - forms save even if email fails  
✅ **SMTP Verification** on server startup

## 🔧 Customization

You can customize the email addresses in your `.env` file:

```env
# Where job applications are sent (Testing with your Gmail)
JOBS_EMAIL=zeyadelnady2@gmail.com

# Where contact forms are sent (Testing with your Gmail)
CONTACT_EMAIL=zeyadelnady2@gmail.com

# Sender information
SENDER_EMAIL=hello@www.smartbookingcrm.live
SENDER_NAME=Belloo Jobs Portal
```

## 🚨 Test It!

1. Create your `.env` file with Mailtrap SMTP credentials
2. Add your full Mailtrap password to `MAILTRAP_PASS`
3. Restart your server: `npm run dev`
4. Submit a test job application at `/join-us`
5. Check **both places**:
   - **Your Gmail** (`zeyadelnady2@gmail.com`) - Real email delivery test
   - **Mailtrap Inbox** - Preview how the email looks and debug any issues

**Note**: With this setup, you'll receive the actual emails in your Gmail for real-world testing, plus see them in Mailtrap for debugging!

## ✅ **Mailtrap Benefits:**

- 🚀 **Reliable Delivery** - 99.9% uptime
- 📊 **Email Analytics** - Track opens, clicks, etc.
- 🔒 **High Deliverability** - No spam folder issues
- 🎯 **Professional** - Perfect for business emails
- 💰 **Cost-Effective** - Better than traditional SMTP

**Note**: Forms will still work and save to database even if email setup isn't configured - email failures won't break the forms.
