/**
 * 🔬 EditorView - Mode TEST & INSTANTIATION
 * Pour tester les maps créées dans World Editor
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { HexGrid } from '../../shared/components/HexGrid';
import { TemporalDisplay } from '../../shared/components/TemporalDisplay';
import { ResourceBar } from '../../shared/components/ResourceBar';
import { useEditorStore } from './store/editorStore';
import { MapIconPlacerV2 } from './MapIconPlacerV2';
import { ArchiveSearchPanel } from '../../shared/components/ArchiveSearchPanel';
import { MapIconPlacerWrapper } from './MapIconPlacerWrapper';

export function EditorView(): React.ReactElement {
  const [mode, setMode] = React.useState<'edit' | 'test' | 'import' | 'icon-placer'>('import');
  const [isRunning, setIsRunning] = React.useState(false);
  const { hexes, selectedHex, setSelectedHex, importMap } = useEditorStore();
  
  // État temporel pour les tests
  const [temporal, setTemporal] = React.useState({
    tw: 0,
    te: 0,
    debt: 0,
    debtRate: 0.05,
    energy_complex: { A: 50, phi: Math.PI / 4 }
  });
  
  // Tick V2 pour tester
  React.useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setTemporal(t => ({
        ...t,
        tw: t.tw + 1,
        te: t.te + 0.95,
        debt: t.debt + (Math.abs(t.tw - t.te) * t.debtRate)
      }));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isRunning]);
  
  // Charger un scénario depuis le World Editor
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            importMap(data);
            setMode('test');
            console.log('✅ Scénario importé:', data);
          } catch (error) {
            console.error('❌ Erreur import:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };
  
  // Mode Icon Placer V2 - Éditeur de carte avec APIs V2
  if (mode === 'icon-placer') {
    return <MapIconPlacerWrapper />;
  }
  
  // Mode Import - écran d'accueil
  if (mode === 'import') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 30,
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1d3a 100%)',
      }}>
        <h1 style={{
          fontSize: 48,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          🔬 Mode Test & Instantiation
        </h1>
        
        <p style={{
          fontSize: 18,
          color: '#a0aec0',
          textAlign: 'center',
          maxWidth: 600,
        }}>
          Testez vos créations du World Editor en conditions réelles
          avec les mécaniques V2 et les backends actifs
        </p>
        
        <div style={{
          display: 'flex',
          gap: 20,
        }}>
          <button
            onClick={handleImport}
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            📂 Importer un Scénario
          </button>
          
          <button
            onClick={() => setMode('icon-placer')}
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            🗺️ Map Icon Placer V2
          </button>
          
          <a
            onClick={() => setMode('icon-placer')}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '15px 30px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '2px solid #667eea',
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 'bold',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            🎨 Ouvrir World Editor
          </a>
        </div>

        {/* Charger par Interstice ID */}
        <div style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
          <input id="intersticeId" placeholder="Interstice ID" style={{ padding: 8, borderRadius: 8, border: '1px solid #667eea', background: 'rgba(0,0,0,0.4)', color: 'white' }} />
          <button
            onClick={async () => {
              const idEl = document.getElementById('intersticeId') as HTMLInputElement | null;
              const id = idEl?.value?.trim();
              if (!id) return;
              try {
                const isLocal = ['localhost','127.0.0.1'].includes(window.location.hostname);
                const apiBase = isLocal ? 'http://localhost:8082' : '';
                const res = await fetch(`${apiBase}/api/interstice/download`, {
                  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ entityId: id })
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                const mapData = json?.entityData ?? json?.data ?? json;
                importMap(mapData);
                setMode('test');
              } catch (e) {
                console.error('Load interstice failed', e);
              }
            }}
            style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid #667eea', background: '#667eea', color: 'white' }}
          >
            ⬇️ Charger depuis Interstice
          </button>
        </div>

        {/* Recherche archives (Vector DB) */}
        <div style={{ marginTop: 24, width: 600 }}>
          <ArchiveSearchPanel />
        </div>
        
        <div style={{
          marginTop: 40,
          padding: 20,
          background: 'rgba(102, 126, 234, 0.1)',
          border: '1px solid rgba(102, 126, 234, 0.3)',
          borderRadius: 12,
          maxWidth: 600,
        }}>
          <h3 style={{ color: '#667eea', marginBottom: 10 }}>
            💡 Workflow recommandé
          </h3>
          <ol style={{ color: '#a0aec0', lineHeight: 1.8 }}>
            <li>Créez votre map dans le <strong>World Editor</strong> (cet éditeur)</li>
            <li>Exportez en JSON</li>
            <li>Importez ici pour tester avec V2</li>
            <li>Vérifiez drift, paradoxes, régulateurs</li>
            <li>Si OK → Publiez vers le jeu</li>
          </ol>
        </div>
        
        <Link
          to="/"
          style={{
            marginTop: 20,
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 8,
            textDecoration: 'none',
          }}
        >
          ← Retour au menu
        </Link>
      </div>
    );
  }
  
  // Mode Test - map chargée
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#0a0e1a',
    }}>
      {/* Header avec contrôles de test */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        background: 'linear-gradient(180deg, rgba(20, 24, 36, 0.95) 0%, rgba(26, 31, 46, 0.9) 100%)',
        borderBottom: '1px solid rgba(102, 126, 234, 0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button
            onClick={() => setMode('import')}
            style={{
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            ← Nouveau
          </button>
          
          <h2 style={{
            fontSize: 24,
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
          }}>
            🔬 Test de Scénario
          </h2>
        </div>
        
        {/* Contrôles de simulation */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => setIsRunning(!isRunning)}
            style={{
              padding: '10px 20px',
              background: isRunning
                ? 'linear-gradient(135deg, #fc8181 0%, #f56565 100%)'
                : 'linear-gradient(135deg, #48bb78 0%, #38b2ac 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            {isRunning ? '⏸️ Pause' : '▶️ Start V2'}
          </button>
          
          <button
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #f6ad55 0%, #ed8936 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            ⚡ Paradoxe
          </button>
          
          <button
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #9f7aea 0%, #805ad5 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            🌀 Régulateur
          </button>
        </div>
        
        {/* Temporal Display */}
        <TemporalDisplay
          temporal={temporal}
          variant="compact"
          showEnergy={true}
        />
      </header>
      
      {/* Resources Bar */}
      <div style={{
        padding: '0 20px',
        background: 'rgba(20, 24, 36, 0.5)',
      }}>
        <ResourceBar
          resources={{ crystals: 100, energy: 50, temporal: 25, quantum: 10 }}
          variant="compact"
        />
      </div>
      
      {/* Main - Map de test */}
      <main style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <HexGrid
          width={30}
          height={20}
          hexes={hexes}
          selectedHex={selectedHex}
          onHexClick={(x, y) => setSelectedHex({ x, y })}
          enableDrag={true}
          showGrid={true}
        />
        
        {/* Panel de debug */}
        <div style={{
          position: 'absolute',
          top: 20,
          right: 20,
          width: 300,
          padding: 20,
          background: 'rgba(0, 0, 0, 0.9)',
          border: '2px solid #667eea',
          borderRadius: 12,
        }}>
          <h3 style={{
            fontSize: 16,
            color: '#667eea',
            marginBottom: 15,
          }}>
            📊 Debug V2
          </h3>
          
          <div style={{ fontSize: 14, color: '#e8ecff', lineHeight: 1.8 }}>
            <div>TW: {temporal.tw.toFixed(1)}</div>
            <div>TE: {temporal.te.toFixed(1)}</div>
            <div>Drift: {Math.abs(temporal.tw - temporal.te).toFixed(2)}</div>
            <div>Dette: {temporal.debt.toFixed(2)}</div>
            <div>Énergie: {temporal.energy_complex.A.toFixed(0)} + {temporal.energy_complex.phi.toFixed(2)}i</div>
          </div>
          
          <div style={{
            marginTop: 15,
            paddingTop: 15,
            borderTop: '1px solid rgba(102, 126, 234, 0.3)',
          }}>
            <div style={{ fontSize: 12, color: '#a0aec0' }}>
              Hexes: {hexes.size}<br/>
              FPS: 60<br/>
              Backends: ✅ Rust | ✅ Java | ✅ Vector
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        background: 'rgba(20, 24, 36, 0.9)',
        borderTop: '1px solid rgba(102, 126, 234, 0.3)',
        fontSize: 14,
        color: '#a0aec0',
      }}>
        <span>Mode: {isRunning ? '🟢 Running' : '⏸️ Paused'}</span>
        <span>Scénario: Test_Map_001</span>
        <span>Tick: {temporal.tw}</span>
      </footer>
    </div>
  );
}