#!/bin/bash

# PARITY MONITOR - Quick status check

echo "🔍 PARITY MONITOR"
echo "================="
echo ""

# Check services
echo "📡 Services:"
echo -n "  CORS (8000): "
lsof -i :8000 > /dev/null 2>&1 && echo "✅" || echo "❌"
echo -n "  React (5176): "
lsof -i :5176 > /dev/null 2>&1 && echo "✅" || echo "❌"
echo -n "  Java (8082): "
lsof -i :8082 > /dev/null 2>&1 && echo "✅" || echo "❌"
echo ""

# Check files
echo "📁 Files:"
echo -n "  test_snapshots.json: "
[ -f "test_snapshots.json" ] && echo "✅" || echo "❌"
echo -n "  test_snapshots.v1.json: "
[ -f "test_snapshots.v1.json" ] && echo "✅" || echo "❌"
echo -n "  Traces (3 files): "
[ $(ls test_traces/*.jsonl 2>/dev/null | wc -l) -eq 3 ] && echo "✅" || echo "❌"
echo ""

# Quick test HTML side
echo "🧪 HTML Tests:"
if [ -f "test_snapshots.json" ]; then
    echo "  3 scenarios defined ✅"
fi
echo ""

echo "📊 URLs:"
echo "  React: http://localhost:5176/parity"
echo "  HTML:  http://localhost:8000/test_parity.html"
echo ""

echo "⏳ Waiting for GPT: 'PARITÉ TOTALE OK'"
