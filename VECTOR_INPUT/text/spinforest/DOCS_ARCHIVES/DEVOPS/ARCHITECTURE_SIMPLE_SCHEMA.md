# ARCHITECTURE COMPLETE - MAGIC STACK & AVALON

## VUE D'ENSEMBLE

```
                            AVALON (Frontend/Game)
    ┌────────────────────────────────────────────────────────────┐
    │                                                              │
    │  ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐   │
    │  │   HoMM3     │  │    TCG      │  │   Panopticon    │   │
    │  │  (Game UI)  │  │ (Card Game) │  │  (6D Viewer)    │   │
    │  └──────┬──────┘  └──────┬──────┘  └────────┬─────────┘   │
    │         │                 │                   │              │
    │         └─────────────────┴───────────────────┘              │
    │                           │                                  │
    └───────────────────────────┼──────────────────────────────┘
                                │
                                ▼ :3000
                 ┌──────────────────────────────┐
                 │      API GATEWAY (Node.js)    │
                 │   - Route vers backends       │
                 │   - /api/magic → :8080        │
                 │   - /api/interstice → :8080   │
                 │   - /api/mage → :8080         │
                 └──────────────┬───────────────┘
                                │
                                ▼ :8080
    ┌───────────────────────────────────────────────────────┐
    │              MAGIC STACK BACKEND (Java)                │
    ├───────────────────────────────────────────────────────┤
    │                                                         │
    │  ┌─────────────────┐  ┌──────────────────────────┐   │
    │  │ MagicController │  │  IntersticeController    │   │
    │  │ - /formulas     │  │  - /upload (6D)          │   │
    │  │ - /cast         │  │  - /download             │   │
    │  │ - /history      │  │  - /search               │   │
    │  └────────┬────────┘  │  - /status               │   │
    │           │           └───────────┬──────────────┘   │
    │           │                       │                   │
    │  ┌────────▼────────────────────────▼──────────────┐  │
    │  │           SERVICES & BUSINESS LOGIC           │  │
    │  │  - MagicEngineService (869 formulas)         │  │
    │  │  - IntersticeService (6D coordinates)        │  │
    │  │  - MageController (/self-update)             │  │
    │  │  - PanopticonController (world-state-graph)  │  │
    │  │  - FeatureLogService (logs 6D)              │  │
    │  └────────────────────┬──────────────────────────┘  │
    │                       │                              │
    │  ┌────────────────────▼──────────────────────────┐  │
    │  │                H2 DATABASE                    │  │
    │  │  - magic_formulas (formules)                 │  │
    │  │  - interstice_entities (6D storage)          │  │
    │  │  - feature_logs (actions des mages)          │  │
    │  │  - world_state (état du jeu)                 │  │
    │  └───────────────────────────────────────────────┘  │
    └───────────────────────────────────────────────────┘
```

## PORTS & ENDPOINTS

### Backend Java (Spring Boot) - Port 8080
- `/api/magic/*` - Gestion des formules magiques
- `/api/interstice/*` - Système 6D (upload/download/search)
- `/api/mage/*` - Actions des mages (self-update, cast-and-play)
- `/api/panopticon/*` - Visualisation temps réel (world-state-graph, feature-logs)
- `/api` - Documentation API

### API Gateway (Node.js) - Port 3000  
- Route toutes les requêtes vers le backend Java
- Gestion des erreurs et fallback

### Frontend Avalon
- **HoMM3**: Jeu principal (Sid Meier)
- **TCG Combat**: Système de cartes
- **Panopticon 6D GRUT**: assets/panopticon-6d-grut.html (Vision statique)
- **Panopticon 6D Dynamic**: assets/panopticon-6d-dynamic.html (Vision temps réel)

## RESPONSABILITÉS

- **URZ-KÔM**: Backend Magic Stack + Documentation + Interstice
- **SID MEIER**: REALGAME (HoMM3 + brouillard causalité + TCG)
- **LUMEN**: IA & Gameplay
- **GROKAEN**: Support technique

## FLUX DE DONNÉES

1. **Mage fait action** → Frontend Avalon
2. **Frontend** → API Gateway :3000
3. **Gateway** → Backend Java :8080
4. **Backend** → Traite (formule/6D/update)
5. **Backend** → Persiste en H2
6. **Backend** → Retour au Frontend
7. **Frontend** → Update visuel dynamique

## SYSTÈME DE LOGS 6D (NOUVEAU!)

### Feature Logs
- Chaque action importante d'un mage est loggée en 6D
- Les logs ont une luminosité qui diminue avec le temps
- Visualisation en temps réel dans Panopticon Dynamic
- Non-écrasable : historique complet conservé

### Mémoire Cérébrale Dynamique
- Les mages voient leurs actions et celles des autres
- Feedback visuel immédiat des changements
- Carte mentale en évolution constante