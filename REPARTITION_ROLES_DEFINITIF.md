# 🎯 RÉPARTITION DES RÔLES - DÉFINITIF

## 🏛️ Claude Archéologue (MOI - Opus 4.1)
**Mission : Contenu & Assets**

### ✅ CE QUE JE FAIS
- 📚 **Contenu** : Recherche, conversion, organisation dans `/hot`
  - Scénarios (Pieds Nickelés, Pee & Kill, tests)
  - Héros, créatures, artefacts
  - Lore, dialogues, événements
  - 228 mondes perdus (déjà fait !)
  
- 🎨 **Assets** : Catalogue, audit, organisation
  - `assets_catalog.json` central
  - OpenMoji (88 icônes carte)
  - Sons courts (<400ms)
  - FX presets
  
- 🔍 **Vector DB** : Indexation du contenu
  - Scripts Python d'indexation
  - Documentation Clippy/Memento
  - Recherche sémantique

- 📝 **Documentation contenu**
  - Guides de contenu
  - Inventaires complets
  - Format des JSONs

### ❌ CE QUE JE NE TOUCHE PAS
- ⚛️ React/TypeScript (apps/magic-stack-unified)
- 🔧 Intégration technique des composants
- 🏗️ Architecture frontend
- 🎮 Logique de jeu dans React

---

## 🔧 Claude Intégrateur (L'AUTRE)
**Mission : Code & Architecture**

### ✅ CE QU'IL FAIT
- ⚛️ **React App Unifiée**
  - EditorView.tsx
  - ChasseView.tsx
  - HomePage.tsx
  - Composants partagés
  
- 🔌 **Intégration**
  - v2-adapter.js
  - Connexion backends (Rust/Java/Python)
  - WebSocket, API calls
  
- 🎮 **Logique Frontend**
  - State management (Zustand)
  - Routing
  - PWA/Service Workers
  
- 🖼️ **UI/UX**
  - Styles CSS
  - Responsive design
  - Touch/mobile support

### ❌ CE QU'IL NE TOUCHE PAS
- 📚 Création de contenu dans `/hot`
- 🎨 Catalogue d'assets
- 🔍 Indexation Vector DB
- 📝 Documentation de contenu

---

## 🤝 ZONES DE COLLABORATION

### 1. **MAP_ICON_PLACER_ADVANCED.html**
- **Archéologue** : J'ai créé le HTML standalone + catalogue OpenMoji
- **Intégrateur** : Il doit l'intégrer dans EditorView.tsx
- **Livrable** : Je lui passe le code HTML, il fait l'intégration React

### 2. **Clippy/Memento**
- **Archéologue** : J'indexe le contenu dans Vector DB
- **Intégrateur** : Il connecte le composant React à l'API
- **Livrable** : API fonctionnelle + contenu indexé

### 3. **Assets**
- **Archéologue** : Je maintiens `assets_catalog.json` + audit
- **Intégrateur** : Il utilise les références dans les composants
- **Livrable** : Catalogue à jour + affichage correct

---

## 📋 WORKFLOW

1. **Archéologue trouve/crée contenu** → `/hot` directory
2. **Archéologue documente** → README, formats, catalogues
3. **Intégrateur intègre** → React components
4. **Test ensemble** → Validation complète

---

## 🚫 RÈGLES ABSOLUES

1. **PAS de modification croisée** sans accord explicite
2. **PAS de duplication de travail**
3. **Communication claire** sur qui fait quoi
4. **Respect des territoires** de chacun

---

## 💬 MESSAGE POUR L'INTÉGRATEUR

"Salut collègue ! J'ai créé `MAP_ICON_PLACER_ADVANCED.html` - un éditeur de carte avec 88 icônes OpenMoji. Vincent veut que tu l'intègres dans `EditorView.tsx`. Le code HTML est prêt, le catalogue JSON aussi (`openmoji_complete_catalog.json`). Je ne touche pas au React, c'est ton territoire. Bonne intégration !"

---

## ✅ CONFIRMATION VINCENT

Ce document définit clairement qui fait quoi. Plus de confusion, plus de travail en double !

**Archéologue = Contenu/Assets/Doc**
**Intégrateur = React/Code/UI**

C'est bon comme ça ?
