// Vercel-optimized profile API
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Simple admin user data (in production, use external database)
let ADMIN_USERS = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@belloo.com',
    password: '$2b$10$8YOIe/e0aQmNP3wXjuX3NerV1h9mEtHEI1QxGkX8.dNMqJ3WKnFtC', // admin123
    full_name: 'Administrator'
  }
];

export default async function handler(req, res) {
  console.log(`Profile API: Received ${req.method} request`);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    });
  }

  try {
    console.log('Processing profile update...');
    
    // Get token from cookie
    const cookies = req.headers.cookie;
    if (!cookies) {
      return res.status(401).json({ 
        success: false,
        error: 'No authentication token' 
      });
    }

    const tokenMatch = cookies.match(/admin_token=([^;]+)/);
    if (!tokenMatch) {
      return res.status(401).json({ 
        success: false,
        error: 'No authentication token' 
      });
    }

    const token = tokenMatch[1];
    
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user
    const userIndex = ADMIN_USERS.findIndex(u => u.id === decoded.userId);
    
    if (userIndex === -1) {
      return res.status(401).json({ 
        success: false,
        error: 'User not found' 
      });
    }

    const user = ADMIN_USERS[userIndex];
    const { full_name, email, current_password, new_password } = req.body;

    console.log('Profile update data:', { full_name, email, hasNewPassword: !!new_password });

    // Validate required fields
    if (!full_name || !email) {
      return res.status(400).json({ 
        success: false,
        error: 'Full name and email are required' 
      });
    }

    // If changing password, verify current password
    if (new_password) {
      if (!current_password) {
        return res.status(400).json({ 
          success: false,
          error: 'Current password is required to set new password' 
        });
      }

      const isValidCurrentPassword = await bcrypt.compare(current_password, user.password);
      if (!isValidCurrentPassword) {
        return res.status(400).json({ 
          success: false,
          error: 'Current password is incorrect' 
        });
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(new_password, 10);
      ADMIN_USERS[userIndex].password = hashedNewPassword;
      console.log('Password updated successfully');
    }

    // Update user data
    ADMIN_USERS[userIndex].full_name = full_name;
    ADMIN_USERS[userIndex].email = email;

    console.log('Profile updated successfully for user:', user.username);

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        username: user.username,
        email: email,
        full_name: full_name
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    
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
