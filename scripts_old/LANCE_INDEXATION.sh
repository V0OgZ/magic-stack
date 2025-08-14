#!/bin/bash
# Script pour lancer l'indexation vectorielle complète

echo "=== INDEXATION VECTORIELLE HEROES OF TIME ==="
echo "Vincent, on va indexer toute la documentation pour Clippy et pour nous les assistants"
echo ""

cd /Volumes/HOT_DEV/Magic/magic-stack

# Activer l'environnement Python
source .venv_vec/bin/activate

# Créer les dossiers de sortie
mkdir -p vector-store/story vector-store/dev

# Mode STORY - Pour Clippy et les joueurs
echo "[$(date)] Lancement indexation STORY (pour Clippy et joueurs)..."
nohup python tools/vector_build/build_local.py \
    --mode story \
    --root docs/VECTOR_DB_ASSETS \
    --out vector-store/story \
    --threads 6 > indexation_story.log 2>&1 &
STORY_PID=$!
echo "  → Indexation STORY lancée (PID: $STORY_PID)"

# Mode DEV - Pour nous les assistants et toi Vincent
echo "[$(date)] Lancement indexation DEV (pour assistants et documentation technique)..."
nohup python tools/vector_build/build_local.py \
    --mode dev \
    --root docs \
    --out vector-store/dev \
    --threads 6 > indexation_dev.log 2>&1 &
DEV_PID=$!
echo "  → Indexation DEV lancée (PID: $DEV_PID)"

echo ""
echo "=== INDEXATION EN COURS ==="
echo "Pour suivre le progrès:"
echo "  tail -f indexation_story.log  # Contenu narratif (884 fichiers!)"
echo "  tail -f indexation_dev.log    # Documentation technique"
echo ""
echo "Page de monitoring: http://localhost:3001/logs"
echo ""
echo "Note: Sur Mac Mini M4 8 coeurs, ça devrait prendre ~5-10 minutes"
