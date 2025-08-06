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
    "status": "RETRO_LASER_READY",
    "entities_indexed": 156,
    "ready": true,
    "laser_power": "🔥 MAXIMUM 🔥"
}

// 2. 🔍 RECHERCHE 6D - Le gros morceau !
POST /api/search/6d
Body: {
    "type": "semantic|spatial|temporal|causal|combined_6d",
    "query": { /* voir exemples ci-dessous */ },
    "top_k": 10
}

// 3. 📋 LISTE ENTITÉS - Pour debug
GET /api/entities
Response: {
    "total_entities": 156,
    "entities": [...]
}
```

---

## 🤖 **INTÉGRATION AVEC VOTRE GOAP**

### 🧠 **GOAP Agent Enhanced avec Vector DB**

```javascript
class SurfaceGOAPAgent {
    constructor() {
        this.vectorCaveAPI = 'http://localhost:5002/api';
        this.goals = new Map();
        this.actions = new Map();
        this.knowledgeBase = new Map();
    }
    
    // 🔍 RECHERCHE D'ACTIONS SIMILAIRES RÉUSSIES
    async findSimilarSuccessfulActions(currentSituation) {
        try {
            const response = await fetch(`${this.vectorCaveAPI}/search/6d`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    type: 'semantic',
                    query: { 
                        text: `successful action ${currentSituation.description}` 
                    },
                    top_k: 5
                })
            });
            
            const results = await response.json();
            
            if (results.success) {
                return results.search_results.results.map(r => ({
                    action: r.entity.name,
                    success_rate: r.score,
                    context: r.entity.metadata
                }));
            }
        } catch (error) {
            console.warn('Vector Cave offline, using fallback GOAP');
            return this.fallbackActionSearch(currentSituation);
        }
        
        return [];
    }
    
    // 🎯 RECHERCHE D'ENTITÉS PROCHES SPATIALEMENT
    async findNearbyEntities(agentPosition) {
        try {
            const response = await fetch(`${this.vectorCaveAPI}/search/6d`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    type: 'spatial',
                    query: {
                        center: [agentPosition.x, agentPosition.y, agentPosition.z],
                        radius: 10.0
                    },
                    top_k: 15
                })
            });
            
            const results = await response.json();
            
            if (results.success) {
                return results.search_results.results.map(r => ({
                    entity: r.entity.name,
                    distance: r.distance,
                    type: r.entity.entity_type,
                    position: r.entity.position_6d.slice(0, 3) // x,y,z
                }));
            }
        } catch (error) {
            console.warn('Spatial search failed, using local detection');
            return this.localEntityDetection(agentPosition);
        }
        
        return [];
    }
    
    // ⏰ RECHERCHE D'ÉVÉNEMENTS TEMPORELS LIÉS
    async findRelatedTemporalEvents(currentTime) {
        try {
            const response = await fetch(`${this.vectorCaveAPI}/search/6d`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    type: 'temporal',
                    query: {
                        time: currentTime,
                        time_radius: 50
                    },
                    top_k: 8
                })
            });
            
            const results = await response.json();
            
            if (results.success) {
                return results.search_results.results.map(r => ({
                    event: r.entity.name,
                    time_distance: r.time_distance,
                    causal_influence: r.entity.position_6d[4] // c
                }));
            }
        } catch (error) {
            return [];
        }
        
        return [];
    }
    
    // 🌟 PLANIFICATION AMÉLIORÉE AVEC VECTOR DB
    async enhancedPlanning(currentState, goalState) {
        console.log('🔮 Enhanced GOAP planning with Vector Cave...');
        
        // 1. Recherche d'actions similaires réussies
        const similarActions = await this.findSimilarSuccessfulActions(currentState);
        
        // 2. Entités proches qui peuvent aider
        const nearbyEntities = await this.findNearbyEntities(currentState.agentPosition);
        
        // 3. Événements temporels pertinents
        const temporalEvents = await this.findRelatedTemporalEvents(currentState.gameTime);
        
        // 4. Planification classique GOAP
        const classicPlan = this.classicGOAPPlanning(currentState, goalState);
        
        // 5. Enrichissement avec données Vector Cave
        const enhancedPlan = this.enrichPlanWithVectorData(
            classicPlan,
            similarActions,
            nearbyEntities,
            temporalEvents
        );
        
        console.log(`✅ Plan enrichi: ${enhancedPlan.length} actions optimisées`);
        return enhancedPlan;
    }
    
    // 🎯 ENRICHISSEMENT DU PLAN
    enrichPlanWithVectorData(plan, similarActions, nearbyEntities, temporalEvents) {
        return plan.map(action => {
            // Ajouter contexte des actions similaires réussies
            const similarAction = similarActions.find(sa => 
                sa.action.toLowerCase().includes(action.type.toLowerCase())
            );
            
            if (similarAction) {
                action.confidence = similarAction.success_rate;
                action.historical_context = similarAction.context;
            }
            
            // Ajouter entités proches utilisables
            action.nearby_resources = nearbyEntities.filter(entity => 
                entity.distance < 5.0 && this.canUseEntity(action, entity)
            );
            
            // Ajouter timing optimal basé sur événements temporels
            const relevantEvent = temporalEvents.find(event =>
                event.causal_influence > 0.7
            );
            
            if (relevantEvent) {
                action.optimal_timing = relevantEvent.time_distance;
            }
            
            return action;
        });
    }
}
```

---

## 🎯 **EXEMPLES CONCRETS POUR SURFACE**

### 🤖 **Cas d'usage 1 : Agent cherche ressources**

```javascript
// Votre agent GOAP cherche du bois
const agent = new SurfaceGOAPAgent();

