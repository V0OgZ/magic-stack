# 🎨 Système d'Assets Heroes of Time

## 📊 Vue d'ensemble

Ce système gère tous les assets visuels et sonores du jeu selon les spécifications Hearthstone/Mother Stone.

### Structure
```
/hot/assets/
├── assets_catalog.json    # Catalogue principal (source de vérité)
├── icons/
│   ├── lore/              # Icônes HD illustratives (256x256)
│   │   ├── excalibur_flat.svg
│   │   └── ...
│   └── combat/            # Icônes fonctionnelles (64x64)
│       ├── shield.svg
│       └── ...
├── sounds/
│   ├── cast/              # Sons de lancement
│   ├── hit/               # Sons d'impact
│   ├── aura/              # Sons de zone
│   └── ambient/           # Sons d'ambiance
└── fx/                    # Définitions des micro-FX
    └── presets.json
```

---

## 🎯 Deux Familles d'Icônes

### 1. Icônes LORE (Illustratives HD)
- **Usage**: Cartes, inventaire, artefacts, lieux
- **Style**: Détaillé, artistique (style Excalibur)
- **Format**: SVG prioritaire, PNG 256x256
- **Exemples**: 
  - Excalibur dans la pierre
  - Mother Stone
  - Portails temporels
  - Coffres au trésor

### 2. Icônes COMBAT (Fonctionnelles)
- **Usage**: Actions, effets, statuts en combat
- **Style**: Simple, ultra-lisible en petit
- **Format**: SVG, optimisé pour 32-64px
- **Exemples**:
  - 🛡️ Bouclier (défense)
  - ⚔️ Épée (attaque)
  - 💥 Explosion (AoE)
  - 🌀 Vortex (contrôle)

---

## 🔊 Système Audio

### Format Obligatoire
- **Durée**: ≤ 400ms
- **Format**: Mono, .ogg + .m4a
- **Normalisation**: -12 LUFS
- **Catégories**:
  - `cast_*` : Lancement de sorts
  - `hit_*` : Impacts
  - `aura_*` : Effets de zone
  - `ambient_*` : Ambiance

### Exemples
- 🛡️ → `hit_metal` (clang sourd)
- ⚔️ → `hit_blade` (choc de lames)
- 💥 → `hit_explosion` (bang)
- 🌀 → `aura_whoosh` (whoosh réverbéré)

---

## ✨ Presets de Micro-FX

### Liste des Presets
1. **pulse** : Apparition avec pulsation (300ms)
2. **shake** : Tremblement d'impact (200ms)
3. **spark_trail** : Traînée d'étincelles (400ms)
4. **ripple** : Onde concentrique (500ms)
5. **glyph_rain** : Pluie de glyphes (600ms)
6. **spin_in** : Rotation d'invocation (400ms)
7. **fade_pop** : Apparition/disparition douce (250ms)

---

## 🎨 Thèmes par Classe

| Classe | Icônes | FX par défaut | Son par défaut | Couleur |
|--------|--------|---------------|----------------|---------|
| **Guerrier** | 🗡️ 🛡️ | shake | hit_metal | #8B4513 |
| **Mage** | ✨ 🔮 | spark_trail | cast_generic | #4B0082 |
| **Druide** | 🌿 🪵 | pulse | aura_magic | #228B22 |
| **Scientifique** | ⚛️ ♾️ | glyph_rain | cast_generic | #00CED1 |
| **Agent Temporel** | ⏳ 🌀 | ripple | aura_whoosh | #FF69B4 |
| **Archiviste** | 🗂️ 📜 | fade_pop | cast_generic | #D2691E |

---

## ⚠️ Champs JSON Obligatoires

**TOUT** contenu (sort, objet, créature, événement) DOIT avoir :

```json
{
  "icon_id": "combat:explosion",
  "fx_preset": "spark_trail",
  "sound_event": "cast_fireball",
  "theme_color": "#FF6D00",
  "output_modes": ["iconic", "literary", "runic"]
}
```

**Refus de PR si ces champs sont absents !**

---

## 📋 Workflow

### Archéologue (Contenu)
1. Vérifier tous les JSON existants
2. Ajouter les champs obligatoires manquants
3. Référencer les assets dans le catalogue
4. Livrer `REPORT_assets_audit.csv`

### Intégrateur (Runtime)
1. Charger `assets_catalog.json` au boot
2. Pour chaque événement, afficher icône + FX + son
3. Gérer les fallbacks (logs warning)
4. Maintenir perf < 16ms/event

---

## 🔗 Sources d'Assets Gratuits

### Icônes
- [SVGRepo](https://www.svgrepo.com/) - CC0, libre
- [OpenMoji](https://openmoji.org/) - Emojis vectoriels
- [Iconduck](https://iconduck.com/) - Packs open source
- [Noto Emoji](https://fonts.google.com/noto/specimen/Noto+Emoji) - Google

### Sons
- [Freesound](https://freesound.org/) - CC0/CC-BY
- [OpenGameArt](https://opengameart.org/) - Assets de jeu
- [Zapsplat](https://www.zapsplat.com/) - Gratuit avec compte

---

## 📊 Statut Actuel

| Type | Ready | Pending | Total |
|------|-------|---------|-------|
| **Icônes Lore** | 4 | 2 | 6 |
| **Icônes Combat** | 6 | 0 | 6 |
| **Sons** | 6 | 3 | 9 |
| **FX Presets** | 7 | 0 | 7 |
| **Thèmes** | 6 | 0 | 6 |

**Complétude globale : 70%**

---

## 🚀 Prochaines Étapes

1. [ ] Télécharger tous les SVG depuis les sources
2. [ ] Convertir en PNG 64/256 selon usage
3. [ ] Normaliser tous les sons à -12 LUFS
4. [ ] Mettre à jour TOUS les JSON de contenu
5. [ ] Créer script de validation automatique
