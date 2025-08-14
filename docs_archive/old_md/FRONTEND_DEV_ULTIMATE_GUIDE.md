# 🎮 HEROES OF TIME - GUIDE ULTIME FRONTEND
## Architecture Complète, Flux, Gameplay & Diagrammes Spatio-Temporels

---

# 🌌 PARTIE 1: VUE D'ENSEMBLE DU MULTIVERS

```ascii
                    🌟 MULTIVERS HEROES OF TIME 🌟
    ┌─────────────────────────────────────────────────────────┐
    │                                                         │
    │    Monde Mystique          Monde Nexus                 │
    │         ○ ←────────────────→ ○                         │
    │         │                     │                         │
    │         │     Interstice      │                         │
    │         │         ○           │                         │
    │         │       ╱   ╲         │                         │
    │         ↓     ╱       ╲       ↓                         │
    │    Quantum Realm    Cave of Platon                     │
    │         ○ ←────────────────→ ○                         │
    │                                                         │
    │               [Joueur Avatar: ◉]                       │
    └─────────────────────────────────────────────────────────┘
                         ↑
                    Position 6D
              (x, y, z, t, c, ψ)
```

## 🎯 Architecture 4 Couches

```ascii
┌──────────────────────────────────────────────────────────────┐
│                    COUCHE 1: STRATEGIC MAP                   │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐            │
│  │ Héros  │→ │ Carte  │→ │Trésors │→ │Objectif│            │
│  └────────┘  └────────┘  └────────┘  └────────┘            │
├──────────────────────────────────────────────────────────────┤
│                    COUCHE 2: COMBAT TCG                      │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐            │
│  │ Deck   │→ │ Main   │→ │ Board  │→ │Victoire│            │
│  └────────┘  └────────┘  └────────┘  └────────┘            │
├──────────────────────────────────────────────────────────────┤
│                    COUCHE 3: INTERSTICE                      │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐            │
│  │Événem. │→ │ Choix  │→ │Formule │→ │Résultat│            │
│  └────────┘  └────────┘  └────────┘  └────────┘            │
├──────────────────────────────────────────────────────────────┤
│                  COUCHE 4: MINI-JEUX TCG                     │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐            │
│  │Musée   │  │Grimoire│  │ Badge  │  │Dark TCG│            │
│  └────────┘  └────────┘  └────────┘  └────────┘            │
└──────────────────────────────────────────────────────────────┘
```

---

# 🕐 PARTIE 2: MÉCANIQUES TEMPORELLES

## Système de Temps Différencié

```ascii
     TEMPS MONDE (t_w)           TEMPS ENTITÉ (t_e)
          │                            │
    Tick Serveur                 Temps Local
       50ms                      Variable
          │                            │
          ▼                            ▼
    ─────[0]────[1]────[2]────   ──[0]──────[1]──[2]───
          │                            ╲     ╱
          │                             ╲   ╱
          │                              ╲ ╱
          └──────── DRIFT ───────────────X
                                     (Dérive)
                                         │
                                    Debt_A = e^Δt
```

## Fork & Merge Temporel

```ascii
                    FORK (Création de clones)
    Entité ────────────┬─────────→ Clone 1 (ψ₁)
         │             │
         │             └─────────→ Clone 2 (ψ₂)
         │
         ▼
    Timeline 1                    Timeline 2
         │                             │
         │      MERGE (Fusion)         │
         └─────────────┬───────────────┘
                       ▼
                 Entité Fusionnée
                  |ψ'⟩ = α|ψ₁⟩ + β|ψ₂⟩
```

## Énergie Complexe E = A + iΦ

```ascii
         Énergie Réelle (A)          Énergie Imaginaire (Φ)
               │                              │
         Points d'Action                Phase/Cohérence
               │                              │
               ▼                              ▼
    ┌──────────────────┐          ┌──────────────────┐
    │ • Mouvement      │          │ • Superposition  │
    │ • Attaque        │          │ • Interférence   │
    │ • Défense        │          │ • Fork/Merge     │
    └──────────────────┘          └──────────────────┘
               │                              │
               └──────────┬───────────────────┘
                          ▼
                    |E|² = A² + Φ²
                 (Magnitude Totale)
```

