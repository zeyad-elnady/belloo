// Direct profile API for simple auth system
export default function handler(req, res) {
  console.log('Direct profile API called:', req.method);
  
  // Set headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'PUT') {
    console.log('Processing profile update...');
    
    // Check authentication
    const cookies = req.headers.cookie || '';
    const hasAuthToken = cookies.includes('auth_token=valid');
    
    if (!hasAuthToken) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      });
    }
    
    const { full_name, email, current_password, new_password } = req.body || {};
    
    console.log('Profile update request:', { full_name, email, hasNewPassword: !!new_password });
    
    // Basic validation
    if (!full_name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Full name and email are required'
      });
    }
    
    // For demo purposes, just validate current password if changing password
    if (new_password && current_password !== 'admin123') {
      return res.status(400).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }
    
    console.log('Profile update successful');
    
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: 1,
        username: 'admin',
        email: email,
        full_name: full_name
      }
    });
  }
  
  // Method not allowed
  return res.status(405).json({
    success: false,
    error: 'Method not allowed'
  });
}
