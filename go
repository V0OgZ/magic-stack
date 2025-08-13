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
    # Compat: ancien alias, démarre UNIFIED sur 5176
    start_unified
}

start_unified() {
    if ! check_port 5176; then
        echo -e "${CYAN}Démarrage React UNIFIED (5176)...${NC}"
        cd "$MAGIC_DIR/apps/magic-stack-unified"
        npm run dev > "$MAGIC_DIR/logs/frontend_unified.log" 2>&1 &
        sleep 3
    fi
}

start_world_editor() {
    if ! check_port 5173; then
        echo -e "${CYAN}Démarrage WorldEditor (5173)...${NC}"
        cd "$MAGIC_DIR/apps/world-editor"
        npm run dev > "$MAGIC_DIR/logs/world_editor.log" 2>&1 &
        sleep 3
    fi
}

# Python 5001 n'existe plus - remplacé par services 7500/7501

# === LLM CLIPPY ===
start_llm() {
    echo -e "${CYAN}🤖 Démarrage services IA...${NC}"
    
    # Clippy LLM (7501)
    if ! check_port 7501; then
        if [ -d "$MAGIC_DIR/scripts/clippy" ]; then
            cd "$MAGIC_DIR/scripts/clippy"
            python3 clippy_memento_server.py > "$MAGIC_DIR/logs/clippy.log" 2>&1 &
            sleep 2
            echo -e "  ${GREEN}✓${NC} Clippy LLM lancé (7501)"
        else
            echo -e "  ${YELLOW}⚪${NC} Clippy LLM non trouvé (optionnel)"
        fi
    else
        echo -e "  ${GREEN}✓${NC} Clippy LLM déjà actif (7501)"
    fi
    
    # Vector DB (7500)
    if ! check_port 7500; then
        if [ -d "$MAGIC_DIR/scripts/vector_db" ]; then
            cd "$MAGIC_DIR/scripts/vector_db"
            python3 vector_server.py > "$MAGIC_DIR/logs/vector.log" 2>&1 &
            sleep 2
            echo -e "  ${GREEN}✓${NC} Vector DB lancé (7500)"
        else
            echo -e "  ${YELLOW}⚪${NC} Vector DB non trouvé (optionnel)"
        fi
    else
        echo -e "  ${GREEN}✓${NC} Vector DB déjà actif (7500)"
    fi
}

start_all() {
    echo -e "${BLUE}🚀 Démarrage de tous les services...${NC}"
    echo ""
    mkdir -p "$MAGIC_DIR/logs"
    
    echo -e "${CYAN}Backends principaux:${NC}"
    start_rust
    start_java
    
    echo ""
    echo -e "${CYAN}Services IA (optionnels):${NC}"
    start_llm
    
    echo ""
    echo -e "${CYAN}Frontend:${NC}"
    start_frontend
    
    echo ""
    echo -e "${GREEN}⏳ Attente du démarrage...${NC}"
    sleep 3
    
    echo ""
    show_status
    echo -e "${GREEN}✨ Prêt! Utilisez './go api' pour tester les APIs${NC}"
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
    
    echo -e "${CYAN}🎨 Frontend:${NC}"
    check_port 5173 && echo -e "  ${GREEN}✅${NC} WorldEditor (5173)" || echo -e "  ${YELLOW}⚪${NC} WorldEditor (5173)"
    check_port 5176 && echo -e "  ${GREEN}✅${NC} Unified App (5176)" || echo -e "  ${YELLOW}⚪${NC} Unified App (5176)"
    check_port 8000 && echo -e "  ${GREEN}✅${NC} HTML Server (8000)" || echo -e "  ${YELLOW}⚪${NC} HTML Server (8000)"
    
    echo ""
    echo -e "${CYAN}⚙️ Backend:${NC}"
    check_port 3001 && echo -e "  ${GREEN}✅${NC} Rust (3001) - Calculs 6D" || echo -e "  ${RED}❌${NC} Rust (3001)"
    check_port 8082 && echo -e "  ${GREEN}✅${NC} Java (8082) - CRUD & APIs" || echo -e "  ${RED}❌${NC} Java (8082)"
    
    echo ""
    echo -e "${CYAN}🤖 Services IA:${NC}"
    check_port 7500 && echo -e "  ${GREEN}✅${NC} Vector DB (7500)" || echo -e "  ${YELLOW}⚪${NC} Vector DB (7500) - Optionnel"
    check_port 7501 && echo -e "  ${GREEN}✅${NC} LLM Clippy (7501)" || echo -e "  ${YELLOW}⚪${NC} LLM Clippy (7501) - Optionnel"
    
    echo ""
}

# ═══════════════════════════════════════════════════════════════════
# RACCOURCIS UI
# ═══════════════════════════════════════════════════════════════════

open_game() {
    # Conserve l'alias pour UNIFIED
    start_unified
    open "http://localhost:5176/unified"
}

open_admin() {
    start_frontend
    open "http://localhost:5173/dashboard.html"
}

