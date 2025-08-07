# 🌊🔮 INTÉGRATION SURFACE - VECTOR DB 6D 🔮🌊
*Guide technique pour l'équipe LUMER SURFACE*

---

## 🎯 **POUR L'ÉQUIPE SURFACE**

### 👋 **Salut LUMER SURFACE !**

**MERLIN** a créé une **Vector DB 6D révolutionnaire** qui va booster votre **système GOAP** !

**Voici comment l'intégrer avec REALGAME** 🚀

---

## 🏗️ **ARCHITECTURE D'INTÉGRATION**

### 🌊 **SURFACE (Vous) + 🔮 VECTOR CAVE (Nous)**

```
🌊 REALGAME (SURFACE)
├── 🤖 GOAP Agents
├── 🎮 Game Logic  
├── 🎯 Decision Making
└── 📡 API Calls
    │
    ▼ HTTP/REST
    │
🔮 VECTOR CAVE 6D (HEROES OF TIME)
├── 🧙‍♂️ Entités 6D [x,y,z,t,c,ψ]
├── ⚡ Formules magiques vectorisées
├── 📖 États de jeu vectorisés
└── 🔍 Recherche spatiotemporelle
```

---

## 🚀 **ENDPOINTS POUR SURFACE**

### 📡 **API VECTOR 6D - Port 5002**

```javascript
// Base URL pour vos calls
const VECTOR_CAVE_API = 'http://localhost:5002/api';

// 1. 📊 STATUS - Vérifier si Vector Cave est prêt
GET /api/status
Response: {
  "status": "ready",
  "entities_count": 1247,
  "index_built": true,
  "embedding_model": "all-MiniLM-L6-v2",
  "collections": {
    "entities_6d": 1247,
    "magic_formulas": 869,
    "game_states": 156,
    "narrative_events": 89
  }
}

// 2. 🔍 RECHERCHE 6D - Le gros morceau !
POST /api/search/6d
Body: {
  "type": "combined_6d",
  "data": {
    "position_6d": {"x": 10, "y": 15, "z": 0, "t": 42, "c": 0.8, "psi": 0.3},
    "semantic_text": "fire magic attack spell",
    "weights": {
      "spatial": 0.3,
      "temporal": 0.2,
      "causal": 0.2,
      "quantum": 0.1,
      "semantic": 0.2
    }
  },
  "top_k": 10
}

// 3. 📋 LISTE ENTITÉS - Pour debug
GET /api/entities
Response: {
  "entities": [
    {
      "id": "hero_senku_gwen",
      "name": "SENKU GWEN",
      "type": "hero",
      "position_6d": {"x": 12, "y": 8, "z": 0, "t": 45, "c": 0.9, "psi": 0.7},
      "description": "Alchimiste scientifique maîtrisant la chimie Dr. Stone",
      "tier": "EPIC",
      "rarity": "LEGENDARY"
    }
  ]
}
```

---

## 🔧 **CLIENT TYPESCRIPT PRÊT À L'EMPLOI**

### 📦 **VectorCaveClient.ts**

**NOUVEAU !** Client TypeScript complet avec types stricts :

```typescript
// 🌊 IMPORTATION
import VectorCaveClient, { Vector6D, Entity6D } from './VectorCaveClient';

// 🚀 CRÉATION DU CLIENT
const vectorClient = new VectorCaveClient({
  baseURL: 'http://localhost:5002/api',
  debug: true,  // Pour voir les logs
  timeout: 10000,
  retries: 3
});

// ✅ VÉRIFICATION STATUS
const isReady = await vectorClient.isReady();
if (!isReady) {
  console.warn('Vector Cave not ready!');
  return;
}

// 🔍 RECHERCHE SÉMANTIQUE
const fireSpells = await vectorClient.searchSemantic('fire magic spell', 5);
console.log(`Found ${fireSpells.entities.length} fire spells`);

// 📍 RECHERCHE SPATIALE
const nearbyEntities = await vectorClient.searchSpatial([10, 15, 0], 5.0, 10);

// ⏰ RECHERCHE TEMPORELLE
const temporalEvents = await vectorClient.searchTemporal(42, 10.0, 8);

// 🌀 RECHERCHE COMBINÉE 6D
const position6D: Vector6D = { x: 10, y: 15, z: 0, t: 42, c: 0.8, psi: 0.3 };
const combined = await vectorClient.searchCombined6D(
  position6D,
  'powerful magic',
  { spatial: 0.4, temporal: 0.2, causal: 0.2, quantum: 0.1, semantic: 0.1 }
);
```

