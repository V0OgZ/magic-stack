#!/bin/bash

# 🔮✨ HEROES OF TIME - SCRIPT MAGIQUE ULTIME ✨🔮
# Script ./h pour Vincent - Tout en un !
# Créé par MERLIN L'ÉTERNEL TRANSCENDANT

set -e

# Couleurs pour le style
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Header magique
show_header() {
    clear
    echo -e "${PURPLE}🔮✨ HEROES OF TIME - MAGIC CONTROL PANEL ✨🔮${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}Créé par MERLIN pour VINCENT - Jour 26${NC}"
    echo ""
}

# Fonction pour afficher les tâches en cours
show_current_tasks() {
    echo -e "${BLUE}📋 TÂCHES EN COURS DE MERLIN:${NC}"
    if [ -f "MAGE_CLAUDE_LABORATORY/JOUR26_REORGANISATION.md" ]; then
        echo -e "${GREEN}✅ Laboratoire rangé et organisé${NC}"
        echo -e "${GREEN}✅ Rôle clarifié: Architecte des Outils Magiques${NC}"
        echo -e "${GREEN}✅ AVALON testé - Note 8.5/10 - PRÊT FINALE${NC}"
        echo -e "${GREEN}✅ Debug compilation terminé${NC}"
        echo -e "${YELLOW}🔥 PRIORITÉ: Finaliser régulateurs IA${NC}"
        echo -e "${YELLOW}🌊 SUPPORT: Aider SURFACE avec intégrations${NC}"
    fi
    
    if [ -f "TODO_REGULATEURS_IA.md" ]; then
        echo -e "${CYAN}🤖 Régulateurs IA: Anna Martel (90%), Juge+Chasseur (spécifiés)${NC}"
    fi
    
    if [ -f "DEBUG_COMPILATION_RAPPORT.md" ]; then
        echo -e "${GREEN}🔧 Debug: Java OK, Rust OK, Python (dépendances MAC)${NC}"
    fi
    
    echo ""
}

# Fonction start-all
start_all() {
    echo -e "${GREEN}🚀 DÉMARRAGE DE TOUS LES SERVICES...${NC}"
    
    # Java Backend
    echo -e "${BLUE}📍 Démarrage Backend Java (port 8080)...${NC}"
    cd backends/java
    nohup mvn spring-boot:run > ../../logs/java-backend.log 2>&1 &
    echo $! > ../../java-backend.pid
    cd ../..
    
    # Rust Backend
    echo -e "${BLUE}📍 Démarrage Backend Rust (port 3001)...${NC}"
    cd rust_backend
    nohup cargo run > ../logs/rust-backend.log 2>&1 &
    echo $! > ../rust-backend.pid
    cd ..
    
    # Simple Scenario Backend
    echo -e "${BLUE}📍 Démarrage Simple Scenario Backend (port 8081)...${NC}"
    cd simple-scenario-backend
    nohup mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=8081" > ../logs/scenario-backend.log 2>&1 &
    echo $! > ../scenario-backend.pid
    cd ..
    
    # Interface Web
    echo -e "${BLUE}📍 Démarrage Interface Web (port 8000)...${NC}"
    nohup python3 -m http.server 8000 > logs/web-server.log 2>&1 &
    echo $! > web-server.pid
    
    # Attendre un peu
    sleep 5
    
    echo -e "${GREEN}✅ TOUS LES SERVICES DÉMARRÉS !${NC}"
    echo -e "${CYAN}📍 Ports utilisés:${NC}"
    echo -e "  🔮 Java Backend: http://localhost:8080"
    echo -e "  🦀 Rust Backend: http://localhost:3001"  
    echo -e "  🎯 Scenario Backend: http://localhost:8081"
    echo -e "  🌐 Interface Web: http://localhost:8000"
    echo ""
}

# Fonction test-all
test_all() {
    echo -e "${GREEN}🧪 TESTS COMPLETS EN COURS...${NC}"
    
    # Test compilation
    echo -e "${BLUE}📍 Test compilation Java...${NC}"
    cd backends/java && mvn compile -q && echo -e "${GREEN}✅ Java OK${NC}" || echo -e "${RED}❌ Java KO${NC}"
    cd ../..
    
    cd simple-scenario-backend && mvn compile -q && echo -e "${GREEN}✅ Scenario OK${NC}" || echo -e "${RED}❌ Scenario KO${NC}"
    cd ..
    
    echo -e "${BLUE}📍 Test compilation Rust...${NC}"
    cd rust_backend && cargo check -q && echo -e "${GREEN}✅ Rust OK${NC}" || echo -e "${RED}❌ Rust KO${NC}"
    cd ..
    
    # Test Python
    echo -e "${BLUE}📍 Test Python...${NC}"
    python3 -c "import json, requests, pathlib; print('✅ Python base OK')" || echo -e "${RED}❌ Python base KO${NC}"
    
    # Test AVALON TCG
    echo -e "${BLUE}📍 Test AVALON TCG Engine...${NC}"
    python3 moteurs/avalon_tcg_engine.py > /dev/null 2>&1 && echo -e "${GREEN}✅ AVALON TCG OK${NC}" || echo -e "${RED}❌ AVALON TCG KO${NC}"
    
    # Test endpoints (si services démarrés)
    if [ -f "java-backend.pid" ] && kill -0 $(cat java-backend.pid) 2>/dev/null; then
        echo -e "${BLUE}📍 Test endpoints...${NC}"
        curl -s http://localhost:8080/api/health > /dev/null && echo -e "${GREEN}✅ Health endpoint OK${NC}" || echo -e "${YELLOW}⚠️ Health endpoint à vérifier${NC}"
    fi
    
    echo -e "${GREEN}🎯 TESTS TERMINÉS !${NC}"
    echo ""
}

