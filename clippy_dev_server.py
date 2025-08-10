#!/usr/bin/env python3
"""
Clippy Dev Server - Mode LLM pour développeurs ET dialogues IA !
Port 8889
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import os
import time

app = Flask(__name__)
CORS(app)

OLLAMA_URL = "http://localhost:11434"
VECTOR_DB_URL = "http://localhost:3001"

# Cache des personnalités
PERSONALITIES = {
    "merlin": {
        "voice": "sage et mystérieux, parle à l'envers du temps",
        "knowledge": "magie temporelle, paradoxes, prophéties inversées"
    },
    "arthur": {
        "voice": "noble et déterminé, roi juste",
        "knowledge": "leadership, Excalibur, justice temporelle"
    },
    "groeken": {
        "voice": "geek des années 80, créateur fou",
        "knowledge": "programmation temporelle, grammaire des sorts, interstice"
    },
    "vince": {
        "voice": "cool et calculateur, style Pulp Fiction",
        "knowledge": "brouillard causal, contrôle de la visibilité"
    },
    "anna": {
        "voice": "précise et implacable, gestionnaire du temps",
        "knowledge": "décroissance temporelle, économie quantique"
    },
    "overload": {
        "voice": "chaotique et imprévisible",
        "knowledge": "collapse de réalités, paradoxes extrêmes"
    },
    "dragon": {
        "voice": "ancien et imposant, souffle de feu temporel",
        "knowledge": "trésors quantiques, magie draconique"
    },
    "clippy": {
        "voice": "assistant serviable mais parfois agaçant, nostalgique de Microsoft Office",
        "knowledge": "aide contextuelle, tips de jeu, easter eggs"
    }
}

def get_vector_context(query, mode="story"):
    """Récupère le contexte depuis la Vector DB"""
    try:
        response = requests.post(
            f"{VECTOR_DB_URL}/api/archives/search",
            json={"query": query, "mode": mode, "top_k": 5},
            timeout=2
        )
        if response.ok:
            results = response.json().get("results", [])
            # Prendre plus de contexte (500 chars par résultat)
            return "\n\n".join([r.get("content", "")[:500] for r in results])
    except Exception as e:
        print(f"Vector DB error: {e}")
    return ""

def generate_with_ollama(prompt, model="qwen2.5:0.5b", max_tokens=150):
    """Génère avec Ollama"""
    try:
        response = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={
                "model": model,
                "prompt": prompt,
                "stream": False,
                "options": {
                    "num_predict": max_tokens,
                    "temperature": 0.7
                }
            },
            timeout=5
        )
        if response.ok:
            return response.json().get("response", "...")
    except Exception as e:
        return f"[Ollama offline: {str(e)}]"
    return "[Pas de réponse]"

@app.route('/health', methods=['GET'])
def health():
    """Check santé"""
    return jsonify({"status": "ok", "service": "clippy_dev", "port": 8889})

@app.route('/ask', methods=['POST'])
def ask_dev():
    """Mode développeur - Questions techniques"""
    data = request.json
    question = data.get('q', data.get('question', ''))
    mode = data.get('mode', 'dev')
    
    # Contexte de la Vector DB
    context = get_vector_context(question, mode)
    
    # Prompt optimisé court
    prompt = f"""You are Clippy, the Heroes of Time development assistant.
Context from docs: {context[:500]}
Question: {question}
Answer (brief and helpful):"""
    
    answer = generate_with_ollama(prompt)
    
    return jsonify({
        "question": question,
        "answer": answer,
        "context_used": bool(context),
        "mode": mode
    })

@app.route('/character/speak', methods=['POST'])
def character_speak():
    """💡 NOUVEAU : Fait parler un personnage du jeu !"""
    data = request.json
    character = data.get('character', 'clippy').lower()
    message = data.get('message', '')
    context = data.get('context', '')  # Situation de jeu
    
    # CHERCHER LA VRAIE BACKSTORY DANS LA VECTOR DB !
    backstory_query = f"{character} backstory histoire personnalité lore"
    real_backstory = get_vector_context(backstory_query, mode="story")
    
    # Si pas de backstory trouvée, utiliser la personnalité par défaut
    personality = PERSONALITIES.get(character, PERSONALITIES['clippy'])
    
    # Prompt enrichi avec la VRAIE backstory de la Vector DB
    prompt = f"""You are {character} from Heroes of Time.
    
