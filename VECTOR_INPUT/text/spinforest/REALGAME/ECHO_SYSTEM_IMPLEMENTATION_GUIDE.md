# 🛠️ GUIDE D'IMPLÉMENTATION - SYSTÈME ÉCHO TEMPOREL
## Documentation Technique pour l'Équipe

---

## 🎯 **BACKEND - ARCHITECTURE ÉCHO**

### **1. STRUCTURE DE DONNÉES**

```java
// EchoEntity.java
@Entity
public class EchoEntity {
    @Id
    private String echoId;
    private String originalCardId;
    private String playerId;
    private int triggerTurn;
    private EchoState state;
    private Map<String, Object> conditions;
    private List<EchoModifier> modifiers;
    
    public enum EchoState {
        PENDING,
        RESONATING,
        CORRUPTED,
        QUANTUM,
        TRIGGERED
    }
}

// EchoTimeline.java
@Component
public class EchoTimeline {
    private Map<Integer, List<EchoEntity>> futureEchoes;
    
    public void scheduleEcho(EchoEntity echo) {
        futureEchoes.computeIfAbsent(echo.getTriggerTurn(), 
            k -> new ArrayList<>()).add(echo);
    }
    
    public List<EchoEntity> getEchoesForTurn(int turn) {
        return futureEchoes.getOrDefault(turn, new ArrayList<>());
    }
}
```

### **2. MOTEUR DE RÉSOLUTION**

```java
// EchoResolutionEngine.java
@Service
public class EchoResolutionEngine {
    
    @Autowired
    private GameStateService gameState;
    
    @Autowired
    private ResonanceCalculator resonanceCalc;
    
    public void resolveEchoes(int currentTurn) {
        List<EchoEntity> echoes = timeline.getEchoesForTurn(currentTurn);
        
        // Vérifier résonances
        List<ResonancePair> resonances = resonanceCalc.findResonances(echoes);
        
        // Résoudre dans l'ordre
        for (EchoEntity echo : echoes) {
            if (!echo.isPartOfResonance()) {
                resolveBasicEcho(echo);
            }
        }
        
        // Résoudre résonances
        for (ResonancePair pair : resonances) {
            resolveResonance(pair);
        }
    }
    
    private void resolveBasicEcho(EchoEntity echo) {
        // Évaluer conditions
        GameContext context = gameState.getCurrentContext();
        EchoEffect effect = calculateEffect(echo, context);
        
        // Appliquer effet
        effect.apply(gameState);
        
        // Notifier frontend
        websocket.notifyEchoResolved(echo, effect);
    }
}
```

### **3. API ENDPOINTS**

```java
// EchoController.java
@RestController
@RequestMapping("/api/echo")
public class EchoController {
    
    @PostMapping("/preview/{echoId}")
    public EchoPreview previewEcho(@PathVariable String echoId) {
        // Montrer ce que l'écho fera selon l'état actuel
    }
    
    @PostMapping("/manipulate")
    public EchoResult manipulateEcho(@RequestBody EchoManipulation manip) {
        // Accélérer, dupliquer, corrompre, etc.
    }
    
    @GetMapping("/timeline")
    public TimelineView getTimeline(@RequestParam String playerId) {
        // Vue complète de tous les échos à venir
    }
    
    @WebSocket("/echo-updates")
    public void subscribeToEchoUpdates(Session session) {
        // Updates temps réel des échos
    }
}
```

---

## 🎨 **FRONTEND - INTERFACE ÉCHO**

### **1. COMPOSANT TIMELINE**

```typescript
// EchoTimeline.tsx
interface Echo {
    id: string;
    originalCard: Card;
    triggerTurn: number;
    state: 'pending' | 'resonating' | 'corrupted' | 'quantum';
    predictedEffect?: string;
}

const EchoTimeline: React.FC = () => {
    const [echoes, setEchoes] = useState<Echo[]>([]);
    const currentTurn = useGameState(state => state.currentTurn);
    
    return (
        <div className="echo-timeline">
            {[1, 2, 3, 4].map(turnsAhead => (
                <TimelineSlot 
                    key={turnsAhead}
                    turn={currentTurn + turnsAhead}
                    echoes={echoes.filter(e => 
                        e.triggerTurn === currentTurn + turnsAhead
                    )}
                    onEchoHover={showEchoPreview}
                    onEchoManipulate={openManipulationMenu}
                />
            ))}
        </div>
    );
};
```

