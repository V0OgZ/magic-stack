# Référence API – Avalon / MagicStack

**Base**: `/api/v1`

## Worlds
### GET `/worlds/{world_id}`
- **200**: `world` (voir `world.schema.json`)

### PATCH `/worlds/{world_id}` (JSON Patch RFC6902)
- Body: `patch.schema.json`
- Headers: `If-Match: X-World-Version`
- **200**: `{ world, world_version }`
- **409**: version conflict

### POST `/worlds`
- Body:
```json
{ "name":"MyWorld","template":"heroes_like_basic","mode":"heroes_like" }
201: { world_id }

Graph
GET /worlds/{id}/graph
POST /worlds/{id}/graph/nodes
{ "pos":{"x":10,"y":5},"tags":["village"] }
DELETE /worlds/{id}/graph/nodes/{node_id}
Timeline & Causalité
POST /worlds/{id}/timeline/events
Body: event.schema.json

POST /worlds/{id}/timeline/links
{ "from":"event_id_A","to":"event_id_B","kind":"causal_requires" }
POST /worlds/{id}/timeline/simulate
{ "from":"now","to":"+600s","mode":"deterministic","seed":1234 }
200:

{ "trace":[{"t":5,"event":"spawn","id":"e1"}],
  "paradoxes":[{"at_t":300,"reason":"collision_same_entity_multi_state","entities":["A"]}] }
Agents
POST /worlds/{id}/agents
{ "kind":"regulator","node_id":"uuid","traits":{"aggressiveness":0.6,"pursuit_depth":4} }
POST /worlds/{id}/agents/{agent_id}/config
{ "traits":{"reaction_ms":200}, "policy":"auto" }
POST /worlds/{id}/agents/{agent_id}/tick // debug
Paradoxes & Combats
POST /worlds/{id}/paradox/resolve
{ "mode":"tcg|auto","entities":["entA","entB"],"seed":42 }
200:

{ "result":"win|lose|draw","log":[...], "state_changes":[ ... JSON Patch ... ] }
TCG
POST /tcg/start { "deckA":"id","deckB":"id","rules":"std_v1" }
POST /tcg/step { "battle_id":"uuid","action":{"play_card":"firebolt","target":"x"} }
POST /tcg/auto { "battle_id":"uuid","until":"end" }
Planner Q*
POST /worlds/{id}/plan
{ "agent_id":"uuid","goal":{"type":"intercept","target":"entity_id"},
  "horizon_s":120, "constraints":{"max_cost":100} }
200:

{ "plan":[{"t":0,"move_to":"node_9"},{"t":8,"use":"portal_A"}], "score":0.83 }
Assets & Projets
POST /projects { "name":"Demo","template":"heroes_like_basic"}
POST /projects/{id}/export { "format":"zip","include_assets":true }
POST /assets/import { "type":"tileset","url":"https://..." }
WebSocket /ws
Topics:

world.{id}.patch | world.{id}.events | agent.{id}.tick | sim.{id}.status


---

### 04_OPENAPI.yaml
```yaml
openapi: 3.0.3
info:
  title: Avalon API
  version: 1.0.0
servers:
  - url: http://localhost:5000/api/v1
paths:
  /worlds:
    post:
      summary: Create world from template
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [name, template, mode]
              properties:
                name: { type: string }
                template: { type: string }
                mode: { type: string, enum: [heroes_like, tcg, sandbox, point_and_click] }
      responses:
        '201':
          description: Created
          content:
            application/json:
              schema:
                type: object
                properties:
                  world_id: { type: string }
  /worlds/{world_id}:
    get:
      summary: Get world snapshot
      parameters:
        - in: path
          name: world_id
          required: true
          schema: { type: string }
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema: { $ref: '#/components/schemas/World' }
    patch:
      summary: Patch world (RFC6902)
      parameters:
        - in: path
          name: world_id
          required: true
          schema: { type: string }
        - in: header
          name: If-Match
          required: false
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/JsonPatch'
      responses:
        '200':
          description: Patched
          headers:
            X-World-Version:
              schema: { type: string }
              description: Updated world version
          content:
            application/json:
              schema:
                type: object
                properties:
                  world: { $ref: '#/components/schemas/World' }
                  world_version: { type: string }
        '409': { description: Version conflict }
  /worlds/{world_id}/timeline/events:
    post:
      summary: Create timeline event
      parameters:
        - in: path
          name: world_id
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: '#/components/schemas/Event' }
      responses:
        '201': { description: Created }
  /worlds/{world_id}/timeline/simulate:
    post:
      summary: Simulate timeline window
      parameters:
        - in: path
          name: world_id
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                from: { type: string }
                to: { type: string }
                mode: { type: string, enum: [deterministic, stochastic] }
                seed: { type: integer }
      responses:
        '200':
          description: Trace and paradoxes
          content:
            application/json:
              schema:
                type: object
                properties:
                  trace:
                    type: array
                    items:
                      type: object
                      properties:
                        t: { type: number }
                        event: { type: string }
                        id: { type: string }
                  paradoxes:
                    type: array
                    items:
                      type: object
                      properties:
                        at_t: { type: number }
                        reason: { type: string }
                        entities:
                          type: array
                          items: { type: string }
  /worlds/{world_id}/agents:
    post:
      summary: Spawn agent
      parameters:
        - in: path
          name: world_id
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: '#/components/schemas/AgentSpawn' }
      responses:
        '201':
          description: Created
          content:
            application/json:
              schema:
                type: object
                properties:
                  agent_id: { type: string }
  /worlds/{world_id}/paradox/resolve:
    post:
      summary: Resolve paradox
      parameters:
        - in: path
          name: world_id
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [mode, entities]
              properties:
                mode: { type: string, enum: [tcg, auto] }
                entities:
                  type: array
                  items: { type: string }
                seed: { type: integer }
      responses:
        '200':
          description: Resolution result
          content:
            application/json:
              schema:
                type: object
                properties:
                  result: { type: string, enum: [win, lose, draw] }
                  log: { type: array, items: { type: object } }
                  state_changes: { $ref: '#/components/schemas/JsonPatch' }
