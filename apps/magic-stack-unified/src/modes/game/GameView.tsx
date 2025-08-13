// @ts-nocheck
/**
 * 🎮 GameView - Vue principale du jeu Heroes of Time
 * Migration depuis HOT_GAME_UNIFIED.html
 */

import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { HexGrid } from '../../shared/components/HexGrid';
import { TemporalDisplay } from '../../shared/components/TemporalDisplay';
import { ResourceBar } from '../../shared/components/ResourceBar';
import { useGameStore, useHexStore } from './store/gameStore';

export function GameView(): React.ReactElement {
  const navigate = useNavigate();
  const {
    gameState,
    currentView,
    setCurrentView,
    moveHero,
    endTurn,
  } = useGameStore();
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#0a0e1a',
    }}>
      {/* Header avec ressources et temporal */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        background: 'linear-gradient(180deg, rgba(20, 24, 36, 0.95) 0%, rgba(26, 31, 46, 0.9) 100%)',
        borderBottom: '1px solid rgba(102, 126, 234, 0.3)',
        backdropFilter: 'blur(10px)',
      }}>
        {/* Logo & Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <h1 style={{
            fontSize: 24,
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
          }}>
            ⚔️ Heroes of Time
          </h1>
          
          <nav style={{ display: 'flex', gap: 8 }}>
            <ViewButton
              active={currentView === 'map'}
              onClick={() => setCurrentView('map')}
            >
              🗺️ Carte
            </ViewButton>
            <ViewButton
              active={currentView === 'combat'}
              onClick={() => setCurrentView('combat')}
            >
              ⚔️ Combat
            </ViewButton>
            <ViewButton
              active={currentView === 'timeline'}
              onClick={() => setCurrentView('timeline')}
            >
              📅 Timeline
            </ViewButton>
          </nav>
        </div>
        
        {/* Temporal Display */}
        <TemporalDisplay
          temporal={gameState.temporal}
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
          resources={gameState.resources}
          maxValues={{
            crystals: 999,
            energy: 100,
            temporal: 100,
            quantum: 50,
          }}
          variant="horizontal"
        />
      </div>
      
      {/* Main Content */}
      <main style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Routes>
          <Route path="/" element={<MapView />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/combat" element={<CombatView />} />
          <Route path="/timeline" element={<TimelineView />} />
        </Routes>
        
        {/* Si pas de route, afficher la map par défaut */}
        {currentView === 'map' && <MapView />}
        {currentView === 'combat' && <CombatView />}
        {currentView === 'timeline' && <TimelineView />}
      </main>
      
      {/* Footer avec actions */}
      <footer style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        background: 'rgba(20, 24, 36, 0.9)',
        borderTop: '1px solid rgba(102, 126, 234, 0.3)',
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={endTurn}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            ⏭️ Fin de Tour
          </button>
          
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '10px 20px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            🏠 Menu
          </button>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontSize: 14,
          color: '#a0aec0',
        }}>
          <span>Jour {gameState.day || 1}</span>
          <span>•</span>
          <span>Tour {gameState.turn || 1}</span>
          <span>•</span>
          <span>Mode: {gameState.mode || 'Campaign'}</span>
        </div>
      </footer>
    </div>
  );
}

// Vue Map
function MapView(): React.ReactElement {
  const { gameState, selectedHex, setSelectedHex, moveHero } = useGameStore();
  const { hexes } = useHexStore();
  
  return (
    <HexGrid
      width={20}
      height={20}
      hexes={hexes}
      selectedHex={selectedHex}
      onHexClick={(x, y) => {
        setSelectedHex({ x, y });
        // Si c'est le héros, le déplacer
        if (gameState.heroPosition) {
          moveHero(x, y);
        }
      }}
      enableDrag={true}
      showGrid={true}
    />
  );
}

// Vue Combat (placeholder)
function CombatView(): React.ReactElement {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      flexDirection: 'column',
      gap: 20,
    }}>
      <div style={{ fontSize: 64 }}>⚔️</div>
      <h2 style={{ fontSize: 32, color: '#667eea' }}>Mode Combat</h2>
      <p style={{ color: '#a0aec0' }}>TCG ou Auto-résolution</p>
      <div style={{
        display: 'flex',
        gap: 16,
      }}>
        <button style={{
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #fc8181 0%, #f56565 100%)',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontSize: 16,
        }}>
          🎴 Mode TCG
        </button>
        <button style={{
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #48bb78 0%, #38b2ac 100%)',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontSize: 16,
        }}>
          ⚡ Auto-Résolution
        </button>
      </div>
    </div>
  );
}

// Vue Timeline (placeholder)
function TimelineView(): React.ReactElement {
  const { gameState } = useGameStore();
  
  return (
    <div style={{
      padding: 40,
      maxWidth: 1200,
      margin: '0 auto',
    }}>
      <h2 style={{ fontSize: 32, color: '#667eea', marginBottom: 24 }}>
        📅 Timeline Temporelle
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 16,
      }}>
        {[1, 5, 10, 15, 20, 25, 30].map(day => (
          <div
            key={day}
            style={{
              padding: 16,
              background: day === gameState.day 
                ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)'
                : 'rgba(255, 255, 255, 0.05)',
              border: day === gameState.day
                ? '2px solid #667eea'
                : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 8,
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>
              Jour {day}
            </div>
            {day === 30 && (
              <div style={{ fontSize: 12, color: '#ffd700' }}>
                🌟 Événement Spécial
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div style={{
        marginTop: 32,
        padding: 20,
        background: 'rgba(102, 126, 234, 0.1)',
        border: '1px solid rgba(102, 126, 234, 0.3)',
        borderRadius: 8,
      }}>
        <h3 style={{ color: '#9f7aea', marginBottom: 12 }}>
          Prochains Événements
        </h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>Jour 8: Premiers contacts</li>
          <li>Jour 15: Les régulateurs arrivent</li>
          <li>Jour 20: Bataille majeure</li>
          <li>Jour 25: Convergence temporelle</li>
          <li>Jour 30: L'Apocalypse Temporelle</li>
        </ul>
      </div>
    </div>
  );
}

// Bouton de vue
function ViewButton({ 
  active, 
  onClick, 
  children 
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        background: active
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : 'transparent',
        color: active ? 'white' : '#a0aec0',
        border: active ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 6,
        cursor: 'pointer',
        fontSize: 14,
        transition: 'all 0.2s',
      }}
    >
      {children}
    </button>
  );
}
