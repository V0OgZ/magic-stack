import React from 'react';
import { HexGrid } from './HexGrid';
import { useEditorStore } from '../state/useEditorStore';

export function MapView(): React.ReactElement {
  const sel = useEditorStore((s) => s.selected);
  const setSelected = useEditorStore((s) => s.setSelected);
  const addObjectAt = useEditorStore((s) => s.addObjectAt);
  const addJour30Event = useEditorStore((s) => s.addJour30Event);
  const brushTerrain = useEditorStore((s) => s.brushTerrain);
  const brushSize = useEditorStore((s) => s.brushSize);
  const setBrushTerrain = useEditorStore((s) => s.setBrushTerrain);
  const setBrushSize = useEditorStore((s) => s.setBrushSize);
  const paintAt = useEditorStore((s) => s.paintAt);

  const [hover, setHover] = React.useState<{ x: number; y: number } | null>(null);

  return (
    <div style={{ position: 'relative' }}>
      <HexGrid
        cols={20}
        rows={20}
        size={30}
        onSelect={(x, y) => {
          setSelected(x, y);
          paintAt(x, y);
        }}
        onHover={(x, y) => setHover({ x, y })}
        onHoverEnd={() => setHover(null)}
      />
      <div className="panel" style={{ position: 'absolute', left: 12, top: 12 }}>
        {hover ? `Survol: ${hover.x},${hover.y}` : sel ? `Sélection: ${sel.x},${sel.y}` : 'Sélectionne une case'}
      </div>
      <div className="toolbar">
        <span className="panel" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <label style={{ fontWeight: 600 }}>🎨 Terrain:</label>
          <select 
            className="terrain-selector" 
            value={brushTerrain} 
            onChange={(e) => setBrushTerrain(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '6px', background: '#1a1d3a', color: '#fff', border: '1px solid #3a3f6a' }}
          >
            <option value="grass">🌱 Herbe</option>
            <option value="forest">🌲 Forêt</option>
            <option value="mountain">⛰️ Montagne</option>
            <option value="water">💧 Eau</option>
            <option value="mystique">✨ Mystique</option>
            <option value="quantum">⚡ Quantum</option>
            <option value="nexus">🌀 Nexus</option>
          </select>
          
          <label style={{ fontWeight: 600, marginLeft: 12 }}>📏 Taille:</label>
          <select 
            value={brushSize} 
            onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
            style={{ padding: '6px 10px', borderRadius: '6px', background: '#1a1d3a', color: '#fff', border: '1px solid #3a3f6a' }}
          >
            <option value={1}>Petit (1)</option>
            <option value={3}>Moyen (3)</option>
            <option value={5}>Large (5)</option>
          </select>
          
          <button 
            className="btn btn-primary" 
            onClick={() => sel && addObjectAt(sel.x, sel.y, 'poi', { name: 'Point d\'intérêt' })}
            disabled={!sel}
            style={{ marginLeft: 'auto' }}
          >
            📍 Ajouter POI
          </button>
        </span>
      </div>
    </div>
  );
}


