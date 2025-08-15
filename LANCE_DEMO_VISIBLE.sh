#!/bin/bash

echo "🎮 DÉMO VISUELLE AUTOMATIQUE DE BÉRÉNICE"
echo "========================================="
echo ""
echo "Cette démo va:"
echo "  1. Ouvrir un navigateur VISIBLE"
echo "  2. Jouer automatiquement le jeu"
echo "  3. Montrer les 3 niveaux + avatars"
echo ""

# Vérifier si playwright est installé
if ! npm list playwright >/dev/null 2>&1; then
    echo "📦 Installation de Playwright..."
    npm install playwright
fi

# Vérifier si le fichier HTML existe
if [ ! -f "BERENICE_BRUHNNICE_GAME.html" ]; then
    echo "❌ Erreur: BERENICE_BRUHNNICE_GAME.html introuvable!"
    exit 1
fi

echo "🚀 Lancement de la démo..."
echo ""

# Lancer le test visible
node test_berenice_visible.js

echo ""
echo "✅ Démo terminée!"
