/**
 * 🏹 Chasse Store - État pour le mode Chasse Temporelle
 * Map 120x120 avec viewport 20x20
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ChasseState {
  // Viewport (fenêtre visible 20x20)
  viewport: { x: number; y: number };
  
  // Temporal V2
  temporal: {
    tw: number;
    te: number;
    debt: number;
    debtMax: number;
    driftRate: number;
  };
  
  // Resources
  resources: {
    crystals: number;
    energy: number;
    temporal: number;
  };
  
  // Difficulty settings
  difficulty: 'easy' | 'normal' | 'hard' | 'nightmare';
  difficultySettings: {
    driftRate: number;
    debtMax: number;
    enemyDensity: number;
    resourceScarcity: number;
  };
  
  // Hero
  heroPosition: { x: number; y: number } | null;
  heroStats: {
    health: number;
    maxHealth: number;
    vision: number; // Rayon de vision pour le brouillard
  };
  
  // Map data (120x120)
  mapSize: { width: number; height: number };
  hexes: Map<string, any>;
  discoveredHexes: Set<string>; // Pour le brouillard de guerre
  
  // Selection
  selectedHex: { x: number; y: number } | null;
  
  // Audio
  audioEnabled: boolean;
  audioVolume: number;
}

interface ChasseActions {
  // Viewport
  setViewport: (viewport: { x: number; y: number }) => void;
  moveViewport: (dx: number, dy: number) => void;
  centerOnHero: () => void;
  
  // Hero
  moveHero: (x: number, y: number) => void;
  
  // Selection
  setSelectedHex: (hex: { x: number; y: number } | null) => void;
  
  // Temporal
  tick: () => void;
  
  // Game
  initGame: (difficulty: 'easy' | 'normal' | 'hard' | 'nightmare') => void;
  generateMegaMap: () => void;
  
  // Hexes
  setHex: (x: number, y: number, data: any) => void;
  getHex: (x: number, y: number) => any;
  discoverHex: (x: number, y: number) => void;
  
  // Audio
  toggleAudio: () => void;
  setVolume: (volume: number) => void;
  playSound: (sound: string) => void;
}

const DIFFICULTY_PRESETS = {
  easy: {
    driftRate: 0.1,
    debtMax: 100,
    enemyDensity: 0.1,
    resourceScarcity: 0.2,
  },
  normal: {
    driftRate: 0.3,
    debtMax: 50,
    enemyDensity: 0.2,
    resourceScarcity: 0.4,
  },
  hard: {
    driftRate: 0.5,
    debtMax: 30,
    enemyDensity: 0.35,
    resourceScarcity: 0.6,
  },
  nightmare: {
    driftRate: 1.0,
    debtMax: 10,
    enemyDensity: 0.5,
    resourceScarcity: 0.8,
  },
};

export const useChasseStore = create<ChasseState & ChasseActions>()(
  devtools((set, get) => ({
    // Initial state
    viewport: { x: 50, y: 50 }, // Start au centre
    temporal: {
      tw: 0,
      te: 0,
      debt: 0,
      debtMax: 50,
      driftRate: 0.3,
    },
    resources: {
      crystals: 50,
      energy: 100,
      temporal: 25,
    },
    difficulty: 'normal',
    difficultySettings: DIFFICULTY_PRESETS.normal,
    heroPosition: { x: 60, y: 60 },
    heroStats: {
      health: 100,
      maxHealth: 100,
      vision: 5,
    },
    mapSize: { width: 120, height: 120 },
    hexes: new Map(),
    discoveredHexes: new Set(),
    selectedHex: null,
    audioEnabled: true,
    audioVolume: 0.5,
    
    // Actions
    setViewport: (viewport) => set({ viewport }),
    
    moveViewport: (dx, dy) => {
      const state = get();
      const newX = Math.max(0, Math.min(100, state.viewport.x + dx));
      const newY = Math.max(0, Math.min(100, state.viewport.y + dy));
      set({ viewport: { x: newX, y: newY } });
    },
    
    centerOnHero: () => {
      const state = get();
      if (state.heroPosition) {
        const vx = Math.max(0, Math.min(100, state.heroPosition.x - 10));
        const vy = Math.max(0, Math.min(100, state.heroPosition.y - 10));
        set({ viewport: { x: vx, y: vy } });
      }
    },
    
    moveHero: (x, y) => {
      const state = get();
      const oldPos = state.heroPosition;
      
      if (!oldPos) return;
      
      // Calcul distance
      const distance = Math.abs(x - oldPos.x) + Math.abs(y - oldPos.y);
      const energyCost = distance * 2;
      
      // Vérifier l'énergie
      if (state.resources.energy < energyCost) {
        console.log('⚡ Pas assez d\'énergie!');
        return;
      }
      
      // Déplacer et consommer énergie
      set((state) => ({
        heroPosition: { x, y },
        resources: {
          ...state.resources,
          energy: state.resources.energy - energyCost,
        },
      }));
      
      // Découvrir les hexagones autour
      const vision = state.heroStats.vision;
      for (let dx = -vision; dx <= vision; dx++) {
        for (let dy = -vision; dy <= vision; dy++) {
          get().discoverHex(x + dx, y + dy);
        }
      }
      
      // Son de déplacement
      get().playSound('move');
    },
    
    setSelectedHex: (hex) => set({ selectedHex: hex }),
    
    tick: () => {
      const state = get();
      const { driftRate } = state.difficultySettings;
      
      // Update temporal
      const newTw = state.temporal.tw + 1;
      const newTe = state.temporal.te + (1 - driftRate);
      const drift = Math.abs(newTw - newTe);
      
      // Accumulation de dette
      let newDebt = state.temporal.debt;
      if (drift > 5) {
        newDebt += drift * 0.1;
      }
      
      // Game over si dette max dépassée
      if (newDebt > state.temporal.debtMax) {
        console.log('💀 GAME OVER - Dette temporelle maximale atteinte!');
        get().playSound('gameover');
      }
      
      set((state) => ({
        temporal: {
          ...state.temporal,
          tw: newTw,
          te: newTe,
          debt: Math.min(newDebt, state.temporal.debtMax),
        },
      }));
    },
    
    initGame: (difficulty) => {
      const settings = DIFFICULTY_PRESETS[difficulty];
      
      set({
        difficulty,
        difficultySettings: settings,
        temporal: {
          tw: 0,
          te: 0,
          debt: 0,
          debtMax: settings.debtMax,
          driftRate: settings.driftRate,
        },
        resources: {
          crystals: difficulty === 'easy' ? 100 : 
                   difficulty === 'normal' ? 50 : 
                   difficulty === 'hard' ? 25 : 10,
          energy: 100,
          temporal: 25,
        },
        heroPosition: { x: 60, y: 60 },
        viewport: { x: 50, y: 50 },
      });
      
      // Générer la mega map
      get().generateMegaMap();
      
      // Découvrir zone initiale
      const hero = get().heroPosition;
      if (hero) {
        const vision = get().heroStats.vision;
        for (let dx = -vision; dx <= vision; dx++) {
          for (let dy = -vision; dy <= vision; dy++) {
            get().discoverHex(hero.x + dx, hero.y + dy);
          }
        }
      }
    },
    
    generateMegaMap: () => {
      const newHexes = new Map();
      const { enemyDensity, resourceScarcity } = get().difficultySettings;
      
      const terrains = ['grass', 'forest', 'mountain', 'water', 'mystique', 'quantum', 'nexus'];
      
      // Génération procédurale avec zones
      for (let x = 0; x < 120; x++) {
        for (let y = 0; y < 120; y++) {
          const key = `${x},${y}`;
          
          // Terrain de base avec zones
          let terrain = 'grass';
          const zoneX = Math.floor(x / 20);
          const zoneY = Math.floor(y / 20);
          
          // Zones thématiques (6x6 zones de 20x20)
          if (zoneX === 0 && zoneY === 0) {
            // Zone de départ - prairie
            terrain = Math.random() > 0.3 ? 'grass' : 'forest';
          } else if (zoneX === 5 && zoneY === 5) {
            // Zone finale - quantum/nexus
            terrain = Math.random() > 0.5 ? 'quantum' : 'nexus';
          } else if (zoneX === 2 && zoneY === 3) {
            // Zone mystique
            terrain = Math.random() > 0.4 ? 'mystique' : 'mountain';
          } else {
            // Zones mixtes
            terrain = terrains[Math.floor(Math.random() * terrains.length)];
          }
          
          // Entités (ennemis)
          let entity = null;
          if (Math.random() < enemyDensity && !(x === 60 && y === 60)) {
            entity = {
              type: 'enemy',
              icon: '👹',
              strength: Math.floor(Math.random() * 10) + 1,
            };
          }
          
          // Ressources
          let resource = null;
          if (!entity && Math.random() > resourceScarcity) {
            const resourceTypes = ['crystals', 'energy', 'temporal'];
            resource = {
              type: resourceTypes[Math.floor(Math.random() * 3)],
              amount: Math.floor(Math.random() * 20) + 5,
            };
          }
          
          // Points d'intérêt spéciaux
          let poi = null;
          if (Math.random() < 0.02) { // 2% de chance
            const poiTypes = [
              { name: 'Sanctuaire Temporel', icon: '⛩️', effect: 'reset_drift' },
              { name: 'Cristal Ancien', icon: '💎', effect: 'bonus_crystals' },
              { name: 'Puits Quantique', icon: '🌀', effect: 'teleport' },
              { name: 'Archive OPUS', icon: '📚', effect: 'reveal_map' },
            ];
            poi = poiTypes[Math.floor(Math.random() * poiTypes.length)];
          }
          
          newHexes.set(key, {
            x,
            y,
            terrain,
            entity,
            resource,
            poi,
            fog: 'total', // Tout commence caché
          });
        }
      }
      
      // Placer des événements spéciaux
      // Zone de départ sécurisée
      for (let dx = -3; dx <= 3; dx++) {
        for (let dy = -3; dy <= 3; dy++) {
          const key = `${60 + dx},${60 + dy}`;
          const hex = newHexes.get(key);
          if (hex) {
            hex.entity = null; // Pas d'ennemis
            hex.terrain = 'grass';
          }
        }
      }
      
      // Boss final au centre de la dernière zone
      newHexes.set('110,110', {
        x: 110,
        y: 110,
        terrain: 'nexus',
        entity: {
          type: 'boss',
          icon: '🐉',
          name: 'Gardien Temporel',
          strength: 100,
        },
        fog: 'total',
      });
      
      set({ hexes: newHexes });
      console.log('🗺️ Mega map 120x120 générée!');
    },
    
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
    
    discoverHex: (x, y) => {
      if (x < 0 || x >= 120 || y < 0 || y >= 120) return;
      
      const key = `${x},${y}`;
      set((state) => {
        const newDiscovered = new Set(state.discoveredHexes);
        newDiscovered.add(key);
        
        // Mettre à jour le brouillard
        const newHexes = new Map(state.hexes);
        const hex = newHexes.get(key);
        if (hex) {
          hex.fog = 'clear';
          newHexes.set(key, hex);
        }
        
        return {
          discoveredHexes: newDiscovered,
          hexes: newHexes,
        };
      });
    },
    
    toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
    
    setVolume: (volume) => set({ audioVolume: volume }),
    
    playSound: (sound) => {
      const state = get();
      if (!state.audioEnabled) return;
      
      // Jouer le son (placeholder - nécessite Web Audio API)
      console.log(`🔊 Playing sound: ${sound} at volume ${state.audioVolume}`);
    },
  }))
);
