/**
 * 🏹 ChasseView - Mode Chasse Temporelle
 * Migration depuis CHASSE_TEMPORELLE_MEGA_MAP.html
 */

import React from 'react';
import { Link } from 'react-router-dom';

export function ChasseView(): React.ReactElement {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: 20,
    }}>
      <div style={{ fontSize: 64 }}>🏹</div>
      <h1 style={{ fontSize: 32, color: '#f6ad55' }}>Chasse Temporelle</h1>
      <p style={{ color: '#a0aec0' }}>Map 120x120 - 4 difficultés</p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        maxWidth: 600,
      }}>
        {[
          { name: 'Easy', color: '#48bb78', drift: '0.1', debt: '100' },
          { name: 'Normal', color: '#63b3ed', drift: '0.3', debt: '50' },
          { name: 'Hard', color: '#f6ad55', drift: '0.5', debt: '30' },
          { name: 'Nightmare', color: '#fc8181', drift: '1.0', debt: '10' },
        ].map(diff => (
          <button
            key={diff.name}
            style={{
              padding: 16,
              background: `${diff.color}20`,
              border: `2px solid ${diff.color}`,
              borderRadius: 8,
              color: 'white',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 'bold', color: diff.color }}>
              {diff.name}
            </div>
            <div style={{ fontSize: 12, marginTop: 4 }}>
              Drift: {diff.drift} | Dette max: {diff.debt}
            </div>
          </button>
        ))}
      </div>
      
      <div style={{
        padding: 20,
        background: 'rgba(246, 173, 85, 0.1)',
        border: '1px solid rgba(246, 173, 85, 0.3)',
        borderRadius: 8,
        maxWidth: 600,
        textAlign: 'center',
      }}>
        <p>Map gigantesque de 6x6 écrans (120x120 hexagones)</p>
        <p style={{ marginTop: 8 }}>
          Exploration, régulateurs, événements temporels
        </p>
      </div>
      
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
        ← Retour
      </Link>
    </div>
  );
}
