#!/bin/bash
# Start both the main application and Strapi CMS

# Start the main application in the background
echo "Starting main application..."
npm run dev &
MAIN_PID=$!

# Wait a moment for the main app to initialize
sleep 3

# Start Strapi CMS
echo "Starting Strapi CMS..."
cd cms
NODE_ENV=production PORT=3001 npm run develop &
CMS_PID=$!

# Function to handle shutdown
cleanup() {
    echo "Shutting down services..."
    kill $MAIN_PID 2>/dev/null
    kill $CMS_PID 2>/dev/null
    exit
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait $MAIN_PID $CMS_PID