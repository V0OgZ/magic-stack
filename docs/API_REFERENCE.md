# 🔮 Magic Stack API Reference (Prod)

Base URLs (prod):
- Java backend: /api
- Rust engine: /engine
- Vector DB: /vector
- LLM (if available): /llm

All services support CORS for the UI clients. Prefer relative paths in prod; use localhost only for local dev.

## Java Backend ()

- GET /health
- GET /status

### Magic ()
- GET /magic/health
- POST /magic/cast
- POST /magic/translate
- POST /magic/shift
- POST /magic/fork
- POST /magic/merge
- GET /magic/formulas
- GET /magic/dimensions/{entityId}
- GET /magic/world-state/changes?limit=N
- POST /magic/translate-scenario

Body for cast:
- { formula: string, mode?: 'simulate'|'apply', context?: object, seed?: number }

### Interstice ()
- POST /interstice/upload
- POST /interstice/download
- POST /interstice/search
- GET /interstice/status
- POST /interstice/nursery/admit

### Heroes ()
- GET /heroes
- GET /heroes/{id}
- POST /heroes
- PUT /heroes/{id}
- DELETE /heroes/{id}
- GET /heroes/search?type=...

### API Doc ()
- GET /api returns a JSON summary of key endpoints and examples

## Rust Engine ()
- GET /health
- POST /v2/tick
- POST /temporal/execute
- POST /temporal/apply

## Vector DB ()
- GET /health
- POST /reload
- POST /search

## Conventions
- Use relative bases in prod (/api, /engine, /vector, /llm).
- Do not double-prefix paths (cast is /magic/cast under /api => /api/magic/cast).
- Prefer simulate for UI demos; apply mutates world and may return worldDiff.

## Examples

### Cast (simulate)


### Interstice upload


### Vector search

