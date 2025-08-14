# 📝 NOUVELLE FEATURE : ÉDITEUR DE BACKSTORY DANS L'ÉDITEUR DE MONDE

## 🎯 CE QUE VINCENT VEUT

Un **éditeur de backstory** intégré dans l'éditeur de monde React pour :
1. **Éditer** les histoires/personnalités des héros IA
2. **Sauvegarder** dans la Vector DB (ou fallback direct au LLM)
3. **Personnaliser** le comportement de chaque héros

## 🏗️ ARCHITECTURE PROPOSÉE

```typescript
// Dans EditorView.tsx ou nouveau component BackstoryEditor.tsx

interface HeroBackstory {
  id: string;
  name: string;
  backstory: string;      // Histoire principale
  personality: string;    // Traits de caractère
  voiceStyle: string;     // Comment il parle
  keyPhrases: string[];   // Phrases typiques
  relationships: Record<string, string>; // Relations avec autres héros
  traumasOrTriggers?: string[]; // Ex: "Excalibur" pour Dragon
}

const BackstoryEditor: React.FC = () => {
  const [heroes, setHeroes] = useState<HeroBackstory[]>([]);
  const [selectedHero, setSelectedHero] = useState<HeroBackstory | null>(null);
  
  // Charger depuis Vector DB ou fichier local
  useEffect(() => {
    fetchBackstories();
  }, []);
  
  const saveBackstory = async (hero: HeroBackstory) => {
    // Option 1: Sauver dans Vector DB
    if (vectorDBAvailable) {
      await fetch('/api/backstories/save', {
        method: 'POST',
        body: JSON.stringify(hero)
      });
    } 
    // Option 2: Sauver localement + envoyer direct au LLM
    else {
      localStorage.setItem(`backstory_${hero.id}`, JSON.stringify(hero));
      // Le LLM utilisera directement ce JSON
    }
  };
  
  return (
    <div className="backstory-editor">
      {/* Liste des héros */}
      <div className="hero-list">
        {heroes.map(hero => (
          <HeroCard 
            key={hero.id}
            hero={hero}
            onClick={() => setSelectedHero(hero)}
          />
        ))}
      </div>
      
      {/* Éditeur */}
      {selectedHero && (
        <div className="editor-panel">
          <h2>{selectedHero.name}</h2>
          
          <TextArea
            label="Histoire / Backstory"
            value={selectedHero.backstory}
            onChange={(e) => setSelectedHero({
              ...selectedHero,
              backstory: e.target.value
            })}
            placeholder="Ex: Merlin vit à rebours dans le temps..."
          />
          
          <TextArea
            label="Personnalité"
            value={selectedHero.personality}
            placeholder="Ex: Sage, mystérieux, parle en énigmes..."
          />
          
          <TextArea
            label="Style de parole"
            value={selectedHero.voiceStyle}
            placeholder="Ex: Mélange passé et futur dans ses phrases"
          />
          
          <TagInput
            label="Phrases typiques"
            value={selectedHero.keyPhrases}
            placeholder="Ajouter une phrase..."
          />
          
          <RelationshipEditor
            relationships={selectedHero.relationships}
            allHeroes={heroes}
          />
          
          <Button onClick={() => saveBackstory(selectedHero)}>
            💾 Sauvegarder
          </Button>
          
          <Button onClick={() => testHeroSpeech(selectedHero)}>
            🎮 Tester le dialogue
          </Button>
        </div>
      )}
    </div>
  );
};
```

## 🔄 INTÉGRATION AVEC LE SYSTÈME IA

### 1. Si Vector DB active :
```javascript
// Le serveur Clippy cherche automatiquement
const backstory = await vectorDB.search(`${heroId} backstory`);
```

### 2. Si pas de Vector DB (fallback) :
```javascript
// Envoyer directement au LLM
const localBackstory = localStorage.getItem(`backstory_${heroId}`);
const prompt = `
  You are ${hero.name}.
  Backstory: ${localBackstory.backstory}
  Personality: ${localBackstory.personality}
  Voice: ${localBackstory.voiceStyle}
  
  Respond to: ${playerMessage}
