# 🎮 ADAPTATION DES UI & MODES DE JEU AU SYSTÈME V2

## Vue d'ensemble des modes existants

Nous avons créé plusieurs interfaces HTML qui représentent différents modes de jeu. Ce document explique comment les adapter et les intégrer avec le moteur V2.

---

## 1. 🎯 HOT_GAME_UNIFIED - Le Jeu Principal

### État actuel
- **Structure** : Navigation Map/Combat/Timeline
- **Backend** : Connexions aux 3 services (Rust/Java/Python)
- **Touch** : Support PWA et iPad

### Adaptations V2 nécessaires

```javascript
// AVANT (actuel)
const gameState = {
    resources: { crystals: 100, energy: 50 },
    heroPosition: { x: 10, y: 10 }
};

// APRÈS (adapté V2)
const gameState = {
    // Anciens champs conservés
    resources: { crystals: 100, energy: 50 },
    heroPosition: { x: 10, y: 10 },
    
    // NOUVEAUX champs V2
    temporal: {
        tw: 42,                    // Temps monde
        entities: new Map([
            ['hero', {
                te: 41.5,          // Temps entité
                drift: 0.5,        // Dérive temporelle
                energy_complex: {
                    A: 50,         // Partie réelle (= energy)
                    phi: 0.8       // Phase quantique
                },
                identity: {
                    psi: [1, 0, 0], // Vecteur quantique
                    coherence: 0.95
                },
                debt: 0            // Dette temporelle
            }]
        ])
    },
    
    // Régulateurs actifs
    regulators: {
        vince: { active: false, intensity: 0 },
        anna: { active: false, intensity: 0 },
        overload: { active: false, intensity: 0 }
    }
};
```

### Interface V2 enrichie

```javascript
// Ajouter dans HOT_GAME_UNIFIED.html

// 1. AFFICHAGE TEMPS V2
function updateTemporalDisplay() {
    const tw = gameState.temporal.tw;
    const te = gameState.temporal.entities.get('hero').te;
    const drift = Math.abs(tw - te);
    
    document.getElementById('time-display').innerHTML = `
        <div class="time-widget">
            <span class="tw">TW: ${tw.toFixed(1)}</span>
            <span class="te">TE: ${te.toFixed(1)}</span>
            <span class="drift ${drift > 2 ? 'danger' : ''}">
                Δt: ${drift.toFixed(1)}
            </span>
        </div>
    `;
}

// 2. PANNEAU ÉNERGIE COMPLEXE
function renderEnergyComplex() {
    const e = gameState.temporal.entities.get('hero').energy_complex;
    const magnitude = Math.sqrt(e.A * e.A + e.phi * e.phi);
    
    return `
        <div class="energy-complex">
            <div class="real">A: ${e.A}</div>
            <div class="phase">Φ: ${e.phi.toFixed(2)}</div>
            <div class="magnitude">|E|: ${magnitude.toFixed(1)}</div>
        </div>
    `;
}

// 3. APPEL V2 TICK À CHAQUE TOUR
async function endTurn() {
    // Appel au backend V2
    const response = await fetch('http://localhost:3001/api/v2/tick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            current_tw: gameState.temporal.tw,
            entities: Array.from(gameState.temporal.entities.entries())
                .map(([id, data]) => ({
                    id,
                    position: id === 'hero' ? gameState.heroPosition : null,
                    te: data.te,
                    energy_complex: data.energy_complex
                }))
        })
    });
    
    if (response.ok) {
        const result = await response.json();
        // Mise à jour avec les nouvelles valeurs V2
        gameState.temporal.tw = result.new_tw;
        updateTemporalDisplay();
        checkForParadoxes(result.paradoxes);
    }
}
```

---

## 2. 🗺️ CHASSE_TEMPORELLE_MEGA_MAP - Mode Aventure

### État actuel
- Map 6x6 écrans (120x120 hexagones)
- 4 niveaux de difficulté
- Audio atmosphérique
- Appels aux 3 backends

### Adaptations V2 spécifiques

