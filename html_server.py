#!/usr/bin/env python3
"""
🎮 SERVEUR HTML POUR TOUS LES VIEUX TRUCS
Port 8000 - Sert TOUS les HTML du projet
"""

import os
import http.server
import socketserver
from pathlib import Path

PORT = 8000

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

print(f"🌐 Serveur HTML démarré sur http://localhost:{PORT}")
print("📁 Racine: /Volumes/HOT_DEV/Magic/magic-stack")
print("🔗 Index: http://localhost:8000/HTML_INDEX.html")

os.chdir('/Volumes/HOT_DEV/Magic/magic-stack')

with socketserver.TCPServer(("", PORT), CORSHTTPRequestHandler) as httpd:
    httpd.serve_forever()
