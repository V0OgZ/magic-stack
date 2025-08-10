#!/usr/bin/env python3
"""
🔮 VECTOR DB 6D - VERSION ADAPTÉE DOCS_SHARED
"""

import os
import sys
from pathlib import Path
import yaml

# Charger la config
with open('vector_config.yaml', 'r') as f:
    config = yaml.safe_load(f)

# Définir les chemins
DOCS_SHARED = Path(config['vector_db']['paths']['shared_docs'])
VECTOR_ASSETS = Path(config['vector_db']['paths']['vector_assets'])

print("🔮 VECTOR DB 6D - CONFIGURATION")
print("=" * 50)
print(f"📂 Docs partagés : {DOCS_SHARED}")
print(f"📦 Assets Vector : {VECTOR_ASSETS}")
print(f"🔗 Lien valide : {DOCS_SHARED.exists()}")
print("=" * 50)

if not DOCS_SHARED.exists():
    print("❌ ERREUR : Le lien symbolique docs_shared n'existe pas !")
    print("  Exécutez d'abord : ln -s /Volumes/HOT_DOCS_SHARED/HOT_DEV/docs docs_shared")
    sys.exit(1)

# Importer et lancer le serveur Vector DB
sys.path.insert(0, str(Path(__file__).parent / 'vector_local' / 'api'))

try:
    from vector_server_6d import VectorDB6D, app
    
    print("\n🚀 Lancement du serveur Vector DB...")
    vector_db = VectorDB6D()
    
    # Construction de l'index si nécessaire
    if input("\n❓ Construire l'index ? (o/n) : ").lower() == 'o':
        mode = input("Mode (story/dev) : ").lower()
        if mode == 'story':
            vector_db.build_index_from_directory(str(VECTOR_ASSETS))
        else:
            vector_db.build_index_from_directory(str(DOCS_SHARED))
    
    # Lancer le serveur
    app.run(
        host=config['vector_db']['api']['host'],
        port=config['vector_db']['api']['port'],
        debug=True
    )
    
except ImportError as e:
    print(f"❌ Erreur d'import : {e}")
    print("Installez les dépendances : pip install -r requirements.txt")
except Exception as e:
    print(f"❌ Erreur : {e}")
