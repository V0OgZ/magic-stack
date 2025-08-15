#!/bin/bash
# 🎮 SCRIPT POUR LANCER LE JEU DE BÉRÉNICE 🎮

echo "🌟 LANCEMENT DU JEU HEROES OF TIME POUR BÉRÉNICE 🌟"
echo "================================================"

# Couleurs pour le terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour vérifier si un port est utilisé
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

echo -e "${BLUE}1. Vérification des services...${NC}"

# Vérifier Java API
if check_port 8082; then
    echo -e "${GREEN}✓ API Java déjà active sur :8082${NC}"
else
    echo -e "${YELLOW}➜ Démarrage de l'API Java...${NC}"
    cd backends/java
    mvn spring-boot:run &
    JAVA_PID=$!
    sleep 5
fi

# Vérifier Rust Engine
if check_port 3001; then
    echo -e "${GREEN}✓ Moteur Rust déjà actif sur :3001${NC}"
else
    echo -e "${YELLOW}➜ Démarrage du moteur Rust...${NC}"
    cd backends/rust
    cargo run &
    RUST_PID=$!
    sleep 3
fi

echo ""
echo -e "${BLUE}2. Test de connexion aux APIs...${NC}"

# Attendre que les services soient prêts
sleep 3

# Test API Java
if curl -s http://localhost:8082/api/health > /dev/null; then
    echo -e "${GREEN}✓ API Java répond correctement!${NC}"
else
    echo -e "${RED}✗ API Java ne répond pas (mode simulation activé)${NC}"
fi

# Test Rust Engine
if curl -s http://localhost:3001/health > /dev/null; then
    echo -e "${GREEN}✓ Moteur Rust répond correctement!${NC}"
else
    echo -e "${YELLOW}! Moteur Rust ne répond pas${NC}"
fi

echo ""
echo -e "${GREEN}3. Ouverture du jeu...${NC}"
sleep 1

# Ouvrir le jeu dans le navigateur
open BERENICE_EASY_GAME.html

echo ""
echo "================================================"
echo -e "${GREEN}🎮 LE JEU EST PRÊT POUR BÉRÉNICE! 🎮${NC}"
echo ""
echo "INSTRUCTIONS POUR BÉRÉNICE:"
echo "  • Clique sur les cartes en bas pour jouer"
echo "  • Regarde les effets cool!"
echo "  • Essaie d'avoir le meilleur score!"
echo ""
echo "💡 ASTUCE SECRÈTE: Essaie le Konami Code!"
echo "   (↑ ↑ ↓ ↓ ← → ← → B A)"
echo ""
echo "================================================"
echo ""
echo "Pour arrêter les services: Ctrl+C"
echo ""

# Fonction de nettoyage
cleanup() {
    echo -e "\n${YELLOW}Arrêt des services...${NC}"
    if [ ! -z "$JAVA_PID" ]; then
        kill $JAVA_PID 2>/dev/null
    fi
    if [ ! -z "$RUST_PID" ]; then
        kill $RUST_PID 2>/dev/null
    fi
    echo -e "${GREEN}Services arrêtés. À bientôt Bérénice!${NC}"
    exit 0
}

# Intercepter Ctrl+C
trap cleanup INT

# Garder le script actif
while true; do
    sleep 1
done