open_api() {
    start_all
    open "http://localhost:5173/html/API_EXPLORER_COMPLETE.html"
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
    "start")
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

    "vps-check")
        # Healthcheck public du VPS (front + back)
        echo "VPS Healthcheck: heroesoftime.online"
        for URL in \
            "https://heroesoftime.online/" \
            "https://heroesoftime.online/FRONTPAGE/index.html" \
            "https://heroesoftime.online/FRONTPAGE/assets/assets/HD/ExKAlibur.png" \
            "https://heroesoftime.online/engine/health" \
            "https://heroesoftime.online/vector/health"
        do
            CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
            printf "%3s  %s\n" "$CODE" "$URL"
        done
        ;;

    "react")
        # Lance uniquement l'app UNIFIED (5176) et ouvre /unified
        start_unified
        open "http://localhost:5176/unified"
        ;;

    "we"|"world-editor")
        # Lance l'éditeur hexagonal historique (5173)
        start_world_editor
        open "http://localhost:5173"
        ;;

    "unified")
        # Lance l'app unifiée explicitement
        start_unified
        open "http://localhost:5176/unified"
        ;;

    "front")
        # Ouvre la Frontpage via serveur HTML
        if ! check_port 8000; then
            cd "$MAGIC_DIR"
            python3 html_server.py > logs/html_server.log 2>&1 &
            sleep 2
        fi
        open "http://localhost:8000/FRONTPAGE/index.html"
        ;;
    
    "map"|"editor")
        echo -e "${CYAN}🗺️ Lancement de l'éditeur de map avancé...${NC}"
        open "$MAGIC_DIR/apps/magic-stack-unified/public/assets/MAP_ICON_PLACER_ADVANCED.html"
        echo -e "${GREEN}✅ Éditeur de map ouvert!${NC}"
        echo "📝 Ton cousin peut créer des maps avec ça!"
        ;;
    
    "workflow"|"wf")
        echo -e "${CYAN}📊 Lancement du Workflow Manager...${NC}"
        open "http://localhost:8000/WORKFLOW_MANAGER.html"
        echo -e "${GREEN}✅ Workflow Manager ouvert!${NC}"
        echo "🔄 Passez automatiquement de Structure → Instances → Jeu!"
        ;;
    
    "html")
        echo -e "${CYAN}🌐 Lancement serveur HTML (port 8000)...${NC}"
        if ! check_port 8000; then
            cd "$MAGIC_DIR"
            python3 html_server.py > logs/html_server.log 2>&1 &
            sleep 2
        fi
        echo -e "${GREEN}✅ Serveur HTML lancé!${NC}"
        open "http://localhost:8000/HTML_INDEX.html"
        ;;
    
    "mcp")
        echo -e "${CYAN}🎯 Lancement MCP Server (port 9000)...${NC}"
        if ! check_port 9000; then
            cd "$MAGIC_DIR"
            python3 mcp_server.py > logs/mcp_server.log 2>&1 &
            sleep 2
            echo -e "${GREEN}✅ MCP Server lancé!${NC}"
            echo "📊 Bridge actif: Rust + Java + VectorDB + Clippy"
            echo "🔗 http://localhost:9000/mcp/health"
        else
            echo -e "${GREEN}✅ MCP Server déjà actif!${NC}"
        fi
        ;;
    
    # HELP (et cas par défaut)
    "help"|"h"|"")
        echo "═══════════════════════════════════"
        echo "    🎮 MAGIC STACK DEVOPS - JOUR 35"
        echo "═══════════════════════════════════"
        echo ""
        echo "🚀 Commandes principales:"
        echo "  ./go start    - Démarre TOUS les services"
        echo "  ./go stop     - Arrête tout"
        echo "  ./go status   - Voir l'état des services"
        echo "  ./go html     - Lance serveur HTML (port 8000)"
        echo "  ./go mcp      - Lance MCP Server (port 9000)"
        echo ""
        echo "🔨 Build & Deploy:"
        echo "  ./go compile  - Compile tout (Rust + Java + Frontend)"
        echo "  ./go test     - Lance tous les tests"
        echo "  ./go deploy   - Crée les artifacts production"
        echo ""
        echo "🎯 Accès rapide:"
        echo "  ./go we       - WorldEditor hexagonal (5173)"
        echo "  ./go unified  - App unifiée (5176)"
        echo "  ./go game     - Alias pour 'unified'"
        echo "  ./go map      - 🗺️ ÉDITEUR DE MAP AVANCÉ (pour ton cousin!)"
        echo "  ./go editor   - Alias pour map editor"
        echo "  ./go admin    - Ouvre le dashboard admin"
        echo "  ./go api      - Ouvre l'API Explorer"
        echo "  ./go front    - Ouvre la Frontpage (FRONTPAGE/index.html)"
        echo "  ./go react    - Lance UNIFIED (5176) et ouvre /unified"
        echo "  ./go vps-check- Healthcheck public (front/back) du VPS"
        echo "  ./go combat   - Ouvre le combat IA vs IA"
        echo "  ./go chasse   - Ouvre la chasse temporelle"
        echo "  ./go html     - Ouvre TOUS les vieux HTML"
        echo ""
        echo "📍 Ports ACTUELS:"
        echo "  5173 - WorldEditor React (historique)"
        echo "  5176 - Unified App (React)"
        echo "  3001 - Backend Rust (calculs 6D)"
        echo "  8082 - Backend Java (CRUD, APIs)"
        echo "  7500 - Vector DB (recherche)"
        echo "  7501 - LLM Clippy (IA)"
        echo "  8000 - Serveur HTML (tous les vieux trucs)"
        ;;
    
    *)
        echo -e "${RED}❌ Commande inconnue: $1${NC}"
        echo ""
        $0 help
        ;;
esac