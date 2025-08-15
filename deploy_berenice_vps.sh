#!/bin/bash

echo "🚀 DÉPLOIEMENT DE BÉRÉNICE SUR VPS"
echo "==================================="
echo ""

# 1. Copier le jeu dans FRONTPAGE pour qu'il soit accessible
echo "📁 Copie du jeu dans FRONTPAGE..."
cp BERENICE_BRUHNNICE_GAME.html FRONTPAGE/berenice.html

# 2. Copier aussi les images
echo "🖼️ Copie des images..."
mkdir -p FRONTPAGE/BALLON_CUBE/PICS_CHARACTERS
cp -r BALLON_CUBE/PICS_CHARACTERS/*.png FRONTPAGE/BALLON_CUBE/PICS_CHARACTERS/ 2>/dev/null || true

# 3. Commit et push
echo "📤 Git commit..."
git add FRONTPAGE/berenice.html FRONTPAGE/BALLON_CUBE
git commit -m "Deploy_Berenice_to_FRONTPAGE" || true
git push

# 4. Sync sur VPS
echo "🔄 Synchronisation VPS..."
ssh -i ~/.ssh/hot_magic_key root@191.101.2.178 "cd /opt/hot/app && ./VPS_SAFE_SYNC.sh"

# 5. Vérifier
echo ""
echo "✅ DÉPLOYÉ !"
echo ""
echo "🎮 Pour jouer:"
echo "   https://heroesoftime.online/FRONTPAGE/berenice.html"
echo ""
echo "📱 Pour installer sur iPhone/iPad:"
echo "   1. Ouvrir dans Safari"
echo "   2. Partager > Sur l'écran d'accueil"
echo ""
