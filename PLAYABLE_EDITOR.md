# EDITEURS JOUABLES - RECAP COMPLET

## 1. MAP_ICON_PLACER_ADVANCED (HTML standalone)
**Fichier**: `apps/magic-stack-unified/public/assets/MAP_ICON_PLACER_ADVANCED.html`
**Lancement**: `./go map` ou `./go editor`
**Port**: Ouvre directement le fichier HTML

### Caractéristiques:
- Interface drag & drop d'icônes/emojis
- Placement X,Y sur grille visuelle
- Connexions entre icônes
- Export JSON avec positions X,Y
- **PAS de timeline/temporal** dans l'export

### Format export:
```json
{
  "version": "2.0",
  "created": "2025-...",
  "icons": [
    { "x": 100, "y": 200, "emoji": "🏰", ... }
  ],
  "connections": [...]
}
```

---

## 2. WORLD-EDITOR React (Hexagonal avec Timeline)
**Dossier**: `apps/world-editor/`
**Lancement**: `cd apps/world-editor && npm run dev`
**Port**: http://localhost:5173

### Caractéristiques:
- Grille HEXAGONALE (coordonnées Q,R)
- Types de terrain: herbe, forêt, montagne, eau, désert, neige, lave, void
- Timeline avec événements par jour
- Paramètres temporels: tw, te, day
- Régulateurs: Vince, Anna, Overload
- Export scénario complet V2

### Format scénario V2:
```typescript
{
  id: string,
  version: "2.0",
  metadata: { name, description, difficulty, duration },
  initial_state: {
    day: 1,
    tw: 0,      // world time
    te: 0,      // entity time
    resources: { crystals, energy, temporal, quantum }
  },
  map: {
    size: { x: 60, y: 60 },
    terrain: [],
    objects: [
      { kind: "POI", x: 10, y: 20, data: {...} }
    ]
  },
  events: [
    { id: "evt1", day: 30, type: "spawn", payload: {...} }
  ],
  regulators: {
    vince: { active: true, zone: "" },
    anna: { decay: 0, zone: "" },
    overload: { stack: 0, maxStack: 10 }
  }
}
```

---

## 3. STRUCTURE_EDITOR (React Unified - CASSÉ)
**Fichier**: `apps/magic-stack-unified/src/modes/unified/components/StructureEditor.tsx`
**Port théorique**: http://localhost:5175/editor ou /unified
**Status**: ❌ CASSÉ - Le React unified ne compile pas

### Ce qu'il devait faire:
- Remplacer le world-editor
- Intégrer terrain hexagonal + placement ressources
- Mode "L'ÉDITEUR EST LE JEU"

---

## FUSION À FAIRE

Vincent veut FUSIONNER:
1. **MAP_ICON_PLACER** → pour placer des ressources/icônes
2. **WORLD-EDITOR** → pour créer le terrain hexagonal et timeline

### Problème identifié:
- MAP_ICON_PLACER sauve en X,Y sans timeline
- WORLD-EDITOR a timeline mais pas d'interface icônes drag&drop

### Solution proposée:
Ajouter dans WORLD-EDITOR:
- Panel d'icônes drag&drop (comme MAP_ICON_PLACER)
- Sauver les icônes dans `map.objects` avec coordonnées hex ET timeline
- Format unifié: `{ kind: "icon", x, y, day: 1, t_w: 0, emoji: "🏰" }`

---

## COMMANDES RAPIDES

```bash
# Lancer MAP_ICON_PLACER
./go map

# Lancer WORLD-EDITOR React
cd apps/world-editor && npm run dev
# Puis ouvrir http://localhost:5173

# Status des services
./go status

# Voir les ports utilisés
lsof -i :5173,5175,8000 | grep LISTEN
```

---

## NOTES IMPORTANTES

1. **Coordonnées**:
   - MAP_ICON_PLACER: X,Y pixels
   - WORLD-EDITOR: Q,R hexagonal + objets X,Y sur la map

2. **Timeline**:
   - MAP_ICON_PLACER: ❌ Pas de timeline
   - WORLD-EDITOR: ✅ Timeline complète (day, tw, te, events)

3. **Le cousin de Vincent**:
   - Peut utiliser MAP_ICON_PLACER tout de suite via `./go map`
   - Pour des maps complexes avec timeline → WORLD-EDITOR

4. **Interstice** (pour les IA):
   - Pas encore activé (crash récent)
   - Prévu pour persistence des mages IA
