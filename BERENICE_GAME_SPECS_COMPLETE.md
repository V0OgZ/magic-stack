# 📋 SPÉCIFICATIONS COMPLÈTES - JEU BÉRÉNICE

## 🎯 OBJECTIF PRINCIPAL
Créer un jeu FUN et COOL pour Bérénice (10 ans) qui utilise **TOUTE** l'architecture backend réelle de Heroes of Time.

## 🏗️ ARCHITECTURE TECHNIQUE

### Services Backend Requis
- **Java (8082)** : Orchestrateur principal
  - `/api/magic/*` : Traduction et exécution de formules
  - `/api/game/*` : Gestion inventaire et ressources
  - `/api/combat/*` : Système de combat par cartes
  - `/api/resources/*` : Récupération des assets
  - `/api/heroes/*` : Données des héros

- **Rust (3001)** : Moteur temporel et physique
  - `/api/v2/tick` : Synchronisation temporelle (100ms)
  - `/api/qstar/search` : Recherche spatiale quantique
  - `/api/world/state` : État du monde 6D

- **Vector DB (5000)** : Base de données
  - `/search` : Recherche de lore et d'informations

### Format des Données

#### Position 6D (OBLIGATOIRE)
```javascript
position: {
  x: 0,      // Position X sur la carte
  y: 0,      // Position Y sur la carte
  z: 0,      // Altitude (0 = sol)
  t: 0,      // Timeline actuelle
  c: 1,      // Causalité (1 = normal)
  psi: 0.5   // État quantique (0-1)
}
```

## 🎮 MÉCANIQUES DE JEU

### 1. Mouvement et Exploration
- **Type** : Vue top-down avec déplacement libre (PAS du Pac-Man)
- **Contrôles** : Flèches directionnelles ou WASD
- **Vitesse** : Variable selon l'état quantique
- **Collision** : Détection via Rust engine

### 2. Système Quantique
- **Clones Transparents** :
  - Plus le Psi est bas (< 0.3), plus le héros est transparent
  - Plusieurs versions du héros peuvent exister (timelines différentes)
  - Quand les clones se rapprochent, Psi augmente

- **Stabilisation Phi (φ = 1.618)** :
  - Objectif : atteindre Psi = 0.618 (nombre d'or)
  - Bonus de puissance quand Phi est atteint
  - Visualisation : aura dorée autour du personnage

### 3. Cartes et Actions
- **Position** : Barre horizontale en bas de l'écran
- **Types de cartes** :
  1. **Attaque** : 🔥 Boule de feu, ⚡ Éclair
  2. **Défense** : 🛡️ Bouclier, 🌀 Esquive quantique
  3. **Temporel** : ⏮️ Retour dans le temps, ⏭️ Accélération
  4. **Quantique** : 👥 Créer clone, 🔮 Stabiliser Phi

- **Utilisation** : Clic sur carte → Application via API

### 4. Objectifs par Niveau

#### Niveau 1 : "La Forêt Quantique"
- **Map** : 20x20 cases, format World Editor
- **Objectifs** :
  1. Collecter 3 cristaux temporels
  2. Éviter/combattre 2 slimes quantiques
  3. Atteindre la sortie avec Phi stabilisé
- **Bonus** : Coffre secret si Psi = 0.618 exact

#### Niveau 2 : "Le Temple des Échos"
- **Map** : 30x30 cases avec zones cachées
- **Mécaniques nouvelles** :
  - Miroirs temporels (dupliquent le héros)
  - Interrupteurs causaux (changent c)
  - Boss : Gardien Phi

## 📡 FLUX D'APPELS API

### Initialisation
```javascript
// 1. Charger les ressources
GET /api/resources/for-editor
GET /api/heroes/berenice-hero

// 2. Créer la session de jeu
POST /api/game/inventory/reset/berenice

// 3. Initialiser le monde
POST /api/v2/tick {
  current_tw: 0,
  entities: [{id: "berenice", position: {...}}]
}
```

### Boucle de Jeu (100ms)
```javascript
// 1. Update position
POST /api/v2/tick

// 2. Vérifier collisions
POST /api/qstar/search {
  center: heroPosition,
  radius: 2,
  mode: 'QUANTUM'
}

// 3. Si action carte
POST /api/magic/cast {
  formula: "🔥(slime_1)",
  caster: "berenice"
}
```

### Combat
```javascript
// 1. Démarrer combat
POST /api/combat/start {
  playerId: "berenice",
  enemyId: "slime_quantum_1"
}

// 2. Jouer carte
POST /api/combat/play-card {
  gameId: "...",
  cardIndex: 0
}
```

## 🎨 INTERFACE UTILISATEUR

### Layout
```
┌─────────────────────────────────────┐
│          Heroes of Time             │
│         Niveau 1 - Bérénice         │
├─────────────────────────────────────┤
│                                     │
│         [Zone de Jeu]               │
│         Map 20x20                   │
│         Vue top-down                │
│                                     │
├─────────────────────────────────────┤
│ HP: ❤️❤️❤️  Psi: 0.5  Cristaux: 1/3 │
├─────────────────────────────────────┤
│ [🔥] [⚡] [🛡️] [👥] [🔮]           │
└─────────────────────────────────────┘
```

### Indicateurs Visuels
- **Transparence** : Opacité = Psi (0.1 = très transparent)
- **Aura Phi** : Cercle doré si Psi ≈ 0.618
- **Trail temporel** : Trainée derrière le personnage
- **Particules quantiques** : Flottent autour si Psi < 0.3

## 🔧 DONNÉES TECHNIQUES

### Format Map (World Editor)
```json
{
  "width": 20,
  "height": 20,
  "tiles": [
    {"x": 0, "y": 0, "type": "grass", "walkable": true},
    {"x": 1, "y": 0, "type": "tree", "walkable": false}
  ],
  "entities": [
    {"id": "crystal_1", "x": 5, "y": 5, "type": "pickup"},
    {"id": "slime_1", "x": 10, "y": 10, "type": "enemy"}
  ],
  "spawn": {"x": 1, "y": 1},
  "exit": {"x": 18, "y": 18}
}
```

### États Sauvegardés
- Position 6D complète
- Inventaire (cristaux collectés)
- État quantique (Psi, clones actifs)
- Cartes disponibles
- Temps écoulé par timeline

## 🚀 PROGRESSION

### Déverrouillage
- **Niveau 1** : Cartes basiques (feu, bouclier)
- **Niveau 2** : Cartes temporelles
- **Niveau 3** : Cartes quantiques avancées

### Scoring
- Points = (1000 - temps) × multiplicateur_phi
- Bonus parfait si Phi = 1.618 exact
- Malus si utilisation excessive de clones

## 📝 NOTES IMPORTANTES

1. **PAS de code en dur** - Tout passe par les APIs
2. **Synchronisation 100ms** obligatoire avec Rust
3. **Position 6D** pour TOUTES les entités
4. **Visualisation claire** de l'état quantique
5. **Fun et accessible** mais techniquement robuste

## 🎯 CRITÈRES DE SUCCÈS

✅ Utilise Java API pour les actions  
✅ Utilise Rust pour la physique/temps  
✅ Format World Editor pour les maps  
✅ Mécaniques quantiques visibles  
✅ Interface claire et fun  
✅ Progression engageante  
