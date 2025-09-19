// Vercel-optimized login API
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Simple admin users for Vercel (in production, use external database)
const ADMIN_USERS = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@belloo.com',
    // Password: admin123 (hashed)
    password: '$2b$10$8YOIe/e0aQmNP3wXjuX3NerV1h9mEtHEI1QxGkX8.dNMqJ3WKnFtC',
    full_name: 'Administrator'
  }
];

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

export default async function handler(req, res) {
  console.log(`Login API: Received ${req.method} request`);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log(`Method ${req.method} not allowed`);
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed. Use POST.' 
    });
  }

  try {
    console.log('Processing login request...');
    console.log('Request body:', req.body);
    
    const { username, password } = req.body;

    if (!username || !password) {
      console.log('Missing username or password');
      return res.status(400).json({ 
        success: false,
        error: 'Username and password are required' 
      });
    }

    // Find user (case insensitive)
    const user = ADMIN_USERS.find(u => 
      u.username.toLowerCase() === username.toLowerCase() || 
      u.email.toLowerCase() === username.toLowerCase()
    );
    
    console.log('User lookup result:', user ? 'User found' : 'User not found');
    
    if (!user) {
      console.log('Invalid username:', username);
      return res.status(401).json({ 
        success: false,
        error: 'Invalid credentials' 
      });
    }

    // Verify password
    console.log('Verifying password...');
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      console.log('Invalid password for user:', username);
      return res.status(401).json({ 
        success: false,
        error: 'Invalid credentials' 
      });
    }

    console.log('Password verified, generating token...');
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username,
        email: user.email 
      }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    // Set HTTP-only cookie
    const cookieValue = `admin_token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
    res.setHeader('Set-Cookie', cookieValue);

    console.log('Login successful for user:', username);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        last_login: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
