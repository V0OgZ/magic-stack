# Heroes of Time - Architecture Overview

## 🎯 Project Vision
Narrative strategy game with **real temporal mechanics** - not just cosmetic time travel, but actual differential time flow, causal fog, and memory tattoos.

## 🏗️ 4-Layer Architecture

### 1. Strategic Map (React)
- **Port**: 5176 (Unified game app)
- **Purpose**: Main game interface, mini-map, HUD
- **Key Features**: Real-time world diff visualization, temporal mechanics UI

### 2. Combat TCG (React)
- **Integrated**: Within unified app
- **Purpose**: Turn-based combat with magical formulas
- **Key Features**: 6D spatial search for spell combinations

### 3. Narrative Interstice (React)
- **Integrated**: Within unified app  
- **Purpose**: Story progression, character interactions
- **Key Features**: Living AI characters via local LLM

### 4. MagicStack Backend (Hybrid)
- **Java Spring Boot** (Port 8082): Orchestration, game state, API
- **Rust Tokio/Axum** (Port 3001): Temporal engine, 6D search, performance-critical
- **Python Services**: Vector DB (7500), Clippy LLM (7777), MCP Server (9000)

## 🔧 Core Services Status

### Production VPS (191.101.2.178)
```
✅ magic-java (8082)     - Main game API, world state
✅ magic-rust (3001)     - Temporal engine, 6D search  
✅ magic-vector (7500)   - Vector database for AI
✅ magic-clippy (7777)   - Local LLM for characters
✅ magic-mcp (9000)      - Model Context Protocol bridge
✅ caddy                 - Reverse proxy, HTTPS
```

### Key Endpoints
- `GET /api/visibility/worldDiff` - Real-time world changes
- `POST /api/magic/translate` - 6D formula translation
- `POST /api/magic/cast` - Spell casting with temporal effects
- `/mcp/health` - Unified backend status
- `/mcp/context/<entity>` - AI context aggregation

## 🌐 Deployment Architecture

### Local Development
- **Frontend**: `./go start` → React dev servers
- **Backend**: `./go compile` → Maven + Cargo builds
- **Testing**: `./go status` → All services health check

### Production VPS
- **Sync**: `./go deploy` → `VPS_SAFE_SYNC.sh` rsync
- **Services**: systemd managed (magic-*)
- **Monitoring**: `./go vps-status` → Full stack health
- **Domain**: heroesoftime.online (Caddy reverse proxy)

## 🔐 Security & Access

### SSH Keys
- **VPS Access**: `~/.ssh/hot_vps_key` (ed25519)
- **Security**: Private keys removed from git, .gitignore updated

### CORS Configuration
- **Current**: `@CrossOrigin("*")` (development friendly)
- **TODO**: Restrict to `heroesoftime.online` for production

## 🧠 AI Integration

### MCP Server (Model Context Protocol)
**Purpose**: Unified bridge for AI assistants to query all backends
```python
# Aggregates data from:
- Rust temporal engine
- Java game state  
- Vector database
- Clippy LLM
- Local documentation
```

### Living Characters
- **Clippy LLM** (7777): Local language model
- **Vector DB** (7500): Character memory, context
- **Dynamic Dialogues**: Real-time AI responses

## ⚡ Performance Architecture

### Temporal Mechanics
- **Rust Engine**: High-performance temporal calculations
- **Java Orchestration**: Game state management, API layer
- **Memory Buffer**: Deque-based world diff tracking (50 entries)

### 6D Spatial Search
- **Rust Implementation**: Fast magical formula matching
- **Dimensions**: x,y,z + temporal + magical + causal
- **Use Case**: Spell combination discovery

## 📊 Monitoring & DevOps

### Health Checks
```bash
./go status      # Local services
./go vps-status  # Production stack
```

### Key Metrics
- **Load**: System performance
- **Memory**: 1.2Gi/7.8Gi usage
- **Disk**: 23G/96G (24% used)
- **Uptime**: 2+ days stable

## 🔄 Git Workflow

### Branches
- **main**: Development branch
- **prod**: Production deployment (VPS synced)
- **Sync**: Both branches kept in sync

### Deployment
1. Code → `main` branch
2. Merge → `prod` branch  
3. `./go deploy` → VPS sync
4. systemctl restart services

## 🎮 Game Mechanics

### Temporal Features
- **Differential Time**: Different areas age at different rates
- **Causal Fog**: Past actions affect present visibility
- **Memory Tattoos**: Character memory persistence
- **Temporal Formulas**: Time-based spell effects

### World State
- **Real-time Diffs**: `worldDiff` endpoint tracks changes
- **Synchronized**: Java ↔ Rust state consistency
- **Buffered**: Recent changes cached for UI updates

---

*Last Updated: August 16, 2025*
*VPS Status: All services operational ✅*