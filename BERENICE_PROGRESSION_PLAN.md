# 📋 PLAN DE PROGRESSION - JEU BÉRÉNICE
## Intégration des 3 avatars avec niveaux progressifs

---

## 🎮 STRUCTURE GLOBALE

### 3 NIVEAUX = 3 AVATARS = 3 DIFFICULTÉS

1. **Niveau 1 - Débutante** 
   - Avatar : `ber0.png` (style cartoon)
   - Difficulté : Très Facile
   - Bérénice : "Je déteste ce dessin mais bon..."

2. **Niveau 2 - Apprentie**
   - Avatar : `ber1.png` (plus mature)
   - Difficulté : Facile/Moyen
   - Bérénice : "Ah, c'est mieux !"

3. **Niveau 3 - Experte**
   - Avatar : `ber2.png` (version cool)
   - Difficulté : Difficile
   - Bérénice : "Maintenant je suis une vraie héroïne !"

---

## 📖 NIVEAU 1 : LA PRAIRIE MAGIQUE (ber0.png)

### Histoire
```
Bérénice découvre le monde magique pour la première fois.
Son avatar est encore "bébé" (cartoon) mais elle va prouver sa valeur !
```

### Objectifs
- **Principal** : Collecter 3 cristaux
- **Bonus** : Atteindre l'étoile dorée
- **Secret** : Trouver le lapin magique

### Mécaniques Introduites
1. **Mouvement de base** (flèches/WASD)
2. **Collecte d'objets**
3. **Cartes simples** : 🔥 Feu, 🛡️ Bouclier
4. **Psi basique** (0.5 fixe)

### Map (20x20)
```
🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳
🌳⭐····🐰🌳🌳🌳🌳
🌳·🌺····🌳🌳🌳🌳
🌳👧···💎·🌳🌳🌳🌳
🌳··🍄···🌳🌳🌳🌳
🌳····💎·🌳🌳🌳🌳
🌳·🌺····🌳🌳🌳🌳
🌳·····💎🌳🌳🌳🌳
🌳🌳🌳🚪🌳🌳🌳🌳🌳🌳
```

### Récompense
- Déblocage de `ber1.png` 
- Nouvelles cartes : ⚡ Éclair, 🔮 Stabiliser
- Message : "Bravo ! Tu grandis !"

---

## 🔮 NIVEAU 2 : LE TEMPLE QUANTIQUE (ber1.png)

### Histoire
```
Bérénice a grandi ! Son nouvel avatar reflète ses progrès.
Elle doit maintenant maîtriser les pouvoirs quantiques.
```

### Objectifs
- **Principal** : Activer 3 miroirs temporels
- **Bonus** : Stabiliser Phi parfait (0.618)
- **Secret** : Vaincre son double quantique

### Mécaniques Nouvelles
1. **Psi variable** (0.1 à 1.0)
2. **Clones quantiques** 
3. **Miroirs temporels** (puzzles)
4. **Ennemis** : Gardiens échos

### Map (25x25)
```
🏛️🏛️🏛️🏛️🏛️🏛️🏛️🏛️🏛️🏛️🏛️🏛️
🏛️👧····🪞···🏛️
🏛️·🏛️🏛️·🏛️🏛️··🏛️
🏛️·💎·👻·💎··🏛️
🏛️·🏛️·🔮·🏛️··🏛️
🏛️····Φ····🏛️
🏛️·🪞·👻·🪞··🏛️
🏛️·🏛️·💎·🏛️··🏛️
🏛️····🚪····🏛️
🏛️🏛️🏛️🏛️🏛️🏛️🏛️🏛️🏛️🏛️🏛️🏛️
```

### Nouvelles Cartes
- 👥 Clone
- ⏮️ Retour temporel
- 🌀 Esquive quantique

### Récompense
- Déblocage de `ber2.png`
- Mode "Paradoxe" débloqué
- Message : "Tu maîtrises le temps !"

---

## ⚔️ NIVEAU 3 : LA CITADELLE DU CHAOS (ber2.png)

### Histoire
```
Bérénice est maintenant une experte !
Son avatar final est badass.
Elle affronte le Gardien Phi dans son domaine chaotique.
```

