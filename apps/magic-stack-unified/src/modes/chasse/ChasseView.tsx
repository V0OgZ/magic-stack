/**
 * 🏹 ChasseView - Mode Chasse Temporelle
 * Migration depuis CHASSE_TEMPORELLE_MEGA_MAP.html
 * Map 120x120 avec viewport 20x20
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { HexGrid } from '../../shared/components/HexGrid';
import { TemporalDisplay } from '../../shared/components/TemporalDisplay';
import { ResourceBar } from '../../shared/components/ResourceBar';
import { useChasseStore } from './store/chasseStore';

export function ChasseView(): React.ReactElement {
  const [gameStarted, setGameStarted] = React.useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<
    'easy' | 'normal' | 'hard' | 'nightmare'
  >('normal');
  
  if (!gameStarted) {
    return <DifficultySelector 
      onStart={(diff) => {
        setSelectedDifficulty(diff);
        setGameStarted(true);
      }}
    />;
  }
  
  return <ChasseGame difficulty={selectedDifficulty} />;
}

// Sélecteur de difficulté
function DifficultySelector({ onStart }: { 
  onStart: (diff: 'easy' | 'normal' | 'hard' | 'nightmare') => void 
}): React.ReactElement {
  const difficulties = [
    { 
      id: 'easy' as const, 
      name: '🌱 Facile', 
      color: '#48bb78',
      drift: 0.1, 
      debtMax: 100,
      description: 'Drift minimal, dette généreuse'
    },
    { 
      id: 'normal' as const, 
      name: '⚔️ Normal', 
      color: '#63b3ed',
      drift: 0.3, 
      debtMax: 50,
      description: 'Équilibré pour découvrir'
    },
    { 
      id: 'hard' as const, 
      name: '💀 Difficile', 
      color: '#f6ad55',
      drift: 0.5, 
      debtMax: 30,
      description: 'Drift élevé, ressources limitées'
    },
    { 
      id: 'nightmare' as const, 
      name: '🔥 Cauchemar', 
      color: '#fc8181',
      drift: 1.0, 
      debtMax: 10,
      description: 'Survie impossible?'
    },
  ];
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: 32,
      padding: 20,
      background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1d3a 100%)',
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
          fontSize: 48,
          background: 'linear-gradient(135deg, #f6ad55 0%, #fc8181 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 16,
        }}>
          🏹 Chasse Temporelle
        </h1>
        
        <p style={{
          fontSize: 18,
          color: '#a0aec0',
          marginBottom: 8,
        }}>
          Map gigantesque 120x120 hexagones
        </p>
        
        <p style={{
          fontSize: 14,
          color: '#718096',
        }}>
          6x6 écrans • Brouillard de guerre • Régulateurs
        </p>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 20,
        maxWidth: 600,
        width: '100%',
      }}>
        {difficulties.map(diff => (
          <button
            key={diff.id}
            onClick={() => onStart(diff.id)}
            style={{
              padding: 20,
              background: `linear-gradient(135deg, ${diff.color}20, ${diff.color}10)`,
              border: `2px solid ${diff.color}`,
              borderRadius: 12,
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 10px 30px ${diff.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: diff.color,
              marginBottom: 8,
            }}>
              {diff.name}
            </div>
            
            <div style={{
              fontSize: 12,
              color: '#e8ecff',
              marginBottom: 12,
            }}>
              {diff.description}
            </div>
            
            <div style={{
              display: 'flex',
              gap: 16,
              fontSize: 11,
              color: '#a0aec0',
            }}>
              <span>Drift: {diff.drift}</span>
              <span>Dette max: {diff.debtMax}</span>
            </div>
          </button>
        ))}
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

// Jeu principal
function ChasseGame({ difficulty }: { 
  difficulty: 'easy' | 'normal' | 'hard' | 'nightmare' 
}): React.ReactElement {
  const {
    viewport,
    setViewport,
    temporal,
    resources,
    heroPosition,
    moveHero,
    hexes,
    selectedHex,
    setSelectedHex,
    tick,
  } = useChasseStore();
  
  // Init difficulty
  React.useEffect(() => {
    const store = useChasseStore.getState();
    store.initGame(difficulty);
  }, [difficulty]);
  
  // Tick auto
  React.useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [tick]);
  
  // Gestion clavier pour déplacement viewport
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 10;
      const vp = useChasseStore.getState().viewport;
      
      switch(e.key) {
        case 'ArrowUp':
          setViewport({ ...vp, y: Math.max(0, vp.y - step) });
          break;
        case 'ArrowDown':
          setViewport({ ...vp, y: Math.min(100, vp.y + step) });
          break;
        case 'ArrowLeft':
          setViewport({ ...vp, x: Math.max(0, vp.x - step) });
          break;
        case 'ArrowRight':
          setViewport({ ...vp, x: Math.min(100, vp.x + step) });
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setViewport]);
  
  // Hexes visibles dans le viewport
  const visibleHexes = React.useMemo(() => {
    const visible = new Map();
    const { x: vx, y: vy } = viewport;
    
    for (let x = vx; x < vx + 20 && x < 120; x++) {
      for (let y = vy; y < vy + 20 && y < 120; y++) {
        const key = `${x},${y}`;
        const hex = hexes.get(key);
        if (hex) {
          // Ajuster les coordonnées pour l'affichage
          visible.set(`${x - vx},${y - vy}`, {
            ...hex,
            displayX: x - vx,
            displayY: y - vy,
            realX: x,
            realY: y,
          });
        }
      }
    }
    
    return visible;
  }, [viewport, hexes]);
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#0a0e1a',
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        background: 'linear-gradient(180deg, rgba(20, 24, 36, 0.95) 0%, rgba(26, 31, 46, 0.9) 100%)',
        borderBottom: '1px solid rgba(246, 173, 85, 0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <h2 style={{
            fontSize: 24,
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #f6ad55 0%, #fc8181 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
          }}>
            🏹 Chasse Temporelle
          </h2>
          
          <span style={{
            padding: '4px 12px',
            background: getDifficultyColor(difficulty) + '20',
            border: `1px solid ${getDifficultyColor(difficulty)}`,
            borderRadius: 6,
            fontSize: 12,
            color: getDifficultyColor(difficulty),
          }}>
            {difficulty.toUpperCase()}
          </span>
        </div>
        
        <TemporalDisplay
          temporal={temporal}
          variant="compact"
          showEnergy={true}
        />
      </header>
      
      {/* Resources */}
      <div style={{
        padding: '0 20px',
        background: 'rgba(20, 24, 36, 0.5)',
      }}>
        <ResourceBar
          resources={resources}
          variant="compact"
        />
      </div>
      
      {/* Main Map */}
      <main style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <HexGrid
          width={20}
          height={20}
          hexes={visibleHexes}
          selectedHex={selectedHex ? {
            x: selectedHex.x - viewport.x,
            y: selectedHex.y - viewport.y,
          } : null}
          onHexClick={(displayX, displayY) => {
            const realX = displayX + viewport.x;
            const realY = displayY + viewport.y;
            setSelectedHex({ x: realX, y: realY });
            
            // Déplacer le héros si possible
            if (heroPosition) {
              const distance = Math.abs(realX - heroPosition.x) + 
                              Math.abs(realY - heroPosition.y);
              if (distance <= 3) {
                moveHero(realX, realY);
              }
            }
          }}
          showGrid={true}
          enableDrag={false} // Viewport géré autrement
        />
        
        {/* Minimap */}
        <Minimap />
        
        {/* Position actuelle */}
        <div style={{
          position: 'absolute',
          top: 10,
          left: 10,
          padding: '8px 12px',
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: 6,
          fontSize: 12,
          color: '#a0aec0',
        }}>
          <div>Viewport: [{viewport.x},{viewport.y}] → [{viewport.x + 20},{viewport.y + 20}]</div>
          {heroPosition && (
            <div>Héros: [{heroPosition.x},{heroPosition.y}]</div>
          )}
          <div style={{ marginTop: 4, fontSize: 10, color: '#718096' }}>
            Utilisez les flèches pour naviguer
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
        borderTop: '1px solid rgba(246, 173, 85, 0.3)',
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link
            to="/"
            style={{
              padding: '10px 20px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            🏠 Menu
          </Link>
        </div>
        
        <div style={{
          fontSize: 14,
          color: '#a0aec0',
        }}>
          Map totale: 120×120 | Zone visible: 20×20
        </div>
      </footer>
    </div>
  );
}

