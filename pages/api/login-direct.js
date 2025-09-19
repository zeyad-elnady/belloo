// Direct login API without any dependencies
export default function handler(req, res) {
  console.log('Direct login API called:', req.method);
  
  // Set headers first
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return res.status(200).end();
  }
  
  // Handle GET for testing
  if (req.method === 'GET') {
    console.log('GET request - returning test response');
    return res.status(200).json({
      success: true,
      message: 'Direct login API is accessible',
      timestamp: new Date().toISOString()
    });
  }
  
  // Handle POST for login
  if (req.method === 'POST') {
    console.log('POST request body:', req.body);
    
    const { username, password } = req.body || {};
    
    if (username === 'admin' && password === 'admin123') {
      console.log('Login successful');
      
      // Set simple cookie
      res.setHeader('Set-Cookie', 'auth_token=valid; HttpOnly; Path=/; Max-Age=86400');
      
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          username: 'admin',
          email: 'admin@belloo.com',
          full_name: 'Administrator'
        }
      });
    }
    
    console.log('Invalid credentials provided');
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }
  
  // Method not allowed
  console.log('Method not allowed:', req.method);
  return res.status(405).json({
    success: false,
    error: 'Method not allowed',
    receivedMethod: req.method,
    allowedMethods: ['GET', 'POST', 'OPTIONS']
  });
}
