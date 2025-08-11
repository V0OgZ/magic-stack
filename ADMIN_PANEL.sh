#!/bin/bash

# 🎛️ ADMIN PANEL - Ouvre toutes les pages d'administration et de test
# Vincent's Ultimate Control Center

echo "🎛️ ADMIN PANEL - OUVERTURE DE TOUTES LES CONSOLES"
echo "=================================================="

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Fonction pour ouvrir une URL
open_url() {
    local url=$1
    local name=$2
    echo -e "${GREEN}🌐 Ouverture: ${CYAN}$name${NC}"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "$url" 2>/dev/null || echo -e "${YELLOW}  ⚠️  Non disponible${NC}"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open "$url" 2>/dev/null || echo -e "${YELLOW}  ⚠️  Non disponible${NC}"
    fi
    sleep 0.5  # Petit délai pour ne pas surcharger
}

# Fonction pour vérifier si un port est ouvert
check_port() {
    nc -z localhost $1 2>/dev/null
    return $?
}

echo -e "\n${MAGENTA}🎮 === APPLICATIONS PRINCIPALES ===${NC}"
echo ""

# 1. UNIFIED MAP SYSTEM
if check_port 5175; then
    open_url "http://localhost:5175/unified" "🎮 Unified Map System"
elif check_port 5176; then
    open_url "http://localhost:5176/unified" "🎮 Unified Map System"
elif check_port 5173; then
    open_url "http://localhost:5173/unified" "🎮 Unified Map System"
else
    echo -e "${YELLOW}⚠️  Unified Map System non lancé (./START_UNIFIED.sh)${NC}"
fi

# Page d'accueil Magic Stack
if check_port 5175; then
    open_url "http://localhost:5175/" "🏠 Magic Stack Home"
fi

echo -e "\n${MAGENTA}🔧 === CONSOLES D'ADMINISTRATION ===${NC}"
echo ""

# 2. VECTOR DB EXPLORER
open_url "file:///Volumes/HOT_DOCS_SHARED/HOT_DEV/docs/V%20-%20VECTOR_DB_ASSETS/VECTOR_DB_EXPLORER.html" "🔍 Vector DB Explorer"

# 3. API EXPLORER
open_url "file:///Volumes/HOT_DEV/Main/SpinForest/REALGAME/adventure/API_EXPLORER_COMPLETE.html" "🔌 API Explorer Complete"

# 4. MEMENTO/CLIPPY
open_url "file:///Volumes/HOT_DEV/Main/SpinForest/REALGAME/MEMENTO_CLIPPY_COMPLETE.html" "📎 Memento Clippy"

# 5. DASHBOARD PRINCIPAL
open_url "file:///Volumes/HOT_DEV/Main/SpinForest/REALGAME/bibliotheque-mystique/VINCENT_DASHBOARD_PRINCIPAL.html" "📊 Dashboard Principal Vincent"

echo -e "\n${MAGENTA}🎨 === ÉDITEURS ET OUTILS ===${NC}"
echo ""

# 6. MAP ICON PLACER (Original HTML)
open_url "file:///Volumes/HOT_DEV/Magic/magic-stack/apps/magic-stack-unified/public/assets/MAP_ICON_PLACER.html" "🗺️ Map Icon Placer (HTML)"
open_url "file:///Volumes/HOT_DEV/Magic/magic-stack/apps/magic-stack-unified/public/assets/MAP_ICON_PLACER_ADVANCED.html" "🗺️ Map Icon Placer Advanced"

# 7. ICON EXPLORER
open_url "file:///Volumes/HOT_DEV/Magic/magic-stack/apps/magic-stack-unified/public/assets/ICON_EXPLORER.html" "🎨 Icon Explorer"

# 8. HOMM3 6D DEMO
open_url "file:///Volumes/HOT_DEV/Main/SpinForest/REALGAME/HOMM3_6D_DEMO.html" "⚔️ HOMM3 6D Demo"

# 9. TEMPORAL ARENA
open_url "file:///Volumes/HOT_DEV/Main/SpinForest/REALGAME/bibliotheque-mystique/ULTIMATE_AI_TEMPORAL_ARENA.html" "🏟️ AI Temporal Arena"

