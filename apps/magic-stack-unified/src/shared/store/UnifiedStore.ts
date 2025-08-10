import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// Types partagés
export type Mode = 'edit' | 'play' | 'test';
export type Tool = 'select' | 'terrain' | 'object' | 'entity' | 'formula' | 'regulator';
export type TerrainType = 'grass' | 'forest' | 'mountain' | 'water' | 'mystique' | 'quantum' | 'nexus';

export interface Position {
  x: number;
  y: number;
  z?: number;
}

export interface ComplexEnergy {
  amplitude: number;  // A
  phase: number;      // Φ
  getReal(): number;
  getImaginary(): number;
}

export interface Entity {
  id: string;
  type: 'hero' | 'npc' | 'regulator' | 'object';
  position: Position;
  energy: ComplexEnergy;
  temporalDebt: number;
  quantumIdentity: string;  // |ψ⟩
}

export interface WorldState {
  // Carte
  map: {
    width: number;
    height: number;
    terrain: TerrainType[][];
    objects: any[];
  };
  
  // Temporel
  temporal: {
    tw: number;        // Temps monde
    te: number;        // Temps entropique
    drift: number;     // tw - te
    debt: number;      // Dette temporelle globale
    debtRate: number;  // Taux d'intérêt
  };
  
  // Entités
  entities: Entity[];
  
  // Ressources
  resources: {
    crystals: number;
    energy: number;
    temporal: number;
    quantum: number;
  };
  
  // Régulateurs
  regulators: {
    vince: {
      active: boolean;
      aggressiveness: number;
      zone: Position | null;
    };
    anna: {
      active: boolean;
      decayRate: number;
      zone: Position | null;
    };
    overload: {
      stack: number;
      maxStack: number;
    };
  };
}

interface EditorState {
  selectedTool: Tool;
  selectedTerrain: TerrainType;
  brushSize: 1 | 3 | 5 | 7;
  selectedHex: Position | null;
  clipboard: any;
  history: any[];
  historyIndex: number;
}

interface GameState {
  playerHeroId: string | null;
  camera: {
    x: number;
    y: number;
    zoom: number;
  };
  isPaused: boolean;
  gameSpeed: number;
}

interface TestState {
  isSimulating: boolean;
  simSpeed: number;
  breakpoints: any[];
  watchedVariables: string[];
  logs: string[];
}

// Store principal unifié
interface UnifiedStore {
  // Mode actuel
  mode: Mode;
  
  // État du monde (PARTAGÉ entre tous les modes)
  world: WorldState;
  
  // État spécifique à l'éditeur
  editor: EditorState;
  
  // État spécifique au jeu
  game: GameState;
  
  // État spécifique au test
  test: TestState;
  
  // Actions partagées
  setMode: (mode: Mode) => void;
  tick: () => void;
  
  // Actions monde
  setTerrain: (x: number, y: number, terrain: TerrainType) => void;
  paintTerrain: (x: number, y: number) => void;
  addEntity: (entity: Entity) => void;
  removeEntity: (id: string) => void;
  updateEntity: (id: string, updates: Partial<Entity>) => void;
  
  // Actions temporelles
  updateTemporal: (tw?: number, te?: number) => void;
  addTemporalDebt: (amount: number) => void;
  
  // Actions éditeur
  selectTool: (tool: Tool) => void;
  selectTerrain: (terrain: TerrainType) => void;
  setBrushSize: (size: 1 | 3 | 5 | 7) => void;
  undo: () => void;
  redo: () => void;
  
  // Actions jeu
  moveHero: (x: number, y: number) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  setGameSpeed: (speed: number) => void;
  
  // Actions test
  startSimulation: () => void;
  stopSimulation: () => void;
  setSimSpeed: (speed: number) => void;
  addBreakpoint: (condition: any) => void;
  
  // Actions régulateurs
  activateVince: (zone?: Position) => void;
  activateAnna: (decayRate: number, zone?: Position) => void;
  addOverloadStack: () => void;
  
