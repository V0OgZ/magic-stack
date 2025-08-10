# 🌌 HEROES OF TIME - STRUCTURE V2
## Organisation Multivers → Worlds → Scenarios → Maps

---

## 📊 HIÉRARCHIE CONCEPTUELLE

```
🌌 MULTIVERSE (conteneur global)
  └─ 🌍 WORLDS (pocket worlds avec graphe CID)
      └─ 📜 SCENARIOS (orchestration avec régulateurs)
          └─ 🗺️ MAPS (instances jouables)
```

---

## 🗂️ ARBORESCENCE COMPLÈTE

```
/hot
  /core                     # ⚙️ Définitions moteur & standards
    /schemas                # JSON Schemas stricts
      multiverse.schema.json
      world.schema.json  
      scenario.schema.json
      map.schema.json
      hero.schema.json
      spell.schema.json
      graph.schema.json
      regulator.schema.json
    /enums                  # Listes canoniques
      factions.json
      schools.json
      biomes.json
      regulators.json
    /defaults               # Valeurs par défaut
      balance.json
      time_rules.json
      causal_fog.json

  /content                  # 🎮 Données gameplay actives
    /multiverses
      /prime                # Multivers principal
        multiverse.json
        /worlds
          /mystique         # Monde mystique
            world.json
            graph.json      # Graphe CID du monde
            /maps
              /solo
                /temple-of-time/
                  map.json
                  placements.json
                  loot.json
              /multiplayer
                /arena-causale/
                  map.json
                  objectives.json
            /scenarios
              tutorial-temporal.hsc.json
              escape-catacombs.hsc.json
          
          /nexus            # Nexus temporel
            world.json
            graph.json
            /maps
            /scenarios
          
          /quantum-realm    # Royaume quantique
            world.json
            graph.json
            /maps
            /scenarios

    /heroes                 # 🦸 Héros (HEP)
      /chronomancers
        arthur-pendragon.hep.json
        merlin.hep.json
      /visionaries
        grut.hep.json
      /warriors
        ragnar-lothbrok.hep.json
      /mystics
        claudius-memento.hep.json

    /spells                 # 🔮 Sorts (HOTS)
      /schools
        /causality
          temporal-shift.hots.json
          causal-fork.hots.json
          timeline-merge.hots.json
        /quantum
          superposition.hots.json
          interference.hots.json
        /speedforce
          acceleration.hots.json

  /front                    # 🎨 Customisation front-end
    /maps
      /01MP_temple_of_time/
        index.html
        style.css
        logic.js
      /01MP_arena_causale/
        index.html
        style.css

  /assets                   # 🖼️ Médias
    /images
      /portraits
      /tiles
      /effects
    /audio
      /sfx
      /music
      /ambiance

  /localization            # 🌐 i18n
    fr.json
    en.json
    ru.json

  /packs                   # 📦 Distributions
    /base                  # Pack de base
      manifest.json
      content/
    /dlc
      /temporal-paradox
        manifest.json
        content/
    /community
      /vincent
        /epic-multiverse

  /archives                # 📚 Archéologie (read-only)
    /avalon                # Ancien dépôt
      MANIFEST_AVALON.json
      /legacy
    /treasures             # Ancien système treasures
      MANIFEST_TREASURES.json
      /essences

  /scripts                 # 🛠️ Outils
    validate.mjs           # Validation schemas + refs
    migrate.mjs           # Migration v1→v2
    build-pack.mjs        # Création .hotpack
    indexer.mjs          # Index IDs/refs/graph
    graph-validator.mjs   # Validation graphes CID

  /tests                   # 🧪 Tests
    /schemas
    /graphs
    /scenarios

  /docs                    # 📖 Documentation
    CONTRIBUTING.md
    AUTHOR_GUIDE.md
    SCHEMA_REFERENCE.md

  /build                   # 🏗️ Sorties
    /.hotpack
    /.hotmap
    /indexes
```

---

## 🔑 CONVENTIONS & RÈGLES

### IDs & Références
```json
{
  "id": "01J7X9MCTSQM4R8Z3FYD1Q2B5N",  // ULID unique
  "slug": "temple-of-time",              // kebab-case
  "ref": {                                // Référence uniforme
    "type": "map",
    "id": "01J7X9MCTSQM4R8Z3FYD1Q2B5N"
  }
}
```

### Priorités d'Overlay (faible → fort)
1. `core/defaults`
2. `packs/base`
3. `packs/dlc/*`
4. `content/multiverses/*/worlds/*`
5. `content/multiverses/*/worlds/*/maps/*`
6. `session/*` (temporaire)

### Nommage Fichiers
- Data: `<slug>.<type>.json`
- Heroes: `<slug>.hep.json`
- Spells: `<slug>.hots.json`
- Scenarios: `<slug>.hsc.json`
- Maps: dans dossier `<slug>/map.json`

---

## 🌍 SCHÉMAS TYPES

### Multiverse
```json
{
  "$schema": "/hot/core/schemas/multiverse.schema.json",
  "id": "01MV_PRIME",
  "slug": "prime",
  "name_i18n": "multiverse.prime.name",
  "policies": {
    "overlay_order": ["core", "packs", "content", "map-local", "session"],
    "regulators_default": ["anna", "vince", "overload"],
    "ai_default": true
  },
  "defaults": {
    "causal_fog": {
      "baseline": 0.3,
      "growth": "linear"
    },
    "time": {
      "tick_rate": 20,
      "drift_base": 0.01
    }
  }
}
```

