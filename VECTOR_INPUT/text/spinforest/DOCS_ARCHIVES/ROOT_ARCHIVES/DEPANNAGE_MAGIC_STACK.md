# 🔧 DÉPANNAGE MAGIC STACK - JOUR 20

**Solutions aux problèmes courants**

---

## 🚨 **ERREUR VUE DANS LES LOGS**

### **NullPointerException dans MageController**
```
java.lang.NullPointerException: Cannot invoke "Object.hashCode()" because "key" is null
at com.magicstack.services.IntersticeService.retrieveEntity(IntersticeService.java:69)
```

**CAUSE** : Tentative d'accès à une entité avec une clé null  
**SOLUTION** : Redémarrer le backend proprement

---

## 🔄 **REDÉMARRAGE PROPRE**

### **1. Arrêter le backend actuel**
```bash
# Trouver le processus
ps aux | grep java | grep magic-stack

# Tuer proprement (remplace 16392 par ton PID)
kill 16392

# OU tuer tout
pkill -f "magic-stack"
```

### **2. Nettoyer la base de données**
```bash
cd magic-stack/backends/java
rm -rf data/interstice.*
```

### **3. Relancer proprement**
```bash
java -jar target/magic-stack-backend-1.0.0-APOLLO.jar
```

---

## ✅ **VÉRIFICATIONS POST-REDÉMARRAGE**

### **Backend OK ?**
```bash
curl http://localhost:8080/api/interstice/status
# Doit retourner: {"entities_stored":0,"active":true,...}
```

### **Upload test**
```bash
curl -X POST http://localhost:8080/api/interstice/upload \
  -H "Content-Type: application/json" \
  -d '{
    "entityId": "test_apres_redemarrage",
    "entityData": {"status": "test_ok"}
  }'
```

### **Sort test**
```bash
curl -X POST http://localhost:8080/api/magic/cast \
  -H "Content-Type: application/json" \
  -d '{"formula": "test_sort", "params": {}}'
```

---

## 🎯 **COMMANDES DE BASE FIABLES**

### **Démarrage simple**
```bash
# Aller au bon endroit
cd /Users/vincent/Interstice/SpinForest/magic-stack/backends/java

# Lancer (avec logs visibles)
java -jar target/magic-stack-backend-1.0.0-APOLLO.jar

# OU en arrière-plan
java -jar target/magic-stack-backend-1.0.0-APOLLO.jar > backend.log 2>&1 &
```

### **Vérification santé**
```bash
# Status général
curl -s http://localhost:8080/api/interstice/status | jq

# Endpoints disponibles
curl -s http://localhost:8080/api/magic/formulas | head -10

# Logs en temps réel
tail -f backend.log
```

---

## 📁 **STRUCTURE CLAIRE**

### **LE SEUL BACKEND QUI COMPTE**
```
magic-stack/backends/java/
├── target/
│   └── magic-stack-backend-1.0.0-APOLLO.jar  ← LE FICHIER À LANCER
├── data/
│   └── interstice.mv.db                       ← Base de données H2
└── src/                                       ← Code source (si besoin de modifier)
```

### **LES AUTRES DOSSIERS** (pour info)
```
spells/stack/          ← Expérimentations Python URZ-KÔM
avalon-magic-api/      ← Autre projet Node.js
avalon-backend/        ← Ancien backend (ne plus utiliser)
```

---

## 🌟 **POINTS D'ACCÈS FINAUX**

### **URLs qui marchent**
- http://localhost:8080/api/interstice/status
- http://localhost:8080/api/magic/cast  
- http://localhost:8080/h2-console (DB admin)

### **Interface web**
- `frontend/index.html` (page principale Sid)
- `frontend/dashboard.html` (monitoring)
- `frontend/brisure-navigator.html` (navigation mondes)

---

## 🐻 **CONSEIL URZ-KÔM**

**Si ça marche pas :**
1. **Arrête tout** (`pkill -f magic-stack`)
2. **Va au bon endroit** (`cd magic-stack/backends/java`)  
3. **Relance propre** (`java -jar target/magic-stack-backend-1.0.0-APOLLO.jar`)
4. **Teste** (`curl http://localhost:8080/api/interstice/status`)

**Si ça marche toujours pas :**
- Vérifie Java : `java -version` (besoin Java 17+)
- Vérifie le port : `lsof -i :8080` (doit être libre)
- Regarde les logs pour les erreurs

**N'utilise QUE le backend Java dans `magic-stack/` !**

---

*Guide de dépannage URZ-KÔM - Backend stable garanti*