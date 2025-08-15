# 🏗️ SCHÉMA ARCHITECTURE MAGIC STACK vs AVALON

## 📊 VUE D'ENSEMBLE

```
┌─────────────────────────────────────────────────────────────────┐
│                         GITHUB PUBLIC                           │
│                    github.com/V0OgZ/magic-stack                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                      MAGIC STACK                             │ │
│ │                   (Open Source - MIT)                        │ │
│ │                                                              │ │
│ │  📚 Grammaire Temporelle (869 formules)                     │ │
│ │  🐍 magic_core.py - Moteur d'interprétation                 │ │
│ │  📖 Documentation publique                                   │ │
│ │  🧪 Tests & exemples                                         │ │
│ │  🎯 Pas de backend (juste les specs)                        │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                 ⬇️
                          [IMPORT/USAGE]
                                 ⬇️
┌─────────────────────────────────────────────────────────────────┐
│                        SPINFOREST PRIVÉ                         │
│                      (Jeu Heroes of Time)                       │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                         AVALON                               │ │
│ │                                                              │ │
│ │  🏰 avalon-backend/          ☕ Backend Java principal       │ │
│ │     └── PostgreSQL          💾 Persistance 6D               │ │
│ │                                                              │ │
│ │  🦀 spells/stack/backends/rust/  🚀 Backend rapide          │ │
│ │     └── Health/Status endpoints                             │ │
│ │                                                              │ │
│ │  🔮 avalon-magic-api/       🌐 API Gateway optionnelle      │ │
│ │     ├── packages/magic-java/    (utilise Magic Stack)       │ │
│ │     └── gateway/                (routing)                   │ │
│ │                                                              │ │
│ │  🎮 REALGAME/               📁 Assets & configs jeu         │ │
│ │  🌐 frontend/               🖥️  Interface joueur             │ │
│ │  📊 Interstice 6D          🌀 Upload consciences           │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 🔍 DÉTAILS TECHNIQUES

### MAGIC STACK (Public)
```
magic-stack/
├── README.md                    # Doc publique
├── grammaire_temporelle.json    # 869 formules
├── magic_core.py                # Moteur Python
├── tests/                       # Tests unitaires
└── examples/                    # Exemples d'usage
```

**Objectif**: Fournir le système de magie temporelle à la communauté

### AVALON/SPINFOREST (Privé)
```
SpinForest/
├── avalon-backend/              # BACKEND PRINCIPAL
│   ├── src/main/java/
│   │   └── com/avalon/
│   │       ├── controllers/     # REST API
│   │       ├── services/        # Logique métier
│   │       └── models/          # Entités JPA
│   └── PostgreSQL               # Base 6D
│
├── spells/stack/backends/rust/  # BACKEND SECONDAIRE
│   └── src/                     # Endpoints rapides
│
├── REALGAME/                    # JEU
│   ├── index.html              # Launcher
│   ├── maps/                   # Cartes
│   └── systems/                # Mécaniques
│
└── frontend/                    # INTERFACE
    └── (React/Vue/etc)
```

**Objectif**: Jeu commercial Heroes of Time

## 🔗 INTERACTIONS

### Comment AVALON utilise Magic Stack:

1. **Import des formules**
   ```java
   // Dans avalon-backend
   MagicFormula formula = MagicStack.parse("⊙(temps) + †ψ(présent)");
   ```

2. **Validation via Python**
   ```bash
   # API Gateway route vers Python
   POST /api/magic/validate → magic_core.py
   ```

3. **Stockage PostgreSQL**
   ```sql
   -- Table formules_utilisees
   INSERT INTO spell_casts (formula, result, timestamp_6d)
   ```

## 📈 FLUX DE DONNÉES

```
Joueur → Frontend → Backend Java → PostgreSQL
                 ↘               ↗
                  Magic Stack API
                 (validation formules)
```

## 🎯 RÉSUMÉ POUR VINCENT

### Ce qui est PUBLIC (Magic Stack):
- ✅ Grammaire temporelle (869 formules)
- ✅ Documentation théorique
- ✅ Exemples d'utilisation
- ❌ Pas le jeu
- ❌ Pas les backends
- ❌ Pas les assets

### Ce qui est PRIVÉ (AVALON):
- ✅ Le jeu Heroes of Time complet
- ✅ Backends fonctionnels (Java + Rust)
- ✅ Système 6D avec PostgreSQL
- ✅ Interface joueur
- ✅ Assets et histoires
- ✅ Intégration complète

### Architecture actuelle:
- **3 backends max** (Java principal, Rust health, Magic API optionnelle)
- **1 base de données** (PostgreSQL/PostGræcia)
- **1 frontend unifié**
- **0 mock Python** (supprimés!)

---

*NEXUS - Architecture clarifiée JOUR 23*