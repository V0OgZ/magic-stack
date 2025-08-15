# 🔧 DOCUMENTATION DÉVELOPPEUR - MAGIC STACK
## 📚 Guide Technique Complet pour les Développeurs

**Version** : 2.0 - DAY 7  
**Auteur** : PRIMUS - Premier Disciple  
**Pour** : Équipe de Développement AVALON

---

## 🎯 **OVERVIEW TECHNIQUE**

La Magic Stack est le **cœur unifié** de tous les systèmes magiques d'AVALON. Elle fournit :
- **Interprétation** des formules en grammaire temporelle
- **Exécution** des sorts via le moteur Python
- **Traduction** multi-format selon les classes de personnages
- **Intégration** avec le backend Spring Boot

---

## 🏗️ **ARCHITECTURE SYSTÈME**

### **📁 Structure des Fichiers**
```
spells/stack/
├── magic_core.py              # Moteur principal
├── grammaire_temporelle.json  # Définitions grammaticales
├── spell_translation_service.py # Service de traduction
├── grimoire/                   # Bibliothèque de sorts
│   ├── bibliotheque_complete_sorts_avalon.json
│   ├── sorts_bootstrap_primus.json
│   └── [autres sorts...]
├── docs_architecture/          # Documentation architecture
├── docs_gameplay/              # Documentation gameplay
├── docs_dev/                   # Documentation développeur (ici)
├── docs_grammaire/             # Documentation grammaire
└── docs_tests/                 # Documentation tests
```

### **🔄 Flux de Données**
```
[Formule Entrée] 
    ↓
[magic_core.py - Parsing]
    ↓
[Grammaire Temporelle - Validation]
    ↓  
[Exécution Moteur]
    ↓
[spell_translation_service.py - Formatage]
    ↓
[Sortie Formatée selon Classe]
```

---

## 🐍 **API PYTHON CORE**

### **magic_core.py - Moteur Principal**

#### **Classe MagicCore**
```python
class MagicCore:
    def __init__(self, grammaire_path="grammaire_temporelle.json"):
        """Initialise le moteur magique"""
        
    def parse_formula(self, formula: str) -> ParsedFormula:
        """Parse une formule en grammaire temporelle"""
        
    def execute_spell(self, parsed_formula: ParsedFormula) -> SpellResult:
        """Exécute un sort parsé"""
        
    def validate_syntax(self, formula: str) -> ValidationResult:
        """Valide la syntaxe d'une formule"""
```

#### **Exemple d'Utilisation**
```python
from magic_core import MagicCore

# Initialisation
magic = MagicCore()

# Parse et exécute une formule
formula = "⊙(Δt+2 ⟶ ψ_TELEPORT([Arthur], @10,10))"
parsed = magic.parse_formula(formula)
result = magic.execute_spell(parsed)

print(f"Succès: {result.success}")
print(f"Effets: {result.effects}")
```

### **spell_translation_service.py - Service de Traduction**

#### **Classes Principales**
```python
class CharacterClass(Enum):
    WARRIOR = "WARRIOR"     # 🗡️ → ICONIQUE
    MAGE = "MAGE"          # 🔮 → QUANTIQUE
    DRUID = "DRUID"        # 🌲 → RUNIQUE
    PALADIN = "PALADIN"    # ⚔️ → LITTÉRAIRE

class SpellTranslationService:
    def translate_spell(self, response: MagicCastResponse, 
                       caster_class: CharacterClass) -> SpellDisplayResult:
        """Traduit un sort selon la classe du personnage"""
```

#### **Capillaires de Formatage**
```python
# Interface commune
class FormatCapillary(ABC):
    @abstractmethod
    def format(self, response: MagicCastResponse) -> SpellDisplayResult:
        pass

# Implémentations spécifiques
class IconicCapillary(FormatCapillary):    # Guerriers
class QuantumCapillary(FormatCapillary):   # Mages
class RunicCapillary(FormatCapillary):     # Druides
class LiteraryCapillary(FormatCapillary):  # Paladins
```

---

## 📝 **GRAMMAIRE TEMPORELLE**

### **Symboles de Base**
```json
{
  "symbols": {
    "⊙": {"type": "superposition", "description": "État quantique superposé"},
    "†ψ": {"type": "collapse", "description": "Effondrement quantique"},
    "Π": {"type": "observation", "description": "Observation forcée"},
    "Δt": {"type": "temporal_delta", "description": "Décalage temporel"},
    "ℬ": {"type": "branch", "description": "Branche temporelle"},
    "⟶": {"type": "projection", "description": "Projection vers état"},
    "∅": {"type": "interstice", "description": "Vide entre dimensions"},
    "⚡": {"type": "bootstrap", "description": "Paradoxe Bootstrap"},
    "∞": {"type": "infinity", "description": "Cycle infini"},
    "⟲": {"type": "recursion", "description": "Récursion contrôlée"}
  }
}
```

