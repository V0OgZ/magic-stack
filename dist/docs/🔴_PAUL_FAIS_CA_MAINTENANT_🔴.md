# 🔴 PAUL - INSTRUCTIONS ULTRA SIMPLES - IMPOSSIBLE DE SE TROMPER 🔴

## 1️⃣ RÉCUPÈRE LES BINAIRES (10 secondes)

```bash
cd /ton/dossier/surface
curl -L https://github.com/Vincent/Magic-Stack/releases/latest/download/magic-stack-v2-complete.zip -o magic.zip
unzip magic.zip
```

## 2️⃣ LANCE LES BACKENDS (20 secondes)

```bash
# Terminal 1 - Java
java -jar dist/binaries/magic-stack.jar

# Terminal 2 - Rust
./dist/binaries/magic-stack-server

# Terminal 3 - Python Vector DB
cd magic-stack && python clippy_vector_server.py
```

## 3️⃣ VÉRIFIE QUE ÇA MARCHE (5 secondes)

```bash
curl http://localhost:8080/health    # ✅ Java
curl http://localhost:3001/health    # ✅ Rust  
curl http://localhost:5001/health    # ✅ Python
```

## 4️⃣ LIS LA DOC V2 (2 minutes)

Ouvre `dist/docs/🔴_API_V2_LIRE_ICI_🔴.md`

**3 CHANGEMENTS CRITIQUES:**
1. Positions maintenant en 6D : `{x, y, z, t_w, c, psi}`
2. Q* Search : `/api/v2/qstar-search` 
3. Tick V2 : `/api/v2/tick` toutes les 100ms

## 5️⃣ TEST RAPIDE

```javascript
// COPIE-COLLE CE CODE
fetch('http://localhost:3001/api/v2/tick', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    world_tick: 100,
    positions_6d: [{
      entity_id: "hero_1",
      x: 10, y: 20, z: 0,
      t_w: 100, c: 1.0, psi: 0.5
    }]
  })
}).then(r => r.json()).then(console.log)
```

## ❌ SI ÇA MARCHE PAS

1. **Port déjà utilisé?** → Kill le process: `lsof -ti:8080 | xargs kill -9`
2. **Java pas installé?** → `brew install openjdk@17`
3. **Erreur V2?** → Les POSITIONS sont en 6D maintenant!

## ✅ QUAND ÇA MARCHE

Dis à Vincent: "Backend V2 opérationnel sur tous les ports"

---

**C'EST TOUT. 5 ÉTAPES. 3 MINUTES MAX.**
