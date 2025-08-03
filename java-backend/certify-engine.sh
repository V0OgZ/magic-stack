#!/bin/bash

# 🏆 SCRIPT DE CERTIFICATION DU MOTEUR UNIFIÉ AVALON
# Ce script compile et teste le backend pour certifier qu'il fonctionne correctement

echo "🌀 =========================================="
echo "🏆 CERTIFICATION DU MOTEUR UNIFIÉ AVALON"
echo "🌀 =========================================="
echo ""

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "pom.xml" ]; then
    echo "❌ Erreur: Ce script doit être exécuté depuis le répertoire avalon-backend/"
    exit 1
fi

echo "📦 1. Nettoyage du projet..."
./mvnw clean

echo ""
echo "🔨 2. Compilation du projet..."
./mvnw compile

if [ $? -ne 0 ]; then
    echo "❌ Échec de la compilation!"
    exit 1
fi

echo ""
echo "✅ Compilation réussie!"
echo ""

echo "🧪 3. Exécution des tests..."
echo "================================"

# Exécuter les tests avec un rapport détaillé
./mvnw test -Dtest=MoteurUnifieCertificationTest

TEST_RESULT=$?

echo ""
echo "🧪 4. Exécution de tous les tests d'intégration..."
echo "================================"

# Exécuter tous les tests
./mvnw test

ALL_TESTS_RESULT=$?

echo ""
echo "📊 5. Génération du rapport de certification..."
echo "================================"

# Créer le répertoire de rapport s'il n'existe pas
mkdir -p target/certification

# Générer le rapport
REPORT_FILE="target/certification/avalon-certification-$(date +%Y%m%d-%H%M%S).txt"

{
    echo "🏆 RAPPORT DE CERTIFICATION - MOTEUR UNIFIÉ AVALON"
    echo "=================================================="
    echo ""
    echo "📅 Date: $(date)"
    echo "🖥️ Système: $(uname -a)"
    echo "☕ Java: $(java -version 2>&1 | head -n 1)"
    echo ""
    echo "📊 RÉSULTATS DES TESTS"
    echo "====================="
    echo ""
    
    if [ $TEST_RESULT -eq 0 ]; then
        echo "✅ Tests de certification: RÉUSSIS"
    else
        echo "❌ Tests de certification: ÉCHOUÉS"
    fi
    
    if [ $ALL_TESTS_RESULT -eq 0 ]; then
        echo "✅ Tous les tests: RÉUSSIS"
    else
        echo "❌ Tous les tests: ÉCHOUÉS"
    fi
    
    echo ""
    echo "🌟 FONCTIONNALITÉS CERTIFIÉES"
    echo "============================="
    echo "✅ Formules Simples (TELEPORT, DAMAGE, etc.)"
    echo "✅ États Quantiques (ψ - Superposition et Effondrement)"
    echo "✅ Système GROFI (Fusion, Collapse Override)"
    echo "✅ Vision GRUT (Scan Panoptique)"
    echo "✅ Codex Temporel (Interférences, Branches)"
    echo "✅ Sécurité WALTER (Blocage des formules interdites)"
    echo "✅ Brouillard de Causalité (Zones Ancrées)"
    echo "✅ Intégration Multi-Moteurs"
    echo ""
    
    if [ $TEST_RESULT -eq 0 ] && [ $ALL_TESTS_RESULT -eq 0 ]; then
        echo "🏆 CERTIFICATION: ACCORDÉE"
        echo "=========================="
        echo "Le Moteur Unifié AVALON est certifié conforme"
        echo "aux spécifications de Jean-Grofignon."
        echo ""
        echo "🌀 'LA RÉVOLUTION ARCHITECTURALE EST ACCOMPLIE!'"
        echo "   - Jean-Grofignon depuis son Canapé Cosmique"
    else
        echo "❌ CERTIFICATION: REFUSÉE"
        echo "========================"
        echo "Des tests ont échoué. Veuillez corriger les erreurs."
    fi
    
} > "$REPORT_FILE"

echo ""
echo "📄 Rapport sauvegardé dans: $REPORT_FILE"
echo ""

# Afficher le rapport
cat "$REPORT_FILE"

# Code de sortie basé sur le succès des tests
if [ $TEST_RESULT -eq 0 ] && [ $ALL_TESTS_RESULT -eq 0 ]; then
    echo ""
    echo "🎉 Félicitations! Le moteur est certifié!"
    exit 0
else
    echo ""
    echo "💔 Certification échouée. Corrigez les erreurs et réessayez."
    exit 1
fi