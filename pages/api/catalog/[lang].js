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
    // Using URL-friendly filenames without spaces
    const pdfFileName = lang === 'en' 
      ? 'Olive-profile-25x15cm-EN-HD.pdf'
      : 'Olive-profile-25x15cm-RU-HD.pdf';
    
    // Also try the old filename format for backward compatibility
    const oldFileName = lang === 'en' 
      ? 'Olive profile (25 x 15 cm)  EN-HD.pdf'
      : 'Olive profile (25 x 15 cm)  RU-HD.pdf';

    let fileBuffer = null;

    // Try both new and old filenames
    const fileNamesToTry = [pdfFileName, oldFileName];

    // Try to read from file system first (works in local development)
    for (const fileName of fileNamesToTry) {
      const localPath = path.join(process.cwd(), 'public', 'assets', 'pdf', fileName);
      try {
        if (fs.existsSync(localPath)) {
          fileBuffer = fs.readFileSync(localPath);
          console.log(`✅ Found PDF at local path: ${localPath}`);
          break;
        }
      } catch (err) {
        // Continue to next filename
        continue;
      }
    }

    // If file system access failed (Vercel serverless), fetch from public URL
    if (!fileBuffer) {
      for (const fileName of fileNamesToTry) {
        try {
          // Construct the public URL
          const protocol = req.headers['x-forwarded-proto'] || 'https';
          const host = req.headers.host || req.headers['x-forwarded-host'];
          const baseUrl = `${protocol}://${host}`;
          
          // For new filename (no spaces), use direct path
          // For old filename (with spaces), use encoded path
          const publicUrl = fileName.includes(' ')
            ? `${baseUrl}/assets/pdf/${encodeURIComponent(fileName)}`
            : `${baseUrl}/assets/pdf/${fileName}`;
          
          console.log(`Fetching PDF from: ${publicUrl}`);
          
          // Fetch the file from the public URL with timeout
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
          
          try {
            const response = await fetch(publicUrl, {
              signal: controller.signal,
              headers: {
                'User-Agent': 'Mozilla/5.0',
              }
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
              const arrayBuffer = await response.arrayBuffer();
              fileBuffer = Buffer.from(arrayBuffer);
              console.log(`✅ Successfully fetched PDF from public URL: ${fileName}`);
              break;
            } else {
              console.log(`Failed to fetch ${fileName}: ${response.status} ${response.statusText}`);
            }
          } catch (fetchError) {
            clearTimeout(timeoutId);
            if (fetchError.name === 'AbortError') {
              console.error(`Timeout fetching ${fileName}`);
            } else {
              console.error(`Error fetching ${fileName}:`, fetchError.message);
            }
            continue;
          }
        } catch (fetchError) {
          console.error(`Error fetching ${fileName}:`, fetchError);
          continue;
        }
      }
    }

    if (!fileBuffer) {
      // Provide detailed error information
      const protocol = req.headers['x-forwarded-proto'] || 'https';
      const host = req.headers.host || req.headers['x-forwarded-host'];
      const baseUrl = `${protocol}://${host}`;
      const testUrl = `${baseUrl}/assets/pdf/${pdfFileName}`;
      
      return res.status(404).json({ 
        success: false, 
        error: 'PDF file not found',
        details: {
          triedFilenames: fileNamesToTry,
          testUrl: testUrl,
          message: 'Please ensure the PDF files are committed and deployed to Vercel. The files should be at: public/assets/pdf/'
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

