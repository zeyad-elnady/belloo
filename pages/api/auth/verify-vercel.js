// Vercel-optimized auth verification API
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Simple admin user data (match with login-vercel.js)
const ADMIN_USERS = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@belloo.com',
    full_name: 'Administrator'
  }
];

export default async function handler(req, res) {
  console.log(`Verify API: Received ${req.method} request`);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    });
  }

  try {
    console.log('Verifying authentication...');
    
    // Get token from cookie
    const cookies = req.headers.cookie;
    console.log('Cookies:', cookies ? 'Present' : 'Missing');
    
    if (!cookies) {
      console.log('No cookies found');
      return res.status(401).json({ 
        success: false,
        error: 'No authentication token' 
      });
    }

    const tokenMatch = cookies.match(/admin_token=([^;]+)/);
    if (!tokenMatch) {
      console.log('No admin token in cookies');
      return res.status(401).json({ 
        success: false,
        error: 'No authentication token' 
      });
    }

    const token = tokenMatch[1];
    console.log('Token found, verifying...');

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token decoded:', { userId: decoded.userId, username: decoded.username });
    
    // Find user data
    const user = ADMIN_USERS.find(u => u.id === decoded.userId);
    
    if (!user) {
      console.log('User not found for decoded token');
      return res.status(401).json({ 
        success: false,
        error: 'User not found' 
      });
    }

    console.log('Authentication verified for user:', user.username);

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        last_login: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Auth verification error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid token' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        error: 'Token expired' 
      });
    }

    return res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
}
