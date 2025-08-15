# 🎴 **IDÉES CARTES AVEC POUVOIRS RÉELS HEROES OF TIME 6D**

## ⏰ **CARTES TEMPORELLES** (Time Velocity Control)

### 🐌 **"Chronos Ralenti"**
- **Pouvoir** : Force Time Velocity à -0.5 pour 30 secondes
- **Effet visuel** : Héros dans une bulle temporelle, tout ralentit autour
- **Usage** : Esquiver attaques, explorer prudemment
- **Backend** : `/api/hero/apply-perk` avec `temporal_slowdown`

### ⚡ **"Éclair Temporel"** 
- **Pouvoir** : Time Velocity +1.0 pendant 10 secondes
- **Effet visuel** : Héros avec traînées de lumière, mouvement accéléré
- **Usage** : Traverser zones dangereuses rapidement
- **Backend** : `/api/hero/apply-perk` avec `temporal_boost`

### ⏸️ **"Stase Temporelle"**
- **Pouvoir** : Fige Time Velocity à 0.0 pour tout le monde sauf le joueur
- **Effet visuel** : Monde en noir/blanc, seul le héros en couleur
- **Usage** : Résoudre puzzles, positionner stratégiquement
- **Backend** : `/api/magic/cast` avec `TIME_FREEZE`

## 🌀 **CARTES TOPOLOGIQUES** (Non-Euclidean Powers)

### 🍩 **"Portail Torus"**
- **Pouvoir** : Change topology vers "torus" pour la map actuelle
- **Effet visuel** : Portails aux bords de la carte qui se connectent
- **Usage** : Raccourcis géographiques, fuir en boucle
- **Backend** : `/api/map/set-topology` avec `{topology: "torus"}`

### 🌀 **"Ruban de Möbius"**
- **Pouvoir** : Topology "mobius" - retourne l'espace à chaque passage
- **Effet visuel** : Carte qui se retourne avec effet miroir
- **Usage** : Confuser ennemis, géométrie défensive
- **Backend** : `/api/map/set-topology` avec `{topology: "mobius"}`

### 🔗 **"Bouteille de Klein"**
- **Pouvoir** : Topology "klein" - dimension supplémentaire cachée
- **Effet visuel** : Passages qui traversent "à travers" la carte
- **Usage** : Chemins secrets, téléportation
- **Backend** : `/api/map/set-topology` avec `{topology: "klein"}`

## 🌫️ **CARTES FOG & RÉVÉLATION**

### 👁️ **"Œil de GRUT"** 
- **Pouvoir** : Révèle TOUT le Causality Fog sur la carte
- **Effet visuel** : Œil géant 6D qui balaye et dissipe le brouillard
- **Usage** : Vision tactique complète
- **Backend** : `/api/world-state/collapse` sur toute la carte

### 🌪️ **"Tempête Causale"**
- **Pouvoir** : Augmente le Causality Fog partout (niveau de chaos +0.3)
- **Effet visuel** : Tempête violette qui obscurcit la vision
- **Usage** : Cacher ses mouvements, chaos stratégique
- **Backend** : `/api/magic/cast` avec `CHAOS_STORM`

### 📡 **"Scanner WSG"**
- **Pouvoir** : Révèle positions de TOUTES les entités via WSG
- **Effet visuel** : Radar 6D avec points lumineux pour chaque entité
- **Usage** : Détection d'embuscades, tracking
- **Backend** : `/api/panopticon/world-state-graph/nearby` avec radius max

## 🎮 **CARTES TEMPORAL DRIFT**

### 🚗 **"Régulateur de Drift"**
- **Pouvoir** : Reset RPM à 0, évite les mini-games forcés
- **Effet visuel** : Compteur RPM qui redescend avec particules apaisantes
- **Usage** : Éviter interruptions, contrôle du rythme
- **Backend** : `/api/regulation/drift/reset`

### 🎯 **"Drift Volontaire"**
- **Pouvoir** : Déclenche mini-game AU CHOIX (pas aléatoire)
- **Effet visuel** : Menu de sélection stylisé apparaît
- **Usage** : Farmer des rewards spécifiques
- **Backend** : `/api/minigames/start` avec choix du type

