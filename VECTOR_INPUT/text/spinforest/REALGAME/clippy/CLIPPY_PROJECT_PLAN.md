# 📎 PROJET CLIPPY - NARRATEUR INTELLIGENT POUR HEROES OF TIME

## 🎯 VISION

**CLIPPY/MEMENTO** = Le narrateur omniscient qui accompagne le joueur dans TOUTE l'aventure

### Rôles:
1. **Guide des Archives Vivantes** - "Oh! Tu as trouvé Donna!"
2. **Commentateur de combat** - "Belle stratégie avec cette carte!"
3. **Conteur d'histoire** - "Il était une fois dans l'Interstice..."
4. **Assistant gameplay** - "Psst... essaie l'étagère dorée"
5. **Compagnon émotionnel** - Réagit à tes actions

## 🏗️ ARCHITECTURE TECHNIQUE

### Stack:
- **Frontend**: JavaScript vanilla (intégré dans REALGAME)
- **Vector DB**: Qdrant (déjà installé)
- **Mini LLM**: Phi-2 via llama.cpp (2.7GB)
- **Système hybride**: 70% préécrit, 30% généré

### Intégrations:
```javascript
// CLIPPY PARTOUT
class ClippyNarrator {
    constructor() {
        this.vectorDB = QdrantClient; // Partage avec Archives
        this.llm = Phi2Model;         // Pour dialogues variés
        this.gameState = GameState;   // Sait tout du jeu
    }
    
    // Dans Archives Vivantes
    onBookDiscovered(entity) {
        return this.comment(`Tu as découvert ${entity.name}!`);
    }
    
    // Dans Combat TCG
    onCardPlayed(card) {
        return this.comment(`${card.name}! Excellent choix!`);
    }
    
    // Dans exploration
    onAreaEntered(area) {
        return this.guide(`Bienvenue dans ${area.name}`);
    }
}
```

## 📁 STRUCTURE FICHIERS

```
REALGAME/clippy/
├── core/
│   ├── memento-core.js       # Logique principale
│   ├── personality.js        # Traits de caractère
│   └── memory.js            # Système de mémoire
├── dialogue/
│   ├── dialogue-system.js    # Gestionnaire hybride
│   ├── prewritten-db.js     # Dialogues préparés
│   └── context-builder.js   # Contexte pour LLM
├── llm/
│   ├── llm-connector.js     # Interface llama.cpp
│   ├── prompt-templates.js  # Templates optimisés
│   └── cache-manager.js     # Cache réponses
├── ui/
│   ├── clippy-float.js      # UI flottante
│   ├── speech-bubble.js     # Bulles de dialogue
│   └── animations.js        # Animations Clippy
└── models/
    └── phi-2.Q4_K_M.gguf   # Modèle LLM

```

## 🎮 FONCTIONNALITÉS

### 1. **Mode Archives Vivantes**
```javascript
// Clippy guide l'exploration
"Bienvenue dans les Archives! Que cherches-tu?"
"Oh! Cette étagère brille... intéressant!"
"Tu as trouvé Donna! Elle adore l'organisation!"
```

### 2. **Mode Combat TCG**
```javascript
// Clippy commente les combats
"Le combat commence! Choisis bien tes cartes!"
"Combo devastateur! L'ennemi n'a rien vu venir!"
"Attention, il te reste peu de PV!"
```

### 3. **Mode Histoire**
```javascript
// Clippy raconte et contextualise
"Savais-tu que cet endroit cache un secret?"
"Cette créature... je l'ai déjà vue quelque part..."
"L'Interstice réagit à ta présence!"
```

### 4. **Mode Assistant**
```javascript
// Clippy aide quand bloqué
"Tu sembles perdu. Veux-tu un indice?"
"As-tu essayé de combiner ces objets?"
"La solution est parfois dans les détails..."
```

## 🚀 IMPLÉMENTATION

### Phase 1: Core (1 semaine)
- [ ] Setup llama.cpp + Phi-2
- [ ] Système dialogue hybride
- [ ] UI Clippy flottante
- [ ] Intégration basique

### Phase 2: Intelligence (1 semaine)
- [ ] Connexion Vector DB
- [ ] Mémoire persistante
- [ ] Contexte dynamique
- [ ] Cache intelligent

### Phase 3: Intégration (1 semaine)
- [ ] Hook Archives Vivantes
- [ ] Hook Combat TCG
- [ ] Hook Exploration
- [ ] Polish & tests

## 💾 DONNÉES NÉCESSAIRES

### Dialogues préparés:
- 100 phrases d'accueil
- 200 commentaires combat
- 150 indices gameplay
- 100 réactions découvertes
- 50 blagues/easter eggs

### Contextes LLM:
- Templates par situation
- Limites de génération
- Ton et personnalité
- Règles de cohérence

## 🎯 OBJECTIFS PERFORMANCE

- **Réponse**: < 500ms dans 95% des cas
- **RAM**: +3GB max (modèle inclus)
- **CPU**: 25% sur 1 cœur pendant génération
- **Variété**: Jamais 2x la même phrase
- **Cohérence**: Toujours dans le ton du jeu

## 🔮 ÉVOLUTIONS FUTURES

1. **Voix synthétique** (TTS local)
2. **Émotions visuelles** (animations)
3. **Apprentissage joueur** (préférences)
4. **Multi-personnalités** (skins Clippy)
5. **Mode créateur** (custom dialogues)

## 📝 NOTES IMPORTANTES

- Clippy doit être **OPTIONNEL** (on/off)
- Jamais intrusif ou agaçant
- Toujours utile et pertinent
- Personnalité cohérente
- Humour dosé

---

**"Je suis Clippy, ton guide dans l'Interstice! Prêt pour l'aventure?"** 📎✨