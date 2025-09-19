// Vercel-optimized job application API
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { sendJobApplicationNotification } from '../../lib/email.js';

// Disable default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Simple in-memory storage for demo (replace with external database in production)
let jobApplications = [];

export default async function handler(req, res) {
  console.log(`Received ${req.method} request to job-application-vercel`);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      console.log('Processing POST request');
      
      // Create /tmp directory for file uploads (Vercel specific)
      const uploadDir = '/tmp';
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Configure formidable for Vercel
      const form = new IncomingForm({
        uploadDir: uploadDir,
        keepExtensions: true,
        maxFileSize: 5 * 1024 * 1024, // 5MB
        multiples: false,
        allowEmptyFiles: true, // Allow optional file uploads
        filter: ({ name, originalFilename, mimetype }) => {
          // Allow no file or valid file types
          if (!originalFilename) return true;
          return (
            mimetype === 'application/pdf' ||
            mimetype === 'application/msword' ||
            mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          );
        }
      });

      // Parse the form
      const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            console.error('Form parsing error:', err);
            reject(err);
          } else {
            console.log('Form parsed successfully');
            resolve({ fields, files });
          }
        });
      });

      // Extract form fields (formidable returns arrays for each field)
      const getFieldValue = (field) => {
        return Array.isArray(field) ? field[0] : field;
      };

      const formData = {
        name: getFieldValue(fields.name),
        title: getFieldValue(fields.title), 
        position: getFieldValue(fields.position),
        phone: getFieldValue(fields.phone),
        email: getFieldValue(fields.email),
        company: getFieldValue(fields.company)
      };

      console.log('Extracted form data:', formData);

      // Handle CV file
      let cvFileInfo = null;
      if (files.cv_file) {
        const file = Array.isArray(files.cv_file) ? files.cv_file[0] : files.cv_file;
        if (file && file.filepath && file.size > 0) {
          cvFileInfo = {
            path: file.filepath,
            name: file.originalFilename,
            size: file.size,
            mimetype: file.mimetype
          };
          console.log('CV file processed:', cvFileInfo);
        } else {
          console.log('No CV file or empty file uploaded');
        }
      } else {
        console.log('No CV file field found in form');
      }

      // Validate required fields
      const requiredFields = ['name', 'title', 'position', 'phone', 'email'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        console.error('Missing required fields:', missingFields);
        return res.status(400).json({
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        console.error('Invalid email format:', formData.email);
        return res.status(400).json({
          success: false,
          error: 'Invalid email format'
        });
      }

      // Create application record
      const application = {
        id: Date.now().toString(),
        ...formData,
        cv_file_name: cvFileInfo ? cvFileInfo.name : null,
        cv_file_size: cvFileInfo ? cvFileInfo.size : null,
        submitted_at: new Date().toISOString()
      };

      // Store in memory (replace with database in production)
      jobApplications.push(application);
      console.log('Application stored:', application.id);

      // Send email notification
      try {
        console.log('📧 Attempting to send email notification...');
        console.log('Application data:', application);
        console.log('CV file info:', cvFileInfo);
        
        const emailResult = await sendJobApplicationNotification(application, cvFileInfo);
        console.log('✅ Email notification sent successfully:', emailResult);
      } catch (emailError) {
        console.error('❌ Email notification failed:', emailError);
        console.error('❌ Email error stack:', emailError.stack);
        // Continue anyway - don't fail the whole request
      }

      // Clean up uploaded file if it exists
      if (cvFileInfo && fs.existsSync(cvFileInfo.path)) {
        try {
          fs.unlinkSync(cvFileInfo.path);
          console.log('Temporary file cleaned up');
        } catch (cleanupError) {
          console.error('File cleanup error:', cleanupError);
        }
      }

      return res.status(200).json({
        success: true,
        message: 'Job application submitted successfully',
        id: application.id,
        cvUploaded: !!cvFileInfo
      });

    } catch (error) {
      console.error('POST request error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  if (req.method === 'GET') {
    try {
      console.log('Processing GET request');
      return res.status(200).json({
        success: true,
        data: jobApplications,
        count: jobApplications.length
      });
    } catch (error) {
      console.error('GET request error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch applications'
      });
    }
  }

  // Method not allowed
  console.log(`Method ${req.method} not allowed`);
  res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
  return res.status(405).json({
    success: false,
    error: `Method ${req.method} not allowed`
  });
}
