# 📡 API REFERENCE COMPLÈTE V2
## Tous les endpoints - Format tableau pour copier/coller

---

## 🦀 RUST BACKEND (Port 3001)

| Méthode | Endpoint | Description | Payload Exemple |
|---------|----------|-------------|-----------------|
| **POST** | `/api/v2/tick` | ⚠️ OBLIGATOIRE toutes les 100ms | `{"current_tw": 100, "current_te": 95, "entities": [...]}` |
| **POST** | `/api/v2/entity` | Créer/modifier entité | `{"id": "e1", "position": {x,y,z,t,c,psi}, "energy": {amplitude,phase}}` |
| **GET** | `/api/v2/entity/{id}` | Récupérer entité | - |
| **DELETE** | `/api/v2/entity/{id}` | Supprimer entité | - |
| **GET** | `/api/v2/config` | Configuration V2 complète | - |
| **POST** | `/api/v2/drift` | Calculer dérive temporelle | `{"entity_id": "e1", "tw": 100, "te": 95}` |
| **POST** | `/api/v2/interference` | Interférence quantique | `{"entity1": "e1", "entity2": "e2"}` |
| **POST** | `/api/qstar/search` | 🚀 Q* Search (37x plus rapide) | `{"center": {x,y,z,t,c,psi}, "radius": 10, "mode": "QUANTUM"}` |
| **POST** | `/api/world-state/nodes` | Créer node | `{"id": "n1", "position": {x,y,z,t,c,psi}}` |
| **GET** | `/api/world-state/nodes/{id}` | Get node | - |
| **POST** | `/api/world-state/nodes/{id}/position` | Update position | `{"position": {x,y,z,t,c,psi}}` |
| **GET** | `/api/world-state/nodes/radius` | Search par radius | `?x=0&y=0&z=0&radius=10` |
| **POST** | `/api/world-state/collapse` | Collapse quantique | `{"nodeId": "n1", "playerId": "p1"}` |
| **GET** | `/api/world-state/identities/{id}/doubles` | Doubles quantiques | - |
| **POST** | `/agents/tick` | Tick agent IA | `{"agent_id": "a1", "state": {...}}` |
| **POST** | `/agents/plan` | Planification IA | `{"agent_id": "a1", "goal": "attack"}` |
| **POST** | `/agents/fork` | Fork timeline | `{"agent_id": "a1", "branch": "alpha"}` |
| **POST** | `/agents/merge` | Merge timelines | `{"branches": ["alpha", "beta"]}` |
| **POST** | `/agents/control` | Contrôle direct | `{"agent_id": "a1", "action": "move", "params": {...}}` |
| **POST** | `/agents/cast` | Cast via agent | `{"agent_id": "a1", "formula": "HEAL"}` |
| **POST** | `/api/causality/resolve` | Résolution causale | `{"center": {x,y,z,t,c,psi}, "radius": 5, "mode": "QUANTUM"}` |
| **POST** | `/api/test/all-formulas` | Test toutes formules | `{}` |
| **POST** | `/api/integration/formula-cast` | Cast intégré | `{"formula": "TEMPORAL_SHIFT"}` |
| **POST** | `/api/map/generate` | Générer map | `{"size": 100, "seed": 42}` |
| **POST** | `/api/map/init` | Initialiser map | `{"map_id": "m1"}` |
| **GET** | `/api/archives/status` | État Vector DB | - |
| **POST** | `/api/archives/search` | Recherche sémantique | `{"query": "temporal anomaly", "top_k": 5}` |
| **POST** | `/api/archives/build` | Rebuild index | `{}` |
| **GET** | `/api/economy/inventory` | Inventaire joueur | - |
| **POST** | `/api/economy/collect` | Collecter ressources | `{"resource": "crystal", "amount": 10}` |
| **POST** | `/api/economy/arcade-result` | Résultat arcade | `{"score": 1000, "game": "tetris"}` |
| **POST** | `/api/craft/potion` | Crafter potion | `{"type": "health", "ingredients": [...]}` |
| **POST** | `/api/craft/crystal` | Crafter cristal | `{"type": "temporal", "power": 10}` |
| **POST** | `/api/craft/artifact` | Crafter artefact | `{"type": "sword", "enchantments": [...]}` |
| **GET** | `/api/minigames/catalog` | Liste minijeux | - |
| **POST** | `/api/minigames/start` | Démarrer minijeu | `{"game": "temporal_puzzle"}` |
| **GET** | `/api/minigames/{id}` | État minijeu | - |
| **POST** | `/api/minigames/{id}/result` | Résultat minijeu | `{"score": 500, "completed": true}` |
| **POST** | `/api/minigames/auto-trigger` | Trigger auto | `{"condition": "enter_zone"}` |
| **GET** | `/api/hero/status` | Status héros | - |
| **POST** | `/api/hero/add-xp` | Ajouter XP | `{"amount": 100}` |
| **POST** | `/api/hero/apply-perk` | Appliquer perk | `{"perk": "double_jump"}` |
| **POST** | `/tcg/ai/decide` | Décision IA TCG | `{"combat_id": "c1", "game_state": {...}}` |
| **POST** | `/tcg/ai/coach` | Coach tactique | `{"combat_id": "c1", "situation": "losing"}` |
| **GET** | `/tcg/ai/telemetry/{id}` | Métriques IA | - |
| **POST** | `/matches` | Créer match | `{"player1": "p1", "player2": "p2"}` |
| **GET** | `/matches/{id}/state` | État match | - |
| **GET** | `/health` | Health check | - |
| **POST** | `/health` | Health check POST | `{}` |

