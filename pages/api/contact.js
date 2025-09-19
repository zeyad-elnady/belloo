import { contactSubmissions } from '../../lib/database';
import { sendContactFormNotification } from '../../lib/email.js';

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
      const { name, email, phone, subject, message } = req.body;

      // Validate required fields
      if (!name || !email || !phone || !subject || !message) {
        return res.status(400).json({
          success: false,
          error: 'All fields are required'
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
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim()
      };

      // Save to database
      const result = contactSubmissions.create(sanitizedData);

      if (result.success) {
        // Send email notification
        try {
          const emailResult = await sendContactFormNotification(sanitizedData);
          console.log('Contact form email notification result:', emailResult);
        } catch (emailError) {
          console.error('Contact email notification failed, but form was saved:', emailError);
          // Don't fail the API call if email fails
        }

        return res.status(200).json({
          success: true,
          message: 'Contact submission saved successfully',
          id: result.id
        });
      } else {
        return res.status(500).json({
          success: false,
          error: 'Failed to save contact submission'
        });
      }

    } catch (error) {
      console.error('Contact API error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  if (req.method === 'GET') {
    try {
      // Optional: Add authentication here for admin access
      const submissions = contactSubmissions.getAll();
      
      return res.status(200).json({
        success: true,
        data: submissions
      });
    } catch (error) {
      console.error('Contact API error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch contact submissions'
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
