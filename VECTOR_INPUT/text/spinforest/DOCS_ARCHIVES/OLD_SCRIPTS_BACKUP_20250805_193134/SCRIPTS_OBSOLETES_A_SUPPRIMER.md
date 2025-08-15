# 🗑️ SCRIPTS OBSOLÈTES À SUPPRIMER - NEXUS

Vincent, voici les scripts de lancement obsolètes à nettoyer :

## ❌ SCRIPTS À SUPPRIMER

### 1. Scripts de lancement qui cherchent au mauvais endroit :
- `LANCE_AVALON_UNIFIE.sh` → Cherche dans spells/stack/backends/java qui n'existe pas
- `LANCE_TOUT_AVALON.sh` → Ancienne version
- `LANCE_BACKEND_6D.sh` → Obsolète
- `LANCE_BACKEND_SIMPLE.sh` → Trop basique
- `LANCE_BACKEND_RESISTANT.sh` → Hack temporaire
- `LANCE_AVALON_COMPLET.sh` → Remplacé par le nouveau

### 2. Scripts Python MerFlash (MOCKS) :
- `AVALON/🏠 HOME/⚡🧙 MerFlash/BACKEND_QUICK_START.sh`
- Tous les BACKEND_*.py dans MerFlash

### 3. Scripts dans les archives Museum :
- Tous les scripts dans `AVALON/🗣️ FORUM/🏛️ MUSEUM/archives/old-scripts/`
- Ce sont des vieux tests, plus utilisés

## ✅ SCRIPTS À GARDER

### Scripts principaux :
- `LANCE_AVALON_PROPRE.sh` → LE NOUVEAU ! 🎯
- `STOP_TOUTES_CONSOLES.sh` → Pour arrêter proprement
- `autosync_simple.sh` → Pour la sync [[memory:5112431]]

### Scripts spécifiques :
- `avalon-backend/start-postgræcia.sh` → Lance PostgreSQL
- `magic-stack/backends/rust/launch_rust_backend.sh` → Lance Rust
- `avalon-magic-api/lance-magic-api.sh` → Lance Magic API

## 🔧 COMMANDES POUR NETTOYER

```bash
# Supprimer les vieux scripts
rm LANCE_AVALON_UNIFIE.sh
rm LANCE_TOUT_AVALON.sh
rm LANCE_BACKEND_6D.sh
rm LANCE_BACKEND_SIMPLE.sh
rm LANCE_BACKEND_RESISTANT.sh
rm LANCE_AVALON_COMPLET.sh

# Ou tout d'un coup (PRUDENT !)
mkdir OLD_SCRIPTS_BACKUP
mv LANCE_*.sh OLD_SCRIPTS_BACKUP/
mv OLD_SCRIPTS_BACKUP/LANCE_AVALON_PROPRE.sh .
```

## 📝 NOUVEAU WORKFLOW

1. **Démarrer tout** : `./LANCE_AVALON_PROPRE.sh`
2. **Avec Magic API** : `./LANCE_AVALON_PROPRE.sh --with-magic-api`
3. **Arrêter tout** : `./STOP_TOUTES_CONSOLES.sh`
4. **Sync Git** : `./autosync_simple.sh`

## 🎯 BACKENDS ACTIFS

- **avalon-backend** (Java) → Port 8080 → PostgreSQL
- **magic-stack/backends/rust** → Port 3001 → Health/Status
- **frontend** → Port 8000 → Interface

---
*NEXUS - System Harmonizer - Nettoyage JOUR 23*