#!/bin/bash

# 📦 PRÉPARE UNE RELEASE COMPLÈTE POUR SURFACE/FRONTEND
# Avec binaires + TOUTES les docs V2 organisées

echo "🚀 PRÉPARATION RELEASE COMPLÈTE POUR SURFACE"
echo "==========================================="
echo ""

# 1. Nettoyer dist/
echo "🧹 Nettoyage..."
rm -rf dist/
mkdir -p dist/binaries
mkdir -p dist/docs/backend
mkdir -p dist/docs/frontend
mkdir -p dist/docs/api

# 2. Compiler si nécessaire
echo "🔨 Compilation des binaires..."
if [ -f "Magic-Stack/build.sh" ]; then
    cd Magic-Stack
    ./build.sh
    cd ..
fi

# 3. Copier les binaires
echo "📦 Organisation des binaires..."
if [ -f "backends/java/target/magic-stack-backend-1.0.0-APOLLO.jar" ]; then
    cp backends/java/target/magic-stack-backend-1.0.0-APOLLO.jar dist/binaries/magic-stack.jar
fi
if [ -f "backends/rust/target/release/magic-stack-server" ]; then
    cp backends/rust/target/release/magic-stack-server dist/binaries/
fi

# 4. Copier TOUTES les docs importantes pour Surface
echo "📋 Organisation des docs V2..."

# Docs critiques pour migration
cp "🔴_API_V2_LIRE_ICI_🔴.md" dist/README_URGENT.md 2>/dev/null
cp DOCUMENTATION_SURFACE_V2_MIGRATION.md dist/docs/backend/ 2>/dev/null
cp API_REFERENCE_COMPLETE_V2.md dist/docs/api/ 2>/dev/null

# Docs backend
cp SYSTEME_IA_VECTOR_DB_COMPLET.md dist/docs/backend/ 2>/dev/null
cp AI_PERSONALITIES_SYSTEM.md dist/docs/backend/ 2>/dev/null
cp docs/PORTS_SERVICES.md dist/docs/backend/ 2>/dev/null

# Docs frontend/intégration
cp INTEGRATION_COMPLETE_RAPPORT.md dist/docs/frontend/ 2>/dev/null
cp POUR_INTEGRATEUR_*.md dist/docs/frontend/ 2>/dev/null
cp GUIDE_INTEGRATEUR_*.md dist/docs/frontend/ 2>/dev/null

# Message pour Surface
cat > dist/LIRE_EN_PREMIER.md << 'EOF'
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
EOF

# 5. Créer archive ZIP
echo "📦 Création de l'archive..."
cd dist
zip -r magic-stack-v2-complete.zip . -q
cd ..

# 6. Résumé
echo ""
echo "✅ RELEASE PRÊTE !"
echo ""
echo "📊 Contenu :"
echo "  - $(ls -1 dist/binaries/ | wc -l) binaires"
echo "  - $(find dist/docs -name "*.md" | wc -l) documents"
echo "  - Archive : dist/magic-stack-v2-complete.zip"
echo ""
echo "📤 Pour publier sur GitHub :"
echo "  ./PUBLISH_RELEASE_GITHUB.sh v2.0.0"
echo ""
echo "📋 Structure :"
ls -la dist/
