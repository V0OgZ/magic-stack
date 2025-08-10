# 🎮 Plan d'Adaptation Heroes of Time → Éditeur Universel

## 📊 Status Actuel : Où on en est par rapport à la Vision

### ✅ RÉALISÉ (40%)
1. **Éditeur React PWA** fonctionnel
2. **Configuration centralisée** des endpoints (équipe PROFONDEUR)
3. **Vector DB intégré** avec panneau de recherche
4. **Clippy connecté** au Vector DB pour tips contextuels
5. **UI Professionnelle** style StarCraft/Warcraft
6. **Terrain painting** avec 7 types + undo/redo
7. **Build & Deploy** prêt (Vite + TypeScript)

### 🚧 EN COURS (30%)
1. **Timeline visuelle** (basique, manque causalité)
2. **Import/Export** scénarios (JSON officiel)
3. **Publication backend** (map.generate, map.init)

### ❌ À FAIRE (30%)
1. **Mécaniques V2** (énergie complexe, dette, drift)
2. **Régulateurs** (Vince, Anna, Overload)
3. **WebSocket** temps réel
4. **Mode Test/Play** intégré
5. **Formules magiques** éditables
6. **Q* pathfinding** visuel

## 🗺️ Plan de Migration en 5 Phases

### 📅 PHASE 1 : Migration Core (1 semaine)

#### Objectif : Unifier HOT_GAME_UNIFIED.html avec l'éditeur

```javascript
// Étapes techniques
1. Extraire la logique de jeu de HOT_GAME_UNIFIED.html
2. Créer GameEngine.ts dans apps/world-editor/src/engine/
3. Migrer:
   - La map 120x120 hexagonale
   - Le système de temps (tw, te, drift)
   - Les ressources (crystals, energy, temporal, quantum)
   - La logique de tick
```

#### Fichiers à migrer
```
HOT_GAME_UNIFIED.html → apps/world-editor/src/
├── engine/
│   ├── GameEngine.ts       // Moteur principal
│   ├── TemporalSystem.ts   // tw, te, drift
│   ├── ResourceManager.ts  // Gestion ressources
│   └── TickController.ts   // Boucle de jeu
```

### 📅 PHASE 2 : Intégration Régulateurs (3 jours)

#### Vince - Perçage Temporel
```typescript
// ui/regulators/VincePanel.tsx
const VinceRegulator = () => {
  const pierce = async (from: Timeline, to: Timeline) => {
    await fetch(ENDPOINTS.rust.v2.pierce, {
      method: 'POST',
      body: JSON.stringify({
        from_timeline: from.id,
        to_timeline: to.id,
        position: selectedHex,
        energy_cost: 50
      })
    });
  };
  
  return (
    <Panel title="Vince - Perçage">
      <TimelineSelector onSelect={pierce} />
      <EnergyGauge current={energy} required={50} />
    </Panel>
  );
};
```

#### Anna - Décroissance
```typescript
// ui/regulators/AnnaPanel.tsx
const AnnaRegulator = () => {
  const [decayRate, setDecayRate] = useState(5);
  
  const applyDecay = () => {
    worldState.applyExponentialDecay(decayRate);
    updateVisualization();
  };
  
  return (
    <Panel title="Anna - Décroissance">
      <Slider value={decayRate} onChange={setDecayRate} min={1} max={10} />
      <DecayPreview rate={decayRate} />
      <Button onClick={applyDecay}>Appliquer</Button>
    </Panel>
  );
};
```

#### Overload - Surcharge
```typescript
// ui/regulators/OverloadPanel.tsx
const OverloadRegulator = () => {
  const [stack, setStack] = useState(0);
  const MAX_STACK = 10;
  
  const addStack = () => {
    const newStack = stack + 1;
    setStack(newStack);
    
    if (newStack >= MAX_STACK) {
      triggerParadoxExplosion();
    }
  };
  
  return (
    <Panel title="Overload - Surcharge">
      <StackMeter current={stack} max={MAX_STACK} />
      <Button onClick={addStack} danger={stack > 7}>
        Ajouter Charge (+1)
      </Button>
    </Panel>
  );
};
```

### 📅 PHASE 3 : Timeline & Événements (4 jours)

#### Timeline Visuelle Avancée
```typescript
// ui/TimelineAdvanced.tsx
const TimelineAdvanced = () => {
  return (
    <div className="timeline-container">
      {/* Ligne de temps principale */}
      <TimeAxis min={0} max={3600} current={tw} />
      
      {/* Événements avec liens causaux */}
      <EventLayer>
        {events.map(evt => (
          <Event 
            key={evt.id}
            position={evt.time}
            type={evt.type}
            causalLinks={evt.causes}
            visibility={evt.visibility} // public, fogged, hidden
          />
        ))}
      </EventLayer>
      
      {/* Brouillard de causalité */}
      <CausalityFog 
        density={cfDensity}
        zones={cfZones}
      />
      
      {/* Branches temporelles */}
      <TimelineBranches 
        main={mainTimeline}
        alternates={altTimelines}
        mergePoints={mergePoints}
      />
    </div>
  );
};
```

### 📅 PHASE 4 : Modes Unifiés (5 jours)

