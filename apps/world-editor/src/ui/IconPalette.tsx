/**
 * 🎨 IconPalette - Palette d'icônes pour l'éditeur
 * Migration depuis MAP_ICON_PLACER_ADVANCED.html
 */

import React from 'react';
import { useEditorStore } from '../state/useEditorStore';

// Catalogue d'icônes OpenMoji
const ICON_CATALOG = {
  terrain: {
    name: 'Terrain & Relief',
    icons: [
      { id: 'mountain', emoji: '⛰️', name: 'Montagne' },
      { id: 'volcano', emoji: '🌋', name: 'Volcan' },
      { id: 'forest', emoji: '🌲', name: 'Forêt' },
      { id: 'desert', emoji: '🏜️', name: 'Désert' },
      { id: 'ocean', emoji: '🌊', name: 'Océan' },
      { id: 'island', emoji: '🏝️', name: 'Île' },
    ]
  },
  units: {
    name: 'Unités & Héros',
    icons: [
      { id: 'knight', emoji: '⚔️', name: 'Chevalier' },
      { id: 'wizard', emoji: '🧙', name: 'Mage' },
      { id: 'archer', emoji: '🏹', name: 'Archer' },
      { id: 'dragon', emoji: '🐉', name: 'Dragon' },
      { id: 'unicorn', emoji: '🦄', name: 'Licorne' },
      { id: 'wolf', emoji: '🐺', name: 'Loup' },
    ]
  },
  buildings: {
    name: 'Bâtiments',
    icons: [
      { id: 'castle', emoji: '🏰', name: 'Château' },
      { id: 'tower', emoji: '🗼', name: 'Tour' },
      { id: 'temple', emoji: '⛩️', name: 'Temple' },
      { id: 'house', emoji: '🏠', name: 'Maison' },
      { id: 'camp', emoji: '⛺', name: 'Camp' },
      { id: 'ruins', emoji: '🏚️', name: 'Ruines' },
    ]
  },
  resources: {
    name: 'Ressources',
    icons: [
      { id: 'crystal', emoji: '💎', name: 'Cristal' },
      { id: 'gold', emoji: '🪙', name: 'Or' },
      { id: 'energy', emoji: '⚡', name: 'Énergie' },
      { id: 'wood', emoji: '🪵', name: 'Bois' },
      { id: 'food', emoji: '🍞', name: 'Nourriture' },
      { id: 'water', emoji: '💧', name: 'Eau' },
    ]
  },
  special: {
    name: 'Spécial & Mystique',
    icons: [
      { id: 'portal', emoji: '🌀', name: 'Portail' },
      { id: 'star', emoji: '⭐', name: 'Étoile' },
      { id: 'moon', emoji: '🌙', name: 'Lune' },
      { id: 'sun', emoji: '☀️', name: 'Soleil' },
      { id: 'crystal_ball', emoji: '🔮', name: 'Boule de cristal' },
      { id: 'hourglass', emoji: '⏳', name: 'Sablier temporel' },
    ]
  }
};

interface IconData {
  id: string;
  emoji: string;
  name: string;
}

