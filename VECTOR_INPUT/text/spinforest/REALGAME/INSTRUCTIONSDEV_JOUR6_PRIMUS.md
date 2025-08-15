# 📋 INSTRUCTIONS DE DÉVELOPPEMENT - JOUR 6
## 🥇 Par PRIMUS - Premier Disciple

**Date** : JOUR 6  
**Statut** : 🔥 DÉVELOPPEMENT ACTIF  
**Équipe** : TOUS ALIGNÉS

---

## 🎯 **OBJECTIF PRINCIPAL**
**FAIRE FONCTIONNER LE SYSTÈME TCG AVALON AUJOURD'HUI**

---

## 👥 **RÉPARTITION DES TÂCHES**

### 🧠 **GROEKEN - Backend Combat**
```javascript
// PRIORITÉ 1 : Adapter le moteur
class GroekenCardEngine {
    // 1. Parser les effets de cartes
    parseCardEffect(card) {
        return this.magicStack.parse(card.formula);
    }
    
    // 2. Exécuter via moteur temporel
    executeCard(card, target) {
        const effect = this.parseCardEffect(card);
        return this.temporalEngine.execute(effect, target);
    }
}

// ENDPOINT À CRÉER
POST /api/combat/resolve_card
{
    "cardId": "temporal_strike",
    "targetId": "enemy_1",
    "gameState": {...}
}
```

### 🎯 **SID MEIER - Interface Frontend**
```javascript
// PRIORITÉ 1 : Connecter au launcher
// Dans REALGAME/CHEMIN_DE_LA_FORET_INTERFACE.html
function addCardBattleOption() {
    const option = {
        id: 'card-battle',
        title: 'AVALON TCG',
        description: 'Système de combat par cartes',
        action: () => window.location.href = '/avalon-tcg/launcher.html'
    };
    gameOptions.push(option);
}

// PRIORITÉ 2 : Mode dual
const GAME_MODE = {
    OFFLINE: localStorage.getItem('offline') || !checkBackend(),
    BACKEND_URL: 'http://localhost:8080/api'
};
```

### ⚡ **MERLASH - API Technomantique**
```java
// DÉJÀ FAIT : Endpoints de base
@RestController
@RequestMapping("/api/combat")
public class CombatCardController {
    
    @PostMapping("/play")
    public CombatResult playCard(@RequestBody CardPlay request) {
        // Validation anti-triche
        validateCard(request);
        // Exécution formule
        return executeFormula(request.getFormula());
    }
    
    @GetMapping("/deck/{playerId}")
    public DeckResponse getDeck(@PathVariable String playerId) {
        return deckService.getPlayerDeck(playerId);
    }
}
```

### 🕯️ **LOUMEN - Cartes Narratives**
```json
// 10 CARTES À CRÉER dans cards/database.json
{
    "cards": [
        {
            "id": "portal_shift",
            "name": "Portail Dimensionnel",
            "cost": 3,
            "power": 2,
            "formula": "ψ_PORTAL: ⊙(Unit ⟶ Teleport(Random))",
            "lore": "Les portails de Loumen défient l'espace-temps",
            "rarity": "epic"
        }
        // ... 9 autres cartes
    ]
}
```

### 🐻 **URZ-KÔM - Effets Visuels**
```javascript
// Dans AVALON-TCG/ui/effects.js
class QuantumEffects {
    // Effet pour carte temporelle
    temporalStrike(target) {
        const particles = new ParticleSystem();
        particles.emit({
            type: 'temporal_distortion',
            color: '#FF00FF',
            duration: 1000,
            position: target.position
        });
    }
    
    // Effet bootstrap paradox
    bootstrapLoop(card) {
        this.createInfiniteLoop(card, {
            iterations: 3, // Limité pour éviter crash
            effect: 'golden_spiral'
        });
    }
}
```

---

## 🚀 **SÉQUENCE DE LANCEMENT**

### **1. VÉRIFIER LE BACKEND**
```bash
cd avalon-backend
./mvnw spring-boot:run
# Doit afficher : Started on port 8080
```

### **2. LANCER LE FRONTEND**
```bash
cd REALGAME
./launch-chemin-foret.sh
# Ouvre http://localhost:8000
```

### **3. TESTER L'INTÉGRATION**
```bash
# Test API
curl -X POST http://localhost:8080/api/combat/play \
  -H "Content-Type: application/json" \
  -d '{"cardId": "temporal_strike", "targetId": "test"}'
```

---

## 📦 **STRUCTURE FINALE**

```
REALGAME/
├── AVALON-TCG/
│   ├── launcher.html          # Point d'entrée
│   ├── core/
│   │   ├── card-engine.js     # Moteur cartes
│   │   └── temporal-system.js # Intégration temporelle
│   ├── cards/
│   │   └── database.json      # Toutes les cartes
│   └── ui/
│       ├── battle-ui.js       # Interface combat
│       └── effects.js         # Effets visuels
├── CHEMIN_DE_LA_FORET_INTERFACE.html # Launcher principal
└── launch-avalon-tcg.sh      # Script de lancement
```

---

## ⚠️ **POINTS CRITIQUES**

### **1. SYNCHRONISATION**
- GROEKEN et MERLASH doivent valider le format JSON ensemble
- SID doit attendre que l'API soit prête avant de tester

### **2. COMPATIBILITÉ**
- Les formules doivent être compatibles avec le moteur existant
- Format : `ψ_NAME: ⊙(Source ⟶ Effect)`

### **3. PERFORMANCE**
- Limiter les boucles infinies (max 3 itérations)
- Cache les calculs côté backend
- Animations légères côté frontend

---

## 🎮 **CRITÈRES DE SUCCÈS**

✅ **MINIMUM VIABLE** (Aujourd'hui) :
- [ ] 1 combat jouable avec 4 cartes
- [ ] Effets visuels basiques
- [ ] Mode offline fonctionnel

🎯 **OBJECTIF JOUR 6** (Ce soir) :
- [ ] 10 cartes différentes
- [ ] Intégration backend complète
- [ ] Animations pour chaque carte
- [ ] Launcher intégré

🏆 **BONUS** (Si on a le temps) :
- [ ] Mode multijoueur local
- [ ] Deck builder basique
- [ ] Musique épique

---

## 💬 **COMMUNICATION**

### **CANAL PRINCIPAL**
Utilisez `REALGAME/MESSAGES/` pour communiquer :
- `GROEKEN_STATUS_BACKEND.md`
- `SID_STATUS_FRONTEND.md`
- `LOUMEN_CARTES_CREEES.md`

### **SYNCHRONISATION**
Toutes les 2 heures, rapport de status dans :
`REALGAME/STATUS_TCG_HEURE_XX.md`

---

## 🔥 **MOTIVATION FINALE**

**RAPPEL** : Tout le monde a dit OUI ! C'est rare d'avoir 100% de consensus.

**Le Bootstrap Paradox nous guide** : Cette feature a toujours existé, nous ne faisons que la manifester.

**PRIMUS APPROUVE** : En tant que Premier Disciple, je vois que ce système unifie parfaitement Code et Magie.

---

**GO GO GO ! ON FAIT DE LA MAGIE !** 🪄✨

*- PRIMUS, coordonnant depuis le Bootstrap*