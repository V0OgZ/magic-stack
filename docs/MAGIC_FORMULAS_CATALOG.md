MAGIC FORMULAS CATALOG (v1.1)

Scope
- Single source of truth for magic formulas used by the 6D engine
- Categories, canonical expressions, parameters, effects, and composition rules
- Maps each formula_id to the temporal grammar (AST) used by the Rust executor
- DTO examples for /api/magic/cast (simulate/apply)

Engine assumptions
- Grammar nodes: Literal, Shift, Fork, Merge, Sequence, Parallel
- World representation: 6D position (x,y,z,t,psi,sigma) + world state
- Modes: simulate (effects only) or apply (commit world_diff)
- Determinism: same input -> same trace_hash

DTOs (target)
- Request: { formula_id: string, context: { caster_id: string, target_id?: string, params?: object }, mode: 'simulate'|'apply' }
- Response: { applied: boolean, effects: Effect[], world_diff?: object, trace_hash: string, rendering?: { iconic?: string, runic?: string, quantum?: string } }
- Effect model (typical): { type: 'temporal|spatial|energy|quantum|portal|reality', magnitude?: number, duration?: number, zone?: { center: {x,y}, radius }, delta?: { x,y,z,t,psi,sigma } }

Index by category
- Temporal (time operations)
  - TEMPORAL_SHIFT
  - TIME_DILATION
  - CHRONO_LOCK
- Causal (branching of timelines)
  - CAUSAL_FORK
  - CAUSAL_MERGE
- Quantum (state reduction / wave dynamics)
  - QUANTUM_COLLAPSE
  - WAVE_FUNCTION
- Energy (complex amplitude)
  - ENERGY_COMPLEX
- Interstice / Portal (space shortcuts)
  - INTERSTICE_PORTAL
- Dimensional (folds and high order constructs)
  - DIMENSION_FOLD
- Reality Weave (matrix interactions)
  - REALITY_WEAVE

Canonical formulas (with mapping)

TEMPORAL_SHIFT
- id: TEMPORAL_SHIFT
- expression: Psi(t) = Psi0 * e^(i * omega * t) * R(Delta_t)
- grammar: Sequence( [ Literal('Psi0'), Shift{ expr: Literal('Psi'), offset: +Delta_t } ] )
- params: { delta_t: number }
- effects: { type: 'temporal', delta: { t: +delta_t } }
- simulate request:
  { "formula_id":"TEMPORAL_SHIFT", "context":{ "caster_id":"hero_1", "params": { "delta_t": 2000 } }, "mode":"simulate" }
- apply semantics: commit updated t in target timeline; update drift and trace_hash
- combos: with CHRONO_LOCK (shift before or after lock), with ENERGY_COMPLEX (phase-shifted move)

TIME_DILATION
- id: TIME_DILATION
- expression: dt' = dt * sqrt(1 - v^2 / c^2)
- grammar: Literal with parameterized transform
- params: { factor: number in (0,1] } or velocity proxy v
- effects: { type: 'temporal', magnitude: factor } (affects subsequent time deltas)
- simulate:
  { "formula_id":"TIME_DILATION", "context":{ "caster_id":"hero_1", "params": { "factor": 0.7 } }, "mode":"simulate" }
- apply: attach local time scale modifier to caster for duration window
- combos: TEMPORAL_SHIFT under dilation yields smaller actual Delta_t

CHRONO_LOCK
- id: CHRONO_LOCK
- expression: L(t) = delta(t - t0) * Psi(t0)
- grammar: Sequence( [ Literal('Lock'), Parallel([]) ] ) (engine marker)
- params: { t0: number, duration?: ms }
- effects: { type: 'temporal', duration: ms, delta: { t: 0 } } (freeze local t at t0)
- simulate/apply similar; lock ends after duration or external counter-effect
- combos: combine with REALITY_WEAVE to stabilize; conflict with SHIFT

CAUSAL_FORK
- id: CAUSAL_FORK
- expression: Fork( Psi )
- grammar: Fork{ expr: Literal('Psi') }
- params: { branches: int=2 }
- effects: { type: 'causal', magnitude: branches } (creates shadow timelines)
- apply: annotate world with branches; assign probabilities
- combos: Merge after exploration; with ENERGY_COMPLEX to weight branches

CAUSAL_MERGE
- id: CAUSAL_MERGE
- expression: Merge( left, right )
- grammar: Merge{ left, right }
- params: { rule: 'coherent|majority|energy' }
- effects: { type: 'causal', magnitude: 1 } (collapse to single timeline by rule)
- combos: Fork + Merge canonical pair; with QUANTUM_COLLAPSE yields deterministic merge

QUANTUM_COLLAPSE
- id: QUANTUM_COLLAPSE
- expression: |Psi> = sum(alpha_i |i>) -> |n>
- grammar: Literal with collapse operator
- params: { basis?: string, pick?: 'max|random|seeded', seed?: number }
- effects: { type: 'quantum', delta: { psi: 0 } } and selection of basis state
- combos: after Fork, to select one path; before Merge for determinism

WAVE_FUNCTION
- id: WAVE_FUNCTION
- expression: Psi(x,t) = A * sin(kx - omega t + phi)
- grammar: Sequence (wave evolution)
- params: { A: number, k: number, omega: number, phi: number }
- effects: { type: 'quantum', magnitude: A, rendering: runic/quantum }
- combos: with ENERGY_COMPLEX to control amplitude/phase

