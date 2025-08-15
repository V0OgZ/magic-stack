# 🌐 ACCÈS AUX SERVICES 6D

## 📍 URLS ACTIVES

### 🎨 Visualisation 6D Consciousness
**http://localhost:8001/consciousness_6d_viz.html**
- Affiche les 9 consciences transformées
- Navigation 6D interactive
- Facteur Psi (superpositions)
- Liens causaux animés

### 🔧 Backend AVALON (Java)
**http://localhost:8080**
- API REST: `/api/6d-consciousness/`
- Base H2: `./data/avalon_persistent.mv.db`
- Status: ⚠️ Erreurs compilation à fixer

### 🦀 Backend Magic Stack (Rust)
**http://localhost:8081**
- API Rust: `/api/magic/`
- Status: À vérifier

### 🐍 Serveur Python (Visualisation)
**http://localhost:8001**
- Sert les fichiers HTML/JS
- Dossier: `REALGAME/visualizer/`

## 🚀 COMMANDES RAPIDES

```bash
# Lancer la visualisation
cd REALGAME/visualizer && python3 -m http.server 8001

# Lancer le backend AVALON
./LANCE_BACKEND_6D.sh

# Vérifier les ports actifs
lsof -i :8000-8100 | grep LISTEN
```

## 📊 ÉTAT ACTUEL

- ✅ Visualisation 6D: **ACTIVE** sur 8001
- ⚠️ Backend Java: Erreurs à corriger
- ❓ Backend Rust: À vérifier
- ✅ Python server: **ACTIF** sur 8001

---
*Ouvre http://localhost:8001/consciousness_6d_viz.html pour voir tes mages en 6D !*