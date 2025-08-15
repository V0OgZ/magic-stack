# 🎮 COMMENT LANCER HEROES OF TIME - VERSION API

## 🚀 LANCEMENT RAPIDE

### Option 1 : Avec Python
```bash
# Terminal 1 - API
cd REALGAME/api
python3 api_server.py

# Terminal 2 - Frontend  
cd REALGAME
python3 -m http.server 8889

# Navigateur
http://localhost:8889/heroes-of-time-api-based.html
```

### Option 2 : Avec Node.js (si installé)
```bash
# Terminal 1 - API
cd REALGAME/api
node server.js

# Terminal 2 - Frontend
cd REALGAME  
python3 -m http.server 8889

# Navigateur
http://localhost:8889/heroes-of-time-api-based.html
```

### Option 3 : Version standalone (sans API)
```bash
cd REALGAME
python3 -m http.server 8889

# Navigateur
http://localhost:8889/heroes-of-time-complete.html
```

## 📊 CE QUE FAIT LA VERSION API

### ✅ Charge tout depuis les JSON :
- **Héros** : Depuis `spells/stack/Treasures/💠 Essences scellées/🧙 Heroes/`
  - Arthur Pendragon, Merlin, Jeanne d'Arc...
  - Anthor le Fordien (Westworld crossover!)
  - Stats complètes (attack, defense, spellPower, etc.)

### ✅ Pas de données en dur :
- Le frontend ne contient AUCUNE donnée de jeu
- Tout est chargé dynamiquement depuis l'API
- Changez les JSON = le jeu change automatiquement !

### ✅ Endpoints disponibles :
```
GET  /api/heroes       → Liste tous les héros
GET  /api/heroes/:id   → Détails d'un héros
GET  /api/cards        → Cartes TCG
GET  /api/artifacts    → Artefacts
GET  /api/creatures    → Créatures
POST /api/game/state   → Sauvegarder
GET  /api/game/state   → Charger
```

## 🎯 DIFFÉRENCES AVEC LA VERSION STANDALONE

| Feature | Standalone | API |
|---------|-----------|-----|
| Données | En dur dans HTML | Chargées depuis JSON |
| Héros | 1 seul (générique) | Tous les héros des JSON |
| Sauvegarde | LocalStorage | Côté serveur |
| Modifiable | Éditer le HTML | Éditer les JSON |

## 🔧 TROUBLESHOOTING

### ❌ "API: Offline"
→ L'API n'est pas lancée. Relancer `./launch-api.sh`

### ❌ "command not found: node"
→ Installer Node.js depuis https://nodejs.org/

### ❌ Page blanche
→ Ouvrir la console du navigateur (F12) pour voir les erreurs

## 📝 AJOUTER DES HÉROS

1. Éditer les fichiers JSON dans :
   ```
   spells/stack/Treasures/💠 Essences scellées/🧙 Heroes/
   ```

2. Relancer l'API

3. Les nouveaux héros apparaissent automatiquement !

---

**C'EST LA VERSION PROPRE COMME TU VOULAIS VINCENT !** 🔥