# 🛡️ ARCHITECTURE ZÉRO RISQUE - MAGIC STACK

## 🎯 PRINCIPE : ISOLATION TOTALE

### 1️⃣ SÉPARATION PHYSIQUE
```
/Volumes/HOT_DEV/
├── Magic/magic-stack/       # Backend PUBLIC (Java/Rust)
├── Main/SpinForest/         # Frontend PRIVÉ (ton jeu)
└── Services/                # Services COMMUNS (nouveau)
    ├── vector-db/           # Port 7000
    └── llm-clippy/          # Port 7001
```

### 2️⃣ PAS DE LIENS SYMBOLIQUES
- ❌ Pas de ln -s (VS Code bugge)
- ❌ Pas de submodules (pertes data)
- ✅ Scripts qui COPIENT si besoin

### 3️⃣ PORTS FIXES PAR ÉQUIPE
```yaml
Services Communs (toujours actifs):
  vector-db: 7000
  llm-clippy: 7001
  
Backend MagicStack (Jean):
  java: 8080
  rust: 3001
  
Frontend SpinForest (Vincent):
  game: 5002
  websocket: 8002
  
Développement Local (toi):
  test: 9000-9999  # Plage réservée
```

## 🚀 WORKFLOW SIMPLE

### DÉMARRAGE (1 fois par jour)
```bash
# 1. Protection Git
cd /Volumes/HOT_DEV/Magic/magic-stack
./PROTECTION_GIT.sh

# 2. Services communs
cd /Volumes/HOT_DEV/Services
./start-services.sh

# 3. Backend OU Frontend (pas les deux)
./h backend  # OU
./h frontend
```

### TRAVAIL
```bash
# Je modifie dans magic-stack
# Les changements restent locaux
# Pas de push automatique
```

### SAUVEGARDE (toutes les heures)
```bash
./BACKUP_NOW.sh  # Crée un snapshot
```

## 🔒 PROTECTIONS

### Anti Reset Hard
```bash
# Dans .git/hooks/pre-commit
#!/bin/bash
echo "⚠️ Backup automatique..."
cp -r . /Volumes/HOT_DEV/BACKUPS/$(date +%s)/
```

### Anti Conflits Cursor
```bash
# .cursorignore dans chaque repo
node_modules/
.git/
*.backup
/Volumes/HOT_DEV/Main/  # Ignore l'autre repo
/Volumes/HOT_DEV/Magic/ # Si dans SpinForest
```

### Anti Perte Data
```bash
# Cron toutes les heures
0 * * * * /Volumes/HOT_DEV/Scripts/backup-all.sh
```

## 📊 COMMUNICATION INTER-REPOS

### Via Services Communs
```javascript
// Frontend lit
fetch('http://localhost:7000/api/search')

// Backend écrit
POST http://localhost:7000/api/index
```

### Via Fichiers JSON
```bash
# Backend écrit
echo "{data}" > /tmp/shared/state.json

# Frontend lit
cat /tmp/shared/state.json
```

### Via Message Bus
```bash
# Port 5001 - Vector Bus (déjà configuré)
Backend → PUSH → Bus → PULL → Frontend
```

## ✅ AVANTAGES

1. **Zéro risque Git** - Repos séparés
2. **Zéro conflit ports** - Plages dédiées
3. **Backups auto** - Toutes les heures
4. **Simple** - 3 commandes pour tout lancer
5. **Robuste** - Survit aux crashs

## 🎮 COMMANDES VINCENT

```bash
# Protection quotidienne
./PROTECTION_GIT.sh

# Lancer ton jeu
cd /Volumes/HOT_DEV/Main/SpinForest/REALGAME
./h start

# Lancer backend
cd /Volumes/HOT_DEV/Magic/magic-stack
./h backend

# Services communs
./h services start

# Backup immédiat
./BACKUP_NOW.sh
```

## ⚠️ NE JAMAIS FAIRE

- ❌ `git reset --hard`
- ❌ `git clean -fd`
- ❌ `rm -rf` sans backup
- ❌ Symlinks entre repos
- ❌ Submodules Git
- ❌ Push automatique

## 💾 RÉCUPÉRATION URGENCE

Si problème :
```bash
# Dernière backup
ls -la /Volumes/HOT_DEV/BACKUPS/

# Restaurer
cp -r /Volumes/HOT_DEV/BACKUPS/[latest]/* .
```

---
**CETTE ARCHITECTURE EST INCASSABLE**
