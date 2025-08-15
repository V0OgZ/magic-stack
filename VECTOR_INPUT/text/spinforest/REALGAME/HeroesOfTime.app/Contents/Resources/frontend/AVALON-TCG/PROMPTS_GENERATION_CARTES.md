# 🎴 PROMPTS POUR GÉNÉRATION DES CARTES AVALON TCG

## 🎯 OBJECTIF
Créer des prompts précis pour ChatGPT qui généreront des cartes visuellement cohérentes, sur lesquelles on pourra superposer les vraies stats du moteur.

## 📋 STRUCTURE DES PROMPTS

### 1. 🦸‍♂️ HÉROS LÉGENDAIRES
```prompt
Create a digital card art in the style of Hearthstone for [NOM_HÉROS], a legendary hero in AVALON.
Style: Epic fantasy art, highly detailed, dramatic lighting
Composition: Portrait view, character centered
Key elements:
- [TRAIT_DISTINCTIF_1]
- [TRAIT_DISTINCTIF_2]
- [ÉLÉMENT_TEMPOREL]
Background: Mystical temporal effects, swirling energies
Frame: Ornate golden legendary card frame
Color scheme: [PALETTE_DOMINANTE]
Mood: [AMBIANCE]
```

### 2. 🌀 SORTS TEMPORELS
```prompt
Create a Hearthstone-style spell card art for [NOM_SORT], a temporal magic spell.
Style: Mystical, ethereal, high fantasy
Focus: The magical effect itself
Elements:
- [EFFET_PRINCIPAL]
- [PARTICULES_MAGIQUES]
- [SYMBOLES_TEMPORELS]
Background: Abstract magical environment
Frame: Purple spell card frame
Energy type: [TYPE_ÉNERGIE]
```

### 3. 📦 ARTEFACTS QUANTIQUES
```prompt
Design a Hearthstone-style artifact card for [NOM_ARTEFACT], a quantum relic.
Style: Ancient yet futuristic
Central focus: The artifact floating/glowing
Details:
- [DÉTAIL_UNIQUE_1]
- [AURA_SPÉCIALE]
- [SYMBOLES_QUANTIQUES]
Frame: Mechanical-mystical border
Technology level: Ancient-future fusion
Power visualization: [EFFET_VISUEL]
```

## 🎨 EXEMPLES CONCRETS

### Exemple 1: URZ-KÔM
```prompt
Create a digital card art in the style of Hearthstone for URZ-KÔM, a legendary hero in AVALON.
Style: Epic fantasy art, highly detailed, dramatic lighting
Composition: Portrait view, character centered
Key elements:
- Massive mystical bear form with glowing runes
- Shaman artifacts and totems floating around
- Temporal energy swirling between forms
Background: Mystical temporal effects, swirling energies
Frame: Ornate golden legendary card frame
Color scheme: Deep forest greens and spiritual purples
Mood: Powerful, shamanic, mysterious
```

### Exemple 2: Brisure Temporelle
```prompt
Create a Hearthstone-style spell card art for "Temporal Fracture", a temporal magic spell.
Style: Mystical, ethereal, high fantasy
Focus: The magical effect itself
Elements:
- Reality shattering like broken glass
- Time streams flowing through cracks
- Quantum symbols and temporal runes
Background: Abstract magical environment
Frame: Purple spell card frame
Energy type: Chrono-quantum energy, blue-purple
```

## 🔧 ZONES POUR LES STATS

### Template de Base
```
┌────────────────┐
│    [COÛT]     │
│  ┌────────┐   │
│  │        │   │
│  │  ART   │   │
│  │        │   │
│  └────────┘   │
│  [NOM]        │
│  [DESCRIPTION]│
│ [ATK] [DEF]  │
└────────────────┘
```

### Zones Réservées
1. **Coût** : Coin supérieur gauche (cercle)
2. **Stats** : Coins inférieurs (losanges)
3. **Description** : Bande inférieure
4. **Nom** : Bande centrale

## 🎮 WORKFLOW

1. **Génération Image**
   - Utiliser le prompt approprié
   - Générer l'image sans stats

2. **Superposition Stats**
   ```javascript
   // Format JSON pour le moteur
   {
     "id": "URZ-KOM-001",
     "name": "URZ-KÔM",
     "cost": 5,
     "attack": "X",  // Calculé par moteur
     "defense": "Y", // Calculé par moteur
     "effects": ["transform", "shamanic_power"],
     "timeline_id": "MAIN-001"
   }
   ```

3. **Intégration**
   - Image → Template de carte
   - JSON → Moteur de combat
   - Affichage dynamique des stats

## 🔄 CYCLE DE CRÉATION

1. **Définir concept**
   - Nom
   - Type (Héros/Sort/Artefact)
   - Effet de base

2. **Générer art**
   - Prompt approprié
   - Ajustements si nécessaire

3. **Préparer template**
   - Zones stats claires
   - Format compatible moteur

4. **Intégrer données**
   - JSON stats
   - Effets spéciaux
   - Liens timeline

## 🎯 PROCHAINES CARTES À GÉNÉRER

1. **Héros Fondateurs**
   - Vince Vega
   - URZ-KÔM
   - GRUT

2. **Sorts Clés**
   - Brisure Temporelle
   - Écho Quantique
   - Paradoxe Contrôlé

3. **Artefacts Essentiels**
   - Cristal d'Avalon
   - Sablier Infini
   - Clé des Mondes

---

*Note: Ces prompts sont optimisés pour la génération d'images cohérentes avec le système de combat. Le moteur calculera et affichera les vraies stats dynamiquement.*