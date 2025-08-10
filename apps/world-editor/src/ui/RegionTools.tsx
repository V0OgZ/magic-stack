/**
 * 🎨 Region Tools - Outils de sélection et modification de régions
 * Inspiré par les éditeurs de cartes StarCraft/Warcraft
 */

import React from 'react';
import { useEditorStore } from '../state/useEditorStore';

type Tool = 'select' | 'paint' | 'fill' | 'cf_radius' | 'opc_zone' | 'paradox_field';
type SelectionMode = 'rectangle' | 'circle' | 'magic_wand' | 'lasso';

interface Region {
  hexes: Array<{ x: number; y: number }>;
  center: { x: number; y: number };
  radius: number;
}

export function RegionTools(): React.ReactElement {
  const [currentTool, setCurrentTool] = React.useState<Tool>('select');
  const [selectionMode, setSelectionMode] = React.useState<SelectionMode>('rectangle');
  const [isSelecting, setIsSelecting] = React.useState(false);
  const [selection, setSelection] = React.useState<Region | null>(null);
  const [brushRadius, setBrushRadius] = React.useState(3);
  const [cfIntensity, setCfIntensity] = React.useState(5);
  const [opcStrength, setOpcStrength] = React.useState(7);
  
  const { scenario, setTerrainAt, addObjectAt } = useEditorStore();
  
  // Calcul de la distance hexagonale
  const hexDistance = (h1: { x: number; y: number }, h2: { x: number; y: number }) => {
    return Math.max(
      Math.abs(h1.x - h2.x),
      Math.abs(h1.y - h2.y),
      Math.abs((h1.x - h1.y) - (h2.x - h2.y))
    );
  };
  
  // Sélection circulaire d'hexagones
  const selectCircle = (center: { x: number; y: number }, radius: number): Region => {
    const hexes: Array<{ x: number; y: number }> = [];
    
    for (let x = center.x - radius; x <= center.x + radius; x++) {
      for (let y = center.y - radius; y <= center.y + radius; y++) {
        if (hexDistance(center, { x, y }) <= radius) {
          hexes.push({ x, y });
        }
      }
    }
    
    return { hexes, center, radius };
  };
  
  // Sélection rectangulaire
  const selectRectangle = (
    start: { x: number; y: number }, 
    end: { x: number; y: number }
  ): Region => {
    const minX = Math.min(start.x, end.x);
    const maxX = Math.max(start.x, end.x);
    const minY = Math.min(start.y, end.y);
    const maxY = Math.max(start.y, end.y);
    
    const hexes: Array<{ x: number; y: number }> = [];
    
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        hexes.push({ x, y });
      }
    }
    
    const center = {
      x: Math.floor((minX + maxX) / 2),
      y: Math.floor((minY + maxY) / 2),
    };
    
    return { 
      hexes, 
      center, 
      radius: Math.max(maxX - minX, maxY - minY) / 2 
    };
  };
  
  // Application d'un effet à une région
  const applyToRegion = (region: Region, effect: string) => {
    region.hexes.forEach(hex => {
      switch (effect) {
        case 'terrain_grass':
          setTerrainAt(hex.x, hex.y, 'grass');
          break;
        case 'terrain_forest':
          setTerrainAt(hex.x, hex.y, 'forest');
          break;
        case 'terrain_mountain':
          setTerrainAt(hex.x, hex.y, 'mountain');
          break;
        case 'terrain_water':
          setTerrainAt(hex.x, hex.y, 'water');
          break;
        case 'terrain_mystique':
          setTerrainAt(hex.x, hex.y, 'mystique');
          break;
        case 'terrain_quantum':
          setTerrainAt(hex.x, hex.y, 'quantum');
          break;
        case 'cf_fog':
          addObjectAt(hex.x, hex.y, 'cf_zone', {
            name: 'Brouillard de Causalité',
            intensity: cfIntensity,
            radius: brushRadius,
          });
          break;
        case 'opc_zone':
          addObjectAt(hex.x, hex.y, 'opc_zone', {
            name: 'Zone OPC',
            strength: opcStrength,
            radius: brushRadius,
          });
          break;
        case 'paradox_field':
          addObjectAt(hex.x, hex.y, 'paradox', {
            name: 'Champ de Paradoxe',
            severity: 'medium',
            drift_rate: 0.5,
          });
          break;
      }
    });
  };
  
  // Visualisation de la sélection
  const renderSelectionPreview = () => {
    if (!selection) return null;
    
    return (
      <div style={{
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 1000,
      }}>
        {selection.hexes.map(hex => (
          <div
            key={`${hex.x}-${hex.y}`}
            className="selection-preview"
            style={{
              position: 'absolute',
              left: hex.x * 60, // Ajuster selon votre grille
              top: hex.y * 52,
              width: 60,
              height: 52,
              background: 'rgba(102, 126, 234, 0.3)',
              border: '2px solid rgba(102, 126, 234, 0.8)',
            }}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div style={{
      position: 'fixed',
      left: 20,
      top: 100,
      width: 320,
      background: 'linear-gradient(135deg, rgba(20, 24, 36, 0.98) 0%, rgba(26, 31, 46, 0.95) 100%)',
      border: '1px solid var(--border-secondary)',
      borderRadius: 12,
      padding: 16,
      backdropFilter: 'blur(20px)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
      zIndex: 1300,
    }}>
      <h3 style={{ margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
        🎨 Outils Région
      </h3>
      
      {/* Mode de Sélection */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>
          Mode de Sélection
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <button
            onClick={() => setSelectionMode('rectangle')}
            className={selectionMode === 'rectangle' ? 'active' : ''}
            style={{
              padding: '8px',
              background: selectionMode === 'rectangle' 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 6,
              color: 'white',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            ⬜ Rectangle
          </button>
          
          <button
            onClick={() => setSelectionMode('circle')}
            className={selectionMode === 'circle' ? 'active' : ''}
            style={{
              padding: '8px',
              background: selectionMode === 'circle'
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 6,
              color: 'white',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            ⭕ Cercle
          </button>
          
          <button
            onClick={() => setSelectionMode('magic_wand')}
            className={selectionMode === 'magic_wand' ? 'active' : ''}
            style={{
              padding: '8px',
              background: selectionMode === 'magic_wand'
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 6,
              color: 'white',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            🪄 Baguette
          </button>
          
          <button
            onClick={() => setSelectionMode('lasso')}
            className={selectionMode === 'lasso' ? 'active' : ''}
            style={{
              padding: '8px',
              background: selectionMode === 'lasso'
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 6,
              color: 'white',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            🔗 Lasso
          </button>
        </div>
      </div>
      
      {/* Rayon de Brosse */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>
          Rayon: {brushRadius} hexagones
        </label>
        <input
          type="range"
          min={1}
          max={10}
          value={brushRadius}
          onChange={(e) => setBrushRadius(Number(e.target.value))}
          style={{
            width: '100%',
            height: 6,
            background: 'var(--bg-secondary)',
            borderRadius: 3,
            outline: 'none',
          }}
        />
      </div>
      
      {/* Outils Spéciaux V2 */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>
          Outils Temporels V2
        </label>
        
        {/* CF - Brouillard de Causalité */}
        <div style={{ marginBottom: 8 }}>
          <button
            onClick={() => setCurrentTool('cf_radius')}
            className={currentTool === 'cf_radius' ? 'active' : ''}
            style={{
              width: '100%',
              padding: '10px',
              background: currentTool === 'cf_radius'
                ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                : 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 6,
              color: 'white',
              cursor: 'pointer',
              fontSize: 12,
              marginBottom: 4,
            }}
          >
            🌫️ Brouillard de Causalité (CF)
          </button>
          {currentTool === 'cf_radius' && (
            <div style={{ padding: '8px', background: 'var(--bg-panel)', borderRadius: 4 }}>
              <label style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                Intensité CF: {cfIntensity}
              </label>
              <input
                type="range"
                min={1}
                max={10}
                value={cfIntensity}
                onChange={(e) => setCfIntensity(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          )}
        </div>
        
        {/* OPC - One Path Choice */}
        <div style={{ marginBottom: 8 }}>
          <button
            onClick={() => setCurrentTool('opc_zone')}
            className={currentTool === 'opc_zone' ? 'active' : ''}
            style={{
              width: '100%',
              padding: '10px',
              background: currentTool === 'opc_zone'
                ? 'linear-gradient(135deg, #667eea 0%, #48bb78 100%)'
                : 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 6,
              color: 'white',
              cursor: 'pointer',
              fontSize: 12,
              marginBottom: 4,
            }}
          >
            🔮 Zone OPC
          </button>
          {currentTool === 'opc_zone' && (
            <div style={{ padding: '8px', background: 'var(--bg-panel)', borderRadius: 4 }}>
              <label style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                Force OPC: {opcStrength}
              </label>
              <input
                type="range"
                min={1}
                max={10}
                value={opcStrength}
                onChange={(e) => setOpcStrength(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          )}
        </div>
        
        {/* Champ de Paradoxe */}
        <button
          onClick={() => setCurrentTool('paradox_field')}
          className={currentTool === 'paradox_field' ? 'active' : ''}
          style={{
            width: '100%',
            padding: '10px',
            background: currentTool === 'paradox_field'
              ? 'linear-gradient(135deg, #fc8181 0%, #f6ad55 100%)'
              : 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 6,
            color: 'white',
            cursor: 'pointer',
            fontSize: 12,
          }}
        >
          ⚡ Champ de Paradoxe
        </button>
      </div>
      
      {/* Actions Rapides */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>
          Actions Rapides
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <button
            onClick={() => {
              if (selection) {
                applyToRegion(selection, 'terrain_mystique');
              }
            }}
            disabled={!selection}
            style={{
              padding: '8px',
              background: 'linear-gradient(135deg, #9f7aea 0%, #ed64a6 100%)',
              border: 'none',
              borderRadius: 6,
              color: 'white',
              cursor: selection ? 'pointer' : 'not-allowed',
              opacity: selection ? 1 : 0.5,
              fontSize: 11,
            }}
          >
            ✨ Mystifier
          </button>
          
          <button
            onClick={() => {
              if (selection) {
                applyToRegion(selection, 'terrain_quantum');
              }
            }}
            disabled={!selection}
            style={{
              padding: '8px',
              background: 'linear-gradient(135deg, #38b2ac 0%, #4299e1 100%)',
              border: 'none',
              borderRadius: 6,
              color: 'white',
              cursor: selection ? 'pointer' : 'not-allowed',
              opacity: selection ? 1 : 0.5,
              fontSize: 11,
            }}
          >
            ⚡ Quantifier
          </button>
        </div>
      </div>
      
      {/* Info Sélection */}
      {selection && (
        <div style={{
          padding: 12,
          background: 'var(--bg-panel)',
          border: '1px solid var(--border-primary)',
          borderRadius: 8,
          fontSize: 11,
          color: 'var(--text-secondary)',
        }}>
          <div>📍 Sélection: {selection.hexes.length} hexagones</div>
          <div>📐 Centre: ({selection.center.x}, {selection.center.y})</div>
          <div>⭕ Rayon: {selection.radius.toFixed(1)}</div>
        </div>
      )}
      
      {/* Raccourcis */}
      <div style={{
        marginTop: 16,
        padding: 8,
        background: 'rgba(102, 126, 234, 0.1)',
        border: '1px solid rgba(102, 126, 234, 0.3)',
        borderRadius: 6,
        fontSize: 10,
        color: 'var(--text-muted)',
      }}>
        <div>🎮 Raccourcis:</div>
        <div>• Shift + Clic: Ajouter à la sélection</div>
        <div>• Ctrl + Clic: Soustraire</div>
        <div>• Alt + Scroll: Ajuster rayon</div>
        <div>• Espace: Appliquer l'outil</div>
      </div>
    </div>
  );
}
