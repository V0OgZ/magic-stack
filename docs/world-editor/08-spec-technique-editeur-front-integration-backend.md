# Spéc technique – Éditeur (Front) + Intégration Backend

## Stack
- **Front** : React + Canvas/WebGL (PixiJS 2D, ThreeJS 3D pour V2).
- **API** : REST + WebSocket (temps réel).
- **Formats** : JSON (configs, patches RFC6902), YAML (OpenAPI).

## Architecture (simplifiée)
Editor ↔ (REST/WS) ↔ Gateway (Python) ↔ Controllers (Rust) ↔ Storage (JSON/Assets)

### Modules Front
- **Dashboard** : projets, templates, import/export.
- **Map Editor** : tools (brush/erase/fill/clone), layers (terrain/objects/zones), objets (portails/coffres/PNJ/agents).
- **Timeline** : créer événements (`spawn`, `portal_open`, `combat`, `dialog`, `custom`), lier causalité.
- **World Params** : vitesse temps, météo, IA globale, règles HoT/TCG/Sandbox/PNC.
- **Code Panel** : JS/TS/Python optionnel, autocomplétion API Avalon.
- **Test/Export** : simulate ↔ play ↔ export zip/tar.

### États Front (stores)
- `project`: id, template, metadata.
- `world`: snapshot, version, pending patches.
- `selection`: nodes/agents/events.
- `timeline`: events, links, simulation trace.
- `runtime`: sim status, ws status, logs.

### WebSocket Topics
- `world.{id}.patch` (JSON Patch + seq)
- `world.{id}.events` (runtime events)
- `agent.{id}.tick` (télémétrie IA)
- `sim.{id}.status` (progress)

### Memento / vectorDB
- **But** : recherche contextuelle dans docs (incl. **V2Spec**), explications, snippets.
- **API interne** (pseudo):
  - `POST /memento/ask { query, project_id, scope:["V2Spec","API","Examples"] }`
  - Retour: `{ answer, citations:[{title,doc_id,section}] }`
- **UI** : sidebar, citations cliquables.
- **Indexation** : V2Spec + ces fichiers → vectorDB.

### Préférences de perf (MVP)
- 60 fps UI (map pan/zoom, drag).
- Sim deterministic +300s < 150 ms sur carte démo.
- Patch apply p95 < 25 ms (local).

### Sécurité
- JWT (scopes: read/write world, simulate, tcg).
- Rate limit `simulate`, `patch`.
- Validation JSON Schema avant POST/PATCH.
03_API_REFERENCE.md
