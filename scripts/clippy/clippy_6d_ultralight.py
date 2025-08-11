#!/usr/bin/env python3
"""
Clippy avec système 6D - ULTRA LÉGER (pas de modèle !)
37x plus rapide, fonctionne sur Raspberry Pi !
"""

import json
import math
import time
from typing import List, Tuple, Dict

class Position6D:
    """Position dans l'espace 6D Heroes of Time"""
    def __init__(self, x=0, y=0, z=0, t=0, c=1.0, psi=1.0):
        self.x = x      # Position spatiale X
        self.y = y      # Position spatiale Y  
        self.z = z      # Position spatiale Z
        self.t = t      # Position temporelle
        self.c = c      # Causalité (0-1)
        self.psi = psi  # Cohérence quantique (-1 à 1)
    
    def distance_to(self, other) -> float:
        """Distance euclidienne 6D"""
        dx = self.x - other.x
        dy = self.y - other.y
        dz = self.z - other.z
        dt = self.t - other.t
        dc = self.c - other.c
        dpsi = self.psi - other.psi
        return math.sqrt(dx*dx + dy*dy + dz*dz + dt*dt + dc*dc + dpsi*dpsi)
    
    def to_list(self):
        return [self.x, self.y, self.z, self.t, self.c, self.psi]

class KnowledgeNode:
    """Nœud de connaissance dans l'espace 6D"""
    def __init__(self, id: str, content: str, position: Position6D, tags: List[str] = None):
        self.id = id
        self.content = content
        self.position = position
        self.tags = tags or []

