/**
 * 🏗️ STRUCTURE EDITOR
 * Éditeur de terrain hexagonal (remplace world-editor)
 */

import React, { useRef, useEffect, useState } from 'react';
import { useUnifiedMapStore } from '../../../shared/store/unifiedMapStore';

export function StructureEditor(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    currentWorld,
    selectedHex,
    brushTerrain,
    brushSize,
    showGrid,
    showRegions,
    zoomLevel,
    viewOffset,
    paintTerrain,
    setTool,
  } = useUnifiedMapStore();

  const [isDrawing, setIsDrawing] = useState(false);

  // Taille des hexagones
  const HEX_SIZE = 30 * zoomLevel;
  const HEX_WIDTH = Math.sqrt(3) * HEX_SIZE;
  const HEX_HEIGHT = 2 * HEX_SIZE;

  // Couleurs par type de terrain
  const TERRAIN_COLORS: Record<string, string> = {
    grass: '#4ade80',
    forest: '#16a34a',
    mountain: '#a8a29e',
    water: '#3b82f6',
    desert: '#fbbf24',
    snow: '#e0e7ff',
    lava: '#ef4444',
    void: '#1e1b4b',
  };

  // Convertir coordonnées pixel en hex
  const pixelToHex = (x: number, y: number) => {
    const adjustedX = (x - viewOffset.x) / zoomLevel;
    const adjustedY = (y - viewOffset.y) / zoomLevel;
    
    const q = (adjustedX * Math.sqrt(3) / 3 - adjustedY / 3) / HEX_SIZE;
    const r = (adjustedY * 2 / 3) / HEX_SIZE;
    
    return {
      q: Math.round(q),
      r: Math.round(r),
    };
  };

  // Convertir coordonnées hex en pixel
  const hexToPixel = (q: number, r: number) => {
    const x = HEX_SIZE * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
    const y = HEX_SIZE * (3 / 2 * r);
    
    return {
      x: x * zoomLevel + viewOffset.x,
      y: y * zoomLevel + viewOffset.y,
    };
  };

  // Dessiner un hexagone
  const drawHex = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, color: string, highlight = false) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const x = centerX + HEX_SIZE * Math.cos(angle);
      const y = centerY + HEX_SIZE * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    
    // Remplissage
    ctx.fillStyle = color;
    ctx.fill();
    
    // Bordure
    if (showGrid) {
      ctx.strokeStyle = highlight ? '#fbbf24' : 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = highlight ? 2 : 1;
      ctx.stroke();
    }
  };

  // Rendu du canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !currentWorld) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background
    ctx.fillStyle = '#0a0e1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Dessiner tous les hexagones
    currentWorld.hexagons.forEach(hex => {
      const pixel = hexToPixel(hex.position.q, hex.position.r);
      const color = TERRAIN_COLORS[hex.type] || '#4ade80';
      const isSelected = selectedHex?.q === hex.position.q && selectedHex?.r === hex.position.r;
      
      drawHex(ctx, pixel.x, pixel.y, color, isSelected);
    });
    
    // Dessiner les régions si activées
    if (showRegions) {
      currentWorld.regions.forEach(region => {
        ctx.strokeStyle = region.color;
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.5;
        
        region.hexes.forEach(hex => {
          const pixel = hexToPixel(hex.q, hex.r);
          drawHex(ctx, pixel.x, pixel.y, 'transparent', false);
        });
        
        ctx.globalAlpha = 1;
      });
    }
  }, [currentWorld, selectedHex, showGrid, showRegions, zoomLevel, viewOffset]);

  // Gestion des events souris
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    handleMouseMove(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const hex = pixelToHex(x, y);
    
    paintTerrain(hex.q, hex.r);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const hex = pixelToHex(x, y);
    
    paintTerrain(hex.q, hex.r);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight - 200}
        style={{
          cursor: 'crosshair',
          display: 'block',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
      />
      
      {/* Info overlay */}
      <div style={{
        position: 'absolute',
        top: 20,
        right: 20,
        background: 'rgba(0, 0, 0, 0.8)',
        padding: 15,
        borderRadius: 10,
        border: '1px solid rgba(102, 126, 234, 0.5)',
      }}>
        <h3 style={{ margin: 0, marginBottom: 10, fontSize: 16 }}>
          🏗️ Mode Structure
        </h3>
        <div style={{ fontSize: 12, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div>Terrain: {brushTerrain}</div>
          <div>Taille: {brushSize}</div>
          <div>World: {currentWorld?.name}</div>
          <div>Dimensions: {currentWorld?.dimensions.width} x {currentWorld?.dimensions.height}</div>
        </div>
      </div>
    </div>
  );
}
