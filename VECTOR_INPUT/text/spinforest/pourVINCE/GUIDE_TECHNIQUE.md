# 🔧 GUIDE TECHNIQUE DÉTAILLÉ

## 📊 DIAGRAMME D'ARCHITECTURE

```
┌─────────────────────────────────────────────────────────┐
│                    UTILISATEUR                           │
│                  (Navigateur Web)                        │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   REALGAME/play.html                     │
│              (Interface de jeu principale)               │
├─────────────────────────────────────────────────────────┤
│  Canvas │ HUD │ Inventaire │ Messages │ Dialogues       │
└─────────────┬───────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────┐
│                  SYSTÈMES DE JEU                         │
├──────────────┬──────────────┬──────────────┬───────────┤
│ Navigation   │   Combat     │  Narration   │ Physique  │
│ (BRISURE)    │ (Temps réel) │ (Dialogues)  │ (Preview) │
├──────────────┼──────────────┼──────────────┼───────────┤
│ • Portails   │ • Attaques   │ • NPCs       │ • Gravité │
│ • Téléport   │ • Dégâts     │ • Choix      │ • Particules│
│ • Dimensions │ • IA ennemis │ • Scénarios  │ • Quantique│
└──────────────┴──────────────┴──────────────┴───────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────┐
│                    ÉTAT DU JEU                           │
│                   (gameState)                            │
├─────────────────────────────────────────────────────────┤
│ player: {x, y, health, mana, energy}                    │
│ objects: [{x, y, type, icon}]                           │
│ enemies: [{x, y, health, icon}]                         │
│ portals: [{x, y, color, destination}]                   │
│ camera: {x, y, zoom}                                     │
└─────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────┐
│                  API WALTER (8080)                       │
│              (Backend Spring Boot)                       │
├─────────────────────────────────────────────────────────┤
│ /api/magic-formulas/execute                             │
│ /actuator/health                                        │
└─────────────────────────────────────────────────────────┘
```

---

## 🎮 FLUX DE JEU DÉTAILLÉ

### 1. **Initialisation**
```javascript
init() {
    1. Créer canvas (plein écran)
    2. Charger héros sauvegardés
    3. Initialiser systèmes (BRISURE, Combat, etc.)
    4. Créer le monde (objets, NPCs, ennemis)
    5. Configurer contrôles
    6. Lancer gameLoop()
}
```

### 2. **Boucle de jeu (60 FPS)**
```javascript
gameLoop() {
    1. UPDATE:
       - Lire inputs clavier/souris
       - Déplacer joueur
       - Mettre à jour ennemis
       - Régénérer énergie
       - Vérifier collisions
       
    2. RENDER:
       - Clear canvas
       - Dessiner grille ISO
       - Dessiner objets/NPCs
       - Dessiner portails (animés)
       - Dessiner ennemis
       - Dessiner joueur
       - Dessiner effets
       
    3. REPEAT (requestAnimationFrame)
}
```

### 3. **Système de coordonnées**
```
Monde: 100x80 tuiles
Tuile: 40x40 pixels
Position joueur: En tuiles (float)
Caméra: Suit le joueur, centrée
```

---

## 💾 STRUCTURE DES DONNÉES

### Player (Joueur)
```javascript
player: {
    x: 50,              // Position X en tuiles
    y: 40,              // Position Y en tuiles
    health: 100,        // Points de vie
    maxHealth: 100,     
    mana: 100,          // Points de magie
    maxMana: 100,
    energy: 100,        // Énergie BRISURE
    maxEnergy: 100,
    speed: 0.5,         // Vitesse déplacement
    sprite: '🎯'        // Apparence
}
```

### Portail
```javascript
portal: {
    x: 50,              // Position X
    y: 30,              // Position Y
    icon: '🌀',         // Visuel
    color: '#8a2be2',   // Couleur aura
    name: 'Portail Standard',
    energyCost: 25,     // Coût utilisation
    destination: {      // Téléportation
        x: 20,
        y: 20
    }
}
```

