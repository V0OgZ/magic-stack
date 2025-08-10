/**
 * 🗺️ Editor Store - État de l'éditeur de cartes
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Icon {
  id: string;
  emoji: string;
  name: string;
}

interface Hex {
  x: number;
  y: number;
  terrain?: string;
  icon?: Icon;
  connections?: string[];
  metadata?: any;
}

interface EditorState {
  // Map
  hexes: Map<string, Hex>;
  mapSize: { width: number; height: number };
  
  // Selection
  selectedHex: { x: number; y: number } | null;
  selectedIcon: Icon | null;
  
  // Tools
  currentTool: 'select' | 'terrain' | 'icon' | 'erase' | 'connect';
  
  // History (undo/redo)
  history: Hex[][];
  historyIndex: number;
}

interface EditorActions {
  // Selection
  setSelectedHex: (hex: { x: number; y: number } | null) => void;
  setSelectedIcon: (icon: Icon | null) => void;
  
  // Tools
  setCurrentTool: (tool: EditorState['currentTool']) => void;
  
  // Map operations
  placeIcon: (x: number, y: number, icon: Icon) => void;
  setTerrain: (x: number, y: number, terrain: string) => void;
  clearHex: (x: number, y: number) => void;
  connectHexes: (from: { x: number; y: number }, to: { x: number; y: number }) => void;
  
  // Import/Export
  exportMap: () => any;
  importMap: (data: any) => void;
  
  // History
  undo: () => void;
  redo: () => void;
  
  // Utils
  reset: () => void;
  initializeMap: (width: number, height: number) => void;
}

const initialState: EditorState = {
  hexes: new Map(),
  mapSize: { width: 30, height: 20 },
  selectedHex: null,
  selectedIcon: null,
  currentTool: 'select',
  history: [],
  historyIndex: -1,
};

export const useEditorStore = create<EditorState & EditorActions>()(
  devtools((set, get) => ({
    ...initialState,
    
    // Selection
    setSelectedHex: (hex) => set({ selectedHex: hex }),
    setSelectedIcon: (icon) => set({ selectedIcon: icon }),
    
    // Tools
    setCurrentTool: (tool) => set({ currentTool: tool }),
    
    // Map operations
    placeIcon: (x, y, icon) => {
      const key = `${x},${y}`;
      set((state) => {
        const newHexes = new Map(state.hexes);
        const hex = newHexes.get(key) || { x, y };
        hex.icon = icon;
        newHexes.set(key, hex);
        
        // Add to history
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(Array.from(newHexes.values()));
        
        return {
          hexes: newHexes,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        };
      });
    },
    
    setTerrain: (x, y, terrain) => {
      const key = `${x},${y}`;
      set((state) => {
        const newHexes = new Map(state.hexes);
        const hex = newHexes.get(key) || { x, y };
        hex.terrain = terrain;
        newHexes.set(key, hex);
        return { hexes: newHexes };
      });
    },
    
    clearHex: (x, y) => {
      const key = `${x},${y}`;
      set((state) => {
        const newHexes = new Map(state.hexes);
        newHexes.delete(key);
        return { hexes: newHexes };
      });
    },
    
    connectHexes: (from, to) => {
      const fromKey = `${from.x},${from.y}`;
      const toKey = `${to.x},${to.y}`;
      
      set((state) => {
        const newHexes = new Map(state.hexes);
        
        // Add connection from -> to
        const fromHex = newHexes.get(fromKey) || { x: from.x, y: from.y };
        fromHex.connections = fromHex.connections || [];
        if (!fromHex.connections.includes(toKey)) {
          fromHex.connections.push(toKey);
        }
        newHexes.set(fromKey, fromHex);
        
        // Add connection to -> from (bidirectional)
        const toHex = newHexes.get(toKey) || { x: to.x, y: to.y };
        toHex.connections = toHex.connections || [];
        if (!toHex.connections.includes(fromKey)) {
          toHex.connections.push(fromKey);
        }
        newHexes.set(toKey, toHex);
        
        return { hexes: newHexes };
      });
    },
    
    // Import/Export
    exportMap: () => {
      const state = get();
      return {
        version: '1.0.0',
        mapSize: state.mapSize,
        hexes: Array.from(state.hexes.values()),
        metadata: {
          createdAt: new Date().toISOString(),
          tool: 'Magic Stack Unified Editor',
        },
      };
    },
    
    importMap: (data) => {
      if (!data || !data.hexes) return;
      
      const newHexes = new Map();
      data.hexes.forEach((hex: Hex) => {
        newHexes.set(`${hex.x},${hex.y}`, hex);
      });
      
      set({
        hexes: newHexes,
        mapSize: data.mapSize || { width: 30, height: 20 },
      });
    },
    
    // History
    undo: () => {
      const state = get();
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        const hexData = state.history[newIndex];
        const newHexes = new Map();
        hexData.forEach(hex => {
          newHexes.set(`${hex.x},${hex.y}`, hex);
        });
        set({
          hexes: newHexes,
          historyIndex: newIndex,
        });
      }
    },
    
    redo: () => {
      const state = get();
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        const hexData = state.history[newIndex];
        const newHexes = new Map();
        hexData.forEach(hex => {
          newHexes.set(`${hex.x},${hex.y}`, hex);
        });
        set({
          hexes: newHexes,
          historyIndex: newIndex,
        });
      }
    },
    
    // Utils
    reset: () => set(initialState),
    
    initializeMap: (width, height) => {
      const newHexes = new Map();
      const terrains = ['grass', 'forest', 'mountain', 'water'];
      
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          const key = `${x},${y}`;
          newHexes.set(key, {
            x,
            y,
            terrain: terrains[Math.floor(Math.random() * terrains.length)],
          });
        }
      }
      
      set({
        hexes: newHexes,
        mapSize: { width, height },
      });
    },
  }))
);

// Auto-initialize map on load
if (typeof window !== 'undefined') {
  const store = useEditorStore.getState();
  if (store.hexes.size === 0) {
    store.initializeMap(30, 20);
  }
}
