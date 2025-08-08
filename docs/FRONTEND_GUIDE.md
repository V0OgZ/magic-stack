# Frontend Guide - Magic Stack APIs (Rust + Java)

Ce guide résume les endpoints utiles côté front pour la phase actuelle.

## Rust server (par défaut: http://localhost:3001)

- GET `/openapi` — Spéc Rust minimale (OpenAPI JSON)
- GET `/openapi/all` — Agrégation Rust + Java (`{"rust":{...},"java":{...}}`)
- POST `/agents/plan`
  - Entrée: `{ start:{x,y,tl}, goal:{x,y,tl}, map:{ obstacles, terrain?, causal_c? }, agent:{ speed_multiplier?, alpha_causal?, time_velocity? } }`
  - Note: la carte doit être suffisamment grande pour couvrir `start/goal` (sinon `ok:false`).
  - Paramètres agent:
    - `speed_multiplier` (float > 0): vitesse relative.
    - `alpha_causal` (float ≥ 0): pondération du brouillard causal (C).
    - `time_velocity` (float): si négative, active l'inversion du temps (pénalise les zones très stables C au lieu des zones peu stables).
  - Sortie: `{ path:[{x,y,tl}], cost, ok }`

- POST `/api/world-state/collapse`
  - Entrée: `{ node_ids:[...]} | { center:{x,y,z,t,c,psi}, radius, description? }`
  - Effet: marque `observed=true` et enregistre `ObservationCollapse`.

- POST `/api/causality/resolve`
  - Entrée: `{ node_ids:[...] | center+radius, mode:"QUANTUM"|"TCG", seed? }` (pas de champ `agent` pour l’instant)
  - Sortie: `{ mode, involved:[ids], winner?:id, started_match_id?:id }`

- POST `/agents/fork` / POST `/agents/merge`
  - Gèrent les doubles (fork/merge) par `identity_id` / `timeline_id`.

- POST `/agents/control`
  - Entrée: `{ node_id, mode:"player"|"ai" }` (sélectionne quel double est contrôlé par le joueur).

- POST `/agents/cast`
  - Entrée: `{ formula, target?, power?, formula_type?, caster_node_id, parameters?, caster_identity? }`
  - Effet: délègue l’exécution au backend Java.

- POST `/api/map/generate`
  - Entrée: `{ width?, height?, seed?, sea_ratio?, mountain_ratio?, forest_ratio? }`
  - Sortie: `{ obstacles, terrain, causal_c, biomes }` (biomes: `sea|mountain|forest|plain`).

- POST `/api/map/init`
  - Initialise des entités 6D à partir d'une carte générée, avec fenêtres temporelles et récurrences simples.
  - Entrée:
    ```json
    {
      "map": { "obstacles": [[...]], "terrain": [[...]], "causal_c": [[...]], "biomes": [["sea"|"mountain"|"forest"|"plain", ...]] },
      "time_windows": [ { "start": 2, "end": 8, "period": 12 } ]
    }
    ```
  - Sortie: `{ created: <nb_crees_dans_cet_appel> }`

- GET `/openapi`
  - Spéc Rust minimale (pour compare-apis).
  - Note: si le Java n’est pas démarré, `GET /openapi/all` aura `java: { error: ... }`.

### Economy / Craft / Runes / Nearby / Minigames

- GET `/api/economy/inventory` → `{ items:[{id,kind,qty,...}] }`
- POST `/api/economy/collect` `{spotId,playerId?}` → `{added:[...],inventory:[...]}`
- POST `/api/economy/arcade-result` `{gameId,success,rewards?,playerId?}` → `{ok,inventory}`
- POST `/api/craft/potion|crystal|artifact` `{recipeId,ingredients?,playerId?}` → `{item,inventory}`
- POST `/api/mage/learn-runes` `{miniGameResult:{score},playerId?}` → `{unlocked:[...]}`
- GET `/api/panopticon/world-state-graph/nearby?x&y&z&t&c&psi&radius` → `[{node}]`

