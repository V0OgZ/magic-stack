# 📦 HOT Content Structure - Heroes of Time

## Structure Overview

```
hot/
├── scenarios/       # Scénarios jouables complets
├── maps/           # Cartes et terrains
├── entities/       # Héros, ennemis, PNJ
├── items/          # Objets, artefacts, trésors
├── cards/          # Cartes TCG
├── timelines/      # Événements temporels scriptés
├── regulators/     # Configuration des régulateurs
├── events/         # Événements du jeu
├── minigames/      # Mini-jeux intégrés
└── assets/         # Ressources visuelles et audio
    ├── images/
    ├── sounds/
    └── music/
```

## Format Standards

### IDs
- Format: `kebab-case-slug`
- Exemple: `chasse-temporelle-j30`

### Timestamps
- Format: ISO 8601 avec timezone
- Exemple: `2025-08-11T10:00:00Z`

### Versioning
- Semantic: `MAJOR.MINOR.PATCH`
- Exemple: `2.0.0`

## Content Packs

### Core Pack (Toujours chargé)
- `core/` - Mécaniques de base
- Priorité: 0

### Official Packs
- `official/hot-campaign/` - Campagne principale
- `official/multiplayer/` - Maps multi
- Priorité: 100-500

### Community Packs
- `community/*/` - Contenu communautaire
- Priorité: 1000+

## Validation

Tous les fichiers JSON sont validés contre leurs schemas dans `/schemas/`

## Overlay System

Les packs de plus haute priorité peuvent override les contenus de base:
- Map extension
- Entity modification
- New cards
- Event overrides

## Import/Export

```bash
# Import a content pack
./hot-import.sh pack.zip

# Export current content
./hot-export.sh my-pack

# Validate all content
./hot-validate.sh
```
