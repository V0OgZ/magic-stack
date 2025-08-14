TEMPORAL GRAMMAR (v1.1) - COMPLETE REFERENCE

Goal
- Make formulas real and composable. This document defines the temporal grammar, AST mapping, execution model, and world-state impact. It is implementation oriented and matches the Rust parser currently in backends/rust/src/temporal_grammar.rs.

Core ideas
- A formula is an expression over 6D state (x,y,z,t,c,psi). It evaluates deterministically (simulate) and optionally applies a world diff (apply).
- Grammar operators are typed and composable; they do not rely on ad hoc string matching.

Operators (syntax -> AST)
- SHIFT(expr, offset)          -> Shift{ expr, offset:int }
- FORK(expr)                   -> Fork{ expr }
- MERGE(left, right)           -> Merge{ left, right }
- SEQ(e1, e2, ...)             -> Sequence([...])
- PAR(e1, e2, ...)             -> Parallel([...])
- LITERAL(TEXT) or TEXT        -> Literal(TEXT)

6D coordinates and meanings
- x,y,z  : spatial
- t      : temporal position
- c      : causal weight (0..1)
- psi    : identity/coherence (-1..1)

Evaluation model (simulate)
- Input: expression, context { variables, temporal_position, causal_probability, identity_coherence }
- Output: effects[] and a stable trace_hash
- Determinism: same expression, same context -> same effects and trace_hash

World-state impact (apply)
- SHIFT: delta.t += offset on targets. Drift updates may occur.
- FORK: duplicate current sub-state into two branches, each with its own c (weights). Branch ids must be recorded.
- MERGE: join branches using a policy (coherent|majority|energy). Produces a single state and discards branch tags.
- SEQ: evaluate sequentially; deltas accumulate in order.
- PAR: evaluate concurrently; resolve conflicts by policy (priority or weighted).
- LITERAL: evaluates to a value (variable or text); does not change state by itself.

Policies and constraints
- Max branches for FORK can be capped (e.g., 7) by gameplay policy.
- Lock vs shift conflicts must resolve deterministically (lock wins, or shift is queued/dampened).
- Energy/psi budgets limit the amplitude of effects in a window (anti spam).

Examples (simple)
1) SHIFT(FIREBALL, 5)
   - AST: Shift{ Literal("FIREBALL"), offset:5 }
   - Effects: temporal delta +5 for the sub-context

2) FORK(TELEPORT)
   - AST: Fork{ Literal("TELEPORT") }
   - Effects: two parallel branches running TELEPORT; branch tags emitted

3) MERGE(HEAL, SHIELD)
   - AST: Merge{ left: Literal("HEAL"), right: Literal("SHIELD") }
   - Effects: both evaluated and then fused according to policy

Examples (composed)
1) SEQ( SHIFT(ATTACK, 1), MERGE(BUFF, HEAL) )
2) PAR( SHIFT(SCOUT, -3), SHIFT(SCOUT, +3) )
3) SEQ( FORK(OBSERVE), MERGE(RESULT_A, RESULT_B) )

DTOs (target for /api/magic/cast)
- Request:
  {
    "formula_id": "TEMPORAL_SHIFT",
    "context": { "caster_id": "hero_1", "target_id": "enemy_3", "params": { "delta_t": 500 } },
    "mode": "simulate"
  }
- Response:
  {
    "applied": false,
    "effects": [ { "type": "temporal", "delta": { "t": 500 } } ],
    "world_diff": null,
    "trace_hash": "abc123...",
    "rendering": { "iconic": "...", "runic": "...", "quantum": "..." }
  }

Mapping to engine
- Parser: backends/rust/src/temporal_grammar.rs
  - parse(text) -> TemporalFormula{ ast, complexity, estimate }
  - execute(formula, context) -> JSON effects
- World-state: apply phase routes effects to orchestrator (Rust/Java) to mutate nodes and timelines.

Composition and determinism
- Sequence and Parallel combine sub-effects. Order matters for SEQ; conflict policy matters for PAR.
- A trace_hash must be computed over: formula source, normalized AST, normalized inputs, and seed. This guarantees reproducibility.

Authoring rules for designers
- Prefer SEQ/PAR to structure complex spells; avoid deep nesting if not needed.
- Use SHIFT for controlled rewinds/fast-forwards, not FORK spam.
- Limit branches; always plan a MERGE or COLLAPSE to avoid leaked timelines.

Testing guidance
- Unit: parse and execute each operator with minimal contexts, check effects and estimates.
- Integration: cast TEMPO SHIFT, CHRONO LOCK, CAUSAL FORK and verify effects deltas and branch tags.
- E2E: replay JSONL fixtures and compare snapshots across React and HTML parity runner.

Appendix: rough tokens used by the parser
- SHIFT ( expr , offset )
- FORK ( expr )
- MERGE ( left , right )
- SEQ ( e1 , e2 , ... )
- PAR ( e1 , e2 , ... )

This document is a stable reference for engine and gameplay design. Update when adding new operators or changing conflict policies.
