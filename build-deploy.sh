#!/bin/bash
# Build script for deployment
echo "Building application..."
npm run build:static
echo "Copying files to public directory..."
mkdir -p public
cp -r dist/* public/
echo "Deployment files ready in public directory"
ls -la public/