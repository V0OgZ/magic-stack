# 🛠️ HEROES OF TIME - TECHNICAL GUIDE (ENGLISH)

**🎯 Complete technical documentation for developers and AI**

---

## 🏗️ **TECHNICAL ARCHITECTURE**

### **Backend: Spring Boot (Java)**
```
avalon-backend/
├── controllers/
│   ├── GameController.java           # Game + Magic unified
│   ├── MagicCastController.java      # 869 formulas engine
│   └── FormulaExplorerController.java
├── services/
│   ├── MagicCastService.java         # Unified engine
│   ├── CombatService.java
│   └── WorldMapService.java
├── core/
│   ├── UniversalWaveFunction.java    # Universal wave function
│   ├── QuantumState.java             # Quantum states
│   └── CausalCollapseService.java    # Causal collapses
```

### **Frontend: Multi-interface**
```
REALGAME/
├── index.html                        # Main launcher
├── maps/                             # ISO/Hex maps
├── systems/combat/                   # Unified combat
└── integration/                      # Backend connection
```

---

## 📡 **API ENDPOINTS**

### **Game Endpoints**
| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| POST | `/api/game/new` | Create game | `{playerId, gameMode}` |
| GET | `/api/game/session/{id}` | Game state | `sessionId` |
| POST | `/api/game/hero/{id}/move` | Move hero | `{x, y, heroId}` |

### **Magic Endpoints**  
| Method | Endpoint | Description | Parameters |  
|--------|----------|-------------|------------|
| POST | `/api/magic/cast` | Cast spell | `{formula, casterId, targetId}` |
| GET | `/api/magic/formulas` | Formula list | `{type, tier}` |
| POST | `/api/magic/quantum/create` | Create ψ state | `{psiId, expression, probability}` |
| POST | `/api/magic/quantum/collapse` | Causal collapse | `{psiId, trigger}` |

---

## 🧮 **UNIFIED ENGINE - 869 FORMULAS**

### **Formula Types Supported**

#### **1. Simple Formulas (40 formulas)**
```java
@Service
public class SimpleFormulaEngine {
    public FormulaResult execute(String formula) {
        switch(formula) {
            case "TELEPORT_HERO": return teleportHero();
            case "HEAL_HERO": return healHero();
            case "MODIFY_ENERGY": return modifyEnergy();
        }
    }
}
```

#### **2. Quantum Runic Formulas**
```java
// Format: ψ001: ⊙(params)
public class QuantumFormulaEngine {
    public MagicCastResponse createSuperposition(String psiId, String expression) {
        QuantumState state = new QuantumState();
        state.id = psiId;
        state.expression = expression;
        state.state = "SUPERPOSED";
        state.probability = calculateProbability(expression);
        
        activeStates.put(psiId, state);
        return success("Quantum state " + psiId + " created");
    }
}
```

#### **3. JSON Asset Formulas**
```java
// Example: paradoxRisk, temporalStability
public class AssetFormulaEngine {
    public double calculateParadoxRisk(double temporalFactor, int durationTurns) {
        return Math.min(0.95, temporalFactor * 0.15 + (durationTurns * 0.05));
    }
}
```

---

## 🌊 **UNIVERSAL WAVE FUNCTION**

### **Java Implementation**
```java
@Component
public class UniversalWaveFunction {
    private Map<String, QuantumState> globalStates = new ConcurrentHashMap<>();
    
    public GameState calculateUniversalState(List<Hero> heroes) {
        // Calculate state of all heroes simultaneously
        return heroes.parallelStream()
            .map(this::calculateHeroState)
            .reduce(new GameState(), this::mergeStates);
    }
    
    public void applyQuantumEffects(GameContext context) {
        globalStates.values().parallelStream()
            .filter(state -> state.readyForCollapse())
            .forEach(this::collapseState);
    }
}
```

### **Frontend Interface**
```javascript
class MagicStackClient {
    constructor(baseUrl = 'http://localhost:8080') {
        this.baseUrl = baseUrl;
    }
    
    async castSpell(formula, casterId, targetId) {
        const response = await fetch(`${this.baseUrl}/api/magic/cast`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formula, casterId, targetId})
        });
        return response.json();
    }
}
```

---

## 🛠️ **INSTALLATION GUIDE**

### **Prerequisites**
```bash
# Java 17+
java -version

# Maven 3.8+  
mvn -version

# Node.js 18+ (for frontend)
node -version

# Git (Dimension 0)
git --version
```

### **Backend Setup**
```bash
# Clone project
git clone https://github.com/avalon/spinforest.git
cd spinforest

# Compile backend
cd avalon-backend
mvn clean install

# Launch server
java -jar target/avalon-backend-1.0.jar

# Backend accessible at http://localhost:8080
```

### **Frontend Setup**
```bash
# Go to REALGAME
cd REALGAME

# Launch local server
python -m http.server 8000
# or
npx serve .

# Frontend accessible at http://localhost:8000
```

---

## 🔧 **HYBRID ARCHITECTURE**

### **Recommended: API Gateway**
```
Frontend (REALGAME)
    ↓
API Gateway (Express.js lightweight)
    ├── /magic/* → Spring Boot Backend (Technomancien)
    ├── /game/* → Game Backend (Node.js/Python)  
    └── /realtime/* → WebSocket Server
```

### **Advantages:**
- **Single frontend**: One interface
- **Specialization**: Each backend optimized
- **Scalability**: Easy add/remove services
- **Performance**: Smart routing

---

## 🧪 **TESTING & VALIDATION**

### **Test Structure**
```java
@SpringBootTest
class MagicCastServiceTest {
    
    @Test
    void testSimpleFormula() {
        var request = MagicCastRequest.builder()
            .formula("HEAL_HERO")
            .casterId("arthur")
            .build();
            
        var response = magicService.castSpell(request);
        
        assertThat(response.isSuccess()).isTrue();
        assertThat(response.getEffects()).contains("HERO_HEALED");
    }
}
```

### **Validation Script**
```bash
#!/bin/bash
# validate_magic.sh - Complete test script

echo "🧪 Magic Stack Tests - Complete Validation"

# Test 1: Simple formulas
for formula in "HEAL_HERO" "TELEPORT_HERO" "MODIFY_ENERGY"; do
    result=$(curl -s -X POST http://localhost:8080/api/magic/cast \
        -H "Content-Type: application/json" \
        -d "{\"formula\": \"$formula\", \"casterId\": \"test\"}")
    
    if echo "$result" | grep -q "success.*true"; then
        echo "✅ $formula OK"
    else
        echo "❌ $formula FAILED"
    fi
done

echo "🎉 Validation complete!"
```

---

**🛠️ "We don't just create code. We weave reality itself."**  

*— Technomantic School Credo*