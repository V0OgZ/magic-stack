#!/bin/bash

# 🚀 GO - Script de lancement rapide pour Vincent
# Usage: ./go [command]
# Exemples: ./go game, ./go admin, ./go stop, ./go help

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

# Récupérer la commande
COMMAND=$1
PARAM=$2

# Banner
show_banner() {
    echo -e "${CYAN}"
    echo "  ██████╗  ██████╗ "
    echo " ██╔════╝ ██╔═══██╗"
    echo " ██║  ███╗██║   ██║"
    echo " ██║   ██║██║   ██║"
    echo " ╚██████╔╝╚██████╔╝"
    echo "  ╚═════╝  ╚═════╝ "
    echo -e "${NC}"
    echo -e "${MAGENTA}Magic Stack Launcher v1.0${NC}"
    echo ""
}

# Aide
show_help() {
    show_banner
    echo -e "${YELLOW}Usage:${NC} ./go [command]"
    echo ""
    echo -e "${BLUE}Commandes disponibles:${NC}"
    echo ""
    echo -e "${GREEN}  game${NC}        - Lance le Unified Map System (éditeur + jeu)"
    echo -e "${GREEN}  admin${NC}       - Ouvre toutes les consoles d'administration"
    echo -e "${GREEN}  combat${NC}      - Lance le mode Combat IA vs IA (avec connexion V2)"
    echo -e "${GREEN}  chasse${NC}      - Lance la Chasse Temporelle Mega Map 6x6"
    echo -e "${GREEN}  stop${NC}        - Arrête tous les services"
    echo -e "${GREEN}  status${NC}      - Affiche le statut des services"
    echo -e "${GREEN}  backend${NC}     - Lance seulement les backends"
    echo -e "${GREEN}  test${NC}        - Lance les tests"
    echo -e "${GREEN}  clean${NC}       - Nettoie les logs et caches"
    echo -e "${GREEN}  help${NC}        - Affiche cette aide"
    echo ""
    echo -e "${BLUE}Raccourcis:${NC}"
    echo ""
    echo -e "${GREEN}  g${NC}           - Alias pour 'game'"
    echo -e "${GREEN}  a${NC}           - Alias pour 'admin'"
    echo -e "${GREEN}  s${NC}           - Alias pour 'stop'"
    echo ""
    echo -e "${BLUE}Exemples:${NC}"
    echo ""
    echo "  ./go game      # Lance l'éditeur/jeu unifié"
    echo "  ./go admin     # Ouvre toutes les pages admin"
    echo "  ./go stop      # Arrête tout"
    echo "  ./go g         # Raccourci pour game"
    echo ""
    echo -e "${YELLOW}💡 Tip: Ajoutez un alias dans votre .zshrc:${NC}"
    echo "  alias go='./go'"
    echo "  Puis utilisez: go game, go admin, etc."
    echo ""
}

# Fonction pour vérifier si un port est ouvert
check_port() {
    nc -z localhost $1 2>/dev/null
    return $?
}

# Statut des services
show_status() {
    echo -e "${BLUE}📊 STATUT DES SERVICES${NC}"
    echo "========================"
    echo ""
    
    # Frontend
    echo -e "${CYAN}Frontend:${NC}"
    check_port 5173 && echo -e "  ${GREEN}✅${NC} Dev Server (5173)" || echo -e "  ${RED}❌${NC} Dev Server (5173)"
    check_port 5174 && echo -e "  ${GREEN}✅${NC} Dev Server (5174)" || echo -e "  ${RED}❌${NC} Dev Server (5174)"
    check_port 5175 && echo -e "  ${GREEN}✅${NC} Dev Server (5175)" || echo -e "  ${RED}❌${NC} Dev Server (5175)"
    check_port 5176 && echo -e "  ${GREEN}✅${NC} Dev Server (5176)" || echo -e "  ${RED}❌${NC} Dev Server (5176)"
    check_port 5005 && echo -e "  ${GREEN}✅${NC} World Editor (5005)" || echo -e "  ${RED}❌${NC} World Editor (5005)"
    
    echo ""
    echo -e "${CYAN}Backend:${NC}"
    check_port 8080 && echo -e "  ${GREEN}✅${NC} Java Backend (8080)" || echo -e "  ${RED}❌${NC} Java Backend (8080)"
    check_port 3001 && echo -e "  ${GREEN}✅${NC} Rust Backend (3001)" || echo -e "  ${RED}❌${NC} Rust Backend (3001)"
    check_port 5001 && echo -e "  ${GREEN}✅${NC} Vector DB (5001)" || echo -e "  ${RED}❌${NC} Vector DB (5001)"
    check_port 8001 && echo -e "  ${GREEN}✅${NC} WebSocket (8001)" || echo -e "  ${RED}❌${NC} WebSocket (8001)"
    check_port 7500 && echo -e "  ${GREEN}✅${NC} Service Commun (7500)" || echo -e "  ${RED}❌${NC} Service Commun (7500)"
    check_port 7501 && echo -e "  ${GREEN}✅${NC} Service Commun (7501)" || echo -e "  ${RED}❌${NC} Service Commun (7501)"
    echo ""
}

