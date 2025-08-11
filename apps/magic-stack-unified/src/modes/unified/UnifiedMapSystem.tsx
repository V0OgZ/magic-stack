/**
 * 🎮 UNIFIED MAP SYSTEM
 * 
 * L'ÉDITEUR EST LE JEU !
 * Unifie world-editor, MapIconPlacer et SpatioTemporalMapEditor
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useUnifiedMapStore } from '../../shared/store/unifiedMapStore';
import type { EditorMode } from '../../shared/store/unifiedMapStore';

// Import dynamique des éditeurs existants
const MapIconPlacerV2 = lazy(() => import('../editor/MapIconPlacerV2').then(m => ({ default: m.default })));
const SpatioTemporalMapEditor = lazy(() => import('../../shared/components/SpatioTemporalMapEditor').then(m => ({ default: m.SpatioTemporalMapEditor })));

// Pour world-editor, on va créer un wrapper plus tard
import { StructureEditor } from './components/StructureEditor';
import { ModeSelector } from './components/ModeSelector';
import { ToolPalette } from './components/ToolPalette';
import { TimelineBar } from './components/TimelineBar';
import { PlayControls } from './components/PlayControls';
import { StatusBar } from './components/StatusBar';

export function UnifiedMapSystem(): React.ReactElement {
  const {
    mode,
    setMode,
    currentWorld,
    currentMap,
    temporal,
    showGrid,
    showRegions,
    showConnections,
    showTimeline,
    zoomLevel,
    newWorld,
    newMap,
    exportToFile,
    playMap,
    canPlayMap,
  } = useUnifiedMapStore();

  // Auto-create world/map si nécessaire
  useEffect(() => {
    if (!currentWorld) {
      newWorld('Nouveau Monde', 50, 50);
    }
  }, [currentWorld, newWorld]);

  useEffect(() => {
    if (currentWorld && !currentMap) {
      newMap('Nouvelle Map');
    }
  }, [currentWorld, currentMap, newMap]);

  // Rendu selon le mode
  const renderEditor = () => {
    switch (mode) {
      case 'structure':
        return <StructureEditor />;
      
      case 'resources':
        return (
          <Suspense fallback={<LoadingEditor />}>
            <MapIconPlacerWrapper />
          </Suspense>
        );
      
      case 'timeline':
        return (
          <Suspense fallback={<LoadingEditor />}>
            <TimelineWrapper />
          </Suspense>
        );
      
      case 'play':
        return <PlayMode />;
      
      case 'overlay':
        return <OverlayMode />;
      
      default:
        return <StructureEditor />;
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1d3a 100%)',
      color: 'white',
      overflow: 'hidden',
    }}>
      {/* Header avec sélecteur de mode */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        background: 'linear-gradient(180deg, rgba(20, 24, 36, 0.95) 0%, rgba(26, 31, 46, 0.9) 100%)',
        borderBottom: '2px solid rgba(102, 126, 234, 0.5)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <h1 style={{
            fontSize: 24,
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
          }}>
            🎮 Unified Map System
          </h1>
          
          <ModeSelector
            currentMode={mode}
            onModeChange={setMode}
          />
        </div>
        
        <div style={{ display: 'flex', gap: 10 }}>
          {/* Boutons d'action rapide */}
          <button
            onClick={() => newWorld('Nouveau Monde', 50, 50)}
            style={{
              padding: '8px 16px',
              background: 'rgba(102, 126, 234, 0.2)',
              border: '1px solid rgba(102, 126, 234, 0.5)',
              borderRadius: 8,
              color: 'white',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            🆕 Nouveau World
          </button>
          
          <button
            onClick={exportToFile}
            style={{
              padding: '8px 16px',
              background: 'rgba(102, 126, 234, 0.2)',
              border: '1px solid rgba(102, 126, 234, 0.5)',
              borderRadius: 8,
              color: 'white',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            💾 Export
          </button>
          
          {canPlayMap() && (
            <button
              onClick={playMap}
              style={{
                padding: '8px 20px',
                background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                border: 'none',
                borderRadius: 8,
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 14,
                boxShadow: '0 2px 8px rgba(72, 187, 120, 0.3)',
              }}
            >
              ▶️ PLAY THIS MAP
            </button>
          )}
        </div>
      </header>
      
      {/* Container principal avec palette et canvas */}
      <div style={{
        flex: 1,
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Palette d'outils à gauche */}
        {mode !== 'play' && (
          <ToolPalette mode={mode} />
        )}
        
        {/* Canvas principal */}
        <main style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {renderEditor()}
        </main>
        
        {/* Contrôles de jeu à droite (mode play) */}
        {mode === 'play' && (
          <PlayControls />
        )}
      </div>
      
      {/* Timeline en bas (si activée) */}
      {showTimeline && (
        <TimelineBar />
      )}
      
      {/* Status bar */}
      <StatusBar />
    </div>
  );
}

// ========== WRAPPERS POUR LES ÉDITEURS EXISTANTS ==========

function MapIconPlacerWrapper(): React.ReactElement {
  // Adapter MapIconPlacerV2 pour utiliser le store unifié
  const store = useUnifiedMapStore();
  
  // MapIconPlacerV2 a sa propre logique, on le wrap
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <MapIconPlacerV2 />
      {/* TODO: Synchroniser avec le store unifié */}
    </div>
  );
}

function TimelineWrapper(): React.ReactElement {
  const store = useUnifiedMapStore();
  
  return (
    <SpatioTemporalMapEditor
      mapWidth={store.currentWorld?.dimensions.width || 50}
      mapHeight={store.currentWorld?.dimensions.height || 50}
      currentDay={store.temporal.currentDay}
      onEventPlace={(event) => {
        // Adapter l'événement pour le store unifié
        store.addEvent({
          day: event.time,
          type: 'spawn',
          name: event.entity.name,
          description: `${event.entity.name} apparaît`,
          action: {
            spawn: [{
              id: event.id,
              type: event.entity.type as any,
              subtype: event.entity.id,
              emoji: event.entity.icon,
              name: event.entity.name,
              position_6d: {
                x: event.x,
                y: event.y,
                z: event.z || 0,
                t: event.time,
                c: 0,
                psi: 0,
              },
            }],
          },
        });
      }}
    />
  );
}

function PlayMode(): React.ReactElement {
  const { currentMap, currentWorld } = useUnifiedMapStore();
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1d3a 100%)',
    }}>
      <div style={{
        padding: 40,
        background: 'rgba(102, 126, 234, 0.1)',
        borderRadius: 20,
        border: '2px solid rgba(102, 126, 234, 0.5)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: 32,
          marginBottom: 20,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          🎮 Mode Jeu
        </h2>
        <p style={{ fontSize: 18, marginBottom: 10 }}>
          Map: {currentMap?.name}
        </p>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>
          World: {currentWorld?.name}
        </p>
        <p style={{ marginTop: 20, fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
          Le jeu se lance ici avec la map actuelle !
        </p>
      </div>
    </div>
  );
}

function OverlayMode(): React.ReactElement {
  // Mode overlay avec tous les éditeurs superposés
  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
    }}>
      {/* Structure en fond */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.5,
      }}>
        <StructureEditor />
      </div>
      
      {/* Resources par dessus */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.7,
        pointerEvents: 'none',
      }}>
        <Suspense fallback={null}>
          <MapIconPlacerWrapper />
        </Suspense>
      </div>
      
      {/* Timeline indicators */}
      <div style={{
        position: 'absolute',
        top: 10,
        right: 10,
        background: 'rgba(0,0,0,0.8)',
        padding: 15,
        borderRadius: 10,
        border: '1px solid rgba(102, 126, 234, 0.5)',
      }}>
        <h3 style={{ margin: 0, marginBottom: 10 }}>Mode Overlay</h3>
        <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
          Tous les layers visibles
        </p>
      </div>
    </div>
  );
}

function LoadingEditor(): React.ReactElement {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        fontSize: 24,
        color: 'rgba(255,255,255,0.5)',
      }}>
        Chargement...
      </div>
    </div>
  );
}
