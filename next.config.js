/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  i18n,
  // Optimize for shared hosting
  swcMinify: false, // Disable SWC minification
  experimental: {
    workerThreads: false, // Disable worker threads
    cpus: 1, // Limit CPU usage
  },
  webpack: (config, { isServer }) => {
    // Reduce memory usage
    config.optimization.minimize = false
    config.cache = false
    
    // Disable problematic optimizations
    if (isServer) {
      config.optimization.splitChunks = false
    }
    
    return config
  },
}

module.exports = nextConfig