// Minimap component
function Minimap(): React.ReactElement {
  const { viewport, heroPosition, hexes } = useChasseStore();
  const scale = 2; // 120 / 60 pixels
  
  return (
    <div style={{
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 240,
      height: 240,
      background: 'rgba(0, 0, 0, 0.9)',
      border: '2px solid rgba(246, 173, 85, 0.5)',
      borderRadius: 8,
      padding: 4,
    }}>
      <div style={{
        fontSize: 10,
        color: '#f6ad55',
        marginBottom: 4,
        textAlign: 'center',
      }}>
        CARTE COMPLÈTE
      </div>
      
      <div style={{
        position: 'relative',
        width: 232,
        height: 210,
        background: 'rgba(255, 255, 255, 0.05)',
      }}>
        {/* Viewport indicator */}
        <div style={{
          position: 'absolute',
          left: viewport.x * scale,
          top: viewport.y * scale,
          width: 20 * scale,
          height: 20 * scale,
          border: '2px solid #ffd700',
          background: 'rgba(255, 215, 0, 0.1)',
        }} />
        
        {/* Hero position */}
        {heroPosition && (
          <div style={{
            position: 'absolute',
            left: heroPosition.x * scale - 2,
            top: heroPosition.y * scale - 2,
            width: 4,
            height: 4,
            background: '#48bb78',
            borderRadius: '50%',
          }} />
        )}
        
        {/* Points d'intérêt */}
        {Array.from(hexes.entries())
          .filter(([_, hex]) => hex.entity || hex.poi)
          .map(([key, hex]) => (
            <div
              key={key}
              style={{
                position: 'absolute',
                left: hex.x * scale - 1,
                top: hex.y * scale - 1,
                width: 2,
                height: 2,
                background: hex.entity ? '#fc8181' : '#667eea',
                borderRadius: '50%',
              }}
            />
          ))}
      </div>
    </div>
  );
}

// Helpers
function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    easy: '#48bb78',
    normal: '#63b3ed',
    hard: '#f6ad55',
    nightmare: '#fc8181',
  };
  return colors[difficulty] || '#667eea';
}