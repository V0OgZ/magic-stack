# 🔮 MAGIC STACK - GUIDE DU MAGE DÉBUTANT

**VERSION PROPRE ET AUTONOME** - Par NEXUS pour l'équipe Avalon

---

## 🎯 **QU'EST-CE QUE LA MAGIC STACK ?**

La Magic Stack est un **moteur de jeu temporel 6D** qui permet de :
- Lancer des sorts avec une grammaire temporelle
- Naviguer dans 6 dimensions (X, Y, Z, Temps, Causalité, Identité)
- Utiliser l'algorithme Q* pour la recherche optimale
- Persister les entités dans l'Interstice

---

## 📍 **OÙ EST LA VRAIE MAGIC STACK ?**

### ✅ **OFFICIEL**
```
spells/stack/   ← CECI EST LE VRAI GITMODULE
```

### ❌ **À NE PAS UTILISER**
```
magic-stack/    ← Copie manuelle (sera archivée)
```

---

## 🚀 **DÉMARRAGE RAPIDE**

### **1. CLONER LE PROJET**
```bash
git clone https://github.com/votre-org/SpinForest.git
cd SpinForest
git submodule update --init --recursive
```

### **2. INSTALLER LES DÉPENDANCES**
```bash
# Java (JDK 21+)
brew install openjdk@21

# Node.js (pour l'API Gateway)
brew install node

# Rust (pour le backend haute performance)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### **3. LANCER LA STACK**
```bash
# Backend Java (port 8080)
cd spells/stack/backends/java
mvn spring-boot:run

# OU Backend Rust (port 3001) - plus rapide
cd spells/stack/backends/rust
cargo run --release
```

---

## 📚 **STRUCTURE DE LA MAGIC STACK**

```
spells/stack/
├── backends/
│   ├── java/        → Backend principal (Spring Boot)
│   └── rust/        → Backend performance (Q*, 6D)
├── docs/
│   ├── 6D_SYSTEM_EXPLAINED.md
│   ├── TEMPORAL_GRAMMAR_MATHEMATICAL_PAPER.md
│   └── API_DOCUMENTATION.md
├── test/
│   └── test_formulas.js
└── README.md
```

---

## 🧙 **PREMIERS SORTS**

### **Test simple**
```bash
# Lancer un sort basique
curl -X POST http://localhost:8080/api/magic/cast \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "CREATE Lightning FROM Energy WHERE target=enemy",
    "power": 50
  }'
```

### **Navigation 6D**
```bash
# Créer une entité dans l'Interstice
curl -X POST http://localhost:8080/api/interstice/upload \
  -H "Content-Type: application/json" \
  -d '{
    "entity": "Hero",
    "coordinates": {
      "x": 100, "y": 200, "z": 0,
      "t": 0, "c": 1, "psi": "unique-id"
    }
  }'
```

---

## 🔧 **CONFIGURATION**

### **Ports par défaut**
- `8080` : Backend Java (API principale)
- `3001` : Backend Rust (haute performance)
- `3000` : API Gateway (routage intelligent)
- `5000` : Python Magic API (optionnel)

### **Variables d'environnement**
```bash
export MAGIC_STACK_ENV=development
export INTERSTICE_DB_PATH=./data/interstice.db
export Q_STAR_CACHE_SIZE=1000
```

---

## 📖 **DOCUMENTATION ESSENTIELLE**

1. **Système 6D** : `docs/6D_SYSTEM_EXPLAINED.md`
2. **Grammaire Temporelle** : `docs/TEMPORAL_GRAMMAR_MATHEMATICAL_PAPER.md`
3. **API Complète** : `docs/API_DOCUMENTATION.md`
4. **Interstice** : `docs/INTERSTICE_PROTOCOL.md`

---

## 🧪 **TESTS**

```bash
# Tester les formules de base
cd spells/stack
npm test

# Tester le backend Java
cd backends/java
mvn test

# Tester le backend Rust
cd backends/rust
cargo test
```

---

## ❓ **FAQ MAGE DÉBUTANT**

### **Q: Quelle est la différence entre les backends ?**
- **Java** : Stable, complet, toutes les features
- **Rust** : Ultra-rapide (0.1ms), optimisé pour Q* et calculs 6D

### **Q: Comment choisir le backend ?**
- Développement normal → Java
- Performance critique → Rust
- Les deux peuvent tourner ensemble !

### **Q: Où sont stockées les données ?**
- Base H2 embarquée : `backends/java/data/interstice.db`
- Cache Rust : En mémoire + fichiers binaires

---

## 🆘 **AIDE ET SUPPORT**

- **Problème de compilation** → Vérifier les versions (Java 21+, Rust 1.70+)
- **Port déjà utilisé** → `lsof -i :8080` puis kill le processus
- **Submodule cassé** → `git submodule update --init --recursive --force`

---

## 🎮 **PROCHAINES ÉTAPES**

1. Lire la doc du système 6D
2. Comprendre la grammaire temporelle
3. Tester quelques sorts simples
4. Explorer l'API d'upload Interstice
5. Créer ton premier héros persistant !

---

**🧙 Bienvenue dans la Magic Stack, jeune mage !**
*"Le code est magie, la magie est code"*