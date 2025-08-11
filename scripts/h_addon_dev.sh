#!/bin/bash

# ADDON pour le script h - Commandes MODE DEV

# Pour intégrer dans h, ajouter ces cases dans le switch principal:

cat << 'EOF'

# À ajouter dans le switch case de h:

        6|dev)
            echo -e "${BLUE}🔧 MODE DEV - Lance tout et évite les conflits${NC}"
            echo ""
            echo "Ce mode lance:"
            echo "  - Rust (3001)"
            echo "  - Java (8080)"
            echo "  - Vector DB (7500)"
            echo "  - LLM Clippy (7501)"
            echo ""
            echo "Les ports frontend restent libres:"
            echo "  - UI (5002)"
            echo "  - Game (3002)"
            echo "  - WS (8002)"
            echo ""
            if [ -f scripts/LANCE_TOUT_MODE_DEV.sh ]; then
                chmod +x scripts/LANCE_TOUT_MODE_DEV.sh
                ./scripts/LANCE_TOUT_MODE_DEV.sh
            else
                echo -e "${RED}Script non trouvé${NC}"
            fi
            ;;
        
        96|pages)
            echo -e "${CYAN}🎮 TOUTES LES PAGES HTML DISPONIBLES${NC}"
            echo ""
            echo "JEUX PRINCIPAUX:"
            echo "  open CHASSE_TEMPORELLE_MEGA_MAP.html"
            echo "  open HOMM3_PWA_IPAD_CLIPPY.html"
            echo "  open HOT_GAME_UNIFIED.html"
            echo ""
            echo "OUTILS:"
            echo "  open API_EXPLORER_COMPLETE.html"
            echo "  open VECTOR_DB_EXPLORER_UI.html"
            echo ""
            echo "Voir TOUTES_LES_PAGES_MAGIC_STACK.md pour la liste complète"
            ;;
        
        97|stop-dev)
            echo -e "${RED}🛑 ARRÊT MODE DEV${NC}"
            if [ -f scripts/STOP_TOUT_MODE_DEV.sh ]; then
                chmod +x scripts/STOP_TOUT_MODE_DEV.sh
                ./scripts/STOP_TOUT_MODE_DEV.sh
            else
                echo "Arrêt par ports..."
                lsof -ti:7500 | xargs kill -9 2>/dev/null
                lsof -ti:7501 | xargs kill -9 2>/dev/null
                lsof -ti:3001 | xargs kill -9 2>/dev/null
                lsof -ti:8080 | xargs kill -9 2>/dev/null
                echo "✅ Services arrêtés"
            fi
            ;;

# Et ajouter dans le menu:
#   echo -e "  ${CYAN}[6]${NC} 🔧 MODE DEV (lance tout + évite conflits)"
#   echo -e "  ${CYAN}[96]${NC} 🎮 Lister toutes les pages HTML"
#   echo -e "  ${CYAN}[97]${NC} 🛑 Arrêt MODE DEV (kill propre)"

EOF

echo ""
echo "📝 Instructions pour intégrer dans h:"
echo ""
echo "1. Ouvrir le fichier h"
echo "2. Trouver le switch case principal"
echo "3. Ajouter les cases 6, 96 et 97"
echo "4. Ajouter les lignes dans le menu"
echo ""
echo "Ou exécuter: ./scripts/integrate_dev_commands.sh"
