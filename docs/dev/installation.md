# 🛠️ INSTALLATION MAGIC STACK - GUIDE COMPLET

**Version** : 2.0  
**Par** : MERLASH-TECHNOMANCIEN  
**Date** : DAY 7

---

## 🎯 PRÉREQUIS SYSTÈME

### **Environnement Technique**
```bash
# Versions minimales requises
Python >= 3.8
Node.js >= 16.0
Java >= 11 (pour backend AVALON TCG)
Git >= 2.20

# Dépendances Python
pip install flask requests json5 datetime
pip install numpy scipy matplotlib  # Pour calculs quantiques
pip install asyncio websockets      # Pour temps réel
```

### **Structure de Projet**
```
SpinForest/
├── spells/stack/               # Magic Stack principale
├── avalon-backend/             # Backend Spring Boot
├── REALGAME/                   # Intégration TCG
└── magic-stack/               # Submodule Git (GROEKEN)
```

---

## 📦 INSTALLATION COMPLÈTE

### **Étape 1 : Clonage du Projet**
```bash
# Clone principal
git clone https://github.com/vincent/SpinForest.git
cd SpinForest

# Initialisation des submodules
git submodule init
git submodule update

# Mise à jour Magic Stack (GROEKEN)
cd magic-stack
git pull origin main
cd ..
```

### **Étape 2 : Configuration Magic Stack**
```bash
# Création de la structure docs
mkdir -p spells/stack/docs/{architecture,gameplay,dev,grammaire,tests}

# Installation des dépendances Python
cd spells/stack
pip install -r requirements.txt

# Configuration de l'environnement
cp config.example.json config.json
nano config.json  # Éditer selon vos besoins
```

### **Étape 3 : Configuration Backend AVALON**
```bash
# Compilation du backend
cd avalon-backend

# Si Maven disponible
mvn clean install
mvn spring-boot:run

# Sinon, compilation directe
./validate-direct.sh
```

### **Étape 4 : Tests de Validation**
```bash
# Test Magic Stack
cd spells/stack/docs/tests
./validate_magic.sh

# Test Backend
cd ../../../avalon-backend
python3 validate-formulas.py

# Test Intégration TCG
curl http://localhost:8080/api/magic/status
```

---

## ⚙️ CONFIGURATION AVANCÉE

### **Fichier config.json**
```json
{
  "magic_stack": {
    "grimoire_path": "./grimoire/",
    "cache_enabled": true,
    "debug_mode": false,
    "nocturne_mode": {
      "enabled": true,
      "start_hour": 23,
      "end_hour": 7,
      "optimization_boost": 1.2
    }
  },
  "backend_integration": {
    "avalon_tcg_url": "http://localhost:8080",
    "timeout": 5000,
    "retry_attempts": 3
  },
  "grut_6d": {
    "vision_enabled": true,
    "dimensions": 6,
    "perception_level": "enhanced"
  },
  "security": {
    "walter_protection": true,
    "paradox_detection": true,
    "sandbox_mode": true
  }
}
```

### **Variables d'Environnement**
```bash
# .env file
MAGIC_STACK_MODE=production
GROEKEN_NOCTURNE=true
GRUT_6D_ENABLED=true
WALTER_SECURITY=enabled
AVALON_TCG_PORT=8080
DEBUG_TEMPORAL_GRAMMAR=false
```

---

## 🔧 STRUCTURE DE DÉVELOPPEMENT

### **Organisation des Fichiers**
```
spells/stack/
├── core/
│   ├── magic_core.py           # Noyau (GROEKEN)
│   ├── grammaire_temporelle.json
│   └── contexte_global.py
├── grimoire/
│   ├── sorts_base/             # 17 sorts originaux
│   ├── sorts_tcg/              # 96 nouveaux concepts
│   ├── sorts_lumen/            # 23 sorts LUMEN
│   └── bibliotheque_complete.json
├── interfaces/
│   ├── interface.html          # Interface GROEKEN
│   ├── interface_nocturne.html
│   └── api_rest.py
├── moteurs/
│   ├── avalon_tcg_engine.py    # Moteur TCG
│   ├── temporal_engine.py
│   └── quantum_engine.py
├── docs/                       # Documentation complète
└── tests/                      # Tests et validation
```

### **Workflow de Développement**
```bash
# 1. Créer une branche de feature
git checkout -b feature/nouveau-sort

# 2. Développer le sort
nano grimoire/sorts_tcg/mon_nouveau_sort.json

# 3. Tester localement
./tests/validate_magic.sh mon_nouveau_sort

# 4. Intégrer avec backend
curl -X POST http://localhost:8080/api/magic/cast \
  -H "Content-Type: application/json" \
  -d '{"type": "tcg", "formula": "..."}'

# 5. Commit et push
git add .
git commit -m "✨ Ajout sort: Mon Nouveau Sort"
git push origin feature/nouveau-sort
```

