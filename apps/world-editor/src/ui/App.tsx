import React from 'react';
import { MapView } from './MapView';
import { TimelineView } from './TimelineView';
import { ParamsView } from './ParamsView';
import { VectorSearchPanel } from './VectorSearchPanel';
import { LivePreviewPanel } from './LivePreviewPanel';
import { RegionTools } from './RegionTools';
import { CollectiveConsciousnessPanel } from '../lib/quantum-identity';
import { Clippy } from '../lib/clippy';
import './theme.css';

export function App(): React.ReactElement {
  const [tab, setTab] = React.useState<'map' | 'timeline' | 'params'>('map');
  const [showRegionTools, setShowRegionTools] = React.useState(false);
  const [showQuantumPanel, setShowQuantumPanel] = React.useState(false);

  return (
    <div style={{ height: '100vh', display: 'grid', gridTemplateRows: '60px 1fr 60px', background: 'var(--bg-primary)', overflow: 'hidden' }}>
      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '12px 24px', 
        background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-panel) 100%)', 
        color: 'var(--text-primary)', 
        borderBottom: '1px solid var(--border-primary)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
      }}>
        <div style={{ fontSize: 18, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 24 }}>🗺️</span>
          <span>Éditeur Universel Avalon</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 8 }}>v2.0</span>
        </div>
        <nav style={{ display: 'flex', gap: 4, background: 'var(--bg-secondary)', padding: 4, borderRadius: 8 }}>
          <button 
            className={`tab ${tab === 'map' ? 'active' : ''}`}
            onClick={() => setTab('map')}
          >
            🗺️ Carte
          </button>
          <button 
            className={`tab ${tab === 'timeline' ? 'active' : ''}`}
            onClick={() => setTab('timeline')}
          >
            ⏳ Timeline
          </button>
          <button 
            className={`tab ${tab === 'params' ? 'active' : ''}`}
            onClick={() => setTab('params')}
          >
            ⚙️ Paramètres
          </button>
        </nav>
      </header>

      <main style={{ position: 'relative', overflow: 'hidden' }}>
        {tab === 'map' && <MapView />}
        {tab === 'timeline' && <TimelineView />}
        {tab === 'params' && <ParamsView />}
      </main>

      <footer className="status-bar">
        <span>🔮 Équipe PROFONDEUR</span>
        <span>•</span>
        <span>Backends: Rust 3001 | Java 8080 | Vector 5001</span>
        <span>•</span>
        <span>Mode: {tab}</span>
      </footer>
      
      <VectorSearchPanel />
      <LivePreviewPanel />
      {showRegionTools && <RegionTools />}
      {showQuantumPanel && <CollectiveConsciousnessPanel />}
      <Clippy />
      
      {/* Floating Action Buttons */}
      <div style={{
        position: 'fixed',
        left: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        zIndex: 1000,
      }}>
        <button
          onClick={() => setShowRegionTools(!showRegionTools)}
          title="Outils Région"
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: showRegionTools 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'rgba(102, 126, 234, 0.2)',
            border: '1px solid rgba(102, 126, 234, 0.5)',
            color: 'white',
            cursor: 'pointer',
            fontSize: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          🎨
        </button>
        
        <button
          onClick={() => setShowQuantumPanel(!showQuantumPanel)}
          title="Conscience Quantique"
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: showQuantumPanel
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'rgba(102, 126, 234, 0.2)',
            border: '1px solid rgba(102, 126, 234, 0.5)',
            color: 'white',
            cursor: 'pointer',
            fontSize: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          🌌
        </button>
      </div>
    </div>
  );
}


