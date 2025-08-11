/**
 * ⏳ TIMELINE BAR
 * Barre de timeline pour naviguer dans le temps
 */

import React from 'react';
import { useUnifiedMapStore } from '../../../shared/store/unifiedMapStore';

export function TimelineBar(): React.ReactElement {
  const {
    temporal,
    setCurrentDay,
    currentMap,
    simulationRunning,
    startSimulation,
    stopSimulation,
  } = useUnifiedMapStore();

  const maxDays = currentMap?.timeline.maxDays || 100;
  const events = currentMap?.timeline.events || [];

  // Trouver les événements pour chaque jour
  const getEventsForDay = (day: number) => {
    return events.filter(e => e.day === day);
  };

  return (
    <div style={{
      height: 120,
      background: 'linear-gradient(180deg, rgba(26, 31, 46, 0.95) 0%, rgba(20, 24, 36, 0.9) 100%)',
      borderTop: '2px solid rgba(102, 126, 234, 0.3)',
      padding: '10px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      {/* Contrôles temporels */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 15,
      }}>
        <h3 style={{
          margin: 0,
          fontSize: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          ⏳ Timeline
        </h3>
        
        <button
          onClick={() => simulationRunning ? stopSimulation() : startSimulation()}
          style={{
            padding: '6px 12px',
            background: simulationRunning
              ? 'linear-gradient(135deg, #f56565, #e53e3e)'
              : 'linear-gradient(135deg, #48bb78, #38a169)',
            border: 'none',
            borderRadius: 6,
            color: 'white',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 'bold',
          }}
        >
          {simulationRunning ? '⏸ Pause' : '▶️ Play'}
        </button>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginLeft: 'auto',
        }}>
          <span style={{ fontSize: 14 }}>Jour {temporal.currentDay} / {maxDays}</span>
          <div style={{
            display: 'flex',
            gap: 5,
          }}>
            <button
              onClick={() => setCurrentDay(Math.max(1, temporal.currentDay - 1))}
              style={{
                padding: '4px 8px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 4,
                color: 'white',
                cursor: 'pointer',
                fontSize: 16,
              }}
            >
              ◀
            </button>
            <button
              onClick={() => setCurrentDay(Math.min(maxDays, temporal.currentDay + 1))}
              style={{
                padding: '4px 8px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 4,
                color: 'white',
                cursor: 'pointer',
                fontSize: 16,
              }}
            >
              ▶
            </button>
          </div>
        </div>
      </div>
      
      {/* Barre de progression */}
      <div style={{
        position: 'relative',
        height: 40,
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 8,
        overflow: 'hidden',
      }}>
        {/* Marqueurs d'événements */}
        {events.map(event => {
          const position = (event.day / maxDays) * 100;
          return (
            <div
              key={event.id}
              title={`Jour ${event.day}: ${event.name}`}
              style={{
                position: 'absolute',
                left: `${position}%`,
                top: 0,
                width: 2,
                height: '100%',
                background: 'linear-gradient(180deg, transparent, #fbbf24, transparent)',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentDay(event.day)}
            />
          )}
        )}
        
        {/* Curseur actuel */}
        <div
          style={{
            position: 'absolute',
            left: `${(temporal.currentDay / maxDays) * 100}%`,
            top: -5,
            width: 4,
            height: 50,
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(102, 126, 234, 0.5)',
            transform: 'translateX(-50%)',
          }}
        />
        
        {/* Slider interactif */}
        <input
          type="range"
          min="1"
          max={maxDays}
          value={temporal.currentDay}
          onChange={(e) => setCurrentDay(Number(e.target.value))}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
          }}
        />
      </div>
      
      {/* Infos temporelles */}
      <div style={{
        display: 'flex',
        gap: 20,
        fontSize: 11,
        color: 'rgba(255, 255, 255, 0.7)',
      }}>
        <span>TW: {temporal.tw.toFixed(1)}</span>
        <span>TE: {temporal.te.toFixed(1)}</span>
        <span>Dérive: {temporal.drift.toFixed(2)}</span>
        <span>Dette: {temporal.debt.toFixed(2)}</span>
        <span>Événements aujourd'hui: {getEventsForDay(temporal.currentDay).length}</span>
      </div>
    </div>
  );
}
