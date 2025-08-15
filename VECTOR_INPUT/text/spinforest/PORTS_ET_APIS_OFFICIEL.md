# 🎯 PORTS ET APIS - RÉFÉRENCE OFFICIELLE

**CETTE DOC EST LA SEULE VÉRITÉ - Janvier 2025**

## 🔥 PORTS ACTIFS

```bash
8082 - Backend Java (Spring Boot) - MagicStack
3001 - Backend Rust (Tokio/Axum) - Q* Algorithm  
8000 - Frontend Python - Interface Web
```

## ❌ PORTS MORTS (Ne pas utiliser!)

```bash
8080 - RIEN (erreur dans vieilles docs)
8083 - RIEN (ancien port Rust)
5000 - RIEN (mentionné mais jamais utilisé)
```

## 📡 APIs JAVA (Port 8082)

### Interstice (Upload/Download 6D)
```bash
# Upload une entité
POST http://localhost:8082/api/interstice/upload
{
  "entityId": "MON_ENTITE",
  "entityData": {
    "type": "MAGE",
    "name": "Nom",
    "data": "..."
  }
}

# Download une entité
POST http://localhost:8082/api/interstice/download
{
  "entityId": "MON_ENTITE"
}

# Recherche 6D
POST http://localhost:8082/api/interstice/search
{
  "center": {"x": 50, "y": 50, "z": 0},
  "radius": 30
}

# Status
GET http://localhost:8082/api/interstice/status
```

### Magic (Formules Magiques)
```bash
# Liste des formules
GET http://localhost:8082/api/magic/formulas

# Lancer un sort
POST http://localhost:8082/api/magic/cast
{
  "formula": "HEAL",
  "target": "player1",
  "power": 10
}

# Santé du système
GET http://localhost:8082/api/magic/health
```

### Panopticon (Surveillance)
```bash
# Graphe du monde
GET http://localhost:8082/api/panopticon/world-state-graph

# Logger une action
POST http://localhost:8082/api/panopticon/feature-log
{
  "mageId": "URZ-KOM",
  "feature": "Action",
  "description": "Description"
}
```

## 🦀 APIs RUST (Port 3001)

### Q* Algorithm
```bash
# Santé
GET http://localhost:3001/health

# Recherche Q*
POST http://localhost:3001/api/q-star/search
{
  "query": "...",
  "dimensions": 6
}

# Optimisation
POST http://localhost:3001/api/q-star/optimize
{
  "path": [...],
  "constraints": {...}
}
```

## 🎮 FRONTEND (Port 8000)

```bash
# Servir les fichiers statiques
cd frontend
python3 -m http.server 8000

# Accès
http://localhost:8000/
```

## 🚀 DÉMARRAGE RAPIDE

```bash
# 1. Lancer tout
./hot start

# 2. Vérifier status
./hot status

# 3. Tester upload
curl -X POST http://localhost:8082/api/interstice/upload \
  -H "Content-Type: application/json" \
  -d '{"entityId": "TEST", "entityData": {"type": "test"}}'

# 4. Voir les logs
tail -f logs/java.log
tail -f logs/rust.log
```

## ⚠️ ERREURS COMMUNES

### ❌ FAUX
```bash
curl http://localhost:8080/...  # Port 8080 n'existe pas!
curl http://localhost:8083/...  # Port 8083 n'existe pas!
{"entity_id": "..."}            # Mauvais format!
```

### ✅ CORRECT
```bash
curl http://localhost:8082/...  # Backend Java
curl http://localhost:3001/...  # Backend Rust
{"entityId": "..."}              # Bon format (camelCase)
```

## 📝 NOTES

- **Java** : Gère la magie, l'interstice, le panopticon
- **Rust** : Gère Q* algorithm, recherche 6D optimisée
- **Python** : Sert juste les fichiers HTML/JS/CSS

---

**CETTE DOC REMPLACE TOUTES LES AUTRES**

Créé par Claude-Nexus après le grand nettoyage de Janvier 2025