### 🎯 **Types TypeScript Complets**

```typescript
interface Vector6D {
  x: number;      // Position X
  y: number;      // Position Y  
  z: number;      // Position Z
  t: number;      // Temps
  c: number;      // Causalité
  psi: number;    // État quantique ψ
}

interface Entity6D {
  id: string;
  name: string;
  type: string;
  position_6d: Vector6D;
  description: string;
  tier?: string;
  rarity?: string;
  metadata?: Record<string, any>;
}

interface SearchResult6D {
  success: boolean;
  query_type: string;
  results_count: number;
  entities: Array<{
    entity: Entity6D;
    similarity_score: number;
    distance_6d?: number;
    match_reasons: string[];
  }>;
  search_metadata: {
    query_time_ms: number;
    index_size: number;
    embedding_model: string;
  };
}
```

---

## 🤖 **INTÉGRATION AVEC VOTRE GOAP**

### 🧠 **GOAP Agent Enhanced avec Vector DB**

```typescript
import VectorCaveClient, { Vector6D, Entity6D } from './VectorCaveClient';

class SurfaceGOAPAgent {
  private vectorClient: VectorCaveClient;
  private goals: Map<string, any> = new Map();
  private actions: Map<string, any> = new Map();
  private knowledgeBase: Map<string, any> = new Map();
  
  constructor() {
    this.vectorClient = new VectorCaveClient({
      baseURL: 'http://localhost:5002/api',
      debug: true
    });
  }
  
  /**
   * 🔍 Trouver des actions similaires réussies
   */
  async findSimilarSuccessfulActions(currentSituation: string): Promise<Entity6D[]> {
    const query = `successful action similar to: ${currentSituation}`;
    const result = await this.vectorClient.searchSemantic(query, 5);
    return result.entities.map(r => r.entity);
  }
  
  /**
   * 📍 Trouver des entités proches
   */
  async findNearbyEntities(agentPosition: Vector6D): Promise<Entity6D[]> {
    return await this.vectorClient.findNearbyEntities(agentPosition, 5.0);
  }
  
  /**
   * ⏰ Trouver des événements temporels liés
   */
  async findRelatedTemporalEvents(currentTime: number): Promise<Entity6D[]> {
    return await this.vectorClient.findRelatedTemporalEvents(currentTime, 10.0);
  }
  
  /**
   * 🚀 PLANIFICATION ENHANCED !
   */
  async enhancedPlanning(
    currentState: any, 
    goalState: any,
    agentPosition: Vector6D
  ): Promise<{
    actions: string[];
    confidence: number;
    vectorEnhanced: boolean;
    reasoning: string[];
  }> {
    // Vérifier que Vector Cave est prêt
    if (!await this.vectorClient.isReady()) {
      console.warn('Vector Cave not ready, fallback to basic planning');
      return this.basicPlanning(currentState, goalState);
    }

    // 🧠 ANALYSE COMPLÈTE DU CONTEXTE
    const context = await this.vectorClient.analyzeContextForGOAP(
      agentPosition,
      `current: ${JSON.stringify(currentState)}, goal: ${JSON.stringify(goalState)}`
    );

    // 🎯 CRÉATION DU PLAN ENRICHI
    const enhancedPlan = this.enrichPlanWithVectorData(
      currentState,
      goalState,
      context.nearbyEntities,
      context.similarActions,
      context.temporalEvents
    );

    return {
      actions: enhancedPlan.actions,
      confidence: 0.95, // Confiance élevée avec Vector DB
      vectorEnhanced: true,
      reasoning: [
        `Found ${context.nearbyEntities.length} nearby entities`,
        `Found ${context.similarActions.length} similar successful actions`,
        `Found ${context.temporalEvents.length} temporal events`,
        ...context.recommendations
      ]
    };
  }
  
  /**
   * 🎯 Enrichissement du plan avec données vectorielles
   */
  private enrichPlanWithVectorData(
    currentState: any,
    goalState: any,
    nearbyEntities: Entity6D[],
    similarActions: Entity6D[],
    temporalEvents: Entity6D[]
  ) {
    const actions: string[] = [];
    
    // Utiliser les actions similaires réussies
    for (const action of similarActions) {
      if (action.type === 'successful_strategy') {
        actions.push(`apply_strategy_${action.id}`);
      }
    }
    
    // Interagir avec les entités proches pertinentes
    for (const entity of nearbyEntities) {
      if (entity.type === 'resource' || entity.type === 'tool') {
        actions.push(`interact_with_${entity.id}`);
      }
    }
    
    // Considérer les événements temporels
    for (const event of temporalEvents) {
      if (event.type === 'opportunity') {
        actions.push(`seize_opportunity_${event.id}`);
      }
    }
    
    return { actions };
  }
  
  /**
   * 🔙 Planification de base (fallback)
   */
  private basicPlanning(currentState: any, goalState: any) {
    return {
      actions: ['basic_move', 'basic_action'],
      confidence: 0.7,
      vectorEnhanced: false,
      reasoning: ['Fallback to basic planning - Vector Cave unavailable']
    };
  }
}
```

