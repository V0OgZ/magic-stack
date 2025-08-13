# MAP EDITOR SYSTEM - Complete Guide

## Overview
The map editor system allows you to create, edit and play maps for Heroes of Time. It has 3 main approaches:

---

## 1. WORKFLOW_MANAGER (Recommended)
**URL:** http://localhost:8000/WORKFLOW_MANAGER.html

This orchestrates 3 separate tools in sequence:

### Step 1: WorldEditor React (Structure)
- **URL:** http://localhost:5173
- **Purpose:** Draw hexagonal terrain (grass, water, mountains, etc.)
- **Output:** JSON with hex grid structure
- **Tech:** React/TypeScript

### Step 2: MAP_ICON_PLACER_ADVANCED (Instances)
- **URL:** Embedded in workflow
- **Purpose:** Place objects on the map (enemies, artifacts, portals)
- **Output:** JSON with 6D positioned resources
- **Tech:** HTML/JavaScript

### Step 3: CHASSE_TEMPORELLE_MEGA_MAP (Play)
- **URL:** http://localhost:8000/CHASSE_TEMPORELLE_MEGA_MAP.html
- **Purpose:** Test and play the created map
- **Features:** Hero movement, combat, resource collection
- **Tech:** HTML/JavaScript

**Data Flow:** Structure → Add Objects → Play Game

---

## 2. MEGA_EDITOR.html (All-in-one, Buggy)
**URL:** http://localhost:8000/MEGA_EDITOR.html

- Single HTML file with 3 tabs
- Tries to combine all features
- Currently buggy and less functional
- Not recommended

---

## 3. Standalone Tools

### WorldEditor React
- **URL:** http://localhost:5173
- **Launch:** `./go we`
- Create terrain only

### MAP_ICON_PLACER_ADVANCED
- **URL:** http://localhost:8000/assets/MAP_ICON_PLACER_ADVANCED.html
- **Launch:** `./go map`
- Place icons only

### CHASSE_TEMPORELLE_MEGA_MAP
- **URL:** http://localhost:8000/CHASSE_TEMPORELLE_MEGA_MAP.html
- **Launch:** Open directly
- Play game only

---

## How Maps Work

### Default Map (No Import)
CHASSE_TEMPORELLE uses a **procedurally generated** map:
- `getTerrainType(x,y)` function generates terrain based on position
- Center area: More temporal zones
- Edges: More void zones
- Random weighted distribution of terrain types

### Imported Map (From WorldEditor)
When you import a JSON file:
1. Terrain is replaced with your custom hex grid
2. Objects are placed at specified 6D coordinates
3. Timeline settings are applied

### Terrain Types
```javascript
🌿 Grass (weight: 35)
💧 Water (weight: 20)
⛰️ Mountain (weight: 15)
🏜️ Desert (weight: 10)
❄️ Snow (weight: 8)
🔥 Lava (weight: 7)
🌌 Void (weight: 3)
✨ Temporal (weight: 2)
```

---

## 6D Coordinate System

Each object has:
- **X, Y, Z:** Spatial position
- **T:** Temporal position (timeline)
- **C:** Causal position
- **P:** Phase/quantum state

Example resource:
```json
{
  "id": "artifact_001",
  "position_6d": {
    "x": 100,
    "y": 50,
    "z": 0,
    "t": 1000,
    "c": 1,
    "psi": 0
  },
  "energy_complex": {
    "A": 10,
    "phi": 0.5
  }
}
```

---

## Game Features in CHASSE_TEMPORELLE

### Playable Elements
- **Hero:** 🦸 Click to move
- **Enemies:** 🐉🦴 Combat on contact
- **Artifacts:** 💎 Collect for quantum energy
- **Portals:** 🌀 Teleport randomly
- **Vendors:** 🏪 Trade resources
- **Regulators:** 👁️💰⚡ Special game mechanics

### Resources
- Crystals 💎
- Energy ⚡
- Temporal ⏰
- Quantum 🔮

### Game Controls
- **Move:** Click any hex
- **Import Map:** Load custom map
- **Fork Timeline:** Create parallel timeline
- **Merge Timelines:** Combine timelines
- **Temporal Shift:** Time manipulation

---

## Commands Reference

```bash
# Launch services
./go front      # HTML server on 8000
./go we         # WorldEditor on 5173
./go map        # Icon placer
./go status     # Check all services

# URLs to test
http://localhost:8000/WORKFLOW_MANAGER.html    # Full workflow
http://localhost:8000/CHASSE_TEMPORELLE_MEGA_MAP.html  # Game
http://localhost:5173                          # WorldEditor
```

---

## Current Status

✅ **Working:**
- WorldEditor terrain creation
- Game playing (CHASSE_TEMPORELLE)
- Basic import/export
- Combat system
- Resource collection

🔧 **Issues:**
- WORKFLOW_MANAGER needs polish
- MEGA_EDITOR is buggy
- Icon placer needs 6D integration

📝 **Next Steps:**
- Save maps to backend
- Multiplayer support
- More spell types
- Better 6D visualization

---

## For Your Cousin

Best workflow:
1. Open WORKFLOW_MANAGER
2. Create terrain in Step 1
3. Add enemies/items in Step 2  
4. Test gameplay in Step 3
5. Export final map as JSON

The map will have both structure (terrain) and instances (objects) with full 6D positioning.
