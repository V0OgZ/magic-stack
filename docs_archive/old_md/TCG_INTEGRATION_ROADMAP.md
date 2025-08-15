# 🔗 ROADMAP INTÉGRATION TCG COMPLÈTE
## Plan d'action pour connecter tous les systèmes

---

## 📊 ÉTAT ACTUEL (10 août 2025)

### ✅ Ce qui marche
- **Combat Java**: Start, play-card, victoire/défaite
- **IA Rust**: Decide, coach (stubs fonctionnels)
- **Narration**: Messages dynamiques pour chaque action
- **HP & Dégâts**: Calculs fonctionnels

### 🟡 Ce qui est basique
- **IA TCG**: Logique stub (joue première carte)
- **Coach**: Répond mais sans vraie stratégie
- **Cartes**: Seulement 3 types (fireball, shield, heal)

### ❌ Ce qui manque
- **WebSocket**: Pas de temps réel
- **Deck Building**: Pas de personnalisation
- **Effets complexes**: Pas de buffs/debuffs persistants
- **Matchmaking**: Pas de PvP

---

## 🚀 PHASE 1: CONNEXION BASIQUE (1-2 jours)

### Objectif: Faire communiquer Java ↔ Rust

```ascii
   Java (8080)                    Rust (3001)
       │                              │
   Combat State ──────REST────→ IA Decision
       │                              │
   Apply Action ←─────JSON──── Return Actions
```

### Tasks:
- [ ] Java appelle Rust `/tcg/ai/decide` pendant tour ennemi
- [ ] Rust parse l'état de combat Java
- [ ] Java applique les actions retournées
- [ ] Test bout en bout

### Code Java à ajouter:
```java
// Dans CombatService.java
public TcgAction getAIDecision(CombatState state) {
    RestTemplate rest = new RestTemplate();
    String rustUrl = "http://localhost:3001/tcg/ai/decide";
    TcgDecideRequest req = convertToTcgFormat(state);
    TcgDecideResponse resp = rest.postForObject(rustUrl, req, TcgDecideResponse.class);
    return resp.getActions().get(0);
}
```

---

## 🎮 PHASE 2: IA INTELLIGENTE (3-5 jours)

### Objectif: IA qui joue vraiment bien

```ascii
        État Combat
             │
        ┌────┴────┐
        │ Analyse │
        └────┬────┘
             │
     ┌───────┴──────┐
     ▼              ▼
  Aggro?        Control?
     │              │
  Attack        Defend
     │              │
     └──────┬───────┘
            ▼
        Décision
```

### Tasks:
- [ ] Implémenter profils IA (Aggro, Control, Balanced)
- [ ] Calcul de value des cartes
- [ ] Prédiction des coups adverses
- [ ] Système de priorités

### Code Rust à améliorer:
```rust
// Dans multiplayer_v2.rs
pub fn tcg_ai_decide_smart(state: TcgState) -> Vec<TcgAction> {
    let profile = determine_profile(&state);
    let hand_value = evaluate_hand(&state.hand);
    let board_threat = assess_threats(&state.board);
    
    match profile {
        AiProfile::Aggro => play_maximum_damage(&state),
        AiProfile::Control => play_defensive(&state),
        AiProfile::Balanced => play_optimal(&state),
    }
}
```

---

## 🌐 PHASE 3: WEBSOCKET TEMPS RÉEL (2-3 jours)

### Objectif: Combat en temps réel

```ascii
   Client 1                Server              Client 2
      │                       │                    │
      │───Connect WS────→     │     ←──Connect────│
      │                       │                    │
      │───Play Card────→      │                    │
      │                   Broadcast                │
      │←──Update───────   Event    ──────Update───→│
```

### Tasks:
- [ ] Ajouter WebSocket à Java (Spring WebSocket)
- [ ] Créer rooms de combat
- [ ] Synchroniser états entre clients
- [ ] Gérer déconnexions

### Configuration Spring:
```java
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new CombatWebSocketHandler(), "/combat-ws")
                .setAllowedOrigins("*");
    }
}
```

---

## 🎴 PHASE 4: SYSTÈME DE CARTES ÉTENDU (5-7 jours)

### Objectif: 100+ cartes avec effets variés

