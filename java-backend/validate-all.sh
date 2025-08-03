#!/bin/bash

# 🌀 AVALON - Script de Validation Exhaustive
# Ce script exécute TOUTES les formules pour valider le moteur unifié

echo "🌀 AVALON - VALIDATION EXHAUSTIVE"
echo "================================="
echo ""

# Vérifier que le fichier de formules existe
if [ ! -f "all-formulas-test.txt" ]; then
    echo "⚠️  Fichier de formules non trouvé. Génération en cours..."
    python3 extract-all-formulas.py
    
    if [ $? -ne 0 ]; then
        echo "❌ Erreur lors de l'extraction des formules"
        exit 1
    fi
fi

# Afficher les statistiques
echo "📊 Statistiques des formules:"
grep "# Total formules:" all-formulas-test.txt
echo ""
grep -E "# \w+: \d+ formules" all-formulas-test.txt
echo ""

# Compiler le projet si nécessaire
echo "🔨 Compilation du projet..."
./mvnw compile test-compile -q

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la compilation"
    exit 1
fi

# Exécuter le test de validation
echo ""
echo "🚀 Lancement de la validation exhaustive..."
echo "⏱️  Cela peut prendre plusieurs minutes..."
echo ""

# Exécuter uniquement le test de validation exhaustive
./mvnw test -Dtest=ExhaustiveFormulaValidator -DfailIfNoTests=false

# Vérifier le résultat
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ VALIDATION RÉUSSIE !"
    echo ""
    
    # Afficher le dernier rapport généré
    LATEST_REPORT=$(ls -t validation-report-*.txt 2>/dev/null | head -1)
    if [ -n "$LATEST_REPORT" ]; then
        echo "📄 Rapport de validation: $LATEST_REPORT"
        echo ""
        echo "Aperçu du rapport:"
        echo "------------------"
        head -20 "$LATEST_REPORT"
        echo "..."
        echo ""
    fi
else
    echo ""
    echo "❌ VALIDATION ÉCHOUÉE"
    echo "Consultez les logs ci-dessus pour plus de détails"
fi

echo "🌀 Fin du processus de validation"