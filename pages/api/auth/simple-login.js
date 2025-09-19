// Ultra-simple login endpoint for Vercel debugging
export default function handler(req, res) {
  console.log(`Simple Login: ${req.method} request received`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'Simple login endpoint is working',
      method: req.method,
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    try {
      console.log('Processing POST login...');
      
      const { username, password } = req.body || {};
      
      console.log('Login attempt:', { username, hasPassword: !!password });
      
      // Simple hardcoded check
      if (username === 'admin' && password === 'admin123') {
        console.log('Login successful!');
        
        // Set a simple cookie
        res.setHeader('Set-Cookie', 'simple_auth=true; HttpOnly; Path=/; Max-Age=86400');
        
        return res.status(200).json({
          success: true,
          message: 'Login successful',
          user: {
            username: 'admin',
            email: 'admin@belloo.com',
            full_name: 'Administrator'
          }
        });
      } else {
        console.log('Login failed - invalid credentials');
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }
      
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
        details: error.message
      });
    }
  }

  // Method not allowed
  console.log(`Method ${req.method} not allowed`);
  return res.status(405).json({
    success: false,
    error: `Method ${req.method} not allowed`,
    allowedMethods: ['GET', 'POST', 'OPTIONS']
  });
}
