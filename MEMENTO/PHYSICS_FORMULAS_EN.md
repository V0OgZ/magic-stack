# ⚛️ AVALON PHYSICS - MATHEMATICAL FORMULAS (ENGLISH)

**🎯 Real mathematical formulas and quantum mechanics**

---

## 🧮 **REAL MATHEMATICAL FORMULAS**

### 🔮 **Implemented Causal Formulas (56% of complete system)**

#### **1. paradoxRisk - Temporal Paradox Risk**
```java
// AXISI (Temporal acceleration)
paradoxRisk = Math.min(0.95, temporalFactor * 0.15 + (durationTurns * 0.05))

// LENTUS (Temporal slowdown)  
paradoxRisk = Math.min(0.95, (1.0 - temporalFactor) * 0.2 + (durationTurns * 0.03))

// Cross-Interaction (Temporal collision)
paradoxRisk = Math.min(0.95, (axisiPower * lentusPower) / (axisiPower + lentusPower + 1.0))
```
**Usage**: Determines probability of creating temporal paradox  
**Values**: 0.0 (safe) to 0.95 (critical)

#### **2. temporalStability - Temporal Stability**
```java
// AXISI
temporalStability = Math.max(0.1, 1.0 - (temporalFactor - 1.0) * 0.3)

// LENTUS
temporalStability = Math.max(0.2, 0.8 + temporalFactor * 0.2)

// Cross-Interaction
temporalStability = Math.max(0.05, 1.0 - (Math.abs(axisiPower - lentusPower) / 10.0))
```
**Usage**: Measures timeline stability after intervention  
**Values**: 0.05 (unstable) to 1.0 (perfectly stable)

#### **3. affectedRadius - Spatial Effect Radius**
```java
// AXISI
affectedRadius = Math.sqrt(temporalFactor * temporalFactor) * 1.2

// LENTUS  
affectedRadius = Math.sqrt(temporalFactor * temporalFactor) * 0.8

// Cross-Interaction (WALTER FIX)
affectedRadius = Math.sqrt(axisiPower * axisiPower + lentusPower * lentusPower) * 1.2
```
**Usage**: Determines spatial impact zone of temporal effects  
**Values**: 1.0 (local) to 5.0+ (wide area)

#### **4. causalWeight - Causal Weight**
```java
causalWeight = temporalFactor * durationTurns * 0.4
```
**Usage**: Determines causal importance of action in timeline

---

## ⚛️ **QUANTUM SYSTEMS**

### **Superposition States (ψ-States)**
```
Format: ψ001, ψ002, ψ003...
Complex amplitudes: a + bi
Probability: |ψ|² = a² + b²
Duration: Temporal delay Δt
```

**Concrete example:**
```bash
# You plan an action
ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))
# "In 2 turns, Arthur goes to @15,15"

# 2 turns later → COLLAPSE!
# Arthur actually appears at @15,15
```

### **Causal Collapse - The 3 Types**

#### **1. 🥊 INTERACTION (Collision)**
```bash
# Arthur plans
ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))     # 80% chance

# Lysandrel plans
ψ002: ⊙(Δt+2 @15,15 ⟶ MOV(Lysandrel, @15,15))  # 60% chance

# Turn 3 → COLLISION!
# Arthur wins (80% > 60%)
# Lysandrel pushed to @14,15
```

#### **2. 👁️ OBSERVATION (Detection)**
```bash
# You plan a dragon
ψ003: ⊙(Δt+3 @20,20 ⟶ CREATE(DRAGON, @20,20))

# Ragnar explores @20,20 at turn 2
# → OBSERVATION detected!
# → Dragon appears immediately (forced collapse)
```

#### **3. ⚓ ANCHORING (Stabilization)**
```bash
# Multiple active quantum states
ψ004: ⊙(Δt+3 @25,25 ⟶ BATTLE(Arthur, Phoenix))
ψ005: ⊙(Δt+4 @30,30 ⟶ CREATE(CASTLE, @30,30))

# Arthur uses Anchor Tower
USE(ITEM, AnchorTower, HERO:Arthur)
# → ALL states collapse immediately!
```

