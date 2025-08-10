# 🧙‍♂️ Guide Expert - Éditeur Universel Avalon

## 📊 Architecture & Intégration

### Endpoints Équipe PROFONDEUR
```typescript
// Configuration centralisée (src/config/endpoints.ts)
const ENDPOINTS = {
  profondeur: {
    rust: 'http://localhost:3001',      // V2 Controller, Q*, World State
    vectorDB: 'http://localhost:5001',  // Recherche sémantique 6D
    webSocket: 'ws://localhost:8001',   // Temps réel (à venir)
  },
  backend: {
    java: 'http://localhost:8080',      // Formules, TCG, Interstice
  }
}
```

## 🔮 Formules Magiques - Système Complet

### Structure d'une Formule
```javascript
{
  "formula_id": "uuid",
  "name": "Temporal Shift",
  "type": "instant|ritual|permanent",
  "cost": {
    "mana": 10,
    "temporal": 5,
    "quantum": 2
  },
  "effects": [
    {
      "type": "timeline_fork",
      "params": {
        "branches": 2,
        "drift_rate": 0.1,
        "merge_after": "+300s"
      }
    }
  ],
  "conditions": {
    "requires": ["node.type == 'mystique'"],
    "forbids": ["entity.debuff.silence"]
  }
}
```

### Intégration dans l'Éditeur

#### 1. Ajouter une Zone de Formule
```javascript
// Dans MapView, ajouter un objet de type 'formula_zone'
addObjectAt(x, y, 'formula_zone', {
  formula_id: 'temporal_shift',
  trigger: 'on_enter',  // on_enter, on_stay, on_interact
  cooldown: 60,
  charges: 3
});
```

#### 2. Script Personnalisé dans une Zone
```javascript
// Fenêtre code intégrée (à venir)
const customScript = `
// Trigger: Quand un joueur entre dans cette zone
on('entity.enter', async (entity) => {
  // Vérifier les conditions
  if (entity.resources.mana < 10) {
    showMessage("Pas assez de mana!");
    return;
  }
  
  // Appliquer l'effet
  await castFormula('temporal_shift', {
    caster: entity.id,
    target: entity.position,
    power_multiplier: 1.5
  });
  
  // Déclencher un événement causal
  triggerEvent({
    type: 'paradox_risk',
    severity: 'minor',
    at: '+30s'
  });
});
`;
```

## ⚡ Timeline & Causalité Avancée

### Créer des Événements Liés
```javascript
// Dans TimelineView
const eventChain = [
  {
    id: 'evt_1',
    time: '+0s',
    type: 'portal_open',
    payload: { at: {x: 10, y: 10}, destination: 'timeline_b' }
  },
  {
    id: 'evt_2', 
    time: '+60s',
    type: 'entity_spawn',
    payload: { kind: 'regulator_vince', at: {x: 10, y: 10} },
    causes: ['evt_1'],  // Dépend de evt_1
  },
  {
    id: 'evt_3',
    time: '+120s', 
    type: 'timeline_merge',
    causes: ['evt_2'],
    visibility: 'fogged'  // Caché par le brouillard
  }
];
```

### Brouillard de Causalité (CF)
```javascript
// Configurer les zones de brouillard
const causalityFog = {
  center: {x: 20, y: 20},
  radius: 10,
  density: 0.8,  // 0 = transparent, 1 = opaque
  reveal_conditions: [
    'entity.trait.quantum_vision > 5',
    'item.equipped.temporal_lens'
  ]
};
```

## 🤖 Régulateurs & IA Avancée

### Configuration Régulateur Custom
```javascript
const customRegulator = {
  kind: 'regulator',
  name: 'Vince_Alpha',
  traits: {
    aggressiveness: 0.9,      // 0-1
    pursuit_depth: 5,          // Profondeur de planification
    reaction_ms: 100,          // Temps de réaction
    quantum_perception: true,  // Voit à travers les timelines
  },
  capabilities: [
    'portal_use',
    'timeline_pierce',  // Peut percer les timelines
    'paradox_immune',   // Immunisé aux paradoxes
    'formula_cast'
  ],
  policy: 'scripted',
  script: `
    // Comportement IA personnalisé
    function tick(self, world) {
      const target = findNearestPlayer(world);
      if (!target) return idle();
      
      const distance = getDistance(self, target);
      
      if (distance < 3) {
        return castFormula('temporal_trap');
      } else if (distance < 10) {
        return pursuit(target, {
          use_portals: true,
          predict_movement: true
        });
      } else {
        return patrol(self.spawn_point);
      }
    }
  `
};
```

## 🔍 Vector DB - Recherche Avancée

### Requêtes Complexes
```javascript
// Recherche contextuelle avec filtres
const searchQuery = {
  query: "ancient artifact temporal power",
  mode: "story",
  filters: {
    file_type: ["md", "json"],
    tags: ["artifact", "legendary"],
    score_threshold: 0.7
  },
  context: {
    current_map: "temporal_nexus",
    player_level: 15
  }
};

// Intégration avec l'éditeur
const results = await vectorDB.search(
  searchQuery.query,
  searchQuery.mode,
  10
);

// Auto-placement intelligent
results.forEach((item, i) => {
  const pos = calculateSmartPosition(i);
  addObjectAt(pos.x, pos.y, 'artifact', {
    ...item.metadata,
    vector_score: item.score
  });
});
```

## 🎮 Modes de Jeu Personnalisés

