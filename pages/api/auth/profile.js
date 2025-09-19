import Database from 'better-sqlite3';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const dbPath = path.join(process.cwd(), 'belloo.db');
const db = new Database(dbPath);
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware to verify authentication
const verifyAuth = (req) => {
  const token = req.cookies.admin_token;
  if (!token) throw new Error('No token provided');
  
  const decoded = jwt.verify(token, JWT_SECRET);
  const session = db.prepare(`
    SELECT s.*, u.id as user_id, u.username, u.email, u.full_name
    FROM admin_sessions s
    JOIN admin_users u ON s.user_id = u.id
    WHERE s.token = ? AND s.expires_at > CURRENT_TIMESTAMP
  `).get(token);
  
  if (!session) throw new Error('Invalid session');
  return session;
};

export default async function handler(req, res) {
  try {
    const session = verifyAuth(req);

    if (req.method === 'GET') {
      // Get user profile
      const user = db.prepare(`
        SELECT id, username, email, full_name, created_at, last_login
        FROM admin_users WHERE id = ?
      `).get(session.user_id);

      return res.status(200).json({
        success: true,
        user: user
      });

    } else if (req.method === 'PUT') {
      // Update user profile
      const { full_name, email, current_password, new_password } = req.body;

      if (!full_name || !email) {
        return res.status(400).json({ error: 'Full name and email are required' });
      }

      let updateFields = { full_name, email };
      let updateQuery = 'UPDATE admin_users SET full_name = ?, email = ?';
      let queryParams = [full_name, email];

      // Handle password change
      if (new_password) {
        if (!current_password) {
          return res.status(400).json({ error: 'Current password is required to set new password' });
        }

        // Verify current password
        const user = db.prepare('SELECT password FROM admin_users WHERE id = ?').get(session.user_id);
        const isValidCurrentPassword = bcrypt.compareSync(current_password, user.password);
        
        if (!isValidCurrentPassword) {
          return res.status(400).json({ error: 'Current password is incorrect' });
        }

        const hashedNewPassword = bcrypt.hashSync(new_password, 10);
        updateQuery = 'UPDATE admin_users SET full_name = ?, email = ?, password = ?';
        queryParams = [full_name, email, hashedNewPassword];
      }

      updateQuery += ' WHERE id = ?';
      queryParams.push(session.user_id);

      db.prepare(updateQuery).run(...queryParams);

      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully'
      });

    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Profile API error:', error);
    if (error.message.includes('token') || error.message.includes('session')) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