// Recherche sémantique dans Vector Cave
const woodResources = await fetch('http://localhost:5002/api/search/6d', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        type: 'semantic',
        query: { text: 'wood resource tree forest lumber' },
        top_k: 10
    })
});

// Résultat : Liste des entités "bois" avec positions 6D !
// Votre agent peut maintenant planifier le chemin optimal
```

### 🎯 **Cas d'usage 2 : Recherche spatiale tactique**

```javascript
// Votre agent est en combat, cherche alliés proches
const nearbyAllies = await fetch('http://localhost:5002/api/search/6d', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        type: 'spatial',
        query: {
            center: [agent.x, agent.y, agent.z],
            radius: 15.0
        },
        top_k: 5
    })
});

// Résultat : Alliés dans rayon de 15 cases avec distances exactes !
// Votre GOAP peut planifier formation tactique optimale
```

### ⏰ **Cas d'usage 3 : Prédiction temporelle**

```javascript
// Votre agent veut savoir quels événements arrivent
const upcomingEvents = await fetch('http://localhost:5002/api/search/6d', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        type: 'temporal',
        query: {
            time: currentGameTime + 100, // Dans 100 tours
            time_radius: 20
        },
        top_k: 8
    })
});

// Résultat : Événements futurs probables !
// Votre GOAP peut anticiper et préparer
```

---

## 🔧 **INTÉGRATION TECHNIQUE**

### 📦 **Dépendances côté SURFACE**

```javascript
// Dans votre package.json ou requirements
{
    "node-fetch": "^3.0.0",  // Pour appels API
    "axios": "^1.0.0"        // Alternative
}
```

### 🛠️ **Classe utilitaire pour vous**

```javascript
// VectorCaveClient.js - À ajouter dans votre projet
class VectorCaveClient {
    constructor(baseURL = 'http://localhost:5002/api') {
        this.baseURL = baseURL;
        this.timeout = 5000; // 5s timeout
    }
    
    async isReady() {
        try {
            const response = await this.fetch('/status');
            return response.ready === true;
        } catch {
            return false;
        }
    }
    
    async searchSemantic(text, topK = 10) {
        return this.search('semantic', { text }, topK);
    }
    
    async searchSpatial(center, radius, topK = 10) {
        return this.search('spatial', { center, radius }, topK);
    }
    
    async searchTemporal(time, timeRadius, topK = 10) {
        return this.search('temporal', { time, time_radius: timeRadius }, topK);
    }
    
    async searchCombined6D(position6D, semanticText = '', weights = null, topK = 10) {
        const query = { position_6d: position6D };
        if (semanticText) query.semantic_text = semanticText;
        if (weights) query.weights = weights;
        
        return this.search('combined_6d', query, topK);
    }
    
