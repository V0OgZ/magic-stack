# 🏗️ ARCHITECTURE HEROES OF TIME - SERVICES COMMUNS

## 📋 MESSAGE POUR LE BACKEND - ALIGNEMENT ARCHITECTURE

### 🎯 ÉTAT ACTUEL (après lecture _LATEST ENGINE SPECS - 0826)

**✅ CE QUI EST OK :**
- **Modèle monde** : graphe, tick serveur t_w=50ms, temps entité t_e, drift configurable
- **Énergie/identité** : E = A + iΦ, |ψ⟩ conservé, interférence I (seuils full/weak/buff)
- **OPC/CF** : trois couches OPC + champ CF, double halo UI
- **Résolution** : collapse/TCG/auto selon contexte (AFK>60s)
- **Régulateurs** : Vince/Anna/Overload garantissent no-deadlock
- **Orchestrateur** : déterministe, trace_hash pour replay

### 🆕 NOUVELLE ARCHITECTURE SERVICES COMMUNS

```
┌─────────────────────────────────────────────────────────────┐
│                    SERVICES COMMUNS (24/7)                   │
│  ┌──────────────────┐        ┌──────────────────┐          │
│  │   Vector DB      │        │   LLM Clippy     │          │
│  │   Port: 7000     │◄──────►│   Port: 7001     │          │
│  │   (Python/FAISS) │        │   (Python/Flask) │          │
│  └──────────────────┘        └──────────────────┘          │
└─────────────────▲──────────────────▲───────────────────────┘
                  │                  │
     ┌────────────┴──────────────────┴────────────┐
     │                                             │
┌────▼──────────────┐  ┌──────────────────┐  ┌───▼──────────┐
│   PROFONDEUR      │  │    BACKEND        │  │   SURFACE    │
│   Port: 3001      │  │    Port: 8082     │  │  Port: 5002  │
│   (Rust Orch.)    │  │    (Java Spring)  │  │  (Frontend)  │
└───────────────────┘  └──────────────────┘  └──────────────┘
```

### 📊 ALLOCATION PORTS COMPLÈTE

| Service | Port | Description | Statut |
|---------|------|-------------|--------|
| **SERVICES COMMUNS** | | **Toujours actifs** | |
| Vector DB | 7000 | Recherche sémantique assets | ✅ Indépendant |
| LLM Clippy | 7001 | Assistant IA léger | ✅ Indépendant |
| **BACKEND** | | | |
| Java Spring Boot | 8082 | Backend principal Magic Stack | ✅ |
| Rust Orchestrator | 3001 | Orchestrateur temporel | ✅ |
| Vector Search | 5001 | API recherche (backup) | Legacy |
| **FRONTEND SURFACE** | | | |
| Frontend HTTP | 5002 | Interface principale | ✅ |
| Game Server | 3002 | Serveur de jeu | ✅ |
| WebSocket | 8002 | Temps réel | ✅ |

### 🔧 CHANGEMENTS POUR LE BACKEND

#### 1. **NE PAS INSTANCIER Vector DB/LLM**
```python
# ❌ ANCIEN (dans votre code)
class Backend:
    def __init__(self):
        self.vector_db = VectorDB()  # NON!
        self.llm = LLM()             # NON!

# ✅ NOUVEAU (appeler services externes)
class Backend:
    def __init__(self):
        self.vector_db_url = "http://localhost:7000"
        self.llm_url = "http://localhost:7001"
    
    def search(self, query):
        return requests.post(f"{self.vector_db_url}/api/search", 
                            json={"query": query})
```

#### 2. **SCRIPTS DE LANCEMENT**
```bash
# Services communs (lance UNE SEULE FOIS)
./LANCE_SERVICES_COMMUNS.sh start

# Puis chaque équipe lance son truc
./h start                    # Frontend SURFACE
./lance_backend.sh           # Backend Java
./lance_orchestrator.sh      # Rust
```

#### 3. **ENDPOINTS À EXPOSER (Backend Java 8082)**
```yaml
# D'après 30_config_default.yaml
POST /api/state           # État monde avec OPC
POST /api/resolve         # Résolution encounters
POST /api/regulators      # État régulateurs
GET  /actuator/health     # Health check Spring

# Nouveaux (appel vers services communs)
POST /api/clippy/ask      → Proxy vers :7001/api/chat
POST /api/search/vector   → Proxy vers :7000/api/search
```

#### 4. **ENDPOINTS ORCHESTRATEUR (Rust 3001)**
```yaml
# Déjà prévus dans specs
POST /orchestrator/session
POST /orchestrator/intent  
GET  /orchestrator/snapshot
GET  /orchestrator/decision-policy

# Nouveaux (utilise services communs)
GET  /orchestrator/clippy  → Appelle :7001
GET  /orchestrator/search  → Appelle :7000
```

### 🚨 PROBLÈMES ACTUELS

1. **Binaires manquants sur GitHub**
   - magic-stack-backend.jar → 404
   - magic-stack-server → 404
   - **ACTION**: Publier sur GitHub Releases

2. **Services communs pas lancés**
   - **ACTION**: Lancer `./LANCE_SERVICES_COMMUNS.sh start`

3. **Config YAML pas branchée**
   - **ACTION**: Utiliser `30_config_default.yaml` dans backend

### ✅ TESTS DE VALIDATION

```bash
# 1. Services communs
curl http://localhost:7000/health      # Vector DB
curl http://localhost:7001/health      # LLM Clippy

# 2. Backend Java
curl http://localhost:8082/actuator/health

# 3. Orchestrateur Rust  
curl http://localhost:3001/health

# 4. Frontend
curl http://localhost:5002/

# 5. Test intégration
curl -X POST http://localhost:7001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test"}'
```

### 📝 RÉSUMÉ POUR VINCENT

**Architecture 3 niveaux :**
1. **Services communs** (7000-7001) : Vector DB + LLM toujours actifs
2. **Backend** (8082/3001) : Java + Rust qui APPELLENT les services
3. **Frontend** (5002) : Interface qui appelle backend ET services

**Avantages :**
- Services communs survivent aux crashes
- Pas de duplication Vector DB/LLM
- Chaque équipe indépendante
- Pas d'interruption si backend redémarre

**Pour lancer :**
```bash
./LANCE_SERVICES_COMMUNS.sh start  # Une fois
./h start                           # Frontend
```

### 🎯 ACTIONS IMMÉDIATES BACKEND

1. ✅ Modifier code pour appeler services externes (ports 7000/7001)
2. ✅ Ne PAS instancier Vector DB/LLM dans votre code
3. ✅ Publier binaires sur GitHub Releases
4. ✅ Brancher `30_config_default.yaml`
5. ✅ Exposer endpoints `/api/state`, `/api/resolve`, `/api/regulators`

**Questions ?** Les services communs sont prêts côté frontend !