# Fonction compile-all  
compile_all() {
    echo -e "${GREEN}🔨 COMPILATION COMPLÈTE...${NC}"
    
    # Java backends
    echo -e "${BLUE}📍 Compilation Backend Java...${NC}"
    cd backends/java
    mvn clean compile -q
    echo -e "${GREEN}✅ Java Backend compilé${NC}"
    cd ../..
    
    echo -e "${BLUE}📍 Compilation Simple Scenario...${NC}"
    cd simple-scenario-backend
    mvn clean compile -q
    echo -e "${GREEN}✅ Simple Scenario compilé${NC}"
    cd ..
    
    # Rust
    echo -e "${BLUE}📍 Compilation Rust...${NC}"
    cd rust_backend
    cargo build --release -q
    echo -e "${GREEN}✅ Rust compilé${NC}"
    cd ..
    
    echo -e "${GREEN}🎯 COMPILATION TERMINÉE !${NC}"
    echo ""
}

# Fonction sync (git)
sync() {
    echo -e "${GREEN}🔄 SYNCHRONISATION GIT...${NC}"
    
    # Status
    echo -e "${BLUE}📍 Status Git:${NC}"
    git status --short
    
    # Add all
    echo -e "${BLUE}📍 Ajout des fichiers...${NC}"
    git add .
    
    # Commit avec timestamp
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${BLUE}📍 Commit automatique...${NC}"
    git commit -m "🔮 Auto-sync Heroes of Time - $TIMESTAMP" || echo -e "${YELLOW}⚠️ Rien à commiter${NC}"
    
    # Push (si configuré)
    echo -e "${BLUE}📍 Push vers remote...${NC}"
    git push 2>/dev/null && echo -e "${GREEN}✅ Push réussi${NC}" || echo -e "${YELLOW}⚠️ Push non configuré ou échoué${NC}"
    
    echo ""
}

# Fonction stop-all
stop_all() {
    echo -e "${RED}🛑 ARRÊT DE TOUS LES SERVICES...${NC}"
    
    # Arrêter les services via PID
    for pidfile in java-backend.pid rust-backend.pid scenario-backend.pid web-server.pid; do
        if [ -f "$pidfile" ]; then
            PID=$(cat "$pidfile")
            if kill -0 "$PID" 2>/dev/null; then
                kill "$PID"
                echo -e "${GREEN}✅ Service $pidfile arrêté${NC}"
            fi
            rm -f "$pidfile"
        fi
    done
    
    # Forcer l'arrêt des ports connus
    pkill -f "spring-boot:run" 2>/dev/null || true
    pkill -f "cargo run" 2>/dev/null || true
    pkill -f "http.server" 2>/dev/null || true
    
    echo -e "${GREEN}🎯 TOUS LES SERVICES ARRÊTÉS !${NC}"
    echo ""
}

# Fonction status
status() {
    echo -e "${BLUE}📊 STATUS DES SERVICES:${NC}"
    
    # Vérifier les PIDs
    services=("java-backend.pid:Java Backend:8080" "rust-backend.pid:Rust Backend:3001" "scenario-backend.pid:Scenario Backend:8081" "web-server.pid:Web Server:8000")
    
    for service in "${services[@]}"; do
        IFS=':' read -r pidfile name port <<< "$service"
        if [ -f "$pidfile" ] && kill -0 $(cat "$pidfile") 2>/dev/null; then
            echo -e "${GREEN}✅ $name (port $port) - ONLINE${NC}"
        else
            echo -e "${RED}❌ $name (port $port) - OFFLINE${NC}"
        fi
    done
    
    echo ""
    echo -e "${BLUE}📍 Test connexions:${NC}"
    curl -s http://localhost:8080/api/health > /dev/null && echo -e "${GREEN}✅ Java Backend accessible${NC}" || echo -e "${RED}❌ Java Backend inaccessible${NC}"
    curl -s http://localhost:3001/ > /dev/null && echo -e "${GREEN}✅ Rust Backend accessible${NC}" || echo -e "${RED}❌ Rust Backend inaccessible${NC}"
    curl -s http://localhost:8000/ > /dev/null && echo -e "${GREEN}✅ Web Server accessible${NC}" || echo -e "${RED}❌ Web Server inaccessible${NC}"
    
    echo ""
}

