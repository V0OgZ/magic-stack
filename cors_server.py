#!/usr/bin/env python3
"""
Simple HTTP server with CORS support for development
Allows React app to fetch files from different port
"""

from http.server import SimpleHTTPRequestHandler, HTTPServer
import sys

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    server_address = ('', port)
    httpd = HTTPServer(server_address, CORSRequestHandler)
    print(f'🌐 CORS-enabled server running on http://localhost:{port}')
    print('   Press Ctrl+C to stop')
    httpd.serve_forever()
