# Avalon Editor – Docs Pack

Bienvenue dans la doc de l’**Éditeur Universel Avalon** (connecté à **MagicStack**).

## TL;DR
- **But** : créer/configurer/tester des mondes, maps, timelines, agents et combats **sans coder**, avec possibilité d’ajouter du code.
- **Pour qui** : dev front, level designer, bricoleur HTML/JS, scénariste.
- **Memento** (IA) : aide contextuelle + recherche **vectorDB** dans les docs (dont **V2Spec**).
- **Backend** : MagicStack (Rust/Python), World State Graph, Timeline/Causalité, Agents, Paradoxes, TCG, Planner Q*.

## Démarrage rapide
1. Lisez `01_VISION_FONCTIONNELLE.md` (fonctionnel clair).
2. Si vous codez l’éditeur : `02_SPEC_TECHNIQUE_EDITOR.md`.
3. Si vous codez les endpoints : `03_API_REFERENCE.md` + `04_OPENAPI.yaml`.
4. Schémas JSON : `05_JSON_SCHEMAS/`.
5. QA : `06_QA_TESTS.md`.
6. Vocabulaire : `07_GLOSSAIRE.md`.

## Où sont les specs existantes ?
- **V2Spec** : corpus consolidé (hérité des docs antérieures + Opus 4.1). 
- Accessible via **vectorDB** par Memento (voir § Memento/VectorDB dans `02_SPEC_TECHNIQUE_EDITOR.md`).

## Exemples
- Voir `assets/examples/` pour un monde, une timeline, un agent.
01_VISION_FONCTIONNELLE.md