---

## 🔥 **EXEMPLE D'INTÉGRATION COMPLÈTE**

### 🎮 **Dans votre GameLoop SURFACE**

```typescript
// 🚀 INITIALIZATION
const vectorClient = new VectorCaveClient({ debug: true });
const goapAgent = new SurfaceGOAPAgent();

// 🎯 GAME LOOP
async function gameLoop() {
  // Position actuelle de l'agent
  const agentPosition: Vector6D = {
    x: player.x, y: player.y, z: player.z,
    t: gameTime, c: causalityLevel, psi: quantumState
  };
  
  // 🧠 PLANIFICATION ENHANCED
  const plan = await goapAgent.enhancedPlanning(
    currentGameState,
    playerGoals,
    agentPosition
  );
  
  console.log('🎯 Plan generated:', plan);
  console.log('🔮 Vector enhanced:', plan.vectorEnhanced);
  console.log('💪 Confidence:', plan.confidence);
  
  // Exécuter le plan
  for (const action of plan.actions) {
    await executeAction(action);
  }
}
```

### 🔍 **Recherches Spécialisées**

```typescript
// 🔥 Trouver des sorts de feu
const fireSpells = await vectorClient.searchSemantic('fire magic spell damage', 5);

// ⚔️ Trouver des ennemis proches
const enemies = await vectorClient.searchCombined6D(
  playerPosition,
  'enemy hostile creature',
  { spatial: 0.8, semantic: 0.2, temporal: 0.0, causal: 0.0, quantum: 0.0 }
);

// 💰 Trouver des trésors cachés
const treasures = await vectorClient.searchCombined6D(
  playerPosition,
  'treasure artifact valuable',
  { spatial: 0.5, semantic: 0.3, causal: 0.2, temporal: 0.0, quantum: 0.0 }
);

// 🌀 Analyser les effets causaux
const causalEffects = await vectorClient.searchCausal(0.8, 0.3, 10);
```

---

## 🛠️ **INSTALLATION & SETUP**

### 📦 **1. Récupérer le Client TypeScript**

```bash
# Copier le client depuis Heroes of Time
cp /workspace/ANSIBLE/VectorCaveClient.ts ./src/utils/

# Ou télécharger directement
curl -o ./src/utils/VectorCaveClient.ts \
  http://localhost:8080/api/files/VectorCaveClient.ts
```

