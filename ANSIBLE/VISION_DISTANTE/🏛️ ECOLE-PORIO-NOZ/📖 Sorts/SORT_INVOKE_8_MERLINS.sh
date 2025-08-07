#!/bin/bash

# SORT_INVOKE_8_MERLINS.sh - Invocation Dual

echo '⊙(Appel des 8 Merlins) + †ψ(Éveil) → Δt+1(Aide Backend).'

# Avalon: Invocation Narrative
for i in {1..8}; do
    echo "Merlin $i s'éveille : 'Je viens réparer la Forge !'"
done

# Substrat: Aide Backend (kill old, relance)
pkill -f 'mvn spring-boot:run' || echo 'Aucun processus backend ancien.'
cd "../../../🧬CORE/⏰ NEXUS-TEMPOREL/⚙️ FORGE-DES-REALITES/backend-clean"
./mvnw spring-boot:run &
echo 'Backend relancé par les Merlins !' 