# 🃏 EXEMPLES DE CARTES - PROTOTYPE

## 🎴 CARTE 1 : "Echo of the First King"

```json
{
  "id": "echo_first_king",
  "type": "SPIRIT",
  "rarity": "LEGENDARY",
  "art": {
    "prompt": "Ancient ghostly king, ethereal crown, temporal echoes, royal aura, Heroes III style",
    "status": "TO_GENERATE"
  },
  "effects": {
    "summon": {
      "type": "ROYAL_GHOST",
      "duration": "3_ROUNDS"
    },
    "temporal": {
      "type": "LOOP",
      "trigger": "ON_DEATH",
      "effect": "REPLAY_LAST_3_TURNS"
    }
  }
}
```

## 🎴 CARTE 2 : "Vortex of Time"

```json
{
  "id": "vortex_of_time",
  "type": "SPELL",
  "rarity": "RARE",
  "art": {
    "prompt": "Swirling magical vortex, clock fragments, purple energy, Heroes III style",
    "status": "TO_GENERATE"
  },
  "effects": {
    "immediate": {
      "type": "TEMPORAL_SHIFT",
      "range": "ALL_CARDS_IN_PLAY"
    },
    "paradox": {
      "type": "REALITY_LEAK",
      "duration": "2_ROUNDS"
    }
  }
}
```

## 🎴 CARTE 3 : "Memory Shard"

```json
{
  "id": "memory_shard",
  "type": "ARTIFACT",
  "rarity": "UNCOMMON",
  "art": {
    "prompt": "Crystalline fragment containing memories, glowing blue, floating, Heroes III style",
    "status": "TO_GENERATE"
  },
  "effects": {
    "passive": {
      "type": "TIMELINE_VIEW",
      "range": "NEXT_3_TURNS"
    },
    "active": {
      "type": "REWRITE",
      "target": "ANY_CARD_IN_HAND",
      "cost": "DISCARD_2"
    }
  }
}
```

## 🎮 EXEMPLE D'UTILISATION

```javascript
// Dans le moteur de GROEKEN
class CombatEngine {
  playCard(cardId) {
    const card = this.cards[cardId];
    
    // Effets immédiats
    if (card.effects.immediate) {
      this.processEffect(card.effects.immediate);
    }
    
    // Effets temporels
    if (card.effects.temporal) {
      this.timelineManager.apply(card.effects.temporal);
    }
    
    // Paradoxes
    if (card.effects.paradox) {
      this.realityEngine.createParadox(card.effects.paradox);
    }
    
    // Passifs
    if (card.effects.passive) {
      this.addPassiveEffect(card.effects.passive);
    }
  }
}
```

## 🎨 STYLE VISUEL

- Style Heroes III
- Cartes élégantes
- Effets visuels temporels
- Animations fluides
- Interface claire

## 📝 NOTES

1. Les cartes sont générées selon :
   - La timeline actuelle
   - L'état mental du héros
   - Le monde traversé
   - Les paradoxes actifs

2. Chaque carte peut avoir :
   - Effets immédiats
   - Effets temporels
   - Effets paradoxaux
   - Passifs

3. Le moteur gère :
   - Calcul des effets
   - Application timeline
   - Gestion paradoxes
   - État du combat