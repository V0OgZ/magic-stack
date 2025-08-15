#!/bin/bash

# SCRIPT DE NETTOYAGE - JOUR 35
# Vincent, vérifie avant d'exécuter!

echo "========================================"
echo "NETTOYAGE DES FICHIERS HORS GIT"
echo "========================================"
echo ""
echo "CE SCRIPT VA:"
echo "1. Déplacer les fichiers clippy dans magic-stack/scripts/"
echo "2. Supprimer les dossiers dupliqués (hot/, apps/)"
echo "3. Nettoyer les fichiers à la racine"
echo ""
echo "BACKUP DÉJÀ FAIT dans: magic-stack/BACKUP_JOUR35/"
echo ""
read -p "Continuer? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    cd /Volumes/HOT_DEV/Magic
    
    # Créer dossier scripts si n'existe pas
    mkdir -p magic-stack/scripts/clippy
    
    # Déplacer les fichiers clippy
    echo "Déplacement des fichiers clippy..."
    mv clippy*.py magic-stack/scripts/clippy/ 2>/dev/null
    mv test_clippy*.* magic-stack/scripts/clippy/ 2>/dev/null
    mv LANCE_CLIPPY_MEMENTO.sh magic-stack/scripts/clippy/ 2>/dev/null
    mv test_minilm.py magic-stack/scripts/clippy/ 2>/dev/null
    
    # Déplacer les MD importants
    echo "Déplacement des docs..."
    mv AI_PERSONALITIES_SYSTEM.md magic-stack/docs/ 2>/dev/null
    mv CLARIFICATION_SYSTEMES_CLIPPY.md magic-stack/docs/ 2>/dev/null
    mv CLIPPY_MODE_DEV_PLAN.md magic-stack/docs/ 2>/dev/null
    
    # Déplacer update_vector_db
    mv update_vector_db_hot_content.py magic-stack/scripts/ 2>/dev/null
    
    # Supprimer les dossiers dupliqués
    echo "Suppression des dossiers dupliqués..."
    rm -rf hot/
    rm -rf apps/
    rm -rf docs/
    rm -rf logs/
    
    # Supprimer fichiers temporaires
    rm -f llm 2>/dev/null
    
    echo ""
    echo "✅ NETTOYAGE TERMINÉ!"
    echo ""
    echo "Structure nettoyée:"
    echo "/Volumes/HOT_DEV/Magic/"
    echo "└── magic-stack/           (LE SEUL REPO GIT)"
    echo "    ├── BACKUP_JOUR35/     (sauvegarde au cas où)"
    echo "    ├── scripts/clippy/    (fichiers clippy déplacés ici)"
    echo "    ├── hot/               (avec les MD récupérés)"
    echo "    └── apps/              (version officielle)"
    
else
    echo "Annulé."
fi
