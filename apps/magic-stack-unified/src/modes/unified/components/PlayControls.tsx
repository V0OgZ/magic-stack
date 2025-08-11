/**
 * 🎮 PLAY CONTROLS
 * Contrôles pour le mode jeu
 */

import React from 'react';
import { useUnifiedMapStore } from '../../../shared/store/unifiedMapStore';

export function PlayControls(): React.ReactElement {
  const {
    setMode,
    temporal,
    currentMap,
  } = useUnifiedMapStore();

  return (
    <div style={{
      width: 300,
      background: 'linear-gradient(180deg, #1a1a2e, #16213e)',
      padding: 20,
      borderLeft: '2px solid rgba(102, 126, 234, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    }}>
      <h3 style={{
        margin: 0,
        fontSize: 18,
        background: 'linear-gradient(45deg, #f56565, #ed8936)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        🎮 Mode Jeu
      </h3>
      
      {/* Infos de la partie */}
      <div style={{
        padding: 15,
        background: 'rgba(245, 101, 101, 0.1)',
        borderRadius: 10,
        border: '1px solid rgba(245, 101, 101, 0.3)',
      }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: 14 }}>Partie en cours</h4>
        <div style={{ fontSize: 12, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div>Map: {currentMap?.name}</div>
          <div>Jour: {temporal.currentDay}</div>
          <div>Ressources: {currentMap?.resources.length || 0}</div>
          <div>Événements: {currentMap?.timeline.events.length || 0}</div>
        </div>
      </div>
      
      {/* Actions de jeu */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        <button
          style={{
            padding: '12px',
            background: 'linear-gradient(135deg, #48bb78, #38a169)',
            border: 'none',
            borderRadius: 8,
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: 14,
          }}
        >
          ⏭️ Fin de Tour
        </button>
        
        <button
          style={{
            padding: '12px',
            background: 'linear-gradient(135deg, #4299e1, #3182ce)',
            border: 'none',
            borderRadius: 8,
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: 14,
          }}
        >
          💾 Sauvegarder
        </button>
        
        <button
          onClick={() => setMode('resources')}
          style={{
            padding: '12px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 8,
            color: 'white',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          ✏️ Retour à l'édition
        </button>
      </div>
      
      {/* Stats de jeu */}
      <div style={{
        marginTop: 'auto',
        padding: 15,
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 10,
        fontSize: 11,
      }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: 12 }}>Statistiques</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div>FPS: 60</div>
          <div>Ping: 12ms</div>
          <div>Joueurs: 1/8</div>
          <div>Mode: Local</div>
        </div>
      </div>
    </div>
  );
}
