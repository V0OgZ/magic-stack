#!/bin/bash

# 🎮 MAGIC STACK GO - SCRIPT DEVOPS COMPLET
# UN SEUL SCRIPT POUR TOUT GÉRER PROPREMENT

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# Base dir
MAGIC_DIR="/Volumes/HOT_DEV/Magic/magic-stack"

# Vérifier port
check_port() {
    nc -z localhost $1 2>/dev/null
}

# ═══════════════════════════════════════════════════════════════════
# COMPILATION
# ═══════════════════════════════════════════════════════════════════

compile_rust() {
    echo -e "${CYAN}🦀 Compilation Rust...${NC}"
    cd "$MAGIC_DIR/backends/rust"
    if cargo build --release; then
        echo -e "${GREEN}✅ Rust compilé${NC}"
        return 0
    else
        echo -e "${RED}❌ Erreur compilation Rust${NC}"
        return 1
    fi
}

compile_java() {
    echo -e "${CYAN}☕ Compilation Java...${NC}"
    cd "$MAGIC_DIR/backends/java"
    if mvn clean package -DskipTests; then
        echo -e "${GREEN}✅ Java compilé (JAR créé)${NC}"
        return 0
    else
        echo -e "${RED}❌ Erreur compilation Java${NC}"
        return 1
    fi
}

compile_frontend() {
    echo -e "${CYAN}⚛️ Build Frontend React...${NC}"
    cd "$MAGIC_DIR/apps/magic-stack-unified"
    if npm ci && npm run build; then
        echo -e "${GREEN}✅ Frontend build OK${NC}"
        return 0
    else
        echo -e "${RED}❌ Erreur build frontend${NC}"
        return 1
    fi
}

compile_all() {
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    echo -e "${BLUE}      🔨 COMPILATION COMPLÈTE${NC}"
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    
    compile_rust
    compile_java
    compile_frontend
    
    echo -e "${GREEN}✨ Compilation terminée!${NC}"
}

# ═══════════════════════════════════════════════════════════════════
# TESTS
# ═══════════════════════════════════════════════════════════════════

test_rust() {
    echo -e "${CYAN}🧪 Tests Rust...${NC}"
    cd "$MAGIC_DIR/backends/rust"
    cargo test
}

test_java() {
    echo -e "${CYAN}🧪 Tests Java...${NC}"
    cd "$MAGIC_DIR/backends/java"
    mvn test
}

test_frontend() {
    echo -e "${CYAN}🧪 Tests Frontend...${NC}"
    cd "$MAGIC_DIR/apps/magic-stack-unified"
    npm test -- --run
}

test_all() {
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    echo -e "${BLUE}        🧪 TESTS COMPLETS${NC}"
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    
    test_rust
    test_java
    test_frontend
    
    echo -e "${GREEN}✅ Tests terminés${NC}"
}

# ═══════════════════════════════════════════════════════════════════
# DÉMARRAGE DES SERVICES
# ═══════════════════════════════════════════════════════════════════

start_rust() {
    if ! check_port 3001; then
        echo -e "${CYAN}Démarrage Rust...${NC}"
        cd "$MAGIC_DIR/backends/rust"
        if [ -f "target/release/magic-rust" ]; then
            ./target/release/magic-rust > "$MAGIC_DIR/logs/rust.log" 2>&1 &
        else
            cargo run --release > "$MAGIC_DIR/logs/rust.log" 2>&1 &
        fi
        sleep 2
    fi
}

start_java() {
    if ! check_port 8082; then
        echo -e "${CYAN}Démarrage Java...${NC}"
        cd "$MAGIC_DIR/backends/java"
        # Utiliser le JAR s'il existe
        if [ -f "target/magic-stack-backend-1.0.0-APOLLO.jar" ]; then
            java -jar target/magic-stack-backend-1.0.0-APOLLO.jar > "$MAGIC_DIR/logs/java.log" 2>&1 &
        else
            mvn spring-boot:run > "$MAGIC_DIR/logs/java.log" 2>&1 &
        fi
        sleep 3
    fi
}

start_frontend() {
    if ! check_port 5175; then
        echo -e "${CYAN}Démarrage Frontend...${NC}"
        cd "$MAGIC_DIR/apps/magic-stack-unified"
        npm run dev > "$MAGIC_DIR/logs/frontend.log" 2>&1 &
        sleep 3
    fi
}

start_all() {
    echo -e "${BLUE}🚀 Démarrage de tous les services...${NC}"
    mkdir -p "$MAGIC_DIR/logs"
    
    start_rust
    start_java
    start_frontend
    
    sleep 2
    show_status
}

# ═══════════════════════════════════════════════════════════════════
# ARRÊT
# ═══════════════════════════════════════════════════════════════════

