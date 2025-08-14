#!/bin/bash

# Create React App for Heroes of Time
echo "🎮 Creating Heroes of Time - THE REAL APP"

# Check if frontend exists
if [ -d "hot-frontend" ]; then
    echo "Frontend already exists, updating..."
    cd hot-frontend
else
    echo "Creating new React app..."
    npx create-react-app hot-frontend --template typescript
    cd hot-frontend
fi

# Install dependencies
npm install --save \
    axios \
    socket.io-client \
    zustand \
    react-router-dom \
    @types/react-router-dom \
    framer-motion \
    react-dnd \
    react-dnd-touch-backend \
    workbox-webpack-plugin

# Create proper structure
mkdir -p src/components/{Game,TCG,Map,UI}
mkdir -p src/services
mkdir -p src/stores
mkdir -p src/types
mkdir -p src/utils
mkdir -p public/sounds

echo "✅ Frontend structure created"
echo "Run: cd hot-frontend && npm start"