components:
  schemas:
    World:
      $ref: './05_JSON_SCHEMAS/world.schema.json'
    Event:
      $ref: './05_JSON_SCHEMAS/event.schema.json'
    AgentSpawn:
      $ref: './05_JSON_SCHEMAS/agent_config.schema.json'
    JsonPatch:
      $ref: './05_JSON_SCHEMAS/patch.schema.json'
05_JSON_SCHEMAS/world.schema.json
{
  "$id": "world.schema.json",
  "type": "object",
  "required": ["world_id","name","mode","ruleset","graph","timelines","version"],
  "properties": {
    "world_id": { "type": "string" },
    "name": { "type": "string" },
    "mode": { "type": "string", "enum": ["heroes_like","tcg","sandbox","point_and_click"] },
    "ruleset": {
      "type": "object",
      "properties": {
        "time_scale": { "type": "number", "default": 1.0 },
        "fog_causality": { "type": "boolean", "default": true },
        "pvp": { "type": "boolean", "default": false }
      },
      "additionalProperties": true
    },
    "layers": { "type": "array", "items": { "type": "string" } },
    "graph": {
      "type": "object",
      "properties": {
        "nodes": { "type": "array", "items": { "type": "object" } },
        "edges": { "type": "array", "items": { "type": "object" } }
      }
    },
    "timelines": { "type": "array", "items": { "type": "string" } },
    "created_at": { "type": "string" },
    "updated_at": { "type": "string" },
    "version": { "type": "string" }
  },
  "additionalProperties": true
}
05_JSON_SCHEMAS/timeline.schema.json
{
  "$id": "timeline.schema.json",
  "type": "object",
  "required": ["timeline_id","name","events"],
  "properties": {
    "timeline_id": { "type": "string" },
    "name": { "type": "string" },
    "events": {
      "type": "array",
      "items": { "$ref": "event.schema.json" }
    }
  }
}
05_JSON_SCHEMAS/event.schema.json
{
  "$id": "event.schema.json",
  "type": "object",
  "required": ["time","type","timeline"],
  "properties": {
    "event_id": { "type": "string" },
    "time": { "type": "string", "description": "iso8601 or relative +Xs" },
    "type": { "type": "string", "enum": ["spawn","portal_open","combat","loot","dialog","custom"] },
    "timeline": { "type": "string" },
    "payload": { "type": "object", "additionalProperties": true },
    "causes": { "type": "array", "items": { "type": "string" } },
    "effects": { "type": "array", "items": { "type": "string" } },
    "visibility": { "type": "string", "enum": ["public","masked","fogged"], "default": "public" }
  },
  "additionalProperties": false
}
05_JSON_SCHEMAS/agent_config.schema.json
{
  "$id": "agent_config.schema.json",
  "type": "object",
  "required": ["kind"],
  "properties": {
    "kind": { "type": "string", "enum": ["regulator","npc","player"] },
    "node_id": { "type": ["string","null"] },
    "traits": {
      "type": "object",
      "properties": {
        "aggressiveness": { "type": "number", "minimum": 0, "maximum": 1, "default": 0.5 },
        "pursuit_depth": { "type": "integer", "minimum": 0, "maximum": 8, "default": 3 },
        "reaction_ms": { "type": "integer", "minimum": 10, "maximum": 5000, "default": 250 }
      },
      "additionalProperties": true
    },
    "capabilities": { "type": "array", "items": { "type": "string" } },
    "policy": { "type": "string", "enum": ["auto","scripted"], "default": "auto" },
    "script_ref": { "type": ["string","null"] },
    "timeline": { "type": ["string","null"] },
    "resources": { "type": "object", "additionalProperties": true }
  },
  "additionalProperties": false
}
05_JSON_SCHEMAS/patch.schema.json
{
  "$id": "patch.schema.json",
  "type": "array",
  "items": {
    "type": "object",
    "required": ["op","path"],
    "properties": {
      "op": { "type": "string", "enum": ["add","remove","replace","move","copy","test"] },
      "path": { "type": "string" },
      "from": { "type": "string" },
      "value": {}
    }
  }
}
06_QA_TESTS.md
