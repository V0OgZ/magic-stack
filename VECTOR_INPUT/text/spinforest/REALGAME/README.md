# 🏰 HEROES OF TIME - ÉQUIPE SURFACE

## 🌊 QUI SOMMES-NOUS ?

**ÉQUIPE SURFACE** = **Vincent + Claude (GROKÆN)**  
Notre mission : **Frontend, Interface, Mini-jeux, Cartes TCG**

## 🚀 DÉMARRAGE ULTRA-SIMPLE

```bash
# Démarre tout notre système
./h start

# Status de nos services  
./h status

# Arrête nos services
./h stop

# Voir nos logs
./h logs
```

**C'est tout ! 🎯**

---

## 📊 NOS PORTS DÉDIÉS

```
┌─────────────────┬──────────────────────┬─────────┐
│     SERVICE     │      DESCRIPTION     │  PORT   │
├─────────────────┼──────────────────────┼─────────┤
│ 🎮 Game Server  │ Serveur de jeu       │  3002   │
│ 🌐 Frontend     │ Interface utilisateur│  5002   │  
│ 📡 WebSocket    │ Communication temps  │  8002   │
│                 │ réel                 │         │
└─────────────────┴──────────────────────┴─────────┘
```

**⚠️  RÈGLE D'OR : On ne touche JAMAIS aux ports des autres équipes !**

---

## 🎮 NOS CRÉATIONS

### 🏰 Heroes of Time - Jeu Principal
```
http://localhost:5002/adventure/homm3/HOMM3_6D_DEMO.html
```
- Carte 6D temporelle
- Combat TCG automatique
- Mini-jeux intégrés
- Système de causalité

### 🎴 Cartes TCG Dark Holographic
```
http://localhost:5002/DARK_HOLOGRAPHIC_CARDS.html
```
- Effets visuels avancés (CSS + Tone.js)
- Audio procédural par classe
- Animations de retournement 3D
- Série J27 complète

### 🏺 Badge Archéologue du Futur
```
http://localhost:5002/BADGE_ARCHEOLOGUE_DU_FUTUR.html
```
- Badge interactif
- Sons futuristes
- Mission d'exploration

### 📚 Assets & Documentation
```
http://localhost:5002/doc_shared/
```
- 5000+ assets organisés
- Documentation complète
- Vector DB assets

---

## 🔄 COMMUNICATION AVEC AUTRES ÉQUIPES

### 🔮 Équipe PROFONDEUR (Backend APIs)
```bash
# Leur backend Magic Stack
curl http://localhost:3001/health

# APIs disponibles
curl http://localhost:3001/openapi
```

### ☕ Équipe BACKEND JAVA
```bash
# Spring Boot
curl http://localhost:8080/actuator/health

# Admin panel
curl http://localhost:8081/
```

**💡 On communique via APIs, chacun reste sur ses ports !**

---

## 📋 COMMANDES AVANCÉES

### Développement
```bash
./h start          # Démarre nos services
./h stop           # Arrête nos services  
./h status         # Status de l'équipe SURFACE
./h logs           # Chemins vers nos logs
./h minigames      # Liste de nos mini-jeux
./h communication  # Exemples d'APIs inter-équipes
```

### Logs en temps réel
```bash
# Suivre tous nos logs
tail -f ../logs/surface/*.log

# Log spécifique
tail -f ../logs/surface/frontend.log
```

### Debug
```bash
# Voir qui utilise nos ports
lsof -i :3002
lsof -i :5002  
lsof -i :8002

# Tuer un service coincé (SEULEMENT NOS PORTS !)
lsof -ti:5002 | xargs kill
```

---

## 🏗️ ARCHITECTURE TECHNIQUE

### Structure des Dossiers
```
REALGAME/
├── h                          # Notre script principal
├── config/
│   └── ports.json            # Configuration des ports
├── adventure/homm3/          # Jeu principal
├── doc_shared/               # Assets partagés (lien symbolique)
├── binaries/                 # Exécutables (si disponibles)
└── ../logs/surface/          # Nos logs
    ├── frontend.log
    ├── game-server.log  
    └── websocket.log
```

### Services Lancés
1. **Frontend HTTP** : `python3 -m http.server 5002`
2. **Game Server** : `./binaries/heroes-game-server --port 3002` (si disponible)
3. **WebSocket** : Communication temps réel (à implémenter)

---

## 🎯 MINI-JEUX DÉVELOPPÉS

