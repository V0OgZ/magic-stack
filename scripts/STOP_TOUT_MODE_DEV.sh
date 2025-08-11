#!/bin/bash

# 🛑 ARRÊTE TOUS LES SERVICES

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${RED}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${RED}║        🛑 ARRÊT DE TOUS LES SERVICES               ║${NC}"
echo -e "${RED}╚════════════════════════════════════════════════════╝${NC}"
echo ""

# Lire les PIDs sauvegardés
if [ -f /tmp/magic_stack_pids.txt ]; then
    source /tmp/magic_stack_pids.txt
    
    echo -e "${YELLOW}Arrêt Vector DB (PID: $VECTOR_DB)...${NC}"
    kill $VECTOR_DB 2>/dev/null || echo "Déjà arrêté"
    
    echo -e "${YELLOW}Arrêt LLM Clippy (PID: $LLM_CLIPPY)...${NC}"
    kill $LLM_CLIPPY 2>/dev/null || echo "Déjà arrêté"
    
    echo -e "${YELLOW}Arrêt Rust Backend (PID: $RUST_BACKEND)...${NC}"
    kill $RUST_BACKEND 2>/dev/null || echo "Déjà arrêté"
    
    echo -e "${YELLOW}Arrêt Java Backend (PID: $JAVA_BACKEND)...${NC}"
    kill $JAVA_BACKEND 2>/dev/null || echo "Déjà arrêté"
else
    echo -e "${YELLOW}Pas de PIDs sauvegardés, arrêt par ports...${NC}"
    
    # Arrêt par ports
    lsof -ti:7500 | xargs kill -9 2>/dev/null || true
    lsof -ti:7501 | xargs kill -9 2>/dev/null || true
    lsof -ti:3001 | xargs kill -9 2>/dev/null || true
    lsof -ti:8080 | xargs kill -9 2>/dev/null || true
fi

# Nettoyage
rm -f /tmp/magic_stack_pids.txt

echo ""
echo -e "${GREEN}✅ Tous les services sont arrêtés${NC}"
echo ""
echo "Ports libérés:"
echo "  - 7500 (Vector DB)"
echo "  - 7501 (LLM Clippy)"
echo "  - 3001 (Rust Backend)"
echo "  - 8080 (Java Backend)"
