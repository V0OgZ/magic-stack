#!/bin/bash

# 🎮 MAGIC STACK GO - SCRIPT DEVOPS PRINCIPAL
# Version JOUR 43 - Mise à jour complète
# Un seul script pour tout gérer proprement

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
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
    
    # Magic Stack Unified
    if [ -d "$MAGIC_DIR/apps/magic-stack-unified" ]; then
        echo "  Building magic-stack-unified..."
        cd "$MAGIC_DIR/apps/magic-stack-unified"
        npm ci && npm run build
    fi
    
    # World Editor
    if [ -d "$MAGIC_DIR/apps/world-editor" ]; then
        echo "  Building world-editor..."
        cd "$MAGIC_DIR/apps/world-editor"
        npm ci && npm run build
    fi
    
    echo -e "${GREEN}✅ Frontend builds OK${NC}"
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
    echo -e "${BLUE}═══════════════════════════════════════${NC}"
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
        echo -e "${CYAN}🦀 Démarrage Rust (3001)...${NC}"
        cd "$MAGIC_DIR/backends/rust"
        if [ -f "target/release/magic-stack-server" ]; then
            RUST_PORT=3001 ./target/release/magic-stack-server > "$MAGIC_DIR/logs/rust.log" 2>&1 &
        else
            RUST_PORT=3001 cargo run --release > "$MAGIC_DIR/logs/rust.log" 2>&1 &
        fi
        sleep 2
        check_port 3001 && echo -e "${GREEN}✅ Rust démarré${NC}" || echo -e "${RED}❌ Rust échec${NC}"
    else
        echo -e "${GREEN}✅ Rust déjà actif (3001)${NC}"
    fi
}

start_java() {
    if ! check_port 8082; then
        echo -e "${CYAN}☕ Démarrage Java (8082)...${NC}"
        cd "$MAGIC_DIR/backends/java"
        # Utiliser le JAR s'il existe
        if [ -f "target/magic-stack-backend-1.0.0-APOLLO.jar" ]; then
            RUST_BASE_URL=http://localhost:3001 java -jar target/magic-stack-backend-1.0.0-APOLLO.jar > "$MAGIC_DIR/logs/java.log" 2>&1 &
        else
            RUST_BASE_URL=http://localhost:3001 mvn spring-boot:run > "$MAGIC_DIR/logs/java.log" 2>&1 &
        fi
        sleep 3
        check_port 8082 && echo -e "${GREEN}✅ Java démarré${NC}" || echo -e "${RED}❌ Java échec${NC}"
    else
        echo -e "${GREEN}✅ Java déjà actif (8082)${NC}"
    fi
}

start_unified() {
    if ! check_port 5176; then
        echo -e "${CYAN}⚛️ Démarrage React UNIFIED (5176)...${NC}"
        cd "$MAGIC_DIR/apps/magic-stack-unified"
        npm run dev > "$MAGIC_DIR/logs/frontend_unified.log" 2>&1 &
        sleep 3
        check_port 5176 && echo -e "${GREEN}✅ Unified démarré${NC}" || echo -e "${RED}❌ Unified échec${NC}"
    else
        echo -e "${GREEN}✅ Unified déjà actif (5176)${NC}"
    fi
}

start_world_editor() {
    if ! check_port 5173; then
        echo -e "${CYAN}🗺️ Démarrage WorldEditor (5173)...${NC}"
        cd "$MAGIC_DIR/apps/world-editor"
        npm run dev > "$MAGIC_DIR/logs/world_editor.log" 2>&1 &
        sleep 3
        check_port 5173 && echo -e "${GREEN}✅ WorldEditor démarré${NC}" || echo -e "${RED}❌ WorldEditor échec${NC}"
    else
        echo -e "${GREEN}✅ WorldEditor déjà actif (5173)${NC}"
    fi
}