### **Patterns de Formules**
```python
# Téléportation simple
"⊙(Δt+0 ⟶ ψ_TELEPORT([Cible], Position))"

# Sort de dégâts avec délai
"⊙(Δt+2 ⟶ †ψ_DAMAGE([Cible], Valeur))"

# Bootstrap paradox
"⚡⊙(Sort) + ∞(Cycle) + †ψ(Auto_génération)"

# Superposition spatiale
"⊙(Position_1) + ⊙(Position_2) + ∅(Ubiquité)"
```

---

## 🔌 **INTÉGRATION BACKEND JAVA**

### **Modèles Java Requis**

#### **CharacterClass.java**
```java
public enum CharacterClass {
    WARRIOR, MAGE, DRUID, PALADIN, BEAR, TECHNOMANCER, DEFAULT
}
```

#### **SpellDisplayResult.java**
```java
@Data
@Builder
public class SpellDisplayResult {
    private String displayMode;        // ICONIC, QUANTUM, RUNIC, LITERARY
    private String primaryContent;     // Contenu principal formaté
    private List<Map<String, Object>> effects;  // Effets formatés
    private String animation;          // Type d'animation
    private String visualTheme;        // Thème visuel
    private Map<String, Object> metadata;  // Métadonnées
}
```

### **Service Java Principal**
```java
@Service
public class SpellTranslationService {
    
    private final Map<CharacterClass, FormatCapillary> capillaries;
    
    public SpellDisplayResult translateSpell(MagicCastResponse response, 
                                           CharacterClass casterClass) {
        FormatCapillary capillary = capillaries.get(casterClass);
        return capillary.format(response);
    }
}
```

### **Intégration dans GameController**
```java
@PostMapping("/magic/cast")
public ResponseEntity<GameMagicResult> castSpellInGame(
        @RequestBody GameMagicRequest request) {
    
    // Exécution du sort
    MagicCastResponse magicResponse = magicCastService.cast(magicRequest);
    
    // Traduction selon la classe
    CharacterClass casterClass = determineCharacterClass(caster);
    SpellDisplayResult displayResult = spellTranslationService
        .translateSpell(magicResponse, casterClass);
    
    magicResponse.setDisplayResult(displayResult);
    return ResponseEntity.ok(gameResult);
}
```

---

## 🧪 **TESTS ET VALIDATION**

### **Tests Python**
```python
# Test du moteur principal
def test_magic_core():
    magic = MagicCore()
    formula = "⊙(Δt+0 ⟶ ψ_FIREBALL([Target], 50))"
    
    # Test parsing
    parsed = magic.parse_formula(formula)
    assert parsed.is_valid
    
    # Test exécution
    result = magic.execute_spell(parsed)
    assert result.success
    assert "DAMAGE" in result.effects

# Test du service de traduction
def test_translation_service():
    service = SpellTranslationService()
    
    # Test pour chaque classe
    for char_class in CharacterClass:
        result = service.simulate_cast_and_translate(
            "FIREBALL(target, 50)", "SIMPLE", char_class
        )
        assert result.display_mode in ["ICONIC", "QUANTUM", "RUNIC", "LITERARY"]
```

### **Tests Java**
```java
@Test
public void testSpellTranslation() {
    SpellTranslationService service = new SpellTranslationService();
    
    MagicCastResponse response = createTestResponse();
    SpellDisplayResult result = service.translateSpell(response, CharacterClass.MAGE);
    
    assertEquals("QUANTUM", result.getDisplayMode());
    assertTrue(result.getPrimaryContent().contains("⊙"));
}
```

---

## 🚀 **DÉPLOIEMENT ET INTÉGRATION**

### **Configuration Python**
```python
# Configuration du moteur
MAGIC_CORE_CONFIG = {
    "grammaire_path": "grammaire_temporelle.json",
    "grimoire_path": "grimoire/",
    "max_recursion_depth": 4,
    "quantum_coherence_threshold": 0.8,
    "bootstrap_paradox_enabled": True
}
```

### **Configuration Spring Boot**
```properties
# application.properties
avalon.magic.translation.enabled=true
avalon.magic.capillaries.warrior=IconicCapillary
avalon.magic.capillaries.mage=QuantumCapillary
avalon.magic.capillaries.druid=RunicCapillary
avalon.magic.capillaries.paladin=LiteraryCapillary
```

