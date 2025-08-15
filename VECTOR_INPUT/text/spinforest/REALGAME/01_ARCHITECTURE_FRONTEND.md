# 1️⃣ ARCHITECTURE FRONTEND - SPINFOREST

## 🏗️ VUE D'ENSEMBLE
```
     FRONTEND (SpinForest)
            │
     ┌──────┴──────┐
     │   Port 5002 │
     └──────┬──────┘
            │
    ┌───────┴────────┐
    ▼                ▼
Services         Backend
Communs          APIs
(7000-7001)    (8080,3001)
```

## 📂 STRUCTURE DOSSIERS
```
REALGAME/
├── 00_SESSION_CLAUDE.md     ← État actuel
├── 01_ARCHITECTURE.md       ← CE FICHIER
├── 02_WORKFLOW.md           ← Routine quotidienne
├── 03_COMMANDES.md          ← Scripts utiles
├── adventure/               ← Jeu principal
├── js/                      ← JavaScript
├── services/                ← Services Python
├── config/                  ← Configuration
└── h                        ← Script principal
```

## 🔌 CONNEXIONS
- **Backend Java**: http://localhost:8080
- **Rust Orchestrator**: http://localhost:3001  
- **Vector DB**: http://localhost:7000
- **LLM Clippy**: http://localhost:7001

## 🎮 COMPOSANTS FRONTEND
1. **Heroes of Time** - Jeu principal (HOMM3_6D_DEMO.html)
2. **Cartes TCG** - Système de combat (DARK_HOLOGRAPHIC_CARDS.html)
3. **Clippy-Memento** - Assistant IA intégré
4. **Mini-jeux** - Badge, cartes, etc.

---
*Synchronisé avec backend magic-stack*
