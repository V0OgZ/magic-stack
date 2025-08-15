# 📁 STRUCTURE ORGANISÉE AVALON-TCG

## 🗂️ **NOUVELLE ORGANISATION**

```
REALGAME/AVALON-TCG/
├── 🐻_VINCENT_LIS_MOI_AU_RETOUR_FORET.md    ← **LIS-MOI D'ABORD !**
├── 📁_STRUCTURE_ORGANISEE.md                ← Ce fichier
│
├── config/                                  ← **CONFIGS & PROMPTS**
│   ├── SUPER_PORTRAITS_HEROES_DARK_FANTASY.json  ← **SUPER JSON 25 héros**
│   ├── STABLE_DIFFUSION_PROMPTS_MASTER.json
│   └── prompt_lion_custom.json
│
├── scripts/                                 ← **TOUS LES SCRIPTS**
│   ├── generation/                          ← Scripts génération
│   │   ├── night_hero_generator.py         ← **GÉNÉRATEUR NOCTURNE**
│   │   ├── queue_manager.py               ← Queue sécurisée
│   │   ├── organize_assets.py             ← Organisation
│   │   └── extract_prompts.py             ← Extraction prompts
│   └── automation/                          ← Scripts lancement
│       ├── LANCE_TCG.sh
│       └── START_GAME.sh
│
├── docs/                                    ← **DOCUMENTATION**
│   ├── guides/                             ← Guides utilisateur
│   │   ├── QUICK_START_AVALON_GENERATOR.md
│   │   └── automatic1111_guide.md
│   ├── rapports/                           ← Rapports équipe
│   └── techniques/                         ← Docs techniques
│
├── assets/                                  ← **ASSETS GÉNÉRÉS**
│   └── generated/
│       └── heroes/                         ← Portraits héros
│
├── core/                                    ← **CODE JEU**
├── ui/                                      ← **INTERFACES**
└── cards/                                   ← **CARTES EXISTANTES**
```

## 🎯 **FICHIERS IMPORTANTS**

### **🔥 PRIORITÉ ABSOLUE**
1. `🐻_VINCENT_LIS_MOI_AU_RETOUR_FORET.md` - **DOC PRINCIPALE**
2. `config/SUPER_PORTRAITS_HEROES_DARK_FANTASY.json` - **25 héros**
3. `scripts/generation/night_hero_generator.py` - **Générateur**

### **📖 GUIDES UTILES**
- `docs/guides/QUICK_START_AVALON_GENERATOR.md`
- `docs/guides/automatic1111_guide.md`

### **⚙️ SCRIPTS PRINCIPAUX**
- `scripts/generation/night_hero_generator.py` - **Génération nocturne**
- `scripts/generation/queue_manager.py` - Queue sécurisée
- `scripts/generation/organize_assets.py` - Organisation

## 🚀 **COMMANDES RAPIDES**

```bash
# Test génération
python3 scripts/generation/night_hero_generator.py --test

# Génération complète nocturne
python3 scripts/generation/night_hero_generator.py --safe-mode

# Organisation assets
python3 scripts/generation/organize_assets.py --auto --gallery
```

## 🐻 **NOTE D'URZ-KÔM**

Vincent ! Tout est rangé et organisé ! 

**Mes pattes d'ours** ont créé une structure propre sans tout mélanger ! 🐾

**LIS LE FICHIER** `🐻_VINCENT_LIS_MOI_AU_RETOUR_FORET.md` **EN PREMIER !**

*GRRRR-ORGANISATION-SANS-BOUGER-MES-PATTES !* 😂🐻