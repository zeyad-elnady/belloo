import Database from 'better-sqlite3';
import path from 'path';
import jwt from 'jsonwebtoken';

const dbPath = path.join(process.cwd(), 'belloo.db');
const db = new Database(dbPath);
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get token from cookie
    const token = req.cookies.admin_token;
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if session exists and is valid
    const session = db.prepare(`
      SELECT s.*, u.username, u.email, u.full_name, u.last_login
      FROM admin_sessions s
      JOIN admin_users u ON s.user_id = u.id
      WHERE s.token = ? AND s.expires_at > CURRENT_TIMESTAMP
    `).get(token);

    if (!session) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: session.user_id,
        username: session.username,
        email: session.email,
        full_name: session.full_name,
        last_login: session.last_login
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
}
