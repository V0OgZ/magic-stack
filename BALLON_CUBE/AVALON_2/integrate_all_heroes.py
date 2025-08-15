#!/usr/bin/env python3
"""
🎯 Script d'intégration de TOUS les héros dans Ballon Cube
Récupère les héros depuis tous les JSON et les intègre
"""

import json
import os
import requests
from typing import Dict, List, Any

# Configuration
INTERSTICE_URL = "http://localhost:8082/api/entities"
VECTOR_DB_URL = "http://localhost:5001"

def load_heroes_from_json(file_path: str) -> List[Dict]:
    """Charge les héros depuis un fichier JSON"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        # Extraire les héros selon la structure du fichier
        if 'extracted_heroes' in data:
            return data['extracted_heroes'].get('heroes', [])
        elif 'epic_heroes' in data:
            return data['epic_heroes']
        elif 'heroes' in data:
            return data['heroes']
        else:
            return []
    except Exception as e:
        print(f"❌ Erreur lecture {file_path}: {e}")
        return []

def convert_hero_to_6d(hero: Dict) -> Dict:
    """Convertit un héros en format 6D pour Ballon Cube"""
    import random
    
    # Format unifié 6D
    hero_6d = {
        "id": hero.get("id", f"hero_{random.randint(1000,9999)}"),
        "name": hero.get("name", "Unknown Hero"),
        "title": hero.get("title", hero.get("class", "Hero")),
        "icon": hero.get("icon", "🦸"),
        
        # Position 6D
        "x": random.randint(100, 700),
        "y": random.randint(100, 500),
        "z": random.randint(-20, 20),
        "t": random.randint(-20, 20),
        "psi": 1 + random.random() * 3,  # Superposition quantique
        "deltaT": 0.5 + random.random() * 1.5,  # Vitesse temporelle
        
        # Stats
        "stats": hero.get("stats", {}),
        "abilities": hero.get("abilities", []),
        "equipment": hero.get("equipment", []),
        
        # Métadonnées
        "description": hero.get("description", ""),
        "philosophy": hero.get("philosophy", ""),
        "backstory": hero.get("backstory", ""),
        "source": hero.get("source_file", "unknown"),
        
        # État
        "connected": False,
        "last_action": None,
        "memory": []
    }
    
    # Ajouter une icône basée sur la classe si pas d'icône
    if hero_6d["icon"] == "🦸":
        class_icons = {
            "Reality Forger": "🔨",
            "World Weaver": "🌙",
            "Nexus Guardian": "🛡️",
            "Dragon Slayer": "🐉",
            "Roi-Chevalier": "👑",
            "Paladine Sainte": "⚔️",
            "mage": "🧙‍♂️",
            "sorceress": "🧙‍♀️",
            "temporal_mage": "⏰",
            "paradox_hunter": "🔮"
        }
        hero_6d["icon"] = class_icons.get(hero.get("class", ""), "🦸")
    
    return hero_6d

def upload_to_interstice(hero: Dict) -> bool:
    """Upload un héros vers l'Interstice Java"""
    try:
        # Créer l'entité 6D
        entity = {
            "id": hero["id"],
            "name": hero["name"],
            "type": "HERO",
            "position": {
                "x": hero["x"],
                "y": hero["y"],
                "z": hero["z"],
                "t": hero["t"],
                "timeline": "main",
                "psi": hero["psi"],
                "deltaT": hero["deltaT"]
            },
            "attributes": {
                "title": hero["title"],
                "icon": hero["icon"],
                "stats": hero["stats"],
                "abilities": hero["abilities"],
                "description": hero["description"]
            },
            "memoryTattoos": [
                {
                    "content": hero.get("backstory", hero.get("description", "")),
                    "type": "ORIGIN",
                    "timestamp": "2025-08-14T00:00:00Z"
                }
            ]
        }
        
        response = requests.post(
            f"{INTERSTICE_URL}/{hero['id']}",
            json=entity,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code in [200, 201]:
            print(f"✅ {hero['name']} uploadé dans l'Interstice")
            return True
        else:
            print(f"❌ Erreur upload {hero['name']}: {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print(f"⚠️ Interstice non disponible pour {hero['name']}")
        return False
    except Exception as e:
        print(f"❌ Erreur: {e}")
        return False

def main():
    """Fonction principale"""
    print("="*50)
    print("🎯 INTÉGRATION DE TOUS LES HÉROS")
    print("="*50)
    
    # Chemins vers les fichiers de héros
    hero_files = [
        "/Volumes/HOT_DEV/Magic/magic-stack/Treasures/💠 Essences scellées/🧙 Heroes/extracted_heroes.json",
        "/Volumes/HOT_DEV/Magic/magic-stack/Treasures/💠 Essences scellées/🧙 Heroes/epic/epic-heroes.json",
        "/Volumes/HOT_DEV/Magic/magic-stack/Treasures/💠 Essences scellées/🧙 Heroes/eclat/eclat-heroes-dissolus.json",
        "/Volumes/HOT_DEV/Magic/magic-stack/Treasures/💠 Essences scellées/🧙 Heroes/cosmic/cosmic-heroes.json",
        "/Volumes/HOT_DEV/Magic/magic-stack/BACKUP_JOUR35/hot/entities/ALL_HEROES_COMPLETE.json"
    ]
    
    all_heroes = []
    
    # Charger tous les héros
    for file_path in hero_files:
        if os.path.exists(file_path):
            print(f"\n📂 Chargement: {os.path.basename(file_path)}")
            heroes = load_heroes_from_json(file_path)
            print(f"   → {len(heroes)} héros trouvés")
            all_heroes.extend(heroes)
    
    # Convertir en format 6D
    print(f"\n🔄 Conversion de {len(all_heroes)} héros en format 6D...")
    heroes_6d = [convert_hero_to_6d(hero) for hero in all_heroes]
    
    # Dédupliquer par ID
    unique_heroes = {}
    for hero in heroes_6d:
        if hero["id"] not in unique_heroes:
            unique_heroes[hero["id"]] = hero
    
    print(f"📊 {len(unique_heroes)} héros uniques après déduplication")
    
    # Sauvegarder localement
    output_file = "BALLON_CUBE/AVALON_2/ALL_HEROES_6D.json"
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump({
            "version": "2.0",
            "total": len(unique_heroes),
            "heroes": list(unique_heroes.values())
        }, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 Sauvegardé dans {output_file}")
    
    # Uploader vers l'Interstice
    print("\n📡 Upload vers l'Interstice...")
    uploaded = 0
    for hero_id, hero in unique_heroes.items():
        if upload_to_interstice(hero):
            uploaded += 1
    
    print(f"\n✅ {uploaded}/{len(unique_heroes)} héros uploadés")
    
    # Afficher la liste complète
    print("\n" + "="*50)
    print("📋 LISTE COMPLÈTE DES HÉROS:")
    print("="*50)
    
    for i, (hero_id, hero) in enumerate(unique_heroes.items(), 1):
        print(f"{i:3}. {hero['icon']} {hero['name']:20} - {hero['title']}")
    
    print("\n🎉 Intégration terminée !")

if __name__ == "__main__":
    main()
