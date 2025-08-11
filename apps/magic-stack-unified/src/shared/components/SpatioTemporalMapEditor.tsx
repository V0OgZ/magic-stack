/**
 * 🌌 Éditeur de Carte Spatio-Temporel 6D
 * 
 * Place des événements dans l'espace ET le temps
 * Gère les 6 dimensions : x, y, z, temps, probabilité, causalité
 */

import React, { useState, useEffect, useRef } from 'react';
import { HEROES } from '../../data/heroes';
import { CREATURES } from '../../data/creatures';
import { ARTIFACTS } from '../../data/artifacts';
import { ICON_MAP } from '../icons/iconMapping';

interface TemporalEvent {
  id: string;
  x: number;
  y: number;
  z?: number; // Altitude/profondeur
  time: number; // Jour/tour d'apparition
  entity: {
    type: 'hero' | 'creature' | 'artifact' | 'resource' | 'building';
    id: string;
    icon: string;
    name: string;
  };
  cycle?: {
    enabled: boolean;
    interval: number; // Réapparaît tous les X jours
    probability?: number; // Probabilité de réapparition
  };
  causality?: {
    triggers?: string[]; // IDs d'événements déclencheurs
    consequences?: string[]; // IDs d'événements conséquences
  };
}

interface Props {
  mapWidth?: number;
  mapHeight?: number;
  currentDay?: number;
  onEventPlace?: (event: TemporalEvent) => void;
}

