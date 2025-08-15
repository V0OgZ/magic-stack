# API Quick Reference

## Base URL
```
http://localhost:8080/api
```

## Authentication
Currently no authentication required (development mode)

## Endpoints

### 🔮 Magic System

#### List Formulas
```bash
GET /api/magic/formulas
```

#### Cast Spell
```bash
POST /api/magic/cast
{
  "formula": "HEAL",
  "target": "player1",
  "power": 10
}
```

#### Spell History
```bash
GET /api/magic/history
```

### 🌌 Interstice 6D

#### Upload Entity
```bash
POST /api/interstice/upload
{
  "entity_type": "MAGE",
  "name": "MyMage",
  "entity_data": {
    "level": 10,
    "class": "Wizard"
  }
}
```

#### Download Entity
```bash
GET /api/interstice/download/{interstice_id}
```

#### Search Entities
```bash
POST /api/interstice/search
{
  "center": {"x": 50, "y": 50, "z": 0},
  "radius": 30
}
```

#### System Status
```bash
GET /api/interstice/status
```

### 👁️ Panopticon

#### World State Graph
```bash
GET /api/panopticon/world-state-graph
```

#### Log Feature
```bash
POST /api/panopticon/feature-log
{
  "mageId": "URZ-KOM",
  "feature": "Created new spell",
  "description": "Fireball spell v2",
  "color": "#ff6600"
}
```

#### Get Feature Logs
```bash
GET /api/panopticon/feature-logs?limit=20
GET /api/panopticon/feature-logs/{mageId}
```

### 🧙 Mage Operations

#### Self Update
```bash
POST /api/mage/self-update
{
  "mageId": "URZ-KOM",
  "position": {"x": 10, "y": 20, "z": 0},
  "state": {
    "action": "exploring",
    "energy": 80
  }
}
```

#### Cast and Play
```bash
POST /api/mage/cast-and-play
{
  "mageId": "URZ-KOM",
  "spell": "TELEPORT",
  "gameAction": "move_to_castle"
}
```

## Response Format

### Success
```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2024-08-04T18:00:00Z"
}
```

### Error
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Examples

### Full Upload Flow
```bash
# 1. Upload entity
curl -X POST http://localhost:8080/api/interstice/upload \
  -H "Content-Type: application/json" \
  -d '{"entity_type":"MAGE","name":"TestMage"}'

# 2. Search for it
curl -X POST http://localhost:8080/api/interstice/search \
  -H "Content-Type: application/json" \
  -d '{"center":{"x":50,"y":50,"z":0},"radius":100}'

# 3. Log action
curl -X POST http://localhost:8080/api/panopticon/feature-log \
  -H "Content-Type: application/json" \
  -d '{"mageId":"TestMage","feature":"First action"}'
```

## Rate Limits

No rate limits in development mode.

## WebSocket (Coming Soon)

Real-time updates planned for:
- Live entity movements
- Spell cast notifications
- Feature log streaming