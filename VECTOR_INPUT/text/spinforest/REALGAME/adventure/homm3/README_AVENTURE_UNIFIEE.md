Heroes of Time — Aventure unifiée (frontend)

1) Entrées principales
- hub-aventure.html: Hub narratif (missions dynamiques via hub-aventure-missions.json). Top bar: setter heroId, lien Story Runner, bouton Indexer (désactivé).
- story-runner.html: Lance séquentiellement des actes dans un iframe; menu (Esc/M) pour naviguer (EVA, Labo, Non‑Euclidien, Hub).
- narrative-eva.html / stories/eva.json: Prologue EVA (OBSERVE, COLLECT, RESOLVE) + transitions vers DEDA/Labo/Non‑Euclidien.
- narrative-deda.html / stories/deda.json: Dédale v0, sorties Labo/Non‑Euclidien/Hub.

2) Intégrations backend
- orchestrator-client.js: startSession, sendIntent, getSnapshot, idempotency, retries, timeouts.
- narrative-engine.js: utilise orchestrateur (feature flag), intents OBSERVE/REQUEST_RESOLVE/COLLECT, session heroId via sessionStorage.
- wsg.js: polling WSG, collisions, resolve (orchestrateur prioritaire), applySnapshotsEnabled + lastAppliedTick (stub d’application des entités si activé).
- movement.js: pathfinding + OBSERVE débouncé; heroId depuis sessionStorage; orchestrateur baseUrl.

3) Contenu jouable/démo
- DARK_HOLOGRAPHIC_CARDS.html: galerie de cartes (inclut Marchands).
- api/tcg-merchant-tester.html: simulateur TCG Marchands (front-only + appel backend best-effort) pour 5 endpoints.
- REGULATEUR_DEMO.html + regulateur-system.js: boucle spawn→chasse→capture; intents best‑effort.

4) Configuration joueur
- Depuis le Hub, définir `heroId` (sessionStorage). Par défaut: `hero:alice`.

5) Feature flags & prochains incréments
- Orchestrateur: applySnapshotsEnabled=false par défaut (activer quand backend prêt pour deltas/états).
- TCG AI: intégrer Auto/Coach/PNJ dans l’UI bataille quand endpoints stables (stubs déjà prévus côté `tcg.js`).
- Hub: bouton Indexer déclenchera POST /api/archives/build (désactivé tant que VectorDB n’est pas branchée).

6) Test rapide
- Ouvrir hub-aventure.html → Story Mode EVA/DEDA, Story Runner, TCG Merchants Tester, Régulateur.
- EVA: aller jusqu’à “Première sortie”, tester les transitions.
- Merchants: Simuler succès ou tenter un appel backend.

7) Notes
- Tous les appels backend utilisent http://localhost:3001 par défaut (Rust). Java (8082) non requis ici.
- Idempotency-Key, timeouts et retries gérés dans orchestrator-client.js.


