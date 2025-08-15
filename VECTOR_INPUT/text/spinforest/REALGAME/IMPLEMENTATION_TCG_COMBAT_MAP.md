# IMPLÉMENTATION TECHNIQUE - TCG COMBAT SUR MAP

## PRINCIPE FONDAMENTAL
Le TCG est **LE** système de combat, PAS un mini-jeu !

## ARCHITECTURE TECHNIQUE

### 1. Détection de Combat
```javascript
// Dans play.html - Quand 2 héros se touchent
if (detectHeroCollision(player, enemy)) {
    // PAS de changement d'écran !
    initiateTCGBattle(player, enemy);
}
```

### 2. Interface Combat Intégrée
```javascript
// L'UI de combat s'ajoute PAR-DESSUS la map
function initiateTCGBattle(attacker, defender) {
    // Zone de combat apparaît
    showBattleCircle(attacker.position);
    
    // Cartes du joueur en bas
    displayPlayerHand(attacker.deck);
    
    // Cartes adverses en haut
    displayEnemyHand(defender.deck);
    
    // La map reste visible en fond !
    mapCanvas.style.opacity = 0.8;
}
```

### 3. Résolution du Combat
```javascript
// Les actions de cartes impactent directement les entités
function playCard(card, target) {
    // Effet immédiat sur la map
    if (card.type === 'damage') {
        target.hp -= card.value;
        showDamageAnimation(target.position);
    }
    
    // Mise à jour 6D backend
    updateEntityInInterstice(target);
    
    // Si mort, disparaît de la map
    if (target.hp <= 0) {
        removeFromMap(target);
    }
}
```

## FLUX DE COMBAT COMPLET

### Phase 1: Approche
1. Joueur se déplace normalement sur la map
2. Détection de proximité avec entité hostile/neutre
3. Indicateur de combat possible (aura, couleur)

### Phase 2: Engagement
1. Collision = début du combat
2. Zoom léger sur la zone
3. UI TCG apparaît en surimpression
4. Map reste active en arrière-plan

### Phase 3: Combat TCG
1. Tour par tour avec cartes
2. Animations directement sur la map
3. Effets temporels visibles (bulles, distorsions)
4. Terrain influence les cartes

### Phase 4: Résolution
1. Vainqueur reste sur la map
2. Vaincu disparaît/fuit/devient allié
3. Récompenses tombent directement au sol
4. Retour immédiat à l'exploration

## DIFFÉRENCES AVEC MINI-GAME

### CE QU'ON NE FAIT PAS ❌
- Pas d'écran de combat séparé
- Pas de transition/loading
- Pas de pause dans l'exploration
- Pas d'arène dédiée

### CE QU'ON FAIT ✅
- Combat sur place dans le monde
- Map reste visible et active
- Autres joueurs voient le combat
- Environnement influence le combat

## EXEMPLES CONCRETS

### Combat en Forêt
```javascript
// Le terrain "forêt" boost les cartes nature
if (currentTerrain === 'forest') {
    natureCards.forEach(card => {
        card.power += 2;
        card.element = 'empoweredNature';
    });
}
```

### Combat Temporel
```javascript
// Zone d'instabilité = mécaniques spéciales
if (isInTemporalAnomaly(battlePosition)) {
    // Cartes peuvent affecter le passé
    enableTimeManipulation();
    // Voir les actions futures
    showFuturePreview();
}
```

### Combat Multi-Joueurs
```javascript
// Autres joueurs voient le combat en temps réel
broadcastBattle({
    position: battlePosition,
    participants: [player1, player2],
    currentTurn: activeTurn,
    effects: activeEffects
});
```

## INTÉGRATION AVEC SYSTÈMES EXISTANTS

### Avec le Backend 6D
- Chaque action de carte = update coordonnées 6D
- Effets temporels = modification timeline
- Invocations = nouvelles entités dans l'Interstice

### Avec PostGræcia
- État des decks sauvegardé
- Historique des combats
- Collections de cartes persistantes

### Avec Panopticon
- Combat visible dans la visualisation 6D
- Flux d'énergie entre combattants
- Perturbations temporelles affichées

## PROCHAINES ÉTAPES

1. **Implémenter détection collision** dans play.html
2. **Créer UI combat superposée** (pas plein écran)
3. **Connecter deck système** au backend
4. **Animer effets cartes** sur la map
5. **Synchroniser** avec autres joueurs

Le TCG n'est pas un mode à part - c'est LA façon naturelle de résoudre les conflits dans Heroes of Time !