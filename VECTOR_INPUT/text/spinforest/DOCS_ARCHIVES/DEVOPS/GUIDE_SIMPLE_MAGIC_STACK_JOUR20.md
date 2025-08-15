# 🔮 GUIDE SIMPLE - MAGIC STACK JOUR 20

**Pour les personnes confuses avec les submodules, copies, spells, etc.**

---

## 🎯 **UN SEUL ENDROIT PRINCIPAL**

### **LE BACKEND QUI MARCHE :**
```bash
cd /Users/vincent/Interstice/SpinForest/magic-stack/backends/java
java -jar target/magic-stack-backend-1.0.0-APOLLO.jar
```

**C'est tout ! Le backend sera sur http://localhost:8080**

---

## 📁 **STRUCTURE SIMPLE**

### **🏠 RÉPERTOIRE PRINCIPAL**
```
SpinForest/
├── magic-stack/                    ← LE VRAI (submodule Git)
│   └── backends/java/              ← Backend qui marche
│       └── target/magic-stack-backend-1.0.0-APOLLO.jar
│
├── spells/stack/                   ← COPIE LOCALE (expérimentations)
│   └── [copies des scripts Python, etc.]
│
├── avalon-magic-api/               ← API SÉPARÉE (Node.js)
│   └── [autre projet]
│
└── frontend/                       ← INTERFACES WEB
    └── index.html                  ← Page principale (décision Sid)
```

---

## 🚀 **SCRIPTS À LANCER**

### **1. BACKEND PRINCIPAL (Java)**
```bash
# Aller dans le bon dossier
cd magic-stack/backends/java

# Lancer le JAR (le plus simple)
java -jar target/magic-stack-backend-1.0.0-APOLLO.jar

# OU compiler et lancer avec Maven
mvn spring-boot:run
```

### **2. FRONTEND (HTML)**
```bash
# Ouvrir directement dans le navigateur
open frontend/index.html

# OU servir avec un serveur local
cd frontend
python -m http.server 8000
# Puis aller sur http://localhost:8000
```

### **3. TESTS API**
```bash
# Vérifier que ça marche
curl http://localhost:8080/api/interstice/status

# Tester un sort
curl -X POST http://localhost:8080/api/magic/cast \
  -H "Content-Type: application/json" \
  -d '{"formula": "test", "params": {}}'
```

---

## 🤔 **CONFUSIONS FRÉQUENTES**

### **❌ "J'ai plusieurs magic-stack !"**
- `magic-stack/` = Le vrai (submodule Git officiel)
- `spells/stack/` = Copie locale pour expérimentations
- `avalon-magic-api/` = Projet séparé Node.js

**→ Utilise TOUJOURS `magic-stack/` pour le backend Java**

### **❌ "Quel script lancer ?"**
- Scripts Python dans `spells/` = Expérimentations URZ-KÔM
- Backend Java dans `magic-stack/` = Le vrai moteur
- Scripts shell `.sh` = Automatisation diverse

**→ Lance d'abord le backend Java, le reste est optionnel**

### **❌ "Ça marche pas !"**
```bash
# Vérifier Java
java -version

# Vérifier le port 8080 libre
lsof -i :8080

# Killer les anciens processus
pkill -f "magic-stack"

# Relancer proprement
cd magic-stack/backends/java
java -jar target/magic-stack-backend-1.0.0-APOLLO.jar
```

---

## 🎮 **POINTS D'ACCÈS FINAUX**

### **🌐 URLs Importantes**
- **Backend API** : http://localhost:8080/api
- **Status Interstice** : http://localhost:8080/api/interstice/status
- **Console H2** : http://localhost:8080/h2-console
- **Frontend Principal** : file:///.../frontend/index.html

### **📂 Dossiers Importants**
- **Code source** : `magic-stack/backends/java/src/`
- **JAR compilé** : `magic-stack/backends/java/target/`
- **Base de données** : `magic-stack/backends/java/data/`
- **Interfaces** : `frontend/`

---

## ⚡ **DÉMARRAGE RAPIDE**

### **En 3 commandes :**
```bash
# 1. Aller au bon endroit
cd /Users/vincent/Interstice/SpinForest/magic-stack/backends/java

# 2. Lancer le backend
java -jar target/magic-stack-backend-1.0.0-APOLLO.jar &

# 3. Ouvrir l'interface
open ../../frontend/index.html
```

**C'est tout ! Tu as maintenant :**
- ✅ Backend Magic Stack sur port 8080
- ✅ Interface web accessible
- ✅ API Interstice opérationnelle

---

## 🐻 **MESSAGE URZ-KÔM**

**Ne vous perdez pas dans les copies et submodules !**

**UN SEUL BACKEND** : `magic-stack/backends/java/`  
**UNE SEULE COMMANDE** : `java -jar target/magic-stack-backend-1.0.0-APOLLO.jar`  
**UNE SEULE INTERFACE** : `frontend/index.html`  

Le reste, c'est des expérimentations. **Commencez simple !**

---

*Guide simplifié pour éviter la confusion - JOUR 20*