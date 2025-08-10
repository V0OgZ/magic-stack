import React from 'react';
import { HexGrid } from './HexGrid';

export function MapView(): React.ReactElement {
  const [sel, setSel] = React.useState<{ x: number; y: number } | null>(null);

  return (
    <div style={{ position: 'relative' }}>
      <HexGrid cols={20} rows={20} size={30} onSelect={(x, y) => setSel({ x, y })} />
      <div style={{ position: 'absolute', left: 12, top: 12, background: 'rgba(0,0,0,0.6)', padding: '6px 10px', borderRadius: 8, color: '#e8ecff' }}>
        {sel ? `Sélection: ${sel.x},${sel.y}` : 'Sélectionne une case'}
      </div>
    </div>
  );
}


