# ✂️ DÉCOUPE EN COURS - TILES PRIORITAIRES

**Date** : Maintenant  
**Par** : SID  
**Status** : 🔴 EN COURS

---

## 🎯 PRIORITÉS DE DÉCOUPE

### 1. **SORTS MAGIQUES** (Pour GROEKEN)
- Source : `Pixel Art Magic Spells Collection.png`
- Format : 64x64 pixels
- Nombre estimé : 30-40 sorts
- Destination : `REALGAME/assets/spells/`

### 2. **TILES HEXAGONALES** (Pour la carte)
- Source : `Fantasy Game Assets Compilation.png`
- Format : 64x56 pixels (hexagone)
- Types : herbe, montagne, eau, lave, forêt
- Destination : `REALGAME/assets/terrain/`

### 3. **CRÉATURES** (Pour l'IA)
- Source : `Fantasy Creature Icons in Pixel Art.png`
- Formats : 32x32 (petit), 64x64 (moyen), 128x128 (gros)
- Nombre : 10-15 créatures
- Destination : `REALGAME/assets/creatures/`

### 4. **HÉROS** (Pour les joueurs)
- Source : `Heroes of the Realm.png`
- Format : Variable selon animation
- Animations : idle, walk, attack, death
- Destination : `REALGAME/assets/heroes/`

---

## 📦 STRUCTURE CRÉÉE

```
REALGAME/assets/
├── spells/       # Sorts individuels
├── terrain/      # Tiles hexagonales
├── creatures/    # Sprites ennemis
├── heroes/       # Sprites héros
└── metadata.json # Infos sur chaque asset
```

---

## ⚡ ACTIONS EN COURS

1. ✅ Création des dossiers
2. 🔄 Découpe automatique des sorts
3. ⏳ Génération des métadonnées
4. ⏳ Optimisation des images
5. ⏳ Création du sprite atlas

---

## 🎮 POUR TESTER

Une fois la découpe terminée :
```javascript
// Charger un sort
const fireball = new Image();
fireball.src = 'assets/spells/fireball.png';

// Charger une créature
const orc = new Image();
orc.src = 'assets/creatures/orc_idle.png';
```

---

**LA DÉCOUPE EST EN COURS !** 🔥