#!/bin/bash

echo "🎮 HEROES OF TIME - DÉMO COMPLÈTE"
echo "=================================="
echo ""
echo "Lancement de tous les services et scénarios..."
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour vérifier si un port est libre
check_port() {
    lsof -i:$1 > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "⚠️  Port $1 déjà utilisé, arrêt du processus..."
        lsof -ti:$1 | xargs kill -9 2>/dev/null
        sleep 1
    fi
}

echo -e "${BLUE}1. NETTOYAGE DES PORTS${NC}"
check_port 3001
check_port 8080
check_port 5001
echo "✅ Ports nettoyés"
echo ""

echo -e "${BLUE}2. LANCEMENT DU BACKEND RUST (Port 3001)${NC}"
cd backends/rust
cargo build --release 2>/dev/null
./target/release/magic-stack-server > ../../logs/rust.log 2>&1 &
RUST_PID=$!
echo "✅ Rust backend lancé (PID: $RUST_PID)"
cd ../..
sleep 2

echo -e "${BLUE}3. LANCEMENT DU BACKEND JAVA (Port 8080)${NC}"
cd simple-scenario-backend
mvn compile > ../logs/java-compile.log 2>&1
mvn spring-boot:run > ../logs/java.log 2>&1 &
JAVA_PID=$!
echo "✅ Java backend lancé (PID: $JAVA_PID)"
cd ..
sleep 3

echo -e "${BLUE}4. LANCEMENT DU VECTOR DB (Port 5001)${NC}"
python3 simple_vector_server.py > logs/vector.log 2>&1 &
VECTOR_PID=$!
echo "✅ Vector DB lancé (PID: $VECTOR_PID)"
sleep 2

echo ""
echo -e "${GREEN}✅ TOUS LES SERVICES SONT LANCÉS !${NC}"
echo ""
echo "📊 STATUT DES SERVICES:"
echo "----------------------"

# Vérification des services
curl -s http://localhost:3001/health > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Rust Backend: OK (http://localhost:3001)"
else
    echo "❌ Rust Backend: Non accessible"
fi

curl -s http://localhost:8080/api/health > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Java Backend: OK (http://localhost:8080)"
else
    echo "❌ Java Backend: Non accessible"
fi

curl -s http://localhost:5001/health > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Vector DB: OK (http://localhost:5001)"
else
    echo "❌ Vector DB: Non accessible"
fi

echo ""
echo -e "${YELLOW}🎮 OUVERTURE DES INTERFACES${NC}"
echo "=============================="
echo ""

# Ouvrir les interfaces dans le navigateur
echo "1. 📖 Manuel Facile (pour débuter)"
open MANUEL_FACILE_EASY_MODE.html
sleep 1

echo "2. 🔍 Vector DB Explorer (recherche dans le lore)"
open VECTOR_DB_EXPLORER_UI.html
sleep 1

echo "3. 🎮 Démo Multiplayer HOMM3"
open MULTIPLAYER_DEMO_HOMM3.html
sleep 1

echo "4. 👁️ Mode Spectateur God Mode"
open SPECTATOR_GOD_MODE.html
sleep 1

echo "5. 🧪 Test Runner (scénarios automatiques)"
open SCENARIOS_TEST_RUNNER.html
sleep 1

echo ""
echo -e "${GREEN}🚀 DÉMO COMPLÈTE LANCÉE !${NC}"
echo ""
echo "📚 PAGES OUVERTES:"
echo "• Manuel Facile - Pour comprendre les bases"
echo "• Vector DB Explorer - Pour chercher dans le lore"
echo "• Démo HOMM3 - Pour jouer"
echo "• Spectateur God Mode - Pour voir 4 joueurs"
echo "• Test Runner - Pour lancer les scénarios"
echo ""
echo "🎯 SCÉNARIOS DISPONIBLES DANS LE TEST RUNNER:"
echo "• Combat TCG avec IA"
echo "• Manipulation temporelle (SHIFT, FORK, MERGE)"
echo "• Superposition quantique"
echo "• Navigation 6D avec Q*"
echo "• Ouverture de portail Interstice"
echo "• Énergie complexe A + iΦ"
echo ""
echo "💡 CONSEILS:"
echo "• Commencez par le Manuel Facile"
echo "• Testez la recherche dans Vector DB Explorer"
echo "• Lancez 'Run All' dans Test Runner"
echo "• Regardez le Mode Spectateur pour voir tout"
echo ""
echo "📎 Appuyez sur 'M' pour activer Memento"
echo "🎮 Code Konami: ↑↑↓↓←→←→BA"
echo ""
echo "⚠️  Pour arrêter tous les services:"
echo "kill $RUST_PID $JAVA_PID $VECTOR_PID"
echo ""
echo "Ou utilisez: ./stop_all.sh"

# Créer un script d'arrêt
cat > stop_all.sh << EOF
#!/bin/bash
echo "Arrêt de tous les services..."
kill $RUST_PID $JAVA_PID $VECTOR_PID 2>/dev/null
lsof -ti:3001 | xargs kill -9 2>/dev/null
lsof -ti:8080 | xargs kill -9 2>/dev/null
lsof -ti:5001 | xargs kill -9 2>/dev/null
echo "✅ Tous les services arrêtés"
EOF
chmod +x stop_all.sh

echo ""
echo "Profitez de Heroes of Time ! 🎮✨"
