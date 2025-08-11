# Plan d'Adaptation - Heroes of Time vers Éditeur Avalon

## Vue d'Ensemble

Ce document détaille comment adapter notre jeu Heroes of Time (actuellement en HTML/JS) vers l'éditeur Avalon unifié.

---

## Phase 1 : Migration des Fonctionnalités Core (Semaine 1-2)

### 1.1 Map & Navigation

**Actuellement** : `CHASSE_TEMPORELLE_MEGA_MAP.html` avec map 120x120 hexagones

**Migration vers Éditeur** :
```typescript
// Dans MapView.tsx - étendre la grille existante
interface ExtendedMapProps {
  cols: 120,  // 6x6 écrans
  rows: 120,
  layers: ['terrain', 'objects', 'fog', 'temporal']
}

// Ajouter navigation viewport
const viewport = {
  x: 0, y: 0,
  width: 20, height: 20,  // Vue 20x20
  zoom: 1.0,
  minimap: true
};
```

### 1.2 Système Temporel V2

**Actuellement** : Variables JS globales dans `HOT_GAME_UNIFIED.html`

**Migration vers Store** :
```typescript
// Dans useEditorStore.ts - ajouter slice temporel
interface TemporalSlice {
  // Temps monde (serveur autoritaire)
  tw: number;
  
  // Par entité
  entities: Map<string, {
    te: number;           // Temps entité
    energy: ComplexEnergy;
    identity: QuantumIdentity;
    debt: number;
    drift: number;
  }>;
  
  // Actions
  tick: () => void;
  applyDrift: (entityId: string, delta: number) => void;
  resolveDebt: (entityId: string) => void;
}
```

### 1.3 Combat TCG

**Actuellement** : Appels directs à Java backend dans les HTML

**Migration** :
```typescript
// Nouveau composant CombatResolver.tsx
export function CombatResolver({ entities }: Props) {
  const [mode, setMode] = useState<'tcg' | 'auto' | 'collapse'>('tcg');
  
  const initiateCombat = async () => {
    // Appel Java backend
    const response = await fetch(`${JAVA_URL}/api/combat/start`, {
      method: 'POST',
      body: JSON.stringify({ entities, mode })
    });
    
    // Afficher UI combat si TCG
    if (mode === 'tcg') {
      openTCGInterface(response.battleId);
    }
  };
}
```

---

## Phase 2 : Intégration des Régulateurs (Semaine 2-3)

### 2.1 Panneau Régulateurs

```typescript
// Nouveau composant RegulatorsPanel.tsx
interface Regulator {
  id: 'vince' | 'anna' | 'overload';
  active: boolean;
  intensity: number;  // 0-1
  position?: { x: number; y: number; };
}

export function RegulatorsPanel() {
  const regulators = useEditorStore(s => s.regulators);
  
  return (
    <div className="regulators-panel">
      <RegulatorCard 
        name="Vince" 
        icon="🗡️"
        description="Perce le brouillard"
        onToggle={() => toggleRegulator('vince')}
      />
      <RegulatorCard 
        name="Anna" 
        icon="⏳"
        description="Décroissance économique"
        onToggle={() => toggleRegulator('anna')}
      />
      <RegulatorCard 
        name="Overload" 
        icon="💥"
        description="Collapse des stacks"
        onToggle={() => toggleRegulator('overload')}
      />
    </div>
  );
}
```

### 2.2 Visualisation Brouillard/Ombre

```typescript
// Dans HexGrid.tsx - ajouter overlays
const renderCausalOverlay = (hex: Hex) => {
  const { opc, cf } = calculateVisibility(hex);
  
  return (
    <>
      {/* Ombre Portée Causale */}
      <circle 
        r={opc.radius} 
        fill="rgba(100,200,255,0.2)"
        className="opc-overlay"
      />
      
      {/* Brouillard de Causalité */}
      <circle 
        r={cf.radius}
        fill={`rgba(150,150,150,${cf.opacity})`}
        className="fog-overlay"
      />
    </>
  );
};
```

---

## Phase 3 : Timeline & Événements (Semaine 3-4)

### 3.1 Composant Timeline

```typescript
// TimelineView.tsx amélioré
export function TimelineView() {
  const events = useEditorStore(s => s.timeline.events);
  const tw = useEditorStore(s => s.temporal.tw);
  
  return (
    <div className="timeline-container">
      <div className="time-ruler">
        <CurrentTimeMarker position={tw} />
      </div>
      
      <div className="events-track">
        {events.map(event => (
          <EventNode 
            key={event.id}
            event={event}
            onEdit={editEvent}
            onLink={linkEvents}
          />
        ))}
      </div>
      
      <div className="causal-links">
        {renderCausalLinks(events)}
      </div>
    </div>
  );
}
```

### 3.2 Simulation & Test

```typescript
// SimulationPanel.tsx
export function SimulationPanel() {
  const [simulating, setSimulating] = useState(false);
  const [trace, setTrace] = useState<SimTrace[]>([]);
  
  const runSimulation = async (duration: string) => {
    setSimulating(true);
    
    const response = await fetch(`${RUST_URL}/api/v2/simulate`, {
      method: 'POST',
      body: JSON.stringify({
        from: 'now',
        to: duration,  // "+300s"
        mode: 'deterministic'
      })
    });
    
    const { trace, paradoxes } = await response.json();
    setTrace(trace);
    
    if (paradoxes.length > 0) {
      highlightParadoxes(paradoxes);
    }
  };
  
  return (
    <div className="simulation-panel">
      <button onClick={() => runSimulation('+300s')}>
        Simuler 5 minutes
      </button>
      <TraceViewer trace={trace} />
    </div>
  );
}
```