---

## ☕ JAVA BACKEND (Port 8080)

| Méthode | Endpoint | Description | Payload Exemple |
|---------|----------|-------------|-----------------|
| **GET** | `/` | Page accueil | - |
| **GET** | `/api` | Documentation API | - |
| **GET** | `/api/health` | Health check | - |
| **GET** | `/api/status` | Status service | - |
| **POST** | `/api/combat/start` | 🎮 Démarrer combat TCG | `{"player1": "p1", "player2": "ai", "deck1": [...], "deck2": [...]}` |
| **POST** | `/api/combat/play-card` | Jouer carte | `{"combatId": "c1", "playerId": "p1", "cardId": "card_123", "target": "enemy"}` |
| **GET** | `/api/combat/status/{id}` | Status combat | - |
| **POST** | `/api/combat/end-turn` | Fin de tour | `{"combatId": "c1", "playerId": "p1"}` |
| **POST** | `/api/combat/enemy-turn` | Tour IA | `{"combatId": "c1"}` |
| **POST** | `/api/combat/surrender` | Abandonner | `{"combatId": "c1", "playerId": "p1"}` |
| **GET** | `/api/magic/health` | Santé moteur | - |
| **POST** | `/api/magic/cast` | 🔮 Lancer sort (869 formules) | `{"formula": "TEMPORAL_SHIFT", "caster": "e1", "target": "e2", "power": 10}` |
| **POST** | `/api/magic/translate` | Traduire formule | `{"formula": "HEAL", "language": "fr"}` |
| **POST** | `/api/magic/shift` | Décalage temporel | `{"entity": "e1", "delta_t": 10}` |
| **POST** | `/api/magic/fork` | Fork réalité | `{"entity": "e1", "branches": 2}` |
| **POST** | `/api/magic/merge` | Fusion timelines | `{"branches": ["alpha", "beta"]}` |
| **GET** | `/api/magic/formulas` | Liste 869 formules | - |
| **POST** | `/api/interstice/upload` | 📦 Upload entité 6D | `{"entity_type": "HERO", "name": "Hero1", "position_6d": {x,y,z,t,c,psi}}` |
| **POST** | `/api/interstice/download` | Download entité | `{"interstice_id": "i123"}` |
| **POST** | `/api/interstice/search` | Recherche 6D | `{"center": {x,y,z,t,c,psi}, "radius": 10}` |
| **GET** | `/api/interstice/status` | Status interstice | - |
| **GET** | `/api/regulators/status` | État régulateurs | - |
| **POST** | `/api/regulators/vince` | ⚡ Activer Vince | `{"intensity": 5}` |
| **POST** | `/api/regulators/anna` | 🌀 Activer Anna | `{"decay_rate": 0.1}` |
| **POST** | `/api/regulators/overload` | 💥 Activer Overload | `{"power": 100}` |
| **POST** | `/api/scenario/spawn-hero` | Spawn héros | `{"name": "Hero1", "position": {x,y}}` |
| **POST** | `/api/scenario/move-hero` | Déplacer héros | `{"heroId": "h1", "target": {x,y}}` |
| **POST** | `/api/scenario/use-artifact` | Utiliser artefact | `{"heroId": "h1", "artifactId": "a1"}` |
| **POST** | `/api/interstice/create-event` | Créer événement | `{"type": "temporal_anomaly", "position": {x,y,z,t,c,psi}}` |
| **POST** | `/api/interstice/make-choice` | Faire choix | `{"eventId": "e1", "choice": "option_a"}` |
| **POST** | `/api/interstice/cast-formula` | Lancer formule | `{"formula": "PARADOX_RESOLVE"}` |
| **POST** | `/api/mage/self-update` | Update mage | `{"mageId": "URZ-KOM", "position": {x,y,z}, "state": {...}}` |
| **POST** | `/api/mage/cast-and-play` | Cast & play | `{"mageId": "URZ-KOM", "spell": "TELEPORT", "action": "move"}` |
| **POST** | `/api/panopticon/feature-log` | Log feature | `{"mageId": "URZ-KOM", "feature": "new_spell", "description": "..."}` |
| **GET** | `/api/panopticon/feature-logs` | Get logs | `?limit=20` |
| **GET** | `/api/panopticon/feature-logs/{id}` | Logs par mage | - |
| **GET** | `/api/panopticon/world-state-graph` | Graph état monde | - |

