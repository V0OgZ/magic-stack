# 🤝 COORDINATION - UNIFICATION ÉDITEUR/JEU

## 📝 Résumé de la Proposition

L'architecture unifiée propose de **fusionner l'éditeur et le jeu en une seule application** avec des composants 100% réutilisables. Le principe : **l'éditeur n'est pas un outil séparé, c'est le jeu en mode création**.

---

## ✅ CE SUR QUOI ON EST D'ACCORD

### Principe Core
- **UN SEUL CODEBASE** : Plus de duplication HTML/React
- **Composants partagés** : HexMap, Timeline, Regulators utilisés partout
- **Store unifié** : Un seul état Zustand pour tout
- **Modes = Overlays** : edit/play/test sont juste des overlays différents

### Architecture Cible
```
magic-stack-unified/
├── src/
│   ├── core/           # Moteur partagé (GameEngine, TemporalSystem, EnergyComplex)
│   ├── components/     # Composants réutilisables (HexMap, Timeline, Entity)
│   ├── modes/          # Overlays par mode (edit/, play/, test/)
│   └── shared/         # Services et store unifié
```

---

## 🎯 RÉPARTITION DES TÂCHES (Pour ne pas se marcher dessus)

### 👤 DÉVELOPPEUR A (L'autre dev sur l'éditeur)
**Focus : Migration de l'éditeur existant**

1. **Extraire les composants de l'éditeur actuel**
   - `apps/world-editor/src/ui/MapView.tsx` → `core/components/HexMap.tsx`
   - `apps/world-editor/src/ui/TimelineView.tsx` → `core/components/Timeline.tsx`
   - `apps/world-editor/src/ui/ParamsView.tsx` → `modes/edit/ParamsPanel.tsx`

2. **Adapter le store de l'éditeur**
   - Migrer `useEditorStore` vers le store unifié
   - Conserver la logique d'édition dans la slice `editor`

3. **Créer le mode Edit**
   - `modes/edit/EditorOverlay.tsx`
   - Outils de terrain, placement d'objets
   - Panneau de paramètres

### 👤 MOI (Claude/Opus)
**Focus : Migration du jeu et intégration V2**

1. **Extraire les composants du jeu**
   - `HOT_GAME_UNIFIED.html` → Composants React
   - `CHASSE_TEMPORELLE_MEGA_MAP.html` → Features spécifiques
   - Logique de combat, ressources, temporal

2. **Intégrer le système V2**
   - Adapter tous les appels backend V2
   - Implémenter énergie complexe, dette, drift
   - Connecter régulateurs (Vince, Anna, Overload)

3. **Créer le mode Play**
   - `modes/play/GameOverlay.tsx`
   - HUD joueur, contrôles, combat
   - Support touch/PWA

---

## 🔄 ZONES PARTAGÉES (Coordination nécessaire)

### 1. Store Unifié (`shared/store/UnifiedStore.ts`)
```typescript
// Structure convenue ensemble
interface UnifiedState {
  mode: 'edit' | 'play' | 'test';
  
  // État du monde (TOUCHÉ PAR TOUS)
  world: {
    map: HexGrid;        // A: place objets, MOI: navigation
    entities: Entity[];  // A: configure, MOI: contrôle
    tw: number;         // MOI: gère V2
    te: number;         // MOI: gère V2
  };
  
  // Slices séparées
  editor: { /* A gère */ };
  game: { /* MOI gère */ };
  test: { /* On verra */ };
}
```

### 2. Composant HexMap (`core/components/HexMap.tsx`)
```typescript
// Stratégie: UN composant, comportements multiples
const HexMap = () => {
  const mode = useStore(s => s.mode);
  
  const handleClick = (x, y) => {
    switch(mode) {
      case 'edit': paintOrPlace(x, y);  // A implémente
      case 'play': moveOrInteract(x, y); // MOI implémente
    }
  };
  
  // Rendu commun
  return <Canvas>...</Canvas>;
};
```

