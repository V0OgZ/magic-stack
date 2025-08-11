#!/bin/bash

# MAGIC STACK GO - UN SEUL SCRIPT DÉFINITIF!
# 1 seul serveur React (5175) qui sert TOUT

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Vérifier port
check_port() {
    nc -z localhost $1 2>/dev/null
}

# Lancer l'app si nécessaire
ensure_app() {
    if ! check_port 5175; then
        echo "Lancement app..."
        cd /Volumes/HOT_DEV/Magic/magic-stack/apps/magic-stack-unified
        npm run dev &
        sleep 3
    fi
}

case "$1" in
    "status"|"s")
        echo "STATUT:"
        check_port 5175 && echo "✅ App React (5175)" || echo "❌ App React (5175)"
        check_port 3001 && echo "✅ Rust (3001)" || echo "❌ Rust (3001)"
        check_port 8080 && echo "✅ Java (8080)" || echo "❌ Java (8080)"
        ;;
        
    "game"|"g")
        ensure_app
        open "http://localhost:5175/unified"
        ;;
        
    "admin"|"a")
        ensure_app
        open "http://localhost:5175/dashboard.html"
        ;;
        
    "combat"|"c")
        ensure_app
        open "http://localhost:5175/combat"
        ;;
        
    "stop")
        pkill -f "npm run dev"
        echo "✅ Arrêté"
        ;;
        
    *)
        echo "Usage: ./go [game|admin|combat|status|stop]"
        ;;
esac