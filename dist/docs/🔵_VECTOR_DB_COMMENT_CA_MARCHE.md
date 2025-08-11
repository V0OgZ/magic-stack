# 🔵 VECTOR DB - QUI FAIT QUOI ET COMMENT

## 🎯 RÉSUMÉ SIMPLE

### QUI ALIMENTE : **JEAN (Backend)**
- C'est **NOUS** qui indexons
- Script : `update_vector_db_hot_content.py`
- Dossier source : `hot/` (contenu du jeu)

### QUI UTILISE : **PAUL (Frontend)**
- Il appelle juste l'API
- Port : **5001**
- Endpoint : `http://localhost:5001/api/archives/search`

---

## 📂 ARCHITECTURE

```
hot/                         ← JEAN met le contenu ici
├── lore/                    ← Histoires
├── entities/                ← Héros, créatures
├── items/                   ← Artefacts
└── dialogues/               ← Dialogues PNJ

     ↓ JEAN indexe avec update_vector_db_hot_content.py

vector_db/                   ← Base de données vectorielle
├── index.faiss             ← Index FAISS (889 assets)
└── documents.json          ← Documents indexés

     ↓ Serveur Python (Port 5001)

PAUL appelle l'API          ← Frontend utilise
```

---

## 🚀 COMMENT PAUL L'UTILISE

### 1. LANCER LE SERVEUR (Backend fait ça)
```bash
python simple_vector_server.py  # Port 5001
```

### 2. APPELER L'API (Paul fait ça)
```javascript
// RECHERCHE SIMPLE
fetch('http://localhost:5001/api/archives/search', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    query: "dragon fire sword",
    mode: "story",  // ou "dev" pour docs techniques
    top_k: 5
  })
})
.then(r => r.json())
.then(results => {
  // results = [{content: "...", score: 0.95}, ...]
})
```

### 3. MODES DISPONIBLES
- `mode: "story"` → Lore, héros, artefacts (889 assets)
- `mode: "dev"` → Documentation technique
- `top_k: 5` → Nombre de résultats

---

## 📥 SI PAUL VEUT AJOUTER DU CONTENU

### ❌ CE QUE PAUL NE FAIT PAS :
- Ne touche PAS à `vector_db/`
- Ne lance PAS `update_vector_db_hot_content.py`
- Ne modifie PAS l'index FAISS

### ✅ CE QUE PAUL FAIT :
1. Met ses fichiers JSON dans `hot/`
2. Dit à JEAN : "J'ai ajouté X fichiers"
3. JEAN réindexe avec :
```bash
python update_vector_db_hot_content.py
```

---

## 🔄 WORKFLOW COMPLET

### JEAN (Backend) - PRÉPARATION
```bash
# 1. Ajouter contenu dans hot/
hot/entities/new_hero.json

# 2. Réindexer
python update_vector_db_hot_content.py

# 3. Lancer serveur
python simple_vector_server.py  # Port 5001
```

### PAUL (Frontend) - UTILISATION
```javascript
// Dans React/Vue/etc
async function searchLore(query) {
  const res = await fetch('http://localhost:5001/api/archives/search', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query: query,
      mode: "story",
      top_k: 10
    })
  });
  return await res.json();
}

// Exemple utilisation
const dragons = await searchLore("ancient dragon backstory");
// → [{content: "Grokaen le dragon...", score: 0.97}, ...]
```

---

## 📊 ÉTAT ACTUEL

- **889 assets** déjà indexés
- **Serveur** : `simple_vector_server.py`
- **Port** : 5001
- **Taille index** : ~5MB
- **Vitesse** : < 50ms par recherche

---

## ⚠️ IMPORTANT

### Pour PAUL :
1. **Tu UTILISES** l'API (port 5001)
2. **Tu NE TOUCHES PAS** à l'index
3. **Tu DEMANDES** à Jean pour ajouter du contenu

### Pour JEAN :
1. **On ALIMENTE** avec `update_vector_db_hot_content.py`
2. **On MAINTIENT** le serveur actif
3. **On RÉINDEXE** quand Paul ajoute du contenu

---

## 🎯 RÉSUMÉ EN 1 LIGNE

**PAUL appelle `http://localhost:5001/api/archives/search`, JEAN s'occupe du reste.**
