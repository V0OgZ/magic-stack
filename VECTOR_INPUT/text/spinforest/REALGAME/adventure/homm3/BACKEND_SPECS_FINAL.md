# 🎯 **SPÉCIFICATIONS BACKEND FINALES - VALIDÉES VINCENT**

**Pour SURFACE** - Endpoints à implémenter pour intégration HOMM3 6D

---

## ✅ **AJUSTEMENTS VALIDÉS**

### **🪄 Cast Java - Payload Ajusté**
```javascript
// PRIMARY payload (recommandé)
POST /api/magic/cast
{
  "formula": "ECHO_TEMPOREL",
  "target": "self",  // ou "enemy" ou coordinates
  "power": 10
}

// FALLBACK payload (compatibilité)
POST /api/magic/cast  
{
  "formula": "ECHO_TEMPOREL",
  "parameters": {
    "target": "self",
    "power": 10,
    "duration": 5,
    "... autres params"
  }
}
```

### **🌐 WSG Nearby - Endpoint Cohérent**
```javascript
// Endpoint cohérent avec WSG existant
GET /api/panopticon/world-state-graph/nearby?x=10&y=15&radius=5

// Réponse
{
  "entities": [
    {
      "id": "hero_123",
      "position": {"x": 12, "y": 14, "z": 0},
      "type": "player_hero",
      "distance": 2.8
    }
  ],
  "total_nearby": 3,
  "radius_queried": 5
}
```

### **🗺️ Map Init - Created Now**
```javascript
POST /api/map/init
{
  "map": { "obstacles": [...], "terrain": [...] },
  "time_windows": [{"start": 2, "end": 8, "period": 12}]
}

// Réponse enrichie
{
  "created_total": 245,      // Total entités sur carte
  "created_now": 12,         // Créées cette fois-ci ⭐ NOUVEAU
  "gathering_spots": 8,      // Spots de collecte ajoutés
  "time_windows_applied": 1
}
```

---

## 🔧 **ENDPOINTS À IMPLÉMENTER**

### **💰 ÉCONOMIE**

#### **📦 Inventaire**
```javascript
GET /api/economy/inventory

Response:
{
  "resources": {
    "gold": 150,
    "herbs": 25,
    "temporal_essence": 3
  },
  "items": {
    "health_potion": 5,
    "temporal_elixir": 1
  },
  "artifacts": {
    "temporal_blade": {
      "quality": 4,
      "stats": {"attack": 25, "speed": 10}
    }
  },
  "metadata": {
    "level": 3,
    "last_updated": 1703123456789
  }
}
```

#### **🌿 Collecte**
```javascript
POST /api/economy/collect
{
  "position": {"x": 15, "y": 20, "z": 0, "timeline": "principale"},
  "resource_type": "herbs",  // optionnel
  "biome": "forest",
  "timestamp": 1703123456789
}

Response:
{
  "success": true,
  "resource": "healing_herbs",
  "quantity": 3,
  "rarity": "rare",
  "xp_gained": 15,
  "cooldown_until": 1703123466789
}
```

#### **🎮 Arcade Rewards**
```javascript
POST /api/economy/arcade-result
{
  "minigame_id": "panoramix_potions",
  "completion_data": {
    "success": true,
    "rewards": {"item": "health_potion_super", "quantity": 2},
    "time_spent": 45000
  },
  "timestamp": 1703123456789
}

Response:
{
  "success": true,
  "rewards_applied": {
    "items": {"health_potion_super": 2},
    "xp": {"alchemy": 50}
  },
  "new_inventory_state": { ... }
}
```

### **🧪 CRAFT SYSTÈME**

#### **🧙‍♂️ Potions**
```javascript
POST /api/craft/potion
{
  "recipe_id": "potion_vie",
  "ingredients": {"herbs": 3, "water": 1, "honey": 1},
  "timestamp": 1703123456789
}

Response:
{
  "success": true,
  "item_id": "health_potion_super",
  "item_name": "Potion de Vie",
  "quality": 4,           // 1-5
  "purity": 87.3,         // 0-100%
  "effects": ["+50 HP", "Régénération 5 tours"],
  "runes_used": "⟨ᚨᚲᚢᚨ_ᚢᛁᛏᚨᛖ⟩",
  "consumed_resources": {"herbs": 3, "water": 1, "honey": 1}
}
```

