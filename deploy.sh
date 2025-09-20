#!/bin/bash

# Deploy script for Belloo project
echo "🚀 Starting deployment..."

# Build the project
echo "📦 Building project..."
npm run build

# Create deployment archive (without node_modules)
echo "📁 Creating deployment package..."
tar -czf deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='*.env*' \
  --exclude='deploy.tar.gz' \
  .

echo "✅ Deployment package created!"
echo "📤 Now upload deploy.tar.gz to your server and extract it"
echo ""
echo "Commands to run on server:"
echo "tar -xzf deploy.tar.gz"
echo "npm install --production"
echo "pm2 restart belloo-app"
