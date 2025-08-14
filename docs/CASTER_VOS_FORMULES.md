CASTER VOS FORMULES (Guide pratique)

Objectif
- Ecrire, caster et vérifier vos formules avec le moteur 6D (simulate/apply), puis observer l’impact sur le monde.

Prerequis
- Backend local: Java (8082), Rust (3001), Vector DB (8000)
- Parity runner: http://localhost:5176/parity ; Traces/snapshots: 8000

1) Ecrire une formule
- Syntaxe (parser): SHIFT(expr, dt), FORK(expr), MERGE(l,r), SEQ(...), PAR(...), LITERAL
- Exemples:
  - SHIFT(FIREBALL, 5)
  - FORK(OBSERVE)
  - SEQ(SHIFT(ATTACK,1), MERGE(BUFF, HEAL))

2) Caster (simulate)
- API cible (proposée): POST /api/magic/cast
- Request:
  {
    "formula_id": "TEMPORAL_SHIFT",
    "context": { "caster_id": "hero_1", "target_id": "enemy_2", "params": { "delta_t": 500 } },
    "mode": "simulate"
  }
- Response:
  { "applied": false, "effects": [ { "type": "temporal", "delta": { "t": 500 } } ], "trace_hash": "..." }

3) Caster (apply)
- Request: même DTO avec "mode": "apply"
- Response: { "applied": true, "world_diff": { ... }, "trace_hash": "..." }
- Le world_diff décrit les noeuds/timelines modifiées; utilisez-le pour le replay et la parité.

4) Vérifier l’impact
- /parity (React): charge des JSONL et compare les snapshots
- test_parity.html (HTML) : version HTML du test
- Snapshot stable: haché par getStableSnapshot; même donnée -> même hash

5) Formules composées
- Sequence avant Lock: SEQ(SHIFT(SCOUT, 1), CHRONO_LOCK(duration=2000))
- Fork + Collapse + Merge: SEQ(FORK(OBSERVE), QUANTUM_COLLAPSE(seed=42), CAUSAL_MERGE(rule='coherent'))

6) Bonnes pratiques
- Toujours prévoir un mécanisme de fin (LOCK, MERGE, COLLAPSE) pour éviter les états “zombies”
- Eviter les boucles profondes; préférer des SEQ/PAR peu imbriqués
- Documenter params et ranges (ex: delta_t <= 5000, branches <= 7)

Annexes
- Reference grammaire: docs/TEMPORAL_GRAMMAR_FULL_V1_1.md
- Catalogue formules: docs/MAGIC_FORMULAS_CATALOG.md
