/**
 * 🔌 MAGIC STACK API - WRAPPER TRANSPARENT
 * 
 * PRINCIPE : Bijection pure avec les backends
 * - PAS de logique métier
 * - PAS de calculs
 * - JUSTE du routing vers les bons endpoints
 * 
 * 1 méthode API = 1 appel backend
 */

class MagicStackAPI {
  private static instance: MagicStackAPI;
  
  // Configuration des endpoints
  private endpoints = {
    rust: import.meta.env?.VITE_RUST_API || 'http://localhost:3001',
    java: import.meta.env?.VITE_JAVA_API || 'http://localhost:8080',
    vector: import.meta.env?.VITE_VECTOR_API || 'http://localhost:5001'
  };
  
  private constructor() {
    if (typeof window !== 'undefined') {
      (window as any).MagicStack = this;
    }
  }
  
  static getInstance(): MagicStackAPI {
    if (!MagicStackAPI.instance) {
      MagicStackAPI.instance = new MagicStackAPI();
    }
    return MagicStackAPI.instance;
  }
  
  // ============================================
  // 🦀 RUST BACKEND - V2 Core
  // ============================================
  
  rust = {
    // GET /api/v2/config
    getConfig: () => 
      fetch(`${this.endpoints.rust}/api/v2/config`)
        .then(r => r.json()),
    
    // POST /api/v2/tick
    tick: (state: any) => 
      fetch(`${this.endpoints.rust}/api/v2/tick`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      }).then(r => r.json()),
    
