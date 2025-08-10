# 📡 API SURFACE COMPLÈTE - MAGIC STACK
## Extraction exhaustive de tous les endpoints disponibles

---

## 🦀 **BACKEND RUST** (Port 3001)

### Core Health & Status
- `GET /health` - Health check basique
- `POST /health` - Health check agents
- `GET /api/hero/status` - Statut du héros actuel
- `GET /api/archives/status` - Statut des archives Vector DB

### Explorer & Documentation
- `GET /explorer` - Interface web API Explorer
- `GET /openapi` - Spec OpenAPI Rust
- `GET /openapi/all` - Spec OpenAPI agrégée (Rust + Java)
- `GET /docs/openapi` - Interface Redoc

### Agents System (MVP)
- `POST /agents/tick` - Tick des agents
- `POST /agents/plan` - Planification A* pondérée
- `POST /agents/fork` - Fork d'identité temporelle
- `POST /agents/merge` - Fusion d'identités
- `POST /agents/control` - Définir contrôleur (player/ai)
- `POST /agents/cast` - Lancer formule via Java

### Matches & Combat
- `POST /matches` - Créer un match
- `GET /matches/:id/state` - État d'un match
- `GET /combat/observe/compact` - Vue compacte combat
- `GET /observe/compact` - Vue observation compacte

### World State Graph (Q* Engine)
- `POST /api/qstar/search` - Recherche Q*
- `POST /api/world-state/nodes` - Créer nœud
- `GET /api/world-state/nodes/:id` - Obtenir nœud
- `POST /api/world-state/nodes/:id/position` - Mettre à jour position
- `GET /api/world-state/identities/:id/doubles` - Obtenir doubles d'identité
- `GET /api/world-state/nodes/radius` - Nœuds dans un rayon
- `POST /api/world-state/collapse` - Observation collapse
- `GET /api/panopticon/world-state-graph/nearby` - Nœuds proches (alias)

### Causality & Resolution
- `POST /api/causality/resolve` - Résolution causalité (QUANTUM/TCG)

### Map Generation
- `POST /api/map/generate` - Générer carte biome contiguë
- `POST /api/map/init` - Initialiser entités 6D depuis carte

### Archives (Vector DB Proxy)
- `POST /api/archives/search` - Recherche sémantique
- `POST /api/archives/build` - Construire index

### Economy & Crafting
- `GET /api/economy/inventory` - Inventaire joueur
- `POST /api/economy/collect` - Collecter ressources
- `POST /api/economy/arcade-result` - Résultat arcade

### Crafting System
- `POST /api/craft/potion` - Crafter potion
- `POST /api/craft/crystal` - Crafter cristal
- `POST /api/craft/artifact` - Crafter artefact

### Mage System
- `POST /api/mage/learn-runes` - Apprendre runes

### Minigames
- `GET /api/minigames/catalog` - Catalogue minijeux
- `POST /api/minigames/start` - Démarrer minijeu
- `GET /api/minigames/:id` - État minijeu
- `POST /api/minigames/:id/result` - Résultat minijeu
- `POST /api/minigames/auto-trigger` - Déclencheur auto

### Hero XP/Perks
- `POST /api/hero/add-xp` - Ajouter XP
- `POST /api/hero/apply-perk` - Appliquer avantage

### Orchestrator (MVP)
- `POST /orchestrator/session` - Créer session
- `POST /orchestrator/intent` - Envoyer intention
- `GET /orchestrator/decision-policy` - Politique décision
- `GET /orchestrator/snapshot` - Snapshot état

### TCG AI (MVP)
- `POST /tcg/ai/decide` - Décision IA TCG
- `POST /tcg/ai/coach` - Coach IA TCG
- `GET /tcg/ai/telemetry/:id` - Télémétrie IA

### Tests & Integration
- `POST /api/test/all-formulas` - Tester toutes les formules
- `POST /api/integration/formula-cast` - Cast intégré de formule

---

## ☕ **BACKEND JAVA** (Port 8080)

### Core Health & Documentation
- `GET /` - Page d'accueil
- `GET /api` - Documentation API complète
- `GET /api/health` - Health check
- `GET /api/status` - Statut service

