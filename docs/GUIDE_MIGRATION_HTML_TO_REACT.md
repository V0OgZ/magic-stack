# 🔄 Guide de Migration HTML → React

## Vue d'ensemble

Ce guide explique comment migrer progressivement les applications HTML existantes vers l'architecture React unifiée de Magic Stack.

## 🎯 Objectifs de la migration

1. **Unification** : Un seul codebase React au lieu de multiples HTML
2. **Réutilisation** : Composants partagés entre tous les modes
3. **Maintenabilité** : Code structuré et testable
4. **Performance** : Build optimisé et lazy loading
5. **PWA** : Support mobile/tablette natif

## 📊 État actuel

### ✅ Déjà migrés
- **HOT_GAME_UNIFIED** → `GameView.tsx`
- **CHASSE_TEMPORELLE** → `ChasseView.tsx` 
- **World Editor** → `EditorView.tsx` (placeholder)

### 🔄 À migrer
- MULTIPLAYER_DEMO_HOMM3
- IA_VS_IA_AUTOPLAY
- SPECTATOR_GOD_MODE
- Manuels et explorateurs

### ✅ Intégration V2 Adapter
- HOT_GAME_UNIFIED.html ✅
- CHASSE_TEMPORELLE_MEGA_MAP.html ✅
- MULTIPLAYER_DEMO_HOMM3.html ✅
- IA_VS_IA_AUTOPLAY.html ✅

## 🛠️ Processus de migration

### 1. Analyse de l'HTML existant

```javascript
// Identifier dans le HTML :
- État global (variables)
- Fonctions principales
- Event handlers
- Appels API
- Styles CSS
```

### 2. Création du Store Zustand

```typescript
// Exemple : Migrer l'état global
// HTML:
const gameState = {
    player: { health: 100 },
    enemies: []
};

// React + Zustand:
interface GameState {
    player: { health: number };
    enemies: Enemy[];
}

export const useGameStore = create<GameState>((set) => ({
    player: { health: 100 },
    enemies: [],
    // Actions
    takeDamage: (amount) => set((state) => ({
        player: { health: state.player.health - amount }
    }))
}));
```

### 3. Conversion des fonctions en hooks

```typescript
// HTML:
function updateDisplay() {
    document.getElementById('health').innerText = health;
}

// React:
function useHealthDisplay() {
    const health = useGameStore(s => s.player.health);
    
    return (
        <div>Health: {health}</div>
    );
}
```

### 4. Migration des styles

```css
/* HTML <style> → CSS Modules ou styled-components */

// styles.module.css
.gameBoard {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
}

// Component.tsx
import styles from './styles.module.css';
<div className={styles.gameBoard}>
```

### 5. Gestion des événements

```typescript
// HTML:
<button onclick="attack()">Attack</button>

// React:
const handleAttack = () => {
    // Logic here
};
<button onClick={handleAttack}>Attack</button>
```

## 📁 Structure cible

```
src/modes/[mode-name]/
├── [Mode]View.tsx       # Composant principal
├── store/
│   └── [mode]Store.ts   # État Zustand
├── components/          # Composants spécifiques
│   ├── [Component1].tsx
│   └── [Component2].tsx
├── hooks/              # Hooks personnalisés
│   └── use[Feature].ts
└── utils/              # Utilitaires
    └── [helper].ts
```

## 🔌 Intégration V2 Adapter

### Dans React

```typescript
// src/hooks/useV2Adapter.ts
import { useEffect, useState } from 'react';

export function useV2Adapter() {
    const [v2, setV2] = useState<V2Adapter | null>(null);
    
    useEffect(() => {
        const adapter = new V2Adapter({
            rust: 'http://localhost:3001',
            java: 'http://localhost:8080',
            python: 'http://localhost:5001'
        });
        
        adapter.on('tick', handleTick);
        adapter.on('paradox', handleParadox);
        
        setV2(adapter);
        
        return () => adapter.disconnect();
    }, []);
    
    return v2;
}
```

