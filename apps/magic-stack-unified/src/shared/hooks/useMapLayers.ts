/**
 * 🎨 Hook pour gérer les couches de map superposables
 * PRÉPARÉ pour le mode transparence/superposition futur!
 */

import { useState, useCallback } from 'react';

export interface MapLayer {
  id: string;
  name: string;
  type: 'spatial' | 'temporal' | 'causal' | 'resource' | 'fog';
  visible: boolean;
  opacity: number;
  zIndex: number;
  data: any;
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay';
}

export function useMapLayers() {
  const [layers, setLayers] = useState<MapLayer[]>([
    {
      id: 'terrain',
      name: 'Terrain',
      type: 'spatial',
      visible: true,
      opacity: 1,
      zIndex: 0,
      data: null,
    },
    {
      id: 'resources',
      name: 'Ressources',
      type: 'resource',
      visible: true,
      opacity: 1,
      zIndex: 1,
      data: null,
    },
    {
      id: 'temporal',
      name: 'Événements temporels',
      type: 'temporal',
      visible: false,
      opacity: 0.6,
      zIndex: 2,
      data: null,
      blendMode: 'overlay',
    },
    {
      id: 'causal',
      name: 'Liens causaux',
      type: 'causal',
      visible: false,
      opacity: 0.4,
      zIndex: 3,
      data: null,
      blendMode: 'screen',
    },
    {
      id: 'fog',
      name: 'Brouillard de guerre',
      type: 'fog',
      visible: true,
      opacity: 0.8,
      zIndex: 10,
      data: null,
      blendMode: 'multiply',
    },
  ]);

  const toggleLayer = useCallback((layerId: string) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId 
        ? { ...layer, visible: !layer.visible }
        : layer
    ));
  }, []);

  const setLayerOpacity = useCallback((layerId: string, opacity: number) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId 
        ? { ...layer, opacity: Math.max(0, Math.min(1, opacity)) }
        : layer
    ));
  }, []);

  const setLayerData = useCallback((layerId: string, data: any) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId 
        ? { ...layer, data }
        : layer
    ));
  }, []);

  const reorderLayers = useCallback((layerId: string, newZIndex: number) => {
    setLayers(prev => {
      const sorted = [...prev].sort((a, b) => {
        if (a.id === layerId) return newZIndex - b.zIndex;
        if (b.id === layerId) return a.zIndex - newZIndex;
        return a.zIndex - b.zIndex;
      });
      return sorted.map((layer, idx) => ({ ...layer, zIndex: idx }));
    });
  }, []);

  // Fonction pour MIXER les layers (futur mode superposé)
  const getMixedView = useCallback(() => {
    const visibleLayers = layers
      .filter(l => l.visible)
      .sort((a, b) => a.zIndex - b.zIndex);
    
    return {
      layers: visibleLayers,
      composite: visibleLayers.reduce((acc, layer) => {
        // Ici on pourra implémenter le mixing sophistiqué
        return { ...acc, [layer.type]: layer.data };
      }, {}),
    };
  }, [layers]);

  return {
    layers,
    toggleLayer,
    setLayerOpacity,
    setLayerData,
    reorderLayers,
    getMixedView,
  };
}
