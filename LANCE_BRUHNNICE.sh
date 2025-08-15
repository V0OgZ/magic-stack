#!/bin/bash

echo "╔══════════════════════════════════════════════════════════╗"
echo "║          BÉRÉNICE 'BRUHNNICE' - HACKEUSE TEMPORELLE     ║"
echo "║                    Nièce de VINCE                        ║"
echo "║                  Fille de CHR SHRINE111                  ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if services are running
check_service() {
    local name=$1
    local port=$2
    local url=$3
    
    if curl -s -f "$url" > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} $name (port $port) - ${GREEN}ONLINE${NC}"
        return 0
    else
        echo -e "${RED}✗${NC} $name (port $port) - ${RED}OFFLINE${NC}"
        return 1
    fi
}

echo -e "${CYAN}🔍 Vérification des services backend...${NC}"
echo ""

JAVA_UP=$(check_service "Java API" 8082 "http://localhost:8082/api/health")
RUST_UP=$(check_service "Rust Engine" 3001 "http://localhost:3001/health")
VECTOR_UP=$(check_service "Vector DB" 5000 "http://localhost:5000/health")

# Start missing services
echo ""
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚡ Démarrage des services manquants...${NC}"
    
    # Start Java if needed
    if ! curl -s -f http://localhost:8082/api/health > /dev/null 2>&1; then
        echo "Démarrage Java API..."
        cd backends/java && mvn spring-boot:run > /dev/null 2>&1 &
        sleep 5
    fi
    
    # Start Rust if needed
    if ! curl -s -f http://localhost:3001/health > /dev/null 2>&1; then
        echo "Démarrage Rust Engine..."
        cd backends/rust && cargo run > /dev/null 2>&1 &
        sleep 3
    fi
    
    # Start Vector DB if needed
    if ! curl -s -f http://localhost:5000/health > /dev/null 2>&1; then
        echo "Démarrage Vector DB..."
        python3 boost_backstories_vector_db.py > /dev/null 2>&1 &
        sleep 2
    fi
fi

# Launch game server
echo ""
echo -e "${CYAN}🚀 Lancement du serveur de jeu...${NC}"

# Create simple Python server with PWA headers
python3 -c "
import http.server
import socketserver
import os

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        self.send_header('Service-Worker-Allowed', '/')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    
    def do_GET(self):
        if self.path == '/':
            self.path = '/BERENICE_BRUHNNICE_GAME.html'
        return super().do_GET()

PORT = 8888
os.chdir('.')

print('')
print('════════════════════════════════════════════════════════════')
print('         🎮 JEU PRÊT ! BÉRÉNICE HACKEUSE TEMPORELLE 🎮')
print('════════════════════════════════════════════════════════════')
print('')
print('🌐 OUVRE TON NAVIGATEUR À:')
print(f'   http://localhost:{PORT}')
print('')
print('📱 POUR INSTALLER SUR IPAD/IPHONE:')
print('   1. Ouvre Safari (pas Chrome!)')
print('   2. Va sur http://[TON-IP]:8888')
print('   3. Partager → Sur l\'écran d\'accueil')
print('')
print('🎯 HISTOIRE:')
print('   Bérénice (10 ans) a hacké un serveur quantique')
print('   Elle est coincée dans l\'Interstice')
print('   Son oncle VINCE contrôle le brouillard')
print('   Son père CHR connaît les passages secrets')
print('')
print('⌨️  COMMANDES:')
print('   - Niveau 0: Terminal (tape help)')
print('   - Niveaux 1+: Flèches ou WASD')
print('   - Cartes: Clic ou tap')
print('')
print('🛑 Pour arrêter: Ctrl+C')
print('════════════════════════════════════════════════════════════')

with socketserver.TCPServer(('', PORT), MyHTTPRequestHandler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\n👋 Bye BruhNice!')
"
