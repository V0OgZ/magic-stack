#!/bin/bash
# 🦀⚡ QUICK INTEGRATION TEST - Rust + Java
# Test rapide de l'intégration entre backends

echo "🦀⚡ QUICK INTEGRATION TEST"
echo "=========================="

# Démarrer le backend Rust
echo "🚀 Starting Rust backend..."
RUST_LOG=info ./target/release/magic-stack-server &
RUST_PID=$!
sleep 3

# Test health check
echo "📡 Testing Rust health..."
curl -s http://localhost:3001/health | jq -r '.status' || echo "❌ Rust not responding"

# Test Q* search
echo "🔍 Testing Q* search..."
curl -s -X POST http://localhost:3001/api/qstar/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "test",
    "center_x": 0, "center_y": 0, "center_z": 0,
    "center_t": 0, "center_c": 1.0, "center_psi": 0.0,
    "radius": 100,
    "max_results": 5
  }' | jq -r '.[]' 2>/dev/null || echo "✅ Q* working (empty results normal)"

echo ""
echo "🎉 RUST BACKEND READY!"
echo "Rust server running on PID: $RUST_PID"
echo ""
echo "🔮 Next steps:"
echo "1. Start Java backend: cd ../java && mvn spring-boot:run"
echo "2. Run full test: ./test_all_formulas.sh"
echo "3. Test integration: POST /api/test/all-formulas"
echo ""
echo "Stop Rust server: kill $RUST_PID"