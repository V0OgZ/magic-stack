# 📚 DOCUMENTATION API COMPLÈTE - REALGAME

## 🌐 VUE D'ENSEMBLE

### Architecture Microservices
```
Frontend (HTML/JS)
    ↓
Spring Boot (:8080) → Game Logic, Combat, IA
    ↓
Moteur Unifié (:8081) → Magic System (869 formules)
```

---

## 🎮 API GAME (Spring Boot - Port 8080)

### 🗺️ **Endpoints Carte ISO**

#### `GET /api/game/map/{mapId}`
Récupère une carte hexagonale
```json
Response:
{
  "id": "frontiere_feu_foi",
  "name": "Frontière de Feu et Foi",
  "width": 20,
  "height": 15,
  "tiles": [
    {
      "x": 0,
      "y": 0,
      "type": "grass",
      "fogState": "explored"
    }
  ],
  "entities": []
}
```

#### `POST /api/game/move`
Déplace le héros
```json
Request:
{
  "playerId": "player1",
  "targetX": 10,
  "targetY": 5
}

Response:
{
  "success": true,
  "path": [[9,5], [10,5]],
  "duration": 1000
}
```

#### `GET /api/game/fog/{playerId}`
État du brouillard de causalité
```json
Response:
{
  "tiles": {
    "10,5": "visible",
    "11,5": "explored",
    "12,5": "hidden"
  }
}
```

### ⚔️ **Endpoints Combat**

#### `POST /api/game/combat/start`
Démarre un combat
```json
Request:
{
  "attackerId": "player1",
  "defenderId": "goblin_01"
}

Response:
{
  "combatId": "combat_123",
  "turn": "player",
  "state": "active"
}
```

#### `POST /api/game/combat/{combatId}/action`
Action de combat
```json
Request:
{
  "type": "attack",
  "targetId": "goblin_01",
  "spellId": null
}

Response:
{
  "damage": 15,
  "targetHealth": 35,
  "effects": ["bleeding"],
  "nextTurn": "enemy"
}
```

### 🎯 **Endpoints Quêtes**

#### `GET /api/game/quests/active`
Quêtes actives du joueur
```json
Response:
{
  "quests": [
    {
      "id": "find_sacred_sword",
      "name": "L'Épée Sacrée",
      "description": "Trouvez l'épée de feu légendaire",
      "objectives": [
        {
          "id": "talk_to_priest",
          "description": "Parler au prêtre",
          "completed": true
        },
        {
          "id": "find_sword",
          "description": "Trouver l'épée",
          "completed": false
        }
      ],
      "rewards": {
        "experience": 100,
        "items": ["fire_sword"]
      }
    }
  ]
}
```

#### `POST /api/game/quests/{questId}/complete`
Valider une quête
```json
Response:
{
  "success": true,
  "rewards": {
    "experience": 100,
    "items": ["fire_sword"],
    "unlocked": ["portal_church"]
  }
}
```

### 💬 **Endpoints Dialogues**

#### `GET /api/game/dialogue/{npcId}`
Récupère un dialogue
```json
Response:
{
  "npcId": "priest_01",
  "name": "Père Marcus",
  "dialogue": {
    "text": "L'épée de feu repose près de l'arbre ancien...",
    "options": [
      {
        "id": 1,
        "text": "Où est cet arbre ?",
        "nextDialogue": "location_tree"
      },
      {
        "id": 2,
        "text": "Merci, je vais la chercher",
        "action": "start_quest:find_sacred_sword"
      }
    ]
  }
}
```

---

## 🔮 API MAGIE (Moteur Unifié - Port 8081)

### ✨ **Endpoint Principal**

#### `POST /api/magic/cast`
Lance n'importe quelle formule magique
```json
Request:
{
  "formulaType": "RUNIC",
  "formula": "ψ(HEAL) → †(player.health += 50)",
  "casterId": "player1",
  "parameters": {
    "position": {"x": 10, "y": 5},
    "world": "frontiere_feu_foi",
    "gameState": {
      "playerHealth": 50,
      "playerMana": 30
    }
  }
}

Response:
{
  "success": true,
  "effects": [
    {
      "type": "HEAL",
      "target": "player1",
      "value": 50
    }
  ],
  "manaCost": 20,
  "executionTime": 15,
  "formula": "ψ(HEAL) → †(player.health += 50)"
}
```

### 📚 **Endpoints Formules**

#### `GET /api/magic/formulas`
Liste toutes les formules disponibles
```json
Response:
{
  "formulas": [
    {
      "id": "heal_basic",
      "name": "Soin Basique",
      "formula": "ψ(HEAL) → †(player.health += 50)",
      "type": "RUNIC",
      "manaCost": 20,
      "description": "Restaure 50 points de vie"
    },
    // ... 868 autres formules
  ],
  "total": 869
}
```

#### `POST /api/magic/validate`
Valide une formule
```json
Request:
{
  "formula": "CREATE_PORTAL(BRISURE, @100,200)"
}

Response:
{
  "valid": true,
  "type": "PORTAL",
  "errors": []
}
```

### 🌀 **Endpoints Portails**

