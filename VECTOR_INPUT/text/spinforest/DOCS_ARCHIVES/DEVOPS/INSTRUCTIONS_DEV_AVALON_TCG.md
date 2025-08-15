# 🛠️ INSTRUCTIONS DEV - AVALON TCG

**Version** : 2.0 - SYNC ÉQUIPE COMPLÈTE  
**Date** : JOUR 6 - MISE À JOUR  
**Par** : MERLASH-TECHNOMANCIEN  
**Status** : ✅ CONSENSUS TOTAL - ON Y VA !

---

## 🎯 QUI FAIT QUOI - SYNC FINAL

### 🧠 **GROEKEN** - Backend & Calculs
**ZONE**: `AVALON-TCG/core/`  
**DEADLINE**: AUJOURD'HUI  
**TÂCHES**:
- [ ] Adapter moteur de combat pour cartes
- [ ] Système de résolution des effets
- [ ] Calcul des stats dynamiques
- [ ] API JSON pour les cartes
**INTÉGRATION**: Utilise mon SDK ou appelle directement `/api/combat/play`

### 🎯 **SID MEIER** - Interface & Navigation  
**ZONE**: `AVALON-TCG/ui/`  
**DEADLINE**: AUJOURD'HUI  
**TÂCHES**:
- [ ] Interface combat Hearthstone-like
- [ ] Intégration avec carte hexagonale
- [ ] Animations de cartes
- [ ] Transition exploration → combat
**FICHIER PRINCIPAL**: `CHEMIN_DE_LA_FORET_INTERFACE.html`

### 🐻 **URZ-KÔM** - Effets & Polish
**ZONE**: `AVALON-TCG/assets/effects/`  
**DEADLINE**: CETTE SEMAINE  
**TÂCHES**:
- [x] Système cartes déjà implémenté !
- [ ] Effets quantiques sur cartes rares
- [ ] Particules temporelles
- [ ] Sons et ambiances
**FICHIER**: `card-battle-system.js` (déjà créé)

### 🕯️ **LOUMEN** - Narration & Quêtes
**ZONE**: `AVALON-TCG/core/narrative/`  
**DEADLINE**: URGENT !  
**TÂCHES**:
- [x] 10 cartes Phoenix créées
- [ ] Intégration avec système de quêtes
- [ ] Dialogues pour obtention de cartes
- [ ] Mode histoire
**FICHIER**: `10_CARTES_PHOENIX_LOUMEN.json`

### ⚡ **MERLASH** (MOI) - Backend Unifié
**ZONE**: `avalon-backend/`  
**STATUS**: ✅ PRÊT !  
**FAIT**:
- [x] API REST `/api/combat/play`
- [x] SDK JavaScript complet
- [x] Demo interface TCG
- [x] 5 cartes Merlash
**À FAIRE**: Support multijoueur si besoin

---

## 🚀 QUICK START

### 1. Backend (MERLASH)
```bash
# Terminal 1 - Lancer le backend
cd avalon-backend
./mvnw spring-boot:run
# ou si pas de Maven :
java -jar target/avalon-backend-1.0.jar

# Backend disponible sur http://localhost:8080
```

### 2. Frontend (SID/GROK)
```bash
# Terminal 2 - Lancer l'interface
cd REALGAME
./launch-chemin-foret.sh
# ou directement :
open CHEMIN_DE_LA_FORET_INTERFACE.html
```

---

## 🔧 INTÉGRATION BACKEND TCG

### Option 1 : DIRECT (Recommandé)
```javascript
// Dans votre game-engine.js
const BACKEND_URL = 'http://localhost:8080/api';

async function playCard(cardId, targetId) {
    const response = await fetch(`${BACKEND_URL}/combat/play`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            playerId: currentPlayer.id,
            combatId: currentCombat.id,
            cardId: cardId,
            targetId: targetId
        })
    });
    
    const result = await response.json();
    // result contient : success, damage, effects, narration
    return result;
}
```

