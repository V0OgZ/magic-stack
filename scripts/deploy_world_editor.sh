#!/usr/bin/env bash
set -euo pipefail

# Deploy World Editor (React) as static site under /world-editor/
# - Builds apps/world-editor (Vite+TS)
# - Copies dist/index.html and dist/assets/ to repo /world-editor/
# - Does not push; lets CI or operator commit/push

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
APP_DIR="$ROOT_DIR/apps/world-editor"
OUT_DIR="$APP_DIR/dist"
TARGET_DIR="$ROOT_DIR/world-editor"

echo "[deploy_world_editor] Building world editor..."
cd "$APP_DIR"
if command -v npm >/dev/null 2>&1; then
  npm ci
  npm run build
else
  echo "ERROR: npm not found. Please install Node.js LTS and npm." >&2
  exit 1
fi

echo "[deploy_world_editor] Preparing target directory: $TARGET_DIR"
mkdir -p "$TARGET_DIR"
rm -rf "$TARGET_DIR/assets"

echo "[deploy_world_editor] Copying dist → $TARGET_DIR"
cp -f "$OUT_DIR/index.html" "$TARGET_DIR/index.html"
cp -R "$OUT_DIR/assets" "$TARGET_DIR/assets"

# Sanity: ensure referenced assets exist
JS_REF=$(grep -oE "/world-editor/assets/[^"]+\.js" "$TARGET_DIR/index.html" | head -n1 || true)
CSS_REF=$(grep -oE "/world-editor/assets/[^"]+\.css" "$TARGET_DIR/index.html" | head -n1 || true)
if [[ -n "$JS_REF" && ! -f "$ROOT_DIR${JS_REF}" ]]; then
  echo "WARNING: JS bundle not found at $ROOT_DIR${JS_REF}. Check Vite base and deploy path." >&2
fi
if [[ -n "$CSS_REF" && ! -f "$ROOT_DIR${CSS_REF}" ]]; then
  echo "WARNING: CSS bundle not found at $ROOT_DIR${CSS_REF}. Check Vite base and deploy path." >&2
fi

echo "[deploy_world_editor] Done. Serve at: /world-editor/"
echo "- $TARGET_DIR/index.html"
echo "- $TARGET_DIR/assets/"