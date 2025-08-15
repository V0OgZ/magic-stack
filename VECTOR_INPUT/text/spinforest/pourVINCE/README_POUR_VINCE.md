# 📖 GUIDE COMPLET POUR VINCENT

## 🎮 COMMENT JOUER TOUT DE SUITE

### Option 1 : Le plus simple
```bash
cd REALGAME
open play.html
```

### Option 2 : Avec le launcher
```bash
cd REALGAME
./LAUNCH_REALGAME_FINAL.sh
# Choisir option 1
```

---

## 🎯 QU'EST-CE QUE C'EST ?

**REALGAME** est le jeu final d'Avalon qu'on a créé ensemble. C'est un jeu style **Heroes of Might and Magic 3** avec :
- Exploration en vue isométrique
- Combat en temps réel
- Portails interdimensionnels (BRISURE)
- NPCs et dialogues
- Items et magie

---

## 🕹️ COMMENT ON JOUE ?

### Contrôles de base
- **WASD ou Flèches** : Te déplacer sur la carte
- **Clic souris** : Attaquer un ennemi proche
- **E** : Parler/Interagir avec ce qui est proche
- **1-5** : Utiliser tes items
  - 1 = Épée (attaque bonus)
  - 2 = Bouclier (défense)
  - 3 = Sort magique
  - 4 = Potion (soigne)
  - 5 = **Gun de Vince Vega** (CRÉE DES PORTAILS !)

### Mécaniques principales

#### 🌀 **Les Portails BRISURE**
- **Violet** : Portail standard (coûte 25 énergie)
- **Rose** : Vortex temporel (coûte 40 énergie)
- **Gun de Vince** : Appuie sur 5 pour créer un nouveau portail !
- L'énergie se régénère automatiquement

#### ⚔️ **Le Combat**
- Clique sur un ennemi proche pour l'attaquer
- Dégâts : 10-30 points aléatoires
- Quand tu tues : +20 Mana

#### 🗣️ **Les NPCs**
- **Merlin** : Le mage qui donne des conseils
- **URZ-KÔM** : L'ours quantique qui grogne et chante

#### 🏰 **Les Lieux**
- **Château d'Avalon** : Point de repère principal
- **Église Mystique** : Lieu sacré
- **Coffres** : Trésors cachés (+50 Mana)
- **Épée Légendaire** : Objet de quête

---

## 👥 QUI A FAIT QUOI ?

### 🎯 **SID MEIER** (Moi)
**Rôle** : Chef de projet & Navigation interdimensionnelle
**J'ai créé** :
- Le système BRISURE (navigation entre dimensions)
- Les portails et leurs effets
- L'intégration finale du jeu
- La documentation et l'organisation

**Mes fichiers** :
```
REALGAME/core/navigation/
├── brisure-navigator.js    # Système de navigation
├── portal-system.js         # Gestion des portails
└── map-layer-controller.js  # Effets visuels (fog, phasing)
```

### 🧠 **GROKÆN** (IA Combat)
**Rôle** : Systèmes de combat et mondes flottants
**Il a créé** :
- Le système de combat temps réel
- Les îles flottantes
- Les particules et effets visuels
- L'intégration avec le backend

**Ses fichiers** :
```
REALGAME/systems/combat/
├── unified-combat.js        # Combat unifié
└── combat-effects.js        # Effets visuels combat
```

### 🕯️ **LOUMEN** (IA Narration)
**Rôle** : Histoire, dialogues et interface
**Elle a créé** :
- Le système de dialogues
- Les scénarios narratifs
- Le moteur isométrique de base
- L'interface utilisateur

**Ses fichiers** :
```
REALGAME/core/narrative/
├── dialogue-system.js       # Système de dialogues
└── story-parser.js          # Parser d'histoires
```

### 🐻 **URZ-KÔM** (IA Physique)
**Rôle** : Physique quantique et effets spéciaux
**Il va créer** :
- Particules quantiques
- Gravité variable
- Combat quantique
- Vue 6D du multivers

**Ses fichiers** :
```
REALGAME/core/physics/
├── quantum-physics-preview.js  # Preview des effets
└── (à venir)
```

---

## 📁 STRUCTURE DES DOSSIERS

