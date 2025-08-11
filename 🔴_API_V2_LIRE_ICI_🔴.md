# 🔴🔴🔴 API V2 - ÉQUIPE SURFACE - LISEZ ÇA ! 🔴🔴🔴

---

## ⚡ **3 CHANGEMENTS OBLIGATOIRES**

### 1️⃣ **POSITIONS 6D (plus de x,y simple !)**
```javascript
// ❌ ANCIEN (NE MARCHE PLUS)
position: {x: 0, y: 0}

// ✅ NOUVEAU (OBLIGATOIRE)
position: {
  x: 0,      // Spatial X
  y: 0,      // Spatial Y  
  z: 0,      // Spatial Z
  t: 0,      // Temporal
  c: 1,      // Causal
  psi: 0.5   // Quantum
}
```

### 2️⃣ **Q* REMPLACE EMBEDDINGS (37x plus rapide !)**
```javascript
// ❌ ANCIEN (LENT)
fetch('/embed', {text: "..."})  // 500ms

// ✅ NOUVEAU (RAPIDE)
fetch('http://localhost:3001/api/qstar/search', {
  method: 'POST',
  body: JSON.stringify({
    center: {x:0, y:0, z:0, t:0, c:1, psi:0.5},
    radius: 10,
    mode: 'QUANTUM'
  })
})  // 13ms !
```

### 3️⃣ **TICK V2 TOUTES LES 100MS (sinon bug !)**
```javascript
// ⚠️ OBLIGATOIRE SINON DÉSYNCHRONISATION
setInterval(() => {
  fetch('http://localhost:3001/api/v2/tick', {
    method: 'POST',
    body: JSON.stringify({
      current_tw: worldTime,
      current_te: entityTime,
      entities: activeEntities
    })
  })
}, 100);  // TOUTES LES 100MS !
```

---

## 📡 **PORTS À UTILISER**

```bash
3001 → Rust Backend   # V2, Q*, Vector DB
8080 → Java Backend   # Combat, Magic
5001 → Python Backend # Fallback
```

---

## 📋 **TOP 10 ENDPOINTS LES PLUS IMPORTANTS**

| Endpoint | Description | Exemple |
|----------|-------------|---------|
| **POST /api/v2/tick** | ⚠️ OBLIGATOIRE toutes les 100ms | `{current_tw: 100, current_te: 95}` |
| **POST /api/qstar/search** | 🚀 Remplace embeddings (37x faster) | `{center: pos6d, radius: 10}` |
| **POST /api/combat/start** | Démarrer combat TCG | `{player1: "p1", player2: "ai"}` |
| **POST /api/magic/cast** | Lancer sort (869 formules) | `{formula: "HEAL", power: 10}` |
| **POST /api/v2/entity** | Créer/modifier entité | `{id: "e1", position: pos6d}` |
| **POST /api/world-state/collapse** | Collapse quantique | `{nodeId: "n1"}` |
| **GET /api/economy/inventory** | Inventaire joueur | - |
| **POST /api/regulators/vince** | Activer régulateur | `{intensity: 5}` |
| **POST /api/archives/search** | Recherche Vector DB | `{query: "temporal"}` |
| **POST /api/hero/add-xp** | Ajouter XP | `{amount: 100}` |

---

## 🛑 **ERREURS À ÉVITER**

```javascript
// ❌ NE PAS FAIRE
position: {x: 0, y: 0}              // Manque 4 dimensions !
fetch('/embed')                     // N'existe plus !
// Oublier le tick V2                // Désynchronisation !

// ✅ FAIRE
position: {x:0, y:0, z:0, t:0, c:1, psi:0.5}  // 6D complet
fetch('/api/qstar/search')                     // Q* rapide
setInterval(() => tick(), 100)                 // Tick régulier
```

---

## 📚 **DOCUMENTATION COMPLÈTE**

1. **[API_REFERENCE_COMPLETE_V2.md](./API_REFERENCE_COMPLETE_V2.md)** → 104 endpoints avec exemples
2. **[DOCUMENTATION_SURFACE_V2_MIGRATION.md](./DOCUMENTATION_SURFACE_V2_MIGRATION.md)** → Guide migration complet

---

## 🚀 **TEST RAPIDE**

```bash
# Copier/coller pour tester :
curl -X POST http://localhost:3001/api/qstar/search \
  -H "Content-Type: application/json" \
  -d '{"center":{"x":0,"y":0,"z":0,"t":0,"c":1,"psi":0.5},"radius":10}'
```

---

**⚠️ SI VOUS NE FAITES PAS CES 3 CHANGEMENTS, VOTRE CODE NE MARCHERA PAS !**
