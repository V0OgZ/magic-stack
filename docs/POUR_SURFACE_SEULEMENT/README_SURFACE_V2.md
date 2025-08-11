# 📌 POUR L'ÉQUIPE SURFACE - V2 MIGRATION

## ⚠️ **IGNOREZ TOUT LE RESTE - LISEZ SEULEMENT ÇA**

---

## 📋 **2 DOCUMENTS ESSENTIELS (C'EST TOUT !)**

### 1️⃣ **[DOCUMENTATION_SURFACE_V2_MIGRATION.md](../../DOCUMENTATION_SURFACE_V2_MIGRATION.md)**
- Tous les breaking changes V2
- Format position 6D obligatoire
- Q* remplace les embeddings
- Exemples de code

### 2️⃣ **[API_REFERENCE_COMPLETE_V2.md](../../API_REFERENCE_COMPLETE_V2.md)**
- 104 endpoints
- Format tableau
- Copier/coller les payloads

---

## 🚀 **QUICK START**

```javascript
// 1. Position 6D (OBLIGATOIRE)
const position = {
  x: 0, y: 0, z: 0,  // Spatial
  t: 0,              // Temporal
  c: 1,              // Causal  
  psi: 0.5           // Quantum
};

// 2. Q* Search (remplace embeddings)
fetch('http://localhost:3001/api/qstar/search', {
  method: 'POST',
  body: JSON.stringify({
    center: position,
    radius: 10,
    mode: 'QUANTUM'
  })
});

// 3. V2 Tick (OBLIGATOIRE toutes les 100ms)
setInterval(() => {
  fetch('http://localhost:3001/api/v2/tick', {
    method: 'POST',
    body: JSON.stringify({
      current_tw: worldTime,
      current_te: entityTime,
      entities: [...]
    })
  });
}, 100);
```

---

## ❌ **IGNOREZ CES FICHIERS**

- Les 63 autres .md à la racine
- Les 200+ fichiers HTML
- Tout dans docs/ SAUF ce README
- Tout dans v2spec/
- Tout dans hot/

---

## ✅ **CE QUE VOUS DEVEZ FAIRE**

1. **Migrer vers positions 6D**
2. **Utiliser Q* au lieu d'embeddings**  
3. **Appeler /api/v2/tick toutes les 100ms**
4. **Lire les 2 docs mentionnées**

---

## 📡 **PORTS**

```bash
3001 - Rust Backend (Principal)
8080 - Java Backend (Combat)
5001 - Python Backend (Vector DB)
```

---

**C'EST TOUT ! Ne lisez RIEN d'autre !**
