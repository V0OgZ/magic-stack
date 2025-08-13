#!/bin/bash

# FIX SUPER SIMPLE - On change juste les paths dans le HTML

echo "🔧 Fix simple des images..."

# Backup
cp FRONTPAGE/index.html FRONTPAGE/index_backup.html

# Remplacer tous les src="assets/ par src="/FRONTPAGE/assets/
sed -i '' 's|src="assets/|src="/FRONTPAGE/assets/|g' FRONTPAGE/index.html

echo "✅ Fait! Maintenant upload:"
echo "scp FRONTPAGE/index.html user@heroesoftime.online:/var/www/FRONTPAGE/"

echo ""
echo "Ou si GPT galère encore, on fait ENCORE PLUS SIMPLE:"
echo "On met tout dans /var/www/assets direct et on oublie FRONTPAGE!"