### ⚡ **"Overdrive Contrôlé"**
- **Pouvoir** : RPM boost sans déclencher drift (immunity 60s)
- **Effet visuel** : Aura dorée protectrice autour du héros
- **Usage** : Actions rapides sans pénalité
- **Backend** : `/api/regulation/drift/immunity`

## 🛠️ **CARTES CRAFT & ÉCONOMIE**

### 🧪 **"Laboratoire Portable"**
- **Pouvoir** : Craft n'importe où sans aller aux mini-games
- **Effet visuel** : Laboratoire alchimique se matérialise autour du héros
- **Usage** : Craft d'urgence, optimisation temps
- **Backend** : `/api/craft/*` direct sans conditions de lieu

### 💎 **"Transmutation"** 
- **Pouvoir** : Convertit ressources : 3 herbs → 1 essence
- **Effet visuel** : Particules qui se transforment avec effet lumineux
- **Usage** : Optimiser inventaire, obtenir ressources rares
- **Backend** : `/api/economy/transmute`

### 🎒 **"Sac Infini"**
- **Pouvoir** : Inventaire illimité pendant 5 minutes
- **Effet visuel** : Sac mystique qui absorbe tout sans se remplir
- **Usage** : Collecte massive, pas de gestion d'inventaire
- **Backend** : `inventory.setCapacity(Infinity)` temporaire

## ⚔️ **CARTES COMBAT**

### 🛡️ **"Bouclier Causal"**
- **Pouvoir** : Immunité au prochain resolve (esquive automatique)
- **Effet visuel** : Barrière causale scintillante autour du héros
- **Usage** : Protection contre embuscades, exploration sûre
- **Backend** : Flag `causal_immunity` dans hero status

### ⚡ **"Resolve Forcé"**
- **Pouvoir** : Déclenche resolve même sans collision
- **Effet visuel** : Onde de choc causale qui émane du héros
- **Usage** : Forcer combat avec entité spécifique
- **Backend** : `/api/causality/resolve` avec `force: true`

### 🎴 **"Deck Master"**
- **Pouvoir** : Dans TCG, commence avec 2 cartes bonus
- **Effet visuel** : Cartes dorées qui apparaissent dans la main
- **Usage** : Avantage tactique en combat
- **Backend** : Modify TCG starting hand

## 🏃 **CARTES MOUVEMENT**

### 🌟 **"Téléportation 6D"**
- **Pouvoir** : Téléporte à n'importe quel point (x,y,z,t,c,psi)
- **Effet visuel** : Portail dimensionnel qui s'ouvre
- **Usage** : Échapper danger, positionnement tactique
- **Backend** : `/agents/control` avec nouvelles coordonnées

### 👻 **"Phase Walk"**
- **Pouvoir** : Traverse obstacles pendant 15 secondes
- **Effet visuel** : Héros devient translucide, passe à travers
- **Usage** : Raccourcis, éviter terrain difficile
- **Backend** : `movement.setPhasing(true)` temporaire

### 🚀 **"Super Saut"**
- **Pouvoir** : Mouvement en Z (sauter par-dessus montagnes)
- **Effet visuel** : Héros bondit très haut avec traînée
- **Usage** : Franchir obstacles, vue aérienne
- **Backend** : Modification temporaire des `movement_points`

---

## 🎯 **PRIORITÉS POUR IMAGES**

### **🔥 SUPER UTILES**
1. **⏸️ Stase Temporelle** - Pause stratégique
2. **👁️ Œil de GRUT** - Vision totale 6D
3. **🍩 Portail Torus** - Raccourcis géographiques
4. **🛡️ Bouclier Causal** - Protection combat

### **🎮 FUN À JOUER**
1. **🌀 Ruban de Möbius** - Géométrie retournée
2. **🚗 Drift Volontaire** - Contrôle mini-games
3. **🧪 Laboratoire Portable** - Craft nomade
4. **🌟 Téléportation 6D** - Liberté totale

### **⚔️ COMBAT ÉPIQUE**
1. **⚡ Resolve Forcé** - Initier combat
2. **🎴 Deck Master** - Avantage TCG
3. **💎 Transmutation** - Économie avancée
4. **👻 Phase Walk** - Mobilité fantôme

**🌟 Toutes ces cartes correspondent à de VRAIS pouvoirs utilisables dans le gameplay actuel !**
