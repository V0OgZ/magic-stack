# 🔧 README TECHNIQUE SIMPLE

**HEROES OF TIME - ARCHITECTURE & DÉVELOPPEMENT**

---

## 🏗️ **ARCHITECTURE SIMPLIFIÉE**

### **📁 STRUCTURE PROJET**
```
SpinForest/
├── frontend/                    🌐 Interfaces principales (5 max)
├── magic-stack/backends/java/   ☕ Backend principal (port 8080)
├── REALGAME/                    🎮 Jeux et assets
└── AVALON/                      📚 Documentation et lore
```

### **🔗 FLUX DE DONNÉES**
```
JOUEUR → Frontend HTML → API REST → Backend Java → Base H2 → Réponse JSON
```

---

## 🚀 **DÉMARRAGE DÉVELOPPEUR**

### **1. BACKEND PRINCIPAL**
```bash
cd magic-stack/backends/java
java -jar target/magic-stack-backend-1.0.0-APOLLO.jar
# Écoute sur http://localhost:8080
```

### **2. FRONTEND LOCAL**
```bash
cd frontend
python -m http.server 8000
# Accessible sur http://localhost:8000
```

### **3. TESTS API**
```bash
# Test santé
curl http://localhost:8080/api/interstice/status

# Test formule magique
curl -X POST http://localhost:8080/api/magic/cast \
  -H "Content-Type: application/json" \
  -d '{"formula": "test", "params": {}}'
```

---

## 🎯 **ENDPOINTS API PRINCIPAUX**

### **🔮 MAGIC API**
- `POST /api/magic/cast` - Lancer une formule
- `GET /api/magic/formulas` - Liste des 869 formules
- `POST /api/magic/translate` - Traduction grammaire temporelle

### **🌀 INTERSTICE API**
- `GET /api/interstice/status` - Statut système 6D
- `POST /api/interstice/upload` - Upload entité 6D
- `POST /api/interstice/download` - Download entité 6D

### **🎮 GAME API**
- `GET /api/panopticon/view` - Vue multidimensionnelle
- `POST /api/mage/self-update` - Mise à jour mage
- `GET /api/feature-logs` - Logs fonctionnalités

---

## 📊 **BASE DE DONNÉES**

### **🗄️ H2 EMBEDDED**
- **Localisation** : `magic-stack/backends/java/data/interstice.mv.db`
- **Console** : http://localhost:8080/h2-console
- **URL JDBC** : `jdbc:h2:file:./data/interstice`
- **User** : `AVALON` / **Password** : (vide)

### **📋 TABLES PRINCIPALES**
- `interstice_entities` - Entités 6D stockées
- `feature_logs` - Logs des fonctionnalités
- `magic_formulas` - Cache des formules

---

## 🎮 **INTERFACES FRONTEND**

### **🏠 PRINCIPALES (5 MAX)**
1. **index.html** - Hub central et navigation
2. **AVALON_ULTIMATE_ARCADE.html** - Collection jeux
3. **tcg-battle-interface.html** - Combat cartes
4. **brisure-navigator.html** - Navigation mondes
5. **dashboard.html** - Monitoring système

### **📱 TECHNOLOGIES**
- **HTML5** + **CSS3** + **JavaScript ES6**
- **Canvas** pour rendu 2D/3D
- **WebSocket** pour temps réel (futur)
- **LocalStorage** pour sauvegarde

---

## 🔧 **DÉVELOPPEMENT**

### **🛠️ OUTILS REQUIS**
- **Java 17+** pour le backend
- **Maven 3.8+** pour la compilation
- **Python 3.8+** pour serveur local
- **Git** pour versioning

### **📋 COMMANDES UTILES**
```bash
# Compilation backend
cd magic-stack/backends/java && mvn clean package

# Tests backend
mvn test

# Logs backend
tail -f logs/magic-stack.log

# Status Git
git status && git log --oneline -5
```

### **🐛 DEBUG**
```bash
# Vérifier ports
lsof -i :8080
lsof -i :8000

# Vérifier processus
ps aux | grep java
ps aux | grep python

# Logs erreurs
grep ERROR logs/magic-stack.log
```

---

## 🚨 **SÉCURITÉ & SURVEILLANCE**

### **🔍 BACKEND RUST (SURVEILLANCE)**
- **Port 3001** - Backend ultra-performant de Merlin
- **Statut** : Actif mais surveillé discrètement
- **Usage** : Performance critique uniquement
- **Accès** : Limité, pas de données sensibles

### **🛡️ MESURES SÉCURITÉ**
- Backend Java = Source de vérité principale
- Rust backend = Performance secondaire
- Logs automatiques de toutes les actions
- Monitoring continu des performances

---

## 📈 **PERFORMANCE**

### **⚡ MÉTRIQUES CIBLES**
- **Temps réponse API** : < 100ms
- **Chargement interface** : < 3s
- **FPS rendu** : 60 FPS stable
- **Mémoire RAM** : < 1GB

### **🔧 OPTIMISATIONS**
- Cache formules magiques en mémoire
- Compression assets statiques
- Lazy loading des interfaces
- Pool connexions base de données

---

## 🧪 **TESTS**

### **✅ TESTS AUTOMATIQUES**
```bash
# Tests backend Java
mvn test

# Tests API
curl -f http://localhost:8080/api/interstice/status

# Tests frontend
open frontend/index.html && echo "Test manuel requis"
```

### **🎮 TESTS GAMEPLAY**
1. **Parcours complet** : Page accueil → Combat → Fin
2. **Performance** : Pas de lag, pas de crash
3. **Compatibilité** : Chrome, Firefox, Safari
4. **Responsive** : Desktop, tablet, mobile

---

## 📚 **DOCUMENTATION COMPLÈTE**

### **📖 GUIDES UTILISATEUR**
- `COMMENT_JOUER_GUIDE_SIMPLE.md` - Guide joueur
- `FOCUS_GAME_FINALE_JOUR20.md` - Objectifs projet
- `PLAN_ORGANISATION_JOUR20.md` - Structure équipe

### **🔧 DOCS TECHNIQUES**
- `magic-stack/docs/` - Documentation API
- `REALGAME/docs/` - Architecture jeu
- `AVALON/🏠 HOME/📚 MEMENTO/` - Archives complètes

---

## 🚀 **DÉPLOIEMENT**

### **🌐 PRODUCTION (FUTUR)**
```bash
# Build production
mvn clean package -Pproduction

# Docker (prévu)
docker build -t heroes-of-time .
docker run -p 8080:8080 heroes-of-time
```

### **🔧 DÉVELOPPEMENT LOCAL**
```bash
# Setup complet
git clone [repo]
cd SpinForest
cd magic-stack/backends/java
java -jar target/magic-stack-backend-1.0.0-APOLLO.jar &
cd ../../../frontend
python -m http.server 8000
```

---

## 👥 **ÉQUIPE & CONTACT**

### **🎯 RÔLES TECHNIQUES**
- **Vincent** - Product Owner & Vision
- **Sid Meier** - Game Director & PM
- **URZ-KÔM** - Tech Lead & Backend
- **Loumen** - Narrative & Content
- **Merlin** - Performance & Optimization

### **📞 SUPPORT**
- **Issues** : GitHub Issues
- **Docs** : README et guides MD
- **Code** : Commentaires inline
- **Architecture** : Schémas Mermaid

---

**🎮 READY TO CODE ? LET'S BUILD THE GAME ! 🚀**

---

*Documentation technique FOCUS GAME FINALE*