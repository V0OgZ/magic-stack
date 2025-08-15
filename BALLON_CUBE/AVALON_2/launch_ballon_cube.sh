#!/bin/bash

# 🚀 Script de lancement pour Ballon Cube
# Lance le Temporal Event Bus et les agents

echo "====================================="
echo "🎮 BALLON CUBE - LANCEMENT"
echo "====================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifier Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python3 non trouvé${NC}"
    exit 1
fi

# Installer websockets si nécessaire
echo -e "${YELLOW}📦 Vérification des dépendances...${NC}"
pip3 install websockets --quiet 2>/dev/null || true

# Fonction pour lancer un processus en arrière-plan
launch_background() {
    local name=$1
    local cmd=$2
    echo -e "${GREEN}🚀 Lancement de $name...${NC}"
    $cmd &
    echo $! >> /tmp/ballon_cube_pids.txt
}

# Nettoyer les anciens processus
if [ -f /tmp/ballon_cube_pids.txt ]; then
    echo -e "${YELLOW}🔄 Arrêt des anciens processus...${NC}"
    while read pid; do
        kill $pid 2>/dev/null || true
    done < /tmp/ballon_cube_pids.txt
    rm /tmp/ballon_cube_pids.txt
fi

# Lancer le Temporal Event Bus
echo ""
echo -e "${GREEN}═══════════════════════════════════${NC}"
echo -e "${GREEN}1️⃣  TEMPORAL EVENT BUS${NC}"
echo -e "${GREEN}═══════════════════════════════════${NC}"
launch_background "Temporal Event Bus" "python3 temporal_event_bus.py"
sleep 2

# Lancer quelques agents
echo ""
echo -e "${GREEN}═══════════════════════════════════${NC}"
echo -e "${GREEN}2️⃣  AGENTS DAEMONS${NC}"
echo -e "${GREEN}═══════════════════════════════════${NC}"

launch_background "OPUS" "python3 agent_daemon.py opus OPUS 📜"
sleep 0.5
launch_background "Merlin" "python3 agent_daemon.py merlin Merlin 🧙‍♂️"
sleep 0.5
launch_background "LUMEN" "python3 agent_daemon.py lumen LUMEN 🕯️"
sleep 0.5
launch_background "URZ-KÔM" "python3 agent_daemon.py urz_kom URZ-KÔM 🐻"
sleep 0.5
launch_background "GRUFAEN" "python3 agent_daemon.py grufaen GRUFAEN 👁️🧠"

# Ouvrir le client web
echo ""
echo -e "${GREEN}═══════════════════════════════════${NC}"
echo -e "${GREEN}3️⃣  CLIENT WEB${NC}"
echo -e "${GREEN}═══════════════════════════════════${NC}"
echo -e "${YELLOW}📡 Ouverture du client web...${NC}"
open REALTIME_WORLD.html 2>/dev/null || xdg-open REALTIME_WORLD.html 2>/dev/null || echo "Ouvrez REALTIME_WORLD.html dans votre navigateur"

echo ""
echo -e "${GREEN}✅ BALLON CUBE LANCÉ !${NC}"
echo ""
echo "📡 WebSocket: ws://localhost:8765"
echo "🌐 Client: REALTIME_WORLD.html"
echo "🤖 5 agents actifs"
echo ""
echo -e "${YELLOW}Appuyez sur Ctrl+C pour arrêter${NC}"
echo ""

# Attendre et nettoyer à la sortie
trap cleanup EXIT

cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Arrêt de Ballon Cube...${NC}"
    if [ -f /tmp/ballon_cube_pids.txt ]; then
        while read pid; do
            kill $pid 2>/dev/null || true
        done < /tmp/ballon_cube_pids.txt
        rm /tmp/ballon_cube_pids.txt
    fi
    echo -e "${GREEN}✅ Arrêt propre${NC}"
}

# Garder le script actif
while true; do
    sleep 1
done
