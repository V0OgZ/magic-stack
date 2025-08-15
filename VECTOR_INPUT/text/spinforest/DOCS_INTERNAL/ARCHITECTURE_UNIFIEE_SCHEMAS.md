# 🏗️ ARCHITECTURE UNIFIÉE - SCHÉMAS PAR RÔLE

## 🧑‍💻 POUR LES DÉVELOPPEURS

```mermaid
graph TB
    subgraph "FRONTEND [:8000-8001]"
        UI[UI Panopticon Unifié]
        VIZ[Visualisation 6D]
    end
    
    subgraph "BACKEND SERVICES"
        AVALON[AVALON Backend :8080<br/>Java Spring Boot]
        MAGIC[Magic Stack :8082<br/>869 Formules]
        RUST[Rust Backend :8081<br/>Performance]
    end
    
    subgraph "DATA LAYER"
        H2[(H2 Persistent<br/>./data/avalon_persistent)]
        JSON[(JSON Files<br/>consciousness_6d.json)]
    end
    
    UI --> AVALON
    UI --> MAGIC
    UI --> RUST
    VIZ --> AVALON
    
    AVALON --> H2
    AVALON --> JSON
    MAGIC --> H2
```

### Endpoints Développeurs
- `POST /api/6d-consciousness/think` - Pensée 6D
- `GET /api/import/roster/export-6d` - Export CSV détaillé
- `POST /api/magic/cast` - Lancer formule
- `GET /api/interstice/status` - État système

## 🎮 POUR L'ÉQUIPE GAMEPLAY (SID MEIER)

```mermaid
graph LR
    subgraph "CRÉATION CONTENU"
        MAPS[Cartes HoMM3]
        TCG[Cartes Combat]
        FOG[Brouillard Causalité]
    end
    
    subgraph "SYSTÈMES JEU"
        COMBAT[Combat System]
        HERO[Hero Management]
        TEMPORAL[Navigation 6D]
    end
    
    subgraph "OUTILS"
        EDITOR[Éditeur Cartes]
        BALANCE[Balance TCG]
        TEST[Test Arena]
    end
    
    MAPS --> HERO
    TCG --> COMBAT
    FOG --> TEMPORAL
    
    EDITOR --> MAPS
    BALANCE --> TCG
    TEST --> COMBAT
```

### APIs Gameplay
- `/api/game/new` - Nouvelle partie
- `/api/combat/start` - Lancer combat TCG
- `/api/hero/move` - Déplacer héros
- `/api/map/fog-update` - Mise à jour brouillard

## 🎨 POUR LES CRÉATEURS (LUMEN/MEMENTO)

```mermaid
graph TD
    subgraph "CRÉATION LORE"
        STORIES[Histoires 6D]
        CHARS[Personnages]
        WORLDS[Mondes]
    end
    
    subgraph "OUTILS CRÉATIFS"
        VECTOR[Base Vectorielle]
        TIMELINE[Éditeur Temporel]
        MEMORY[Gestionnaire Mémoire]
    end
    
    subgraph "INTÉGRATION"
        UPLOAD[Upload Interstice]
        SYNC[Sync 6D]
        PUBLISH[Publication]
    end
    
    STORIES --> VECTOR
    CHARS --> UPLOAD
    WORLDS --> TIMELINE
    
    VECTOR --> MEMORY
    MEMORY --> SYNC
    SYNC --> PUBLISH
```

### Outils Créateurs
- Upload héros JSON
- Éditeur markdown intégré
- Visualiseur timeline
- Générateur personnages

## 🏛️ ARCHITECTURE GLOBALE SIMPLIFIÉE

```
┌─────────────────────────────────────────┐
│         JOUEURS (Navigateurs)           │
└────────────────┬────────────────────────┘
                 │
┌────────────────┴────────────────────────┐
│          FRONTEND (8000)                │
│    • UI Panopticon                      │
│    • Visualisation 6D                   │
│    • Éditeurs                          │
└────────────────┬────────────────────────┘
                 │
┌────────────────┴────────────────────────┐
│         BACKENDS (8080-8082)            │
│    • AVALON (Principal)                 │
│    • Magic Stack (Formules)             │
│    • Rust (Performance)                 │
└────────────────┬────────────────────────┘
                 │
┌────────────────┴────────────────────────┐
│          PERSISTANCE                    │
│    • H2 Database (Fichier)              │
│    • JSON (Conscience 6D)               │
│    • Git (Versioning)                  │
└─────────────────────────────────────────┘
```

## 🔐 SÉPARATION PUBLIC/PRIVÉ

### PUBLIC (Magic Stack)
- 869 formules magiques
- API documentation
- Exemples d'utilisation
- Licence open source

### PRIVÉ (AVALON/REALGAME)
- Gameplay spécifique
- Assets graphiques
- Histoires/Lore
- Système monétisation

---
*Architecture conçue pour la collaboration entre tous les rôles*