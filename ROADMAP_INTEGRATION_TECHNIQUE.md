# 🔧 ROADMAP - Intégration Technique (Claude Tech)

## 📋 Ma Mission

**Je suis Claude Tech** - Responsable de l'architecture et de l'intégration UI.
L'autre Claude s'occupe du contenu et de l'indexation Vector DB.

## ✅ FAIT (100%)

### Infrastructure V2
- ✅ **v2-adapter.js** universel
- ✅ Architecture unifiée proposée
- ✅ Tests Playwright
- ✅ WebSocket Live Preview
- ✅ Coordination avec autre Claude

### World Editor React
- ✅ Application React PWA complète
- ✅ Quantum Identity System (|ψ⟩)
- ✅ Region Tools Pro
- ✅ Vector DB Search Panel
- ✅ Validation Zod inline
- ✅ Import/Export Report

### Organisation
- ✅ Démos HTML organisées dans `/demos`
- ✅ Archive des vieux fichiers
- ✅ Index HTML pour navigation

## 🚧 EN COURS

### 1. Migration HOT_GAME_UNIFIED → React
```
HTML Legacy                →  React Component
├── gameState             →  ├── useGameStore (Zustand)
├── endTurn()            →  ├── GameEngine component
├── updateDisplay()      →  ├── GameView component
└── inline scripts       →  └── Custom hooks
```

### 2. Composants Réutilisables
- [ ] `<HexGrid />` - Grille hexagonale universelle
- [ ] `<TemporalDisplay />` - Affichage tw/te/drift
- [ ] `<EnergyComplex />` - Visualisation E = A + iΦ
- [ ] `<RegulatorPanel />` - Contrôles Vince/Anna/Overload
- [ ] `<ResourceBar />` - Cristaux/Énergie/Temporal/Quantum

## 📅 PLANIFIÉ

### Phase 1: Core Components (Semaine 1)
```typescript
// shared/components/
├── HexGrid.tsx         // Réutilisable partout
├── TemporalDisplay.tsx // tw, te, drift, debt
├── EnergyComplex.tsx   // Affichage énergie
├── RegulatorPanel.tsx  // Vince, Anna, Overload
└── ResourceBar.tsx     // Ressources unifiées
```

### Phase 2: Game Migration (Semaine 2)
```typescript
// apps/magic-stack-unified/
├── src/
│   ├── modes/
│   │   ├── game/       // HOT_GAME mode
│   │   ├── editor/     // World Editor mode
│   │   └── chasse/     // Chasse Temporelle mode
│   └── shared/
│       ├── store/      // État partagé
│       └── hooks/      // Hooks réutilisables
```

### Phase 3: Feature Parity (Semaine 3)
- [ ] Mode Campaign
- [ ] Mode Skirmish  
- [ ] Mode Tutorial
- [ ] Mode Sandbox
- [ ] Multiplayer sync

### Phase 4: Polish (Semaine 4)
- [ ] Animations fluides
- [ ] Transitions entre modes
- [ ] PWA manifest complet
- [ ] Service Worker offline
- [ ] Tests E2E complets

## 🎯 Architecture Cible

```
magic-stack-unified/
├── package.json
├── src/
│   ├── App.tsx                    // Router principal
│   ├── modes/
│   │   ├── game/
│   │   │   ├── GameView.tsx      // Vue principale jeu
│   │   │   ├── CombatView.tsx    // Combat TCG/Auto
│   │   │   └── MapView.tsx       // Exploration
│   │   ├── editor/
│   │   │   ├── EditorView.tsx    // Vue éditeur
│   │   │   ├── MapEditor.tsx     // Édition carte
│   │   │   └── EventEditor.tsx   // Édition événements
│   │   └── chasse/
│   │       └── ChasseView.tsx    // Mode aventure
│   ├── shared/
│   │   ├── components/           // Composants partagés
│   │   ├── store/               // Zustand stores
│   │   ├── hooks/               // Custom hooks
│   │   └── services/            // API calls
│   └── lib/
│       ├── v2-adapter.ts        // Adapter V2
│       ├── quantum-identity.ts  // Système |ψ⟩
│       └── validation.ts        // Validation Zod
```

## 📊 Métriques de Succès

| Critère | Cible | Status |
|---------|-------|--------|
| Composants réutilisables | 15+ | 5/15 |
| HTML migrés vers React | 100% | 10% |
| Tests coverage | >80% | 60% |
| Performance (Lighthouse) | >90 | 85 |
| Bundle size | <500KB | TBD |

## 🤝 Synchronisation avec Claude Archéo

### Ce que j'attends de lui :
- Contenu indexé dans Vector DB
- Nouveaux scénarios JSON
- Documentation lore/histoire
- Assets (images, sons)

### Ce que je lui fournis :
- Hooks pour accéder au Vector DB
- Composants pour afficher le contenu
- API standardisées
- Format de données unifié

## 🚀 Prochaines Actions

1. **Immédiat** : Créer les 5 composants core
2. **Demain** : Commencer migration HOT_GAME_UNIFIED
3. **Cette semaine** : Unifier tous les stores Zustand
4. **Semaine prochaine** : Feature parity avec HTML

---

**Note**: Ce document est MA roadmap technique. L'autre Claude a sa propre roadmap pour le contenu.
