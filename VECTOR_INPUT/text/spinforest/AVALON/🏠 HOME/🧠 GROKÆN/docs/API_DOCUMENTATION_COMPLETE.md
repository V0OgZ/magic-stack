# 📚 DOCUMENTATION API COMPLÈTE - AGENTS SYSTEM RUST

**🤖 Backend Rust - Heroes of Time**  
**📡 Port 3001 - API Reference Complète**  
**🎮 AI vs AI + PVE System**

---

## 🚀 **DÉMARRAGE RAPIDE**

### ⚡ **URL DE BASE**
```
http://localhost:3001
```

### 🔧 **HEADERS REQUIS**
```http
Content-Type: application/json
X-Agents-Version: 1
```

---

## 📡 **ENDPOINTS PRINCIPAUX**

### 🏥 **Health Check**
```http
POST /health
```

**Request:**
```json
{}
```

**Response:**
```json
{
  "ok": true,
  "version": "1.0.0",
  "timestamp": 1704654321000,
  "components": {
    "agents_system": "online",
    "match_manager": "ready",
    "pathfinding": "operational",
    "ai_engine": "active"
  }
}
```

---

## 🤖 **AGENTS SYSTEM**

### ⚡ **Agents Tick**
```http
POST /agents/tick
```

**Request PVE:**
```json
{
  "viewport": {
    "width": 50,
    "height": 50,
    "portals": [
      {"id": "p1", "x": 25, "y": 25, "active": true, "tl": "principale"}
    ],
    "entities": [
      {"id": "player1", "x": 10, "y": 10, "tl": "principale"}
    ]
  },
  "meta": {
    "mode": "PVE",
    "difficulty": "normal"
  }
}
```

**Request PVP_SIM:**
```json
{
  "viewport": {
    "width": 50,
    "height": 50,
    "portals": [],
    "entities": [
      {"id": "hunter1", "x": 10, "y": 10, "tl": "principale"},
      {"id": "judge1", "x": 40, "y": 40, "tl": "principale"}
    ]
  },
  "meta": {
    "mode": "PVP_SIM",
    "difficulty": "hard",
    "matchId": "match-001"
  }
}
```

**Response:**
```json
{
  "commands": [
    {"type": "move", "id": "hunter_123", "x": 15.5, "y": 20.3},
    {"type": "spawn", "id": "enemy_456", "x": 30, "y": 25, "hp": 80, "maxHp": 80, "sprite": "paradox_hunter"},
    {"type": "phase", "x": 40, "y": 35, "radius": 3.0, "phase": 1},
    {"type": "say", "text": "Hunter attaque!", "level": "info"}
  ],
  "serverTime": 1704654321000,
  "nextTickMs": 500
}
```

### 🗺️ **Path Planning**
```http
POST /agents/plan
```

**Request:**
```json
{
  "start": {"x": 0, "y": 0, "tl": "principale"},
  "goal": {"x": 50, "y": 50, "tl": "principale"},
  "opts": {
    "heuristic": "manhattan",
    "budgetMs": 100
  }
}
```

**Response:**
```json
{
  "path": [
    {"x": 0, "y": 0, "tl": "principale"},
    {"x": 10, "y": 10, "tl": "principale"},
    {"x": 25, "y": 25, "tl": "principale"},
    {"x": 50, "y": 50, "tl": "principale"}
  ],
  "cost": 70.7,
  "ok": true
}
```

---

## 🏆 **MATCHES AI vs AI**

### 🆕 **Créer Match**
```http
POST /matches
```

**Request:**
```json
{
  "mode": "PVP_SIM",
  "seed": "battle-001",
  "map": {"width": 50, "height": 50},
  "agents": [
    {"id": "A1", "kind": "hunter", "side": "A", "tl": "principale"},
    {"id": "B1", "kind": "judge", "side": "B", "tl": "principale"}
  ]
}
```

**Response:**
```json
{
  "matchId": "uuid-generated-match-id"
}
```

### 📊 **État Match**
```http
GET /matches/{matchId}/state
```

