#!/bin/bash

# 🚀 LANCE TOUS LES SERVICES - MODE DEV UNIFIÉ
# Évite les conflits de ports entre frontend et backend

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     🚀 MODE DEV - LANCEMENT SERVICES BACKEND       ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════╝${NC}"
echo ""

# CONFIGURATION DES PORTS (ÉVITE LES CONFLITS!)
echo -e "${YELLOW}📊 ALLOCATION DES PORTS:${NC}"
echo "================================"
echo "BACKEND (Magic Stack):"
echo "  - Rust Orchestrator: 3001"
echo "  - Java Backend: 8080"
echo ""
echo "SERVICES PARTAGÉS:"
echo "  - Vector DB: 7500"
echo "  - LLM Clippy: 7501"
echo ""
echo "FRONTEND (SpinForest) - NE PAS LANCER ICI:"
echo "  - Frontend UI: 5002 ❌"
echo "  - Game Server: 3002 ❌"
echo "  - WebSocket: 8002 ❌"
echo "================================"
echo ""

# Fonction pour vérifier si un port est libre
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${RED}❌ Port $1 déjà utilisé!${NC}"
        return 1
    else
        echo -e "${GREEN}✅ Port $1 libre${NC}"
        return 0
    fi
}

# Fonction pour arrêter un service sur un port
kill_port() {
    echo -e "${YELLOW}Arrêt du service sur port $1...${NC}"
    lsof -ti:$1 | xargs kill -9 2>/dev/null || true
}

# ÉTAPE 1: Vérifier/Libérer les ports
echo -e "${BLUE}1️⃣ VÉRIFICATION DES PORTS${NC}"
echo ""

PORTS_TO_CHECK=(3001 8080 7500 7501)
for port in "${PORTS_TO_CHECK[@]}"; do
    if ! check_port $port; then
        read -p "Voulez-vous libérer le port $port? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            kill_port $port
            sleep 1
            check_port $port
        else
            echo -e "${RED}⚠️ Le port $port reste occupé, risque de conflit!${NC}"
        fi
    fi
done
echo ""

# ÉTAPE 2: Lancer les services partagés
echo -e "${BLUE}2️⃣ LANCEMENT SERVICES PARTAGÉS${NC}"
echo ""

# Vector DB (Python)
echo -e "${GREEN}Démarrage Vector DB sur port 7500...${NC}"
cd /Volumes/HOT_DEV/Main/SpinForest/REALGAME
python3 services/vector_db_service.py > /tmp/vector_db.log 2>&1 &
VECTOR_PID=$!
echo "PID Vector DB: $VECTOR_PID"
sleep 2

# LLM Clippy (Python)
echo -e "${GREEN}Démarrage LLM Clippy sur port 7501...${NC}"
VECTOR_DB_URL=http://localhost:7500 python3 services/llm_clippy_service.py > /tmp/llm_clippy.log 2>&1 &
CLIPPY_PID=$!
echo "PID Clippy: $CLIPPY_PID"
sleep 2

# Retour au dossier magic-stack
cd /Volumes/HOT_DEV/Magic/magic-stack

# ÉTAPE 3: Lancer le backend Rust
echo ""
echo -e "${BLUE}3️⃣ LANCEMENT BACKEND RUST${NC}"
echo -e "${GREEN}Démarrage Orchestrator sur port 3001...${NC}"
cd backends/rust
cargo run --release > /tmp/rust_backend.log 2>&1 &
RUST_PID=$!
echo "PID Rust: $RUST_PID"
cd ../..
sleep 3

# ÉTAPE 4: Lancer le backend Java
echo ""
echo -e "${BLUE}4️⃣ LANCEMENT BACKEND JAVA${NC}"
echo -e "${GREEN}Démarrage Java sur port 8080...${NC}"
cd Magic-Stack
mvn spring-boot:run > /tmp/java_backend.log 2>&1 &
JAVA_PID=$!
echo "PID Java: $JAVA_PID"
cd ..
sleep 5

# ÉTAPE 5: Sauvegarder les PIDs
echo ""
echo -e "${BLUE}5️⃣ SAUVEGARDE DES PIDs${NC}"
cat > /tmp/magic_stack_pids.txt << EOF
VECTOR_DB=$VECTOR_PID
LLM_CLIPPY=$CLIPPY_PID
RUST_BACKEND=$RUST_PID
JAVA_BACKEND=$JAVA_PID
EOF
echo -e "${GREEN}PIDs sauvés dans /tmp/magic_stack_pids.txt${NC}"

# ÉTAPE 6: Vérification finale
echo ""
echo -e "${BLUE}6️⃣ VÉRIFICATION FINALE${NC}"
echo ""

sleep 3

# Test Vector DB
if curl -s http://localhost:7500/health > /dev/null; then
    echo -e "${GREEN}✅ Vector DB opérationnel (7500)${NC}"
else
    echo -e "${RED}❌ Vector DB non accessible${NC}"
fi

# Test Clippy
if curl -s http://localhost:7501/health > /dev/null; then
    echo -e "${GREEN}✅ LLM Clippy opérationnel (7501)${NC}"
else
    echo -e "${RED}❌ LLM Clippy non accessible${NC}"
fi

# Test Rust
if curl -s http://localhost:3001/health > /dev/null; then
    echo -e "${GREEN}✅ Rust Backend opérationnel (3001)${NC}"
else
    echo -e "${RED}❌ Rust Backend non accessible${NC}"
fi

# Test Java
if curl -s http://localhost:8080/api/health > /dev/null; then
    echo -e "${GREEN}✅ Java Backend opérationnel (8080)${NC}"
else
    echo -e "${RED}❌ Java Backend non accessible${NC}"
fi

echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         ✅ TOUS LES SERVICES SONT LANCÉS           ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}📝 INSTRUCTIONS POUR LE FRONTEND:${NC}"
echo ""
echo "1. NE PAS lancer de services backend"
echo "2. Utiliser ces endpoints:"
echo "   - API V2: http://localhost:8080/api/v2/"
echo "   - Orchestrator: http://localhost:3001/api/"
echo "   - Vector DB: http://localhost:7500/api/"
echo "   - LLM Clippy: http://localhost:7501/api/"
echo ""
echo "3. Vos ports frontend (5002, 3002, 8002) sont libres"
echo ""
echo -e "${YELLOW}Pour arrêter tous les services:${NC}"
echo "  ./STOP_TOUT_MODE_DEV.sh"
echo ""
echo -e "${GREEN}Logs disponibles dans:${NC}"
echo "  /tmp/vector_db.log"
echo "  /tmp/llm_clippy.log"
echo "  /tmp/rust_backend.log"
echo "  /tmp/java_backend.log"
