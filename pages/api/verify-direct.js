// Direct verify API that matches the login-direct endpoint
export default function handler(req, res) {
  console.log('Direct verify API called:', req.method);
  
  // Set headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    console.log('Verifying authentication...');
    console.log('Cookies:', req.headers.cookie);
    
    // Check for the simple auth token we set in login-direct
    const cookies = req.headers.cookie || '';
    const hasAuthToken = cookies.includes('auth_token=valid');
    
    if (hasAuthToken) {
      console.log('Authentication verified - user is logged in');
      
      return res.status(200).json({
        success: true,
        user: {
          id: 1,
          username: 'admin',
          email: 'admin@belloo.com',
          full_name: 'Administrator',
          last_login: new Date().toISOString()
        }
      });
    } else {
      console.log('No valid auth token found');
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      });
    }
  }
  
  // Method not allowed
  return res.status(405).json({
    success: false,
    error: 'Method not allowed'
  });
}