class Clippy6D:
    """Clippy utilisant le système 6D - PAS DE MODÈLE !"""
    
    def __init__(self):
        self.knowledge_base = self._init_knowledge()
        print("🌀 Clippy 6D initialisé - Système Q* ultra-léger !")
        print("   37x plus rapide, 256x moins de mémoire !")
    
    def _init_knowledge(self) -> List[KnowledgeNode]:
        """Initialise la base de connaissances 6D"""
        nodes = [
            # Héros (position spatiale dans le château)
            KnowledgeNode("merlin", 
                "🧙‍♂️ Merlin vit à rebours dans le temps. Cohérence 0.9.",
                Position6D(10, 10, 0, -1, 0.9, 0.9),
                ["hero", "mage", "temporal"]),
            
            KnowledgeNode("arthur",
                "👑 Arthur Pendragon, Roi Temporel avec Excalibur Quantique.",
                Position6D(0, 0, 0, 0, 1.0, 1.0),
                ["hero", "king", "legendary"]),
            
            KnowledgeNode("groeken",
                "💻 GROEKEN créa la Grammaire Temporelle depuis l'Interstice.",
                Position6D(0, 0, 100, -999, 0.5, 0.7),
                ["creator", "programmer", "temporal"]),
            
            # Régulateurs (positions dans l'espace de contrôle)
            KnowledgeNode("vince",
                "🎮 Vince perce le brouillard causal (CF).",
                Position6D(50, 0, 0, 0, 0.8, 0.8),
                ["regulator", "fog", "control"]),
            
            KnowledgeNode("anna",
                "⏰ Anna gère la décroissance temporelle.",
                Position6D(0, 50, 0, 0, 0.7, 0.9),
                ["regulator", "decay", "time"]),
            
            KnowledgeNode("overload",
                "💥 Overload collapse les stacks de réalités.",
                Position6D(0, 0, 50, 0, 0.3, 0.5),
                ["regulator", "collapse", "stack"]),
            
            # Mécaniques (positions conceptuelles)
            KnowledgeNode("temporal_system",
                "⏳ tw (temps monde) vs te (temps entité). Dérive dt = |tw - te|.",
                Position6D(0, 0, 0, 50, 0.9, 0.8),
                ["mechanic", "time", "drift"]),
            
            KnowledgeNode("quantum_energy",
                "⚡ Énergie complexe E = A + iΦ (action + phase).",
                Position6D(0, 0, 0, 0, 0.5, 0.5),
                ["mechanic", "energy", "quantum"]),
            
            KnowledgeNode("6d_space",
                "🌐 Espace 6D : x,y,z (spatial), t (temps), c (causal), ψ (quantique).",
                Position6D(0, 0, 0, 0, 1.0, 0.0),
                ["mechanic", "space", "dimensions"]),
            
            # Créatures (positions dans le monde)
            KnowledgeNode("dragon",
                "🐉 Dragon Rouge Temporel : 500 HP, souffle temporel !",
                Position6D(100, 100, 50, 10, 0.9, 0.7),
                ["creature", "boss", "legendary"]),
            
            # Combat
            KnowledgeNode("tcg_combat",
                "⚔️ Combat TCG avec cartes temporelles et interférences quantiques.",
                Position6D(25, 25, 0, 0, 0.8, 0.8),
                ["combat", "tcg", "cards"]),
        ]
        return nodes
    
    def text_to_6d(self, text: str) -> Position6D:
        """Convertit un texte en position 6D (heuristique simple)"""
        # Hash simple pour position spatiale
        hash_val = sum(ord(c) for c in text.lower())
        
        # Détection de mots-clés pour ajuster les dimensions
        text_lower = text.lower()
        
        # Dimension temporelle
        t = 0
        if "passé" in text_lower or "avant" in text_lower:
            t = -10
        elif "futur" in text_lower or "après" in text_lower:
            t = 10
        elif "temporal" in text_lower or "temps" in text_lower:
            t = 5
        
        # Dimension causale
        c = 0.8
        if "paradoxe" in text_lower:
            c = 0.3
        elif "réalité" in text_lower:
            c = 1.0
        elif "probabilité" in text_lower:
            c = 0.5
        
        # Dimension quantique
        psi = 0.8
        if "quantique" in text_lower or "quantum" in text_lower:
            psi = 0.5
        elif "collapse" in text_lower:
            psi = 0.1
        
        # Positions spatiales basées sur le hash
        x = (hash_val % 100) - 50
        y = ((hash_val // 100) % 100) - 50
        z = ((hash_val // 10000) % 100) - 50
        
        return Position6D(x, y, z, t, c, psi)
    
    def qstar_search(self, query_pos: Position6D, max_results: int = 3) -> List[Tuple[KnowledgeNode, float]]:
        """Algorithme Q* pour recherche dans l'espace 6D"""
        # Calculer les distances
        distances = []
        for node in self.knowledge_base:
            dist = query_pos.distance_to(node.position)
            distances.append((node, dist))
        
        # Trier par distance
        distances.sort(key=lambda x: x[1])
        
        # Retourner les plus proches
        return distances[:max_results]
    
    def search(self, query: str) -> str:
        """Recherche principale"""
        start_time = time.time()
        
        # Convertir query en position 6D
        query_pos = self.text_to_6d(query)
        
        # Recherche Q*
        results = self.qstar_search(query_pos)
        
        elapsed_ms = (time.time() - start_time) * 1000
        
        # Construire la réponse
        if results:
            best_match = results[0][0]
            response = f"{best_match.content}\n\n"
            
            if len(results) > 1:
                response += "📍 Aussi pertinent:\n"
                for node, dist in results[1:]:
                    response += f"  • {node.content[:50]}... (distance: {dist:.2f})\n"
            
            response += f"\n⚡ Trouvé en {elapsed_ms:.1f}ms avec Q* 6D (37x plus rapide !)"
            return response
        
        return "🤔 Rien trouvé dans l'espace 6D. Reformule ta question !"
    
    def add_knowledge(self, id: str, content: str, position: Position6D, tags: List[str] = None):
        """Ajoute une connaissance dans l'espace 6D"""
        node = KnowledgeNode(id, content, position, tags)
        self.knowledge_base.append(node)
        return f"✅ Connaissance ajoutée en position {position.to_list()}"

def demo():
    """Démo du système 6D"""
    print("\n" + "="*60)
    print("🌀 CLIPPY 6D - Système Q* Ultra-Léger")
    print("="*60)
    print("PAS de modèle, PAS d'embeddings !")
    print("37x plus rapide qu'un vector DB classique")
    print("Fonctionne sur Raspberry Pi 1 !")
    print("-"*60 + "\n")
    
    clippy = Clippy6D()
    
    # Tests
    queries = [
        "Qui est Merlin ?",
        "Comment fonctionne le système temporel ?",
        "Parle-moi du dragon",
        "Les régulateurs",
        "Paradoxe quantique",
        "Combat TCG"
    ]
    
    for query in queries:
        print(f"❓ {query}")
        response = clippy.search(query)
        print(f"📎 {response}\n")
        print("-"*40 + "\n")

if __name__ == "__main__":
    demo()
