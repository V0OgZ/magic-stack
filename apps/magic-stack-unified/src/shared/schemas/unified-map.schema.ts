/**
 * 🗺️ UNIFIED MAP SYSTEM SCHEMAS
 * 
 * Définition des formats world.json et map.json
 * pour l'éditeur unifié où l'éditeur EST le jeu !
 */

import { z } from 'zod';

// ========== WORLD SCHEMA (Structure) ==========

/**
 * Position hexagonale dans la grille
 */
export const HexPositionSchema = z.object({
  q: z.number(), // Coordonnée axiale q
  r: z.number(), // Coordonnée axiale r
});

/**
 * Terrain hexagonal avec type et propriétés
 */
export const HexTerrainSchema = z.object({
  position: HexPositionSchema,
  type: z.enum(['grass', 'forest', 'mountain', 'water', 'desert', 'snow', 'lava', 'void']),
  elevation: z.number().default(0), // -10 à 10
  passable: z.boolean().default(true),
  movementCost: z.number().default(1),
  properties: z.record(z.any()).optional(),
});

/**
 * Région nommée regroupant plusieurs hexagones
 */
export const RegionSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(), // Couleur pour l'affichage
  hexes: z.array(HexPositionSchema),
  properties: z.object({
    faction: z.string().optional(),
    difficulty: z.enum(['easy', 'normal', 'hard', 'nightmare']).optional(),
    temporalZone: z.string().optional(), // past, present, future
  }).optional(),
});

/**
 * Connexion spatiale entre régions
 */
export const SpatialConnectionSchema = z.object({
  id: z.string(),
  from: z.string(), // Region ID
  to: z.string(), // Region ID
  type: z.enum(['road', 'portal', 'bridge', 'teleport']),
  bidirectional: z.boolean().default(true),
  cost: z.number().default(1),
});

/**
 * Structure complète du monde (terrain)
 */
export const WorldSchema = z.object({
  version: z.literal('2.0'),
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  dimensions: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
  }),
  hexagons: z.array(HexTerrainSchema),
  regions: z.array(RegionSchema).default([]),
  connections: z.array(SpatialConnectionSchema).default([]),
  metadata: z.object({
    author: z.string().optional(),
    created: z.string().datetime().optional(),
    tags: z.array(z.string()).optional(),
  }).optional(),
});

// ========== MAP SCHEMA (World + Instances) ==========

/**
 * Position 6D complète pour les entités
 */
export const Position6DSchema = z.object({
  x: z.number(), // Position X dans l'espace
  y: z.number(), // Position Y dans l'espace
  z: z.number().default(0), // Altitude/Profondeur
  t: z.number().default(0), // Temps (timeline)
  c: z.number().default(0), // Causalité
  psi: z.number().min(0).max(1).default(0), // Quantum (probabilité)
});

/**
 * Énergie complexe pour les entités avancées
 */
export const EnergyComplexSchema = z.object({
  A: z.number().min(0).max(100), // Amplitude
  phi: z.number().min(-180).max(180), // Phase
});

/**
 * Icône/Resource placée sur la map
 */
export const PlacedResourceSchema = z.object({
  id: z.string(),
  type: z.enum(['hero', 'creature', 'artifact', 'resource', 'building', 'marker']),
  subtype: z.string(), // hero_id, creature_id, etc.
  emoji: z.string(), // Représentation visuelle
  name: z.string(),
  position_6d: Position6DSchema,
  
  // Propriétés optionnelles
  size: z.number().default(40),
  rotation: z.number().default(0),
  opacity: z.number().min(0).max(1).default(1),
  
  // Propriétés temporelles
  temporal: z.object({
    cycle: z.number().optional(), // Répétition en secondes
    te: z.number().optional(), // Temps entité
    appearDay: z.number().optional(), // Jour d'apparition
    disappearDay: z.number().optional(), // Jour de disparition
  }).optional(),
  
  // Énergie complexe (pour entités avancées)
  energy_complex: EnergyComplexSchema.optional(),
  
  // Données spécifiques au type
  data: z.record(z.any()).optional(),
});

/**
 * Connexion entre ressources (causalité, etc.)
 */
export const ResourceConnectionSchema = z.object({
  id: z.string(),
  from: z.string(), // Resource ID
  to: z.string(), // Resource ID
  type: z.enum(['temporal', 'causal', 'quantum', 'energy']),
  strength: z.number().min(0).max(1).default(0.5),
  properties: z.object({
    interference: z.number().optional(),
    delay: z.number().optional(),
    condition: z.string().optional(),
  }).optional(),
});

/**
 * Événement temporel dans la timeline
 */
export const TemporalEventSchema = z.object({
  id: z.string(),
  day: z.number().positive(),
  type: z.string(),
  name: z.string(),
  description: z.string().optional(),
  
  // Ce qui se passe
  action: z.object({
    spawn: z.array(PlacedResourceSchema).optional(),
    remove: z.array(z.string()).optional(), // Resource IDs à supprimer
    modify: z.array(z.object({
      resourceId: z.string(),
      changes: z.record(z.any()),
    })).optional(),
  }).optional(),
  
  // Conditions
  conditions: z.array(z.string()).optional(),
  
  // Répétition
  repeat: z.object({
    interval: z.number(), // Tous les X jours
    times: z.number().optional(), // Nombre de répétitions (infini si absent)
  }).optional(),
});

