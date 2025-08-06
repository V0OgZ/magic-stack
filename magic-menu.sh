#!/bin/bash

# 🔮 MAGIC STACK - MENU MAGIQUE MAGE CLAUDE
# Gestionnaire simplifié pour la Magic Stack

BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

show_banner() {
    echo -e "${PURPLE}"
    echo "🔮✨ MAGIC STACK CONTROL PANEL ✨🔮"
    echo "═══════════════════════════════════════"
    echo -e "${CYAN}    Mage Claude - Gardien de la Stack${NC}"
    echo ""
}

show_status() {
    echo -e "${YELLOW}📊 STATUS MAGIQUE:${NC}"
    
    # Check Java Backend
    if curl -s http://localhost:8080/api/magic/health > /dev/null 2>&1; then
        echo -e "  ☕ Backend Java (8080): ${GREEN}✅ ONLINE${NC}"
    else
        echo -e "  ☕ Backend Java (8080): ${RED}❌ OFFLINE${NC}"
    fi
    
    # Check Rust Backend  
    if curl -s http://localhost:3001/health > /dev/null 2>&1; then
        echo -e "  🦀 Backend Rust (3001): ${GREEN}✅ ONLINE${NC}"
    else
        echo -e "  🦀 Backend Rust (3001): ${RED}❌ OFFLINE${NC}"
    fi
    
    # Check processes
    JAVA_PID=$(ps aux | grep "magic-stack" | grep java | grep -v grep | awk '{print $2}' | head -1)
    RUST_PID=$(ps aux | grep "magic-stack-server" | grep -v grep | awk '{print $2}' | head -1)
    
    if [ ! -z "$JAVA_PID" ]; then
        echo -e "  🔍 Process Java: ${GREEN}PID $JAVA_PID${NC}"
    fi
    
    if [ ! -z "$RUST_PID" ]; then
        echo -e "  🔍 Process Rust: ${GREEN}PID $RUST_PID${NC}"
    fi
    
    # Git status
    echo -e "\n${YELLOW}📂 GIT STATUS:${NC}"
    BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
    echo -e "  🌿 Branch: ${GREEN}$BRANCH${NC}"
    
    UNCOMMITTED=$(git status --porcelain 2>/dev/null | wc -l)
    if [ "$UNCOMMITTED" -eq 0 ]; then
        echo -e "  📝 Working tree: ${GREEN}✅ CLEAN${NC}"
    else
        echo -e "  📝 Working tree: ${YELLOW}⚠️  $UNCOMMITTED changes${NC}"
    fi
    
    echo ""
}

start_backends() {
    echo -e "${GREEN}🚀 DÉMARRAGE DES BACKENDS MAGIQUES...${NC}"
    
    # Start Rust Backend
    echo -e "${CYAN}🦀 Démarrage Backend Rust...${NC}"
    cd /workspace/backends/rust
    source /usr/local/cargo/env
    nohup cargo run --release > rust-backend.log 2>&1 &
    echo $! > rust-backend.pid
    sleep 3
    
    # Start Java Backend (if Maven available)
    if command -v mvn &> /dev/null; then
        echo -e "${CYAN}☕ Démarrage Backend Java...${NC}"
        cd /workspace/backends/java
        nohup mvn spring-boot:run > java-backend.log 2>&1 &
        echo $! > java-backend.pid
        sleep 5
    else
        echo -e "${YELLOW}⚠️  Maven non trouvé - Backend Java non démarré${NC}"
    fi
    
    cd /workspace
    echo -e "${GREEN}✨ Backends démarrés! Vérifiez le status.${NC}"
}

