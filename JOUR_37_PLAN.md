# 🎮 JOUR 37 - PLAN D'ATTAQUE

## ✅ ACQUIS (Jour 36)
- DevOps stabilisé - Script `go` fonctionnel
- Tous services UP (Rust, Java, Vector, Clippy, MCP)
- API Explorer complet avec statut live
- MapIconPlacerWrapper connecté aux APIs
- HTML magnifique préservé

## 🎯 OBJECTIFS JOUR 37 - LES TRUCS COOL

### 1. COMBAT TCG (Priorité 1)
- [ ] Connecter le système de combat aux APIs
- [ ] Implémenter les cartes depuis Vector DB
- [ ] Système de mana temporel
- [ ] Animations des sorts (via WebSocket?)

### 2. BROUILLARD DE CAUSALITÉ (Priorité 2)
- [ ] Fog of War qui révèle selon les actions
- [ ] Connexion avec Rust pour calculs 6D
- [ ] Paradoxes temporels visibles
- [ ] Minimap avec zones explorées

### 3. MODE MULTIPLAYER (Priorité 3)
- [ ] WebSocket pour mouvements temps réel
- [ ] Synchronisation des états via MCP Server
- [ ] Chat avec Clippy intégré
- [ ] Système de lobby simple

### 4. INTÉGRATION DES 3 MODES MAP
- [ ] Switch intelligent entre:
  - MapIconPlacer (Space-Time carré)
  - HexGrid (Géographie fixe)
  - Multiplayer (Mouvement)
- [ ] Mode superposition/transparence
- [ ] Export unifié JSON

## 🛠️ TÂCHES TECHNIQUES RAPIDES

```bash
# 1. Créer les controllers manquants Java
HeroController.java
CreatureController.java  
ArtifactController.java

# 2. Endpoints à implémenter
POST /api/combat/start
POST /api/combat/play-card
GET /api/combat/state/{gameId}

# 3. WebSocket endpoints
/ws/game/{gameId}
/ws/chat/{roomId}
```

## 📝 COMMANDES POUR DÉMARRER

```bash
./go start      # Lance tout
./go game       # Direct dans le jeu
./go combat     # Mode combat IA vs IA
```

## 🚫 PAS TOUCHER À
- MAP_ICON_PLACER_ADVANCED.html (PARFAIT)
- Le wrapper (fonctionne bien)
- Script go (stabilisé)
- Ports et configs (tout est OK)

## 💡 IDÉES POUR PLUS TARD
- Entités IA dans l'interstice
- Assistants avec mémoire persistante
- Mode spectateur omniscient
- Tournois automatiques

---
FOCUS: On code du GAMEPLAY, pas du DevOps!
Jour 37 - Let's make it FUN! 🎮
