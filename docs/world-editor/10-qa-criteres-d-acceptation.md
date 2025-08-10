# QA & Critères d'acceptation

## Unit (Rust/Python)
- **World Patch**: applique/rejette selon schéma + version.
- **Timeline Simulate**: deterministic avec `seed`, détecte paradoxes.
- **Paradox Resolver**: route AUTO vs TCG selon sévérité.
- **Planner Q***: plan ≤ horizon, coût ≤ contraintes.

## Intégration
- **Playtest pipeline**: create world → place nodes → add events → simulate → resolve paradox → apply patches → WS notifs ordonnées.
- **Agents**: spawn → pursuit → engage → combat → evaluate.

## Perf (MVP)
- Patch p95 < 25 ms (local).
- Sim +300s p95 < 150 ms (carte démo).
- 128 agents: tick p95 < 10 ms chacun.

## Critères d'acceptation (MVP)
- Créer un monde, 5 objets, 2 agents, 3 events, simuler +300s **sans erreur**.
- Paradoxe majeur → TCG → résultat appliqué (patch) → cohérence état.
- Export/import projet (zip) identique (hash stable des JSON).
07_GLOSSAIRE.md
