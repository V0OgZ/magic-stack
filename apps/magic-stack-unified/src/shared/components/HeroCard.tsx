/**
 * 🎴 HeroCard - Composant pour afficher une carte de héros
 * 
 * Affiche les héros avec leurs stats, icônes et effets visuels
 */

import React from 'react';
import { Hero } from '../../data/heroes';

interface HeroCardProps {
  hero: Hero;
  onClick?: () => void;
  selected?: boolean;
  variant?: 'compact' | 'full' | 'mini';
  showStats?: boolean;
  showAbilities?: boolean;
  animated?: boolean;
}

export function HeroCard({
  hero,
  onClick,
  selected = false,
  variant = 'full',
  showStats = true,
  showAbilities = false,
  animated = true
}: HeroCardProps): React.ReactElement {
  
  // Styles selon le tier
  const tierColors = {
    LEGENDARY: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    EPIC: 'linear-gradient(135deg, #9932CC 0%, #8A2BE2 100%)',
    RARE: 'linear-gradient(135deg, #4169E1 0%, #1E90FF 100%)',
    COMMON: 'linear-gradient(135deg, #708090 0%, #696969 100%)'
  };
  
  const tierGlow = {
    LEGENDARY: '0 0 30px rgba(255, 215, 0, 0.6)',
    EPIC: '0 0 25px rgba(153, 50, 204, 0.5)',
    RARE: '0 0 20px rgba(65, 105, 225, 0.4)',
    COMMON: '0 0 15px rgba(112, 128, 144, 0.3)'
  };
  
  // Styles selon la variante
  const cardSizes = {
    mini: { width: 80, height: 100, fontSize: 10 },
    compact: { width: 150, height: 200, fontSize: 12 },
    full: { width: 250, height: 350, fontSize: 14 }
  };
  
  const size = cardSizes[variant];
  
  return (
    <div
      onClick={onClick}
      className={`hero-card ${selected ? 'selected' : ''} ${animated ? 'animated' : ''}`}
      style={{
        width: size.width,
        height: size.height,
        background: '#1a1d3a',
        border: `3px solid transparent`,
        borderImage: tierColors[hero.tier],
        borderImageSlice: 1,
        borderRadius: 12,
        padding: 12,
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: selected ? tierGlow[hero.tier] : '0 4px 12px rgba(0,0,0,0.4)',
        transition: 'all 0.3s ease',
        transform: selected ? 'scale(1.05)' : 'scale(1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        if (animated && onClick) {
          e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
          e.currentTarget.style.boxShadow = tierGlow[hero.tier];
        }
      }}
      onMouseLeave={(e) => {
        if (animated && onClick && !selected) {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
        }
      }}
    >
      {/* Tier Badge */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        background: tierColors[hero.tier],
        padding: '2px 8px',
        borderBottomLeftRadius: 8,
        borderTopRightRadius: 8,
        fontSize: size.fontSize - 2,
        fontWeight: 'bold',
        color: 'white',
        textShadow: '0 1px 2px rgba(0,0,0,0.4)'
      }}>
        {hero.tier}
      </div>
      
      {/* Header avec icône et nom */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginTop: variant === 'mini' ? 8 : 0
      }}>
        <span style={{
          fontSize: size.fontSize + 12,
          filter: `drop-shadow(0 0 8px ${hero.theme_color})`,
          animation: animated ? 'pulse 2s infinite' : 'none'
        }}>
          {hero.icon_id}
        </span>
        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: 0,
            fontSize: size.fontSize,
            color: '#fff',
            fontWeight: 'bold',
            textShadow: '0 1px 3px rgba(0,0,0,0.5)'
          }}>
            {hero.name}
          </h3>
          {variant !== 'mini' && (
            <p style={{
              margin: 0,
              fontSize: size.fontSize - 2,
              color: hero.theme_color,
              fontStyle: 'italic'
            }}>
              {hero.title}
            </p>
          )}
        </div>
      </div>
      
      {/* Classe */}
      {variant !== 'mini' && (
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          padding: '4px 8px',
          borderRadius: 4,
          fontSize: size.fontSize - 2,
          color: '#a0aec0',
          textAlign: 'center'
        }}>
          {hero.class}
        </div>
      )}
      
      {/* Stats */}
      {showStats && variant !== 'mini' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 4,
          padding: 8,
          background: 'rgba(0,0,0,0.2)',
          borderRadius: 8,
          fontSize: size.fontSize - 2
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>⚔️</span>
            <span style={{ color: '#ff6b6b' }}>{hero.stats.attack}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>🛡️</span>
            <span style={{ color: '#4ecdc4' }}>{hero.stats.defense}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>❤️</span>
            <span style={{ color: '#95e77e' }}>{hero.stats.health}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>💫</span>
            <span style={{ color: '#bb85ff' }}>{hero.stats.mana}</span>
          </div>
        </div>
      )}
      
      {/* Abilities */}
      {showAbilities && variant === 'full' && hero.abilities.length > 0 && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          fontSize: size.fontSize - 3,
          marginTop: 8
        }}>
          <div style={{ 
            fontWeight: 'bold', 
            color: '#ffd700',
            borderBottom: '1px solid rgba(255,215,0,0.3)',
            paddingBottom: 4
          }}>
            Capacités:
          </div>
          {hero.abilities.map(ability => (
            <div key={ability.id} style={{
              padding: '4px 8px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
              borderLeft: `3px solid ${hero.theme_color}`
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: 2
              }}>
                <span style={{ color: '#fff', fontWeight: 'bold' }}>
                  {ability.name}
                </span>
                <span style={{ color: '#bb85ff' }}>
                  💫 {ability.cost}
                </span>
              </div>
              <div style={{ color: '#a0aec0', fontSize: size.fontSize - 4 }}>
                {ability.description}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Flavor text */}
      {hero.flavor && variant === 'full' && (
        <div style={{
          marginTop: 'auto',
          padding: '8px',
          background: 'rgba(0,0,0,0.4)',
          borderRadius: 4,
          fontSize: size.fontSize - 3,
          color: '#a0aec0',
          fontStyle: 'italic',
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          "{hero.flavor}"
        </div>
      )}
      
      {/* FX Overlay pour le tier légendaire */}
      {hero.tier === 'LEGENDARY' && animated && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, transparent, rgba(255,215,0,0.1), transparent)',
          animation: 'shimmer 3s infinite',
          pointerEvents: 'none'
        }}/>
      )}
    </div>
  );
}

// CSS pour les animations (à ajouter dans un fichier CSS global)
const styles = `
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
`;

// Injection des styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
