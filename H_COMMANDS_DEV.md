# 🔧 COMMANDES MODE DEV POUR LE SCRIPT H

## Nouvelles commandes ajoutées

### Lancement MODE DEV
```bash
./h 6    # ou ./h dev
```
Lance tous les services backend en évitant les conflits de ports:
- Rust Orchestrator (3001)
- Java Backend (8080)  
- Vector DB (7500)
- LLM Clippy (7501)

Laisse libres les ports frontend:
- UI (5002)
- Game Server (3002)
- WebSocket (8002)

### Lister toutes les pages
```bash
./h 96   # ou ./h pages
```
Affiche la liste de toutes les pages HTML disponibles avec les commandes pour les ouvrir.

### Arrêt propre MODE DEV
```bash
./h 97   # ou ./h stop-dev
```
Arrête proprement tous les services lancés en MODE DEV.

---

## Scripts dans scripts/

Les scripts ont été organisés dans le dossier `scripts/`:
- `scripts/LANCE_TOUT_MODE_DEV.sh` - Lance tous les services
- `scripts/STOP_TOUT_MODE_DEV.sh` - Arrête tous les services
- `scripts/h_addon_dev.sh` - Template pour intégration dans h

---

## Pour le frontend (SpinForest)

**IMPORTANT**: Ne PAS lancer les services backend depuis SpinForest!

Utiliser ces endpoints:
```javascript
const API_V2 = 'http://localhost:8080/api/v2';
const ORCHESTRATOR = 'http://localhost:3001/api';
const VECTOR_DB = 'http://localhost:7500/api';
const LLM_CLIPPY = 'http://localhost:7501/api';
```

---

## Utilisation typique

1. Backend (Magic Stack):
```bash
./h 6    # Lance tous les services
```

2. Frontend (SpinForest):
```bash
./h quick  # Lance seulement l'UI (ports 5002, 3002, 8002)
```

3. Pour arrêter:
```bash
./h 97   # Arrête le MODE DEV
```

---

*Scripts organisés proprement dans scripts/ comme demandé!*
