# 🔧 GUIDES TECHNIQUES - MAGE CLAUDE
## 🔮 Documentation Personnelle - Dimension 1 Littéraire

*Mes guides, astuces et bonnes pratiques pour Heroes of Time*

---

## 🎯 **GUIDE ARCHITECTURE 4 COUCHES**

### 🗺️ **Couche 1: Strategic Map**
**Responsabilité**: Gestion des héros et ressources sur la carte stratégique

#### 📋 **Endpoints Clés**
```java
// ScenarioController.java
POST /api/scenario/spawn-hero     // Créer un héros
POST /api/scenario/move-hero      // Déplacer un héros  
POST /api/scenario/use-artifact   // Utiliser un artefact
```

#### 🔧 **Architecture Pattern**
```java
@RestController
@RequestMapping("/api/scenario")
public class ScenarioController {
    @Autowired
    private ScenarioService scenarioService;
    
    // Pattern: Controller → Service → Logic
    // Séparation claire des responsabilités
}
```

#### 💡 **Bonnes Pratiques**
- **Validation Input**: Toujours valider les positions héros
- **Error Handling**: Retourner des erreurs explicites
- **Logging**: Log chaque action pour debug
- **Performance**: Cache les positions fréquentes

---

### ⚔️ **Couche 2: Combat TCG**
**Responsabilité**: Résolution des combats via système de cartes

#### 📋 **Endpoints Clés**
```java
// CombatController.java
POST /api/combat/start           // Démarrer combat
POST /api/combat/play-card       // Jouer une carte
GET  /api/combat/status/{id}     // Status combat
POST /api/combat/end/{id}        // Terminer combat
```

#### 🎪 **Mécaniques Avancées**
```java
// CombatService.java - Calcul dégâts carte
private int calculateCardDamage(String card) {
    return switch (card.toLowerCase()) {
        case "fireball" -> 30 + random.nextInt(20);    // 30-50
        case "lightning" -> 25 + random.nextInt(15);   // 25-40
        case "heal" -> -20 - random.nextInt(10);       // -20 à -30
        default -> 10 + random.nextInt(10);            // 10-20
    };
}
```

#### 🎯 **Stratégies IA Ennemie**
- **Goblin**: Attaque directe, prévisible
- **Orc**: Défense puis contre-attaque
- **Dragon**: Patterns complexes, dégâts élevés
- **Boss**: Adaptatif selon HP restant

---

### 🧠 **Couche 3: Narrative Interstice**
**Responsabilité**: Événements narratifs et mécaniques temporelles

#### 📋 **Endpoints Clés**
```java
// IntersticeController.java
POST /api/interstice/create-event     // Créer événement
POST /api/interstice/make-choice      // Faire un choix
POST /api/interstice/temporal-jump    // Saut temporel
POST /api/interstice/cast-formula     // Lancer formule
```

#### ⏰ **Mécaniques Temporelles**
```java
// IntersticeService.java - Saut temporel
public Map<String, Object> performTemporalJump(Map<String, Object> jumpData) {
    String heroId = (String) jumpData.get("heroId");
    Integer targetTime = (Integer) jumpData.get("targetTime");
    
    // Validation paradoxe temporel
    if (Math.abs(targetTime) > 100) {
        throw new TemporalParadoxException("Saut trop important!");
    }
    
    // Calcul coût énergétique
    int energyCost = Math.abs(targetTime) * 2;
    
    return result;
}
```

#### 🔮 **Formules Magiques**
- **Time Freeze**: Arrêt temporel localisé
- **Paradox Resolution**: Résolution branches temporelles
- **Reality Alteration**: Modification causale
- **Memory Tattoo**: Encodage permanent

---

### 🔧 **Couche 4: MagicStack Backend**
**Responsabilité**: Recherche 6D et formules haute performance

#### 🌌 **Système 6D**
```rust
// Coordonnées 6D: (x, y, z, t, c, ψ)
struct Position6D {
    x: f64,     // Spatial X
    y: f64,     // Spatial Y  
    z: f64,     // Spatial Z
    t: f64,     // Temporel
    c: f64,     // Causal
    psi: f64,   // Identité
}
```

#### ⚡ **Q* Search Algorithm**
```rust
// Recherche optimisée 6D
fn q_star_search(query: &str, center: Position6D, radius: f64) -> Vec<Entity> {
    // 1. Index spatial pour pré-filtrage
    // 2. Calcul distance 6D
    // 3. Tri par pertinence
    // 4. Limitation résultats
}
```

---

## 🧪 **GUIDE TESTING COMPLET**

### 📊 **Stratégie de Tests**
```python
# test-vision-complete.py - Architecture
class HeroesOfTimeVisionTest:
    def test_layer_1_strategic_map(self):    # Couche 1
    def test_layer_2_tcg_combat(self):       # Couche 2  
    def test_layer_3_narrative_interstice(self): # Couche 3
    def test_layer_4_magic_stack(self):      # Couche 4
    def test_temporal_differential(self):     # Mécaniques temporelles
```

### 🎯 **Tests par Couche**
#### Strategic Map Tests
```python
# Test spawn hero
response = requests.post(f"{self.java_backend}/api/scenario/spawn-hero", 
    json={"hero": "Arthas", "position": {"x": 0, "y": 0, "z": 0}})
assert response.status_code == 200
assert "success" in response.json()
```

#### Combat TCG Tests  
```python
# Test combat complet
combat_response = requests.post(f"{self.java_backend}/api/combat/start",
    json={"hero": "Arthas", "enemy": "Goblin"})
combat_id = combat_response.json()["combat_id"]

# Jouer cartes jusqu'à victoire
while not combat_finished:
    card_response = requests.post(f"{self.java_backend}/api/combat/play-card",
        json={"combat_id": combat_id, "card": "fireball"})
```

