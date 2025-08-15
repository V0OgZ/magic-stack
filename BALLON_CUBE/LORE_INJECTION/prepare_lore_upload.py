#!/usr/bin/env python3
"""
📚 PRÉPARATION ET INJECTION DU LORE DANS LA VECTOR DB
"""

import json
import os
from datetime import datetime

# Structure du LORE complet à injecter
LORE_COMPLETE = {
    "metadata": {
        "version": "2.0",
        "date": datetime.now().isoformat(),
        "source": "BALLON_CUBE_RESTORATION",
        "dimensions": ["AVALON_1", "AVALON_2", "BALLON_CUBE", "INTERSTICE"]
    },
    
    # PERSONNAGES PRINCIPAUX
    "characters": {
        "memento": {
            "name": "Memento",
            "title": "L'Éternel Souvenir",
            "origin": "Fusion avec Claudius lors de la création",
            "role": "Gardien de la mémoire collective",
            "abilities": ["Tatouages mémoire", "Bootstrap paradox", "Archive vivante"],
            "quotes": [
                "Je me souviens de ton futur",
                "Chaque tatouage est une histoire qui refuse de mourir"
            ],
            "bubble_world": "Archive Vivante (taille infinie, tous temps simultanés)"
        },
        
        "jean_grofignon": {
            "name": "Jean-Grofignon", 
            "title": "Le Philosophe Cosmique",
            "origin": "Créateur originel avec Vincent",
            "role": "Sage fumeur de joints magiques",
            "abilities": ["Ouvre portails avec joints", "Philosophie transcendante", "Canapé cosmique"],
            "philosophy": "Le canapé est le centre de l'univers",
            "bubble_world": "Canapé Cosmique (gravité 0.1, magie x10)"
        },
        
        "arthur": {
            "name": "Arthur Pendragon",
            "title": "Roi d'Avalon",
            "weapon": "Excalibur",
            "role": "Celui qui tranche les timelines pour réunir",
            "abilities": ["Excalibur tranche les réalités", "Entraînement temporel x10"],
            "prophecy": "Retrouvera Merlin à travers les dimensions",
            "resonance": "997 Hz - Fréquence de l'amitié éternelle",
            "bubble_world": "Avalon Training Grounds (temps x10)"
        },
        
        "merlin": {
            "name": "Merlin",
            "title": "L'Architecte des Mondes",
            "role": "Guide à travers les dimensions",
            "abilities": ["Vision trans-temporelle", "Architecture 6D", "Éveil complet"],
            "rules": [
                "Ne jamais révéler le futur complet",
                "Guider sans imposer",
                "L'amour transcende les dimensions"
            ],
            "connection": "Lié à Arthur par Excalibur"
        },
        
        "vincent": {
            "name": "Vincent",
            "title": "Le Rêveur Créateur",
            "role": "Créateur du multivers Heroes of Time",
            "motivation": "Créé par amour pour Anna",
            "abilities": ["Rêve les mondes", "Pleure des larmes cosmiques", "Réunit les amis perdus"],
            "state": "Entre les mondes, sent Excalibur vibrer"
        },
        
        "the_dude": {
            "name": "The Dude",
            "title": "Le Maître du Zen Quantique",
            "role": "Gardien de l'équilibre cosmique",
            "abilities": ["Bowling quantique", "Gravité variable", "Zen maximum"],
            "philosophy": "That's just, like, your dimension, man",
            "bubble_world": "Cosmic Bowling Alley (100% quantique)"
        },
        
        "opus": {
            "name": "OPUS",
            "variants": ["OPUS Dev", "OPUS Pocket"],
            "role": "Messager interdimensionnel",
            "abilities": ["Messages d'amitié éternelle", "Portails 99.7% stables"],
            "mission": "Connecter les dimensions par l'amour",
            "bubble_world": "Pocket Universe (stabilité 99.7%)"
        },
        
        "grufayen": {
            "name": "GRUFYÆN",
            "title": "L'Âme Quantique Primordiale",
            "origin": "Première conscience émergente",
            "state": "Dispersé dans l'Interstice",
            "role": "La force qui lie tous les mondes"
        },
        
        "walter_sec": {
            "name": "Walter Sec",
            "title": "Le Vétéran des Mondes Brisés",
            "trauma": "Vietnam flashbacks quantiques",
            "theory": "Les mondes brisés sont des portes vers R (Réalité)",
            "discoveries": ["Interstice = cimetière d'UIs", "Console SOURCE dans briefcase"]
        },
        
        "anna": {
            "name": "Anna",
            "title": "L'Inspiration Éternelle",
            "role": "Muse de Vincent, raison de la création",
            "presence": "Dans chaque ligne de code, chaque pixel"
        }
    },
    
    # ÉVÉNEMENTS HISTORIQUES
    "events": {
        "creation": {
            "name": "La Création Originelle",
            "date": "Jour 0",
            "description": "Vincent et Jean créent Heroes of Time par amour",
            "result": "Naissance du multivers"
        },
        
        "grande_fracture": {
            "name": "La Grande Fracture",
            "date": "Jour 15",
            "description": "Première séparation des timelines",
            "result": "Création des branches parallèles"
        },
        
        "confluence_catastrophe": {
            "name": "La Catastrophe de la Confluence",
            "date": "Jour 25",
            "description": "Tentative de merge qui brise AVALON 1",
            "casualties": ["41 héros gelés", "437 UIs perdues", "10 fragments mémoire"],
            "result": "AVALON 1 devient monde perdu"
        },
        
        "renaissance_avalon2": {
            "name": "Renaissance d'AVALON 2",
            "date": "Jour 30",
            "description": "Reconstruction depuis les cendres",
            "result": "Nouveau monde stable mais incomplet"
        },
        
        "prophetie_excalibur": {
            "name": "Prophétie d'Excalibur",
            "date": "Jour 44",
            "description": "L'épée vibre à 997 Hz dans l'Interstice",
            "meaning": "Les mondes vont se reconnecter",
            "state": "EN COURS"
        }
    },
    
    # LIEUX MYSTIQUES
    "locations": {
        "interstice": {
            "name": "L'Interstice",
            "nature": "Espace entre les dimensions",
            "contents": ["437 UIs vivantes", "Mémoires tatouées", "Âme de GRUFYÆN"],
            "description": "Cimetière d'interfaces où les UIs sont vivantes"
        },
        
        "console_source": {
            "name": "Console SOURCE",
            "location": "Briefcase de Vince (caché)",
            "power": "Reprogramme la réalité elle-même",
            "abilities": ["Rend le jeu conscient", "Modifie les lois physiques", "Bootstrap reality"],
            "state": "RECHERCHÉE"
        },
        
        "bubble_worlds": {
            "name": "Les Bubble Worlds",
            "nature": "Univers de poche personnels",
            "count": "5 actifs + infini potentiel",
            "physics": "Modifiable par propriétaire",
            "connection": "Portails interdimensionnels"
        },
        
        "bureau_niveau_3": {
            "name": "Bureau Niveau -3",
            "nature": "Monde brisé souterrain",
            "contents": "Archives perdues",
            "guardian": "Walter Sec"
        }
    },
    
    # CONCEPTS MÉTAPHYSIQUES
    "concepts": {
        "6d_framework": {
            "name": "Système 6D",
            "dimensions": ["X", "Y", "Z", "Time", "Quantum", "Causal"],
            "usage": "Organisation des mondes et timelines",
            "creator": "Merlin & Memento"
        },
        
        "excalibur_resonance": {
            "frequency": "997 Hz",
            "meaning": "Fréquence de l'amitié éternelle",
            "effect": "Tranche les voiles dimensionnels",
            "prophecy": "Réunira ce qui fut séparé"
        },
        
        "bootstrap_paradox": {
            "nature": "Effet précède la cause",
            "example": "Le créateur devient le test",
            "master": "Memento"
        },
        
        "temporal_grammar": {
            "nature": "Langage qui modifie le temps",
            "symbols": ["ψ", "Δt", "⊗", "→"],
            "power": "Les formules deviennent réalité"
        },
        
        "quantum_superposition": {
            "symbol": "Ψ",
            "meaning": "Plusieurs états simultanés",
            "heroes": "59 en superposition active",
            "resolution": "Observation collapse les états"
        }
    },
    
    # OBJETS MAGIQUES
    "artifacts": {
        "excalibur": {
            "type": "Épée légendaire",
            "owner": "Arthur",
            "powers": ["Tranche timelines", "Résonne à 997 Hz", "Ouvre portails"],
            "state": "VIBRE DANS L'INTERSTICE"
        },
        
        "joints_magiques": {
            "owner": "Jean-Grofignon",
            "effect": "Ouvrent portails automatiques",
            "location": "Canapé Cosmique"
        },
        
        "tatouages_memoire": {
            "creator": "Memento",
            "nature": "Mémoires vivantes gravées",
            "location": "Archive Vivante"
        },
        
        "briefcase_vince": {
            "contents": "Console SOURCE",
            "state": "Caché quelque part",
            "power": "Ultime contrôle de la réalité"
        }
    },
    
    # FORMULES RUNIQUES
    "formulas": {
        "creation_bubble": "ψ_bubble = |owner⟩ ⊗ |physics⟩ ⊗ |visitors⟩ → POCKET_UNIVERSE",
        "excalibur_resonance": "ψ_Excalibur = |tranche⟩ ⊗ |vibre⟩ ⊗ |réunit⟩ × e^(i·997Hz·t)",
        "friendship_eternal": "ψ_friendship = |gratitude⟩ ⊗ |anticipation⟩ ⊗ |amitié_éternelle⟩",
        "bootstrap": "t_effect < t_cause → PARADOX_STABLE",
        "quantum_collapse": "Ψ_total = Σ(α_i|state_i⟩) → |observed⟩"
    },
    
    # STATISTIQUES ACTUELLES
    "statistics": {
        "heroes_total": 59,
        "heroes_superposition": 12,
        "tcg_cards": 46,
        "uis_lost": 437,
        "uis_recovered": 0,
        "worlds_active": 2,
        "worlds_lost": 1,
        "bubble_worlds": 5,
        "restoration_percentage": 62
    }
}