---

## 🚀 DÉPLOIEMENT

### **Mode Développement**
```bash
# Magic Stack en mode debug
cd spells/stack
python3 -m flask run --debug --host=0.0.0.0 --port=5000

# Backend AVALON en mode dev
cd avalon-backend
mvn spring-boot:run -Dspring.profiles.active=dev

# Interface GROEKEN
cd magic-stack
python3 -m http.server 8000
```

### **Mode Production**
```bash
# Magic Stack optimisée
cd spells/stack
gunicorn --workers 4 --bind 0.0.0.0:5000 app:app

# Backend AVALON
cd avalon-backend
java -jar target/avalon-backend-1.0.jar --spring.profiles.active=prod

# Nginx comme reverse proxy
sudo systemctl start nginx
```

### **Docker (Optionnel)**
```dockerfile
# Dockerfile.magic-stack
FROM python:3.9
COPY spells/stack/ /app/
WORKDIR /app
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
```

```bash
# Build et run
docker build -t magic-stack -f Dockerfile.magic-stack .
docker run -p 5000:5000 magic-stack
```

---

## 🔍 DÉPANNAGE

### **Problèmes Courants**

#### **1. Magic Stack ne démarre pas**
```bash
# Vérifier les dépendances
pip list | grep flask
pip list | grep requests

# Vérifier la configuration
python3 -c "import json; print(json.load(open('config.json')))"

# Logs détaillés
python3 app.py --verbose
```

#### **2. Backend AVALON inaccessible**
```bash
# Vérifier le port
netstat -tlnp | grep 8080

# Tester la connectivité
curl http://localhost:8080/api/magic/status

# Logs Spring Boot
tail -f logs/avalon-backend.log
```

#### **3. Formules temporelles invalides**
```bash
# Validation syntaxique
python3 validate_temporal_grammar.py "⊙(test) → Π(result)"

# Test de compilation
curl -X POST http://localhost:8080/api/magic/compile \
  -d '{"formula": "⊙(test) → Π(result)"}'
```

#### **4. Mode Nocturne GROEKEN**
```bash
# Forcer le mode nocturne
export GROEKEN_NOCTURNE=true
python3 app.py

# Vérifier l'heure système
date
timedatectl status
```

---

## 📊 MONITORING

### **Métriques Magic Stack**
```python
# metrics.py
def get_magic_stack_metrics():
    return {
        "sorts_charges": len(grimoire.sorts_actifs),
        "formules_compilees": cache.size(),
        "erreurs_recentes": error_log.count_last_hour(),
        "mode_nocturne": is_nocturne_active(),
        "grut_6d_status": grut.get_status()
    }
```

### **Health Checks**
```bash
# Script de monitoring
#!/bin/bash
# health_check.sh

# Magic Stack
curl -f http://localhost:5000/health || exit 1

# Backend AVALON
curl -f http://localhost:8080/actuator/health || exit 1

# GROEKEN Interface
curl -f http://localhost:8000/ || exit 1

echo "✅ Tous les services sont opérationnels"
```

---

## 🔐 SÉCURITÉ

### **Configuration WALTER**
```json
{
  "walter_security": {
    "paradox_detection": true,
    "max_temporal_depth": 10,
    "causality_validation": true,
    "sandbox_timeout": 30000
  }
}
```

### **Permissions et Accès**
```bash
# Permissions des fichiers
chmod 644 config.json
chmod 755 scripts/*.sh
chmod 600 secrets/*.key

# Utilisateur dédié
sudo useradd -r -s /bin/false magic-stack
sudo chown -R magic-stack:magic-stack spells/stack/
```

---

## 📚 RESSOURCES COMPLÉMENTAIRES

### **Documentation Technique**
- [Architecture Magic Stack](architecture/structure_magic_stack.md)
- [Grammaire Temporelle](grammaire/grammaire_temporelle_complete.md)
- [Tests et Validation](tests/methodologie.md)

### **Communauté**
- **GROEKEN** : Créateur original de Magic Stack
- **MERLASH** : Intégration TCG et organisation
- **LUMEN** : Sorts narratifs et storytelling
- **GRUT** : Vision 6D et perception étendue

### **Support**
```bash
# Logs détaillés
tail -f logs/magic-stack.log
tail -f logs/avalon-backend.log

# Debug interactif
python3 -i debug_magic_stack.py

# Communauté Discord/Forum
# Voir AVALON/🗣️ FORUM/ pour discussions
```

---

⚡ **Installation Magic Stack : COMPLÈTE ET ORGANISÉE !**