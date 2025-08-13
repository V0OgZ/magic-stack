#!/bin/bash

# Compresser les images trop lourdes
echo "Compression des images HD..."

# Trouver les images > 500KB
find FRONTPAGE/assets -type f \( -name "*.png" -o -name "*.jpg" \) -size +500k | while read img; do
    size=$(ls -lh "$img" | awk '{print $5}')
    echo "Compression: $img ($size)"
    
    # Utiliser sips (Mac) pour réduire à 1920px max et qualité 85%
    sips -Z 1920 "$img" --setProperty formatOptions 85
done

echo "Fait! Upload avec: rsync -avz FRONTPAGE/assets/ root@191.101.2.178:/opt/hot/app/FRONTPAGE/assets/"
