#!/bin/bash

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
GOLD='\033[0;33m'
NC='\033[0m' # No Color

# Configuration
FRONTEND_PORT=5002
GAME_SERVER_PORT=3002
WEBSOCKET_PORT=8002
RUST_PORT=3001
JAVA_PORT=8080
VECTOR_PORT=5001

# Fonction pour afficher le header
show_header() {
    clear
    echo -e "${CYAN}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${NC}  ${GOLD}🎮 HEROES OF TIME - MENU PRINCIPAL${NC}                        ${CYAN}║${NC}"
    echo -e "${CYAN}║${NC}  ${BLUE}Équipe: Vincent + Claude (GROEKEN)${NC}                        ${CYAN}║${NC}"
    echo -e "${CYAN}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# Fonction pour vérifier le statut d'un port
check_port() {
    lsof -i:$1 > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅${NC}"
    else
        echo -e "${RED}❌${NC}"
    fi
}

# Menu principal
show_main_menu() {
    show_header
    
    echo -e "${YELLOW}━━━ SERVICES BACKEND ━━━${NC}"
    echo -e "  ${CYAN}[1]${NC} 🚀 Lancer TOUS les services       $(check_port $RUST_PORT)$(check_port $JAVA_PORT)$(check_port $VECTOR_PORT)"
    echo -e "  ${CYAN}[2]${NC} 🦀 Rust Backend (3001)            $(check_port $RUST_PORT)"
    echo -e "  ${CYAN}[3]${NC} ☕ Java Backend (8080)            $(check_port $JAVA_PORT)"
    echo -e "  ${CYAN}[4]${NC} 🐍 Vector DB (5001)               $(check_port $VECTOR_PORT)"
    echo -e "  ${CYAN}[5]${NC} ⏹️  Arrêter tous les services"
    echo ""
    
    echo -e "${YELLOW}━━━ LE VRAI JEU ━━━${NC}"
    echo -e "  ${CYAN}[10]${NC} 🎮 ${GOLD}HEROES OF TIME - UNIFIED${NC} ${GREEN}(LE VRAI!)${NC}"
    echo -e "  ${CYAN}[11]${NC} 📱 Version PWA (iPad/Mobile)"
    echo ""
    
    echo -e "${YELLOW}━━━ DOCUMENTATION & OUTILS ━━━${NC}"
    echo -e "  ${CYAN}[20]${NC} 📖 Manuel du Joueur (Expert)"
    echo -e "  ${CYAN}[21]${NC} 🎈 Manuel Facile (12 ans+)"
    echo -e "  ${CYAN}[22]${NC} 🔍 Vector DB Explorer"
    echo -e "  ${CYAN}[23]${NC} 🌐 Portal GitHub Pages"
    echo -e "  ${CYAN}[24]${NC} 🔮 API Explorer COMPLET ${GREEN}(100% APIs!)${NC}"
    echo ""
    
    echo -e "${YELLOW}━━━ DÉVELOPPEMENT ━━━${NC}"
    echo -e "  ${CYAN}[30]${NC} 📊 Status complet des services"
    echo -e "  ${CYAN}[31]${NC} 📝 Voir les logs"
    echo -e "  ${CYAN}[32]${NC} 🧹 Nettoyer logs et PIDs"
    echo -e "  ${CYAN}[33]${NC} 🔧 Mode développement"
    echo -e "  ${CYAN}[34]${NC} 🧩 World Editor (React PWA)"
    echo -e "  ${CYAN}[35]${NC} 🚀 Lancer World Editor (dev server)"
    echo ""
    
    echo -e "${YELLOW}━━━ ACTIONS RAPIDES ━━━${NC}"
    echo -e "  ${CYAN}[40]${NC} ⚡ Démarrage rapide (tout lancer)"
    echo -e "  ${CYAN}[41]${NC} 🎯 Ouvrir TOUTES les démos"
    echo -e "  ${CYAN}[42]${NC} 📚 Ouvrir TOUTE la documentation"
    echo -e "  ${CYAN}[43]${NC} 🎬 Lancer scénario Autoplay"
    echo -e "  ${CYAN}[44]${NC} ⚔️ Lancer CHASSE TEMPORELLE ${GOLD}(Direct!)${NC}"
    echo ""
    
    echo -e "  ${CYAN}[0]${NC} ❌ Quitter"
    echo ""
    echo -e "${MAGENTA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -n -e "${GOLD}> ${NC}"
}

# Lancer tous les services
start_all_services() {
    echo -e "${GREEN}🚀 Lancement de tous les services...${NC}"
    
    # Rust
    echo "Lancement Rust Backend..."
    cd backends/rust
    cargo build --release 2>/dev/null
    ./target/release/magic-stack-server > ../../logs/rust.log 2>&1 &
    cd ../..
    
    # Java
    echo "Lancement Java Backend..."
    cd simple-scenario-backend
    mvn spring-boot:run > ../logs/java.log 2>&1 &
    cd ..
    
    # Vector DB
    echo "Lancement Vector DB..."
    python3 simple_vector_server.py > logs/vector.log 2>&1 &
    
    echo -e "${GREEN}✅ Tous les services sont lancés !${NC}"
}

# Arrêter tous les services
stop_all_services() {
    echo -e "${RED}Arrêt de tous les services...${NC}"
    lsof -ti:$RUST_PORT | xargs kill -9 2>/dev/null
    lsof -ti:$JAVA_PORT | xargs kill -9 2>/dev/null
    lsof -ti:$VECTOR_PORT | xargs kill -9 2>/dev/null
    echo -e "${GREEN}✅ Services arrêtés${NC}"
}

# Status des services
show_status() {
    show_header
    echo -e "${YELLOW}📊 STATUS DES SERVICES${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    # Rust
    curl -s http://localhost:$RUST_PORT/health > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo -e "🦀 Rust Backend (3001):    ${GREEN}✅ ACTIF${NC}"
    else
        echo -e "🦀 Rust Backend (3001):    ${RED}❌ ARRÊTÉ${NC}"
    fi
    
    # Java
    curl -s http://localhost:$JAVA_PORT/api/health > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo -e "☕ Java Backend (8080):    ${GREEN}✅ ACTIF${NC}"
    else
        echo -e "☕ Java Backend (8080):    ${RED}❌ ARRÊTÉ${NC}"
    fi
    
    # Vector DB
    curl -s http://localhost:$VECTOR_PORT/health > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo -e "🐍 Vector DB (5001):       ${GREEN}✅ ACTIF${NC}"
    else
        echo -e "🐍 Vector DB (5001):       ${RED}❌ ARRÊTÉ${NC}"
    fi
    
    echo ""
}

# Ouvrir une page
open_page() {
    local file=$1
    local name=$2
    
    if [ -f "$file" ]; then
        echo -e "${GREEN}Ouverture: $name${NC}"
        open "$file"

    else
        echo -e "${RED}Fichier non trouvé: $file${NC}"
    fi
}

# Ouvrir toutes les démos
open_all_demos() {
    echo -e "${CYAN}🎮 Ouverture de toutes les démos...${NC}"
    open_page "MULTIPLAYER_DEMO_HOMM3.html" "Démo Multiplayer HOMM3"
    open_page "HOMM3_PWA_IPAD_CLIPPY.html" "PWA iPad"
    open_page "IA_VS_IA_AUTOPLAY.html" "IA vs IA Autoplay"
    open_page "SPECTATOR_GOD_MODE.html" "Mode Spectateur"
    open_page "SCENARIOS_TEST_RUNNER.html" "Test Runner"
    open_page "CHASSE_TEMPORELLE_MEGA_MAP.html" "CHASSE TEMPORELLE"
    echo -e "${GREEN}✅ Toutes les démos sont ouvertes !${NC}"
}

# Ouvrir toute la documentation
open_all_docs() {
    echo -e "${CYAN}📚 Ouverture de toute la documentation...${NC}"
    open_page "MANUEL_DU_JOUEUR_HOT.html" "Manuel Expert"
    open_page "MANUEL_FACILE_EASY_MODE.html" "Manuel Facile"
    open_page "VECTOR_DB_EXPLORER_UI.html" "Vector DB Explorer"
    open_page "API_EXPLORER_COMPLETE.html" "API Explorer COMPLET"
    open_page "docs/index.html" "Portal GitHub Pages"
    echo -e "${GREEN}✅ Toute la documentation est ouverte !${NC}"
}

# Lancer autoplay
launch_autoplay() {
    echo -e "${CYAN}🎬 Lancement du mode Autoplay IA vs IA...${NC}"
    
    # Vérifier que les services sont lancés
    curl -s http://localhost:$RUST_PORT/health > /dev/null 2>&1
    if [ $? -ne 0 ]; then
        echo -e "${YELLOW}Services non détectés, lancement...${NC}"
        start_all_services
    fi
    
    open_page "IA_VS_IA_AUTOPLAY.html" "IA vs IA Autoplay"
    echo -e "${GREEN}✅ Cliquez sur DÉMARRER pour lancer la bataille !${NC}"
}

# Lancer Chasse Temporelle
launch_chasse_temporelle() {
    echo -e "${GOLD}⚔️ LANCEMENT DE LA CHASSE TEMPORELLE${NC}"
    echo -e "${CYAN}Map 6x6 écrans (120x120 hexagones)${NC}"
    echo ""
    
    # Vérifier que les services sont lancés
    curl -s http://localhost:$RUST_PORT/health > /dev/null 2>&1
    if [ $? -ne 0 ]; then
        echo -e "${YELLOW}Lancement des services nécessaires...${NC}"
        start_all_services
    fi
    
    echo -e "${GREEN}Ouverture de la carte massive...${NC}"
    open_page "CHASSE_TEMPORELLE_MEGA_MAP.html" "CHASSE TEMPORELLE"
    
    echo ""
    echo -e "${YELLOW}Conseils:${NC}"
    echo "  • Choisissez votre difficulté (Facile → Cauchemar)"
    echo "  • Utilisez WASD ou les flèches pour naviguer"
    echo "  • Clic droit pour glisser la carte"
    echo "  • Molette pour zoomer"
    echo "  • Espace pour fin du tour"
    echo "  • C pour centrer sur votre héros"
    echo "  • Activez l'audio pour l'ambiance!"
    echo ""
    echo -e "${GREEN}✅ Prêt pour l'aventure temporelle !${NC}"
}

# Mode développement
dev_mode() {
    echo -e "${CYAN}🔧 MODE DÉVELOPPEMENT${NC}"
    echo "Lancement avec logs en temps réel..."
    
    # Terminal 1: Rust
    osascript -e 'tell app "Terminal" to do script "cd '$PWD'/backends/rust && cargo watch -x run"'
    
    # Terminal 2: Java
    osascript -e 'tell app "Terminal" to do script "cd '$PWD'/simple-scenario-backend && mvn spring-boot:run"'
    
    # Terminal 3: Vector DB
    osascript -e 'tell app "Terminal" to do script "cd '$PWD' && python3 simple_vector_server.py"'
    
    echo -e "${GREEN}✅ 3 terminaux ouverts pour le développement${NC}"
}

# Lancer l'éditeur React (dev) automatiquement
launch_world_editor_dev() {
    # Si Vite (5173) tourne déjà, ouvre le navigateur
    lsof -ti:5173 > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        open "http://localhost:5173"
        echo -e "${GREEN}World Editor (dev) déjà actif sur http://localhost:5173${NC}"
        return
    fi

    # Sinon, démarrer npm run dev dans un nouveau Terminal
    if command -v npm >/dev/null 2>&1; then
        APP_PATH="$PWD/apps/world-editor"
        if [ -d "$APP_PATH" ]; then
            osascript -e 'tell app "Terminal" to do script "cd '$PWD'/apps/world-editor && npm run dev"'
            sleep 2
            open "http://localhost:5173"
            echo -e "${GREEN}World Editor (dev) lancé${NC}"
        else
            echo -e "${RED}apps/world-editor introuvable${NC}"
        fi
    else
        echo -e "${YELLOW}npm non trouvé - ouverture de la version HTML à la place${NC}"
        open "WORLD_EDITOR.html"
    fi
}

# Nettoyer logs et PIDs
clean_all() {
    echo -e "${YELLOW}🧹 Nettoyage...${NC}"
    rm -f logs/*.log
    rm -f ../.pids/surface/*
    echo -e "${GREEN}✅ Nettoyé${NC}"
}

# Démarrage rapide
quick_start() {
    echo -e "${GOLD}⚡ DÉMARRAGE RAPIDE${NC}"
    echo ""
    
    # Lancer les services
    start_all_services
    
    # Ouvrir les pages principales
    echo -e "${CYAN}Ouverture des interfaces principales...${NC}"
    open_page "IA_VS_IA_AUTOPLAY.html" "IA vs IA Autoplay"
    open_page "VECTOR_DB_EXPLORER_UI.html" "Vector DB Explorer"
    open_page "MANUEL_FACILE_EASY_MODE.html" "Manuel Facile"
    
    echo ""
    echo -e "${GREEN}✅ TOUT EST PRÊT !${NC}"
    echo -e "${YELLOW}Conseils:${NC}"
    echo "  • Cliquez sur DÉMARRER dans l'Autoplay"
    echo "  • Recherchez 'temporal' dans le Vector DB"
    echo "  • Changez la langue avec 🇫🇷/🇬🇧"
    echo ""
}

# Si pas d'argument, afficher le menu et sortir
if [ $# -eq 0 ]; then
    show_main_menu
    exit 0
fi

# Sinon, exécuter l'action demandée
choice=$1

case $choice in
        1) start_all_services ;;
        2) 
            cd backends/rust
            cargo build --release && ./target/release/magic-stack-server &
            cd ../..
            echo -e "${GREEN}Rust lancé${NC}"
            ;;
        3)
            cd simple-scenario-backend
            mvn spring-boot:run &
            cd ..
            echo -e "${GREEN}Java lancé${NC}"
            ;;
        4)
            python3 simple_vector_server.py &
            echo -e "${GREEN}Vector DB lancé${NC}"
            ;;
        5) stop_all_services ;;
        
        10) 
            echo -e "${GOLD}🎮 Lancement de HEROES OF TIME - UNIFIED${NC}"
            echo -e "${GREEN}Connexion aux backends...${NC}"
            open_page "HOT_GAME_UNIFIED.html" "Heroes of Time - The Real Game"
            ;;
        11) 
            echo -e "${CYAN}📱 PWA Version${NC}"
            open_page "HOT_GAME_UNIFIED.html" "Heroes of Time PWA"
            ;;
        
        20) open_page "MANUEL_DU_JOUEUR_HOT.html" "Manuel Expert" ;;
        21) open_page "MANUEL_FACILE_EASY_MODE.html" "Manuel Facile" ;;
        22) open_page "VECTOR_DB_EXPLORER_UI.html" "Vector DB Explorer" ;;
        23) open_page "docs/index.html" "Portal GitHub Pages" ;;
        24) open_page "API_EXPLORER_COMPLETE.html" "API Explorer COMPLET" ;;
        
        30) show_status ;;
        31) 
            echo -e "${CYAN}📝 Logs disponibles:${NC}"
            echo "  tail -f logs/rust.log"
            echo "  tail -f logs/java.log"
            echo "  tail -f logs/vector.log"
            echo ""
            echo "Appuyez sur une touche..."
            read -n 1
            ;;
        32) clean_all ;;
        33) dev_mode ;;
        34)
            # Si build dispo, lancer un vrai serveur HTTP (vite preview), sinon fallback HTML
            if [ -d "apps/world-editor/dist" ]; then
                # Si preview (4173) tourne déjà, ouvrir
                lsof -ti:4173 > /dev/null 2>&1
                if [ $? -eq 0 ]; then
                    open "http://localhost:4173"
                    echo -e "${GREEN}World Editor (preview) déjà actif sur http://localhost:4173${NC}"
                else
                    if command -v npm >/dev/null 2>&1; then
                        osascript -e 'tell app "Terminal" to do script "cd '$PWD'/apps/world-editor && npm run preview"'
                        sleep 2
                        open "http://localhost:4173"
                        echo -e "${GREEN}World Editor (preview) lancé${NC}"
                    else
                        # Pas de npm: ouvrir quand même le fichier (peut causer page blanche)
                        open "apps/world-editor/dist/index.html"
                        echo -e "${YELLOW}Ouverture en file:// (préférez ./h 35 ou npm run preview)${NC}"
                    fi
                fi
            elif [ -f "WORLD_EDITOR.html" ]; then
                open "WORLD_EDITOR.html"
                echo -e "${GREEN}World Editor (HTML) ouvert${NC}"
            else
                echo -e "${RED}Aucun fichier d'éditeur trouvé${NC}"
            fi
            ;;
        35)
            launch_world_editor_dev
            ;;
        
        40) quick_start ;;
        41) open_all_demos ;;
        42) open_all_docs ;;
        43) launch_autoplay ;;
        44) launch_chasse_temporelle ;;
        
        0) 
            echo -e "${GOLD}Au revoir ! 🎮${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Option invalide: $choice${NC}"
            echo "Usage: ./h [option]"
            show_main_menu
            ;;
esac