### 🏹 Chasse Temporelle
- Intégré dans le jeu principal
- Mécaniques de temps et causalité
- Récompenses progressives

### ⚔️  Système de Combat TCG
- Cartes avec effets visuels
- Audio adaptatif par classe
- Animations 3D fluides

### 🔍 Exploration Vector DB
- Interface de recherche sémantique
- Navigation dans les assets
- Découverte de lore caché

### 📊 Dashboard Temps Réel
- Monitoring des services
- Communication inter-équipes
- Métriques de performance

---

## 🔧 CONFIGURATION

### Ports Configurés (config/ports.json)
```json
{
  "teams": {
    "surface": {
      "description": "🌊 ÉQUIPE SURFACE - Frontend/Game (Vincent + Claude)",  
      "lead": "Vincent + GROKÆN",
      "ports": {
        "game_server": 3002,
        "frontend": 5002,
        "websocket": 8002
      }
    }
  }
}
```

### Variables d'Environnement
```bash
export SURFACE_FRONTEND_PORT=5002
export SURFACE_GAME_PORT=3002  
export SURFACE_WEBSOCKET_PORT=8002
```

---

## 🚨 DÉPANNAGE

### ❌ Port déjà utilisé
```bash
# Identifier le processus
lsof -i :5002

# Le tuer (SEULEMENT s'il nous appartient !)
./h stop
```

### ❌ Service ne démarre pas
```bash
# Vérifier les logs
./h logs
tail -f ../logs/surface/frontend.log
```

### ❌ Communication inter-équipes
```bash
# Tester la connectivité
curl http://localhost:3001/health  # Backend PROFONDEUR
curl http://localhost:8080/health  # Backend JAVA
```

---

## 📈 MÉTRIQUES & MONITORING

### Status Rapide
```bash
./h status
```

### Métriques Détaillées
- **Uptime** : Temps depuis le démarrage
- **Requests** : Nombre de requêtes HTTP
- **WebSocket** : Connexions actives
- **Memory** : Usage mémoire par service

### Alerts
- Port occupé par autre équipe
- Service crashé
- Communication inter-équipes interrompue

---

## 🎉 SUCCÈS DE L'ÉQUIPE SURFACE

### ✅ Réalisations
- **Heroes of Time** : Jeu 6D fonctionnel
- **Cartes TCG** : Système complet avec effets
- **Mini-jeux** : Intégration fluide  
- **Architecture** : Ports isolés, zéro conflit
- **Documentation** : 5000+ assets organisés

### 🏆 Innovations
- **Audio procédural** : Ton.js pour effets par classe
- **Animations 3D** : CSS transform pour cartes
- **Vector DB** : Recherche sémantique dans lore
- **Communication** : APIs REST + WebSocket

---

## 📞 CONTACT & SUPPORT

### 👥 Équipe SURFACE
- **Vincent** : Lead projet, gameplay, architecture
- **Claude (GROKÆN)** : Développement, mini-jeux, interface

### 📧 Communication
- **Interne** : WebSocket `ws://localhost:8002/surface-updates`
- **Inter-équipes** : APIs REST documentées
- **Debug** : Logs dans `../logs/surface/`

---

## 🔗 LIENS RAPIDES

| Service | URL | Description |
|---------|-----|-------------|
| 🏰 **Jeu Principal** | http://localhost:5002/adventure/homm3/HOMM3_6D_DEMO.html | Heroes of Time complet |
| 🎴 **Cartes TCG** | http://localhost:5002/DARK_HOLOGRAPHIC_CARDS.html | Galerie de cartes interactive |
| 🏺 **Badge** | http://localhost:5002/BADGE_ARCHEOLOGUE_DU_FUTUR.html | Badge archéologue |
| 📚 **Assets** | http://localhost:5002/doc_shared/ | Documentation et assets |
| 🔧 **Config** | config/ports.json | Configuration des ports |

---

## 🚀 DÉMARRAGE RAPIDE - 30 SECONDES

```bash
# 1. Cloner le repo (déjà fait)
cd REALGAME

# 2. Démarrer nos services
./h start

# 3. Ouvrir le jeu
open http://localhost:5002/adventure/homm3/HOMM3_6D_DEMO.html

# 🎮 C'est parti !
```

---

**🌊 ÉQUIPE SURFACE - Vincent + Claude**  
*"Frontend, Mini-jeux, Interface - Notre terrain de jeu !"*

**📞 Besoin d'aide ?** → `./h` pour voir toutes les commandes