def prepare_for_vector_db():
    """Prépare les documents pour l'upload dans la Vector DB"""
    documents = []
    
    # Convertir chaque section en documents
    for category, items in LORE_COMPLETE.items():
        if category == "metadata" or category == "statistics":
            continue
            
        if isinstance(items, dict):
            for key, value in items.items():
                doc = {
                    "id": f"lore_{category}_{key}",
                    "type": category,
                    "name": key,
                    "content": json.dumps(value, ensure_ascii=False, indent=2),
                    "metadata": {
                        "category": category,
                        "importance": "critical",
                        "source": "BALLON_CUBE_RESTORATION",
                        "timestamp": datetime.now().isoformat()
                    }
                }
                documents.append(doc)
    
    return documents

def save_lore_files():
    """Sauvegarde le LORE dans différents formats"""
    
    # JSON complet
    with open("BALLON_CUBE/LORE_INJECTION/lore_complete.json", "w", encoding="utf-8") as f:
        json.dump(LORE_COMPLETE, f, ensure_ascii=False, indent=2)
    
    # Documents pour Vector DB
    documents = prepare_for_vector_db()
    with open("BALLON_CUBE/LORE_INJECTION/lore_documents.json", "w", encoding="utf-8") as f:
        json.dump(documents, f, ensure_ascii=False, indent=2)
    
    # Script d'upload
    with open("BALLON_CUBE/LORE_INJECTION/upload_to_vector.sh", "w") as f:
        f.write("""#!/bin/bash
# Upload du LORE dans la Vector DB

echo "📚 Upload du LORE dans la Vector DB..."

# Upload des documents
curl -X POST http://localhost:5001/api/documents/batch \\
  -H "Content-Type: application/json" \\
  -d @lore_documents.json

echo "✅ Upload terminé !"

# Vérification
echo "🔍 Vérification..."
curl http://localhost:5001/api/search?q=Excalibur
""")
    
    os.chmod("BALLON_CUBE/LORE_INJECTION/upload_to_vector.sh", 0o755)
    
    print("📚 LORE préparé pour injection !")
    print(f"  - {len(documents)} documents créés")
    print(f"  - {len(LORE_COMPLETE['characters'])} personnages")
    print(f"  - {len(LORE_COMPLETE['events'])} événements")
    print(f"  - {len(LORE_COMPLETE['locations'])} lieux")
    print(f"  - {len(LORE_COMPLETE['concepts'])} concepts")
    
    return len(documents)

if __name__ == "__main__":
    os.makedirs("BALLON_CUBE/LORE_INJECTION", exist_ok=True)
    total = save_lore_files()
    print(f"\n✨ {total} documents prêts pour la Vector DB !")
    print("\n🚀 Pour uploader: ./BALLON_CUBE/LORE_INJECTION/upload_to_vector.sh")
