#!/bin/bash
# Script d'indexation VectorDB adapté à la nouvelle structure de docs

echo "🔍 Lancement de l'indexation VectorDB - Nouvelle structure"
echo "=========================================================="

# Créer les répertoires nécessaires
mkdir -p vector-store/story
mkdir -p vector-store/dev
mkdir -p logs

# Indexation mode STORY (lore, héros, créatures dans SHARED/docs/ZBIG - VECTOR_DB_ASSETS)
echo ""
echo "📚 Mode STORY: Indexation du lore et des archives d'Avalon..."
echo "Source: docs/SHARED/docs/ZBIG - VECTOR_DB_ASSETS/"

nohup python3 tools/vector_build/build_local.py \
    "docs/SHARED/docs/ZBIG - VECTOR_DB_ASSETS" \
    story \
    >> logs/indexation_story.log 2>&1 &
STORY_PID=$!

echo "✅ Indexation STORY lancée (PID: $STORY_PID)"

# Attendre un peu avant de lancer la deuxième
sleep 2

# Indexation mode DEV (documentation technique dans docs/)
echo ""
echo "💻 Mode DEV: Indexation de la documentation technique..."
echo "Source: docs/ (API, guides, architecture)"

nohup python3 tools/vector_build/build_local.py \
    docs \
    dev \
    >> logs/indexation_dev.log 2>&1 &
DEV_PID=$!

echo "✅ Indexation DEV lancée (PID: $DEV_PID)"

echo ""
echo "📊 Suivi de l'indexation:"
echo "========================"
echo "• Logs STORY: tail -f logs/indexation_story.log"
echo "• Logs DEV: tail -f logs/indexation_dev.log"
echo "• Status: ./STATUS_INDEXATION.sh"
echo ""
echo "Les processus tournent en arrière-plan."
echo "PIDs: STORY=$STORY_PID, DEV=$DEV_PID"
