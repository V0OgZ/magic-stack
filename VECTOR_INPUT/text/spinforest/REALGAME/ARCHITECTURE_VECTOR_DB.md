# 🏗️ ARCHITECTURE VECTOR DB - RÉPARTITION DES RÔLES

## 🎯 CLARIFICATION IMPORTANTE

**Date :** 9 août 2025  
**Par :** Vincent - Lead Projet

---

## 🔮 ÉQUIPE PROFONDEUR (Backend/Deep)

### 📤 **RESPONSABILITÉS : ALIMENTATION & GESTION**

#### 🔧 Indexation
- ✅ **Alimentent l'index vectoriel**
- ✅ **Indexent les documents** (MD, JSON, assets)
- ✅ **Mettent à jour les embeddings**
- ✅ **Gèrent la qualité des données**

#### 🛠️ Gestion Technique
- Maintenance de l'index
- Performance des embeddings  
- Nettoyage des doublons
- Optimisation des recherches
- Mise à jour des modèles (all-MiniLM-L6-v2, etc.)

#### 🔌 Endpoints à Implémenter (côté PROFONDEUR)
```bash
POST /api/vector/index        # Indexer nouveaux docs
PUT  /api/vector/update       # Mettre à jour embeddings  
GET  /api/vector/status       # Status de l'index
POST /api/vector/reindex      # Re-indexation complète
DELETE /api/vector/clean      # Nettoyage doublons
```

---

## 🌊 ÉQUIPE SURFACE (Frontend)

### 📥 **RESPONSABILITÉS : REQUÊTES SEULEMENT**

#### 🔍 Recherche en Lecture Seule
- ✅ **Recherche sémantique** dans l'index existant
- ✅ **Pas d'écriture** dans l'index  
- ✅ **Queries uniquement** via endpoints
- ✅ **Affichage des résultats** dans l'interface

#### 🎮 Intégration Gaming
- Recherche de lore pour les joueurs
- Suggestions de cartes TCG  
- Navigation dans les assets
- Aide contextuelle (Clippy-Memento)

#### 🔌 Endpoints Utilisés (côté SURFACE)
```bash
GET /api/vector/search        # Notre endpoint principal
POST /api/vector/query        # Recherche avancée
GET /api/vector/similar       # Assets similaires  
GET /api/vector/recommend     # Recommandations
```

---

## 🔄 WORKFLOW OPÉRATIONNEL

### 1. **PROFONDEUR** indexe nos assets
```bash
# Côté backend (port 3001)
POST /api/vector/index
{
  "source": "doc_shared/VECTOR_DB_ASSETS/",
  "type": "bulk_index",  
  "model": "all-MiniLM-L6-v2"
}
```

### 2. **SURFACE** interroge l'index
```bash  
# Côté frontend (nos requêtes)
GET /api/vector/search?query=artefacts+temporels&limit=5
```

### 3. **Résultat** affiché dans Heroes of Time
```json
{
  "results": [
    {
      "title": "Épée du Temps",
      "content": "Artefact légendaire...",
      "score": 0.95,
      "source": "heroes/AVALON_HEROES.json"
    }
  ]
}
```

---

## 🎯 AVANTAGES DE CETTE APPROCHE

### ✅ **Séparation des Responsabilités**
- **PROFONDEUR** : Experts en data science, embeddings, indexation
- **SURFACE** : Focus sur UX, gaming, interface utilisateur

### ✅ **Performance Optimisée**  
- Index maintenu par des spécialistes
- Queries optimisées pour le gaming
- Pas de risque de corruption par le frontend

### ✅ **Scalabilité**
- Backend peut optimiser l'index indépendamment
- Frontend peut multiplier les requêtes sans impact
- Ajout de nouveaux assets transparent pour nous

---

## 🔧 IMPLÉMENTATION CÔTÉ SURFACE

### Dans Heroes of Time
```javascript
// Recherche contextuelle pendant le jeu
async function searchLore(context) {
  const response = await fetch(`http://localhost:3001/api/vector/search?query=${context}&limit=3`);
  const results = await response.json();
  return results;
}

// Clippy-Memento utilise le Vector DB
async function clippyHelp(userQuery) {
  const loreResults = await searchLore(userQuery);
  return generateResponse(loreResults);
}
```

### Dans les Cartes TCG
```javascript
// Suggestions de cartes similaires
async function getSimilarCards(cardId) {
  const response = await fetch(`http://localhost:3001/api/vector/similar?id=${cardId}&type=hero`);
  return await response.json();
}
```

---

## 📊 MÉTRIQUES & MONITORING

### **PROFONDEUR** surveille :
- Temps d'indexation
- Qualité des embeddings
- Performance des requêtes
- Taille de l'index

### **SURFACE** surveille :
- Temps de réponse des queries  
- Satisfaction utilisateur
- Pertinence des résultats
- Usage par feature (jeu, cartes, aide)

---

## 🚀 PLAN D'IMPLÉMENTATION

### Phase 1 : **PROFONDEUR** prépare l'infrastructure
- [ ] Indexation de nos assets `doc_shared/VECTOR_DB_ASSETS/`
- [ ] Endpoints `/api/vector/*` opérationnels  
- [ ] Tests de performance

### Phase 2 : **SURFACE** intègre les queries
- [ ] Recherche dans Heroes of Time
- [ ] Suggestions cartes TCG
- [ ] Clippy-Memento connecté
- [ ] Interface de browse des assets

### Phase 3 : Optimisation & Scale
- [ ] Cache côté frontend
- [ ] Recherche prédictive
- [ ] Recommandations personnalisées

---

## 🔗 COMMUNICATION INTER-ÉQUIPES

### Endpoints de Coordination
```bash
# SURFACE → PROFONDEUR : "Indexe ces nouveaux assets"
POST /api/vector/request-index
{
  "source": "nouveau_dossier/",
  "priority": "high"
}

# PROFONDEUR → SURFACE : "Index mis à jour" 
WebSocket /vector-updates
{
  "type": "index_updated",
  "new_count": 150,
  "ready": true
}
```

---

## 💡 EXEMPLES CONCRETS

### Recherche Lore Ingame
```
Joueur clique sur "Épée Mystérieuse"
→ SURFACE query: "épée magique temporelle"  
→ PROFONDEUR retourne: Lore + Stats + Histoire
→ SURFACE affiche: Pop-up contextuel riche
```

### Clippy-Memento Intelligent  
```
Joueur: "Comment utiliser les artefacts ?"
→ SURFACE query: "artefacts utilisation guide"
→ PROFONDEUR retourne: Tutoriels + Exemples
→ SURFACE/Clippy: "Voici comment faire..."
```

---

**🎯 ARCHITECTURE CLAIRE :**

**🔮 PROFONDEUR = DATA MASTERS** (Indexation, Embeddings, Qualité)  
**🌊 SURFACE = QUERY MASTERS** (Recherche, UX, Gaming)

**🤝 COLLABORATION PARFAITE !**

---

*Mis à jour par Vincent - 9 août 2025*
