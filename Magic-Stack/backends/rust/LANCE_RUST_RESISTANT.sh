#!/bin/bash

# SCRIPT DE LANCEMENT BACKEND RUST RESISTANT

PID_FILE="rust-backend.pid"
LOG_FILE="rust-backend.log"

echo "=== LANCEMENT BACKEND RUST RESISTANT ==="
echo "Surveillance automatique et relance si crash"

# Fonction pour tuer le processus existant
kill_existing() {
    if [ -f "$PID_FILE" ]; then
        OLD_PID=$(cat "$PID_FILE")
        if ps -p $OLD_PID > /dev/null 2>&1; then
            echo "Arret du processus existant PID: $OLD_PID"
            kill $OLD_PID 2>/dev/null
            sleep 2
        fi
    fi
}

# Fonction pour lancer le backend
launch_backend() {
    echo "Lancement du backend Rust..."
    cd "$(dirname "$0")"
    
    # Build si necessaire
    if [ ! -f "target/debug/magic-stack-server" ]; then
        echo "Build du backend Rust..."
        cargo build
    fi
    
    # Lancer le backend
    ./target/debug/magic-stack-server >> "$LOG_FILE" 2>&1 &
    NEW_PID=$!
    echo $NEW_PID > "$PID_FILE"
    echo "Backend Rust lance avec PID: $NEW_PID"
}

# Boucle de surveillance
while true; do
    if [ -f "$PID_FILE" ]; then
        CURRENT_PID=$(cat "$PID_FILE")
        if ! ps -p $CURRENT_PID > /dev/null 2>&1; then
            echo "Backend Rust crash detecte! Relance..."
            launch_backend
        fi
    else
        echo "Premiere execution du backend Rust"
        kill_existing
        launch_backend
    fi
    
    # Attendre 10 secondes avant la prochaine verification
    sleep 10
done