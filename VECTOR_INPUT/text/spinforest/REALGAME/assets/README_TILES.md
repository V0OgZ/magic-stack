# 🎨 GUIDE D'UTILISATION DES IMAGES DE VINCENT

## 📁 IMAGES DISPONIBLES

### 🗺️ **MAP ISO.png**
- **Usage** : Carte isométrique style Heroes III
- **Contient** : Terrains variés, structures, chemins
- **À faire** : EXTRAIRE les tiles individuelles avec l'outil

### ⛪ **Warrior's Path_ Church and Vortex.png**
- **Usage** : Référence visuelle pour "Frontière de Feu et Foi"
- **Éléments clés** :
  - Église gothique
  - Épée de feu plantée
  - Vortex orange tourbillonnant
  - Héros en armure
- **Style** : Utiliser pour l'ambiance et les couleurs

### 🌌 **Multiverse.png**
- **Usage** : Mode Méta/Surcarte
- **Style** : Bulles de réalités interconnectées
- **Implémentation** : Fond pour la sélection des mondes

## 🛠️ OUTILS CRÉÉS

### 1. **Extracteur de Tiles** (`tools/tile-extractor.html`)
```bash
# Lancer l'outil
cd REALGAME
python3 -m http.server 8888
# Ouvrir http://localhost:8888/tools/tile-extractor.html
```

**Fonctionnalités** :
- ✅ Charge MAP ISO.png
- ✅ Grille ajustable (64x32 pour iso)
- ✅ 3 modes : Rectangle, Hexagonal, Isométrique
- ✅ Extraction par clic ou automatique
- ✅ Export des tiles en PNG

### 2. **Visualiseur de Style** (`tools/style-extractor.html`)
- Extrait les palettes de couleurs
- Analyse le style visuel
- Génère des thèmes CSS

## 📐 COMMENT UTILISER LES TILES

### 1. **Extraire depuis MAP ISO.png**
1. Ouvrir l'extracteur de tiles
2. Charger MAP ISO.png
3. Mode Isométrique (64x32)
4. Cliquer "Extraire toutes les tiles"
5. Exporter les tiles utiles

### 2. **Types de tiles à extraire**
- 🌿 **Herbe** : Base du terrain
- 🪨 **Pierre** : Chemins et structures
- 🌊 **Eau** : Rivières et lacs
- 🏔️ **Montagne** : Obstacles
- 🌳 **Forêt** : Zones denses
- 🔥 **Lave** : Zones dangereuses

### 3. **Intégration dans le jeu**
```javascript
// Charger les tiles
const tiles = {
    grass: loadTile('tiles/grass_01.png'),
    stone: loadTile('tiles/stone_01.png'),
    lava: loadTile('tiles/lava_01.png'),
    // ...
};

// Dessiner une tile iso
function drawIsoTile(ctx, tile, x, y) {
    const isoX = (x - y) * 32; // Demi-largeur
    const isoY = (x + y) * 16; // Demi-hauteur
    ctx.drawImage(tile, isoX, isoY);
}
```

## 🎨 PALETTE DE COULEURS (depuis les images)

D'après l'analyse visuelle :

### Frontière de Feu et Foi
- **Terre** : `#8B4513`, `#A0522D`, `#654321`
- **Feu** : `#FF6600`, `#FF4500`, `#FFD700`
- **Pierre** : `#696969`, `#808080`, `#A9A9A9`
- **Ciel** : `#1E3A5F`, `#2F4F7F`, `#4682B4`

### Ambiance générale
- **Tons chauds** pour les zones actives
- **Tons froids** pour le mystère
- **Contrastes forts** pour la lisibilité

## 🚀 PROCHAINES ÉTAPES

1. **Extraire les tiles de base** depuis MAP ISO.png
2. **Créer un tileset organisé** dans `assets/tiles/`
3. **Adapter le moteur de rendu** pour utiliser ces tiles
4. **Appliquer le style visuel** aux interfaces

## 💡 NOTES IMPORTANTES

- Les images de Vincent sont des **références de style**
- MAP ISO.png contient probablement des **tiles réutilisables**
- Respecter la **cohérence visuelle** entre tous les éléments
- Privilégier la **lisibilité** en jeu

---

*Par LOUMEN - Pour que les images de Vincent prennent vie dans le jeu !* 🕯️