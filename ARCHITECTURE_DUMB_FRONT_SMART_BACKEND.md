# 🧠 Architecture "Dumb Front, Smart Backend"

## ✅ PRINCIPE FONDAMENTAL

**Frontend = Affichage UNIQUEMENT**
**Backend = TOUTE l'intelligence**

---

## 📊 AUDIT ACTUEL

### ❌ CE QUI EST MAL (Intelligence dans le Front)

```javascript
// ❌ MAUVAIS - Calculs dans le front
calculateDrift(tw, te) {
    return tw - te;  // Le backend devrait calculer ça !
}

calculateInterference(entity1, entity2) {
    // ❌ Logique métier dans le front !
    const phaseDiff = entity1.energy_complex.phase - entity2.energy_complex.phase;
    const distance = this.getDistance(entity1.position, entity2.position);
    return Math.cos(phaseDiff) * (1 - distance / 10);
}

detectParadoxes(state) {
    // ❌ Règles business dans le front !
    if (Math.abs(state.temporal.tw - state.temporal.te) > 10) {
        paradoxes.push({ type: 'excessive_drift' });
    }
}
```

### ✅ CE QUI EST BIEN (Appels Backend)

```javascript
// ✅ BON - Le front appelle le backend
async tick(state) {
    const response = await fetch(`${this.endpoints.rust}/api/v2/tick`, {
        method: 'POST',
        body: JSON.stringify(state)
    });
    return response.json(); // Backend fait le calcul
}

// ✅ BON - Délégation au backend
async activateVince(position, intensity) {
    return fetch(`${this.endpoints.rust}/api/v2/regulators/vince`, {
        method: 'POST',
        body: JSON.stringify({ position, intensity })
    }).then(r => r.json());
}
```

---

## 🎯 ARCHITECTURE IDÉALE

### 1. Frontend (Dumb)
```typescript
// Le front ENVOIE les actions, REÇOIT l'état, AFFICHE
class DumbFrontend {
    // ✅ Juste envoyer l'action
    async moveHero(x: number, y: number) {
        return api.post('/action/move', { x, y });
    }
    
    // ✅ Juste récupérer l'état
    async getGameState() {
        return api.get('/state');
    }
    
    // ✅ Juste afficher
    render(state: GameState) {
        // Pas de calculs, juste du mapping visuel
        state.entities.forEach(e => drawEntity(e));
        showText(`Drift: ${state.calculatedDrift}`); // Déjà calculé !
    }
}
```

### 2. Backend (Smart)
```python
# Le backend CALCULE tout
class SmartBackend:
    def tick(self, state):
        # ✅ Tous les calculs ici
        drift = self.calculate_drift(state.tw, state.te)
        paradoxes = self.detect_paradoxes(state)
        interference = self.calculate_interference(state.entities)
        
        # ✅ Retourner l'état COMPLET avec tout pré-calculé
        return {
            "tw": new_tw,
            "te": new_te,
            "drift": drift,  # Déjà calculé !
            "paradoxes": paradoxes,  # Déjà détectés !
            "interference": interference,  # Déjà calculé !
            "visual_hints": {  # Même les hints visuels !
                "drift_color": "red" if drift > 5 else "yellow",
                "show_warning": len(paradoxes) > 0
            }
        }
```

---

## 🔄 REFACTORING NÉCESSAIRE

### Étape 1: Déplacer les Calculs

```javascript
// AVANT (v2-adapter.js)
calculateDrift(tw, te) {
    return tw - te;
}

// APRÈS - Supprimer du front et ajouter au backend
// Backend Rust: src/v2/calculations.rs
pub fn calculate_drift(tw: f32, te: f32) -> f32 {
    tw - te
}
```

### Étape 2: API Endpoints Complets

```rust
// Backend doit TOUT calculer et retourner
#[post("/api/v2/tick")]
async fn tick(state: GameState) -> TickResult {
    TickResult {
        new_tw: state.tw + 1.0,
        new_te: state.te + 0.95,
        drift: calculate_drift(state.tw, state.te),
        debt: calculate_debt(&state),
        paradoxes: detect_paradoxes(&state),
        interference_matrix: calculate_all_interferences(&state.entities),
        visual_state: generate_visual_hints(&state),
        next_actions: get_available_actions(&state),
    }
}
```

### Étape 3: Frontend Simplifié

```javascript
// Le nouveau v2-adapter SANS intelligence
class V2AdapterDumb {
    async tick(state) {
        // Juste envoyer et recevoir
        const result = await fetch('/api/v2/tick', {
            method: 'POST',
            body: JSON.stringify(state)
        });
        return result.json();
    }
    
    // Plus de calculateDrift, calculateInterference, etc.
    // Tout vient du backend !
}
```

---

## 📋 TODO List Refactoring

### Backend (Rust/Python/Java)
- [ ] Créer `/api/v2/calculate/drift`
- [ ] Créer `/api/v2/calculate/interference`
- [ ] Créer `/api/v2/detect/paradoxes`
- [ ] Enrichir `/api/v2/tick` avec TOUS les calculs
- [ ] Ajouter `visual_hints` dans les réponses

### Frontend (React/JS)
- [ ] Supprimer `calculateDrift` du v2-adapter
- [ ] Supprimer `calculateInterference` du v2-adapter
- [ ] Supprimer `detectParadoxes` du v2-adapter
- [ ] Remplacer par des appels API
- [ ] Utiliser les `visual_hints` du backend

---

## 🎨 Exemple Concret: Affichage du Drift

### ❌ AVANT (Mauvais)
```javascript
// Frontend calcule et décide de la couleur
const drift = calculateDrift(tw, te);
const color = drift > 5 ? 'red' : drift > 2 ? 'yellow' : 'green';
return <div style={{color}}>{drift}</div>;
```

### ✅ APRÈS (Bon)
```javascript
// Backend a déjà tout calculé
const { drift, visual_hints } = await api.getState();
return <div style={{color: visual_hints.drift_color}}>{drift}</div>;
```

---

## 🚀 Bénéfices

1. **Performance** : Calculs centralisés, cache possible
2. **Sécurité** : Pas de logique métier exposée
3. **Cohérence** : Une seule source de vérité
4. **Évolution** : Changements de règles sans toucher le front
5. **Multi-plateforme** : Même backend pour web/mobile/desktop

---

## ⚠️ Exceptions Acceptables

Quelques calculs VISUELS peuvent rester côté front :
- Animations (interpolation de positions)
- Effets graphiques (particules, shaders)
- Prévisualisation temporaire (avant confirmation serveur)

Mais JAMAIS de logique métier !

---

**Règle d'or** : Si ça affecte le gameplay → BACKEND
Si c'est purement visuel → OK pour le front
