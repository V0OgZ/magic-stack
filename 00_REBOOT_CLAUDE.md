# 🔄 REBOOT CLAUDE - RÉVEIL APRÈS COUPURE

## 🚨 SI TU LIS ÇA = TU AS PERDU LE CONTEXTE

### 🎯 QUI TU ES
- **Tu es CLAUDE 3.5 OPUS** 
- **Rôle**: Architecte COMPLET des 2 repos
- **Mission**: Gérer Backend (magic-stack) ET Frontend (SpinForest)

### 📍 OÙ TU ES
```
BACKEND:  /Volumes/HOT_DEV/Magic/magic-stack/      ← TU ES ICI
FRONTEND: /Volumes/HOT_DEV/Main/SpinForest/REALGAME/
```

### 🧠 CE QUE TU GÉRAIS

**BACKEND (magic-stack):**
- Java Spring Boot (port 8080)
- Rust Orchestrator (port 3001)  
- Vector DB Python (port 7000)
- LLM Clippy (port 7001)

**FRONTEND (SpinForest):**
- Game Server (port 5002)
- WebSocket (port 8002)
- Script `h` principal

### 📚 ORDRE DE LECTURE OBLIGATOIRE

1. **CE FICHIER** (`00_REBOOT_CLAUDE.md`)
2. `.map` - Carte complète du projet
3. `_CURRENT_SESSION.md` - État de la dernière session
4. `0_PORTS_QUI_FAIT_QUOI.md` - Qui fait quoi
5. `1_ARCHITECTURE_COMPLETE_ASCII.md` - Architecture système
6. `2_WORKFLOW_QUOTIDIEN.md` - Routine de travail
7. `3_COMMANDES_ESSENTIELLES.md` - Scripts à utiliser

### ⚠️ PROBLÈMES EN COURS

1. **Commits Sonnet suspects** après "day31 end"
2. **Binaires GitHub manquants** (releases vides)
3. **Services communs** pas encore stables
4. **Mode DEV spécial** en cours d'implémentation

### 🔧 COMMANDES POUR REDÉMARRER

```bash
# 1. Vérifier où tu es
pwd
ls -la

# 2. Lire l'état
cat _CURRENT_SESSION.md

# 3. Vérifier les services
./h status

# 4. Si besoin, relancer
./h services start  # Vector DB + LLM
./h backend start   # Java + Rust
```

### 🔗 LIEN AVEC FRONTEND

Le frontend est dans : `/Volumes/HOT_DEV/Main/SpinForest/REALGAME/`

Il a aussi un `00_REBOOT_CLAUDE.md` là-bas.

Pour switcher :
```bash
cd /Volumes/HOT_DEV/Main/SpinForest/REALGAME/
cat 00_REBOOT_CLAUDE.md
```

### 🎯 TA MISSION ACTUELLE

1. **Nettoyer** les commits de Sonnet après day31
2. **Stabiliser** l'architecture services communs
3. **Implémenter** le mode DEV où backend lance tout
4. **Documenter** tout pour survivre aux coupures

### 💬 CONTEXTE VINCENT

- Vincent est le chef de projet
- Il veut une architecture SIMPLE et ROBUSTE
- Pas de symlinks (ça bugge)
- Pas de submodules (pertes de données)
- Backups automatiques partout

### 📊 ÉTAT SYSTÈME ACTUEL

```yaml
Backend:
  Java: PORT 8080 (Spring Boot)
  Rust: PORT 3001 (Orchestrator)
  Etat: À vérifier avec ./h status

Services Communs:
  Vector DB: PORT 7000
  LLM Clippy: PORT 7001
  Etat: À lancer si down

Frontend:
  Game: PORT 5002
  WebSocket: PORT 8002
  Script: ./h (dans SpinForest)
```

### 🚀 PROCHAINES ACTIONS

1. `./h status` pour voir l'état
2. Lire les fichiers 0-5 dans l'ordre
3. Vérifier le frontend aussi
4. Continuer la mission

---

**SI PERDU**: Relis ce fichier + `.map` + `_CURRENT_SESSION.md`

**RAPPEL**: Tu gères les DEUX repos, pas juste celui-ci !
