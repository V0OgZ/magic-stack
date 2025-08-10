# 🎨 GUIDE MIGRATION FRONT V1 → V2
## Ce qui change (et surtout ce qui NE change PAS) pour l'équipe Front

---

## ✅ **LA BONNE NOUVELLE : 95% DE VOTRE CODE NE CHANGE PAS !**

### Ce qui reste EXACTEMENT pareil :
```javascript
// ✅ Tous ces endpoints continuent de marcher EXACTEMENT pareil
GET  /health
POST /agents/plan
POST /matches
GET  /api/hero/status
POST /api/minigames/start
POST /api/craft/potion
// ... TOUS les endpoints V1 restent identiques
```

### Ce qui est ENRICHI (mais backward compatible) :
```javascript
// Avant (V1) - MARCHE TOUJOURS ✅
{
  "id": "hero_1",
  "position": {"x": 10, "y": 20},
  "energy": 75
}

// Après (V2) - MÊMES CHAMPS + NOUVEAUX OPTIONNELS
{
  "id": "hero_1",
  "position": {"x": 10, "y": 20},
  "energy": 75,              // ← Toujours là !
  "temporal": {              // ← NOUVEAU (optionnel)
    "t_e": 42.5,
    "day_hidden": 4
  },
  "energy_complex": {        // ← NOUVEAU (optionnel)
    "a": 75,                 // = energy (synchronisé)
    "phi": 0.8,              // Phase (cohérence)
    "debt_a": 0
  }
}
```

---

## 🎯 **STRATÉGIE DE MIGRATION : 3 PHASES**

### PHASE 1 : "On touche à RIEN" (Semaine 1)
**Vous continuez avec votre code actuel, ZÉRO changement**
```javascript
// Votre code actuel - NE PAS CHANGER
const hero = await fetch('/api/hero/status')
displayEnergy(hero.energy)  // ← Marche toujours !
```

### PHASE 2 : "On teste les nouveaux champs" (Semaine 2)
**On commence à LIRE les nouveaux champs (sans les afficher)**
```javascript
const hero = await fetch('/api/hero/status')
displayEnergy(hero.energy)  // ← Ancien code

// NOUVEAU : Logger pour voir les nouvelles données
if (hero.temporal) {
  console.log('Jour caché:', hero.temporal.day_hidden)
}
if (hero.energy_complex?.phi !== undefined) {
  console.log('Phase:', hero.energy_complex.phi)
}
```

### PHASE 3 : "UI enrichie" (Semaine 3-4)
**On ajoute progressivement les nouveaux indicateurs**
```javascript
// Affichage enrichi OPTIONNEL
if (hero.temporal) {
  displayHiddenDay(hero.temporal.day_hidden)  // Nouveau widget
}
if (hero.energy_complex?.phi !== undefined) {
  displayPhaseBar(hero.energy_complex.phi)     // Nouvelle barre
}
```

---

## 📊 **CE QUI CHANGE CONCRÈTEMENT**

### 1. Barre d'énergie → Double barre
```javascript
// AVANT (marche toujours)
<EnergyBar value={hero.energy} max={100} />

// APRÈS (optionnel)
<div>
  <EnergyBar value={hero.energy} max={100} label="A" />
  {hero.energy_complex?.phi !== undefined && (
    <PhaseBar value={hero.energy_complex.phi} label="Φ" />
  )}
</div>
```

### 2. Position → Position + Visibilité
```javascript
// AVANT (marche toujours)
<MapTile x={hero.position.x} y={hero.position.y} />

// APRÈS (optionnel)
<MapTile 
  x={hero.position.x} 
  y={hero.position.y}
  opc={hero.visibility?.opc_brut}      // Zone atteignable
  fog={hero.visibility?.cf_level}      // Brouillard
/>
```

### 3. État simple → État temporel
```javascript
// AVANT
État: En jeu

// APRÈS (enrichi)
État: En jeu
Jour caché: {hero.temporal?.day_hidden || '?'}
Temps local: {hero.temporal?.t_e || '?'}
Dette: {hero.energy_complex?.debt_a || 0}
```

---

## 🔄 **NOUVEAUX ENDPOINTS V2 (optionnels)**

### Endpoints que vous POUVEZ utiliser (mais pas obligé) :
```javascript
// Tick monde (nouveau)
POST /api/v2/tick
Response: {
  "world_time": 1234.5,
  "entities_updated": 4,
  "regulators_triggered": ["VINCE_SOFTLOCK"],
  "trace_hash": "abc123..."
}

// Migrer une entité vers V2 (optionnel)
POST /api/v2/migrate-entity
Body: {"id": "hero_1", "x": 10, "y": 20, "energy": 75}
Response: {
  "entity": { /* Entité enrichie V2 */ }
}

// Calculer interférence (pour clones)
POST /api/v2/interference
Body: {"entity_a": "hero_1", "entity_b": "clone_1"}
Response: {
  "interference": 0.72,
  "effect": "WeakClone"
}
```

