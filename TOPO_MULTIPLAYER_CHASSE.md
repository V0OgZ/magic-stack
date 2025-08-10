# 🎮 TOPO - Multiplayer & Chasse Temporelle

## 📅 État Actuel (10 Décembre 2024)

### 🗺️ CHASSE TEMPORELLE MEGA MAP

#### ✅ Fonctionnalités Implémentées
- **Map Gigantesque** : 120x120 hexagones (6x6 écrans)
- **4 Niveaux de Difficulté** :
  - Easy : Drift lent (0.1), dette max 100
  - Normal : Drift moyen (0.3), dette max 50  
  - Hard : Drift rapide (0.5), dette max 30
  - Nightmare : Drift extrême (1.0), dette max 10
- **Viewport Scrollable** : Drag & drop fluide
- **Brouillard de Guerre** : CF (Causalité) et OPC (One Path Choice)
- **Audio Atmosphérique** : Musique immersive
- **Système de Jours** : Événements temporels jour par jour
- **3 Régulateurs Placés** :
  - Vince (20, 20) - Zone Nord-Ouest
  - Anna (100, 20) - Zone Nord-Est
  - Overload (60, 60) - Centre

#### ⚠️ À Intégrer
```javascript
// À ajouter dans CHASSE_TEMPORELLE_MEGA_MAP.html
<script src="../shared/v2-adapter.js"></script>
<script>
  const adapter = new V2Adapter();
  
  // Remplacer le tick local par :
  async function gameTick() {
    const result = await adapter.tick(gameState);
    gameState.temporal.tw = result.new_tw;
    gameState.temporal.te = result.new_te;
    updateDisplay();
  }
</script>
```

#### 📊 Progression
```
Gameplay       ████████████ 100%
Visuals        ████████████ 100%
V2 Integration ░░░░░░░░░░░░   0% ← À FAIRE
Backend Sync   ░░░░░░░░░░░░   0% ← À FAIRE
```

---

### 👥 MULTIPLAYER DEMO HOMM3

#### ✅ Fonctionnalités Implémentées
- **2-4 Joueurs** : Chacun sa couleur et faction
- **Style Heroes 3** : 
  - 7 types de terrain (grass, forest, mountain, water, mystique, quantum, nexus)
  - Animations fluides
  - UI dorée classique
- **Tour par Tour** : Système de phases fonctionnel
- **Chat Intégré** : Communication entre joueurs
- **Sync Positions** : Mise à jour basique des positions

#### ⚠️ À Implémenter
```javascript
// WebSocket pour sync temps réel
const ws = new WebSocket('ws://localhost:8001');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'player_move') {
    updatePlayerPosition(data.playerId, data.position);
  } else if (data.type === 'turn_end') {
    nextPlayerTurn();
  }
};

// Lobby/Matchmaking
function createLobby() {
  return fetch('/api/lobby/create', {
    method: 'POST',
    body: JSON.stringify({ 
      name: 'Partie de Vincent',
      maxPlayers: 4,
      mode: 'temporal_chess'
    })
  });
}
```

#### 📊 Progression
```
UI/UX          ████████████ 100%
Game Logic     ████████░░░░  70%
Network        ██░░░░░░░░░░  20% ← PRIORITÉ
Persistence    ░░░░░░░░░░░░   0% ← À FAIRE
```

---

## 🚀 Plan d'Action

### Phase 1 : Intégration V2 (Cette Semaine)
1. **Ajouter v2-adapter.js** dans les deux HTML
2. **Connecter au backend Rust** (port 3001)
3. **Remplacer les ticks locaux** par adapter.tick()
4. **Ajouter affichage temporal** (tw/te/drift)

### Phase 2 : WebSocket Multiplayer (Semaine Prochaine)
1. **Créer serveur WebSocket** sur port 8001
2. **Implémenter protocole sync** :
   - player_join / player_leave
   - game_state_sync
   - turn_actions
   - chat_message
3. **Lobby système** avec création/join
4. **Reconnexion automatique**

### Phase 3 : Persistance (Semaine +2)
1. **Sauvegarde parties** en cours
2. **Replay system** pour revoir les parties
3. **Statistiques joueurs**
4. **Classement ELO**

---

## 🎮 Tests Rapides

### Tester Chasse Temporelle
```bash
# Ouvrir directement
open demos/game/CHASSE_TEMPORELLE_MEGA_MAP.html

# Ou via menu
./h 44
```

### Tester Multiplayer
```bash
# Ouvrir 2 fenêtres pour simuler 2 joueurs
open demos/multiplayer/MULTIPLAYER_DEMO_HOMM3.html
open demos/multiplayer/MULTIPLAYER_DEMO_HOMM3.html
```

### Avec Backends
```bash
# Lancer les services
./h 1

# Puis ouvrir les démos
open demos/index.html
```

---

## 💡 Idées pour Plus Tard

### Chasse Temporelle
- **Mode Coop** : 2 joueurs explorent ensemble
- **Boss Temporels** : Combats spéciaux certains jours
- **Zones Secrètes** : Cachées derrière des paradoxes
- **Achievements** : Débloquer des rewards

### Multiplayer
- **Mode Bataille Royale** : Dernier survivant temporel
- **Mode Capture** : Contrôler des nexus
- **Tournois** : Compétitions organisées
- **Spectateur Mode** : Observer les parties pro

---

## 📝 Notes Techniques

### Format État Multiplayer
```typescript
interface MultiplayerState {
  gameId: string;
  players: Map<string, Player>;
  currentTurn: string; // playerId
  turnNumber: number;
  temporal: {
    tw: number;    // Temps monde global
    entities: Map<string, EntityTemporal>; // Par joueur
  };
  chat: Message[];
  spectators: string[];
}
```

### Événements WebSocket
```typescript
type WSMessage = 
  | { type: 'player_join'; playerId: string; playerData: Player }
  | { type: 'player_leave'; playerId: string }
  | { type: 'game_state'; state: MultiplayerState }
  | { type: 'player_action'; playerId: string; action: Action }
  | { type: 'turn_end'; nextPlayer: string }
  | { type: 'chat'; playerId: string; message: string }
  | { type: 'paradox'; severity: string; affected: string[] }
```

---

**Claude Nexus** - Intégrateur des Tréfonds d'Avalon 🌌
