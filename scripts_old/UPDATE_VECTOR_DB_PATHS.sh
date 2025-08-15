#!/bin/bash

# 🔮 SCRIPT DE MISE À JOUR DES CHEMINS VECTOR DB
# Adapte tous les chemins pour utiliser docs_shared

echo "🔄 MISE À JOUR DES CHEMINS VECTOR DB..."
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Vérifier le lien symbolique
if [ -L "docs_shared" ]; then
    echo -e "${GREEN}✅ Lien symbolique docs_shared trouvé${NC}"
    echo "   → $(readlink docs_shared)"
else
    echo -e "${RED}❌ Lien symbolique docs_shared manquant !${NC}"
    echo "Création du lien..."
    ln -s /Volumes/HOT_DOCS_SHARED/HOT_DEV/docs docs_shared
    echo -e "${GREEN}✅ Lien créé${NC}"
fi

echo ""
echo -e "${YELLOW}📝 Configuration Vector DB :${NC}"
echo ""

# Créer le nouveau fichier de config pour Vector DB
cat > vector_config.yaml << 'EOF'
# Configuration Vector DB 6D
vector_db:
  # Chemins des documents
  paths:
    shared_docs: ./docs_shared
    vector_assets: ./docs_shared/V - VECTOR_DB_ASSETS
    ecole_porio: ./docs_shared/🏛️ ECOLE-PORIO-NOZ
    engine_specs: ./docs_shared/___LATEST ENGINE SPECS - 0826
    
  # Indexation
  indexing:
    story_mode:
      source: ./docs_shared/V - VECTOR_DB_ASSETS
      index_name: story_6d
    dev_mode:
      source: ./docs_shared
      index_name: dev_6d
    
  # API
  api:
    port: 5002
    host: 0.0.0.0
    
  # Embeddings
  embeddings:
    model: all-MiniLM-L6-v2
    dimensions: 384
EOF

echo -e "${GREEN}✅ Configuration créée : vector_config.yaml${NC}"
echo ""

# Mettre à jour le script Python de lancement
echo -e "${BLUE}📄 Création du script de lancement adapté...${NC}"

cat > run_vector_db_updated.py << 'EOF'
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
EOF

chmod +x run_vector_db_updated.py

echo -e "${GREEN}✅ Script créé : run_vector_db_updated.py${NC}"
echo ""

# Mettre à jour le script h principal
echo -e "${YELLOW}📝 Adaptation du script h...${NC}"

# Vérifier si le script h existe
if [ -f "h" ]; then
    # Backup du script h
    cp h h.backup-$(date +%Y%m%d-%H%M%S)
    echo -e "${BLUE}  → Backup créé${NC}"
    
    # TODO: Adapter les chemins dans le script h
    echo -e "${YELLOW}  ⚠️ N'oubliez pas d'adapter manuellement les chemins dans le script h${NC}"
else
    echo -e "${RED}  ❌ Script h non trouvé${NC}"
fi

echo ""
echo -e "${GREEN}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ MISE À JOUR TERMINÉE !${NC}"
echo -e "${GREEN}═══════════════════════════════════════════${NC}"
echo ""
echo "📌 Actions effectuées :"
echo "  1. ✅ Lien symbolique vérifié/créé"
echo "  2. ✅ Configuration Vector DB créée"
echo "  3. ✅ Script de lancement adapté"
echo ""
echo "📌 À faire manuellement :"
echo "  1. Adapter le script 'h' si nécessaire"
echo "  2. Tester : python3 run_vector_db_updated.py"
echo ""
echo "📌 Rappel des contraintes :"
echo "  - docs_shared est en LECTURE SEULE"
echo "  - Ne JAMAIS copier/modifier via le symlink"
echo "  - Le symlink est ignoré par Git (.gitignore)"
echo ""