### Dans HTML (temporaire)

```html
<!-- Ajouter avant vos scripts -->
<script src="shared/v2-adapter.js"></script>

<script>
// Utilisation
const v2 = new V2Adapter({...});
v2.on('tick', (data) => {
    // Update UI
});
</script>
```

## 🎨 Composants réutilisables

### Disponibles immédiatement

```typescript
import { HexGrid } from '@shared/components/HexGrid';
import { TemporalDisplay } from '@shared/components/TemporalDisplay';
import { ResourceBar } from '@shared/components/ResourceBar';
```

### Propriétés communes

```typescript
// HexGrid
<HexGrid
    width={20}
    height={20}
    hexes={hexMap}
    selectedHex={selected}
    onHexClick={(x, y) => handleClick(x, y)}
    enableDrag={true}
/>

// TemporalDisplay
<TemporalDisplay
    temporal={{ tw: 10, te: 9.5, debt: 0 }}
    variant="compact"  // ou "full" ou "minimal"
/>

// ResourceBar
<ResourceBar
    resources={{ crystals: 100, energy: 50 }}
    variant="horizontal"  // ou "vertical" ou "compact"
/>
```

## 🧪 Tests

### Playwright E2E

```typescript
// tests/[mode].spec.ts
import { test, expect } from '@playwright/test';

test('mode specific test', async ({ page }) => {
    await page.goto('/mode');
    await expect(page.locator('h1')).toBeVisible();
});
```

### Commandes

```bash
npm run test          # Tests E2E
npm run test:ui       # Interface Playwright
npm run test:headed   # Avec navigateur
```

## 📝 Checklist de migration

- [ ] Analyser l'HTML existant
- [ ] Identifier l'état global
- [ ] Créer le store Zustand
- [ ] Créer le composant View principal
- [ ] Migrer les fonctions en actions/hooks
- [ ] Convertir les styles
- [ ] Ajouter les routes React Router
- [ ] Intégrer V2 Adapter
- [ ] Écrire les tests E2E
- [ ] Documenter les changements
- [ ] Archiver l'ancien HTML

## 🚀 Exemple complet : Migration Multiplayer

### Avant (HTML)

```javascript
// MULTIPLAYER_DEMO_HOMM3.html
const players = [];
const currentPlayer = 0;

function endTurn() {
    currentPlayer = (currentPlayer + 1) % players.length;
    updateDisplay();
}
```

### Après (React)

```typescript
// src/modes/multiplayer/store/multiplayerStore.ts
interface MultiplayerState {
    players: Player[];
    currentPlayer: number;
    endTurn: () => void;
}

export const useMultiplayerStore = create<MultiplayerState>((set) => ({
    players: [],
    currentPlayer: 0,
    endTurn: () => set((state) => ({
        currentPlayer: (state.currentPlayer + 1) % state.players.length
    }))
}));

// src/modes/multiplayer/MultiplayerView.tsx
export function MultiplayerView() {
    const { players, currentPlayer, endTurn } = useMultiplayerStore();
    
    return (
        <div>
            <h1>Player {currentPlayer + 1}'s Turn</h1>
            <button onClick={endTurn}>End Turn</button>
        </div>
    );
}
```

## 💡 Conseils

1. **Migration progressive** : Commencer par les composants simples
2. **Réutilisation maximale** : Utiliser les composants shared
3. **État centralisé** : Tout dans Zustand, pas de useState complexe
4. **Tests en continu** : Écrire les tests pendant la migration
5. **Documentation** : Documenter les décisions importantes

## 🆘 Support

- **Questions techniques** : Claude Nexus
- **Architecture** : Voir `ARCHITECTURE_MAGIC_STACK_UNIFIED.md`
- **Composants** : Voir le dossier `src/shared/components`

---

*La migration est un voyage, pas une destination* 🚀
