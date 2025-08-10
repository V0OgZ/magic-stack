import { create } from 'zustand';
import { ScenarioSchema, type Scenario } from '../domain/schema';

type EditorState = {
  scenario: Scenario;
  selected: { x: number; y: number } | null;
  setSelected: (x: number, y: number) => void;
  addObjectAt: (x: number, y: number, kind: string, data?: Record<string, unknown>) => void;
  addJour30Event: () => void;
  setScenario: (s: Scenario) => void;
};

export const useEditorStore = create<EditorState>((set, get) => ({
  scenario: ScenarioSchema.parse({
    id: 'scenario-dev',
    version: '2.0',
    metadata: { name: 'Dev World', description: '', difficulty: 'normal', duration: '25 jours' },
    initial_state: { day: 1, tw: 0, te: 0, resources: { crystals: 100, energy: 50, temporal: 25, quantum: 10 } },
    map: { size: { x: 60, y: 60 }, terrain: [], objects: [] },
    regulators: { vince: { active: true, zone: '' }, anna: { decay: 5, zone: '' }, overload: { stack: 0, maxStack: 10 } },
    victory_conditions: [],
    events: [],
  }),
  selected: null,
  setSelected: (x, y) => set({ selected: { x, y } }),
  addObjectAt: (x, y, kind, data) => {
    const s = get().scenario;
    const obj = { kind, x, y, data: data ?? {} } as any;
    set({ scenario: { ...s, map: { ...s.map, objects: [...s.map.objects, obj] } } });
  },
  addJour30Event: () => {
    const s = get().scenario;
    const evt = {
      id: `event-${s.events.length + 1}`,
      day: 30,
      type: 'day30_apocalypse',
      payload: {
        merge_timelines: true,
        pvp_portals: true,
        regulators: ['VINCE_OMEGA', 'ANNA_SUPREME', 'OVERLOAD_INFINITY'],
      },
    };
    set({ scenario: { ...s, events: [...s.events, evt] } });
  },
  setScenario: (sc) => set({ scenario: ScenarioSchema.parse(sc) }),
}));


