#!/bin/bash
# Script de lancement complet du backend avec VectorDB intégré

echo "🚀 Lancement du Backend Magic Stack avec VectorDB intégré"
echo "========================================================="

# Créer les répertoires nécessaires
mkdir -p logs
mkdir -p vector-store

# Arrêter les anciens processus
echo "🔄 Arrêt des anciens processus..."
lsof -ti:3001 | xargs -r kill 2>/dev/null
lsof -ti:3000 | xargs -r kill 2>/dev/null
lsof -ti:8080 | xargs -r kill 2>/dev/null
sleep 1

# Compiler le backend Rust
echo "🔨 Compilation du backend Rust..."
cd backends/rust
cargo build --release 2>&1 | tail -3

# Lancer le serveur Rust
echo "🎮 Lancement du serveur Rust (port 3001)..."
PROJECT_ROOT=../.. nohup cargo run --release >> ../../logs/rust_server.log 2>&1 &
RUST_PID=$!
cd ../..

# Attendre que le serveur démarre
echo "⏳ Attente du démarrage..."
for i in {1..10}; do
    if curl -s http://localhost:3001/health > /dev/null 2>&1; then
        echo "✅ Serveur Rust actif!"
        break
    fi
    sleep 1
done

# Vérifier les indexes VectorDB
echo -e "\n📊 Vérification des indexes VectorDB..."
STATUS=$(curl -s http://localhost:3001/api/archives/status 2>/dev/null)

if echo "$STATUS" | grep -q "story"; then
    echo "✅ Index 'story' disponible"
else
    echo "⚠️  Index 'story' manquant - Lancer LANCE_INDEXATION.sh si nécessaire"
fi

if echo "$STATUS" | grep -q "dev"; then
    echo "✅ Index 'dev' disponible"
else
    echo "⚠️  Index 'dev' manquant - Lancer LANCE_INDEXATION.sh si nécessaire"
fi

# Test rapide de recherche
echo -e "\n🔍 Test de recherche VectorDB..."
SEARCH_RESULT=$(curl -s -X POST http://localhost:3001/api/archives/search \
  -H "Content-Type: application/json" \
  -d '{"query": "Heroes of Time", "mode": "story", "top_k": 1}' 2>/dev/null)

if echo "$SEARCH_RESULT" | grep -q "results"; then
    echo "✅ Recherche VectorDB fonctionnelle!"
else
    echo "⚠️  Problème avec la recherche VectorDB"
fi

echo -e "\n📝 Résumé:"
echo "==========="
echo "✅ Backend Rust: http://localhost:3001"
echo "📊 Logs en temps réel: http://localhost:3001/logs"
echo "🔍 VectorDB intégré directement (pas de serveur Python séparé)"
echo "📚 Explorer VectorDB: Ouvrir VECTOR_DB_EXPLORER.html dans un navigateur"
echo ""
echo "Commandes utiles:"
echo "- Status: curl http://localhost:3001/api/archives/status | jq"
echo "- Logs: tail -f logs/rust_server.log"
echo "- Test: ./TEST_VECTOR_INTEGRATION.sh"
echo ""
echo "PID du serveur Rust: $RUST_PID"
