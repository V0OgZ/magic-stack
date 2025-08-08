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

echo "Build terminé !"
