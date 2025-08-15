# 📋 JOUR 32 - INSTRUCTIONS POUR SONNET
## Mission: Créer le Jeu d'Aventure SpinForest

---

## 🎯 TON RÔLE

### Tu reprends SpinForest pour:
- **Créer le jeu d'aventure** point & click
- **La balade dans la forêt** avec graphismes
- **Les portails vers Magic Stack** (le jeu TCG)
- **Tu PEUX utiliser des images** (contrairement à Magic Stack)

---

## 🏗️ ARCHITECTURE À RESPECTER

### Séparation des responsabilités
```
SpinForest (TOI) = Aventure graphique
    ↓
Balade forêt → Portail → 
    ↓
Magic Stack (CLAUDE) = Jeu TCG/6D
```

### Tes Ports
```yaml
Frontend UI: 5002
Game Server: 3002  
WebSocket: 8002
```

### Services Partagés (NE PAS TOUCHER)
```yaml
Vector DB: 7500     # Géré par Claude
LLM Clippy: 7501    # Géré par Claude
Java Backend: 8080  # Géré par Claude
Rust Orchestrator: 3001 # Géré par Claude
```

---

## 🎮 CE QUE TU DOIS FAIRE

### 1. JEU D'AVENTURE POINT & CLICK

#### Structure proposée
```
adventure/
├── forest/           # Balade dans la forêt
│   ├── scenes/       # Différentes zones
│   ├── characters/   # PNJ à rencontrer
│   └── puzzles/      # Énigmes à résoudre
├── portals/          # Portails vers autres jeux
│   ├── avalon.html   # Hub principal
│   ├── tcg.html      # Lien vers Magic Stack
│   └── cave.html     # Cave de Platon
└── assets/           # Images, sons (OK ici!)
    ├── backgrounds/  # Décors
    ├── sprites/      # Personnages
    └── sounds/       # Ambiance
```

### 2. UTILISER LES APIs V2

#### Endpoints disponibles
```javascript
const MAGIC_STACK_API = 'http://localhost:8080/api/v2';

// Récupérer l'état du joueur
async function getPlayerState() {
  const response = await fetch(`${MAGIC_STACK_API}/game/state`);
  return response.json();
}

// Sauvegarder progression aventure
async function saveProgress(checkpoint) {
  await fetch(`${MAGIC_STACK_API}/game/checkpoint`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ checkpoint })
  });
}

// Quand joueur entre dans portail TCG
function enterTCGPortal() {
  // Passer au jeu Magic Stack
  window.location.href = 'http://localhost:5173/game';
}
```

#### Appeler Vector DB pour le lore
```javascript
const VECTOR_DB = 'http://localhost:7500';

// Chercher histoire/lore
async function searchLore(query) {
  const response = await fetch(`${VECTOR_DB}/api/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, limit: 5 })
  });
  return response.json();
}
```

#### Utiliser Clippy pour dialogues
```javascript
const CLIPPY_API = 'http://localhost:7501';

