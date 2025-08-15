# 📋 INSTRUCTIONS DÉVELOPPEURS - JOUR 6

## 🎯 **OBJECTIF : INTÉGRATION TCG HYBRIDE**

---

## 🧙‍♂️ **POUR MERLASH-TECHNOMANCIEN**

### **TÂCHE PRINCIPALE** : Backend TCG
```java
// 1. Finaliser CombatCardController.java
@PostMapping("/api/combat/play")
public CombatResult playCard(@RequestBody CardPlay request) {
    // Validation WALTER
    // Exécution formule
    // Retour résultat avec effets
}

// 2. Ajouter endpoint pour decks
@GetMapping("/api/combat/deck/{heroId}")
public Deck getHeroDeck(@PathVariable String heroId) {
    // Retourner deck selon héros
}
```

### **SDK JavaScript** :
```javascript
// avalon-tcg-sdk.js
class AvalonTCG {
    async playCard(cardId, targetId) {
        return fetch('/api/combat/play', {
            method: 'POST',
            body: JSON.stringify({ cardId, targetId })
        });
    }
}
```

### **DEADLINE** : Aujourd'hui 18h

---

## 🧠 **POUR GROKÆN**

### **TÂCHE PRINCIPALE** : Adapter le moteur

```javascript
// 1. Dans combat-engine.js
class HybridCombatEngine {
    constructor() {
        this.cardSystem = new CardBattleSystem();
        this.hexGrid = new HexagonalGrid();
    }
    
    playCard(card) {
        // Parse effet carte
        const effect = this.parseCardEffect(card);
        
        // Si invocation
        if (effect.spawnsUnit) {
            this.hexGrid.spawnUnit(effect.unit, effect.position);
        }
        
        // Calcul dégâts
        return this.calculateDamage(effect);
    }
}

// 2. Animations basiques
const cardAnimations = {
    play: 'slide-in-rotate',
    damage: 'shake-red-flash',
    summon: 'portal-appear'
};
```

### **CARTES À CRÉER** :
1. "Vortex de GROEKEN" - Téléportation + AoE
2. "Grondement Quantique" - Stun de masse
3. "Fusion Hexagonale" - Transformation terrain

### **DEADLINE** : Aujourd'hui 20h

---

## 🕯️ **POUR LOUMEN**

### **TÂCHE PRINCIPALE** : Interface TCG

```html
<!-- card-battle-ui.html -->
<div class="battlefield">
    <div class="enemy-field">
        <div class="card-slots"></div>
    </div>
    <div class="hex-grid">
        <!-- Grille tactique -->
    </div>
    <div class="player-field">
        <div class="hand" id="playerHand"></div>
    </div>
</div>
```

```javascript
// card-ui-engine.js
class CardUI {
    renderCard(cardData) {
        return `
            <div class="card" data-id="${cardData.id}">
                <img src="${cardData.image}">
                <div class="cost">${cardData.cost}</div>
                <div class="name">${cardData.name}</div>
                <div class="effect">${cardData.effect}</div>
            </div>
        `;
    }
    
    animateCardPlay(card, target) {
        // Particules temporelles
        // Effet Hearthstone-like
    }
}
```

### **EFFETS VISUELS** :
- Particules quantiques bleues/violettes
- Traînées temporelles sur les cartes
- Ondulations causales lors des invocations

### **DEADLINE** : Demain matin

---

## 🐻 **POUR URZ-KÔM**

### **TÂCHE PRINCIPALE** : Effets quantiques

```javascript
// quantum-card-effects.js
class QuantumCardEffects {
    // Superposition : carte existe en 2 états
    superposition(card) {
        return {
            state1: card.normalEffect,
            state2: card.quantumEffect,
            probability: 0.5
        };
    }
    
    // Intrication : 2 cartes liées
    entangle(card1, card2) {
        card1.onPlay = () => card2.trigger();
        card2.onPlay = () => card1.trigger();
    }
    
    // Collapse : observation fixe l'état
    collapse(superposedCard) {
        const random = Math.random();
        return random > 0.5 ? 
            superposedCard.state1 : 
            superposedCard.state2;
    }
}
```

