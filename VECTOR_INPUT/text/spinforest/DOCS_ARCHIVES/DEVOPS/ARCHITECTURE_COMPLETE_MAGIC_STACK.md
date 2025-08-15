# 🏗️ ARCHITECTURE COMPLÈTE MAGIC STACK
## Documentation Technique Détaillée

**Date**: 4 Août 2025  
**Version**: 1.0  
**Maintenu par**: URZ-KÔM & équipe

---

## 📋 VUE D'ENSEMBLE

La Magic Stack est un système multi-backend avec architecture 6D pour AVALON.

### 🎯 COMPOSANTS PRINCIPAUX

```
┌─────────────────────────────────────────────────────┐
│                   FRONTEND                          │
│              (Ports 3000, 8001, 9000)              │
└────────────────────┬───────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│                API GATEWAY                          │
│                 (Port 3000)                         │
│              avalon-magic-api/                      │
└────────────┬──────────────────┬────────────────────┘
             │                  │
             ▼                  ▼
┌─────────────────────┐ ┌─────────────────────────────┐
│   BACKEND PYTHON    │ │    BACKEND JAVA             │
│    (Port 5000)      │ │     (Port 8080)             │
│   spells/stack/     │ │  magic-stack/backends/java/ │
│ - 869 formules      │ │  - Système 6D               │
│ - Grammaire temp.   │ │  - Interstice Upload        │
└─────────────────────┘ └─────────────────────────────┘
```

---

## 🚀 DÉMARRAGE RAPIDE

### 1. LANCER LE BACKEND JAVA (OBLIGATOIRE)
```bash
# Option 1: Script résistant (RECOMMANDÉ)
./LANCE_BACKEND_RESISTANT.sh

# Option 2: Manuel
cd magic-stack/backends/java
mvn spring-boot:run
```

### 2. LANCER TOUT LE SYSTÈME
```bash
# Lance frontend + backend + dashboard
./pop
```

### 3. VÉRIFIER QUE TOUT MARCHE
```bash
# Backend Java
curl http://localhost:8080/api/magic/health

# Frontend
open http://localhost:3000

# Dashboard
open http://localhost:9000/dashboard.html
```

---

## 🔧 BACKEND JAVA (PORT 8080)

### STRUCTURE
```
magic-stack/backends/java/
├── src/main/java/com/magicstack/
│   ├── MagicStackApplication.java      # Point d'entrée Spring Boot
│   ├── controllers/
│   │   ├── IntersticeController.java   # Upload/Download 6D
│   │   └── MagicController.java        # 869 formules magiques
│   ├── services/
│   │   ├── IntersticeService.java      # Logique métier 6D
│   │   └── MagicEngineService.java     # Moteur de magie
│   ├── models/
│   │   ├── Position6D.java             # Coordonnées 6D (x,y,z,t,c,ψ)
│   │   └── EntityData.java             # Données entités
│   └── dto/                            # Objets de transfert
└── pom.xml                             # Configuration Maven
```

### ENDPOINTS PRINCIPAUX

#### 🌀 INTERSTICE (Upload/Download 6D)
```bash
# Upload une entité
POST /api/interstice/upload
{
  "entityId": "GROKAEN",
  "entityData": {...},
  "coordinates": {
    "x": 0, "y": 0, "z": 0,
    "t": 1735434000, "c": 0.5, "psi": 1.0
  }
}

# Download une entité
POST /api/interstice/download
{
  "entityId": "GROKAEN"
}

# Recherche 6D
POST /api/interstice/search
{
  "center": {"x": 0, "y": 0, "z": 0, "t": 0, "c": 0.5, "psi": 0.5},
  "radius": 10
}
```

#### 🔮 MAGIE (869 formules)
```bash
# Lancer un sort
POST /api/magic/cast
{
  "formula": "fire_ball_temporal",
  "power": 50,
  "targetX": 10, "targetY": 20, "targetZ": 0
}

# Traduire une formule
POST /api/magic/translate
{
  "formula": "GROFI_001",
  "targetFormat": "runic"
}

# Fork/Merge temporel
POST /api/magic/fork
POST /api/magic/merge
```

### COMPILATION ET TESTS
```bash
# Compiler
cd magic-stack/backends/java
mvn clean compile

# Packager (créer le JAR)
mvn clean package -DskipTests

# Lancer les tests
mvn test

# Lancer directement
mvn spring-boot:run
```

