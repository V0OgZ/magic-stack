# STRATÉGIE DE FUSION - React WorldEditor + HTML Maps

## 📁 COMPOSANTS REACT À RÉCUPÉRER

### 1. HexGrid.tsx (Grille hexagonale)
**Source**: `apps/world-editor/src/ui/HexGrid.tsx`
**Fonctionnalités**:
- Grille hexagonale avec coordonnées Q,R
- Pan & Zoom (molette souris)
- Terrain coloré (grass, water, mountain, etc.)
- Overlay pour zones (OPC/CF)
- Sélection de cases

### 2. IconPalette.tsx (Palette d'icônes)
**Source**: `apps/world-editor/src/ui/IconPalette.tsx`
**Fonctionnalités**:
- Catégories d'icônes/emojis
- Drag & drop
- Recherche

### 3. TimelineView.tsx (Timeline)
**Source**: `apps/world-editor/src/ui/TimelineView.tsx`
**Fonctionnalités**:
- Événements par jour
- tw/te temporel
- Ajout/suppression d'events

### 4. useEditorStore.ts (State management)
**Source**: `apps/world-editor/src/state/useEditorStore.ts`
**Fonctionnalités**:
- Zustand store
- Gestion du scénario complet
- Undo/Redo
- Export/Import JSON

### 5. schema.ts (Format de données)
**Source**: `apps/world-editor/src/domain/schema.ts`
**Format V2**:
```typescript
{
  id: string,
  version: "2.0",
  initial_state: { day, tw, te, resources },
  map: {
    size: { x, y },
    terrain: [],
    objects: [{ kind, x, y, data }]
  },
  events: [{ id, day, type, payload }],
  regulators: { vince, anna, overload }
}
```

---

## 🔄 STRATÉGIE DE FUSION

### Option A: TOUT EN REACT (Recommandé)
1. **Copier** `apps/world-editor/` vers nouveau dossier
2. **Ajouter** les features de MAP_ICON_PLACER:
   - Panneau droit properties
   - Connexions entre icônes
   - Layers panel
3. **Intégrer** les features de CHASSE_TEMPORELLE:
   - Heroes déplaçables
   - Combat system
   - Resources display

### Option B: HTML + COMPOSANTS REACT
1. **Garder** les HTML statiques
2. **Compiler** les composants React en bundles JS
3. **Injecter** dans les HTML via:
```html
<div id="hex-grid-root"></div>
<script src="hex-grid-bundle.js"></script>
<script>
  HexGridComponent.render('#hex-grid-root', {
    cols: 60,
    rows: 60,
    onSelect: (x,y) => console.log(x,y)
  });
</script>
```

### Option C: HYBRIDE PROGRESSIF
1. **Phase 1**: Copier le HexGrid React dans MAP_ICON_PLACER
2. **Phase 2**: Ajouter Timeline React dans CHASSE_TEMPORELLE
3. **Phase 3**: Unifier le tout dans un nouveau "UNIFIED_EDITOR"

---

## 📝 CONVERSION REACT → HTML STANDALONE

### HexGrid React → Canvas HTML
```javascript
// Version simplifiée pour HTML
class HexGridCanvas {
  constructor(canvas, options) {
    this.ctx = canvas.getContext('2d');
    this.cols = options.cols || 60;
    this.rows = options.rows || 60;
    this.hexSize = options.size || 30;
    this.terrain = [];
    this.objects = [];
    this.init();
  }
  
  drawHex(x, y, color) {
    const hexWidth = this.hexSize * 2;
    const hexHeight = Math.sqrt(3) * this.hexSize;
    const left = x * (hexWidth * 0.75);
    const top = y * hexHeight + (x % 2 ? hexHeight / 2 : 0);
    
    this.ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const hx = left + this.hexSize * Math.cos(angle);
      const hy = top + this.hexSize * Math.sin(angle);
      if (i === 0) this.ctx.moveTo(hx, hy);
      else this.ctx.lineTo(hx, hy);
    }
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.stroke();
  }
  
  placeObject(x, y, emoji, data) {
    this.objects.push({ x, y, emoji, ...data });
    this.redraw();
  }
}
```

### Timeline React → HTML Timeline
```javascript
// Version HTML simple
class TimelineManager {
  constructor(container) {
    this.container = container;
    this.day = 1;
    this.tw = 0;
    this.te = 0;
    this.events = [];
  }
  
  addEvent(day, type, payload) {
    this.events.push({ id: Date.now(), day, type, payload });
    this.render();
  }
  
  render() {
    this.container.innerHTML = `
      <div class="timeline">
        <h3>Jour ${this.day}</h3>
        <div>tw: ${this.tw} | te: ${this.te}</div>
        <div class="events">
          ${this.events.filter(e => e.day === this.day)
            .map(e => `<div>${e.type}: ${JSON.stringify(e.payload)}</div>`)
            .join('')}
        </div>
      </div>
    `;
  }
}
```

---

## 🚀 NEXT STEPS

### 1. DÉCISION: Quelle option?
- **A**: Tout React → Plus propre, unifié
- **B**: HTML + React modules → Plus flexible
- **C**: Hybride → Plus progressif

### 2. PRIORITÉS:
1. **Grille hexagonale** dans MAP_ICON_PLACER
2. **Timeline** dans tous les éditeurs  
3. **Export unifié** V2 avec temporel

### 3. QUICK WIN:
Créer un **MEGA_EDITOR.html** qui combine:
- Canvas hexagonal (du WorldEditor)
- Drag & drop icônes (du MAP_ICON_PLACER)
- Timeline simple (nouveau)
- Export JSON V2 complet

---

## 📦 FICHIERS À COPIER

Si on fait l'option QUICK WIN:
```bash
# Créer nouveau fichier
touch MEGA_EDITOR.html

# Copier les assets
cp apps/world-editor/src/ui/theme.css public/
cp apps/world-editor/src/domain/schema.ts public/schema.js

# Adapter en JS vanilla:
- HexGrid.tsx → hex-grid.js
- TimelineView.tsx → timeline.js
- IconPalette.tsx → icon-palette.js
```

---

## ⚠️ POINTS D'ATTENTION

1. **Coordonnées**:
   - WorldEditor: Q,R hexagonal
   - MAP_ICON_PLACER: X,Y pixels
   - → Conversion nécessaire

2. **Timeline**:
   - Ajouter `day`, `tw`, `te` aux icônes placées
   - Gérer les events temporels

3. **Performance**:
   - React = Virtual DOM optimisé
   - HTML Canvas = Redraw manuel
   - → Optimiser les redraws

4. **State**:
   - React: Zustand centralisé
   - HTML: Variables globales ou classes
   - → Bien structurer le state
