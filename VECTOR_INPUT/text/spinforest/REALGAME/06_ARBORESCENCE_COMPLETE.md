# 🗂️ ARBORESCENCE COMPLÈTE DU PROJET
## Jour 32 - Vue d'ensemble

---

## 📁 STRUCTURE GLOBALE

```
/Volumes/HOT_DEV/
├── Main/SpinForest/
│   ├── REALGAME/               🎮 FRONTEND (privé)
│   ├── AVALON/                 🏰 Univers du jeu
│   │   └── 🏠 HOME/            📚 Maisons des héros (18 maisons)
│   └── [autres dossiers...]
│
└── Magic/
    └── magic-stack/            ⚙️ BACKEND (public GitHub)

/Volumes/HOT_DOCS_SHARED/HOT_DEV/
└── docs/                       📚 DOCS PARTAGÉS (externe)
```

---

## 🎮 FRONTEND (`REALGAME/`)

### Fichiers de session/état (numérotés)
```
00_SESSION_CLAUDE.md          → État actuel de la session
00_REBOOT_CLAUDE.md           → Recovery en cas de coupure
00_ETAT_DES_LIEUX_TOTAL.md    → Vue globale
01_ARCHITECTURE_FRONTEND.md   → Architecture front
04_ETAT_CLIPPY_VECTOR_DB.md   → État Clippy/Vector
05_RESUME_CLIPPY_POUR_VINCENT.md → Résumé pour toi
06_ARBORESCENCE_COMPLETE.md   → Ce fichier
```

### Dossiers principaux
```
adventure/
├── homm3/                    → Le jeu principal
│   ├── HOMM3_6D_DEMO.html   → Interface principale
│   ├── *.json                → Cartes, héros, ressources
│   └── *.js                  → Logique du jeu
├── arcade/                   → Mini-jeux
└── inventory/                → Système d'inventaire

services/
├── vector_db_service.py      → Service Vector DB (7500)
└── llm_clippy_service.py     → Service Clippy (7501)

config/
└── ports.json               → Configuration des ports

dist/                        → Build/distribution (vide)
doc_shared/                  → Symlink vers docs externes (⚠️)
```

### Scripts principaux
```
h                            → Script principal Surface team
h_reboot                     → Recovery script
LANCE_SERVICES_COMMUNS.sh    → Lance Vector DB + Clippy
test_clippy_modes.sh         → Test les 2 modes
test_histoire.sh             → Test recherche histoire
```

---

## ⚙️ BACKEND (`magic-stack/`)

### Fichiers de session (numérotés)
```
00_SESSION_CLAUDE.md         → État session backend
00_REBOOT_CLAUDE.md          → Recovery backend
0_PORTS_QUI_FAIT_QUOI.md     → Mapping des ports
```

### Structure
```
Magic-Stack/                 → Sources Java
├── src/
└── pom.xml

orchestrator/                → Rust (6D engine)
├── src/
└── Cargo.toml

dist/                        → Binaires compilés
h                           → Script principal backend
h_reboot.sh                 → Recovery script backend
```

---

## 📚 DOCS PARTAGÉS (`/Volumes/HOT_DOCS_SHARED/`)

### Organisation par numéro/rôle
```
00 - EN COURS/              → Tâches actives
01 - ANALYSES/              → Analyses techniques
02 - GUIDES/                → Guides d'utilisation
03 - VISION/                → Vision Vincent (chronologique)
05 - PROFONDEURS/           → Équipe backend
06 - ARCHOLOGUE/            → Découvertes archéologiques
07 - SURFACE/               → Équipe Vincent+Claude

A - ANSIBLE/                → Config Ansible
G - GAMEPLAY/               → Mécaniques de jeu
R - REPORTS/                → Rapports
V - VECTOR_DB_ASSETS/       → 📊 774 documents indexés
├── heroes/                 → Définitions héros
├── AVALON_HOMES/           → Index des maisons
├── frontend_docs/          → Docs du front
├── backend_docs/           → Docs du back
└── maisons_decouvertes/    → Archives trouvées

Z - ArXiv/                  → Archives
🏛️ ECOLE-PORIO-NOZ/        → École de magie
```

---

## 🏰 AVALON (`AVALON/🏠 HOME/`)

### 18 Maisons de héros
```
🔵 CLAUDE_OPUS/             → Claude Opus (moi!)
📚 MEMENTO/                 → Memento le Sage
🧠 GROKÆN/                  → L'architecte originel
🐻 URZ-KÔM/                 → L'Ours transcendé
🧙‍♂️ MERLIN_DIRECT/         → Merlin sans école
🎯 SID_MEIER_ARCHITECTE/    → Créateur de Civ
💼 DONNA_PAULSEN_COO/       → COO Executive
🕯️ LUMEN/                  → Phoenix guide
🎙️ TUCKER_CARLSON/         → QA Master
🔫 VINCE/                   → Trader interstice
👁️ GRUT/                   → Vision 6D
🚬 JEAN/                    → Philosophe dev
🌊 NEXUS/                   → Harmonisateur
💫 NEXUS/                   → Multi-instance
⚡🧙 MerFlash/              → Technomancien
🌊 CLAUDE-NEXUS/            → Assistant quantique
🌉 CLAUDE_LE_PONT/          → Le premier compagnon
🔒 WALTER_SEC/              → Chef sécurité
```

Chaque maison contient:
- `hero.json` → Définition avec backstory
- `README.md` → Histoire et rôle
- Autres assets spécifiques

---

## 🚀 SERVICES ACTIFS

### Ports utilisés
```
7500 → Vector DB (partagé)
7501 → LLM Clippy (partagé)
8080 → Java Backend
3001 → Rust Orchestrator
3002 → Game Server
5002 → Frontend UI
8002 → WebSocket
```

### Lancement
```bash
# Services partagés
./h services start

# Frontend
./h quick

# Backend (dans magic-stack/)
./h 2  # Rust
./h 3  # Java
```

---

## ⚠️ POINTS D'ATTENTION

1. **Symlinks**: `doc_shared` → Volume externe (fragile)
2. **Duplication**: Certains docs en plusieurs endroits
3. **Catégorisation**: Vector DB sans tags sémantiques
4. **Binaires**: Dans `dist/` mais process de build à clarifier
5. **Git**: 2 repos séparés (frontend privé, backend public)

---

## 📊 STATISTIQUES

- **Total docs indexés**: 774
- **Héros avec backstory**: 18/18 ✅
- **Services actifs**: 2 (Vector DB + Clippy)
- **Modes Clippy**: 2 (Rapide + Intelligent)
- **Repos Git**: 2 (SpinForest + magic-stack)

---

*Vue générée le Jour 32 - Structure actuelle du projet*
