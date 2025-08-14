#!/usr/bin/env bash
set -euo pipefail
PORT="${1:-}"
if [[ -z "$PORT" ]]; then
  echo "Usage: $0 <port>" >&2
  exit 2
fi

if lsof -iTCP:"$PORT" -sTCP:LISTEN -Pn >/dev/null 2>&1; then
  echo "[port-guard] Port $PORT busy; killing holder..."
  PIDS=$(lsof -t -iTCP:"$PORT" -sTCP:LISTEN -Pn || true)
  if [[ -n "$PIDS" ]]; then
    echo "$PIDS" | xargs -r kill -9 || true
    sleep 1
  fi
fi
exit 0


