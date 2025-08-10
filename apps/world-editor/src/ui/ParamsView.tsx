import React from 'react';
import { ScenarioSchema, type Scenario } from '../domain/schema';
import { exportScenarioToJson, importScenarioFromJson } from '../domain/importExport';
import { importLegacyHsc } from '../domain/importLegacy';
import { publishScenarioToRust } from '../domain/publish';

export function ParamsView(): React.ReactElement {
  const [scenario, setScenario] = React.useState<Scenario>(() => ScenarioSchema.parse({
    id: 'scenario-dev',
    version: '2.0',
    metadata: { name: 'Dev World', description: '', difficulty: 'normal', duration: '25 jours' },
    initial_state: { day: 1, tw: 0, te: 0, resources: { crystals: 100, energy: 50, temporal: 25, quantum: 10 } },
    map: { size: { x: 60, y: 60 }, terrain: [], objects: [] },
    regulators: { vince: { active: true, zone: '' }, anna: { decay: 5, zone: '' }, overload: { stack: 0, maxStack: 10 } },
    victory_conditions: [],
    events: [],
  }));

  const onExport = () => {
    const text = exportScenarioToJson(scenario);
    const blob = new Blob([text], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${scenario.id}.json`;
    a.click();
  };

  const onPublish = async () => {
    await publishScenarioToRust(scenario).catch(() => {});
    alert('Publié vers backend Rust (si dispo)');
  };

  const onImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    file
      .text()
      .then((t) => {
        try {
          setScenario(importScenarioFromJson(t));
        } catch {
          setScenario(importLegacyHsc(t));
        }
      })
      .catch(() => {});
  };

  return (
    <div style={{ height: 'calc(100vh - 120px)', padding: 16, color: '#e8ecff' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={onExport}>Exporter JSON</button>
        <label style={{ display: 'inline-block' }}>
          <span style={{ border: '1px solid #335', padding: '6px 10px', borderRadius: 8, cursor: 'pointer' }}>Importer JSON</span>
          <input type="file" accept="application/json" style={{ display: 'none' }} onChange={onImport} />
        </label>
        <button onClick={onPublish}>Publier → Backend</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <h3>Métadonnées</h3>
          <div>
            <label>Nom<br />
              <input value={scenario.metadata.name} onChange={e => setScenario({ ...scenario, metadata: { ...scenario.metadata, name: e.target.value } })} />
            </label>
          </div>
          <div>
            <label>Description<br />
              <input value={scenario.metadata.description} onChange={e => setScenario({ ...scenario, metadata: { ...scenario.metadata, description: e.target.value } })} />
            </label>
          </div>
          <div>
            <label>Difficulty<br />
              <select value={scenario.metadata.difficulty} onChange={e => setScenario({ ...scenario, metadata: { ...scenario.metadata, difficulty: e.target.value as any } })}>
                <option value="easy">easy</option>
                <option value="normal">normal</option>
                <option value="hard">hard</option>
                <option value="nightmare">nightmare</option>
              </select>
            </label>
          </div>
        </div>

        <div>
          <h3>Taille de carte</h3>
          <div>
            <label>X<br />
              <input type="number" value={scenario.map.size.x} onChange={e => setScenario({ ...scenario, map: { ...scenario.map, size: { ...scenario.map.size, x: parseInt(e.target.value || '0', 10) } } })} />
            </label>
          </div>
          <div>
            <label>Y<br />
              <input type="number" value={scenario.map.size.y} onChange={e => setScenario({ ...scenario, map: { ...scenario.map, size: { ...scenario.map.size, y: parseInt(e.target.value || '0', 10) } } })} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}


