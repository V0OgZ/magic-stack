# 🧪 Tests et Validation - Magic Stack

## 🎯 Méthodologie de Test

### **Principe Fondamental**
> "100% des sorts doivent être testés **dans le moteur réel**, pas en théorie." - Vincent

### **Types de Tests**
1. **Tests Unitaires** : Chaque sort individuellement
2. **Tests d'Intégration** : Combinaisons de sorts
3. **Tests de Performance** : Vitesse d'exécution
4. **Tests de Régression** : Non-régression des fonctionnalités

## 📋 Structure de Validation

### **Répertoire Tests**
```
tests/
├── validation/
│   ├── test_sort_teleportation.py
│   ├── test_sort_invocation.py
│   └── ... (17 tests pour 17 sorts)
├── integration/
│   ├── test_combo_sorts.py
│   └── test_grammaire_complete.py
├── performance/
│   └── benchmark_magic_core.py
└── validate_magic.sh  # Script principal
```

## ⚡ Tests des 17 Sorts

### **Template de Test**
```python
import unittest
from magic_core import MagicCore

class TestSortTeleportation(unittest.TestCase):
    def setUp(self):
        self.core = MagicCore()
        self.core.charger_sort('grimoire/sort_teleportation.json')
    
    def test_chargement_sort(self):
        """Test du chargement du sort"""
        self.assertIn('teleportation', self.core.sorts_charges)
    
    def test_execution_basique(self):
        """Test d'exécution avec paramètres valides"""
        params = {
            'entite': 'TestEntity',
            'destination': {'x': 100, 'y': 200, 'dimension': 0}
        }
        resultat = self.core.lancer_sort('teleportation', params)
        self.assertTrue(resultat['succes'])
    
    def test_parametres_invalides(self):
        """Test avec paramètres manquants/invalides"""
        params = {}  # Paramètres vides
        resultat = self.core.lancer_sort('teleportation', params)
        self.assertFalse(resultat['succes'])
    
    def test_formule_grammaire(self):
        """Test de validation de la formule"""
        sort_data = self.core.sorts_charges['teleportation']
        formule = sort_data.get('formule', '')
        self.assertIn('⊙', formule)  # Doit contenir superposition
        self.assertIn('→', formule)  # Doit contenir projection
```

### **Liste des Tests Obligatoires**

1. **test_sort_teleportation.py** ✅
2. **test_sort_invocation.py** 
3. **test_sort_protection.py**
4. **test_sort_brisure_interstice.py**
5. **test_sort_communication_interdimensionnelle.py**
6. **test_sort_organisation_universelle.py**
7. **test_bibliotheque_complete_sorts_avalon.py**
8. **test_import_sorts_lumen.py**
9. **test_sort_grut_ancien.py**
10. **test_sort_hexagone_fondamental.py**
11. **test_sort_unite_totale.py**
12. **test_sort_phase_shift.py**
13. **test_sort_resolution_causalite.py**
14. **test_sort_activation_portail.py**
15. **test_sort_brisure_teleport.py**
16. **test_sort_memoire_persistante.py**
17. **test_sort_dissimulation.py**

## 🔧 Script de Validation

### **validate_magic.sh**
```bash
#!/bin/bash
# Script de validation complète de la Magic Stack

echo "🔮 VALIDATION MAGIC STACK - DÉMARRAGE"
echo "======================================"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Test du core
echo -e "${YELLOW}1. Test du MagicCore...${NC}"
python3 -m pytest tests/test_magic_core.py -v
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ MagicCore OK${NC}"
    ((PASSED_TESTS++))
else
    echo -e "${RED}❌ MagicCore FAILED${NC}"
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))

# Test de chaque sort
echo -e "${YELLOW}2. Tests des 17 sorts...${NC}"
for sort_file in grimoire/*.json; do
    sort_name=$(basename "$sort_file" .json)
    test_file="tests/validation/test_${sort_name}.py"
    
    if [ -f "$test_file" ]; then
        echo "  Testing $sort_name..."
        python3 -m pytest "$test_file" -v
        if [ $? -eq 0 ]; then
            echo -e "  ${GREEN}✅ $sort_name OK${NC}"
            ((PASSED_TESTS++))
        else
            echo -e "  ${RED}❌ $sort_name FAILED${NC}"
            ((FAILED_TESTS++))
        fi
    else
        echo -e "  ${RED}❌ Test manquant pour $sort_name${NC}"
        ((FAILED_TESTS++))
    fi
    ((TOTAL_TESTS++))
done

# Test d'intégration
echo -e "${YELLOW}3. Tests d'intégration...${NC}"
python3 -m pytest tests/integration/ -v
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Intégration OK${NC}"
    ((PASSED_TESTS++))
else
    echo -e "${RED}❌ Intégration FAILED${NC}"
    ((FAILED_TESTS++))
fi
((TOTAL_TESTS++))

# Résultats finaux
echo "======================================"
echo -e "📊 RÉSULTATS FINAUX:"
echo -e "   Total: $TOTAL_TESTS tests"
echo -e "   ${GREEN}Réussis: $PASSED_TESTS${NC}"
echo -e "   ${RED}Échoués: $FAILED_TESTS${NC}"

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}🎉 TOUS LES TESTS PASSENT !${NC}"
    exit 0
else
    echo -e "${RED}💥 $FAILED_TESTS TESTS ONT ÉCHOUÉ${NC}"
    exit 1
fi
```

## 📊 Cas Limites à Tester

### **Paramètres Limites**
- Valeurs nulles/vides
- Coordonnées hors limites
- Mana insuffisant
- Niveau requis non atteint

### **Situations d'Erreur**
- Sorts non chargés
- Formules malformées
- Conflits de sorts
- Timeouts d'exécution

### **Tests de Stress**
- 1000 sorts simultanés
- Boucles infinies
- Mémoire saturée
- Réseau indisponible

## 🎯 Critères de Validation

### **Critères de Succès**
✅ Sort se charge sans erreur  
✅ Formule respecte la grammaire  
✅ Exécution produit un résultat  
✅ Logs générés correctement  
✅ Pas de fuite mémoire  

### **Critères d'Échec**
❌ Exception non gérée  
❌ Résultat incohérent  
❌ Performance < 100ms  
❌ Corruption de données  
❌ Crash du système  

## 🚀 Intégration Continue

### **GitHub Actions** (à venir)
```yaml
name: Magic Stack Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.8'
      - name: Run Magic Tests
        run: ./validate_magic.sh
```

---

*Tests et validation par URZ-KÔM - Gardien de la Qualité Magique*  
*Mission assignée par TUCKER - Maître des Tests*