---

## 🐍 PYTHON BACKEND (Port 5001)

| Méthode | Endpoint | Description | Payload Exemple |
|---------|----------|-------------|-----------------|
| **POST** | `/search` | 🔍 Recherche Vector DB | `{"query": "temporal anomaly", "mode": "semantic", "top_k": 5}` |
| **POST** | `/embed` | Créer embeddings | `{"text": "Heroes of time lore"}` |
| **GET** | `/api/status` | État service | - |
| **POST** | `/api/build` | Rebuild index | `{"force": true}` |
| **GET** | `/api/stats` | Statistiques | - |

---

## 🧪 EXPÉRIMENTAL - LLM (Ports 11434 & 8889)

| Méthode | Endpoint | Port | Description | Payload Exemple |
|---------|----------|------|-------------|-----------------|
| **GET** | `/` | 11434 | Ollama status | - |
| **POST** | `/api/generate` | 11434 | Générer texte | `{"model": "qwen2.5:0.5b", "prompt": "Hello"}` |
| **POST** | `/ask` | 8889 | Question Clippy | `{"question": "How to use V2?"}` |
| **POST** | `/character/speak` | 8889 | 🎭 Personnalité IA | `{"character": "dragon", "context": {...}}` |
| **POST** | `/dialogue` | 8889 | Dialogue entre persos | `{"characters": ["merlin", "dragon"], "topic": "time"}` |
| **POST** | `/ai/think` | 8889 | Stratégie IA | `{"situation": "combat", "state": {...}}` |
| **GET** | `/health` | 8889 | Health Clippy | - |

---

## 🔑 FORMATS DE DONNÉES V2

### Position 6D (OBLIGATOIRE)
```json
{
  "x": 0,      // Spatial X
  "y": 0,      // Spatial Y
  "z": 0,      // Spatial Z
  "t": 100,    // Temporal
  "c": 1,      // Causal
  "psi": 0.5   // Quantum [0.0-1.0]
}
```

### Entity V2
```json
{
  "id": "entity_123",
  "position": {/* Position 6D */},
  "tw": 1000,           // Temps monde
  "te": 950,            // Temps entité
  "drift": 50,          // tw - te
  "energy": {
    "amplitude": 1.0,   // Magnitude
    "phase": 0.785      // Radians (π/4)
  },
  "identity": {
    "quantum": 0.7,
    "collapsed": false
  },
  "debt": 10            // Dette temporelle
}
```

### Combat State
```json
{
  "combatId": "combat_123",
  "turn": 5,
  "activePlayer": "player_1",
  "players": {
    "player_1": {
      "health": 20,
      "mana": 5,
      "hand": ["card_1", "card_2"],
      "board": ["creature_1"]
    },
    "player_2": {/* ... */}
  }
}
```

---

## ⚡ COMMANDES CURL PRÊTES À L'EMPLOI

```bash
# 1. Q* Search V2 (REMPLACE LES EMBEDDINGS)
curl -X POST http://localhost:3001/api/qstar/search \
  -H "Content-Type: application/json" \
  -d '{"center":{"x":0,"y":0,"z":0,"t":0,"c":1,"psi":0.5},"radius":10,"mode":"QUANTUM"}'

# 2. V2 Tick (OBLIGATOIRE TOUTES LES 100MS)
curl -X POST http://localhost:3001/api/v2/tick \
  -H "Content-Type: application/json" \
  -d '{"current_tw":100,"current_te":95,"entities":[]}'

# 3. Démarrer Combat TCG
curl -X POST http://localhost:8080/api/combat/start \
  -H "Content-Type: application/json" \
  -d '{"player1":"test_player","player2":"ai"}'

# 4. Lancer Sort (869 formules disponibles)
curl -X POST http://localhost:8080/api/magic/cast \
  -H "Content-Type: application/json" \
  -d '{"formula":"TEMPORAL_SHIFT","caster":"entity_1","target":"entity_2","power":10}'

# 5. Recherche Vector DB
curl -X POST http://localhost:5001/search \
  -H "Content-Type: application/json" \
  -d '{"query":"temporal paradox resolution","mode":"semantic","top_k":5}'
```

---

## 📊 STATISTIQUES

- **Total endpoints** : 104
- **Rust** : 49 endpoints
- **Java** : 45 endpoints  
- **Python** : 5 endpoints
- **LLM** : 5 endpoints (expérimental)

---

**IMPORTANT** : Cette documentation est LA référence. Toute autre doc est obsolète.
