import { create } from 'zustand';
import { ScenarioSchema, type Scenario } from '../domain/schema';

type EditorState = {
  scenario: Scenario;
  selected: { x: number; y: number } | null;
  setSelected: (x: number, y: number) => void;
  addObjectAt: (x: number, y: number, kind: string, data?: Record<string, unknown>) => void;
  addJour30Event: () => void;
  setScenario: (s: Scenario) => void;
  addEvent: (e: { day: number; type: string; payload?: Record<string, unknown> }) => void;
  updateEvent: (id: string, patch: Partial<{ day: number; type: string; payload: Record<string, unknown> }>) => void;
  removeEvent: (id: string) => void;
  // Terrain editing
  terrainGrid: string[][]; // terrainGrid[y][x] = 'grass' | 'forest' | ...
  ensureTerrainGrid: (width: number, height: number) => void;
  getTerrainAt: (x: number, y: number) => string | null;
  setTerrainAt: (x: number, y: number, kind: string) => void;
  brushTerrain: string;
  brushSize: number; // 1,3,5
  setBrushTerrain: (kind: string) => void;
  setBrushSize: (n: number) => void;
  paintAt: (x: number, y: number) => void;
  // Undo/redo for terrain
  undoStack: Array<Array<{ x: number; y: number; prev: string; next: string }>>;
  redoStack: Array<Array<{ x: number; y: number; prev: string; next: string }>>;
  undo: () => void;
  redo: () => void;
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
  terrainGrid: Array.from({ length: 60 }, () => Array.from({ length: 60 }, () => 'grass')),
  brushTerrain: 'grass',
  brushSize: 1,
  undoStack: [],
  redoStack: [],
  ensureTerrainGrid: (width, height) => {
    const g = get().terrainGrid;
    const currentH = g.length;
    const currentW = currentH > 0 ? g[0].length : 0;
    if (currentW === width && currentH === height) return;
    const newGrid = Array.from({ length: height }, (_, y) =>
      Array.from({ length: width }, (_, x) => (g[y]?.[x] ?? 'grass'))
    );
    set({ terrainGrid: newGrid });
  },
  getTerrainAt: (x, y) => {
    const g = get().terrainGrid;
    return g[y]?.[x] ?? null;
  },
  setTerrainAt: (x, y, kind) => {
    const g = get().terrainGrid.map((row) => row.slice());
    if (g[y] && typeof g[y][x] !== 'undefined') {
      g[y][x] = kind;
      set({ terrainGrid: g });
    }
  },
  setBrushTerrain: (kind) => set({ brushTerrain: kind }),
  setBrushSize: (n) => set({ brushSize: Math.max(1, Math.min(9, n)) }),
  paintAt: (cx, cy) => {
    const s = get();
    const changes: Array<{ x: number; y: number; prev: string; next: string }> = [];
    const r = Math.floor(s.brushSize / 2);
    const g = s.terrainGrid.map((row) => row.slice());
    for (let y = cy - r; y <= cy + r; y++) {
      for (let x = cx - r; x <= cx + r; x++) {
        if (y < 0 || x < 0 || y >= g.length || x >= g[0].length) continue;
        const prev = g[y][x];
        const next = s.brushTerrain;
        if (prev !== next) {
          g[y][x] = next;
          changes.push({ x, y, prev, next });
        }
      }
    }
    if (changes.length) {
      set({ terrainGrid: g, undoStack: [...s.undoStack, changes], redoStack: [] });
    }
  },
  undo: () => {
    const s = get();
    const last = s.undoStack[s.undoStack.length - 1];
    if (!last) return;
    const g = s.terrainGrid.map((row) => row.slice());
    for (const c of last) {
      g[c.y][c.x] = c.prev;
    }
    set({ terrainGrid: g, undoStack: s.undoStack.slice(0, -1), redoStack: [...s.redoStack, last] });
  },
  redo: () => {
    const s = get();
    const last = s.redoStack[s.redoStack.length - 1];
    if (!last) return;
    const g = s.terrainGrid.map((row) => row.slice());
    for (const c of last) {
      g[c.y][c.x] = c.next;
    }
    set({ terrainGrid: g, redoStack: s.redoStack.slice(0, -1), undoStack: [...s.undoStack, last] });
  },
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
  setScenario: (sc) => {
    const parsed = ScenarioSchema.parse(sc);
    const w = parsed.map.size.x;
    const h = parsed.map.size.y;
    const g: string[][] = Array.from({ length: h }, () => Array.from({ length: w }, () => 'grass'));
    set({ scenario: parsed, terrainGrid: g, undoStack: [], redoStack: [] });
  },
  addEvent: (e) => {
    const s = get().scenario;
    const id = `event-${s.events.length + 1}`;
    set({ scenario: { ...s, events: [...s.events, { id, day: e.day, type: e.type, payload: e.payload ?? {} }] } });
  },
  updateEvent: (id, patch) => {
    const s = get().scenario;
    const events = s.events.map((ev) => (ev.id === id ? { ...ev, ...patch } : ev));
    set({ scenario: { ...s, events } });
  },
  removeEvent: (id) => {
    const s = get().scenario;
    const events = s.events.filter((ev) => ev.id !== id);
    set({ scenario: { ...s, events } });
  },
}));


