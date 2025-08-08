#!/bin/bash
# 🚀 LANCE TOUTE LA MAGIC STACK
# Par URZ-KÔM - Lance tous les backends + router

echo "╔═══════════════════════════════════════════╗"
echo "║        🔮 MAGIC STACK LAUNCHER 🔮         ║"
echo "╚═══════════════════════════════════════════╝"

# Fonction pour tuer les processus existants
cleanup() {
    echo ""
    echo "🛑 Arrêt de tous les services..."
    pkill -f "spring-boot:run" 2>/dev/null
    pkill -f "magic-stack-core" 2>/dev/null
    pkill -f "magic_router.py" 2>/dev/null
    sleep 2
}

# Nettoyer d'abord
cleanup

# Trap pour nettoyer à la sortie
trap cleanup EXIT

# Préparer logs
mkdir -p logs

# Variables configurables
JAVA_PORT=${JAVA_PORT:-8082}
RUST_PORT=${RUST_PORT:-3001}
ROUTER_PORT=${ROUTER_PORT:-5000}
export JAVA_BACKEND_URL=${JAVA_BACKEND_URL:-http://localhost:$JAVA_PORT}
export RUST_BACKEND_URL=${RUST_BACKEND_URL:-http://localhost:$RUST_PORT}

# Lancer le backend Java
echo "🔥 Lancement du backend Java (port $JAVA_PORT)..."
cd backends/java
mvn spring-boot:run > ../../logs/java-backend.log 2>&1 &
JAVA_PID=$!
cd ../..

# Attendre que Java démarre
echo "⏳ Attente du démarrage Java..."
sleep 5

# Lancer le backend Rust
echo "🦀 Lancement du backend Rust (port $RUST_PORT)..."
if [ -d rust_backend ]; then
  (cd rust_backend && cargo run --release > ../logs/rust-backend.log 2>&1 &)
elif [ -d backends/rust ]; then
  (cd backends/rust && cargo run --release > ../../logs/rust-backend.log 2>&1 &)
else
  echo "❌ Backend Rust introuvable"
fi
RUST_PID=$!

# Attendre que Rust démarre
echo "⏳ Attente du démarrage Rust..."
sleep 2

# Lancer le router Python
echo "🐍 Lancement du router Python (port $ROUTER_PORT)..."
export ROUTER_PORT
python3 magic_router.py > logs/router.log 2>&1 &
ROUTER_PID=$!

# Attendre un peu
sleep 3

# Vérifier les statuts
echo ""
echo "📊 VÉRIFICATION DES SERVICES:"
echo "================================"

# Test Java
if curl -s "$JAVA_BACKEND_URL/api/magic/health" > /dev/null; then
    echo "✅ Backend Java: $JAVA_BACKEND_URL"
else
    echo "❌ Backend Java: ERREUR"
fi

# Test Rust
if curl -s "$RUST_BACKEND_URL/health" > /dev/null; then
    echo "✅ Backend Rust: $RUST_BACKEND_URL"
else
    echo "❌ Backend Rust: ERREUR"
fi

# Test Router
if curl -s "http://localhost:$ROUTER_PORT/" > /dev/null; then
    echo "✅ Router Python: http://localhost:$ROUTER_PORT"
else
    echo "❌ Router Python: ERREUR"
fi

echo "================================"
echo ""
echo "🌟 MAGIC STACK PRÊTE!"
echo ""
echo "📡 ENDPOINTS DISPONIBLES:"
echo "- Router unifié: http://localhost:$ROUTER_PORT"
echo "- Java direct: $JAVA_BACKEND_URL/api"
echo "- Rust direct: $RUST_BACKEND_URL/health"
echo ""
echo "📝 Logs:"
echo "- tail -f logs/java-backend.log"
echo "- tail -f logs/rust-backend.log"
echo "- tail -f logs/router.log"
echo ""
echo "🛑 Ctrl+C pour tout arrêter"
echo "================================"

# Attendre
wait