import React from 'react';
import { useEditorStore } from '../state/useEditorStore';

export function TimelineView(): React.ReactElement {
  const events = useEditorStore((s) => s.scenario.events);
  const addEvent = useEditorStore((s) => s.addEvent);
  const updateEvent = useEditorStore((s) => s.updateEvent);
  const removeEvent = useEditorStore((s) => s.removeEvent);

  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newEvent, setNewEvent] = React.useState({
    day: 1,
    type: 'temporal_shift',
    name: '',
    description: '',
  });

  const eventTypes = [
    { value: 'temporal_shift', label: '⏰ Décalage Temporel', color: '#667eea' },
    { value: 'paradox', label: '⚡ Paradoxe', color: '#fc8181' },
    { value: 'regulator', label: '🎛️ Régulateur', color: '#48bb78' },
    { value: 'story', label: '📖 Histoire', color: '#f6ad55' },
    { value: 'combat', label: '⚔️ Combat', color: '#ed64a6' },
    { value: 'discovery', label: '🔍 Découverte', color: '#38b2ac' },
    { value: 'jour_30', label: '🌟 Jour 30', color: '#ffd700' },
  ];

  const handleAddEvent = () => {
    addEvent({
      ...newEvent,
      id: `event-${Date.now()}`,
    });
    setNewEvent({ day: 1, type: 'temporal_shift', name: '', description: '' });
    setShowAddForm(false);
  };

  const getEventIcon = (type: string) => {
    const eventType = eventTypes.find(et => et.value === type);
    return eventType?.label.split(' ')[0] || '📌';
  };

  const getEventColor = (type: string) => {
    const eventType = eventTypes.find(et => et.value === type);
    return eventType?.color || '#667eea';
  };

  return (
    <div style={{ 
      height: 'calc(100vh - 120px)', 
      padding: 20, 
      color: '#e8ecff',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 16,
        borderBottom: '1px solid var(--border-primary)',
      }}>
        <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>
          📅 Timeline des Événements
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 14,
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          ✨ Ajouter Événement
        </button>
      </div>

      {/* Add Event Form */}
      {showAddForm && (
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-secondary)',
          borderRadius: 12,
          padding: 20,
          marginBottom: 20,
        }}>
          <h3 style={{ margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
            Nouvel Événement
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                Jour
              </label>
              <input
                type="number"
                min={0}
                max={365}
                value={newEvent.day}
                onChange={(e) => setNewEvent({ ...newEvent, day: parseInt(e.target.value || '1', 10) })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 6,
                  color: 'var(--text-primary)',
                  fontSize: 14,
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                Type
              </label>
              <select
                value={newEvent.type}
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 6,
                  color: 'var(--text-primary)',
                  fontSize: 14,
                }}
              >
                {eventTypes.map(et => (
                  <option key={et.value} value={et.value}>{et.label}</option>
                ))}
              </select>
            </div>
            
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                Nom
              </label>
              <input
                type="text"
                placeholder="Nom de l'événement..."
                value={newEvent.name}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 6,
                  color: 'var(--text-primary)',
                  fontSize: 14,
                }}
              />
            </div>
            
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                Description
              </label>
              <textarea
                placeholder="Description de l'événement..."
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                rows={3}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 6,
                  color: 'var(--text-primary)',
                  fontSize: 14,
                  resize: 'vertical',
                }}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button
              onClick={handleAddEvent}
              style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #48bb78 0%, #38b2ac 100%)',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              ✅ Ajouter
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              style={{
                padding: '8px 16px',
                background: 'var(--bg-secondary)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Events List */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {events.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: 40,
            color: 'var(--text-muted)',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
            <div>Aucun événement</div>
            <div style={{ fontSize: 12, marginTop: 8 }}>
              Clique sur "Ajouter Événement" pour commencer
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {events
              .sort((a, b) => a.day - b.day)
              .map((event) => (
                <div
                  key={event.id}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-primary)',
                    borderLeft: `4px solid ${getEventColor(event.type)}`,
                    borderRadius: 8,
                    padding: 16,
                    display: 'grid',
                    gridTemplateColumns: '60px 40px 1fr auto',
                    gap: 16,
                    alignItems: 'center',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}>
                    <span style={{ fontSize: 24 }}>{getEventIcon(event.type)}</span>
                    <span style={{
                      background: 'var(--bg-primary)',
                      padding: '4px 8px',
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 600,
                      color: getEventColor(event.type),
                    }}>
                      Jour {event.day}
                    </span>
                  </div>
                  
                  <div>
                    <input
                      type="number"
                      min={0}
                      max={365}
                      value={event.day}
                      onChange={(e) => updateEvent(event.id, { day: parseInt(e.target.value || '1', 10) })}
                      style={{
                        width: 50,
                        padding: '4px 8px',
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-primary)',
                        borderRadius: 4,
                        color: 'var(--text-primary)',
                        fontSize: 12,
                      }}
                    />
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      value={event.name || event.type}
                      onChange={(e) => updateEvent(event.id, { name: e.target.value })}
                      placeholder="Nom de l'événement..."
                      style={{
                        width: '100%',
                        padding: '6px 10px',
                        background: 'transparent',
                        border: '1px solid transparent',
                        borderRadius: 4,
                        color: 'var(--text-primary)',
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = 'var(--border-primary)'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'transparent'}
                    />
                    {event.description && (
                      <div style={{
                        fontSize: 12,
                        color: 'var(--text-muted)',
                        marginTop: 4,
                      }}>
                        {event.description}
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => removeEvent(event.id)}
                    style={{
                      width: 32,
                      height: 32,
                      background: 'rgba(252, 129, 129, 0.1)',
                      border: '1px solid rgba(252, 129, 129, 0.3)',
                      borderRadius: 6,
                      color: '#fc8181',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(252, 129, 129, 0.2)';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(252, 129, 129, 0.1)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}