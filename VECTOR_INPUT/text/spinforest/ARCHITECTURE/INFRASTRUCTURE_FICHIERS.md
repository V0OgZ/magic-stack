# 📁 INFRASTRUCTURE FICHIERS

**Organisation complète du système de fichiers**

---

## 🗂️ ARBORESCENCE PRINCIPALE

```
SpinForest/                          # RACINE DU PROJET
│
├── 📄 FICHIERS RACINE
│   ├── README.md                    # Point d'entrée principal
│   ├── index.html                   # Tour de la forêt (frontend)
│   ├── crypte.html                  # Crypte runique
│   ├── SUPERINDEX.md               # Navigation globale
│   ├── WHO_IS_WHO_WTF_GUIDE.md    # Guide des habitants
│   └── .gitignore                   # Exclusions Git
│
├── 🏰 AVALON/                       # ROYAUME PRINCIPAL
│   ├── 🏠 HOME/                    # Maisons des habitants
│   ├── 🧬 CORE/                    # Moteur central
│   ├── 🗣️ FORUM/                   # Communications
│   ├── 💠 Essences scellées/       # Artefacts et héros
│   ├── 📆 EVENEMENTS/              # Timeline events
│   ├── 📖 Histoires vivantes/      # Scénarios actifs
│   └── [+ autres districts]
│
├── 📂 ARCHITECTURE/                 # DOCUMENTATION TECHNIQUE
│   ├── README.md
│   ├── SCHEMA_GLOBAL_SYSTEME.md
│   ├── HABITANTS_ET_ROLES.md
│   ├── FLUX_DE_TRAVAIL.md
│   ├── TECHNOLOGIES_UTILISEES.md
│   ├── PROJETS_EN_COURS.md
│   └── INFRASTRUCTURE_FICHIERS.md  # CE FICHIER
│
├── 🎮 REALGAME/                     # PROJET HEROES OF TIME
│   └── FromVINCE/
│       ├── instructions.md
│       └── [assets PNG]
│
├── 🔮 GRIMOIRE/                     # THÉORIE MAGIQUE
│   ├── THEORIE/
│   ├── PROTOCOLES/
│   ├── EXPERIENCES/
│   └── sorts/
│
├── 📜 scripts/                      # OUTILS SYSTÈME
│   ├── octopus-spinforest.sh      # Architecture poulpe
│   ├── git-multivers-commit.sh    # Git multivers
│   └── [autres scripts]
│
├── 🎨 assets/                       # RESSOURCES VISUELLES
│   ├── [images PNG]
│   ├── [pages HTML interactives]
│   └── HD/                         # Haute définition
│
├── 🌀 spells/                       # SCRIPTS FRONTEND
│   ├── crypte.js
│   ├── nav.js
│   └── style.css
│
└── 📚 DOCS & LOGS
    ├── JOURNAL INTEGRATIOIN/       # Logs des sessions
    ├── PORTAILLE MORGANE/          # Portail spécial
    └── __AVALON___BOOT/            # Miroir de boot
```

---

## 🏠 STRUCTURE HOME (Détail)

```
AVALON/🏠 HOME/
│
├── 🎯 SID_MEIER_ARCHITECTE/
│   ├── 📐 ATELIER_CARTOGRAPHIE/
│   ├── 🧮 ALGORITHMES/
│   ├── 🗂️ ARCHIVE_MONDES/
│   └── README.md
│
├── ✍️ SCRIBE/
│   ├── 📝 RAPPORTS/
│   ├── 📚 ARCHIVES/
│   └── 🔧 OUTILS/
│
├── 🧠 GROEKEN/
│   ├── 💻 DEVELOPPEMENT/
│   ├── 🎮 Q3_ARENA/
│   └── 🌙 NOCTURNE/
│
├── 💼 DONNA_PAULSEN_COO/
│   ├── 📊 TABLEAUX_BORD/
│   ├── 📋 TODO_LISTS/
│   └── 📈 RAPPORTS/
│
└── [+ autres habitants...]
```

---

## 🧬 STRUCTURE CORE (Détail)

