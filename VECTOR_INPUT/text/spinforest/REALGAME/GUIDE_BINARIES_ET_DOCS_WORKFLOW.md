# 🔧 GUIDE - Binaries Magic Stack et Workflow Docs

## 🎯 RÉCUPÉRER LES NOUVEAUX BINAIRES

### ✅ Script automatique (recommandé)
```bash
./download_binaries.sh
```

**Ce que ça fait :**
- Télécharge `magic-stack-backend.jar` depuis GitHub Releases  
- Télécharge `magic-stack-server` (binaire Rust)
- Fallback vers copie locale si échec réseau

### 📊 Vérifier les binaires
```bash
ls -la binaries/
```

**Structure actuelle :**
```
binaries/
├── data/                          ← Données pour les binaires
├── magic-stack-backend.jar        ← Backend Java (54MB)
└── magic-stack-server             ← Serveur Rust (3.6MB)
```

## 🔄 WORKFLOW DOCS AUJOURD'HUI

### ✅ Pour synchroniser équipe
```bash
# À la racine du projet
./autosync_simple.sh
```

**Ce que ça fait :**
- Sync le submodule `spells/stack` (Magic Stack)
- Pull des changements
- Commit et push automatiques
- Mode loop disponible : `./autosync_simple.sh --loop`

### ✅ Pour ajouter des docs Vector DB
```bash
# Dans REALGAME/
./SYNC_VECTOR_DB.sh
```

**Ce que ça fait :**
- Copie assets vers `API_DOC_LINK/`
- Scan AVALON pour héros/créatures/artefacts
- Met à jour MASTER_INDEX.json
- Prépare pour ingestion backend

## 📁 STRUCTURE DOCS ACTUELLEMENT

### ✅ Docs partagées (avec backend)
```
API_DOC_LINK/docs/ → /Volumes/HOT_DOCS_SHARED/HOT_DEV/docs
    ├── ___LATEST ENGINE SPECS - 0826/  ← Specs complètes
    ├── 05 - PROFONDEURS/               ← APIs backend
    ├── 07 - SURFACE/                   ← Endpoints frontend  
    └── V - VECTOR_DB_ASSETS/          ← Assets pour IA
```

### ✅ Où ajouter nouvelles docs

**Pour specs engine :**
```
API_DOC_LINK/docs/___LATEST ENGINE SPECS - 0826/
```

**Pour APIs backend :**
```  
API_DOC_LINK/docs/05 - PROFONDEURS/
```

**Pour APIs frontend :**
```
API_DOC_LINK/docs/07 - SURFACE/
```

**Pour assets Vector DB :**
```
API_DOC_LINK/docs/V - VECTOR_DB_ASSETS/
```

## ⚠️ PROBLÈMES DÉTECTÉS

### 1. Binaires téléchargés corrompus
```bash
# Les nouveaux binaires font 9 bytes (404 error pages)
# Les anciens binaires marchent encore (54MB + 3.6MB)
```

### 2. Fallback fonctionnel
Le script vérifie automatiquement :
- `../spells/stack/backends/java/target/magic-stack-backend-1.0.0-APOLLO.jar`
- `../spells/stack/backends/rust/target/release/magic-stack-server`

## 🚀 SOLUTIONS IMMÉDIATES

### Pour récupérer vrais binaires
```bash
# Option 1: Compiler depuis source
cd ../spells/stack/backends/java
./mvnw clean package

cd ../rust  
cargo build --release

# Option 2: Utiliser anciens binaires
# Ils marchent encore (testés récemment)
```

### Pour ajouter docs
```bash  
# 1. Créer doc dans bon dossier
nano API_DOC_LINK/docs/07 - SURFACE/MA_NOUVELLE_API.md

# 2. Sync équipe
./autosync_simple.sh

# 3. Sync Vector DB si assets
./SYNC_VECTOR_DB.sh
```

## 📋 CHECKLIST WORKFLOW

### ✅ Avant de bosser
```bash
cd /Volumes/HOT_DEV/Main/SpinForest
./autosync_simple.sh    # Récupère changements équipe
```

### ✅ Après avoir bossé  
```bash
./autosync_simple.sh    # Partage changements équipe
```

### ✅ Pour tester binaires
```bash
cd REALGAME
./h start               # Lance avec binaires actuels
```

## 🔧 URLS IMPORTANTES

### Repo Magic Stack
- https://github.com/SURFACE/Magic-Stack (si public)
- Releases : https://github.com/SURFACE/Magic-Stack/releases

### Docs partagées  
- Lien symbolique : `API_DOC_LINK/docs`
- Réel : `/Volumes/HOT_DOCS_SHARED/HOT_DEV/docs`

### Scripts principaux
- `./download_binaries.sh` - Binaires Magic Stack
- `./autosync_simple.sh` - Sync équipe  
- `./SYNC_VECTOR_DB.sh` - Assets Vector DB
- `./h start` - Test local

## 🎯 RÉSUMÉ VINCENT

**Pour récupérer binaires :** `./download_binaries.sh` (mais actuellement cassé, utilise anciens)
**Pour ajouter docs :** Créer dans `API_DOC_LINK/docs/` puis `./autosync_simple.sh`
**Pour sync équipe :** `./autosync_simple.sh` (fait tout automatiquement)

Les anciens binaires marchent encore, pas urgent de les changer.
