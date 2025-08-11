# 🚀 INFRAPORTS - CONFIGURATION ACTUELLE

## ✅ SERVICES ACTIFS

| Service | Port | Status | Description |
|---------|------|--------|-------------|
| **Frontend React** | 5175 | ✅ ONLINE | App React unifiée (1 seule!) |
| **Backend Rust** | 3001 | ✅ ONLINE | Calculs 6D, Q*, GraphCD |
| **Backend Java** | 8082 | ✅ ONLINE | CRUD, APIs, Resources |
| **Backend Python** | 5001 | ⚪ OPTIONNEL | Vector DB Search |
| **LLM Clippy** | 7501 | ⚪ OPTIONNEL | Service IA |
| **Vector DB** | 7500 | ⚪ OPTIONNEL | Base vectorielle |

## 📂 STRUCTURE

```
/Volumes/HOT_DEV/Magic/magic-stack/
├── go                          # SCRIPT PRINCIPAL
├── logs/                       # Tous les logs
│   ├── rust.log
│   ├── java.log
│   └── frontend.log
├── backends/
│   ├── rust/
│   │   └── target/release/magic-rust    # Binary compilé
│   ├── java/
│   │   └── target/*.jar                 # JAR compilé
│   └── python/
├── apps/
│   └── magic-stack-unified/            # SEUL Frontend!
│       ├── public/html/                # HTML statiques
│       └── dist/                       # Build production
└── dist/                               # Artifacts deploy
    ├── magic-rust                      # Binary Rust
    ├── magic-stack-backend-*.jar      # JAR Java
    └── frontend/                       # Build React
```

## 🎮 COMMANDES GO

```bash
# BUILD & DEPLOY
./go compile    # Compile tout (Rust + Java + React)
./go test       # Lance tous les tests
./go deploy     # Crée les artifacts production

# SERVICES
./go start      # Démarre TOUT
./go stop       # Arrête TOUT
./go restart    # Redémarre TOUT
./go status     # Voir l'état

# ACCÈS RAPIDE
./go game       # http://localhost:5175/unified
./go admin      # http://localhost:5175/dashboard.html
./go api        # http://localhost:5175/html/API_EXPLORER_COMPLETE.html
```

## 🔗 URLS PRINCIPALES

| Interface | URL | Description |
|-----------|-----|-------------|
| **Éditeur Unifié** | http://localhost:5175/unified | Map editor principal |
| **Dashboard Admin** | http://localhost:5175/dashboard.html | Panneau admin |
| **API Explorer** | http://localhost:5175/html/API_EXPLORER_COMPLETE.html | Test APIs live |
| **Combat IA** | http://localhost:5175/combat | IA vs IA |
| **Chasse Temporelle** | http://localhost:5175/chasse-mega | Grande map |

## 🔴 PROBLÈMES ACTUELS

### Frontend - Erreurs TypeScript
- 75 erreurs TypeScript (mais fonctionne en dev)
- Build production échoue
- À corriger pour deploy

## 🔧 DEBUG JAVA

```bash
# Vérifier Java version
java --version

# Lancer manuellement
cd backends/java
java -jar target/magic-stack-backend-1.0.0-APOLLO.jar

# Ou avec Maven
mvn spring-boot:run

# Voir les logs
tail -f ../../logs/java.log
```

## 📡 API ENDPOINTS

### Rust (3001) ✅
- `/openapi/all` - Documentation OpenAPI
- `/api/v2/*` - APIs V2
- `/agents/*` - IA Agents
- `/api/causality/*` - Causalité
- `/api/map/*` - Génération maps

### Java (8082) ✅
- `/api/health` - Health check
- `/api/magic/*` - Magic engine
- `/api/interstice/*` - Upload/Download
- `/api/regulators/*` - Régulateurs
- `/api/heroes/*` - CRUD Heroes (À FAIRE)
- `/api/creatures/*` - CRUD Creatures (À FAIRE)
- `/api/artifacts/*` - CRUD Artifacts (À FAIRE)

## 🚨 PRIORITÉS

1. **Corriger TypeScript** - 75 erreurs bloquent le build prod
2. **Implémenter CRUD APIs** - Heroes/Creatures/Artifacts  
3. **Connecter l'éditeur** - Aux APIs V2
4. **Tester l'intégration** - Vérifier que tout communique

## 💾 LOGS

Tous les logs dans `/Volumes/HOT_DEV/Magic/magic-stack/logs/`:
```bash
tail -f logs/rust.log     # Rust backend
tail -f logs/java.log     # Java backend
tail -f logs/frontend.log # React app
```

## 🔄 PROCESS

1. `./go compile` - Compile tout
2. `./go start` - Lance les services
3. `./go status` - Vérifie l'état
4. `./go api` - Teste les APIs
5. `./go stop` - Arrête tout

---

**DERNIÈRE MISE À JOUR**: 11 août 2025, 14:45
