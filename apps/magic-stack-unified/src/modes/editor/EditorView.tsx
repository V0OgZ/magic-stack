/**
 * 🗺️ EditorView - Éditeur de cartes intégré
 * Réutilise les composants du World Editor séparé
 */

import React from 'react';
import { Link } from 'react-router-dom';

export function EditorView(): React.ReactElement {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: 20,
    }}>
      <div style={{ fontSize: 64 }}>🗺️</div>
      <h1 style={{ fontSize: 32, color: '#48bb78' }}>World Editor</h1>
      <p style={{ color: '#a0aec0' }}>Mode éditeur intégré - En construction</p>
      
      <div style={{
        padding: 20,
        background: 'rgba(72, 187, 120, 0.1)',
        border: '1px solid rgba(72, 187, 120, 0.3)',
        borderRadius: 8,
        maxWidth: 600,
        textAlign: 'center',
      }}>
        <p>L'éditeur standalone est disponible sur le port 5174</p>
        <p style={{ marginTop: 8 }}>
          Cette vue intégrera progressivement tous les outils d'édition
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
