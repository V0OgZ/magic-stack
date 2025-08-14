#!/bin/bash

# 🏗️ RÉORGANISATION CLAIRE - V2 vs V1, BACKEND vs FRONTEND
# Pour que chaque équipe sache OÙ chercher

echo "🏗️ RÉORGANISATION COMPLÈTE - STRUCTURE CLAIRE"
echo "=============================================="
echo ""

# 1. CRÉER LA NOUVELLE STRUCTURE
echo "📁 Création de la structure V2..."
mkdir -p v2/backend/docs
mkdir -p v2/backend/api
mkdir -p v2/frontend/docs
mkdir -p v2/frontend/components
mkdir -p v2/shared
mkdir -p v1_archives/old_md
mkdir -p v1_archives/old_html
mkdir -p v1_archives/old_scripts

# 2. DÉPLACER LES DOCS V2 BACKEND
echo "📦 Organisation V2 BACKEND..."
cp DOCUMENTATION_SURFACE_V2_MIGRATION.md v2/backend/docs/ 2>/dev/null
cp API_REFERENCE_COMPLETE_V2.md v2/backend/api/ 2>/dev/null
cp SYSTEME_IA_VECTOR_DB_COMPLET.md v2/backend/docs/ 2>/dev/null
cp AI_PERSONALITIES_SYSTEM.md v2/backend/docs/ 2>/dev/null
cp docs/PORTS_SERVICES.md v2/backend/api/ 2>/dev/null

# 3. DÉPLACER LES DOCS V2 FRONTEND  
echo "📦 Organisation V2 FRONTEND..."
cp INTEGRATION_COMPLETE_RAPPORT.md v2/frontend/docs/ 2>/dev/null
cp POUR_INTEGRATEUR_*.md v2/frontend/docs/ 2>/dev/null
cp GUIDE_INTEGRATEUR_*.md v2/frontend/docs/ 2>/dev/null

# 4. CRÉER UN INDEX CLAIR
cat > v2/README_V2_STRUCTURE.md << 'EOF'
# 📋 STRUCTURE V2 - ORGANISATION CLAIRE

## 🔴 POUR L'ÉQUIPE BACKEND (Surface)

```
v2/backend/
├── docs/
│   ├── DOCUMENTATION_SURFACE_V2_MIGRATION.md  # ⭐ À LIRE EN PREMIER
│   ├── SYSTEME_IA_VECTOR_DB_COMPLET.md
│   └── AI_PERSONALITIES_SYSTEM.md
└── api/
    ├── API_REFERENCE_COMPLETE_V2.md          # ⭐ 104 ENDPOINTS
    └── PORTS_SERVICES.md
```

### Quick Start Backend:
1. Lire `DOCUMENTATION_SURFACE_V2_MIGRATION.md`
2. Utiliser `API_REFERENCE_COMPLETE_V2.md` comme référence
3. Ports: 3001 (Rust), 8080 (Java), 5001 (Python)

---

## 🔵 POUR L'ÉQUIPE FRONTEND (Intégrateur)

```
v2/frontend/
├── docs/
│   ├── INTEGRATION_COMPLETE_RAPPORT.md
│   ├── POUR_INTEGRATEUR_SYSTEME_IA_VIVANTE.md
│   └── GUIDE_INTEGRATEUR_ASSETS_V2.md
└── components/
    └── (React components specs)
```

### Quick Start Frontend:
1. App React dans `apps/magic-stack-unified/`
2. NE PAS créer de nouveaux HTML
3. Utiliser les endpoints de `v2/backend/api/`

---

## ⚠️ BREAKING CHANGES V2

1. **Positions 6D obligatoires** : {x, y, z, t, c, psi}
2. **Q* remplace embeddings** : 37x plus rapide
3. **Tick V2 obligatoire** : /api/v2/tick toutes les 100ms

---

## 🗑️ ANCIEN (V1) - NE PAS UTILISER

Tout dans `v1_archives/` = obsolète
EOF

# 5. ARCHIVER LE VIEUX BORDEL
echo "🗑️ Archivage du bordel V1..."
mv *_OLD*.md v1_archives/old_md/ 2>/dev/null
mv *_BACKUP*.md v1_archives/old_md/ 2>/dev/null
mv RAPPORT_*.md v1_archives/old_md/ 2>/dev/null
mv STATUS_*.md v1_archives/old_md/ 2>/dev/null
mv BILAN_*.md v1_archives/old_md/ 2>/dev/null
mv *_DEMO*.html v1_archives/old_html/ 2>/dev/null
mv *_TEST*.html v1_archives/old_html/ 2>/dev/null

# 6. CRÉER DES RACCOURCIS CLAIRS
echo "🔗 Création des raccourcis..."
ln -sf v2/backend/docs/DOCUMENTATION_SURFACE_V2_MIGRATION.md BACKEND_V2_MIGRATION.md
ln -sf v2/backend/api/API_REFERENCE_COMPLETE_V2.md BACKEND_API_V2.md
ln -sf v2/frontend/docs/INTEGRATION_COMPLETE_RAPPORT.md FRONTEND_INTEGRATION.md

# 7. RÉSUMÉ
echo ""
echo "✅ RÉORGANISATION TERMINÉE !"
echo ""
echo "📊 STRUCTURE CLAIRE :"
echo "  v2/backend/     → Pour l'équipe Surface (backend)"
echo "  v2/frontend/    → Pour l'intégrateur (React)"
echo "  v2/shared/      → Partagé entre les deux"
echo "  v1_archives/    → Ancien bordel (ignorez)"
echo ""
echo "🎯 FICHIERS ESSENTIELS :"
echo "  Backend  → v2/backend/docs/DOCUMENTATION_SURFACE_V2_MIGRATION.md"
echo "  Frontend → apps/magic-stack-unified/ (React app)"
echo ""
echo "📦 Archivé :"
ls -1 v1_archives/old_md/ 2>/dev/null | wc -l | xargs echo "  - MD obsolètes:"
ls -1 v1_archives/old_html/ 2>/dev/null | wc -l | xargs echo "  - HTML de test:"