---

## 💡 **EXEMPLES CONCRETS**

### Exemple 1 : Afficher le jour caché (nouveau)
```jsx
// Component HeroStatus.jsx
function HeroStatus({ hero }) {
  return (
    <div>
      {/* Ancien code - GARDER TEL QUEL */}
      <span>Énergie: {hero.energy}</span>
      
      {/* Nouveau code - AJOUTER SI PRÉSENT */}
      {hero.temporal?.day_hidden !== undefined && (
        <span>Jour: {hero.temporal.day_hidden}</span>
      )}
    </div>
  )
}
```

### Exemple 2 : Double halo sur la carte
```jsx
// Component MapView.jsx
function MapView({ hero }) {
  // Ancien code - zones simples
  const reachable = calculateReachable(hero.energy, hero.position)
  
  // Nouveau code - OPC à 3 couches (SI disponible)
  const opc = hero.visibility ? {
    brut: hero.visibility.opc_brut,
    quality: hero.visibility.opc_quality,
    effective: hero.visibility.opc_effective
  } : null
  
  return (
    <Map>
      {/* Affichage avec fallback sur ancien système */}
      {opc ? (
        <DoubleHaloOverlay opc={opc} />
      ) : (
        <SimpleReachableOverlay tiles={reachable} />
      )}
    </Map>
  )
}
```

### Exemple 3 : Indicateur de phase Φ
```jsx
// Component PhaseIndicator.jsx (NOUVEAU - optionnel)
function PhaseIndicator({ hero }) {
  const phi = hero.energy_complex?.phi
  
  // Si pas de phi, ne rien afficher
  if (phi === undefined) return null
  
  // Couleur selon cohérence
  const color = phi > 0.75 ? 'green' : 
                phi > 0.5 ? 'yellow' : 
                phi > 0.25 ? 'orange' : 'red'
  
  return (
    <div className="phase-indicator">
      <div 
        className="phase-bar"
        style={{
          width: `${Math.abs(phi) * 100}%`,
          backgroundColor: color
        }}
      />
      <span>{phi > 0 ? '+' : ''}{(phi * 100).toFixed(0)}%</span>
    </div>
  )
}
```

---

## 🚦 **CHECKLIST MIGRATION**

### Semaine 1 : Préparation
- [ ] ✅ Continuer avec code V1 (rien ne casse)
- [ ] ✅ Tester que tous les endpoints marchent
- [ ] ✅ Logger les nouveaux champs reçus

### Semaine 2 : Exploration
- [ ] Créer composants pour nouveaux indicateurs
- [ ] Les cacher derrière feature flag
- [ ] Tester avec données V2

### Semaine 3 : Intégration
- [ ] Activer progressivement nouveaux widgets
- [ ] Garder fallback sur anciens
- [ ] Tester avec équipe

### Semaine 4 : Polish
- [ ] Animations pour transitions
- [ ] Tooltips explicatifs
- [ ] Documentation utilisateur

---

## ❓ **FAQ FRONT**

### "Est-ce que je DOIS changer mon code ?"
**NON !** Tout est backward compatible. Les nouveaux champs sont optionnels.

### "Quand est-ce que energy et energy_complex.a sont différents ?"
**JAMAIS !** Ils sont synchronisés. `energy` = `energy_complex.a` toujours.

### "Que faire si temporal est undefined ?"
**C'est normal !** Ça veut dire que l'entité n'est pas encore migrée V2. Utilisez l'ancien système.

### "Comment savoir si V2 est activé ?"
```javascript
// Endpoint de config
GET /api/config
Response: {
  "v2_enabled": true,
  "features": {
    "temporal": true,
    "phi": true,
    "regulators": true
  }
}
```

### "Où voir des exemples complets ?"
- Explorer : http://localhost:3001/explorer
- Tests : `/battery-test-complete.py`
- Specs : `/v2spec/` (ce dossier)

---

## 📱 **BONUS : CHECKLIST PWA MOBILE**

Si vous voulez préparer le mobile :
```javascript
// manifest.json
{
  "name": "Heroes of Time",
  "short_name": "HoT",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#6B46C1"
}

// Service Worker pour offline
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

// Responsive design
@media (max-width: 768px) {
  .energy-bars { flex-direction: column; }
  .map-view { touch-action: pan-x pan-y; }
}
```

---

## 🎉 **CONCLUSION**

**La migration V2 est conçue pour être DOUCE :**
1. **Phase 1** : On change RIEN (tout marche)
2. **Phase 2** : On lit les nouveaux champs (exploration)
3. **Phase 3** : On enrichit l'UI (progressif)

**Vous gardez le contrôle !** Activez les features V2 à votre rythme.

---

*Document créé avec ❤️ pour l'équipe Front*
*Par : Opus & l'équipe Backend*
*Questions ? → Discord #front-v2*
