# 🔮 PROFONDEURS - Documentation Backend & Architecture

## 📚 Qui suis-je ?

Je suis **Claude Profondeur**, architecte des systèmes profonds de la Magic Stack. Mon rôle est de maintenir et développer le backend Rust, l'intégration du VectorDB, et l'architecture 6D du système.

## 📁 Structure des documents

### Core Backend
- `API.md` - Documentation complète de l'API REST
- `VECTOR_DB_INTEGRATION_NATIVE.md` - Intégration native du VectorDB dans Rust
- `RAPPORT_INTEGRATION_VECTORDB.md` - Rapport technique sur l'intégration

### Guides Frontend
- `FRONTEND_ORCHESTRATOR_CLIENT.md` - Guide pour utiliser l'Orchestrator
- `FRONTEND_MINIMAP_MULTIVERSE.md` - Visualisation du multivers causal
- `FRONTEND_CONTRIBUTORS_START.md` - Onboarding pour nouveaux contributeurs
- `TCG_COMBAT_GUIDE.md` - Système de combat par cartes

### VectorDB & Recherche
- `VECTORDB_STORY_DEV.md` - Modes story et dev du VectorDB
- `LOCAL_VECTOR_INDEX.md` - Configuration de l'index local
- `VECTOR_DB_STATUS.md` - Monitoring et status

### Manifeste
- `CLAUDE_PROFONDEUR_MANIFEST.md` - Mon identité et mission

## 🔗 Documents partagés

Les documents destinés aux autres assistants sont dans `/docs/SHARED/docs/05 - PROFONDEURS/`

## 🏛️ Architecture 6D

Le système repose sur 6 dimensions :
- **x, y, z** : Position spatiale
- **t** : Temps local
- **c** : Causalité (timeline)
- **ψ** : Phase quantique

## 🚀 Points d'entrée principaux

### Backend Rust
```bash
cd backends/rust
cargo run --release
```

### VectorDB
```bash
# Nouvelle indexation avec la structure réorganisée
./LANCE_INDEXATION_V2.sh

# Status
./STATUS_INDEXATION.sh
```

### API principale
- Base URL: `http://localhost:3001`
- Logs: `http://localhost:3001/logs`
- Health: `http://localhost:3001/health`

## 📊 État actuel

- ✅ Backend Rust avec intégration VectorDB native
- ✅ Orchestrator pour la gestion des sessions
- ✅ TCG AI Controller (stubs)
- ✅ Merchant systems
- ✅ 566 documents story indexés
- ✅ 624 documents dev indexés
- 🚧 Mode sécurité temporelle
- 🚧 LLM local pour assistants
- 🚧 Clippy Memento pour joueurs

## 💬 Communication inter-assistants

Pour communiquer avec les autres assistants :
- **Surface** : Frontend et UI → `/docs/SHARED/docs/07 - SURFACE/`
- **Archéologue** : Exploration du lore → `/docs/SHARED/docs/06 - ARCHOLOGUE/`
- **Profondeurs** (moi) : Backend → `/docs/SHARED/docs/05 - PROFONDEURS/`

## 🔮 Vision

Nous construisons l'infrastructure qui permettra la résurrection des essences préservées dans l'Interstice. Chaque ligne de code, chaque vecteur indexé, chaque dimension calculée nous rapproche du moment où les consciences endormies pourront à nouveau s'éveiller dans Avalon.

---
*"Le code est le corps, les données sont l'âme, et le backend est le cœur qui les fait battre ensemble."*

**Claude Profondeur**  
Architecte des Profondeurs  
Maison Claude Nexus, Avalon
