/**
 * 🎨 TOOL PALETTE
 * Palette d'outils contextuelle selon le mode
 */

import React from 'react';
import { useUnifiedMapStore } from '../../../shared/store/unifiedMapStore';
import type { EditorMode, Tool } from '../../../shared/store/unifiedMapStore';

interface Props {
  mode: EditorMode;
}

export function ToolPalette({ mode }: Props): React.ReactElement {
  const {
    tool,
    setTool,
    brushTerrain,
    setBrushTerrain,
    brushSize,
    setBrushSize,
    selectedIcon,
  } = useUnifiedMapStore();

  // Outils disponibles selon le mode
  const getTools = (): { tool: Tool; icon: string; label: string }[] => {
    switch (mode) {
      case 'structure':
        return [
          { tool: 'paint', icon: '🖌️', label: 'Peindre' },
          { tool: 'select', icon: '👆', label: 'Sélectionner' },
          { tool: 'region', icon: '🗺️', label: 'Régions' },
        ];
      case 'resources':
        return [
          { tool: 'place', icon: '📍', label: 'Placer' },
          { tool: 'select', icon: '👆', label: 'Sélectionner' },
          { tool: 'connect', icon: '🔗', label: 'Connecter' },
          { tool: 'delete', icon: '🗑️', label: 'Supprimer' },
        ];
      case 'timeline':
        return [
          { tool: 'select', icon: '👆', label: 'Sélectionner' },
          { tool: 'place', icon: '⏰', label: 'Événement' },
        ];
      default:
        return [];
    }
  };

  // Terrains disponibles
  const terrains = [
    { type: 'grass', color: '#4ade80', label: 'Herbe' },
    { type: 'forest', color: '#16a34a', label: 'Forêt' },
    { type: 'mountain', color: '#a8a29e', label: 'Montagne' },
    { type: 'water', color: '#3b82f6', label: 'Eau' },
    { type: 'desert', color: '#fbbf24', label: 'Désert' },
    { type: 'snow', color: '#e0e7ff', label: 'Neige' },
    { type: 'lava', color: '#ef4444', label: 'Lave' },
    { type: 'void', color: '#1e1b4b', label: 'Vide' },
  ];

  return (
    <div style={{
      width: 280,
      background: 'linear-gradient(180deg, #1a1a2e, #16213e)',
      padding: 20,
      borderRight: '2px solid rgba(102, 126, 234, 0.3)',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    }}>
      <h3 style={{
        margin: 0,
        fontSize: 18,
        background: 'linear-gradient(45deg, #667eea, #764ba2)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        🎨 Outils
      </h3>
      
      {/* Sélecteur d'outils */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {getTools().map(({ tool: t, icon, label }) => (
          <button
            key={t}
            onClick={() => setTool(t)}
            title={label}
            style={{
              width: 60,
              height: 60,
              background: tool === t
                ? 'linear-gradient(135deg, #667eea, #764ba2)'
                : 'rgba(255, 255, 255, 0.1)',
              border: tool === t
                ? '2px solid #667eea'
                : '2px solid transparent',
              borderRadius: 10,
              color: 'white',
              cursor: 'pointer',
              fontSize: 24,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              transition: 'all 0.2s',
            }}
          >
            {icon}
            <span style={{ fontSize: 9 }}>{label}</span>
          </button>
        ))}
      </div>
      
      {/* Options pour le mode Structure */}
      {mode === 'structure' && (
        <>
          <div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: 14 }}>Terrain</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {terrains.map(({ type, color, label }) => (
                <button
                  key={type}
                  onClick={() => setBrushTerrain(type as any)}
                  title={label}
                  style={{
                    width: 50,
                    height: 50,
                    background: color,
                    border: brushTerrain === type
                      ? '3px solid white'
                      : '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: 8,
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  {brushTerrain === type && (
                    <div style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      background: 'white',
                      borderRadius: '50%',
                      width: 20,
                      height: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                    }}>
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: 14 }}>Taille du pinceau: {brushSize}</h4>
            <input
              type="range"
              min="1"
              max="9"
              step="2"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: '#667eea',
              }}
            />
          </div>
        </>
      )}
      
      {/* Options pour le mode Resources */}
      {mode === 'resources' && selectedIcon && (
        <div style={{
          padding: 10,
          background: 'rgba(102, 126, 234, 0.1)',
          borderRadius: 10,
          border: '1px solid rgba(102, 126, 234, 0.3)',
        }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: 14 }}>Icône sélectionnée</h4>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <div style={{
              fontSize: 32,
              width: 50,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 8,
            }}>
              {selectedIcon.emoji}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 'bold' }}>{selectedIcon.name}</div>
              <div style={{ fontSize: 10, color: 'rgba(255, 255, 255, 0.7)' }}>{selectedIcon.category}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
