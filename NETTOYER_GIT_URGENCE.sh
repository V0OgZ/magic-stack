#!/bin/bash

echo "🧹 NETTOYAGE D'URGENCE GIT - MAGIC STACK"
echo "========================================="

# 1. RESET TOUT LE STAGING
echo "1️⃣ Reset de tous les fichiers..."
git reset HEAD .

# 2. AJOUTER SEULEMENT CE QU'ON VEUT
echo "2️⃣ Ajout des VRAIS fichiers modifiés..."
git add .gitignore
git add h
git add API_EXPLORER_READY.md
git add MESSAGE_POUR_SURFACE.md
git add backends/rust/src/main.rs
git add backends/rust/explorer.html
git add backends/rust/vector_bridge.py

# 3. NETTOYER LES MERDES
echo "3️⃣ Suppression des fichiers temporaires..."
rm -f nohup.out
rm -f backends/rust/nohup.out
rm -rf .venv_vec
rm -rf __pycache__
rm -rf vector-store

# 4. VÉRIFIER LE .gitignore
echo "4️⃣ Vérification du .gitignore..."
grep -q ".venv_vec" .gitignore || echo ".venv_vec/" >> .gitignore
grep -q "nohup.out" .gitignore || echo "nohup.out" >> .gitignore
grep -q "vector-store/" .gitignore || echo "vector-store/" >> .gitignore
grep -q "docs/SHARED/" .gitignore || echo "docs/SHARED/" >> .gitignore
grep -q "docs_shared" .gitignore || echo "docs_shared" >> .gitignore

# 5. COMMIT PROPRE
echo "5️⃣ Création du commit propre..."
git commit -m "feat: Explorer API intégré + nettoyage complet

- Explorer disponible sur /explorer
- Message pour équipe Surface
- Scripts h consolidés
- .gitignore mis à jour"

# 6. STATUS FINAL
echo ""
echo "✅ NETTOYAGE TERMINÉ !"
echo "========================"
git status --short
echo ""
echo "📊 Taille du commit:"
git log -1 --stat | tail -1

echo ""
echo "🚀 Pour pusher: git push origin main"
