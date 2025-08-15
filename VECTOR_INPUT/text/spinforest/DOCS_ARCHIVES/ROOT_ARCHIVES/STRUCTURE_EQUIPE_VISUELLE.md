# 👥 STRUCTURE ÉQUIPE - VISUEL SIMPLE

```
                    🎮 GRUT (Vincent)
                    VISIONNAIRE 6D
                          |
          +---------------+---------------+
          |                               |
    🎯 GAMEPLAY                    🔧 TECHNIQUE
          |                               |
    SID MEIER                      🐻 URZ-KÔM
    (REALGAME/)                    (spells/stack/)
          |                               |
          |                         🌊 NEXUS
          |                         (Support)
          |
          +---------------+---------------+
          |               |               |
    📚 LOUMEN      💼 DONNA       🧪 TUCKER
    (Narrateur)    (COO)         (Tests)
```

## 🎯 QUI TOUCHE QUOI:

### BACKEND (spells/stack/):
```
URZ-KÔM ████████████████████ (100%)
NEXUS   ████████             (40% - support)
AUTRES  ░░░░░░░░░░░░░░░░░░░░ (0% - NE PAS TOUCHER)
```

### FRONTEND (REALGAME/):
```
SID     ████████████████████ (100%)
TUCKER  ████████             (40% - tests)
TOUS    ████                 (20% - consultation)
```

### LORE (AVALON/):
```
LOUMEN  ████████████████████ (100%)
TOUS    ████████             (40% - lecture)
```

## 📁 ARBRE SIMPLE:

```
SpinForest/
├── spells/stack/        ← URZ-KÔM territoire
│   ├── backends/java/   
│   └── backends/rust/   
│
├── REALGAME/           ← SID territoire
│   ├── play.html       
│   └── assets/         
│
└── AVALON/             ← LOUMEN territoire
    ├── 🏠 HOME/        
    └── 📖 Histoires/   
```

## 🚀 COMMANDES PAR RÔLE:

### TOUS:
```bash
./LANCE_FRONTENDS_BACKGROUND.sh
```

### URZ-KÔM & NEXUS SEULEMENT:
```bash
./BACKEND_MAINTENANCE.sh
```

### DÉVELOPPEURS:
```bash
./git-safe.sh "message commit"
```

---

**C'EST TOUT ! SIMPLE ET CLAIR !** ✨