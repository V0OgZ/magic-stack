# RESSOURCES OPENGAMEART POUR HEROES III STYLE

## 🌟 TOP PACKS GRATUITS

### 1. **Hexagonal Tile Sets**
- **URL**: https://opengameart.org/content/hexagonal-tiles-93x
- **Contient**: Grass, dirt, stone, water, lava
- **License**: CC0 (Domaine public)
- **Parfait pour**: Base de la map

### 2. **Fantasy Hex Tiles**
- **URL**: https://opengameart.org/content/fantasy-hex-tiles
- **Contient**: 400+ tiles hexagonales
- **License**: CC-BY 3.0
- **Inclus**: Terrains, routes, rivières

### 3. **Pixel Art Fantasy Creatures**
- **URL**: https://opengameart.org/content/pixel-creatures-pack
- **Contient**: 50+ créatures
- **License**: CC0
- **Sprites**: 32x32 et 64x64

### 4. **Heroes & Characters Pack**
- **URL**: https://opengameart.org/content/16-fantasy-heroes-and-villains
- **Contient**: 16 personnages avec animations
- **License**: CC-BY 3.0
- **Animations**: Idle, walk, attack

### 5. **Magic Spell Icons**
- **URL**: https://opengameart.org/content/496-pixel-art-icons-for-medieval-fantasy-rpg
- **Contient**: 496 icônes (!!)
- **License**: CC0
- **Inclus**: Sorts, items, skills

## 🔥 PACKS SPÉCIFIQUES HEROES STYLE

### Castle & Buildings
```
https://opengameart.org/content/isometric-medieval-buildings
- Châteaux, tours, maisons
- Style isométrique
- License: CC-BY 3.0
```

### Terrain Transitions
```
https://opengameart.org/content/terrain-transitions
- Transitions douces entre terrains
- Hexagonal compatible
- License: CC0
```

### UI Elements
```
https://opengameart.org/content/golden-ui
- Boutons style fantasy
- Bordures dorées
- License: CC0
```

## 💎 COLLECTIONS COMPLÈTES

### 1. **Liberated Pixel Cup**
- **URL**: https://opengameart.org/content/liberated-pixel-cup-0
- **ÉNORME**: Milliers d'assets
- Terrains, personnages, objets
- Tout en pixel art cohérent

### 2. **Battle for Wesnoth Assets**
- **URL**: https://opengameart.org/content/wesnoth-units
- Style hexagonal parfait
- Centaines d'unités
- GPL compatible

## 🛠️ OUTILS DE CONVERSION

### Tiled Map Editor
- **URL**: https://www.mapeditor.org/
- Gratuit et open source
- Supporte les hex maps
- Export en JSON

### Aseprite (ou LibreSprite)
- Pour éditer les sprites
- Animations frame par frame
- Palette de couleurs

## 📝 SCRIPT D'IMPORT RAPIDE

```bash
#!/bin/bash
# Télécharger les packs essentiels

mkdir -p opengameart_tiles
cd opengameart_tiles

# Pack hexagonal de base
wget https://opengameart.org/sites/default/files/hexagonaltiles_0.zip
unzip hexagonaltiles_0.zip -d hex_tiles/

# Créatures fantasy
wget https://opengameart.org/sites/default/files/pixel_creatures.zip
unzip pixel_creatures.zip -d creatures/

# Icônes de sorts
wget https://opengameart.org/sites/default/files/496_RPG_icons.zip
unzip 496_RPG_icons.zip -d spell_icons/

echo "✅ Tiles téléchargées !"
```

## 🎯 RECOMMANDATIONS

1. **Commencer avec**:
   - Fantasy Hex Tiles (base)
   - 496 RPG Icons (sorts/items)
   - Pixel Creatures Pack

2. **Style cohérent**:
   - Chercher "32x32" ou "64x64"
   - Tag "pixel art"
   - Même palette si possible

3. **Licenses**:
   - CC0 = Aucune attribution
   - CC-BY = Mentionner l'auteur
   - GPL = Compatible open source

4. **Conversion**:
   - Resize avec "Nearest Neighbor"
   - Limiter la palette de couleurs
   - Garder la transparence PNG