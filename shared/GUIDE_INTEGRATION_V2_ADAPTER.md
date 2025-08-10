# 🔌 Guide d'Intégration V2 Adapter

## ⚡ Quick Start - Intégrer V2 dans n'importe quel HTML

### 1️⃣ Ajouter le script
```html
<!-- Dans ton HTML existant -->
<script src="shared/v2-adapter.js"></script>
```

### 2️⃣ Initialiser l'adapter
```javascript
// Au début de ton script
const adapter = new V2Adapter();
adapter.injectStyles(); // Ajoute les styles V2 automatiquement
```

### 3️⃣ Utiliser les méthodes V2
```javascript
// Tick V2 - remplace ton ancien tick
async function gameTick() {
    const result = await adapter.tick(gameState);
    
    // result contient:
    // - new_tw: nouveau temps monde
    // - new_te: nouveau temps entité
    // - debt: dette temporelle
    // - paradoxes: array de paradoxes détectés
}

// Affichage temporal
document.getElementById('temporal-ui').innerHTML = 
    adapter.renderTemporalDisplay(tw, te, debt);

// Affichage énergie complexe
document.getElementById('energy-ui').innerHTML = 
    adapter.renderEnergyComplex(energyData);

// Affichage régulateurs
document.getElementById('regulators-ui').innerHTML = 
    adapter.renderRegulators(regulators);
```

## 📦 Exemples d'Intégration par Mode

### HOT_GAME_UNIFIED.html
```javascript
// AVANT
function endTurn() {
    gameState.turn++;
    updateResources();
    updateDisplay();
}

// APRÈS avec V2
const adapter = new V2Adapter();

async function endTurn() {
    // Tick V2
    const v2Result = await adapter.tick(gameState);
    
    // Mise à jour état V2
    gameState.temporal.tw = v2Result.new_tw;
    gameState.temporal.te = v2Result.new_te;
    gameState.temporal.debt = v2Result.debt;
    
    // Détection paradoxes
    if (v2Result.paradoxes?.length > 0) {
        handleParadoxes(v2Result.paradoxes);
    }
    
    // Ancienne logique conservée
    gameState.turn++;
    updateResources();
    
    // Nouveau display V2
    updateDisplayV2();
}

function updateDisplayV2() {
    // Remplacer ou ajouter aux displays existants
    document.getElementById('time-display').innerHTML = 
        adapter.renderTemporalDisplay(
            gameState.temporal.tw,
            gameState.temporal.te,
            gameState.temporal.debt
        );
}
```

### CHASSE_TEMPORELLE_MEGA_MAP.html
```javascript
// Adapter la difficulté avec V2
const DIFFICULTY_CONFIG = {
    easy: {
        driftRate: 0.1,    // V2: dérive lente
        debtLimit: 100,    // V2: dette max élevée
        tickCallback: async (state) => {
            // Tick V2 avec paramètres easy
            return adapter.tick({
                ...state,
                temporal: {
                    ...state.temporal,
                    debtRate: 0.01  // Accumulation lente
                }
            });
        }
    },
    hard: {
        driftRate: 0.5,    // V2: dérive rapide
        debtLimit: 30,     // V2: dette max basse
        tickCallback: async (state) => {
            return adapter.tick({
                ...state,
                temporal: {
                    ...state.temporal,
                    debtRate: 0.1   // Accumulation rapide
                }
            });
        }
    }
};
```

### WORLD_EDITOR.html
```javascript
// Ajouter visualisation V2 dans l'éditeur
const adapter = new V2Adapter();

// Panneau de debug V2
function createV2DebugPanel() {
    const panel = document.createElement('div');
    panel.className = 'v2-debug-panel';
    panel.innerHTML = `
        <h3>Debug V2</h3>
        <div id="v2-temporal"></div>
        <div id="v2-energy"></div>
        <div id="v2-paradoxes"></div>
    `;
    
    // Update temps réel
    setInterval(() => {
        const paradoxes = adapter.detectParadoxes(worldState);
        
        panel.querySelector('#v2-temporal').innerHTML = 
            adapter.renderTemporalDisplay(
                worldState.temporal.tw,
                worldState.temporal.te,
                worldState.temporal.debt
            );
        
        panel.querySelector('#v2-paradoxes').innerHTML = 
            paradoxes.length > 0 
                ? `⚠️ ${paradoxes.length} paradoxe(s) détecté(s)`
                : '✅ Pas de paradoxe';
    }, 1000);
    
    return panel;
}
```