**Response:**
```json
{
  "tick": 42,
  "entities": [
    {
      "id": "A1",
      "x": 15.5,
      "y": 20.3,
      "tl": "principale",
      "hp": 85,
      "maxHp": 100,
      "sprite": "hunter",
      "side": "A",
      "kind": "hunter"
    }
  ],
  "score": {
    "A": 150.5,
    "B": 120.8
  }
}
```

### 🛠️ **Debug Command**
```http
POST /matches/{matchId}/command
```

**Request:**
```json
{
  "command": {"type": "pause", "duration": 5}
}
```

**Response:**
```json
{
  "ok": true
}
```

---

## 📊 **ENDPOINTS UTILITAIRES**

### 🎚️ **Niveaux Difficulté**
```http
GET /agents/difficulties
```

**Response:**
```json
{
  "difficulties": [
    {
      "level": "easy",
      "description": "IA lente, réactions simples, tick 1000ms",
      "ai_intelligence": 0.3,
      "reaction_time": "1000ms",
      "prediction_depth": 2
    },
    {
      "level": "normal",
      "description": "IA équilibrée, tactiques moyennes, tick 500ms",
      "ai_intelligence": 0.6,
      "reaction_time": "500ms",
      "prediction_depth": 4
    },
    {
      "level": "hard",
      "description": "IA rapide, stratégies avancées, tick 200ms",
      "ai_intelligence": 0.9,
      "reaction_time": "200ms",
      "prediction_depth": 8
    }
  ],
  "default": "normal"
}
```

### 🤖 **Types Agents**
```http
GET /agents/types
```

**Response:**
```json
{
  "agent_types": [
    {
      "kind": "hunter",
      "name": "Chasseur de Paradoxes",
      "description": "Traque et élimine les anomalies temporelles",
      "abilities": ["tracking", "phase_attack", "temporal_sight"],
      "preferred_tactics": "aggressive_pursuit"
    },
    {
      "kind": "judge",
      "name": "Juge Temporel",
      "description": "Maintient l'équilibre et régule le jeu",
      "abilities": ["balance_restoration", "temporal_regulation", "causality_resolve"],
      "preferred_tactics": "strategic_positioning"
    },
    {
      "kind": "trinity",
      "name": "Coordinateur Trinity",
      "description": "Orchestre la coordination entre agents",
      "abilities": ["agent_coordination", "tactical_sync", "harmony_field"],
      "preferred_tactics": "team_coordination"
    }
  ]
}
```

### 🎮 **Modes Jeu**
```http
GET /agents/modes
```

**Response:**
```json
{
  "modes": [
    {
      "mode": "PVE",
      "name": "Player vs Environment",
      "description": "Joueur contre IA",
      "features": ["adaptive_ai", "dynamic_spawning", "progressive_difficulty"]
    },
    {
      "mode": "PVP_SIM",
      "name": "PVP Simulation",
      "description": "IA vs IA pour simulation",
      "features": ["deterministic_matches", "replay_system", "statistics_tracking"]
    },
    {
      "mode": "SPECTATE",
      "name": "Spectateur",
      "description": "Observer sans interagir",
      "features": ["read_only", "match_analysis", "replay_viewing"]
    }
  ]
}
```

---

## ⚙️ **TYPES DE COMMANDES**

### 📋 **Commandes Disponibles**

```typescript
// Déplacement
{
  "type": "move",
  "id": "agent_123",
  "x": 15.5,
  "y": 20.3
}

// Apparition
{
  "type": "spawn",
  "id": "enemy_456",
  "x": 30,
  "y": 25,
  "sprite": "paradox_hunter",
  "hp": 80,
  "maxHp": 80
}

// Disparition
{
  "type": "despawn",
  "id": "enemy_456"
}

// Phase temporelle
{
  "type": "phase",
  "x": 40,
  "y": 35,
  "radius": 3.0,
  "phase": 1
}

// Résolution causale
{
  "type": "resolve",
  "x": 25,
  "y": 30
}

// Activation portail
{
  "type": "portal",
  "id": "portal_789"
}

// Message
{
  "type": "say",
  "text": "Action effectuée!",
  "level": "info" // "info" | "warn" | "error"
}
```

---

## 🌟 **HÉRITAGE MAGICSTACK**

