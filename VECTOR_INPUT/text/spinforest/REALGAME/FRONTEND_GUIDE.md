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

### 🚗 Temporal Drift System (Régulation RPM)

**Concept :** Système de régulation automatique qui déclenche des mini-jeux quand le joueur va trop vite temporellement. Transform les 208 mini-jeux en mécanisme d'équilibrage naturel avec récompenses.

#### API Endpoints
- GET `/api/regulation/drift/status?playerId` → `{rpm,zone:"green"|"amber"|"red",driftActive,cooldownMs}`
- POST `/api/regulation/drift/evaluate` `{playerId,metrics:{movesPerSec,castsPerMin,timeVelocity,topologyChanges,resolvesPerMin}}` → `{zone,triggered,assignedMiniGame?}`
- POST `/api/regulation/drift/start` `{playerId}` → `{sessionId,game:{id,url,objective,timeoutSec,rewardsPreview}}`
- POST `/api/regulation/drift/result` `{sessionId,success,score,durationSec}` → `{ok,inventory,cooldownMs}`

#### Métriques RPM (Frontend)
Le système collecte automatiquement :
- `movesPerSec` : Actions de déplacement par seconde
- `castsPerMin` : Sorts lancés par minute  
- `timeVelocity` : Valeur absolue de la vélocité temporelle
- `topologyChanges` : Changements de topologie par minute
- `resolvesPerMin` : Résolutions causales par minute

**Calcul RPM :**
```javascript
rpm = 0.3*movesPerSec + 0.25*castsPerMin/60 + 0.2*abs(timeVelocity) + 0.15*topologyChanges + 0.1*resolvesPerMin/60
```

#### Zones & Déclenchement
- **GREEN** (rpm < 0.5) : Vitesse normale
- **AMBER** (rpm < 0.8) : Attention, vitesse élevée
- **RED** (rpm ≥ 0.8) : DRIFT auto-déclenché si cooldown écoulé

#### Mini-Jeux Intégrés
- **SAVE_JORDI** : Réseau spatial (45s) → +50 XP, +2 Essence
- **BROKEN_WATCH** : Réparation horloge (60s) → +75 XP, +25 Gold  
- **CAUSAL_PATCH** : Liens causaux (50s) → +60 XP, +1 Cristal Temporel

#### Interface Frontend
```javascript
// Système intégré dans HOMM3_6D_DEMO.html
temporalDrift.recordMove();        // Sur chaque mouvement
temporalDrift.recordCast();        // Sur chaque sort
temporalDrift.recordTopologyChange(); // Sur changement topologie
temporalDrift.recordResolve();     // Sur résolution causale
temporalDrift.setTimeVelocity(v);  // Sur slider time_velocity

// HUD automatique : tachymètre + modal mini-jeux
driftHUD = new TemporalDriftHUD(temporalDrift);
```

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

6) Temporal Drift - Évaluation métriques joueur
```
POST /api/regulation/drift/evaluate
{
  "playerId": "player1",
  "metrics": {
    "movesPerSec": 2.3,
    "castsPerMin": 45.0,
    "timeVelocity": -0.8,
    "topologyChanges": 3.2,
    "resolvesPerMin": 12.0
  }
}
→ {"zone":"red","triggered":true,"assignedMiniGame":{"id":"SAVE_JORDI","url":"/REALGAME/ARCADE/save-jordi-spatial.html"}}
```

7) Démarrer session mini-jeu drift
```
POST /api/regulation/drift/start
{"playerId": "player1"}
→ {"sessionId":"drift_123","game":{"id":"BROKEN_WATCH","objective":"Réparer horloge à 3:15","timeoutSec":60}}
```

## Notes d’intégration

- Pas de chemins absolus; caches confinés (`.m2_repo`, `.cargo_home`).
- Les endpoints sont CORS-enabled.
- Pour la comparaison d’API, ouvrir `compare-apis.html` et charger `...:8082/openapi` (Java) et `...:3001/openapi` (Rust).

### 🏠 Hub (MetaSurcarte) & Scenes Management

**Concept :** Hub central pour navigation entre scènes (Aventure 6D, Forêt Narrative, TCG Arena).

#### Architecture UI
- **Hub Principal** : `hub-avalon.html` - Point d'entrée avec badges backends
- **Aventure** : `HOMM3_6D_DEMO.html` - Carte 6D avec fog, resolve, pathfinding
- **Forêt** : Routes vers narrative interstice et quêtes story
- **TCG Arena** : Combat cartes standalone ou intégré post-resolve

#### Badges Status Backends
```javascript
// Vérification status backends dans Hub
const backends = [
  { name: 'Rust', url: 'http://localhost:3001/openapi', port: 3001 },
  { name: 'Java', url: 'http://localhost:8082/v3/api-docs', port: 8082 }
];

// Affichage badges: 🟢 ACTIF | 🔴 INACTIF | 🟡 PARTIAL
```

#### Navigation Scenes
- Hub → Aventure : Pass player state, inventory, héros progression
- Hub → TCG : Pass deck, unlock status, ratings  
- Retour scenes → Hub : Sync all state via persistenceSystem

### 🃏 TCG Modal Integration

**Concept :** Modal intégré pour combats causals déclenchés par `/api/causality/resolve` (mode TCG).

#### Ouverture Modal TCG
```javascript
// Déclenchement post-resolve
if (resolveResult.mode === 'TCG' && resolveResult.started_match_id) {
  tcgPanel.open(
    resolveResult.started_match_id,    // matchId backend
    playerEntity,                      // entité joueur  
    enemyEntity,                       // entité adverse
    resolveResult                      // contexte resolve
  );
}
```

#### Interface TCG Modal
- **Battlefield** : Zone combat avec HP/Mana des deux côtés
- **Hand** : Main joueur avec deck temporal (5-7 cartes)
- **Log** : Historique actions de combat  
- **Controls** : Forfeit, End Turn, Cast Card

#### Fermeture & Callbacks
```javascript
// Configuration callback fermeture
tcgPanel.onMatchEnd = (matchId, winner, playerEntity, enemyEntity) => {
  log(`🎯 TCG ${winner} wins match ${matchId}`);
  
  // Refresh hero progression & inventory (XP/rewards automatiques)
  refreshInventoryFromBackend();
  persistenceSystem.save();
  
  // Resume map exploration
  resumeMainGame();
};
```

#### Cards & Deck Management
- Cartes temporelles : Éclair Temporel, Bouclier Causal, Déphasage, Soin Temporel
- Mana cost et cooldowns gérés côté client
- Effets visuels et animations pour feedback

### Références scénarios Axis
- Fichier de test: `Treasures/📖 Histoires vivantes/visualizer/panopticon_axis_test.json` (validation voyage temporel et observation).


