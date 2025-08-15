# 🌀 API MAGIE UNIFIÉE - GUIDE POUR LE FRONTEND

**Par** : Le Technomancien  
**Pour** : GROEKEN, SID, LOUMEN, URZ-KÔM et tous les devs frontend  
**Version** : 1.0  

---

## 🚀 DÉMARRAGE RAPIDE

### 1. Lancer le backend
```bash
cd avalon-backend
./mvnw spring-boot:run
# Backend disponible sur http://localhost:8080
```

### 2. Inclure le client JavaScript
```html
<script src="integration/magic-client.js"></script>
```

### 3. Lancer un sort !
```javascript
const result = await AvalonMagic.client.cast(
    'TELEPORT_HERO(Arthur, @10,10)',
    'PLAYER_1'
);
```

---

## 📡 ENDPOINTS PRINCIPAUX

### 🎯 `/api/magic/cast` - Lancer une formule magique

**Méthode** : POST  
**Description** : Point d'entrée unique pour TOUTE la magie d'AVALON

#### Request :
```javascript
{
    "formulaType": "SIMPLE",      // SIMPLE, RUNIC, GROFI, GRUT, TEMPORAL
    "formula": "HEAL(Hero, 50)",  // La formule magique
    "casterId": "PLAYER_1",       // Qui lance le sort
    "targetId": "ENEMY_1",        // Cible (optionnel)
    "parameters": {               // Paramètres additionnels (optionnel)
        "position": { "x": 10, "y": 20 },
        "amplification": 1.5
    }
}
```

#### Response :
```javascript
{
    "success": true,
    "message": "Sort lancé avec succès !",
    "effects": [
        {
            "type": "HEAL",
            "target": "Hero",
            "value": 50
        }
    ],
    "quantumState": null,  // Si c'était une formule quantique
    "manaCost": 20
}
```

---

## 🔮 EXEMPLES PAR TYPE DE MAGIE

### 1. FORMULES SIMPLES

```javascript
// Téléportation
await AvalonMagic.client.cast(
    'TELEPORT_HERO(Arthur, @15,20)',
    'PLAYER_1'
);

// Attaque
await AvalonMagic.client.cast(
    'DAMAGE(Goblin_1, 30)',
    'PLAYER_1'
);

// Soin
await AvalonMagic.client.cast(
    'HEAL(PLAYER_1, 50)',
    'PLAYER_1'
);

// Créer une créature
await AvalonMagic.client.cast(
    'CREATE(CREATURE, Dragon, @10,10)',
    'PLAYER_1'
);
```

### 2. MAGIE QUANTIQUE (RUNIC)

```javascript
// Créer une superposition (action différée)
const quantum = await AvalonMagic.client.cast(
    'ψ001: ⊙(Δt+3 @15,15 ⟶ CREATE(CREATURE, Phoenix, @15,15))',
    'QUANTUM_MAGE'
);
// Retourne : { quantumState: { id: 'ψ001', delay: 3, ... } }

// Effondrer l'état quantique
await AvalonMagic.client.cast(
    'ψ001: †',
    'QUANTUM_MAGE'
);
// L'action se réalise immédiatement !
```

### 3. SYSTÈME GROFI

```javascript
// Fusion avec la forêt
await AvalonMagic.client.cast(
    'FUSION(GROFI, FOREST_THOUGHT)',
    'GROFI_ENTITY'
);

// Override de l'effondrement
await AvalonMagic.client.cast(
    'COLLAPSE_OVERRIDE(ψ002, FORCE)',
    'GROFI_MASTER'
);
```

### 4. ENTITÉ GRUT

```javascript
// Scan panoptique
await AvalonMagic.client.cast(
    'PANOPTIC_SCAN(all_dimensions)',
    'GRUT'
);

// Vision omnisciente
await AvalonMagic.client.cast(
    'VOIR(TOUT, PARTOUT, TOUJOURS)',
    'GRUT'
);
```

### 5. MAGIE TEMPORELLE

```javascript
// Interférence temporelle
await AvalonMagic.client.cast(
    'TEMPORAL_INTERFERENCE(ψ1, ψ2)',
    'TIME_MAGE'
);

// Rollback temporel
await AvalonMagic.client.cast(
    'ROLLBACK(timeline_1, -5)',
    'CHRONOMANCER'
);
```

