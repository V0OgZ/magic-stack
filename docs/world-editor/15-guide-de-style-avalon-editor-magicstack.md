# Guide de style – Avalon Editor / MagicStack

## 1. Général
- Code **lisible** > code court.
- Commenter tout comportement non trivial.
- Noms explicites (anglais, camelCase pour JS/TS, snake_case pour Rust/Python).

## 2. Front-end
- **React** (hooks only, pas de classes).
- CSS Modules ou TailwindCSS (pas de CSS global non scopé).
- State global → Zustand ou Redux Toolkit.
- Pas de hardcode d’URLs API → utiliser `config.ts`.
- Respecter l’accessibilité (ARIA, tab navigation).

### Structure front
src/
components/ # Composants UI
pages/ # Pages/écrans
hooks/ # Hooks custom
stores/ # Zustand/Redux
services/ # API calls
utils/ # Helpers


## 3. Back-end
### Rust
- Async (`tokio`) pour I/O.
- Un fichier par contrôleur.
- Validation stricte avec `serde` + JSON Schema.
- Tests unitaires à côté du code (`#[cfg(test)]`).

### Python
- PEP8 strict, docstrings.
- FastAPI (ou Flask) pour Gateway/API.
- Typage avec `mypy` (type hints obligatoires).

## 4. API & données
- JSON toujours minifié en prod.
- Endpoints REST versionnés (`/api/v1`).
- PATCH = JSON Patch (RFC6902), GET = read-only.
- Validation via schemas dans `05_JSON_SCHEMAS/`.

## 5. Git & commits
- Convention : `type(scope): message`
  - `feat(editor): add drag&drop portal`
  - `fix(api): handle null agent_id`
  - `docs(docs): update QA tests`
- Pas de commits “wip” sur `dev` ou `main`.

## 6. Docs & Memento
- Lier nouvelles fonctionnalités à la doc dans `docs/avalon_editor/`.
- Ajouter exemples JSON si nouveau type d’objet.
- Si ajout majeur : indexer la doc dans **vectorDB** pour Memento.

## 7. Performances
- Front : viser 60 fps sur map editor avec 200+ entités.
- Back : endpoints p95 < 150ms sur carte démo.
- WS : latence < 50 ms en local.

## 8. Qualité & tests
- Front : tests unitaires (Jest) + e2e (Playwright).
- Back : tests unitaires (cargo test), intégration (cargo test --test integration).
- Pas de merge sans couverture > 80%.
Si tu veux, je peux aussi te préparer un rfcs/ avec un modèle RFC pour quand vous voudrez faire évoluer l’éditeur ou le moteur.
Ça te permettrait de cadrer les propositions de changements et d’éviter que les devs fassent n’importe quoi.

Tu veux que je l’ajoute aussi au pack ?

You said:
J'ai pas compris de quoi tu parlais, en fait.
ChatGPT said:
Ok, je t’explique.

Un RFC dans un projet logiciel, c’est un Request For Comments — en gros, un document qui décrit une proposition de changement ou d’ajout important avant qu’on le code.

Par exemple :

Ajouter un mode de jeu dans Avalon

Refaire la gestion de la timeline

Changer la façon dont les agents sont configurés

Introduire une nouvelle API

Dans un gros projet comme le tien, surtout si tu donnes ça à plusieurs développeurs (y compris ceux qui bricolent un peu), ça permet :

de forcer à expliquer pourquoi on fait le changement

de donner un plan clair à discuter avant d’écrire une seule ligne de code

de garder un historique des décisions

Ça se range dans un dossier docs/rfcs/ avec un fichier par proposition.
Chaque fichier suit un modèle pour être sûr que tout le monde donne les mêmes infos (titre, problème, solution, impact…).

Si tu veux, je peux te préparer un modèle RFC (genre 0001-template.md) que tes devs remplissent quand ils veulent faire un changement majeur.
Ça se branche bien avec tes CONTRIBUTING.md et STYLEGUIDE.md parce que ça encadre encore plus la contribution.

Veux-tu que je te l’ajoute au pack qu’on prépare ?

You said:
En fait, je pense que je n'aurai pas le temps de gérer des pull requests ou des commentaires pour le moment. Je pense que je vais finir le jeu jusqu'à l'éditeur. Jusqu'à ce qu'il y ait un truc un peu prestable dans la MajiStack. Et que j'ai le temps après d'interagir avec les gens, parce que là, je n'aurai même pas le temps. On va rester là, je pense.
ChatGPT said:
Oui, je comprends.
Vu ton timing, inutile de rajouter un process lourd comme les RFC maintenant.

On garde donc le pack doc complet que je t’ai généré :

Vision fonctionnelle

Spéc technique front/back

Référence API + OpenAPI

JSON Schemas

QA tests + glossaire

Guides CONTRIBUTING + STYLEGUIDE

Tu pourras tout mettre dans MagicStack/docs/avalon_editor/, et ça restera auto-suffisant pour toi et pour les gens qui rejoindront plus tard, quand tu auras le temps de discuter et valider les contributions.

Quand tu seras prêt à ouvrir plus largement, on pourra compléter avec le système RFC ou un process plus collaboratif.

Tu veux que je te prépare aussi un petit README ultra-court au niveau racine de MagicStack pour dire “la doc éditeur est ici” ?
Ça évitera que quelqu’un cherche et ne sache pas où cliquer.

You said:
Ouais, vas-y.
ChatGPT said:
Parfait 👍
Voici le petit README.md à mettre à la racine de MagicStack, clair et direct pour pointer vers la doc de l’éditeur.