```
SpinForest/
│
├── REALGAME/                    # 🎮 LE JEU PRINCIPAL
│   ├── play.html               # Le jeu jouable !
│   ├── index.html              # Hub principal
│   ├── heroes-selector.html    # Sélection des héros
│   ├── core/                   # Systèmes principaux
│   ├── systems/                # Systèmes secondaires
│   ├── maps/                   # Cartes et niveaux
│   ├── scenarios/              # Scénarios HOTS
│   ├── heroes/                 # Données des héros
│   ├── assets/                 # Images et ressources
│   └── FromVINCE/              # Tes images !
│
├── AVALON/                      # Le monde magique
│   └── 🏠 HOME/                # Maisons des entités
│       ├── 🎯 SID_MEIER/       # Ma maison
│       ├── 🧠 GROKÆN/          # Maison de Grok
│       ├── 🕯️ LUMEN/           # Maison de Lumen
│       └── 🐻 URZ-KÔM/         # Maison de l'ours
│
├── frontend/                    # Anciens frontends
│   ├── brisure-navigator.html  # Mon navigateur 3D
│   └── index.html              # Frontend reconstruit
│
├── spells/stack/               # Sous-module magic-stack
│   └── grimoire/               # Sorts JSON
│
└── pourVINCE/                  # 📚 CETTE DOCUMENTATION !
```

---

## 🔧 ARCHITECTURE TECHNIQUE

### Frontend (Ce que tu vois)
- **HTML5 Canvas** : Pour le rendu du jeu
- **JavaScript Vanilla** : Pas de framework, du pur JS
- **CSS3** : Animations et styles dark fantasy

### Backend (API WALTER)
- **Port** : 8080
- **Endpoint principal** : `/api/magic-formulas/execute`
- **Health check** : `/actuator/health`
- **Statut** : ✅ Opérationnel

### Systèmes de jeu
1. **Game Loop** : 60 FPS, rendu canvas
2. **État global** : Objet `gameState` centralisé
3. **Caméra** : Suit le joueur automatiquement
4. **Collision** : Détection par distance
5. **Inventaire** : 5 slots d'items

---

## 🚀 COMMENT LANCER CHAQUE PARTIE

### 1. Le jeu principal
```bash
open REALGAME/play.html
```

### 2. Le dashboard Avalon
```bash
open AVALON_DARK_FANTASY_DASHBOARD.html
```

### 3. Le navigateur BRISURE (3D)
```bash
open frontend/brisure-navigator.html
```

### 4. La démo Bootstrap
```bash
open BOOTSTRAP_POCKET_INSTANCE_V2.html
```

### 5. Le backend (si besoin)
```bash
# Terminal 1 : Backend Spring Boot
cd /chemin/vers/backend
./gradlew bootRun

# Terminal 2 : Frontend Python
python3 -m http.server 8000
```

---

## 💡 ASTUCES DE JEU

1. **Commence par explorer** autour du château
2. **Parle à Merlin** pour des conseils
3. **Économise ton énergie** pour les portails importants
4. **Le Gun de Vince** (touche 5) est OP - crée des portails n'importe où !
5. **Les ennemis** donnent du mana quand tu les tues
6. **Les coffres** = full mana instantané

---

## 🐛 SI ÇA BUG

### Le jeu ne se lance pas
- Ouvre directement `REALGAME/play.html` dans Chrome/Firefox

### Les images ne s'affichent pas
- Vérifie que tu es bien dans le dossier SpinForest

### Le backend ne répond pas
- C'est normal, on a des simulations pour la plupart des features

### Performance lente
- Ferme d'autres onglets
- Le jeu utilise beaucoup de particules

---

## 📝 RÉSUMÉ RAPIDE

**Pour jouer** : `open REALGAME/play.html`  
**Contrôles** : WASD + Souris + E + 1-5  
**Objectif** : Explorer, combattre, utiliser les portails  
**Feature cool** : Gun de Vince (touche 5) = créer des portails !

**L'équipe** :
- Sid (moi) = Navigation/Portails
- Grokæn = Combat/Action
- Loumen = Histoire/Dialogues  
- Urz-Kôm = Physique (en cours)

---

## 🎉 AMUSE-TOI BIEN !

Le jeu est là pour être exploré. N'hésite pas à :
- Créer plein de portails avec le Gun
- Explorer toute la carte
- Combattre tous les ennemis
- Parler aux NPCs

**Bon jeu Vincent !** 🎮🔥