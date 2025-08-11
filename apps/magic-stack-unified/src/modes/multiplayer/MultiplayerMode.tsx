/**
 * 👥 Mode Multijoueur - En développement
 */

import React from 'react';
import { Link } from 'react-router-dom';

export function MultiplayerMode(): React.ReactElement {
  return (
    <div style={{
      padding: 40,
      textAlign: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1d3a 100%)',
      color: '#e8ecff',
    }}>
      <h1 style={{ fontSize: '3em', marginBottom: 20 }}>👥 Mode Multijoueur</h1>
      
      <div style={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 30,
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 15,
        border: '2px solid rgba(102, 126, 234, 0.3)',
      }}>
        <p style={{ fontSize: '1.2em', marginBottom: 30 }}>
          🚧 En cours de migration depuis MULTIPLAYER_DEMO_HOMM3.html
        </p>
        
        <div style={{ marginBottom: 30 }}>
          <h3>Fonctionnalités prévues:</h3>
          <ul style={{ textAlign: 'left', marginTop: 15 }}>
            <li>Synchronisation temps réel via WebSocket</li>
            <li>Lobbies de parties</li>
            <li>Chat intégré</li>
            <li>Support jusqu'à 8 joueurs</li>
            <li>Mode spectateur</li>
          </ul>
        </div>
        
        <div style={{ marginTop: 30 }}>
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
