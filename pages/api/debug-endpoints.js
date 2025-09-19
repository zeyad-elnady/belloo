// Debug endpoint to check which APIs are available and working
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const endpointsToTest = [
        '/api/auth/login',
        '/api/auth/login-vercel',
        '/api/auth/verify',
        '/api/auth/verify-vercel',
        '/api/job-application',
        '/api/job-application-vercel'
      ];
      
      const results = {};
      
      for (const endpoint of endpointsToTest) {
        try {
          // Test if endpoint exists by trying to access it
          const testResponse = await fetch(`${req.headers.host}${endpoint}`, {
            method: 'OPTIONS'
          });
          
          results[endpoint] = {
            exists: true,
            status: testResponse.status,
            statusText: testResponse.statusText
          };
        } catch (error) {
          results[endpoint] = {
            exists: false,
            error: error.message
          };
        }
      }
      
      return res.status(200).json({
        success: true,
        message: 'Endpoint availability check',
        hostname: req.headers.host,
        userAgent: req.headers['user-agent'],
        vercelEnvironment: process.env.VERCEL || 'Not Vercel',
        nodeEnv: process.env.NODE_ENV || 'undefined',
        endpoints: results,
        recommendation: {
          shouldUseVercel: process.env.VERCEL === '1' || req.headers.host?.includes('smartbookingcrm.live'),
          detectedEnvironment: process.env.VERCEL === '1' ? 'vercel' : 'local'
        }
      });
      
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
