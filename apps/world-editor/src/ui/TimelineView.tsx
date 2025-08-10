import React from 'react';
import { useEditorStore } from '../state/useEditorStore';

export function TimelineView(): React.ReactElement {
  const events = useEditorStore((s) => s.scenario.events);
  const addEvent = useEditorStore((s) => s.addEvent);
  const updateEvent = useEditorStore((s) => s.updateEvent);
  const removeEvent = useEditorStore((s) => s.removeEvent);

  const [newDay, setNewDay] = React.useState(1);
  const [newType, setNewType] = React.useState('custom');

  return (
    <div style={{ height: 'calc(100vh - 120px)', padding: 16, color: '#e8ecff' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input type="number" value={newDay} min={1} onChange={(e) => setNewDay(parseInt(e.target.value || '1', 10))} />
        <input value={newType} onChange={(e) => setNewType(e.target.value)} />
        <button onClick={() => addEvent({ day: newDay, type: newType })}>+ Add Event</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px', gap: 8 }}>
        <div style={{ fontWeight: 700 }}>Day</div>
        <div style={{ fontWeight: 700 }}>Type</div>
        <div style={{ fontWeight: 700 }}>Actions</div>
        {events.map((ev) => (
          <React.Fragment key={ev.id}>
            <input
              type="number"
              value={ev.day}
              min={1}
              onChange={(e) => updateEvent(ev.id, { day: parseInt(e.target.value || '1', 10) })}
            />
            <input value={ev.type} onChange={(e) => updateEvent(ev.id, { type: e.target.value })} />
            <div>
              <button onClick={() => removeEvent(ev.id)}>Remove</button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}


