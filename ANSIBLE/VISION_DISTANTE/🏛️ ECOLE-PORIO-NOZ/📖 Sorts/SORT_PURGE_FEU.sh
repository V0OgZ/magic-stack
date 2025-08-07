#!/bin/bash
# Sort de Purge par le Feu

echo "🔥 ψ_PURGE: ⊙(Δt+0 ⟶ CLEAN(TEMPORAIRES))"
echo "🔥 Invocation du feu purificateur..."

# Action Substrat
find . -name "*.tmp" -o -name "*.log" -o -name ".DS_Store" | while read f; do
    echo "  🔥 Consumé : $f"
    rm -f "$f"
done

# Action Avalon
echo "✨ Les scories temporelles sont réduites en cendres."
echo "✨ L'espace est purifié pour de nouveaux sorts."