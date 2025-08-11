#!/usr/bin/env python3
"""
Test rapide Clippy/Memento avec le modèle léger all-MiniLM-L6-v2
"""

import json
import requests
from sentence_transformers import SentenceTransformer

# Configuration
VECTOR_DB_URL = "http://localhost:5001"
MODEL_NAME = 'all-MiniLM-L6-v2'  # Modèle ultra-léger (120MB au lieu de 4GB!)

class ClippyMemento:
    def __init__(self):
        print("🧠 Chargement du modèle léger...")
        self.model = SentenceTransformer(MODEL_NAME)
        self.memory = []  # Mémoire de session
        
    def search_context(self, query, k=5):
        """Cherche dans le Vector DB"""
        try:
            response = requests.post(
                f"{VECTOR_DB_URL}/search",
                json={"query": query, "k": k}
            )
            if response.status_code == 200:
                return response.json().get('results', [])
        except:
            pass
        return []
    
    def generate_response(self, user_input):
        """Génère une réponse contextuelle"""
        # 1. Recherche dans Vector DB
        context = self.search_context(user_input)
        
        # 2. Encode la question pour similarité
        question_embedding = self.model.encode(user_input)
        
        # 3. Réponse basée sur contexte + patterns
        if "temporal" in user_input.lower() or "temps" in user_input.lower():
            base_response = "🕐 Le système temporel utilise tw (temps monde) et te (temps entité). "
            if context:
                base_response += f"D'après mes archives: {context[0].get('match', '')[:200]}..."
        
        elif "merlin" in user_input.lower():
            base_response = "🧙‍♂️ Merlin est le maître du temps dans Heroes of Time. "
            if context:
                base_response += f"Info trouvée: {context[0].get('match', '')[:200]}..."
        
        elif "régulateur" in user_input.lower() or "vince" in user_input.lower():
            base_response = "🎮 Les régulateurs (Vince, Anna, Overload) maintiennent l'équilibre. "
            if context:
                base_response += f"Détails: {context[0].get('match', '')[:200]}..."
        
        elif "aide" in user_input.lower() or "help" in user_input.lower():
            base_response = """📎 Salut ! Je suis Clippy/Memento, ton assistant Heroes of Time !
            
Je peux t'aider sur :
• 🕐 Mécaniques temporelles (tw/te, drift, paradoxes)
• 🧙‍♂️ Héros et créatures (Merlin, Arthur, etc.)
• 🎮 Régulateurs (Vince, Anna, Overload)
• ⚔️ Combat TCG et stratégies
• 🗺️ Cartes et scénarios

Pose-moi une question !"""
        
        else:
            base_response = f"🤔 Voici ce que j'ai trouvé sur '{user_input}': "
            if context:
                base_response += f"{context[0].get('match', 'Aucune info')[:300]}..."
            else:
                base_response = "💡 Je n'ai pas trouvé d'info précise, mais essaie de reformuler ou demande 'aide'."
        
        # 4. Ajouter à la mémoire
        self.memory.append({
            "question": user_input,
            "response": base_response,
            "context_found": len(context) > 0
        })
        
        return base_response
    
    def chat(self):
        """Mode chat interactif"""
        print("\n" + "="*60)
        print("📎 CLIPPY/MEMENTO - Assistant Heroes of Time")
        print("="*60)
        print("Mode: all-MiniLM-L6-v2 (ultra-léger, 50x plus rapide!)")
        print("Tape 'quit' pour sortir, 'memory' pour voir l'historique")
        print("-"*60 + "\n")
        
        while True:
            user_input = input("🎮 Toi > ").strip()
            
            if user_input.lower() == 'quit':
                print("👋 À bientôt, héros temporel !")
                break
            
            if user_input.lower() == 'memory':
                print("\n📚 MÉMOIRE DE SESSION:")
                for i, mem in enumerate(self.memory[-5:], 1):
                    print(f"{i}. Q: {mem['question'][:50]}...")
                    print(f"   Context: {'✅' if mem['context_found'] else '❌'}")
                print()
                continue
            
            response = self.generate_response(user_input)
            print(f"\n📎 Clippy > {response}\n")

def test_basic():
    """Test basique sans interaction"""
    print("🧪 TEST BASIQUE CLIPPY/MEMENTO")
    print("-"*40)
    
    clippy = ClippyMemento()
    
    # Tests automatiques
    test_queries = [
        "Comment fonctionne le système temporel ?",
        "Qui est Merlin ?",
        "Explique les régulateurs",
        "aide"
    ]
    
    for query in test_queries:
        print(f"\n❓ Question: {query}")
        response = clippy.generate_response(query)
        print(f"📎 Réponse: {response[:300]}...")
        print("-"*40)

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "test":
        test_basic()
    else:
        # Mode chat interactif
        clippy = ClippyMemento()
        clippy.chat()
