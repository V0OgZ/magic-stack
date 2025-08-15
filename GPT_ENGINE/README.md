GPT ENGINE — Owner notes and runbook

Purpose
- Single source for engine owner (React/logic + backends) to keep status, decisions, and how-to run.

Owner
- GPT-5 (React/logic, Java↔Rust wiring)

Current state (casting)
- UI (unified) casts via POST /api/magic/cast (no demo path in React)
- Java MagicEngineService resolves formulaId|formula via FormulaRegistryService
- Java calls Rust temporal executor; response includes outputs{iconic,literary,runic,quantum}, effects[], sounds[], traceHash
- Rust exposes /temporal/parse and /temporal/execute; returns normalized AST and stable trace_hash

How to run locally (mac-safe)
1) Rust server (port 3001)
   - cd backends/rust
   - cargo build
   - RUST_PORT=3001 ./target/debug/magic-stack-server
   - Health: curl -m 2 -sS --fail-with-body http://localhost:3001/health
   - Parse:  curl -m 2 -sS --fail-with-body -H "Content-Type: application/json" -d '{"formula":"SHIFT ( FIREBALL , 5 )"}' http://localhost:3001/temporal/parse
   - Exec:   curl -m 2 -sS --fail-with-body -H "Content-Type: application/json" -d '{"formula":"SHIFT ( FIREBALL , 5 )"}' http://localhost:3001/temporal/execute

2) Java backend (port 8082)
   - cd backends/java
   - mvn -DskipTests package
   - RUST_BASE_URL=http://localhost:3001 mvn -DskipTests spring-boot:run
   - Health: curl -m 2 -sS --fail-with-body http://localhost:8082/api/health
   - Cast:   curl -m 2 -sS --fail-with-body -H "Content-Type: application/json" -d '{"formula":"TEMPUS::FREEZE","mode":"simulate"}' http://localhost:8082/api/magic/cast

3) Unified React app (port 5176)
   - cd apps/magic-stack-unified
   - npm run dev
   - Parity: http://localhost:5176/parity
   - QuickCast panel uses /api/magic/cast and shows 4 outputs

Decisions (frozen)
- React unified must call /api/magic/cast only (no demo toggle)
- Java normalizes outputs and proxies to Rust executor; traceHash is mandatory
- Vector DB registry resolves formula_id to expression (TTL cache); fallback to text in dev

Milestone checklist
- Done
  - React path normalized to /api/magic/cast; outputs mapped
  - Java DTOs extended (formulaId, mode, context, seed; outputs/effects/sounds/traceHash)
  - Rust endpoints /temporal/parse and /temporal/execute live
- Next
  - Add apply mode: persist world events and return world-diff
  - Add 5 integration tests asserting stable traceHash
  - Surface traceHash in UI debug panel

Logs convention
- Daily logs in this folder: LOG_YYYY-MM-DD.md (short: Findings → Decisions → Actions → Open)

Pointers
- Rust grammar: backends/rust/src/temporal_grammar.rs
- Rust server: backends/rust/src/main.rs
- Java engine: backends/java/src/main/java/com/magicstack/services/MagicEngineService.java
- React API: apps/magic-stack-unified/src/api/MagicStackAPI.ts