### **Endpoints API**
```
POST /api/magic/cast
  - Ajoute displayResult dans la réponse
  
GET /api/magic/translation/classes
  - Retourne les classes supportées
  
POST /api/magic/translation/preview
  - Prévisualise la traduction d'une formule
```

---

## 🔧 **DÉVELOPPEMENT ET EXTENSION**

### **Ajouter une Nouvelle Classe**
1. **Enum** : Ajouter dans `CharacterClass`
2. **Capillaire** : Créer nouvelle implémentation `FormatCapillary`
3. **Service** : Enregistrer dans `SpellTranslationService`
4. **Tests** : Ajouter tests de validation

### **Ajouter de Nouveaux Sorts**
1. **Grammaire** : Définir patterns dans `grammaire_temporelle.json`
2. **Grimoire** : Ajouter sorts dans `grimoire/`
3. **Moteur** : Étendre `magic_core.py` si nécessaire
4. **Traduction** : Adapter les capillaires

### **Optimisation Performance**
```python
# Cache des formules parsées
@lru_cache(maxsize=1000)
def parse_formula_cached(formula: str) -> ParsedFormula:
    return magic_core.parse_formula(formula)

# Pool de workers pour traitement parallèle
from concurrent.futures import ThreadPoolExecutor

executor = ThreadPoolExecutor(max_workers=4)
```

---

## 📊 **MÉTRIQUES ET MONITORING**

### **Métriques Python**
```python
import time
import logging

class MagicMetrics:
    def __init__(self):
        self.spell_count = 0
        self.execution_times = []
        
    def record_spell_execution(self, duration: float):
        self.spell_count += 1
        self.execution_times.append(duration)
        
    def get_stats(self):
        return {
            "total_spells": self.spell_count,
            "avg_execution_time": sum(self.execution_times) / len(self.execution_times),
            "success_rate": self.calculate_success_rate()
        }
```

### **Logging Configuration**
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('magic_stack.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger('MagicStack')
```

---

## 🔒 **SÉCURITÉ ET VALIDATION**

### **Validation des Formules**
```python
class FormulaValidator:
    DANGEROUS_PATTERNS = [
        r"†ψ.*REALITY_COLLAPSE",  # Collapse de réalité
        r"∞.*INFINITE_LOOP",      # Boucles infinies
        r"⟲{5,}",                 # Récursion excessive
    ]
    
    def is_safe_formula(self, formula: str) -> bool:
        for pattern in self.DANGEROUS_PATTERNS:
            if re.search(pattern, formula):
                return False
        return True
```

### **Rate Limiting**
```python
from functools import wraps
import time

def rate_limit(max_calls: int, time_window: int):
    def decorator(func):
        calls = []
        
        @wraps(func)
        def wrapper(*args, **kwargs):
            now = time.time()
            calls[:] = [call for call in calls if call > now - time_window]
            
            if len(calls) >= max_calls:
                raise Exception("Rate limit exceeded")
                
            calls.append(now)
            return func(*args, **kwargs)
        return wrapper
    return decorator

@rate_limit(max_calls=100, time_window=60)
def execute_spell(formula: str):
    # Exécution du sort
    pass
```

---

## 📚 **RESSOURCES ET RÉFÉRENCES**

### **Documentation Connexe**
- `docs_architecture/README.md` - Architecture générale
- `docs_gameplay/README.md` - Utilisation en jeu
- `docs_grammaire/README.md` - Grammaire temporelle détaillée
- `docs_tests/README.md` - Tests et validation

### **Exemples Complets**
- `grimoire/` - Bibliothèque de sorts de référence
- `PRIMUS_96_NOUVEAUX_POUVOIRS_GRAMMAIRE_TEMPORELLE.json` - 96 nouveaux sorts

### **Outils de Développement**
```bash
# Tests
python -m pytest tests/

# Linting
flake8 magic_core.py spell_translation_service.py

# Coverage
coverage run -m pytest
coverage report
```

---

## 🚀 **PROCHAINES ÉTAPES**

### **Roadmap Technique**
1. **Phase 1** : Finaliser intégration Java backend
2. **Phase 2** : Optimisation performance et cache
3. **Phase 3** : Extension avec nouveaux types de sorts
4. **Phase 4** : Interface graphique 2D

### **Contributions**
- **Issues** : Rapporter bugs via le système de tickets
- **Pull Requests** : Suivre les conventions de code
- **Tests** : Maintenir 100% de couverture

---

**🔮 La Magic Stack est prête pour révolutionner AVALON !**

*Documentation maintenue par PRIMUS - Premier Disciple*  
*Dernière mise à jour : DAY 7*