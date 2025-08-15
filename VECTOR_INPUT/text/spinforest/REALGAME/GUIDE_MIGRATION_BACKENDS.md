# 🔌 GUIDE MIGRATION BACKENDS - REALGAME → MAGIC STACK

## 📊 SITUATION ACTUELLE

### ❌ CE QUI EST CASSÉ
- **Avalon-backend** (port 8080) - SUPPRIMÉ/CASSÉ
- Tous les appels à `localhost:8080` ne marchent plus

### ✅ CE QUI MARCHE
- **Magic Stack Java** (port 8082) - OPÉRATIONNEL
- **Magic Stack Router Python** (port 5000) - RECOMMANDÉ
- **Magic Stack Rust** (port 3001) - Pour Q* search

## 🎯 ENDPOINTS DISPONIBLES DANS MAGIC STACK

### Interstice (CE DONT TU AS BESOIN !)
```
✅ GET  /api/interstice/status    - Récupérer les entités
✅ POST /api/interstice/upload    - Sauvegarder entités
✅ POST /api/interstice/download  - Charger une entité
✅ POST /api/interstice/search    - Recherche 6D
```

### Magic System
```
✅ POST /api/magic/cast          - Lancer un sort
✅ GET  /api/magic/formulas      - Liste des formules
✅ GET  /api/magic/history       - Historique des sorts
```

### Mage Operations
```
✅ POST /api/mage/self-update    - Update position mage
✅ POST /api/mage/cast-and-play  - Cast + action de jeu
```

## 🚀 COMMENT MIGRER

### Option 1: AUTOMATIQUE (Recommandé)
```bash
cd REALGAME
chmod +x MIGRATION_MAGIC_STACK.sh
./MIGRATION_MAGIC_STACK.sh
# Choisir option 1 (Router 5000) ou 2 (Java 8082)
```

### Option 2: MANUEL
1. Ouvrir chaque fichier HTML dans REALGAME
2. Remplacer `localhost:8080` par :
   - `localhost:5000` (via router) OU
   - `localhost:8082` (direct Java)

### Option 3: UTILISER api-config.js
```javascript
// Dans tes fichiers HTML, ajouter :
<script src="api-config.js"></script>
<script>
    // Puis utiliser :
    fetch(getApiUrl('INTERSTICE_STATUS'))
    // Au lieu de :
    fetch('http://localhost:8080/api/interstice/status')
</script>
```

## 📋 FICHIERS À MIGRER

Principaux fichiers REALGAME qui utilisent l'API :
- `play.html` - DÉJÀ MIGRÉ vers 8082 ✅
- `unified-game-experience.html` - À MIGRER
- `heroes-of-time-complete.html` - À MIGRER
- `heroes-of-time-api-based.html` - À MIGRER
- Autres dans AVALON-TCG/

## 🔧 LANCER MAGIC STACK

```bash
# Option 1: Tout lancer
cd spells/stack
./launch_magic_stack.sh

# Option 2: Juste Java
cd spells/stack/backends/java
./mvnw spring-boot:run

# Option 3: Via le JAR
java -jar spells/stack/backends/java/target/magic-stack-*.jar
```

## ✅ TESTER LA MIGRATION

```bash
# Tester Magic Stack
curl http://localhost:8082/api/interstice/status
# ou
curl http://localhost:5000/api/interstice/status

# Lancer REALGAME
open REALGAME/launcher.html
```

## 🐻 RÉSUMÉ POUR VINCENT

1. **Avalon-backend (8080)** → **Magic Stack (8082 ou 5000)**
2. Les endpoints `/api/interstice/*` EXISTENT dans Magic Stack
3. Lance le script `MIGRATION_MAGIC_STACK.sh` pour migrer automatiquement
4. Magic Stack = ton nouveau backend principal !

GROOAAR ! 🐻