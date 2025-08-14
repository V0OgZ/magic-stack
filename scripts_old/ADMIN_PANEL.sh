#!/bin/bash

# 🎛️ ADMIN PANEL - Lance l'app et ouvre le dashboard

# Couleurs
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}🎛️ ADMIN PANEL - Lancement...${NC}"

# Vérifier si l'app est lancée
if ! nc -z localhost 5175 2>/dev/null; then
    echo -e "${GREEN}Lancement de l'app React...${NC}"
    cd /Volumes/HOT_DEV/Magic/magic-stack/apps/magic-stack-unified
    npm run dev &
    sleep 3
fi

# Ouvrir le dashboard
echo -e "${GREEN}✅ Ouverture du dashboard...${NC}"
open "http://localhost:5175/dashboard.html"

echo ""
echo "Dashboard accessible sur: http://localhost:5175/dashboard.html"
echo "Tous les HTML sont dans: http://localhost:5175/html/"