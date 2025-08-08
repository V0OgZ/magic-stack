# Frontend Guide - Magic Stack APIs (Rust + Java)

Ce guide résume les endpoints utiles côté front pour la phase actuelle.

## Rust server (par défaut: http://localhost:3001)

- POST `/agents/plan`
  - Entrée: `{ start:{x,y,tl}, goal:{x,y,tl}, map:{ obstacles, terrain?, causal_c? }, agent:{ speed_multiplier?, alpha_causal? } }`
  - Sortie: `{ path:[{x,y,tl}], cost, ok }`

- POST `/api/world-state/collapse`
  - Entrée: `{ node_ids:[...]} | { center:{x,y,z,t,c,psi}, radius, description? }`
  - Effet: marque `observed=true` et enregistre `ObservationCollapse`.

- POST `/api/causality/resolve`
  - Entrée: `{ node_ids:[...] | center+radius, mode:"QUANTUM"|"TCG", seed? }`
  - Sortie: `{ mode, involved:[ids], winner?:id, started_match_id?:id }`

- POST `/agents/fork` / POST `/agents/merge`
  - Gèrent les doubles (fork/merge) par `identity_id` / `timeline_id`.

- POST `/agents/control`
  - Entrée: `{ node_id, mode:"player"|"ai" }` (sélectionne quel double est contrôlé par le joueur).

- POST `/agents/cast`
  - Entrée: `{ formula, formula_type?, caster_node_id, parameters?, caster_identity? }`
  - Effet: délègue l’exécution au backend Java.

- POST `/api/map/generate`
  - Entrée: `{ width?, height?, seed?, sea_ratio?, mountain_ratio?, forest_ratio? }`
  - Sortie: `{ obstacles, terrain, causal_c, biomes }` (biomes: `sea|mountain|forest|plain`).

- POST `/api/map/init`
  - MVP: placeholder pour initialiser trésors/créatures 6D (fenêtres temporelles / récurrences).

- GET `/openapi`
  - Spéc Rust minimale (pour compare-apis).

## Java backends

- Backend principal (Spring): jar `backends/java/target/magic-stack-backend-1.0.0-APOLLO.jar`
  - OpenAPI (selon config): `GET /openapi` (voir `compare-apis.html`).

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

## Notes d’intégration

- Pas de chemins absolus; caches confinés (`.m2_repo`, `.cargo_home`).
- Les endpoints sont CORS-enabled.
- Pour la comparaison d’API, ouvrir `compare-apis.html` et charger `...:8082/openapi` (Java) et `...:3001/openapi` (Rust).


