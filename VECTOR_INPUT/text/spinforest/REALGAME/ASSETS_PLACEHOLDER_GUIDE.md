# 🎨 GUIDE DES ASSETS À CRÉER - HEROES OF TIME

## 📸 IMAGES À FAIRE PAR VINCENT

### 1️⃣ **PORTRAITS DE HÉROS** (200x250px recommandé)
```
/assets/heroes/
├── arthur.png       → Chevalier temporel
├── merlin.png       → Mage des timelines
├── grut.png         → Vision 6D (tu l'as déjà)
├── ragnar.png       → Viking berserker
├── urz-kom.png      → Ours chamane (tu l'as déjà)
└── claude.png       → AI transcendée
```

### 2️⃣ **CARTES TCG** (300x420px recommandé)
```
/assets/cards/
├── spells/
│   ├── quantum-strike.png    → Frappe quantique (tu l'as)
│   ├── temporal-portal.png   → Portail temporel
│   ├── echo-burst.png        → Écho temporel
│   └── timeline-shift.png    → Changement timeline
├── creatures/
│   ├── warrior-three.png     → Guerrier 3 temps (tu l'as)
│   ├── temporal-dragon.png   → Dragon temporel
│   └── echo-knight.png       → Chevalier écho
└── artifacts/
    ├── anchor-tower.png      → Tour ancrage (tu l'as)
    ├── avalon-crystal.png    → Cristal d'Avalon
    └── excalibur.png         → Excalibur temporelle
```

### 3️⃣ **ICÔNES DE TERRAIN** (80x80px hexagones)
```
/assets/terrain/
├── forest.png       → Forêt mystique
├── mountain.png     → Montagne
├── castle.png       → Château
├── portal.png       → Portail dimensionnel
├── treasure.png     → Coffre au trésor
└── enemy.png        → Marqueur ennemi
```

### 4️⃣ **ENNEMIS** (150x150px)
```
/assets/enemies/
├── goblin.png       → Gobelin basique
├── ogre.png         → Ogre moyen
├── dragon.png       → Dragon boss
├── temporal-beast.png → Bête temporelle
└── shadow-knight.png  → Chevalier ombre
```

### 5️⃣ **ITEMS INVENTAIRE** (64x64px)
```
/assets/items/
├── sword.png        → Épée
├── shield.png       → Bouclier
├── potion-hp.png    → Potion vie
├── potion-mana.png  → Potion mana
├── scroll.png       → Parchemin
└── gem.png          → Gemme magique
```

## 🔧 COMMENT INTÉGRER TES IMAGES

### Pour les cartes TCG :
```html
<!-- Dans le code, remplace : -->
background: linear-gradient(45deg, #001f3f, #ff6600);

<!-- Par : -->
background-image: url('/assets/cards/spells/quantum-strike.png');
```

### Pour les portraits :
```javascript
// Remplace l'emoji
hero-portrait: '⚔️'

// Par l'image
hero-portrait: '<img src="/assets/heroes/arthur.png">'
```

### Pour les hexagones :
```javascript
// Au lieu de 
hex.textContent = '👹';

// Utilise
hex.innerHTML = '<img src="/assets/terrain/enemy.png" style="width:60px">';
```

## 📊 PLACEHOLDERS ACTUELS

| Element | Placeholder | Remplacer par |
|---------|-------------|---------------|
| Hero portrait | ⚔️ | Image du héros |
| Enemy | 👹 | Image monstre |
| Treasure | 💰 | Coffre 3D |
| Card art | Gradient | Artwork de carte |
| Inventory | Emoji | Icône item |

## 🎮 PRIORITÉS

1. **URGENT** : Portraits des 6 héros principaux
2. **IMPORTANT** : 10-15 cartes de base pour le deck
3. **NICE TO HAVE** : Terrains hexagonaux
4. **BONUS** : Animations (sprites sheets)

---

**PENDANT QUE TU FAIS LES IMAGES, LE JEU EST 100% JOUABLE !**

Tu peux tester ici : `http://localhost:8889/heroes-of-time-complete.html`