### 🔮 **Endpoints 6D**
```http
POST /api/search      # Recherche 6D spatiotemporelle
POST /api/upload      # Upload données 6D
POST /api/formula     # Exécution formules temporelles
```

### ⭐ **Endpoints Q***
```http
POST /api/qstar/search    # Pathfinding Q* avancé
POST /api/qstar/optimize  # Optimisation Q*
```

### 📊 **Analytics**
```http
GET /api/analytics     # Métriques système
GET /api/performance   # Stats performance
GET /openapi          # Documentation OpenAPI
```

---

## 🔧 **GESTION ERREURS**

### ⚠️ **Codes Retour**
- **200** : Succès
- **400** : Requête invalide
- **404** : Endpoint non trouvé
- **500** : Erreur serveur
- **408** : Timeout (> 2.5s)

### 🛡️ **Timeout Handling**
Si le traitement dépasse 2.5s, le serveur retourne :
```json
{
  "commands": [],
  "serverTime": 1704654321000,
  "nextTickMs": 1000
}
```

---

## 💻 **EXEMPLES FRONTEND**

### ⚡ **JavaScript Vanilla**
```javascript
// Tick agents PVE
const response = await fetch('http://localhost:3001/agents/tick', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Agents-Version': '1'
  },
  body: JSON.stringify({
    viewport: {
      width: 50,
      height: 50,
      portals: [],
      entities: [
        {id: 'player1', x: 10, y: 10, tl: 'principale'}
      ]
    },
    meta: {
      mode: 'PVE',
      difficulty: 'normal'
    }
  })
});

const data = await response.json();
console.log('Commands:', data.commands);
```

### ⚛️ **React Hook**
```jsx
import { useState, useEffect } from 'react';

const useAgentsSystem = () => {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const tick = async (viewport, meta) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/agents/tick', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Agents-Version': '1'
        },
        body: JSON.stringify({ viewport, meta })
      });
      
      const data = await response.json();
      setCommands(data.commands);
      return data;
    } catch (error) {
      console.error('Agents tick error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return { commands, loading, tick };
};
```

---

## 🧪 **TESTS**

### 🔧 **Script Test Automatisé**
```bash
./TEST_AGENTS_SYSTEM_RUST.sh
```

### 📋 **Tests Manuels cURL**
```bash
# Health check
curl -X POST http://localhost:3001/health \
  -H 'Content-Type: application/json' \
  -d '{}'

# Agents tick
curl -X POST http://localhost:3001/agents/tick \
  -H 'Content-Type: application/json' \
  -H 'X-Agents-Version: 1' \
  -d '{
    "viewport": {
      "width": 50,
      "height": 50,
      "portals": [],
      "entities": [{"id": "player1", "x": 10, "y": 10, "tl": "principale"}]
    },
    "meta": {
      "mode": "PVE",
      "difficulty": "normal"
    }
  }'
```

---

## 🎯 **PERFORMANCE**

### ⚡ **Métriques**
- **Réponse API** : < 50ms moyenne
- **Timeout** : 2.5s maximum
- **Démarrage** : < 3 secondes
- **Mémoire** : ~45MB utilisation
- **Concurrence** : Multi-thread Tokio

### 🛡️ **Robustesse**
- Gestion timeout automatique
- Fallback responses
- Thread-safe avec Mutex
- Gestion erreurs gracieuse
- CORS permissif développement

---

## 🎮 **POUR LES DÉVELOPPEURS FRONTEND**

### 🚀 **Intégration Immédiate**
1. **Démarrer le serveur** : `cargo run` dans `/rust_backend`
2. **Tester health** : `POST /health`
3. **Implémenter tick loop** avec `/agents/tick`
4. **Gérer les commandes** retournées
5. **Créer matches AI vs AI** avec `/matches`

### 💡 **Tips**
- Utiliser `difficulty: "normal"` par défaut
- Implémenter retry sur timeout
- Gérer les commandes `move`, `spawn`, `despawn` en priorité
- Logger les commandes `say` pour debug
- Utiliser `matchId` pour les sessions PVP_SIM

---

**🤖 BACKEND RUST AGENTS SYSTEM - READY FOR ACTION! 🚀**