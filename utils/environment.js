// Environment detection utility
export const isProductionEnvironment = () => {
  if (typeof window === 'undefined') return false;
  
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  
  console.log('🔍 Environment Detection:', {
    hostname,
    protocol,
    userAgent: navigator.userAgent.includes('Vercel') ? 'Vercel' : 'Unknown'
  });
  
  // Check for production indicators
  const isVercelApp = hostname.includes('vercel.app');
  const isCustomDomain = hostname === 'smartbookingcrm.live';
  const isHTTPS = protocol === 'https:';
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  
  const isProduction = (isVercelApp || isCustomDomain || isHTTPS) && !isLocalhost;
  
  console.log('🎯 Production Environment:', isProduction);
  
  return isProduction;
};

export const getApiEndpoint = (originalEndpoint, vercelEndpoint) => {
  const endpoint = isProductionEnvironment() ? vercelEndpoint : originalEndpoint;
  console.log(`📡 Using API endpoint: ${endpoint}`);
  return endpoint;
};