export function SpatioTemporalMapEditor({
  mapWidth = 20,
  mapHeight = 20,
  currentDay = 1,
  onEventPlace
}: Props): React.ReactElement {
  const [events, setEvents] = useState<TemporalEvent[]>([]);
  const [selectedTool, setSelectedTool] = useState<'hero' | 'creature' | 'artifact' | 'resource' | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [timelineDay, setTimelineDay] = useState(currentDay);
  const [viewMode, setViewMode] = useState<'spatial' | 'temporal' | 'causal'>('spatial');
  const [showLayers, setShowLayers] = useState({
    past: false,
    present: true,
    future: true
  });
  const [draggedEntity, setDraggedEntity] = useState<any>(null);
  const [hoveredCell, setHoveredCell] = useState<{x: number, y: number} | null>(null);
  
  // Référence pour le canvas de la map
  const mapCanvasRef = useRef<HTMLDivElement>(null);

  // Placer un événement spatio-temporel
  const placeEvent = (x: number, y: number, entity?: any) => {
    const entityToPlace = entity || selectedEntity;
    if (!entityToPlace) return;
    
    const newEvent: TemporalEvent = {
      id: `event_${Date.now()}`,
      x,
      y,
      time: timelineDay,
      entity: {
        type: selectedTool || 'resource',
        id: entityToPlace.id,
        icon: entityToPlace.icon_id || entityToPlace.icon || '❓',
        name: entityToPlace.name
      },
      cycle: {
        enabled: false,
        interval: 7,
        probability: 1.0
      }
    };
    
    setEvents([...events, newEvent]);
    onEventPlace?.(newEvent);
    
    // Notifier le backend
    console.log(`📡 Événement placé: ${entityToPlace.name} au jour ${timelineDay} en (${x}, ${y})`);
  };

  // Gestion du drag & drop
  const handleDragStart = (e: React.DragEvent, entity: any, type: string) => {
    setDraggedEntity({ ...entity, type });
    setSelectedTool(type as any);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent, x: number, y: number) => {
    e.preventDefault();
    if (draggedEntity) {
      placeEvent(x, y, draggedEntity);
      setDraggedEntity(null);
    }
  };

  const handleCellHover = (x: number, y: number) => {
    setHoveredCell({ x, y });
  };

  // Filtrer les événements visibles selon le jour actuel
  const getVisibleEvents = () => {
    return events.filter(event => {
      if (viewMode === 'temporal') {
        // Vue timeline : tous les événements
        return true;
      }
      
      // Vue spatiale : selon les couches activées
      if (event.time < timelineDay && showLayers.past) return true;
      if (event.time === timelineDay && showLayers.present) return true;
      if (event.time > timelineDay && showLayers.future) return true;
      
      // Vérifier les cycles de réapparition
      if (event.cycle?.enabled) {
        const daysSinceFirst = timelineDay - event.time;
        if (daysSinceFirst > 0 && daysSinceFirst % event.cycle.interval === 0) {
          return showLayers.present;
        }
      }
      
      return false;
    });
  };

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      width: '100%',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1d3a 100%)',
    }}>
      {/* Panneau gauche - Palette d'entités */}
      <div style={{
        width: 320,
        background: 'linear-gradient(180deg, #1a1a2e, #16213e)',
        padding: 20,
        overflowY: 'auto',
        borderRight: '3px solid #764ba2',
        boxShadow: '5px 0 20px rgba(0,0,0,0.5)',
      }}>
        <h2 style={{
          fontSize: '1.8em',
          marginBottom: 20,
          textAlign: 'center',
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          🌌 Éditeur Spatio-Temporel
        </h2>

        {/* Contrôles temporels */}
        <div style={{
          background: 'rgba(15, 52, 96, 0.5)',
          borderRadius: 10,
          padding: 15,
          marginBottom: 20,
        }}>
          <h3 style={{ marginBottom: 10 }}>⏳ Timeline</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => setTimelineDay(Math.max(1, timelineDay - 1))}>◀</button>
            <input
              type="range"
              min="1"
              max="100"
              value={timelineDay}
              onChange={(e) => setTimelineDay(Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <button onClick={() => setTimelineDay(timelineDay + 1)}>▶</button>
          </div>
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            Jour {timelineDay}
          </div>
        </div>

        {/* Mode de vue */}
        <div style={{
          display: 'flex',
          gap: 5,
          marginBottom: 20,
        }}>
          <button
            onClick={() => setViewMode('spatial')}
            style={{
              flex: 1,
              padding: 10,
              background: viewMode === 'spatial' ? '#667eea' : '#0f3460',
              border: 'none',
              borderRadius: 5,
              color: 'white',
              cursor: 'pointer',
            }}
          >
            🗺️ Spatial
          </button>
          <button
            onClick={() => setViewMode('temporal')}
            style={{
              flex: 1,
              padding: 10,
              background: viewMode === 'temporal' ? '#667eea' : '#0f3460',
              border: 'none',
              borderRadius: 5,
              color: 'white',
              cursor: 'pointer',
            }}
          >
            📅 Temporel
          </button>
          <button
            onClick={() => setViewMode('causal')}
            style={{
              flex: 1,
              padding: 10,
              background: viewMode === 'causal' ? '#667eea' : '#0f3460',
              border: 'none',
              borderRadius: 5,
              color: 'white',
              cursor: 'pointer',
            }}
          >
            🔀 Causal
          </button>
        </div>

        {/* Couches temporelles */}
        <div style={{
          background: 'rgba(15, 52, 96, 0.3)',
          borderRadius: 10,
          padding: 10,
          marginBottom: 20,
        }}>
          <h4 style={{ marginBottom: 10 }}>👁️ Couches visibles</h4>
          <label style={{ display: 'block', marginBottom: 5 }}>
            <input
              type="checkbox"
              checked={showLayers.past}
              onChange={(e) => setShowLayers({...showLayers, past: e.target.checked})}
            />
            🕐 Passé (transparent)
          </label>
          <label style={{ display: 'block', marginBottom: 5 }}>
            <input
              type="checkbox"
              checked={showLayers.present}
              onChange={(e) => setShowLayers({...showLayers, present: e.target.checked})}
            />
            ⏰ Présent (opaque)
          </label>
          <label style={{ display: 'block' }}>
            <input
              type="checkbox"
              checked={showLayers.future}
              onChange={(e) => setShowLayers({...showLayers, future: e.target.checked})}
            />
            🔮 Futur (contours)
          </label>
        </div>

        {/* Palette d'entités */}
        <div>
          {/* Héros */}
          <div style={{
            marginBottom: 20,
            background: 'rgba(15, 52, 96, 0.3)',
            borderRadius: 10,
            padding: 10,
          }}>
            <h3 
              onClick={() => setSelectedTool(selectedTool === 'hero' ? null : 'hero')}
              style={{
                cursor: 'pointer',
                padding: 10,
                background: selectedTool === 'hero' ? '#667eea' : '#0f3460',
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              👑 Héros
            </h3>
            {selectedTool === 'hero' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 8,
              }}>
                {Object.values(HEROES).slice(0, 8).map(hero => (
                  <div
                    key={hero.id}
                    onClick={() => setSelectedEntity(hero)}
                    style={{
                      width: 60,
                      height: 60,
                      background: selectedEntity?.id === hero.id 
                        ? 'linear-gradient(135deg, #2e7d32, #4CAF50)'
                        : 'linear-gradient(135deg, #0f3460, #16213e)',
                      border: '2px solid transparent',
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 28,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    title={hero.name}
                  >
                    {hero.icon_id}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Créatures */}
          <div style={{
            marginBottom: 20,
            background: 'rgba(15, 52, 96, 0.3)',
            borderRadius: 10,
            padding: 10,
          }}>
            <h3
              onClick={() => setSelectedTool(selectedTool === 'creature' ? null : 'creature')}
              style={{
                cursor: 'pointer',
                padding: 10,
                background: selectedTool === 'creature' ? '#667eea' : '#0f3460',
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              🐉 Créatures
            </h3>
            {selectedTool === 'creature' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 8,
              }}>
                {Object.values(CREATURES).slice(0, 8).map(creature => (
                  <div
                    key={creature.id}
                    onClick={() => setSelectedEntity(creature)}
                    style={{
                      width: 60,
                      height: 60,
                      background: selectedEntity?.id === creature.id
                        ? 'linear-gradient(135deg, #2e7d32, #4CAF50)'
                        : 'linear-gradient(135deg, #0f3460, #16213e)',
                      border: '2px solid transparent',
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 28,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                    title={creature.name}
                  >
                    {creature.icon_id}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Zone centrale - Map spatio-temporelle */}
      <div style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {viewMode === 'spatial' && (
          <div
            ref={mapCanvasRef}
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              background: 'radial-gradient(circle at center, #0f3460, #0a1929)',
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 49px,
                  rgba(102, 126, 234, 0.1) 49px,
                  rgba(102, 126, 234, 0.1) 50px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 49px,
                  rgba(118, 75, 162, 0.1) 49px,
                  rgba(118, 75, 162, 0.1) 50px
                )
              `,
              cursor: selectedEntity ? 'crosshair' : 'default',
            }}
            onClick={(e) => {
              if (!selectedEntity) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.floor((e.clientX - rect.left) / 50);
              const y = Math.floor((e.clientY - rect.top) / 50);
              placeEvent(x, y);
            }}
          >
            {/* Affichage des événements */}
            {getVisibleEvents().map(event => {
              const opacity = event.time < timelineDay ? 0.3 :
                            event.time === timelineDay ? 1 :
                            0.6;
              const border = event.time > timelineDay ? '2px dashed rgba(255,255,255,0.5)' : 'none';
              
              return (
                <div
                  key={event.id}
                  style={{
                    position: 'absolute',
                    left: event.x * 50,
                    top: event.y * 50,
                    width: 50,
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 32,
                    opacity,
                    border,
                    borderRadius: 8,
                    background: event.time === timelineDay 
                      ? 'radial-gradient(circle, rgba(102,126,234,0.3), transparent)'
                      : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  title={`${event.entity.name} - Jour ${event.time}${event.cycle?.enabled ? ` (cycle: ${event.cycle.interval}j)` : ''}`}
                >
                  {event.entity.icon}
                  {event.cycle?.enabled && (
                    <span style={{
                      position: 'absolute',
                      top: -5,
                      right: -5,
                      fontSize: 12,
                      background: '#4CAF50',
                      borderRadius: '50%',
                      width: 16,
                      height: 16,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      ♻️
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {viewMode === 'temporal' && (
          <div style={{
            padding: 20,
            height: '100%',
            overflowY: 'auto',
          }}>
            <h2 style={{ marginBottom: 20 }}>📅 Vue Timeline</h2>
            {/* Timeline horizontale */}
            <div style={{
              display: 'flex',
              gap: 10,
              overflowX: 'auto',
              paddingBottom: 20,
            }}>
              {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
                const dayEvents = events.filter(e => e.time === day);
                return (
                  <div
                    key={day}
                    style={{
                      minWidth: 100,
                      padding: 10,
                      background: day === timelineDay ? '#667eea' : '#0f3460',
                      borderRadius: 8,
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: 10 }}>
                      Jour {day}
                    </div>
                    {dayEvents.map(event => (
                      <div key={event.id} style={{ fontSize: 24, marginBottom: 5 }}>
                        {event.entity.icon}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {viewMode === 'causal' && (
          <div style={{
            padding: 20,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              textAlign: 'center',
              padding: 40,
              background: 'rgba(20, 24, 36, 0.8)',
              borderRadius: 16,
              backdropFilter: 'blur(10px)',
            }}>
              <h2 style={{ marginBottom: 20 }}>🔀 Vue Causale</h2>
              <p style={{ color: '#a0aec0' }}>
                Visualisation des liens de causalité entre événements
              </p>
              <p style={{ marginTop: 20, fontSize: 48 }}>🚧</p>
              <p style={{ color: '#667eea' }}>En construction</p>
            </div>
          </div>
        )}

        {/* Info panel */}
        <div style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: 'rgba(20, 24, 36, 0.95)',
          padding: 15,
          borderRadius: 10,
          border: '1px solid #667eea',
          minWidth: 200,
        }}>
          <h4 style={{ marginBottom: 10 }}>📊 Statistiques</h4>
          <div style={{ fontSize: 14, color: '#a0aec0' }}>
            <div>📅 Jour actuel: {timelineDay}</div>
            <div>📍 Événements: {events.length}</div>
            <div>♻️ Cycliques: {events.filter(e => e.cycle?.enabled).length}</div>
            <div>🎯 Sélection: {selectedEntity?.name || 'Aucune'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
