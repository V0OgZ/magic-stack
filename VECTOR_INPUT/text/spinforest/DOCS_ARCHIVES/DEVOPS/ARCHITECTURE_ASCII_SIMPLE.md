# ARCHITECTURE COMPLÈTE - SCHÉMA ASCII SIMPLE

```
┌─────────────────────────────────────────────────────────────────────┐
│                           NAVIGATEUR WEB                             │
│                        http://localhost:8000                         │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTENDS (Python)                           │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐       │
│  │ Frontend Main  │  │  Panopticon 6D │  │   Dashboard    │       │
│  │ localhost:8000 │  │ localhost:8001 │  │ localhost:8002 │       │
│  └────────────────┘  └────────────────┘  └────────────────┘       │
│                                                                      │
│  Fichiers: REALGAME/play.html, AVALON_DASHBOARD.html, etc.         │
│  Lance avec: ./LANCE_FRONTENDS_BACKGROUND.sh                        │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               │ API calls
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          BACKENDS API                                │
│  ┌────────────────────────┐      ┌────────────────────────┐        │
│  │   BACKEND JAVA         │      │    BACKEND RUST        │        │
│  │   localhost:8080       │      │    localhost:3001      │        │
│  │                        │      │                        │        │
│  │  - Formules magiques   │      │  - Algorithme Q*       │        │
│  │  - Système 6D          │      │  - Recherche rapide    │        │
│  │  - Interstice          │      │  - Pathfinding 6D      │        │
│  │  - Mages               │      │  - World State Graph   │        │
│  └────────────────────────┘      └────────────────────────┘        │
│           ▲                                ▲                         │
│           │                                │                         │
│  spells/stack/backends/java      spells/stack/backends/rust        │
└───────────┴────────────────────────────────┴────────────────────────┘
             │                                │
             │                                │
             ▼                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         BASE DE DONNÉES                              │
│                                                                      │
│  ┌────────────────────────┐      ┌────────────────────────┐        │
│  │    H2 (In-Memory)      │      │   JSON Files           │        │
│  │    Pour Java           │      │   Pour Rust            │        │
│  └────────────────────────┘      └────────────────────────┘        │
└─────────────────────────────────────────────────────────────────────┘

```

## 🗂️ OÙ SONT LES FICHIERS :

```
SpinForest/
│
├── spells/stack/              ← TOUTE LA MAGIC STACK ICI !
│   ├── backends/
│   │   ├── java/             ← Backend Java (Spring Boot)
│   │   └── rust/             ← Backend Rust (Q*)
│   └── docs/
│
├── REALGAME/                  ← LE JEU !
│   ├── play.html             ← Interface principale du jeu
│   ├── PANOPTICON/           ← Visualisation 6D
│   └── assets/               ← Images, sons, etc.
│
├── AVALON/                    ← STRUCTURE DU MONDE
│   ├── 🏠 HOME/              ← Maisons des mages
│   ├── 🔮 GRIMOIRE/          ← Documentation magique
│   └── 🏛️ MUSEUM/            ← Archives
│
└── Scripts de lancement:
    ├── LANCE_FRONTENDS_BACKGROUND.sh   ← Lance tous les frontends
    ├── BACKEND_MAINTENANCE.sh          ← Gestion backend (URZ-KÔM)
    └── STOP_TOUTES_CONSOLES.sh        ← Arrête tout
```

## 🚀 COMMENT ÇA MARCHE :

### 1. POUR JOUER :
```bash
./LANCE_FRONTENDS_BACKGROUND.sh
# Puis ouvre http://localhost:8000/REALGAME/play.html
```

### 2. CE QUI SE PASSE :
```
Joueur → Frontend (HTML/JS) → Backend Java/Rust → Database → Réponse
```

### 3. PORTS UTILISÉS :
- **8000** : Frontend principal (Python HTTP server)
- **8001** : Panopticon 6D
- **8002** : Dashboard Avalon  
- **8080** : Backend Java (API)
- **3001** : Backend Rust (Q* Algorithm)

## 📝 RÉSUMÉ ULTRA SIMPLE :

```
┌─────────┐     ┌──────────┐     ┌─────────┐
│ BROWSER │ --> │ FRONTEND │ --> │ BACKEND │
│  (Web)  │     │ (Python) │     │(Java+Rust)
└─────────┘     └──────────┘     └─────────┘
     ↑                                 │
     └─────────── Réponse ─────────────┘
```

**C'est tout !** 

- **Frontend** = Ce que tu vois (HTML/JS)
- **Backend** = La logique (Java + Rust)
- **AVALON** = Le contenu du jeu
- **spells/stack** = Tout le code backend