### **2. ANIMATIONS ÉCHO**

```typescript
// EchoAnimations.ts
export const echoAnimations = {
    create: {
        keyframes: [
            { opacity: 1, scale: 1 },
            { opacity: 0.5, scale: 0.8 },
            { opacity: 0.3, scale: 0.6, y: -100 }
        ],
        duration: 1000,
        description: "Carte devient transparente et vole vers timeline"
    },
    
    trigger: {
        keyframes: [
            { y: -100, opacity: 0.3, scale: 0.6 },
            { y: 0, opacity: 1, scale: 1.2 },
            { scale: 1 }
        ],
        duration: 800,
        particles: "temporal_sparkles"
    },
    
    resonance: {
        keyframes: "spiral_merge",
        duration: 1500,
        sound: "resonance_harmony.mp3",
        screenShake: true
    }
};
```

### **3. INDICATEURS VISUELS**

```css
/* echo-indicators.css */
.echo-pending {
    border: 2px solid #4A90E2;
    animation: pulse-blue 2s infinite;
    position: relative;
}

.echo-pending::after {
    content: attr(data-turns-until);
    position: absolute;
    top: -10px;
    right: -10px;
    background: #4A90E2;
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.echo-quantum {
    animation: quantum-shift 3s infinite;
    filter: hue-rotate(0deg);
}

@keyframes quantum-shift {
    0%, 100% { filter: hue-rotate(0deg); }
    33% { filter: hue-rotate(120deg); }
    66% { filter: hue-rotate(240deg); }
}
```

---

## 🔧 **INTÉGRATION MAGIC STACK**

### **FORMULES ÉCHO**

```python
# echo_formulas.py
class EchoFormulas:
    
    @staticmethod
    def basic_echo(action):
        """∂t[Action] → Action' @ t+3"""
        return {
            "type": "ECHO_SCHEDULE",
            "original": action,
            "trigger_turn": current_turn() + 3,
            "modifiers": []
        }
    
    @staticmethod
    def resonance(echo1, echo2):
        """Écho₁ ⊗ Écho₂ → MégaÉcho"""
        if echo1.type == echo2.type:
            return MegaEcho(echo1, echo2, bonus_power=3)
        elif echo1.opposite(echo2):
            return TemporalStorm(radius=3)
    
    @staticmethod
    def quantum_echo(base_effect):
        """|Écho⟩ = α|Effet₁⟩ + β|Effet₂⟩ + γ|Effet₃⟩"""
        return QuantumSuperposition([
            (0.5, base_effect),
            (0.3, amplify(base_effect, 2)),
            (0.2, invert(base_effect))
        ])
```

---

## 📊 **MÉTRIQUES & ÉQUILIBRAGE**

```javascript
// balance_config.js
export const ECHO_BALANCE = {
    defaultDelay: 3,
    maxEchoesPerPlayer: 7,
    resonanceBonus: 1.5,
    quantumStates: 3,
    
    manipulation: {
        accelerate: { maxTurns: 2, cost: 2 },
        duplicate: { maxCopies: 1, cost: 3 },
        corrupt: { successRate: 0.7, cost: 2 }
    },
    
    scaling: {
        // Éviter snowball
        echoCountPenalty: (count) => count > 5 ? 0.1 * (count - 5) : 0,
        // Récompenser timing
        perfectTimingBonus: 1.3
    }
};
```

---

## 🐻 **NOTES D'IMPLÉMENTATION**

1. **Commencer simple** : Échos basiques d'abord, puis résonances
2. **Performance** : Limiter preview à 4 tours max
3. **UX** : Tooltips clairs sur chaque écho
4. **Son** : Audio cues pour échos approchants
5. **Mobile** : Timeline scrollable horizontalement

**GROGNEMENT TECHNIQUE !** Le système est modulaire - on peut ajouter de nouveaux types d'échos facilement !

---

*"Code l'écho aujourd'hui, récolte la résonance demain !"* 🐻⚡