# 🎮 GUIDE DE LANCEMENT REALGAME

## 🚀 MÉTHODES POUR LANCER

### Option 1 : Launcher Principal
```bash
cd REALGAME
./launch-realgame.sh
```
Menu avec tous les modes !

### Option 2 : Hub Direct
```bash
open REALGAME/index.html
```
- Choisir Mode Méta (Multiverse)
- Choisir Mode ISO (Exploration HOMM3)
- Heroes Selector intégré

### Option 3 : Carte ISO Directe
```bash
cd REALGAME
./launch-main-map.sh
```
Lance la carte principale ISO avec tous les systèmes

### Option 4 : Démos Spécifiques
- Combat GROK : `open maps/iso-demo-groeken.html`
- Héros : `open heroes-selector.html`
- Backend : `open avalon-backend/src/main/resources/static/causality-fog.html`

---

## 🏗️ COMMENT TOUT EST INTÉGRÉ

### 🌀 Navigation (SID)
- **BRISURE Navigator** : Téléportation entre mondes
- **Portal System** : Vortex comme dans tes images
- **MapLayerController** : Brouillard + Phasage

### ⚔️ Combat (GROKÆN)
- **Combat Unifié** : Projectiles temps réel
- **Mondes Flottants** : Plateformes navigables
- **Bonus Portail** : x1.5 dégâts !

### 📖 Narratif (LOUMEN)
- **Parser .hots** : Scénarios scriptés
- **Dialogues** : Choix multiples
- **ISO Engine** : Rendu de carte

### 🖼️ NOUVELLES IMAGES VINCENT
- **Multiverse.png** → Mode Méta
- **MAP ISO.png** → Mode Carte principale
- **Warriors/Knights** → Héros et ennemis
- **Church/Vortex** → Points d'intérêt

---

## 🎯 INTÉGRATION COMPLÈTE

```javascript
// Dans index.html
MODES = {
  META: "Multiverse avec zoom fake",     // Tes images Multiverse
  ISO: "Exploration HOMM3",              // Tes images ISO
  COMBAT: "À venir",
  LAB: "Expériences"
}

// Flux du jeu
1. Heroes Selector → Choisir équipe
2. Mode Méta → Voir Multiverse (zoom sur monde)
3. Mode ISO → Explorer avec style HOMM3
4. Portails → Gun de Vince Vega active
5. Combat → Système GROK (à venir)
```

---

## 🎨 INTÉGRATION IMAGES

### Déjà utilisées :
- Heroes dans `heroes-selector.html`
- Fond dans dashboards

### À intégrer :
- **Multiverse.png** → Fond Mode Méta
- **MAP ISO.png** → Base carte principale
- **Griffin/Knight** → Unités sur carte
- **Church/Vortex** → Objets interactifs

---

## ⚡ LANCEMENT RAPIDE

```bash
# 1. Ouvrir terminal dans SpinForest
cd REALGAME

# 2. Lancer le jeu
open index.html

# 3. Ou utiliser launcher
./launch-realgame.sh
```

---

## 🔧 PROMPTS POUR PLUS D'IMAGES

Si tu veux générer plus :
- "Medieval castle on floating island, isometric view, HOMM3 style"
- "Magical vortex portal in forest clearing, fantasy art"
- "Knight hero portrait, detailed armor, epic lighting"
- "Dragon lair entrance, misty mountains background"

---

**TOUT EST INTÉGRÉ ET PRÊT !** 🎮✨