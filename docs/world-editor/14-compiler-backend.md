# Compiler backend
cd ../backend && cargo build
3. Branches & workflow Git
main : stable, testée.

dev : branche de développement.

feature/ : pour nouvelles fonctionnalités (feature/editor-timeline).

fix/ : pour corrections (fix/agent-spawn-crash).

Workflow :

Créer branche depuis dev.

Développer + commit clair.

PR vers dev (review obligatoire).

Merge vers main après validation QA.

4. Normes de code
Front : React fonctionnel, hooks, composants modulaires.

Back : Rust async/await, Python PEP8.

Voir STYLEGUIDE.md pour conventions détaillées.

5. Tests
Front : pnpm test (Jest + Testing Library).

Back : cargo test (unit/integration).

E2E : pnpm e2e (Playwright) sur stack locale.

6. QA & validation
Respecter critères d’acceptation dans 06_QA_TESTS.md.

Pas de merge si tests échouent.

Valider avec make lint (lint front/back).

7. Documentation
Ajouter/modifier doc dans docs/avalon_editor/.

Lier tout nouveau endpoint dans 03_API_REFERENCE.md et 04_OPENAPI.yaml.

Pour explications longues, ajouter un fichier dédié dans docs/.

8. Communication
Utiliser GitHub Issues pour bugs/features.

Discussions techniques : Slack/Discord #avalon-editor.

Avant gros changement d’architecture → ouvrir RFC (docs/rfcs/).


---

### STYLEGUIDE.md
```markdown
