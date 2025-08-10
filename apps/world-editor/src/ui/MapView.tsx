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

  return (
    <div style={{ position: 'relative' }}>
      <HexGrid cols={20} rows={20} size={30} onSelect={(x, y) => { setSelected(x, y); paintAt(x, y); }} />
      <div className="panel" style={{ position: 'absolute', left: 12, top: 12 }}>
        {sel ? `Sélection: ${sel.x},${sel.y}` : 'Sélectionne une case'}
      </div>
      <div className="toolbar">
        <button className="btn" onClick={() => sel && addObjectAt(sel.x, sel.y, 'poi', { name: 'Point d\'intérêt' })}>+ POI</button>
        <button className="btn" onClick={() => addJour30Event()}>+ Jour 30</button>
        <span className="panel" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          Terrain:
          <select value={brushTerrain} onChange={(e) => setBrushTerrain(e.target.value)}>
            <option value="grass">Herbe</option>
            <option value="forest">Forêt</option>
            <option value="mountain">Montagne</option>
            <option value="water">Eau</option>
            <option value="mystique">Mystique</option>
            <option value="quantum">Quantum</option>
            <option value="nexus">Nexus</option>
          </select>
          Taille:
          <select value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}>
            <option value={1}>1</option>
            <option value={3}>3</option>
            <option value={5}>5</option>
          </select>
        </span>
      </div>
    </div>
  );
}