start_python() {
    echo -e "${CYAN}🐍 Démarrage services Python...${NC}"
    
    # Vector DB (5000)
    if ! check_port 5000; then
        if [ -f "$MAGIC_DIR/backends/python/vector_db.py" ]; then
            cd "$MAGIC_DIR/backends/python"
            python3 vector_db.py > "$MAGIC_DIR/logs/vector.log" 2>&1 &
            sleep 2
            echo -e "  ${GREEN}✓${NC} Vector DB lancé (5000)"
        fi
    else
        echo -e "  ${GREEN}✓${NC} Vector DB déjà actif (5000)"
    fi
    
    # Clippy (7777)
    if ! check_port 7777; then
        if [ -f "$MAGIC_DIR/clippy_dev_server.py" ]; then
            cd "$MAGIC_DIR"
            python3 clippy_dev_server.py > "$MAGIC_DIR/logs/clippy.log" 2>&1 &
            sleep 2
            echo -e "  ${GREEN}✓${NC} Clippy lancé (7777)"
        fi
    else
        echo -e "  ${GREEN}✓${NC} Clippy déjà actif (7777)"
    fi
}

start_html_server() {
    if ! check_port 8000; then
        echo -e "${CYAN}🌐 Démarrage serveur HTML (8000)...${NC}"
        cd "$MAGIC_DIR"
        python3 html_server.py > "$MAGIC_DIR/logs/html_server.log" 2>&1 &
        sleep 2
        check_port 8000 && echo -e "${GREEN}✅ HTML Server démarré${NC}" || echo -e "${RED}❌ HTML Server échec${NC}"
    else
        echo -e "${GREEN}✅ HTML Server déjà actif (8000)${NC}"
    fi
}

start_all() {
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    echo -e "${BLUE}   🚀 DÉMARRAGE TOUS SERVICES${NC}"
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    echo ""
    mkdir -p "$MAGIC_DIR/logs"
    
    echo -e "${MAGENTA}⚙️  Backends principaux:${NC}"
    start_rust
    start_java
    
    echo ""
    echo -e "${MAGENTA}🐍 Services Python:${NC}"
    start_python
    
    echo ""
    echo -e "${MAGENTA}🎨 Frontend:${NC}"
    start_unified
    start_world_editor
    start_html_server
    
    echo ""
    echo -e "${GREEN}⏳ Attente du démarrage complet...${NC}"
    sleep 3
    
    echo ""
    show_status
    echo ""
    echo -e "${GREEN}✨ Système prêt!${NC}"
    echo -e "${CYAN}🌐 Accès: http://localhost:8000/FRONTPAGE/index.html${NC}"
    echo -e "${CYAN}🎮 Jeu: http://localhost:5176/unified${NC}"
}

# ═══════════════════════════════════════════════════════════════════
# ARRÊT
# ═══════════════════════════════════════════════════════════════════

stop_all() {
    echo -e "${RED}🛑 Arrêt de tous les services...${NC}"
    
    # Arrêt propre
    pkill -f "magic-stack-server"
    pkill -f "cargo run"
    pkill -f "magic-stack-backend"
    pkill -f "spring-boot:run"
    pkill -f "npm run dev"
    pkill -f "vite"
    pkill -f "python3.*html_server"
    pkill -f "python3.*vector_db"
    pkill -f "python3.*clippy"
    
    echo -e "${GREEN}✅ Tous les services arrêtés${NC}"
}

# ═══════════════════════════════════════════════════════════════════
# DEPLOY VPS
# ═══════════════════════════════════════════════════════════════════

