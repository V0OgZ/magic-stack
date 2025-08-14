#!/bin/bash
# Test de l'intégration VectorDB dans le backend Rust

echo "🔍 Test de l'intégration VectorDB dans le backend Rust"
echo "=================================================="

# Vérifier que le serveur Rust tourne
echo -e "\n📡 Vérification du serveur Rust..."
if curl -s http://localhost:3001/health > /dev/null; then
    echo "✅ Serveur Rust actif sur port 3001"
else
    echo "❌ Serveur Rust non accessible. Lancement..."
    cd backends/rust
    nohup cargo run --release > ../../logs/rust_server.log 2>&1 &
    echo "⏳ Attente du démarrage..."
    sleep 3
fi

# Test 1: Status des indexes
echo -e "\n📊 Test 1: Status des indexes VectorDB"
echo "--------------------------------------"
curl -s http://localhost:3001/api/archives/status | jq '.'

# Test 2: Recherche dans le mode "story"
echo -e "\n🔍 Test 2: Recherche mode STORY (lore du jeu)"
echo "---------------------------------------------"
curl -s -X POST http://localhost:3001/api/archives/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Memento tatouages interstice",
    "mode": "story",
    "top_k": 3
  }' | jq '.results[] | {score, file: .file | split("/") | last, preview: (.content | .[0:100] + "...")}'

# Test 3: Recherche dans le mode "dev"
echo -e "\n💻 Test 3: Recherche mode DEV (documentation technique)"
echo "-------------------------------------------------------"
curl -s -X POST http://localhost:3001/api/archives/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "orchestrator intent processing",
    "mode": "dev",
    "top_k": 3
  }' | jq '.results[] | {score, file: .file | split("/") | last, preview: (.content | .[0:100] + "...")}'

# Test 4: Recherche avec filtres
echo -e "\n🎯 Test 4: Recherche avec filtres"
echo "---------------------------------"
curl -s -X POST http://localhost:3001/api/archives/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "temporal mechanics",
    "mode": "dev",
    "top_k": 5,
    "filters": {
      "type": "markdown"
    }
  }' | jq '.total, (.results | length)'

echo -e "\n✅ Tests d'intégration terminés!"
echo "================================"
echo ""
echo "📝 Notes:"
echo "- Les endpoints archives_* utilisent maintenant le bridge Python local"
echo "- Pas besoin de serveur Python séparé sur port 5000"
echo "- Les indexes FAISS sont chargés directement depuis vector-store/"
echo "- Performance: <100ms par recherche grâce à FAISS"
