-- Supabase Schema v2 for Belloo Application (with Display IDs)
-- Run this script in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if you want to recreate (CAREFUL!)
-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS contact_submissions CASCADE;
-- DROP TABLE IF EXISTS job_applications CASCADE;

-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    display_id SERIAL UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(255),
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    display_id SERIAL UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job applications table
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    display_id SERIAL UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    position VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    company VARCHAR(255),
    cv_file_path TEXT,
    cv_file_name VARCHAR(255),
    cv_file_size INTEGER,
    cv_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_display_id ON contact_submissions(display_id);

CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON job_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_email ON job_applications(email);
CREATE INDEX IF NOT EXISTS idx_job_applications_display_id ON job_applications(display_id);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_display_id ON users(display_id);

-- Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for users table
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users are viewable by authenticated users" ON users;
DROP POLICY IF EXISTS "Users are updatable by authenticated users" ON users;
DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Service role can view all contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Service role can delete contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Anyone can insert job applications" ON job_applications;
DROP POLICY IF EXISTS "Service role can view all job applications" ON job_applications;
DROP POLICY IF EXISTS "Service role can delete job applications" ON job_applications;

-- Create policies for users table
CREATE POLICY "Users are viewable by authenticated users" ON users
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users are updatable by authenticated users" ON users
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policies for contact_submissions
CREATE POLICY "Anyone can insert contact submissions" ON contact_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can view all contact submissions" ON contact_submissions
    FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Service role can delete contact submissions" ON contact_submissions
    FOR DELETE USING (auth.role() = 'service_role');

-- Create policies for job_applications
CREATE POLICY "Anyone can insert job applications" ON job_applications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can view all job applications" ON job_applications
    FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Service role can delete job applications" ON job_applications
    FOR DELETE USING (auth.role() = 'service_role');

-- Create/update storage bucket for CV files
INSERT INTO storage.buckets (id, name, public)
VALUES ('cvs', 'cvs', false)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies
DROP POLICY IF EXISTS "Anyone can upload CVs" ON storage.objects;
DROP POLICY IF EXISTS "Service role can view CVs" ON storage.objects;
DROP POLICY IF EXISTS "Service role can delete CVs" ON storage.objects;

-- Storage policies for CV files
CREATE POLICY "Anyone can upload CVs" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'cvs');

CREATE POLICY "Service role can view CVs" ON storage.objects
    FOR SELECT USING (bucket_id = 'cvs' AND auth.role() = 'service_role');

CREATE POLICY "Service role can delete CVs" ON storage.objects
    FOR DELETE USING (bucket_id = 'cvs' AND auth.role() = 'service_role');

-- If you have existing data, add display_id column
-- (Only run this if tables already exist with data)
/*
ALTER TABLE users ADD COLUMN IF NOT EXISTS display_id SERIAL UNIQUE;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS display_id SERIAL UNIQUE;
ALTER TABLE job_applications ADD COLUMN IF NOT EXISTS display_id SERIAL UNIQUE;
*/

-- Verify the changes
SELECT 'Users table:' as info, COUNT(*) as count FROM users;
SELECT 'Contact submissions:' as info, COUNT(*) as count FROM contact_submissions;
SELECT 'Job applications:' as info, COUNT(*) as count FROM job_applications;

