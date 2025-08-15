#!/bin/bash

# 🎮 START UNIFIED - Script intelligent pour lancer le système unifié
# Lance les services nécessaires et ouvre automatiquement la page

echo "🚀 DÉMARRAGE DU SYSTÈME UNIFIÉ..."
echo "================================="

# Couleurs pour l'output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour vérifier si un port est ouvert
check_port() {
    nc -z localhost $1 2>/dev/null
    return $?
}

# Fonction pour attendre qu'un service soit prêt
wait_for_service() {
    local port=$1
    local service_name=$2
    local max_attempts=30
    local attempt=0
    
    echo -e "${YELLOW}⏳ Attente de $service_name sur port $port...${NC}"
    
    while [ $attempt -lt $max_attempts ]; do
        if check_port $port; then
            echo -e "${GREEN}✅ $service_name est prêt sur port $port${NC}"
            return 0
        fi
        sleep 1
        attempt=$((attempt + 1))
    done
    
    echo -e "${RED}❌ Timeout en attendant $service_name${NC}"
    return 1
}

# 1. VÉRIFIER/LANCER LE BACKEND JAVA (8080)
echo -e "\n${BLUE}📦 Backend Java (8080)${NC}"
if check_port 8080; then
    echo -e "${GREEN}✅ Déjà lancé${NC}"
else
    echo -e "${YELLOW}🔄 Lancement du backend Java...${NC}"
    cd /Volumes/HOT_DEV/Main/SpinForest/REALGAME 2>/dev/null || cd ../../../REALGAME
    if [ -f "lance_backend.sh" ]; then
        ./lance_backend.sh &
        wait_for_service 8080 "Backend Java"
    else
        echo -e "${YELLOW}⚠️  Backend Java non trouvé, continuons...${NC}"
    fi
fi

# 2. VÉRIFIER/LANCER LE BACKEND RUST (3001)
echo -e "\n${BLUE}🦀 Backend Rust (3001)${NC}"
if check_port 3001; then
    echo -e "${GREEN}✅ Déjà lancé${NC}"
else
    echo -e "${YELLOW}🔄 Lancement du backend Rust...${NC}"
    cd /Volumes/HOT_DEV/Main/SpinForest/ARCHITECTURE 2>/dev/null || cd ../../../ARCHITECTURE
    if [ -d "backend-rust" ]; then
        cd backend-rust
        cargo run --release > /tmp/rust-backend.log 2>&1 &
        wait_for_service 3001 "Backend Rust"
    else
        echo -e "${YELLOW}⚠️  Backend Rust non trouvé, continuons...${NC}"
    fi
fi

# 3. VÉRIFIER/LANCER VECTOR DB (5001)
echo -e "\n${BLUE}🔍 Vector DB (5001)${NC}"
if check_port 5001; then
    echo -e "${GREEN}✅ Déjà lancé${NC}"
else
    echo -e "${YELLOW}🔄 Lancement de Vector DB...${NC}"
    cd /Volumes/HOT_DEV/Main/SpinForest/ARCHITECTURE 2>/dev/null || cd ../../../ARCHITECTURE
    if [ -f "vector-db/start.sh" ]; then
        cd vector-db
        ./start.sh &
        wait_for_service 5001 "Vector DB"
    else
        echo -e "${YELLOW}⚠️  Vector DB non trouvé, continuons...${NC}"
    fi
fi

# 4. VÉRIFIER/LANCER WEBSOCKET (8001)
echo -e "\n${BLUE}🔌 WebSocket (8001)${NC}"
if check_port 8001; then
    echo -e "${GREEN}✅ Déjà lancé${NC}"
else
    echo -e "${YELLOW}🔄 Lancement du WebSocket...${NC}"
    cd /Volumes/HOT_DEV/Main/SpinForest/ARCHITECTURE 2>/dev/null || cd ../../../ARCHITECTURE
    if [ -f "websocket/server.js" ]; then
        cd websocket
        node server.js > /tmp/websocket.log 2>&1 &
        wait_for_service 8001 "WebSocket"
    else
        echo -e "${YELLOW}⚠️  WebSocket non trouvé, continuons...${NC}"
    fi
fi

# 5. LANCER L'APPLICATION UNIFIED
echo -e "\n${BLUE}🎮 Application Unified${NC}"
cd /Volumes/HOT_DEV/Magic/magic-stack/apps/magic-stack-unified

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm n'est pas installé${NC}"
    exit 1
fi

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installation des dépendances...${NC}"
    npm install
fi

# Vérifier si le serveur dev est déjà lancé
if check_port 5175 || check_port 5176 || check_port 5173; then
    echo -e "${GREEN}✅ Serveur dev déjà lancé${NC}"
    PORT=$(lsof -ti:5173,5174,5175,5176 | head -1 | xargs lsof -i -P | grep LISTEN | awk '{print $9}' | cut -d: -f2)
    URL="http://localhost:${PORT}/unified"
else
    echo -e "${YELLOW}🔄 Lancement du serveur dev...${NC}"
    npm run dev > /tmp/unified.log 2>&1 &
    
    # Attendre que le serveur soit prêt
    sleep 3
    
    # Trouver sur quel port il s'est lancé
    if check_port 5173; then
        PORT=5173
    elif check_port 5174; then
        PORT=5174
    elif check_port 5175; then
        PORT=5175
    elif check_port 5176; then
        PORT=5176
    else
        echo -e "${RED}❌ Impossible de lancer le serveur dev${NC}"
        exit 1
    fi
    
    URL="http://localhost:${PORT}/unified"
    echo -e "${GREEN}✅ Serveur lancé sur port ${PORT}${NC}"
fi

# 6. AFFICHER LE STATUT FINAL
echo -e "\n${GREEN}================================="
echo -e "🎉 SYSTÈME UNIFIÉ PRÊT !"
echo -e "=================================${NC}"
echo ""
echo -e "${BLUE}📊 Statut des services :${NC}"
check_port 8080 && echo -e "  ${GREEN}✅${NC} Backend Java (8080)" || echo -e "  ${RED}❌${NC} Backend Java (8080)"
check_port 3001 && echo -e "  ${GREEN}✅${NC} Backend Rust (3001)" || echo -e "  ${RED}❌${NC} Backend Rust (3001)"
check_port 5001 && echo -e "  ${GREEN}✅${NC} Vector DB (5001)" || echo -e "  ${RED}❌${NC} Vector DB (5001)"
check_port 8001 && echo -e "  ${GREEN}✅${NC} WebSocket (8001)" || echo -e "  ${RED}❌${NC} WebSocket (8001)"
echo ""
echo -e "${BLUE}🎮 Application disponible sur :${NC}"
echo -e "   ${GREEN}$URL${NC}"
echo ""

# 7. OUVRIR LA PAGE DANS LE NAVIGATEUR
echo -e "${YELLOW}🌐 Ouverture dans le navigateur...${NC}"
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open "$URL"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    if command -v xdg-open &> /dev/null; then
        xdg-open "$URL"
    elif command -v gnome-open &> /dev/null; then
        gnome-open "$URL"
    fi
fi

echo -e "\n${YELLOW}💡 Tips :${NC}"
echo "  - Ctrl+C pour arrêter le serveur"
echo "  - ./STOP_UNIFIED.sh pour tout arrêter"
echo "  - Les logs sont dans /tmp/*.log"
echo ""
echo -e "${GREEN}🚀 Bon développement !${NC}"

# Garder le script actif
tail -f /tmp/unified.log 2>/dev/null || npm run dev