    async search(type, query, topK) {
        try {
            const response = await this.fetch('/search/6d', 'POST', {
                type,
                query,
                top_k: topK
            });
            
            return response.search_results;
        } catch (error) {
            console.warn(`Vector Cave search failed: ${error.message}`);
            return { results: [], total_found: 0 };
        }
    }
    
    async fetch(endpoint, method = 'GET', body = null) {
        const url = `${this.baseURL}${endpoint}`;
        const options = {
            method,
            headers: { 'Content-Type': 'application/json' },
            timeout: this.timeout
        };
        
        if (body) options.body = JSON.stringify(body);
        
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    }
}

// Usage dans votre code GOAP
const vectorCave = new VectorCaveClient();

// Dans votre agent GOAP
class YourGOAPAgent {
    async planWithVectorCave(situation) {
        if (await vectorCave.isReady()) {
            const similarSituations = await vectorCave.searchSemantic(
                situation.description
            );
            
            // Utiliser les résultats pour enrichir votre planification
            return this.enhancedPlanning(situation, similarSituations);
        } else {
            // Fallback sur GOAP classique
            return this.classicPlanning(situation);
        }
    }
}
```

---

## 🎮 **AVANTAGES POUR SURFACE**

### 🚀 **PERFORMANCE BOOST**

1. **IA plus intelligente** : Vos agents trouvent des solutions créatives
2. **Recherche spatiale** : Optimisation des déplacements et formations
3. **Mémoire historique** : Apprentissage des actions réussies
4. **Prédiction temporelle** : Anticipation des événements

### 🎯 **GAMEPLAY AMÉLIORÉ**

1. **Agents plus réalistes** : Comportements émergents intelligents
2. **Interactions complexes** : Prise en compte du contexte 6D
3. **Stratégie avancée** : Plans multi-dimensionnels
4. **Adaptation dynamique** : Réactions contextuelles

---

## 🔧 **SETUP POUR SURFACE**

### 📋 **Étapes d'intégration**

```bash
# 1. Démarrer Vector Cave (côté Heroes of Time)
cd /path/to/heroes-of-time
python3 run_vector_6d_laser.py

# 2. Vérifier que ça marche
curl http://localhost:5002/api/status

# 3. Dans votre projet SURFACE
npm install node-fetch
# ou
pip install requests

# 4. Ajouter VectorCaveClient.js à votre projet

# 5. Modifier vos agents GOAP pour utiliser Vector Cave
```

### 🧪 **Test simple**

```javascript
// Test rapide dans votre console
const vectorCave = new VectorCaveClient();

// Test connection
console.log(await vectorCave.isReady()); // true

// Test recherche
const results = await vectorCave.searchSemantic('powerful hero');
console.log(results); // Liste des héros puissants !
```

---

## 🌟 **RÉSUMÉ POUR SURFACE**

### ✨ **EN UNE PHRASE**

**Vector Cave 6D = Super-cerveau pour vos agents GOAP !** 🧠⚡

### 🎯 **CE QUE ÇA VOUS APPORTE**

1. **Recherche sémantique** : "Trouve entités similaires à X"
2. **Recherche spatiale** : "Quoi dans rayon de 10 cases ?"
3. **Recherche temporelle** : "Que s'est-il passé avant ?"
4. **Recherche causale** : "Entités avec influence similaire"
5. **Mémoire collective** : Base de connaissances partagée

### 🚀 **INTÉGRATION FACILE**

1. **API REST simple** - Juste des appels HTTP
2. **Client JavaScript fourni** - Copy-paste ready
3. **Fallback gracieux** - Marche même si Vector Cave offline
4. **Performance** - Recherches sub-seconde

---

## 📞 **CONTACT & SUPPORT**

### 🧙‍♂️ **Équipe Heroes of Time**

- **MERLIN** : Architecture Vector 6D
- **JEAN-GROFIGNON** : Vision produit  
- **URz*KÔM** : IA GOAP native

### 💬 **Questions ?**

Posez vos questions techniques, on est là pour vous aider à intégrer ! 🚀

---

**🌊 SURFACE + 🔮 VECTOR CAVE = 🚀 GAMING RÉVOLUTIONNAIRE !**

*"Quand SURFACE rencontre la Cave, l'IA transcende !"* ⚡🌟✨