# 🎯 CLARIFICATION BACKENDS AVALON - Par URZ-KÔM

## 📋 RÉSUMÉ: CE QUI EXISTE VRAIMENT

### 1️⃣ **avalon-backend/** - BACKEND PRINCIPAL
- **Port**: 8080
- **Status**: ❌ Ne compile pas (classes manquantes)
- **Controllers actifs**: 
  - IntersticeUploadController ✅
  - CsvImportController ✅
  - Consciousness6DController ✅
  - PanopticonRosterController ✅
- **Controllers désactivés**:
  - GameController ❌
  - ShamanController ❌
  - PhoenixController ❌
  - CombatCardController ❌
  - HexMapController ❌

### 2️⃣ **spells/stack/** - MAGIC STACK (SUBMODULE)
#### Backend Java
- **Chemin**: `spells/stack/backends/java/`
- **Port**: 8082 ✅ (je viens de corriger)
- **Status**: ✅ COMPILE ET MARCHE
- **Endpoints**: `/api/magic/*`, `/api/interstice/*`

#### Backend Rust  
- **Chemin**: `spells/stack/backends/rust/`
- **Port**: 3001 ✅
- **Status**: ✅ COMPILE ET MARCHE
- **Endpoints**: `/health`, `/api/qstar/*`, `/api/world-state/*`

#### Router Python (NOUVEAU)
- **Fichier**: `spells/stack/magic_router.py`
- **Port**: 5000
- **Rôle**: Unifie l'accès aux backends Java et Rust

### 3️⃣ **avalon-magic-api/** - API GATEWAY
- **Port**: 3000 (gateway)
- **Status**: ❓ À vérifier
- **Contient**: Duplicatas des backends

## 🗑️ DOUBLONS/CONFUSION

1. **spells/stack/java-backend/** - DOUBLON avec `com.avalon` (ShamanController est ici)
2. **AVALON/🏠 HOME/⚡🧙 MerFlash/BACKEND_*.py** - Mocks Python
3. **backends-external/** - Juste des liens symboliques

## 🏗️ ARCHITECTURE ACTUELLE

```
                    FRONTEND (8000)
                         |
    ┌────────────────────┼────────────────────┐
    |                    |                    |
    v                    v                    v
AVALON Backend     Magic Stack Java     Magic Stack Rust
   (8080)              (8082)               (3001)
[NE COMPILE PAS]    [✅ MARCHE]          [✅ MARCHE]
                         |                    |
                         └────────┬───────────┘
                                  |
                           Router Python
                              (5000)
                           [✅ NOUVEAU]
```

## ✅ CE QUI MARCHE MAINTENANT

### Magic Stack (indépendant)
```bash
cd spells/stack
./launch_magic_stack.sh  # Lance Java + Rust + Router
```

**Endpoints disponibles:**
- http://localhost:5000 - Router unifié
- http://localhost:8082/api - Backend Java direct
- http://localhost:3001/health - Backend Rust direct

## 🔧 RECOMMANDATIONS

1. **Court terme**: Utiliser Magic Stack qui marche
2. **Moyen terme**: Réparer avalon-backend ou migrer les controllers actifs vers Magic Stack
3. **Long terme**: Une seule architecture claire

## 📝 ROUTES PRINCIPALES

### Magic Stack Java (8082)
- `GET /api` - Documentation
- `GET /api/magic/health` - Health check
- `POST /api/magic/cast` - Lancer un sort
- `POST /api/interstice/upload` - Upload 6D
- `POST /api/interstice/download` - Download 6D

### Magic Stack Rust (3001)
- `GET /health` - Health check
- `POST /api/qstar/search` - Recherche Q*
- `POST /api/world-state/nodes` - Créer noeud
- `GET /api/world-state/nodes/{id}` - Obtenir noeud

### Router Python (5000)
- `GET /` - Documentation
- `GET /health` - Status de tous les backends
- Proxy tout vers les bons backends

---
*Par URZ-KÔM, Gardien de la Magic Stack*