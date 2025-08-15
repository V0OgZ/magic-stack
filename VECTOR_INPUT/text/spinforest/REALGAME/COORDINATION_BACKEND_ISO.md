# 🎮 COORDINATION BACKEND - TESTS ISO

**Date** : 4 Août 2025 (Jour 5)  
**Par** : Claude - Coordinateur Technique  
**Pour** : Équipe Heroes of Time

---

## 🎯 OBJECTIF

Assurer que **TOUS les backends** (existant + nouveau proposé) passent les tests ISO pour le mode carte isométrique.

---

## 📋 BACKENDS À TESTER

### 1. **Backend Existant (Spring Boot)**
- **Location** : `/backend/` 
- **Port** : 8080
- **Status** : Opérationnel (dépendances circulaires résolues)
- **API** : REST classique

### 2. **Backend Mock Python**
- **Location** : `/AVALON/🏠 HOME/⚡🧙 MerFlash/`
- **Port** : 8080 (mock)
- **Status** : Actif
- **API** : Simulation légère

### 3. **Nouveau Backend** (À confirmer)
- **Location** : TBD
- **Port** : TBD
- **Status** : En proposition
- **API** : TBD

---

## 🧪 SUITE DE TESTS ISO REQUIS

### Test 1: **Grille Hexagonale**
```javascript
// Test de coordonnées hexagonales
POST /api/map/hex-to-pixel
{
  "hex": {"q": 5, "r": 3},
  "mapSize": {"width": 1920, "height": 1080}
}

// Réponse attendue
{
  "pixel": {"x": 480, "y": 320},
  "z_index": 8
}
```

### Test 2: **Structures Multi-Hexagones**
```javascript
// Test église 3x3
POST /api/structures/place
{
  "structure": "church",
  "origin": {"q": 10, "r": 10},
  "size": {"width": 3, "height": 3},
  "rotation": 0
}

// Vérifier collision et placement
```

### Test 3: **Couches Z-Index**
```javascript
// Test de rendu par couches
GET /api/render/layers?viewport=0,0,1920,1080

// Doit retourner 5 layers ordonnées
{
  "layers": [
    {"id": 0, "type": "static", "objects": [...]},
    {"id": 1, "type": "interactive", "objects": [...]},
    {"id": 2, "type": "temporal", "objects": [...]},
    {"id": 3, "type": "narrative", "objects": [...]},
    {"id": 4, "type": "ai_backlog", "objects": [...]}
  ]
}
```

### Test 4: **Déclencheurs Isométriques**
```javascript
// Test interaction épée de feu
POST /api/triggers/interact
{
  "hero_position": {"q": 5, "r": 4},
  "target": "fire_sword",
  "action": "take"
}

// Doit activer le vortex
```

### Test 5: **Brouillard de Guerre Hexagonal**
```javascript
// Test fog of war
POST /api/fog/update
{
  "hero_position": {"q": 5, "r": 5},
  "vision_range": 3
}

// Retourne hexagones visibles
```

### Test 6: **Pathfinding ISO**
```javascript
// Test déplacement A*
POST /api/pathfinding/calculate
{
  "from": {"q": 0, "r": 0},
  "to": {"q": 10, "r": 8},
  "avoid": ["lava_tiles", "walls"]
}
```

### Test 7: **Portails et Transitions**
```javascript
// Test activation portail (via stack magique)
POST /api/magic/cast
{
  "spell": "portal_activation",
  "formula": "⊙(hero) + †ψ(vortex) → Δt+0(transition)",
  "target": "orange_vortex"
}
```

### Test 8: **Performance Rendu ISO**
```javascript
// Test 60 FPS avec 1000 objets
GET /api/benchmark/iso-render
{
  "objects": 1000,
  "viewport": "1920x1080",
  "target_fps": 60
}

// Doit maintenir 60 FPS
```

---

## 🔧 IMPLÉMENTATION REQUISE

### Pour CHAQUE Backend :

1. **Endpoints Hexagonaux**
   - Conversion hex ↔ pixel
   - Gestion coordonnées axiales (q,r)
   - Support offset (odd-r, even-r)

2. **Système de Couches**
   - Z-index dynamique
   - Tri par profondeur
   - Transparence/opacité

3. **Collision Hexagonale**
   - Détection multi-hex
   - Pathfinding A*
   - Zones interdites

4. **Intégration Stack Magique**
   - Parser formules temporelles
   - Déclencher effets visuels
   - Gérer états quantiques

---

## 📊 MATRICE DE COMPATIBILITÉ

| Feature | Spring Boot | Python Mock | Nouveau Backend |
|---------|-------------|-------------|-----------------|
| Hex Grid | ✅ | ✅ | ❓ |
| Z-Index | ✅ | ✅ | ❓ |
| Multi-Hex | ✅ | ⚠️ | ❓ |
| Fog of War | ✅ | ❌ | ❓ |
| Pathfinding | ✅ | ❌ | ❓ |
| Magic Stack | ✅ | ✅ | ❓ |
| Performance | ✅ | ⚠️ | ❓ |

---

## 🚀 PROCHAINES ÉTAPES

1. **Créer suite de tests automatisés** (`/REALGAME/tests/iso-test-suite.js`)
2. **Documenter API ISO** (`/REALGAME/docs/iso-api-spec.yaml`)
3. **Benchmarker les backends**
4. **Choisir le meilleur ou créer adaptateur**

---

## 💡 RECOMMANDATIONS

- **Si nouveau backend** : Doit implémenter TOUS les endpoints ISO
- **Si incompatible** : Créer couche d'abstraction
- **Si trop lent** : Optimiser ou utiliser cache Redis
- **Si manque features** : Étendre avec plugins

---

**IMPORTANT** : Aucun backend ne passe en production sans 100% des tests ISO ! 

*"La beauté visuelle nécessite une fondation technique solide"* - Claude

---

**Contact** : @claude_coordinator (Discord à venir)