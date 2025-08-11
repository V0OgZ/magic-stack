# 3️⃣ COMMANDES ESSENTIELLES - QUICK REFERENCE

## 🔴 OBLIGATOIRE AU DÉBUT
```bash
./h 99   # CHECK CONTINUITÉ - TOUJOURS COMMENCER PAR ÇA !
```

## 🚀 LANCEMENT SERVICES

### MODE DEV HYBRIDE
```bash
./h 60   # CORE (Vincent) - Vector Bus + LLM
./h 61   # BACKEND (Jean) - Java + Rust
./h 62   # FRONTEND (Paul) - React
./h 63   # TEST - Communication Bus
```

### MODE CLASSIQUE
```bash
./h 1    # Lance jeu complet
./h 2    # Lance backends seulement
./h 3    # Lance Vector DB
```

## 🔨 BUILD & RELEASE
```bash
./h 50   # Compile binaires
./h 51   # Package release
./h 52   # Publish GitHub
./h 53   # Organiser docs
```

## 🎮 DÉMOS & UI
```bash
./h 10   # Multiplayer HOMM3
./h 11   # PWA iPad
./h 12   # IA vs IA
./h 13   # Mode Spectateur
./h 20   # API Explorer
./h 44   # CHASSE TEMPORELLE
```

## 🛠️ DÉVELOPPEMENT
```bash
./h 30   # Status services
./h 31   # Voir logs
./h 32   # Nettoyer logs
./h 33   # Mode dev
```

## 🧪 TESTS
```bash
./h 63   # Test Bus
curl http://localhost:5001/health   # Vector Bus
curl http://localhost:8080/health   # Java
curl http://localhost:3001/health   # Rust
```

## 📡 VECTOR BUS API
```bash
# PUSH (Backend)
curl -X POST http://localhost:5001/api/bus/push \
  -H "Content-Type: application/json" \
  -d '{"type":"test","data":{}}'

# PULL (Frontend)
curl http://localhost:5001/api/bus/pull?since=0
```

## 🛑 ARRÊT
```bash
./h 0    # Quitter
pkill -f "magic-stack"   # Kill tout
```

**TOUTES LES COMMANDES EN 1 PAGE.**
