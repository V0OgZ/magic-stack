#!/bin/bash

# 🚀 LAUNCHER UNIVERSEL - Heroes of Time
# Lance tous les services nécessaires

echo "=================================="
echo "🚀 HEROES OF TIME - LAUNCHER"
echo "=================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

# Fonction pour vérifier si un port est utilisé
check_port() {
    lsof -i :$1 > /dev/null 2>&1
    return $?
}

# Base directory
BASE_DIR="/Volumes/HOT_DEV/Magic/magic-stack"
cd $BASE_DIR

echo -e "${CYAN}📍 Working directory: $BASE_DIR${NC}"
echo ""

# 1. Backend Java (port 8082)
echo -e "${YELLOW}🔧 Checking Java Backend...${NC}"
if check_port 8082; then
    echo -e "${GREEN}✅ Java Backend already running on port 8082${NC}"
else
    echo "Starting Java Backend..."
    cd backends/java && ./mvnw spring-boot:run -DskipTests &
    cd $BASE_DIR
    echo -e "${GREEN}✅ Java Backend started${NC}"
fi
echo ""

# 2. Rust Engine (port 3001)
echo -e "${YELLOW}⚙️ Checking Rust Engine...${NC}"
if check_port 3001; then
    echo -e "${GREEN}✅ Rust Engine already running on port 3001${NC}"
else
    echo "Starting Rust Engine..."
    cd backends/rust && cargo run --release &
    cd $BASE_DIR
    echo -e "${GREEN}✅ Rust Engine started${NC}"
fi
echo ""

# 3. Vector DB (port 5001)
echo -e "${YELLOW}📚 Checking Vector DB...${NC}"
if check_port 5001; then
    echo -e "${GREEN}✅ Vector DB already running on port 5001${NC}"
else
    echo "Starting Vector DB..."
    python3 simple_vector_server.py &
    echo -e "${GREEN}✅ Vector DB started${NC}"
fi
echo ""

# 4. Frontend Server (port 8000)
echo -e "${YELLOW}🌐 Checking Frontend Server...${NC}"
if check_port 8000; then
    echo -e "${GREEN}✅ Frontend already served on port 8000${NC}"
else
    echo "Starting Frontend Server..."
    python3 -m http.server 8000 &
    echo -e "${GREEN}✅ Frontend server started${NC}"
fi
echo ""

# 5. World Editor (port 5173)
echo -e "${YELLOW}🗺️ Checking World Editor...${NC}"
if check_port 5173; then
    echo -e "${GREEN}✅ World Editor already running on port 5173${NC}"
else
    echo "Starting World Editor..."
    cd apps/world-editor && npm run dev &
    cd $BASE_DIR
    echo -e "${GREEN}✅ World Editor started${NC}"
fi
echo ""

# 6. Magic Stack Unified (port 5176)
echo -e "${YELLOW}🎮 Checking Magic Stack Unified...${NC}"
if check_port 5176; then
    echo -e "${GREEN}✅ Magic Stack Unified already running on port 5176${NC}"
else
    echo "Starting Magic Stack Unified..."
    cd apps/magic-stack-unified && npm run dev &
    cd $BASE_DIR
    echo -e "${GREEN}✅ Magic Stack Unified started${NC}"
fi
echo ""

echo "=================================="
echo -e "${GREEN}✨ ALL SERVICES READY!${NC}"
echo "=================================="
echo ""
echo "📍 Access points:"
echo "  • Frontend: http://localhost:8000"
echo "  • World Editor: http://localhost:5173"
echo "  • Magic Stack: http://localhost:5176/unified"
echo "  • Java API: http://localhost:8082/api/health"
echo "  • Rust Engine: http://localhost:3001/health"
echo "  • Vector DB: http://localhost:5001/health"
echo ""
echo "🎈 Bubble Worlds:"
echo "  • Main: file://$BASE_DIR/BALLON_CUBE/BUBBLE_WORLDS/bubble_worlds.html"
echo "  • Chat: file://$BASE_DIR/BALLON_CUBE/BUBBLE_WORLDS/interdimensional_chat.html"
echo "  • Physics: file://$BASE_DIR/BALLON_CUBE/BUBBLE_WORLDS/physics_simulator.html"
echo ""
echo "🎮 Dashboard:"
echo "  • file://$BASE_DIR/BALLON_CUBE/MONITORING/dashboard.html"
echo ""
echo "⚔️ Excalibur resonating at 997 Hz..."
echo ""
echo "Press Ctrl+C to stop all services"
