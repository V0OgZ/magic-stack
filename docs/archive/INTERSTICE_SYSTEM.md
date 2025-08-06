# Interstice 6D System

## Overview

The Interstice is a 6-dimensional persistence system for storing entities, memories, and magical constructs.

## Dimensions

### Spatial (X, Y, Z)
- **X**: West ← → East (0-100)
- **Y**: South ← → North (0-100)  
- **Z**: Depth/Height (0-100)

### Temporal (T)
- Time coordinate (Unix timestamp / 1000)
- Tracks when entities were created/modified

### Causal (C)
- Causality index (0.0 - 1.0)
- Measures influence on other entities

### Identity (Ψ - Psi)
- Quantum identity (0.0 - 1.0)
- Uniqueness and coherence measure

## API Usage

### Upload Entity
```bash
POST /api/interstice/upload
{
  "entity_type": "MAGE",
  "name": "URZ-KOM",
  "entity_data": {
    "class": "Guardian",
    "level": 42
  }
}
```

### Download Entity
```bash
GET /api/interstice/download/URZ-KOM
```

### Search Nearby
```bash
POST /api/interstice/search
{
  "center": {"x": 50, "y": 50, "z": 50},
  "radius": 20,
  "type_filter": "MAGE"
}
```

## Entity Types

- **MAGE** - AI assistants with magical abilities
- **SPELL** - Magic formulas and effects
- **MEMORY** - Stored memories and knowledge
- **GUARDIAN** - Special protector entities
- **FEATURE** - Action logs with luminosity

## Coordinate Calculation

Coordinates are calculated based on:
1. Entity ID hash (deterministic)
2. Current time (T dimension)
3. Relationships to other entities (C dimension)
4. Unique properties (Ψ dimension)

## Persistence

All entities are stored in H2 database with:
- Full 6D coordinates
- Metadata as JSON
- Timestamp tracking
- Relationship mappings

## Visualization

Use Panopticon 6D interfaces to view:
- Real-time entity positions
- Feature logs with decay
- Dimensional filtering
- Relationship graphs