# 🎮 GUIDE INTÉGRATEUR - Système d'Assets V2

## 📋 Vue d'ensemble

J'ai mis en place un nouveau système d'assets complet dans `/hot/assets/`. Tu dois maintenant adapter les contrôleurs et composants React pour utiliser ces nouvelles références.

---

## 🆕 Nouveaux champs obligatoires dans tous les JSONs

Chaque entité (héros, créature, artefact, sort, etc.) a maintenant :

```json
{
  "icon_id": "🧙‍♂️",           // Emoji ou référence OpenMoji
  "fx_preset": "quantum_phase", // Référence vers fx_presets.json
  "sound_event": "magic_cast",  // Référence vers sound_events.json
  "theme_color": "#9932CC",     // Couleur principale
  "output_modes": {
    "literary": "Description poétique longue",
    "runic": "ᚱᚢᚾᛁᚲ᛫ᛏᛖᚲᛊᛏ",
    "iconic": "🧙‍♂️⏳✨"
  }
}
```

---

## 📁 Structure des assets

```
/hot/assets/
├── assets_catalog.json         # Catalogue central
├── openmoji_complete_catalog.json  # 88 icônes pour cartes
├── sounds/
│   └── sound_events.json      # Définitions des sons
├── fx/
│   └── fx_presets.json        # Presets d'effets visuels
└── MAP_ICON_PLACER_ADVANCED.html  # À intégrer dans EditorView.tsx
```

---

## 🔧 Ce que tu dois adapter

### 1. **Composants React - Affichage des icônes**

```typescript
// Dans tes composants de cartes/entités
interface EntityDisplay {
  icon_id: string;      // Utilise ça pour afficher l'icône
  theme_color: string;  // Pour les bordures/backgrounds
  fx_preset: string;    // Pour déclencher les animations
}

// Exemple dans HeroCard.tsx
<div className="hero-card" style={{borderColor: hero.theme_color}}>
  <span className="hero-icon">{hero.icon_id}</span>
  {/* Applique fx_preset au hover/click */}
</div>
```

### 2. **Audio System - Sons courts**

```typescript
// Créer un AudioManager
class AudioManager {
  private sounds: Map<string, HTMLAudioElement>;
  
  async loadSoundEvents() {
    const events = await fetch('/hot/assets/sounds/sound_events.json');
    // Précharger les fichiers .ogg/.m4a
  }
  
  playSound(eventName: string) {
    // Max 400ms, non-bloquant
    const sound = this.sounds.get(eventName);
    if (sound) {
      sound.volume = soundConfig.volume;
      sound.play();
    }
  }
}

// Utilisation
audioManager.playSound(entity.sound_event);
```

### 3. **FX System - Animations légères**

```typescript
// Appliquer les presets depuis fx_presets.json
interface FXPreset {
  type: 'scale' | 'shake' | 'particle' | 'filter' | ...;
  duration_ms: number;
  params: any;
}

// CSS généré dynamiquement
function applyFX(element: HTMLElement, presetName: string) {
  const preset = fxPresets[presetName];
  switch(preset.type) {
    case 'pulse':
      element.classList.add('fx-pulse');
      break;
    case 'shake':
      // Appliquer animation shake
      break;
    // ...
  }
}
```

### 4. **Mode d'affichage - output_modes**

```typescript
// Switcher entre les modes
enum DisplayMode {
  LITERARY = 'literary',  // Descriptions longues
  RUNIC = 'runic',       // Texte runique
  ICONIC = 'iconic'      // Emojis seulement
}

// Dans tes composants
function EntityDescription({entity, mode}: Props) {
  return <span>{entity.output_modes[mode]}</span>;
}
```

### 5. **Map Icon Placer - INTÉGRATION IMPORTANTE**

Le fichier `MAP_ICON_PLACER_ADVANCED.html` contient un éditeur de carte complet avec :
- 88 icônes OpenMoji catégorisées
- Drag & drop
- Export JSON
- Générateur aléatoire

**Tu dois l'intégrer dans `EditorView.tsx` :**

```typescript
// EditorView.tsx
import openmojiCatalog from '/hot/assets/openmoji_complete_catalog.json';

function EditorView() {
  // Reprendre la logique de MAP_ICON_PLACER_ADVANCED.html
  // - Grille hexagonale
  // - Placement d'icônes
  // - Categories (terrain, structures, resources...)
  // - Export/Import
}
```

---

## 🎯 Priorités d'intégration

1. **AudioManager** - Pour feedback immédiat
2. **Icônes dans les cartes** - Visuel principal  
3. **FX sur actions** - Polish
4. **Map Editor dans React** - Fonctionnalité critique
5. **Output modes** - Accessibilité

---

## 📝 Exemples de code à adapter

### Backend Java - Ajouter les champs
```java
public class Hero {
    private String iconId;
    private String fxPreset;
    private String soundEvent;
    private String themeColor;
    private OutputModes outputModes;
    // getters/setters
}
```

### Backend Rust - Structure mise à jour
```rust
#[derive(Serialize, Deserialize)]
struct Entity {
    icon_id: String,
    fx_preset: String,
    sound_event: String,
    theme_color: String,
    output_modes: OutputModes,
}
```

### Python - Indexation Vector DB
```python
# J'ai déjà fait update_vector_db_hot_content.py
# Il indexe tous ces nouveaux champs pour Clippy
```

---

## ✅ Checklist d'intégration

- [ ] AudioManager créé et connecté
- [ ] Icônes affichées dans tous les composants
- [ ] FX presets appliqués aux interactions
- [ ] MAP_ICON_PLACER intégré dans EditorView.tsx
- [ ] Output modes switchables dans l'UI
- [ ] Backends mis à jour avec nouveaux champs
- [ ] Tests de son (<400ms, non-bloquants)
- [ ] Tests des animations FX

---

## 🤝 Coordination

**Mon travail (Archéologue) :**
- ✅ Créé tous les catalogues JSON
- ✅ Défini sound_events et fx_presets
- ✅ Mis à jour des exemples de héros avec les nouveaux champs
- ✅ Créé MAP_ICON_PLACER_ADVANCED.html comme référence

**Ton travail (Intégrateur) :**
- Intégrer dans React
- Connecter AudioManager
- Implémenter FX system
- Adapter les contrôleurs backend
- Migrer MAP_ICON_PLACER dans EditorView

---

## 💡 Notes importantes

1. **Sons** : TOUJOURS < 400ms, mono, .ogg ou .m4a
2. **FX** : Légers, CSS/Canvas seulement, pas de libs lourdes
3. **Icônes** : OpenMoji SVG pour la carte, emojis pour le reste
4. **Performance** : Précharger les assets au démarrage

Bonne intégration ! 🚀
