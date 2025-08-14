#!/bin/bash

# 🚀 DÉMARRAGE RAPIDE - MAGIC STACK
# Fix du chemin pour le frontend React

echo "🎮 MAGIC STACK - Démarrage Rapide"
echo "=================================="

# Frontend React (chemin corrigé)
echo "📱 Démarrage du frontend React..."
cd apps/magic-stack-unified && npm run dev &

# Backend Rust (optionnel)
echo "🦀 Démarrage du backend Rust..."
cd ../.. && cargo run &

# Vector DB Python (optionnel)
echo "🐍 Démarrage de la Vector DB..."
python boost_backstories_vector_db.py &

echo ""
echo "✅ Services démarrés !"
echo ""
echo "🌐 Ouvrez: http://localhost:5173"
echo ""
echo "Pour arrêter: CTRL+C"

wait
