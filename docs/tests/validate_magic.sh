#!/bin/bash
# validate_magic.sh
# Script de validation complète de la Magic Stack
# Auteur: URZ-KÔM sous mission de TUCKER
# Day 7 - MAGIC_STACK_EXPLORATION

echo "🔮 VALIDATION MAGIC STACK - DÉMARRAGE"
echo "======================================"
echo "Mission: Day 7 - Full Magic Stack Validation"
echo "Responsable: URZ-KÔM (assigné par TUCKER)"
echo ""

# Couleurs pour les résultats
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Compteurs
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Fonction pour logger les résultats
log_result() {
    local test_name="$1"
    local result="$2"
    
    if [ "$result" -eq 0 ]; then
        echo -e "${GREEN}✅ $test_name OK${NC}"
        ((PASSED_TESTS++))
    else
        echo -e "${RED}❌ $test_name FAILED${NC}"
        ((FAILED_TESTS++))
    fi
    ((TOTAL_TESTS++))
}

# 1. Vérification de l'environnement
echo -e "${BLUE}🔍 1. Vérification de l'environnement...${NC}"
python3 --version
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Python 3 non trouvé${NC}"
    exit 1
fi

# Vérifier la présence des fichiers critiques
echo "Vérification des fichiers critiques..."
critical_files=("magic_core.py" "grammaire_temporelle.json" "interface.html")
for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file présent${NC}"
    else
        echo -e "${RED}❌ $file manquant${NC}"
        exit 1
    fi
done

