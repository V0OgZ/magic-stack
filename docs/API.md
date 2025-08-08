# Magic Stack Rust API

Base URL: http://localhost:${RUST_PORT} (default 3001)

## Changes in this release
- Causality resolve now awards XP idempotently (server-side dedupe).
- Collapse accepts `playerId` and gives a small idempotent XP bonus.
- Map init creates stable `gathering_spot` nodes with schema: `kind`, `pos`, `windows`, `yield`, `depleted`.
- Collect infers item kind from the target spot node.

## Health
- GET `/health`
- POST `/health`

## Agents
- POST `/agents/tick`
- POST `/agents/plan`
- POST `/agents/fork`
- POST `/agents/merge`
- POST `/agents/control`
- POST `/agents/cast`

## Matches
- POST `/matches`
- GET `/matches/:id/state`

## Q* / World State
- POST `/api/qstar/search`
- POST `/api/world-state/nodes`
- GET `/api/world-state/nodes/:id`
- POST `/api/world-state/nodes/:id/position`
- GET `/api/world-state/identities/:id/doubles`
- GET `/api/world-state/nodes/radius`
- POST `/api/world-state/collapse`

## Causality / Formulas
- POST `/api/causality/resolve`
- POST `/api/test/all-formulas`
- POST `/api/integration/formula-cast`

## Map
- POST `/api/map/generate`
- POST `/api/map/init`

## Archives
- GET `/api/archives/status`
- POST `/api/archives/search`
- POST `/api/archives/build`

## Economy / Craft
- GET `/api/economy/inventory`
- POST `/api/economy/collect`
- POST `/api/economy/arcade-result`
- POST `/api/craft/potion`
- POST `/api/craft/crystal`
- POST `/api/craft/artifact`

## Minigames
- GET `/api/minigames/catalog`
- POST `/api/minigames/start`
- GET `/api/minigames/:id`
- POST `/api/minigames/:id/result`
- POST `/api/minigames/auto-trigger`

## Hero
- GET `/api/hero/status`
- POST `/api/hero/add-xp`
- POST `/api/hero/apply-perk`

---

## Key payloads and examples

### 1) Resolve causality
POST `/api/causality/resolve`

Request (pick nodes by radius):
```json
{
  "center": {"x": 10, "y": 20, "z": 0, "t": 0, "c": 1, "psi": 0.4},
  "radius": 5.0,
  "mode": "QUANTUM",
  "seed": 123
}
```

Response:
```json
{
  "mode": "QUANTUM",
  "involved": ["ent_plain_10_20", "ent_forest_12_21"],
  "winner": "ent_plain_10_20",
  "started_match_id": null
}
```
Notes: Winner hero gets XP once (idempotent).

### 2) Collapse observation (area -> mark observed)
POST `/api/world-state/collapse`

Request:
```json
{
  "node_ids": ["ent_forest_12_21", "ent_plain_10_20"],
  "description": "player_scan",
  "playerId": "hero:alice"
}
```

Response:
```json
{ "updated": 2, "ok": true }
```
Notes: Small idempotent XP to `playerId`.

### 3) Generate and init map
- POST `/api/map/generate`

Request:
```json
{ "width": 64, "height": 48, "seed": 42 }
```

Response:
```json
{ "obstacles": [[0,1,...]], "terrain": [[0.0,...]], "causal_c": [[1.0,...]], "biomes": [["plain",...]] }
```

- POST `/api/map/init`

Request:
```json
{ "map": { "obstacles": [...], "terrain": [...], "causal_c": [...], "biomes": [...] } }
```

Effect: Creates entities and `gathering_spot` nodes. Spot schema:
```json
{
  "id": "spot_10_20",
  "properties": {
    "kind": "herb|mineral|essence",
    "pos": {"x":10,"y":20,"z":0,"t":0,"c":1,"psi":0},
    "windows": [{"start":1,"end":23,"period":24}],
    "yield": {"min":1,"max":3},
    "depleted": false
  }
}
```

### 4) Collect from spot
POST `/api/economy/collect`

Request:
```json
{ "spotId": "spot_10_20", "playerId": "alice" }
```

Response:
```json
{ "added": [{"id":"herb_...","kind":"herb","qty":1}], "inventory": [...] }
```
Notes: Kind is inferred from the spot node.

### 5) Hero status
- GET `/api/hero/status?heroId=hero:alice`
- POST `/api/hero/add-xp` `{ "heroId": "hero:alice", "amount": 10 }`

---

## OpenAPI
- GET `/openapi` and `/openapi/all` (if enabled) and UI at `/docs/openapi`.

## Port and CORS
- Port via env `RUST_PORT` (default 3001). CORS allows GET/POST/OPTIONS with any origin/headers.