```yaml
Nouveaux Types:
  - Créatures: Invocation sur le board
  - Enchantements: Effets persistants
  - Artefacts: Équipements
  - Instants: Réaction aux actions
  
Nouveaux Effets:
  - Taunt: Force l'attaque
  - Lifesteal: Vol de vie
  - Charge: Attaque immédiate
  - Deathrattle: Effet à la mort
  - Battlecry: Effet à l'invocation
```

### Tasks:
- [ ] Créer JSON pour 100+ cartes
- [ ] Parser d'effets complexes
- [ ] Système de triggers
- [ ] Stack de résolution
- [ ] Tests unitaires par effet

---

## 🏗️ PHASE 5: DECK BUILDING (3-4 jours)

### Objectif: Personnalisation des decks

```ascii
    Collection              Deck Builder
   ┌──────────┐            ┌──────────┐
   │ 500 cards│ ─Filter──→ │ 30 cards │
   └──────────┘            └──────────┘
        │                        │
        │                        ▼
        │                   Validation
        │                   - Max 2 copies
        │                   - Curve mana
        │                   - Synergies
        ▼
    Craft/Dust System
```

### Tasks:
- [ ] UI Deck Builder
- [ ] Sauvegarde decks (MongoDB/PostgreSQL)
- [ ] Import/Export decks
- [ ] Validation règles
- [ ] Recommandations IA

---

## 🌟 PHASE 6: FEATURES AVANCÉES (10+ jours)

### Objectif: Fonctionnalités pro

#### Replay System
```javascript
{
  "replay_id": "r_12345",
  "turns": [
    {"player": "alice", "action": "play", "card": "fireball"},
    {"player": "bob", "action": "play", "card": "shield"}
  ]
}
```

#### Matchmaking ELO
```python
def find_match(player):
    elo_range = 100
    while True:
        opponents = find_in_range(player.elo, elo_range)
        if opponents:
            return best_match(opponents)
        elo_range += 50
```

#### Tournois
- Swiss rounds
- Elimination brackets
- Prizes/Rewards

#### Spectator Mode
- Watch live games
- Commentaire
- Replays célèbres

---

## 📈 MÉTRIQUES DE SUCCÈS

### Phase 1
- [ ] 0 erreurs Java↔Rust
- [ ] < 100ms latence API

### Phase 2
- [ ] IA gagne 40-60% des matchs
- [ ] Diversité des stratégies

### Phase 3
- [ ] < 50ms latence WebSocket
- [ ] 100+ joueurs simultanés

### Phase 4
- [ ] 100+ cartes uniques
- [ ] 0 bugs d'interaction

### Phase 5
- [ ] 50+ decks viables
- [ ] < 3s chargement deck

### Phase 6
- [ ] 1000+ matchs/jour
- [ ] 95% uptime

---

## 🛠️ STACK TECHNIQUE RECOMMANDÉE

### Backend
- **Java**: Spring Boot + WebSocket
- **Rust**: Axum + Tokio
- **Python**: FastAPI (support)

### Base de données
- **PostgreSQL**: Données persistantes
- **Redis**: Cache + sessions
- **MongoDB**: Replays + logs

### Frontend
- **React/Vue**: UI principale
- **WebSocket**: Temps réel
- **Canvas/WebGL**: Animations

### Infrastructure
- **Docker**: Containers
- **K8s**: Orchestration
- **Nginx**: Load balancing

---

## 📅 TIMELINE GLOBALE

```
Semaine 1: Phase 1-2 (Connexion + IA)
Semaine 2: Phase 3 (WebSocket)
Semaine 3-4: Phase 4 (Cartes)
Semaine 5: Phase 5 (Deck Building)
Semaine 6+: Phase 6 (Features Pro)
```

---

## 🎯 PROCHAINE ACTION IMMÉDIATE

**Commencer Phase 1**: Ajouter l'appel REST Java→Rust

```bash
# 1. Dans CombatService.java, ajouter:
RestTemplate restTemplate = new RestTemplate();

# 2. Tester:
curl -X POST http://localhost:8080/api/combat/ai-turn \
  -d '{"combat_id": "xxx"}'

# 3. Vérifier logs:
tail -f /tmp/java-backend.log
```

---

*Roadmap créée par Claude 4.1 Opus en mode AUTOBOT*
