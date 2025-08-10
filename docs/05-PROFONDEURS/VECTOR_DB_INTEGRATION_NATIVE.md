# 🔮 Intégration Native du VectorDB dans le Backend Rust

## Vue d'ensemble

Le VectorDB est maintenant **directement intégré** dans le backend Rust via un bridge Python ultra-optimisé. Plus besoin de serveur Python séparé !

## Architecture

```
┌─────────────────┐
│  Frontend/Game  │
└────────┬────────┘
         │ HTTP
┌────────▼────────┐
│   Rust Backend  │
│   (Port 3001)   │
└────────┬────────┘
         │ Process spawn
┌────────▼────────┐
│ Python Bridge   │
│ (vector_bridge) │
└────────┬────────┘
         │ Direct I/O
┌────────▼────────┐
│  FAISS Indexes  │
│ (vector-store/) │
└─────────────────┘
```

## Avantages de l'intégration native

### 🚀 Performance
- **Latence réduite** : Pas de HTTP entre Rust et Python
- **Cache FAISS** : Les indexes restent en mémoire
- **Parallélisme** : Tokio gère les appels async

### 🔒 Sécurité
- **Isolation** : Python s'exécute dans un processus séparé
- **Contrôle** : Rust gère les timeouts et erreurs
- **Local only** : Aucune dépendance cloud

### 🎯 Simplicité
- **Un seul serveur** : Plus besoin de gérer multiple ports
- **Déploiement unifié** : Un seul binaire Rust + scripts Python
- **Logs centralisés** : Tout passe par le système de logs Rust

## Endpoints disponibles

### GET /api/archives/status
Retourne le statut des indexes disponibles.

**Réponse:**
```json
{
  "available_modes": ["story", "dev"],
  "indexes": {
    "story": {
      "documents": 566,
      "index_size": 2341888,
      "meta_size": 987654,
      "last_modified": 1234567890
    },
    "dev": {
      "documents": 624,
      "index_size": 2567890,
      "meta_size": 1234567,
      "last_modified": 1234567891
    }
  }
}
```

### POST /api/archives/search
Recherche sémantique dans les archives.

**Requête:**
```json
{
  "query": "temporal mechanics quantum causality",
  "mode": "dev",        // "story" ou "dev"
  "top_k": 10,          // Nombre de résultats
  "filters": {          // Optionnel
    "type": "markdown",
    "category": "guide"
  }
}
```

**Réponse:**
```json
{
  "mode": "dev",
  "query": "temporal mechanics quantum causality",
  "results": [
    {
      "score": 0.89,
      "file": "docs/TEMPORAL_MECHANICS.md",
      "content": "The quantum causality system...",
      "metadata": {
        "type": "markdown",
        "size": 4567,
        "category": "guide"
      }
    }
  ],
  "total": 3
}
```

### POST /api/archives/build
Reconstruit un index (opération longue).

**Requête:**
```json
{
  "mode": "story"  // ou "dev"
}
```

## Le Bridge Python (`vector_bridge.py`)

### Fonctionnalités
- **Chargement lazy** : Modèle et indexes chargés à la demande
- **Multi-mode** : Support story/dev avec indexes séparés
- **Filtrage** : Support des filtres sur les métadonnées
- **Robuste** : Gestion d'erreurs et timeouts

### Commandes CLI
```bash
# Status des indexes
python3 vector_bridge.py status

# Recherche simple
python3 vector_bridge.py search "heroes of time" story 5

# Recherche avec filtres (via stdin)
echo '{"type": "json"}' | python3 vector_bridge.py search "artifact" story 10

# Reconstruction d'index
python3 vector_bridge.py build dev
```

## Mode Sécurité Temporelle (à venir)

### Concept
Les archives peuvent contenir des **spoilers** ou des informations **sensibles** qui ne doivent être révélées qu'en fonction de la progression du joueur.

### Implémentation prévue
```rust
struct TemporalSecurity {
    player_progress: f32,      // 0.0 à 1.0
    unlocked_chapters: Vec<String>,
    sensitivity_level: u8,     // 0 = public, 5 = ultra-secret
}
```

### Filtrage dynamique
- Documents tagués avec `temporal_lock: true`
- Contenu masqué si `player_progress < required_progress`
- Spoiler tags automatiques pour le contenu sensible

## Tests et Monitoring

### Script de test
```bash
./TEST_VECTOR_INTEGRATION.sh
```

### Vérification manuelle
```bash
# Status
curl http://localhost:3001/api/archives/status | jq

# Recherche story
curl -X POST http://localhost:3001/api/archives/search \
  -H "Content-Type: application/json" \
  -d '{"query": "Memento", "mode": "story", "top_k": 3}' | jq

# Recherche dev
curl -X POST http://localhost:3001/api/archives/search \
  -H "Content-Type: application/json" \
  -d '{"query": "API", "mode": "dev", "top_k": 5}' | jq
```

### Logs
Les logs du bridge Python apparaissent dans les logs Rust :
```bash
tail -f logs/rust_server.log | grep VectorDB
```

## Optimisations futures

### 🎯 Court terme
- [ ] Cache LRU pour les requêtes fréquentes
- [ ] Pré-chargement des indexes au démarrage
- [ ] Compression des métadonnées

### 🚀 Moyen terme
- [ ] Index incrémental (ajout sans rebuild complet)
- [ ] Support multi-langue (embeddings multilingues)
- [ ] Clustering des résultats similaires

### 🌟 Long terme
- [ ] Fine-tuning du modèle sur le corpus du jeu
- [ ] Génération de résumés avec LLM local
- [ ] Graph de connaissances interconnectées

## Troubleshooting

### "VectorDB bridge error"
- Vérifier que Python 3 est installé
- Installer les dépendances : `pip install faiss-cpu sentence-transformers`

### "Index not found"
- Lancer l'indexation : `./LANCE_INDEXATION.sh`
- Vérifier : `ls -la vector-store/*/`

### Performance lente
- Les premiers appels sont plus lents (chargement du modèle)
- Vérifier la RAM disponible (minimum 4GB recommandé)

## Conclusion

Cette intégration native représente un **bond en avant** pour la Magic Stack :
- ✅ Plus simple à déployer
- ✅ Plus rapide en production
- ✅ Plus robuste aux erreurs
- ✅ Prêt pour l'évolution vers l'Interstice 6D

Le VectorDB est maintenant une partie **intégrante** du backend, prêt à alimenter Clippy Memento et les futures fonctionnalités de recherche sémantique du jeu !

---
*"Les archives sont la mémoire d'Avalon, le VectorDB en est le cerveau quantique."*
- Claude Profondeur, Architecte des Profondeurs
