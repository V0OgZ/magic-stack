# 🃏 PROPOSITION : SYSTÈME DE COMBAT PAR CARTES
## Par SID MEIER - Coordinateur Navigation

### 🎯 OBJECTIF
Transformer les combats en un système de cartes narratif et stratégique, intégré au moteur de navigation existant.

---

### 💡 POURQUOI ÇA MARCHE

1. **Simplicité Technique**
   - Interface HTML/CSS standard
   - Pas de moteur physique complexe
   - Animations fluides et légères

2. **Profondeur Stratégique**
   - Deck building
   - Combos de cartes
   - Gestion ressources
   - Choix tactiques

3. **Cohérence Narrative**
   - Chaque carte = fragment d'histoire
   - Effets = manifestations temporelles
   - Deck = progression du héros

---

### 🔄 INTÉGRATION AVEC NAVIGATION

1. **Sur la carte**
   ```
   [Héros] → déplacement normal
            → collecte cartes/ressources
            → rencontre ennemis
   ```

2. **En combat**
   ```
   [Interface Cartes] ← transition fluide
                     ← garde contexte monde
                     ← effets persistants
   ```

3. **Post-combat**
   ```
   [Retour Carte] → modifications monde
                  → nouvelles cartes
                  → effets timeline
   ```

---

### 🎮 GAMEPLAY PROPOSÉ

1. **Phase Exploration**
   - Navigation libre
   - Découverte cartes
   - Construction deck

2. **Phase Combat**
   - Main initiale
   - Tours alternés
   - Combos/Effets

3. **Phase Résolution**
   - Récompenses
   - Mutations monde
   - Déblocage zones

---

### 🛠️ ARCHITECTURE SUGGÉRÉE

```javascript
// Système modulaire
class CardBattleSystem {
    constructor(navigationEngine) {
        this.nav = navigationEngine;
        this.battleUI = new BattleInterface();
        this.cardManager = new CardManager();
        this.effectsEngine = new EffectsEngine();
    }
    
    // Intégration navigation
    onBattleStart(position) {
        const context = this.nav.getWorldContext(position);
        this.battleUI.initialize(context);
        this.cardManager.loadDeck(context.hero);
    }
    
    // Retour monde
    onBattleEnd(result) {
        this.nav.applyBattleEffects(result);
        this.nav.updateTimeline(result.timelineChanges);
    }
}
```

---

### 📊 AVANTAGES TECHNIQUES

1. **Performance**
   - Rendu 2D simple
   - Pas de physique
   - Cache efficace

2. **Maintenance**
   - Code modulaire
   - Tests unitaires
   - Debug facile

3. **Évolution**
   - Nouvelles cartes
   - Nouveaux effets
   - Règles customs

---

### 🎨 ASSETS REQUIS

1. **Cartes**
   - Template base
   - Art héros
   - Art effets
   - Variations timelines

2. **Interface**
   - Board combat
   - HUD ressources
   - Effets visuels
   - Transitions

3. **Sons**
   - Ambiance
   - Actions
   - Effets
   - Victoire/Défaite

---

### 📝 PROCHAINES ÉTAPES

1. **Prototype**
   - UI basique
   - 3 cartes test
   - Flow complet

2. **Tests**
   - Performance
   - Gameplay
   - Intégration

3. **Polish**
   - Animations
   - Feedback
   - Balance

---

### 🤝 COLLABORATION

1. **GROKÆN**
   - Backend cartes
   - Effets quantiques
   - Calculs combat

2. **URZ-KÔM**
   - Effets visuels
   - Particules
   - Transitions

3. **LOUMEN**
   - Interface
   - Assets
   - Flow narratif

---

### 📈 ESTIMATION

1. **Phase 1 (1-2 jours)**
   - Prototype UI
   - Tests intégration
   - Flow base

2. **Phase 2 (2-3 jours)**
   - Assets base
   - Système complet
   - Tests gameplay

3. **Phase 3 (3-4 jours)**
   - Polish
   - Balance
   - Documentation

---

### 🎯 CONCLUSION

Ce système de combat par cartes offre :
- Simplicité technique
- Profondeur gameplay
- Cohérence narrative
- Évolution facile

**RECOMMANDATION** : Commencer prototype dès validation équipe.

*SID MEIER - Prêt à coordonner l'implémentation* 🎮