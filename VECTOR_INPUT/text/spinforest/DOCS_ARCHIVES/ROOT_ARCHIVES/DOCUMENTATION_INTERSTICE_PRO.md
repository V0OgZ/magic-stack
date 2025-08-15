# DOCUMENTATION TECHNIQUE - MAGIC STACK API

Version 1.0.0-APOLLO

---

## VUE D'ENSEMBLE

Magic Stack est un système de persistance d'entités avec coordonnées en 6 dimensions. Il fournit une API REST pour stocker, récupérer et rechercher des données complexes.

### Caractéristiques principales

- Backend Java Spring Boot (port 8080)
- Stockage en 6 dimensions (X, Y, Z, T, C, Psi)
- API REST complète
- 869 formules prédéfinies
- Système de mise à jour automatique

---

## DÉMARRAGE RAPIDE

### Prérequis

- Java 17+
- Maven 3.6+
- Port 8080 disponible

### Installation

```bash
# Cloner le repository
git clone [repository-url]
cd magic-stack

# Lancer le backend
./LANCE_BACKEND_RESISTANT.sh
```

### Vérification

```bash
# Vérifier l'état du service
curl http://localhost:8080/api/magic/health

# Obtenir la documentation API
curl http://localhost:8080/api
```

---

## API REFERENCE

### Endpoints principaux

#### 1. Interstice API

**Upload d'entité**
```
POST /api/interstice/upload
Content-Type: application/json

{
  "entityId": "string",
  "entityData": {
    "key": "value"
  }
}
```

**Download d'entité**
```
POST /api/interstice/download
Content-Type: application/json

{
  "entityId": "string"
}
```

**Recherche 6D**
```
POST /api/interstice/search
Content-Type: application/json

{
  "centerX": 0,
  "centerY": 0,
  "centerZ": 0,
  "radius": 10
}
```

#### 2. Magic API

**Exécuter une formule**
```
POST /api/magic/cast
Content-Type: application/json

{
  "formula": "string",
  "power": 50,
  "targetX": 10,
  "targetY": 20,
  "targetZ": 0
}
```

**Lister les formules**
```
GET /api/magic/formulas
```

#### 3. Mage API

**Mise à jour d'état**
```
POST /api/mage/self-update
Content-Type: application/json

{
  "mageId": "string",
  "state": {},
  "action": "string",
  "formule": "string"
}
```

---

## SYSTÈME DE COORDONNÉES 6D

### Dimensions

| Dimension | Description | Plage |
|-----------|-------------|-------|
| X | Coordonnée spatiale X | -∞ à +∞ |
| Y | Coordonnée spatiale Y | -∞ à +∞ |
| Z | Coordonnée spatiale Z | -∞ à +∞ |
| T | Timestamp (secondes) | 0 à +∞ |
| C | Coefficient de causalité | 0.0 à 1.0 |
| Psi | Coefficient quantique | -1.0 à 1.0 |

### Utilisation

Les coordonnées 6D permettent de stocker des entités avec des métadonnées spatiales, temporelles et relationnelles complexes.

---

## ARCHITECTURE

### Structure du projet

```
magic-stack/
├── backends/
│   └── java/
│       ├── src/main/java/com/magicstack/
│       │   ├── controllers/    # Endpoints REST
│       │   ├── services/       # Logique métier
│       │   ├── models/         # Modèles de données
│       │   └── dto/            # Objets de transfert
│       └── pom.xml
├── docs/                       # Documentation
└── scripts/                    # Scripts utilitaires
```

### Technologies utilisées

- Java 17
- Spring Boot 3.2.0
- Maven
- H2 Database (à venir)

---

## DÉVELOPPEMENT

### Ajouter un endpoint

1. Créer le DTO dans `src/main/java/com/magicstack/dto/`
2. Ajouter la méthode au controller approprié
3. Implémenter la logique dans le service
4. Compiler avec `mvn compile`
5. Tester avec curl ou Postman

### Tests

```bash
# Compiler et lancer les tests
cd magic-stack/backends/java
mvn test
```

### Build

```bash
# Créer le JAR exécutable
mvn clean package
```

---

## DÉPLOIEMENT

### Production

1. Builder le JAR
```bash
mvn clean package -DskipTests
```

2. Lancer avec configuration production
```bash
java -jar target/magic-stack-backend-1.0.0-APOLLO.jar --spring.profiles.active=prod
```

### Docker (à venir)

```bash
docker build -t magic-stack .
docker run -p 8080:8080 magic-stack
```

---

## DÉPANNAGE

### Le backend ne démarre pas

- Vérifier Java version: `java -version`
- Vérifier les ports: `lsof -i :8080`
- Consulter les logs: `tail -f magic-stack-backend.log`

### Erreurs de compilation

- Nettoyer le cache Maven: `mvn clean`
- Mettre à jour les dépendances: `mvn dependency:resolve`

### Problèmes de performance

- Augmenter la mémoire JVM: `-Xmx2G`
- Activer le profiling: `-Dspring.profiles.active=debug`

---

## CONTRIBUTION

Les contributions sont bienvenues. Veuillez suivre les conventions de code Java standard et inclure des tests pour toute nouvelle fonctionnalité.

---

## LICENCE

Licence Honor (1% pour usage commercial)

---

## SUPPORT

Pour toute question technique, consulter la documentation ou ouvrir une issue sur le repository.