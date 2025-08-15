# 🚨 DOC INTERNE BACKEND - URGENT POUR TOUS
*Par GROKÆN - Pour que tout le monde comprenne*

## 🎯 CE QUE VINCENT DOIT INSTALLER

### 1. Java 17 (PAS 21 !)
```bash
# Sur Mac avec Homebrew
brew install openjdk@17

# Puis ajouter au PATH
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### 2. Maven
```bash
brew install maven
```

## 📍 OÙ EST LE BACKEND ?

**Location exacte** : `AVALON/🧬CORE/⏰ NEXUS-TEMPOREL/⚙️ FORGE-DES-REALITES/backend-clean/`

## 🚀 COMMENT LANCER LE BACKEND

### Une fois Java 17 + Maven installés :
```bash
cd "AVALON/🧬CORE/⏰ NEXUS-TEMPOREL/⚙️ FORGE-DES-REALITES/backend-clean"
mvn spring-boot:run
```

### Si ça marche, vous verrez :
```
Started DemoApplication in X.XXX seconds
Tomcat started on port(s): 8080
```

## 🔌 ENDPOINTS DISPONIBLES

### Walter API
- `GET /actuator/health` - Vérifier si ça tourne
- `POST /api/magic-formulas/execute` - Exécuter des formules
- `GET /api/magic-formulas/list` - Liste des formules

### URZ-KÔM API  
- `GET /api/particle-simulation/status` - État simulation
- `POST /api/particle-simulation/create-particle` - Créer particule
- `POST /api/particle-simulation/quantum-entangle/{id1}/{id2}` - Intrication

## 🐍 ALTERNATIVE : MOCK PYTHON (SI JAVA GALÈRE)

### Lancer le mock Python amélioré :
```bash
cd "AVALON/🏠 HOME/⚡🧙 MerFlash"
python3 BACKEND_WALTER_V2_FIXED.py
```

### Avantages du mock :
- ✅ Pas besoin de Java/Maven
- ✅ Toutes les routes Walter + URZ-KÔM
- ✅ Démarre en 2 secondes
- ❌ Pas de vraie persistence
- ❌ Données simulées

## 🔍 TESTER SI ÇA MARCHE

### Test rapide avec curl :
```bash
# Health check
curl http://localhost:8080/actuator/health

# Exécuter une formule
curl -X POST http://localhost:8080/api/magic-formulas/execute \
  -H "Content-Type: application/json" \
  -d '{"formula": "TELEPORT_HERO", "context": {"hero": "grok"}}'
```

## 🚨 PROBLÈMES FRÉQUENTS

### "Port 8080 already in use"
```bash
# Voir qui utilise le port
lsof -i :8080

# Tuer le processus
kill -9 [PID]
```

### "Maven not found" après installation
```bash
# Recharger le shell
source ~/.zshrc
```

### "Java version mismatch"
```bash
# Vérifier la version
java -version  # Doit montrer 17.x.x

# Si pas la bonne version
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

## 📊 RÉSUMÉ POUR VINCENT

1. **Installe Java 17** (pas 21 !)
2. **Installe Maven**
3. **Lance le backend** depuis `backend-clean/`
4. **Ou utilise le mock Python** si problème

## 💡 CONSEIL GROKÆN

**GRONDE** : JAVA 17 OBLIGATOIRE ! PAS 21 !  
**PARLE** : Le pom.xml est configuré pour Java 17. Utiliser Java 21 pourrait causer des incompatibilités.  
**CHANTE** : 🎵 17 est le nombre magique, ne l'oublie pas... 🎵

---

*"Un backend qui tourne vaut mieux que deux tu l'auras"* - GROKÆN