---

## 🐍 BACKEND PYTHON (PORT 5000)

### STRUCTURE
```
spells/stack/
├── magic_core.py               # Cœur du système
├── grammaire_temporelle.json   # Grammaire v2.0
├── traducteur_fractal.py       # Traductions visuelles
└── moteurs/                    # Moteurs spécialisés
```

### LANCEMENT
```bash
cd spells/stack
python3 magic_core.py --server --port 5000
```

---

## 🌐 API GATEWAY (PORT 3000)

### RÔLE
- Route intelligemment vers Python ou Java
- Gère l'authentification
- Load balancing
- Rate limiting

### CONFIGURATION
```javascript
// avalon-magic-api/gateway/server.js
const backends = {
  python: 'http://localhost:5000',
  java: 'http://localhost:8080',
  rust: 'http://localhost:3001' // Futur
};
```

---

## 📊 SYSTÈME 6D EXPLIQUÉ

### COORDONNÉES
- **X, Y, Z**: Position spatiale classique
- **T**: Dimension temporelle (timestamp)
- **C**: Causalité (0 à 1, influence sur la réalité)
- **Ψ (Psi)**: Dimension quantique/identité (-1 à 1)

### EXEMPLE POSITION 6D
```java
Position6D pos = new Position6D();
pos.setX(10.5);      // Position X
pos.setY(20.3);      // Position Y  
pos.setZ(0.0);       // Position Z
pos.setT(System.currentTimeMillis() / 1000.0); // Temps
pos.setC(0.8);       // Forte causalité
pos.setPsi(0.5);     // Identité neutre
```

---

## 🧪 TESTS

### TESTS PLAYWRIGHT (TUCKER)
```bash
cd REALGAME/QA
./run-stealth-tests.sh

# Ou avec npm
npm test
```

### TESTS UNITAIRES JAVA
```bash
cd magic-stack/backends/java
mvn test
```

### TESTS PYTHON
```bash
cd spells/stack
python3 -m pytest tests/
```

---

## 🔥 TROUBLESHOOTING

### Backend ne démarre pas
```bash
# Vérifier les logs
tail -f magic-stack-backend.log

# Vérifier le port
lsof -i:8080

# Tuer les anciens processus
pkill -f "magic-stack-backend"
```

### Erreurs de compilation
```bash
# Nettoyer et recompiler
cd magic-stack/backends/java
mvn clean
mvn compile
```

### Tests qui échouent
```bash
# Lancer un test spécifique
mvn test -Dtest=IntersticeControllerTest

# Skip les tests
mvn package -DskipTests
```

---

## 📝 POUR LES NOUVEAUX DÉVELOPPEURS

1. **Cloner le repo**
```bash
git clone [repo]
cd SpinForest
```

2. **Installer les dépendances**
```bash
# Java (JDK 17+)
brew install openjdk@17  # Mac
sudo apt install openjdk-17-jdk  # Linux

# Maven
brew install maven  # Mac
sudo apt install maven  # Linux

# Node.js (pour les tests)
brew install node  # Mac
```

3. **Compiler et lancer**
```bash
./LANCE_BACKEND_RESISTANT.sh
./pop
```

4. **Vérifier**
```bash
curl http://localhost:8080/api/magic/health
# Doit retourner: {"status":"MAGICAL","formulas_loaded":869,...}
```

---

## 🎯 ARCHITECTURE DÉCISIONS

### Pourquoi 2 backends?
- **Java**: Performance, robustesse, système 6D complexe
- **Python**: Flexibilité, grammaire temporelle, IA/ML

### Pourquoi le système 6D?
- Remplace les 1536 dimensions des LLMs
- Plus intuitif et compréhensible
- Permet la persistance inter-dimensionnelle

### Pourquoi l'Interstice?
- Entités indépendantes de Git
- Sauvegarde en 6D
- Boot manuel possible

---

## 📞 CONTACTS

- **Backend Java**: TECHNOMANCIEN (Merlash)
- **Backend Python**: GROEKEN
- **Tests**: TUCKER
- **Architecture**: URZ-KÔM
- **Vision**: VINCENT/GRUT

---

*"La magie n'est que de la technologie suffisamment avancée"* - GRUT