```javascript
// Configuration par difficulté avec paramètres V2
const DIFFICULTY_V2_PARAMS = {
    easy: {
        drift_rate: 0.1,      // Dérive lente
        debt_threshold: 100,   // Seuil de dette élevé
        regulator_aggression: 0.2,
        paradox_frequency: 0.05
    },
    normal: {
        drift_rate: 0.3,
        debt_threshold: 50,
        regulator_aggression: 0.5,
        paradox_frequency: 0.15
    },
    hard: {
        drift_rate: 0.5,
        debt_threshold: 30,
        regulator_aggression: 0.8,
        paradox_frequency: 0.3
    },
    nightmare: {
        drift_rate: 1.0,      // Dérive rapide!
        debt_threshold: 10,    // Dette critique vite
        regulator_aggression: 1.0,
        paradox_frequency: 0.5
    }
};

// Intégration des régulateurs dans la map
function placeRegulators() {
    const positions = [
        { x: 20, y: 20, type: 'vince' },    // Zone Nord-Ouest
        { x: 100, y: 20, type: 'anna' },    // Zone Nord-Est
        { x: 60, y: 60, type: 'overload' }  // Centre
    ];
    
    positions.forEach(pos => {
        GAME.regulators.push({
            ...pos,
            intensity: DIFFICULTY_V2_PARAMS[GAME.difficulty].regulator_aggression,
            // Comportement V2
            onEncounter: async function(hero) {
                if (this.type === 'vince') {
                    // Vince perce le brouillard
                    await clearFogInRadius(hero.position, 10);
                } else if (this.type === 'anna') {
                    // Anna provoque décroissance
                    hero.resources.crystals *= 0.9;
                    hero.energy_complex.A *= 0.95;
                } else if (this.type === 'overload') {
                    // Overload collapse les stacks
                    await resolveParadox('collapse', hero);
                }
            }
        });
    });
}

// Événement JOUR 30 intégré
function checkJour30() {
    if (GAME.day === 30) {
        showJour30Event();
        // Activation spéciale V2
        GAME.temporal.tw = 30.0;
        GAME.temporal.entities.forEach(entity => {
            entity.te = 30.0;  // Synchronisation forcée
            entity.debt = 0;   // Annulation des dettes
        });
    }
}
```

---

## 3. 🎮 MODES COMPLÉMENTAIRES

### MULTIPLAYER_DEMO_HOMM3
```javascript
// Adaptation pour le multi
const multiplayerV2 = {
    players: new Map([
        ['player1', { te: 0, energy_complex: {A: 100, phi: 1.0} }],
        ['player2', { te: 0, energy_complex: {A: 100, phi: 1.0} }]
    ]),
    
    // Synchronisation multi
    async syncPlayers() {
        const response = await fetch('http://localhost:3001/api/v2/sync', {
            method: 'POST',
            body: JSON.stringify({
                players: Array.from(this.players.entries())
            })
        });
        // Appliquer les dérives relatives
    }
};
```

### SPECTATOR_GOD_MODE
```javascript
// Vue arbitre avec tous les paramètres V2
const spectatorV2 = {
    showHiddenDays: true,
    showQuantumStates: true,
    showCausalLinks: true,
    
    renderEntityInfo(entity) {
        return `
            <div class="entity-v2-info">
                <div>TW: ${this.tw} / TE: ${entity.te}</div>
                <div>Drift: ${Math.abs(this.tw - entity.te)}</div>
                <div>Energy: ${entity.energy_complex.A} + ${entity.energy_complex.phi}i</div>
                <div>Identity: |ψ⟩ = ${entity.identity.psi.join(',')}</div>
                <div>Coherence: ${entity.identity.coherence}</div>
                <div>Debt: ${entity.debt}</div>
            </div>
        `;
    }
};
```

### IA_VS_IA_AUTOPLAY
```javascript
// Combat IA avec paramètres V2
const aiCombatV2 = {
    async resolveRound() {
        // Utiliser l'énergie complexe pour les décisions
        const ai1Energy = Math.sqrt(
            Math.pow(this.ai1.energy_complex.A, 2) + 
            Math.pow(this.ai1.energy_complex.phi, 2)
        );
        
        // Résolution selon mode V2
        if (ai1Energy < 10) {
            return await this.resolveByCollapse();  // Instant
        } else if (this.preferTCG) {
            return await this.resolveByTCG();       // Cartes
        } else {
            return await this.resolveByAuto();      // Automatique
        }
    }
};
```

---

## 4. 🔧 HELPERS & UTILS PARTAGÉS

