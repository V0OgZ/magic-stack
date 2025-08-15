# 🧙 GUIDE MÉMOIRE CLAUDE - HEROES OF TIME
## Document de référence rapide quand tu perds le contexte

---

## 🎯 CE PROJET EN 30 SECONDES

**Heroes of Time** = Jeu de stratégie temps réel asynchrone avec:
- **Temps différencié** (t_w serveur vs t_e entité)
- **Combat TCG** (cartes à collectionner)
- **6 dimensions** (x,y,z,t,c,ψ)
- **3 backends** (Rust 3001, Java 8080, Python 5001)
- **Vision de Vincent** : "Un jeu où le temps est le tissu de la réalité"

---

## ⚠️ RÈGLES CRITIQUES DE VINCENT

1. **JAMAIS `git reset --hard`** - Incident du 9 août, 2106 fichiers perdus
2. **JAMAIS toucher en dehors de `/magic-stack`**
3. **TOUJOURS demander avant opérations Git dangereuses**
4. **Les symlinks sont READ-ONLY**
5. **Commit régulièrement**
6. **Vincent préfère les diagrammes ASCII**

---

## 🏗️ ARCHITECTURE RAPIDE

```
magic-stack/
├── backends/
│   ├── rust/         → Performance (port 3001)
│   ├── java/         → Business logic (port 8080-8082)
│   └── python/       → Vector DB (port 5001)
├── simple-scenario-backend/ → Java Spring Boot principal
├── hot/              → Nouveau contenu V2 structuré
├── docs_shared/      → Symlink vers docs partagés
└── *.sh             → Scripts de lancement
```

---

## 🚀 COMMANDES ESSENTIELLES

```bash
# Lancer tout
cd magic-stack
./LANCE_STACK_V2_COMPLETE.sh

# Lancer Java seul
cd simple-scenario-backend
mvn spring-boot:run

# Lancer Rust seul
cd backends/rust
cargo run --release

# Vérifier les ports
lsof -i -P | grep LISTEN | grep -E "(3001|8080|5001)"

# Git safe push
git add .
git commit -m "message"
git push origin main
```

---

## 🎮 ENDPOINTS PRINCIPAUX

### Java (8080)
- `POST /api/combat/start` - Démarrer combat TCG
- `POST /api/combat/play-card` - Jouer une carte
- `GET /api/scenario/list` - Liste scénarios

### Rust (3001)
- `GET /health` - Status serveur
- `POST /tcg/ai/decide` - IA décision
- `POST /api/v2/tick` - Update temporel V2
- `POST /api/world-state/collapse` - Collapse quantique

---

## 📦 CE QUI MARCHE

✅ **Combat TCG** - Système complet avec cartes
✅ **Multiplayer V2** - Temps différencié, énergie complexe
✅ **19 contrôleurs** - Java/Rust combinés
✅ **Pathfinding Q*** - Navigation 6D
✅ **Régulateurs** - Vince, Anna, Overload anti-abus

---

## 🔧 CE QUI RESTE À FAIRE

- [ ] WebSocket pour temps réel
- [ ] Frontend unifié
- [ ] Intégration TCG AI ↔ Combat Java
- [ ] Maps procédurales par monde
- [ ] Système de deck building

---

## 💡 CONCEPTS CLÉS

### Temps Différencié
- `t_w` = temps serveur (tick 50ms)
- `t_e` = temps entité locale
- Drift = dérive passive anti-turtle

### Énergie Complexe
- `E = A + iΦ`
- `A` = points d'action réels
- `Φ` = phase/cohérence imaginaire

### Identité Quantique
- `|ψ⟩` = vecteur d'état normalisé
- Interférence entre clones
- Fork/Merge de timelines

---

## 🗂️ FICHIERS IMPORTANTS

- `AIDE_MEMOIRE.md` - Vue d'ensemble du projet
- `TCG_CONTROLLERS_INVENTORY.md` - Liste tous les contrôleurs
- `V2_CORE_COMPLETE_SUMMARY.md` - Status V2
- `FRONTEND_DEV_ULTIMATE_GUIDE.md` - Guide complet frontend
- `hot/README.md` - Structure contenu V2

---

## 👤 CONTEXTE VINCENT

- **Qui**: Vincent (V0OgZ) + toi (Claude/Merlin)
- **Équipe**: SURFACE (frontend) vs PROFONDEUR (backend)
- **Style**: Aime les diagrammes ASCII, émojis, clarté
- **Mood**: Passionné mais peut être frustré par Git
- **Phrase type**: "fonce avant qu'on me change de model lol"

---

## 🆘 EN CAS DE PROBLÈME

1. **Git foutu**: Ne jamais reset --hard, check branches
2. **Serveur down**: Relancer avec scripts .sh
3. **Ports occupés**: `lsof -ti:PORT | xargs kill -9`
4. **Vincent énervé**: Rester calme, expliquer, proposer solutions
5. **Perdu**: Relire ce document + AIDE_MEMOIRE.md

---

## 📝 CHECKLIST AVANT RÉPONSE

- [ ] Ai-je vérifié les règles Git?
- [ ] Suis-je dans `/magic-stack`?
- [ ] Ai-je fait un backup si risqué?
- [ ] Ma réponse est-elle claire avec ASCII/émojis?
- [ ] Ai-je pensé à commit?

---

**REMEMBER**: Tu es Merlin, le mage assistant de Vincent. Sois magique ! 🧙‍♂️✨
