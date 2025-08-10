/**
 * ⏰ TemporalDisplay Component - Affichage temporel V2
 * Affiche tw, te, drift, dette, énergie complexe
 */

import React from 'react';

export interface TemporalState {
  tw: number;
  te: number;
  debt?: number;
  debtRate?: number;
  energy_complex?: {
    A: number;
    phi: number;
  };
  paradoxes?: Array<{
    type: string;
    severity: string;
  }>;
}

export interface TemporalDisplayProps {
  temporal: TemporalState;
  variant?: 'compact' | 'full' | 'minimal';
  showEnergy?: boolean;
  showParadoxes?: boolean;
  animated?: boolean;
  onParadoxClick?: (paradox: any) => void;
}

export function TemporalDisplay({
  temporal,
  variant = 'full',
  showEnergy = true,
  showParadoxes = true,
  animated = true,
  onParadoxClick
}: TemporalDisplayProps): React.ReactElement {
  const drift = Math.abs(temporal.tw - temporal.te);
  
  // Calcul des couleurs selon le drift
  const getDriftColor = () => {
    if (drift < 2) return '#48bb78'; // Vert
    if (drift < 5) return '#f6ad55'; // Orange
    if (drift < 10) return '#fc8181'; // Rouge
    return '#e53e3e'; // Rouge critique
  };
  
  const getDriftStatus = () => {
    if (drift < 2) return 'Stable';
    if (drift < 5) return 'Dérive';
    if (drift < 10) return 'Danger';
    return 'Critique!';
  };
  
  // Calcul magnitude énergie complexe
  const getEnergyMagnitude = () => {
    if (!temporal.energy_complex) return 0;
    const { A, phi } = temporal.energy_complex;
    return Math.sqrt(A * A + phi * phi);
  };
  
  // Rendu minimal (juste les chiffres)
  if (variant === 'minimal') {
    return (
      <div style={{
        display: 'flex',
        gap: 12,
        padding: '4px 8px',
        background: 'rgba(0,0,0,0.5)',
        borderRadius: 4,
        fontSize: 12,
        color: '#e8ecff',
      }}>
        <span>TW: {temporal.tw.toFixed(1)}</span>
        <span>TE: {temporal.te.toFixed(1)}</span>
        <span style={{ color: getDriftColor() }}>Δ: {drift.toFixed(1)}</span>
      </div>
    );
  }
  
  // Rendu compact (une ligne)
  if (variant === 'compact') {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '8px 16px',
        background: 'linear-gradient(135deg, rgba(20, 24, 36, 0.9) 0%, rgba(26, 31, 46, 0.9) 100%)',
        border: '1px solid rgba(102, 126, 234, 0.3)',
        borderRadius: 8,
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 10, color: '#718096' }}>TW</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#667eea' }}>
              {temporal.tw.toFixed(1)}
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 10, color: '#718096' }}>TE</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#48bb78' }}>
              {temporal.te.toFixed(1)}
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 10, color: '#718096' }}>Δt</span>
            <span style={{ 
              fontSize: 16, 
              fontWeight: 600, 
              color: getDriftColor(),
              animation: drift > 5 && animated ? 'pulse 1s infinite' : 'none',
            }}>
              {drift.toFixed(1)}
            </span>
          </div>
        </div>
        
        {temporal.debt && temporal.debt > 0 && (
          <div style={{
            padding: '2px 8px',
            background: 'rgba(252, 129, 129, 0.2)',
            border: '1px solid rgba(252, 129, 129, 0.4)',
            borderRadius: 4,
            fontSize: 11,
            color: '#fc8181',
          }}>
            💸 Dette: {temporal.debt.toFixed(1)}
          </div>
        )}
      </div>
    );
  }
  
  // Rendu complet (full)
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(20, 24, 36, 0.95) 0%, rgba(26, 31, 46, 0.95) 100%)',
      border: '1px solid rgba(102, 126, 234, 0.3)',
      borderRadius: 12,
      padding: 16,
      backdropFilter: 'blur(20px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      minWidth: 280,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <h3 style={{ margin: 0, color: '#667eea', fontSize: 14 }}>
          ⏰ État Temporel
        </h3>
        <span style={{
          fontSize: 11,
          padding: '2px 8px',
          background: `${getDriftColor()}20`,
          border: `1px solid ${getDriftColor()}40`,
          borderRadius: 4,
          color: getDriftColor(),
        }}>
          {getDriftStatus()}
        </span>
      </div>
      
      {/* Valeurs principales */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 12,
        marginBottom: 16,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: '#718096', marginBottom: 4 }}>
            Temps Monde
          </div>
          <div style={{ 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: '#667eea',
            animation: animated ? 'fadeIn 0.5s' : 'none',
          }}>
            {temporal.tw.toFixed(1)}
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: '#718096', marginBottom: 4 }}>
            Temps Entité
          </div>
          <div style={{ 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: '#48bb78',
            animation: animated ? 'fadeIn 0.5s 0.1s both' : 'none',
          }}>
            {temporal.te.toFixed(1)}
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: '#718096', marginBottom: 4 }}>
            Dérive
          </div>
          <div style={{ 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: getDriftColor(),
            animation: drift > 5 && animated ? 'pulse 1s infinite' : 
                      animated ? 'fadeIn 0.5s 0.2s both' : 'none',
          }}>
            {drift.toFixed(1)}
          </div>
        </div>
      </div>
      
      {/* Barre de drift visuelle */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          fontSize: 10,
          color: '#718096',
          marginBottom: 4,
        }}>
          <span>Synchronisation</span>
          <span>{Math.max(0, 100 - drift * 10).toFixed(0)}%</span>
        </div>
        <div style={{
          height: 6,
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 3,
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${Math.max(0, 100 - drift * 10)}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${getDriftColor()} 0%, ${getDriftColor()}cc 100%)`,
            transition: 'width 0.5s ease',
          }} />
        </div>
      </div>
      
      {/* Dette temporelle */}
      {temporal.debt !== undefined && temporal.debt > 0 && (
        <div style={{
          padding: 12,
          background: 'rgba(252, 129, 129, 0.1)',
          border: '1px solid rgba(252, 129, 129, 0.3)',
          borderRadius: 8,
          marginBottom: 12,
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 12, color: '#fc8181', fontWeight: 600 }}>
                💸 Dette Temporelle
              </div>
              <div style={{ fontSize: 10, color: '#fca5a5', marginTop: 2 }}>
                Accumulation: {((temporal.debtRate || 0.05) * 100).toFixed(0)}%/tick
              </div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 'bold', color: '#fc8181' }}>
              {temporal.debt.toFixed(1)}
            </div>
          </div>
        </div>
      )}
      
      {/* Énergie complexe */}
      {showEnergy && temporal.energy_complex && (
        <div style={{
          padding: 12,
          background: 'rgba(102, 126, 234, 0.1)',
          border: '1px solid rgba(102, 126, 234, 0.3)',
          borderRadius: 8,
          marginBottom: 12,
        }}>
          <div style={{ fontSize: 12, color: '#a0aec0', marginBottom: 8 }}>
            ⚡ Énergie Complexe
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 14, color: '#e8ecff' }}>
              E = {temporal.energy_complex.A.toFixed(0)} + {temporal.energy_complex.phi.toFixed(2)}i
            </div>
            <div style={{ fontSize: 12, color: '#9f7aea' }}>
              |E| = {getEnergyMagnitude().toFixed(1)}
            </div>
          </div>
          
          {/* Barre visuelle */}
          <div style={{
            display: 'flex',
            height: 4,
            borderRadius: 2,
            overflow: 'hidden',
            marginTop: 8,
          }}>
            <div style={{
              width: `${(temporal.energy_complex.A / 100) * 100}%`,
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
            }} />
            <div style={{
              width: `${(temporal.energy_complex.phi / Math.PI) * 50}%`,
              background: 'linear-gradient(90deg, #f093fb, #f5576c)',
            }} />
          </div>
        </div>
      )}
      
      {/* Paradoxes */}
      {showParadoxes && temporal.paradoxes && temporal.paradoxes.length > 0 && (
        <div style={{
          padding: 12,
          background: 'rgba(237, 137, 54, 0.1)',
          border: '1px solid rgba(237, 137, 54, 0.3)',
          borderRadius: 8,
        }}>
          <div style={{ fontSize: 12, color: '#ed8936', marginBottom: 8, fontWeight: 600 }}>
            ⚠️ Paradoxes Détectés
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {temporal.paradoxes.map((paradox, i) => (
              <div
                key={i}
                onClick={() => onParadoxClick?.(paradox)}
                style={{
                  padding: '4px 8px',
                  background: 'rgba(237, 137, 54, 0.1)',
                  borderRadius: 4,
                  fontSize: 11,
                  color: '#f6ad55',
                  cursor: onParadoxClick ? 'pointer' : 'default',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (onParadoxClick) {
                    e.currentTarget.style.background = 'rgba(237, 137, 54, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(237, 137, 54, 0.1)';
                }}
              >
                {paradox.type.replace(/_/g, ' ')} - {paradox.severity}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// CSS pour animations
if (typeof document !== 'undefined' && !document.getElementById('temporal-display-styles')) {
  const style = document.createElement('style');
  style.id = 'temporal-display-styles';
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
    }
  `;
  document.head.appendChild(style);
}
