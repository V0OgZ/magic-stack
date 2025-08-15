SCRIBE — Journal et décisions (Magic Stack)

But: garder une mémoire claire et actionnable des décisions, de l'état réel du moteur et des tâches à livrer. Ce dossier est la référence rapide de l'équipe.

État actuel (casting/formules)
- UI cast → démo: POST /api/interstice/cast-formula (substring matching, effets mock)
- Moteur réel disponible mais non branché sur le cast:
  - Rust: parseur grammaire temporelle backends/rust/src/temporal_grammar.rs (SHIFT/FORK/MERGE/SEQ/PAR)
  - Java: backends/java/.../MagicController (/api/magic/cast) logique minimale
  - Vector DB: formules canoniques via simple_vector_server.py (GET /formulas)

Conséquence: les formules “frontpage” existent (données), mais l'exécution en jeu passe par un chemin démo.

Décisions validées
- Garder le chemin démo derrière un flag (useDemoCasting) uniquement pour les présentations
- Passer le cast UI sur l'API moteur unifiée (Java ou Rust intégré) avec formula_id
- Résoudre formula_id via une Registry (Vector DB + cache) puis exécuter via grammaire (Rust)
- Renvoyer des effets 6D structurés + trace_hash et appliquer au world-state en mode apply

Plan de remédiation — Milestone 1 (Cast « réel »)
- Frontend
  - [ ] Route principale: POST /api/magic/cast (payload: formula_id, context, mode: simulate|apply)
  - [ ] Flag useDemoCasting pour conserver la démo
- Java (moteur)
  - [ ] FormulaRegistry: fetch formula_id → expression (Vector DB /formulas), cache TTL, validation
  - [ ] MagicEngineService.cast: appeler l'exécution (Rust) et normaliser la réponse (effets 6D, rendering)
- Rust (exécution)
  - [ ] Exposer/valider un endpoint d'exécution grammaire (parse + execute) → effets normalisés
- Tests
  - [ ] Unit: Registry (cache/fallback/version), parse/exec (SHIFT/FORK/MERGE)
  - [ ] Intégration: Cast end‑to‑end (UI→Java→Registry→Rust→world‑diff, trace_hash stable)
  - [ ] E2E « Spells Lab »: fixture demo_formulas.jsonl, snapshots identiques React/HTML

Risques & garde‑fous
- Latence: cache local des formules, pré‑fetch au boot
- Sécurité: n'accepter que des formula_id connus en prod; texte libre en sandbox
- Parité visuelle: conserver les mêmes FX/UI, alimentés par la réponse moteur

Liens/code utiles
- Rust grammaire: backends/rust/src/temporal_grammar.rs
- Java cast: backends/java/src/main/java/com/magicstack/controllers/MagicController.java
- Java moteur: backends/java/src/main/java/com/magicstack/services/MagicEngineService.java
- UI API: apps/magic-stack-unified/src/api/MagicStackAPI.ts
- Démo interstice (à laisser sous flag): simple-scenario-backend/src/main/java/.../IntersticeService.java
- Vector DB formules: simple_vector_server.py (/formulas)
- Specs moteur 0826: ___LATEST ENGINE SPECS - 0826/MASTER.md

Conventions SCRIBE
- Logs quotidiens: LOG_YYYY-MM-DD.md
- Chaque log: Constat → Décisions → Actions → Questions ouvertes
- Les checklists de milestone vivent ici et sont référencées dans les PRs

Owner: « SCRIBE » (assistant). Ce dossier est la source courte pour ne pas se perdre dans le code.