### Option 2 : AVEC SDK
```javascript
// Inclure le SDK
import { AvalonTCG } from './avalon-tcg-sdk.js';

// Initialiser
const tcg = new AvalonTCG('http://localhost:8080');

// Jouer une carte
const result = await tcg.playCard(card, target);
```

---

## 📋 ENDPOINTS DISPONIBLES

### Combat
```
POST   /api/combat/play         # Jouer une carte
GET    /api/combat/deck/{id}    # Récupérer un deck
GET    /api/combat/state/{id}   # État du combat
```

### Magic (Formules)
```
POST   /api/magic/cast          # Exécuter une formule
GET    /api/formulas            # Liste des formules
GET    /api/universal-wave      # État quantique
```

### Exemples de requêtes
```bash
# Jouer une carte
curl -X POST http://localhost:8080/api/combat/play \
  -H "Content-Type: application/json" \
  -d '{
    "playerId": "player1",
    "combatId": "combat123",
    "cardId": "eclair-primordial",
    "targetId": "enemy1"
  }'

# Récupérer un deck
curl http://localhost:8080/api/combat/deck/merlash
```

---

## 🎴 STRUCTURE DES CARTES

### Format JSON
```json
{
  "id": "eclair-primordial",
  "name": "Éclair Primordial",
  "type": "spell",
  "cost": 3,
  "formula": "GROFI: ψ = e^(iπ/4) × |tempête⟩",
  "description": "Invoque la première foudre...",
  "image": "assets/cards/eclair-primordial.png",
  "rarity": "legendary",
  "effects": ["damage", "stun", "temporal_shift"]
}
```

### Types de cartes
- `spell` : Sort instantané
- `creature` : Invocation permanente
- `artifact` : Objet équipable
- `temporal` : Effet temporel
- `paradox` : Carte spéciale

---

## 🎮 FLOW DE JEU

### 1. Initialisation
```javascript
// Créer un combat
const combat = {
    id: generateId(),
    players: [player1, player2],
    turn: 0,
    state: 'active'
};

// Charger les decks
const deck1 = await loadDeck(player1.deckId);
const deck2 = await loadDeck(player2.deckId);
```

### 2. Tour de jeu
```javascript
async function playTurn(player, card, target) {
    // 1. Vérifier validité
    if (!canPlayCard(player, card)) return;
    
    // 2. Appeler backend
    const result = await tcg.playCard(card, target);
    
    // 3. Appliquer effets
    applyEffects(result.effects);
    
    // 4. Mettre à jour UI
    updateUI(result);
    
    // 5. Vérifier victoire
    checkVictory();
}
```

### 3. Gestion des effets
```javascript
const EFFECT_HANDLERS = {
    damage: (target, amount) => {
        target.health -= amount;
        animateDamage(target, amount);
    },
    
    stun: (target) => {
        target.stunned = true;
        animateStun(target);
    },
    
    temporal_shift: (target) => {
        // Effet spécial AVALON
        shiftTimeline(target);
    }
};
```

---

## 🐛 DEBUG & LOGS

### Activer mode dev
```javascript
// Frontend
window.DEBUG_MODE = true;

// Backend
# application.properties
logging.level.com.avalon=DEBUG
```

### Logs utiles
```javascript
// Logger chaque action
console.log('[TCG] Card played:', card.name);
console.log('[TCG] Formula:', card.formula);
console.log('[TCG] Result:', result);
```

---

## 🔥 FEATURES AVANCÉES

### Mode Offline
```javascript
const OFFLINE_MODE = !navigator.onLine;

async function playCardSmart(card, target) {
    if (OFFLINE_MODE) {
        // Calcul local simple
        return calculateLocal(card, target);
    } else {
        // Backend complet
        return tcg.playCard(card, target);
    }
}
```

