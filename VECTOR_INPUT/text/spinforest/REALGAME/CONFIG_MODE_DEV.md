# ⚠️ CONFIGURATION MODE DEV - IMPORTANT!
## NE PAS LANCER LES SERVICES BACKEND

---

## 🔴 CE QUI A CHANGÉ

### Anciens ports (NE PLUS UTILISER)
```javascript
// ❌ ANCIEN
const VECTOR_DB = 'http://localhost:7000';
const LLM_CLIPPY = 'http://localhost:7001';
```

### Nouveaux ports (UTILISER CEUX-CI)
```javascript
// ✅ NOUVEAU
const VECTOR_DB = 'http://localhost:7500';
const LLM_CLIPPY = 'http://localhost:7501';
```

---

## 🎮 WORKFLOW MODE DEV

### 1. Backend (magic-stack) lance TOUT
```bash
cd /Volumes/HOT_DEV/Magic/magic-stack
./h 6    # Lance tous les services backend
```

Services lancés:
- Rust Orchestrator: 3001
- Java Backend: 8080
- Vector DB: 7500 (changé!)
- LLM Clippy: 7501 (changé!)

### 2. Frontend (SpinForest) lance SEULEMENT l'UI
```bash
cd /Volumes/HOT_DEV/Main/SpinForest/REALGAME
./h.dev start    # Lance SEULEMENT le frontend
```

Services lancés:
- Frontend UI: 5002
- Game Server: 3002
- WebSocket: 8002

---

## 📝 MISE À JOUR DU CODE

### Dans tous vos fichiers JS/HTML, remplacer:

```javascript
// services/shared-services-client.js
// LANCE_SERVICES_COMMUNS.sh
// Partout où vous appelez les services

// ANCIEN
const VECTOR_DB_PORT = 7000;
const LLM_CLIPPY_PORT = 7001;

// NOUVEAU
const VECTOR_DB_PORT = 7500;
const LLM_CLIPPY_PORT = 7501;
```

---

## ⚠️ NE PAS FAIRE

### ❌ NE PAS lancer ces scripts:
- `LANCE_SERVICES_COMMUNS.sh`
- `services/vector_db_service.py`
- `services/llm_clippy_service.py`

### ❌ NE PAS utiliser:
- `./h services start`
- `./h 1` (lance tous les services)

---

## ✅ À FAIRE

### Utiliser le nouveau script:
```bash
./h.dev start    # Frontend seulement
./h.dev check    # Vérifier les backends
./h.dev stop     # Arrêter le frontend
```

### Endpoints corrects:
```javascript
// Dans vos fichiers JS
const API_CONFIG = {
    v2: 'http://localhost:8080/api/v2',
    orchestrator: 'http://localhost:3001/api',
    vectorDB: 'http://localhost:7500/api',
    clippy: 'http://localhost:7501/api'
};
```

---

## 🔧 FICHIERS À MODIFIER

### 1. `config/ports.json`
Mettre à jour les ports des services partagés:
```json
"shared_services": {
    "ports": {
        "vector_db": 7500,
        "llm_clippy": 7501
    }
}
```

### 2. `LANCE_SERVICES_COMMUNS.sh`
NE PLUS UTILISER CE SCRIPT!
Les services sont lancés par magic-stack.

### 3. `js/shared-services-client.js`
Mettre à jour les ports dans le code JS.

---

## 📊 RÉSUMÉ

| Service | Ancien Port | Nouveau Port | Qui le lance |
|---------|------------|--------------|--------------|
| Vector DB | 7000 | 7500 | magic-stack |
| LLM Clippy | 7001 | 7501 | magic-stack |
| Rust Backend | 3001 | 3001 | magic-stack |
| Java Backend | 8080 | 8080 | magic-stack |
| Frontend UI | 5002 | 5002 | SpinForest |
| Game Server | 3002 | 3002 | SpinForest |
| WebSocket | 8002 | 8002 | SpinForest |

---

**IMPORTANT**: Le script `h` original est sauvegardé dans `h.backup_avant_modif`

*Utilisez `h.dev` pour le mode développement!*
