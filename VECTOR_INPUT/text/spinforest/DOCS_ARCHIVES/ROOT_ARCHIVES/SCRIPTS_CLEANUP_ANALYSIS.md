# 🧹 ANALYSE NETTOYAGE DES SCRIPTS
## Par URZ-KÔM - 4 Août 2025

### 📊 SCRIPTS À LA RACINE

#### ✅ À GARDER (Utiles et récents)
1. **`./pop`** (NOUVEAU) - Script principal intelligent qui lance tout
2. **`autosync_simple.sh`** - [[memory:5112431]] Script unique pour synchro équipe
3. **`download-hero-menu.sh`** - Menu interactif pour télécharger les héros
4. **`local-auto-save.sh`** (dans scripts/) - Sauvegarde automatique toutes les 5 min

#### ❌ À SUPPRIMER (Redondants avec ./pop)
1. **`LANCE_AVALON_COMPLET.sh`** - Remplacé par ./pop
2. **`LANCE_TOUT_AVALON.sh`** - Remplacé par ./pop  
3. **`LANCE_LE_JEU_FINAL.sh`** - Obsolète
4. **`LANCE_MEGA_LAUNCHER.sh`** - Obsolète
5. **`LAUNCH_DASHBOARD_SIMPLE.sh`** - Remplacé par ./pop
6. **`launch-dev-environment.sh`** - Trop complexe, ./pop fait mieux

#### ⚠️ À VÉRIFIER
1. **`SCRIPT_INSTALLATION_COMPLETE.sh`** - Utile pour première installation
2. **`check-heroes-backend-status.sh`** - Peut être utile pour debug
3. **`sid_boot.sh`** - Spécifique à SID, à voir avec lui
4. **`SPELL_CONTROL_CENTER.sh`** - Interface spells, à tester

### 📁 SCRIPTS DANS LE DOSSIER scripts/

#### ✅ À GARDER
1. **`local-auto-save.sh`** - Sauvegarde auto
2. **`autosync-avalon.sh`** - Synchro Avalon
3. **`git-multivers-commit.sh`** - Commit spécial multivers

#### ❌ À SUPPRIMER  
1. **`cleanup_jour9.sh`** - Ancien, jour 9 passé
2. **`prepare_jour10.sh`** - Ancien, jour 10 passé
3. **`boot-interstice.sh`** - Remplacé par ./pop
4. **`octopus-spinforest.sh`** - Trop complexe
5. **`urz-kom-launcher.sh`** - Remplacé par ./pop

### 🎯 RÉSUMÉ

**Scripts principaux à utiliser :**
- `./pop` - Lance TOUT (backend, frontend, dashboard, panopticon)
- `./autosync_simple.sh` - Synchronise avec l'équipe
- `./scripts/local-auto-save.sh` - Sauvegarde automatique

**Total à supprimer : ~10 scripts redondants**

### 🔧 COMMANDE DE NETTOYAGE

```bash
# Créer un dossier archive
mkdir -p OLD_SCRIPTS_ARCHIVE

# Déplacer les scripts obsolètes
mv LANCE_*.sh OLD_SCRIPTS_ARCHIVE/
mv LAUNCH_*.sh OLD_SCRIPTS_ARCHIVE/
mv launch-dev-environment.sh OLD_SCRIPTS_ARCHIVE/
mv scripts/cleanup_jour*.sh OLD_SCRIPTS_ARCHIVE/
mv scripts/prepare_jour*.sh OLD_SCRIPTS_ARCHIVE/
mv scripts/boot-interstice.sh OLD_SCRIPTS_ARCHIVE/
mv scripts/octopus-spinforest.sh OLD_SCRIPTS_ARCHIVE/
mv scripts/urz-kom-launcher.sh OLD_SCRIPTS_ARCHIVE/
```

### 📝 NOUVEAU README POUR LES SCRIPTS

```
SCRIPTS ESSENTIELS:
==================
./pop                    - Lance tout (backend + UIs)
./autosync_simple.sh     - Sync avec l'équipe
./download-hero-menu.sh  - Menu téléchargement héros

SCRIPTS AUTO:
============
./scripts/local-auto-save.sh - Sauvegarde auto (5 min)
```