# 2. Test du MagicCore
echo -e "${BLUE}🧠 2. Test du MagicCore...${NC}"
python3 -c "
from magic_core import MagicCore
try:
    core = MagicCore()
    print('✅ MagicCore s\\'initialise correctement')
    exit(0)
except Exception as e:
    print(f'❌ Erreur MagicCore: {e}')
    exit(1)
"
log_result "MagicCore Initialization" $?

# 3. Test de chargement de la grammaire
echo -e "${BLUE}📜 3. Test de la grammaire temporelle...${NC}"
python3 -c "
import json
try:
    with open('grammaire_temporelle.json', 'r', encoding='utf-8') as f:
        grammaire = json.load(f)
    
    required_keys = ['symboles', 'verbes', 'temps', 'structures', 'regles']
    for key in required_keys:
        if key not in grammaire:
            raise KeyError(f'Clé manquante: {key}')
    
    print('✅ Grammaire temporelle valide')
    exit(0)
except Exception as e:
    print(f'❌ Erreur grammaire: {e}')
    exit(1)
"
log_result "Grammaire Temporelle" $?

# 4. Test des sorts du grimoire
echo -e "${BLUE}🪄 4. Test des sorts du grimoire...${NC}"
sort_count=0
sort_valid=0

for sort_file in grimoire/*.json; do
    if [ -f "$sort_file" ]; then
        sort_name=$(basename "$sort_file" .json)
        
        # Exclure les fichiers de bibliothèque/import
        if [[ "$sort_name" == "bibliotheque_complete_sorts_avalon" ]] || \
           [[ "$sort_name" == "import_sorts_lumen" ]] || \
           [[ "$sort_name" == "sort_brisure_interstice" ]]; then
            echo "  Skipping $sort_name (library/import file)..."
            continue
        fi
        
        echo "  Testing $sort_name..."
        
        python3 -c "
import json
import sys
try:
    with open('$sort_file', 'r', encoding='utf-8') as f:
        sort_data = json.load(f)
    
    required_fields = ['nom', 'description', 'formule']
    for field in required_fields:
        if field not in sort_data:
            raise KeyError(f'Champ manquant: {field}')
    
    # Vérifier que la formule contient des symboles magiques
    formule = sort_data['formule']
    if '⊙' not in formule and '†ψ' not in formule:
        raise ValueError('Formule sans symboles magiques')
    
    print(f'  ✅ {sort_data[\"nom\"]} - Structure valide')
    exit(0)
except Exception as e:
    print(f'  ❌ {sort_data.get(\"nom\", \"Unknown\")} - Erreur: {e}')
    exit(1)
" && ((sort_valid++))
        ((sort_count++))
    fi
done

echo "Sorts testés: $sort_valid/$sort_count valides"
if [ $sort_valid -eq $sort_count ]; then
    log_result "Sorts Grimoire ($sort_count sorts)" 0
else
    log_result "Sorts Grimoire ($sort_valid/$sort_count)" 1
fi

# 5. Test d'intégration - Chargement complet
echo -e "${BLUE}🔗 5. Test d'intégration complète...${NC}"
python3 -c "
from magic_core import MagicCore
try:
    core = MagicCore()
    
    # Charger tous les sorts
    import os
    sort_files = [f for f in os.listdir('grimoire') if f.endswith('.json')]
    loaded_count = 0
    
    for sort_file in sort_files:
        if core.charger_sort(f'grimoire/{sort_file}'):
            loaded_count += 1
    
    print(f'✅ Intégration: {loaded_count}/{len(sort_files)} sorts chargés')
    
    if loaded_count == len(sort_files):
        exit(0)
    else:
        exit(1)
        
except Exception as e:
    print(f'❌ Erreur intégration: {e}')
    exit(1)
"
log_result "Intégration Complète" $?

# 6. Test unitaire spécifique (si disponible)
echo -e "${BLUE}🧪 6. Tests unitaires...${NC}"
if [ -f "tests/validation/test_sort_teleportation.py" ]; then
    python3 -m pytest tests/validation/test_sort_teleportation.py -v
    log_result "Tests Unitaires Téléportation" $?
else
    echo -e "${YELLOW}⚠️ Tests unitaires non trouvés (en développement)${NC}"
fi

# 7. Test de performance basique
echo -e "${BLUE}⚡ 7. Test de performance...${NC}"
python3 -c "
import time
from magic_core import MagicCore

try:
    core = MagicCore()
    core.charger_sort('grimoire/sort_teleportation.json')
    
    start_time = time.time()
    for i in range(10):
        core.lancer_sort('teleportation', {
            'entite': f'TestEntity{i}',
            'destination': {'x': i*10, 'y': i*10, 'dimension': 0}
        })
    end_time = time.time()
    
    avg_time = (end_time - start_time) / 10
    print(f'✅ Performance: {avg_time:.4f}s par sort en moyenne')
    
    if avg_time < 0.1:  # Moins de 100ms par sort
        exit(0)
    else:
        exit(1)
        
except Exception as e:
    print(f'❌ Erreur performance: {e}')
    exit(1)
"
log_result "Performance (< 100ms/sort)" $?

# Résultats finaux
echo ""
echo "======================================"
echo -e "${PURPLE}📊 RÉSULTATS FINAUX - MAGIC STACK${NC}"
echo "======================================"
echo -e "   Total: $TOTAL_TESTS tests"
echo -e "   ${GREEN}Réussis: $PASSED_TESTS${NC}"
echo -e "   ${RED}Échoués: $FAILED_TESTS${NC}"

# Calcul du pourcentage
if [ $TOTAL_TESTS -gt 0 ]; then
    success_rate=$((PASSED_TESTS * 100 / TOTAL_TESTS))
    echo -e "   Taux de réussite: ${success_rate}%"
fi

echo ""
if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}🎉 TOUS LES TESTS PASSENT !${NC}"
    echo -e "${GREEN}🐻 URZ-KÔM: GRRRR... MAGIC STACK... VALIDÉE !${NC}"
    echo ""
    echo "📋 Prêt pour intégration avec REALGAME !"
    exit 0
else
    echo -e "${RED}💥 $FAILED_TESTS TESTS ONT ÉCHOUÉ${NC}"
    echo -e "${RED}🐻 URZ-KÔM: GRRRR... CORRECTIONS... NÉCESSAIRES !${NC}"
    echo ""
    echo "🔧 Vérifiez les erreurs ci-dessus avant intégration"
    exit 1
fi