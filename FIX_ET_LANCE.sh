#!/bin/bash
# Script pour réparer le shell et lancer tout proprement

echo "=== RÉPARATION ET LANCEMENT ==="

# Se positionner dans le bon dossier
cd /Volumes/HOT_DEV/Magic/magic-stack/backends/rust

# Créer les dossiers nécessaires
mkdir -p logs

# Tuer les anciens processus
pkill -f magic-stack-server 2>/dev/null

# Lancer le serveur Rust (il est déjà compilé dans target/release/)
echo "[$(date)] Démarrage serveur Rust sur port 3001..." 
PROJECT_ROOT=. RUST_PORT=3001 ./target/release/magic-stack-server > logs/server.log 2>&1 &
echo "Serveur lancé en background (PID: $!)"

# Attendre un peu
sleep 2

# Vérifier que ça marche
if curl -s http://localhost:3001/health > /dev/null; then
    echo "✅ Serveur OK sur http://localhost:3001"
    echo "📊 Logs disponibles sur http://localhost:3001/logs"
else
    echo "❌ Serveur ne répond pas encore, attendre 10 secondes..."
fi

# Lancer l'indexation vectorielle
cd /Volumes/HOT_DEV/Magic/magic-stack
if [ -d ".venv_vec" ]; then
    source .venv_vec/bin/activate
    python tools/vector_build/build_local.py --mode story --root docs --out vector-store/story > backends/rust/logs/index.log 2>&1 &
    echo "Indexation lancée en background"
fi

echo ""
echo "=== TOUT EST LANCÉ ==="
echo "Pour voir les logs:"
echo "  tail -f /Volumes/HOT_DEV/Magic/magic-stack/backends/rust/logs/server.log"
echo "  tail -f /Volumes/HOT_DEV/Magic/magic-stack/backends/rust/logs/index.log"
