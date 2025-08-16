# 🚀 MAGIC STACK - RÉFÉRENCE PORTS COMPLÈTE

## 📍 PORTS SYNCHRONISÉS MAC ↔ VPS

### 🎨 FRONTEND (Développement Local)
| Port | Service | URL | Status |
|------|---------|-----|--------|
| **5173** | World Editor React | http://localhost:5173 | Dev only |
| **5176** | Unified Game App | http://localhost:5176 | Main frontend |
| **8000** | HTML Server | http://localhost:8000 | Static files |
| **8001** | HTTP Server (Python) | http://localhost:8001 | Local server |

### ⚙️ BACKENDS (Core Services - Identiques Mac/VPS)
| Port | Service | Description | Endpoints |
|------|---------|-------------|-----------|
| **3001** | Rust Engine | Temporal mechanics, 6D search | `/engine/*` |
| **8082** | Java Spring Boot | Game state, magic API | `/api/*` |

### 🤖 AI SERVICES
| Port | Service | Environment | Description |
|------|---------|-------------|-------------|
| **5000** | Vector DB | Mac Local | Python vector service (dev) |
| **7500** | Vector DB | VPS Prod | Production vector service |
| **7777** | Clippy LLM | Mac + VPS | Character AI, dialogues |
| **9000** | MCP Server | Mac + VPS | Model Context Protocol bridge |

## 🌐 VPS PRODUCTION (heroesoftime.online)

### Frontend Routes (via Caddy)
- `/` → Landing page
- `/world-editor/` → World Editor build
- `/html/*` → Legacy HTML interfaces
- `/HTML_INDEX.html` → Dashboard
- `/api/*` → Java Backend (8082)
- `/engine/*` → Rust Backend (3001)
- `/vector/*` → Vector DB (7500)
- `/clippy/*` → Clippy LLM (7777)
- `/mcp/*` → MCP Server (9000)

### Services systemd
```bash
# Tous les services VPS
systemctl status magic-java magic-rust magic-vector magic-clippy magic-mcp caddy

# Redémarrer tous
systemctl restart magic-java magic-rust magic-vector magic-clippy magic-mcp
```

## 🔧 COMMANDES DE VÉRIFICATION

### Local (Mac)
```bash
./go status          # Status tous services locaux
./go start           # Démarre tous les services
./go stop            # Arrête tous les services
```

### VPS
```bash
./go vps-status      # Status complet VPS via SSH
ssh -i ~/.ssh/hot_vps_key root@191.101.2.178 "systemctl status magic-*"
```

### Tests API
```bash
# Local
curl http://localhost:8082/api/health
curl http://localhost:3001/health
curl http://localhost:9000/mcp/health

# VPS
curl https://heroesoftime.online/api/health
curl https://heroesoftime.online/engine/health
curl https://heroesoftime.online/mcp/health
```

## ⚠️ CONFLITS RÉSOLUS

### Vector DB
- **Mac**: Port 5000 (développement local)
- **VPS**: Port 7500 (production)
- **Raison**: Éviter les conflits, services différents

### Clippy LLM
- **Ancien**: 7501 (incorrect)
- **Nouveau**: 7777 (correct, synchronisé)
- **Fix**: Mis à jour dans MCP Server et monitoring

## 🎯 RÈGLES DE PORTS

1. **Backends Core** (3001, 8082) → **Identiques** Mac/VPS
2. **Frontend Dev** (5173, 5176) → **Mac uniquement**
3. **AI Services** (7777, 9000) → **Identiques** Mac/VPS
4. **Vector DB** → **Différent** (5000 Mac, 7500 VPS)
5. **Caddy/HTTPS** → **VPS uniquement** (80, 443)

## 📊 STATUS ACTUEL

### Mac Local
```
✅ Vector DB (5000)
✅ HTTP Server (8001)  
✅ MCP Server (9000)
❌ Rust (3001) - À démarrer si besoin
❌ Java (8082) - À démarrer si besoin
```

### VPS Production
```
✅ magic-java (8082)
✅ magic-rust (3001)
✅ magic-vector (7500)
✅ magic-clippy (7777)
✅ magic-mcp (9000)
✅ caddy (80, 443)
```

---
*Dernière mise à jour: 16 août 2025*
*Synchronisation Mac/VPS: ✅ Complète*