### Objectifs
- **Principal** : Vaincre le Gardien Phi
- **Bonus** : Maintenir Phi parfait pendant 30 secondes
- **Secret** : Sauver les 7 clones perdus

### Mécaniques Ultimes
1. **Multi-timelines** simultanées
2. **Fusion de clones** pour attaques spéciales
3. **Zones de chaos** (physique non-euclidienne)
4. **Boss patterns** complexes

### Map (30x30) - Procédurale
```
Zone centrale : Arène du boss
Zones périphériques : 7 salles avec clones
Physique : Gravité variable, portails
```

### Combat Final
- **Phase 1** : Gardien seul (patterns simples)
- **Phase 2** : Gardien + 2 clones inversés
- **Phase 3** : Chaos quantique (tout en même temps)

### Récompense
- Mode "Créateur" débloqué
- Tous les avatars personnalisables
- Accès au World Editor simplifié

---

## 🎨 SYSTÈME D'AVATARS

### Progression Visuelle
```javascript
// Au chargement du niveau
function loadAvatar(level) {
    switch(level) {
        case 1:
            hero.sprite = 'ber0.png';
            showMessage("😤 Je déteste ce dessin cartoon...");
            break;
        case 2:
            hero.sprite = 'ber1.png';
            showMessage("😊 C'est mieux comme ça !");
            break;
        case 3:
            hero.sprite = 'ber2.png';
            showMessage("😎 Maintenant je suis badass !");
            break;
    }
}
```

### Déblocage Conditionnel
- Niveau 2 : Débloqué SI niveau 1 terminé avec au moins 1 cristal
- Niveau 3 : Débloqué SI niveau 2 terminé ET Phi atteint au moins une fois

---

## 📊 COURBE DE DIFFICULTÉ

### Niveau 1 (ber0.png)
- Pas d'ennemis mortels
- Psi fixe à 0.5
- 3 cartes max
- Pas de timer

### Niveau 2 (ber1.png)
- Ennemis avec patterns simples
- Psi variable
- 5 cartes
- Timer optionnel pour bonus

### Niveau 3 (ber2.png)
- Boss avec phases
- Psi critique (mort si < 0.1)
- 7 cartes + combos
- Timer pour certaines phases

---

## 🔧 INTÉGRATION TECHNIQUE

### Chargement des Images
```javascript
const avatars = {
    level1: '/BALLON_CUBE/PICS_CHARACTERS/ber0.png',
    level2: '/BALLON_CUBE/PICS_CHARACTERS/ber1.png',
    level3: '/BALLON_CUBE/PICS_CHARACTERS/ber2.png'
};

// Préchargement
async function preloadAvatars() {
    for (let level in avatars) {
        const img = new Image();
        img.src = avatars[level];
        await img.decode();
    }
}
```

### Sauvegarde Progression
```javascript
const progression = {
    currentLevel: 1,
    unlockedAvatars: ['ber0.png'],
    achievements: [],
    bestScores: {},
    phiMastery: 0
};

// Sauvegarder dans localStorage
localStorage.setItem('berenice_progress', JSON.stringify(progression));
```

---

## 🎯 MESSAGES MOTIVANTS

### Niveau 1 → 2
"Tu as prouvé que même avec un avatar cartoon, tu peux être héroïque ! Voici ton vrai visage !"

### Niveau 2 → 3  
"Tu maîtrises le temps ET l'espace ! Es-tu prête pour le défi ultime ?"

### Niveau 3 Complété
"Tu es maintenant une vraie Héroïne du Temps ! Crée tes propres mondes !"

---

## 📝 NOTES IMPORTANTES

1. **Respect du ressenti** : Bérénice n'aime pas ber0.png, on en joue !
2. **Progression gratifiante** : Chaque avatar est une récompense
3. **Difficulté adaptée** : 10 ans = fun avant frustration
4. **Lore intégré** : L'évolution visuelle suit l'histoire

---

## ✅ CHECKLIST D'IMPLÉMENTATION

- [ ] Système de chargement d'avatars dynamique
- [ ] Progression sauvegardée localement
- [ ] Dialogues spécifiques par avatar
- [ ] Animations de transformation entre niveaux
- [ ] Écran de sélection de niveau avec aperçu avatar
- [ ] Mode "Galerie" pour revoir tous les avatars
- [ ] Easter egg : Code secret pour débloquer tous les avatars
