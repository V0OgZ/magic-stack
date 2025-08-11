# 🎮 UNIFIED MAP SYSTEM - GUIDE D'UTILISATION

## 🚀 ACCÈS RAPIDE

**URL:** http://localhost:5176/unified

## 🎯 CONCEPT : L'ÉDITEUR EST LE JEU !

Vincent a eu LA vision : on ne sépare plus l'éditeur du jeu. C'est UN SEUL système où tu peux :
1. Créer ton monde (Structure)
2. Placer tes ressources (Resources) 
3. Définir la timeline (Timeline)
4. Cliquer PLAY et jouer directement !

## 📊 LES 5 MODES

### 🏗️ Mode Structure
- Dessine ton monde hexagonal
- Peins les terrains (herbe, forêt, montagne, eau, désert, neige, lave, vide)
- Crée des régions nommées
- Taille du pinceau ajustable (1-9)

### 💎 Mode Resources  
- Place héros, créatures, artefacts
- Position 6D complète (x, y, z, temps, causalité, quantum)
- Connexions entre ressources (temporelles, causales, quantiques)
- Intégration avec MapIconPlacerV2

### ⏳ Mode Timeline
- Définis les événements temporels
- Spawn d'entités à des jours précis
- Événements répétitifs
- Conditions et déclencheurs

### 🌌 Mode Overlay
- TOUS les layers superposés avec transparence
- Structure + Resources + Timeline visible
- Pour voir l'ensemble de ta création

### 🎮 Mode Play
- Lance DIRECTEMENT le jeu avec ta map !
- Les ressources placées deviennent des unités jouables
- Timeline active avec événements
- Fin de tour, déplacement, combat

## 🔧 FONCTIONNALITÉS CLÉS

### Sauvegarde/Chargement
- **Local:** Sauvegarde automatique dans localStorage
- **Backend:** Sauvegarde sur serveur (port 8080)
- **Export:** Télécharge world + map en JSON
- **Import:** Charge un bundle complet
- **Interstice:** Upload vers l'Interstice magique

### Assets Intégrés
Tous les assets de VECTOR_DB_ASSETS sont disponibles :
- **Héros:** Jean Grofignon, Arthur, Merlin, GROKÆN, Anna...
- **Créatures:** Dragon Rouge, Phénix, Licorne, Archange...
- **Artefacts:** Excalibur Ultimate, Tesseract Prison...
- **Formules:** Temporal Shift, Quantum Collapse, Causal Fork...

### Position 6D
Chaque entité a une position complète :
- **X, Y:** Position spatiale
- **Z:** Altitude/Profondeur  
- **T:** Temps (timeline)
- **C:** Causalité
- **Ψ:** Quantum (probabilité 0-1)

### Énergie Complexe
Les entités avancées ont une énergie complexe :
- **A:** Amplitude (0-100)
- **Φ:** Phase (-180 à 180)

## 🎮 WORKFLOW TYPE

1. **Créer un World**
   - Mode Structure
   - Peindre le terrain hexagonal
   - Définir les régions

2. **Placer les Resources**
   - Mode Resources
   - Ajouter héros, créatures, bâtiments
   - Créer des connexions

3. **Configurer la Timeline**
   - Mode Timeline
   - Ajouter événements temporels
   - Définir les spawns

4. **Tester**
   - Cliquer "PLAY THIS MAP"
   - Jouer directement !
   - Revenir à l'éditeur pour ajuster

5. **Sauvegarder**
   - Export JSON pour partage
   - Upload vers Interstice
   - Sauvegarde automatique locale

## 🔌 SERVICES CONNECTÉS

- **Backend Rust (3001):** Structure & validation
- **Backend Java (8080):** Interstice & formules
- **Vector DB (5001):** Assets & recherche
- **WebSocket (8001):** Temps réel & sync

## 🎯 RACCOURCIS

- **Tab:** Switch rapide entre modes
- **Ctrl+S:** Sauvegarder
- **Ctrl+E:** Export
- **Ctrl+P:** Play map
- **Mouse Wheel:** Zoom
- **Click & Drag:** Pan

## 💡 TIPS

1. **Commencer petit:** Monde 20x20 pour tester
2. **Utiliser l'Overlay:** Pour voir toutes les dimensions
3. **Timeline progressive:** Événements tous les 5 jours
4. **Connexions causales:** Créent des quests automatiques
5. **Mode Play:** Test rapide sans recharger

## 🚀 FEATURES AVANCÉES

### Régulateurs V2
- **Vince:** Stabilisation temporelle
- **Anna:** Decay progressif
- **Overload:** Stack de surcharge

### Paradoxes Temporels
- Détection automatique
- Visualisation en overlay
- Résolution par formules

### Multiplayer (À venir)
- Maps partagées via Interstice
- Sync temps réel WebSocket
- 8 joueurs simultanés

## 🎨 CUSTOMISATION

Le système est extensible :
- Nouveaux types de terrain
- Assets personnalisés
- Formules custom
- Modes de jeu additionnels

---

*"L'éditeur EST le jeu. Le jeu EST l'éditeur. TOUT est lié en 6D."*
- Vincent, Jour 33 🚀
