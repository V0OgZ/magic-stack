#!/bin/bash

# 🚀 SCRIPT POUR PUBLIER NOS BINAIRES SUR GITHUB RELEASES
# Pour que Paul/Surface puisse les télécharger

echo "🚀 PUBLICATION DES BINAIRES POUR SURFACE TEAM"
echo "============================================="
echo ""

# 1. Vérifier qu'on a compilé
if [ ! -f "dist/binaries/magic-stack.jar" ] || [ ! -f "dist/binaries/magic-stack-server" ]; then
    echo "❌ ERREUR : Binaires non trouvés !"
    echo "Lance d'abord : ./Magic-Stack/build.sh"
    exit 1
fi

# 2. Vérifier que gh CLI est installé
if ! command -v gh &> /dev/null; then
    echo "⚠️  GitHub CLI pas installé. Installation..."
    echo "brew install gh"
    echo "Ou télécharge : https://cli.github.com/"
    echo ""
    echo "Alternative : Va sur GitHub.com et crée la release manuellement"
    exit 1
fi

# 3. Créer le tag
VERSION=${1:-"v2.0.0"}
echo "📌 Création du tag $VERSION..."
git tag -a $VERSION -m "Release $VERSION avec breaking changes V2" 2>/dev/null || echo "Tag existe déjà"
git push origin $VERSION 2>/dev/null || echo "Tag déjà pushé"

# 4. Créer la release
echo "📦 Upload des binaires sur GitHub..."
gh release create $VERSION \
    dist/binaries/magic-stack.jar \
    dist/binaries/magic-stack-server \
    dist/docs/DOCUMENTATION_SURFACE_V2_MIGRATION.md \
    dist/docs/API_REFERENCE_COMPLETE_V2.md \
    --repo V0OgZ/magic-stack \
    --title "Magic Stack $VERSION" \
    --notes "## 🔴 Breaking Changes V2

### Pour Surface Team :
- **Positions 6D obligatoires** : {x, y, z, t, c, psi}
- **Q* remplace embeddings** : 37x plus rapide
- **Tick V2 obligatoire** : /api/v2/tick toutes les 100ms

### Fichiers :
- magic-stack.jar : Backend Java (54MB)
- magic-stack-server : Backend Rust (3.6MB)
- DOCUMENTATION_SURFACE_V2_MIGRATION.md : Guide migration
- API_REFERENCE_COMPLETE_V2.md : 104 endpoints

### Ports :
- 3001 : Rust
- 8080 : Java
- 5001 : Python" \
    --latest

echo ""
echo "✅ RELEASE PUBLIÉE !"
echo ""
echo "📋 Paul/Surface peut maintenant télécharger avec :"
echo "curl -L https://github.com/V0OgZ/magic-stack/releases/download/$VERSION/magic-stack.jar"
echo "curl -L https://github.com/V0OgZ/magic-stack/releases/download/$VERSION/magic-stack-server"
echo ""
echo "🔗 Voir la release : https://github.com/V0OgZ/magic-stack/releases/tag/$VERSION"
