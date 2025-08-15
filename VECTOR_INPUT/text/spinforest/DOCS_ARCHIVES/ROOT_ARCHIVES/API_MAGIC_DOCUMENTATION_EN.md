# MAGIC STACK API - TECHNICAL DOCUMENTATION
## RESTful API for 6D Entity Persistence

**Base URL**: `http://localhost:8080`  
**Status**: ✅ OPERATIONAL  
**869 magic formulas available**

---

## QUICK START

### 1. CHECK SERVICE HEALTH
```bash
curl http://localhost:8080/api/magic/health
```

Expected response:
```json
{
  "status": "MAGICAL",
  "formulas_loaded": 869,
  "temporal_grammar": "ACTIVE",
  "dimensions": 6
}
```

### 2. CAST A SIMPLE SPELL
```bash
curl -X POST http://localhost:8080/api/magic/cast \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "fire_ball",
    "power": 50,
    "targetX": 10,
    "targetY": 20,
    "targetZ": 0
  }'
```

---

## AVAILABLE ENDPOINTS

### CAST SPELL
**POST** `/api/magic/cast`

Cast a spell in 6D space.

**Request Body**:
```json
{
  "formula": "string",
  "power": "number (0-100)",
  "targetX": "number",
  "targetY": "number", 
  "targetZ": "number"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Spell cast successfully",
  "damage": 50,
  "effects": ["burn", "stun"],
  "coordinates": {
    "x": 10, "y": 20, "z": 0,
    "t": 1735392000,
    "c": 0.8,
    "psi": 0.5
  }
}
```

### TRANSLATE FORMULA
**POST** `/api/magic/translate`

Translate a formula to different magical languages.

**Request Body**:
```json
{
  "formula": "fire_ball",
  "fromLanguage": "standard",
  "toLanguage": "temporal"
}
```

### TEMPORAL SHIFT
**POST** `/api/magic/shift`

Perform temporal displacement on entities.

**Request Body**:
```json
{
  "entityId": "string",
  "timeDelta": -5,
  "preserveCausality": true
}
```

### LIST ALL FORMULAS
**GET** `/api/magic/formulas`

Get the complete list of 869 available formulas.

**Response**:
```json
[
  {
    "id": "fire_ball",
    "name": "Fire Ball",
    "category": "destruction",
    "manaCost": 30,
    "description": "Classic fireball spell"
  },
  ...
]
```

---

## INTERSTICE API (6D PERSISTENCE)

### UPLOAD ENTITY
**POST** `/api/interstice/upload`

Save an entity with 6D coordinates.

**Request Body**:
```json
{
  "entityId": "unique_id",
  "entityData": {
    "name": "Entity Name",
    "type": "entity_type",
    "attributes": {}
  }
}
```

**Response**:
```json
{
  "uploadId": "upload_uuid",
  "coordinates": {
    "x": 85.89,
    "y": 85.72,
    "z": 28.92,
    "t": 1754318121.268,
    "c": 0.8,
    "psi": 0.9
  },
  "message": "Entity uploaded successfully",
  "worldHash": "AVALON_1754317928853"
}
```

### DOWNLOAD ENTITY
**POST** `/api/interstice/download`

Retrieve an entity from 6D space.

**Request Body**:
```json
{
  "entityId": "unique_id"
}
```

### SEARCH 6D
**POST** `/api/interstice/search`

Search entities in 6D space.

**Request Body**:
```json
{
  "centerX": 0,
  "centerY": 0,
  "centerZ": 0,
  "radius": 10,
  "dimensions": ["x", "y", "z"]
}
```

---

## MAGE API (AUTO-UPDATE)

### SELF-UPDATE
**POST** `/api/mage/self-update`

Update mage state after important actions.

**Request Body**:
```json
{
  "mageId": "mage_id",
  "state": {
    "level": 10,
    "experience": 1500,
    "lastAction": "defeated_dragon"
  },
  "action": "action_name",
  "formule": "magic_formula"
}
```

### CAST AND PLAY
**POST** `/api/mage/cast-and-play`

Cast a spell while playing (roleplay + technical).

**Request Body**:
```json
{
  "mageId": "mage_id",
  "sortType": "purge_temporelle",
  "cible": "/tmp/*",
  "incantation": "Disappear, cursed files!",
  "parametres": {
    "force": 10
  }
}
```

---

## ERROR CODES

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 404 | Not Found - Entity or formula not found |
| 500 | Internal Server Error |

---

## 6D COORDINATE SYSTEM

### Dimensions

- **X, Y, Z**: Spatial coordinates (any real number)
- **T**: Temporal coordinate (timestamp in seconds)
- **C**: Causality coefficient (0.0 to 1.0)
- **Psi (Ψ)**: Quantum coefficient (-1.0 to 1.0)

### Example 6D Position
```json
{
  "x": 85.89,
  "y": 85.72,
  "z": 28.92,
  "t": 1754318121.268,
  "c": 0.8,
  "psi": 0.9,
  "valid": true
}
```

---

## RATE LIMITING

- 100 requests per minute per IP
- 10 concurrent connections max
- Large uploads limited to 10MB

---

## EXAMPLES

### Complete Spell Cast Example
```bash
curl -X POST http://localhost:8080/api/magic/cast \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "temporal_freeze",
    "power": 75,
    "targetX": 50,
    "targetY": 50,
    "targetZ": 10,
    "duration": 5000,
    "casterLevel": 15
  }'
```

### Entity Upload Example
```bash
curl -X POST http://localhost:8080/api/interstice/upload \
  -H "Content-Type: application/json" \
  -d '{
    "entityId": "HERO_MERLIN",
    "entityData": {
      "name": "Merlin",
      "class": "Wizard",
      "level": 20,
      "inventory": ["staff", "spellbook"],
      "stats": {
        "health": 100,
        "mana": 200
      }
    }
  }'
```

---

*Technical Documentation - Magic Stack API v1.0*