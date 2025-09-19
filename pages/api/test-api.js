// Ultra-simple test API to verify Vercel deployment
export default function handler(req, res) {
  console.log('Test API called with method:', req.method);
  
  // Allow all methods and origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  return res.status(200).json({
    success: true,
    message: 'Test API is working!',
    method: req.method,
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL ? 'Vercel' : 'Local',
    nodeVersion: process.version
  });
}
