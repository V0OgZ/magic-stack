ASSETS MAP — Cartographie des assets

But: rendre lisible où sont les icônes, sons, FX, contenus (monde/héros/scénarios), et documents Vector DB.

1) UI Assets (public)
- Catalogues
  - apps/magic-stack-unified/public/assets/assets_catalog.json (index rapide)
  - apps/magic-stack-unified/public/assets/openmoji_complete_catalog.json (icônes)
- Icônes & navigateurs
  - apps/magic-stack-unified/public/assets/ICON_EXPLORER.html
  - apps/magic-stack-unified/public/assets/MAP_ICON_PLACER.html
  - apps/magic-stack-unified/public/assets/MAP_ICON_PLACER_ADVANCED.html
- Sons
  - apps/magic-stack-unified/public/assets/sounds/sound_events.json
- FX visuels
  - apps/magic-stack-unified/public/assets/fx/fx_presets.json
  - apps/magic-stack-unified/public/assets/fx/GUIDE_EFFETS_VISUELS_MAGNIFIQUES.md
- README
  - apps/magic-stack-unified/public/assets/README.md

2) Services UI (chargement/usage)
- AssetsService (héros/créatures/artefacts/formules UI)
  - apps/magic-stack-unified/src/services/AssetsService.ts
- FX/Sons/Casting
  - apps/magic-stack-unified/src/services/FXManager.ts
  - apps/magic-stack-unified/src/services/AudioManager.ts
  - apps/magic-stack-unified/src/services/CastingManager.ts

3) Contenus de jeu (HOT)
- Multivers (mondes brisés)
  - hot/content/multiverses/mondes-perdus/multiverse.json
  - hot/content/multiverses/mondes-perdus/worlds/*.json (plusieurs centaines de mondes)
  - hot/content/multiverses/mondes-perdus/MANIFEST_200_WORLDS.json
- Scénarios “prime/mystique” (ex.)
  - hot/content/multiverses/prime/worlds/mystique/scenarios/*.hsc.json
- Backups miroir
  - BACKUP_JOUR35/hot/content/... (miroir des contenus ci‑dessus)

4) Vector Content (narration/lores boostés)
- vector_content/backstories_boosted/* (dialogues, keywords, backstories héros)
- vector_content/heroes_backstories/* (versions originales)
- vector_index_with_tags.json (indexation)

5) Treasures (scénarios/visualizers/epreuves)
- Treasures/📖 Histoires vivantes/visualizer/*.json (scènes pour viewer)
- Treasures/📜 Parchemins sauvage/scenarios/*.hots (scripts scénarisés)
- Treasures/.../*.hep (packs/storyboards)

6) Démos/Explorateurs
- magic-stack/API_EXPLORER_COMPLETE.html (APIs)
- magic-stack/VECTOR_DB_EXPLORER_UI.html (documents vector)
- magic-stack/HOT_GAME_UNIFIED.html (démo jeu)
- demos/game/*, demos/tools/*

7) Vector DB (formules/dox)
- Service: magic-stack/simple_vector_server.py (ports 5001) — charge “docs_shared/V - VECTOR_DB_ASSETS” si monté
- Générateur: magic-stack/update_vector_db_content.py (crée FORMULAS_INDEX.json, HOT_GAME_COMPLETE.json)

8) Owners (proposition)
- UI Assets & Services: Front Agent (UI)
- HOT Content & Treasures: Game Content Agent
- Vector Content & DB: Profondeur/Docs Agent
- FX/Sons: FX/Sound Agent
- Démos/Explorateurs: DevRel/Tools Agent

9) Actions de nettoyage/priorités
- [ ] Valider que assets_catalog.json reflète les fichiers réels (icônes/sons/FX)
- [ ] Marquer deprecated les “BACKUP_JOUR35” si doublons
- [ ] Centraliser un index “content_index.json” (hot/content) pour l’éditeur
- [ ] Ajouter un README par répertoire majeur (hot/content, Treasures, vector_content)

Notes
- Cette carte vise la lisibilité; elle n’impose pas de refactor immédiat.
- L’index “content_index.json” facilitera l’éditeur et les scripts de build.