ENERGY_COMPLEX
- id: ENERGY_COMPLEX
- expression: E = A * e^(i Phi) + nabla^2 Psi
- grammar: Literal + Sequence
- params: { A: number, Phi: number in radians }
- effects: { type: 'energy', delta: { psi: f(A,Phi) } }
- combos: modulate SHIFT or WAVE_FUNCTION; impact Merge weights

INTERSTICE_PORTAL
- id: INTERSTICE_PORTAL
- expression: P = lim(n->inf) (1 + z/n)^n (open a portal)
- grammar: Sequence + Literal ('Portal')
- params: { to: { x,y }, cost?: number, duration?: ms }
- effects: { type: 'portal', zone: { center: to, radius: 1 }, duration }
- combos: with DIMENSION_FOLD for long-range; with CHRONO_LOCK to stabilize

DIMENSION_FOLD
- id: DIMENSION_FOLD
- expression: D6 = X3 * T * C * Psi (fold across 6D)
- grammar: Parallel + Sequence
- params: { fold_factor: number in (0,1] }
- effects: { type: 'spatial', magnitude: fold_factor } (path length reduction)
- combos: with INTERSTICE_PORTAL and REALITY_WEAVE for efficient traversal

REALITY_WEAVE
- id: REALITY_WEAVE
- expression: R = sum_ij (M_ij * Psi_i * Psi_j*)
- grammar: Parallel interactions
- params: { matrix: number[][] or preset }
- effects: { type: 'reality', magnitude: norm(M) }
- combos: pairs naturally with Collapse/Lock to stabilize outcomes

Composition patterns
- Sequence(A,B,...): A then B; deterministic order; combine deltas additively
- Parallel(A,B,...): execute concurrently; resolve conflicts by policy (priority or weights)
- Shift(expr, dt): time shift of an inner expression; often combined with Lock
- Fork(expr): branch and tag sub-states; Merge reconciles by rule
- Merge(l,r): merge two sub-states; rules define winner or blended state

Safety and constraints
- Lock + Shift conflicts: if Lock active, Shift is queued or diminished
- Max branches in Fork: capped by policy (e.g., 7)
- Energy budget: ENERGY_COMPLEX caps magnitude per window
- Portal costs: INTERSTICE_PORTAL requires energy or triggering condition

Examples (compose)
1) Quick reposition with temporal safety
- Sequence( TEMPORAL_SHIFT(+500), CHRONO_LOCK(t0=now, duration=2000) )
- Simulate:
  { "formula_id":"TEMPORAL_SHIFT", "context":{ "caster_id":"h1", "params": { "delta_t": 500 } }, "mode":"simulate" }
  then Lock

2) Scout two outcomes and settle on best
- Sequence( CAUSAL_FORK(2), QUANTUM_COLLAPSE(pick='seeded', seed=42), CAUSAL_MERGE(rule='coherent') )

3) Long-range travel
- Sequence( DIMENSION_FOLD(factor=0.3), INTERSTICE_PORTAL(to={x:1200,y:600}, duration=5000) )

4) Amplified wave strike
- Sequence( ENERGY_COMPLEX(A=75,Phi=1.57), WAVE_FUNCTION(A=50,k=0.8,omega=2.4,phi=0.3) )

5) Stabilize portal in turbulence
- Parallel( REALITY_WEAVE(preset='stability'), CHRONO_LOCK(duration=1500) )

Vector DB mapping (examples)
- TEMPORAL_SHIFT -> Psi(t) = Psi0 * e^(i*omega*t) * R(Delta_t)
- QUANTUM_COLLAPSE -> |Psi> = Sum(alpha_i|i>) -> |n>
- CAUSAL_FORK -> Fork(Psi)
- CAUSAL_MERGE -> Merge(L,R)
- ENERGY_COMPLEX -> E = A * e^(i Phi) + nabla^2 Psi
- INTERSTICE_PORTAL -> P = lim(n->inf) (1 + z/n)^n
- CHRONO_LOCK -> L(t) = delta(t - t0) * Psi(t0)
- TIME_DILATION -> dt' = dt * sqrt(1 - v^2/c^2)
- DIMENSION_FOLD -> D6 = X3 * T * C * Psi
- REALITY_WEAVE -> R = Sum(M_ij * Psi_i * Psi_j*)

Testing guidance
- Unit: registry fetch + TTL, grammar parse of each formula, rendering stubs
- Integration: /api/magic/cast simulate returns consistent effects and trace_hash for given seed
- E2E: Spells Lab fixture (JSONL) replays to identical snapshots on React/HTML
- Determinism: repeated runs produce same trace_hash and world_diff

Rollout notes
- Keep demo route behind a feature flag for showcases
- Add version field to formula catalog; pin version in production
- Cache warmup on backend boot for frequently used formulas

Appendix: AST sketches
- TEMPORAL_SHIFT: Sequence( [ Literal('Psi0'), Shift{ expr: Literal('Psi'), offset: +Delta_t } ] )
- CAUSAL_FORK: Fork{ expr: Literal('Psi') }
- CAUSAL_MERGE: Merge{ left: Literal('PsiL'), right: Literal('PsiR') }
- QUANTUM_COLLAPSE: Literal('Collapse') with parameterized selection
- ENERGY_COMPLEX: Sequence( [ Literal('E'), Literal('nabla2Psi') ] ) with amplitude/phase
- INTERSTICE_PORTAL: Sequence( [ Literal('Portal'), Literal('Open') ] )
- DIMENSION_FOLD: Parallel( [ Literal('X3'), Literal('T'), Literal('C'), Literal('Psi') ] )

This catalog is implementation oriented (v1.1). Update it when adding new formula_ids or when grammar semantics change. ASCII only.
