# 🗺️ SCHÉMA ARCHITECTURE HEROES OF TIME

## 🌍 VUE D'ENSEMBLE - HIÉRARCHIE DES MONDES

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         🌌 MULTIVERS HEROES OF TIME                         │
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐           │
│  │   🏔️ MYSTIQUE   │  │ 🌀 TEMPORAL_NEXUS│  │ ⚛️ QUANTUM_REALM │           │
│  │                 │  │                 │  │                 │           │
│  │ ┌─────────────┐ │  │ ┌─────────────┐ │  │ ┌─────────────┐ │           │
│  │ │📍 Maps      │ │  │ │📍 Maps      │ │  │ │📍 Maps      │ │           │
│  │ │ • classic   │ │  │ │ • paradox   │ │  │ │ • lab_map   │ │           │
│  │ │ • forest    │ │  │ │ • loop_map  │ │  │ │ • void_map  │ │           │
│  │ └─────────────┘ │  │ └─────────────┘ │  │ └─────────────┘ │           │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘           │
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐           │
│  │ 🏛️ CAVE_PLATON  │  │ 🗼 DARK_TOWER   │  │ 🔬 PLANET_EZITH │           │
│  │                 │  │                 │  │                 │           │
│  │ ┌─────────────┐ │  │ ┌─────────────┐ │  │ ┌─────────────┐ │           │
│  │ │📍 Maps      │ │  │ │📍 Maps      │ │  │ │📍 Maps      │ │           │
│  │ │ • shadows   │ │  │ │ • tower_1   │ │  │ │ • research  │ │           │
│  │ │ • light     │ │  │ │ • basement  │ │  │ │ • defense   │ │           │
│  │ └─────────────┘ │  │ └─────────────┘ │  │ └─────────────┘ │           │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 🎮 ARCHITECTURE COMPLÈTE - FLUX DE JEU

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                              HEROES OF TIME                                  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  👤 JOUEUR                                                                   │
│     │                                                                        │
│     ▼                                                                        │
│  ┌──────────────┐     ┌─────────────┐     ┌──────────────┐                │
│  │ 🎯 SCÉNARIO  │────▶│ 🌍 MONDE    │────▶│ 🗺️ MAP       │                │
│  │   (.hots)    │     │  (world)    │     │  (terrain)   │                │
│  └──────────────┘     └─────────────┘     └──────────────┘                │
│         │                    │                     │                         │
│         │                    │                     ▼                         │
│         │                    │              ┌─────────────┐                  │
│         │                    │              │ 📍 POSITION │                  │
│         │                    │              │   (x, y)    │                  │
│         │                    │              └─────────────┘                  │
│         │                    │                     │                         │
│         ▼                    ▼                     ▼                         │
│  ┌────────────────────────────────────────────────────────┐                 │
│  │                    🎲 GAME ENGINE                      │                 │
│  │  ┌────────────┐  ┌──────────────┐  ┌────────────────┐ │                 │
│  │  │ Quantum    │  │ Causal       │  │ Reality        │ │                 │
│  │  │ Service    │  │ Collapse     │  │ Controller     │ │                 │
│  │  └────────────┘  └──────────────┘  └────────────────┘ │                 │
│  └────────────────────────────────────────────────────────┘                 │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

## 🌀 POCKET DIMENSIONS - TÉLÉPORTATION

```
┌─────────────────────────────────────────────────────────────────┐
│                        POCKET UNIVERSE                          │
│                                                                 │
│  Normal Space                  Pocket Space                     │
│  ┌─────────────┐              ┌─────────────┐                 │
│  │ Map A       │              │ POCKET_123  │                 │
│  │             │   ╔══════╗   │             │                 │
│  │  Hero ●─────┼──▶║ WARP ║──▶│  ● Hero    │                 │
│  │ (10,15)     │   ╚══════╝   │ (75,23)    │                 │
│  └─────────────┘              └─────────────┘                 │
│                                      │                         │
│                                      ▼                         │
│                               ┌─────────────┐                 │
│                               │ POCKET_456  │                 │
│                               │             │                 │
│                               │  ● Hero     │                 │
│                               │ (32,67)     │                 │
│                               └─────────────┘                 │
│                                                                │
│  Règles:                                                       │
│  • Max 5 téléportations par pocket                           │
│  • Coordonnées aléatoires basées sur pocket_id               │
│  • Saturation → instabilité dimensionnelle                   │
└─────────────────────────────────────────────────────────────────┘
```