`;
```

## 🎨 UI PROPOSÉE

```
┌─────────────────────────────────────────────────────┐
│ 🎭 Éditeur de Personnalités IA                      │
├─────────────────┬───────────────────────────────────┤
│ Héros          │ Arthur Pendragon                   │
│ ┌─────────┐    │ ┌─────────────────────────────┐   │
│ │ Arthur  │    │ │ Histoire:                   │   │
│ │ 👑      │    │ │ Arthur n'a pas retiré       │   │
│ └─────────┘    │ │ Excalibur d'une pierre      │   │
│ ┌─────────┐    │ │ mais d'un paradoxe...       │   │
│ │ Merlin  │    │ └─────────────────────────────┘   │
│ │ 🧙‍♂️     │    │                                   │
│ └─────────┘    │ Personnalité: Noble, juste ▼     │
│ ┌─────────┐    │                                   │
│ │ Dragon  │    │ Phrases types:                    │
│ │ 🐉      │    │ • "Pour Camelot !"               │
│ └─────────┘    │ • "Excalibur reconnaît..."       │
│ + Ajouter      │                                   │
│                │ [💾 Sauver] [🎮 Tester]          │
└────────────────┴───────────────────────────────────┘
```

## 📡 ENDPOINTS BACKEND NÉCESSAIRES

### Nouveau dans `clippy_dev_server.py` :
```python
@app.route('/backstories/save', methods=['POST'])
def save_backstory():
    """Sauve une backstory éditée"""
    data = request.json
    hero_id = data.get('id')
    
    # Sauver dans un fichier MD pour la Vector DB
    path = f"vector_content/custom_backstories/{hero_id}.md"
    with open(path, 'w') as f:
        f.write(format_backstory_md(data))
    
    # Optionnel: Re-indexer la Vector DB
    if auto_reindex:
        reindex_vector_db()
    
    return jsonify({"status": "saved"})

@app.route('/backstories/list', methods=['GET'])
def list_backstories():
    """Liste toutes les backstories disponibles"""
    # Chercher dans vector_content/
    backstories = []
    for file in Path("vector_content").glob("**/*backstory*.md"):
        backstories.append(parse_backstory(file))
    return jsonify(backstories)
```

## 🚀 BÉNÉFICES

1. **Customisation totale** : Chaque instance du jeu peut avoir ses propres personnalités
2. **Test immédiat** : Bouton "Tester" pour voir comment le héros parle
3. **Sauvegarde flexible** : Vector DB ou local storage
4. **Évolutif** : Les joueurs pourraient créer leurs propres héros !

## 📝 EXEMPLE D'UTILISATION

### Joueur édite le Dragon :
```
Backstory: "Ce dragon a été sauvé par Arthur enfant"
Personality: "Reconnaissant mais fier"
Trauma: [Supprimé "Excalibur"]
Nouvelle phrase: "Je te dois une dette de vie, Pendragon"
```

### Résultat en jeu :
```
Dragon (voyant Arthur): "Je te dois une dette de vie, Pendragon. 
                         Mais ne crois pas que cela fait de moi ton serviteur."
```

## ✅ TODO POUR L'INTÉGRATEUR

1. [ ] Créer `BackstoryEditor.tsx` component
2. [ ] Intégrer dans `EditorView.tsx`
3. [ ] Ajouter routes API pour save/load
4. [ ] UI pour tester les dialogues
5. [ ] Système de templates prédéfinis
6. [ ] Export/Import de backstories

## 💡 IDÉES BONUS

- **Templates** : "Héros noble", "Anti-héros", "Fou génial"
- **Générateur** : Bouton "Générer backstory aléatoire"
- **Partage** : Les joueurs partagent leurs backstories custom
- **Versions** : Historique des modifications

---

**C'est exactement ce que Vincent veut !** Un éditeur intégré qui permet de personnaliser COMPLÈTEMENT les personnalités IA ! 🎮✨
