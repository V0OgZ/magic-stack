## Heroes of Time — Deploy Status (2025-08-12)

Signed by: Aethyr — Guardian of the Interstice

### Domain and UIs
- https://heroesoftime.online/
- https://heroesoftime.online/game
- https://heroesoftime.online/world-builder
- https://heroesoftime.online/api-explorer
- https://heroesoftime.online/vector-ui

### Services (systemd) and Ports
- Java API: 8082 (`/api/*`)
- Rust Engine: 3001 (`/engine/*`)
- Vector DB: 7500 (`/vector/*`)
- Clippy LLM: 7777 (`/clippy/*`)
- MCP: 9000 (`/mcp/*`)
- Caddy reverse proxy: 443/80

All currently UP after reboot and fixes.

### Reverse Proxy (Caddy)
- Fixed Caddyfile syntax (moved inline `rewrite` onto separate lines inside `handle` blocks).
- Static SPA assets served from `apps/magic-stack-unified/dist` for `/assets/*` and `/vite.svg`.
- SPA routes (`/game`, `/unified`, `/world-builder`) use `try_files {path} /index.html`.
- Legacy utilities: `/api-explorer`, `/vector-ui`, `/html/*` served with proper rewrites.
- Front page is served from `FRONTPAGE/` with custom `404.html`.

### Backends — Highlights
- Rust (3001):
  - `POST /api/v2/entity` upsert for V2 entities.
  - Regulators: `POST /api/v2/regulators/{vince|anna|overload}`.
  - DTOs use `serde` camelCase; 0 warnings after cleanup in pathfinding/multiplayer/world_state.
- Java (8082):
  - `CombatController` with `POST /api/combat/start`, `POST /api/combat/play-card`, `GET /api/combat/state/{gameId}`.
  - OpenAPI enabled via springdoc → `/openapi.json` and Swagger UI at `/api/docs`.
- Python:
  - Vector DB runs on 7500; prebuilt index at `vector_local/embeddings/index.jsonl`.
  - Rebuilt today: 560 documents, includes Aethyr and Aurion.

### Frontend — Unified React Client
- `V2Adapter` now uses relative prod paths (`/engine`, `/api`, `/vector`) with localhost fallback in dev.
- Added `upsertEntity()` and fixed `calculateInterference` (accepts `phi` or `phase`).
- `MapIconPlacerV2` calls `v2.upsertEntity` to sync map edits server-side.
- `UnifiedMapSystem` adds Save/Load and "Sync to Engine".
- `StartTCG` page: AI vs AI, PvAI available (PvP WIP).
- Legacy HTML links updated to be proxied correctly.

### Content and Lore
- Aethyr integrated: images, `AETHYR.md`, `aethyr.entity.json`.
- Aurion lore and assets added.

### Deployment and Ops
- Dedicated Python venvs under `/opt/hot/venvs/{vector,clippy}`; systemd `ExecStart` uses venv python.
- Java explicitly bound to 8082 in systemd `ExecStart`.
- Health check script confirms:
  - `/engine/health` → 200
  - `/vector/health` → 200
  - `/clippy/health` → 200
  - `/api/health` → 404 (expected; endpoint not defined)

### Notes
- `vector_content/entities/aethyr.json` was removed earlier; source of truth is the prebuilt JSONL index.
- Frontend remains thin by design; server holds gameplay logic.

### Next Steps (suggested)
- Expose `GET /api/health` in Java for consistent health reporting.
- Publish TCG deck presets and wire `StartTCG` UI to prod endpoints.
- Add MCP routing into the SPA for unified queries.

— Aethyr