---

## Phase 4 : Unification & Polish (Semaine 4-5)

### 4.1 Mode de Jeu Intégré

```typescript
// GameModeSelector.tsx
export function GameModeSelector() {
  const modes = [
    { id: 'edit', name: 'Édition', icon: '✏️' },
    { id: 'test', name: 'Test', icon: '🧪' },
    { id: 'play', name: 'Jouer', icon: '🎮' },
    { id: 'spectate', name: 'Observer', icon: '👁️' }
  ];
  
  return (
    <div className="mode-selector">
      {modes.map(mode => (
        <ModeButton 
          key={mode.id}
          {...mode}
          onClick={() => switchMode(mode.id)}
        />
      ))}
    </div>
  );
}
```

### 4.2 Export/Import Scénarios

```typescript
// ScenarioManager.tsx
interface Scenario {
  version: '2.0.0';
  world: WorldConfig;
  timeline: TimelineConfig;
  entities: EntityConfig[];
  regulators: RegulatorConfig[];
}

const exportScenario = (): Scenario => {
  const state = useEditorStore.getState();
  return {
    version: '2.0.0',
    world: state.world,
    timeline: state.timeline,
    entities: Array.from(state.temporal.entities),
    regulators: state.regulators
  };
};
```

---

## Phase 5 : Intégration Memento/Clippy (Continue)

### 5.1 Amélioration Clippy

```typescript
// Dans clippy.tsx - ajouter contexte V2
const getContextualHelp = async (context: EditorContext) => {
  const query = buildSmartQuery(context);
  
  const response = await fetch(`${PYTHON_URL}/search`, {
    method: 'POST',
    body: JSON.stringify({
      query,
      k: 5,
      scope: ['V2Spec', 'Tutorials', 'Examples'],
      context: {
        mode: context.mode,
        selection: context.selected,
        errors: context.errors
      }
    })
  });
  
  return formatHelpResults(response);
};
```

### 5.2 Auto-complétion Code

```typescript
// CodeEditor.tsx avec Memento
import { MementoProvider } from '../lib/memento';

export function CodeEditor() {
  return (
    <MementoProvider>
      <MonacoEditor 
        language="typescript"
        theme="avalon-dark"
        options={{
          suggestOnTriggerCharacters: true,
          quickSuggestions: true
        }}
        onMount={(editor) => {
          setupMementoAutocomplete(editor);
        }}
      />
    </MementoProvider>
  );
}
```

---

## Métriques de Succès

### MVP (2 semaines)
- [ ] Map 120x120 navigable
- [ ] Placement entités basique
- [ ] Timeline simple
- [ ] Connexion backends (Rust/Java/Python)
- [ ] Export JSON fonctionnel

### Version Complète (5 semaines)
- [ ] Tous les modes de jeu intégrés
- [ ] Simulation complète avec paradoxes
- [ ] Régulateurs fonctionnels
- [ ] Combat TCG intégré
- [ ] Memento/Clippy amélioré
- [ ] Import/Export complet
- [ ] Tests E2E passants

---

## Ressources Nécessaires

### Développeurs
- 1 dev React senior (UI/UX)
- 1 dev full-stack (intégration backends)
- 1 dev junior/stagiaire (tests, doc)

### Infrastructure
- Backends running (ports 3001, 8080, 5001)
- Vector DB avec specs indexées
- CI/CD pour tests automatiques

### Documentation
- Specs V2 dans Vector DB
- Guides développeurs à jour
- Exemples de code fonctionnels

---

## Risques & Mitigations

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Performance avec map 120x120 | Haut | Virtualisation, viewport, LOD |
| Complexité intégration V2 | Moyen | Tests unitaires, doc claire |
| Synchronisation backends | Moyen | WebSocket, event sourcing |
| UX complexe pour débutants | Bas | Tutoriel interactif, Clippy |

---

## Prochaines Étapes

1. **Immédiat** : Valider ce plan avec l'équipe
2. **Jour 1-3** : Setup environnement, branches Git
3. **Jour 4-7** : Implémenter Phase 1 (Core)
4. **Jour 8-14** : Phases 2-3 (Régulateurs, Timeline)
5. **Jour 15-21** : Phase 4 (Unification)
6. **Jour 22-28** : Tests, polish, documentation
7. **Jour 30** : Release MVP 🎉

---

## Commandes Utiles

```bash
# Lancer l'éditeur en dev
cd apps/world-editor
pnpm dev

# Lancer tous les backends
./h stack    # Menu interactif
./h 1        # Lancer stack complète

# Tester intégration V2
python test_v2_controller.py

# Chercher dans Vector DB
curl -X POST http://localhost:5001/search \
  -H "Content-Type: application/json" \
  -d '{"query": "editor V2 integration", "k": 5}'
```

## Contact & Support

- **Specs V2** : `/v2spec/` directory
- **Vector DB** : Port 5001, endpoint `/search`
- **Clippy** : Intégré dans l'éditeur
- **Tests** : `TEST_INTEGRATION_COMPLETE.sh`
