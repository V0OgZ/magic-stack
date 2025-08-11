#!/bin/bash

# 📎 Script pour lancer Clippy/Memento en background

echo "╔══════════════════════════════════════════════════════════╗"
echo "║           📎 CLIPPY/MEMENTO - Heroes of Time              ║"
echo "║              Model: all-MiniLM-L6-v2 (ultra-léger)        ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

PORT=7777
PASSWORD="memento jean"

# Vérifier si déjà lancé
if lsof -i :$PORT > /dev/null 2>&1; then
    echo "⚠️  Clippy déjà actif sur port $PORT"
    echo ""
    echo "Pour l'arrêter:"
    echo "  kill \$(lsof -t -i:$PORT)"
    exit 1
fi

# Créer dossier logs si nécessaire
mkdir -p logs

echo "🧠 Lancement de Clippy/Memento..."
echo "   Port: $PORT"
echo "   Password: $PASSWORD"
echo ""

# Lancer en background
nohup python3 clippy_memento_server.py > logs/clippy_memento.log 2>&1 &
PID=$!
echo $PID > .clippy.pid

sleep 3

# Vérifier que c'est bien lancé
if lsof -i :$PORT > /dev/null 2>&1; then
    echo "✅ Clippy/Memento actif ! (PID: $PID)"
    echo ""
    echo "📝 TESTS RAPIDES:"
    echo ""
    
    # Test health
    echo "1️⃣ Test santé..."
    curl -s http://localhost:$PORT/health | jq '.' 2>/dev/null || echo "❌ Erreur health"
    
    echo ""
    echo "2️⃣ Test chat..."
    curl -s -X POST http://localhost:$PORT/chat \
        -H "Authorization: Bearer $PASSWORD" \
        -H "Content-Type: application/json" \
        -d '{"query": "aide"}' | jq '.response' 2>/dev/null || echo "❌ Erreur chat"
    
    echo ""
    echo "═══════════════════════════════════════════════════════"
    echo "📎 CLIPPY PRÊT !"
    echo "═══════════════════════════════════════════════════════"
    echo ""
    echo "UTILISATION:"
    echo ""
    echo "# Chat simple"
    echo "curl -X POST http://localhost:$PORT/chat \\"
    echo "  -H \"Authorization: Bearer $PASSWORD\" \\"
    echo "  -H \"Content-Type: application/json\" \\"
    echo "  -d '{\"query\": \"Qui est Merlin ?\"}'"
    echo ""
    echo "# Voir la mémoire"
    echo "curl -H \"Authorization: Bearer $PASSWORD\" \\"
    echo "  http://localhost:$PORT/memory"
    echo ""
    echo "LOGS: tail -f logs/clippy_memento.log"
    echo "STOP: kill \$(cat .clippy.pid)"
    echo ""
else
    echo "❌ Échec du lancement !"
    echo "Voir: tail logs/clippy_memento.log"
    exit 1
fi
