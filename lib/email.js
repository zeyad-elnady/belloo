import nodemailer from 'nodemailer';

// Gmail SMTP Configuration (More reliable than Mailtrap)
const GMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || "zeyadelnady2@gmail.com",
    pass: process.env.GMAIL_PASS || "your-gmail-app-password"
  }
};

// Try multiple Mailtrap configurations with different ports
const MAILTRAP_CONFIGS = [
  {
    name: "Mailtrap Port 587 (Most Compatible)",
    config: {
      host: "sandbox.smtp.mailtrap.io",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAILTRAP_USER || "d145a3141ff346",
        pass: process.env.MAILTRAP_PASS || "your-mailtrap-password"
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000
    }
  },
  {
    name: "Mailtrap Port 2525 (Standard)",
    config: {
      host: "sandbox.smtp.mailtrap.io", 
      port: 2525,
      secure: false,
      auth: {
        user: process.env.MAILTRAP_USER || "d145a3141ff346",
        pass: process.env.MAILTRAP_PASS || "your-mailtrap-password"
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000
    }
  },
  {
    name: "Mailtrap Port 25 (Fallback)",
    config: {
      host: "sandbox.smtp.mailtrap.io",
      port: 25,
      secure: false,
      auth: {
        user: process.env.MAILTRAP_USER || "d145a3141ff346",
        pass: process.env.MAILTRAP_PASS || "your-mailtrap-password"
      },
      connectionTimeout: 8000,
      greetingTimeout: 4000,
      socketTimeout: 8000
    }
  }
];

// Get the primary Mailtrap config (Port 587 - most likely to work)
const MAILTRAP_CONFIG = MAILTRAP_CONFIGS[0].config;

// Debug environment variables
console.log('📧 Email config debug:');
console.log('GMAIL_USER:', process.env.GMAIL_USER ? '✅ Set' : '❌ Not set');
console.log('GMAIL_PASS:', process.env.GMAIL_PASS ? '✅ Set' : '❌ Not set');

// Switch back to Gmail SMTP for real email delivery
console.log('🔄 Using Gmail SMTP for real email delivery...');
const transporter = nodemailer.createTransport(GMAIL_CONFIG);

// Sender configuration
const sender = {
  address: process.env.SENDER_EMAIL || "zeyadelnady2@gmail.com",
  name: process.env.SENDER_NAME || "Belloo Jobs Portal",
};

// Verify Gmail SMTP connection
export const verifyEmailConnection = async () => {
  try {
    console.log('🔍 Testing Gmail SMTP connection...');
    await transporter.verify();
    console.log('✅ Gmail SMTP server is ready to send emails');
    console.log('📧 Emails will be delivered to your Gmail account');
    return true;
  } catch (error) {
    console.error('❌ Gmail SMTP connection error:', error.message);
    
    // Provide specific troubleshooting advice
    if (error.code === 'EAUTH') {
      console.log('💡 Authentication failed - check your Gmail App Password');
      console.log('   → Make sure 2FA is enabled and you\'re using an App Password');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('💡 Connection timeout - check your network connection');
    }
    
    return false;
  }
};

// Send job application notification email
export const sendJobApplicationNotification = async (applicationData, cvFile = null) => {
  try {
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Job Application - Belloo</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
        .content { padding: 30px; }
        .info-card { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 15px 0; border-left: 4px solid #007bff; }
        .info-row { display: flex; margin-bottom: 12px; }
        .info-label { font-weight: 600; color: #495057; min-width: 100px; margin-right: 15px; }
        .info-value { color: #212529; flex: 1; }
        .position-badge { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block; text-transform: capitalize; }
        .cv-info { background: #e8f5e8; border-radius: 8px; padding: 15px; margin: 15px 0; border-left: 4px solid #28a745; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px; }
        .timestamp { color: #6c757d; font-size: 13px; margin-top: 15px; text-align: right; }
        @media (max-width: 600px) {
            .container { margin: 10px; border-radius: 8px; }
            .content { padding: 20px; }
            .info-row { flex-direction: column; }
            .info-label { min-width: auto; margin-bottom: 5px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 New Job Application Received</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Someone has applied for a position at Belloo</p>
        </div>
        
        <div class="content">
            <div class="info-card">
                <h3 style="margin: 0 0 15px 0; color: #495057;">👤 Applicant Information</h3>
                <div class="info-row">
                    <span class="info-label">Name:</span>
                    <span class="info-value"><strong>${applicationData.name}</strong></span>
                </div>
                <div class="info-row">
                    <span class="info-label">Title:</span>
                    <span class="info-value">${applicationData.title}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Position:</span>
                    <span class="info-value"><span class="position-badge">${applicationData.position.replace('-', ' ')}</span></span>
                </div>
                ${applicationData.company ? `
                <div class="info-row">
                    <span class="info-label">Company:</span>
                    <span class="info-value">${applicationData.company}</span>
                </div>
                ` : ''}
            </div>

            <div class="info-card">
                <h3 style="margin: 0 0 15px 0; color: #495057;">📞 Contact Information</h3>
                <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value"><a href="mailto:${applicationData.email}" style="color: #007bff; text-decoration: none;">${applicationData.email}</a></span>
                </div>
                <div class="info-row">
                    <span class="info-label">Phone:</span>
                    <span class="info-value"><a href="tel:${applicationData.phone}" style="color: #28a745; text-decoration: none;">${applicationData.phone}</a></span>
                </div>
            </div>

            ${cvFile ? `
            <div class="cv-info">
                <h3 style="margin: 0 0 15px 0; color: #495057;">📎 CV Attachment</h3>
                <div class="info-row">
                    <span class="info-label">File:</span>
                    <span class="info-value"><strong>${cvFile.name}</strong></span>
                </div>
                <div class="info-row">
                    <span class="info-label">Size:</span>
                    <span class="info-value">${(cvFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <p style="margin: 10px 0 0 0; color: #6c757d; font-size: 14px;">
                    💡 The CV file is attached to this email and also stored in the admin dashboard.
                </p>
            </div>
            ` : `
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p style="margin: 0; color: #856404;">⚠️ No CV file was uploaded with this application.</p>
            </div>
            `}

            <div class="timestamp">
                📅 Submitted on: ${new Date().toLocaleString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}
            </div>
        </div>

        <div class="footer">
            <p style="margin: 0;">This notification was automatically sent from the Belloo website job application form.</p>
            <p style="margin: 5px 0 0 0;">You can view all applications in the <strong>Admin Dashboard</strong>.</p>
        </div>
    </div>
</body>
</html>`;

    // Email options
    const mailOptions = {
      from: {
        name: sender.name,
        address: sender.address
      },
      to: process.env.JOBS_EMAIL || 'jobs@bello-food.com',
      subject: `🎯 New Job Application: ${applicationData.name} - ${applicationData.position.replace('-', ' ')}`,
      html: emailHtml,
      attachments: cvFile ? [{
        filename: cvFile.name,
        path: cvFile.path,
        contentType: cvFile.mimetype
      }] : []
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Job application email sent successfully:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId,
      preview: nodemailer.getTestMessageUrl(info) // Only for Ethereal test accounts
    };

  } catch (error) {
    console.error('❌ Error sending job application email:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Send contact form notification email
export const sendContactFormNotification = async (contactData) => {
  try {
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Message - Belloo</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #007bff 0%, #6f42c1 100%); color: white; padding: 25px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
        .content { padding: 30px; }
        .info-card { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 15px 0; border-left: 4px solid #007bff; }
        .info-row { display: flex; margin-bottom: 12px; }
        .info-label { font-weight: 600; color: #495057; min-width: 100px; margin-right: 15px; }
        .info-value { color: #212529; flex: 1; }
        .message-box { background: #e7f3ff; border-radius: 8px; padding: 20px; margin: 15px 0; border-left: 4px solid #007bff; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px; }
        .timestamp { color: #6c757d; font-size: 13px; margin-top: 15px; text-align: right; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💌 New Contact Message</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Someone has sent a message through the contact form</p>
        </div>
        
        <div class="content">
            <div class="info-card">
                <h3 style="margin: 0 0 15px 0; color: #495057;">👤 Contact Information</h3>
                <div class="info-row">
                    <span class="info-label">Name:</span>
                    <span class="info-value"><strong>${contactData.name}</strong></span>
                </div>
                <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value"><a href="mailto:${contactData.email}" style="color: #007bff;">${contactData.email}</a></span>
                </div>
                <div class="info-row">
                    <span class="info-label">Phone:</span>
                    <span class="info-value"><a href="tel:${contactData.phone}" style="color: #28a745;">${contactData.phone}</a></span>
                </div>
                <div class="info-row">
                    <span class="info-label">Subject:</span>
                    <span class="info-value"><strong>${contactData.subject}</strong></span>
                </div>
            </div>

            <div class="message-box">
                <h3 style="margin: 0 0 15px 0; color: #495057;">💬 Message</h3>
                <p style="margin: 0; white-space: pre-line; color: #212529;">${contactData.message}</p>
            </div>

            <div class="timestamp">
                📅 Submitted on: ${new Date().toLocaleString()}
            </div>
        </div>

        <div class="footer">
            <p style="margin: 0;">This message was sent from the Belloo website contact form.</p>
        </div>
    </div>
</body>
</html>`;

    const mailOptions = {
      from: {
        name: sender.name,
        address: sender.address
      },
      to: process.env.CONTACT_EMAIL || 'info@bello-food.com',
      subject: `💌 New Contact: ${contactData.subject} - ${contactData.name}`,
      html: emailHtml,
      replyTo: contactData.email
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact form email sent successfully:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId
    };

  } catch (error) {
    console.error('❌ Error sending contact form email:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export default { sendJobApplicationNotification, sendContactFormNotification, verifyEmailConnection };