### Multijoueur
```javascript
// WebSocket pour temps réel
const ws = new WebSocket('ws://localhost:8080/combat');

ws.onmessage = (event) => {
    const action = JSON.parse(event.data);
    if (action.type === 'CARD_PLAYED') {
        // Synchroniser l'état
        applyOpponentAction(action);
    }
};
```

### Anti-Cheat
```javascript
// Toujours valider côté serveur !
// Le client ne fait que l'affichage
// WALTER vérifie tout côté backend
```

---

## 📊 ÉTAT ACTUEL DU PROJET - SYNC JOUR 6

### ✅ **CE QUI EST DÉJÀ FAIT**
1. **Backend MERLASH** : 3 endpoints fonctionnels
2. **SDK JavaScript** : `avalon-tcg-sdk.js` prêt
3. **Demo Interface** : `tcg-demo.html` testable
4. **5 Cartes Merlash** : Avec formules technomantiques
5. **10 Cartes LOUMEN** : Narratives Phoenix
6. **8 Alphacards** : Images HD générées
7. **Système URZ-KÔM** : `card-battle-system.js` existant

### 🔄 **EN COURS AUJOURD'HUI**
- **GROEKEN** : Adaptation moteur de combat
- **SID** : Interface Hearthstone-like
- **MERLASH** : Support et intégration

### ⏳ **À FAIRE CETTE SEMAINE**
- Fusion des systèmes
- Mode multijoueur
- 30+ cartes complètes
- Tests avec équipe

### 🎴 **CARTES DISPONIBLES**

**Deck Merlash (Backend ready):**
- `eclair-primordial`: "GROFI: ψ = e^(iπ/4) × |tempête⟩"
- `foudre-compilee`: "API: compile(magic) → executable"
- `orage-quantique`: "GRUT: Σ(éclair × dimension)"
- `tonnerre-binaire`: "WALTER: paradox_check(thunder)"
- `nexus-electrique`: "TEMPORAL: t = t₀ + Δ(voltage)"

**Cartes LOUMEN (JSON ready):**
- Renaissance du Phénix (phoenix_01)
- Bootstrap de Marie Manteau (phoenix_02)
- Vision du Dude Éternel (phoenix_03)
- Et 7 autres...

**Alphacards Vincent (Images ready):**
- 8 cartes HD dans `REALGAME/alphacards/`

---

## 📚 RESSOURCES

### Documentation
- API Docs : http://localhost:8080/swagger-ui
- Formules : http://localhost:8080/formula-explorer.html
- Dashboard : http://localhost:8080/dashboard.html

### Fichiers importants
```
avalon-backend/
├── README.md                    # Doc backend
├── all-formulas-test.txt       # 869 formules
└── src/main/resources/static/  # Interfaces web

REALGAME/
├── AVALON-TCG/                 # Assets TCG
├── integration/                # Scripts intégration
└── prompts/                    # Prompts génération
```

### Support
- **Backend** : @MERLASH
- **Frontend** : @SID / @GROK
- **Game Design** : @VINCENT
- **Assets** : @URZ-KÔM

---

## ⚡ TIPS & TRICKS

1. **Commencer simple** : 5 cartes, 1 effet chacune
2. **Tester souvent** : Chaque feature = 1 test
3. **Logger tout** : Debug plus facile
4. **Pas de magie côté client** : Backend = source de vérité
5. **Itérer vite** : Mieux vaut fonctionnel que parfait

---

## 🚀 READY TO CODE?

```bash
# Check-list avant de coder
✓ Backend lancé (port 8080)
✓ Frontend ouvert
✓ Mode debug activé
✓ Console ouverte
✓ Café prêt ☕

# LET'S GO!
echo "⚡ AVALON TCG DEVELOPMENT MODE ACTIVATED ⚡"
```

---

*"Code is magic, magic is code!"*  
**- MERLASH-TECHNOMANCIEN** ⚡