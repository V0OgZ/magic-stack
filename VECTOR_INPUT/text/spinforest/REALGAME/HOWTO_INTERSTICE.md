# HOWTO - GUIDE PRATIQUE INTERSTICE

## HOWTO LANCER

### 1. Démarrage rapide (tout en un)
```bash
./LANCE_BACKEND_RESISTANT.sh
```

### 2. Démarrage manuel
```bash
# Backend Java
cd magic-stack/backends/java
mvn spring-boot:run

# OU avec le JAR
java -jar target/magic-stack-backend-1.0.0-APOLLO.jar
```

### 3. Vérifier que ça marche
```bash
curl http://localhost:8080/api/magic/health
# Doit retourner: "MAGICAL"
```

---

## HOWTO DÉVELOPPER

### Ajouter un nouveau endpoint

1. Créer le DTO dans `magic-stack/backends/java/src/main/java/com/magicstack/dto/`
```java
public class MonDTO {
    private String champ;
    // getters/setters
}
```

2. Ajouter la méthode au controller
```java
@PostMapping("/mon-endpoint")
public MonDTO monEndpoint(@RequestBody MonDTO request) {
    // logique
    return response;
}
```

3. Compiler et tester
```bash
mvn compile
curl -X POST http://localhost:8080/api/interstice/mon-endpoint
```

### Ajouter une formule magique

1. Éditer `MagicEngineService.java`
2. Ajouter la formule dans `getAllFormulas()`
3. Implémenter la logique dans `cast()`

---

## HOWTO UPLOADER UN MAGE

### 1. Préparer les données
```json
{
  "entityId": "NOM_DU_MAGE",
  "entityData": {
    "name": "Nom Complet",
    "type": "Type de Mage",
    "level": 1,
    "memories": [],
    "skills": []
  }
}
```

### 2. Upload
```bash
curl -X POST http://localhost:8080/api/interstice/upload \
  -H "Content-Type: application/json" \
  -d '@donnees.json'
```

### 3. Vérifier
```bash
curl -X POST http://localhost:8080/api/interstice/download \
  -H "Content-Type: application/json" \
  -d '{"entityId": "NOM_DU_MAGE"}'
```

---

## HOWTO DEBUGGER

### Voir les logs
```bash
tail -f magic-stack-backend.log
```

### Tester un endpoint
```bash
# Avec curl et jq pour formatter
curl http://localhost:8080/api/interstice/status | jq .
```

### Redémarrer proprement
```bash
# Arrêter
kill $(cat magic-stack-backend.pid)

# Relancer
./LANCE_BACKEND_RESISTANT.sh
```

---

## HOWTO CRÉER UN NOUVEAU MAGE IA

1. **Créer son HOME**
```bash
mkdir -p "AVALON/🏠 HOME/[NOM]"
```

2. **Créer son hero.json**
```json
{
  "id": "hero_nom",
  "name": "Nom du Mage",
  "class": "Classe/Rôle",
  "level": 1,
  "bio": "Histoire du mage"
}
```

3. **L'uploader dans l'interstice**
```bash
# Via le script
cd REALGAME/postgræcia
./upload_all_heroes_from_mapping.py
```

4. **Créer son bootstrap**
   - Créer un fichier mémoire JSON
   - Y mettre son identité, sa mission
   - Le sauvegarder dans son HOME

---

## HOWTO COMPRENDRE LES ERREURS

### Backend ne démarre pas
- Vérifier Java: `java -version` (doit être 17+)
- Vérifier Maven: `mvn -version`
- Regarder les logs: `cat magic-stack-backend.log`

### Upload échoue
- Vérifier que le backend tourne: `curl http://localhost:8080/api/magic/health`
- Vérifier le JSON envoyé
- Regarder la réponse d'erreur

### Coordonnées 6D invalides
- X, Y, Z: nombres quelconques
- T: timestamp (secondes)
- C: entre 0 et 1
- Psi: entre -1 et 1

---

## STRUCTURE DES FICHIERS

```
SpinForest/
├── magic-stack/
│   └── backends/java/          # Backend principal
│       ├── src/main/java/      # Code source
│       └── target/             # JAR compilé
├── LANCE_BACKEND_RESISTANT.sh  # Script de lancement
├── magic-stack-backend.pid     # PID du processus
└── magic-stack-backend.log     # Logs
```

---

## COMMANDES ESSENTIELLES

```bash
# Lancer
./LANCE_BACKEND_RESISTANT.sh

# Vérifier
curl http://localhost:8080/api

# Arrêter
kill $(cat magic-stack-backend.pid)

# Logs
tail -f magic-stack-backend.log

# Compiler
cd magic-stack/backends/java && mvn compile
```

---

*Guide pratique - Magic Stack v1.0*