MAGIC TEMPORAL GRAMMAR SPEC (v1.1)

Status
- Authoritative spec for the temporal grammar used by the 6D engine.
- Targets the Rust parser at backends/rust/src/temporal_grammar.rs.

1. Goals
- Express time/causal/identity operations in a small, typed core.
- Be composable (Sequence/Parallel), deterministic (simulate/apply), and auditable (trace_hash).
- Map directly to an AST and evaluation rules; no ad hoc substring checks.

2. Formal grammar (EBNF)

Terminal = UPPERCASE_ID | NUMBER | STRING .

Expr     = Shift
         | Fork
         | Merge
         | Seq
         | Par
         | Literal ;

Shift    = "SHIFT" "(" Expr "," Offset ")" ;
Offset   = SIGNED_INT ;

Fork     = "FORK" "(" Expr ")" ;

Merge    = "MERGE" "(" Expr "," Expr ")" ;

Seq      = "SEQ" "(" ExprList ")" ;
Par      = "PAR" "(" ExprList ")" ;
ExprList = Expr { "," Expr } ;

Literal  = Terminal ;

Notes
- Whitespace is insignificant outside tokens.
- Terminal identifiers are case sensitive.
- For production usage: implement a proper lexer (here a simplified tokenizer is used).

3. AST mapping
- SHIFT(e, dt)  -> Shift{ expr:e, offset:dt }
- FORK(e)       -> Fork{ expr:e }
- MERGE(l, r)   -> Merge{ left:l, right:r }
- SEQ(e1,...)   -> Sequence([e1,...])
- PAR(e1,...)   -> Parallel([e1,...])
- LITERAL(T)    -> Literal(T)

4. Types and context
- World coordinates: (x,y,z,t,c,psi) where:
  - t: temporal position (float or int)
  - c: causal weight/probability in [0..1]
  - psi: identity/coherence in [-1..1]
- Execution context:
  {
    variables: Map<string, JSON>,
    temporal_position: number,
    causal_probability: number,
    identity_coherence: number
  }

5. Operational semantics (simulate)
- Literal(X):
  - If variables contains X, yields that JSON value; else yields string X.
  - No state change.
- Shift{ e, dt }:
  - Evaluate e under context' where context'.t = context.t + dt.
  - Yields the value of e under the shifted context.
- Fork{ e }:
  - Evaluate e twice under the same context, producing two values.
  - Yields { fork: [v1, v2] }.
  - In apply mode it produces two branches (see 7.).
- Merge{ l, r }:
  - Evaluate l and r under the same context.
  - Yields { merge: { left: vL, right: vR } }.
  - In apply mode, resolves branches according to a policy (see 7.).
- Sequence([e1..en]):
  - Evaluate in order; yield [v1..vn].
- Parallel([e1..en]):
  - Evaluate concurrently; yield [v1..vn] (order unspecified, must be normalized before hashing).

6. Determinism and hashing
- A stable trace_hash MUST be computed over:
  - Normalized AST (canonical JSON with sorted keys and positional lists)
  - Normalized inputs (context values rounded as policy dictates)
  - Version fields (grammar version, catalog version)
  - Seed (if present)
- Same inputs -> same trace_hash.

7. World-state impact (apply)
- World diff is the only authority; the engine MUST emit a diff and then apply it idempotently.
- Shift: delta.t += offset for targeted nodes (caster/target).
- Fork: create two tagged branches with weights c1, c2 (default 0.5/0.5 or policy-defined). Record branch ids.
- Merge: resolve and collapse branches by rule:
  - coherent: maximize identity_coherence (psi)
  - majority: choose the branch with higher c
  - energy: choose the branch with higher derived energy
- Sequence: apply diffs in order; diffs compose additively unless conflict resolution specifies otherwise.
- Parallel: apply diffs using a conflict policy (priority or weighted); MUST be deterministic.

8. Conflict policies
- Lock vs shift: active Lock prevents time delta; the shift is queued or dampened as per gameplay policy.
- Parallel conflicts: default priority by subexpression order then by policy weight.
- Merge: rule required; default is coherent.

9. Safety constraints
- Max branches allowed per Fork (default 7).
- Max absolute Shift offset per cast (policy defined; e.g., 5000ms) to prevent runaway time.
- Energy/amplitude (psi) budgets per window to prevent spam.

10. Examples
- Simple:
  - SHIFT(FIREBALL, 5)
  - FORK(OBSERVE)
  - MERGE(HEAL, SHIELD)
- Composed:
  - SEQ(SHIFT(ATTACK, 1), MERGE(BUFF, HEAL))
  - PAR(SHIFT(SCOUT, -3), SHIFT(SCOUT, +3))
  - SEQ(FORK(OBSERVE), MERGE(RESULT_A, RESULT_B))

11. API surface (target)
- POST /api/magic/cast { formula_id, context, mode }
  - Server resolves formula_id to an expression (Vector DB) and parses/executes.
  - Response: { applied, effects[], world_diff?, trace_hash, rendering? }
- GET /api/magic/formulas returns ids and expressions with categories and version.

12. Normalization rules
- Numbers in world snapshots rounded to 3 decimals for hashing.
- Arrays sorted where order is semantically irrelevant (e.g., Parallel results).
- Keys sorted lexicographically before hashing.

13. Testing and conformance
- Unit tests per operator: parse, execute (simulate), and world diff composition (apply).
- Integration tests: cast flows for TEMPORAL_SHIFT, CHRONO_LOCK, CAUSAL_FORK, CAUSAL_MERGE.
- E2E parity runner: replay JSONL fixtures and compare snapshot hashes across React and HTML.

14. Versioning and compatibility
- Grammar version v1.1; incompatible changes MUST bump minor/major.
- Servers MUST advertise grammar_version and catalog_version in health endpoints.

15. Appendix: tokenizer notes
- The current tokenizer inserts spaces around parentheses and commas, then splits on whitespace. Production systems should replace this with a proper lexer to handle strings/escapes robustly.
