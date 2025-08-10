# 📊 Ports et Services - Magic Stack

## 🌐 Services Principaux

| Port  | Service | Description | Status |
|-------|---------|-------------|--------|
| **3001** | Rust Backend | API principale + Vector DB intégré | ✅ Actif |
| **5001** | Python Backend | Search, embeds, TCG fallback | ✅ Actif |
| **8080** | Java Backend | Combat TCG, formules temporelles | ✅ Actif |

## 🎮 Frontends

| Port  | Service | Description | Status |
|-------|---------|-------------|--------|
| **8001** | Web Client | Interface de jeu principale | ✅ Actif |
| **5173** | Vite Dev | React App (dev mode) | Dev only |

## 🤖 Services LLM (Expérimental)

| Port  | Service | Description | Status |
|-------|---------|-------------|--------|
| **11434** | Ollama | API LLM ultra-léger (Qwen 0.5B) | 🧪 Expérimental |
| **8889** | Clippy Dev | Personnalités IA + Mode Dev | 🧪 Expérimental |
| **8888** | llama.cpp | Serveur LLM alternatif | 🔮 Futur |

## 🔀 Ports Alternatifs

| Port  | Service | Description | Usage |
|-------|---------|-------------|-------|
| **3002** | Rust Alt | Instance Surface | Multi-env |
| **5002** | Python Alt | Instance Surface | Multi-env |
| **8081** | Java Alt 1 | Instance alternative | Load balancing |
| **8082** | Java Alt 2 | Instance alternative | Load balancing |

## 🚀 Commandes Rapides

### Démarrer les services principaux
```bash
./h start        # Lance Rust + Python + Java
```

### Démarrer les LLM expérimentaux
```bash
./llm start      # Lance Ollama + Clippy Dev
./llm status     # Vérifie l'état
./llm test       # Test les endpoints
```

### Vérifier les ports utilisés
```bash
lsof -i :3001    # Check Rust
lsof -i :8889    # Check Clippy Dev
lsof -i :11434   # Check Ollama
```

## 📡 Endpoints Clés

### Backend Principal (3001)
- `/api/v2/*` - Contrôleur V2
- `/api/archives/*` - Vector DB
- `/api/game/*` - État de jeu

### Clippy Dev (8889)
- `/ask` - Questions techniques
- `/character/speak` - Personnalités IA
- `/dialogue` - Dialogues entre personnages
- `/ai/think` - Stratégie IA

### Ollama (11434)
- `/api/generate` - Génération de texte
- `/api/tags` - Modèles disponibles

## ⚡ Optimisations

1. **Tous les services** utilisent CORS permissif en dev
2. **Clippy Dev** cache les réponses fréquentes
3. **Ollama** garde le modèle en RAM (600MB)
4. **Vector DB** intégré dans Rust (pas de port séparé)

## 🔒 Sécurité

- Ports **locaux uniquement** (127.0.0.1)
- Pas d'auth en mode dev
- Production : ajouter API keys

## 📝 Notes

- Le port **8889** est notre innovation pour les personnalités IA !
- Ollama sur **11434** est le standard
- On peut tout faire tourner sur un Mac M4 sans problème