#### **💎 Cristaux**
```javascript
POST /api/craft/crystal
{
  "formula": "temporal_stability",
  "components": {"sulfur": 2, "carbon": 3, "temporal_essence": 1},
  "timestamp": 1703123456789
}

Response:
{
  "success": true,
  "crystal_type": "temporal_crystal",
  "stability": 92.5,      // 0-100%
  "purity": 78.1,         // 0-100%
  "temporal_aspect": 3,   // 0-6 (dimensions)
  "senku_formula": "C + S + TE → Temporal Crystal",
  "consumed_components": { ... }
}
```

#### **⚒️ Artefacts**
```javascript
POST /api/craft/artifact
{
  "blueprint_id": "temporal_blade",
  "materials": {"steel_ingot": 3, "temporal_essence": 2, "runic_crystal": 1},
  "timestamp": 1703123456789
}

Response:
{
  "success": true,
  "artifact_id": "temporal_blade_001",
  "artifact_name": "Lame Temporelle",
  "quality": 5,
  "stats": {"attack": 25, "speed": 10, "temporal_strike": true},
  "runes_inscribed": ["ᛏᛖᛗᛈᚢᛋ", "ᛁᚲᛏᚢᛋ"],
  "durability": 100
}
```

### **📜 RUNES & MAGIE**

#### **🎓 Apprentissage Runes**
```javascript
POST /api/mage/learn-runes
{
  "runes": ["ᚨ", "ᛒ", "ᚲ"],
  "learning_method": "runic_console",
  "timestamp": 1703123456789
}

Response:
{
  "success": true,
  "runes_learned": ["ᚨ", "ᛒ", "ᚲ"],
  "spells_unlocked": ["runic_light", "runic_heal"],
  "knowledge_gained": 75,
  "total_runes_known": 15
}
```

---

## 🎯 **ORDRE D'IMPLÉMENTATION SUGGÉRÉ**

### **PHASE 1 - Économie Base (1-2 jours)**
1. `GET /api/economy/inventory`
2. `POST /api/economy/collect`
3. `POST /api/economy/arcade-result`

### **PHASE 2 - Craft Potions (1-2 jours)**
1. `POST /api/craft/potion` (Panoramix priority)
2. Ajustement `POST /api/magic/cast` (primary payload)

### **PHASE 3 - WSG + Maps (1 jour)**
1. `GET /api/panopticon/world-state-graph/nearby`
2. Ajustement `POST /api/map/init` (created_now)

### **PHASE 4 - Craft Avancé (optionnel M2)**
1. `POST /api/craft/crystal` (Senku)
2. `POST /api/craft/artifact` (Forge)
3. `POST /api/mage/learn-runes`

---

## 🔄 **INTÉGRATION FRONTEND**

### **URL Patterns Cohérents :**
- **Rust** : `/agents/*`, `/api/world-state/*`, `/api/causality/*`, `/api/map/*`, `/api/panopticon/*`
- **Java** : `/api/magic/*`, `/api/economy/*`, `/api/craft/*`, `/api/mage/*`

### **Headers Standards :**
```javascript
{
  "Content-Type": "application/json",
  "Accept": "application/json",
  "X-Player-ID": "player_123",  // optionnel
  "X-Timeline": "principale"    // optionnel
}
```

### **Error Format :**
```javascript
{
  "success": false,
  "error": "INSUFFICIENT_RESOURCES",
  "message": "Not enough herbs: need 5, have 2",
  "error_code": 400,
  "timestamp": 1703123456789
}
```

---

## ✅ **VALIDATION & TESTS**

### **Test Endpoints :**
```bash
# Test inventaire
curl -X GET http://localhost:8082/api/economy/inventory

# Test collecte
curl -X POST http://localhost:8082/api/economy/collect \
  -H "Content-Type: application/json" \
  -d '{"position":{"x":10,"y":15},"biome":"forest"}'

# Test craft potion
curl -X POST http://localhost:8082/api/craft/potion \
  -H "Content-Type: application/json" \
  -d '{"recipe_id":"potion_vie","ingredients":{"herbs":3,"water":1}}'

# Test WSG nearby  
curl -X GET "http://localhost:3001/api/panopticon/world-state-graph/nearby?x=10&y=15&radius=5"
```

---

## 🚀 **READY TO ROCK !**

**Vincent a validé ce plan tel quel !** 

**SURFACE** : Implémenter ces endpoints selon les spécifications exactes.

**Frontend** : Prêt à intégrer dès que les endpoints sont disponibles !

L'architecture est **SOLIDE** et **ÉVOLUTIVE** ! 🎯⚡
