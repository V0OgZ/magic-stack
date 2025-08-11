#!/usr/bin/env python3
"""
MCP Server - Model Context Protocol Bridge
Unifie l'accès au WorldState (Rust), VectorDB et documentation
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import json
import os
from pathlib import Path
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuration des backends
BACKENDS = {
    "rust": "http://localhost:3001",
    "java": "http://localhost:8082",
    "vectordb": "http://localhost:7500",
    "clippy": "http://localhost:7501"
}

# Cache simple pour la doc
DOC_CACHE = {}
CACHE_TTL = 300  # 5 minutes

@app.route('/mcp/health')
def health():
    """Check santé du serveur MCP et des backends"""
    status = {}
    for name, url in BACKENDS.items():
        try:
            if name == "rust":
                r = requests.get(f"{url}/health", timeout=1)
            elif name == "java":
                # Java n'a pas de /health direct
                status[name] = "configured"
                continue
            else:
                r = requests.get(f"{url}/health", timeout=1)
            status[name] = "online" if r.status_code == 200 else "error"
        except:
            status[name] = "offline"
    
    return jsonify({
        "mcp": "online",
        "backends": status,
        "timestamp": datetime.now().isoformat()
    })

@app.route('/mcp/context/<entity>')
def get_entity_context(entity):
    """Récupère le contexte complet d'une entité (world + lore)"""
    context = {
        "entity": entity,
        "world_state": None,
        "lore": None,
        "errors": []
    }
    
    # 1. WorldState depuis Rust
    try:
        # Essaye plusieurs endpoints possibles
        endpoints = [
            f"/api/entities/{entity}",
            f"/api/world-state/entity/{entity}",
            "/api/world-state/nodes"
        ]
        for endpoint in endpoints:
            try:
                r = requests.get(f"{BACKENDS['rust']}{endpoint}", timeout=2)
                if r.status_code == 200:
                    context["world_state"] = r.json()
                    break
            except:
                continue
    except Exception as e:
        context["errors"].append(f"WorldState: {str(e)}")
    
    # 2. Lore depuis VectorDB
    try:
        r = requests.post(
            f"{BACKENDS['vectordb']}/search",
            json={"query": entity, "limit": 5},
            timeout=2
        )
        if r.status_code == 200:
            context["lore"] = r.json()
    except Exception as e:
        context["errors"].append(f"VectorDB: {str(e)}")
    
    return jsonify(context)

@app.route('/mcp/query', methods=['POST'])
def unified_query():
    """Requête unifiée qui interroge les bons backends"""
    data = request.json
    query = data.get('query', '')
    query_type = data.get('type', 'auto')
    
    results = {
        "query": query,
        "results": {},
        "suggestions": []
    }
    
    # Analyse la requête pour déterminer quoi interroger
    query_lower = query.lower()
    
    # Si c'est une question sur l'état du monde
    if any(word in query_lower for word in ['position', 'état', 'state', 'world', 'temporal']):
        try:
            r = requests.get(f"{BACKENDS['rust']}/api/world-state/summary")
            results["results"]["world_state"] = r.json() if r.status_code == 200 else None
        except:
            pass
    
    # Si c'est une question sur le lore/histoire
    if any(word in query_lower for word in ['histoire', 'lore', 'backstory', 'qui', 'pourquoi']):
        try:
            r = requests.post(f"{BACKENDS['vectordb']}/search", json={"query": query})
            results["results"]["lore"] = r.json() if r.status_code == 200 else None
        except:
            pass
    
    # Si c'est une question sur les héros/créatures
    if any(word in query_lower for word in ['héros', 'hero', 'creature', 'créature', 'artifact']):
        try:
            # Essaye Rust d'abord
            r = requests.get(f"{BACKENDS['rust']}/api/resources/all")
            if r.status_code == 200:
                results["results"]["resources"] = r.json()
        except:
            pass
    
    return jsonify(results)

