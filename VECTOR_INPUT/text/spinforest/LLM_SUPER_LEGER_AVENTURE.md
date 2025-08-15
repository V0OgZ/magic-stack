# LLM SUPER LEGER - MODE AVENTURE SOLO

## CONCEPT : LLM MINIMALISTE

### Option 1 : TinyLlama (1.1GB)
- **Taille** : 1.1GB seulement !
- **Performance** : ~200ms par réponse
- **Qualité** : Suffisant pour dialogues simples
- **RAM** : +1.5GB en utilisation

### Option 2 : ONNX MiniLM (300MB) 
- **Taille** : 300MB ultra léger !
- **Performance** : ~50ms par réponse
- **Qualité** : Basique mais fonctionnel
- **RAM** : +500MB seulement

### Option 3 : GPT-2 Small (124M params)
- **Taille** : 500MB
- **Performance** : ~100ms
- **Qualité** : Bon pour narration
- **RAM** : +800MB

## UTILISATION INTELLIGENTE

### Active SEULEMENT quand :
- Mode Aventure Solo lancé
- Joueur entre dans zone narrative
- Dialogue avec PNJ important
- Découverte d'objets spéciaux

### Désactivé pour :
- Mode TCG
- Mode Multijoueur  
- Navigation normale
- Menus

## IMPLEMENTATION PRATIQUE

```javascript
class AdventureLLM {
    constructor() {
        this.model = null;
        this.loaded = false;
    }
    
    async loadForAdventure() {
        if (!this.loaded && gameMode === 'ADVENTURE_SOLO') {
            // Charge le modèle SEULEMENT si nécessaire
            this.model = await loadTinyLlama();
            this.loaded = true;
        }
    }
    
    async generateDialogue(context) {
        if (!this.loaded) return getFallbackDialogue(context);
        
        // Génération TRÈS contrainte
        const prompt = `[${context.npc}]: `;
        const response = await this.model.generate(prompt, {
            max_tokens: 30,  // Réponses courtes
            temperature: 0.7,
            stop: ['\n']
        });
        
        return response;
    }
    
    unload() {
        // Libère la mémoire quand on quitte l'aventure
        this.model = null;
        this.loaded = false;
    }
}
```

## HYBRIDE INTELLIGENT

### 80% Dialogues préparés
```javascript
const DIALOGUES = {
    'garde_entree': [
        "Halte ! Qui va là ?",
        "Vous ne passerez pas sans autorisation.",
        "Montrez-moi vos papiers."
    ],
    'marchand': [
        "Bienvenue ! Que puis-je pour vous ?",
        "J'ai les meilleurs prix de la région !",
        "Regardez cette marchandise rare..."
    ]
}
```

### 20% Généré (contexte spécial)
- Réactions aux actions uniques
- Descriptions d'objets rares
- Narration dynamique

## AVANTAGES

1. **Performance** : Pas d'impact sur TCG/Multi
2. **Mémoire** : Chargé à la demande
3. **Qualité** : Suffisant pour immersion
4. **Flexibilité** : On/Off facile

## RECOMMANDATION FINALE

**TinyLlama 1.1GB** pour Aventure Solo :
- Assez intelligent pour narration
- Assez léger pour Mac Mini
- Facile à intégrer/retirer
- Bon compromis qualité/performance

Vincent, ça te va ? On charge le LLM QUE pour l'aventure solo !