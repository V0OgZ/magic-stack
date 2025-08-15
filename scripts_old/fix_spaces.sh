#!/bin/bash

# Script pour renommer les fichiers avec espaces
# Remplace les espaces par des underscores

echo "🔧 Fix des espaces dans les noms de fichiers..."

# Copier d'abord pour pas perdre les originaux
cp -r FRONTPAGE/assets FRONTPAGE/assets_backup

# Renommer tous les fichiers avec espaces
find FRONTPAGE/assets -type f -name "* *" | while read file; do
    newfile=$(echo "$file" | tr ' ' '_')
    mv "$file" "$newfile"
    echo "✅ Renommé: $(basename "$file") → $(basename "$newfile")"
done

echo ""
echo "📝 Maintenant il faut updater le HTML..."
echo ""

# Updater les références dans index.html
sed -i.bak 's/Sorceress of Time and Power/Sorceress_of_Time_and_Power/g' FRONTPAGE/index.html
sed -i.bak "s/Excalibur's Temporal Strike/Excaliburs_Temporal_Strike/g" FRONTPAGE/index.html
sed -i.bak 's/Cosmic Bear Shaman in Starlit Expanse/Cosmic_Bear_Shaman_in_Starlit_Expanse/g' FRONTPAGE/index.html

echo "✅ Fait! Upload maintenant:"
echo "rsync -avz FRONTPAGE/assets/ user@herosoftime.online:/path/to/assets/"
