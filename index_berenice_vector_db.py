#!/usr/bin/env python3
"""
Indexe Bérénice dans la Vector DB pour les dialogues LLM dynamiques
"""

import json
import os
from pathlib import Path

def index_berenice():
    print("🚀 Indexation de Bérénice dans la Vector DB...")
    
    # Check if vector build tool exists
    build_tool = Path("tools/vector_build/build_local.py")
    if not build_tool.exists():
        print("⚠️  Outil de build Vector DB non trouvé, création des fichiers seulement...")
        return
    
    # Ensure backstories directory exists
    backstories_dir = Path("vector_content/backstories_boosted")
    if backstories_dir.exists():
        print(f"✅ Dossier backstories trouvé: {backstories_dir}")
        
        # List Berenice files
        berenice_files = list(backstories_dir.glob("berenice_*.md"))
        print(f"📄 Fichiers Bérénice trouvés: {len(berenice_files)}")
        for f in berenice_files:
            print(f"   - {f.name}")
        
        # Index with vector build tool
        print("\n🔨 Construction de l'index Vector DB...")
        os.system(f"python3 {build_tool} --mode story --root {backstories_dir}")
        
        print("\n✅ Bérénice indexée avec succès!")
        print("   Elle peut maintenant générer des dialogues dynamiques!")
    else:
        print(f"❌ Dossier {backstories_dir} non trouvé!")
    
    # Also check heroes JSON
    hero_file = Path("heroes/berenice_hacker.json")
    if hero_file.exists():
        print(f"\n📋 Fichier héros trouvé: {hero_file}")
        with open(hero_file, 'r', encoding='utf-8') as f:
            hero_data = json.load(f)
            print(f"   Nom: {hero_data['name']}")
            print(f"   Titre: {hero_data['title']}")
            print(f"   Discord: BruhNice")
            print(f"   Sorts: {len(hero_data['spells'])}")
            print(f"   Cartes: {len(hero_data['cards'])}")

if __name__ == "__main__":
    index_berenice()
