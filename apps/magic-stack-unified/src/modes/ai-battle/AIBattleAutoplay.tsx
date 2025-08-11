/**
 * 🤖 Combat IA vs IA - Mode automatique
 */

import React from 'react';
import { Link } from 'react-router-dom';

export function AIBattleAutoplay(): React.ReactElement {
  const [isRunning, setIsRunning] = React.useState(false);
  const [battleLog, setBattleLog] = React.useState<string[]>([]);
  
  const startBattle = () => {
    setIsRunning(true);
    setBattleLog([
      '⚔️ Début du combat...',
      '🐉 Dragon Rouge entre en jeu',
      '🧙 Archimage lance Boule de feu',
      '💥 Dragon subit 45 dégâts',
      '🐉 Dragon attaque avec Souffle ardent',
      '🧙 Archimage esquive!',
      '... (combat en cours)'
    ]);
  };
  
  return (
    <div style={{
      padding: 40,
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1d3a 100%)',
      color: '#e8ecff',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: '3em', textAlign: 'center', marginBottom: 30 }}>
          🤖 IA vs IA - Combat Automatique
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: 30,
        }}>
          {/* Panneau de contrôle */}
          <div style={{
            padding: 20,
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 15,
            border: '2px solid rgba(102, 126, 234, 0.3)',
          }}>
            <h2>⚙️ Contrôles</h2>
            
            <button
              onClick={startBattle}
              disabled={isRunning}
              style={{
                width: '100%',
                padding: 15,
                marginTop: 20,
                background: isRunning 
                  ? 'rgba(100, 100, 100, 0.3)' 
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: 10,
                fontSize: '1.1em',
                cursor: isRunning ? 'not-allowed' : 'pointer',
              }}
            >
              {isRunning ? '⚔️ Combat en cours...' : '▶️ Lancer le combat'}
            </button>
            
            <button
              onClick={() => {
                setIsRunning(false);
                setBattleLog([]);
              }}
              style={{
                width: '100%',
                padding: 15,
                marginTop: 10,
                background: 'rgba(255, 50, 50, 0.3)',
                color: 'white',
                border: '1px solid rgba(255, 50, 50, 0.5)',
                borderRadius: 10,
                fontSize: '1.1em',
                cursor: 'pointer',
              }}
            >
              ⏹️ Arrêter
            </button>
            
            <div style={{ marginTop: 30 }}>
              <h3>📊 Configuration</h3>
              <label style={{ display: 'block', marginTop: 15 }}>
                Vitesse:
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  defaultValue="5"
                  style={{ width: '100%', marginTop: 5 }}
                />
              </label>
              
              <label style={{ display: 'block', marginTop: 15 }}>
                <input type="checkbox" defaultChecked /> 
                <span style={{ marginLeft: 5 }}>Animation détaillée</span>
              </label>
              
              <label style={{ display: 'block', marginTop: 10 }}>
                <input type="checkbox" /> 
                <span style={{ marginLeft: 5 }}>Mode tournoi</span>
              </label>
            </div>
          </div>
          
          {/* Zone de combat */}
          <div style={{
            padding: 20,
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 15,
            border: '2px solid rgba(102, 126, 234, 0.3)',
          }}>
            <h2>⚔️ Arène de Combat</h2>
            
            {/* Log de combat */}
            <div style={{
              marginTop: 20,
              padding: 15,
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: 10,
              height: 400,
              overflowY: 'auto',
              fontFamily: 'monospace',
            }}>
              {battleLog.length > 0 ? (
                battleLog.map((log, i) => (
                  <div key={i} style={{ marginBottom: 5 }}>
                    {log}
                  </div>
                ))
              ) : (
                <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  En attente du lancement du combat...
                </div>
              )}
            </div>
            
            {/* Statistiques */}
            <div style={{
              marginTop: 20,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 15,
            }}>
              <div style={{
                padding: 10,
                background: 'rgba(102, 126, 234, 0.2)',
                borderRadius: 8,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2em' }}>🐉</div>
                <div>Dragon Rouge</div>
                <div style={{ fontSize: '0.9em', color: 'rgba(255, 255, 255, 0.7)' }}>
                  PV: 450/500
                </div>
              </div>
              
              <div style={{
                padding: 10,
                background: 'rgba(118, 75, 162, 0.2)',
                borderRadius: 8,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2em' }}>🧙</div>
                <div>Archimage</div>
                <div style={{ fontSize: '0.9em', color: 'rgba(255, 255, 255, 0.7)' }}>
                  PV: 280/300
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/" style={{
            padding: '10px 30px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: 25,
            display: 'inline-block',
          }}>
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
