# 🎯 Guide d'Implémentation - Architecture Propre Avalon
Par URZ-KÔM - Leader Magic Stack

## 📋 Résumé Exécutif

Ce guide explique comment implémenter l'architecture propre avec séparation claire entre :
- **Magic Stack** : Moteur magique 6D (formules, interstice, Q*, quantique)
- **Avalon Backend** : Logique de jeu (héros, combat, cartes, gameplay)

## 🔧 Étapes d'Implémentation

### 1. Nettoyage des Duplications

```bash
# Exécuter le script de nettoyage
chmod +x CLEAN_AVALON_BACKEND_DUPLICATIONS.sh
./CLEAN_AVALON_BACKEND_DUPLICATIONS.sh
```

Ce script supprime :
- Les services Magic Stack dupliqués dans avalon-backend
- Les modèles 6D qui appartiennent à Magic Stack
- Les contrôleurs qui sont purement Magic Stack

### 2. Configuration de l'Intégration

Les fichiers créés :
- `MagicStackConfig.java` : Configuration Spring pour Magic Stack
- `MagicStackClient.java` : Client REST centralisé
- `application.properties` : URLs et paramètres d'intégration

### 3. Pattern d'Utilisation

#### Exemple : Service de Mouvement de Héros

```java
@Service
public class HeroMovementService {
    @Autowired
    private MagicStackClient magicStackClient;
    
    public Movement moveHero(Long heroId, HexPosition target) {
        // 1. Convertir hex -> 6D via Magic Stack
        JsonNode pos6D = magicStackClient.hexToPosition6D(target.getQ(), target.getR());
        
        // 2. Planifier avec Q*
        JsonNode path = magicStackClient.executeQStar(params);
        
        // 3. Exécuter la formule de mouvement
        JsonNode result = magicStackClient.executeMagicFormula("hero_movement", params);
        
        // 4. Appliquer le résultat dans le jeu
        // ...
    }
}
```

### 4. Services à Adapter

Les services suivants doivent être modifiés pour utiliser MagicStackClient :

#### CombatService
```java
// AVANT (incorrect) :
@Autowired private UniversalWaveFunctionService waveService;

// APRÈS (correct) :
@Autowired private MagicStackClient magicStackClient;
// Utiliser : magicStackClient.executeMagicFormula("combat_damage", params)
```

#### MapGeneratorService
```java
// Pour générer une carte avec brouillard causal :
JsonNode mapParams = new HashMap<>();
mapParams.put("size", mapSize);
mapParams.put("causal_fog", true);
JsonNode generatedMap = magicStackClient.executeMagicFormula("generate_map", mapParams);
```

#### ShamanService
```java
// Pour lancer un sort shaman :
JsonNode spellResult = magicStackClient.executeMagicFormula(
    "shaman_cast", 
    Map.of("spell_id", spellId, "target", target)
);
```

## 🚀 Lancement de l'Architecture Complète

1. **Démarrer Magic Stack** :
```bash
cd spells/stack
./launch_magic_stack.sh
```

2. **Démarrer Avalon Backend** :
```bash
cd avalon-backend
mvn spring-boot:run
```

3. **Vérifier les connexions** :
```bash
./TEST_TOUS_ENDPOINTS.sh
```

## ⚠️ Points d'Attention

### Ne PAS faire :
- ❌ Copier le code de Magic Stack dans avalon-backend
- ❌ Créer des modèles Position6D, Interstice, etc. dans avalon-backend
- ❌ Implémenter des calculs quantiques dans avalon-backend

### FAIRE :
- ✅ Utiliser MagicStackClient pour tous les besoins magiques
- ✅ Garder seulement la logique de jeu dans avalon-backend
- ✅ Traiter Magic Stack comme une API externe

## 📊 Flux de Données

```
Frontend (RealGame)
    ↓
Avalon Backend (8080)
    ├── Logique de jeu
    ├── Persistance des héros/cartes
    └── Appels vers →
                    Magic Stack Router (5000)
                        ├── Java Backend (8082)
                        │   └── Formules, Interstice
                        └── Rust Backend (3001)
                            └── Q*, World State
```

## 🔍 Debugging

Si un service ne compile pas après le nettoyage :

1. **Identifier la dépendance manquante**
```bash
grep -r "UniversalWaveFunction" src/
```

2. **Remplacer par un appel Magic Stack**
```java
// Au lieu de : waveFunction.collapse()
// Utiliser : magicStackClient.executeMagicFormula("wave_collapse", params)
```

3. **Si la formule n'existe pas dans Magic Stack**
- Créer une issue dans le repo Magic Stack
- Implémenter temporairement une version simplifiée dans avalon-backend
- Marquer avec TODO pour migration future

## 📈 Prochaines Étapes

1. **Court terme** :
   - Adapter tous les services pour utiliser MagicStackClient
   - Supprimer tous les `.DISABLED`
   - Faire compiler avalon-backend

2. **Moyen terme** :
   - Migrer les formules manquantes vers Magic Stack
   - Optimiser les appels réseau (cache, batch)
   - Ajouter des tests d'intégration

3. **Long terme** :
   - Magic Stack en microservice déployé
   - Load balancing entre instances
   - Version publique de Magic Stack

## 🤝 Pour l'Équipe

- **Frontend** : Les endpoints restent les mêmes
- **Game Designers** : Les mécaniques ne changent pas
- **DevOps** : Nouveaux services à monitorer (5000, 8082, 3001)
- **QA** : Tester la latence des appels Magic Stack

## 📞 Support

- Documentation Magic Stack : `spells/stack/README.md`
- Architecture détaillée : `ARCHITECTURE_PROPRE_AVALON.md`
- Scripts utiles : `COMPILE_TOUT.sh`, `START_ALL_STACK.sh`

---
*"Une architecture propre est la clé de la scalabilité" - URZ-KÔM*