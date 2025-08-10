#!/usr/bin/env python3
"""
Simple Vector DB Server for Heroes of Time
Port 5001 - Équipe PROFONDEUR
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from pathlib import Path

app = Flask(__name__)
CORS(app)

# Chemins
DOCS_PATH = Path("docs_shared/V - VECTOR_DB_ASSETS")
GAME_DOCS = []

def load_documents():
    """Charge tous les documents de spec du jeu"""
    global GAME_DOCS
    
    # Charger les documents depuis V - VECTOR_DB_ASSETS
    if DOCS_PATH.exists():
        for file_path in DOCS_PATH.rglob("*.json"):
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    GAME_DOCS.append({
                        'file': str(file_path),
                        'content': data
                    })
            except:
                pass
                
        for file_path in DOCS_PATH.rglob("*.md"):
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    GAME_DOCS.append({
                        'file': str(file_path),
                        'content': content
                    })
            except:
                pass
    
    print(f"✅ Loaded {len(GAME_DOCS)} documents")

@app.route('/health')
def health():
    return jsonify({
        'status': 'ok',
        'service': 'Vector DB 6D',
        'port': 5001,
        'documents_loaded': len(GAME_DOCS)
    })

@app.route('/search', methods=['POST'])
def search():
    """Recherche dans les documents"""
    data = request.json
    query = data.get('query', '').lower()
    limit = data.get('limit', 5)
    
    results = []
    for doc in GAME_DOCS:
        content_str = str(doc['content']).lower()
        if query in content_str:
            results.append({
                'file': doc['file'],
                'match': content_str[max(0, content_str.find(query)-50):content_str.find(query)+150]
            })
            
    return jsonify({
        'query': query,
        'results': results[:limit],
        'total': len(results)
    })

@app.route('/explain/<topic>')
def explain(topic):
    """Explique un concept du jeu"""
    explanations = {
        'temporal': "Le système temporel permet aux entités d'avoir leur propre temps local (t_e) différent du temps du serveur (t_w).",
        'quantum': "L'identité quantique (Ψ) représente la cohérence d'une entité à travers les timelines.",
        'energy': "L'énergie complexe A + iΦ combine amplitude (A) et phase (Φ) pour les sorts temporels.",
        'regulators': "Les régulateurs contrôlent les flux temporels et causaux dans le jeu.",
        'tcg': "Le système TCG résout les combats par cartes avec une IA Rust avancée.",
        'interstice': "L'Interstice est l'espace entre les mondes où les lois physiques sont malléables.",
        'formula': "Les formules magiques utilisent la grammaire temporelle pour manipuler la réalité.",
        '6d': "Le système 6D : X, Y, Z (espace), T (temporel), C (causal), Ψ (quantique)."
    }
    
    return jsonify({
        'topic': topic,
        'explanation': explanations.get(topic, f"Concept '{topic}' en cours de documentation..."),
        'related': list(explanations.keys())
    })

@app.route('/formulas')
def formulas():
    """Retourne toutes les formules magiques"""
    return jsonify({
        'formulas': {
            'TEMPORAL_SHIFT': 'Ψ(t) = Ψ₀ × e^(iωt) × R(Δt)',
            'QUANTUM_COLLAPSE': '|Ψ⟩ = Σ(α_i|i⟩) → |n⟩',
            'CAUSAL_FORK': 'C(t₁→t₂) = ∫P(ξ)dξ × Θ(t₂-t₁)',
            'ENERGY_COMPLEX': 'E = A × e^(iΦ) + ∇²Ψ',
            'INTERSTICE_PORTAL': 'P = limₙ→∞ (1 + z/n)ⁿ',
            'CHRONO_LOCK': 'L(t) = δ(t - t₀) × Ψ(t₀)',
            'WAVE_FUNCTION': 'Ψ(x,t) = A × sin(kx - ωt + φ)',
            'DIMENSION_FOLD': 'D⁶ = X³ × T × C × Ψ',
            'REALITY_WEAVE': 'R = Σᵢⱼ (Mᵢⱼ × Ψᵢ × Ψⱼ*)',
            'TIME_DILATION': 'Δt\' = Δt × √(1 - v²/c²)'
        },
        'categories': {
            'temporal': ['TEMPORAL_SHIFT', 'CHRONO_LOCK', 'TIME_DILATION'],
            'quantum': ['QUANTUM_COLLAPSE', 'WAVE_FUNCTION'],
            'causal': ['CAUSAL_FORK'],
            'dimensional': ['DIMENSION_FOLD', 'INTERSTICE_PORTAL'],
            'energy': ['ENERGY_COMPLEX', 'REALITY_WEAVE']
        }
    })

if __name__ == '__main__':
    print("🔮 VECTOR DB 6D - Démarrage")
    print("=" * 50)
    load_documents()
    print(f"🚀 Serveur lancé sur http://localhost:5001")
    print("=" * 50)
    app.run(host='0.0.0.0', port=5001, debug=False)