#### Switch Edit/Test/Play
```typescript
// App.tsx modifié
const App = () => {
  const [mode, setMode] = useState<'edit' | 'test' | 'play'>('edit');
  
  return (
    <div className="app">
      <Header>
        <ModeSelector value={mode} onChange={setMode} />
      </Header>
      
      {mode === 'edit' && <EditorView />}
      {mode === 'test' && <TestView simulation={true} />}
      {mode === 'play' && <GameView fullGame={true} />}
    </div>
  );
};
```

#### Mode Test (Simulation)
```typescript
const TestView = () => {
  const [simSpeed, setSimSpeed] = useState(1);
  const [showDebug, setShowDebug] = useState(true);
  
  return (
    <>
      <GameEngine speed={simSpeed} />
      <DebugPanel show={showDebug}>
        <TickInfo tw={tw} te={te} drift={drift} />
        <EntityList entities={entities} />
        <ParadoxDetector active={true} />
      </DebugPanel>
      <SimulationControls>
        <SpeedControl value={simSpeed} onChange={setSimSpeed} />
        <Button onClick={pause}>Pause</Button>
        <Button onClick={step}>Step</Button>
      </SimulationControls>
    </>
  );
};
```

### 📅 PHASE 5 : Clippy Intelligent (3 jours)

#### Clippy avec Contexte V2 Complet
```typescript
// lib/clippy-v2.tsx
const ClippyV2 = () => {
  const context = useV2Context();
  
  // Tips basés sur l'état V2
  const getContextualTips = () => {
    const tips = [];
    
    // Dette temporelle
    if (context.debt > 50) {
      tips.push("⚠️ Ta dette temporelle est élevée! Résous des paradoxes pour la réduire.");
    }
    
    // Drift
    if (Math.abs(context.tw - context.te) > 100) {
      tips.push("⏰ Le drift temporel est important. Attention aux interférences!");
    }
    
    // Énergie complexe
    if (context.energy.phase > Math.PI) {
      tips.push("🌀 Phase énergétique inversée détectée. Effets temporels inversés!");
    }
    
    // Régulateurs
    if (context.regulators.vince.active) {
      tips.push("🔷 Vince est actif. Tu peux percer vers d'autres timelines!");
    }
    
    return tips;
  };
  
  // Recherche Vector DB avec contexte V2
  const searchWithContext = async (query: string) => {
    return vectorDB.search(query, 'story', 5, {
      v2_context: {
        temporal_state: context.temporal,
        energy_state: context.energy,
        active_regulators: context.regulators
      }
    });
  };
  
  return <ClippyUI tips={getContextualTips()} search={searchWithContext} />;
};
```

## 🔧 Intégration Technique

### Structure Finale
```
apps/world-editor/
├── src/
│   ├── engine/          # Moteur de jeu migré
│   │   ├── GameEngine.ts
│   │   ├── V2Controller.ts
│   │   └── TemporalSystem.ts
│   ├── ui/
│   │   ├── game/        # Vue jeu
│   │   ├── editor/      # Vue éditeur
│   │   ├── regulators/  # Panneaux régulateurs
│   │   └── shared/      # Composants partagés
│   ├── services/
│   │   ├── v2Engine.ts  # Connexion V2
│   │   ├── vectorDB.ts  # Déjà fait ✅
│   │   └── formulas.ts  # Système de formules
│   └── modes/
│       ├── EditMode.tsx
│       ├── TestMode.tsx
│       └── PlayMode.tsx
```

### Commandes de Migration
```bash
# 1. Extraire le code de HOT_GAME_UNIFIED.html
node tools/extract_game_logic.js

# 2. Générer les types TypeScript
npx ts-migrate apps/world-editor/src/engine

# 3. Connecter au V2 Controller
python test_v2_integration.py

# 4. Build unifié
cd apps/world-editor && npm run build
```

## 📈 Métriques de Succès

### Court Terme (1 mois)
- [ ] 100% du gameplay HOT dans l'éditeur
- [ ] Mode Test fonctionnel
- [ ] Régulateurs intégrés
- [ ] Timeline causale visible

### Moyen Terme (3 mois)
- [ ] Éditeur = Client principal
- [ ] Plus de HTML séparés
- [ ] WebSocket temps réel
- [ ] Formules éditables visuellement

### Long Terme (6 mois)
- [ ] Marketplace de maps
- [ ] Mode multijoueur dans l'éditeur
- [ ] AI assistant pour création
- [ ] Export standalone des jeux

## 🚨 Points d'Attention

1. **Performance** : La map 120x120 est lourde, implémenter le LOD
2. **Compatibilité** : Garder les saves existantes fonctionnelles
3. **UX** : Le passage edit→test→play doit être instantané
4. **V2 Core** : Ne JAMAIS ignorer tw, te, drift, dette
5. **Intégration** : Tout doit passer par les endpoints centralisés

## 🎯 Objectif Final

> **Un seul éditeur pour les gouverner tous** : créer, tester, jouer, partager.
> Plus de fragmentation, plus de HTML éparpillés, juste une app React PWA unifiée.

---

**Status actuel : 40% réalisé, 30% en cours, 30% à faire**

*Prochaine étape immédiate : Phase 1 - Migration Core*
