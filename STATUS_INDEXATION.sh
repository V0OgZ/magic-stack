#!/bin/bash
# Script pour vérifier le statut de l'indexation

echo "=== STATUT INDEXATION HEROES OF TIME ==="
echo ""

# Vérifier les processus
echo "📊 Processus actifs:"
ps aux | grep -v grep | grep build_local.py | wc -l | xargs -I {} echo "  → {} processus d'indexation en cours"

# Vérifier les fichiers indexés
echo ""
echo "📁 Fichiers indexés:"
if [ -f "vector-store/story/meta.jsonl" ]; then
    STORY_COUNT=$(wc -l < vector-store/story/meta.jsonl)
    echo "  → STORY: $STORY_COUNT documents (sur ~884 attendus)"
else
    echo "  → STORY: Pas encore commencé"
fi

if [ -f "vector-store/dev/meta.jsonl" ]; then
    DEV_COUNT=$(wc -l < vector-store/dev/meta.jsonl)
    echo "  → DEV: $DEV_COUNT documents"
else
    echo "  → DEV: Pas encore commencé"
fi

# Vérifier la taille des index
echo ""
echo "💾 Taille des index:"
ls -lh vector-store/*/index.faiss 2>/dev/null || echo "  → Index pas encore créés"

# Dernières lignes des logs
echo ""
echo "📜 Dernières activités:"
echo "STORY:"
tail -3 indexation_story.log 2>/dev/null | sed 's/^/  /'
echo "DEV:"
tail -3 indexation_dev.log 2>/dev/null | sed 's/^/  /'

echo ""
echo "🌐 Page de monitoring: http://localhost:3001/logs"