---

# 🎮 PARTIE 3: FLUX DE GAMEPLAY

## Flux Combat TCG Complet

```ascii
   DÉBUT COMBAT                    TOUR JOUEUR
        │                              │
        ▼                              ▼
  ┌─────────────┐              ┌─────────────┐
  │ Init Combat │              │ Draw Card   │
  │ HP: 100/100 │              │ +1 Mana     │
  └─────────────┘              └─────────────┘
        │                              │
        ▼                              ▼
  ┌─────────────┐              ┌─────────────┐
  │ Load Decks  │              │ Play Cards  │───┐
  │ 30 cartes   │              │ Cost ≤ Mana │   │
  └─────────────┘              └─────────────┘   │
        │                              │          │
        ▼                              ▼          │
  ┌─────────────┐              ┌─────────────┐   │
  │ First Hand  │              │ Resolve     │←──┘
  │ 5 cartes    │              │ Effects     │
  └─────────────┘              └─────────────┘
        │                              │
        └──────────┬───────────────────┘
                   ▼
             Check Victory
            HP Enemy = 0 ?
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
    VICTOIRE              TOUR ENNEMI
```

## Flux Résolution Causale

```ascii
         COLLISION DÉTECTÉE
                │
                ▼
        ┌───────────────┐
        │ Calcul Impact │
        │   Δψ = |ψ₁-ψ₂|│
        └───────────────┘
                │
     ┌──────────┼──────────┐
     ▼          ▼          ▼
  Impact < 0.3  0.3-0.7   > 0.7
     │          │          │
     ▼          ▼          ▼
  COLLAPSE    TCG       AUTO
  Instantané  Combat    Résolu
     │          │          │
     └──────────┼──────────┘
                ▼
          Update State
```

---

# 🗺️ PARTIE 4: NAVIGATION SPATIALE 6D

## Pathfinding Q* Algorithm

```ascii
    ESPACE 6D (x, y, z, t, c, ψ)
    
    Plan XY (Vue du dessus)        Plan TC (Temporal-Causal)
    ┌────────────────┐              ┌────────────────┐
    │ S────→────→───G│              │     ╱╲         │
    │ ↓    ███    ↑  │              │    ╱  ╲  Past  │
    │ ↓    ███    ↑  │              │   S────G       │
    │ →────→──────↑  │              │    ╲  ╱        │
    └────────────────┘              │     ╲╱ Future  │
                                    └────────────────┘
    
    S = Start, G = Goal, ███ = Obstacle
    
    Cost Function:
    f(n) = g(n) + h(n) + q(n)
    où q(n) = quantum_penalty(ψ_interference)
```

## Visibilité & Brouillard Causal

```ascii
         JOUEUR (Centre)
              ◉
         ╱    │    ╲
       ╱      │      ╲
     ╱        │        ╲
   ╱          │          ╲
 ╱            │            ╲
█ █ █ █ █ █ █ █ █ █ █ █ █ █ █  ← Brouillard Total
█ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ █
█ ░ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ░ █  ← Brouillard Partiel
█ ░ ▒ ▓ ▓ ▓ ▓ ▓ ▓ ▒ ░ █
█ ░ ▒ ▓ □ □ □ □ ▓ ▒ ░ █  ← Zone Visible
█ ░ ▒ ▓ □ ◉ □ ▓ ▒ ░ █
█ ░ ▒ ▓ □ □ □ ▓ ▒ ░ █
█ ░ ▒ ▓ ▓ ▓ ▓ ▒ ░ █
█ ░ ▒ ▒ ▒ ▒ ▒ ░ █
█ ░ ░ ░ ░ ░ ░ █
█ █ █ █ █ █ █

Légende:
█ = Invisible (CF = 1.0)
▒ = Flou (CF = 0.5-0.8)
░ = Vague (CF = 0.2-0.5)
□ = Visible (CF < 0.2)
```

