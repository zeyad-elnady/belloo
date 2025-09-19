// Temporary fix: inline the database functions to avoid module issues
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { IncomingForm } from 'formidable';
import { sendJobApplicationNotification, verifyEmailConnection } from '../../lib/email.js';

// Initialize database inline - use /tmp for Vercel
const isVercel = process.env.VERCEL === '1';
const dbPath = isVercel 
  ? path.join('/tmp', 'belloo.db')
  : path.join(process.cwd(), 'belloo.db');

let db;
try {
  db = new Database(dbPath);
} catch (error) {
  console.error('Database connection error:', error);
  // Fallback to memory database for Vercel if file database fails
  db = new Database(':memory:');
}

// Enable WAL mode for better concurrent access
db.pragma('journal_mode = WAL');

// Create job_applications table if not exists
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

// Add missing columns if they don't exist (for existing databases)
const addCompanyColumn = `ALTER TABLE job_applications ADD COLUMN company TEXT`;
const addCvFilePathColumn = `ALTER TABLE job_applications ADD COLUMN cv_file_path TEXT`;
const addCvFileNameColumn = `ALTER TABLE job_applications ADD COLUMN cv_file_name TEXT`;
const addCvFileSizeColumn = `ALTER TABLE job_applications ADD COLUMN cv_file_size INTEGER`;

try {
  db.exec(createJobApplicationsTable);
  console.log('Job applications table ready');
  
  // Try to add missing columns if they don't exist
  const columnsToAdd = [
    { sql: addCompanyColumn, name: 'company' },
    { sql: addCvFilePathColumn, name: 'cv_file_path' },
    { sql: addCvFileNameColumn, name: 'cv_file_name' },
    { sql: addCvFileSizeColumn, name: 'cv_file_size' }
  ];
  
  for (const column of columnsToAdd) {
    try {
      db.exec(column.sql);
      console.log(`${column.name} column added`);
    } catch (columnError) {
      // Column might already exist, which is fine
      if (!columnError.message.includes('duplicate column name')) {
        console.error(`Error adding ${column.name} column:`, columnError);
      }
    }
  }

  // Verify email connection on startup
  verifyEmailConnection();
} catch (error) {
  console.error('Error creating table:', error);
}

// Inline job applications functions
const jobApplications = {
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
  
  getAll: () => {
    const stmt = db.prepare(`SELECT * FROM job_applications ORDER BY created_at DESC`);
    try {
      return stmt.all();
    } catch (error) {
      console.error('Error fetching job applications:', error);
      return [];
    }
  }
};

// Disable default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      // Create upload directory for Vercel's /tmp directory
      const uploadDir = isVercel ? '/tmp/uploads' : path.join(process.cwd(), 'public', 'uploads', 'cvs');
      
      // Ensure upload directory exists
      try {
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
          console.log(`Created upload directory: ${uploadDir}`);
        }
      } catch (dirError) {
        console.error('Error creating upload directory:', dirError);
      }

      // Parse form data using formidable
      const form = new IncomingForm({
        uploadDir: uploadDir,
        keepExtensions: true,
        maxFileSize: 5 * 1024 * 1024, // 5MB
        multiples: false,
        filter: ({ name, originalFilename, mimetype }) => {
          // Allow CV file uploads
          return name === 'cv_file' && mimetype && [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          ].includes(mimetype);
        }
      });
      
      const parseForm = () => {
        return new Promise((resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve({ fields, files });
          });
        });
      };
      
      const { fields, files } = await parseForm();
      
      // Extract form fields (formidable returns arrays, so get first element)
      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
      const position = Array.isArray(fields.position) ? fields.position[0] : fields.position;
      const phone = Array.isArray(fields.phone) ? fields.phone[0] : fields.phone;
      const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
      const company = Array.isArray(fields.company) ? fields.company[0] : fields.company;
      
      console.log('Received form data:', { name, title, position, phone, email, company });
      console.log('Received files:', files);
      
      // Handle CV file upload
      let cvFileInfo = null;
      if (files.cv_file) {
        const file = Array.isArray(files.cv_file) ? files.cv_file[0] : files.cv_file;
        if (file && file.filepath && file.originalFilename) {
          // For Vercel, we'll store file info but won't persist the actual file
          // since the filesystem is read-only except for /tmp
          const uploadedFileName = path.basename(file.filepath);
          
          cvFileInfo = {
            path: file.filepath, // Full system path for email attachment
            relativePath: isVercel ? `/tmp/uploads/${uploadedFileName}` : `public/uploads/cvs/${uploadedFileName}`,
            name: file.originalFilename,
            size: file.size,
            mimetype: file.mimetype
          };
          console.log('CV file uploaded:', cvFileInfo);
        }
      }

      // Validate required fields
      if (!name || !title || !position || !phone || !email) {
        return res.status(400).json({
          success: false,
          error: 'All required fields must be filled'
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid email format'
        });
      }

      // Sanitize input data
      const sanitizedData = {
        name: name.trim(),
        title: title.trim(),
        position: position.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        company: company ? company.trim() : null,
        cv_file_path: cvFileInfo ? cvFileInfo.relativePath : null,
        cv_file_name: cvFileInfo ? cvFileInfo.name : null,
        cv_file_size: cvFileInfo ? cvFileInfo.size : null
      };

      // Save to database
      const result = jobApplications.create(sanitizedData);

      if (result.success) {
        // Send email notification
        try {
          const emailResult = await sendJobApplicationNotification(sanitizedData, cvFileInfo ? {
            name: cvFileInfo.name,
            path: cvFileInfo.path,
            size: cvFileInfo.size,
            mimetype: cvFileInfo.mimetype
          } : null);
          
          console.log('Email notification result:', emailResult);
        } catch (emailError) {
          console.error('Email notification failed, but application was saved:', emailError);
          // Don't fail the API call if email fails
        }

        return res.status(200).json({
          success: true,
          message: 'Job application submitted successfully',
          id: result.id,
          cvUploaded: !!cvFileInfo,
          cvFileName: cvFileInfo ? cvFileInfo.name : null
        });
      } else {
        return res.status(500).json({
          success: false,
          error: 'Failed to save job application'
        });
      }

    } catch (error) {
      console.error('Job application API error:', error);
      console.error('Error stack:', error.stack);
      
      return res.status(500).json({
        success: false,
        error: error.message || 'Internal server error',
        details: error.stack
      });
    }
  }

  if (req.method === 'GET') {
    try {
      // Optional: Add authentication here for admin access
      const applications = jobApplications.getAll();
      
      return res.status(200).json({
        success: true,
        data: applications
      });
    } catch (error) {
      console.error('Job application API error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch job applications'
      });
    }
  }

  // Method not allowed
  res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
  res.status(405).json({
    success: false,
    error: 'Method not allowed'
  });
}