## 📜 STRUCTURE D'UN SCÉNARIO (.hots)

```
┌──────────────────────────────────────────────────────┐
│                  SCENARIO.hots                       │
├──────────────────────────────────────────────────────┤
│                                                      │
│  # Configuration                                     │
│  WORLD: mystique        ─────┐                      │
│  MAP: forest_map            │                       │
│  MODE: adventure            │                       │
│                             ▼                       │
│                      ┌──────────────┐               │
│                      │ Game Engine  │               │
│                      │   Loads:     │               │
│                      │ • World data │               │
│                      │ • Map tiles  │               │
│                      │ • Heroes     │               │
│                      └──────────────┘               │
│                                                      │
│  ## Actes                                           │
│  TURN 1:                                            │
│    SPAWN hero AT (5,5)  ────▶ 🦸                   │
│    DIALOGUE: "..."                                  │
│                                                      │
│  TURN 5:                                            │
│    EVENT quantum_storm  ────▶ ⚡                   │
│    EFFECT damage ALL 20                            │
│                                                      │
│  ## Victory                                         │
│  VICTORY:                                           │
│    - DEFEAT all_enemies                            │
│    - COLLECT artifacts >= 3                        │
│                                                      │
└──────────────────────────────────────────────────────┐
```

## 🔗 INTERCONNEXIONS - FLUX COMPLET

```
                        🎮 FRONTEND (Port 3000)
                                │
                                ▼
                        🌐 BACKEND API (Port 8080)
                    ┌───────────┴────────────┐
                    │                        │
            ┌───────▼────────┐      ┌───────▼────────┐
            │ Game Service   │      │ Scenario Service│
            └───────┬────────┘      └───────┬────────┘
                    │                        │
         ┌──────────┴───────────────────────┴──────────┐
         │                                             │
    ┌────▼─────┐  ┌─────▼─────┐  ┌─────▼─────┐  ┌────▼────┐
    │ Quantum  │  │ Causal    │  │ Reality   │  │ World   │
    │ Service  │◄─┤ Collapse  │  │ Controller│  │ State   │
    └──────────┘  └───────────┘  └───────────┘  └─────────┘
         │                                             │
         └─────────────────┬───────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │  DATABASE   │
                    │ • Games     │
                    │ • Heroes    │
                    │ • Worlds    │
                    └─────────────┘
```

## 🌌 EXEMPLE CONCRET - FLUX DE JEU

```
1. JOUEUR lance "test_hari_seldon_resistance.hots"
                    │
                    ▼
2. BACKEND charge:
   • WORLD: planet_ezith
   • MAP: planet_ezith_test
   • HERO: hari_seldon at (10,10)
                    │
                    ▼
3. GAME ENGINE initialise:
   • QuantumService → états superposés
   • CausalCollapse → timeline active
   • RealityController → physics engine
                    │
                    ▼
4. GAMEPLAY:
   • Turn 1: Spawn McKinsey consultant
   • Turn 3: Ford host appears
   • Turn 5: Seldon Crisis triggered
   • Hero uses pocket teleport → POCKET_XYZ
                    │
                    ▼
5. VICTORY CONDITIONS check:
   • Prime Radiant defended ✓
   • Enemies defeated ✓
   • Knowledge collected ✓
                    │
                    ▼
6. RÉSULTAT sauvegardé dans DB
```

---

*Ce schéma montre comment tout s'interconnecte : des mondes aux maps, des scénarios aux pockets dimensionnels, tout passe par le Game Engine central qui gère quantum, causalité et réalité !* 