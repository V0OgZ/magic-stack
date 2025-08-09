# Vector Store local (gratuit) — STORY/DEV

Objectif: indexer tous les fichiers utiles (MD/JSON/TXT/HTML) en embeddings locaux pour des recherches <10 ms, sans cloud.

## Architecture
- Embeddings: sentence-transformers (CPU) 384d (all-MiniLM-L6-v2)
- Index: FAISS (HNSW) + `meta.jsonl`
- Dossiers: `vector-store/story/` et `vector-store/dev/`

Contenu d’un store:
- `index.faiss`: vecteurs
- `meta.jsonl`: 1 ligne/chunk `{id, path, title, offset, length, mtime, sha256}`

## Installation
```bash
# depuis la racine du repo
python3 -m venv .venv
. .venv/bin/activate
pip install -r tools/vector_build/requirements.txt
```

## Construction
```bash
# STORY (filtré scénarios/lore)
python3 tools/vector_build/build_local.py --mode story --root . --out vector-store/story --threads 8

# DEV (fichiers techniques)
python3 tools/vector_build/build_local.py --mode dev --root . --out vector-store/dev --threads 8
```

- Incrémental: seuls les fichiers nouveaux/modifiés sont ré-embeddés (hash/mtime).
- Lancer en arrière-plan:
```bash
nohup python3 tools/vector_build/build_local.py --mode story --root . \
  --out vector-store/story --threads 8 > build_story.log 2>&1 &
```

## Intégration backend (prochain pas)
- Si `VECTOR_MODE=local`:
  - `/api/archives/build {mode}`: lance `build_local.py` (job non bloquant)
  - `/api/archives/search {query, mode, top_k, filters}`: charge `index.faiss` + `meta.jsonl`, embed la requête localement, retourne top_k
  - `/api/archives/status`: stats (nb chunks, date)

## Performances attendues (Mac mini M4 8c)
- 8k fichiers (10–40k chunks): 20–60 min (1er build), incrémental en minutes
- Recherche: P50 < 5 ms (top_k 20), P95 < 15 ms

## Filtrage STORY vs DEV (heuristique)
- STORY: ext {md,json,txt,html}, chemins contenant `scenarios|avalon|lore|story`
- DEV: ext {md,json}, tout hors binaires et dossiers ignorés

## Sécurité
- 100% local, aucun appel cloud
- Les stores peuvent être commités si souhaité (taille à surveiller)

## Logs
- `build_*.log` contiennent la progression et les stats
