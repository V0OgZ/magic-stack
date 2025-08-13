/**
 * 🎯 HexGrid Component - Composant réutilisable pour grille hexagonale
 * Utilisable dans Game, Editor, Chasse Temporelle
 */

import React from 'react';

export interface Hex {
  x: number;
  y: number;
  terrain?: string;
  entity?: any;
  fog?: 'total' | 'partial' | 'clear';
  overlay?: string;
}

export interface HexGridProps {
  width: number;
  height: number;
  hexSize?: number;
  hexes?: Map<string, Hex>;
  selectedHex?: { x: number; y: number } | null;
  onHexClick?: (x: number, y: number) => void;
  onHexHover?: (x: number, y: number) => void;
  onHexRightClick?: (x: number, y: number) => void;
  showCoordinates?: boolean;
  showGrid?: boolean;
  enableDrag?: boolean;
  viewport?: { x: number; y: number; zoom: number };
}

export function HexGrid({
  width,
  height,
  hexSize = 60,
  hexes = new Map<string, Hex>(),
  selectedHex,
  onHexClick,
  onHexHover,
  onHexRightClick,
  showCoordinates = false,
  showGrid = true,
  enableDrag = false,
  viewport = { x: 0, y: 0, zoom: 1 }
}: HexGridProps): React.ReactElement {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [viewOffset, setViewOffset] = React.useState(viewport);
  
  // Calcul des dimensions hexagonales
  const hexWidth = hexSize * 2;
  const hexHeight = Math.sqrt(3) * hexSize;
  const vertDist = hexHeight * 0.75;
  const horizDist = hexWidth * 0.75;
  
  // Conversion coordonnées hex → pixel
  const hexToPixel = (x: number, y: number) => {
    const offsetY = x % 2 === 1 ? hexHeight / 2 : 0;
    return {
      x: x * horizDist,
      y: y * vertDist + offsetY
    };
  };
  
  // Conversion pixel → hex (pour les clics)
  const pixelToHex = (pixelX: number, pixelY: number) => {
    const x = Math.round(pixelX / horizDist);
    const offsetY = x % 2 === 1 ? hexHeight / 2 : 0;
    const y = Math.round((pixelY - offsetY) / vertDist);
    return { x, y };
  };
  
  // Gestion du drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!enableDrag) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - viewOffset.x, y: e.clientY - viewOffset.y });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !enableDrag) return;
    setViewOffset({
      ...viewOffset,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Gestion du zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (!enableDrag) return;
    e.preventDefault();
    const newZoom = Math.max(0.5, Math.min(2, viewOffset.zoom + e.deltaY * -0.001));
    setViewOffset({ ...viewOffset, zoom: newZoom });
  };
  
  // Style du terrain
  const getTerrainStyle = (terrain?: string) => {
    const terrainStyles: Record<string, React.CSSProperties> = {
      grass: { background: 'linear-gradient(135deg, #2d5016, #4a8025)' },
      forest: { background: 'linear-gradient(135deg, #1a3a1a, #2a5a2a)' },
      mountain: { background: 'linear-gradient(135deg, #5a5a5a, #8a8a8a)' },
      water: { background: 'linear-gradient(135deg, #1e3a5f, #2e5a8f)' },
      mystique: { background: 'linear-gradient(135deg, #4a1a5a, #6a3a7a)' },
      quantum: { background: 'linear-gradient(135deg, #1a3a4a, #3a5a6a)' },
      nexus: { 
        background: 'radial-gradient(circle, #ff00ff, #00ffff)',
        animation: 'pulse 2s infinite'
      }
    };
    return terrainStyles[terrain || 'grass'] || terrainStyles.grass;
  };
  
  // Style du brouillard
  const getFogStyle = (fog?: string): React.CSSProperties => {
    switch (fog) {
      case 'total':
        return { 
          background: '#000',
          opacity: 0.9
        };
      case 'partial':
        return {
          opacity: 0.5,
          filter: 'blur(2px)'
        };
      default:
        return {};
    }
  };
  
  // Rendu d'un hexagone
  const renderHex = (hex: Hex) => {
    const pos = hexToPixel(hex.x, hex.y);
    const isSelected = selectedHex?.x === hex.x && selectedHex?.y === hex.y;
    const key = `${hex.x},${hex.y}`;
    
    return (
      <div
        key={key}
        className={`hex-cell ${isSelected ? 'hex-selected' : ''}`}
        onClick={() => onHexClick?.(hex.x, hex.y)}
        onMouseEnter={() => onHexHover?.(hex.x, hex.y)}
        onContextMenu={(e) => {
          e.preventDefault();
          onHexRightClick?.(hex.x, hex.y);
        }}
        style={{
          position: 'absolute',
          left: pos.x,
          top: pos.y,
          width: hexWidth,
          height: hexHeight,
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
          ...getTerrainStyle(hex.terrain),
          ...getFogStyle(hex.fog),
          border: isSelected ? '3px solid #ffd700' : showGrid ? '1px solid rgba(255,255,255,0.1)' : 'none',
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Coordonnées */}
        {showCoordinates && (
          <span style={{
            fontSize: 10,
            color: 'rgba(255,255,255,0.5)',
            userSelect: 'none',
          }}>
            {hex.x},{hex.y}
          </span>
        )}
        
        {/* Entité */}
        {hex.entity && (
          <div style={{
            fontSize: 24,
            filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.8))',
          }}>
            {hex.entity.icon || '👤'}
          </div>
        )}
        
        {/* Overlay (CF, OPC, etc) */}
        {hex.overlay && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: hex.overlay,
            opacity: 0.3,
            pointerEvents: 'none',
          }} />
        )}
      </div>
    );
  };
  
  // Génération de tous les hexagones
  const hexElements: React.ReactElement[] = [];
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const key = `${x},${y}`;
      const hex = hexes.get(key) || { x, y };
      hexElements.push(renderHex(hex));
    }
  }
  
  return (
    <div
      className="hex-grid-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : enableDrag ? 'grab' : 'default',
        background: '#0a0e1a',
      }}
    >
      <div
        className="hex-grid-viewport"
        style={{
          position: 'absolute',
          transform: `translate(${viewOffset.x}px, ${viewOffset.y}px) scale(${viewOffset.zoom})`,
          transformOrigin: 'top left',
        }}
      >
        <div className="hex-grid" style={{ position: 'relative' }}>
          {hexElements}
        </div>
      </div>
      
      {/* Mini-map (optionnel) */}
      {enableDrag && (
        <div style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 150,
          height: 100,
          background: 'rgba(0,0,0,0.8)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 4,
          padding: 4,
        }}>
          <div style={{
            fontSize: 10,
            color: 'rgba(255,255,255,0.5)',
            marginBottom: 2,
          }}>
            Mini-map
          </div>
          <div style={{
            width: '100%',
            height: 'calc(100% - 15px)',
            background: 'rgba(255,255,255,0.1)',
            position: 'relative',
          }}>
            {/* Viewport indicator */}
            <div style={{
              position: 'absolute',
              left: `${(viewOffset.x / (width * horizDist)) * 100}%`,
              top: `${(viewOffset.y / (height * vertDist)) * 100}%`,
              width: `${(100 / viewOffset.zoom)}%`,
              height: `${(100 / viewOffset.zoom)}%`,
              border: '1px solid #ffd700',
              background: 'rgba(255,215,0,0.1)',
            }} />
          </div>
        </div>
      )}
    </div>
  );
}

// CSS pour animations
if (typeof document !== 'undefined' && !document.getElementById('hex-grid-styles')) {
  const style = document.createElement('style');
  style.id = 'hex-grid-styles';
  style.textContent = `
    @keyframes pulse {
      0%, 100% { opacity: 0.8; }
      50% { opacity: 1; }
    }
    
    .hex-cell:hover {
      transform: translateY(-2px);
      filter: brightness(1.2);
    }
    
    .hex-selected {
      animation: pulse 1s infinite;
      z-index: 10;
    }
  `;
  document.head.appendChild(style);
}