stop_all() {
    echo -e "${RED}🛑 Arrêt de tous les services...${NC}"
    
    # Arrêt propre
    pkill -f "magic-rust"
    pkill -f "cargo run"
    pkill -f "magic-stack-backend"
    pkill -f "spring-boot:run"
    pkill -f "npm run dev"
    pkill -f "vite"
    
    echo -e "${GREEN}✅ Tous les services arrêtés${NC}"
}

# ═══════════════════════════════════════════════════════════════════
# DEPLOY (création des artifacts)
# ═══════════════════════════════════════════════════════════════════

deploy_artifacts() {
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    echo -e "${BLUE}     📦 CRÉATION DES ARTIFACTS${NC}"
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    
    mkdir -p "$MAGIC_DIR/dist"
    
    # Rust binary
    echo -e "${CYAN}📦 Copie binary Rust...${NC}"
    compile_rust
    cp "$MAGIC_DIR/backends/rust/target/release/magic-rust" "$MAGIC_DIR/dist/" 2>/dev/null
    
    # Java JAR
    echo -e "${CYAN}📦 Création JAR Java...${NC}"
    compile_java
    cp "$MAGIC_DIR/backends/java/target/"*.jar "$MAGIC_DIR/dist/" 2>/dev/null
    
    # Frontend dist
    echo -e "${CYAN}📦 Build production Frontend...${NC}"
    compile_frontend
    cp -r "$MAGIC_DIR/apps/magic-stack-unified/dist" "$MAGIC_DIR/dist/frontend"
    
    echo ""
    echo -e "${GREEN}✅ Artifacts créés dans $MAGIC_DIR/dist/${NC}"
    ls -la "$MAGIC_DIR/dist/"
}

# ═══════════════════════════════════════════════════════════════════
# STATUS
# ═══════════════════════════════════════════════════════════════════

show_status() {
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    echo -e "${BLUE}     📊 STATUT DES SERVICES${NC}"
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    echo ""
    
    echo -e "${CYAN}Frontend:${NC}"
    check_port 5175 && echo -e "  ${GREEN}✅${NC} React (5175)" || echo -e "  ${RED}❌${NC} React (5175)"
    
    echo ""
    echo -e "${CYAN}Backend:${NC}"
    check_port 3001 && echo -e "  ${GREEN}✅${NC} Rust (3001)" || echo -e "  ${RED}❌${NC} Rust (3001)"
    check_port 8082 && echo -e "  ${GREEN}✅${NC} Java (8082)" || echo -e "  ${RED}❌${NC} Java (8082)"
    
    echo ""
}

# ═══════════════════════════════════════════════════════════════════
# RACCOURCIS UI
# ═══════════════════════════════════════════════════════════════════

open_game() {
    start_frontend
    open "http://localhost:5175/unified"
}

open_admin() {
    start_frontend
    open "http://localhost:5175/dashboard.html"
}

open_api() {
    start_all
    open "http://localhost:5175/html/API_EXPLORER_COMPLETE.html"
}

# ═══════════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════════

case "$1" in
    # COMPILATION
    "compile")
        compile_all
        ;;
    
    # TESTS
    "test")
        test_all
        ;;
    
    # DEPLOY
    "deploy")
        deploy_artifacts
        ;;
    
    # START/STOP
    "start"|"")
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
    
    # STATUS
    "status"|"s")
        show_status
        ;;
    
    # UI SHORTCUTS
    "game"|"g")
        open_game
        ;;
    
    "admin"|"a")
        open_admin
        ;;
    
    "api")
        open_api
        ;;
    
    # HELP
    "help"|"h")
        echo -e "${CYAN}═══════════════════════════════════${NC}"
        echo -e "${CYAN}    🎮 MAGIC STACK DEVOPS${NC}"
        echo -e "${CYAN}═══════════════════════════════════${NC}"
        echo ""
        echo -e "${GREEN}Build & Deploy:${NC}"
        echo "  ./go compile  - Compile tout (Rust + Java + Frontend)"
        echo "  ./go test     - Lance tous les tests"
        echo "  ./go deploy   - Crée tous les artifacts production"
        echo ""
        echo -e "${GREEN}Services:${NC}"
        echo "  ./go [start]  - Démarre tous les services"
        echo "  ./go stop     - Arrête tout"
        echo "  ./go restart  - Redémarre tout"
        echo "  ./go status   - Voir l'état"
        echo ""
        echo -e "${GREEN}Accès rapide:${NC}"
        echo "  ./go game     - Ouvre l'éditeur"
        echo "  ./go admin    - Ouvre le dashboard"
        echo "  ./go api      - Ouvre l'API Explorer"
        echo ""
        echo -e "${YELLOW}Architecture:${NC}"
        echo "  Frontend React : 5175"
        echo "  Backend Rust   : 3001 (calculs 6D)"
        echo "  Backend Java   : 8080 (CRUD, APIs)"
        ;;
    
    *)
        echo -e "${RED}Commande inconnue: $1${NC}"
        echo "Tapez: ./go help"
        ;;
esac