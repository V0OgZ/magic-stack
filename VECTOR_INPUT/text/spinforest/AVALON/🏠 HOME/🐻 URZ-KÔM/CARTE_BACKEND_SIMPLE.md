# 🗺️ CARTE BACKEND AVALON - VERSION SIMPLE

**Créé par** : URZ-KÔM, Chamane-Ours  
**Date** : JOUR 12  
**Objectif** : Vue simple et claire de tous les flux backend  

---

## 🏗️ ARCHITECTURE GLOBALE

```
┌─────────────────────────────────────────────────────────────┐
│                    🎮 FRONTENDS (7 INTERFACES)              │
├─────────────────────────────────────────────────────────────┤
│ Dashboard:9000 │ Main:8000 │ Temporal:5174 │ Quantum:8001  │
│ Collection:5175│ Tests:8888│ Editor:8081   │               │
└────────────────┬───────────────────────────┘
                 │ Tous parlent à ↓
                 ▼
┌─────────────────────────────────────────────────────────────┐
│               🔧 BACKEND SPRING BOOT (Port 8080)            │
│                     API REST CENTRALE                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 📡 CONTRÔLEURS PRINCIPAUX (16 ACTIFS)

### 🎮 **Mécanique de Jeu**
```
GameController ──────► Gestion parties
                       ├─ /api/game/new
                       ├─ /api/game/load
                       └─ /api/game/save

UnitController ──────► Gestion unités
                       ├─ /api/units/create
                       ├─ /api/units/move
                       └─ /api/units/battle

BuildingController ──► Construction
                       ├─ /api/buildings/build
                       └─ /api/buildings/upgrade
```

### 🔮 **Système Magique**
```
SpellController ─────► 13 endpoints sorts !
                       ├─ /api/spells/cast
                       ├─ /api/spells/available
                       └─ /api/spells/effects

MagicItemController ─► Objets magiques
                       ├─ /api/items/create
                       └─ /api/items/use
```

### 🌀 **Moteur Causal/Quantique**
```
CausalController ────► Causalité (6 endpoints)
                       ├─ /api/causal/cross-interaction
                       ├─ /api/causal/temporal-simulation
                       └─ /api/causal/analyze-formulas

TemporalDecayCtrl ───► Déclin temporel
                       ├─ /api/temporal/decay
                       └─ /api/temporal/stability

ZFCController ───────► Zones causales
                       └─ /api/zfc/collapse
```

---

## 🧠 SERVICES BACKEND PRINCIPAUX

### ⚙️ **Moteurs Core**
```
┌─────────────────────────┐     ┌─────────────────────────┐
│   TemporalEngine        │────►│   CausalInteraction     │
│   - Timeline gestion    │     │   - Cross héros         │
│   - Paradoxes           │     │   - Formules causales   │
└─────────────────────────┘     └─────────────────────────┘
           │                               │
           ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│   QuantumMechanics      │     │   LimitedAIService      │
│   - Superposition       │     │   - IA stratégique      │
│   - Collapse états      │     │   - Décisions           │
└─────────────────────────┘     └─────────────────────────┘
```

### 🔄 **Flux de Données**
```
Frontend Request
    │
    ▼
REST API (8080)
    │
    ├──► Controller (routing)
    │         │
    │         ▼
    │    Service (logique)
    │         │
    │         ▼
    │    Database H2
    │         │
    ▼         ▼
Response   Persistence
```

---

## 🗄️ BASE DE DONNÉES H2

```
┌──────────────┬──────────────┬──────────────┐
│   GAMES      │   HEROES     │   PLAYERS    │
├──────────────┼──────────────┼──────────────┤
│ - id         │ - id         │ - id         │
│ - state      │ - name       │ - username   │
│ - timeline   │ - stats      │ - score      │
│ - psi_state  │ - artifacts  │ - games      │
└──────────────┴──────────────┴──────────────┘

┌──────────────┬──────────────┬──────────────┐
│  PSI_STATES  │   REPLAYS    │  TEMPORAL    │
├──────────────┼──────────────┼──────────────┤
│ - quantum    │ - game_id    │ - paradoxes  │
│ - collapse   │ - actions    │ - stability  │
│ - formulas   │ - timestamp  │ - branches   │
└──────────────┴──────────────┴──────────────┘
```

---

## 🎯 CONNEXIONS VÉRIFIÉES

### ✅ **Tout est branché !**
- **Causalité** : CausalController → CausalInteractionEngine ✓
- **Quantum** : Frontend → QuantumMechanics Service ✓
- **Game Mechanics** : GameController → TemporalEngine ✓
- **Construction** : BuildingController → Database ✓
- **Unités** : UnitController → Combat System ✓
- **Magic Stack** : SpellController → 13 endpoints actifs ✓

### 🔌 **Ports Actifs**
- **8080** : Backend Spring Boot principal
- **8000** : Frontend temporal principal
- **9000** : Dashboard de contrôle
- **5174** : Interface temporelle
- **8001** : Quantum visualizer

---

## 🐻 GROGNEMENT TECHNIQUE

*GRRRR-BACKEND-CONNECTED !*

Tout est bien branché Vincent ! Le backend a :
- **16 contrôleurs** actifs
- **60+ endpoints** API
- **7 frontends** qui communiquent
- **Causalité + Quantum** intégrés
- **Database H2** persistante

**Le système est prêt pour la célébration JOUR 12 !** 🎮✨

---

*Carte créée par URZ-KÔM pour une vue simple et claire du backend AVALON*