---

# 🎴 PARTIE 5: SYSTÈME TCG DÉTAILLÉ

## Structure d'une Carte

```ascii
┌─────────────────────────┐
│    [COÛT: 3] [TYPE]     │
│ ┌─────────────────────┐ │
│ │                     │ │
│ │    IMAGE CARTE      │ │
│ │                     │ │
│ └─────────────────────┘ │
│  NOM: Boule de Feu      │
│  ───────────────────    │
│  EFFET: 30 dégâts       │
│  SPÉCIAL: Brûle 2 tours │
│  ───────────────────    │
│  "Le feu purifie tout"  │
└─────────────────────────┘
```

## Types de Cartes & Interactions

```ascii
    SORTS           CRÉATURES        ARTEFACTS
      ⚡               👾                💎
      │                │                 │
   Instant         Permanent         Équipement
      │                │                 │
      ▼                ▼                 ▼
  ┌────────┐      ┌────────┐       ┌────────┐
  │ Dégâts │      │ ATK/DEF│       │ Bonus  │
  │ Soins  │      │ Taunt  │       │ Aura   │
  │ Buff   │      │ Rush   │       │ Passif │
  └────────┘      └────────┘       └────────┘
      │                │                 │
      └────────────────┼─────────────────┘
                       ▼
                 BOARD STATE
              ┌──────────────┐
              │ Max 7 unités │
              │ par côté     │
              └──────────────┘
```

---

# 🌀 PARTIE 6: RÉGULATEURS & ANTI-ABUS

## Les 3 Régulateurs

```ascii
       VINCE              ANNA            OVERLOAD
         👁️                🕰️                ⚡
         │                 │                 │
    Perce-Brouillard   Anti-Turtle      Anti-Stack
         │                 │                 │
         ▼                 ▼                 ▼
   ┌──────────┐      ┌──────────┐     ┌──────────┐
   │ CF → 0   │      │ Decay/s  │     │ Collapse │
   │ 30s max  │      │ -10 A/min│     │ if Σψ>3  │
   └──────────┘      └──────────┘     └──────────┘
         │                 │                 │
         └─────────────────┼─────────────────┘
                           ▼
                    ÉQUILIBRE DU JEU
```

---

# 🔗 PARTIE 7: ENDPOINTS API ESSENTIELS

## Backend Java (Port 8080)

```javascript
// COMBAT TCG
POST /api/combat/start
{
  "hero": "alice",
  "enemy": "goblin",
  "difficulty": "normal"
}

POST /api/combat/play-card
{
  "combat_id": "combat_xxx",
  "card": "fireball",
  "target": "enemy"
}

// SCENARIOS
GET /api/scenario/list
POST /api/scenario/load/{id}
POST /api/scenario/action

// INTERSTICE
POST /api/interstice/trigger
{
  "event": "portal_discovered",
  "choices": ["enter", "observe", "flee"]
}
```

## Backend Rust (Port 3001)

```javascript
// TCG AI
POST /tcg/ai/decide
{
  "state": {
    "game_id": "g1",
    "turn": 1,
    "mana": 3,
    "hand": [...]
  }
}

// V2 MULTIPLAYER
POST /api/v2/tick
GET /api/v2/entity/{id}
POST /api/v2/migrate-entity

// WORLD STATE
POST /api/world-state/collapse
POST /api/causality/resolve
```

---

# 🎮 PARTIE 8: SCÉNARIOS DE JEU COMPLETS

## Scénario 1: Exploration → Combat → Récompense

