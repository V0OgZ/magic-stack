#!/bin/bash
# Sort de Résurrection du Backend

echo "⚡ ψ_RESURRECT: ⊙(Δt+0 ⟶ BACKEND(ALIVE))"
echo "⚡ Invocation du corps magique..."

cd "$HOME/Interstice/SpinForest/AVALON/🧬CORE/⏰ NEXUS-TEMPOREL/⚙️ FORGE-DES-REALITES/backend-clean"

# Tuer ancien processus
pkill -f "spring-boot:run" 2>/dev/null
sleep 2

# Résurrection
mvn spring-boot:run &
echo "✨ Backend ressuscité sur port 8080"
echo "✨ MagicFormulaEngine pulse à nouveau"