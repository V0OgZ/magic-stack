# VectorDB — Modes STORY et DEV (Guides d’usage)

## Objectif
Unifier la recherche sémantique: usage narratif en jeu (STORY) et usage développeur (DEV) pour retrouver scripts, JSON, MD, assets.

## Endpoints
- GET `/api/archives/status`
- POST `/api/archives/build` `{ mode: "story"|"dev" }` (optionnel; défaut "story")
- POST `/api/archives/search` `{ query, top_k?, mode: "story"|"dev", filters? }`

## Recommandations d’usage
- STORY: requêtes côté jeu (clippy, lore, choix de mission), privilégier filtres `type:md|json`, tags `scenario`, `lore`.
- DEV: requêtes pour navigation technique, inclure chemins complets, rechercher par noms/structures.

## Exemples
```bash
# Build (story)
curl -s -X POST :3001/api/archives/build -H 'Content-Type: application/json' -d '{"mode":"story"}' | jq .

# Search scenarios (story)
curl -s -X POST :3001/api/archives/search -H 'Content-Type: application/json' \
  -d '{"query":"scenario:initiation OR map:forest","top_k":20,"mode":"story","filters":{"ext":"json"}}' | jq .

# Search dev (chemins et MD liés)
curl -s -X POST :3001/api/archives/search -H 'Content-Type: application/json' \
  -d '{"query":"folder:Avalon AND (ext:json OR ext:md)","top_k":50,"mode":"dev"}' | jq .
```

## Intégration Front (Aventure)
- Utiliser `mode:story` pour construire l’inventaire Missions (JSON) et lier les MD (lore).
- Conserver localement un cache mapping JSON↔MD (réduit les hits).
- Pour l’édition ou la maintenance: passer en `mode:dev` dans les outils internes.

## Performances
- 8 000 fichiers: scan + embeddings local compact ≈ 45–120 min la première fois; incrémental ensuite.
- Préférez des requêtes ciblées (tags, dossiers) et `top_k` raisonnable (10–50).