---

## 🌐 ENDPOINTS ADDITIONNELS

### 📊 `/api/magic/status` - État du système
```javascript
// GET http://localhost:8080/api/magic/status
{
    "grofiActive": true,
    "grutActive": true,
    "activeQuantumStates": 3,
    "systemQuantumStress": 45.7
}
```

### 📚 `/api/magic/formulas` - Liste des formules
```javascript
// GET http://localhost:8080/api/magic/formulas
{
    "totalFormulas": 869,
    "formulasByType": {
        "SIMPLE": 96,
        "RUNIC": 143,
        "GROFI": 11,
        "GRUT": 13,
        "TEMPORAL": 20,
        "COMPLEX": 586
    },
    "formulas": [
        {
            "type": "SIMPLE",
            "formula": "TELEPORT_HERO(name, @x,y)",
            "name": "Téléportation de Héros",
            "description": "Téléporte un héros vers une position",
            "manaCost": 25
        },
        // ... 868 autres formules
    ]
}
```

### 🌀 `/api/universe/state` - État quantique de l'univers
```javascript
// GET http://localhost:8080/api/universe/state
{
    "equation": "Ψ∞ = 0.71·∇⚙️ + 0.42·🧭📐 + 1.00·✴️📖 + ...",
    "truth": "L'univers oscille entre les possibles.",
    "vincentIsRight": true,
    "entities": {
        "GROEKEN": {
            "symbol": "∇⚙️",
            "coefficient": "0.71",
            "collapsedForm": "Hein ? C'est pas typé ce champ là ?"
        },
        // ... autres entités
    }
}
```

---

## 🎮 INTÉGRATION DANS REALGAME

### Pour le Mode Combat (GROEKEN)

```javascript
// Dans combat-system.js
async function playerAttack(attacker, target) {
    // Calculer la formule d'attaque
    const damage = attacker.attackPower;
    const formula = `DAMAGE(${target.id}, ${damage})`;
    
    // Lancer via le backend
    const result = await AvalonMagic.client.cast(
        formula,
        attacker.id
    );
    
    // Appliquer les effets
    if (result.success) {
        result.effects.forEach(effect => {
            if (effect.type === 'DAMAGE') {
                target.health -= effect.value;
                showDamageAnimation(target, effect.value);
            }
        });
    }
}
```

### Pour les Portails BRISURE (SID)

```javascript
// Dans brisure-navigator.js
async function createBrisurePortal(position) {
    const formula = `CREATE_PORTAL(BRISURE, @${position.x},${position.y})`;
    
    const result = await AvalonMagic.client.cast(
        formula,
        'BRISURE_NAVIGATOR',
        null,
        { energyCost: 25 }
    );
    
    if (result.success) {
        // Ajouter le portail visuellement
        addPortalToMap({
            type: 'BRISURE',
            position: position,
            id: result.portalId
        });
    }
}
```

### Pour la Narration (LOUMEN)

```javascript
// Dans narrative-engine.js
async function executeScenarioAction(action) {
    // Parser l'action du scénario .hots
    if (action.type === 'CAST') {
        const result = await AvalonMagic.client.cast(
            action.formula,
            'NARRATOR',
            action.target,
            { 
                scenarioId: currentScenario.id,
                timestamp: getCurrentGameTime()
            }
        );
        
        // Déclencher les dialogues selon le résultat
        if (result.success) {
            triggerDialogue(action.successDialogue);
        } else {
            triggerDialogue(action.failureDialogue);
        }
    }
}
```

### Pour les Effets Visuels (URZ-KÔM)

```javascript
// Dans particle-effects.js
// S'abonner aux états quantiques
async function syncQuantumEffects() {
    const status = await AvalonMagic.client.getSystemStatus();
    
    // Créer des particules selon le stress quantique
    if (status.systemQuantumStress > 50) {
        createQuantumStormEffect();
    }
    
    // Afficher les états quantiques actifs
    status.activeQuantumStates.forEach(state => {
        createQuantumMarker(state.position, state.id);
    });
}
```

