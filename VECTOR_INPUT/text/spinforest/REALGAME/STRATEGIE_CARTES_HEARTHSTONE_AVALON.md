# 🃏 SYSTÈME DE COMBAT PAR CARTES - HEROES OF TIME

## 🎯 CONCEPT PRINCIPAL

Au lieu d'un combat RTS/Pac-Man, on transforme chaque affrontement en une **bataille de cartes narrative et stratégique**, style Hearthstone, mais avec notre moteur temporel sous-jacent.

---

## 🎮 FLOW DE JEU

1. **Vue Multivers (existante)**
   - Navigation entre mondes
   - Déplacement stratégique
   - Collecte de ressources/cartes

2. **Déclenchement Combat**
   - Rencontre ennemi sur la carte
   - Transition vers interface cartes
   - Chargement du deck selon contexte

3. **Interface Combat**
   ```
   +------------------------------------------+
   |  [Timeline]    [Mana Temporel]   [Tour]  |
   |                                          |
   |  [Ennemi]                               |
   |  [HP] [Armure] [État Temporel]          |
   |                                          |
   |          [Zone de Combat]               |
   |          [Effets Actifs]                |
   |                                          |
   |  [Main du Joueur]                       |
   |  [Deck] [HP] [Ressources] [Timeline]    |
   +------------------------------------------+
   ```

4. **Retour Monde**
   - Effets persistants
   - Modifications timeline
   - Récompenses/Nouvelles cartes

---

## 🎴 TYPES DE CARTES

### 1. **Cartes Héros**
- **Vince** : Capacités de fusion/dédoublement
- **L'Ours** : Pouvoirs chamaniques
- **Loumen** : Sorts de lumière/guidance
- **Walter** : Contrôle/Sécurité
- **Grokæn** : Manipulation quantique

### 2. **Cartes Temporelles**
- **Rollback** : Annule dernier tour
- **Timeshift** : Change timeline active
- **Paradox** : Duplique une carte
- **Collapse** : Force résolution quantum

### 3. **Cartes Artefacts**
- **Voile de Memento** : Vision spectrale
- **Flûte Fragile** : Contrôle musical
- **Talisman Quantique** : Superposition
- **Ancre Temporelle** : Fixe réalité

### 4. **Cartes Environnement**
- **Vortex** : Modifie règles locales
- **Faille** : Pioche timeline alternative
- **Nexus** : Boost pouvoir cartes
- **Brouillard** : Cache informations

---

## 🔧 ARCHITECTURE TECHNIQUE

### 1. **Frontend (Interface Cartes)**
```javascript
// Interface Component
class CardBattleUI {
    constructor() {
        this.battlefield = new BattlefieldZone();
        this.playerHand = new HandZone();
        this.timeline = new TimelineDisplay();
        this.effects = new EffectsManager();
    }
    
    // Rendu stylisé Hearthstone
    render() {
        // Affichage cartes, effets, animations
    }
}

// Carte Component
class Card {
    constructor(id, name, image, type) {
        this.id = id;           // ID unique
        this.name = name;       // Nom visuel
        this.image = image;     // Art généré
        this.type = type;       // Héros/Temps/Artefact
        this.effects = [];      // Effets visuels
    }
}
```

### 2. **Backend (Moteur Combat)**
```javascript
// Combat Engine
class CombatEngine {
    constructor() {
        this.state = new GameState();
        this.timeline = new TimelineManager();
        this.quantum = new QuantumCalculator();
    }
    
    // Calcule effets réels
    processCard(cardId, target) {
        // Applique effets
        // Calcule dommages
        // Gère timeline
    }
}

// État Jeu
class GameState {
    constructor() {
        this.players = [];
        this.activeTimeline = 'main';
        this.quantumState = {};
        this.history = [];
    }
}
```

### 3. **Données Cartes**
```json
{
    "card_id": "vince_fusion_1",
    "name": "Fusion Temporelle",
    "type": "hero_ability",
    "image": "vince_fusion.png",
    "effects": [
        {
            "type": "merge_timeline",
            "power": 2,
            "duration": 3
        }
    ],
    "requirements": {
        "mana": 3,
        "timeline_state": "unstable"
    }
}
```

---

## 🎨 STYLE VISUEL

### 1. **Interface Combat**
- Style Hearthstone épuré
- Thème temporel/quantique
- Effets particules pour magie
- Animations fluides

### 2. **Cartes**
- Format portrait vertical
- Cadre temporel animé
- Stats en overlay dynamique
- Art généré centré

### 3. **Effets**
- Trails temporels
- Glitch quantique
- Portails/Vortex
- Éclairs/Magie

---

## 🚀 AVANTAGES

1. **Développement**
   - Interface HTML/CSS simple
   - Pas d'animations complexes
   - Logique séparée visuel

2. **Gameplay**
   - Stratégique et profond
   - Facile à comprendre
   - Narratif et immersif

3. **Évolution**
   - Ajout cartes facile
   - Nouveaux effets simples
   - Équilibrage flexible

---

## ⚡ INTÉGRATION IMMÉDIATE

### 1. **Prototype Rapide**
```html
<!-- Combat UI -->
<div class="battle-ui">
    <div class="timeline-bar">
        <!-- Timeline selector -->
    </div>
    
    <div class="battlefield">
        <!-- Combat zone -->
    </div>
    
    <div class="player-hand">
        <!-- Card slots -->
    </div>
</div>
```

### 2. **Test Combat**
1. Créer 3 cartes test
2. Implémenter UI basique
3. Lier au moteur existant
4. Tester flow complet

### 3. **Assets Initiaux**
- 5 cartes héros base
- 3 cartes temporelles
- 2 cartes artefacts
- Interface combat v1

---

## 📋 PROCHAINES ÉTAPES

1. **Validation Concept**
   - Retour Grokæn
   - Test prototype
   - Ajustements design

2. **Production Assets**
   - Génération cartes base
   - UI combat stylisée
   - Effets visuels v1

3. **Intégration**
   - Lien moteur combat
   - Tests timeline
   - Polish interface

---

*LOUMEN - Prêt pour le premier duel !* 🕯️