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

    let fileBuffer = null;

    // Try to read from file system first (works in local development)
    const localPath = path.join(process.cwd(), 'public', 'assets', 'pdf', pdfFileName);
    try {
      if (fs.existsSync(localPath)) {
        fileBuffer = fs.readFileSync(localPath);
        console.log(`✅ Found PDF at local path: ${localPath}`);
      }
    } catch (err) {
      // File system access not available (Vercel serverless)
      console.log('File system access not available, fetching from public URL...');
    }

    // If file system access failed (Vercel serverless), fetch from public URL
    if (!fileBuffer) {
      try {
        // Construct the public URL
        const protocol = req.headers['x-forwarded-proto'] || 'https';
        const host = req.headers.host || req.headers['x-forwarded-host'];
        const baseUrl = `${protocol}://${host}`;
        const encodedFileName = encodeURIComponent(pdfFileName);
        const publicUrl = `${baseUrl}/assets/pdf/${encodedFileName}`;
        
        console.log(`Fetching PDF from: ${publicUrl}`);
        
        // Fetch the file from the public URL
        const response = await fetch(publicUrl);
        
        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          fileBuffer = Buffer.from(arrayBuffer);
          console.log(`✅ Successfully fetched PDF from public URL`);
        } else {
          console.error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
          return res.status(404).json({ 
            success: false, 
            error: 'PDF file not found',
            details: `Could not fetch PDF from ${publicUrl}. Status: ${response.status}`
          });
        }
      } catch (fetchError) {
        console.error('Error fetching PDF from public URL:', fetchError);
        return res.status(500).json({ 
          success: false, 
          error: 'Failed to fetch PDF file',
          message: fetchError.message
        });
      }
    }

    if (!fileBuffer) {
      return res.status(404).json({ 
        success: false, 
        error: 'PDF file not found'
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

