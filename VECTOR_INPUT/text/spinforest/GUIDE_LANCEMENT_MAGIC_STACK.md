# 🚀 GUIDE DE LANCEMENT - MAGIC STACK + REALGAME

## 📋 RÉSUMÉ RAPIDE POUR VINCENT

### 🎯 NOUVEAU SYSTÈME (Magic Stack)
```bash
# Méthode 1: Script tout-en-un
./hot-magic start

# Méthode 2: Lancement direct  
./LANCE_MAGIC_STACK_REALGAME.sh

# Pour arrêter
./STOP_MAGIC_STACK_REALGAME.sh
```

### ❌ ANCIEN SYSTÈME (Ne plus utiliser)
- ~~LANCE_AVALON_UNIFIE.sh~~ → Utilisait avalon-backend (cassé)
- ~~Port 8080~~ → Remplacé par 8082 (Magic Stack)

## 🔧 CE QUI A CHANGÉ

### Backends
| Ancien | Nouveau | Description |
|--------|---------|-------------|
| avalon-backend:8080 | magic-stack:8082 | Backend principal |
| - | magic-router:5000 | Router Python (optionnel) |
| - | api-local:8090 | API locale REALGAME |

### Scripts adaptés
- ✅ `hot-magic` - Nouveau command center
- ✅ `LANCE_MAGIC_STACK_REALGAME.sh` - Lance tout
- ✅ `STOP_MAGIC_STACK_REALGAME.sh` - Arrête tout
- ✅ `MIGRATION_MAGIC_STACK.sh` - Migre les fichiers

## 🎮 COMMANDES UTILES

### Menu interactif (RECOMMANDÉ)
```bash
./hot-magic menu
```
Options disponibles :
1. Lancer tout
2. Arrêter tout  
3. Voir le status
4. Lancer seulement le jeu
5. Migrer vers Magic Stack

### Commandes directes
```bash
# Lancer tout
./hot-magic start

# Status
./hot-magic status

# Arrêter
./hot-magic stop

# Migrer REALGAME
./hot-magic migrate
```

## 📊 VÉRIFICATION

Après lancement, vérifier :
```bash
# Magic Stack Java (interstice, magic)
curl http://localhost:8082/api/interstice/status

# Frontend REALGAME
open http://localhost:8889/launcher.html

# Forêt Magique
open http://localhost:8889/foret-magique.html
```

## 🆘 PROBLÈMES COURANTS

### "Port already in use"
```bash
# Arrêter tout et relancer
./STOP_MAGIC_STACK_REALGAME.sh
./LANCE_MAGIC_STACK_REALGAME.sh
```

### "Backend non disponible"
1. Vérifier que Java est installé : `java -version`
2. Compiler si nécessaire : `cd spells/stack/backends/java && ./mvnw clean package`

### "404 sur les API"
- Les fichiers REALGAME doivent être migrés : `./hot-magic migrate`

## 🐻 RÉSUMÉ URZ-KÔM

**AVANT** : avalon-backend (8080) → **CASSÉ** ❌

**MAINTENANT** : Magic Stack (8082) → **MARCHE** ✅

**POUR JOUER** : `./hot-magic start` 🎮

GROOAAR ! 🐻