deploy_vps() {
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    echo -e "${BLUE}    🚀 DEPLOY VPS RAPIDE${NC}"
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    
    # Test SSH
    echo -e "${CYAN}📡 Test connexion SSH...${NC}"
    if ssh -i ~/.ssh/hot_magic_key root@191.101.2.178 "echo 'SSH OK'" >/dev/null 2>&1; then
        echo -e "${GREEN}✅ SSH OK${NC}"
    else
        echo -e "${RED}❌ Erreur SSH - vérifiez la clé${NC}"
        return 1
    fi
    
    # Sync FRONTPAGE
    echo -e "${CYAN}📤 Sync FRONTPAGE...${NC}"
    rsync -avz --delete \
        -e "ssh -i ~/.ssh/hot_magic_key" \
        "$MAGIC_DIR/FRONTPAGE/" \
        root@191.101.2.178:/opt/hot/app/magic-stack/FRONTPAGE/
    
    # Sync HTML files
    echo -e "${CYAN}📤 Sync HTML files...${NC}"
    rsync -avz \
        -e "ssh -i ~/.ssh/hot_magic_key" \
        --include="*.html" \
        --exclude="*" \
        "$MAGIC_DIR/" \
        root@191.101.2.178:/opt/hot/app/magic-stack/
    
    echo -e "${GREEN}✅ Deploy VPS terminé!${NC}"
    echo -e "${CYAN}🌐 Voir: https://heroesoftime.online${NC}"
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
    check_port 3001 && echo -e "  ${GREEN}✅${NC} Rust (3001) - Moteur temporel" || echo -e "  ${RED}❌${NC} Rust (3001)"
    check_port 8082 && echo -e "  ${GREEN}✅${NC} Java (8082) - Orchestrateur" || echo -e "  ${RED}❌${NC} Java (8082)"
    
    echo ""
    echo -e "${CYAN}🐍 Services Python:${NC}"
    check_port 5000 && echo -e "  ${GREEN}✅${NC} Vector DB (5000)" || echo -e "  ${YELLOW}⚪${NC} Vector DB (5000)"
    check_port 7777 && echo -e "  ${GREEN}✅${NC} Clippy IA (7777)" || echo -e "  ${YELLOW}⚪${NC} Clippy IA (7777)"
    
    echo ""
}

# ═══════════════════════════════════════════════════════════════════
# RACCOURCIS UI
# ═══════════════════════════════════════════════════════════════════

open_game() {
    start_unified
    open "http://localhost:5176/unified"
}

open_spells() {
    start_html_server
    open "http://localhost:8000/FRONTPAGE/spells-lab.html"
}

open_combat() {
    start_html_server
    open "http://localhost:8000/IA_VS_IA_AUTOPLAY.html"
}

open_chasse() {
    start_html_server
    open "http://localhost:8000/CHASSE_TEMPORELLE_MEGA_MAP.html"
}

open_api() {
    start_all
    open "http://localhost:8000/API_EXPLORER_COMPLETE.html"
}

# ═══════════════════════════════════════════════════════════════════
# HEALTHCHECK
# ═══════════════════════════════════════════════════════════════════

health_check() {
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    echo -e "${BLUE}     🏥 HEALTH CHECK${NC}"
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    echo ""
    
    echo -e "${CYAN}Local services:${NC}"
    for PORT in 3001 5000 5173 5176 7777 8000 8082; do
        if check_port $PORT; then
            echo -e "  ${GREEN}✅${NC} Port $PORT actif"
        else
            echo -e "  ${RED}❌${NC} Port $PORT inactif"
        fi
    done
    
    echo ""
    echo -e "${CYAN}API Tests:${NC}"
    
    # Test Rust
    if curl -s http://localhost:3001/health >/dev/null 2>&1; then
        echo -e "  ${GREEN}✅${NC} Rust API OK"
    else
        echo -e "  ${RED}❌${NC} Rust API KO"
    fi
    
    # Test Java
    if curl -s http://localhost:8082/api/health >/dev/null 2>&1; then
        echo -e "  ${GREEN}✅${NC} Java API OK"
    else
        echo -e "  ${RED}❌${NC} Java API KO"
    fi
}

