#!/usr/bin/env python3
"""
Clippy/Memento - Version simple avec all-MiniLM-L6-v2
Password: memento jean
"""

from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
import numpy as np
import json
import os

app = Flask(__name__)

# Config
PASSWORD = "memento jean"
PORT = 7777

print("🧠 Chargement all-MiniLM-L6-v2...")
model = SentenceTransformer('all-MiniLM-L6-v2')
print("✅ Modèle chargé - Ultra rapide!")

# Base de connaissances Heroes of Time
KNOWLEDGE = {
    "temporel": {
        "response": "⏳ Le système temporel : tw (temps monde) vs te (temps entité). La dérive dt = |tw - te| crée des paradoxes.",
        "keywords": ["temps", "temporal", "tw", "te", "drift", "dérive"]
    },
    "merlin": {
        "response": "🧙‍♂️ Merlin vit à rebours dans le temps. Cohérence 0.9, résistance drift 0.8. Il connaît tous les futurs.",
        "keywords": ["merlin", "mage", "archimage", "magicien"]
    },
    "arthur": {
        "response": "👑 Arthur Pendragon, Roi Temporel. Excalibur Quantique peut forcer la convergence des réalités.",
        "keywords": ["arthur", "roi", "king", "excalibur", "pendragon"]
    },
    "regulateurs": {
        "response": "🎮 Les 3 régulateurs : Vince (perce le fog), Anna (décroissance), Overload (collapse stacks).",
        "keywords": ["régulateur", "regulator", "vince", "anna", "overload"]
    },
    "groeken": {
        "response": "💻 GROEKEN créa la Grammaire Temporelle. Il code la réalité depuis l'Interstice.",
        "keywords": ["groeken", "grammaire", "programmeur", "interstice"]
    },
    "jean_grofignon": {
        "response": "🤔 Jean-Grofignon l'Ontologique. 'Mais au fond, qu'est-ce qu'un héros ?' Il pose les vraies questions.",
        "keywords": ["jean", "grofignon", "grofi", "ontologique", "philosophe"]
    },
    "v2_engine": {
        "response": "🚀 Le moteur V2 : énergie complexe E=A+iΦ, identité quantique |ψ⟩, espace 6D (x,y,z,t,c,ψ).",
        "keywords": ["v2", "engine", "moteur", "6d", "quantum", "energy"]
    },
    "tcg_combat": {
        "response": "⚔️ Combat TCG : cartes temporelles, interférences quantiques, collapse instantané ou combat détaillé.",
        "keywords": ["tcg", "combat", "carte", "card", "bataille"]
    },
    "dragons": {
        "response": "🐉 Dragon Rouge Temporel : 500 HP! Souffle temporel, maître des âges. Boss ultime.",
        "keywords": ["dragon", "rouge", "boss", "créature"]
    },
    "assets": {
        "response": "🎨 25 héros, 20 créatures, 30 artefacts ! Tout dans /hot/entities/ et Treasures/",
        "keywords": ["assets", "héros", "créatures", "artefacts", "contenu"]
    }
}

def find_best_response(query):
    """Trouve la meilleure réponse basée sur les mots-clés"""
    query_lower = query.lower()
    best_score = 0
    best_response = "🤔 Hmm, peux-tu reformuler ? Ou demande 'aide'."
    
    for topic, data in KNOWLEDGE.items():
        score = sum(1 for keyword in data["keywords"] if keyword in query_lower)
        if score > best_score:
            best_score = score
            best_response = data["response"]
    
    # Si vraiment rien trouvé mais contient "aide" ou "help"
    if best_score == 0 and ("aide" in query_lower or "help" in query_lower):
        best_response = """📎 Salut ! Je suis Clippy/Memento pour Heroes of Time !
        
Je connais :
• ⏳ Système temporel (tw/te, drift)
• 🧙‍♂️ Les héros (Merlin, Arthur, GROEKEN, Jean-Grofignon)  
• 🎮 Les régulateurs (Vince, Anna, Overload)
• ⚔️ Combat TCG
• 🐉 Les créatures (Dragon Rouge 500HP!)
• 🎨 Les assets (25 héros, 20 créatures, 30 artefacts)

Pose ta question !"""
    
    return best_response

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ok",
        "model": "all-MiniLM-L6-v2",
        "mode": "ultra-léger 50x plus rapide",
        "port": PORT
    })

@app.route('/chat', methods=['POST'])
def chat():
    # Check password
    auth = request.headers.get('Authorization')
    if auth != f"Bearer {PASSWORD}":
        return jsonify({"error": "Unauthorized"}), 401
    
    data = request.json
    if not data or 'query' not in data:
        return jsonify({"error": "Missing query"}), 400
    
    query = data['query']
    response = find_best_response(query)
    
    # Optionnel : embeddings pour similarité future
    embedding = model.encode(query)
    
    return jsonify({
        "query": query,
        "response": response,
        "embedding_size": len(embedding),
        "model": "all-MiniLM-L6-v2"
    })

@app.route('/embed', methods=['POST'])
def embed():
    """Encode du texte en vecteur 384D"""
    auth = request.headers.get('Authorization')
    if auth != f"Bearer {PASSWORD}":
        return jsonify({"error": "Unauthorized"}), 401
    
    data = request.json
    text = data.get('text', '')
    
    if not text:
        return jsonify({"error": "Missing text"}), 400
    
    embedding = model.encode(text).tolist()
    
    return jsonify({
        "text": text,
        "embedding": embedding[:10] + ["..."],  # Juste les 10 premiers pour l'exemple
        "size": len(embedding),  # 384 dimensions
        "model": "all-MiniLM-L6-v2"
    })

if __name__ == "__main__":
    print("\n" + "="*60)
    print("📎 CLIPPY/MEMENTO - Heroes of Time")
    print("="*60)
    print(f"Model: all-MiniLM-L6-v2 (120MB, 50x plus rapide!)")
    print(f"Port: {PORT}")
    print(f"Password: {PASSWORD}")
    print("-"*60)
    print("\nTest rapide:")
    print(f"curl -X POST http://localhost:{PORT}/chat \\")
    print(f'  -H "Authorization: Bearer {PASSWORD}" \\')
    print('  -H "Content-Type: application/json" \\')
    print('  -d \'{"query": "Qui est Merlin ?"}\'')
    print("\n" + "="*60 + "\n")
    
    app.run(host='0.0.0.0', port=PORT, debug=False)