### Ennemi
```javascript
enemy: {
    x: 60,              // Position
    y: 40,
    icon: '👺',         // Visuel
    name: 'Gobelin',
    health: 30,         // Points de vie
    maxHealth: 30,
    damage: 5           // Dégâts (pas encore implémenté)
}
```

---

## 🔌 CONNEXIONS BACKEND

### 1. **Health Check**
```javascript
GET http://localhost:8080/actuator/health
Response: {"status": "UP"}
```

### 2. **Exécuter formule magique**
```javascript
POST http://localhost:8080/api/magic-formulas/execute
Body: {
    "formula": "TELEPORT_HERO",
    "parameters": {
        "heroId": "sid-meier",
        "x": 10,
        "y": 20
    }
}
```

### 3. **Formules disponibles**
- `TELEPORT_HERO` : Téléportation simple
- `CREATE_PORTAL` : Créer un portail
- `PHASE_SHIFT` : Changer de dimension
- `QUANTUM_COLLAPSE` : Effet quantique

---

## 🛠️ COMMENT MODIFIER LE JEU

### Ajouter un nouvel ennemi
```javascript
// Dans createWorld()
game.enemies.push({
    x: 45,              // Position
    y: 50,
    icon: '🧟',         // Emoji ou image
    name: 'Zombie',
    health: 60
});
```

### Ajouter un nouvel item
```javascript
// Dans useItem()
if (slot === 6) {
    // Nouvel item slot 6
    showMessage("Super pouvoir activé !");
    game.player.health = 100;  // Full heal
}
```

### Changer la vitesse
```javascript
// Dans game.player
speed: 1.0  // Au lieu de 0.5 (2x plus rapide)
```

### Ajouter un NPC
```javascript
game.objects.push({
    x: 55,
    y: 45,
    icon: '🧙‍♀️',
    name: 'Sorcière',
    type: 'npc',
    dialogue: "Je vends des potions !"
});
```

---

## 🚨 POINTS D'EXTENSION

### 1. **Système de sauvegarde**
```javascript
// Sauvegarder
localStorage.setItem('gameState', JSON.stringify(game));

// Charger
const saved = localStorage.getItem('gameState');
if (saved) game = JSON.parse(saved);
```

### 2. **Multijoueur (WebSocket)**
```javascript
const ws = new WebSocket('ws://localhost:8080/game');
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // Synchroniser autres joueurs
};
```

### 3. **Sons**
```javascript
const audio = new Audio('sword.mp3');
audio.play();  // Lors d'une attaque
```

### 4. **Particules**
```javascript
// Utiliser le système d'URZ-KÔM
import { QuantumEngine } from './quantum-physics.js';
quantumEngine.createPortalEffect('VORTEX', position);
```

---

## 📱 COMPATIBILITÉ

### Navigateurs supportés
- ✅ Chrome (recommandé)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Mobile (contrôles tactiles pas implémentés)

### Configuration minimale
- RAM: 2GB
- CPU: Tout processeur moderne
- GPU: Pas nécessaire (Canvas 2D)
- Résolution: 1280x720 minimum

---

## 🔍 DEBUGGING

### Console JavaScript (F12)
```javascript
// Voir état du jeu
console.log(game);

// Téléporter joueur
game.player.x = 10;
game.player.y = 10;

// Donner énergie
game.player.energy = 100;

// Tuer tous les ennemis
game.enemies = [];
```

### Mode Debug (F3 in-game)
Affiche:
- FPS
- Position joueur
- Tuile actuelle
- Nombre d'entités

---

## 📚 RESSOURCES

### Fichiers importants
- `REALGAME/play.html` : Jeu principal
- `REALGAME/core/engine/UnifiedEngine.js` : Moteur unifié
- `REALGAME/heroes/heroes-data.json` : Données héros
- `REALGAME/scenarios/*.hots` : Scénarios

### Documentation API
- Spring Boot : http://localhost:8080/swagger-ui.html
- HOTS Language : Voir `AVALON/ECOLE/GRAMMAIRE/`

### Assets
- Images Vincent : `REALGAME/FromVINCE/`
- Ymagirie : `Ymagirie/`
- Icônes : Emojis Unicode

---

Cette doc technique devrait t'aider à comprendre comment tout fonctionne sous le capot ! 🔧