vps_check() {
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    echo -e "${BLUE}    🌐 VPS HEALTH CHECK${NC}"
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    echo ""
    echo "Checking heroesoftime.online..."
    echo ""
    
    for URL in \
        "https://heroesoftime.online/" \
        "https://heroesoftime.online/FRONTPAGE/spells-lab.html" \
        "https://heroesoftime.online/api/health" \
        "https://heroesoftime.online/magic-stack-unified/" \
        "https://heroesoftime.online/world-editor/"
    do
        CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
        if [ "$CODE" = "200" ]; then
            printf "  ${GREEN}✅${NC} [%3s] %s\n" "$CODE" "$URL"
        elif [ "$CODE" = "404" ]; then
            printf "  ${YELLOW}⚠️${NC}  [%3s] %s\n" "$CODE" "$URL"
        else
            printf "  ${RED}❌${NC} [%3s] %s\n" "$CODE" "$URL"
        fi
    done
    echo ""
}

vps_status() {
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    echo -e "${BLUE}    📊 VPS SERVICES STATUS${NC}"
    echo -e "${BLUE}═══════════════════════════════════${NC}"
    echo ""
    
    # Test SSH connection first
    if ! ssh -i ~/.ssh/hot_vps_key -o ConnectTimeout=5 root@191.101.2.178 "echo 'SSH OK'" >/dev/null 2>&1; then
        echo -e "${RED}❌ SSH connection failed${NC}"
        echo "Make sure VPS is accessible and SSH key is configured"
        return 1
    fi
    
    echo -e "${CYAN}🔧 Services Status:${NC}"
    ssh -i ~/.ssh/hot_vps_key root@191.101.2.178 '
        for service in magic-java magic-rust magic-vector magic-clippy caddy magic-mcp; do
            if systemctl is-active --quiet $service; then
                echo -e "  ✅ $service (active)"
            else
                echo -e "  ❌ $service (inactive)"
            fi
        done
    '
    
    echo ""
    echo -e "${CYAN}📡 API Endpoints:${NC}"
    ssh -i ~/.ssh/hot_vps_key root@191.101.2.178 '
        # Test Java backend
        if curl -s http://localhost:8082/api/health >/dev/null 2>&1; then
            echo -e "  ✅ Java Backend (8082)"
        else
            echo -e "  ❌ Java Backend (8082)"
        fi
        
        # Test Rust backend
        if curl -s http://localhost:3001/health >/dev/null 2>&1; then
            echo -e "  ✅ Rust Backend (3001)"
        else
            echo -e "  ❌ Rust Backend (3001)"
        fi
        
        # Test Vector DB
        if curl -s http://localhost:7500/health >/dev/null 2>&1; then
            echo -e "  ✅ Vector DB (7500)"
        else
            echo -e "  ❌ Vector DB (7500)"
        fi
        
        # Test Clippy LLM
        if curl -s http://localhost:7501/health >/dev/null 2>&1; then
            echo -e "  ✅ Clippy LLM (7501)"
        else
            echo -e "  ❌ Clippy LLM (7501)"
        fi
        
        # Test MCP Server
        if curl -s http://localhost:9000/health >/dev/null 2>&1; then
            echo -e "  ✅ MCP Server (9000)"
        else
            echo -e "  ❌ MCP Server (9000)"
        fi
        
        # Test worldDiff endpoint
        if curl -s http://localhost:8082/api/visibility/worldDiff >/dev/null 2>&1; then
            echo -e "  ✅ WorldDiff API"
        else
            echo -e "  ❌ WorldDiff API"
        fi
    '
    
    echo ""
    echo -e "${CYAN}💾 System Info:${NC}"
    ssh -i ~/.ssh/hot_vps_key root@191.101.2.178 '
        echo -e "  📊 Load: $(uptime | cut -d":" -f4-)"
        echo -e "  💾 Memory: $(free -h | grep Mem | awk "{print \$3\"/\"\$2}")"
        echo -e "  💿 Disk: $(df -h / | tail -1 | awk "{print \$3\"/\"\$2\" (\"\$5\" used)\"}")"
        echo -e "  🕐 Uptime: $(uptime -p)"
    '
    echo ""
}

# ═══════════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════════

