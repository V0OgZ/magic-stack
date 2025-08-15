# 🎨 ASSETS REALGAME

**Structure organisée des assets graphiques**

---

## 📁 ORGANISATION

### `/spells/` - Sorts Magiques
- Format : 64x64 pixels
- PNG avec transparence
- Nommage : `spell_[nom].png`

### `/terrain/` - Tiles de Terrain  
- Format : 64x56 pixels (hexagone)
- Types : grass, mountain, water, lava, forest
- Nommage : `tile_[type]_[variant].png`

### `/creatures/` - Créatures & Ennemis
- Petites : 32x32 pixels
- Moyennes : 64x64 pixels  
- Grandes : 128x128 pixels
- Nommage : `[creature]_[action].png`

### `/heroes/` - Personnages Jouables
- Sprites avec animations
- Idle : 4 frames
- Walk : 8 frames
- Attack : 6 frames
- Nommage : `[hero]_[action]_[frame].png`

### `/ui/` - Interface Utilisateur
- Boutons, barres, icônes
- Formats variés
- Nommage : `ui_[element].png`

---

## 🎮 UTILISATION

### Charger un asset
```javascript
const assetLoader = {
    spell: (name) => `assets/spells/spell_${name}.png`,
    terrain: (type, variant = 1) => `assets/terrain/tile_${type}_${variant}.png`,
    creature: (name, action = 'idle') => `assets/creatures/${name}_${action}.png`,
    hero: (name, action = 'idle', frame = 0) => `assets/heroes/${name}_${action}_${frame}.png`
};
```

### Exemple d'utilisation
```javascript
// Charger une boule de feu
const fireball = new Image();
fireball.src = assetLoader.spell('fireball');

// Charger un orc en attaque
const orcAttack = new Image();
orcAttack.src = assetLoader.creature('orc', 'attack');
```

---

## 📊 MÉTADONNÉES

Voir `metadata.json` pour :
- Dimensions exactes
- Points d'ancrage
- Animations disponibles
- Variantes de couleur

---

## 🔧 OUTILS

- **Découpe** : `/assets/TILES/tile-cutter.html`
- **Preview** : `/assets/TILES/tiles-viewer.html`
- **Atlas** : À venir

---

**Assets fournis par VINCENT** 🎨✨