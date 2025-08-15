# 💻 TECHNOLOGIES UTILISÉES

**Stack technique complète de SpinForest/AVALON**

---

## 🎯 VUE D'ENSEMBLE

```
┌─────────────────────────────────────────────────┐
│                   FRONTEND                       │
│  HTML5 • CSS3 • JavaScript • D3.js • Three.js   │
├─────────────────────────────────────────────────┤
│                   BACKEND                        │
│  Java Spring Boot • Node.js • Python • Express  │
├─────────────────────────────────────────────────┤
│                  BASE/OUTILS                     │
│  Git • Bash • Maven • npm • Docker (futur)      │
└─────────────────────────────────────────────────┘
```

---

## 🌐 FRONTEND

### **HTML5/CSS3**
- **Utilisation** : Structure et style de base
- **Fichiers clés** :
  - `index.html` - Tour de la forêt
  - `crypte.html` - Crypte runique
  - `dashboard-vincent-simple.html`
- **Features** : Animations CSS, transitions, responsive

### **JavaScript Vanilla**
- **Utilisation** : Logique interactive
- **Fichiers** :
  - `spells/nav.js` - Navigation
  - `spells/crypte.js` - Digipad runique
- **Patterns** : Event-driven, DOM manipulation

### **D3.js**
- **Version** : v7
- **Utilisation** : Graphiques interactifs
- **Où** : `assets/interaction-map.html`
- **Features** : Force-directed graphs, animations

### **Three.js** (Planifié)
- **Pour** : Portails 3D
- **Où** : `assets/portail-3d-morgana.html`
- **Features** : WebGL, shaders, particules

---

## ☕ BACKEND

### **Java Spring Boot**
- **Version** : 2.7.x
- **Port** : 8080
- **Structure** :
```
backend-clean/
├── src/main/java/com/example/demo/
│   ├── controller/
│   │   ├── MagicFormulaController.java
│   │   └── ParticleSimulationController.java
│   ├── service/
│   │   └── MagicFormulaEngine.java
│   └── DemoApplication.java
└── pom.xml
```
- **Features** : REST API, WebSocket, JPA

### **Node.js**
- **Version** : 18.x LTS
- **Utilisation** : Services auxiliaires
- **Ports** : 8001-8003
- **Frameworks** :
  - Express.js - API REST
  - Socket.io - Temps réel
  - Mock backends

### **Python**
- **Version** : 3.9+
- **Utilisation** : Scripts, validations
- **Fichiers** :
  - `scripts/validate_tattoos.py`
  - `scripts/check_broken_links.py`
- **Libraries** : json, os, re

---

## 🛠️ OUTILS DE BUILD

### **Maven**
- **Pour** : Java/Spring Boot
- **Fichier** : `pom.xml`
- **Commandes** :
```bash
mvn clean install
mvn spring-boot:run
```

### **npm/yarn**
- **Pour** : Node.js, frontend packages
- **Fichier** : `package.json`
- **Commandes** :
```bash
npm install
npm run dev
npm run build
```

---

## 📚 LANGAGES DE DONNÉES

### **JSON**
- **Utilisation** : Configuration, données
- **Exemples** :
  - Tatouages : `tatouages_memento_*.json`
  - Héros : `sid_meier_architecte.json`
  - Structures : `SID_propositions_structure.json`

### **Markdown**
- **Utilisation** : Documentation
- **Extensions** : `.md`
- **Features** : Tables, code blocks, liens

### **RDF/Turtle** (Planifié)
- **Pour** : Sémantique 6D
- **Format** : `.ttl`
- **Outil** : Apache Jena

### **HOTS** (Custom)
- **Format** : Heroes of Time Script
- **Extension** : `.hots`
- **Utilisation** : Scénarios temporels

---

## 🔧 SCRIPTS & AUTOMATION

### **Bash**
- **Utilisation** : Automatisation
- **Scripts clés** :
  - `octopus-spinforest.sh`
  - `git-multivers-commit.sh`
  - `SPELL_CONTROL_CENTER.sh`
  - `LAUNCH_DASHBOARD_SIMPLE.sh`

### **Git Hooks** (Futur)
- Pre-commit : Validation
- Post-commit : Notifications
- Pre-push : Tests

---

## 🗄️ STOCKAGE & PERSISTANCE

### **Git**
- **Rôle** : Source de vérité
- **Structure** : Monorepo
- **Branches** : Multivers support

### **Système de fichiers**
- **Structure** : Hiérarchique
- **Formats** : Mixed (MD, JSON, HTML)
- **Backup** : Git history

### **LocalStorage** (Frontend)
- **Pour** : État utilisateur
- **Données** : Préférences, progression

---

## 🔌 APIS & PROTOCOLS

### **REST**
- **Format** : JSON
- **Endpoints** :
```
GET  /api/magic-formulas
POST /api/magic-formulas/execute
GET  /api/particle-simulation
GET  /api/octopus/status
```

### **WebSocket**
- **Pour** : Temps réel
- **Usage** : Dashboards live
- **Protocol** : ws://

### **Custom Protocols**
- **Sphinx Protocol** : Certification
- **Temporal Protocol** : Sync timelines
- **Octopus Protocol** : Coordination

---

## 🎨 ASSETS & MEDIA

### **Images**
- **Formats** : PNG, JPG
- **Stockage** : `/assets/`
- **Tailles** : 1-3MB typique

### **Audio** (Futur)
- **Format** : MP3, OGG
- **Usage** : Effets, ambiance

### **Fonts**
- **Principal** : System fonts
- **Special** : Runes (Unicode)

---

## 📊 MONITORING & DEBUG

### **Console.log** (Dev)
- Extensive logging
- Quantum hashes
- État système

### **Git log**
- Historique complet
- Format multivers

### **Browser DevTools**
- Network tab
- Console
- Performance

---

## 🚀 DÉPLOIEMENT

### **Actuel**
- Local development
- Git pour sync

### **Futur**
- GitHub Pages (frontend)
- Heroku/AWS (backend)
- Docker containers
- CI/CD pipeline

---

## 🔐 SÉCURITÉ

### **Authentification**
- Sphinx Protocol
- Session management

### **Validation**
- Input sanitization
- CORS configuration
- Rate limiting

---

## 📈 PERFORMANCE

### **Optimisations**
- Lazy loading
- Code splitting
- Caching strategies
- Minification

### **Métriques**
- < 100ms latence
- < 3s page load
- 60 FPS animations

---

*Cette stack évolue constamment. La magie de la technologie !*