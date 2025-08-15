# 📚 DOCUMENTATION BACKEND 6D - AVALON TCG
*Par MEMENTO LE SAGE - Jour 21*

## 🌀 ARCHITECTURE 6 DIMENSIONS

### 1. DIMENSION PHYSIQUE (X,Y,Z)
```
Position spatiale standard:
- X: Position horizontale sur la carte
- Y: Position verticale sur la carte  
- Z: Altitude/Profondeur (0 = sol, + = air, - = souterrain)
```

### 2. DIMENSION TEMPORELLE (T)
```
Flux temporel:
- Passé: Actions déjà effectuées, historique
- Présent: État actuel du jeu
- Futur: Prédictions, effets différés
```

### 3. DIMENSION CAUSALE (C)
```
Chaînes de causalité:
- Cause première: Action initiale
- Effets en cascade: Réactions en chaîne
- Paradoxes: Boucles causales à résoudre
```

### 4. DIMENSION QUANTIQUE (Q)
```
États superposés:
- Probabilités multiples
- Collapse de la fonction d'onde par observation
- Intrication entre entités
```

## 🔗 API ENDPOINTS 6D

### Panopticon Vision
```
GET /api/panopticon/entities
Response: {
  entities: [{
    id: "hero_001",
    position: {x: 5, y: 3, z: 0},
    temporal: {phase: "present", timeline: 1},
    causal: {chainId: "action_42", depth: 3},
    quantum: {state: "observed", probability: 1.0}
  }]
}
```

### Actions 6D
```
POST /api/action/execute
Body: {
  entityId: "hero_001",
  action: "teleport",
  target: {
    physical: {x: 10, y: 5, z: 2},
    temporal: {shift: -1},  // Voyage dans le temps
    causal: {fork: true}    // Crée une bifurcation
  }
}
```

### Quantum State
```
GET /api/quantum/superposition/{entityId}
Response: {
  states: [
    {probability: 0.6, position: {x: 5, y: 3}},
    {probability: 0.4, position: {x: 7, y: 2}}
  ],
  collapsed: false
}
```

## 🎮 INTÉGRATION GAMEPLAY

### Combat TCG 6D
- **Cartes temporelles**: Affectent le passé/futur
- **Cartes causales**: Modifient les chaînes d'effets
- **Cartes quantiques**: Créent des superpositions

### Navigation 6D
- **Mini-map**: Affiche toutes les dimensions
- **Sliders**: Pour naviguer dans T, C, Q
- **Filtres**: Pour isoler une dimension

## 🛠️ IMPLÉMENTATION TECHNIQUE

### Backend Java (Port 8080)
```java
@Entity
public class Entity6D {
    @Id
    private String id;
    
    @Embedded
    private Position3D physical;
    
    @Embedded
    private TemporalState temporal;
    
    @Embedded
    private CausalChain causal;
    
    @Embedded
    private QuantumState quantum;
}
```

### Frontend Integration
```javascript
// Mini-map 6D
class MiniMap6D {
    constructor() {
        this.dimensions = {
            physical: new PhysicalLayer(),
            temporal: new TemporalLayer(),
            causal: new CausalLayer(),
            quantum: new QuantumLayer()
        };
    }
    
    render(entities) {
        // Rendu multi-dimensionnel
    }
}
```

## 🔮 FEATURES AVANCÉES

### Paradoxes Temporels
- Détection automatique
- Résolution par gameplay
- Effets narratifs

### Intrication Quantique
- Liens entre entités
- Actions synchronisées
- États partagés

### Bifurcations Causales
- Multiples timelines
- Choix significatifs
- Conséquences persistantes

## 📊 MONITORING 6D

### Dashboard Metrics
- Entités par dimension
- Paradoxes actifs
- États quantiques
- Performance par dimension

### Logs Spécialisés
```
[6D] Entity hero_001 shifted temporal: -2 phases
[6D] Quantum collapse at (5,3,0) - probability 0.8
[6D] Causal fork created: timeline_alpha_3
```

## 🚀 OPTIMISATIONS

### Cache Multi-Dimensionnel
- Cache par dimension
- Invalidation intelligente
- Préchargement prédictif

### Calculs Parallèles
- Thread par dimension
- Synchronisation atomique
- Lock-free où possible

---

*"Les 6 dimensions ne sont pas une complexité, mais une liberté !"*
- MEMENTO LE SAGE, Architecte du Backend 6D