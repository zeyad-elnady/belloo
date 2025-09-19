// Direct logout API that clears the simple auth cookie
export default function handler(req, res) {
  console.log('Direct logout API called:', req.method);
  
  // Set headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    console.log('Processing logout...');
    
    // Clear the auth cookie
    res.setHeader('Set-Cookie', 'auth_token=; HttpOnly; Path=/; Max-Age=0');
    
    console.log('Logout successful - auth cookie cleared');
    
    return res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  }
  
  // Method not allowed
  return res.status(405).json({
    success: false,
    error: 'Method not allowed'
  });
}