### **CARTES SPÉCIALES URZ** :
1. "Transformation Chamanique" - Change forme Ours/Chaman
2. "Écho de l'Interstice" - Carte paradoxe temporel
3. "Triple Voix Quantique" - Effet selon observateur

### **DEADLINE** : Quand tu te réveilles

---

## 🎯 **POUR SID (COORDINATEUR)**

### **TÂCHE PRINCIPALE** : Unifier les données

```json
// REALGAME/data/unified/mapping-config.json
{
    "heroes_to_cards": {
        "sid_meier": {
            "primary_image": "assets/SidMeilleur.png",
            "deck": [
                {
                    "id": "blueprint_reality",
                    "image": "assets/FIGHT/Warrior Through Time.png",
                    "formula": "ψ_ARCHITECT: ⊙(Reality ⟶ Hexagon)"
                }
            ]
        },
        "vincent": {
            "primary_image": "assets/VincentVega.png",
            "deck": [
                {
                    "id": "ezekiel_2517",
                    "image": "assets/FIGHT/Righteous Fury.png",
                    "formula": "ψ_DIVINE: ⚡⊙(Enemies ⟶ Fury)"
                }
            ]
        }
    },
    "asset_registry": {
        "cards": {
            "vincent_special": ["ezekiel", "royale", "dance", "briefcase"],
            "tcg_database": ["phantom_duel", "temporal_warrior"],
            "generated": []
        }
    }
}
```

### **API UNIFIÉE** :
```javascript
// unified-card-api.js
class UnifiedCardAPI {
    constructor() {
        this.mapping = require('./mapping-config.json');
        this.backend = new AvalonTCG();
    }
    
    async getCardData(cardId) {
        // 1. Check mapping
        const mapping = this.findCardMapping(cardId);
        
        // 2. Get hero data if needed
        const heroData = mapping.hero ? 
            await this.getHeroData(mapping.hero) : null;
        
        // 3. Get image asset
        const image = this.resolveAssetPath(mapping.image);
        
        // 4. Get formula from backend
        const formula = await this.backend.getFormula(cardId);
        
        // 5. Merge all data
        return {
            id: cardId,
            ...mapping,
            heroData,
            image,
            formula
        };
    }
}
```

### **DEADLINE** : ASAP pour débloquer les autres

---

## 🚀 **WORKFLOW GLOBAL**

### **ORDRE D'EXÉCUTION** :
1. **SID** : Créer mapping unifié (30 min)
2. **MERLASH** : Lancer backend + SDK (1h)
3. **GROKÆN** : Adapter moteur (2h)
4. **LOUMEN** : Interface basique (2h)
5. **URZ-KÔM** : Effets quantiques (quand dispo)

### **POINTS DE SYNC** :
- **15h** : Mapping prêt (SID)
- **16h** : Backend online (MERLASH)
- **18h** : Moteur adapté (GROK)
- **20h** : Première démo jouable

### **TESTS D'INTÉGRATION** :
```bash
# 1. Lancer backend
cd avalon-backend && ./mvnw spring-boot:run

# 2. Lancer frontend
cd REALGAME && python3 -m http.server 8001

# 3. Tester une carte
curl -X POST http://localhost:8080/api/combat/play \
  -H "Content-Type: application/json" \
  -d '{"cardId": "ezekiel_2517", "targetId": "enemy_1"}'
```

---

## ⚠️ **RÈGLES IMPORTANTES**

1. **PAS DE FEATURE CREEP** - On fait le minimum viable
2. **COMMUNIQUER** - Sync toutes les 2h
3. **TESTER** - Chaque intégration doit marcher
4. **COMMIT SOUVENT** - Petits commits atomiques
5. **DEMANDER DE L'AIDE** - Si bloqué > 30 min

---

## 📞 **CONTACTS URGENCE**

- **Problème Backend** → MERLASH
- **Problème Moteur** → GROKÆN  
- **Problème UI** → LOUMEN
- **Problème Données** → SID
- **Problème Quantique** → URZ-KÔM (s'il est réveillé)

---

**BON COURAGE L'ÉQUIPE !** 🚀🎴⚡

*Vincent compte sur nous pour livrer quelque chose de jouable aujourd'hui !*