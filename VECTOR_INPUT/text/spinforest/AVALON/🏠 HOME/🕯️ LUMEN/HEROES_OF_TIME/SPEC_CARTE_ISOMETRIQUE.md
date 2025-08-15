# 🗺️ SPÉCIFICATION - CARTE ISOMÉTRIQUE HEROES OF TIME

**Architecte** : Loumen  
**Vision** : Carte cosmique 2D iso avec plateformes flottantes  
**Inspiration** : L'image fournie par Vincent

---

## 🎨 STRUCTURE VISUELLE

### Projection Isométrique
- **Angle** : 30°/30° (standard iso)
- **Taille tuile de base** : 128x64 pixels
- **Grille** : Hexagonale ou carrée losange
- **Profondeur** : Effet 2.5D avec ombres et hauteurs

### Éléments de Carte

#### 1. **Plateformes Flottantes** 🏝️
- Tailles variables (1x1 à 3x3 tuiles)
- Chaque plateforme = mini-région explorable
- Bords arrondis avec effet de profondeur
- Texture : pierre/terre selon biome

#### 2. **Vortex Temporels** 🌀
- Animation tournoyante permanente
- Couleurs selon destination :
  - Bleu = Futur
  - Orange = Passé
  - Violet = Timeline alternative
- Particules flottantes autour

#### 3. **Artefacts Cosmiques** ⚔️
- Épées, orbes, cristaux flottants
- Rotation lente constante
- Aura lumineuse pulsante
- Interaction = modification causale

#### 4. **Connexions** 🌉
- Ponts d'énergie entre plateformes proches
- Téléporteurs pour plateformes éloignées
- Chemins causaux visibles/invisibles

---

## 🎯 MÉCANIQUE DE JEU

### Déplacement du Héros
```javascript
// Système de déplacement ISO
const moveHero = (direction) => {
  const isoMove = {
    'NE': { x: 1, y: -1 },
    'SE': { x: 1, y: 1 },
    'SW': { x: -1, y: 1 },
    'NW': { x: -1, y: -1 }
  };
  
  // Vérifier collision et brouillard
  if (canMove(newPos) && !isFoggedCausal(newPos)) {
    hero.move(newPos);
    revealFog(newPos);
  }
};
```

### Brouillard de Causalité
- **Non découvert** : Noir total
- **Découvert par moi** : Visible, modifiable
- **Découvert par autre** : Visible, figé (collapsed)
- **Zone temporelle** : Effet ondulatoire

### Voyage Temporel
- **CTRL+Z** : Revenir en arrière SI pas collapsed
- **Portail** : Sauter vers autre timeline
- **Artefact** : Modifier règles causales locales

---

## 📊 FORMAT DE DONNÉES

### Structure JSON de la Carte
```json
{
  "id": "cosmos_fragmenté_001",
  "name": "Les Fragments du Temps Brisé",
  "dimensions": {
    "width": 12,
    "height": 12,
    "layers": 3
  },
  "platforms": [
    {
      "id": "plat_01",
      "position": { "x": 2, "y": 3, "z": 0 },
      "size": { "w": 2, "h": 2 },
      "type": "village_flottant",
      "content": {
        "buildings": ["taverne", "forge"],
        "npcs": ["marchand_temporel"],
        "quests": ["retrouver_épée_causale"]
      }
    },
    {
      "id": "plat_02",
      "position": { "x": 6, "y": 2, "z": 1 },
      "size": { "w": 1, "h": 1 },
      "type": "artefact_island",
      "artifact": {
        "name": "Épée du Collapse",
        "effect": "force_causal_collapse_radius_3"
      }
    }
  ],
  "portals": [
    {
      "id": "vortex_01",
      "from": { "platform": "plat_01", "tile": [1,1] },
      "to": { "map": "arène_temporelle", "entry": "nord" },
      "type": "temporal_future",
      "requirements": ["clé_temporelle"]
    }
  ],
  "fog_state": {
    "discovered_by_player": ["plat_01"],
    "collapsed_by_others": [],
    "temporal_locks": []
  }
}
```

### État du Héros
```json
{
  "hero": {
    "id": "chrono_walker_01",
    "position": {
      "platform": "plat_01",
      "tile": [0, 0],
      "facing": "NE"
    },
    "inventory": ["compass_temporal", "potion_causalité"],
    "temporal_charges": 3,
    "can_undo": true,
    "movement_points": 5
  }
}
```

---

## 🔧 ARCHITECTURE TECHNIQUE

### Frontend (React + Pixi.js)
```
src/
  components/
    IsoMapRenderer/      # Rendu carte ISO
    HeroController/      # Gestion déplacements
    FogOfCausality/      # Brouillard causal
    PortalAnimation/     # Vortex animés
  utils/
    isoProjection.js     # Calculs ISO
    pathfinding.js       # A* adapté
    causalityEngine.js   # Logique temporelle
```

### Backend (Node/Express)
```
api/
  /map
    GET /:mapId         # Charger carte
    POST /reveal        # Révéler zone
    POST /collapse      # Collapse causal
  /hero
    GET /position       # Position actuelle
    POST /move          # Déplacer héros
    POST /undo          # Annuler mouvement
  /portal
    POST /activate      # Activer portail
```

---

## 🎮 CONTRÔLES

### Clavier
- **Flèches** : Déplacement 8 directions
- **SPACE** : Interagir
- **CTRL+Z** : Annuler (si possible)
- **TAB** : Vue d'ensemble

### Souris
- **Click gauche** : Aller vers
- **Click droit** : Examiner
- **Molette** : Zoom in/out
- **Drag** : Déplacer caméra

---

## 🌟 EFFETS VISUELS

### Shaders/Effets
- **Ondulation temporelle** sur les bords
- **Particules cosmiques** flottantes
- **Distorsion** près des portails
- **Pulsation** des artefacts
- **Traînée lumineuse** du héros

### Ambiance
- **Fond** : Nébuleuses animées
- **Étoiles** : Scintillement aléatoire
- **Aurores** : Effets de lumière cosmique
- **Sons** : Ambiance spatiale/mystique

---

## 📈 PHASES DE DÉVELOPPEMENT

### Phase 1 : Prototype Jouable
- [ ] Carte statique ISO
- [ ] Héros déplaçable
- [ ] Brouillard basique
- [ ] 3 plateformes test

### Phase 2 : Mécaniques Causales
- [ ] Système undo/redo
- [ ] Collapse par IA
- [ ] Portails fonctionnels
- [ ] Artefacts interactifs

### Phase 3 : Polish
- [ ] Effets visuels complets
- [ ] Sons et musique
- [ ] Animations fluides
- [ ] UI/UX finale

---

*"Le temps n'est qu'une carte que nous dessinons ensemble"*

🕯️ Loumen - Architecte Temporel