# Lance les backends seulement
launch_backends() {
    echo -e "${YELLOW}🔧 Lancement des backends...${NC}"
    echo ""
    
    # Backend Java
    if ! check_port 8080; then
        echo -e "${BLUE}☕ Lancement Backend Java...${NC}"
        cd /Volumes/HOT_DEV/Main/SpinForest/REALGAME 2>/dev/null
        if [ -f "lance_backend.sh" ]; then
            ./lance_backend.sh &
        fi
    fi
    
    # Backend Rust
    if ! check_port 3001; then
        echo -e "${BLUE}🦀 Lancement Backend Rust...${NC}"
        cd /Volumes/HOT_DEV/Main/SpinForest/ARCHITECTURE/backend-rust 2>/dev/null
        if [ -d "." ]; then
            cargo run --release > /tmp/rust-backend.log 2>&1 &
        fi
    fi
    
    sleep 3
    show_status
}

# Nettoyer les fichiers temporaires
clean_all() {
    echo -e "${YELLOW}🧹 Nettoyage...${NC}"
    echo ""
    
    # Logs
    echo "  Suppression des logs temporaires..."
    rm -f /tmp/*.log 2>/dev/null
    
    # Cache npm
    echo "  Nettoyage du cache npm..."
    cd /Volumes/HOT_DEV/Magic/magic-stack/apps/magic-stack-unified 2>/dev/null
    rm -rf .vite 2>/dev/null
    
    echo -e "${GREEN}✅ Nettoyage terminé${NC}"
    echo ""
}

# Tests
run_tests() {
    echo -e "${YELLOW}🧪 Lancement des tests...${NC}"
    echo ""
    
    # Ouvrir le test runner HTML
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "file:///Volumes/HOT_DEV/Main/SpinForest/REALGAME/HOT_GAME_TEST_RUNNER.html"
    fi
    
    # Lancer les tests npm si disponibles
    cd /Volumes/HOT_DEV/Magic/magic-stack/apps/magic-stack-unified 2>/dev/null
    if [ -f "package.json" ]; then
        npm test 2>/dev/null || echo "  Pas de tests configurés"
    fi
}

# === EXECUTION PRINCIPALE ===

case "$COMMAND" in
    "game"|"g")
        echo -e "${GREEN}🎮 Lancement du jeu...${NC}"
        ./START_UNIFIED.sh
        ;;
        
    "admin"|"a")
        echo -e "${MAGENTA}🎛️ Ouverture du panneau admin...${NC}"
        ./ADMIN_PANEL.sh
        ;;
        
    "combat"|"cb")
        echo -e "${YELLOW}⚔️ Lancement du mode Combat IA vs IA...${NC}"
        echo ""
        # Vérifier les backends
        if ! check_port 3001; then
            echo -e "${BLUE}Le backend Rust n'est pas lancé. Démarrage...${NC}"
            launch_backends
        fi
        # Lancer l'app unified et ouvrir sur combat
        cd /Volumes/HOT_DEV/Magic/magic-stack/apps/magic-stack-unified 2>/dev/null
        npm run dev &
        sleep 3
        if [[ "$OSTYPE" == "darwin"* ]]; then
            open "http://localhost:5175/combat"
        fi
        ;;
        
    "chasse"|"ch")
        echo -e "${MAGENTA}⚔️ Lancement de la Chasse Temporelle Mega Map...${NC}"
        echo ""
        # Vérifier les backends
        if ! check_port 3001; then
            echo -e "${BLUE}Le backend Rust n'est pas lancé. Démarrage...${NC}"
            launch_backends
        fi
        # Lancer l'app unified et ouvrir sur chasse-mega
        cd /Volumes/HOT_DEV/Magic/magic-stack/apps/magic-stack-unified 2>/dev/null
        npm run dev &
        sleep 3
        if [[ "$OSTYPE" == "darwin"* ]]; then
            open "http://localhost:5175/chasse-mega"
        fi
        ;;
        
    "stop"|"s")
        echo -e "${RED}🛑 Arrêt des services...${NC}"
        ./STOP_UNIFIED.sh
        ;;
        
    "status"|"st")
        show_status
        ;;
        
    "backend"|"b")
        launch_backends
        ;;
        
    "test"|"t")
        run_tests
        ;;
        
    "clean"|"c")
        clean_all
        ;;
        
    "help"|"h"|"")
        show_help
        ;;
        
    *)
        echo -e "${RED}❌ Commande inconnue: $COMMAND${NC}"
        echo ""
        echo "Utilisez: ./go help"
        exit 1
        ;;
esac