    // POST /api/v2/entity
    createEntity: (entity: any) =>
      fetch(`${this.endpoints.rust}/api/v2/entity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entity)
      }).then(r => r.json()),
    
    // GET /api/v2/entity/:id
    getEntity: (id: string) =>
      fetch(`${this.endpoints.rust}/api/v2/entity/${id}`)
        .then(r => r.json()),
    
    // POST /api/v2/calculate/drift
    calculateDrift: (tw: number, te: number) =>
      fetch(`${this.endpoints.rust}/api/v2/calculate/drift`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tw, te })
      }).then(r => r.json()),
    
    // POST /api/v2/calculate/energy
    calculateEnergy: (A: number, phi: number) =>
      fetch(`${this.endpoints.rust}/api/v2/calculate/energy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ A, phi })
      }).then(r => r.json()),
    
    // POST /api/v2/calculate/interference
    calculateInterference: (entity1: any, entity2: any) =>
      fetch(`${this.endpoints.rust}/api/v2/calculate/interference`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity1, entity2 })
      }).then(r => r.json()),
    
    // POST /api/v2/paradox/detect
    detectParadoxes: (state: any) =>
      fetch(`${this.endpoints.rust}/api/v2/paradox/detect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      }).then(r => r.json()),
    
    // POST /api/v2/regulators/vince
    activateVince: (position: {x: number, y: number}, intensity: number) =>
      fetch(`${this.endpoints.rust}/api/v2/regulators/vince`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ position, intensity })
      }).then(r => r.json()),
    
    // POST /api/v2/regulators/anna
    activateAnna: (decayRate: number, zone: string) =>
      fetch(`${this.endpoints.rust}/api/v2/regulators/anna`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decayRate, zone })
      }).then(r => r.json()),
    
    // POST /api/v2/regulators/overload
    triggerOverload: () =>
      fetch(`${this.endpoints.rust}/api/v2/regulators/overload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      }).then(r => r.json()),
    
    // POST /api/map/generate
    generateMap: (width: number, height: number, seed?: string) =>
      fetch(`${this.endpoints.rust}/api/map/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ width, height, seed })
      }).then(r => r.json()),
    
    // POST /api/map/init
    initMap: (mapData: any) =>
      fetch(`${this.endpoints.rust}/api/map/init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mapData)
      }).then(r => r.json()),
    
    // GET /api/archives/search
    searchArchives: (query: string) =>
      fetch(`${this.endpoints.rust}/api/archives/search?q=${encodeURIComponent(query)}`)
        .then(r => r.json()),
  };
  
  // ============================================
  // ☕ JAVA BACKEND - Business Logic
  // ============================================
  
  java = {
    // GET /api/health
    health: () =>
      fetch(`${this.endpoints.java}/api/health`)
        .then(r => r.json()),
    
    // GET /api/scenarios
    getScenarios: () =>
      fetch(`${this.endpoints.java}/api/scenarios`)
        .then(r => r.json()),
    
    // GET /api/scenarios/:id
    getScenario: (id: string) =>
      fetch(`${this.endpoints.java}/api/scenarios/${id}`)
        .then(r => r.json()),
    
    // POST /api/scenarios
    createScenario: (scenario: any) =>
      fetch(`${this.endpoints.java}/api/scenarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scenario)
      }).then(r => r.json()),
    
    // PUT /api/scenarios/:id
    updateScenario: (id: string, scenario: any) =>
      fetch(`${this.endpoints.java}/api/scenarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scenario)
      }).then(r => r.json()),
    
    // DELETE /api/scenarios/:id
    deleteScenario: (id: string) =>
      fetch(`${this.endpoints.java}/api/scenarios/${id}`, {
        method: 'DELETE'
      }).then(r => r.json()),
    
    // POST /api/interstice/cast-formula
    castFormula: (formula: string, context: any) =>
      fetch(`${this.endpoints.java}/api/interstice/cast-formula`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formula, context })
      }).then(r => r.json()),

    // POST /api/magic/cast (real engine route)
    magicCast: async (payload: { formula_id?: string; formula?: string; context?: any; mode?: 'simulate' | 'apply' }) => {
      const res = await fetch(`${this.endpoints.java}/api/magic/cast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      // Normalize to CastResult expected by CastingManager
      const formula = payload.formula || payload.formula_id || (data && (data.formula || data.formula_id)) || 'UNKNOWN_FORMULA';
      const output: any = {};
      const backendOutput = (data && (data.output || data.outputs)) || null;
      if (backendOutput) {
        Object.assign(output, backendOutput);
      } else {
        const msg: string = data?.message || `Formula ${formula} executed`;
        // Literary: backend message
        output.literary = msg;
        // Iconic: map effect or formula to emojis
        const effect = (data?.effect || '').toString().toUpperCase();
        const fxIcon = effect.includes('FREEZE') || formula.includes('FREEZE') ? '❄️'
          : effect.includes('TELEPORT') || formula.includes('TELEPORT') ? '🌀'
          : effect.includes('FIRE') || formula.includes('FIRE') || formula.includes('FIREBALL') ? '🔥'
          : effect.includes('SHIELD') || formula.includes('SHIELD') ? '🛡️'
          : effect.includes('LIGHTNING') || formula.includes('LIGHTNING') ? '⚡'
          : '✨';
        output.iconic = fxIcon;
        // Runic: compact rune-like from formula
        output.runic = formula.replace(/[^A-Z_]/g, '').slice(0, 16) || 'ᚠᚢᚦ';
        // Quantum: echo the formula id/text for now
        output.quantum = formula;
      }
      const effects = Array.isArray(data?.effects) ? data.effects : (data?.effect ? [String(data.effect)] : []);
      const sounds = Array.isArray(data?.sounds) ? data.sounds : (
        (output.iconic === '🌀') ? ['magic_portal'] : ['magic_cast']
      );
      return { formula, output, effects, sounds };
    },
    
    // GET /api/heroes
    getHeroes: () =>
      fetch(`${this.endpoints.java}/api/heroes`)
        .then(r => r.json()),
    
    // GET /api/heroes/:id
    getHero: (id: string) =>
      fetch(`${this.endpoints.java}/api/heroes/${id}`)
        .then(r => r.json()),
    
    // POST /api/combat/resolve
    resolveCombat: (attacker: any, defender: any) =>
      fetch(`${this.endpoints.java}/api/combat/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attacker, defender })
      }).then(r => r.json()),
  };
  
  // ============================================
  // 🐍 PYTHON BACKEND - Vector DB
  // ============================================
  
  vector = {
    // GET /health
    health: () =>
      fetch(`${this.endpoints.vector}/health`)
        .then(r => r.json()),
    
    // POST /search
    search: (query: string, mode: 'story' | 'dev' = 'story', topK = 5) =>
      fetch(`${this.endpoints.vector}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, mode, top_k: topK })
      }).then(r => r.json()),
    
    // POST /api/index
    indexDocument: (document: any) =>
      fetch(`${this.endpoints.vector}/api/index`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(document)
      }).then(r => r.json()),
    
    // DELETE /api/index/:id
    deleteDocument: (id: string) =>
      fetch(`${this.endpoints.vector}/api/index/${id}`, {
        method: 'DELETE'
      }).then(r => r.json()),
    
    // GET /api/status
    getStatus: () =>
      fetch(`${this.endpoints.vector}/api/status`)
        .then(r => r.json()),
    
    // POST /api/build
    rebuildIndex: () =>
      fetch(`${this.endpoints.vector}/api/build`, {
        method: 'POST'
      }).then(r => r.json()),
  };
  
  // ============================================
  // 🎨 EDITOR ONLY - Logique locale permise
  // ============================================
  
  editor = {
    // Ces méthodes peuvent avoir de la logique locale
    // car c'est pour l'édition temps réel
    
    placeIcon: (x: number, y: number, icon: any) => {
      // Logique locale OK pour preview immédiat
      const event = new CustomEvent('editor:placeIcon', {
        detail: { x, y, icon }
      });
      window.dispatchEvent(event);
      return { x, y, icon };
    },
    
    drawTerrain: (hexes: any[]) => {
      // Logique locale OK pour dessin
      const event = new CustomEvent('editor:drawTerrain', {
        detail: { hexes }
      });
      window.dispatchEvent(event);
      return { hexes };
    },
    
    // Mais la sauvegarde passe par le backend
    save: (mapData: any) => {
      return this.java.createScenario(mapData);
    },
    
    load: (id: string) => {
      return this.java.getScenario(id);
    }
  };
  
  // ============================================
  // 🔧 UTILITIES - Helpers locaux
  // ============================================
  
  utils = {
    // Configure les endpoints
    setEndpoints: (endpoints: Partial<typeof this.endpoints>) => {
      Object.assign(this.endpoints, endpoints);
      console.log('📡 Endpoints updated:', this.endpoints);
    },
    
    // Check santé de tous les backends
    healthCheck: async () => {
      const results = {
        rust: false,
        java: false,
        vector: false
      };
      
      try {
        await fetch(`${this.endpoints.rust}/health`);
        results.rust = true;
      } catch {}
      
      try {
        await this.java.health();
        results.java = true;
      } catch {}
      
      try {
        await this.vector.health();
        results.vector = true;
      } catch {}
      
      return results;
    },
    
    // Logger les appels pour debug
    enableLogging: () => {
      const originalFetch = window.fetch;
      window.fetch = async (...args) => {
        console.log('🔌 API Call:', args[0]);
        const result = await originalFetch(...args);
        console.log('✅ Response:', result.status);
        return result;
      };
    }
  };
}

// Export singleton
export const MagicStack = MagicStackAPI.getInstance();

// Types
export type MagicStackAPIType = typeof MagicStack;

// Documentation console
if (typeof window !== 'undefined') {
  console.log('%c🔌 MAGIC STACK API (Wrapper Mode)', 'font-size: 16px; color: #667eea; font-weight: bold;');
  console.log('%c→ Rust: v2, map, archives', 'color: #a0aec0;');
  console.log('%c→ Java: scenarios, heroes, combat', 'color: #a0aec0;');
  console.log('%c→ Vector: search, index', 'color: #a0aec0;');
  console.log('%c→ Editor: local preview only', 'color: #48bb78;');
  console.log('%cExample: await MagicStack.rust.tick(state)', 'color: #667eea;');
}