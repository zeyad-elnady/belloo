import Database from 'better-sqlite3';
import path from 'path';
import jwt from 'jsonwebtoken';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'belloo.db');
const db = new Database(dbPath);
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware to verify authentication
const verifyAuth = (req) => {
  const token = req.cookies.admin_token;
  if (!token) throw new Error('No token provided');
  
  const decoded = jwt.verify(token, JWT_SECRET);
  const session = db.prepare(`
    SELECT s.*, u.id as user_id
    FROM admin_sessions s
    JOIN admin_users u ON s.user_id = u.id
    WHERE s.token = ? AND s.expires_at > CURRENT_TIMESTAMP
  `).get(token);
  
  if (!session) throw new Error('Invalid session');
  return session;
};

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify authentication
    verifyAuth(req);

    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty IDs array' });
    }

    // Validate IDs are numbers
    const numericIds = ids.map(id => parseInt(id)).filter(id => !isNaN(id));
    if (numericIds.length === 0) {
      return res.status(400).json({ error: 'No valid IDs provided' });
    }

    // Get CV file paths for cleanup
    const placeholders = numericIds.map(() => '?').join(',');
    const selectQuery = `SELECT cv_file_path FROM job_applications WHERE id IN (${placeholders}) AND cv_file_path IS NOT NULL`;
    const stmt = db.prepare(selectQuery);
    const cvFiles = stmt.all(...numericIds);

    // Delete records from database
    const deleteQuery = `DELETE FROM job_applications WHERE id IN (${placeholders})`;
    const deleteStmt = db.prepare(deleteQuery);
    const result = deleteStmt.run(...numericIds);

    // Clean up CV files
    let deletedFiles = 0;
    for (const record of cvFiles) {
      try {
        const filePath = path.join(process.cwd(), record.cv_file_path);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          deletedFiles++;
        }
      } catch (fileError) {
        console.error('Error deleting CV file:', fileError);
      }
    }

    console.log(`Bulk deleted ${result.changes} job applications and ${deletedFiles} CV files`);

    return res.status(200).json({
      success: true,
      message: `Successfully deleted ${result.changes} job application(s) and ${deletedFiles} CV file(s)`,
      deletedCount: result.changes,
      deletedFiles: deletedFiles
    });

  } catch (error) {
    console.error('Bulk delete job applications error:', error);
    if (error.message.includes('token') || error.message.includes('session')) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
