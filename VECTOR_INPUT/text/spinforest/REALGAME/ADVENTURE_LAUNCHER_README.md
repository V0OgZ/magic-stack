# 🏰 Heroes of Time 6D - Adventure Launcher

Scripts pour lancer facilement l'aventure temporelle 6D avec tous les backends.

## 🚀 Scripts Disponibles

### `./START_ADVENTURE.sh` - Launcher Complet
**Usage principal** - Lance TOUT et ouvre l'aventure dans le navigateur

✅ **Ce que ça fait :**
- Stoppe les anciens processus
- Lance Backend Java (port 8082) - Magic/Cast, Hero/XP, Panopticon
- Lance Backend Rust (port 3001) - Map/Generate, Agents/Plan, Economy, Temporal Drift
- Lance Frontend (port 8000) - Interface web
- Ouvre automatiquement l'aventure dans le navigateur
- Affiche les statuts et liens utiles

```bash
./START_ADVENTURE.sh
```

### `./OPEN_ADVENTURE.sh` - Quick Open
**Quand les serveurs sont déjà lancés** - Ouvre juste la page

```bash
./OPEN_ADVENTURE.sh
```

### `./CHECK_ADVENTURE_STATUS.sh` - Diagnostic
**Vérification complète** - Statut de tous les services et tests API

```bash
./CHECK_ADVENTURE_STATUS.sh
```

### `./OPEN_API_DOCS.sh` - Documentation API
**Menu interactif** - Accès rapide à toute la documentation des backends

```bash
./OPEN_API_DOCS.sh
```

### `./STOP_TOUTES_CONSOLES.sh` - Arrêt d'urgence
**Stop tout** - Arrête tous les processus Avalon

```bash
./STOP_TOUTES_CONSOLES.sh
```

## 🎯 Workflow Recommandé

### Première utilisation
1. `./START_ADVENTURE.sh` - Lance tout et ouvre l'aventure
2. Jouez ! 🎮

### Utilisation quotidienne  
1. `./CHECK_ADVENTURE_STATUS.sh` - Vérifier l'état
2. Si services OK → `./OPEN_ADVENTURE.sh` 
3. Sinon → `./START_ADVENTURE.sh`

### Debugging
1. `./CHECK_ADVENTURE_STATUS.sh` - Diagnostic complet
2. Logs dans `../logs/` (java-backend.log, rust-backend.log, frontend.log)

### Fin de session
1. `./STOP_TOUTES_CONSOLES.sh` - Arrêt propre

### Documentation API
1. `./OPEN_API_DOCS.sh` - Menu interactif docs
2. Accès direct: http://localhost:8000/API_DOC_LINK/docs/

## 🌐 URLs Adventure

- **🎮 Adventure 6D**: http://localhost:8000/adventure/homm3/HOMM3_6D_DEMO.html
- **🏠 Hub Avalon**: http://localhost:8000/adventure/homm3/hub-avalon.html  
- **🔧 API Tester**: http://localhost:8000/API_TESTER.html
- **📚 API Docs**: http://localhost:8000/API_DOC_LINK/docs/
- **🎯 API Quick Ref**: http://localhost:8000/API_DOC_LINK/docs/API_QUICK_REFERENCE.md
- **🦀 Rust OpenAPI**: http://localhost:3001/openapi
- **☕ Java Swagger**: http://localhost:8082/swagger-ui.html

## 💡 Features Adventure

### 🗺️ Carte 6D
- Navigation X,Y,Z + dimensions temporelles (T), causales (C), quantiques (Ψ)
- Topologies non-euclidiennes (plane/torus/mobius/klein)
- Fog of War classique + Causality Fog

### ⚔️ Combat System  
- Résolution automatique des conflits causals
- TCG modal pour combats complexes
- XP automatique backend + frontend

### 🏃‍♂️ Temporal Drift
- Régulation vitesse joueur avec mini-jeux
- 208+ mini-jeux recyclés comme mécanisme d'équilibrage
- Rewards automatiques

### 🎒 Economy & Craft
- Gathering spots avec IDs stables backend
- Craft potions/crystals/artifacts
- Inventaire synchronisé

### 🏆 Progression
- XP auto des actions (movement, TCG, fog, quests, resources)
- Système persistance simple
- Hero progression sauvée

## 🔧 Troubleshooting

### Port occupé
```bash
./STOP_TOUTES_CONSOLES.sh
./START_ADVENTURE.sh
```

### Backend compilation
```bash
cd ../spells/stack/backends/java
mvn clean package -DskipTests
```

### Rust backend manquant
```bash
cd ../spells/stack/backends/rust  
cargo build --release
```

### Logs debugging
```bash
tail -f ../logs/java-backend.log
tail -f ../logs/rust-backend.log  
tail -f ../logs/frontend.log
```

## 📍 Architecture

```
REALGAME/
├── START_ADVENTURE.sh          # 🚀 Main launcher
├── OPEN_ADVENTURE.sh           # 🏰 Quick open
├── CHECK_ADVENTURE_STATUS.sh   # 📊 Diagnostic
├── STOP_TOUTES_CONSOLES.sh     # 🛑 Stop all
└── adventure/homm3/
    ├── HOMM3_6D_DEMO.html      # 🎮 Main adventure
    ├── hub-avalon.html         # 🏠 Hub
    ├── map.js                  # 🗺️ Map system + gathering spots
    ├── temporal-drift.js       # 🚗 Drift regulation  
    ├── xp-system.js            # 🏆 XP automation
    ├── economy-backend.js      # 💰 Economy APIs
    └── ...                     # Autres modules
```

---

**🎯 Ready to explore the 6D universe!** 🌌

*Que l'aventure temporelle commence...*