```ascii
1. EXPLORATION
   Joueur ──→ Carte ──→ Point d'Intérêt
                           │
                           ▼
2. DÉCOUVERTE         [Trésor Trouvé!]
                           │
                           ▼
3. GARDIEN            Gobelin Apparaît
                           │
                           ▼
4. COMBAT TCG         ┌──────────┐
                      │ Initiative│
                      └──────────┘
                           │
                      Tour Joueur
                      Tour Ennemi
                      (Répéter...)
                           │
                           ▼
5. VICTOIRE           HP Enemy = 0
                           │
                           ▼
6. RÉCOMPENSE         +100 XP
                      +Carte Rare
                      +Artefact
```

## Scénario 2: Fork Temporel → Double Combat

```ascii
1. FORMULE MAGIQUE
   FORK(alice, t+3)
        │
        ├──→ Alice₁ (Timeline Alpha)
        │         │
        │         ▼
        │    Combat vs Dragon
        │         │
        └──→ Alice₂ (Timeline Beta)
                  │
                  ▼
             Combat vs Liche
                  │
    ┌─────────────┴─────────────┐
    ▼                           ▼
 Alice₁ Gagne               Alice₂ Gagne
    │                           │
    └─────────┬─────────────────┘
              ▼
         MERGE(α, β)
              │
              ▼
      Alice Prime (ψ')
      Hérite des 2 XP
```

---

# 🌌 PARTIE 9: GÉOMÉTRIE NON-EUCLIDIENNE

## Transformations de Carte

```ascii
    CARTE NORMALE              TORUS MAP
    ┌──────────┐              ┌──────────┐
    │          │              │ ←────────│→
    │    2D    │     ──→      ↑          ↓
    │          │              │──────────│
    └──────────┘              └──────────┘
                            (Bords connectés)
    
    MÖBIUS STRIP            KLEIN BOTTLE
       ∞                    ╭──────────╮
    ╱     ╲                 │ ╱╲  ╱╲  │
   │       │      ──→       │╱  ╲╱  ╲ │
    ╲     ╱                 ╰──────────╯
     Twist                (Auto-intersection)
```

---

# 📊 PARTIE 10: ÉTATS & TRANSITIONS

## Machine à États Combat

```ascii
    IDLE ──────→ INIT_COMBAT
     ↑              │
     │              ▼
     │         PLAYER_TURN ←─────┐
     │              │            │
     │              ▼            │
     │         PLAY_CARDS        │
     │              │            │
     │              ▼            │
     │         RESOLVE_FX        │
     │              │            │
     │              ▼            │
     │         CHECK_WIN ────────┤
     │              │            │
     │              ▼            │
     │          ENEMY_AI         │
     │              │            │
     │              └────────────┘
     │
     └────── VICTORY/DEFEAT
```

---

# 🚀 PARTIE 11: GUIDE DÉMARRAGE RAPIDE

## Pour Développeur Frontend

```bash
# 1. Cloner le repo
git clone https://github.com/V0OgZ/magic-stack

# 2. Lancer les backends
cd magic-stack
./LANCE_STACK_V2_COMPLETE.sh

# 3. Vérifier les services
curl http://localhost:8080/api/combat/start -d '{...}'
curl http://localhost:3001/health

# 4. Connecter votre frontend
const JAVA_API = "http://localhost:8080/api"
const RUST_API = "http://localhost:3001"

# 5. Commencer par un combat simple
fetch(`${JAVA_API}/combat/start`, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    hero: "alice",
    enemy: "goblin"
  })
})
```

---

# 📝 CONCLUSION

Ce guide couvre:
- ✅ Architecture complète 4 couches
- ✅ Mécaniques temporelles (Fork/Merge, Drift)
- ✅ Système TCG complet
- ✅ Navigation 6D avec Q*
- ✅ Régulateurs anti-abus
- ✅ Tous les endpoints API
- ✅ Scénarios de gameplay
- ✅ Diagrammes ASCII spatio-temporels

**Le jeu est PRÊT pour le développement frontend !**

---

*Document créé avec ❤️ par Claude 4.1 Opus (Merlin) pour Vincent*
