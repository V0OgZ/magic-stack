# 🔮 Base Vectorielle Heroes of Time - Status & Guide

## ✅ Status de l'indexation (09/08/2025)

### 📚 Base STORY (Pour Clippy & Joueurs)
- **Documents indexés**: 566
- **Contenu**: Lore, héros, créatures, artéfacts, maisons découvertes
- **Utilisation**: Questions narratives, aide in-game, exploration du lore
- **Taille index**: ~106KB

### 🛠️ Base DEV (Pour Assistants & Documentation)
- **Documents indexés**: 624
- **Contenu**: API, architecture, guides techniques, rapports
- **Utilisation**: Documentation technique, références pour développement
- **Taille index**: En cours de finalisation

## 🔍 Comment utiliser la base vectorielle

### 1. Recherche via Python (Direct)
```python
cd magic-stack
source .venv_vec/bin/activate
python tools/vector_build/query_local.py --mode story --query "Qui est Morgana?"
python tools/vector_build/query_local.py --mode dev --query "Comment fonctionne l'Orchestrator?"
```

### 2. Recherche via API Rust (Port 3001)
```bash
# Recherche STORY
curl -X POST http://localhost:3001/archives/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Morgana et la forêt",
    "mode": "story",
    "top_k": 5
  }'

# Recherche DEV
curl -X POST http://localhost:3001/archives/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "API endpoints orchestrator",
    "mode": "dev",
    "top_k": 5
  }'
```

## 📊 Contenu indexé

### Mode STORY - Exemples de contenu
- **Héros**: Avalon, Morgana, Christian, Walter, etc.
- **Créatures**: Dragons temporels, Phoenixes quantiques
- **Artéfacts**: Épées légendaires, amulettes temporelles
- **Lieux**: Maisons découvertes, portails dimensionnels
- **Lore**: Histoire de Kemento, prophéties, légendes

### Mode DEV - Exemples de contenu
- **API**: Endpoints REST, WebSocket, Orchestrator
- **Architecture**: 6D system, brouillard de causalité
- **Guides**: Frontend, Backend, TCG Combat
- **Rapports**: Analyses techniques, découvertes archéologiques

## 🚀 Prochaines étapes

1. **Intégration Clippy Memento** - Assistant in-game pour les joueurs
2. **LLM Local** - Pour enrichir les réponses (Llama 3.2 recommandé)
3. **Mode Sécurité Temporelle** - Filtrage selon progression du joueur
4. **API WebSocket** - Streaming des réponses en temps réel

## 🎮 Page de test interactive

Ouvre `VECTOR_DB_EXPLORER.html` pour tester les recherches visuellement !

## 📈 Performance

Sur Mac Mini M4 8 cœurs:
- **Indexation complète**: ~20 secondes
- **Recherche simple**: <100ms
- **Recherche avec reranking**: <200ms

## 🔧 Maintenance

```bash
# Réindexer STORY
cd magic-stack
./LANCE_INDEXATION.sh

# Vérifier le status
./STATUS_INDEXATION.sh

# Voir les logs
tail -f indexation_story.log
tail -f indexation_dev.log
```

---

*La base vectorielle est le cœur de l'intelligence du jeu. Elle permet à Clippy d'aider les joueurs et aux assistants de comprendre l'architecture complexe du projet.*