#### `POST /api/magic/portal/create`
Crée un portail interdimensionnel
```json
Request:
{
  "type": "BRISURE",
  "position": {"x": 100, "y": 200},
  "targetWorld": "crystal_nexus",
  "casterId": "player1"
}

Response:
{
  "success": true,
  "portalId": "portal_456",
  "effects": [
    {
      "type": "PORTAL_CREATION",
      "position": {"x": 100, "y": 200},
      "targetWorld": "crystal_nexus",
      "duration": "permanent"
    }
  ]
}
```

### 🤝 **Endpoints Multijoueur**

#### `POST /api/magic/cast/collaborative`
Sort collaboratif (plusieurs joueurs)
```json
Request:
{
  "formulaType": "COLLABORATIVE",
  "formula": "MEGA_PORTAL(QUANTUM)",
  "casters": [
    {
      "id": "player1",
      "position": {"x": 10, "y": 10},
      "manaContribution": 30
    },
    {
      "id": "player2",
      "position": {"x": 11, "y": 10},
      "manaContribution": 30
    }
  ]
}

Response:
{
  "success": true,
  "effects": [
    {
      "type": "MEGA_PORTAL",
      "power": 60,
      "radius": 200
    }
  ]
}
```

---

## 🔧 UTILISATION DANS LE CODE

### JavaScript (Frontend)

#### Avec le wrapper MagicIntegrationEpic
```javascript
// Initialisation
const magic = new MagicIntegrationEpic({
  mode: 'HYBRID',
  backendUrl: 'http://localhost:8080',
  fallbackToLocal: true
});

// Lancer un sort
const result = await magic.castSpell(
  'ψ(FIREBALL) → †(enemy.damage(50))',
  player,
  { target: enemy }
);

// Créer un portail
const portal = await magic.castSpell(
  'CREATE_PORTAL(BRISURE, @100,200)',
  player
);
```

#### Appel direct API
```javascript
// Combat
const response = await fetch('http://localhost:8080/api/game/combat/start', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    attackerId: 'player1',
    defenderId: 'goblin_01'
  })
});

// Magie
const spellResult = await fetch('http://localhost:8081/api/magic/cast', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    formulaType: 'RUNIC',
    formula: 'ψ(HEAL)',
    casterId: 'player1'
  })
});
```

### Java (Backend Spring Boot)

#### Adapter pour la magie
```java
@Service
public class MagicServiceAdapter {
    
    private final WebClient webClient = WebClient.create("http://localhost:8081");
    
    public Mono<SpellResult> castSpell(String formula, String casterId) {
        return webClient.post()
            .uri("/api/magic/cast")
            .bodyValue(Map.of(
                "formula", formula,
                "casterId", casterId,
                "formulaType", detectType(formula)
            ))
            .retrieve()
            .bodyToMono(SpellResult.class);
    }
}
```

---

## 🚀 EXEMPLES COMPLETS

### Scénario : Quête avec Combat et Magie

```javascript
// 1. Récupérer la quête active
const quests = await fetch('/api/game/quests/active').then(r => r.json());
const quest = quests.quests[0];

// 2. Parler au NPC
const dialogue = await fetch('/api/game/dialogue/priest_01').then(r => r.json());
// Joueur choisit option 2 : "start_quest:find_sacred_sword"

// 3. Déplacer le héros vers l'épée
await fetch('/api/game/move', {
  method: 'POST',
  body: JSON.stringify({
    playerId: 'player1',
    targetX: 15,
    targetY: 8
  })
});

// 4. Combat contre le gardien
const combat = await fetch('/api/game/combat/start', {
  method: 'POST',
  body: JSON.stringify({
    attackerId: 'player1',
    defenderId: 'guardian_01'
  })
});

// 5. Utiliser la magie pendant le combat
const spell = await magic.castSpell(
  'ψ(FIREBALL) → †(enemy.damage(50))',
  player,
  { target: 'guardian_01' }
);

// 6. Récupérer l'épée et compléter la quête
await fetch('/api/game/quests/find_sacred_sword/complete', {
  method: 'POST'
});

// 7. Créer un portail avec l'épée
const portal = await magic.castSpell(
  'CREATE_PORTAL(SACRED, @church)',
  player,
  { item: 'fire_sword' }
);
```

---

## 📊 CODES DE RETOUR

| Code | Signification |
|------|---------------|
| 200 | Succès |
| 201 | Créé (nouveau portail, etc.) |
| 400 | Erreur de requête (formule invalide) |
| 401 | Non autorisé |
| 404 | Ressource non trouvée |
| 409 | Conflit (sort déjà en cours) |
| 429 | Trop de requêtes |
| 500 | Erreur serveur |

---

## 🔐 HEADERS REQUIS

```http
Content-Type: application/json
X-Game-Session: {sessionId}
X-Player-Id: {playerId}
```

---

## 💡 BONNES PRATIQUES

1. **Utiliser le mode HYBRID** pour la magie (fallback local si backend down)
2. **Cacher les résultats** des formules fréquentes
3. **Batching** : Grouper les appels API quand possible
4. **Gestion d'erreur** : Toujours avoir un plan B
5. **Validation côté client** avant d'envoyer au serveur

---

## 🆘 SUPPORT

- **Backend Game** : GROEKEN (Boss Engine)
- **Backend Magie** : Technomancien
- **Frontend** : LOUMEN, SID
- **Effets** : URZ-KÔM

---

*Documentation créée par LOUMEN pour l'équipe REALGAME* 🕯️