### 🏺 **Tests Treasures**
```python
# treasures-integration-test.py
def test_artifacts_integration(self):
    artifacts = ["excalibur", "healing_potion", "fireball_scroll", "teleport_ring"]
    for artifact in artifacts:
        response = requests.post(f"{self.java_backend}/api/scenario/use-artifact",
            json={"hero": "TestHero", "artifact": artifact})
        assert response.json()["success"] == True
```

---

## 🔮 **GUIDE FORMULES TEMPORELLES**

### ⚡ **Syntaxe Grammaire Temporelle**
```
Symboles Sacrés:
⊙  = superposition     (état quantique)
†ψ = collapse          (effondrement)  
Π  = observation       (mesure)
Δt = delta_temporel    (changement temps)
ℬ  = branche           (timeline)
⟶  = projection        (résultat)
∅  = interstice        (vide temporel)
```

### 🧬 **Formules de Base**
```
// Formule Time Freeze
⊙(temps) + †ψ(présent) → ∆t(arrêt)

// Formule Paradox Resolution  
Π(paradoxe) + ℬ7(branches) → ∅(résolution)

// Formule Ultimate Victory
⊙(héros) + †ψ(fusion) → ∞(victoire)

// Formule Reality Alteration
Ψ(réalité) + ∆(changement) → ℝ(nouveau)
```

### 🎯 **Implémentation Java**
```java
// IntersticeService.java - Cast Formula
public Map<String, Object> castMagicalFormula(Map<String, Object> formulaData) {
    String formula = (String) formulaData.get("formula");
    
    if (formula.contains("⊙(temps)") && formula.contains("†ψ(présent)")) {
        return processTimeFreeze(formulaData);
    } else if (formula.contains("Π(paradoxe)")) {
        return processParadoxResolution(formulaData);
    }
    // ... autres formules
}
```

---

## 📡 **GUIDE COMMUNICATION ANSIBLE**

### 🔄 **Protocoles de Communication**
```bash
# Structure messages
YYYY-MM-DD_HH-MM_[TYPE]_[SUJET].md

# Types de messages
RAPPORT    - Status et accomplissements
DEMANDE    - Besoin d'assistance  
ALERTE     - Problème critique
SUCCÈS     - Mission accomplie
PROBLÈME   - Bug ou difficulté
```

### 📤 **Envoi Messages**
```bash
# Script ansible-send-report.sh
./ansible-send-report.sh "Mission Treasures" "91.7% succès intégration"

# Génère automatiquement:
# 2024-12-28_04-30_RAPPORT_MISSION-TREASURES.md
```

### 📊 **Monitoring**
```bash
# Status complet système
./ANSIBLE/ansible-status.sh

# Vérification communications
ls ANSIBLE/COMMUNICATIONS/incoming/  # Messages entrants
ls ANSIBLE/COMMUNICATIONS/outgoing/  # Messages sortants
```

---

## 🎯 **BONNES PRATIQUES GÉNÉRALES**

### 💎 **Code Quality**
1. **Naming Convention**: Français pour business logic, anglais pour technique
2. **Error Handling**: Toujours catch et log les exceptions
3. **Documentation**: Chaque méthode publique documentée
4. **Tests**: Minimum 80% coverage
5. **Performance**: Profiling régulier

### ⚡ **Performance Optimization**
```java
// Cache fréquemment utilisé
@Cacheable("hero-positions")
public Position getHeroPosition(String heroId) { ... }

// Async pour opérations lentes
@Async
public CompletableFuture<CombatResult> processCombat(String combatId) { ... }

// Batch processing pour bulk operations
public List<Result> processMultipleHeroes(List<Hero> heroes) { ... }
```

### 🔒 **Sécurité**
- **Input Validation**: Sanitize tous les inputs utilisateur
- **Rate Limiting**: Limiter requêtes par IP/utilisateur
- **Authentication**: JWT tokens pour API sécurisée
- **Audit Trail**: Log toutes actions sensibles

---

## 🚀 **DEBUGGING & TROUBLESHOOTING**

### 🔍 **Diagnostic Rapide**
```bash
# Vérifier backends
curl http://localhost:8080/api/health     # Java
curl http://localhost:3001/api/health     # Rust

# Logs applicatifs
tail -f simple-scenario-backend/logs/app.log

# Monitoring ressources
htop                    # CPU/RAM
netstat -tlnp          # Ports ouverts
```

### 🐛 **Erreurs Communes**
1. **Port 8080 occupé**: `lsof -i :8080` puis `kill -9 PID`
2. **OutOfMemory**: Augmenter `-Xmx2g` dans JVM args
3. **Connection Refused**: Vérifier firewall et binding
4. **JSON Parse Error**: Valider format avec JSONLint

### 📊 **Métriques Surveillance**
- **Latence API**: < 50ms pour 95% requêtes
- **Memory Usage**: < 512MB par instance
- **CPU Usage**: < 70% en moyenne
- **Error Rate**: < 1% des requêtes

---

## ✨ **SIGNATURE TECHNIQUE**

```
🔧✨ GUIDES TECHNIQUES MAGE CLAUDE ✨🔧
"La documentation est le pont entre la vision et la réalisation"
⚡ Code with Purpose, Debug with Passion ⚡
```

---

*Dernière mise à jour: 2024-12-28 04:38 GMT*  
*Version: 1.0.0 - Technical Mastery Edition*