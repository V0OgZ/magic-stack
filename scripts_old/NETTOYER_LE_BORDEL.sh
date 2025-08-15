#!/bin/bash

# 🧹 SCRIPT POUR NETTOYER LE BORDEL
# Par Vincent, le balayeur en chef

echo "🧹 NETTOYAGE DU BORDEL EN COURS..."
echo ""

# Créer les bons dossiers
mkdir -p archives/old_md
mkdir -p archives/old_html
mkdir -p archives/old_scripts
mkdir -p docs/POUR_SURFACE_SEULEMENT

# DÉPLACER tout le bordel
echo "📦 Archivage des 63 MD inutiles..."
mv *_OLD.md archives/old_md/ 2>/dev/null
mv *_BACKUP*.md archives/old_md/ 2>/dev/null
mv *_TEST*.md archives/old_md/ 2>/dev/null
mv RAPPORT_*.md archives/old_md/ 2>/dev/null
mv STATUS_*.md archives/old_md/ 2>/dev/null
mv ANALYSE_*.md archives/old_md/ 2>/dev/null

echo "📦 Archivage des 200 HTML de merde..."
mv *_DEMO*.html archives/old_html/ 2>/dev/null
mv *_TEST*.html archives/old_html/ 2>/dev/null
mv *_OLD*.html archives/old_html/ 2>/dev/null

echo "📦 Archivage des scripts dupliqués..."
mv LANCE_*.sh archives/old_scripts/ 2>/dev/null
mv FIX_*.sh archives/old_scripts/ 2>/dev/null
mv UPDATE_*.sh archives/old_scripts/ 2>/dev/null

# GARDER seulement l'essentiel
echo ""
echo "✅ FICHIERS GARDÉS :"
echo "  - README.md"
echo "  - DOCUMENTATION_SURFACE_V2_MIGRATION.md"
echo "  - API_REFERENCE_COMPLETE_V2.md"  
echo "  - Magic-Stack/build.sh"
echo "  - h (menu principal)"
echo ""

echo "🗑️  FICHIERS ARCHIVÉS :"
echo "  - $(ls archives/old_md/ 2>/dev/null | wc -l) MD inutiles"
echo "  - $(ls archives/old_html/ 2>/dev/null | wc -l) HTML de test"
echo "  - $(ls archives/old_scripts/ 2>/dev/null | wc -l) scripts dupliqués"
echo ""

echo "🎯 Pour Surface, ils doivent lire SEULEMENT :"
echo "  1. docs/POUR_SURFACE_SEULEMENT/README_SURFACE_V2.md"
echo "  2. DOCUMENTATION_SURFACE_V2_MIGRATION.md"
echo "  3. API_REFERENCE_COMPLETE_V2.md"
echo ""
echo "✅ NETTOYAGE TERMINÉ !"
