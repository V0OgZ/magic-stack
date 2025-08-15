## Architecture (concise)
- Frontpage static: `FRONTPAGE/` served by Caddy
- Unified React app: `apps/magic-stack-unified/` (Editor/Game/Modes)
- World Editor: `apps/world-editor/`
- Java Spring Boot: `backends/java/` (base `/api`)
- Rust Axum: `backends/rust/` (base `/engine`)
- Vector bridge (Python): `backends/rust/vector_bridge.py` + `tools/vector_build`
- Interstice persistence: Java `/api/interstice/*` (H2 or memory)
- Cast flow: UI → Java `/api/magic/cast` → Rust `/temporal/*` → `trace_hash` + optional `world_diff`
- Health: `/api/magic/health`, `/engine/health`, `/api/interstice/status`
