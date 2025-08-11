#!/bin/bash

# 🗂️ ORGANISE LES DOCS SANS RIEN PERDRE
# Créé des liens symboliques au lieu de déplacer

echo "🗂️ ORGANISATION DES DOCS (SANS RIEN CASSER)"
echo "==========================================="
echo ""

# 1. Créer la structure organisée
echo "📁 Création de la structure..."
mkdir -p docs_organized/1_URGENT_V2
mkdir -p docs_organized/2_API
mkdir -p docs_organized/3_BACKEND
mkdir -p docs_organized/4_FRONTEND
mkdir -p docs_organized/5_SYSTEMES
mkdir -p docs_organized/6_ARCHIVES

# 2. Créer des LIENS (pas déplacer) pour ne rien perdre
echo "🔗 Création des liens symboliques..."

# Docs URGENTES V2
ln -sf "../../🔴_API_V2_LIRE_ICI_🔴.md" docs_organized/1_URGENT_V2/README.md 2>/dev/null
ln -sf ../../DOCUMENTATION_SURFACE_V2_MIGRATION.md docs_organized/1_URGENT_V2/ 2>/dev/null
ln -sf ../../API_REFERENCE_COMPLETE_V2.md docs_organized/1_URGENT_V2/ 2>/dev/null

# API
ln -sf ../../API_REFERENCE_COMPLETE_V2.md docs_organized/2_API/ 2>/dev/null
ln -sf ../../v2spec/API_SURFACE_COMPLETE.md docs_organized/2_API/ 2>/dev/null || true
ln -sf ../../docs/PORTS_SERVICES.md docs_organized/2_API/ 2>/dev/null || true

# Backend
ln -sf ../../SYSTEME_IA_VECTOR_DB_COMPLET.md docs_organized/3_BACKEND/ 2>/dev/null
ln -sf ../../AI_PERSONALITIES_SYSTEM.md docs_organized/3_BACKEND/ 2>/dev/null
ln -sf ../../clippy_dev_server.py docs_organized/3_BACKEND/ 2>/dev/null

# Frontend
ln -sf ../../INTEGRATION_COMPLETE_RAPPORT.md docs_organized/4_FRONTEND/ 2>/dev/null
for file in POUR_INTEGRATEUR_*.md; do
    [ -f "$file" ] && ln -sf "../../$file" docs_organized/4_FRONTEND/ 2>/dev/null
done
for file in GUIDE_INTEGRATEUR_*.md; do
    [ -f "$file" ] && ln -sf "../../$file" docs_organized/4_FRONTEND/ 2>/dev/null
done

# Systèmes
ln -sf ../../MEMOIRE_CRITIQUE_NE_PAS_OUBLIER.md docs_organized/5_SYSTEMES/ 2>/dev/null
ln -sf ../../MESSAGE_POUR_SURFACE_TEAM.md docs_organized/5_SYSTEMES/ 2>/dev/null
ln -sf ../../NOTRE_PROCEDURE_PUBLISH_BINARIES.md docs_organized/5_SYSTEMES/ 2>/dev/null

# 3. Créer un INDEX principal
cat > docs_organized/INDEX.md << 'EOF'
# 📚 INDEX DOCUMENTATION MAGIC STACK V2

## 🔴 1. URGENT - MIGRATION V2
- [API V2 - LIRE EN PREMIER](1_URGENT_V2/README.md)
- [Documentation Migration V2](1_URGENT_V2/DOCUMENTATION_SURFACE_V2_MIGRATION.md)
- [API Reference Complete](1_URGENT_V2/API_REFERENCE_COMPLETE_V2.md)

## 📡 2. API & ENDPOINTS
- [104 Endpoints V2](2_API/API_REFERENCE_COMPLETE_V2.md)
- [Ports et Services](2_API/PORTS_SERVICES.md)
- [API Surface Complete](2_API/API_SURFACE_COMPLETE.md)

## 🔧 3. BACKEND
- [Système IA + Vector DB](3_BACKEND/SYSTEME_IA_VECTOR_DB_COMPLET.md)
- [AI Personalities](3_BACKEND/AI_PERSONALITIES_SYSTEM.md)
- [Clippy Dev Server](3_BACKEND/clippy_dev_server.py)

## 🎨 4. FRONTEND
- [Rapport Intégration](4_FRONTEND/INTEGRATION_COMPLETE_RAPPORT.md)
- [Pour Intégrateur - IA](4_FRONTEND/POUR_INTEGRATEUR_SYSTEME_IA_VIVANTE.md)
- [Guide Assets V2](4_FRONTEND/GUIDE_INTEGRATEUR_ASSETS_V2.md)

## ⚙️ 5. SYSTÈMES
- [Mémoire Critique](5_SYSTEMES/MEMOIRE_CRITIQUE_NE_PAS_OUBLIER.md)
- [Procédure Binaires](5_SYSTEMES/NOTRE_PROCEDURE_PUBLISH_BINARIES.md)
- [Message Surface](5_SYSTEMES/MESSAGE_POUR_SURFACE_TEAM.md)

## 📂 Structure Complète
```
docs_organized/
├── INDEX.md              ← VOUS ÊTES ICI
├── 1_URGENT_V2/         ← Breaking changes V2
├── 2_API/               ← Tous les endpoints
├── 3_BACKEND/           ← Système backend
├── 4_FRONTEND/          ← Intégration React
├── 5_SYSTEMES/          ← Procédures internes
└── 6_ARCHIVES/          ← Ancien (V1)
```

## ⚠️ IMPORTANT
- Les fichiers originaux sont TOUJOURS à la racine
- Ce dossier contient des LIENS symboliques
- Rien n'a été déplacé ou supprimé
EOF

# 4. Vérifier que rien n'est cassé
echo ""
echo "🔍 Vérification des liens..."
BROKEN=0
for link in $(find docs_organized -type l); do
    if [ ! -e "$link" ]; then
        echo "❌ Lien cassé : $link"
        BROKEN=$((BROKEN + 1))
    fi
done

if [ $BROKEN -eq 0 ]; then
    echo "✅ Tous les liens sont valides !"
else
    echo "⚠️  $BROKEN liens cassés détectés"
fi

# 5. Résumé
echo ""
echo "📊 RÉSUMÉ :"
echo "  - Documents à la racine : $(ls -1 *.md 2>/dev/null | wc -l)"
echo "  - Liens créés : $(find docs_organized -type l | wc -l)"
echo "  - Rien supprimé : ✅"
echo "  - Rien déplacé : ✅"
echo ""
echo "📁 Structure organisée dans : docs_organized/"
echo "📖 Index principal : docs_organized/INDEX.md"
echo ""
echo "💡 Les fichiers originaux sont TOUJOURS accessibles à la racine !"
