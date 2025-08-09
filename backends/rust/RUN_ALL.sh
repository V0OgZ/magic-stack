#!/bin/bash
# Script pour tout lancer sans bloquer

echo "=== LANCEMENT COMPLET DU BACKEND ==="

# 1. Créer les dossiers et fichiers
mkdir -p logs
touch logs/build.log logs/server.log logs/index.log

# 2. Compiler Rust
echo "[$(date)] Compilation Rust..." >> logs/build.log
nohup cargo build --release >> logs/build.log 2>&1 &
BUILD_PID=$!
echo "Build lancé (PID: $BUILD_PID)"

# 3. Attendre un peu et lancer le serveur
(sleep 30 && \
 pkill -f magic-stack-server 2>/dev/null; \
 PROJECT_ROOT=. RUST_PORT=3001 nohup ./target/release/magic-stack-server >> logs/server.log 2>&1 & \
 echo "[$(date)] Serveur lancé" >> logs/server.log) &

# 4. Lancer l'indexation vectorielle
(cd ../.. && \
 source .venv_vec/bin/activate 2>/dev/null || python3 -m venv .venv_vec && source .venv_vec/bin/activate; \
 pip install -q faiss-cpu sentence-transformers numpy tqdm; \
 nohup python tools/vector_build/build_local.py --mode story --root docs --out vector-store/story >> backends/rust/logs/index.log 2>&1 &)

echo "=== TOUT EST LANCÉ EN BACKGROUND ==="
echo "Logs disponibles:"
echo "  tail -f logs/build.log    # Compilation"
echo "  tail -f logs/server.log   # Serveur"  
echo "  tail -f logs/index.log    # Indexation"
echo ""
echo "Dans ~1 minute: http://localhost:3001/logs"
