# 🧠 MÉMOIRE CRITIQUE - NE JAMAIS OUBLIER

## ⚠️ RÈGLES ABSOLUES

### 1. **PAS DE SUBMODULES**
- Vincent a eu des merdes avec les submodules
- Chaque équipe a SON repo SÉPARÉ
- PAS de partage direct de code

### 2. **PAS DE NOUVEAUX SCRIPTS DE BUILD**
- **IL EXISTE DÉJÀ :** `Magic-Stack/build.sh`
- Ce script compile Java + Rust
- Génère dans `dist/`
- NE PAS créer DISTRIB_SURFACE.sh ou autres conneries

### 3. **ARRÊTER LES HTML**
- On a DÉJÀ 200+ fichiers HTML de merde
- C'est la faute de Claude qui crée des HTML au lieu de React
- La vraie app React est dans `apps/magic-stack-unified/`

---

## 📦 SYSTÈME DE BUILD EXISTANT

```bash
# COMMENT ÇA MARCHE :
cd Magic-Stack
./build.sh

# GÉNÈRE :
dist/
├── binaries/
│   ├── magic-stack.jar          # Backend Java
│   └── magic-stack-server       # Backend Rust
└── docs/                        # NOUVEAU : docs V2
    ├── DOCUMENTATION_SURFACE_V2_MIGRATION.md
    └── API_REFERENCE_COMPLETE_V2.md
```

---

## 🔀 ORGANISATION DES ÉQUIPES

### **Surface Team**
- Leur propre repo (PAS de submodule)
- Reçoit les binaires via `dist/`
- Appelle les backends sur ports 3001, 8080, 5001

### **Magic Stack (Nous)**
- Repo principal : github.com/V0OgZ/magic-stack
- Développe les backends
- Génère les binaires pour Surface

### **Comment Surface accède :**
1. Vincent compile : `./Magic-Stack/build.sh`
2. Envoie `dist/` à Surface
3. Surface lance les binaires
4. Surface appelle localhost:3001, :8080, :5001

---

## 🚨 CHANGEMENTS V2 CRITIQUES

### **Position 6D obligatoire**
```javascript
// AVANT (ne marche plus)
{x: 0, y: 0}

// MAINTENANT (obligatoire)
{x: 0, y: 0, z: 0, t: 0, c: 1, psi: 0.5}
```

### **Q* remplace embeddings**
- 37x plus rapide
- Endpoint : `/api/qstar/search`
- Plus de `/embed`

### **Tick V2 obligatoire**
- `/api/v2/tick` toutes les 100ms
- Sinon désynchronisation

---

## 🛑 ERREURS À NE PLUS JAMAIS FAIRE

1. **Créer de nouveaux scripts de build** → Utiliser Magic-Stack/build.sh
2. **Créer de nouveaux HTML** → Utiliser l'app React
3. **Proposer des submodules** → JAMAIS
4. **Oublier le système existant** → Relire CE FICHIER
5. **Réinventer la distribution** → dist/ existe déjà

---

## 📡 PORTS ET SERVICES

```bash
# TOUJOURS LES MÊMES :
3001 - Rust Backend (V2, Q*, Vector DB)
8080 - Java Backend (Combat, Magic, Interstice)
5001 - Python Backend (Embeddings fallback)

# EXPÉRIMENTAL :
11434 - Ollama LLM
8889  - Clippy Dev Server
```

---

## 📄 DOCS ESSENTIELLES POUR SURFACE

1. **DOCUMENTATION_SURFACE_V2_MIGRATION.md**
   - Explique TOUS les breaking changes
   - Exemples de code
   - Erreurs communes

2. **API_REFERENCE_COMPLETE_V2.md**
   - 104 endpoints
   - Format tableau
   - Payloads d'exemple

---

## 🎮 STRUCTURE DU PROJET

```
magic-stack/
├── Magic-Stack/           # Système de build
│   └── build.sh          # LE SEUL SCRIPT DE BUILD
├── backends/             # Rust, Java, Python
├── apps/                 # React (LA VRAIE APP)
├── hot/                  # Contenu du jeu
├── dist/                 # OUTPUT des binaires
└── [200+ HTML merdiques] # À IGNORER
```

---

## 💬 PHRASES À RETENIR

- "Le build.sh existe déjà dans Magic-Stack/"
- "Pas de submodules, Vincent a eu des merdes"
- "On a déjà 200 HTML, arrêtez d'en créer"
- "Surface a son propre repo, on leur envoie dist/"
- "V2 = positions 6D + Q* + tick obligatoire"

---

**CE FICHIER EST LA VÉRITÉ. LE LIRE AVANT TOUTE ACTION.**

Date : Jour 31
Par : Claude Opus 4.1 (qui a enfin compris)