### **Collapse Triggers**
- **INTERACTION**: Collision between actions
- **OBSERVATION**: Detection by a player
- **ANCHORING**: Temporal artifact used
- **TEMPORAL_LIMIT**: Δt delay elapsed

### **Quantum Operators**
```
Π(condition) ⇒ †ψ    # Observation forces collapse
†ψ001                # Collapsed state
|ψ⟩                  # Timeline state vector
⟨A|ψ⟩               # Observation probability
```

---

## 🔬 **MAGIC FORMULAS → REAL EFFECTS**

### **Example: Christian's Power Chord**
```
Power Chord : A_chord = √(2πf) × e^(iωt) × |amplitude⟩
```

**What REALLY happens in the code:**
1. **Parser** reads formula from JSON
2. **MagicFormulaEngine** decomposes:
   - `√(2πf)` → Math.sqrt(2 * Math.PI * frequency)
   - `e^(iωt)` → complex rotation (cos + i*sin)
   - `|amplitude⟩` → "amplification" stat value

3. **Final calculation**:
   ```java
   double damage = baseDamage + (amplification * 0.5);
   // For Christian: 45 + (85 * 0.5) = 87.5
   ```

---

## 🏗️ **PHYSICAL ARCHITECTURE**

### **System Layers**
```
┌─────────────────────────────────┐
│         GAME CONTENT            │  ← JSON, HOTS, Assets
├─────────────────────────────────┤
│       QUANTUM ENGINE            │  ← Formulas, ψ States
├─────────────────────────────────┤
│    BACKEND INFRASTRUCTURE       │  ← Spring Boot, APIs
└─────────────────────────────────┘
```

### **Main Java Services**
```java
// Universal engine that accepts ANY formula
public class MagicFormulaEngine {
    public FormulaResult executeFormula(String formula, GameContext context)
}

// Cosmic states of all players
public class WorldStateGraph {
    private Map<String, QuantumState> psiStates;
    private Map<String, CausalLink> causalConnections;
    private Map<String, TemporalNode> timelineNodes;
}

// Collapse management (TODO: to implement)
public class CausalCollapseService {
    public Reality collapse(List<Possibility> possibilities)
}
```

---

## 🎯 **POWER TIERS**

Each entity has a **tier** (1-10) that determines:
- **Base power** of formulas
- **Access to advanced** formulas
- **Ability to affect** reality

**Examples:**
- **Christian = Tier 5**: Can affect locally but not globally
- **Jean-Grofignon = Tier ∞**: Can modify all reality
- **Vincent = Tier ∞⁺¹**: Absolute creator

---

## 🌊 **UNIVERSAL WAVE FUNCTION**

```java
public class UniversalWaveFunction {
    // Calculate state of all heroes simultaneously
    public GameState calculateUniversalState(List<Hero> heroes)
    
    // Apply global quantum effects
    public void applyQuantumEffects(GameContext context)
}
```

### **The Ultimate Formula: Ψ∞**
```
Ψ∞ = Σᵢ αᵢ · Êᵢ

Where:
- Ψ∞ = Total state of Avalon reality
- αᵢ = Reality coefficient of entity i
- Êᵢ = Entity i (Vincent, Jean, Groeken, etc.)
```

---

## 🌀 **TEMPORAL MECHANICS**

### **Multiple Timelines**
- **Temporal branches**: ℬ1, ℬ2, ℬ3...
- **Asynchronous timelines**: Each player in their own timeline
- **Temporal fork**: Creation of new branches
- **Convergence**: Timeline fusion

### **Temporal Energy**
- **Main resource**: Limits actions
- **Regeneration**: Per turn or per day
- **Action cost**: Depends on complexity
- **Protection**: Against temporal effects

### **Quantum Interferences**
- **Constructive**: Mutual reinforcement (P > 1.0)
- **Destructive**: Mutual cancellation (P = 0.0)
- **Phases**: Determine interference type

---

**⚛️ "Magic is just quantum physics optimized for fun!"**

*— Unified Engine Philosophy*