BACKSTORY FROM DATABASE:
{real_backstory[:1000] if real_backstory else personality.get('knowledge', '')}

Voice: {personality['voice']}
Current game situation: {context}
Player says: {message}

Respond in character based on your backstory (max 2 sentences):"""
    
    response = generate_with_ollama(prompt, max_tokens=100)
    
    return jsonify({
        "character": character,
        "response": response,
        "personality": personality,
        "backstory_found": bool(real_backstory)
    })

@app.route('/dialogue', methods=['POST'])
def generate_dialogue():
    """Génère un dialogue entre deux personnages"""
    data = request.json
    char1 = data.get('character1', 'merlin')
    char2 = data.get('character2', 'arthur')
    topic = data.get('topic', 'temporal paradox')
    turns = min(data.get('turns', 3), 5)  # Max 5 échanges
    
    dialogue = []
    context = f"Discussion about: {topic}"
    
    for i in range(turns):
        # Personnage 1 parle
        p1 = PERSONALITIES.get(char1, PERSONALITIES['clippy'])
        prompt1 = f"""You are {char1}.
Voice: {p1['voice']}
Topic: {topic}
Previous: {dialogue[-1]['text'] if dialogue else 'Start conversation'}
Speak (1 sentence):"""
        
        response1 = generate_with_ollama(prompt1, max_tokens=50)
        dialogue.append({"character": char1, "text": response1})
        
        # Personnage 2 répond
        p2 = PERSONALITIES.get(char2, PERSONALITIES['clippy'])
        prompt2 = f"""You are {char2}.
Voice: {p2['voice']}
{char1} said: {response1}
Reply (1 sentence):"""
        
        response2 = generate_with_ollama(prompt2, max_tokens=50)
        dialogue.append({"character": char2, "text": response2})
    
    return jsonify({
        "dialogue": dialogue,
        "topic": topic
    })

@app.route('/ai/think', methods=['POST'])
def ai_think():
    """L'IA ennemie 'pense' sa stratégie"""
    data = request.json
    game_state = data.get('game_state', {})
    difficulty = data.get('difficulty', 'normal')
    
    prompt = f"""You are an AI opponent in Heroes of Time.
Game state: {json.dumps(game_state)[:300]}
Difficulty: {difficulty}
Decide your next move (brief tactical analysis):"""
    
    strategy = generate_with_ollama(prompt, max_tokens=100)
    
    # Convertir en action (simplifié)
    action = "attack" if "attack" in strategy.lower() else "defend"
    
    return jsonify({
        "thought": strategy,
        "action": action,
        "confidence": 0.8
    })

@app.route('/models', methods=['GET'])
def list_models():
    """Liste les modèles disponibles"""
    try:
        response = requests.get(f"{OLLAMA_URL}/api/tags")
        if response.ok:
            models = response.json().get("models", [])
            return jsonify({
                "models": [m["name"] for m in models],
                "recommended": "qwen2.5:0.5b"
            })
    except:
        pass
    return jsonify({"models": [], "error": "Ollama offline"})

if __name__ == '__main__':
    print("🤖 Clippy Dev Server - Port 8889")
    print("   Mode Dev : Questions techniques")
    print("   Mode IA  : Dialogues de personnages !")
    print("-" * 40)
    
    # Créer le dossier logs
    os.makedirs("logs", exist_ok=True)
    
    app.run(host='0.0.0.0', port=8889, debug=False)
