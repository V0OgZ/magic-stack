// WorldEditor 6D — minimal core v1.1 (no UI deps)

export type Position6D = {
  x: number;
  y: number;
  z: number;
  t: number;
  psi: number;
  sigma: number;
};

export type Hero = {
  id: string;
  type: 'hero';
  name: string;
  pos: Position6D;
  amplitude: number;
};

export type Portal = {
  id: string;
  type: 'portal';
  state: 'stable' | 'unstable';
  pos: Position6D;
  modifiers?: Record<string, number>;
};

export type BuffEntity = {
  id: string;
  type: 'buff';
  kind: string;
  level: number;
  pos: Position6D;
};

export type Entity6D = Hero | Portal | BuffEntity;

export type World6D = {
  version: '1.1';
  entities: Record<string, Entity6D>;
  clock: Position6D; // world frame reference
};

export type Move6D = {
  type: 'move6d';
  entityId: string;
  delta: Partial<Position6D>;
};

export type Collapse = {
  type: 'collapse';
  targetId: string;
  reason: 'decay' | 'tie-break';
};

export type ArtifactApplied = {
  type: 'artifactApplied';
  entityId: string;
  modifier: { key: string; factor: number };
};

export type CoreEvent = Move6D | Collapse | ArtifactApplied;
export type EventLogEntry = { ts: number; event: CoreEvent };
export type Subscriber = (event: CoreEvent, state: World6D) => void;

export function clonePos(p: Position6D): Position6D {
  return { x: p.x, y: p.y, z: p.z, t: p.t, psi: p.psi, sigma: p.sigma };
}

export class CoreStore {
  private state: World6D;
  private subs: Set<Subscriber> = new Set();
  private log: EventLogEntry[] = [];

  constructor(initial?: Partial<World6D>) {
    const zero: Position6D = { x: 0, y: 0, z: 0, t: 0, psi: 0, sigma: 0 };
    this.state = {
      version: '1.1',
      entities: {},
      clock: initial?.clock ? (initial.clock as Position6D) : zero,
      ...initial,
    } as World6D;
  }

  getState(): World6D {
    return this.state;
  }

  reset(initial?: Partial<World6D>) {
    const zero: Position6D = { x: 0, y: 0, z: 0, t: 0, psi: 0, sigma: 0 };
    this.state = {
      version: '1.1',
      entities: {},
      clock: initial?.clock ? (initial.clock as Position6D) : zero,
      ...initial,
    } as World6D;
    this.log = [];
  }

  subscribe(fn: Subscriber): () => void {
    this.subs.add(fn);
    return () => this.subs.delete(fn);
  }

  private emit(ev: CoreEvent) {
    for (const fn of this.subs) {
      try { fn(ev, this.state); } catch { /* ignore */ }
    }
  }

  dispatch(event: CoreEvent) {
    this.apply(event);
    this.log.push({ ts: Date.now(), event });
    this.emit(event);
  }

  replay(events: CoreEvent[]) {
    for (const e of events) this.apply(e);
  }

  getLog(): EventLogEntry[] { return this.log.slice(); }

  upsertEntity(entity: Entity6D) {
    this.state.entities[entity.id] = entity;
  }

  private apply(event: CoreEvent) {
    switch (event.type) {
      case 'move6d': {
        const e = this.state.entities[event.entityId];
        if (!e) return;
        const d = event.delta;
        const p = { ...e.pos } as Position6D;
        this.state.entities[event.entityId] = {
          ...(e as any),
          pos: {
            x: d.x !== undefined ? d.x : p.x,
            y: d.y !== undefined ? d.y : p.y,
            z: d.z !== undefined ? d.z : p.z,
            t: d.t !== undefined ? d.t : p.t,
            psi: d.psi !== undefined ? d.psi : p.psi,
            sigma: d.sigma !== undefined ? d.sigma : p.sigma,
          },
        } as Entity6D;
        break;
      }
      case 'collapse': {
        delete this.state.entities[event.targetId];
        break;
      }
      case 'artifactApplied': {
        const e = this.state.entities[event.entityId];
        if (!e || e.type !== 'portal') return;
        const portal = e as Portal;
        const mods = { ...(portal.modifiers || {}) };
        const k = event.modifier.key;
        const f = event.modifier.factor;
        mods[k] = (mods[k] ?? 1) * f;
        this.state.entities[event.entityId] = { ...portal, modifiers: mods };
        break;
      }
    }
  }
}

export const coreStore = new CoreStore();
