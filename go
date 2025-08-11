#!/bin/bash

# 🎮 MAGIC STACK GO - SCRIPT COMPLET
# Gère TOUS les services proprement

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# Vérifier port
check_port() {
    nc -z localhost $1 2>/dev/null
}

# === BACKEND ===
start_backends() {
    echo -e "${BLUE}🚀 Démarrage des backends...${NC}"
    
    # Rust (3001)
    if ! check_port 3001; then
        echo "  Lancement Rust..."
        cd /Volumes/HOT_DEV/Magic/magic-stack/backends/rust
        cargo run > ../../logs/rust.log 2>&1 &
        sleep 2
    else
        echo -e "  ${GREEN}✓${NC} Rust déjà actif (3001)"
    fi
    
    # Java (8080)
    if ! check_port 8080; then
        echo "  Lancement Java..."
        cd /Volumes/HOT_DEV/Magic/magic-stack/backends/java
        ./mvnw spring-boot:run > ../../logs/java.log 2>&1 &
        sleep 3
    else
        echo -e "  ${GREEN}✓${NC} Java déjà actif (8080)"
    fi
    
    # Python (5001) - optionnel
    if ! check_port 5001; then
        echo "  Python (5001) pas lancé (optionnel)"
    else
        echo -e "  ${GREEN}✓${NC} Python actif (5001)"
    fi
}

stop_backends() {
    echo -e "${RED}🛑 Arrêt des backends...${NC}"
    pkill -f "cargo run"
    pkill -f "spring-boot"
    pkill -f "python.*backend"
}

# === FRONTEND ===
start_frontend() {
    if ! check_port 5175; then
        echo -e "${BLUE}🎨 Lancement frontend React...${NC}"
        cd /Volumes/HOT_DEV/Magic/magic-stack/apps/magic-stack-unified
        npm run dev > ../../logs/frontend.log 2>&1 &
        sleep 3
    else
        echo -e "${GREEN}✓ Frontend déjà actif (5175)${NC}"
    fi
}

stop_frontend() {
    echo -e "${RED}🛑 Arrêt frontend...${NC}"
    pkill -f "npm run dev"
}

# === LLM (OPTIONNEL) ===
start_llm() {
    echo -e "${CYAN}🤖 Démarrage LLM Clippy...${NC}"
    
    # Clippy Memento (7501)
    if ! check_port 7501; then
        cd /Volumes/HOT_DEV/Magic/magic-stack/scripts/clippy
        python3 clippy_memento_server.py > ../../logs/clippy.log 2>&1 &
        sleep 2
        echo -e "  ${GREEN}✓${NC} Clippy lancé (7501)"
    else
        echo -e "  ${GREEN}✓${NC} Clippy déjà actif (7501)"
    fi
}

stop_llm() {
    echo -e "${RED}🛑 Arrêt LLM...${NC}"
    pkill -f "clippy.*server"
}

# === STATUS COMPLET ===
show_status() {
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    echo -e "${BLUE}     📊 STATUT DES SERVICES${NC}"
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    echo ""
    
    echo -e "${CYAN}Frontend:${NC}"
    check_port 5175 && echo -e "  ${GREEN}✅${NC} React App (5175)" || echo -e "  ${RED}❌${NC} React App (5175)"
    echo ""
    
    echo -e "${CYAN}Backend:${NC}"
    check_port 3001 && echo -e "  ${GREEN}✅${NC} Rust (3001) - Q*, Calculs" || echo -e "  ${RED}❌${NC} Rust (3001)"
    check_port 8080 && echo -e "  ${GREEN}✅${NC} Java (8080) - APIs, CRUD" || echo -e "  ${RED}❌${NC} Java (8080)"
    check_port 5001 && echo -e "  ${GREEN}✅${NC} Python (5001) - Search" || echo -e "  ${RED}❌${NC} Python (5001) [Optionnel]"
    echo ""
    
    echo -e "${CYAN}Services:${NC}"
    check_port 7500 && echo -e "  ${GREEN}✅${NC} Vector DB (7500)" || echo -e "  ${RED}❌${NC} Vector DB (7500) [Optionnel]"
    check_port 7501 && echo -e "  ${GREEN}✅${NC} LLM Clippy (7501)" || echo -e "  ${RED}❌${NC} LLM Clippy (7501) [Optionnel]"
    echo ""
}

