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

# Lancer le backend Java
echo "🔥 Lancement du backend Java (port 8082)..."
cd backends/java
mvn spring-boot:run > ../../logs/java-backend.log 2>&1 &
JAVA_PID=$!
cd ../..

# Attendre que Java démarre
echo "⏳ Attente du démarrage Java..."
sleep 5

# Lancer le backend Rust
echo "🦀 Lancement du backend Rust (port 3001)..."
cd backends/rust
./target/release/magic-stack-core > ../../logs/rust-backend.log 2>&1 &
RUST_PID=$!
cd ../..

# Attendre que Rust démarre
echo "⏳ Attente du démarrage Rust..."
sleep 2

# Lancer le router Python
echo "🐍 Lancement du router Python (port 5000)..."
python3 magic_router.py > logs/router.log 2>&1 &
ROUTER_PID=$!

# Attendre un peu
sleep 3

# Vérifier les statuts
echo ""
echo "📊 VÉRIFICATION DES SERVICES:"
echo "================================"

# Test Java
if curl -s http://localhost:8082/api/magic/health > /dev/null; then
    echo "✅ Backend Java: http://localhost:8082"
else
    echo "❌ Backend Java: ERREUR"
fi

# Test Rust
if curl -s http://localhost:3001/health > /dev/null; then
    echo "✅ Backend Rust: http://localhost:3001"
else
    echo "❌ Backend Rust: ERREUR"
fi

# Test Router
if curl -s http://localhost:5000/ > /dev/null; then
    echo "✅ Router Python: http://localhost:5000"
else
    echo "❌ Router Python: ERREUR"
fi

echo "================================"
echo ""
echo "🌟 MAGIC STACK PRÊTE!"
echo ""
echo "📡 ENDPOINTS DISPONIBLES:"
echo "- Router unifié: http://localhost:5000"
echo "- Java direct: http://localhost:8082/api"
echo "- Rust direct: http://localhost:3001/health"
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