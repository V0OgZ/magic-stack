#!/bin/bash

echo "🏛️ QUICK AVALON 1 ARCHAEOLOGY SCAN"
echo "===================================="
echo ""

echo "📁 SCANNING AVALON HOMES..."
cd /Volumes/HOT_DEV/Main/SpinForest
ls -la AVALON/🏠\ HOME/ | grep "^d" | wc -l | xargs echo "Total HOME directories:"

echo ""
echo "🏠 First 10 Heroes found:"
ls AVALON/🏠\ HOME/ | head -10

echo ""
echo "👻 SEARCHING FOR LOST UIs..."
find . -name "*.html" -path "*/backup*" -o -name "*.html" -path "*/old*" 2>/dev/null | wc -l | xargs echo "Abandoned HTML files:"

echo ""
echo "💭 MEMORY FRAGMENTS..."
find . -name "*memory*.json" -o -name "*memoire*.json" 2>/dev/null | wc -l | xargs echo "Memory JSON files:"

echo ""
echo "🌀 CONFLUENCE TRACES..."
find . -name "*confluence*" -o -name "*merge*" -o -name "*catastrophe*" 2>/dev/null | head -5

echo ""
echo "✅ QUICK SCAN COMPLETE!"
echo ""
echo "AVALON 1 is waiting to be resurrected..."