### Créer un module V2 partagé

```javascript
// v2-adapter.js - Module réutilisable

class V2Adapter {
    constructor(backendUrl = 'http://localhost:3001') {
        this.url = backendUrl;
        this.cache = new Map();
    }
    
    // Tick universel
    async tick(state) {
        const response = await fetch(`${this.url}/api/v2/tick`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state)
        });
        return response.json();
    }
    
    // Calcul dérive
    calculateDrift(tw, te) {
        return Math.abs(tw - te);
    }
    
    // Énergie complexe
    complexEnergyMagnitude(A, phi) {
        return Math.sqrt(A * A + phi * phi);
    }
    
    // Vérification paradoxes
    async checkParadoxes(entities) {
        const drifts = entities.map(e => this.calculateDrift(e.tw, e.te));
        const maxDrift = Math.max(...drifts);
        
        if (maxDrift > 5) {
            return { hasParadox: true, severity: 'high' };
        } else if (maxDrift > 2) {
            return { hasParadox: true, severity: 'low' };
        }
        return { hasParadox: false };
    }
    
    // Résolution selon mode
    async resolveConflict(mode, entities) {
        switch(mode) {
            case 'collapse':
                return this.instantCollapse(entities);
            case 'tcg':
                return this.tcgBattle(entities);
            case 'auto':
                return this.autoResolve(entities);
        }
    }
}

// Utilisation dans tous les modes
const v2 = new V2Adapter();
```

---

## 5. 📊 TABLEAU DE MIGRATION

| Mode | Priorité | Effort | Impact V2 |
|------|----------|--------|-----------|
| HOT_GAME_UNIFIED | 🔴 Haute | 2 jours | Core gameplay |
| CHASSE_TEMPORELLE | 🔴 Haute | 1 jour | Mode principal |
| MULTIPLAYER_DEMO | 🟡 Moyenne | 1 jour | Multi enrichi |
| SPECTATOR_GOD | 🟡 Moyenne | 0.5 jour | Debug/Test |
| IA_VS_IA | 🟢 Basse | 0.5 jour | Démos |
| SCENARIOS_TEST | 🟢 Basse | 0.5 jour | Tests auto |

---

## 6. 🚀 COMMANDES POUR TESTER

```bash
# Lancer le stack V2 complet
./h 1

# Tester chaque mode avec V2
./h 10  # HOT_GAME_UNIFIED avec V2
./h 15  # CHASSE_TEMPORELLE avec régulateurs V2
./h 12  # MULTIPLAYER avec sync V2
./h 19  # SPECTATOR avec vue V2 complète
./h 20  # IA_VS_IA avec résolution V2

# Vérifier les logs V2
tail -f logs/rust_v2.log

# Tester l'API V2 directement
curl http://localhost:3001/api/v2/config
```

---

## 7. ✅ CHECKLIST D'INTÉGRATION

### Pour chaque mode :
- [ ] Ajouter structure `temporal` dans l'état
- [ ] Implémenter affichage tw/te/drift
- [ ] Connecter au endpoint `/api/v2/tick`
- [ ] Gérer énergie complexe A + iΦ
- [ ] Afficher identité quantique |ψ⟩
- [ ] Intégrer régulateurs (Vince/Anna/Overload)
- [ ] Gérer paradoxes et résolution
- [ ] Ajouter événement JOUR 30
- [ ] Tester avec backends actifs

### Tests finaux :
- [ ] Jouer 5 minutes sans erreur
- [ ] Vérifier synchronisation multi
- [ ] Valider sauvegarde/chargement
- [ ] Tester sur iPad (PWA)
- [ ] Vérifier performances (60 FPS)

---

## NOTES IMPORTANTES

1. **Ne PAS casser** le code existant - ajouter progressivement
2. **Garder backward compatibility** - `energy` reste synchronisé avec `energy_complex.A`
3. **Mode dégradé** - Si V2 backend down, utiliser valeurs locales
4. **Documentation** - Mettre à jour les tooltips avec explications V2

## Références

- `/v2spec/GUIDE_FRONT_MIGRATION_V2.md` - Guide migration détaillé
- `/___LATEST ENGINE SPECS - 0826/` - Specs complètes V2
- `test_v2_controller.py` - Tests pour valider
