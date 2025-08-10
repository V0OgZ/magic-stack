#!/bin/bash

# 🛑 SCRIPT D'ARRÊT - MAGIC STACK
echo "═══════════════════════════════════════════════════════════════"
echo "🛑 ARRÊT DE TOUS LES SERVICES MAGIC STACK"
echo "═══════════════════════════════════════════════════════════════"

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# Fonction pour tuer un processus
kill_process() {
    if [ -f ".pids/$1.pid" ]; then
        PID=$(cat .pids/$1.pid)
        if kill -0 $PID 2>/dev/null; then
            kill $PID
            echo -e "${GREEN}✅ Service $1 arrêté${NC}"
        else
            echo -e "${RED}⚠️  Service $1 n'était pas actif${NC}"
        fi
        rm .pids/$1.pid
    else
        echo -e "${RED}⚠️  Pas de PID trouvé pour $1${NC}"
    fi
}

# Créer le dossier .pids s'il n'existe pas
mkdir -p .pids

# Arrêter tous les services
kill_process "react"
kill_process "clippy"
kill_process "vector"
kill_process "java"
kill_process "rust"

# Nettoyer les ports si nécessaire
echo ""
echo "Nettoyage des ports..."
lsof -ti:5173 | xargs kill -9 2>/dev/null
lsof -ti:5002 | xargs kill -9 2>/dev/null
lsof -ti:5001 | xargs kill -9 2>/dev/null
lsof -ti:8080 | xargs kill -9 2>/dev/null
lsof -ti:3001 | xargs kill -9 2>/dev/null

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo -e "${GREEN}✅ TOUS LES SERVICES ONT ÉTÉ ARRÊTÉS${NC}"
echo "═══════════════════════════════════════════════════════════════"