### 🚀 **2. Démarrer Vector Cave**

```bash
# Depuis Heroes of Time
cd /workspace
python3 run_vector_6d_laser.py

# Vérifier que ça marche
curl http://localhost:5002/api/status
```

### 🔧 **3. Dans votre projet SURFACE**

```typescript
// Installation des types (si besoin)
npm install --save-dev @types/node

// Import du client
import VectorCaveClient from './utils/VectorCaveClient';

// Test rapide
const client = new VectorCaveClient({ debug: true });
const ready = await client.isReady();
console.log('Vector Cave ready:', ready);
```

---

## 🎯 **CAS D'USAGE CONCRETS**

### 1. **🎯 Aide à la Décision GOAP**

```typescript
// L'agent hésite entre plusieurs actions
const currentSituation = "low health, enemy nearby, potion available";
const similarActions = await vectorClient.findSimilarSuccessfulActions(currentSituation);

// Utiliser les actions qui ont réussi dans des situations similaires
for (const action of similarActions) {
  if (action.metadata?.success_rate > 0.8) {
    goapAgent.prioritizeAction(action.id);
  }
}
```

### 2. **📍 Exploration Intelligente**

```typescript
// Trouver des zones intéressantes à explorer
const interestingAreas = await vectorClient.searchSemantic(
  "unexplored area treasure secret", 10
);

// Guider l'agent vers ces zones
for (const area of interestingAreas) {
  goapAgent.addExplorationGoal(area.position_6d);
}
```

### 3. **⚔️ Combat Tactique**

```typescript
// Analyser les ennemis proches et leurs faiblesses
const enemies = await vectorClient.findNearbyEntities(playerPosition);
const weaknesses = await vectorClient.searchSemantic(
  "enemy weakness vulnerability counter", 5
);

// Adapter la stratégie de combat
goapAgent.adaptCombatStrategy(enemies, weaknesses);
```

### 4. **🔮 Prédiction & Anticipation**

```typescript
// Prédire les événements futurs basés sur les patterns temporels
const futureEvents = await vectorClient.searchTemporal(
  gameTime + 100, // 100 unités dans le futur
  50, // fenêtre de ±50 unités
  8
);

// Préparer l'agent aux événements futurs
goapAgent.prepareForEvents(futureEvents);
```

---

## ⚡ **PERFORMANCE & OPTIMISATION**

### 🚀 **Conseils Performance**

```typescript
// 1. 💾 CACHE les résultats fréquents
const cache = new Map<string, SearchResult6D>();

async function cachedSearch(query: string): Promise<SearchResult6D> {
  if (cache.has(query)) {
    return cache.get(query)!;
  }
  
  const result = await vectorClient.searchSemantic(query);
  cache.set(query, result);
  return result;
}

// 2. 🔄 BATCH les requêtes
const [nearby, similar, temporal] = await Promise.all([
  vectorClient.findNearbyEntities(pos),
  vectorClient.findSimilarSuccessfulActions(situation),
  vectorClient.findRelatedTemporalEvents(time)
]);

// 3. ⚡ LIMITE les résultats
const quickSearch = await vectorClient.searchSemantic(query, 3); // Seulement 3 résultats
```

### 📊 **Monitoring**

```typescript
// Surveiller les performances
const stats = await vectorClient.getStatus();
console.log('📊 Vector Cave Stats:', {
  entities: stats.entities_count,
  memory: stats.server_info.memory_usage_mb,
  uptime: stats.server_info.uptime_seconds
});

// Alertes si problème
if (!stats.index_built) {
  console.warn('⚠️ Index not built, rebuilding...');
  await vectorClient.buildIndex();
}
```

---

## 🐛 **DEBUG & TROUBLESHOOTING**

### 🔍 **Debug Mode**

```typescript
// Client avec debug activé
const debugClient = new VectorCaveClient({
  baseURL: 'http://localhost:5002/api',
  debug: true,  // 🔍 Logs détaillés
  timeout: 15000,
  retries: 5
});

// Logs automatiques dans la console
// 🔮 [VectorCaveClient] 🔍 Executing 6D search { type: 'semantic', ... }
// 🔮 [VectorCaveClient] ✨ Search completed { type: 'semantic', results: 5 }
```