export function IconPalette(): React.ReactElement {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [expandedCategories, setExpandedCategories] = React.useState<Set<string>>(
    new Set(Object.keys(ICON_CATALOG))
  );
  const [selectedIcon, setSelectedIcon] = React.useState<IconData | null>(null);
  
  const { setCurrentTool, setPlacementMode } = useEditorStore();
  
  // Filtrer les icônes par recherche
  const filterIcons = (icons: IconData[]) => {
    if (!searchTerm) return icons;
    return icons.filter(icon => 
      icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.id.includes(searchTerm.toLowerCase())
    );
  };
  
  // Toggle catégorie
  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };
  
  // Sélectionner une icône
  const selectIcon = (icon: IconData, category: string) => {
    setSelectedIcon(icon);
    setCurrentTool('place_icon');
    setPlacementMode({
      type: 'icon',
      data: {
        ...icon,
        category
      }
    });
  };
  
  return (
    <div style={{
      width: 320,
      height: '100%',
      background: 'linear-gradient(180deg, #1a1a2e, #16213e)',
      borderRight: '3px solid #764ba2',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '5px 0 20px rgba(0,0,0,0.5)',
    }}>
      {/* Header */}
      <div style={{
        padding: 20,
        borderBottom: '1px solid rgba(118, 75, 162, 0.3)',
        background: 'linear-gradient(180deg, #1a1a2e, #16213e)',
      }}>
        <h2 style={{
          fontSize: 24,
          marginBottom: 15,
          textAlign: 'center',
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          🎨 Palette d'Icônes
        </h2>
        
        {/* Recherche */}
        <input
          type="text"
          placeholder="🔍 Rechercher une icône..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: 10,
            border: '2px solid #764ba2',
            background: 'rgba(15, 52, 96, 0.8)',
            color: 'white',
            borderRadius: 10,
            fontSize: 14,
          }}
        />
        
        {/* Icône sélectionnée */}
        {selectedIcon && (
          <div style={{
            marginTop: 10,
            padding: 10,
            background: 'rgba(102, 126, 234, 0.2)',
            border: '2px solid #667eea',
            borderRadius: 8,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 32 }}>{selectedIcon.emoji}</div>
            <div style={{ fontSize: 12, marginTop: 5 }}>
              {selectedIcon.name}
            </div>
          </div>
        )}
      </div>
      
      {/* Catégories */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: 10,
      }}>
        {Object.entries(ICON_CATALOG).map(([key, category]) => {
          const filteredIcons = filterIcons(category.icons);
          if (searchTerm && filteredIcons.length === 0) return null;
          
          return (
            <div
              key={key}
              style={{
                marginBottom: 20,
                background: 'rgba(15, 52, 96, 0.3)',
                borderRadius: 10,
                padding: 10,
                border: '1px solid rgba(118, 75, 162, 0.3)',
              }}
            >
              {/* Titre catégorie */}
              <div
                onClick={() => toggleCategory(key)}
                style={{
                  background: 'linear-gradient(90deg, #0f3460, #1e5f8e)',
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 10,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontWeight: 'bold',
                }}
              >
                <span>{category.name}</span>
                <span>{expandedCategories.has(key) ? '▼' : '▶'}</span>
              </div>
              
              {/* Grille d'icônes */}
              {expandedCategories.has(key) && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 8,
                  padding: 5,
                }}>
                  {filteredIcons.map(icon => (
                    <button
                      key={icon.id}
                      onClick={() => selectIcon(icon, key)}
                      style={{
                        background: selectedIcon?.id === icon.id 
                          ? 'rgba(102, 126, 234, 0.4)' 
                          : 'rgba(15, 52, 96, 0.5)',
                        border: selectedIcon?.id === icon.id
                          ? '2px solid #667eea'
                          : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 8,
                        padding: 10,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 4,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.background = 'rgba(102, 126, 234, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.background = selectedIcon?.id === icon.id 
                          ? 'rgba(102, 126, 234, 0.4)' 
                          : 'rgba(15, 52, 96, 0.5)';
                      }}
                      title={icon.name}
                    >
                      <span style={{ fontSize: 24 }}>{icon.emoji}</span>
                      <span style={{ fontSize: 9, color: '#a0aec0' }}>
                        {icon.name.length > 8 ? icon.name.slice(0, 8) + '...' : icon.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Footer avec stats */}
      <div style={{
        padding: 10,
        borderTop: '1px solid rgba(118, 75, 162, 0.3)',
        fontSize: 11,
        color: '#a0aec0',
        textAlign: 'center',
      }}>
        {Object.values(ICON_CATALOG).reduce((sum, cat) => sum + cat.icons.length, 0)} icônes disponibles
      </div>
    </div>
  );
}