- GET `/api/minigames/catalog` → `[{id,title,url,rewards}]`
- POST `/api/minigames/start` `{playerId?,type?,context?}` → `{sessionId,type,url,objective,deadlineMs,rewardsPreview}`
- GET `/api/minigames/:id` → `{session}`
- POST `/api/minigames/:id/result` `{success,score?,rewards?,playerId?}` → `{ok,grantedRewards,inventory}`
- POST `/api/minigames/auto-trigger` `{playerId?,metrics:{timeVelocity?,causalDebt?}}` → `{triggered,session?}`

### Héros (XP/Perks – MVP local)
- GET `/api/hero/status?heroId=...` → `{level,xp,xpNext,perks}`
- POST `/api/hero/add-xp` `{heroId,amount,source?}` → `{level,xp,xpNext,levelUp}`
- POST `/api/hero/apply-perk` `{heroId,perkId}` → `{ok,perks}`

## Java backends

- Backend principal (Spring): jar `backends/java/target/magic-stack-backend-1.0.0-APOLLO.jar`
  - OpenAPI standard: `GET /v3/api-docs` (si springdoc actif)
  - Fallback doc JSON: `GET /api`

- Simple Scenario Backend: `simple-scenario-backend/target/simple-scenario-backend-1.0.0.jar`
  - `OpenApiController` expose `GET /openapi` (mode démo).

## Scénarios UI rapides

1) Planifier un trajet évitant obstacles + brouillard causal élevé
```
POST /agents/plan
{
  "start": {"x":0,"y":0,"tl":"principale"},
  "goal":  {"x":20,"y":0,"tl":"principale"},
  "map": {
    "obstacles": [[0,0,1,0,0,0,0,0,0,0,0]],
    "terrain":   [[0,0,2,0,0,0,0,0,0,0,0]],
    "causal_c":  [[1,1,0.4,1,1,1,1,1,1,1,1]]
  },
  "agent": {"speed_multiplier":1.4,"alpha_causal":0.7}
}
```

1b) Même scénario avec inversion du temps (Axis-like)
```
POST /agents/plan
{
  "start": {"x":0,"y":0,"tl":"principale"},
  "goal":  {"x":20,"y":0,"tl":"principale"},
  "map": { /* idem */ },
  "agent": {"speed_multiplier":1.0, "alpha_causal":0.8, "time_velocity": -1.0}
}
```

2) Observer une zone (lunettes) pour dissiper l’incertitude
```
POST /api/world-state/collapse
{"center":{"x":10,"y":0,"z":0,"t":5,"c":0.7,"psi":0.5},"radius":30,"description":"magic_glasses"}
```

3) Résoudre une collision causale
```
POST /api/causality/resolve
{"node_ids":["Rapidus","Rapidus_b","Lentus"],"mode":"QUANTUM","seed":42}
```

4) Générer une carte et l’utiliser côté planificateur
```
POST /api/map/generate {"width":48,"height":36,"seed":1234}
→ réutiliser `obstacles/terrain/causal_c` dans /agents/plan
```

5) Initialiser la carte avec entités 6D (fenêtres temporelles)
```
POST /api/map/init
{
  "map": { "obstacles": [...], "terrain": [...], "causal_c": [...], "biomes": [...] },
  "time_windows": [{"start":2,"end":8,"period":12}]
}
```

## Notes d’intégration

- Pas de chemins absolus; caches confinés (`.m2_repo`, `.cargo_home`).
- Les endpoints sont CORS-enabled.
- Pour la comparaison d’API, ouvrir `compare-apis.html` et charger `...:8082/openapi` (Java) et `...:3001/openapi` (Rust).

### Références scénarios Axis
- Fichier de test: `Treasures/📖 Histoires vivantes/visualizer/panopticon_axis_test.json` (validation voyage temporel et observation).