### Définir un Mode Custom
```javascript
const customGameMode = {
  id: "survival_paradox",
  name: "Survie Paradoxale",
  rules: {
    time_scale: 2.0,           // Temps x2
    fog_causality: true,
    paradox_resolution: "tcg",  // Combat TCG pour résoudre
    victory_conditions: [
      { type: "survive", duration: "30min" },
      { type: "collect", target: "temporal_fragments", count: 10 }
    ]
  },
  phases: [
    {
      at: "0s",
      name: "Setup",
      actions: ["spawn_players", "distribute_resources"]
    },
    {
      at: "5min",
      name: "First Wave",
      actions: ["spawn_enemies:5", "open_portals:2"]
    },
    {
      at: "15min", 
      name: "Paradox Storm",
      actions: ["timeline_split", "spawn_regulators:3"]
    }
  ]
};
```

## 🌐 API Directe depuis l'Éditeur

### Appels Backend Avancés
```javascript
// Q* Pathfinding
async function planAgentPath(agentId, goal) {
  const response = await fetch(`${ENDPOINTS.profondeur.rust}/api/worlds/${worldId}/plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      agent_id: agentId,
      goal: { type: 'intercept', target: goal },
      horizon_s: 120,
      constraints: { max_cost: 100 }
    })
  });
  
  const plan = await response.json();
  // Visualiser le chemin sur la map
  visualizePath(plan.steps);
}

// Simulation What-If
async function simulateTimeline(duration) {
  const response = await fetch(`${ENDPOINTS.profondeur.rust}/api/worlds/${worldId}/timeline/simulate`, {
    method: 'POST',
    body: JSON.stringify({
      from: 'now',
      to: duration,
      mode: 'stochastic',
      seed: Date.now()
    })
  });
  
  const simulation = await response.json();
  // Afficher les paradoxes détectés
  highlightParadoxes(simulation.paradoxes);
}
```

## 🔧 WebSocket - Temps Réel (Coming Soon)

### Subscription aux Événements
```javascript
// Connection WebSocket
const ws = new WebSocket(ENDPOINTS.profondeur.webSocket);

// S'abonner aux changements
ws.send(JSON.stringify({
  action: 'subscribe',
  topics: [
    `world.${worldId}.patch`,     // Changements de map
    `world.${worldId}.events`,    // Événements runtime
    `agent.*.tick`,               // Tous les ticks d'agents
    `paradox.detected`            // Alertes paradoxes
  ]
}));

// Recevoir les updates
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  
  switch(msg.topic) {
    case 'world.patch':
      applyPatch(msg.patch);  // JSON Patch RFC 6902
      break;
    case 'paradox.detected':
      showParadoxAlert(msg.data);
      break;
  }
};
```

## 📦 Export & Packaging

### Export Complet de Projet
```javascript
const exportProject = {
  format: 'avalon_project',
  includes: {
    world: true,
    timelines: true,
    agents: true,
    formulas: true,
    scripts: true,
    assets: true,
    vector_indexes: true  // Inclure les index Vector DB
  },
  metadata: {
    name: "Mon Projet Epic",
    author: "username",
    version: "1.0.0",
    game_modes: ["heroes_like", "tcg", "custom:survival_paradox"],
    dependencies: {
      "magic-stack": "^2.0.0",
      "vector-db": "^1.0.0"
    }
  }
};
```

## 🎯 Optimisation & Performance

### Tips pour Grandes Maps
```javascript
// Utiliser le Level-of-Detail (LOD)
const lodConfig = {
  high: { distance: 10, details: 'full' },
  medium: { distance: 20, details: 'simplified' },
  low: { distance: 50, details: 'minimal' }
};

// Chunking pour maps > 100x100
const chunkSize = 20;
const chunks = divideMapIntoChunks(map, chunkSize);

// Lazy loading des zones
loadChunksAroundPlayer(playerPos, radius = 2);
```

### Batch Operations
```javascript
// Au lieu de:
for (let i = 0; i < 100; i++) {
  addObjectAt(i, 0, 'tree');  // 100 appels API
}

// Faire:
const batch = [];
for (let i = 0; i < 100; i++) {
  batch.push({ x: i, y: 0, type: 'tree' });
}
batchAddObjects(batch);  // 1 seul appel API
```

## 🚀 Commandes Avancées Console

### Debug Mode
```javascript
// Activer le mode debug (console browser F12)
window.DEBUG_MODE = true;
window.SHOW_COLLISION = true;
window.SHOW_PATHFINDING = true;
window.SHOW_CAUSALITY_LINKS = true;

// Téléporter un agent
debugTeleport('agent_id', {x: 50, y: 50});

// Déclencher un paradoxe test
debugTriggerParadox('major', {x: 25, y: 25});

// Voir l'état complet du monde
console.log(getWorldState());
```

## 📚 Ressources & Références

### Documentation API Complète
- Rust V2 Controller: `/api/v2/*`
- Java Formulas: `/api/interstice/*`
- Vector DB: `/api/archives/*`
- WebSocket Events: voir `ARCHITECTURE_PORTS_SEPARATION.md`

### Exemples de Projets
- `scenarios/official/heroes_classic.json`
- `scenarios/community/tower_defense.json`
- `scenarios/test/paradox_stress_test.json`

### Scripts Communautaires
```javascript
// Importer des scripts de la communauté
import { epicBossAI } from '@community/boss-patterns';
import { towerDefenseLogic } from '@community/td-framework';
import { paradoxPuzzles } from '@community/puzzle-pack';
```

---

## 💡 Pro Tips

1. **Toujours tester en mode simulation** avant de publier
2. **Utiliser le Vector DB** pour enrichir automatiquement tes maps
3. **Les formules magiques** peuvent être chainées pour des combos
4. **Le brouillard de causalité** est ton ami pour cacher des surprises
5. **Les régulateurs** sont plus que des ennemis - ce sont des mécaniques de jeu

---

*"Le pouvoir n'est pas dans l'outil, mais dans la vision de celui qui l'utilise"*
— **Vincent, Architecte du Magic Stack**
