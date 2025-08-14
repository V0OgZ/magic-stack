#!/bin/bash

# Test complet du workflow avec Playwright
# Lance tous les services puis teste

echo "🚀 Test complet du Workflow..."
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Vérifier les services
echo -e "${YELLOW}📋 Vérification des services...${NC}"
./go status

# 2. Lancer WorldEditor si pas actif
if ! lsof -i:5173 > /dev/null 2>&1; then
    echo -e "${YELLOW}🗺️ Lancement de WorldEditor...${NC}"
    cd apps/world-editor && npm run dev > /dev/null 2>&1 &
    sleep 5
fi

# 3. Lancer les tests Playwright
echo -e "${YELLOW}🧪 Lancement des tests Playwright...${NC}"
node test_workflow.js

echo ""
echo -e "${GREEN}✅ Tests terminés!${NC}"
