import React from 'react';
import { HexGrid } from './HexGrid';
import { useEditorStore } from '../state/useEditorStore';

export function MapView(): React.ReactElement {
  const sel = useEditorStore((s) => s.selected);
  const setSelected = useEditorStore((s) => s.setSelected);
  const addObjectAt = useEditorStore((s) => s.addObjectAt);
  const addJour30Event = useEditorStore((s) => s.addJour30Event);

  return (
    <div style={{ position: 'relative' }}>
      <HexGrid cols={20} rows={20} size={30} onSelect={(x, y) => setSelected(x, y)} />
      <div style={{ position: 'absolute', left: 12, top: 12, background: 'rgba(0,0,0,0.6)', padding: '6px 10px', borderRadius: 8, color: '#e8ecff' }}>
        {sel ? `Sélection: ${sel.x},${sel.y}` : 'Sélectionne une case'}
      </div>
      <div style={{ position: 'absolute', left: 12, bottom: 12, display: 'flex', gap: 8 }}>
        <button onClick={() => sel && addObjectAt(sel.x, sel.y, 'poi', { name: 'Point d\'intérêt' })}>+ POI</button>
        <button onClick={() => addJour30Event()}>+ Event Jour 30</button>
      </div>
    </div>
  );
}


