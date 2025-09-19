import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'belloo.db');
const db = new Database(dbPath);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get token from cookie
    const token = req.cookies.admin_token;
    
    if (token) {
      // Remove session from database
      db.prepare('DELETE FROM admin_sessions WHERE token = ?').run(token);
    }

    // Clear cookie
    res.setHeader('Set-Cookie', 'admin_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax');

    return res.status(200).json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
