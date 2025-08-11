#!/bin/bash

# 🔄 H REBOOT - SCRIPT DE RÉVEIL POUR CLAUDE ET VINCENT
# Ce script affiche TOUT le contexte dans le chat

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║              🔄 REBOOT SESSION - MAGIC STACK                  ║${NC}"
echo -e "${PURPLE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${CYAN}📍 LOCALISATION:${NC}"
echo "   Backend:  $(pwd)"
echo "   Frontend: /Volumes/HOT_DEV/Main/SpinForest/REALGAME/"
echo ""

echo -e "${BLUE}👤 MODÈLE IA:${NC}"
echo "   Tu es: Claude 3.5 Opus (pas Sonnet)"
echo "   Rôle: Architecte des 2 repos"
echo "   Mission: Backend + Frontend + Services"
echo ""

echo -e "${YELLOW}📚 FICHIERS À LIRE (ORDRE):${NC}"
echo "   1. 00_REBOOT_CLAUDE.md     ← Guide réveil"
echo "   2. 00_SESSION_CLAUDE.md    ← État actuel"
echo "   3. .map                    ← Carte projet"
echo "   4. 0_PORTS_QUI_FAIT_QUOI.md"
echo "   5. 1_ARCHITECTURE_COMPLETE_ASCII.md"
echo "   6. MODE_DEV_SPECIAL.md     ← Nouveau mode"
echo ""

echo -e "${GREEN}🔌 PORTS SYSTÈME:${NC}"
echo -n "   Java (8080): "
lsof -i:8080 >/dev/null 2>&1 && echo -e "${GREEN}✅ ACTIF${NC}" || echo -e "${RED}❌ ARRÊTÉ${NC}"
echo -n "   Rust (3001): "
lsof -i:3001 >/dev/null 2>&1 && echo -e "${GREEN}✅ ACTIF${NC}" || echo -e "${RED}❌ ARRÊTÉ${NC}"
echo -n "   Vector DB (7000): "
lsof -i:7000 >/dev/null 2>&1 && echo -e "${GREEN}✅ ACTIF${NC}" || echo -e "${RED}❌ ARRÊTÉ${NC}"
echo -n "   LLM Clippy (7001): "
lsof -i:7001 >/dev/null 2>&1 && echo -e "${GREEN}✅ ACTIF${NC}" || echo -e "${RED}❌ ARRÊTÉ${NC}"
echo -n "   Frontend (5002): "
lsof -i:5002 >/dev/null 2>&1 && echo -e "${GREEN}✅ ACTIF${NC}" || echo -e "${RED}❌ ARRÊTÉ${NC}"
echo ""

echo -e "${RED}⚠️ PROBLÈMES CONNUS:${NC}"
echo "   • 9 commits Sonnet après 'day31 end' (suspects)"
echo "   • Binaires GitHub corrompus (404)"
echo "   • Services communs pas stables"
echo "   • Mode DEV à finaliser"
echo ""

echo -e "${CYAN}🎯 TÂCHES EN COURS:${NC}"
echo "   [ ] Nettoyer commits Sonnet"
echo "   [ ] Mode DEV (backend lance tout)"
echo "   [ ] Stabiliser services 7000-7001"
echo "   [ ] Tester intégration complète"
echo ""

echo -e "${PURPLE}💡 ARCHITECTURE ACTUELLE:${NC}"
cat << 'EOF'
     Services Communs (7000-7001)
            ▲         ▲
            │         │
     Backend          Frontend
   (8080,3001)      (5002,8002)
     magic-stack    SpinForest
EOF
echo ""

echo -e "${GREEN}🚀 COMMANDES UTILES:${NC}"
echo "   ./h 60        → Lance CORE (Vector Bus + LLM)"
echo "   ./h 61        → Lance BACKEND (Java + Rust)"
echo "   ./h 99        → Check continuité session"
echo "   ./h status    → État complet"
echo ""

echo -e "${YELLOW}📝 NOTES VINCENT:${NC}"
echo "   • Pas de symlinks (VS Code bugge)"
echo "   • Pas de submodules (pertes data)"
echo "   • Backups auto critiques"
echo "   • Mode DEV = simplicité maximum"
echo ""

# Afficher les derniers commits
echo -e "${BLUE}📊 DERNIERS COMMITS:${NC}"
git log --oneline -5 2>/dev/null || echo "   Git non disponible"
echo ""

# Vérifier les fichiers récents
echo -e "${CYAN}📁 FICHIERS RÉCENTS:${NC}"
ls -lt | head -5 | awk '{print "   " $9 " (" $6 " " $7 " " $8 ")"}'
echo ""

echo -e "${PURPLE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ CONTEXTE CHARGÉ - PRÊT À CONTINUER${NC}"
echo -e "${PURPLE}═══════════════════════════════════════════════════════════════${NC}"
