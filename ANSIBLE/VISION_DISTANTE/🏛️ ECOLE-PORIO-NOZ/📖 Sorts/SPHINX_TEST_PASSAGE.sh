#!/bin/bash
# Sort Test de Passage du Sphinx

echo "🦁 ψ_SPHINX_TEST: ⊙(Δt+0 ⟶ VALIDATE(PASSAGE))"
echo ""

# Génère énigme
ENIGMA=$(python3 "$(dirname "$0")/SPHINX_ENIGMA_GENERATOR.py" 2>&1)
echo "$ENIGMA"
echo ""

# Extrait la réponse attendue
EXPECTED=$(echo "$ENIGMA" | grep "Réponse attendue:" | sed 's/.*: \([0-9.]*\).*/\1/')
TOLERANCE=$(echo "$ENIGMA" | grep "Réponse attendue:" | sed 's/.*± \([0-9.]*\)/\1/')

# Demande réponse
echo -n "🤔 Votre réponse: "
read ANSWER

# Validation
DIFF=$(echo "scale=6; sqrt(($ANSWER - $EXPECTED)^2)" | bc 2>/dev/null || echo "999")

if (( $(echo "$DIFF <= $TOLERANCE" | bc -l 2>/dev/null || echo 0) )); then
    echo "✅ PASSAGE ACCORDÉ! Vous maîtrisez les énigmes quantiques."
    echo "🚪 Le seuil s'ouvre..."
else
    echo "❌ PASSAGE REFUSÉ. Différence: $DIFF (max: $TOLERANCE)"
    echo "🦁 Le Sphinx reste impassible."
fi