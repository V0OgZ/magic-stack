DOCS PLAN — GPT caretaker (docs only)

Scope (docs seulement)
- Maintenir et organiser: docs/, ___LATEST ENGINE SPECS - 0826/, SCRIBE/, FRONTPAGE docs, vector_content/, Treasures/ docs.
- Ne pas toucher au code (Java/Rust/TS) dans ce plan.

Objectifs
- Lisibilité: cartes SCRIBE (MAP/ASSETS_MAP) à jour
- Index: DOCS_INDEX.md consolidé
- Flux: règles d’entrée (intake) + conventions commit

Intake (règles)
- Ajouter nouveaux docs dans les dossiers existants; créer README.md local si nécessaire
- Nommer clairement (jour/role/sujet)
- Lier depuis SCRIBE/MAP.md si pertinent

Conventions
- Commits docs: "docs: ..." ou "scribe: ..."
- Frontpage: ajouter liens vers labs/outils si doc utilisateur
- Vector DB: synchroniser via update_vector_db_content.py si contenu formules change

Workflow quotidien
- Mettre à jour CHECKPOINT.md (faits/tâches) 
- Rafraîchir DOCS_INDEX.md (liste auto des .md/.html)
- S’assurer que MAP.md et ASSETS_MAP.md reflètent les ajouts

Coordination
- Claude (HTML/UX): FRONTPAGE, labs, tooltips; GPT intègre ces liens dans les index
- Secret branch (Claude): pas de merge; GPT documente côté SCRIBE et main docs

Livrables réguliers
- DOCS_INDEX.md à jour
- CHECKPOINT.md mis à jour
- Notes de liens (Spells Lab, payload cast) dans SCRIBE/README.md