  // Helpers
  getEntityAt: (x: number, y: number) => Entity | undefined;
  getTerrainAt: (x: number, y: number) => TerrainType;
  calculateDrift: () => number;
  calculateInterference: (e1: Entity, e2: Entity) => number;
}

// Création du store avec immer pour mutations immutables
export const useUnifiedStore = create<UnifiedStore>()(
  immer((set, get) => ({
    // État initial
    mode: 'play',
    
    world: {
      map: {
        width: 60,
        height: 60,
        terrain: Array(60).fill(null).map(() => Array(60).fill('grass')),
        objects: []
      },
      temporal: {
        tw: 0,
        te: 0,
        drift: 0,
        debt: 0,
        debtRate: 0.05
      },
      entities: [],
      resources: {
        crystals: 100,
        energy: 50,
        temporal: 25,
        quantum: 10
      },
      regulators: {
        vince: { active: false, aggressiveness: 0.7, zone: null },
        anna: { active: false, decayRate: 5, zone: null },
        overload: { stack: 0, maxStack: 10 }
      }
    },
    
    editor: {
      selectedTool: 'terrain',
      selectedTerrain: 'grass',
      brushSize: 1,
      selectedHex: null,
      clipboard: null,
      history: [],
      historyIndex: -1
    },
    
    game: {
      playerHeroId: null,
      camera: { x: 30, y: 30, zoom: 1 },
      isPaused: false,
      gameSpeed: 1
    },
    
    test: {
      isSimulating: false,
      simSpeed: 1,
      breakpoints: [],
      watchedVariables: [],
      logs: []
    },
    
    // Actions
    setMode: (mode) => set(state => {
      state.mode = mode;
      // Reset certains états selon le mode
      if (mode === 'play') {
        state.game.isPaused = false;
      } else if (mode === 'test') {
        state.test.isSimulating = false;
      }
    }),
    
    tick: () => set(state => {
      // Logique de tick partagée
      state.world.temporal.tw += 1;
      state.world.temporal.te += 0.95; // Légère désynchronisation
      state.world.temporal.drift = state.world.temporal.tw - state.world.temporal.te;
      
      // Accumulation de dette si drift élevé
      if (Math.abs(state.world.temporal.drift) > 10) {
        state.world.temporal.debt += state.world.temporal.debtRate;
      }
      
      // Mise à jour des entités
      state.world.entities.forEach(entity => {
        // Logique d'update des entités
        entity.temporalDebt += 0.01;
      });
      
      // Régulateurs actifs
      if (state.world.regulators.anna.active) {
        // Appliquer décroissance
        state.world.resources.energy *= (1 - state.world.regulators.anna.decayRate / 100);
      }
    }),
    
    setTerrain: (x, y, terrain) => set(state => {
      if (x >= 0 && x < state.world.map.width && y >= 0 && y < state.world.map.height) {
        state.world.map.terrain[y][x] = terrain;
      }
    }),
    
    paintTerrain: (x, y) => set(state => {
      const brush = state.editor.brushSize;
      const terrain = state.editor.selectedTerrain;
      const radius = Math.floor(brush / 2);
      
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const px = x + dx;
          const py = y + dy;
          if (px >= 0 && px < state.world.map.width && 
              py >= 0 && py < state.world.map.height) {
            state.world.map.terrain[py][px] = terrain;
          }
        }
      }
    }),
    
    addEntity: (entity) => set(state => {
      state.world.entities.push(entity);
    }),
    
    removeEntity: (id) => set(state => {
      state.world.entities = state.world.entities.filter(e => e.id !== id);
    }),
    
    updateEntity: (id, updates) => set(state => {
      const entity = state.world.entities.find(e => e.id === id);
      if (entity) {
        Object.assign(entity, updates);
      }
    }),
    
    updateTemporal: (tw, te) => set(state => {
      if (tw !== undefined) state.world.temporal.tw = tw;
      if (te !== undefined) state.world.temporal.te = te;
      state.world.temporal.drift = state.world.temporal.tw - state.world.temporal.te;
    }),
    
    addTemporalDebt: (amount) => set(state => {
      state.world.temporal.debt += amount;
      // Collapse si dette trop élevée
      if (state.world.temporal.debt > 100) {
        console.warn('⚠️ TEMPORAL COLLAPSE! Debt exceeded maximum');
        // Trigger paradox resolution
      }
    }),
    
    selectTool: (tool) => set(state => {
      state.editor.selectedTool = tool;
    }),
    
    selectTerrain: (terrain) => set(state => {
      state.editor.selectedTerrain = terrain;
    }),
    
    setBrushSize: (size) => set(state => {
      state.editor.brushSize = size;
    }),
    
    undo: () => set(state => {
      if (state.editor.historyIndex > 0) {
        state.editor.historyIndex--;
        // Restaurer l'état précédent
      }
    }),
    
    redo: () => set(state => {
      if (state.editor.historyIndex < state.editor.history.length - 1) {
        state.editor.historyIndex++;
        // Appliquer l'état suivant
      }
    }),
    
    moveHero: (x, y) => set(state => {
      const hero = state.world.entities.find(e => e.id === state.game.playerHeroId);
      if (hero) {
        hero.position = { x, y };
      }
    }),
    
    pauseGame: () => set(state => {
      state.game.isPaused = true;
    }),
    
    resumeGame: () => set(state => {
      state.game.isPaused = false;
    }),
    
    setGameSpeed: (speed) => set(state => {
      state.game.gameSpeed = speed;
    }),
    
    startSimulation: () => set(state => {
      state.test.isSimulating = true;
      state.test.logs.push(`[${Date.now()}] Simulation started`);
    }),
    
    stopSimulation: () => set(state => {
      state.test.isSimulating = false;
      state.test.logs.push(`[${Date.now()}] Simulation stopped`);
    }),
    
    setSimSpeed: (speed) => set(state => {
      state.test.simSpeed = speed;
    }),
    
    addBreakpoint: (condition) => set(state => {
      state.test.breakpoints.push(condition);
    }),
    
    activateVince: (zone) => set(state => {
      state.world.regulators.vince.active = true;
      if (zone) state.world.regulators.vince.zone = zone;
    }),
    
    activateAnna: (decayRate, zone) => set(state => {
      state.world.regulators.anna.active = true;
      state.world.regulators.anna.decayRate = decayRate;
      if (zone) state.world.regulators.anna.zone = zone;
    }),
    
    addOverloadStack: () => set(state => {
      state.world.regulators.overload.stack++;
      if (state.world.regulators.overload.stack >= state.world.regulators.overload.maxStack) {
        console.warn('💥 OVERLOAD EXPLOSION!');
        // Trigger paradox
        state.world.regulators.overload.stack = 0;
      }
    }),
    
    // Helpers
    getEntityAt: (x, y) => {
      return get().world.entities.find(e => 
        e.position.x === x && e.position.y === y
      );
    },
    
    getTerrainAt: (x, y) => {
      const { world } = get();
      if (x >= 0 && x < world.map.width && y >= 0 && y < world.map.height) {
        return world.map.terrain[y][x];
      }
      return 'grass';
    },
    
    calculateDrift: () => {
      const { temporal } = get().world;
      return temporal.tw - temporal.te;
    },
    
    calculateInterference: (e1, e2) => {
      // Calcul d'interférence quantique entre deux entités
      const distance = Math.hypot(
        e1.position.x - e2.position.x,
        e1.position.y - e2.position.y
      );
      
      if (distance > 10) return 0;
      
      // Interférence basée sur la phase énergétique
      const phaseDiff = e1.energy.phase - e2.energy.phase;
      const interference = Math.cos(phaseDiff) * (1 - distance / 10);
      
      return interference;
    }
  }))
);
