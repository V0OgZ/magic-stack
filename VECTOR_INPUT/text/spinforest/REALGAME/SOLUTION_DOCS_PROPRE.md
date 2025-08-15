# 📚 SOLUTION DOCS PROPRE - Sans Symlinks

## ❌ PROBLÈMES ACTUELS
- Symlinks cassent avec VS Code/Cursor
- Doublons entre repos et docs partagées  
- Confusion sur qui a quoi
- Risque de perdre des trucs

## ✅ PROPOSITION SIMPLE

### 1. CHAQUE REPO = SES DOCS
```
magic-stack/
├── docs/           # Docs backend UNIQUEMENT
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── BUILD.md
└── h               # Script qui sait où tout est

REALGAME/
├── docs/           # Docs frontend UNIQUEMENT
│   ├── UI.md
│   ├── GAME.md
│   └── ASSETS.md
└── h               # Script qui sait où tout est
```

### 2. DOCS PARTAGÉES = ARCHIVES
```
/Volumes/HOT_DOCS_SHARED/HOT_DEV/docs/
├── 00 - EN COURS/     # Travail actuel
├── 01 - ANALYSES/     # Analyses finies
├── 02 - GUIDES/       # Guides stables
├── 03 - VISION/       # Ta vision du projet
├── V - VECTOR_DB_ASSETS/  # Assets indexés
└── archives/          # Vieux trucs
```

### 3. SYNCHRONISATION = SCRIPTS
```bash
# Dans chaque repo, un script simple
./h sync-docs      # Copie les docs importantes vers SHARED
./h fetch-docs     # Récupère ce dont on a besoin
```

## 🔧 IMPLEMENTATION

### Étape 1: Nettoyer les symlinks
```bash
# Frontend
cd /Volumes/HOT_DEV/Main/SpinForest/REALGAME
rm doc_shared  # Supprimer symlink

# Backend  
cd /Volumes/HOT_DEV/Magic/magic-stack
# (pas de symlink ici)
```

### Étape 2: Créer docs locaux
```bash
# Frontend
mkdir -p docs/frontend
mkdir -p docs/game
mkdir -p docs/assets

# Backend
mkdir -p docs/backend
mkdir -p docs/api
mkdir -p docs/build
```

### Étape 3: Script de sync (dans h)
```bash
sync_docs() {
    # Copier vers shared (sans écraser)
    cp -n docs/*.md /Volumes/HOT_DOCS_SHARED/HOT_DEV/docs/00\ -\ EN\ COURS/
    echo "Docs synchronisées"
}
```

## 📝 AVANTAGES
- Pas de symlinks cassés
- Chaque repo indépendant
- Backup automatique dans SHARED
- Clair qui possède quoi
- VS Code/Cursor content

## 🎯 RÈGLES SIMPLES
1. **Frontend** = docs UI/Game/Assets
2. **Backend** = docs API/Build/Architecture
3. **Shared** = archives + travail en cours
4. **Pas de doublons** = un fichier, un endroit
5. **Script h** = gère tout

## ⚠️ À NE PAS FAIRE
- ❌ Symlinks entre repos
- ❌ Doublons de fichiers
- ❌ Chemins absolus dans le code
- ❌ Git submodules
- ❌ Dépendances croisées

---
Qu'est-ce que tu en penses ?
