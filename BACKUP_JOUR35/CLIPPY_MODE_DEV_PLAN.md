# 📎 CLIPPY MODE DÉVELOPPEUR - Plan Ultra-Léger

## 🎯 OBJECTIF
Un LLM **ultra-léger** pour Mac M4 qui :
- ⚡ Répond en **< 1 seconde**
- 💾 Utilise **< 1GB de RAM**
- 🧠 **Comprend** les phrases (pas juste mots-clés)
- 📚 Peut lire les docs pour les AI

## 🏆 MEILLEURS CANDIDATS (Décembre 2024)

### 1. **Qwen2.5:0.5b** ⭐ RECOMMANDÉ
```bash
# Via Ollama (le plus simple)
brew install ollama
ollama pull qwen2.5:0.5b   # 397MB seulement !
```
- **Taille** : 397MB
- **Vitesse** : ~300 tokens/sec sur M4
- **Qualité** : Excellent pour sa taille

### 2. **Phi-3.5-mini** 
```bash
ollama pull phi3.5         # 2.2GB
```
- **Taille** : 2.2GB
- **Vitesse** : ~150 tokens/sec 
- **Qualité** : Meilleure compréhension

### 3. **TinyLlama-1.1B**
```bash
ollama pull tinyllama      # 637MB
```
- **Taille** : 637MB
- **Vitesse** : ~250 tokens/sec
- **Qualité** : Bon compromis

## 🔧 ARCHITECTURE PROPOSÉE

```python
class ClippyModeDev:
    def __init__(self):
        # 1. Vector DB pour contexte
        self.vector_db = VectorDBService()
        
        # 2. LLM ultra-léger
        self.llm = OllamaClient(model="qwen2.5:0.5b")
    
    def ask(self, question):
        # Étape 1: Chercher contexte pertinent (< 50ms)
        context_docs = self.vector_db.search(
            query=question,
            mode="dev",  # Docs techniques
            top_k=3
        )
        
        # Étape 2: Prompt optimisé court
        prompt = f"""
        Context: {context_docs[:500]}  # Limité !
        Q: {question}
        A (brief):"""
        
        # Étape 3: Génération rapide (< 1s)
        response = self.llm.generate(
            prompt,
            max_tokens=150,  # Réponse courte
            temperature=0.3   # Déterministe
        )
        
        return response
```

## 🚀 INSTALLATION IMMÉDIATE

### Option A : Ollama (RECOMMANDÉ pour Mac M4)
```bash
# 1. Installer Ollama
brew install ollama

# 2. Lancer le serveur
ollama serve  # Port 11434

# 3. Télécharger le modèle
ollama pull qwen2.5:0.5b

# 4. Test rapide
curl http://localhost:11434/api/generate -d '{
  "model": "qwen2.5:0.5b",
  "prompt": "What is Heroes of Time?",
  "stream": false
}'
```

### Option B : llama.cpp (Plus de contrôle)
```bash
# 1. Compiler llama.cpp
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
make -j8 LLAMA_METAL=1  # Accélération Metal pour M4

# 2. Télécharger modèle GGUF
wget https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/qwen2.5-0.5b-instruct-q4_k_m.gguf

# 3. Lancer serveur
./llama-server -m qwen2.5-0.5b-instruct-q4_k_m.gguf \
  -ngl 99 \  # Tout sur GPU
  --port 8888
```

## 📊 BENCHMARKS sur Mac M4

| Modèle | Taille | Vitesse | RAM | Qualité |
|--------|--------|---------|-----|---------|
| **Qwen2.5:0.5b** | 397MB | 300 tok/s | 600MB | ⭐⭐⭐ |
| Phi-3.5 | 2.2GB | 150 tok/s | 3GB | ⭐⭐⭐⭐ |
| TinyLlama | 637MB | 250 tok/s | 1GB | ⭐⭐⭐ |
| ~~TinyDolphin~~ | ❌ | Problèmes Mac | - | - |

## 🎮 UTILISATION

### Pour les Devs Humains
```javascript
// Dans le frontend
async function askClippy(question) {
  const response = await fetch('/api/clippy/dev', {
    method: 'POST',
    body: JSON.stringify({ 
      question,
      mode: 'dev'  // Active le LLM
    })
  });
  return response.json();
}
```

### Pour les AI (via API)
```python
# Les AI peuvent interroger directement
def get_doc_info(topic):
    response = requests.post(
        'http://localhost:3001/api/clippy/dev',
        json={
            'question': f'Explain {topic} from docs',
            'mode': 'dev',
            'context_size': 1000
        }
    )
    return response.json()
```

## ⚡ OPTIMISATIONS POUR VITESSE MAX

1. **Cache agressif** : Mémoriser questions fréquentes
2. **Streaming** : Afficher tokens au fur et à mesure
3. **Contexte limité** : Max 500 tokens de contexte
4. **Quantization** : Q4_K_M pour 4x moins de RAM
5. **Batch processing** : Grouper les requêtes

## 🔥 COMMANDES À LANCER MAINTENANT

```bash
# Test si Ollama est installé
which ollama || brew install ollama

# Lancer Ollama
ollama serve &

# Télécharger le modèle ultra-léger
ollama pull qwen2.5:0.5b

# Test immédiat
echo '{"model":"qwen2.5:0.5b","prompt":"Hello","stream":false}' | \
  curl -X POST http://localhost:11434/api/generate -d @-
```

## 📝 NOTES

- **PAS TinyDolphin** : Problèmes sur Mac ARM
- **PAS de modèles > 3GB** : Trop lent pour ton usage
- **Ollama** est plus simple que llama.cpp pour commencer
- Le modèle peut tourner **en permanence** sans ralentir le Mac M4

C'est ÇA qu'on voulait faire ! Pas le système 6D, mais un vrai petit LLM qui comprend les phrases !
