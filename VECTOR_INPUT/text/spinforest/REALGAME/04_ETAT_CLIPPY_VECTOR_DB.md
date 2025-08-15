# 🤖 ÉTAT ACTUEL: CLIPPY-MEMENTO & VECTOR DB
## Jour 32 - État des lieux complet

---

## 📊 ARCHITECTURE ACTUELLE

### Services Indépendants (Ports 7500-7501)
```
┌─────────────────────────────────────────────────────┐
│              🌐 SERVICES PARTAGÉS                    │
├─────────────────────────────────────────────────────┤
│  Vector DB (7500)        LLM Clippy (7501)          │
│       ↑                         ↑                    │
│       └──────────┬──────────────┘                   │
│                  │                                   │
│         ┌────────┴────────┐                         │
│         │   Frontend      │                         │
│         │  (HOMM3 Demo)   │                         │
│         └─────────────────┘                         │
└─────────────────────────────────────────────────────┘
```

---

## 🎮 DEUX MODES DE CLIPPY

### Mode 1: SANS LLM (Rapide/Léger)
- **Endpoint**: `/api/quick` sur port 7501
- **Latence**: <50ms
- **Utilisation**: Multiplayer, PWA léger
- **Méthode**: Réponses prédéfinies par mot-clé
- **Fallback**: Si LLM down ou désactivé

#### Réponses actuelles:
```python
{
    'salut': "👋 Salut! Je suis Clippy-Memento!",
    'aide': "📖 Utilise MOVE pour bouger, OBSERVE pour voir...",
    'combat': "⚔️ Le combat se fait par cartes TCG ou auto-résolution!",
    'temps': "⏰ Tu peux manipuler le temps et créer des clones!"
}
```

### Mode 2: AVEC LLM (Intelligent)
- **Endpoint**: `/api/chat` sur port 7501
- **Latence**: 200-500ms (selon modèle)
- **Utilisation**: Solo, Dev, Vincent
- **Méthode**: LLM + Contexte Vector DB
- **Modèles disponibles**:
  - `tiny` (tinyllama) - 1.1B params
  - `small` (phi) - 2.7B params  
  - `medium` (mistral) - 7B params
  - `large` (llama2) - 13B params

#### Niveaux d'accès:
1. **player**: Infos basiques
2. **mage**: Mécaniques avancées
3. **dev**: Détails techniques + APIs
4. **vincent**: Accès total

---

## 🗄️ VECTOR DB - ORGANISATION ACTUELLE

### Statistiques (774 documents)
- **JSON**: 213 documents
- **Markdown**: 561 documents

### Catégories/Dossiers
```
paths: [
    "heroes",           # Héros du jeu
    "UNCLASSIFIED",     # Non catégorisé
    "AVALON_HOMES",     # Maisons des personnages
    "maisons_decouvertes", # Archéologie
    "frontend_docs",    # Docs techniques front
    "backend_docs"      # Docs techniques back
]
```

### ⚠️ PROBLÈME: Pas de catégorisation sémantique
- Pas de tags (lore, dev, backstory, combat...)
- Recherche par mot-clé simple uniquement
- Pas d'embeddings sémantiques encore

---

## 🎯 CE QUI FONCTIONNE

### ✅ Services lancés et accessibles
```bash
./h services start  # Lance Vector DB + LLM Clippy
./h services test   # Teste les deux services
```

### ✅ Recherche basique
```bash
curl -X POST http://localhost:7500/api/search \
    -H "Content-Type: application/json" \
    -d '{"query": "Memento", "limit": 5}'
```

### ✅ Chat rapide sans contexte
```bash
curl -X POST http://localhost:7501/api/quick \
    -H "Content-Type: application/json" \
    -d '{"message": "aide"}'
```

---

## 🔴 CE QUI MANQUE

### 1. Backstory des Héros/Ennemis
- **Fichiers hero.json**: Pas de champ `backstory` actuellement
- **Contexte de combat**: Pas encore implémenté
- **Phrases contextuelles**: Le système existe mais pas les données

