import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { lang } = req.query;

    // Validate language
    if (lang !== 'en' && lang !== 'ru') {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid language. Use "en" or "ru"' 
      });
    }

    // Determine PDF filename based on language
    const pdfFileName = lang === 'en' 
      ? 'Olive profile (25 x 15 cm)  EN-HD.pdf'
      : 'Olive profile (25 x 15 cm)  RU-HD.pdf';

    // Try to read from file system - handle both local and Vercel standalone builds
    let fileBuffer = null;
    
    // List of possible paths (local dev, Vercel standalone, etc.)
    const possiblePaths = [
      // Standard Next.js public folder (local development)
      path.join(process.cwd(), 'public', 'assets', 'pdf', pdfFileName),
      // Vercel standalone build location
      path.join(process.cwd(), '.next', 'standalone', 'public', 'assets', 'pdf', pdfFileName),
      // Alternative standalone path
      path.join(process.cwd(), 'standalone', 'public', 'assets', 'pdf', pdfFileName),
      // Relative path
      path.resolve('./public/assets/pdf', pdfFileName),
      // Absolute path resolution
      path.resolve(process.cwd(), 'public', 'assets', 'pdf', pdfFileName),
    ];

    // Try each path until we find the file
    for (const filePath of possiblePaths) {
      try {
        if (fs.existsSync(filePath)) {
          fileBuffer = fs.readFileSync(filePath);
          console.log(`✅ Found PDF at: ${filePath}`);
          break;
        }
      } catch (err) {
        // Continue to next path
        continue;
      }
    }

    if (!fileBuffer) {
      console.error(`PDF file not found. Tried paths:`, possiblePaths);
      console.error(`Current working directory:`, process.cwd());
      return res.status(404).json({ 
        success: false, 
        error: 'PDF file not found. Please ensure the PDF files are in the public/assets/pdf folder.',
        debug: {
          cwd: process.cwd(),
          filename: pdfFileName,
          triedPaths: possiblePaths
        }
      });
    }

    // Set response headers for PDF viewing
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${pdfFileName}"`);
    res.setHeader('Content-Length', fileBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour

    // Send file
    return res.status(200).send(fileBuffer);
  } catch (error) {
    console.error('Error serving PDF:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message
    });
  }
}

