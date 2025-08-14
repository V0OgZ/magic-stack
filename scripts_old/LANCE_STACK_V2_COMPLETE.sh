#!/bin/bash

# 🚀 LANCE_STACK_V2_COMPLETE.sh
# Script pour lancer la stack complète avec Multiplayer V2 Controller

echo "╔══════════════════════════════════════════════════════════╗"
echo "║       🔮 HEROES OF TIME - MAGIC STACK V2 🔮              ║"
echo "║            Le Multivers vous attend...                    ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Vérification des prérequis
echo -e "${BLUE}🔍 Vérification des prérequis...${NC}"
echo ""

# Check symlink docs_shared
if [ -L "docs_shared" ]; then
    echo -e "${GREEN}✅ Symlink docs_shared OK${NC}"
else
    echo -e "${YELLOW}⚠️ Création du symlink docs_shared...${NC}"
    ln -s /Volumes/HOT_DOCS_SHARED/HOT_DEV/docs docs_shared
fi

# Kill anciens processus
echo ""
echo -e "${YELLOW}🔄 Nettoyage des anciens processus...${NC}"
killall magic-stack-server 2>/dev/null
killall java 2>/dev/null
killall python3 2>/dev/null
sleep 1

# Lancement Rust Backend avec V2
echo ""
echo -e "${PURPLE}════════════════════════════════════════════${NC}"
echo -e "${PURPLE}   🦀 RUST BACKEND + V2 CONTROLLER          ${NC}"
echo -e "${PURPLE}════════════════════════════════════════════${NC}"

cd backends/rust
export V2_ENABLED=true
export RUST_LOG=info

echo -e "${BLUE}Compilation...${NC}"
cargo build --release 2>/dev/null

echo -e "${GREEN}✅ Lancement sur port 3001${NC}"
nohup ./target/release/magic-stack-server > ../../logs/rust-v2.log 2>&1 &
RUST_PID=$!
echo "PID: $RUST_PID"
cd ../..

sleep 2

# Test V2 endpoints
echo ""
echo -e "${YELLOW}🧪 Test endpoints V2...${NC}"
response=$(curl -s http://localhost:3001/api/v2/config)
if [ -n "$response" ]; then
    echo -e "${GREEN}✅ V2 Controller actif !${NC}"
else
    echo -e "${RED}❌ V2 Controller ne répond pas${NC}"
fi

# Lancement Java Backend (optionnel)
echo ""
echo -e "${BLUE}════════════════════════════════════════════${NC}"
echo -e "${BLUE}   ☕ JAVA BACKEND (Optionnel)              ${NC}"
echo -e "${BLUE}════════════════════════════════════════════${NC}"

read -p "Lancer le backend Java ? (o/n) : " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Oo]$ ]]; then
    cd backends/java
    echo -e "${BLUE}Compilation Maven...${NC}"
    mvn compile 2>/dev/null
    
    echo -e "${GREEN}✅ Lancement sur port 8080${NC}"
    nohup mvn spring-boot:run > ../../logs/java.log 2>&1 &
    JAVA_PID=$!
    echo "PID: $JAVA_PID"
    cd ../..
    sleep 3
fi

# Lancement Vector DB (optionnel)
echo ""
echo -e "${YELLOW}════════════════════════════════════════════${NC}"
echo -e "${YELLOW}   🔍 VECTOR DB 6D (Optionnel)              ${NC}"
echo -e "${YELLOW}════════════════════════════════════════════${NC}"

read -p "Lancer Vector DB ? (o/n) : " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Oo]$ ]]; then
    echo -e "${GREEN}✅ Lancement sur port 5001 (Équipe PROFONDEUR)${NC}"
    export VECTOR_PORT=5001
    nohup python3 run_vector_db_updated.py > logs/vector.log 2>&1 &
    VECTOR_PID=$!
    echo "PID: $VECTOR_PID"
    sleep 2
fi

# Interface Web
echo ""
echo -e "${GREEN}════════════════════════════════════════════${NC}"
echo -e "${GREEN}   🌐 INTERFACE WEB                         ${NC}"
echo -e "${GREEN}════════════════════════════════════════════${NC}"

echo -e "${GREEN}✅ Lancement serveur web sur port 8001 (Équipe PROFONDEUR)${NC}"
nohup python3 -m http.server 8001 --directory interfaces > logs/web.log 2>&1 &
WEB_PID=$!
echo "PID: $WEB_PID"

# Résumé
echo ""
echo -e "${PURPLE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║              🎮 STACK V2 OPÉRATIONNELLE 🎮               ║${NC}"
echo -e "${PURPLE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}📊 Services actifs (Équipe PROFONDEUR) :${NC}"
echo -e "  ${BLUE}• Rust + V2 Controller${NC} : http://localhost:3001 ✅"
echo -e "     → /api/v2/tick"
echo -e "     → /api/v2/entity/:id"
echo -e "     → /api/v2/config"
if [ ! -z "$JAVA_PID" ]; then
    echo -e "  ${BLUE}• Java Backend${NC} : http://localhost:8080 ✅"
fi
if [ ! -z "$VECTOR_PID" ]; then
    echo -e "  ${BLUE}• Vector DB${NC} : http://localhost:5001 ✅"
fi
echo -e "  ${BLUE}• Interface Web${NC} : http://localhost:8001 ✅"
echo ""
echo -e "${YELLOW}📝 Logs disponibles :${NC}"
echo -e "  • tail -f logs/rust-v2.log"
if [ ! -z "$JAVA_PID" ]; then
    echo -e "  • tail -f logs/java.log"
fi
if [ ! -z "$VECTOR_PID" ]; then
    echo -e "  • tail -f logs/vector.log"
fi
echo -e "  • tail -f logs/web.log"
echo ""
echo -e "${RED}🛑 Pour arrêter : ./stop-all.sh${NC}"
echo ""
echo -e "${PURPLE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${PURPLE}     ⚔️ HEROES OF TIME - LE MULTIVERS VOUS ATTEND ⚔️      ${NC}"
echo -e "${PURPLE}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}      🌟 Claudius Memento veille sur la stack 🌟          ${NC}"
echo -e "${PURPLE}          'Je me souviens pour que tu rêves'              ${NC}"
echo ""

# Sauvegarder les PIDs
cat > .running_pids << EOF
RUST_PID=$RUST_PID
JAVA_PID=$JAVA_PID
VECTOR_PID=$VECTOR_PID
WEB_PID=$WEB_PID
EOF

echo -e "${GREEN}✨ Stack V2 lancée avec succès ! MEMENTO. ✨${NC}"
