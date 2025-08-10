# 🔮 Guide d'Intégration Éditeur V2 - Heroes of Time

## 📊 État Actuel & Vision

### ✅ Ce qui est fait
- **UI Professionnelle** : Theme StarCraft/Warcraft implémenté
- **Architecture PROFONDEUR** : Ports corrects (3001, 5001, 8001)
- **Vector DB Intégré** : Panneau de recherche + Clippy contextuel
- **Build React PWA** : Fonctionne avec Vite + TypeScript
- **Terrain Painting** : 7 types avec undo/redo
- **Timeline basique** : Gestion événements

### ⚠️ Points Critiques V2 à Respecter

#### 1. Énergie Complexe (OBLIGATOIRE)
```typescript
// NE PAS OUBLIER : E = A + iΦ
interface ComplexEnergy {
  amplitude: number;      // A : puissance réelle
  phase: number;         // Φ : décalage temporel
  
  // Calculs critiques
  getComplex(): { real: number; imaginary: number } {
    return {
      real: this.amplitude * Math.cos(this.phase),
      imaginary: this.amplitude * Math.sin(this.phase)
    };
  }
}
```

#### 2. Dette Temporelle
```typescript
interface TemporalDebt {
  amount: number;         // Dette accumulée
  interest_rate: 0.05;   // 5% par tick
  max_before_collapse: 100;
  
  // CRITIQUE : Doit être visible dans l'éditeur
  visualization: 'red_overlay' | 'debt_counter';
}
```

#### 3. Identité Quantique |ψ⟩
```typescript
interface QuantumIdentity {
  state: string;  // Format: |ψ⟩ = α|0⟩ + β|1⟩
  coherence: number;  // 0-1 : niveau de cohérence
  entangled_with?: string[];  // Autres entités liées
}
```

## 🏗️ Architecture Recommandée

### Connexion aux 3 Backends
```typescript
// config/endpoints.ts COMPLET
export const V2_ENDPOINTS = {
  // Rust - Moteur V2 Core
  rust: {
    base: 'http://localhost:3001',
    v2: {
      tick: '/api/v2/tick',
      entity: '/api/v2/entity',
      config: '/api/v2/config',
      drift: '/api/v2/drift',
      interference: '/api/v2/interference'
    }
  },
  
  // Java - Business Logic & Formules
  java: {
    base: 'http://localhost:8080',
    interstice: '/api/interstice',
    formulas: '/api/formulas/cast',
    tcg: '/api/tcg/battle'
  },
  
  // Python - Vector DB & AI
  python: {
    base: 'http://localhost:5001',
    search: '/search',
    embed: '/embed',
    qstar: '/qstar/path'
  }
};
```

### Service Layer V2
```typescript
// services/v2Engine.ts
class V2EngineService {
  async tick(state: WorldState): Promise<V2TickResult> {
    const response = await fetch(V2_ENDPOINTS.rust.v2.tick, {
      method: 'POST',
      body: JSON.stringify({
        current_tw: state.tw,
        current_te: state.te,
        entities: state.entities.map(e => ({
          id: e.id,
          energy: e.energy.getComplex(),
          debt: e.temporalDebt,
          identity: e.quantumIdentity
        }))
      })
    });
    
    return response.json();
  }
  
  async calculateInterference(e1: Entity, e2: Entity): Promise<number> {
    // CRITIQUE : Interférence = clé du gameplay
    return fetch(V2_ENDPOINTS.rust.v2.interference, {
      method: 'POST',
      body: JSON.stringify({
        entity1: e1.quantumIdentity,
        entity2: e2.quantumIdentity
      })
    }).then(r => r.json());
  }
}
```

## 🔄 Intégration Memento/Vector DB Améliorée

### Contexte V2 pour Clippy
```typescript
// lib/clippy.tsx amélioré
const getV2Context = () => ({
  // Contexte temporel
  temporal: {
    tw: store.world.tw,
    te: store.world.te,
    drift: store.world.tw - store.world.te,
    debt: store.getTotalDebt()
  },
  
  // Contexte énergétique
  energy: {
    total_amplitude: store.getTotalAmplitude(),
    phase_variance: store.getPhaseVariance(),
    interference_zones: store.getInterferenceZones()
  },
  
  // Contexte causal
  causality: {
    fog_density: store.getCFDensity(),
    opc_active: store.getOPCZones(),
    paradox_risk: store.getParadoxRisk()
  }
});

// Recherche contextuelle V2
const searchWithV2Context = async (query: string) => {
  const context = getV2Context();
  
  return vectorDB.search(query, 'story', 5, {
    filters: {
      temporal_relevance: context.temporal.drift > 10 ? 'high' : 'normal',
      energy_level: context.energy.total_amplitude,
      causality_state: context.causality.fog_density > 0.5 ? 'fogged' : 'clear'
    }
  });
};
```

