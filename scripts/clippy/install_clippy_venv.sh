#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"
VENV_DIR="$ROOT_DIR/venv-clippy"

python3 -m venv "$VENV_DIR"
source "$VENV_DIR/bin/activate"
pip install --upgrade pip
pip install flask flask-cors requests sentence-transformers
echo "✅ Clippy venv ready at $VENV_DIR"


