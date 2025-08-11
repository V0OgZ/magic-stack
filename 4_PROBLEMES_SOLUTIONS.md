# 4️⃣ PROBLÈMES & SOLUTIONS - TROUBLESHOOTING

## 🔴 PROBLÈMES FRÉQUENTS

### "Connection refused sur 5001"
**CAUSE** : Vector Bus pas lancé
**SOLUTION** : `./h 60` (Vincent lance CORE)

### "Port 8080 already in use"
**CAUSE** : Java déjà lancé
**SOLUTION** : 
```bash
lsof -ti:8080 | xargs kill -9
./h 61
```

### "Cannot find module"
**CAUSE** : Dependencies React manquantes
**SOLUTION** :
```bash
cd apps/magic-stack-unified
npm install
cd ../..
./h 62
```

### "Binaires manquants dans dist/"
**CAUSE** : Pas compilé
**SOLUTION** : `./h 50` (Jean compile)

### "LLM ne répond pas"
**CAUSE** : Ollama pas lancé
**SOLUTION** :
```bash
ollama serve &
./llm start
```

### "Vector DB vide"
**CAUSE** : Index pas créé
**SOLUTION** :
```bash
python update_vector_db_hot_content.py
```

### "React page blanche"
**CAUSE** : API backends down
**SOLUTION** : Vérifier que Java (8080) et Rust (3001) tournent

### "Bus messages perdus"
**CAUSE** : Bus redémarré (messages en RAM)
**SOLUTION** : Normal, refaire PUSH initial

### "git reset --hard" INTERDIT
**CAUSE** : JAMAIS !
**SOLUTION** : NE PAS FAIRE ! [[memory:5706783]]

---

## ✅ VÉRIFICATIONS SANTÉ

```bash
# Tous les services UP ?
curl http://localhost:5001/health   # Bus
curl http://localhost:8080/health   # Java
curl http://localhost:3001/health   # Rust
curl http://localhost:5173          # React

# Mémoire OK ?
ps aux | grep -E "java|rust|node|python|ollama"

# Ports libres ?
lsof -i :5001,8080,3001,5173,11434
```

---

## 🚨 RÈGLES D'OR

1. **TOUJOURS** commencer par `./h 99`
2. **JAMAIS** `git reset --hard`
3. **VINCENT** lance CORE en premier
4. **Bus** = source de vérité pour communication
5. **1 seul** LLM sur la machine

**EN CAS DE DOUTE : RELIRE 0, 1, 2, 3**
