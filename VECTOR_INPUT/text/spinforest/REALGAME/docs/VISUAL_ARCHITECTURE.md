# 🎮 ARCHITECTURE VISUELLE - REALGAME

## 📊 Vue d'ensemble des 3 Modes

```
┌─────────────────────────────────────────────────────────────┐
│                    🌀 MODE MÉTA / SURCARTE                  │
│                                                             │
│    ○ Timeline Principale        ○ Flux Temporel            │
│     \                          /                            │
│      \    ○ Avalon Central    /      ○ Ligne Cristalline  │
│       \    (Point central)   /      /                      │
│        ○───────────○────────○──────○                       │
│      Passé       Présent      Futur                        │
│                                                             │
│    [Choix de timeline] → [Sélection monde] → [ENTRER]      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                 🗺️ MODE CARTE PRINCIPALE ISO                │
│                                                             │
│         ╱◊╲    Plateforme      ╱◊╲    Plateforme          │
│        ╱   ╲   Flottante 1    ╱   ╲   Flottante 2         │
│       ◊─────◊ ←─ Portail ─→  ◊─────◊                      │
│        ╲   ╱                  ╲   ╱                        │
│         ╲◊╱                    ╲◊╱                         │
│          │                      │                           │
│     🦸 Héros                🌫️ Brouillard                  │
│                                                             │
│    [Navigation] → [Exploration] → [Interaction]            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    ⚔️ MODE COMBAT (À venir)                 │
│                                                             │
│    ┌─────┐  VS  ┌─────┐        ╔═══════════╗             │
│    │ 🦸 │      │ 👹 │        ║ Timeline  ║             │
│    │Héros│      │Ennemi│       ║ Quantique ║             │
│    └─────┘      └─────┘        ╚═══════════╝             │
│                                                             │
│    [Stratégie] → [Action] → [Conséquences temporelles]     │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Flux de Navigation

### 1. **Démarrage** → Mode Méta
```
Joueur arrive
    ↓
Voit la carte des mondes/timelines
    ↓
Choisit sa timeline (affect tout le jeu)
    ↓
Sélectionne un monde à explorer
```

### 2. **Mode Méta** → Carte ISO
```
Clic sur monde accessible
    ↓
Chargement de la carte ISO correspondante
    ↓
Héros apparaît sur la plateforme d'entrée
    ↓
Exploration commence
```

### 3. **Carte ISO** → Combat
```
Rencontre ennemi / Zone de combat
    ↓
Transition vers mode combat
    ↓
Résolution (victoire/défaite)
    ↓
Retour à la carte avec conséquences
```

## 🎨 Éléments Visuels Clés

### Mode Méta/Surcarte
- **Avatar mobile** : Représente le joueur méta
- **Mondes** : Bulles/sphères connectées
- **Timelines** : Lignes temporelles visibles
- **Phasage** : Transparence = non accessible
- **Brouillard** : Causalité non résolue

### Mode Carte ISO
- **Plateformes flottantes** : Îles dans le vide
- **Héros** : Sprite isométrique mobile
- **Portails** : Points de transition
- **Brouillard causal** : 7 états différents
- **Objets interactifs** : Épées, châteaux, arènes

### Intégration Narrative
- **Points d'intérêt** : Déclenchent dialogues
- **NPCs** : Personnages avec arbres de dialogue
- **Zones trigger** : Événements automatiques
- **Choix** : Affectent karma et timeline

## 🌈 Palette de Couleurs

### Primaires
- **Or** (#FFD700) : UI principale, importance
- **Violet** (#8A2BE2) : Magie, portails, temporel
- **Noir profond** (#0A0A1A) : Fonds, mystère

### États
- **Vert** (#00FF00) : Actif, accessible
- **Rouge** (#FF0000) : Mort, danger, inaccessible
- **Gris** (#808080) : Passé, exploré, inactif
- **Bleu** (#007FFF) : Ancré, fixé temporellement

### Brouillard (7 niveaux)
1. Inexploré : Gris foncé (90% opaque)
2. Passé fixé : Gris moyen (70% opaque)
3. Accessible : Jaune (30% opaque)
4. Vision : Vert (10% opaque)
5. Fantôme : Blanc (40% opaque)
6. Superposé : Violet (50% opaque)
7. Ancré : Bleu (40% opaque)

## 🔧 Considérations Techniques

### Performance
- Canvas 2D pour légèreté
- Sprites pré-rendus pour les éléments répétés
- LOD (Level of Detail) pour grandes cartes
- Culling des éléments hors écran

### Responsive
- Adaptation résolution écran
- Zoom dynamique
- Interface scalable
- Touch support (futur)

### Assets Requis
1. **Sprites héros** (8 directions)
2. **Tiles isométriques** (terrain)
3. **Icônes objets** (items, triggers)
4. **Portraits personnages** (dialogues)
5. **Effets particules** (magie, portails)
6. **UI elements** (boutons, fenêtres)

## 📐 Spécifications Isométriques

### Grille de Base
- **Tile size** : 64x32 pixels
- **Angle** : 30° (isométrique classique)
- **Ratio** : 2:1 (largeur:hauteur)

### Calculs de Position
```javascript
// World to Screen
screenX = (worldX - worldY) * TILE_WIDTH / 2;
screenY = (worldX + worldY) * TILE_HEIGHT / 2;

// Screen to World  
worldX = (screenX / (TILE_WIDTH/2) + screenY / (TILE_HEIGHT/2)) / 2;
worldY = (screenY / (TILE_HEIGHT/2) - screenX / (TILE_WIDTH/2)) / 2;
```

## 🎯 Prochaines Étapes Visuelles

1. **Créer sprites de base** pour le héros
2. **Designer tiles isométriques** pour plateformes
3. **Animer les portails** avec shaders/canvas
4. **Implémenter système de particules** unifié
5. **Créer transitions** entre modes
6. **Polish UI** avec animations

---

*"La beauté réside dans la cohérence visuelle à travers les dimensions"* - Vincent