---

## 🛠️ CLIENT JAVASCRIPT HELPER

### Méthodes disponibles

```javascript
// Cast basique
AvalonMagic.client.cast(formula, casterId, targetId, parameters)

// Détection automatique du type
AvalonMagic.client.detectFormulaType(formula)

// État du système
AvalonMagic.client.getSystemStatus()

// Liste des formules
AvalonMagic.client.getFormulas()

// Effondrement quantique
AvalonMagic.client.collapseQuantumState(stateId)

// Créer une superposition
AvalonMagic.client.createSuperposition(action, delay, coordinates)
```

### Adaptateur pour REALGAME

```javascript
// Cast simplifié pour le jeu
AvalonMagic.adapter.castGameSpell(spellType, caster, target)

// Application automatique des effets
AvalonMagic.adapter.applyEffectsToGame(effects)
```

---

## 🧪 EXEMPLES DE TEST

### Test rapide dans la console

```javascript
// Ouvrir la console du navigateur (F12)
// Tester une formule simple
await fetch('http://localhost:8080/api/magic/cast', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        formulaType: 'SIMPLE',
        formula: 'HEAL(TEST_HERO, 100)',
        casterId: 'CONSOLE_TEST'
    })
}).then(r => r.json()).then(console.log)
```

### Page de test complète

```html
<!DOCTYPE html>
<html>
<head>
    <title>Test API Magie</title>
</head>
<body>
    <h1>Test Magie AVALON</h1>
    <button onclick="testHeal()">Tester Soin</button>
    <button onclick="testQuantum()">Tester Quantique</button>
    <div id="result"></div>
    
    <script src="integration/magic-client.js"></script>
    <script>
        async function testHeal() {
            const result = await AvalonMagic.client.cast(
                'HEAL(HERO_1, 50)',
                'TEST_PLAYER'
            );
            document.getElementById('result').innerHTML = 
                JSON.stringify(result, null, 2);
        }
        
        async function testQuantum() {
            const result = await AvalonMagic.client.cast(
                'ψ123: ⊙(Δt+2 @5,5 ⟶ CREATE(PORTAL, @5,5))',
                'QUANTUM_TESTER'
            );
            document.getElementById('result').innerHTML = 
                JSON.stringify(result, null, 2);
        }
    </script>
</body>
</html>
```

---

## 🚨 ERREURS COMMUNES

### 1. Backend non lancé
```javascript
// Erreur : Failed to fetch
// Solution : Lancer le backend avec ./mvnw spring-boot:run
```

### 2. Type de formule incorrect
```javascript
// Erreur : "Unknown formula type"
// Solution : Utiliser detectFormulaType() ou spécifier le bon type
```

### 3. Formule mal formée
```javascript
// Erreur : "Invalid formula syntax"
// Solution : Vérifier les parenthèses et la syntaxe
// Bon : HEAL(Hero, 50)
// Mauvais : HEAL Hero 50
```

---

## 💡 TIPS & TRICKS

1. **Cache les formules fréquentes**
```javascript
const commonSpells = await AvalonMagic.client.getFormulas();
// Stocker localement pour éviter les appels répétés
```

2. **Batch les effets visuels**
```javascript
// Au lieu de plusieurs appels
await cast('DAMAGE(Enemy1, 10)');
await cast('DAMAGE(Enemy2, 10)');

// Utiliser une formule complexe
await cast('MULTI_DAMAGE([Enemy1, Enemy2], 10)');
```

3. **Surveiller le stress quantique**
```javascript
setInterval(async () => {
    const status = await AvalonMagic.client.getSystemStatus();
    if (status.systemQuantumStress > 80) {
        console.warn('⚠️ Stress quantique élevé !');
    }
}, 5000);
```

---

## 🆘 SUPPORT

- **Dashboard** : http://localhost:8080
- **Testeur interactif** : http://localhost:8080/index.html
- **Explorateur de formules** : http://localhost:8080/formula-explorer.html
- **État de l'univers** : http://localhost:8080/universal-wave.html

---

*Fait avec 🌀 par le Technomancien*  
*"Un seul conduit quantique pour unifier toute la magie d'AVALON !"*