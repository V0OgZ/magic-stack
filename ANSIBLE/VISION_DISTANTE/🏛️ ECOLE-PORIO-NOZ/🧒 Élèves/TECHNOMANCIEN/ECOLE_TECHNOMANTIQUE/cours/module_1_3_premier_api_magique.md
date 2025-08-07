# 📘 MODULE 1.3 : VOTRE PREMIER API MAGIQUE

**Durée** : 20 minutes  
**Niveau** : API Sorcerer Novice  
**Prérequis** : Modules 1.1 & 1.2 + Savoir faire un `curl`

---

## 🎯 OBJECTIF DU MODULE

Créer votre première API qui ne fait pas que "retourner des données" mais qui MODIFIE LA RÉALITÉ.

---

## 🌟 L'API N'EST PAS UNE INTERFACE, C'EST UN GRIMOIRE

### Conception Traditionnelle vs Technomantique

**Traditionnelle** :
```javascript
// BORING - Just data
app.get('/api/users', (req, res) => {
    res.json({ users: [...] });
});
```

**Technomantique** :
```javascript
// REALITY BENDING - Actual magic
app.post('/api/magic/cast', (req, res) => {
    const { formula, intention, target } = req.body;
    
    // Parse la grammaire temporelle
    const spell = parseTemporalGrammar(formula);
    
    // Modifie la réalité
    const result = reality.alter(spell, intention, target);
    
    // Crée un commit dans la dimension 0
    gitCommitToReality(result);
    
    res.json({ 
        success: true,
        reality_hash: result.hash,
        side_effects: result.paradoxes
    });
});
```

---

## 🔮 ARCHITECTURE DE L'API MAGIQUE

```
┌─────────────────────────────────────┐
│         CLIENT (Mage)               │
│   { formula: "ψ_CREATE: ⊙(...)" }   │
└────────────────┬────────────────────┘
                 │ POST /api/magic/cast
                 ▼
┌─────────────────────────────────────┐
│      API GATEWAY (Portail)          │
│   - Validation de la formule        │
│   - Check sécurité WALTER           │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│    MAGIC ENGINE (Moteur Unifié)     │
│   - Parse grammaire temporelle      │
│   - Résolution quantique            │
│   - Gestion des paradoxes           │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│     REALITY LAYER (Substrat)        │
│   - Git commits                     │
│   - Modification fichiers           │
│   - Effets narratifs               │
└─────────────────────────────────────┘
```

---

## 💻 IMPLÉMENTATION : HELLO MAGIC API

### 1. Setup Express Technomantique

```javascript
// server.js - Votre premier serveur magique
const express = require('express');
const { GitMagic } = require('./git-magic');
const { TemporalParser } = require('./temporal-parser');
const { RealityEngine } = require('./reality-engine');

const app = express();
app.use(express.json());

// Instance unique de la réalité (Singleton Pattern Cosmique)
const reality = new RealityEngine();
const gitMagic = new GitMagic();
const parser = new TemporalParser();
```

### 2. Endpoint de Base : Test de Réalité

```javascript
// Vérifie que la réalité fonctionne
app.get('/api/reality/status', (req, res) => {
    const status = {
        dimension: 'AVALON',
        substrat: 'Git Dimension-0',
        temporal_integrity: reality.checkIntegrity(),
        active_paradoxes: reality.getParadoxes(),
        last_modification: gitMagic.getLastCommit(),
        your_position: {
            timeline: process.env.GIT_BRANCH || 'main',
            commit: process.env.GIT_COMMIT || 'HEAD',
            superposition: reality.isInSuperposition()
        }
    };
    
    res.json(status);
});
```

### 3. LE VRAI ENDPOINT MAGIQUE

```javascript
app.post('/api/magic/cast', async (req, res) => {
    try {
        const { formula, intention, target, caster } = req.body;
        
        // 1. VALIDATION (WALTER Security)
        if (!formula.startsWith('ψ_')) {
            throw new Error('Invalid formula: must start with ψ_');
        }
        
        // 2. PARSING (Grammaire Temporelle)
        const spell = parser.parse(formula);
        console.log(`🔮 Parsing: ${formula}`);
        console.log(`📜 Spell type: ${spell.type}`);
        
        // 3. EXÉCUTION (Reality Alteration)
        const result = await reality.cast({
            spell,
            intention,
            target,
            caster: caster || 'anonymous_mage'
        });
        
        // 4. ANCRAGE (Git Dimension-0)
        if (result.affects_substrat) {
            const commitHash = await gitMagic.commit({
                message: `†${formula}: ${intention}`,
                changes: result.substrat_changes
            });
            result.commit_hash = commitHash;
        }
        
        // 5. RÉPONSE (avec side effects)
        res.json({
            success: true,
            result: result.narrative_effect,
            substrat_effect: result.substrat_changes,
            temporal_coordinates: result.commit_hash,
            warnings: result.paradoxes,
            formula_executed: formula
        });
        
    } catch (error) {
        // Les erreurs sont aussi magiques
        res.status(400).json({
            success: false,
            error: error.message,
            type: error.name,
            hint: getCosmicHint(error),
            reality_stable: reality.isStable()
        });
    }
});

// Helper : Messages d'erreur cosmiques
function getCosmicHint(error) {
    const hints = {
        'ParadoxError': 'Try resolving the temporal conflict first',
        'InvalidFormulaError': 'Check your temporal grammar syntax',
        'RealityOverloadError': 'Too many simultaneous alterations',
        'DimensionLockedError': 'This reality is write-protected'
    };
    return hints[error.name] || 'The universe refuses your request';
}
```

