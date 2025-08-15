#!/bin/bash
# install_vector_local.sh - TOUT EN UN POUR JEAN !

echo "🚀 Installation Vector DB Local pour Mac M4..."
echo ""

# 1. Installer les dépendances Python optimisées M4
echo "📦 Installation des dépendances..."
pip3 install --upgrade pip
pip3 install sentence-transformers
pip3 install faiss-cpu  # Version optimisée Apple Silicon
pip3 install numpy pandas
pip3 install flask flask-cors
pip3 install watchdog  # Pour surveiller les fichiers
pip3 install tqdm  # Barre de progression
pip3 install requests  # Pour les tests

echo ""
echo "📁 Création de la structure..."
mkdir -p vector_local/api
mkdir -p vector_local/embeddings
mkdir -p vector_local/data
mkdir -p vector_local/scripts

echo ""
echo "✅ Installation terminée !"
echo "🎯 Prochaines étapes :"
echo "   1. Lance: python3 run_vector_local.py"
echo "   2. Ouvre: vector_local/test_interface.html"
echo ""
echo "🧙‍♂️ MERLIN a tout préparé pour toi Jean !"