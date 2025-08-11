/**
 * 👁️ Mode Spectateur - Vue omnisciente
 */

import React from 'react';
import { Link } from 'react-router-dom';

export function SpectatorGodMode(): React.ReactElement {
  const [selectedDimension, setSelectedDimension] = React.useState('spatial');
  const [timelinePosition, setTimelinePosition] = React.useState(50);
  
  return (
    <div style={{
      padding: 20,
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1d3a 100%)',
      color: '#e8ecff',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '3em', 
          textAlign: 'center', 
          marginBottom: 30,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          👁️ Mode God - Vision Omnisciente
        </h1>
        
        {/* Barre de contrôle */}
        <div style={{
          padding: 15,
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 15,
          border: '2px solid rgba(102, 126, 234, 0.3)',
          marginBottom: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {['spatial', 'temporal', 'causal', 'quantum'].map(dim => (
              <button
                key={dim}
                onClick={() => setSelectedDimension(dim)}
                style={{
                  padding: '8px 20px',
                  background: selectedDimension === dim 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(102, 126, 234, 0.5)',
                  borderRadius: 20,
                  color: 'white',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {dim === 'spatial' && '🗺️'} 
                {dim === 'temporal' && '⏳'} 
                {dim === 'causal' && '🔀'} 
                {dim === 'quantum' && '🌌'} 
                {' ' + dim}
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <span>Timeline:</span>
            <input 
              type="range"
              min="0"
              max="100"
              value={timelinePosition}
              onChange={(e) => setTimelinePosition(Number(e.target.value))}
              style={{ width: 200 }}
            />
            <span>Jour {Math.floor(timelinePosition * 3.65)}</span>
          </div>
        </div>
        
        {/* Zone de visualisation principale */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          gap: 20,
          height: 600,
        }}>
          {/* Vue principale */}
          <div style={{
            background: 'radial-gradient(circle at center, rgba(102, 126, 234, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%)',
            borderRadius: 15,
            border: '2px solid rgba(102, 126, 234, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Grille hexagonale simulée */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                repeating-linear-gradient(
                  30deg,
                  transparent,
                  transparent 35px,
                  rgba(102, 126, 234, 0.1) 35px,
                  rgba(102, 126, 234, 0.1) 70px
                ),
                repeating-linear-gradient(
                  -30deg,
                  transparent,
                  transparent 35px,
                  rgba(118, 75, 162, 0.1) 35px,
                  rgba(118, 75, 162, 0.1) 70px
                )
              `,
              opacity: 0.5,
            }} />
            
            <div style={{ 
              textAlign: 'center', 
              zIndex: 1,
              padding: 40,
              background: 'rgba(0, 0, 0, 0.7)',
              borderRadius: 15,
            }}>
              <div style={{ fontSize: '4em', marginBottom: 20 }}>
                {selectedDimension === 'spatial' && '🗺️'}
                {selectedDimension === 'temporal' && '⏳'}
                {selectedDimension === 'causal' && '🔀'}
                {selectedDimension === 'quantum' && '🌌'}
              </div>
              <h2>Vue {selectedDimension}</h2>
              <p style={{ marginTop: 15, color: 'rgba(255, 255, 255, 0.7)' }}>
                {selectedDimension === 'spatial' && 'Visualisation spatiale de tous les éléments'}
                {selectedDimension === 'temporal' && 'Timeline des événements passés et futurs'}
                {selectedDimension === 'causal' && 'Chaînes de causalité et conséquences'}
                {selectedDimension === 'quantum' && 'États quantiques superposés'}
              </p>
            </div>
          </div>
          
          {/* Panneau d'informations */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 15,
            border: '2px solid rgba(102, 126, 234, 0.3)',
            padding: 20,
            overflowY: 'auto',
          }}>
            <h3>📊 Statistiques Globales</h3>
            
            <div style={{ marginTop: 20 }}>
              <div style={{ marginBottom: 15 }}>
                <div style={{ fontSize: '0.9em', color: 'rgba(255, 255, 255, 0.7)' }}>
                  Entités actives
                </div>
                <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
                  1,247
                </div>
              </div>
              
              <div style={{ marginBottom: 15 }}>
                <div style={{ fontSize: '0.9em', color: 'rgba(255, 255, 255, 0.7)' }}>
                  Événements temporels
                </div>
                <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
                  89
                </div>
              </div>
              
              <div style={{ marginBottom: 15 }}>
                <div style={{ fontSize: '0.9em', color: 'rgba(255, 255, 255, 0.7)' }}>
                  Branches causales
                </div>
                <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
                  12
                </div>
              </div>
              
              <div style={{ marginBottom: 15 }}>
                <div style={{ fontSize: '0.9em', color: 'rgba(255, 255, 255, 0.7)' }}>
                  États quantiques
                </div>
                <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
                  ∞
                </div>
              </div>
            </div>
            
            <hr style={{ 
              margin: '20px 0', 
              border: 'none', 
              borderTop: '1px solid rgba(255, 255, 255, 0.1)' 
            }} />
            
            <h4>🎮 Contrôles Rapides</h4>
            <div style={{ marginTop: 15 }}>
              <button style={{
                width: '100%',
                padding: 10,
                marginBottom: 10,
                background: 'rgba(102, 126, 234, 0.2)',
                border: '1px solid rgba(102, 126, 234, 0.5)',
                borderRadius: 8,
                color: 'white',
                cursor: 'pointer',
              }}>
                ⏸️ Pause Temporelle
              </button>
              
              <button style={{
                width: '100%',
                padding: 10,
                marginBottom: 10,
                background: 'rgba(118, 75, 162, 0.2)',
                border: '1px solid rgba(118, 75, 162, 0.5)',
                borderRadius: 8,
                color: 'white',
                cursor: 'pointer',
              }}>
                🔄 Reset Causalité
              </button>
              
              <button style={{
                width: '100%',
                padding: 10,
                background: 'rgba(255, 50, 50, 0.2)',
                border: '1px solid rgba(255, 50, 50, 0.5)',
                borderRadius: 8,
                color: 'white',
                cursor: 'pointer',
              }}>
                💥 Collapse Quantique
              </button>
            </div>
          </div>
        </div>
        
        {/* Retour */}
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
