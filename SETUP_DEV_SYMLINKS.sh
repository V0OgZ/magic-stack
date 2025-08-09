#!/bin/bash
# Script pour configurer l'environnement de dev avec docs partagées
# Ces liens permettent aux assistants de voir les docs des autres SANS les committer

echo "=== Configuration des liens symboliques pour DEV ==="

# Créer les liens vers les docs privées du frontend (non commitées)
ln -sf /Volumes/HOT_DEV/Frontend/docs magic-stack/docs/FRONTEND_PRIVATE
ln -sf /Volumes/HOT_DEV/Surface/docs magic-stack/docs/SURFACE_PRIVATE  
ln -sf /Volumes/HOT_DEV/Archologue/docs magic-stack/docs/ARCHOLOGUE_PRIVATE

# Dossier pour questions/réponses entre assistants
mkdir -p /Volumes/HOT_DEV/SHARED_DOCS
ln -sf /Volumes/HOT_DEV/SHARED_DOCS magic-stack/docs/SHARED_QUESTIONS

echo "✅ Liens créés (visibles localement, ignorés par Git)"
echo ""
echo "Structure:"
echo "  docs/"
echo "    ├── PROFONDEURS/        # ✅ Committé (Magic Stack public)"
echo "    ├── API.md              # ✅ Committé (Magic Stack public)"
echo "    ├── VECTOR_DB_STATUS.md # ✅ Committé (Magic Stack public)"
echo "    ├── FRONTEND_PRIVATE/   # ❌ Symlink ignoré (privé)"
echo "    ├── SURFACE_PRIVATE/    # ❌ Symlink ignoré (privé)"
echo "    ├── ARCHOLOGUE_PRIVATE/ # ❌ Symlink ignoré (privé)"
echo "    └── SHARED_QUESTIONS/   # ❌ Symlink ignoré (Q&A inter-assistants)"
echo ""
echo "Les docs privées sont accessibles en DEV mais jamais commitées!"
