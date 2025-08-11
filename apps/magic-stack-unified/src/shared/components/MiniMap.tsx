/**
 * 🗺️ Mini-Map Component
 * Composant exportable pour vue d'ensemble
 */

import React, { useRef, useEffect, useCallback } from 'react';

interface MiniMapProps {
  // Dimensions
  mapWidth: number;
  mapHeight: number;
  miniMapWidth?: number;
  miniMapHeight?: number;
  
  // Données
  entities?: Array<{
    x: number;
    y: number;
    color?: string;
    icon?: string;
    size?: number;
  }>;
  
  // Viewport
  viewportX: number;
  viewportY: number;
  viewportWidth: number;
  viewportHeight: number;
  
  // Callbacks
  onViewportChange?: (x: number, y: number) => void;
  
  // Style
  style?: React.CSSProperties;
  backgroundColor?: string;
  borderColor?: string;
  viewportColor?: string;
  entityColor?: string;
}

export function MiniMap({
  mapWidth,
  mapHeight,
  miniMapWidth = 200,
  miniMapHeight = 150,
  entities = [],
  viewportX,
  viewportY,
  viewportWidth,
  viewportHeight,
  onViewportChange,
  style,
  backgroundColor = '#1a1a2e',
  borderColor = '#667eea',
  viewportColor = 'rgba(102, 126, 234, 0.3)',
  entityColor = '#ffffff',
}: MiniMapProps): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef(false);
  
  // Ratio de conversion
  const scaleX = miniMapWidth / mapWidth;
  const scaleY = miniMapHeight / mapHeight;
  
  // Dessiner la mini-map
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, miniMapWidth, miniMapHeight);
    
    // Dessiner les entités
    entities.forEach(entity => {
      const x = entity.x * scaleX;
      const y = entity.y * scaleY;
      const size = (entity.size || 2) * Math.min(scaleX, scaleY);
      
      if (entity.icon) {
        // Si emoji/icône
        ctx.font = `${size * 2}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(entity.icon, x, y);
      } else {
        // Point simple
        ctx.fillStyle = entity.color || entityColor;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    // Dessiner le viewport
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(
      viewportX * scaleX,
      viewportY * scaleY,
      viewportWidth * scaleX,
      viewportHeight * scaleY
    );
    
    // Remplir le viewport (semi-transparent)
    ctx.fillStyle = viewportColor;
    ctx.fillRect(
      viewportX * scaleX,
      viewportY * scaleY,
      viewportWidth * scaleX,
      viewportHeight * scaleY
    );
    
    // Bordure de la mini-map
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, miniMapWidth, miniMapHeight);
  }, [
    entities,
    viewportX,
    viewportY,
    viewportWidth,
    viewportHeight,
    scaleX,
    scaleY,
    miniMapWidth,
    miniMapHeight,
    backgroundColor,
    borderColor,
    viewportColor,
    entityColor,
  ]);
  
  // Redessiner quand les props changent
  useEffect(() => {
    draw();
  }, [draw]);
  
  // Gestion du clic pour déplacer le viewport
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onViewportChange) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convertir en coordonnées de map
    const mapX = (x / scaleX) - (viewportWidth / 2);
    const mapY = (y / scaleY) - (viewportHeight / 2);
    
    // Clamp aux limites
    const clampedX = Math.max(0, Math.min(mapWidth - viewportWidth, mapX));
    const clampedY = Math.max(0, Math.min(mapHeight - viewportHeight, mapY));
    
    onViewportChange(clampedX, clampedY);
    isDragging.current = true;
  }, [onViewportChange, scaleX, scaleY, viewportWidth, viewportHeight, mapWidth, mapHeight]);
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current || !onViewportChange) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const mapX = (x / scaleX) - (viewportWidth / 2);
    const mapY = (y / scaleY) - (viewportHeight / 2);
    
    const clampedX = Math.max(0, Math.min(mapWidth - viewportWidth, mapX));
    const clampedY = Math.max(0, Math.min(mapHeight - viewportHeight, mapY));
    
    onViewportChange(clampedX, clampedY);
  }, [onViewportChange, scaleX, scaleY, viewportWidth, viewportHeight, mapWidth, mapHeight]);
  
  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);
  
  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        border: `2px solid ${borderColor}`,
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        cursor: onViewportChange ? 'grab' : 'default',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        width={miniMapWidth}
        height={miniMapHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          display: 'block',
          cursor: isDragging.current ? 'grabbing' : 'grab',
        }}
      />
      
      {/* Label optionnel */}
      <div style={{
        position: 'absolute',
        bottom: 5,
        left: 5,
        fontSize: 10,
        color: 'rgba(255,255,255,0.5)',
        pointerEvents: 'none',
      }}>
        {Math.round(viewportX)},{Math.round(viewportY)}
      </div>
    </div>
  );
}
