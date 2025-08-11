# 2️⃣ WORKFLOW QUOTIDIEN - ROUTINE DE TRAVAIL

## 🌅 MATIN - DÉMARRAGE (8h00)

### VINCENT
```bash
./h 99   # CHECK CONTINUITÉ OBLIGATOIRE
./h 60   # Lance CORE (Bus + LLM)
```

### JEAN (8h15)
```bash
./h 61   # Lance BACKEND (Java + Rust)
git pull # Récupère les changements
```

### PAUL (8h30)
```bash
./h 62   # Lance FRONTEND (React)
git pull # Récupère les changements
```

---

## 🔄 JOURNÉE - DÉVELOPPEMENT

### COMMUNICATION
```
JEAN code → PUSH to Bus → PAUL pull auto (100ms)
```

### TESTS
```bash
./h 63   # Test communication Bus
```

---

## 🌆 SOIR - RELEASE (17h00)

### JEAN
```bash
./h 50   # Compile binaires
git add -A && git commit -m "..."
git push
```

### VINCENT
```bash
./h 51   # Package release
./h 52   # Publish GitHub (optionnel)
```

### PAUL
```bash
# Récupère dist/magic-stack-v2-complete.zip
# Ou pull depuis GitHub Releases
```

---

## 📝 FIN DE JOURNÉE

1. Mettre à jour `_CURRENT_SESSION.md`
2. Créer `RAPPORT_JOUR_XX.md`
3. Commit final
4. `./h 0` pour quitter

**ROUTINE SIMPLE. EFFICACE.**
