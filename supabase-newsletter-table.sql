-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  source VARCHAR(100) DEFAULT 'Website',
  language VARCHAR(10) DEFAULT 'en',
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  resubscribed_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- Create index on is_active for filtering
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscribers(is_active);

-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public to insert (subscribe)
CREATE POLICY "Allow public to subscribe" ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users (admin) to read all
CREATE POLICY "Allow authenticated to read all" ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow authenticated users (admin) to update
CREATE POLICY "Allow authenticated to update" ON newsletter_subscribers
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policy to allow authenticated users (admin) to delete
CREATE POLICY "Allow authenticated to delete" ON newsletter_subscribers
  FOR DELETE
  TO authenticated
  USING (true);

