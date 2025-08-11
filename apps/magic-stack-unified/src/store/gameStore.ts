/**
 * 🎮 Game Store - État global du jeu
 */

import { create } from 'zustand';

interface GameState {
  // État temporel
  temporal: {
    tw: number;
    te: number;
    debt: number;
    drift: number;
  };
  
  // État du héros
  hero: {
    position: { x: number; y: number; z: number };
    energy: { A: number; phi: number };
    inventory: any[];
  };
  
  // État des paradoxes
  paradoxes: any[];
  
  // Actions
  updateTemporal: (temporal: Partial<GameState['temporal']>) => void;
  moveHero: (position: { x: number; y: number; z: number }) => void;
  addParadox: (paradox: any) => void;
  clearParadoxes: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  temporal: {
    tw: 0,
    te: 0,
    debt: 0,
    drift: 0
  },
  
  hero: {
    position: { x: 0, y: 0, z: 0 },
    energy: { A: 50, phi: 0 },
    inventory: []
  },
  
  paradoxes: [],
  
  updateTemporal: (temporal) =>
    set((state) => ({
      temporal: { ...state.temporal, ...temporal }
    })),
    
  moveHero: (position) =>
    set((state) => ({
      hero: { ...state.hero, position }
    })),
    
  addParadox: (paradox) =>
    set((state) => ({
      paradoxes: [...state.paradoxes, paradox]
    })),
    
  clearParadoxes: () =>
    set({ paradoxes: [] })
}));