/**
 * Régulateurs V2
 */
export const RegulatorsSchema = z.object({
  vince: z.object({
    active: z.boolean().default(false),
    intensity: z.number().default(1),
    zone: z.string().optional(),
  }),
  anna: z.object({
    active: z.boolean().default(false),
    decayRate: z.number().default(5),
    zone: z.string().optional(),
  }),
  overload: z.object({
    stack: z.number().default(0),
    maxStack: z.number().default(10),
    threshold: z.number().default(7),
  }),
});

/**
 * Conditions de victoire
 */
export const VictoryConditionSchema = z.object({
  type: z.enum(['elimination', 'capture', 'survive', 'collect', 'custom']),
  description: z.string(),
  parameters: z.record(z.any()).optional(),
});

/**
 * Configuration complète de la map (world + instances)
 */
export const MapSchema = z.object({
  version: z.literal('2.0'),
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  
  // Référence ou embed du world
  world: z.union([
    z.string(), // ID/path du world
    WorldSchema, // World embed complet
  ]),
  
  // Resources placées
  resources: z.array(PlacedResourceSchema).default([]),
  connections: z.array(ResourceConnectionSchema).default([]),
  
  // Timeline
  timeline: z.object({
    events: z.array(TemporalEventSchema).default([]),
    maxDays: z.number().default(100),
    startDay: z.number().default(1),
  }),
  
  // Régulateurs V2
  regulators: RegulatorsSchema,
  
  // Conditions de jeu
  victory_conditions: z.array(VictoryConditionSchema).default([]),
  defeat_conditions: z.array(VictoryConditionSchema).default([]),
  
  // Configuration initiale
  initial_state: z.object({
    resources: z.object({
      gold: z.number().default(1000),
      crystals: z.number().default(100),
      energy: z.number().default(50),
      temporal: z.number().default(25),
      quantum: z.number().default(10),
    }),
    tw: z.number().default(0),
    te: z.number().default(0),
  }),
  
  // Métadonnées
  metadata: z.object({
    author: z.string().optional(),
    created: z.string().datetime().optional(),
    modified: z.string().datetime().optional(),
    tags: z.array(z.string()).optional(),
    difficulty: z.enum(['easy', 'normal', 'hard', 'nightmare']).optional(),
    playerCount: z.object({
      min: z.number().default(1),
      max: z.number().default(8),
    }).optional(),
  }).optional(),
});

// ========== TYPES EXPORTS ==========

export type HexPosition = z.infer<typeof HexPositionSchema>;
export type HexTerrain = z.infer<typeof HexTerrainSchema>;
export type Region = z.infer<typeof RegionSchema>;
export type SpatialConnection = z.infer<typeof SpatialConnectionSchema>;
export type World = z.infer<typeof WorldSchema>;

export type Position6D = z.infer<typeof Position6DSchema>;
export type EnergyComplex = z.infer<typeof EnergyComplexSchema>;
export type PlacedResource = z.infer<typeof PlacedResourceSchema>;
export type ResourceConnection = z.infer<typeof ResourceConnectionSchema>;
export type TemporalEvent = z.infer<typeof TemporalEventSchema>;
export type Regulators = z.infer<typeof RegulatorsSchema>;
export type VictoryCondition = z.infer<typeof VictoryConditionSchema>;
export type Map = z.infer<typeof MapSchema>;

// ========== HELPERS ==========

/**
 * Valide un world JSON
 */
export function validateWorld(data: unknown): World {
  return WorldSchema.parse(data);
}

/**
 * Valide une map JSON
 */
export function validateMap(data: unknown): Map {
  return MapSchema.parse(data);
}

/**
 * Crée un world vide
 */
export function createEmptyWorld(name: string, width: number, height: number): World {
  const hexagons: HexTerrain[] = [];
  
  // Génère une grille hexagonale
  for (let q = 0; q < width; q++) {
    for (let r = 0; r < height; r++) {
      hexagons.push({
        position: { q, r },
        type: 'grass',
        elevation: 0,
        passable: true,
        movementCost: 1,
      });
    }
  }
  
  return {
    version: '2.0',
    id: `world_${Date.now()}`,
    name,
    dimensions: { width, height },
    hexagons,
    regions: [],
    connections: [],
  };
}

/**
 * Crée une map vide à partir d'un world
 */
export function createEmptyMap(name: string, worldIdOrWorld: string | World): Map {
  return {
    version: '2.0',
    id: `map_${Date.now()}`,
    name,
    world: worldIdOrWorld,
    resources: [],
    connections: [],
    timeline: {
      events: [],
      maxDays: 100,
      startDay: 1,
    },
    regulators: {
      vince: { active: false, intensity: 1 },
      anna: { active: false, decayRate: 5 },
      overload: { stack: 0, maxStack: 10, threshold: 7 },
    },
    victory_conditions: [],
    defeat_conditions: [],
    initial_state: {
      resources: {
        gold: 1000,
        crystals: 100,
        energy: 50,
        temporal: 25,
        quantum: 10,
      },
      tw: 0,
      te: 0,
    },
  };
}