case "$1" in
    # COMPILATION
    "compile"|"build")
        compile_all
        ;;
    
    # TESTS
    "test")
        test_all
        ;;
    
    # DEPLOY
    "deploy"|"vps")
        deploy_vps
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
    
    "health"|"h")
        health_check
        ;;
    
    "vps-check"|"vc")
        vps_check
        ;;
    
    "vps-status"|"vs")
        vps_status
        ;;
    
    # UI SHORTCUTS
    "game"|"g")
        open_game
        ;;
    
    "spells"|"spell")
        open_spells
        ;;
    
    "combat")
        open_combat
        ;;
    
    "chasse")
        open_chasse
        ;;
    
    "api")
        open_api
        ;;
    
    "unified"|"u")
        start_unified
        open "http://localhost:5176/unified"
        ;;
    
    "we"|"world-editor"|"editor")
        start_world_editor
        open "http://localhost:5173"
        ;;
    
    "front"|"frontpage"|"fp")
        start_html_server
        open "http://localhost:8000/FRONTPAGE/index.html"
        ;;
    
    "html")
        start_html_server
        open "http://localhost:8000/HTML_INDEX.html"
        ;;
    
    # Services individuels
    "rust")
        start_rust
        ;;
    
    "java")
        start_java
        ;;
    
    "python")
        start_python
        ;;
    
    # HELP (et cas par défaut)
    "help"|"--help"|"-h"|"")
        echo -e "${MAGENTA}═══════════════════════════════════${NC}"
        echo -e "${MAGENTA}    🎮 MAGIC STACK GO - JOUR 43${NC}"
        echo -e "${MAGENTA}═══════════════════════════════════${NC}"
        echo ""
        echo -e "${CYAN}🚀 Commandes principales:${NC}"
        echo "  ./go start      - Démarre TOUS les services"
        echo "  ./go stop       - Arrête tout"
        echo "  ./go restart    - Redémarre tout"
        echo "  ./go status     - État des services [alias: s]"
        echo "  ./go health     - Test complet des APIs [alias: h]"
        echo "  ./go vps-status - Status services VPS [alias: vs]"
        echo ""
        echo -e "${CYAN}🔨 Build & Deploy:${NC}"
        echo "  ./go compile    - Compile tout (Rust + Java + React)"
        echo "  ./go test       - Lance tous les tests"
        echo "  ./go deploy     - Deploy sur VPS [alias: vps]"
        echo "  ./go vps-check  - Check santé du VPS [alias: vc]"
        echo ""
        echo -e "${CYAN}🎯 Accès rapide:${NC}"
        echo "  ./go game       - Jeu unifié [alias: g]"
        echo "  ./go spells     - Laboratoire de sorts 🧪"
        echo "  ./go combat     - Combat IA vs IA ⚔️"
        echo "  ./go chasse     - Chasse temporelle 🕐"
        echo "  ./go api        - API Explorer 📡"
        echo "  ./go front      - Page d'accueil [alias: fp]"
        echo "  ./go we         - World Editor [alias: editor]"
        echo "  ./go html       - Index tous les HTML"
        echo ""
        echo -e "${CYAN}🔧 Services individuels:${NC}"
        echo "  ./go rust       - Démarre seulement Rust (3001)"
        echo "  ./go java       - Démarre seulement Java (8082)"
        echo "  ./go python     - Démarre services Python (5000, 7777)"
        echo ""
        echo -e "${CYAN}📍 Ports actuels:${NC}"
        echo "  3001 - Rust (moteur temporel)"
        echo "  5000 - Python Vector DB"
        echo "  5173 - World Editor React"
        echo "  5176 - Unified App React"
        echo "  7777 - Clippy IA Helper"
        echo "  8000 - HTML Server"
        echo "  8082 - Java Spring Boot"
        echo ""
        echo -e "${CYAN}🔑 SSH VPS:${NC}"
        echo "  ssh -i ~/.ssh/hot_magic_key root@191.101.2.178"
        echo ""
        echo -e "${GREEN}📚 Docs: ./DEVOPS.md${NC}"
        ;;
    
    *)
        echo -e "${RED}❌ Commande inconnue: $1${NC}"
        echo ""
        $0 help
        ;;
esac