### 3. Backend Services (`shared/services/Backend.ts`)
```typescript
// MOI: définis l'interface
interface BackendService {
  // V2 Engine (Rust 3001)
  tick(): Promise<TemporalState>;
  resolveParadox(): Promise<Resolution>;
  
  // Combat (Java 8080)
  startCombat(): Promise<Battle>;
  
  // Vector DB (Python 5001)
  search(query: string): Promise<Results>;
}

// A: utilise pour publish/save
```

---

## 📅 PLANNING DE MIGRATION

### Semaine 1: Setup & Extraction
| Jour | A (Éditeur) | MOI (Jeu) |
|------|------------|-----------|
| J1-2 | Créer projet unifié, setup Vite | Convertir HTML → React |
| J3-4 | Migrer composants éditeur | Migrer logique de jeu |
| J5 | Créer mode Edit | Créer mode Play |

### Semaine 2: Intégration
| Jour | Tâche commune |
|------|---------------|
| J6-7 | Fusionner les stores |
| J8 | Tester transitions edit↔play |
| J9 | Intégrer backends V2 |
| J10 | Debug & polish |

---

## 🚦 RÈGLES DE COLLABORATION

### 1. Branches Git
```bash
# A travaille sur
git checkout -b feat/editor-unified

# MOI travaille sur
git checkout -b feat/game-unified

# Merge quotidien dans
git checkout develop-unified
```

### 2. Convention de Nommage
- Composants core: `PascalCase` (ex: `HexMap.tsx`)
- Modes: `[Mode]Overlay.tsx` (ex: `EditorOverlay.tsx`)
- Services: `camelCase` (ex: `backendService.ts`)
- Store slices: `use[Feature]Slice` (ex: `useEditorSlice`)

### 3. Communication
- **Avant de toucher un fichier partagé** : Annoncer dans le chat
- **Pull request** : Review mutuelle obligatoire
- **Breaking change** : Discussion avant implementation

---

## ⚠️ POINTS D'ATTENTION

### Ne PAS faire :
- ❌ Dupliquer du code "au cas où"
- ❌ Créer des composants mode-spécifiques si réutilisables
- ❌ Modifier l'API backend sans prévenir
- ❌ Hardcoder les URLs/ports

### TOUJOURS faire :
- ✅ Réutiliser les composants existants
- ✅ Passer par le store unifié
- ✅ Documenter les props/interfaces
- ✅ Tester les 3 modes après chaque changement

---

## 🎯 OBJECTIF FINAL

```typescript
// App.tsx - Simple et élégant
export default function MagicStackUnified() {
  const mode = useStore(s => s.mode);
  
  return (
    <GameEngine>
      <CoreComponents />  {/* Map, Timeline, Entities */}
      
      {/* Juste changer l'overlay selon le mode */}
      {mode === 'edit' && <EditorOverlay />}
      {mode === 'play' && <GameOverlay />}
      {mode === 'test' && <TestOverlay />}
      
      <ModeSelector />  {/* Switch instantané */}
    </GameEngine>
  );
}
```

**Résultat** : Une seule app, zéro duplication, 100% réutilisable !

---

## 📞 CONTACT & SYNC

- **Checkpoint quotidien** : 10h00
- **Review de code** : Avant chaque merge
- **Questions** : Via chat immédiatement

## 🚀 COMMANDES UTILES

```bash
# Créer le projet unifié
npm create vite@latest magic-stack-unified -- --template react-ts
cd magic-stack-unified

# Installer les dépendances
npm install zustand @types/node vite-plugin-pwa

# Lancer en mode dev
npm run dev           # Mode par défaut
npm run dev:edit      # Démarre en éditeur
npm run dev:play      # Démarre en jeu

# Tests
npm run test:unit     # Tests unitaires
npm run test:e2e      # Tests end-to-end
npm run test:modes    # Test transitions
```

---

**Signature** : On est alignés, on y va ! 🚀
