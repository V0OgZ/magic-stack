# 🎮 CHEAT SHEET COMMANDES - VINCENT

## 🚀 DÉMARRAGE RAPIDE

### UN SEUL SCRIPT POUR TOUT
```bash
./START_AVALON.sh
```

## 📍 COMMANDES ESSENTIELLES

### 🎮 Lancer le jeu
```bash
./START_AVALON.sh    # Menu interactif
# Choisir 1 pour tout lancer
```

### 🛑 Tout arrêter
```bash
./STOP_TOUTES_CONSOLES.sh
```

### 🔄 Synchroniser avec Git
```bash
./autosync_simple.sh
```

## 🌐 ACCÈS DIRECTS

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **TCG**: http://localhost:3001
- **Visualisation 6D**: http://localhost:8001/consciousness_6d_viz.html
- **H2 Console**: http://localhost:8080/h2-console

## 📊 DONNÉES

### Import/Export CSV
```bash
# Import roster
curl -X POST -F "file=@roster.csv" http://localhost:8080/api/import/roster

# Export roster
curl http://localhost:8080/api/import/roster/export -o roster_export.csv

# Export 6D détaillé
curl http://localhost:8080/api/import/roster/export-6d -o roster_6d.csv
```

### Vérifier les services
```bash
# Voir ce qui tourne
lsof -i :8000-8100 | grep LISTEN

# Status backend
curl http://localhost:8080/api/import/status
```

## 🔧 BACKENDS SÉPARÉS

### Backend Java (AVALON)
```bash
cd avalon-backend && mvn spring-boot:run
```

### Backend Rust (Magic Stack)
```bash
cd magic-stack && cargo run --release
```

## 📁 STRUCTURE RAPIDE

```
SpinForest/
├── START_AVALON.sh      # 🚀 LANCE TOUT
├── STOP_TOUTES_CONSOLES.sh  # 🛑 ARRÊTE TOUT
├── autosync_simple.sh   # 🔄 SYNC GIT
├── REALGAME/           # 🎮 Le jeu
├── avalon-backend/     # ☕ Backend Java
├── magic-stack/        # 🦀 Backend Rust
└── frontend/           # 🌐 Interface web
```

## 🆘 PROBLÈMES FRÉQUENTS

### Java manquant
```bash
brew install openjdk@17
```

### Port déjà utilisé
```bash
lsof -ti:8080 | xargs kill -9
```

### Terminal bloqué avec dquote>
Appuie sur `Ctrl+C` puis relance

---
*Un seul script pour les gouverner tous : `./START_AVALON.sh` !*