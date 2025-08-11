/**
 * 🔄 Hook pour Undo/Redo
 * Exportable et réutilisable dans tous les modes
 */

import { useState, useCallback, useRef } from 'react';

export function useUndoRedo<T>(initialState: T, maxHistory: number = 50) {
  const [state, setState] = useState<T>(initialState);
  const history = useRef<T[]>([initialState]);
  const currentIndex = useRef(0);

  const pushState = useCallback((newState: T | ((prev: T) => T)) => {
    setState(prev => {
      const nextState = typeof newState === 'function' 
        ? (newState as (prev: T) => T)(prev) 
        : newState;
      
      // Couper l'historique si on est au milieu
      if (currentIndex.current < history.current.length - 1) {
        history.current = history.current.slice(0, currentIndex.current + 1);
      }
      
      // Ajouter le nouvel état
      history.current.push(nextState);
      
      // Limiter la taille de l'historique
      if (history.current.length > maxHistory) {
        history.current.shift();
      } else {
        currentIndex.current++;
      }
      
      return nextState;
    });
  }, [maxHistory]);

  const undo = useCallback(() => {
    if (currentIndex.current > 0) {
      currentIndex.current--;
      setState(history.current[currentIndex.current]);
      return true;
    }
    return false;
  }, []);

  const redo = useCallback(() => {
    if (currentIndex.current < history.current.length - 1) {
      currentIndex.current++;
      setState(history.current[currentIndex.current]);
      return true;
    }
    return false;
  }, []);

  const canUndo = currentIndex.current > 0;
  const canRedo = currentIndex.current < history.current.length - 1;

  const reset = useCallback(() => {
    history.current = [initialState];
    currentIndex.current = 0;
    setState(initialState);
  }, [initialState]);

  const getHistory = useCallback(() => {
    return {
      states: [...history.current],
      currentIndex: currentIndex.current,
    };
  }, []);

  // Raccourcis clavier
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key === 'z') {
      e.preventDefault();
      undo();
    } else if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z') {
      e.preventDefault();
      redo();
    } else if ((e.metaKey || e.ctrlKey) && e.key === 'y') {
      e.preventDefault();
      redo();
    }
  }, [undo, redo]);

  return {
    state,
    setState: pushState,
    undo,
    redo,
    canUndo,
    canRedo,
    reset,
    getHistory,
    handleKeyPress,
  };
}