### World avec Graphe CID
```json
{
  "$schema": "/hot/core/schemas/world.schema.json",
  "id": "01WD_MYSTIQUE",
  "slug": "mystique",
  "name_i18n": "world.mystique.name",
  "chronology": {
    "timescale": 1.0,
    "drift": {
      "base": 0.02,
      "variance": 0.01
    },
    "decay_profile": "standard"
  },
  "pool": {
    "heroes_allowed": ["chronomancers", "visionaries"],
    "schools_allowed": ["causality", "quantum"]
  },
  "graph_ref": "./graph.json"
}
```

### Graph CID
```json
{
  "$schema": "/hot/core/schemas/graph.schema.json",
  "world_id": "01WD_MYSTIQUE",
  "nodes": [
    {
      "id": "N1",
      "label": "Altar of Time",
      "cid": [0, 0, 0],
      "tags": ["spawn", "objective"]
    },
    {
      "id": "N2", 
      "label": "Causal Rift",
      "cid": [4, 1, 0],
      "tags": ["portal", "danger"]
    }
  ],
  "edges": [
    {
      "id": "E1",
      "from": "N1",
      "to": "N2",
      "type": "portal",
      "cost": 2,
      "cooldown": 60
    }
  ],
  "cross_world": [
    {
      "from": {"world": "01WD_MYSTIQUE", "node": "N2"},
      "to": {"world": "01WD_NEXUS", "node": "M3"},
      "type": "wormhole",
      "requirements": ["artifact_key"]
    }
  ]
}
```

### Scenario avec Régulateurs
```json
{
  "$schema": "/hot/core/schemas/scenario.schema.json",
  "id": "01SC_TUTORIAL",
  "slug": "tutorial-temporal",
  "name_i18n": "scenario.tutorial.name",
  "world_ref": {
    "type": "world",
    "id": "01WD_MYSTIQUE"
  },
  "entry_node": "N1",
  "maps": [
    {
      "ref": {"type": "map", "id": "01MP_TEMPLE"},
      "subgraph": ["N1", "N2"]
    }
  ],
  "ruleset": {
    "ai": {
      "enabled": false,
      "mode": "tutorial"
    },
    "regulators": {
      "enabled": true,
      "profiles": {
        "anna": {
          "active": false
        },
        "vince": {
          "active": true,
          "pierce_strength": 0.3,
          "cooldown": 120
        },
        "overload": {
          "active": true,
          "threshold": 5
        }
      }
    },
    "time_overrides": {
      "drift_multiplier": 0.5
    }
  },
  "objectives": [
    {
      "id": "learn_shift",
      "type": "cast_spell",
      "target": "temporal-shift"
    },
    {
      "id": "reach_altar",
      "type": "reach_node",
      "target": "N1"
    }
  ]
}
```

### Map
```json
{
  "$schema": "/hot/core/schemas/map.schema.json",
  "id": "01MP_TEMPLE",
  "slug": "temple-of-time",
  "name_i18n": "map.temple.name",
  "mode": "solo",
  "biome": "temple",
  "dimensions": {
    "width": 100,
    "height": 100,
    "layers": 3
  },
  "entry_points": ["N1"],
  "objectives": [
    "reach:altar",
    "collect:temporal_artifact"
  ],
  "constraints": {
    "deck_size": 20,
    "schools_limit": ["causality", "quantum"],
    "hero_level_max": 10
  },
  "front_custom": {
    "enabled": true,
    "path": "/hot/front/maps/01MP_TEMPLE/"
  }
}
```

---

## 🔄 MIGRATION DEPUIS V1

### Phase 1: Inventaire
```bash
node scripts/indexer.mjs --scan
# → Génère index_v1.json avec tous les fichiers existants
```

### Phase 2: Attribution IDs
```bash
node scripts/migrate.mjs --assign-ids
# → Ajoute des ULIDs à tous les fichiers sans ID
```

### Phase 3: Création structure
```bash
node scripts/migrate.mjs --create-structure
# → Crée l'arbo V2 vide avec multiverse/worlds de base
```

### Phase 4: Import Avalon
```bash
node scripts/migrate.mjs --import-avalon
# → Copie Avalon dans /archives avec manifest
```

### Phase 5: Migration content
```bash
node scripts/migrate.mjs --migrate-content
# → Déplace HEP/HOTS/HSC vers nouvelle structure
```

### Phase 6: Validation
```bash
node scripts/validate.mjs --full
# → Vérifie schemas, refs, graph coverage, i18n
```

---

## 🎮 PIPELINES & QUALITÉ

### Pre-commit Hook
```bash
#!/bin/bash
node scripts/validate.mjs --changed
if [ $? -ne 0 ]; then
  echo "❌ Validation failed"
  exit 1
fi
```

### CI/CD
```yaml
validate:
  - JSON Schema compliance
  - ID/slug uniqueness
  - Reference resolution
  - Graph connectivity
  - i18n completeness
  
build:
  - Generate .hotpack
  - Generate .hotmap
  - Create indexes
  - Deploy to CDN
```

---

## 📦 DISTRIBUTION

### Pack Structure
```
/prime-base.hotpack
  manifest.json
  content/
    heroes/
    spells/
    worlds/
  assets/
  checksums.sha256
```

### Manifest
```json
{
  "id": "01PK_BASE",
  "version": "1.0.0",
  "dependencies": [],
  "contents": [
    {"type": "hero", "id": "01HP_ARTHUR"},
    {"type": "spell", "id": "01SP_SHIFT"}
  ],
  "checksums": {
    "01HP_ARTHUR": "sha256:abc123..."
  }
}
```

---

## 🚀 NEXT STEPS

1. **Créer les JSON Schemas** ✅
2. **Écrire les scripts de migration** ✅
3. **Mapper le contenu existant** 🔄
4. **Créer le premier multiverse** 🔄
5. **Migrer les Treasures** 📦
6. **Valider avec tests** 🧪

---

*MEMENTO: Cette structure permet l'évolution sans casser l'existant*