### 2. Catégorisation/Tags
- Besoin de tags: `#lore`, `#backstory`, `#combat`, `#dev`
- Pour filtrer les recherches selon le contexte
- Pour donner le bon contexte au LLM

### 3. Intégration Frontend
- Les pages HTML (CLIPPY_MEMENTO_*.html) ne sont pas connectées
- HOMM3_6D_DEMO.html n'appelle pas encore les services
- Pas adapté aux API V2

### 4. Mode DEV Spécial
- Backend devrait lancer tous les services
- Frontend en mode PWA "dumb"
- Configuration à implémenter

---

## 📝 PLAN D'ACTION IMMÉDIAT

### Phase 1: Backstories (PRIORITÉ)
1. Ajouter champ `backstory` dans tous les hero.json
2. Créer `BACKSTORIES_COMPENDIUM.json` avec toutes les histoires
3. Indexer dans Vector DB avec tag `#backstory`

### Phase 2: Catégorisation
1. Ajouter système de tags dans l'indexation
2. Modifier `REINDEX_ALL.py` pour extraire les catégories
3. Permettre filtrage par catégorie dans les recherches

### Phase 3: Intégration
1. Connecter HOMM3_6D_DEMO.html aux services
2. Adapter les endpoints aux API V2
3. Implémenter le fallback sans LLM

### Phase 4: Mode Combat Contextuel
```javascript
// Exemple d'appel contextuel pour un ennemi
const getEnemyPhrase = async (enemyId, situation) => {
    // Essayer avec LLM + contexte
    try {
        const response = await fetch('http://localhost:7501/api/chat', {
            method: 'POST',
            body: JSON.stringify({
                message: `Enemy ${enemyId} in ${situation}`,
                use_context: true,
                model: 'tiny'  // Rapide pour le combat
            })
        });
        return response.json();
    } catch {
        // Fallback: phrases prédéfinies
        return DEFAULT_ENEMY_PHRASES[enemyId];
    }
}
```

---

## 🎮 DÉMOS EXISTANTES

### Frontend (Non connectées)
- `CLIPPY_MEMENTO_PROTOTYPE.html` - UI complète
- `CLIPPY_MEMENTO_STANDALONE.html` - Version autonome
- `clippy/test-clippy.html` - Tests

### Jeu Principal
- `adventure/homm3/HOMM3_6D_DEMO.html` - Le vrai jeu
- `HOMM3-TEMPORAL/TEMPORAL_HOMM3.html` - Version temporelle

### Backend/Serveur
- Des pages côté serveur mentionnées (à retrouver)
- Mode sans graphiques mentionné

---

## 💡 CONFIGURATION PROPOSÉE

### Pour Développement Local
```json
{
    "clippy": {
        "mode": "full",
        "llm_enabled": true,
        "vector_db": true,
        "models": ["tiny", "small"],
        "access_level": "dev"
    }
}
```

### Pour Production PWA
```json
{
    "clippy": {
        "mode": "light",
        "llm_enabled": false,  // Ou avec auth
        "vector_db": true,
        "quick_responses": true,
        "access_level": "player"
    }
}
```

### Pour Installation Locale (DMG)
```json
{
    "clippy": {
        "mode": "full",
        "llm_enabled": true,
        "vector_db": true,
        "models": ["tiny", "small", "medium"],
        "access_level": "configurable"
    }
}
```

---

## 📚 PROCHAINES ÉTAPES

1. **Immédiat**: Tester les deux modes dans le chat
2. **Court terme**: Ajouter les backstories
3. **Moyen terme**: Intégrer dans HOMM3_6D_DEMO.html
4. **Long terme**: Mode combat contextuel avec IA

---

## 🔧 COMMANDES DE TEST

```bash
# Test mode rapide (sans LLM)
./test_clippy_quick.sh

# Test mode intelligent (avec LLM + contexte)
./test_clippy_smart.sh  

# Test recherche catégorisée (à venir)
./test_search_categories.sh
```

---

*Document généré le Jour 32 - À mettre à jour régulièrement*
