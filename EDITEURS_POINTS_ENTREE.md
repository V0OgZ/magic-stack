# 🎮 POINTS D'ENTRÉE - WORLD EDITORS JOUABLES

## 🌟 ÉDITEURS PRINCIPAUX (LIVE)

### 1. 🛠️ **World Editor React** 
- **URL:** http://localhost:5176/world-editor/
- **VPS:** https://heroesoftime.online/world-editor/
- **Fonction:** Éditeur principal React avec timeline, objets 3D, héros
- **Features:**
  - Timeline temporelle
  - Placement héros/objets
  - Gestion des buffs
  - Export/Import maps
  - Mode Play intégré

### 2. 🗺️ **Workflow Manager**
- **URL:** http://localhost:8000/WORKFLOW_MANAGER.html
- **VPS:** https://heroesoftime.online/WORKFLOW_MANAGER.html
- **Fonction:** Gestionnaire de workflow pour création de maps
- **Features:**
  - Étapes guidées
  - Import/Export JSON
  - Validation des maps
  - Preview en temps réel

### 3. 🎯 **Map Editor 6D Adapter**
- **URL:** http://localhost:8000/MAP_EDITOR_6D_ADAPTER.html
- **VPS:** https://heroesoftime.online/MAP_EDITOR_6D_ADAPTER.html
- **Fonction:** Éditeur HTML avec système 6D complet
- **Features:**
  - Position 6D (x,y,z,t,ψ,σ)
  - Events temps réel
  - Héros, portails, buffs
  - Compatible avec React via events

### 4. 🎮 **Chasse Temporelle (JOUABLE)**
- **URL:** http://localhost:8000/CHASSE_TEMPORELLE_MEGA_MAP.html
- **VPS:** https://heroesoftime.online/CHASSE_TEMPORELLE_MEGA_MAP.html
- **Fonction:** JEU COMPLET - Tu peux jouer directement!
- **Features:**
  - Import des maps créées
  - Gameplay complet
  - Portails temporels
  - Combat TCG intégré

---

## 🚀 ÉDITEURS AVANCÉS (BETA)

### 5. 📍 **Icon Placer Advanced**
- **URL:** http://localhost:8000/MAP_ICON_PLACER_ADVANCED.html
- **Fonction:** Placement précis d'icônes sur les maps
- **Features:**
  - Drag & drop
  - Grille magnétique
  - Layers multiples
  - Export coordonnées

### 6. 🔧 **Mega Editor** 
- **URL:** http://localhost:8000/MEGA_EDITOR.html
- **Fonction:** Éditeur tout-en-un expérimental
- **Features:**
  - Fusion des outils
  - Mode avancé
  - Debug tools

### 7. 🎯 **Hot Game Unified**
- **URL:** http://localhost:8000/HOT_GAME_UNIFIED.html
- **Fonction:** Version unifiée jeu + éditeur
- **Features:**
  - Switch mode Edit/Play
  - Sauvegarde locale
  - Multiplayer ready

---

## 🔗 APP UNIFIED (EN DÉVELOPPEMENT)

### 8. 🌀 **Magic Stack Unified** 
- **URL LOCAL:** http://localhost:5176/
- **Routes disponibles:**
  - `/` - Dashboard
  - `/world-editor` - Éditeur principal
  - `/parity` - Tests de parité 6D
  - `/play` - Mode jeu
  - `/debug` - Tools de debug
- **Status:** En cours d'intégration

---

## 📱 ACCÈS RAPIDE

### Depuis la FRONTPAGE:
```html
https://heroesoftime.online/
```
Boutons disponibles:
- 🎮 **Jouer Maintenant** → Chasse Temporelle
- 🛠️ **World Editor** → React Editor
- 🗺️ **Map Creator** → Workflow Manager
- 🧩 **Plus d'outils** → HTML_INDEX (liste complète)

### Dashboard développeur:
```html
http://localhost:8000/HTML_INDEX.html
```
Liste TOUS les outils disponibles

---

## 🎯 WORKFLOW RECOMMANDÉ

1. **CRÉER une map:**
   - Utilise **World Editor React** ou **Workflow Manager**
   - Export en JSON

2. **TESTER la map:**
   - Import dans **Chasse Temporelle**
   - Joue pour vérifier

3. **AFFINER:**
   - **Icon Placer** pour ajuster les détails
   - **6D Adapter** pour events temporels

4. **PUBLIER:**
   - Export final
   - Deploy sur VPS

---

## 🔧 COMMANDES UTILES

```bash
# Lancer tout localement
./go

# Juste le serveur HTML
python3 -m http.server 8000

# Juste React
cd apps/magic-stack-unified && npm run dev

# Status complet
./autobot_sync.sh

# Ouvrir tous les UIs
open http://localhost:8000/HTML_INDEX.html
```

---

## 💡 NOTES IMPORTANTES

- **World Editor React** = Éditeur principal recommandé
- **Workflow Manager** = Pour créer des maps structurées
- **Chasse Temporelle** = Pour JOUER les maps créées
- **6D Adapter** = Pour la compatibilité HTML/React

Les éditeurs HTML et React partagent le même core 6D, donc les maps sont compatibles entre eux!

---

*Dernière mise à jour: 14 août 2025*
