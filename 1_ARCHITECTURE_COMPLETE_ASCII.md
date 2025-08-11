# 1️⃣ ARCHITECTURE COMPLÈTE - SCHÉMA ASCII & FLUX

## 🏗️ VUE D'ENSEMBLE

```
┌────────────────────────────────────────────────────────────────┐
│                         MAC DE VINCENT                          │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                    🎯 CORE (VINCENT)                    │  │
│  │                                                         │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │  📡 VECTOR BUS (enhanced_vector_bus.py)         │   │  │
│  │  │  Port: 5001                                     │   │  │
│  │  │  • /api/bus/push   (Backend → Bus)             │   │  │
│  │  │  • /api/bus/pull   (Bus → Frontend)            │   │  │
│  │  │  • /api/bus/state  (État actuel)               │   │  │
│  │  └────────────────▲──────────▲─────────────────────┘   │  │
│  │                   │          │                          │  │
│  │  ┌────────────────┴──────────┴─────────────────────┐   │  │
│  │  │  🤖 LLM OLLAMA                                  │   │  │
│  │  │  Port: 11434                                    │   │  │
│  │  │  • Qwen2.5:0.5b (397MB)                        │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  └─────────────────────────────────────────────────────────┘  │
│                           ▲            ▲                       │
│                           │            │                       │
│         PUSH ─────────────┘            └───────────── PULL    │
│                           │            │                       │
│  ┌────────────────────────┴────┐  ┌───┴────────────────────┐  │
│  │    🔨 BACKEND (JEAN)        │  │   🎨 FRONTEND (PAUL)   │  │
│  │                              │  │                        │  │
│  │  ┌────────────────────┐     │  │  ┌──────────────────┐  │  │
│  │  │ ☕ JAVA Spring Boot │     │  │  │ ⚛️ REACT Dev     │  │  │
│  │  │ Port: 8080          │     │  │  │ Port: 5173       │  │  │
│  │  │ • /api/combat       │     │  │  │ • UI Components  │  │  │
│  │  │ • /api/tcg          │     │  │  │ • Game Views     │  │  │
│  │  └────────────────────┘     │  │  └──────────────────┘  │  │
│  │                              │  │                        │  │
│  │  ┌────────────────────┐     │  │  Appelle:             │  │
│  │  │ 🦀 RUST Server     │     │  │  • :8080 (Java)       │  │
│  │  │ Port: 3001          │     │  │  • :3001 (Rust)       │  │
│  │  │ • /api/v2/tick      │     │  │  • :5001 (Vector Bus) │  │
│  │  │ • /api/v2/qstar     │     │  │                        │  │
│  │  └────────────────────┘     │  └────────────────────────┘  │
│  └──────────────────────────────┘                              │
└────────────────────────────────────────────────────────────────┘
```

---

## 📋 FLUX DÉTAILLÉ : ORDRE DE DÉPLOIEMENT

### 🌅 PHASE 1 : DÉMARRAGE (8h00)

```
┌─────────────────────────────────────────┐
│ [1] VINCENT lance CORE                  │
│     ./h 99  → Check continuité          │
│     ./h 60  → Lance Vector Bus + LLM    │
└─────────────────────┬───────────────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │ Bus: 5001 ✅           │
         │ LLM: 11434 ✅          │
         └────────────────────────┘
```

### 🔨 PHASE 2 : BACKEND (8h15)

```
┌─────────────────────────────────────────┐
│ [2] JEAN lance BACKEND                  │
│     ./h 61  → Java + Rust               │
└─────────────────────┬───────────────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │ Java: 8080 ✅          │
         │ Rust: 3001 ✅          │
         └──────────┬─────────────┘
                    │
                    ▼ PUSH
         ┌────────────────────────┐
         │ game_state → Bus 5001  │
         └────────────────────────┘
```

### 🎨 PHASE 3 : FRONTEND (8h30)

```
┌─────────────────────────────────────────┐
│ [3] PAUL lance FRONTEND                 │
│     ./h 62  → React dev                 │
└─────────────────────┬───────────────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │ React: 5173 ✅         │
         └──────────┬─────────────┘
                    │
                    ▼ PULL
         ┌────────────────────────┐
         │ Bus 5001 → game_state  │
         └────────────────────────┘
```

---

## 🔄 CYCLE DE DÉVELOPPEMENT

```
    JEAN CODE                    PAUL CODE
        │                            │
        ▼                            ▼
    Compile Java                Update React
        │                            │
        ▼                            │
    PUSH to Bus ─────────────────>  │
        │                            │
        │                            ▼
        │                        PULL from Bus
        │                            │
        │                            ▼
        │                        Update UI
        │                            │
        └────── < 100ms ─────────────┘
```

---

## 🚀 EXEMPLE TIMELINE RÉELLE

```
09:00:00  Vincent  → ./h 60          [CORE READY]
09:00:05  System   → Bus:5001 UP
09:00:06  System   → LLM:11434 UP

09:05:00  Jean     → ./h 61          [BACKEND READY]
09:05:02  System   → Java:8080 UP
09:05:03  System   → Rust:3001 UP
09:05:05  Jean     → PUSH initial_state

09:10:00  Paul     → ./h 62          [FRONTEND READY]
09:10:02  System   → React:5173 UP
09:10:03  Paul     → PULL state (auto)
09:10:04  UI       → Display game

10:30:15  Jean     → Code new feature
10:30:45  Jean     → Compile & restart
10:30:47  Jean     → PUSH update
10:30:47.1 Paul    → PULL update (100ms poll)
10:30:47.2 UI      → Show new feature

17:00:00  Jean     → ./h 50          [BUILD]
17:05:00  Vincent  → ./h 51          [PACKAGE]
17:10:00  Vincent  → ./h 52          [PUBLISH]
```

---

## 📡 PROTOCOLE BUS DÉTAILLÉ

### MESSAGE FORMAT
```json
{
  "type": "game_state|combat_start|spell_cast|...",
  "source": "backend|frontend|system",
  "data": {...},
  "timestamp": 1234567890.123,
  "datetime": "2025-08-11T09:30:00Z"
}
```

### BACKEND → BUS (PUSH)
```javascript
POST http://localhost:5001/api/bus/push
{
  "type": "combat_start",
  "source": "backend",
  "data": {
    "hero": "alice",
    "enemy": "dragon",
    "turn": 1
  }
}
```

### BUS → FRONTEND (PULL)
```javascript
GET http://localhost:5001/api/bus/pull?since=1234567890
Response: {
  "messages": [...],
  "count": 5,
  "latest_timestamp": 1234567895
}
```

---

## 🎯 RÈGLES D'OR

1. **VINCENT** démarre TOUJOURS en premier (CORE)
2. **JEAN** peut restart sans affecter Paul
3. **PAUL** ne touche JAMAIS aux backends
4. **Bus** garde les 1000 derniers messages
5. **LLM** partagé = 600MB RAM économisés

---

## ⚡ COMMANDES ESSENTIELLES

```bash
# MATIN
./h 99   # Check obligatoire
./h 60   # Vincent - CORE
./h 61   # Jean - BACKEND
./h 62   # Paul - FRONTEND

# TEST
./h 63   # Test communication

# SOIR
./h 50   # Build binaires
./h 51   # Package release
./h 52   # Publish GitHub
```

---

**ARCHITECTURE RÉVOLUTIONNAIRE. ZÉRO CONFLIT. 100% EFFICACE.**
