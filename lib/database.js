import Database from 'better-sqlite3';
import path from 'path';

// Create database file in the project root
const dbPath = path.join(process.cwd(), 'belloo.db');
const db = new Database(dbPath);

// Enable WAL mode for better concurrent access
db.pragma('journal_mode = WAL');

// Initialize tables
function initDatabase() {
  // Create contact_submissions table
  const createContactTable = `
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      submission_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Create job_applications table
  const createJobApplicationsTable = `
    CREATE TABLE IF NOT EXISTS job_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      position TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      cv_file_path TEXT,
      cv_file_name TEXT,
      cv_file_size INTEGER,
      cv_link TEXT,
      submission_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    db.exec(createContactTable);
    db.exec(createJobApplicationsTable);
    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Contact submissions functions
const contactSubmissions = {
  // Insert new contact submission
  create: (data) => {
    const stmt = db.prepare(`
      INSERT INTO contact_submissions (name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    try {
      const result = stmt.run(
        data.name,
        data.email,
        data.phone,
        data.subject,
        data.message
      );
      return { success: true, id: result.lastInsertRowid };
    } catch (error) {
      console.error('Error creating contact submission:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all contact submissions
  getAll: () => {
    const stmt = db.prepare(`
      SELECT * FROM contact_submissions 
      ORDER BY created_at DESC
    `);
    
    try {
      return stmt.all();
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      return [];
    }
  },

  // Get contact submission by ID
  getById: (id) => {
    const stmt = db.prepare(`
      SELECT * FROM contact_submissions 
      WHERE id = ?
    `);
    
    try {
      return stmt.get(id);
    } catch (error) {
      console.error('Error fetching contact submission:', error);
      return null;
    }
  }
};

// Job applications functions
const jobApplications = {
  // Insert new job application
  create: (data) => {
    const stmt = db.prepare(`
      INSERT INTO job_applications (name, title, position, phone, email, company, cv_file_path, cv_file_name, cv_file_size, cv_link)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    try {
      const result = stmt.run(
        data.name,
        data.title,
        data.position,
        data.phone,
        data.email,
        data.company || null,
        data.cv_file_path || null,
        data.cv_file_name || null,
        data.cv_file_size || null,
        data.cv_link || null
      );
      return { success: true, id: result.lastInsertRowid };
    } catch (error) {
      console.error('Error creating job application:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all job applications
  getAll: () => {
    const stmt = db.prepare(`
      SELECT * FROM job_applications 
      ORDER BY created_at DESC
    `);
    
    try {
      return stmt.all();
    } catch (error) {
      console.error('Error fetching job applications:', error);
      return [];
    }
  },

  // Get job application by ID
  getById: (id) => {
    const stmt = db.prepare(`
      SELECT * FROM job_applications 
      WHERE id = ?
    `);
    
    try {
      return stmt.get(id);
    } catch (error) {
      console.error('Error fetching job application:', error);
      return null;
    }
  }
};

// Initialize database on module load
initDatabase();

export {
  db,
  contactSubmissions,
  jobApplications,
  initDatabase
};