# === MAIN ===
case "$1" in
    # DÉMARRAGE COMPLET
    "start"|"")
        echo -e "${GREEN}🚀 DÉMARRAGE COMPLET MAGIC STACK${NC}"
        start_backends
        start_frontend
        sleep 2
        show_status
        echo ""
        echo -e "${GREEN}✨ Tout est lancé!${NC}"
        echo "  Game: http://localhost:5175/unified"
        echo "  Admin: http://localhost:5175/dashboard.html"
        ;;
    
    # BACKENDS SEULS
    "backends"|"b")
        start_backends
        show_status
        ;;
    
    # FRONTEND SEUL
    "frontend"|"f")
        start_frontend
        ;;
    
    # LLM
    "llm")
        case "$2" in
            "start") start_llm ;;
            "stop") stop_llm ;;
            *) echo "Usage: ./go llm [start|stop]" ;;
        esac
        ;;
    
    # GAME
    "game"|"g")
        start_frontend
        open "http://localhost:5175/unified"
        ;;
    
    # ADMIN
    "admin"|"a")
        start_frontend
        open "http://localhost:5175/dashboard.html"
        ;;
    
    # COMBAT
    "combat"|"c")
        start_frontend
        open "http://localhost:5175/combat"
        ;;
    
    # CHASSE
    "chasse"|"ch")
        start_frontend
        open "http://localhost:5175/chasse-mega"
        ;;
    
    # HTML ORIGINALS
    "html")
        start_frontend
        echo -e "${YELLOW}📄 UIs HTML disponibles:${NC}"
        echo "  API Explorer: http://localhost:5175/html/API_EXPLORER_COMPLETE.html"
        echo "  IA vs IA: http://localhost:5175/html/IA_VS_IA_AUTOPLAY.html"
        echo "  Chasse Mega: http://localhost:5175/html/CHASSE_TEMPORELLE_MEGA_MAP.html"
        open "http://localhost:5175/html/API_EXPLORER_COMPLETE.html"
        ;;
    
    # API EXPLORER
    "api")
        echo -e "${CYAN}🔮 Ouverture API Explorer...${NC}"
        start_backends
        start_frontend
        sleep 2
        echo -e "${GREEN}✨ API Explorer avec tous les endpoints!${NC}"
        open "http://localhost:5175/html/API_EXPLORER_COMPLETE.html"
        ;;
    
    # STATUS
    "status"|"s")
        show_status
        ;;
    
    # STOP
    "stop")
        echo -e "${RED}🛑 ARRÊT DE TOUT${NC}"
        stop_frontend
        stop_backends
        stop_llm
        echo -e "${GREEN}✅ Tout est arrêté${NC}"
        ;;
    
    # HELP
    *)
        echo -e "${CYAN}═══════════════════════════════════${NC}"
        echo -e "${CYAN}       🎮 MAGIC STACK GO${NC}"
        echo -e "${CYAN}═══════════════════════════════════${NC}"
        echo ""
        echo -e "${GREEN}Commandes principales:${NC}"
        echo "  ./go [start]    - Lance TOUT (backends + frontend)"
        echo "  ./go stop       - Arrête TOUT"
        echo "  ./go status     - Voir l'état des services"
        echo ""
        echo -e "${GREEN}Lancement spécifique:${NC}"
        echo "  ./go backends   - Lance seulement les backends"
        echo "  ./go frontend   - Lance seulement le frontend"
        echo "  ./go llm start  - Lance le service LLM"
        echo "  ./go llm stop   - Arrête le service LLM"
        echo ""
        echo -e "${GREEN}Accès rapide:${NC}"
        echo "  ./go game       - Ouvre l'éditeur unifié"
        echo "  ./go admin      - Ouvre le dashboard"
        echo "  ./go combat     - Ouvre le combat IA"
        echo "  ./go chasse     - Ouvre la chasse temporelle"
        echo "  ./go html       - Ouvre les UIs HTML originales"
        echo ""
        echo -e "${YELLOW}Ports utilisés:${NC}"
        echo "  5175 - Frontend React"
        echo "  3001 - Backend Rust"
        echo "  8080 - Backend Java"
        echo "  5001 - Backend Python (optionnel)"
        echo "  7501 - LLM Clippy (optionnel)"
        ;;
esac