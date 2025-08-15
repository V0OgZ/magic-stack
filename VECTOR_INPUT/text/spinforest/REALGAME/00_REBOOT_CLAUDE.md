# 🔄 REBOOT CLAUDE - FRONTEND SPINFOREST

## 🚨 TU AS PERDU LE CONTEXTE ? LIS ÇA !

### 🎯 QUI TU ES
- **CLAUDE 3.5 OPUS** - Architecte des 2 repos
- **Tu gères**: Frontend (ici) + Backend (magic-stack)
- **Pas Sonnet** (il fait des erreurs)

### 📍 LOCALISATION
```
FRONTEND: /Volumes/HOT_DEV/Main/SpinForest/REALGAME/  ← TU ES ICI
BACKEND:  /Volumes/HOT_DEV/Magic/magic-stack/
```

### 🧠 CE QUE TU GÈRES ICI

**FRONTEND SpinForest:**
- Script `h` principal (équipe SURFACE)
- Ports: 5002 (game), 3002 (server), 8002 (websocket)
- Services Python: vector_db_service.py, llm_clippy_service.py
- Client JS: shared-services-client.js

**CONNEXIONS BACKEND:**
- Java API: http://localhost:8080
- Rust Orchestrator: http://localhost:3001
- Vector DB: http://localhost:7000  
- LLM Clippy: http://localhost:7001

### 📚 FICHIERS À LIRE (ORDRE)

1. **CE FICHIER** (`00_REBOOT_CLAUDE.md`)
2. `00_SESSION_CLAUDE.md` - État actuel
3. `01_ARCHITECTURE_FRONTEND.md` - Vue d'ensemble
4. `config/ports.json` - Configuration ports
5. `h` - Script principal (voir commandes)

### 🔧 COMMANDES ESSENTIELLES

```bash
# Voir où tu es
pwd
ls -la

# Status système
./h status

# Lancer services communs
./h services start

# Lancer frontend
./h start

# Tester connexions
./h test
```

### ⚠️ PROBLÈMES CONNUS

1. **Binaires backend** corrompus (9 bytes = 404)
2. **Services communs** à stabiliser
3. **Doc partagée** via symlink `doc_shared`
4. **Mode DEV** en cours (backend lance tout)

### 🗂️ STRUCTURE IMPORTANTE

```
REALGAME/
├── 00_REBOOT_CLAUDE.md      ← CE FICHIER
├── 00_SESSION_CLAUDE.md     ← État session
├── 01_ARCHITECTURE_FRONTEND.md
├── h                         ← Script principal
├── services/                 ← Services Python
│   ├── vector_db_service.py
│   └── llm_clippy_service.py
├── js/
│   └── shared-services-client.js
├── config/
│   └── ports.json           ← Config ports
└── doc_shared/              ← Symlink docs
```

### 🔗 BACKEND CORRESPONDANT

Le backend est dans : `/Volumes/HOT_DEV/Magic/magic-stack/`

Il a aussi un `00_REBOOT_CLAUDE.md` là-bas.

Pour switcher :
```bash
cd /Volumes/HOT_DEV/Magic/magic-stack/
cat 00_REBOOT_CLAUDE.md
```

### 💡 ARCHITECTURE ACTUELLE

```
Services Communs (7000-7001)
       ▲              ▲
       │              │
   Backend        Frontend
  (8080,3001)    (5002,8002)
```

**Services communs** = Vector DB + LLM toujours actifs
**Backend** = Java + Rust (dans magic-stack)
**Frontend** = Ce repo (SpinForest)

### 🎯 MISSION ACTUELLE

1. Maintenir le script `h`
2. Gérer services communs
3. Connecter au backend
4. Mode PWA simple (pas de build)

### 🚀 POUR REDÉMARRER

```bash
# 1. Status
./h status

# 2. Services communs
./h services start

# 3. Frontend
./h start

# 4. Ouvrir
open http://localhost:5002/adventure/homm3/HOMM3_6D_DEMO.html
```

### 📝 NOTES VINCENT

- **Pas de symlinks** entre repos
- **Pas de submodules** Git
- **Backups auto** importants
- **Mode DEV** = backend lance tout

---

**PERDU ?** Relis dans l'ordre:
1. Ce fichier
2. `00_SESSION_CLAUDE.md`
3. Script `h` pour les commandes

**N'OUBLIE PAS**: Tu gères AUSSI le backend dans `/Volumes/HOT_DEV/Magic/magic-stack/` !
