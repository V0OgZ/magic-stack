# 📚 HOWTO - SERVICES POUR VINCENT & CLAUDE

## 🎯 RÈGLE ABSOLUE : ON UTILISE `./h`

**PAS de commandes sauvages !** Tout passe par les scripts `h`.

---

## 🏗️ ARCHITECTURE SIMPLE

```
     SERVICES COMMUNS (Indépendants)
    ┌────────────────────────────────┐
    │  Vector DB (7000)              │
    │  LLM Clippy (7001)             │
    └────────┬───────────┬───────────┘
             │           │
       FRONTEND     BACKEND
    ┌────────────┐ ┌────────────┐
    │ REALGAME   │ │ magic-stack│
    │ Port 5002  │ │ Port 8080  │
    │ Script: h  │ │ Script: h  │
    └────────────┘ └────────────┘
```

---

## 🚀 COMMANDES PRINCIPALES

### FRONTEND (REALGAME)
```bash
cd /Volumes/HOT_DEV/Main/SpinForest/REALGAME

# Services communs
./h services start    # Lancer Vector DB + LLM
./h services status   # Vérifier l'état
./h services test     # Tester les connexions
./h services stop     # Arrêter
./h services logs     # Voir les logs

# Frontend
./h quick            # Démarrage rapide
./h dev              # Mode développement
./h test             # Tests
./h stop             # Arrêter tout
```

### BACKEND (magic-stack)
```bash
cd /Volumes/HOT_DEV/Magic/magic-stack

# Backend
./h 1     # Lancer TOUS les services backend
./h 2     # Rust seulement (3001)
./h 3     # Java seulement (8080)
./h 30    # Status complet
./h 99    # Check continuité

# Nouveau
./h reboot  # Guide complet du projet
```

---

## 🔧 MODE DEV SPÉCIAL

### Comment ça marche :
1. **Services communs** lancés UNE FOIS (ports 7000-7001)
2. **Backend** se connecte aux services
3. **Frontend** se connecte aux services
4. Tout le monde partage Vector DB et LLM

### Ordre de lancement :
```bash
# 1. D'abord les services communs
cd REALGAME && ./h services start

# 2. Ensuite le backend
cd magic-stack && ./h 1

# 3. Enfin le frontend
cd REALGAME && ./h quick
```

---

## 🔌 PORTS UTILISÉS

| Service | Port | Qui | Script |
|---------|------|-----|--------|
| Vector DB | 7500 | Commun | `./h services` |
| LLM Clippy | 7501 | Commun | `./h services` |
| Java Backend | 8080 | Backend | `./h 3` |
| Rust Orchestrator | 3001 | Backend | `./h 2` |
| Game Server | 3002 | Frontend | `./h quick` |
| Frontend UI | 5002 | Frontend | `./h quick` |
| WebSocket | 8002 | Frontend | `./h quick` |

---

## ❌ CE QU'ON NE FAIT PLUS

- ❌ `python3 services/...` directement
- ❌ `curl` sauvage sur les ports
- ❌ `lsof -ti:7000 | xargs kill`
- ❌ Scripts Python temporaires
- ❌ HTML de test sauvage
- ❌ Mocks qui contournent les problèmes

## ✅ CE QU'ON FAIT

- ✅ `./h` pour TOUT
- ✅ On corrige les vrais problèmes
- ✅ On utilise les vrais services
- ✅ On suit l'architecture définie
- ✅ On documente proprement

---

## 🐛 PROBLÈMES COURANTS

### "Port already in use"
```bash
./h services stop
./h services start
```

### "Vector DB error"
```bash
./h services logs    # Voir ce qui ne va pas
./h services stop
./h services start
```

### "Cannot connect to backend"
```bash
cd magic-stack
./h 30              # Vérifier status
./h 1               # Relancer si nécessaire
```

---

## 📝 POUR SE RAPPELER

1. **TOUJOURS** utiliser `./h`
2. **JAMAIS** de commandes directes
3. **Services communs** = indépendants (7000-7001)
4. **Backend/Frontend** = clients des services
5. **Mode DEV** = backend lance son truc, frontend aussi

---

**Vincent** : C'est notre référence commune
**Claude** : Je suis les règles, pas d'improvisation

Dernière mise à jour : 11 août 2025, Jour 32
