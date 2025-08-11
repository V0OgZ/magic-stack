#!/bin/bash

# Client de test pour Clippy/Memento

PORT=7777
PASSWORD="memento jean"
BASE_URL="http://localhost:$PORT"

echo "📎 TEST CLIENT CLIPPY/MEMENTO"
echo "================================"
echo ""

# Fonction pour faire une requête
ask_clippy() {
    local question="$1"
    echo "❓ Question: $question"
    echo ""
    
    response=$(curl -s -X POST "$BASE_URL/chat" \
        -H "Authorization: Bearer $PASSWORD" \
        -H "Content-Type: application/json" \
        -d "{\"query\": \"$question\"}" | jq -r '.response' 2>/dev/null)
    
    if [ $? -eq 0 ]; then
        echo "📎 Réponse:"
        echo "$response"
    else
        echo "❌ Erreur de connexion"
    fi
    echo ""
    echo "---"
    echo ""
}

# Tests automatiques
echo "🧪 TESTS AUTOMATIQUES"
echo "---"
echo ""

ask_clippy "aide"
ask_clippy "Comment fonctionne le système temporel ?"
ask_clippy "Qui est Merlin ?"
ask_clippy "Explique les régulateurs"
ask_clippy "Qu'est-ce que la dérive temporelle ?"

# Voir la mémoire
echo "📚 MÉMOIRE DE SESSION:"
curl -s -H "Authorization: Bearer $PASSWORD" "$BASE_URL/memory" | jq '.memory[-5:]' 2>/dev/null || echo "Pas de mémoire"

echo ""
echo "✅ Tests terminés !"
