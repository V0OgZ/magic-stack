# Archives Vivantes - Système de Base Vectorielle

## Vue d'ensemble

Les Archives Vivantes sont un système de recherche sémantique pour indexer et explorer les 8000+ fichiers du projet SpinForest. Utilise LanceDB pour des embeddings vectoriels performants.

## Architecture

```
archives-vivantes/
├── README.md           (ce fichier)
├── setup.py            (installation)
├── index_files.py      (indexation)
├── search.py           (recherche)
└── config.json         (configuration)
```

## Installation

```bash
# Installer LanceDB et dépendances
pip install lancedb sentence-transformers

# Ou via setup.py
python archives-vivantes/setup.py
```

## Utilisation

### 1. Indexer les fichiers

```bash
# Indexer tout SpinForest
python archives-vivantes/index_files.py

# Indexer un dossier spécifique
python archives-vivantes/index_files.py --path AVALON/
```

### 2. Rechercher

```bash
# Recherche en ligne de commande
python archives-vivantes/search.py "comment fonctionne la magie 6D"

# API Python
from archives_vivantes import search
results = search.semantic_search("héros de l'interstice")
```

### 3. Interface Web (TODO)

Une interface 3D de bibliothèque mystique sera créée pour explorer visuellement les archives.

## Configuration

`config.json`:
```json
{
  "model": "all-MiniLM-L6-v2",
  "db_path": "./archives.lance",
  "chunk_size": 512,
  "overlap": 50
}
```

## Intégration avec le Jeu

Les Archives Vivantes seront accessibles in-game pour :
- Rechercher des sorts dans la Magic Stack
- Explorer le lore d'Avalon
- Trouver des secrets cachés
- Apprendre l'histoire du monde

## Performance

- Indexation : ~1000 fichiers/minute
- Recherche : <100ms pour 8000 fichiers
- Mémoire : ~500MB pour le modèle + index

## Roadmap

- [x] Architecture de base
- [ ] Scripts d'indexation
- [ ] API de recherche
- [ ] Interface web simple
- [ ] Interface 3D immersive
- [ ] Intégration in-game

---

*"Les archives ne sont pas mortes, elles vivent et respirent avec chaque requête"*
