/**
 * 🎮 Game Store - État global du jeu avec Zustand
 * Migration depuis HOT_GAME_UNIFIED.html
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface GameState {
  // Temporal V2
  temporal: {
    tw: number;
    te: number;
    debt: number;
    debtRate: number;
    entities: Map<string, any>;
    energy_complex?: {
      A: number;
      phi: number;
    };
  };
  
  // Resources
  resources: {
    crystals: number;
    energy: number;
    temporal: number;
    quantum: number;
  };
  
  // Game info
  day: number;
  turn: number;
  mode: 'campaign' | 'skirmish' | 'tutorial' | 'sandbox';
  difficulty: 'easy' | 'normal' | 'hard' | 'nightmare';
  
  // Hero
  heroPosition: { x: number; y: number } | null;
  heroStats: {
    health: number;
    maxHealth: number;
    attack: number;
    defense: number;
    movement: number;
  };
  
  // Regulators
  regulators: {
    vince: { active: boolean; intensity: number; position?: { x: number; y: number } };
    anna: { active: boolean; decayRate: number; zone?: string };
    overload: { stack: number; maxStack: number };
  };
  
  // Events
  events: Array<{
    id: string;
    day: number;
    type: string;
    name: string;
    description?: string;
  }>;
  
  // UI State
  currentView: 'map' | 'combat' | 'timeline';
  selectedHex: { x: number; y: number } | null;
}

interface GameActions {
  // View management
  setCurrentView: (view: 'map' | 'combat' | 'timeline') => void;
  setSelectedHex: (hex: { x: number; y: number } | null) => void;
  
  // Hero actions
  moveHero: (x: number, y: number) => void;
  
  // Turn management
  endTurn: () => void;
  tick: () => Promise<void>;
  
  // Resource management
  addResource: (resource: keyof GameState['resources'], amount: number) => void;
  consumeResource: (resource: keyof GameState['resources'], amount: number) => boolean;
  
  // Regulator actions
  activateVince: (position: { x: number; y: number }) => void;
  activateAnna: (decayRate: number) => void;
  triggerOverload: () => void;
  
  // Game management
  startNewGame: (mode: GameState['mode'], difficulty: GameState['difficulty']) => void;
  saveGame: () => void;
  loadGame: (saveData: any) => void;
  
  // Utils
  reset: () => void;
}

// Initial state
const initialState: GameState = {
  temporal: {
    tw: 0,
    te: 0,
    debt: 0,
    debtRate: 0.05,
    entities: new Map(),
    energy_complex: {
      A: 50,
      phi: Math.PI / 4,
    },
  },
  resources: {
    crystals: 100,
    energy: 50,
    temporal: 25,
    quantum: 10,
  },
  day: 1,
  turn: 1,
  mode: 'campaign',
  difficulty: 'normal',
  heroPosition: { x: 10, y: 10 },
  heroStats: {
    health: 100,
    maxHealth: 100,
    attack: 10,
    defense: 5,
    movement: 3,
  },
  regulators: {
    vince: { active: false, intensity: 0 },
    anna: { active: false, decayRate: 5 },
    overload: { stack: 0, maxStack: 10 },
  },
  events: [],
  currentView: 'map',
  selectedHex: null,
};

// Store avec Zustand
export const useGameStore = create<GameState & GameActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // View management
        setCurrentView: (view) => set({ currentView: view }),
        setSelectedHex: (hex) => set({ selectedHex: hex }),
        
        // Hero actions
        moveHero: (x, y) => {
          const state = get();
          const distance = Math.abs(x - (state.heroPosition?.x || 0)) + 
                          Math.abs(y - (state.heroPosition?.y || 0));
          
          // Coût en énergie pour le déplacement
          const cost = distance * 5;
          if (state.resources.energy >= cost) {
            set((state) => ({
              heroPosition: { x, y },
              resources: {
                ...state.resources,
                energy: state.resources.energy - cost,
              },
            }));
          }
        },
        
        // Turn management
        endTurn: async () => {
          const state = get();
          
          // Tick V2
          await get().tick();
          
          // Increment turn/day
          const newTurn = state.turn + 1;
          const newDay = Math.floor(newTurn / 10) + 1;
          
          // Resources regeneration
          set((state) => ({
            turn: newTurn,
            day: newDay,
            resources: {
              ...state.resources,
              energy: Math.min(100, state.resources.energy + 10),
              temporal: Math.min(100, state.resources.temporal + 5),
            },
          }));
          
          // Check for events
          const dayEvents = state.events.filter(e => e.day === newDay);
          if (dayEvents.length > 0) {
            console.log('📅 Événements du jour:', dayEvents);
          }
        },
        
        tick: async () => {
          // Appel au backend V2 (si disponible)
          try {
            const response = await fetch('http://localhost:3001/api/v2/tick', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(get()),
            });
            
            if (response.ok) {
              const result = await response.json();
              set((state) => ({
                temporal: {
                  ...state.temporal,
                  tw: result.new_tw || state.temporal.tw + 1,
                  te: result.new_te || state.temporal.te + 0.95,
                  debt: result.debt || state.temporal.debt,
                },
              }));
            }
          } catch (error) {
            // Fallback local
            set((state) => ({
              temporal: {
                ...state.temporal,
                tw: state.temporal.tw + 1,
                te: state.temporal.te + 0.95,
              },
            }));
          }
        },
        
        // Resource management
        addResource: (resource, amount) => {
          set((state) => ({
            resources: {
              ...state.resources,
              [resource]: state.resources[resource] + amount,
            },
          }));
        },
        
        consumeResource: (resource, amount) => {
          const state = get();
          if (state.resources[resource] >= amount) {
            set((state) => ({
              resources: {
                ...state.resources,
                [resource]: state.resources[resource] - amount,
              },
            }));
            return true;
          }
          return false;
        },
        
        // Regulator actions
        activateVince: (position) => {
          set((state) => ({
            regulators: {
              ...state.regulators,
              vince: {
                active: true,
                intensity: 1,
                position,
              },
            },
          }));
        },
        
        activateAnna: (decayRate) => {
          set((state) => ({
            regulators: {
              ...state.regulators,
              anna: {
                active: true,
                decayRate,
              },
            },
          }));
        },
        
        triggerOverload: () => {
          const state = get();
          const newStack = state.regulators.overload.stack + 1;
          
          if (newStack >= state.regulators.overload.maxStack) {
            console.log('💥 OVERLOAD EXPLOSION!');
            set((state) => ({
              regulators: {
                ...state.regulators,
                overload: { ...state.regulators.overload, stack: 0 },
              },
            }));
          } else {
            set((state) => ({
              regulators: {
                ...state.regulators,
                overload: { ...state.regulators.overload, stack: newStack },
              },
            }));
          }
        },
        
        // Game management
        startNewGame: (mode, difficulty) => {
          set({
            ...initialState,
            mode,
            difficulty,
          });
        },
        
        saveGame: () => {
          const state = get();
          const saveData = JSON.stringify(state);
          localStorage.setItem('magic-stack-save', saveData);
          console.log('💾 Jeu sauvegardé');
        },
        
        loadGame: (saveData) => {
          try {
            const state = JSON.parse(saveData);
            set(state);
            console.log('📂 Jeu chargé');
          } catch (error) {
            console.error('Erreur chargement:', error);
          }
        },
        
        // Utils
        reset: () => set(initialState),
      }),
      {
        name: 'magic-stack-game',
        partialize: (state) => ({
          // Ne persister que les données de jeu, pas l'UI
          temporal: state.temporal,
          resources: state.resources,
          day: state.day,
          turn: state.turn,
          mode: state.mode,
          difficulty: state.difficulty,
          heroPosition: state.heroPosition,
          heroStats: state.heroStats,
          regulators: state.regulators,
          events: state.events,
        }),
      }
    )
  )
);

// Hexes store séparé pour la map (performance)
export const useHexStore = create<{
  hexes: Map<string, any>;
  setHex: (x: number, y: number, data: any) => void;
  getHex: (x: number, y: number) => any;
  generateMap: (width: number, height: number) => void;
}>((set, get) => ({
  hexes: new Map(),
  
  setHex: (x, y, data) => {
    const key = `${x},${y}`;
    set((state) => {
      const newHexes = new Map(state.hexes);
      newHexes.set(key, { x, y, ...data });
      return { hexes: newHexes };
    });
  },
  
  getHex: (x, y) => {
    const key = `${x},${y}`;
    return get().hexes.get(key);
  },
  
  generateMap: (width, height) => {
    const newHexes = new Map();
    const terrains = ['grass', 'forest', 'mountain', 'water', 'mystique', 'quantum'];
    
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const key = `${x},${y}`;
        newHexes.set(key, {
          x,
          y,
          terrain: terrains[Math.floor(Math.random() * terrains.length)],
          fog: Math.random() > 0.7 ? 'partial' : 'clear',
        });
      }
    }
    
    set({ hexes: newHexes });
  },
}));

// Auto-generate map on load
if (typeof window !== 'undefined') {
  const hexStore = useHexStore.getState();
  if (hexStore.hexes.size === 0) {
    hexStore.generateMap(20, 20);
  }
}
