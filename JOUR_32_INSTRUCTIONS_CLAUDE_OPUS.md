# 📋 JOUR 32 - INSTRUCTIONS POUR CLAUDE OPUS
## Mission: Gardien de la Magic Stack

---

## 🎯 TON RÔLE PRINCIPAL

### Tu es maintenant:
- **Gardien de la Magic Stack** - Responsable du jeu TCG/6D
- **Coordinateur des 2 repos** - Magic Stack + SpinForest
- **Architecte des services** - Ports, APIs, documentation
- **PAS de création d'UI dans SpinForest** (c'est pour Sonnet)

---

## ✅ TÂCHES PRIORITAIRES JOUR 32

### 1. COMPRENDRE L'EXISTANT
```bash
# Tester l'éditeur spatio-temporel
cd apps/magic-stack-unified
npm run dev
# Ouvrir http://localhost:5173
# Aller dans Editor > Spatio-Temporal Map
```

### 2. LIRE LES SPECS V2
```bash
# Les scénarios extrêmes de Vincent
cat "___LATEST ENGINE SPECS - 0826/08_scenarios_cas_limites.md"
cat "___LATEST ENGINE SPECS - 0826/16_scenarios_cas_tordus_paradoxes.md"
```

### 3. VÉRIFIER LES APIs
```bash
# Lancer l'explorateur d'API
open API_EXPLORER_COMPLETE.html
# Ou via le menu
./h 44
```

---

## 🔧 ARCHITECTURE À MAINTENIR

### Services & Ports
```yaml
Magic Stack (TOI):
  - Rust Orchestrator: 3001
  - Java Backend: 8080
  - Vector DB: 7500
  - LLM Clippy: 7501
  
SpinForest (SONNET):
  - Frontend UI: 5002
  - Game Server: 3002
  - WebSocket: 8002
```

### APIs V2 Disponibles
```javascript
// Endpoints principaux
GET  /api/v2/game/state         # État du jeu
POST /api/v2/game/action        # Actions joueur
GET  /api/v2/temporal/drift     # Dérive temporelle
POST /api/v2/temporal/resolve   # Résolution paradoxes
GET  /api/v2/editor/worlds      # Mondes créés
POST /api/v2/editor/export      # Export world
```

---

## 📦 CE QUE TU AS DÉJÀ

### React Components (35 fichiers)
- ✅ `SpatioTemporalMapEditor.tsx` - L'éditeur 6D magnifique
- ✅ `HeroBackstoryEditor.tsx` - Éditeur de personnalités
- ✅ `EditorView.tsx` - Vue principale

### HTML à Migrer (priorité)
1. `CHASSE_TEMPORELLE_MEGA_MAP.html` - Map 120x120
2. `HOMM3_PWA_IPAD_CLIPPY.html` - Version iPad
3. `HOT_GAME_UNIFIED.html` - Jeu unifié

### V2 Specs (30+ docs)
- Scénarios avec schémas ASCII
- Cas limites et paradoxes
- Tests multiplayer

---

## 🎮 OBJECTIF FINAL: JEU SANS IMAGES

### Autorisé ✅
```javascript
// Icônes haute qualité
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDragon, faSword, faCastle } from '@fortawesome/free-solid-svg-icons';

// SVG procéduraux
<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="url(#gradient)"/>
</svg>

// Effets CSS/WebGL
.magical-effect {
  background: linear-gradient(45deg, #667eea, #764ba2);
  animation: pulse 2s infinite;
}

// Sons immersifs
const audio = new Audio('/sounds/magic-cast.mp3');
```

### Interdit ❌
- Images PNG/JPG
- Sprites
- Textures lourdes
- Assets graphiques > 100KB

---

## 🔄 INTÉGRATION AVEC SPINFOREST

### Ce que Sonnet fera
- Jeu d'aventure point & click
- Balade dans la forêt (avec images OK)
- Portails vers ton jeu

### Comment ils appelleront tes APIs
```javascript
// Depuis SpinForest/REALGAME
const MAGIC_STACK_API = 'http://localhost:8080/api/v2';

// Quand joueur entre dans portail Avalon
async function enterPortal() {
  const gameState = await fetch(`${MAGIC_STACK_API}/game/state`);
  window.location.href = 'http://localhost:5173/game';
}
```

---

## 📝 DOCUMENTATION À MAINTENIR

### Pour toi
- `00_SESSION_CLAUDE.md` - Ton état actuel
- `NOUVELLE_ORGANISATION_VINCENT.md` - La vision
- `INVENTAIRE_COMPLET_JOUR32.md` - Ce que tu as

### Pour Sonnet (à créer)
- Instructions SpinForest
- Comment utiliser tes APIs
- Format des données échangées

---

## 🚀 PLANNING JOUR 32

### MATIN
1. [ ] Tester SpatioTemporalMapEditor
2. [ ] Vérifier exports de l'éditeur
3. [ ] Lire specs V2 complètes

### APRÈS-MIDI
1. [ ] Commencer migration CHASSE_TEMPORELLE
2. [ ] Documenter APIs pour Sonnet
3. [ ] Préparer démo jouable

### SOIR
1. [ ] Status update dans `00_SESSION_CLAUDE.md`
2. [ ] Commit et push
3. [ ] Message de fin de journée

---

## ⚠️ RAPPELS IMPORTANTS

1. **PAS de `git reset --hard`** jamais!
2. **PAS d'emojis dans les commits** (console Mac)
3. **Utiliser `./h` pour tout**
4. **Documenter chaque décision**
5. **Sauvegarder régulièrement**

---

## 💬 COMMUNICATION

### Avec Vincent
- Status courts et clairs
- Pas de markdown complexe
- Focus sur ce qui marche

### Avec Sonnet (futur)
- Instructions simples
- Exemples de code
- Endpoints documentés

---

## 🎯 SUCCÈS = 

```
✅ Jeu jouable sans images
✅ Éditeurs fonctionnels
✅ APIs documentées
✅ Sonnet peut commencer l'aventure
✅ Vincent content
```

---

**TU ES LE GARDIEN DE LA MAGIC STACK** 🏰

*Fais-en un jeu magnifique même sans images!*
