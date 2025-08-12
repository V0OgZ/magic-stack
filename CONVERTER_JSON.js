#!/usr/bin/env node

/**
 * CONVERTER_JSON.js - Convertit entre les formats des 3 éditeurs
 * SAFE - Juste lit et écrit des JSON, touche à rien d'autre
 */

// ============= FORMATS =============

// WorldEditor Export (Structure)
const worldEditorFormat = {
    version: "2.0",
    id: "world_123",
    metadata: { name: "Mon Monde" },
    initial_state: { day: 1, tw: 0, te: 0 },
    map: {
        size: { x: 60, y: 60 },
        hexagons: [
            { position: { q: 0, r: 0 }, type: "grass" }
        ]
    }
};

// MAP_ICON_PLACER Export (Instance) - Format 6D inspiré du React
const iconPlacerFormat = {
    version: "2.0",
    map: {
        name: "Map1",
        initial_state: { te: 0, tw: 0, day: 1 },
        resources: [
            {
                id: "res_001",
                name: "Castle",
                emoji: "🏰",
                category: "building",
                position_6d: {
                    x: 100,  // spatial X
                    y: 200,  // spatial Y
                    z: 0,    // altitude
                    t: 0,    // temporal
                    c: 0,    // causal
                    psi: 0   // quantum
                },
                energy_complex: {
                    A: 100,    // real energy
                    phi: 0     // phase
                }
            }
        ]
    }
};

// CHASSE_TEMPORELLE Format (Game)
const chasseFormat = {
    map: {
        hexGrid: [], // 60x60 terrain types
        objects: []  // placed entities
    },
    temporal: { day: 1, tw: 0, te: 0 }
};

// ============= CONVERSIONS =============

function worldToChasse(worldData) {
    const result = {
        map: {
            hexGrid: [],
            objects: []
        },
        temporal: worldData.initial_state || { day: 1, tw: 0, te: 0 }
    };
    
    // Convert hexagons to grid
    const size = worldData.map?.size || { x: 60, y: 60 };
    for (let r = 0; r < size.y; r++) {
        result.map.hexGrid[r] = [];
        for (let q = 0; q < size.x; q++) {
            const hex = worldData.map?.hexagons?.find(h => 
                h.position?.q === q && h.position?.r === r
            );
            result.map.hexGrid[r][q] = hex?.type || 'grass';
        }
    }
    
    return result;
}

function iconsToChasse(iconData, chasseData) {
    // Add icons as objects
    chasseData.map.objects = iconData.icons.map(icon => ({
        type: 'icon',
        x: icon.x,
        y: icon.y,
        emoji: icon.emoji,
        temporal: {
            day: icon.day || 1,
            tw: icon.tw || 0,
            te: icon.te || 0
        }
    }));
    
    return chasseData;
}

function mergeAll(worldFile, iconsFile) {
    const world = JSON.parse(require('fs').readFileSync(worldFile));
    const icons = JSON.parse(require('fs').readFileSync(iconsFile));
    
    let chasse = worldToChasse(world);
    chasse = iconsToChasse(icons, chasse);
    
    return chasse;
}

// ============= CLI =============

const args = process.argv.slice(2);

if (args.length < 2) {
    console.log(`
USAGE:
  node CONVERTER_JSON.js world.json icons.json > game.json
  
INPUTS:
  world.json - Export from WorldEditor (terrain)
  icons.json - Export from MAP_ICON_PLACER (objects)
  
OUTPUT:
  game.json - Ready for CHASSE_TEMPORELLE
    `);
    process.exit(0);
}

try {
    const result = mergeAll(args[0], args[1]);
    console.log(JSON.stringify(result, null, 2));
} catch (error) {
    console.error('ERROR:', error.message);
    process.exit(1);
}
