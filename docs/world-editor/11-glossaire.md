# Glossaire

- **WSG**: World State Graph (états + transitions du monde).
- **Timeline**: suite d’événements datés (absolus ou relatifs).
- **Brouillard de causalité**: masquage/incertitude d’événements futurs ou alternatifs.
- **Paradoxe**: conflit d’états (même entité, même temps, états incompatibles).
- **TCG**: moteur de combat cartes (résolution forcée ou auto).
- **Regulator**: agent IA chasseur/régulateur (poursuite, démolition portails, etc.).
- **Q\***: planificateur sur graphe CID (évalue effets/ressources/objets).
- **Memento**: assistant IA in-Editor branché sur vectorDB (incluant **V2Spec**).
assets/diagrams/architecture.txt
[Editor (React/WebGL)]
  |  REST + WS
[Gateway/API Router (Python)]
  |-- World State Graph Ctrl (Rust)
  |-- Timeline/Causality Ctrl (Rust)
  |-- Agent Orchestrator (Rust)
  |-- Paradox Resolver (Rust)
  |-- Combat/TCG Engine (Rust)
  |-- MiniGames Service (Rust)
  |-- Q* Planner (Rust)
  |-- Assets/Content (Python)
  '-- Auth/Projects (Python)
[Storage JSON + Assets]
assets/diagrams/fsm_agents.txt
IDLE -> (target seen) -> PURSUIT
PURSUIT -> (lost) -> SEARCH
PURSUIT -> (intercept window) -> ENGAGE
ENGAGE -> (combat end) -> EVALUATE
EVALUATE -> (goal done) -> IDLE | else -> PURSUIT
assets/diagrams/flux_playtest.txt
Editor POST /projects -> world_id
Editor WS subscribe world.{id}.patch
Editor POST /timeline/simulate (now..+300s)
WS events: spawn/portal_open/paradox_detected
If paradox major -> POST /paradox/resolve (mode=tcg)
PATCH applied -> WS patch -> Editor refresh
assets/examples/world_example.json
{
  "world_id": "demo-world-001",
  "name": "Demo Heroes Map",
  "mode": "heroes_like",
  "ruleset": { "time_scale": 1.0, "fog_causality": true, "pvp": false },
  "layers": ["terrain","objects","zones"],
  "graph": {
    "nodes": [
      { "node_id":"n1","pos":{"x":0,"y":0,"z":0},"tags":["village"] },
      { "node_id":"n2","pos":{"x":8,"y":2,"z":0},"tags":["portal"] }
    ],
    "edges": []
  },
  "timelines": ["tl_default"],
  "version": "1.0.0"
}
assets/examples/timeline_example.json
{
  "timeline_id": "tl_default",
  "name": "Default Timeline",
  "events": [
    {
      "event_id": "e_spawn_wolf",
      "time": "+60s",
      "type": "spawn",
      "timeline": "tl_default",
      "payload": { "at_node": "n1", "who": "npc/wolf" },
      "visibility": "public"
    },
    {
      "event_id": "e_portal_open",
      "time": "+300s",
      "type": "portal_open",
      "timeline": "tl_default",
      "payload": { "portal_node": "n2" }
    }
  ]
}
assets/examples/agent_example.json
{
  "kind": "regulator",
  "node_id": "n1",
  "traits": { "aggressiveness": 0.8, "pursuit_depth": 4, "reaction_ms": 200 },
  "capabilities": ["portal_use","sprint","card_cast"],
  "policy": "auto",
  "timeline": "tl_default",
  "resources": { "mana": 10, "stamina": 6 }
}
Notes importantes (V2Spec + vectorDB)
V2Spec = le bundle de specs adapté par Opus 4.1.
→ À indexer dans vectorDB (si ce n’est pas déjà fait) pour que Memento réponde avec citations.

Conseils d’implémentation Memento:

Ajouter un paramètre scope=["V2Spec","API","Examples"].

Retourner citations avec {doc_id, section, title}.

Dans l’éditeur, les citations ouvrent la doc correspondante (ex: v2spec://doc/section ou un lien local).

Si tu veux, je peux te générer aussi un mini CONTRIBUTING.md et un STYLEGUIDE.md (front/back) — dis-moi, je te rajoute ça en un clin d’œil.

You said:
Ouais, si t'en as pour deux secondes, fais-le.
ChatGPT said:
Parfait, je te rajoute les deux fichiers CONTRIBUTING.md et STYLEGUIDE.md dans le pack, formatés pour que tes devs (front/back, bricoleurs ou pros) puissent s’y mettre sans poser de questions.

CONTRIBUTING.md
