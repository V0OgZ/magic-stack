# 🔴 SURFACE TEAM - LISEZ ÇA EN PREMIER !

## ⚡ 3 CHANGEMENTS OBLIGATOIRES V2

1. **Positions 6D** : {x, y, z, t, c, psi}
2. **Q* remplace embeddings** : 37x plus rapide  
3. **Tick V2 toutes les 100ms** : Sinon désynchronisation

## 📁 CONTENU DE CETTE RELEASE

```
dist/
├── LIRE_EN_PREMIER.md          ← VOUS ÊTES ICI
├── README_URGENT.md            ← API V2 avec exemples
├── binaries/
│   ├── magic-stack.jar         ← Backend Java (port 8080)
│   └── magic-stack-server      ← Backend Rust (port 3001)
└── docs/
    ├── api/                    ← 104 endpoints documentés
    ├── backend/                ← Docs système backend
    └── frontend/               ← Docs intégration React
```

## 🚀 DÉMARRAGE RAPIDE

```bash
# 1. Lancer les backends
java -jar binaries/magic-stack.jar &      # Port 8080
./binaries/magic-stack-server &           # Port 3001

# 2. Tester V2
curl -X POST http://localhost:3001/api/qstar/search \
  -H "Content-Type: application/json" \
  -d '{"center":{"x":0,"y":0,"z":0,"t":0,"c":1,"psi":0.5},"radius":10}'
```

## ⚠️ ERREURS À ÉVITER

- ❌ Position {x, y} → ✅ Position {x, y, z, t, c, psi}
- ❌ /embed → ✅ /api/qstar/search
- ❌ Oublier le tick → ✅ setInterval(tick, 100)

---

**Questions ? Lisez d'abord docs/api/API_REFERENCE_COMPLETE_V2.md**
