#!/bin/bash
set -euo pipefail
echo "=== Magic Stack Build ==="

# Compiler Java
cd backends/java
mvn clean package -DskipTests
JAR_PATH="$(pwd)/target/magic-stack-backend-1.0.0-APOLLO.jar"
echo "Java JAR: ${JAR_PATH}"

# Compiler Rust
cd ../rust
cargo build --release
BIN_PATH="$(pwd)/target/release/magic-stack-server"
echo "Rust binary: ${BIN_PATH}"

# Créer dossier de distribution avec binaires ET docs
cd ../..
echo "=== Préparation de la distribution ==="
DIST_DIR="dist"
mkdir -p $DIST_DIR/binaries
mkdir -p $DIST_DIR/docs

# Copier les binaires
cp "$JAR_PATH" $DIST_DIR/binaries/magic-stack.jar
cp "$BIN_PATH" $DIST_DIR/binaries/magic-stack-server

# AJOUTER LES DOCS V2 POUR L'ÉQUIPE SURFACE
if [ -f "DOCUMENTATION_SURFACE_V2_MIGRATION.md" ]; then
    cp DOCUMENTATION_SURFACE_V2_MIGRATION.md $DIST_DIR/docs/
    echo "✅ Doc V2 Migration ajoutée"
fi

if [ -f "API_REFERENCE_COMPLETE_V2.md" ]; then
    cp API_REFERENCE_COMPLETE_V2.md $DIST_DIR/docs/
    echo "✅ API Reference V2 ajoutée"
fi

echo ""
echo "=== Distribution prête dans: $DIST_DIR/ ==="
echo "  - binaries/magic-stack.jar       (Java)"
echo "  - binaries/magic-stack-server    (Rust)"
echo "  - docs/DOCUMENTATION_SURFACE_V2_MIGRATION.md"
echo "  - docs/API_REFERENCE_COMPLETE_V2.md"
echo ""
echo "Build terminé !"
