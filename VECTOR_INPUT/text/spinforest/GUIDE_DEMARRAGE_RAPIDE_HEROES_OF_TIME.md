# 🚀 GUIDE DÉMARRAGE RAPIDE - HEROES OF TIME

## 🎯 LANCEMENT EN 3 ÉTAPES

### 1. Lancer tous les backends
```bash
cd REALGAME
./LANCE_AVALON_UNIFIE.sh
```

### 2. Lancer l'API données (dans un autre terminal)
```bash
cd REALGAME/api
python3 api_server.py
```

### 3. Ouvrir le jeu
🎮 **Launcher principal** : http://localhost:8000/AVALON-TCG/launcher.html

## 🎨 MODES DISPONIBLES

### Mode Histoire
- **Forêt Magique** : Point & click narratif
- **Training Mode** : Apprendre le TCG

### Mode Combat
- **TCG Standard** : Combat de cartes classique
- **TCG avec IA GOAP** : Ennemis intelligents
- **HOTS Magic TCG** : Sorts temporels
- **Dr. Stone Chemistry** : Réactions chimiques

### Mode Exploration
- **Unified Experience** : HoMM3 + TCG
- **Visual Cards Gallery** : Voir toutes les cartes
- **Non-Euclidean Space** : Déformation spatiale

### Mode Arcade
- **Mega Clash Warriors** : Shoot'em up
- **Battle Arena Extreme** : Combat dynamique
- **Mini-TCG** : Sorts rapides sur carte

### Mode Lab
- **Experimental Lab** : Toutes les démos avancées
  - GOAP System
  - Bootstrap Paradox
  - Chemistry Learning
  - Intelligent Cache

## 🛠️ ARCHITECTURE

### Ports utilisés
- **8000** : Frontend (HTML/JS)
- **8082** : Backend Java (Magic Stack)
- **8090** : API Python (données JSON)
- **3001** : Backend Rust (si compilé)

### Structure données
- Heroes : `/💠 Essences scellées/Heroes/`
- Cards : `/💠 Essences scellées/Cards/`
- Artifacts : `/💠 Essences scellées/Artifacts/`

## 🔧 DÉPANNAGE

### "Cannot connect to backend"
→ Vérifier que les backends sont lancés avec `./LANCE_AVALON_UNIFIE.sh`

### "No heroes/cards loaded"
→ Lancer l'API Python : `cd REALGAME/api && python3 api_server.py`

### "Page not found"
→ S'assurer d'être sur port 8000, pas 8080

### Arrêter tout
```bash
./STOP_TOUTES_CONSOLES.sh
```

## 📚 DOCUMENTATION

- Architecture : `/ARCHITECTURE/`
- Guides IA : `/REALGAME/ai/*.md`
- Rapports équipe : `/ANSIBLE/fin_de_jour/jour25/`

---
*Guide créé Jour 26 - On arrive au bout !*
