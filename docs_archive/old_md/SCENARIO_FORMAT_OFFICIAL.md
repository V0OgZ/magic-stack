# 📋 FORMAT OFFICIEL DES SCÉNARIOS - HEROES OF TIME

## ✅ DÉCISION : Format JSON unifié

```json
{
  "id": "scenario-{ulid}",
  "version": "2.0",
  "metadata": {
    "name": "Nom du scénario",
    "description": "Description",
    "difficulty": "easy|normal|hard|nightmare",
    "duration": "25 jours",
    "created": "2024-01-01T00:00:00Z"
  },
  "initial_state": {
    "day": 1,
    "tw": 0,
    "te": 0,
    "resources": {
      "crystals": 100,
      "energy": 50,
      "temporal": 25,
      "quantum": 10
    }
  },
  "map": {
    "size": { "x": 120, "y": 120 },
    "terrain": [], // Array of terrain tiles
    "objects": []  // Array of objects/entities
  },
  "regulators": {
    "vince": { "active": true, "zone": "NE" },
    "anna": { "decay": 5, "zone": "C" },
    "overload": { "stack": 0, "maxStack": 10 }
  },
  "victory_conditions": [],
  "events": []
}
```

## 🗂️ Structure des fichiers

```
scenarios/
├── official/          # Scénarios officiels
│   ├── chasse-temporelle.json
│   ├── tutorial.json
│   └── campaign/
├── community/         # Créés par la communauté
└── test/             # Pour les tests
```

## ✅ MIGRATION
- Tous les `.hsc.json` → nouveau format
- Les `.hots` deviennent des "event scripts" dans le JSON
- Plus de formats multiples !