## 🎮 Gestion des Régulateurs

### Vince - Perçage Temporel
```javascript
// Activer Vince
async function activateVince(position) {
    try {
        await adapter.activateVince(position, intensity = 1);
        showEffect('vince_pierce', position);
    } catch (e) {
        console.log('Vince activé en mode fallback');
    }
}
```

### Anna - Décroissance
```javascript
// Activer Anna
async function activateAnna() {
    const decayRate = 5; // 5% par tick
    await adapter.activateAnna(decayRate);
    
    // Appliquer visuellement
    gameState.resources.energy *= (1 - decayRate/100);
    updateResourceDisplay();
}
```

### Overload - Surcharge
```javascript
// Gérer Overload
function addOverloadStack() {
    gameState.regulators.overload.stack++;
    
    if (gameState.regulators.overload.stack >= 10) {
        // EXPLOSION!
        adapter.triggerOverload();
        triggerParadoxExplosion();
        gameState.regulators.overload.stack = 0;
    }
    
    updateRegulatorDisplay();
}
```

## 🔄 WebSocket pour Temps Réel

```javascript
// Connexion WebSocket V2
adapter.connectWebSocket(8001);

// Écouter les événements
adapter.on('tick', (data) => {
    // Mise à jour automatique à chaque tick serveur
    gameState.temporal = data.temporal;
    updateDisplay();
});

adapter.on('paradox', (data) => {
    // Alerte paradoxe temps réel
    showParadoxAlert(data);
});

adapter.on('ws:disconnected', () => {
    // Fallback mode offline
    console.log('Mode hors ligne activé');
});
```

## 📊 État Minimal V2

Si ton état actuel n'a pas la structure V2, voici le minimum requis :

```javascript
// Structure minimale pour V2
const gameState = {
    // Ajout obligatoire pour V2
    temporal: {
        tw: 0,      // Temps monde
        te: 0,      // Temps entité
        debt: 0,    // Dette temporelle
        debtRate: 0.05
    },
    
    // Si tu as déjà ça, garde-le
    resources: { /* ... */ },
    heroPosition: { /* ... */ },
    
    // Optionnel mais recommandé
    regulators: {
        vince: { active: false },
        anna: { active: false, decayRate: 5 },
        overload: { stack: 0, maxStack: 10 }
    }
};
```

## 🧪 Tester l'Intégration

1. Ouvre `shared/test-v2-integration.html`
2. Lance les backends :
   ```bash
   ./h-profondeur start  # Rust V2 sur 3001
   ```
3. Clique "Tester Connexions"
4. Si tout est vert → V2 prêt !

## 🆘 Troubleshooting

### "Backend non disponible"
→ L'adapter a un mode fallback, le jeu continue de marcher

### "Paradoxe détecté"
→ Normal si drift > 10 ou dette > 50

### "Styles cassés"
→ Appelle `adapter.injectStyles()` au début

### "WebSocket ne se connecte pas"
→ Port 8001 par défaut, vérifie que le service tourne

## 📝 Checklist d'Intégration

Pour chaque HTML :
- [ ] Ajouter `<script src="shared/v2-adapter.js">`
- [ ] Créer `const adapter = new V2Adapter()`
- [ ] Ajouter `temporal` dans gameState
- [ ] Remplacer le tick par `adapter.tick()`
- [ ] Ajouter les displays V2 (`renderTemporalDisplay`, etc.)
- [ ] Tester avec `test-v2-integration.html`
- [ ] (Optionnel) Connecter WebSocket
- [ ] (Optionnel) Ajouter régulateurs

---

**🎉 C'est tout !** Le V2 Adapter gère le reste. L'autre Claude peut maintenant se concentrer sur le contenu pendant que l'intégration technique est prête.
