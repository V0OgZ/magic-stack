# 🎯 MCP SERVEUR - VISION & ARCHITECTURE

## 📊 ÉTAT ACTUEL: Deux Systèmes de Stockage

### 1. **WorldState / GraphCD** (Backend Rust - Port 3001)
- **Quoi**: État du monde en temps réel, graphe 6D
- **Stockage**: En mémoire, calculs Q*
- **Usage**: 
  - Positions des entités
  - États temporels (TW, TE, debt)
  - Paradoxes détectés
  - Chemins calculés
- **API**: `/api/world-state/nodes`

### 2. **Vector DB** (Port 7500)
- **Quoi**: Base de connaissances, recherche sémantique
- **Stockage**: Persistant, indexé
- **Usage**:
  - Lore du jeu
  - Backstories des personnages
  - Documentation technique
  - Historique des combats
- **API**: `/search`, `/index`, `/stats`

### 3. **LLM Clippy** (Port 7501)
- **Accès ACTUEL**:
  - ✅ Vector DB via API 7500
  - ❓ WorldState - pas clair comment
- **Usage**: Commentaires de combat, aide contextuelle

---

## 🚀 PROPOSITION: MCP Server (Model Context Protocol)

### Concept
Un serveur **MCP** unifié qui sert de pont intelligent entre:
- Les assistants IA (Cursor, autres)
- Les différentes sources de données
- Les APIs du projet

### Architecture Proposée

```
┌─────────────────┐
│   Assistant IA  │
│    (Cursor)     │
└────────┬────────┘
         │ MCP Protocol
         ▼
┌─────────────────┐
│   MCP Server    │ ← Port 9000 (nouveau)
│  (Controller)   │
└────────┬────────┘
         │
    ┌────┴────┬──────┬──────┐
    ▼         ▼      ▼      ▼
 Rust API  VectorDB  LLM   Docs
  (3001)   (7500)  (7501)  (local)
```

### Fonctionnalités MCP

1. **Documentation Dynamique**
   - Sert la doc à jour du projet
   - APIs disponibles en temps réel
   - État des services

2. **Requêtes Unifiées**
   ```python
   # Au lieu de:
   rust_data = fetch("http://localhost:3001/...")
   vector_data = fetch("http://localhost:7500/...")
   
   # On fait:
   mcp.query("get hero position and backstory")
   # → MCP interroge les 2 sources et unifie
   ```

3. **Context Injection**
   - Injecte automatiquement le contexte pertinent
   - WorldState pour les calculs
   - VectorDB pour le lore
   - Combine les deux pour Clippy

---

## 📝 IMPLÉMENTATION RAPIDE

### Option 1: Python MCP Server (30 min)
```python
# mcp_server.py
from flask import Flask, jsonify
import requests

app = Flask(__name__)

@app.route('/mcp/context/<entity>')
def get_context(entity):
    # Récupère WorldState
    world = requests.get(f"http://localhost:3001/api/entities/{entity}")
    
    # Récupère VectorDB
    lore = requests.post("http://localhost:7500/search", 
                        json={"query": entity})
    
    # Combine et retourne
    return jsonify({
        "world_state": world.json(),
        "knowledge": lore.json(),
        "apis": get_available_apis()
    })

@app.route('/mcp/docs')
def get_docs():
    # Retourne la doc à jour
    return serve_markdown_as_json()
```

### Option 2: Intégration dans Java (1h)
- Ajouter un `MCPController.java`
- Plus robuste, typage fort
- Peut réutiliser les controllers existants

### Option 3: Extension Rust (2h)
- Module `mcp_bridge` dans le backend Rust
- Performance maximale
- Accès direct au GraphCD

---

## 🎯 BÉNÉFICES

1. **Pour Vincent**:
   - Une seule API à comprendre
   - Documentation toujours à jour
   - Debug facilité

2. **Pour les Assistants IA**:
   - Context complet automatique
   - Pas besoin de jongler entre APIs
   - Comprend mieux le projet

3. **Pour le Jeu**:
   - Clippy plus intelligent
   - Fusion WorldState + Lore
   - Extensible pour futurs mages

---

## ✅ TODO IMMÉDIAT

1. [ ] Créer `mcp_server.py` basique
2. [ ] Endpoint `/mcp/context` qui fusionne les données
3. [ ] Endpoint `/mcp/apis` qui liste tout
4. [ ] Tester avec Clippy pour les commentaires
5. [ ] Documenter le protocole MCP

---

## 🔗 RÉFÉRENCES

- MCP Protocol: https://modelcontextprotocol.io/
- Utilisé par: Claude Desktop, Cursor (bientôt?)
- Notre cas: Bridge custom pour notre architecture

---

**STATUS**: À IMPLÉMENTER
**PRIORITÉ**: HAUTE si ça simplifie vraiment
**TEMPS ESTIMÉ**: 30min - 2h selon l'option
