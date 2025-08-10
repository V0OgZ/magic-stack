# 🎮 Architecture Unifiée : Éditeur = Jeu = Même Code

## 🎯 Principe Fondamental

> **UN SEUL CODEBASE** : L'éditeur N'EST PAS un outil séparé, c'est le jeu en mode création.

```typescript
// App.tsx - Point d'entrée unique
const MagicStackApp = () => {
  const [mode, setMode] = useState<'edit' | 'play' | 'test'>('play');
  
  return (
    <GameEngine>  {/* Même moteur pour tout */}
      <SharedUI>   {/* UI partagée */}
        {mode === 'edit' && <EditorOverlay />}  {/* Juste des overlays */}
        {mode === 'play' && <GameOverlay />}
        {mode === 'test' && <DebugOverlay />}
      </SharedUI>
    </GameEngine>
  );
};
```

## 🏗️ Architecture Modulaire Partagée

```
apps/magic-stack-unified/  ← UN SEUL PROJET
├── src/
│   ├── core/           ← CŒUR PARTAGÉ
│   │   ├── engine/
│   │   │   ├── GameEngine.tsx      # Moteur unique
│   │   │   ├── TemporalSystem.ts   # tw, te, drift
│   │   │   ├── EnergyComplex.ts    # E = A + iΦ
│   │   │   └── WorldState.ts       # État du monde
│   │   │
│   │   ├── components/  ← COMPOSANTS RÉUTILISABLES
│   │   │   ├── HexMap.tsx          # La carte hexagonale
│   │   │   ├── Timeline.tsx        # Timeline visuelle
│   │   │   ├── Entity.tsx          # Entités (héros, PNJ)
│   │   │   ├── Regulators.tsx      # Vince, Anna, Overload
│   │   │   └── Resources.tsx       # Barre de ressources
│   │   │
│   │   └── systems/
│   │       ├── Combat.ts           # Système de combat
│   │       ├── Formulas.ts         # Formules magiques
│   │       └── Paradox.ts          # Résolution paradoxes
│   │
│   ├── modes/          ← MODES = OVERLAYS
│   │   ├── edit/
│   │   │   ├── EditorOverlay.tsx   # Outils d'édition
│   │   │   ├── TerrainPalette.tsx  # Palette terrains
│   │   │   └── ObjectPlacer.tsx    # Placement objets
│   │   │
│   │   ├── play/
│   │   │   ├── GameOverlay.tsx     # UI de jeu
│   │   │   ├── HUD.tsx             # Interface joueur
│   │   │   └── Controls.tsx        # Contrôles joueur
│   │   │
│   │   └── test/
│   │       ├── DebugOverlay.tsx    # Debug panel
│   │       ├── SimControls.tsx     # Contrôles simulation
│   │       └── Inspector.tsx       # Inspecteur d'état
│   │
│   └── shared/         ← TOUT EST PARTAGÉ
│       ├── services/
│       │   ├── Backend.ts          # Connexions API
│       │   ├── VectorDB.ts         # Recherche sémantique
│       │   └── Storage.ts          # Sauvegarde locale
│       │
│       └── store/
│           └── UnifiedStore.ts     # UN SEUL STORE Zustand
```

## 🔄 Exemples de Réutilisation

### 1. La Map Hexagonale - Même Composant, Comportements Différents

```typescript
// core/components/HexMap.tsx
export const HexMap = () => {
  const mode = useStore(s => s.mode);
  const selectedTool = useStore(s => s.selectedTool);
  
  const handleHexClick = (x: number, y: number) => {
    switch(mode) {
      case 'edit':
        // En mode édit: peindre ou placer
        if (selectedTool === 'terrain') {
          paintTerrain(x, y);
        } else if (selectedTool === 'object') {
          placeObject(x, y);
        }
        break;
        
      case 'play':
        // En mode jeu: déplacer ou interagir
        if (canMoveTo(x, y)) {
          moveHero(x, y);
        } else {
          interact(x, y);
        }
        break;
        
      case 'test':
        // En mode test: inspecter
        showDebugInfo(x, y);
        break;
    }
  };
  
  return (
    <Canvas>
      {/* MÊME RENDU pour tous les modes */}
      {hexes.map(hex => (
        <Hex 
          key={hex.id}
          {...hex}
          onClick={() => handleHexClick(hex.x, hex.y)}
          highlight={getHighlight(hex, mode)}
        />
      ))}
    </Canvas>
  );
};
```

### 2. Timeline - Éditable ET Jouable

```typescript
// core/components/Timeline.tsx
export const Timeline = () => {
  const mode = useStore(s => s.mode);
  const events = useStore(s => s.events);
  const currentTime = useStore(s => s.tw);
  
  return (
    <div className="timeline">
      <TimeAxis current={currentTime} />
      
      {events.map(event => (
        <Event 
          key={event.id}
          {...event}
          editable={mode === 'edit'}
          draggable={mode === 'edit'}
          inspectable={mode === 'test'}
          interactive={mode === 'play'}
        />
      ))}
      
      {/* Outils d'édition seulement si mode edit */}
      {mode === 'edit' && <EventCreator />}
      
      {/* Contrôles de simulation si mode test */}
      {mode === 'test' && <SimulationControls />}
    </div>
  );
};
```

