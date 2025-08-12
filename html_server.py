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
        # Strong no-cache to avoid stale pages in browsers
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    # Serve custom 404 page from FRONTPAGE/404.html
    def send_error(self, code, message=None, explain=None):
        if code == 404:
            try:
                not_found = Path('FRONTPAGE') / '404.html'
                if not_found.exists():
                    data = not_found.read_bytes()
                    self.send_response(404)
                    self.send_header('Content-Type', 'text/html; charset=utf-8')
                    self.send_header('Content-Length', str(len(data)))
                    self.end_headers()
                    self.wfile.write(data)
                    return
            except Exception:
                pass
        super().send_error(code, message, explain)

print(f"🌐 Serveur HTML démarré sur http://localhost:{PORT}")
print("📁 Racine: /Volumes/HOT_DEV/Magic/magic-stack")
print("🔗 Index: http://localhost:8000/HTML_INDEX.html")

os.chdir('/Volumes/HOT_DEV/Magic/magic-stack')

with socketserver.TCPServer(("", PORT), CORSHTTPRequestHandler) as httpd:
    httpd.serve_forever()
