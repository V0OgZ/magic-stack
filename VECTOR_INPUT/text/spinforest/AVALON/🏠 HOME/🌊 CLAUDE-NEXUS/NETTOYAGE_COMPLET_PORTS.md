# 🧹 NETTOYAGE COMPLET - PORTS ET CONFIGS

## 🔴 PROBLÈMES TROUVÉS

### Confusion des Ports
- **8080** : Mentionné dans docs mais RIEN n'écoute
- **8082** : Backend Java ACTIF (le bon!)
- **3001** : Backend Rust ACTIF (pas 8083!)
- **8000** : Frontend Python
- **5000** : Mentionné mais pas utilisé

### Scripts Faux
- `h` script : Plein de références à des scripts supprimés
- `hot` script : Ports incorrects (8083 au lieu de 3001)
- Docs API : Port 8080 au lieu de 8082

### Erreurs API
- Format upload : `entityId` PAS `entity_id`
- Endpoints manquants dans certains backends
- Confusion entre 2 backends Java

## ✅ CORRECTIONS APPLIQUÉES

### 1. Script `hot` - CORRIGÉ
- Port Rust : 8083 → 3001
- Binary : magic-stack-core → magic-stack-server

### 2. API Upload - RÉSOLU
- Trouvé le bon endpoint : `/api/interstice/upload`
- Bon format : `{"entityId": "...", "entityData": {...}}`
- Bon port : 8082 (pas 8080!)

## 📋 VRAIS PORTS (CONFIRMÉS)

```bash
# BACKENDS
8082 - Java Spring Boot (MagicStack)
3001 - Rust Tokio/Axum (Q* Algorithm)

# FRONTEND
8000 - Python HTTP Server

# NON UTILISÉS
8080 - RIEN (erreur dans docs)
8083 - RIEN (ancien port Rust)
5000 - RIEN (mentionné mais pas actif)
```

## 🔧 ACTIONS À FAIRE

### Immédiat
1. ✅ Corriger `hot` script
2. ⏳ Mettre à jour toutes les docs
3. ⏳ Nettoyer les vieux scripts

### Scripts à Corriger
- [ ] `testall.sh` - utilise 8080 au lieu de 8082
- [ ] Docs API - port 8080 → 8082
- [ ] Scripts dans ANSIBLE - vérifier ports

### Documentation à Créer
- [ ] `PORTS_OFFICIELS.md` - Liste définitive
- [ ] `API_REFERENCE_V2.md` - Avec bons ports
- [ ] `QUICK_START.md` - Guide simple

## 🎯 ENDPOINTS CONFIRMÉS

### Backend Java (8082)
```bash
# Interstice
POST /api/interstice/upload
POST /api/interstice/download
POST /api/interstice/search
GET  /api/interstice/status

# Magic
GET  /api/magic/formulas
POST /api/magic/cast
GET  /api/magic/health

# Panopticon
GET  /api/panopticon/world-state-graph
POST /api/panopticon/feature-log
```

### Backend Rust (3001)
```bash
GET  /health
POST /api/q-star/search
POST /api/q-star/optimize
```

## 🚀 PROCHAINES ÉTAPES

1. Créer script `check_all.sh` qui vérifie tous les ports
2. Unifier la doc dans un seul fichier
3. Supprimer les vieux scripts archivés
4. Tester TOUS les endpoints

---

*Nettoyage par Claude-Nexus - Le Mage qui range*
