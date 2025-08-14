SCRIBE MAP — Cartographie du projet (haut niveau)

But: regrouper l'essentiel (docs + code) par domaines pour que chaque agent trouve vite où agir.

1) Moteur 6D (cœur)
- Modèle 6D
  - Rust: backends/rust/src/position_6d.rs (struct Position6D, validations)
  - Java: backends/java/src/main/java/com/magicstack/models/Position6D.java
  - Doc: magic-stack/docs/6D_SYSTEM_EXPLAINED.md
- Grammaire temporelle (concepts)
  - Doc: magic-stack/docs/TEMPORAL_GRAMMAR_FULL.md
  - Rust (parseur/AST): backends/rust/src/temporal_grammar.rs (SHIFT/FORK/MERGE/SEQ/PAR)
- Q* / Monde orchestré
  - Rust (routes): backends/rust/src/main.rs (qstar, world-state, resolve, orchestrator)
  - Doc: ___LATEST ENGINE SPECS - 0826/25_etat_monde_graphe_orchestration.md

2) Formules & Registry
- Source canonique (Vector DB)
  - Service: magic-stack/simple_vector_server.py → /formulas, /search
  - Génération index: magic-stack/update_vector_db_content.py (FORMULAS_INDEX.json)
  - Index partagé: docs_shared/V - VECTOR_DB_ASSETS/FORMULAS_INDEX.json (si monté)
- Références
  - magic-stack/docs/FORMULA_REFERENCE.md (structure, ex.)
  - ___LATEST ENGINE SPECS - 0826/05_identite_energie_complexe.md, 06_interferences_gameplay.md
- Pipeline cible (casting « réel »)
  - Java: backends/java/.../MagicController (/api/magic/cast)
  - Java service: backends/java/.../MagicEngineService.java (brancher Registry + exécution)
  - Rust exécution: backends/rust/src/temporal_grammar.rs (+ endpoint d’exec via main.rs)

3) Backend Java (Spring)
- Contrôleurs principaux
  - /api/magic/*: backends/java/src/main/java/com/magicstack/controllers/MagicController.java
  - /api/interstice/* (démo/narratif): .../controllers/IntersticeController.java
  - /api/panopticon/*: .../controllers/PanopticonController.java
  - /api/regulators/*: .../controllers/RegulatorsController.java
  - /api/combat/*, /api/game/*, /api/hero/*: autres contrôleurs
- Services clés
  - MagicEngineService.java (casting moteur)
  - IntersticeService.java (démo: substring matching)

4) Backend Rust (Axum)
- Routes majeures: backends/rust/src/main.rs
  - /api/qstar/search, /api/world-state/*, /api/causality/resolve
  - /api/integration/formula-cast (proxy vers Java), /openapi, /explorer
  - /api/v2/* (multiplayer V2, regulators, orchestrator, hero, minigames)
- Cœur moteur: temporal_grammar.rs, position_6d.rs, world_state.rs, vector_ops.rs

5) Frontend (UI/UX & intégration)
- API Wrapper: apps/magic-stack-unified/src/api/MagicStackAPI.ts
- Casting actuel (démo): apps/magic-stack-unified/src/services/CastingManager.ts → Java /api/interstice/cast-formula
- Données/formules (UI): apps/magic-stack-unified/src/services/AssetsService.ts
- Pages/Composants clés: apps/magic-stack-unified/src/pages/HomePage.tsx, shared/components/*

6) Pack Specs 0826 (référence d’architecture)
- Index: ___LATEST ENGINE SPECS - 0826/README.md, MASTER.md
- Fondations: 01_bases_concepts.md, 02_regles_moteur.md, 04_systemes_resolution.md
- Identité/Interférences: 05_identite_energie_complexe.md, 06_interferences_gameplay.md
- Back: 13_doc_back.md
- Multi/Perf/Sécu: 19_playbooks_multijoueur.md, 20_matrice_resultats_multi.md, 21_diagrammes_spatio_temporels_multi.md, 22_protocoles_charge_concurrence.md, 23_securite_anti_abus.md

7) Démos & Outils
- Explorateurs: magic-stack/API_EXPLORER_COMPLETE.html, VECTOR_DB_EXPLORER_UI.html
- Démo gameplay: magic-stack/HOT_GAME_UNIFIED.html, demos/game/*
- Simple scenario backend (démo narrative/cast): magic-stack/simple-scenario-backend/

8) Tests & KPIs
- Rust: backends/rust/test_all_formulas.sh, tests embarqués temporal_grammar.rs
- Specs 0826: 17_tests_fonctionnels_unitaires.md (unit/E2E/property), KPIs dans 22_protocoles_charge_concurrence.md

9) Matrice des tâches (agents → cibles)
- Frontend Agent
  - Basculer cast UI → POST /api/magic/cast (formula_id, context)
  - Ajouter useDemoCasting (flag), créer Spells Lab (fixture demo_formulas.jsonl)
  - Fichiers: MagicStackAPI.ts, CastingManager.ts, nouvelles vues
- Java Agent
  - Impl. FormulaRegistry (fetch Vector DB + cache), brancher MagicEngineService.cast
  - Normaliser CastResponse (effets 6D, rendering, trace_hash), wire vers orchestrator/WS
  - Fichiers: MagicEngineService.java, MagicController.java (+ nouveau service Registry)
- Rust Agent
  - Exposer endpoint exécution grammaire (parse+execute), unifier format des effets
  - Tests parse/exec (SHIFT/FORK/MERGE + 3 formules frontpage)
  - Fichiers: main.rs, temporal_grammar.rs
- QA Agent
  - E2E « Spells Lab »: fixture, snapshots React/HTML identiques
  - Intégration: determinism (trace_hash), perf p99 tick, logs arbitre
- Docs/Scribe
  - Tenir SCRIBE/README.md & MAP.md à jour, consigner décisions, pointer PRs

10) Flags & Configs
- Endpoints env (UI): VITE_RUST_API, VITE_JAVA_API, VITE_VECTOR_API
- Feature flag: useDemoCasting (UI), mode simulate|apply (cast)

Notes
- Objectif court terme: rendre le cast « réel » sans casser la démo; garder parité visuelle; tracer les décisions.
- Ce fichier sert de plan de réveil pour l’équipe et d’entrée rapide pour nouveaux agents.