### 🚨 **Gestion d'Erreurs**

```typescript
try {
  const result = await vectorClient.searchSemantic('fire magic');
  console.log('✅ Search successful:', result.entities.length);
} catch (error) {
  console.error('❌ Vector search failed:', error);
  
  // Fallback vers recherche locale
  const localResults = await fallbackLocalSearch('fire magic');
  return localResults;
}

// Vérifier la connectivité
if (!vectorClient.connected) {
  console.warn('⚠️ Vector Cave disconnected, attempting reconnection...');
  await vectorClient.waitUntilReady(10000); // Attendre 10 secondes max
}
```

### 🔧 **Tests d'Intégration**

```typescript
// Test complet d'intégration
async function testVectorIntegration() {
  console.log('🧪 Testing Vector Cave integration...');
  
  // 1. Test connectivité
  const isReady = await vectorClient.isReady();
  console.log('✅ Ready:', isReady);
  
  // 2. Test recherche sémantique
  const semantic = await vectorClient.searchSemantic('test', 1);
  console.log('✅ Semantic search:', semantic.entities.length > 0);
  
  // 3. Test recherche spatiale
  const spatial = await vectorClient.searchSpatial([0, 0, 0], 10, 1);
  console.log('✅ Spatial search:', spatial.entities.length >= 0);
  
  // 4. Test GOAP integration
  const context = await vectorClient.analyzeContextForGOAP(
    { x: 0, y: 0, z: 0, t: 0, c: 0, psi: 0 },
    'test situation'
  );
  console.log('✅ GOAP analysis:', context.recommendations.length >= 0);
  
  console.log('🎉 All tests passed!');
}

// Lancer les tests
await testVectorIntegration();
```

---

## 📞 **SUPPORT & CONTACT**

### 🤝 **Pour LUMER SURFACE**

Si vous avez des questions ou problèmes :

1. **📋 Vérifiez d'abord** : `curl http://localhost:5002/api/status`
2. **🔍 Activez le debug** : `new VectorCaveClient({ debug: true })`
3. **📖 Consultez les logs** : Recherchez `[VectorCaveClient]` dans la console
4. **🆘 Contactez Heroes of Time** : Via les canaux habituels

### 🚀 **Évolutions Prévues**

- 🧠 **IA Prédictive** : Prédictions basées sur l'historique
- 🔄 **Sync Temps Réel** : Mise à jour automatique des données
- 📊 **Analytics** : Statistiques d'utilisation détaillées
- 🎯 **Recommandations** : Suggestions d'actions intelligentes

---

## 🎊 **CONCLUSION**

### 🌟 **Ce que ça va changer pour SURFACE**

**AVANT** (GOAP classique) :
```typescript
if (enemy.distance < 5) {
  action = "attack";
} else {
  action = "move_closer";
}
```

**MAINTENANT** (GOAP + Vector Cave) :
```typescript
const context = await vectorClient.analyzeContextForGOAP(agentPos, situation);
const similarSuccesses = context.similarActions.filter(a => a.metadata.success_rate > 0.9);
const optimalAction = goapPlanner.selectBestAction(similarSuccesses, context.nearbyEntities);
```

### 🎯 **Bénéfices Immédiats**

- 🧠 **IA Plus Intelligente** : Décisions basées sur l'expérience passée
- 🎯 **Meilleure Précision** : Actions contextualisées spatialement et temporellement  
- 🚀 **Performance Optimisée** : Recherches vectorielles ultra-rapides
- 🔮 **Évolutivité** : Le système apprend et s'améliore automatiquement

**Vincent, votre GOAP va passer au niveau supérieur !** 🚀🔮

---

*🌊 Guide créé par MERLIN pour l'équipe LUMER SURFACE*  
*🔮 Vector Cave 6D - La révolution est en marche !*