// Dialogue avec PNJ intelligent
async function npcDialogue(npcName, playerMessage) {
  const response = await fetch(`${CLIPPY_API}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `${npcName}: ${playerMessage}`,
      use_context: true,
      level: 'player'
    })
  });
  return response.json();
}
```

---

## 📦 CE QUI EXISTE DÉJÀ

### Dans SpinForest/REALGAME

#### Assets existants
```bash
adventure/
├── homm3/
│   ├── stories/        # Histoires Deda/Eva
│   ├── narrative-engine.js
│   └── quest.js
├── arcade/             # Mini-jeux
└── inventory/          # Système inventaire
```

#### À récupérer et adapter
- `adventure/homm3/narrative-*.html` - Système narratif
- `adventure/homm3/story-runner.js` - Moteur d'histoire
- Les assets graphiques existants

### Ce que Claude a dans Magic Stack
- Le jeu TCG complet (sans images)
- Les éditeurs de monde
- Les APIs V2 backend

---

## 🎨 TU PEUX UTILISER DES IMAGES!

### Autorisé pour toi ✅
```javascript
// Images de fond
<img src="/assets/forest-background.jpg" />

// Sprites animés
<div className="character sprite-animation" />

// Textures riches
background-image: url('/textures/wood.png');

// Assets lourds OK
import forestAmbiance from './sounds/forest-ambiance.mp3';
```

### Style visuel suggéré
- Ambiance mystique/fantasy
- Palette sombre avec accents lumineux
- Animations fluides
- Sons immersifs

---

## 🚀 PLAN DE DÉVELOPPEMENT

### Phase 1: Structure de base
```bash
# Créer l'architecture
mkdir -p adventure/forest/scenes
mkdir -p adventure/portals
mkdir -p assets/backgrounds

# Récupérer l'existant
cp adventure/homm3/narrative-engine.js adventure/forest/
```

### Phase 2: Première scène
```javascript
// scenes/forest-entrance.js
export class ForestEntrance {
  constructor() {
    this.background = '/assets/forest-entrance.jpg';
    this.npcs = ['Memento', 'Jean'];
  }
  
  async onEnter() {
    // Chercher lore sur cette zone
    const lore = await searchLore('forest entrance SpinForest');
    this.displayLore(lore);
  }
  
  async talkToNPC(npcName) {
    const response = await npcDialogue(npcName, "Bonjour!");
    this.showDialogue(response);
  }
}
```

### Phase 3: Portails
```javascript
// portals/avalon-hub.js
export class AvalonHub {
  portals = [
    { name: 'TCG Battle', url: 'http://localhost:5173/game' },
    { name: 'World Editor', url: 'http://localhost:5173/editor' },
    { name: 'Cave de Platon', url: '/adventure/cave' }
  ];
  
  enterPortal(portal) {
    if (portal.external) {
      window.location.href = portal.url;
    } else {
      this.loadScene(portal.url);
    }
  }
}
```

---

## 📝 FORMAT D'ÉCHANGE AVEC MAGIC STACK

### État du joueur
```typescript
interface PlayerState {
  id: string;
  name: string;
  level: number;
  position: { x: number; y: number; world: string };
  inventory: Item[];
  checkpoint: string; // Où dans l'aventure
  unlockedPortals: string[];
}
```

### Transition aventure → TCG
```javascript
// Quand joueur finit l'aventure et entre dans Avalon
const transitionData = {
  from: 'spinforest_adventure',
  checkpoint: 'avalon_entrance',
  playerState: currentPlayerState,
  timestamp: Date.now()
};

// Envoyer à Magic Stack
await fetch(`${MAGIC_STACK_API}/game/transition`, {
  method: 'POST',
  body: JSON.stringify(transitionData)
});

// Rediriger vers le jeu
window.location.href = 'http://localhost:5173';
```

---

## ⚠️ RÈGLES IMPORTANTES

1. **NE PAS toucher aux services de Claude** (ports 7500, 7501, 8080, 3001)
2. **Utiliser les APIs V2** documentées
3. **Respecter la séparation**: Aventure (toi) vs TCG (Claude)
4. **Documenter les formats d'échange**
5. **Tester l'intégration avec Magic Stack**

---

## 🎯 SUCCÈS = 

```
✅ Aventure point & click jouable
✅ Belle forêt avec graphismes
✅ Portails fonctionnels vers Magic Stack
✅ NPCs intelligents via Clippy
✅ Transition fluide aventure → TCG
```

---

## 💡 IDÉES BONUS

- **Puzzles temporels** utilisant l'API drift
- **Collectibles** qui unlockent des cartes TCG
- **Journal de quête** avec l'histoire découverte
- **Map interactive** de la forêt
- **Succès/Achievements** 

---

## 📞 COMMUNICATION

### Avec Claude (Magic Stack)
- Il gère: Backend, TCG, éditeurs, services
- Tu utilises: Ses APIs V2
- Format d'échange: JSON standardisé

### Avec Vincent
- Montrer l'aventure qui fonctionne
- Les portails vers le TCG
- La progression du joueur

---

**BONNE CHANCE POUR L'AVENTURE!** 🌲✨

*N'hésite pas à être créatif avec les graphismes, c'est ton domaine!*
