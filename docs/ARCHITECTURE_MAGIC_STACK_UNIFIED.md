# 🏗️ Architecture Magic Stack Unified

## Vue d'ensemble

Magic Stack Unified est une application React qui unifie tous les modes de jeu et outils dans une seule base de code. Cette architecture permet la réutilisation maximale du code et une maintenance simplifiée.

## 🎯 Objectifs

1. **Code unique** : Un seul repository, une seule app, plusieurs modes
2. **Composants partagés** : Réutilisation maximale entre modes
3. **État centralisé** : Stores Zustand pour chaque mode
4. **PWA Ready** : Compatible mobile/tablette
5. **Dumb Front** : Logique métier dans les backends

## 📁 Structure

```
apps/magic-stack-unified/
├── src/
│   ├── main.tsx                 # Point d'entrée
│   ├── App.tsx                  # Router principal
│   ├── index.css               # Styles globaux
│   │
│   ├── shared/                 # Composants réutilisables
│   │   ├── components/
│   │   │   ├── HexGrid.tsx    # Grille hexagonale universelle
│   │   │   ├── TemporalDisplay.tsx  # Affichage temporel V2
│   │   │   └── ResourceBar.tsx      # Barre de ressources
│   │   ├── hooks/              # Hooks personnalisés
│   │   └── utils/              # Utilitaires partagés
│   │
│   ├── modes/                  # Les différents modes
│   │   ├── game/              # Heroes of Time
│   │   │   ├── GameView.tsx
│   │   │   └── store/gameStore.ts
│   │   ├── editor/            # World Editor
│   │   │   ├── EditorView.tsx
│   │   │   └── store/editorStore.ts
│   │   └── chasse/            # Chasse Temporelle
│   │       ├── ChasseView.tsx
│   │       └── store/chasseStore.ts
│   │
│   └── pages/                 # Pages statiques
│       ├── HomePage.tsx
│       ├── SettingsPage.tsx
│       └── AboutPage.tsx
│
├── tests/                     # Tests E2E Playwright
│   ├── home.spec.ts
│   ├── game.spec.ts
│   └── chasse.spec.ts
│
├── package.json              # Dépendances et scripts
├── vite.config.ts           # Config Vite
├── tsconfig.json            # Config TypeScript
└── playwright.config.ts     # Config Playwright
```

## 🔧 Technologies

### Frontend
- **React 18.3** : Framework UI
- **TypeScript** : Typage fort
- **Vite** : Build tool ultra-rapide
- **React Router** : Navigation SPA

### État
- **Zustand** : State management léger
- **React Query** : Cache et synchronisation API

### UI/UX
- **Framer Motion** : Animations fluides
- **React Icons** : Bibliothèque d'icônes (à venir)
- **Tailwind CSS** : Styles utilitaires (optionnel)

### Tests
- **Playwright** : Tests E2E cross-browser
- **Vitest** : Tests unitaires

## 🏛️ Architecture des Stores

### GameStore (Heroes of Time)
```typescript
interface GameState {
  temporal: TemporalV2State;
  resources: Resources;
  heroPosition: Position;
  regulators: Regulators;
  events: Event[];
}
```

### ChasseStore (Chasse Temporelle)
```typescript
interface ChasseState {
  viewport: Viewport;      // Fenêtre 20x20
  mapSize: { w: 120, h: 120 };
  hexes: Map<string, Hex>;
  discoveredHexes: Set<string>;
  difficulty: DifficultyLevel;
}
```

### EditorStore (World Editor)
```typescript
interface EditorState {
  scenario: Scenario;
  selectedTool: Tool;
  history: HistoryStack;
  vectorDBConnection: boolean;
}
```

## 🌐 Intégration Backend

### Principe Dumb Front / Smart Backend

Le frontend ne fait QUE :
- Affichage
- Gestion des inputs utilisateur
- Appels API

Le backend gère :
- Calculs V2 (drift, interference, paradoxes)
- Logique métier
- Persistance
- IA/Pathfinding

### Endpoints utilisés

```typescript
// Centralisés dans src/config/endpoints.ts
const ENDPOINTS = {
  profondeur: {
    rust: 'http://localhost:3001',
    vectorDB: 'http://localhost:5001',
    webSocket: 'ws://localhost:8001'
  },
  backend: {
    java: 'http://localhost:8080'
  }
};
```

## 🎮 Composants Partagés

### HexGrid
Grille hexagonale réutilisable avec :
- Viewport avec zoom/drag
- Minimap intégrée
- Brouillard de guerre
- Terrains et overlays
- Sélection et hover

### TemporalDisplay
Affichage temporel V2 avec 3 variants :
- `minimal` : Juste tw/te/drift
- `compact` : Une ligne avec infos essentielles
- `full` : Panneau complet avec énergie complexe

### ResourceBar
Barre de ressources avec :
- 3 layouts : horizontal, vertical, compact
- Animations de changement
- Barres de progression
- Boutons +/- optionnels

## 🚀 Scripts NPM

```bash
# Développement
npm run dev              # Lance sur http://localhost:5175

# Production
npm run build           # Build optimisé
npm run preview        # Preview du build

# Tests
npm run test           # Tests E2E Playwright
npm run test:ui        # Interface Playwright
npm run test:headed    # Tests avec navigateur visible
npm run test:debug     # Mode debug
npm run test:report    # Rapport HTML

# Qualité
npm run lint           # ESLint
npm run type-check     # TypeScript check
```

## 📱 PWA Capabilities

- **Viewport Meta Tags** : Optimisé mobile
- **App Manifest** : Installation comme app
- **Service Worker** : Offline capabilities (à venir)
- **Touch Gestures** : Support tactile natif

## 🔄 Flux de données

```
User Input → React Component → Zustand Store → API Call → Backend
                ↑                                          ↓
           UI Update ← Store Update ← WebSocket/Response ←
```

## 🎯 Prochaines étapes

### Court terme
- [ ] Intégrer Icons JD et SVG Repo
- [ ] Migrer calculs V2 vers backend Rust
- [ ] Ajouter WebSocket pour temps réel

### Moyen terme
- [ ] Service Worker pour mode offline
- [ ] Système de sauvegarde cloud
- [ ] Mode multijoueur complet

### Long terme
- [ ] Editor intégré complet
- [ ] Marketplace de scénarios
- [ ] Système de mods

## 🏷️ Conventions

### Nommage
- Composants : PascalCase (`HexGrid.tsx`)
- Hooks : camelCase avec `use` (`useGameStore.ts`)
- Utils : camelCase (`calculateDrift.ts`)
- Types : PascalCase avec `I` ou `Type` suffixe

### Structure des composants
```tsx
// 1. Imports
// 2. Types/Interfaces
// 3. Component
// 4. Styled components (si applicable)
// 5. Helpers functions
// 6. Exports
```

### Commits
- Format : `TYPE: Description courte`
- Types : FEAT, FIX, DOCS, STYLE, REFACTOR, TEST, CHORE

## 📞 Support

- **Claude Nexus** : Architecture et intégration technique
- **L'autre Claude** : Contenu et données JSON
- **Vincent** : Vision et direction produit

---

*Magic Stack Unified - Un code pour les gouverner tous* 🌟
