/**
 * 🎮 MODE SELECTOR
 * Permet de switcher entre les différents modes de l'éditeur unifié
 */

import React from 'react';
import type { EditorMode } from '../../../shared/store/unifiedMapStore';

interface Props {
  currentMode: EditorMode;
  onModeChange: (mode: EditorMode) => void;
}

export function ModeSelector({ currentMode, onModeChange }: Props): React.ReactElement {
  const modes: { mode: EditorMode; label: string; icon: string; color: string }[] = [
    { mode: 'structure', label: 'Structure', icon: '🏗️', color: '#4299e1' },
    { mode: 'resources', label: 'Resources', icon: '💎', color: '#48bb78' },
    { mode: 'timeline', label: 'Timeline', icon: '⏳', color: '#ed8936' },
    { mode: 'overlay', label: 'Overlay', icon: '🌌', color: '#9f7aea' },
    { mode: 'play', label: 'Play', icon: '🎮', color: '#f56565' },
  ];

  return (
    <div style={{
      display: 'flex',
      gap: 4,
      background: 'rgba(0, 0, 0, 0.3)',
      padding: 4,
      borderRadius: 12,
      border: '1px solid rgba(102, 126, 234, 0.3)',
    }}>
      {modes.map(({ mode, label, icon, color }) => (
        <button
          key={mode}
          onClick={() => onModeChange(mode)}
          style={{
            padding: '8px 16px',
            background: currentMode === mode 
              ? `linear-gradient(135deg, ${color}dd, ${color}99)`
              : 'rgba(255, 255, 255, 0.05)',
            border: currentMode === mode
              ? `2px solid ${color}`
              : '2px solid transparent',
            borderRadius: 8,
            color: 'white',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: currentMode === mode ? 'bold' : 'normal',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'all 0.2s',
            transform: currentMode === mode ? 'scale(1.05)' : 'scale(1)',
          }}
          onMouseEnter={(e) => {
            if (currentMode !== mode) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentMode !== mode) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          <span style={{ fontSize: 18 }}>{icon}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
