#!/usr/bin/env python3
"""
🔮 MAGIC STACK ROUTER - Coordonne les backends Java et Rust
Par URZ-KÔM pour unifier l'accès aux services

Ports:
- 8082: Backend Java (formules, interstice)
- 3001: Backend Rust (Q*, world state)
- 5000: Ce router Python
"""

from flask import Flask, request, jsonify, Response
import requests
import json
import os

app = Flask(__name__)

# Configuration des backends
BACKENDS = {
    "java": os.environ.get("JAVA_BACKEND_URL", "http://localhost:8082"),
    "rust": os.environ.get("RUST_BACKEND_URL", "http://localhost:3001"),
}

@app.route('/')
def home():
    """Documentation de l'API unifiée"""
    return jsonify({
        "title": "🔮 MAGIC STACK ROUTER",
        "backends": {
            "java": f"{BACKENDS['java']} - Formules magiques, Interstice",
            "rust": f"{BACKENDS['rust']} - Q* Algorithm, World State"
        },
        "routes": {
            "/health": "Vérifier l'état de tous les backends",
            "/api/magic/*": "Formules magiques (Java)",
            "/api/interstice/*": "Upload/Download 6D (Java)",
            "/api/qstar/*": "Recherche Q* (Rust)",
            "/api/world-state/*": "Graphe du monde (Rust)"
        }
    })

@app.route('/health')
def health():
    """Vérifier l'état de tous les backends"""
    status = {
        "router": "OK",
        "backends": {}
    }
    
    # Test Java backend
    try:
        resp = requests.get(f"{BACKENDS['java']}/api/magic/health", timeout=2)
        status["backends"]["java"] = resp.json() if resp.ok else "ERROR"
    except:
        status["backends"]["java"] = "OFFLINE"
    
    # Test Rust backend
    try:
        resp = requests.get(f"{BACKENDS['rust']}/health", timeout=2)
        status["backends"]["rust"] = resp.json() if resp.ok else "ERROR"
    except:
        status["backends"]["rust"] = "OFFLINE"
    
    return jsonify(status)

@app.route('/api/magic/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy_magic(path):
    """Proxy vers le backend Java pour les formules magiques"""
    return proxy_request('java', f'/api/magic/{path}')

@app.route('/api/interstice/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy_interstice(path):
    """Proxy vers le backend Java pour l'interstice"""
    return proxy_request('java', f'/api/interstice/{path}')

@app.route('/api/qstar/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy_qstar(path):
    """Proxy vers le backend Rust pour Q*"""
    return proxy_request('rust', f'/api/qstar/{path}')

@app.route('/api/world-state/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy_world_state(path):
    """Proxy vers le backend Rust pour le world state"""
    return proxy_request('rust', f'/api/world-state/{path}')

def proxy_request(backend, path):
    """Fonction générique pour proxy les requêtes"""
    url = f"{BACKENDS[backend]}{path}"
    
    # Préparer la requête
    kwargs = {
        'method': request.method,
        'url': url,
        'headers': {k:v for k,v in request.headers if k != 'Host'},
        'timeout': 30
    }
    
    # Ajouter les paramètres
    if request.args:
        kwargs['params'] = request.args
    
    # Ajouter le body si présent
    if request.method in ['POST', 'PUT'] and request.is_json:
        kwargs['json'] = request.get_json()
    elif request.method in ['POST', 'PUT']:
        kwargs['data'] = request.get_data()
    
    try:
        # Faire la requête
        resp = requests.request(**kwargs)
        
        # Retourner la réponse
        return Response(
            resp.content,
            status=resp.status_code,
            headers=dict(resp.headers)
        )
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Backend {backend} error: {str(e)}"}), 503

if __name__ == '__main__':
    print("🚀 Magic Stack Router starting on port 5000...")
    print("📡 Routing to:")
    print(f"   - Java Backend: {BACKENDS['java']}")
    print(f"   - Rust Backend: {BACKENDS['rust']}")
    app.run(host='0.0.0.0', port=int(os.environ.get("ROUTER_PORT", "5000")), debug=True)