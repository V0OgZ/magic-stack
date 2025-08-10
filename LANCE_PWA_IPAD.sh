#!/bin/bash

echo "🎮 HEROES OF TIME - PWA POUR IPAD"
echo "=================================="
echo ""
echo "📱 Lancement du serveur pour iPad de ta copine..."
echo ""

# Trouver l'IP locale
IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | head -1 | awk '{print $2}')

# Lancer Python HTTP server avec support PWA
cd "$(dirname "$0")"

echo "🚀 Démarrage du serveur PWA..."
echo ""

# Python 3 server avec headers corrects pour PWA
python3 -c "
import http.server
import socketserver
import os

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        self.send_header('Service-Worker-Allowed', '/')
        super().end_headers()
    
    def do_GET(self):
        if self.path == '/':
            self.path = '/HOMM3_PWA_IPAD_CLIPPY.html'
        return super().do_GET()

PORT = 8888
os.chdir('.')

with socketserver.TCPServer(('', PORT), MyHTTPRequestHandler) as httpd:
    print('📱 INSTRUCTIONS POUR IPAD:')
    print('========================')
    print('')
    print('1️⃣  Sur l\'iPad, ouvre Safari')
    print('')
    print('2️⃣  Tape cette adresse:')
    print(f'    http://{IP if IP else "localhost"}:8888')
    print('')
    print('3️⃣  Une fois le jeu chargé:')
    print('    • Touche le bouton Partager (carré avec flèche)')
    print('    • Choisis \"Sur l\'écran d\'accueil\"')
    print('    • Nomme l\'app \"Heroes of Time\"')
    print('')
    print('4️⃣  L\'app sera sur l\'écran d\'accueil!')
    print('    • Mode plein écran')
    print('    • Pas de barre Safari')
    print('    • Comme une vraie app!')
    print('')
    print('📎 CLIPPY EST INCLUS! Il aide ta copine à jouer!')
    print('')
    print('🎮 CONTRÔLES TACTILES:')
    print('    • Touche une case = déplacer héros')
    print('    • Swipe = naviguer sur la carte')
    print('    • Pinch = zoom in/out')
    print('    • Touche Clippy = conseils')
    print('')
    print('✨ Serveur actif! Ctrl+C pour arrêter')
    print('')
    httpd.serve_forever()
"
