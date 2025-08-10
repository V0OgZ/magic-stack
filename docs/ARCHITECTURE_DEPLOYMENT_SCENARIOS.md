# 🌐 Architecture Multi-Déploiement Magic Stack

## 🎯 Vision : Une architecture, 3 modes

### 1️⃣ **MODE CLOUD** (Production)
```
┌─────────────────────────────────────┐
│         SERVEUR CENTRAL             │
│  ┌─────────────────────────────┐   │
│  │     Rust Backend (3001)     │   │
│  │     Java Backend (8080)     │   │
│  │     Vector DB (5001)        │   │
│  │     PostgreSQL              │   │
│  └─────────────────────────────┘   │
│                 ↕️ API              │
└─────────────────────────────────────┘
                  ↕️ HTTPS
    ┌──────────┬──────────┬──────────┐
    │ Client 1 │ Client 2 │ Client N │
    │  (PWA)   │  (PWA)   │  (PWA)   │
    └──────────┴──────────┴──────────┘
```

**Stockage :**
- Maps/Scénarios : **PostgreSQL serveur**
- Assets : **CDN**
- Sauvegardes joueur : **Cloud (user account)**

### 2️⃣ **MODE HYBRID** (Early Access)
```
┌─────────────────────────────────────┐
│      SERVEUR COMMUNAUTAIRE          │
│  ┌─────────────────────────────┐   │
│  │   Marketplace Scénarios     │   │
│  │   Leaderboards              │   │
│  │   Multiplayer Matchmaking   │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
                  ↕️ HTTPS (optionnel)
┌─────────────────────────────────────┐
│         CLIENT LOCAL                │
│  ┌─────────────────────────────┐   │
│  │   Rust Backend (local)      │   │
│  │   Java Backend (local)      │   │
│  │   SQLite (local)            │   │
│  │   React App                 │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Stockage :**
- Maps officielles : **Bundled dans l'app**
- Maps custom : **SQLite local**
- Maps partagées : **Téléchargées du serveur**

### 3️⃣ **MODE STANDALONE** (DMG Mac / Offline)
```
┌─────────────────────────────────────┐
│          MAGIC STACK.app            │
│  ┌─────────────────────────────┐   │
│  │   Electron Wrapper          │   │
│  │   ┌──────────────────┐      │   │
│  │   │  React Frontend  │      │   │
│  │   └──────────────────┘      │   │
│  │   ┌──────────────────┐      │   │
│  │   │  Rust Binary     │      │   │
│  │   │  Java JRE Bundle │      │   │
│  │   │  SQLite Embedded │      │   │
│  │   │  Vector DB Local │      │   │
│  │   └──────────────────┘      │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Stockage :**
- Tout : **~/Library/Application Support/MagicStack/**
- Pas de connexion externe requise

## 🔄 Stratégie de Connexion Adaptative

```typescript
// MagicStackAPI détecte automatiquement le mode
class MagicStackAPI {
  private mode: 'cloud' | 'hybrid' | 'standalone';
  
  async detectMode() {
    // 1. Check if Electron (standalone)
    if (window.electron) {
      this.mode = 'standalone';
      this.endpoints = {
        rust: 'http://localhost:3001',
        java: 'http://localhost:8080',
        vector: 'http://localhost:5001'
      };
      return;
    }
    
    // 2. Try cloud endpoints
    try {
      await fetch('https://api.magicstack.cloud/health');
      this.mode = 'cloud';
      this.endpoints = {
        rust: 'https://api.magicstack.cloud',
        java: 'https://api.magicstack.cloud',
        vector: 'https://vector.magicstack.cloud'
      };
      return;
    } catch {
      // 3. Fallback to hybrid/local
      this.mode = 'hybrid';
      this.endpoints = {
        rust: 'http://localhost:3001',
        java: 'http://localhost:8080',
        vector: 'http://localhost:5001'
      };
    }
  }
}
```

## 📦 Gestion des Scénarios/Maps

### Structure universelle
```json
{
  "scenario": {
    "id": "uuid",
    "version": "1.0.0",
    "metadata": {
      "name": "Battle of Avalon",
      "author": "Vincent",
      "created": "2024-01-01",
      "mode": "campaign|custom|multiplayer"
    },
    "data": {
      "map": {...},
      "events": [...],
      "victory": {...}
    },
    "storage": {
      "origin": "local|cloud|bundled",
      "syncStatus": "synced|pending|conflict"
    }
  }
}
```

### Sync Strategy
```typescript
class ScenarioManager {
  async save(scenario: Scenario) {
    // 1. Always save locally first
    await this.saveLocal(scenario);
    
    // 2. If connected, sync to cloud
    if (this.isConnected && this.hasAccount) {
      await this.syncToCloud(scenario);
    }
    
    // 3. Mark for later sync if offline
    if (!this.isConnected && this.hasAccount) {
      await this.markPendingSync(scenario);
    }
  }
  
  async load(id: string) {
    // 1. Check local cache
    let scenario = await this.loadLocal(id);
    
    // 2. If not found and connected, fetch from cloud
    if (!scenario && this.isConnected) {
      scenario = await this.fetchFromCloud(id);
      await this.cacheLocally(scenario);
    }
    
    return scenario;
  }
}
```

## 🚀 Build Configurations

### 1. Web (PWA)
```bash
npm run build:web
# → dist/web/
# Deploy to CDN/Vercel/Netlify
```

### 2. Desktop (Electron)
```bash
npm run build:desktop
# → dist/MagicStack.dmg (Mac)
# → dist/MagicStack.exe (Windows)
# → dist/MagicStack.AppImage (Linux)
```

### 3. Server Bundle
```bash
npm run build:server
# → Docker image with all backends
docker run magicstack/server
```

## 💾 Data Storage Strategy

| Type | Cloud | Hybrid | Standalone |
|------|-------|--------|------------|
| **Maps officielles** | CDN | Bundled | Bundled |
| **Maps custom** | PostgreSQL | SQLite + Sync | SQLite |
| **Sauvegardes** | User Cloud | Local + Sync | Local only |
| **Assets** | CDN | Cached locally | Bundled |
| **Vector DB** | Centralized | Local + Updates | Bundled |

## 🔐 Authentication

### Cloud Mode
- OAuth2 (Google, Discord, Steam)
- JWT tokens
- Account required for multiplayer

### Hybrid Mode
- Optional account
- Local play always available
- Login for marketplace/multiplayer

### Standalone Mode
- No auth required
- Local profiles only
- LAN multiplayer via direct IP

## 📱 Installation Flow

### Mac DMG
```
1. Download MagicStack.dmg
2. Drag to Applications
3. First launch:
   - Checks for online mode
   - Downloads latest data if connected
   - Works offline immediately
```

### PWA
```
1. Visit https://play.magicstack.cloud
2. "Add to Home Screen" prompt
3. Works offline after first load
4. Background sync when online
```

## 🎯 Recommandations

### Pour le développement (maintenant)
- **Utiliser le mode HYBRID**
- Backends locaux + React dev server
- SQLite pour tests rapides

### Pour la production (futur)
- **Cloud-first avec fallback local**
- PWA pour accessibilité maximale
- DMG/EXE pour joueurs hardcore

### Architecture de données
```
CLIENT (React)
  ↓ MagicStackAPI
ADAPTER LAYER (détecte le mode)
  ↓ Routing intelligent
BACKENDS (Local ou Cloud)
  ↓ Storage approprié
DATA (SQLite/PostgreSQL/FileSystem)
```

## 💡 Avantages de cette approche

1. **Une seule codebase** React/TypeScript
2. **Flexibilité totale** de déploiement
3. **Offline-first** mais cloud-ready
4. **Progressive enhancement** (marche partout)
5. **Future-proof** pour Steam/Epic Games

---

*"Write once, run anywhere, sync everywhere"* 🌟
