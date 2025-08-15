# 🎯 MEMO BACKEND - CE QU'ON FAISAIT (Point de vue Frontend)

## 🏗️ ARCHITECTURE GLOBALE

### Magic Stack (Backend unifié)
- **Backend Java** (Spring Boot) : Port 8080/8082
- **Serveur Rust** (Orchestrateur) : Port 3001  
- **Frontend REALGAME** : Port 5002 (équipe Vincent + Claude)
- **APIs unifiées** : Orchestrateur bridge entre Java et Rust

### Séparation équipes
- **🔮 PROFONDEURS** (3001) : Backend Rust + APIs
- **🌊 SURFACE** (5002) : Frontend + Mini-jeux  
- **☕ BACKEND** (8080) : Spring Boot Java
- **Règle** : Chacun sur ses ports, pas d'interférence

## 🎮 HEROES OF TIME - JEU PRINCIPAL

### Système temporel complexe
- **Énergie complexe** : `E = A + iΦ` (A=actions, Φ=cohérence)
- **Clones temporels** : Envoi versions passées, interférences `|I|`
- **Temps différencié** : `t_w` serveur, `t_e` par entité
- **Régulateurs** : Vince/Anna/Overload contre abus

### 3 modes résolution
- **Collapse** : Combat auto rapide  
- **TCG** : Combat cartes manuel
- **Auto/IA** : Si AFK > 60s

### Orchestrateur (cœur système)
```javascript
// APIs définies
POST /orchestrator/session     → Créer session joueur
POST /orchestrator/intent      → Envoyer actions (MOVE/OBSERVE/COLLECT)
GET  /orchestrator/snapshot    → Récupérer état monde
GET  /orchestrator/decision-policy → Config résolution combats
```

## 🗄️ VECTOR DB - CLIPPY MEMENTO

### Base vectorielle complète
- **423 assets** organisés (héros, artefacts, lore)
- **Recherche sémantique** pour assistant IA
- **Audio/Visual mapping** automatique
- **Niveaux accès** : Public/Restricted/Technical/Private

### APIs prévues
```javascript
POST /api/archives/search      → Recherche sémantique
GET  /api/archives/status      → Status indexes  
POST /api/archives/build       → Reconstruction index
```

### CLIPPY-Memento intégration
- **Assistant intelligent** dans le jeu
- **Accès Vector DB** pour réponses contextuelles  
- **Modes différents** : Joueur/Mage/Dev/Vincent
- **JavaScript pur** côté frontend

## 📡 WORKFLOW DÉVELOPPEMENT

### Synchronisation automatique
```bash
./autosync_simple.sh           # Sync équipe (code + docs)
./SYNC_VECTOR_DB.sh           # Sync assets pour Vector DB
./download_binaries.sh        # Récupérer nouveaux binaires
```

### Structure docs partagées
```
API_DOC_LINK/docs/ → Lien symbolique vers volume partagé
├── ___LATEST ENGINE SPECS - 0826/  ← Specs complètes jeu
├── 05 - PROFONDEURS/               ← APIs backend
├── 07 - SURFACE/                   ← APIs frontend
└── V - VECTOR_DB_ASSETS/           ← Assets pour IA (889+ fichiers)
```

## 🎯 CE QUE LE BACKEND DEVAIT IMPLÉMENTER

### 1. Orchestrateur Rust (Port 3001)
- **Session management** : Créer/gérer sessions joueurs
- **Intent processing** : Traiter actions joueur (déplacements, etc.)
- **World state** : Maintenir état monde 6D temporel
- **Idempotency** : Éviter doublons actions

### 2. APIs Vector DB 
- **Index FAISS** : 566 docs story + 624 docs dev
- **Recherche sémantique** : sentence-transformers
- **Bridge Python** intégré dans Rust
- **Filtrage niveaux** : Public/Dev/Vincent

### 3. Intégration Magic Stack Java
- **Spring Boot backend** maintenu
- **Pont Rust-Java** pour données partagées
- **Migration progressive** vers Rust

## 🔧 INTÉGRATION FRONTEND

### Client Orchestrateur JS (déjà codé)
```javascript
const client = createOrchestrator('http://localhost:3001');
await client.startSession('hero:alice', 'frontend-homm3');
await client.sendIntent({
  type: 'MOVE', 
  heroId: 'hero:alice', 
  delta: { dx: 1, dy: 0 }
});
```

### CLIPPY-Memento intégration
```javascript
// Recherche dans Vector DB
const response = await fetch('/api/archives/search', {
  method: 'POST',
  body: JSON.stringify({
    query: 'temporal mechanics',
    mode: 'story',
    top_k: 5
  })
});
```

## 🚀 ÉTAT ACTUEL

### ✅ Ce qui marche
- **Frontend Surface** : Port 5002 opérationnel
- **Docs organisées** : Structure complète
- **Assets Vector DB** : 889+ fichiers prêts
- **Specs engine** : 30+ fichiers détaillés
- **Client JS** : Code orchestrateur prêt

### ⚠️ Ce qui manque côté backend
- **Orchestrateur Rust** : Endpoints à implémenter
- **Vector DB** : Index à construire 
- **Bridge Python** : Intégration sentence-transformers
- **Session management** : Logique multi-joueurs

## 📋 TODO BACKEND IMMÉDIAT

### 1. Lancer Rust serveur (Port 3001)
```bash
cd binaries/
./magic-stack-server
```

### 2. Implémenter endpoints minimum
- `POST /orchestrator/session`
- `POST /orchestrator/intent`  
- `GET /orchestrator/snapshot`

### 3. Vector DB minimal
- Lire `API_DOC_LINK/docs/V - VECTOR_DB_ASSETS/`
- Index avec sentence-transformers
- API `/api/archives/search`

### 4. Test intégration
```bash
# Frontend test
curl -X POST localhost:3001/orchestrator/session \
  -d '{"heroId":"hero:alice","clientVersion":"test"}'
```

## 💡 RAPPEL PHILOSOPHIE

### "Pace is a resource" 
- Le temps est une ressource qu'on dépense
- Pas de tours fixes, tempo fluide
- Actions coûtent énergie complexe E=A+iΦ

### Architecture séparée
- Chaque équipe ses ports
- Communication par APIs REST
- Pas de conflits, pas de pkill global

### CLIPPY-Memento
- Assistant IA intégré au jeu
- Accès contextuel aux 889+ assets
- Réponses adaptées au niveau utilisateur

---

**🎯 RÉSUMÉ ULTRA-COURT**

On avait un **jeu temporel complexe** (Heroes of Time) avec **backend unifié** (Magic Stack) et **assistant IA** (CLIPPY-Memento) connecté à une **base vectorielle** de 889+ assets.

Le **frontend est prêt**, les **specs sont complètes**, il manque juste l'**implémentation backend** des APIs orchestrateur et Vector DB.

**Les binaires existent**, les **docs sont organisées**, le **workflow est défini**.

Il faut juste **implémenter les endpoints** et **construire les index**.