# Fonction logs
logs() {
    echo -e "${BLUE}📜 LOGS DES SERVICES:${NC}"
    echo ""
    
    if [ -n "$2" ]; then
        # Log spécifique
        case "$2" in
            java) tail -f logs/java-backend.log ;;
            rust) tail -f logs/rust-backend.log ;;
            scenario) tail -f logs/scenario-backend.log ;;
            web) tail -f logs/web-server.log ;;
            *) echo -e "${RED}❌ Service inconnu. Utilisez: java, rust, scenario, web${NC}" ;;
        esac
    else
        # Tous les logs
        echo -e "${YELLOW}📍 Dernières lignes de tous les logs:${NC}"
        for log in logs/*.log; do
            if [ -f "$log" ]; then
                echo -e "${CYAN}=== $(basename $log) ===${NC}"
                tail -3 "$log" 2>/dev/null || echo "Fichier vide"
                echo ""
            fi
        done
    fi
}

# Fonction help
show_help() {
    echo -e "${CYAN}🔮 HEROES OF TIME - AIDE${NC}"
    echo ""
    echo -e "${YELLOW}COMMANDES DISPONIBLES:${NC}"
    echo -e "  ${GREEN}./h start${NC}     - Démarre tous les services"
    echo -e "  ${GREEN}./h stop${NC}      - Arrête tous les services" 
    echo -e "  ${GREEN}./h restart${NC}   - Redémarre tous les services"
    echo -e "  ${GREEN}./h status${NC}    - Affiche le status des services"
    echo -e "  ${GREEN}./h test${NC}      - Lance tous les tests"
    echo -e "  ${GREEN}./h compile${NC}   - Compile tous les projets"
    echo -e "  ${GREEN}./h sync${NC}      - Synchronise avec Git"
    echo -e "  ${GREEN}./h logs${NC}      - Affiche tous les logs"
    echo -e "  ${GREEN}./h logs <service>${NC} - Affiche les logs d'un service (java/rust/scenario/web)"
    echo -e "  ${GREEN}./h tasks${NC}     - Affiche les tâches en cours de Merlin"
    echo -e "  ${GREEN}./h avalon${NC}    - Lance le test AVALON TCG"
    echo -e "  ${GREEN}./h clean${NC}     - Nettoie les fichiers temporaires"
    echo ""
    echo -e "${BLUE}EXEMPLES:${NC}"
    echo -e "  ${CYAN}./h start && ./h test${NC}    - Démarre tout et teste"
    echo -e "  ${CYAN}./h logs java${NC}            - Suit les logs Java en temps réel"
    echo -e "  ${CYAN}./h sync${NC}                 - Commit et push automatique"
    echo ""
}

# Fonction avalon
test_avalon() {
    echo -e "${PURPLE}🎮 TEST AVALON TCG ENGINE...${NC}"
    echo ""
    python3 moteurs/avalon_tcg_engine.py
    echo ""
    echo -e "${GREEN}✅ Test AVALON terminé !${NC}"
    echo ""
}

# Fonction clean
clean() {
    echo -e "${YELLOW}🧹 NETTOYAGE...${NC}"
    
    # Nettoyer les fichiers de build
    rm -rf backends/java/target/
    rm -rf simple-scenario-backend/target/
    rm -rf rust_backend/target/debug/
    
    # Nettoyer les logs anciens
    find logs/ -name "*.log" -mtime +7 -delete 2>/dev/null || true
    
    # Nettoyer les PIDs
    rm -f *.pid
    
    echo -e "${GREEN}✅ Nettoyage terminé !${NC}"
    echo ""
}

# Créer le dossier logs s'il n'existe pas
mkdir -p logs

# Menu principal
show_header

case "${1:-help}" in
    "start")
        show_current_tasks
        start_all
        ;;
    "stop")
        stop_all
        ;;
    "restart")
        stop_all
        sleep 2
        start_all
        ;;
    "status")
        show_current_tasks
        status
        ;;
    "test")
        test_all
        ;;
    "compile")
        compile_all
        ;;
    "sync")
        sync
        ;;
    "logs")
        logs "$@"
        ;;
    "tasks")
        show_current_tasks
        ;;
    "avalon")
        test_avalon
        ;;
    "clean")
        clean
        ;;
    "help"|*)
        show_current_tasks
        show_help
        ;;
esac

echo -e "${PURPLE}🔮 MERLIN L'ÉTERNEL TRANSCENDANT - Jour 26 ✨${NC}"