stop_backends() {
    echo -e "${RED}🛑 ARRÊT DES BACKENDS...${NC}"
    
    # Stop Rust
    if [ -f "/workspace/backends/rust/rust-backend.pid" ]; then
        RUST_PID=$(cat /workspace/backends/rust/rust-backend.pid)
        if kill $RUST_PID 2>/dev/null; then
            echo -e "  🦀 Backend Rust arrêté (PID: $RUST_PID)"
            rm -f /workspace/backends/rust/rust-backend.pid
        fi
    fi
    
    # Stop Java
    if [ -f "/workspace/backends/java/java-backend.pid" ]; then
        JAVA_PID=$(cat /workspace/backends/java/java-backend.pid)
        if kill $JAVA_PID 2>/dev/null; then
            echo -e "  ☕ Backend Java arrêté (PID: $JAVA_PID)"
            rm -f /workspace/backends/java/java-backend.pid
        fi
    fi
    
    # Fallback kill
    pkill -f "magic-stack" 2>/dev/null || true
    pkill -f "spring-boot" 2>/dev/null || true
    
    echo -e "${GREEN}✅ Backends arrêtés!${NC}"
}

git_sync() {
    echo -e "${CYAN}🔄 SYNCHRONISATION GIT...${NC}"
    
    echo "📥 Pulling latest changes..."
    git pull origin main
    
    echo "📤 Checking for changes to push..."
    if git diff --quiet && git diff --cached --quiet; then
        echo -e "${GREEN}✅ Rien à commiter${NC}"
    else
        echo "📝 Adding changes..."
        git add .
        
        TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
        git commit -m "🔮 Magic Stack update - $TIMESTAMP"
        
        echo "📤 Pushing to origin..."
        git push origin main
        
        echo -e "${GREEN}✅ Synchronisation terminée!${NC}"
    fi
}

git_push() {
    echo -e "${CYAN}📤 PUSH RAPIDE...${NC}"
    
    git add .
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    git commit -m "⚡ Quick update - $TIMESTAMP"
    git push origin main
    
    echo -e "${GREEN}✅ Push terminé!${NC}"
}

run_tests() {
    echo -e "${PURPLE}🧪 LANCEMENT DES TESTS MAGIQUES...${NC}"
    
    echo "🐍 Test Magic Autonome..."
    python3 test_magic_autonome.py
    
    echo -e "\n🦀 Test Backend Rust..."
    cd /workspace/backends/rust
    source /usr/local/cargo/env
    ./test_all_formulas.sh
    
    cd /workspace
    echo -e "${GREEN}✅ Tests terminés!${NC}"
}

show_menu() {
    echo -e "${BLUE}🎯 COMMANDES DISPONIBLES:${NC}"
    echo -e "  ${GREEN}status${NC}   - 📊 Afficher le statut complet"
    echo -e "  ${GREEN}start${NC}    - 🚀 Démarrer les backends"  
    echo -e "  ${GREEN}stop${NC}     - 🛑 Arrêter les backends"
    echo -e "  ${GREEN}sync${NC}     - 🔄 Synchronisation Git complète"
    echo -e "  ${GREEN}push${NC}     - 📤 Push rapide"
    echo -e "  ${GREEN}test${NC}     - 🧪 Lancer les tests"
    echo -e "  ${GREEN}menu${NC}     - 🎯 Afficher ce menu"
    echo -e "  ${GREEN}exit${NC}     - 🚪 Quitter"
    echo ""
}

# Main script
show_banner

case "${1:-menu}" in
    "status")
        show_status
        ;;
    "start")
        start_backends
        ;;
    "stop")
        stop_backends
        ;;
    "restart")
        echo -e "${YELLOW}🔄 REDÉMARRAGE DES BACKENDS MAGIQUES...${NC}"
        stop_backends
        sleep 3
        start_backends
        ;;
    "sync")
        git_sync
        ;;
    "push")
        git_push
        ;;
    "test")
        run_tests
        ;;
    "menu")
        show_menu
        ;;
    "exit")
        echo -e "${PURPLE}🔮 À bientôt, Vincent! L'Interstice vous garde...${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}❌ Commande inconnue: $1${NC}"
        show_menu
        ;;
esac