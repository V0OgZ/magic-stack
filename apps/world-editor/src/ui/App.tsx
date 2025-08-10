import React from 'react';
import { MapView } from './MapView';
import { TimelineView } from './TimelineView';
import { ParamsView } from './ParamsView';
import { Clippy } from '../lib/clippy';
import './theme.css';

export function App(): React.ReactElement {
  const [tab, setTab] = React.useState<'map' | 'timeline' | 'params'>('map');

  return (
    <div style={{ height: '100vh', display: 'grid', gridTemplateRows: '60px 1fr 60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, background: 'rgba(0,0,0,0.65)', color: '#e8ecff', borderBottom: '2px solid #2a5298' }}>
        <div>🌍 World Editor</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setTab('map')}>Map</button>
          <button onClick={() => setTab('timeline')}>Timeline</button>
          <button onClick={() => setTab('params')}>Paramètres</button>
        </div>
      </div>

      <div>
        {tab === 'map' && <MapView />}
        {tab === 'timeline' && <TimelineView />}
        {tab === 'params' && <ParamsView />}
      </div>

      <div style={{ background: 'rgba(0,0,0,0.65)', borderTop: '1px solid #233266' }} />
      <Clippy />
    </div>
  );
}