echo -e "\n${MAGENTA}🎮 === JEUX ET DÉMOS ===${NC}"
echo ""

# 10. CHASSE TEMPORELLE (Original)
open_url "file:///Volumes/HOT_DEV/Main/SpinForest/REALGAME/adventure/CHASSE_TEMPORELLE_120x120_ULTIME.html" "🏹 Chasse Temporelle 120x120"

# 11. PWA IPAD CLIPPY
open_url "file:///Volumes/HOT_DEV/Main/SpinForest/REALGAME/HOMM3_PWA_IPAD_CLIPPY.html" "📱 PWA iPad Clippy"

# 12. MULTIPLAYER DEMO
open_url "file:///Volumes/HOT_DEV/Main/SpinForest/REALGAME/HOMM3_MULTIPLAYER_DEMO_4_JOUEURS.html" "🎭 Multiplayer Demo 4 Joueurs"

# 13. TEMPORAL TIME MODE
open_url "file:///Volumes/HOT_DEV/Main/SpinForest/REALGAME/TEMPORAL_TIME_MODE_ULTIME.html" "⏰ Temporal Time Mode"

echo -e "\n${MAGENTA}📊 === BACKENDS & SERVICES ===${NC}"
echo ""

# Backends (s'ils sont lancés)
if check_port 8080; then
    open_url "http://localhost:8080/api/health" "☕ Backend Java (8080)"
    open_url "http://localhost:8080/swagger-ui.html" "📚 Swagger UI Java"
fi

if check_port 3001; then
    open_url "http://localhost:3001/health" "🦀 Backend Rust (3001)"
fi

if check_port 5001; then
    open_url "http://localhost:5001/health" "🔍 Vector DB (5001)"
fi

if check_port 7500; then
    open_url "http://localhost:7500/health" "🌐 Service Commun (7500)"
fi

if check_port 7501; then
    open_url "http://localhost:7501/health" "🌐 Service Commun (7501)"
fi

echo -e "\n${MAGENTA}🧪 === TESTS ET CONTRÔLES ===${NC}"
echo ""

# 14. TEST RUNNER
open_url "file:///Volumes/HOT_DEV/Main/SpinForest/REALGAME/HOT_GAME_TEST_RUNNER.html" "🧪 Test Runner"

# 15. LORE EXPLORER
open_url "file:///Volumes/HOT_DEV/Main/SpinForest/REALGAME/bibliotheque-mystique/LORE_EXPLORER.html" "📚 Lore Explorer"

# 16. WORLD EDITOR (si lancé)
if check_port 5005; then
    open_url "http://localhost:5005/" "🌍 World Editor"
fi

echo -e "\n${MAGENTA}📁 === DOCUMENTATION ===${NC}"
echo ""

# Documentation et guides
open_url "file:///Volumes/HOT_DEV/Magic/magic-stack/apps/magic-stack-unified/UNIFIED_MAP_SYSTEM_GUIDE.md" "📖 Guide Unified Map System"
open_url "file:///Volumes/HOT_DEV/Magic/magic-stack/JOUR_34_SUITE_DU_PLAN.md" "📋 Plan Jours 34-39"

echo -e "\n${GREEN}=================================================="
echo -e "✅ TOUTES LES PAGES OUVERTES !"
echo -e "==================================================${NC}"
echo ""
echo -e "${BLUE}📊 Résumé :${NC}"
echo "  • Applications principales lancées"
echo "  • Consoles d'administration ouvertes"
echo "  • Éditeurs et outils disponibles"
echo "  • Jeux et démos accessibles"
echo "  • Backends vérifiés"
echo "  • Tests et contrôles prêts"
echo ""
echo -e "${YELLOW}💡 Tips :${NC}"
echo "  • Gardez cet onglet ouvert pour référence"
echo "  • Utilisez CMD+Tab (Mac) pour naviguer"
echo "  • Les pages non disponibles sont ignorées"
echo "  • Relancez ce script pour rouvrir tout"
echo ""
echo -e "${CYAN}🎮 ADMIN MODE ACTIVÉ - BON CONTRÔLE VINCENT !${NC}"