## 📝 Exemples de Code V2

### Créer une Zone avec Énergie Complexe
```typescript
// Dans MapView
const createComplexEnergyZone = (x: number, y: number) => {
  addObjectAt(x, y, 'energy_source', {
    energy: {
      amplitude: 100,
      phase: Math.PI / 4,  // 45° de décalage
      type: 'resonator'
    },
    effects: {
      range: 5,
      interference_pattern: 'constructive',
      affects: ['temporal_drift', 'quantum_coherence']
    }
  });
};
```

### Visualiser la Dette Temporelle
```typescript
// Nouveau composant DebtOverlay.tsx
const DebtOverlay = () => {
  const debt = useEditorStore(s => s.getTemporalDebt());
  
  if (debt.amount === 0) return null;
  
  const opacity = Math.min(debt.amount / debt.max_before_collapse, 0.8);
  const pulseRate = 2 - (debt.amount / debt.max_before_collapse); // Plus rapide quand critique
  
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: `radial-gradient(circle, transparent, rgba(255,0,0,${opacity}))`,
      pointerEvents: 'none',
      animation: `pulse ${pulseRate}s infinite`,
      zIndex: 1000
    }}>
      <div style={{
        position: 'absolute',
        top: 20,
        right: 20,
        color: 'red',
        fontSize: 24,
        fontWeight: 'bold'
      }}>
        ⚠️ Dette: {debt.amount.toFixed(1)} / {debt.max_before_collapse}
      </div>
    </div>
  );
};
```

### Gestion des Régulateurs V2
```typescript
// Régulateurs avec nouvelles mécaniques
const regulators = {
  vince: {
    pierce: (timeline: string) => {
      // Perce vers une timeline alternative
      return fetch(V2_ENDPOINTS.rust.v2.pierce, {
        method: 'POST',
        body: JSON.stringify({ 
          from: currentTimeline,
          to: timeline,
          energy_cost: 50
        })
      });
    }
  },
  
  anna: {
    decay: (rate: number) => {
      // Applique décroissance exponentielle
      return fetch(V2_ENDPOINTS.rust.v2.decay, {
        method: 'POST',
        body: JSON.stringify({
          rate,
          affects: 'all_entities',
          preserve_quantum_state: true
        })
      });
    }
  },
  
  overload: {
    stack: (amount: number) => {
      // Accumule de la surcharge
      if (amount > 10) {
        triggerParadox('overload_explosion');
      }
    }
  }
};
```

## ✅ Checklist d'Intégration

### Phase 1 : Core V2 (URGENT)
- [ ] Implémenter ComplexEnergy dans le store
- [ ] Ajouter visualisation dette temporelle
- [ ] Connecter au endpoint `/api/v2/tick`
- [ ] Afficher tw, te, drift dans la status bar

### Phase 2 : Régulateurs
- [ ] UI pour Vince (perçage)
- [ ] UI pour Anna (décroissance) 
- [ ] UI pour Overload (surcharge)
- [ ] Visualisation des zones d'effet

### Phase 3 : Causalité
- [ ] Brouillard de causalité (CF)
- [ ] Zones OPC
- [ ] Liens causaux dans Timeline
- [ ] Détection paradoxes

### Phase 4 : Tests
- [ ] Test avec `test_v2_controller.py`
- [ ] Validation énergie complexe
- [ ] Stress test dette temporelle
- [ ] Simulation paradoxes

## ⚠️ Pièges à Éviter

1. **NE PAS** ignorer la phase Φ dans l'énergie
2. **NE PAS** oublier la dette temporelle (crash garanti)
3. **NE PAS** mélanger tw et te (ce sont 2 temps différents!)
4. **TOUJOURS** calculer l'interférence entre entités proches
5. **TOUJOURS** valider avec le V2 Controller Rust

## 🚀 Quick Start

```bash
# 1. Lancer les backends
./h-profondeur start    # Rust V2 sur 3001
./h-backend start       # Java sur 8080
./h-profondeur vector   # Vector DB sur 5001

# 2. Lancer l'éditeur
cd apps/world-editor
npm run dev

# 3. Tester V2
python test_v2_controller.py

# 4. Vérifier les logs
tail -f logs/profondeur-rust.log
```

---

**⚡ Remember: "V2 is not just an update, it's a quantum leap!"**