### 3. Régulateurs - Configurables ET Actifs

```typescript
// core/components/Regulators.tsx
export const VinceRegulator = () => {
  const mode = useStore(s => s.mode);
  const vinceState = useStore(s => s.regulators.vince);
  
  if (mode === 'edit') {
    // Mode édit: configurer Vince
    return (
      <ConfigPanel>
        <Slider label="Agressivité" value={vinceState.aggressiveness} />
        <Toggle label="Auto-pierce" value={vinceState.autoPierce} />
        <ZonePicker label="Zone d'action" value={vinceState.zone} />
      </ConfigPanel>
    );
  }
  
  if (mode === 'play' || mode === 'test') {
    // Mode jeu/test: Vince actif
    return (
      <VinceVisualizer>
        <PierceEffect active={vinceState.isPiercing} />
        <TimelineConnector from={vinceState.from} to={vinceState.to} />
        {mode === 'test' && <DebugInfo state={vinceState} />}
      </VinceVisualizer>
    );
  }
};
```

## 🎮 Store Unifié - Un État pour Tout

```typescript
// shared/store/UnifiedStore.ts
interface UnifiedState {
  // Mode actuel
  mode: 'edit' | 'play' | 'test';
  
  // État du monde (PARTAGÉ)
  world: {
    map: HexGrid;
    entities: Entity[];
    tw: number;  // Temps monde
    te: number;  // Temps entropique
    resources: Resources;
  };
  
  // État éditeur (actif si mode === 'edit')
  editor: {
    selectedTool: Tool;
    brushSize: number;
    clipboard: any;
    history: Command[];
  };
  
  // État jeu (actif si mode === 'play')
  game: {
    playerHero: Entity;
    camera: Camera;
    ui: UIState;
  };
  
  // État test (actif si mode === 'test')
  test: {
    breakpoints: Breakpoint[];
    watchedVars: string[];
    simSpeed: number;
  };
  
  // Actions PARTAGÉES
  tick: () => void;              // Utilisé partout
  addEntity: (e: Entity) => void; // Edit: place, Play: spawn
  updateWorld: (patch: any) => void;
  
  // Actions spécifiques par mode
  setMode: (mode: Mode) => void;
  // ... autres actions
}
```

## 🔥 Avantages de cette Architecture

### 1. Zéro Duplication
- La map est LA map (pas une version éditeur et une version jeu)
- Les entités sont LES entités
- Le moteur temporel est LE moteur temporel

### 2. Cohérence Garantie
- Ce que tu vois en édit est EXACTEMENT ce que tu joues
- Pas de surprise entre l'éditeur et le jeu
- Les bugs fixés le sont partout

### 3. Features Gratuites
- Ajoute une feature au jeu → disponible dans l'éditeur
- Améliore l'éditeur → le jeu en bénéficie
- Debug tools disponibles partout

### 4. Transition Instantanée
```typescript
// Passer de l'édit au test en 1 clic
const quickTest = () => {
  saveEditorState();
  setMode('test');
  // Même monde, même état, juste un overlay différent
};

// Retour à l'édit avec l'état préservé
const backToEdit = () => {
  setMode('edit');
  restoreEditorState();
};
```

## 📦 Build & Deploy

```json
// package.json unique
{
  "name": "magic-stack-unified",
  "scripts": {
    "dev": "vite --mode development",
    "dev:edit": "vite --mode edit",     // Démarre en mode éditeur
    "dev:play": "vite --mode play",     // Démarre en mode jeu
    "build": "vite build",              // Build tout
    "build:editor": "vite build --mode editor",  // Build version éditeur
    "build:game": "vite build --mode game"       // Build version jeu
  }
}
```

## 🚀 Migration Progressive

### Phase 1: Unifier les Composants
```bash
# Extraire les composants communs
cp HOT_GAME_UNIFIED.html tmp/
cp apps/world-editor/src/ui/* tmp/

# Créer le projet unifié
npx create-vite magic-stack-unified --template react-ts
cd magic-stack-unified

# Migrer les composants unifiés
npm run migrate
```

### Phase 2: Unifier le State
```typescript
// Fusionner les stores
const unifiedStore = {
  ...gameStore,
  ...editorStore,
  mode: 'play' // Par défaut
};
```

### Phase 3: Créer les Modes
```typescript
// Juste des overlays différents sur le même core
const EditorMode = () => <Core><EditorTools /></Core>;
const GameMode = () => <Core><GameUI /></Core>;
const TestMode = () => <Core><DebugTools /></Core>;
```

## ✅ Checklist d'Unification

- [ ] Créer projet `magic-stack-unified`
- [ ] Migrer `GameEngine` comme core
- [ ] Migrer `HexMap` unifié
- [ ] Migrer `Timeline` unifié
- [ ] Créer store Zustand unifié
- [ ] Implémenter switch de modes
- [ ] Tester edit→play→edit
- [ ] Supprimer les anciens projets séparés

---

**🎯 Résultat Final**: Une seule app qui fait TOUT. Plus de code dupliqué, plus de maintenance double, juste du code réutilisable à 100% !

*"Write once, use everywhere"* - La vraie philosophie du Magic Stack
