#!/bin/bash

# 🚀 SCRIPT DE LANCEMENT COMPLET - MAGIC STACK
echo "═══════════════════════════════════════════════════════════════"
echo "🎮 MAGIC STACK - DÉMARRAGE COMPLET"
echo "═══════════════════════════════════════════════════════════════"

# Couleurs pour le terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour afficher les statuts
show_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

error_status() {
    echo -e "${RED}[ERROR]${NC} $1"
}

success_status() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# 1. Backend Rust
show_status "Démarrage du backend Rust (port 3001)..."
cd magic-stack
cargo run --release > /dev/null 2>&1 &
RUST_PID=$!
sleep 2
if kill -0 $RUST_PID 2>/dev/null; then
    success_status "Backend Rust démarré ✅"
else
    error_status "Échec du démarrage Rust"
fi
cd ..

# 2. Backend Java
show_status "Démarrage du backend Java (port 8080)..."
cd magic-backend
./mvnw spring-boot:run > /dev/null 2>&1 &
JAVA_PID=$!
sleep 3
if kill -0 $JAVA_PID 2>/dev/null; then
    success_status "Backend Java démarré ✅"
else
    error_status "Échec du démarrage Java"
fi
cd ..

# 3. Vector DB Python
show_status "Démarrage de la Vector DB (port 5001)..."
cd magic-stack
python boost_backstories_vector_db.py > /dev/null 2>&1 &
VECTOR_PID=$!
sleep 2
if kill -0 $VECTOR_PID 2>/dev/null; then
    success_status "Vector DB démarrée ✅"
else
    error_status "Échec du démarrage Vector DB"
fi

# 4. Clippy Dev Server (IA)
show_status "Démarrage du serveur IA Clippy (port 5002)..."
python clippy_dev_server.py > /dev/null 2>&1 &
CLIPPY_PID=$!
sleep 2
if kill -0 $CLIPPY_PID 2>/dev/null; then
    success_status "Serveur IA Clippy démarré ✅"
else
    error_status "Échec du démarrage Clippy"
fi

# 5. Frontend React
show_status "Démarrage du frontend React (port 5173)..."
cd apps/magic-stack-unified
npm run dev > /dev/null 2>&1 &
REACT_PID=$!
sleep 3
if kill -0 $REACT_PID 2>/dev/null; then
    success_status "Frontend React démarré ✅"
else
    error_status "Échec du démarrage React"
fi
cd ../..

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo -e "${GREEN}🎉 TOUS LES SERVICES SONT DÉMARRÉS !${NC}"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "📡 ENDPOINTS DISPONIBLES:"
echo "  • Frontend React:    http://localhost:5173"
echo "  • Backend Rust:      http://localhost:3001"
echo "  • Backend Java:      http://localhost:8080"
echo "  • Vector DB:         http://localhost:5001"
echo "  • Clippy IA:         http://localhost:5002"
echo ""
echo "🎮 MODES DISPONIBLES:"
echo "  • Heroes of Time:    http://localhost:5173/game"
echo "  • World Editor:      http://localhost:5173/editor"
echo "  • Multiplayer:       http://localhost:5173/multiplayer"
echo "  • IA vs IA:          http://localhost:5173/ai-battle"
echo "  • Spectator Mode:    http://localhost:5173/spectator"
echo "  • Backstory Editor:  http://localhost:5173/backstory-editor"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo -e "${YELLOW}💡 Pour arrêter tous les services: ./STOP_ALL.sh${NC}"
echo "═══════════════════════════════════════════════════════════════"

# Sauvegarder les PIDs
echo "$RUST_PID" > .pids/rust.pid
echo "$JAVA_PID" > .pids/java.pid
echo "$VECTOR_PID" > .pids/vector.pid
echo "$CLIPPY_PID" > .pids/clippy.pid
echo "$REACT_PID" > .pids/react.pid

# Garder le script actif
echo ""
echo "Appuyez sur CTRL+C pour quitter (les services continueront en arrière-plan)"
wait
