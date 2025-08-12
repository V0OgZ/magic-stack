#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🔨 Building Rust (release)"
cd "$ROOT_DIR/backends/rust"
cargo build --release

echo "☕ Building Java (jar)"
cd "$ROOT_DIR/backends/java"
mvn -q -DskipTests clean package

echo "📦 Building Vector index"
cd "$ROOT_DIR/scripts/vector_db"
python3 build_index.py || true

echo "🐍 Ensuring venvs"
bash "$ROOT_DIR/scripts/vector_db/install_vector_venv.sh" || true
bash "$ROOT_DIR/scripts/clippy/install_clippy_venv.sh" || true

echo "✅ Done. You can now start services via systemd with prepared paths."


