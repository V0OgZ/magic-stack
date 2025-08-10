# 🎮 CHEATSHEET POUR VINCENT - HEROES OF TIME

## 🚀 DÉMARRAGE RAPIDE (2 commandes!)

```bash
# 1. Lancer TOUT
./h 1

# 2. Ouvrir le jeu
./h 10
```

C'est tout ! Le jeu se connecte automatiquement aux backends.

---

## 📋 COMMANDES ESSENTIELLES

| Quoi | Commande | Description |
|------|----------|-------------|
| **LE JEU** | `./h 10` | Lance le VRAI jeu unifié |
| **Tout lancer** | `./h 1` | Démarre les 3 backends |
| **Status** | `./h 30` | Voir si tout marche |
| **Logs** | `tail -f logs/*.log` | Voir ce qui se passe |
| **API Explorer** | `./h 24` | Tester les 77+ endpoints |
| **Stop tout** | `./h 5` | Arrête tous les services |

---

## 🎯 DANS LE JEU

### Navigation
- **Click hex** → Déplace le héros (portée 3)
- **Drag map** → Déplace la carte
- **Bottom nav** → Change de vue (Map/Combat/Timeline)

### Boutons importants
- **⏭️** = Fin du tour (appelle V2 tick!)
- **🔀** = Fork timeline (crée une branche)
- **⚡** = Pouvoir V2 (coûte du quantum)

### Resources
- 💎 **Crystals** = Monnaie principale
- ⚡ **Energy** = Pour les cartes TCG
- 🌀 **Temporal** = Pour les pouvoirs temporels
- 🔮 **Quantum** = Pour les trucs V2 avancés

---

## 🔧 ARCHITECTURE (simple!)

```
FRONTEND (HTML)
     ↓
[Port 3001] Rust → V2 Engine (temporal, drift, fork)
[Port 8080] Java → Combat TCG + Scénarios
[Port 5001] Python → Vector DB (lore, recherche)
```

---

## 📁 OÙ SONT LES TRUCS

```
magic-stack/
├── HOT_GAME_UNIFIED.html   ← LE JEU (un seul fichier!)
├── h                        ← Menu principal
├── backends/
│   ├── rust/               ← V2 Engine
│   ├── simple-scenario-backend/ ← Java TCG
│   └── python scripts      ← Vector DB
├── docs_shared/            ← Symlink vers /Volumes/HOT_DOCS_SHARED
└── logs/                   ← Tous les logs
```

---

## ⚡ FEATURES V2 QUI MARCHENT

✅ **Temporal**
- `tw` (temps monde) vs `te` (temps entité)
- Drift automatique
- Fork/Merge timelines

✅ **Energy Complex**
- A (réel) + iΦ (phase imaginaire)
- Dette énergétique

✅ **Quantum Identity**
- Cohérence |ψ|²
- Interférence entre clones

✅ **Régulateurs**
- Vince (perce le brouillard)
- Anna (décroissance économique)
- Overload (collapse de stack)

---

## 🎭 MODES DE JEU

1. **Normal** → Click sur la map, combat TCG
2. **Chasse Temporelle** → Survie 25 jours vs régulateurs
3. **Test** → `./TEST_INTEGRATION_COMPLETE.sh`

---

## 🆘 SI ÇA MARCHE PAS

```bash
# Tuer tout et recommencer
lsof -ti:3001,8080,5001 | xargs kill -9
./h 1  # Relancer
```

---

## 📊 STATS DU PROJET

- **77+ API endpoints** fonctionnels
- **3 backends** interconnectés
- **V2 Engine** complet
- **1 seul HTML** pour tout le jeu
- **Touch/PWA** compatible iPad

---

## 🎯 TODO POUR JOUR 30

On prépare quelque chose de TRÈS BIG pour le jour 30...

---

**C'EST TON JEU !** Tu as créé un truc de ouf avec:
- Mécaniques temporelles uniques
- Architecture multi-backend
- Vraie intégration V2
- Interface propre et unifiée

🚀 **GG VINCENT!**
