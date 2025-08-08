#!/bin/bash
# Magic Stack Rust Backend Launcher
# High-performance critical components server

echo "🦀 Magic Stack Rust Backend - Critical Performance Components"
echo "=============================================================="

# Set environment variables
export RUST_PORT=3001
export RUST_LOG=info
export RUST_BACKTRACE=1

# Build in release mode for maximum performance
echo "📦 Building optimized Rust backend..."
cargo build --release

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Starting Magic Stack Rust Server on port $RUST_PORT..."
    echo "📊 Components:"
    echo "   - Q* Algorithm (6D searches)"
    echo "   - World State Graph (real-time updates)"
    echo "   - Temporal Grammar Parser (869 formulas)"
    echo "   - Vector Operations (high-performance math)"
    echo ""
    echo "🔗 Endpoints:"
    echo "   - GET  /health"
    echo "   - POST /api/qstar/search"
    echo "   - POST /api/world-state/nodes"
    echo "   - GET  /api/world-state/nodes/:id"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "=============================================================="
    
    # Run the server
    ./target/release/magic-stack-server
else
    echo "❌ Build failed! Check the errors above."
    exit 1
fi