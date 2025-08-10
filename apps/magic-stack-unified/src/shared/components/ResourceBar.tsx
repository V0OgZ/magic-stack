/**
 * 💎 ResourceBar Component - Barre de ressources réutilisable
 * Cristaux, Énergie, Temporal, Quantum
 */

import React from 'react';

export interface Resources {
  crystals?: number;
  energy?: number;
  temporal?: number;
  quantum?: number;
  [key: string]: number | undefined; // Ressources custom
}

export interface ResourceBarProps {
  resources: Resources;
  maxValues?: Resources;
  variant?: 'horizontal' | 'vertical' | 'compact';
  showLabels?: boolean;
  showMax?: boolean;
  animated?: boolean;
  onChange?: (resource: string, value: number) => void;
  customIcons?: Record<string, string>;
}

// Icônes par défaut (à remplacer par Icons JD / SVG Repo)
const DEFAULT_ICONS: Record<string, string> = {
  crystals: '💎',
  energy: '⚡',
  temporal: '⏰',
  quantum: '🌀',
};

const DEFAULT_COLORS: Record<string, string> = {
  crystals: '#63b3ed',
  energy: '#f6ad55',
  temporal: '#9f7aea',
  quantum: '#48bb78',
};

export function ResourceBar({
  resources,
  maxValues,
  variant = 'horizontal',
  showLabels = true,
  showMax = true,
  animated = true,
  onChange,
  customIcons = {}
}: ResourceBarProps): React.ReactElement {
  const icons = { ...DEFAULT_ICONS, ...customIcons };
  
  // Animation de changement de valeur
  const [prevResources, setPrevResources] = React.useState(resources);
  const [animatingResources, setAnimatingResources] = React.useState<Set<string>>(new Set());
  
  React.useEffect(() => {
    const changed = new Set<string>();
    Object.keys(resources).forEach(key => {
      if (prevResources[key] !== resources[key]) {
        changed.add(key);
      }
    });
    
    if (changed.size > 0 && animated) {
      setAnimatingResources(changed);
      setTimeout(() => setAnimatingResources(new Set()), 500);
    }
    
    setPrevResources(resources);
  }, [resources, animated, prevResources]);
  
  const renderResource = (key: string, value: number | undefined) => {
    if (value === undefined) return null;
    
    const max = maxValues?.[key];
    const percentage = max ? (value / max) * 100 : 0;
    const isAnimating = animatingResources.has(key);
    const isLow = max && value < max * 0.25;
    const color = DEFAULT_COLORS[key] || '#667eea';
    
    // Compact variant
    if (variant === 'compact') {
      return (
        <div
          key={key}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '4px 8px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 4,
            border: isAnimating ? `1px solid ${color}` : '1px solid transparent',
            transition: 'all 0.3s',
          }}
        >
          <span style={{ fontSize: 16 }}>{icons[key]}</span>
          <span style={{
            fontSize: 14,
            fontWeight: 600,
            color: isLow ? '#fc8181' : '#e8ecff',
            animation: isAnimating ? 'pulse 0.5s' : 'none',
          }}>
            {value}
          </span>
        </div>
      );
    }
    
    // Full resource display
    return (
      <div
        key={key}
        style={{
          display: 'flex',
          flexDirection: variant === 'vertical' ? 'column' : 'row',
          gap: 8,
          flex: 1,
          minWidth: variant === 'vertical' ? 'auto' : 120,
        }}
      >
        {/* Icon & Label */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          minWidth: variant === 'vertical' ? 'auto' : 80,
        }}>
          <span style={{
            fontSize: 20,
            filter: isAnimating ? `drop-shadow(0 0 8px ${color})` : 'none',
            transition: 'filter 0.3s',
          }}>
            {icons[key]}
          </span>
          {showLabels && (
            <span style={{
              fontSize: 11,
              color: '#a0aec0',
              textTransform: 'capitalize',
            }}>
              {key}
            </span>
          )}
        </div>
        
        {/* Value & Bar */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}>
            <span style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: isLow ? '#fc8181' : '#e8ecff',
              animation: isAnimating ? 'bounceValue 0.5s' : 'none',
            }}>
              {value}
            </span>
            {showMax && max && (
              <span style={{
                fontSize: 11,
                color: '#718096',
              }}>
                / {max}
              </span>
            )}
          </div>
          
          {/* Progress bar */}
          {max && (
            <div style={{
              height: 4,
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: 2,
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${Math.min(100, percentage)}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${color}, ${color}cc)`,
                transition: 'width 0.5s ease',
                boxShadow: isLow ? `0 0 8px ${color}` : 'none',
                animation: isLow ? 'pulse 1s infinite' : 'none',
              }} />
            </div>
          )}
        </div>
        
        {/* Interactive buttons (if onChange provided) */}
        {onChange && (
          <div style={{
            display: 'flex',
            gap: 4,
          }}>
            <button
              onClick={() => onChange(key, Math.max(0, value - 1))}
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                background: 'rgba(252, 129, 129, 0.2)',
                border: '1px solid rgba(252, 129, 129, 0.4)',
                color: '#fc8181',
                cursor: 'pointer',
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              -
            </button>
            <button
              onClick={() => onChange(key, value + 1)}
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                background: 'rgba(72, 187, 120, 0.2)',
                border: '1px solid rgba(72, 187, 120, 0.4)',
                color: '#48bb78',
                cursor: 'pointer',
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              +
            </button>
          </div>
        )}
      </div>
    );
  };
  
  const resourceEntries = Object.entries(resources).filter(([_, value]) => value !== undefined);
  
  return (
    <div
      className="resource-bar"
      style={{
        display: 'flex',
        flexDirection: variant === 'vertical' ? 'column' : 'row',
        gap: variant === 'compact' ? 8 : 16,
        padding: variant === 'compact' ? 8 : 12,
        background: variant === 'compact' 
          ? 'transparent'
          : 'linear-gradient(135deg, rgba(20, 24, 36, 0.9) 0%, rgba(26, 31, 46, 0.9) 100%)',
        border: variant === 'compact' ? 'none' : '1px solid rgba(102, 126, 234, 0.2)',
        borderRadius: variant === 'compact' ? 0 : 8,
        backdropFilter: variant === 'compact' ? 'none' : 'blur(10px)',
        flexWrap: variant === 'compact' ? 'wrap' : 'nowrap',
      }}
    >
      {resourceEntries.map(([key, value]) => renderResource(key, value))}
      
      {/* Empty state */}
      {resourceEntries.length === 0 && (
        <div style={{
          color: '#718096',
          fontSize: 12,
          fontStyle: 'italic',
        }}>
          Aucune ressource
        </div>
      )}
    </div>
  );
}

// CSS pour animations
if (typeof document !== 'undefined' && !document.getElementById('resource-bar-styles')) {
  const style = document.createElement('style');
  style.id = 'resource-bar-styles';
  style.textContent = `
    @keyframes bounceValue {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }
  `;
  document.head.appendChild(style);
}
