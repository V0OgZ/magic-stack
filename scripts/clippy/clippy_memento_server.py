#!/usr/bin/env python3
"""
Serveur Clippy/Memento avec auth simple
Password: memento jean
"""

from flask import Flask, request, jsonify
import json
from sentence_transformers import SentenceTransformer
import requests
from datetime import datetime

app = Flask(__name__)

# Configuration
VECTOR_DB_URL = "http://localhost:5001"
MODEL_NAME = 'all-MiniLM-L6-v2'  # Ultra-léger !
PASSWORD = "memento jean"  # Password en dur pour l'instant
PORT = 7777  # Port pour Clippy

# Chargement du modèle au démarrage
print("🧠 Chargement du modèle léger all-MiniLM-L6-v2...")
model = SentenceTransformer(MODEL_NAME)
print("✅ Modèle chargé !")

# Mémoire de session
session_memory = []

def check_auth(auth_header):
    """Vérifie le password"""
    if not auth_header:
        return False
    # Format: "Bearer memento jean"
    parts = auth_header.split(" ", 1)
    if len(parts) == 2 and parts[0] == "Bearer" and parts[1] == PASSWORD:
        return True
    return False

def search_vector_db(query, k=5):
    """Recherche dans le Vector DB"""
    try:
        response = requests.post(
            f"{VECTOR_DB_URL}/search",
            json={"query": query, "k": k},
            timeout=2
        )
        if response.status_code == 200:
            return response.json().get('results', [])
    except:
        pass
    return []

def generate_response(user_input):
    """Génère une réponse contextuelle"""
    # Recherche dans Vector DB
    context = search_vector_db(user_input)
    
    # Patterns de réponse
    user_lower = user_input.lower()
    
    if "temporal" in user_lower or "temps" in user_lower:
        response = {
            "type": "temporal",
            "message": "🕐 Le système temporel utilise tw (temps monde) et te (temps entité). La dérive temporelle dt = |tw - te| crée des paradoxes.",
            "context": context[:2] if context else []
        }
    
    elif "merlin" in user_lower:
        response = {
            "type": "hero",
            "message": "🧙‍♂️ Merlin est le maître du temps, avec une cohérence quantique de 0.9 et une résistance au drift de 0.8.",
            "context": context[:2] if context else []
        }
    
    elif "régulateur" in user_lower or "vince" in user_lower:
        response = {
            "type": "regulator",
            "message": "🎮 Les régulateurs: Vince (perce le brouillard), Anna (gère la décroissance), Overload (collapse les stacks).",
            "context": context[:2] if context else []
        }
    
    elif "aide" in user_lower or "help" in user_lower:
        response = {
            "type": "help",
            "message": """📎 Clippy/Memento - Assistant Heroes of Time
            
Domaines d'expertise:
• 🕐 Mécaniques temporelles (tw/te, drift)
• 🧙‍♂️ Héros et créatures  
• 🎮 Régulateurs (Vince, Anna, Overload)
• ⚔️ Combat TCG
• 🗺️ Cartes 6D""",
            "context": []
        }
    
    else:
        response = {
            "type": "search",
            "message": f"🔍 Recherche sur '{user_input}'",
            "context": context[:3] if context else []
        }
    
    # Ajouter à la mémoire
    session_memory.append({
        "timestamp": datetime.now().isoformat(),
        "query": user_input,
        "response_type": response["type"],
        "context_found": len(context) > 0
    })
    
    # Garder seulement les 100 dernières interactions
    if len(session_memory) > 100:
        session_memory.pop(0)
    
    return response

@app.route('/health', methods=['GET'])
def health():
    """Endpoint de santé"""
    return jsonify({
        "status": "ok",
        "service": "Clippy/Memento",
        "model": MODEL_NAME,
        "memory_size": len(session_memory),
        "port": PORT
    })

@app.route('/chat', methods=['POST'])
def chat():
    """Endpoint de chat principal"""
    # Vérifier auth
    auth = request.headers.get('Authorization')
    if not check_auth(auth):
        return jsonify({"error": "Unauthorized. Use: Bearer memento jean"}), 401
    
    # Récupérer la question
    data = request.json
    if not data or 'query' not in data:
        return jsonify({"error": "Missing 'query' field"}), 400
    
    user_input = data['query']
    
    # Générer réponse
    response = generate_response(user_input)
    
    return jsonify({
        "query": user_input,
        "response": response["message"],
        "type": response["type"],
        "context": response["context"],
        "timestamp": datetime.now().isoformat()
    })

@app.route('/memory', methods=['GET'])
def get_memory():
    """Récupère la mémoire de session"""
    auth = request.headers.get('Authorization')
    if not check_auth(auth):
        return jsonify({"error": "Unauthorized"}), 401
    
    return jsonify({
        "memory": session_memory[-20:],  # Dernières 20 interactions
        "total": len(session_memory)
    })

@app.route('/embed', methods=['POST'])
def embed():
    """Encode un texte en vecteur (pour tests)"""
    auth = request.headers.get('Authorization')
    if not check_auth(auth):
        return jsonify({"error": "Unauthorized"}), 401
    
    data = request.json
    text = data.get('text', '')
    
    if not text:
        return jsonify({"error": "Missing text"}), 400
    
    # Encoder avec le modèle léger
    embedding = model.encode(text).tolist()
    
    return jsonify({
        "text": text,
        "embedding_size": len(embedding),
        "model": MODEL_NAME
    })

if __name__ == "__main__":
    print("\n" + "="*60)
    print("📎 CLIPPY/MEMENTO SERVER")
    print("="*60)
    print(f"Port: {PORT}")
    print(f"Model: {MODEL_NAME} (ultra-léger, 50x plus rapide!)")
    print(f"Auth: Bearer {PASSWORD}")
    print("-"*60)
    print("\nEndpoints:")
    print(f"  GET  http://localhost:{PORT}/health")
    print(f"  POST http://localhost:{PORT}/chat")
    print(f"  GET  http://localhost:{PORT}/memory")
    print(f"  POST http://localhost:{PORT}/embed")
    print("\n" + "="*60 + "\n")
    
    app.run(host='0.0.0.0', port=PORT, debug=False)
