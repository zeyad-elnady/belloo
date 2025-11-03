# Newsletter System Setup

## Overview
The newsletter system allows users to subscribe on the website and admins to manage subscribers through the admin dashboard.

## Features
- ✅ Email validation
- ✅ Modern success toast notification
- ✅ Search subscribers by email (before @ sign)
- ✅ Export subscribers in multiple formats (CSV, JSON, TXT)
- ✅ Admin dashboard management
- ✅ Duplicate detection
- ✅ Active/inactive status tracking

## Setup Instructions

### 1. Create Supabase Table
Run the SQL script in your Supabase SQL Editor:

```bash
# The SQL file is located at: supabase-newsletter-table.sql
```

Go to your Supabase project:
1. Navigate to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `supabase-newsletter-table.sql`
4. Click **Run** to execute the script

### 2. Verify Environment Variables
Make sure your `.env.local` file has the Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Deploy to Vercel
Make sure to add the environment variables in Vercel:
- Go to your Vercel project settings
- Navigate to **Environment Variables**
- Add the same variables from `.env.local`

## Features for Users

### Subscribe to Newsletter
Users can subscribe to the newsletter from:
- Homepage (newsletter section)
- Sidebar (mobile/tablet)

Success Message:
- Modern green toast notification appears
- Matches the site's design style
- Auto-dismisses after 5 seconds

### Email Validation
- Real-time validation
- Checks for valid email format
- Prevents duplicate subscriptions

## Features for Admins

### Access Newsletter Dashboard
1. Login to admin dashboard
2. Click on **Newsletter** tab
3. View all subscribers

### Search Subscribers
- Search by letters before the @ sign
- Example: Search "john" to find "john@example.com", "johnny@email.com", etc.
- Real-time filtering

### Export Subscribers
Choose from 3 export formats:
1. **CSV** - Excel compatible, includes all fields
2. **JSON** - For programmatic use
3. **TXT** - Email addresses only (one per line)

Click **Export** button to download the file.

### Manage Subscribers
- View subscriber details (email, source, language, date)
- See active/inactive status
- Delete subscribers (with confirmation)

## API Endpoints

### Public Endpoint
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

### Admin Endpoints (Requires Authentication)
- `GET /api/newsletter` - Get all subscribers
- `GET /api/newsletter?search=query` - Search subscribers
- `DELETE /api/newsletter?id=123` - Delete a subscriber
- `GET /api/newsletter/export?format=csv` - Export subscribers

## Database Schema

```sql
newsletter_subscribers:
- id (BIGSERIAL, PRIMARY KEY)
- email (VARCHAR, UNIQUE, NOT NULL)
- source (VARCHAR) - Where they subscribed from
- language (VARCHAR) - User's language preference
- is_active (BOOLEAN) - Active status
- subscribed_at (TIMESTAMPTZ) - Subscription date
- resubscribed_at (TIMESTAMPTZ) - Resubscription date
- unsubscribed_at (TIMESTAMPTZ) - Unsubscription date
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

## Testing

### Test Subscription
1. Go to the homepage
2. Scroll to newsletter section
3. Enter a valid email
4. Click **Subscribe**
5. Should see green success toast

### Test Admin Dashboard
1. Login as admin
2. Go to Newsletter tab
3. Verify subscriber appears
4. Test search functionality
5. Test export functionality

## Troubleshooting

### Subscribers not appearing
- Check Supabase table exists
- Verify RLS policies are set correctly
- Check browser console for errors

### Export not working
- Check authentication is valid
- Verify SUPABASE_SERVICE_ROLE_KEY is set
- Check browser allows file downloads

### Toast not showing
- Check browser console for React errors
- Verify NewsletterSuccessToast component is imported
- Clear browser cache

## Support
For issues or questions, check the admin dashboard error logs or browser console.