@app.route('/mcp/apis')
def list_apis():
    """Liste toutes les APIs disponibles avec leur status"""
    apis = {
        "rust": {
            "url": BACKENDS["rust"],
            "endpoints": [
                "/health",
                "/api/heroes", "/api/creatures", "/api/artifacts",
                "/api/resources/all", "/api/resources/for-editor",
                "/api/world-state/nodes", "/api/world-state/summary",
                "/api/calculate/path", "/api/calculate/paradox"
            ]
        },
        "java": {
            "url": BACKENDS["java"],
            "endpoints": [
                "/api/heroes", "/api/creatures", "/api/artifacts",
                "/api/resources/all", "/api/scenarios",
                "/ws/game"
            ]
        },
        "vectordb": {
            "url": BACKENDS["vectordb"],
            "endpoints": [
                "/search", "/index", "/stats",
                "/api/lore", "/api/index/rebuild"
            ]
        },
        "clippy": {
            "url": BACKENDS["clippy"],
            "endpoints": [
                "/chat", "/character/speak", "/dialogue",
                "/ai/think", "/memory", "/embed"
            ]
        }
    }
    
    # Test chaque endpoint
    for backend in apis.values():
        backend["status"] = "testing..."
        try:
            r = requests.get(f"{backend['url']}/health", timeout=1)
            backend["status"] = "online" if r.status_code == 200 else "partial"
        except:
            backend["status"] = "offline"
    
    return jsonify(apis)

@app.route('/mcp/docs/<path:docpath>')
def get_documentation(docpath):
    """Retourne la documentation demandée"""
    # Sécurité: empêche la traversée de répertoire
    docpath = docpath.replace('..', '')
    
    # Check cache
    cache_key = f"doc_{docpath}"
    if cache_key in DOC_CACHE:
        cached = DOC_CACHE[cache_key]
        if (datetime.now() - cached['time']).seconds < CACHE_TTL:
            return jsonify(cached['data'])
    
    # Chemins possibles pour la doc
    doc_paths = [
        Path(f"docs/{docpath}"),
        Path(f"docs/{docpath}.md"),
        Path(docpath),
        Path(f"{docpath}.md")
    ]
    
    for path in doc_paths:
        if path.exists() and path.is_file():
            content = path.read_text()
            data = {
                "path": str(path),
                "content": content,
                "format": "markdown" if path.suffix == '.md' else "text"
            }
            # Cache
            DOC_CACHE[cache_key] = {
                'data': data,
                'time': datetime.now()
            }
            return jsonify(data)
    
    return jsonify({"error": "Documentation not found"}), 404

@app.route('/mcp/clippy/comment', methods=['POST'])
def clippy_comment():
    """Génère un commentaire Clippy avec contexte complet"""
    data = request.json
    situation = data.get('situation', '')
    entity = data.get('entity', '')
    
    # 1. Récupère le contexte complet
    context = {
        "world": None,
        "lore": None
    }
    
    # WorldState
    try:
        r = requests.get(f"{BACKENDS['rust']}/api/world-state/summary")
        if r.status_code == 200:
            context["world"] = r.json()
    except:
        pass
    
    # Lore
    if entity:
        try:
            r = requests.post(f"{BACKENDS['vectordb']}/search", 
                           json={"query": entity})
            if r.status_code == 200:
                context["lore"] = r.json()
        except:
            pass
    
    # 2. Envoie à Clippy avec le contexte enrichi
    prompt = f"""
    Situation: {situation}
    Entity: {entity}
    World State: {json.dumps(context['world'], indent=2) if context['world'] else 'N/A'}
    Lore: {json.dumps(context['lore'], indent=2) if context['lore'] else 'N/A'}
    
    Génère un commentaire de combat amusant et contextuel.
    """
    
    try:
        r = requests.post(f"{BACKENDS['clippy']}/chat",
                        json={"message": prompt})
        if r.status_code == 200:
            return jsonify({
                "comment": r.json().get('response', ''),
                "context_used": bool(context['world'] or context['lore'])
            })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    return jsonify({"comment": "Pas de commentaire disponible"}), 200

if __name__ == '__main__':
    print("🚀 MCP Server starting on http://localhost:9000")
    print("📊 Bridging: Rust(3001), Java(8082), VectorDB(7500), Clippy(7501)")
    print("📚 Documentation server active")
    print("✨ Unified context API ready")
    app.run(host='0.0.0.0', port=9000, debug=True)
