import { ScenarioSchema, type Scenario } from './schema';

type LegacyHsc = {
  id?: string;
  slug?: string;
  name?: string;
  data?: any;
};

export function importLegacyHsc(jsonText: string): Scenario {
  const legacy = JSON.parse(jsonText) as LegacyHsc;
  const info = legacy.data?.scenario_info ?? {};
  const map = legacy.data?.game_settings?.map ?? {};
  const specialZones: Array<any> = map.special_zones ?? [];
  const narrative = legacy.data?.narrative ?? {};
  const turns: Array<any> = legacy.data?.turn_sequence ?? [];

  const id = (info.id || legacy.slug || legacy.id || 'legacy-import').toString();
  const difficulty = String(info.difficulty || 'normal').toLowerCase();

  const scenario: Scenario = ScenarioSchema.parse({
    id,
    version: '2.0',
    metadata: {
      name: info.name || legacy.name || id,
      description: narrative?.intro || narrative?.setting || '',
      difficulty: ['easy', 'normal', 'hard', 'nightmare'].includes(difficulty)
        ? (difficulty as any)
        : 'normal',
      duration: info.estimated_duration || '25 jours',
    },
    initial_state: { day: 1, tw: 0, te: 0, resources: { crystals: 0, energy: 0, temporal: 0, quantum: 0 } },
    map: {
      size: { x: Number(map.width) || 60, y: Number(map.height) || 60 },
      terrain: [],
      objects: specialZones.map((z: any) => ({ kind: z.type || 'zone', x: z.x ?? 0, y: z.y ?? 0, data: { effect: z.effect, radius: z.radius, type: z.type } })),
    },
    regulators: { vince: { active: true, zone: '' }, anna: { decay: 5, zone: '' }, overload: { stack: 0, maxStack: 10 } },
    victory_conditions: (legacy.data?.game_settings?.victory_conditions || []).map((v: any) => ({ type: 'text', params: { description: v } })),
    events: turns.flatMap((t: any) =>
      (t.events || []).map((e: any, idx: number) => ({ id: `ev-${t.turn}-${idx}`, day: Number(t.turn) || 1, type: e.type || 'event', payload: e }))
    ),
  });

  return scenario;
}


