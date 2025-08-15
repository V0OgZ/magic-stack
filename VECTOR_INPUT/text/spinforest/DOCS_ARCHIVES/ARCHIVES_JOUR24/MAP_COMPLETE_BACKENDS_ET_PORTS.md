# 🗺️ MAP COMPLÈTE DES BACKENDS ET PORTS

## 📍 BACKENDS ACTUELS ET LEURS PORTS

### 🔮 MAGIC STACK (spells/stack/)
**Status: ✅ FONCTIONNEL**

| Backend | Port | Status | Rôle |
|---------|------|--------|------|
| Java (Spring Boot) | 8082 | ✅ Marche | Formules magiques, Interstice, Mages |
| Rust (Axum) | 3001 | ✅ Marche | Calculs Q* haute performance |
| Python Router | 5000 | ✅ Marche | Routeur unifié pour Java/Rust |

**Endpoints Magic Stack:**
- `http://localhost:5000/` - Router Python
- `http://localhost:5000/api/magic/*` → Java (8082)
- `http://localhost:5000/api/qstar/*` → Rust (3001)
- `http://localhost:8082/api/magic/health` - Direct Java
- `http://localhost:3001/health` - Direct Rust

### 🎮 AVALON BACKEND (avalon-backend/)
**Status: ✅ RÉPARÉ (compile maintenant)**

| Backend | Port | Status | Rôle |
|---------|------|--------|------|
| Spring Boot | 8080 | ⚠️ À relancer | Backend principal du JEU RealGame |

**Endpoints Avalon:**
- `http://localhost:8080/api/temporal/minimap` - Mini-carte temporelle
- `http://localhost:8080/api/sphinx/enigme` - Système d'énigmes
- `http://localhost:8080/api/consciousness/6d` - Conscience 6D
- `http://localhost:8080/api/panopticon/roster` - Liste des entités
- `http://localhost:8080/api/magic/cast` - Lancement de sorts dans le jeu

### 🚫 BACKENDS SUPPRIMÉS (plus dans le projet)
- ❌ `avalon-magic-api/` - Supprimé (doublon cassé)
- ❌ `spells/stack/java-backend/` - Supprimé (vieux doublon)
- ❌ `magic-stack/` - Supprimé (copie manuelle)
- ❌ `NEXUS-TEMPOREL/backend-clean/` - Introuvable/supprimé
- ❌ Mocks Python dans HOME/ - Supprimés

### 🔧 AUTRES SERVICES

| Service | Port | Description |
|---------|------|-------------|
| PostgreSQL | 5432 | Base de données 6D (optionnel) |
| H2 Console | - | `/h2-console` (dev only) |
| Frontend | 80/3000 | Interfaces web (à définir) |

## 🚀 COMMANDES POUR LANCER

### Magic Stack complet:
```bash
cd spells/stack
./launch_magic_stack.sh
```

### Avalon Backend:
```bash
cd avalon-backend
mvn spring-boot:run
```

### Vérifier tous les ports:
```bash
# Magic Stack
curl http://localhost:8082/api/magic/health  # Java
curl http://localhost:3001/health            # Rust
curl http://localhost:5000/health            # Router

# Avalon Backend
curl http://localhost:8080/actuator/health   # Avalon
```

## 📊 RÉSUMÉ DES PORTS UTILISÉS

- **5000** - Python Router (Magic Stack)
- **3001** - Rust Backend (Magic Stack)
- **8080** - Avalon Backend (JEU)
- **8082** - Java Backend (Magic Stack)
- **5432** - PostgreSQL (si activé)

## ⚠️ CONFLITS POTENTIELS

- Port 8080: Souvent utilisé par d'autres services
- Port 5432: PostgreSQL par défaut
- Port 3000: Souvent utilisé par React/Node

## 🎯 CE QUI MANQUE ACTUELLEMENT

1. **Frontend unifié** - Pas de port défini
2. **Gateway API global** - Pour unifier Magic Stack + Avalon
3. **Service de monitoring** - Pour surveiller tous les backends

## 💡 ARCHITECTURE IDÉALE

```
                    [Gateway API :8000]
                          |
          +---------------+---------------+
          |                               |
    [Magic Stack]                  [Avalon Backend]
    Router :5000                        :8080
         |                                |
    +----+----+                     (Jeu RealGame)
    |         |
Java:8082  Rust:3001
```

C'est ça qu'on a actuellement ! Rien n'est oublié.