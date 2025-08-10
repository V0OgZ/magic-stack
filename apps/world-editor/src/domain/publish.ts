import type { Scenario } from './schema';
import { RUST_API } from '../config/endpoints';

export async function publishScenarioToRust(s: Scenario): Promise<void> {
  // 1) Optional: generate map server-side (fallback client already has dimensions)
  try {
    await fetch(RUST_API.mapGenerate, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ width: s.map.size.x, height: s.map.size.y, seed: s.metadata.name || s.id }),
    });
  } catch {}

  // 2) Initialize entities/objects from scenario map
  const initPayload = {
    size: s.map.size,
    objects: s.map.objects,
    regulators: s.regulators,
    initial_state: s.initial_state,
    metadata: s.metadata,
  };

  await fetch(RUST_API.mapInit, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(initPayload),
  });

  // 3) (Optional) send events to a future /api/scenarios endpoint if present
  try {
    await fetch(RUST_API.scenariosImport, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: s.id, events: s.events, victory: s.victory_conditions }),
    });
  } catch {}
}


