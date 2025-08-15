#!/bin/bash

echo "🚀 DÉPLOIEMENT SIMPLE HEROES OF TIME"
echo "====================================="
echo ""

# Test connexion
echo "📡 Test de connexion..."
if ! ssh -i ~/.ssh/hot_magic_key root@191.101.2.178 "echo 'Connexion OK'" > /dev/null 2>&1; then
    echo "❌ Erreur: Impossible de se connecter au VPS"
    echo "Vérifie que tu as ajouté la clé sur le serveur!"
    exit 1
fi
echo "✅ Connexion SSH OK"

echo ""
echo "📦 Déploiement des fichiers..."

# Deploy FRONTPAGE
echo "→ FRONTPAGE..."
rsync -avz -e "ssh -i ~/.ssh/hot_magic_key" FRONTPAGE/ root@191.101.2.178:/opt/hot/app/FRONTPAGE/

# Deploy les HTML à la racine
echo "→ Fichiers HTML..."
rsync -avz -e "ssh -i ~/.ssh/hot_magic_key" *.html root@191.101.2.178:/opt/hot/app/

# Deploy assets
echo "→ Assets..."
rsync -avz -e "ssh -i ~/.ssh/hot_magic_key" assets/ root@191.101.2.178:/opt/hot/app/assets/

echo ""
echo "✅ DÉPLOIEMENT TERMINÉ!"
echo ""
echo "🌐 Ton jeu est accessible sur:"
echo "   https://heroesoftime.online"
echo "   https://heroesoftime.online/FRONTPAGE/"
echo ""
