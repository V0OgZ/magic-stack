#!/bin/bash

echo "🏥 HEALTH CHECK COMPLET - heroesoftime.online"
echo "============================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Compteurs
TOTAL=0
SUCCESS=0
FAILED=0

# Fonction de test
check_url() {
    local url=$1
    local desc=$2
    TOTAL=$((TOTAL + 1))
    
    CODE=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$CODE" = "200" ] || [ "$CODE" = "304" ]; then
        echo -e "${GREEN}✅ $CODE${NC} - $desc"
        echo "     $url"
        SUCCESS=$((SUCCESS + 1))
    elif [ "$CODE" = "404" ]; then
        echo -e "${RED}❌ $CODE${NC} - $desc"
        echo "     $url"
        FAILED=$((FAILED + 1))
    else
        echo -e "${YELLOW}⚠️  $CODE${NC} - $desc"
        echo "     $url"
        FAILED=$((FAILED + 1))
    fi
}

echo "📱 PAGES PRINCIPALES"
echo "-------------------"
check_url "https://heroesoftime.online/" "Page d'accueil racine"
check_url "https://heroesoftime.online/FRONTPAGE/" "FRONTPAGE principale"
check_url "https://heroesoftime.online/FRONTPAGE/index.html" "FRONTPAGE index.html"

echo ""
echo "🎮 JEUX"
echo "-------"
check_url "https://heroesoftime.online/HOT_GAME_UNIFIED.html" "🎮 HOT Game Unified (PRINCIPAL)"
check_url "https://heroesoftime.online/CHASSE_TEMPORELLE_MEGA_MAP.html" "Chasse Temporelle"
check_url "https://heroesoftime.online/IA_VS_IA_AUTOPLAY.html" "Combat IA vs IA"
check_url "https://heroesoftime.online/MULTIPLAYER_DEMO_HOMM3.html" "Multijoueur Demo"
check_url "https://heroesoftime.online/SPECTATOR_GOD_MODE.html" "Mode Spectateur"
check_url "https://heroesoftime.online/HOMM3_PWA_IPAD_CLIPPY.html" "PWA iPad"

echo ""
echo "🛠️ ÉDITEURS"
echo "-----------"
check_url "https://heroesoftime.online/MEGA_EDITOR.html" "Mega Editor"
check_url "https://heroesoftime.online/MAP_EDITOR_6D_ADAPTER.html" "Map Editor 6D"
check_url "https://heroesoftime.online/world-editor/" "World Editor React"
check_url "https://heroesoftime.online/WORKFLOW_MANAGER.html" "Workflow Manager"

echo ""
echo "📚 DOCUMENTATION"
echo "----------------"
check_url "https://heroesoftime.online/MANUEL_DU_JOUEUR_HOT.html" "Manuel du Joueur"
check_url "https://heroesoftime.online/MANUEL_FACILE_EASY_MODE.html" "Manuel Easy Mode"
check_url "https://heroesoftime.online/HTML_INDEX.html" "Dashboard HTML"

echo ""
echo "🔧 OUTILS DEV"
echo "-------------"
check_url "https://heroesoftime.online/API_EXPLORER_COMPLETE.html" "API Explorer"
check_url "https://heroesoftime.online/VECTOR_DB_EXPLORER_UI.html" "Vector DB Explorer UI"
check_url "https://heroesoftime.online/VECTOR_DB_EXPLORER.html" "Vector DB Explorer"
check_url "https://heroesoftime.online/TEST_PORTAILS.html" "Test Portails"
check_url "https://heroesoftime.online/compare-apis.html" "Compare APIs"
check_url "https://heroesoftime.online/test_parity.html" "Test Parity"

echo ""
echo "🎨 ASSETS"
echo "---------"
check_url "https://heroesoftime.online/FRONTPAGE/assets/assets/HD/The%20Temporal%20Judge's%20Command.png" "Image HD (Judge)"
check_url "https://heroesoftime.online/FRONTPAGE/temporal-grammar-dude.html" "Temporal Grammar Page"

echo ""
echo "🔌 BACKENDS APIs"
echo "----------------"
check_url "https://heroesoftime.online/api/health" "Java API Health"
check_url "https://heroesoftime.online/engine/health" "Rust Engine Health"
check_url "https://heroesoftime.online/vector/health" "Vector DB Health"
check_url "https://heroesoftime.online/clippy/health" "Clippy AI Health"

echo ""
echo "============================================="
echo "📊 RÉSULTATS"
echo "============================================="
echo -e "Total testés : $TOTAL"
echo -e "${GREEN}✅ Succès : $SUCCESS${NC}"
echo -e "${RED}❌ Échecs : $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 TOUT EST OPÉRATIONNEL !${NC}"
else
    echo -e "${YELLOW}⚠️  ATTENTION : $FAILED pages ont des problèmes${NC}"
fi

echo ""
echo "============================================="
echo "Fin du health check - $(date)"
