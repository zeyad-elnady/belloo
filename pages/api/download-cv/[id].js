// Import the inlined jobApplications since we're using the inline version
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Initialize database inline (matching job-application.js)
const dbPath = path.join(process.cwd(), 'belloo.db');
const db = new Database(dbPath);

const jobApplications = {
  getById: (id) => {
    const stmt = db.prepare(`SELECT * FROM job_applications WHERE id = ?`);
    try {
      return stmt.get(id);
    } catch (error) {
      console.error('Error fetching job application:', error);
      return null;
    }
  }
};

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get application from database
    const application = jobApplications.getById(id);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    if (!application.cv_file_path) {
      return res.status(404).json({ error: 'No CV file found for this application' });
    }

    // Construct full file path
    const filePath = path.join(process.cwd(), application.cv_file_path);
    
    console.log('Looking for file at:', filePath);
    console.log('CV file path from DB:', application.cv_file_path);
    console.log('Current working directory:', process.cwd());
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log('File not found at:', filePath);
      return res.status(404).json({ 
        error: 'CV file not found on server',
        attempted_path: filePath,
        cv_file_path: application.cv_file_path
      });
    }

    // Get file stats
    const stats = fs.statSync(filePath);
    
    // Set appropriate headers
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${application.cv_file_name}"`);
    res.setHeader('Content-Length', stats.size);

    // Create read stream and pipe to response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

  } catch (error) {
    console.error('Download CV error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
