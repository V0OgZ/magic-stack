#!/bin/bash

# 🛑 STOP UNIFIED - Arrête tous les services du système unifié

echo "🛑 ARRÊT DU SYSTÈME UNIFIÉ..."
echo "================================="

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Fonction pour tuer un processus sur un port
kill_port() {
    local port=$1
    local service=$2
    
    if lsof -ti:$port > /dev/null 2>&1; then
        echo -e "${YELLOW}🔄 Arrêt de $service (port $port)...${NC}"
        lsof -ti:$port | xargs kill -9 2>/dev/null
        echo -e "${GREEN}✅ $service arrêté${NC}"
    else
        echo -e "${YELLOW}⚠️  $service n'était pas lancé${NC}"
    fi
}

# Arrêter tous les services
echo ""
kill_port 5173 "Serveur Dev (5173)"
kill_port 5174 "Serveur Dev (5174)"
kill_port 5175 "Serveur Dev (5175)"
kill_port 5176 "Serveur Dev (5176)"
kill_port 8080 "Backend Java"
kill_port 3001 "Backend Rust"
kill_port 5001 "Vector DB"
kill_port 8001 "WebSocket"

# Nettoyer les logs temporaires
echo -e "\n${YELLOW}🧹 Nettoyage des logs...${NC}"
rm -f /tmp/unified.log 2>/dev/null
rm -f /tmp/rust-backend.log 2>/dev/null
rm -f /tmp/websocket.log 2>/dev/null

echo -e "\n${GREEN}================================="
echo -e "✅ SYSTÈME UNIFIÉ ARRÊTÉ"
echo -e "=================================${NC}"
echo ""
echo "Pour relancer : ./START_UNIFIED.sh"
