#!/usr/bin/env bash
set -euo pipefail
JAVA=${JAVA_URL:-http://localhost:8082}
RUST=${RUST_URL:-http://localhost:3001}

ok() { echo -e "\033[32mOK\033[0m $1"; }
fail() { echo -e "\033[31mFAIL\033[0m $1"; exit 1; }

curl -sf "$RUST/health" >/dev/null && ok "rust /health" || fail "rust /health"
curl -sf "$JAVA/api/health" >/dev/null && ok "java /api/health" || fail "java /api/health"
curl -sf "$JAVA/api/magic/health" >/dev/null && ok "java /api/magic/health" || fail "java /api/magic/health"

echo "All health checks passed."


