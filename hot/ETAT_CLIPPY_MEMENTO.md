# 📎 État Actuel de Clippy/Memento

## 🔍 CE QUI EXISTE

### 1. **Service Vector DB** ✅
- **Connexion via Rust** : Port 3001 (`/api/archives/*`)
- **Connexion directe Python** : Port 5001 (fallback)
- **2 modes de recherche** :
  - `story` : Lore, scénarios, contenu narratif
  - `dev` : Documentation technique, API

### 2. **Implémentations Clippy** ✅
- **Version React** : `apps/world-editor/src/lib/clippy.tsx`
- **Version HTML** : Dans index.html, manuels, etc.
- **Service** : `vectorDB.ts` pour les requêtes

### 3. **Indexation du contenu** ✅
- Scripts Python pour indexer `/hot`
- FAISS pour les embeddings locaux
- ~8000 fichiers indexés

---

## ❌ CE QUI NE MARCHE PAS ENCORE

### 1. **Mode LLM** 🚧
**Prévu mais pas implémenté :**
```javascript
// CE QU'ON VOULAIT
- Ollama ou llama.cpp local
- Réponses enrichies avec contexte
- Auto-complétion de code
- Suggestions intelligentes

// CE QU'ON A
- Recherche sémantique basique
- Tips prédéfinis
- Pas d'intelligence réelle
```

### 2. **Intelligence Contextuelle** 🚧
```javascript
// MANQUE :
- Comprendre où tu es dans le jeu
- Proposer des actions pertinentes
- Mémoriser tes préférences
- Apprendre de tes actions
```

### 3. **Memento (Mémoire)** 🚧
```javascript
// PAS ENCORE FAIT :
- Système de tatouages/mémoire
- Persistance des apprentissages
- Profil joueur personnalisé
```

---

## 🔧 COMMENT ACTIVER CE QUI EXISTE

### 1. **Lancer le Vector DB**
```bash
# Méthode 1 : Via Rust (recommandé)
cd magic-stack
./h-profondeur start
# Le Vector DB est inclus dans le backend Rust

# Méthode 2 : Python direct
python3 backends/python/app.py
```

### 2. **Tester la connexion**
```bash
# Via Rust
curl http://localhost:3001/api/archives/status | jq

# Direct Python
curl http://localhost:5001/health
```

### 3. **Faire une recherche**
```bash
# Mode STORY (lore, scénarios)
curl -X POST http://localhost:3001/api/archives/search \
  -H "Content-Type: application/json" \
  -d '{"query": "Merlin temporal", "mode": "story", "top_k": 5}' | jq

# Mode DEV (documentation)
curl -X POST http://localhost:3001/api/archives/search \
  -H "Content-Type: application/json" \
  -d '{"query": "v2 controller", "mode": "dev", "top_k": 5}' | jq
```

---

## 🚀 CE QU'IL FAUT FAIRE POUR LE MODE LLM

### Phase 1 : Installation LLM Local
```bash
# Option 1 : Ollama (plus simple)
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama3.2:3b  # Modèle léger

# Option 2 : llama.cpp (plus flexible)
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp && make
# Télécharger un modèle GGUF
```

### Phase 2 : Intégration
```javascript
// clippy-llm.js
class ClippyLLM {
  constructor() {
    this.vectorDB = new VectorDBService();
    this.llm = new OllamaClient(); // ou LlamaCpp
  }
  
  async getSmartResponse(query, context) {
    // 1. Recherche Vector DB
    const docs = await this.vectorDB.search(query);
    
    // 2. Construire le prompt
    const prompt = `
      Contexte: ${docs.join('\n')}
      Question: ${query}
      Réponds comme Clippy, l'assistant magique.
    `;
    
    // 3. Appel LLM
    return await this.llm.generate(prompt);
  }
}
```

### Phase 3 : Modes hybrides
```javascript
// Mode 1 : Vector Only (rapide, <100ms)
if (simpleQuery) {
  return vectorDB.search(query);
}

// Mode 2 : Vector + LLM (intelligent, ~1-2s)
if (complexQuery) {
  const context = await vectorDB.search(query);
  return llm.enrich(context, query);
}
```

---

## 📊 Comparaison des 2 modes

| Aspect | Mode Vector (Actuel) | Mode LLM (À faire) |
|--------|---------------------|-------------------|
| **Vitesse** | <100ms ⚡ | 1-2s 🐢 |
| **Intelligence** | Recherche basique | Compréhension profonde |
| **Coût** | Gratuit | CPU/GPU local |
| **Personnalisation** | Limitée | Complète |
| **Offline** | ✅ Oui | ✅ Oui |
| **Taille** | ~5MB indexes | +4GB modèle |

---

## ✅ Recommandation

**Pour l'instant, le mode Vector suffit** pour :
- Recherche dans le lore
- Tips contextuels basiques
- Documentation rapide

**Ajouter le mode LLM quand tu veux** :
- Auto-complétion de code
- Conversations complexes
- Génération de contenu
- Tutoriel interactif personnalisé

---

## 🎮 Test rapide

Ouvre n'importe quel HTML du jeu et clique sur Clippy (📎). 
- Si tips génériques → Vector DB pas connecté
- Si tips contextuels → Vector DB OK
- Si réponses intelligentes → LLM activé (pas encore fait)

**Status actuel : Mode Vector partiellement fonctionnel, Mode LLM pas encore implémenté**