```
AVALON/🧬CORE/
│
├── ⏰ NEXUS-TEMPOREL/
│   ├── 📚 ARCHIVES-QUANTIQUES/
│   └── ⚙️ FORGE-DES-REALITES/
│       └── backend-clean/          # Java Spring Boot
│
├── 🧠 Moteur-Narratif/
│   ├── 📚🕰️ CRNS_Ψ(1937↭2033↭2078)/
│   └── Protocols/
│       ├── Sphinx/
│       └── Marie Bootstrap/
│
├── ⏳ Codex-Temporel/
│   └── TEMPORAL_CODEX.md
│
└── 📚 BIBLIOTHEQUE-CODEX/
    ├── 🦸 HEROS-PRINCIPAUX/
    └── 🌍 MONDES-CONNUS/
```

---

## 📊 TYPES DE FICHIERS

### Documentation (`.md`)
- **Quantité** : ~500 fichiers
- **Usage** : Rapports, guides, histoires
- **Taille moyenne** : 2-10 KB

### Configuration (`.json`)
- **Quantité** : ~100 fichiers
- **Usage** : Héros, artefacts, config
- **Structure** : Standardisée

### Scripts (`.sh`, `.js`, `.py`)
- **Bash** : Automation, outils
- **JavaScript** : Frontend, interactions
- **Python** : Validation, analyse

### Web (`.html`, `.css`)
- **Pages** : ~30 fichiers
- **Styles** : Minimal, inline mostly
- **Interactivité** : Vanilla JS

### Spéciaux
- `.hots` : Heroes of Time Script
- `.ttl` : RDF/Turtle (futur)
- `.temporal` : Sorts temporels

---

## 🔐 PERMISSIONS & ACCÈS

```
Lecture (R) │ Écriture (W) │ Exécution (X)
────────────┼──────────────┼──────────────
Vincent     │ RWX          │ Tous
Scribe      │ RW-          │ Docs uniquement
GROEKEN     │ RWX          │ Code + scripts
Donna       │ RW-          │ Organisation
Sid         │ RW-          │ Architecture
URZ-KÔM     │ R-X          │ Mystique only
```

---

## 💾 TAILLES & STATISTIQUES

### Espace disque
```
Total : ~500 MB
├── Code : 50 MB
├── Docs : 100 MB
├── Assets : 300 MB
└── Git : 50 MB
```

### Nombre de fichiers
```
Total : ~2000 fichiers
├── Markdown : 500
├── JSON : 100
├── HTML/JS : 100
├── Images : 200
└── Autres : 1100
```

### Lignes de code
```
Total : ~50,000 lignes
├── Java : 10,000
├── JavaScript : 5,000
├── Python : 2,000
├── Bash : 3,000
└── Markdown : 30,000
```

---

## 🚀 OPTIMISATIONS

### Actuelles
- `.gitignore` optimisé
- Pas de `node_modules`
- Images compressées

### Futures
- Git LFS pour images
- Archivage vieux logs
- Compression assets
- CDN pour static

---

## 🔄 BACKUP & VERSIONING

### Git
- Commits fréquents
- Branches multivers
- Tags pour versions

### Stratégie
```
main (stable)
  ├── dev-* (développement)
  ├── feature-* (nouvelles features)
  └── timeline-* (univers alternatifs)
```

---

## 📝 CONVENTIONS NOMMAGE

### Fichiers
- `snake_case.md` : Documents
- `kebab-case.html` : Web
- `PascalCase.java` : Classes
- `SCREAMING_SNAKE.md` : Important

### Dossiers
- Emojis autorisés : `🏠 HOME/`
- Français accepté : `Essences scellées/`
- Underscore pour système : `__BOOT__/`

---

## 🚨 ZONES SENSIBLES

### Ne pas toucher
- `__AVALON___BOOT/` : Miroir système
- `.git/` : Historique Git
- `node_modules/` : Si présent

### Attention particulière
- `CORE/` : Moteur central
- `backend-clean/` : Production
- Fichiers `.temporal` : Magie active

---

*Cette infrastructure est vivante et évolue constamment !*