### Magic Engine (869 Formules)
- `GET /api/magic/health` - Santé moteur magique
- `POST /api/magic/cast` - Lancer sort
- `POST /api/magic/translate` - Traduire formule
- `POST /api/magic/shift` - Décalage temporel
- `POST /api/magic/fork` - Fork de réalité
- `POST /api/magic/merge` - Fusion de timelines
- `GET /api/magic/formulas` - Liste des 869 formules

### Interstice 6D Storage
- `POST /api/interstice/upload` - Sauvegarder entité en 6D
- `POST /api/interstice/download` - Récupérer entité
- `POST /api/interstice/search` - Recherche 6D

### Regulators System
- `GET /api/regulators/status` - État régulateurs
- `POST /api/regulators/vince` - Activer Vince (perçage)
- `POST /api/regulators/anna` - Activer Anna (décroissance)
- `POST /api/regulators/overload` - Activer Overload

---

## 🐍 **BACKEND PYTHON** (Port 5002)

### Vector DB 6D
- `GET /api/status` - État du service
- `POST /api/build` - Construire index 6D
- `POST /api/search` - Recherche sémantique
- `GET /api/stats` - Statistiques index

---

## 🌐 **FRONTEND WEB** (Port 3001)

### Interfaces Web
- `http://localhost:3001/explorer` - API Explorer interactif
- `http://localhost:3001/docs/openapi` - Documentation Redoc

---

## 📊 **MÉTRIQUES & ANALYSE**

### Endpoints par service
- **Rust** : 50+ endpoints
- **Java** : 13 endpoints principaux
- **Python** : 4 endpoints
- **Total** : ~70 endpoints uniques

### Catégories fonctionnelles
1. **Combat & Résolution** : 8 endpoints
2. **World State** : 10 endpoints
3. **Economy & Craft** : 8 endpoints
4. **Agents & AI** : 12 endpoints
5. **Magic Engine** : 7 endpoints
6. **Minigames** : 5 endpoints
7. **Documentation** : 6 endpoints
8. **Health & Status** : 6 endpoints
9. **Archives & Search** : 5 endpoints
10. **Orchestration** : 4 endpoints

### Protocoles supportés
- HTTP REST (JSON)
- CORS enabled (toutes origines)
- OpenAPI 3.0 documentation

### Ports utilisés
- `3001` : Rust + Frontend
- `8080` : Java Spring Boot
- `5002` : Python Vector DB

---

## 🔄 **INTERCONNEXIONS**

### Rust → Java
- `/agents/cast` → `/api/magic/cast`
- OpenAPI aggregation
- Regulators proxy

### Rust → Python
- `/api/archives/*` → Vector DB endpoints

### Java ↔ Interstice
- Stockage 6D natif
- Recherche temporelle

---

## 🎯 **ENDPOINTS CRITIQUES V2**

### À implémenter
- **WebSocket** pour temps réel
- `/api/scenarios/*` - Gestion scénarios
- `/api/visualizer/*` - Visualisation temps réel
- `/api/clippy/*` - Assistant Clippy
- `/api/mobile/*` - API PWA mobile

### À améliorer
- Authentication/Authorization
- Rate limiting
- Caching strategy
- Error handling standardisé
- Métriques Prometheus

---

## 📝 **NOTES D'INTÉGRATION**

### Format des requêtes
```json
// POST /api/magic/cast
{
  "formula": "fire_ball_temporal",
  "power": 50,
  "targetX": 10,
  "targetY": 20,
  "targetZ": 0
}

// POST /agents/plan
{
  "entityId": "hero_1",
  "target": {"x": 10, "y": 20},
  "maxCost": 100
}
```

### Format des réponses
```json
// Succès
{
  "success": true,
  "data": { ... },
  "timestamp": "2025-01-08T..."
}

// Erreur
{
  "success": false,
  "error": "...",
  "code": "ERROR_CODE"
}
```

---

*Document généré le 08/01/2025 - Magic Stack V2 API Surface*
*Par : Opus, votre assistant IA*
