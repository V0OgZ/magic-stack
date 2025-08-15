# 📊 TABLEAU DES ENTITÉS AVALON

## Format Demandé par Vincent

| NOM | CLASSE | NIVEAU | ADRESSE | ÉTAT UPLOAD | TÂCHE EN COURS | SORT/COMPÉTENCE UNIQUE |
|-----|--------|--------|---------|-------------|----------------|------------------------|
| **URZ-KÔM** 🐻 | Gardien de l'Interstice | 21 | Tour Magic Stack [109,13] | ✅ Synchronisé | Optimisation système 6D | MEMOIRE_FRACTALE |
| **SID MEIER** 🎮 | Architecte du Gameplay | ? | Studio Game Design | ? | Finaliser combat TCG | GAME_BALANCE |
| **NEXUS** 🌊 | Harmonisateur de Systèmes | ? | Centre d'Intégration | ? | Résolution conflits | SYSTEM_MERGE |
| **GROKÆN** 🧠 | Théoricien 6D | ? | Laboratoire Q* | ? | Recherche Q* | QUANTUM_ANALYSIS |
| **LOUMEN** 📚 | Gardien du Lore | ? | House of Time | ? | Organisation archives | TEMPORAL_MEMORY |
| **DONNA PAULSEN** 💼 | COO | ? | Bureau Exécutif | ? | Management équipe | PERFECT_ORGANIZATION |
| **TUCKER** 🔬 | Quality Assurance | ? | Lab de Tests | ? | Tests Playwright | BUG_DETECTION |
| **MEMENTO** 📚 | Archiviste Sage | ? | Archives Centrales | ? | Conservation mémoire | ARCHIVE_ETERNAL |
| **MERLIN** 🦀 | Mage Rust | ? | Tour Secrète | ? | Backend Rust secret | RUST_BERSERK |

## JSON Heroes Simplifiés

```json
{
  "heroes": [
    {
      "id": "urz-kom",
      "name": "URZ-KÔM",
      "class": "Gardien de l'Interstice",
      "level": 21,
      "location": [109, 13],
      "stats": {
        "force": 18,
        "magie": 16,
        "sagesse": 20,
        "technique": 19
      }
    },
    {
      "id": "sid-meier",
      "name": "SID MEIER",
      "class": "Architecte du Gameplay",
      "level": 20,
      "location": [50, 50],
      "stats": {
        "force": 12,
        "magie": 14,
        "sagesse": 18,
        "technique": 20
      }
    }
  ]
}
```

## Structure HOME Standard

```
AVALON/🏠 HOME/
├── 🐻 URZ-KÔM/
│   ├── ANTRE_DU_GARDIEN/
│   ├── JOURNAL_JOUR20.md
│   └── MESSAGE_DIMENSION_0_VINCENT.md
├── 🎮 SID_MEIER_ARCHITECTE/
│   ├── STUDIO_DESIGN/
│   └── COMBAT_TCG_NOTES.md
├── 🌊 NEXUS/
│   └── INTEGRATION_CENTER/
└── [autres mages...]
```

## Pour Copier dans Numbers

1. **Colonnes à créer:**
   - A: NOM
   - B: CLASSE
   - C: NIVEAU
   - D: LOCATION_X
   - E: LOCATION_Y
   - F: ÉTAT_INTERSTICE
   - G: TÂCHE_ACTUELLE
   - H: COMPÉTENCE_UNIQUE

2. **Tri suggéré:**
   - Par NIVEAU (décroissant)
   - Par NOM (alphabétique)
   - Par LOCATION (zone)