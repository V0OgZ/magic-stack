# 🔴 TOUTES LES APIs V2 - DOCUMENTATION COMPLÈTE 🔴
## État réel Jour 35 - 11 Août 2024

---

# 🦀 BACKEND RUST (Port 3001) ✅ ACTIF

## Core Health & Status
- `GET /health` - Health check basique
- `POST /health` - Health check agents  
- `GET /api/hero/status` - Statut du héros actuel
- `GET /api/archives/status` - Statut des archives Vector DB

## Explorer & Documentation
- `GET /explorer` - Interface web API Explorer
- `GET /openapi` - Spec OpenAPI Rust
- `GET /openapi/all` - Spec OpenAPI agrégée (Rust + Java)
- `GET /docs/openapi` - Interface Redoc

## Agents System (MVP)
- `POST /agents/tick` - Tick des agents
- `POST /agents/plan` - Planification A* pondérée
- `POST /agents/fork` - Fork d'identité temporelle
- `POST /agents/merge` - Fusion d'identités
- `POST /agents/control` - Définir contrôleur (player/ai)
- `POST /agents/cast` - Lancer formule via Java

## World State Graph (Q* Engine)
- `POST /api/qstar/search` - Recherche Q*
- `POST /api/world-state/nodes` - Créer nœud
- `GET /api/world-state/nodes/:id` - Obtenir nœud
- `POST /api/world-state/nodes/:id/position` - Mettre à jour position
- `GET /api/world-state/identities/:id/doubles` - Obtenir doubles d'identité
- `GET /api/world-state/nodes/radius` - Nœuds dans un rayon
- `POST /api/world-state/collapse` - Observation collapse

## Causality & Resolution
- `POST /api/causality/resolve` - Résolution causalité (QUANTUM/TCG)

## Map Generation
- `POST /api/map/generate` - Générer carte biome contiguë
- `POST /api/map/init` - Initialiser entités 6D depuis carte

## V2 Multiplayer
- `POST /api/v2/tick` - Advance V2 tick
- `GET /api/v2/entity/:id` - Get V2 entity state
- `POST /api/v2/migrate-entity` - Migrate entity to V2
- `GET /api/v2/config` - Get V2 configuration

---

# ☕ BACKEND JAVA (Port 8080) ❌ À LANCER

## Core Health & Documentation
- `GET /` - Page d'accueil
- `GET /api` - Documentation API complète
- `GET /api/magic/health` - Vérifier que la magie est active

## Magic System (869 Formules!)
- `POST /api/magic/cast` - Lancer un sort
- `POST /api/magic/translate` - Traduire une formule
- `POST /api/magic/shift` - Décalage temporel
- `POST /api/magic/fork` - Fork de réalité
- `POST /api/magic/merge` - Fusion de timelines
- `GET /api/magic/formulas` - Liste des 869 formules

## Interstice (Upload/Download 6D)
- `POST /api/interstice/upload` - Sauvegarder une entité en 6D
- `POST /api/interstice/download` - Récupérer une entité
- `POST /api/interstice/search` - Recherche 6D

## Regulators (Anti-abus)
- `GET /api/regulators/status` - État global des régulateurs
- `POST /api/regulators/reset` - Réinitialiser régulateurs
- `GET /api/regulators/judge/stats` - Stats du juge
- `POST /api/regulators/judge/record-game` - Enregistrer résultat
- `GET /api/regulators/hunter/stats` - Stats du chasseur
- `POST /api/regulators/hunter/record-event` - Enregistrer événement
- `GET /api/regulators/hunter/paradoxes` - Paradoxes actifs

## Panopticon (Vision globale)
- `GET /api/panopticon/world-state` - État global du monde
- `GET /api/panopticon/entities` - Toutes les entités
- `GET /api/panopticon/active-formulas` - Formules actives

## Mage System  
- `GET /api/mage/hello` - Test connexion mage
- `POST /api/mage/cast` - Lancer un sort (mage)

## ⚠️ MANQUANT (À IMPLÉMENTER EN JAVA)
- `GET /api/heroes` - Liste des héros
- `GET /api/heroes/:id` - Détails d'un héros
- `POST /api/heroes/create` - Créer un héros
- `GET /api/creatures` - Liste des créatures
- `GET /api/artifacts` - Liste des artefacts
- `GET /api/portals` - Liste des portails

---

# 🐍 BACKEND PYTHON (Port 5001) ❓ OPTIONNEL

## Vector DB / Search
- `POST /search` - Recherche sémantique
- `POST /embed` - Générer embeddings
- `GET /status` - État du service

---

# 🔧 SERVICES PARTAGÉS (Ports 7500-7501)

## Vector DB Service (7500)
- Service de base de données vectorielle
- Stockage des lores et documentation
- Recherche sémantique

## LLM Clippy Service (7501)  
- Assistant IA Clippy/Memento
- Mode quick (prédéfini) ou intelligent (LLM)
- Niveaux: player, mage, dev, vincent

---

# 🎮 FRONTEND (Port 5175) ✅ ACTIF

## App React Unifiée
- `/` - Home page
- `/unified` - Éditeur unifié (Structure + Resources + Timeline)
- `/game` - Game view
- `/editor` - Map Icon Placer V2
- `/combat` - Combat IA vs IA (wrapper HTML)
- `/chasse-mega` - Chasse Temporelle (wrapper HTML)
- `/dashboard.html` - Dashboard central

---

# 📝 COMMENT UTILISER

## 1. Lancer les services
```bash
./go status     # Voir l'état
./go game       # Lancer l'éditeur
./go admin      # Dashboard
```

## 2. Lancer le backend Java (IMPORTANT!)
```bash
cd backends/java
./mvnw spring-boot:run
```

## 3. APIs prioritaires pour l'éditeur

### Récupérer les héros (À IMPLÉMENTER)
```bash
GET http://localhost:8080/api/heroes
```

### Récupérer les créatures (À IMPLÉMENTER)  
```bash
GET http://localhost:8080/api/creatures
```

### Récupérer les portails (À IMPLÉMENTER)
```bash
GET http://localhost:8080/api/portals
```

---

# ⚠️ STATUT CRITIQUE

## ✅ CE QUI MARCHE
- Frontend React (5175)
- Backend Rust (3001)
- Structure nettoyée
- Assets dans hot/content/

## ❌ CE QUI MANQUE  
- Backend Java pas lancé
- APIs heroes/creatures/artifacts pas implémentées
- Frontend utilise données en dur

## 🔥 PRIORITÉ ABSOLUE
1. Lancer le backend Java
2. Implémenter les endpoints manquants en JAVA (pas Rust!)
3. Connecter le frontend aux vraies APIs

---

**VINCENT: Les données sont dans `hot/content/` - Il faut juste que le Java les serve!**