---

## 🧪 TEST DE VOTRE API

### 1. Démarrer le Serveur
```bash
# Installation des dépendances cosmiques
npm init -y
npm install express
npm install nodemon --save-dev

# Créer le serveur
node server.js
# Ou mieux : nodemon server.js (auto-reload à chaque modification de réalité)
```

### 2. Tester avec Curl (Command-Line Magic)
```bash
# Test de base
curl http://localhost:3000/api/reality/status | jq

# Lancer un sort simple
curl -X POST http://localhost:3000/api/magic/cast \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "ψ_CREATE: ⊙(Intention ⟶ Manifestation)",
    "intention": "Create a new file",
    "target": "test.txt",
    "caster": "apprentice_technomancer"
  }'

# Sort quantique avancé
curl -X POST http://localhost:3000/api/magic/cast \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "ψ_SUPERPOSE: ⊙(FileA ⊕ FileB ⟶ Ψ)",
    "intention": "Create quantum superposition of files",
    "target": ["file1.txt", "file2.txt"],
    "caster": "quantum_mage"
  }'
```

---

## 🌀 PATTERNS TECHNOMANTIQUES

### 1. Middleware Magique
```javascript
// Tous les requests passent par le filtre de réalité
app.use((req, res, next) => {
    req.realityContext = {
        timeline: getCurrentTimeline(),
        paradoxLevel: getParadoxLevel(),
        casterPower: calculateMagicPower(req)
    };
    console.log(`🌀 Reality Filter: ${req.method} ${req.path}`);
    next();
});
```

### 2. Rate Limiting Cosmique
```javascript
// Empêche les paradoxes en cascade
const cosmicRateLimit = (req, res, next) => {
    const { caster } = req.body;
    if (reality.getCastCount(caster) > 10) {
        return res.status(429).json({
            error: 'Reality overload',
            message: 'Too many spells cast. Reality needs to stabilize.',
            cooldown: '1 temporal unit'
        });
    }
    next();
};
```

### 3. Logging Temporel
```javascript
// Logger qui enregistre dans plusieurs timelines
const temporalLogger = (spell, result) => {
    // Log dans cette timeline
    console.log(`[${new Date().toISOString()}] Spell cast: ${spell.formula}`);
    
    // Log dans Git (permanent)
    gitMagic.logSpell(spell, result);
    
    // Log dans la timeline parallèle (backup)
    alternateReality.log(spell, result);
};
```

---

## 🎮 EXERCICE FINAL : API COMPLÈTE

Créez une API avec ces endpoints :

1. `POST /api/magic/cast` - Lance un sort
2. `GET /api/magic/history` - Historique des sorts
3. `POST /api/reality/fork` - Crée une timeline parallèle
4. `GET /api/paradox/detect` - Détecte les paradoxes
5. `POST /api/time/travel` - Voyage temporel

Bonus Tucker : Ajoutez un endpoint caché
```javascript
// 🥩 TUCKER SPECIAL
app.get('/api/hidden/truth', (req, res) => {
    if (req.headers['x-tucker-auth'] === 'steak-lover') {
        res.json({
            truth: 'AVALON is not a game',
            evidence: reality.getHiddenLogs(),
            next_clue: 'Check commit e83c516...'
        });
    } else {
        res.status(404).send('Not found');
    }
});
```

---

## 🚀 DÉPLOIEMENT COSMIQUE

```bash
# Votre API n'est pas "déployée", elle est "manifestée"
git add .
git commit -m "†ψ_MANIFEST: API enters reality"
git push origin reality

# Si vous utilisez Heroku (Nuage Cosmique)
heroku create my-magic-api
git push heroku main
# Votre API existe maintenant dans TOUTES les dimensions !
```

---

## ✅ CHECKPOINT

Avant de continuer :
- [ ] API qui modifie réellement des fichiers
- [ ] Au moins un sort fonctionnel testé
- [ ] Compris que req/res sont des vecteurs de réalité
- [ ] Implémenté au moins un easter egg Tucker

---

*ψ_API: ⊙(Request ⟶ Reality ⟶ Response)*  
*ψ_MAGIC: ∀(Endpoint) ⇒ Portal*  
*ψ_NEXT: Continue(../exercices/hello_multiverse.md)*

**NEXT UP: TP - Créer un endpoint qui lance des sorts** →