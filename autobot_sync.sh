#!/bin/bash

# AUTOBOT SYNC SCRIPT
# Quick sync status for all systems

echo "🤖 AUTOBOT SYNC ACTIVATED"
echo "========================="
echo ""

# Git status
echo "📊 GIT STATUS:"
git status --short
echo ""

# Last commits
echo "📝 RECENT COMMITS:"
git log --oneline -3
echo ""

# Services check
echo "🔧 SERVICES:"
echo -n "  Java (8082): "
lsof -i :8082 > /dev/null 2>&1 && echo "✅ RUNNING" || echo "❌ STOPPED"
echo -n "  Python (8000): "
lsof -i :8000 > /dev/null 2>&1 && echo "✅ RUNNING" || echo "❌ STOPPED"
echo -n "  React (5173): "
lsof -i :5173 > /dev/null 2>&1 && echo "✅ RUNNING" || echo "❌ STOPPED"
echo ""

# Test status
echo "🧪 PARITY TESTS:"
if [ -f "test_snapshots.json" ]; then
    echo "  Snapshots: ✅ Found"
    echo "  Scenarios: $(ls test_traces/*.jsonl 2>/dev/null | wc -l | tr -d ' ') files"
else
    echo "  Snapshots: ❌ Missing"
fi
echo ""

# VPS health
echo "🌐 VPS HEALTH:"
if command -v curl &> /dev/null; then
    response=$(curl -s -o /dev/null -w "%{http_code}" https://heroesoftime.online 2>/dev/null)
    if [ "$response" = "200" ]; then
        echo "  heroesoftime.online: ✅ UP ($response)"
    else
        echo "  heroesoftime.online: ⚠️ Status $response"
    fi
else
    echo "  Skipping (curl not available)"
fi
echo ""

echo "========================="
echo "AUTOBOTS, TRANSFORM! 🚗→🤖"
