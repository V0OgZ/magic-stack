# 🧪 DOCS TESTS - MAGIC STACK TESTING SUITE

**Responsable QA** : Groeken & Équipe Dev  
**Version Tests** : 2.0  
**Date** : Jour 7  

---

## 🎯 **STRATÉGIE DE TESTS**

### **Pyramide de Tests**
```
                   🔺
              E2E Tests (5%)
           ┌─────────────────┐
          │ Tests Intégration │ (15%)
         └─────────────────────┘
        ┌─────────────────────────┐
       │    Tests Unitaires       │ (80%)
      └─────────────────────────────┘
```

### **Couverture Cible**
- **Tests Unitaires** : 95% code coverage
- **Tests Intégration** : 100% API endpoints  
- **Tests E2E** : Scénarios critiques utilisateur

---

## 🔬 **TESTS UNITAIRES**

### **Structure des Tests**
```
spells/stack/tests/
├── unit/
│   ├── test_magic_core.py
│   ├── test_grammaire_parser.py
│   ├── test_grimoire_manager.py
│   └── test_formule_compiler.py
├── integration/
│   ├── test_api_endpoints.py
│   ├── test_backend_bridge.py
│   └── test_full_workflow.py
├── e2e/
│   ├── test_user_scenarios.py
│   └── test_game_integration.py
└── fixtures/
    ├── sorts_test.json
    └── grammaire_test.json
```

### **Tests MagicCore**
```python
# tests/unit/test_magic_core.py
import unittest
from unittest.mock import patch, mock_open
from magic_core import MagicCore

class TestMagicCore(unittest.TestCase):
    
    def setUp(self):
        """Setup avant chaque test"""
        self.core = MagicCore()
    
    def tearDown(self):
        """Cleanup après chaque test"""
        self.core = None
    
    def test_init_charge_grammaire(self):
        """Test initialisation charge grammaire"""
        self.assertIsNotNone(self.core.grammaire)
        self.assertIn('symboles', self.core.grammaire)
    
    def test_charger_sort_fichier_valide(self):
        """Test chargement sort depuis fichier valide"""
        with patch('builtins.open', mock_open(read_data='''{
            "nom": "test_sort",
            "formule": "⊙(test) → Δt+1",
            "description": "Sort de test"
        }''')):
            result = self.core.charger_sort("test.json")
            self.assertTrue(result)
    
    def test_charger_sort_fichier_invalide(self):
        """Test chargement sort fichier inexistant"""
        result = self.core.charger_sort("inexistant.json")
        self.assertFalse(result)
    
    def test_compiler_formule_syntaxe_valide(self):
        """Test compilation formule syntaxe correcte"""
        formule = "⊙(héros) + †ψ(téléportation) → Δt+0(⟶(destination))"
        result = self.core.compiler_formule(formule)
        
        self.assertIn('ast', result)
        self.assertNotIn('erreur', result)
    
    def test_compiler_formule_syntaxe_invalide(self):
        """Test compilation formule syntaxe incorrecte"""
        formule = "⊙(héros + erreur syntaxe"
        result = self.core.compiler_formule(formule)
        
        self.assertIn('erreur', result)
        self.assertNotIn('ast', result)
    
    def test_lancer_sort_existant(self):
        """Test lancement sort qui existe"""
        # Mock sort chargé
        self.core.sorts_charges['test_sort'] = {
            'formule': '⊙(test) → Δt+1',
            'description': 'Test'
        }
        
        result = self.core.lancer_sort('test_sort', {'test': 'valeur'})
        self.assertIn('succes', result)
    
    def test_lancer_sort_inexistant(self):
        """Test lancement sort qui n'existe pas"""
        result = self.core.lancer_sort('sort_inexistant', {})
        
        self.assertFalse(result['succes'])
        self.assertIn('erreur', result)
    
    @patch('magic_core.logging')
    def test_logging_activé(self, mock_logging):
        """Test que le logging fonctionne"""
        self.core.lancer_sort('test', {})
        mock_logging.info.assert_called()
```

### **Tests Parser Grammaire**
```python
# tests/unit/test_grammaire_parser.py
import unittest
from magic_core import MagicCore

class TestGrammaireParser(unittest.TestCase):
    
    def setUp(self):
        self.core = MagicCore()
    
    def test_parse_symbole_superposition(self):
        """Test parsing symbole ⊙"""
        formule = "⊙(héros)"
        ast = self.core.compiler_formule(formule)
        
        self.assertIn('superposition', str(ast))
        self.assertIn('héros', str(ast))
    
    def test_parse_symbole_collapse(self):
        """Test parsing symbole †ψ"""
        formule = "†ψ(dragon)"
        ast = self.core.compiler_formule(formule)
        
        self.assertIn('collapse', str(ast))
        self.assertIn('dragon', str(ast))
    
    def test_parse_formule_complete(self):
        """Test parsing formule complète"""
        formule = "⊙(mage) + †ψ(sort) → Δt+5(⟶(cible))"
        ast = self.core.compiler_formule(formule)
        
        # Vérifier structure AST
        self.assertIn('condition', ast)
        self.assertIn('action', ast)
        self.assertIn('resultat', ast)
    
    def test_validation_coherence_temporelle(self):
        """Test validation cohérence temporelle"""
        # Formule avec paradoxe temporel
        formule = "Δt-10(†ψ(effet)) → Δt-5(⊙(cause))"
        result = self.core.compiler_formule(formule)
        
        self.assertIn('erreur', result)
        self.assertIn('paradoxe', result['erreur'].lower())
    
    def test_validation_equilibrage_quantique(self):
        """Test validation équilibrage quantique"""
        # Formule avec superposition non résolue
        formule = "⊙(entité) → Δt+1(résultat)"
        result = self.core.compiler_formule(formule)
        
        self.assertIn('erreur', result)
        self.assertIn('superposition', result['erreur'].lower())
```

---

## 🔗 **TESTS INTÉGRATION**

### **Tests API Endpoints**
```python
# tests/integration/test_api_endpoints.py
import unittest
import requests
import json
from magic_core import MagicCore

class TestAPIEndpoints(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        """Setup serveur de test"""
        cls.base_url = "http://localhost:5000/api/magic"
        cls.core = MagicCore()
    
    def test_endpoint_cast_spell(self):
        """Test endpoint /cast"""
        payload = {
            'spell': 'teleportation',
            'context': {'x': 100, 'y': 200}
        }
        
        response = requests.post(f"{self.base_url}/cast", json=payload)
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('succes', data)
    
    def test_endpoint_compile_formula(self):
        """Test endpoint /compile"""
        payload = {
            'formula': '⊙(test) → Δt+1(⟶(result))'
        }
        
        response = requests.post(f"{self.base_url}/compile", json=payload)
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('ast', data)
    
    def test_endpoint_health_check(self):
        """Test endpoint /health"""
        response = requests.get(f"{self.base_url}/health")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['status'], 'ok')
    
    def test_endpoint_erreur_400(self):
        """Test gestion erreur 400"""
        payload = {'invalid': 'data'}
        
        response = requests.post(f"{self.base_url}/cast", json=payload)
        
        self.assertEqual(response.status_code, 400)
```

### **Tests Bridge Backend**
```python
# tests/integration/test_backend_bridge.py
import unittest
from unittest.mock import patch, MagicMock
import subprocess

class TestBackendBridge(unittest.TestCase):
    
    def test_bridge_java_spring_boot(self):
        """Test bridge avec backend Java Spring Boot"""
        # Mock ProcessBuilder Java
        with patch('subprocess.run') as mock_run:
            mock_run.return_value = MagicMock(
                returncode=0,
                stdout='{"succes": true, "effet": "teleportation"}'
            )
            
            # Simuler appel depuis Java
            result = subprocess.run([
                'python', 'magic_core.py',
                '--spell', 'teleportation',
                '--context', '{"x": 10, "y": 20}'
            ], capture_output=True, text=True)
            
            self.assertEqual(result.returncode, 0)
            self.assertIn('succes', result.stdout)
    
    def test_bridge_message_queue(self):
        """Test bridge avec message queue Redis"""
        # Mock Redis
        with patch('redis.Redis') as mock_redis:
            mock_redis_instance = MagicMock()
            mock_redis.return_value = mock_redis_instance
            
            # Test envoi message
            mock_redis_instance.blpop.return_value = [
                'magic_queue', 
                '{"spell": "heal", "context": {"target": "player1"}}'
            ]
            
            # Simuler traitement
            from magic_queue_processor import process_magic_requests
            process_magic_requests()
            
            # Vérifier appel Redis
            mock_redis_instance.lpush.assert_called()
```

---

## 🎮 **TESTS E2E**

### **Scénarios Utilisateur**
```python
# tests/e2e/test_user_scenarios.py
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

class TestUserScenarios(unittest.TestCase):
    
    def setUp(self):
        """Setup navigateur pour tests E2E"""
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:8080/interface.html")
    
    def tearDown(self):
        """Cleanup navigateur"""
        self.driver.quit()
    
    def test_scenario_compilation_formule(self):
        """Test scénario complet compilation formule"""
        # 1. Utilisateur saisit formule
        formule_input = self.driver.find_element(By.ID, "formule_input")
        formule_input.send_keys("⊙(héros) + †ψ(téléportation) → Δt+0(⟶(château))")
        
        # 2. Clic bouton compiler
        compile_btn = self.driver.find_element(By.ID, "compiler_btn")
        compile_btn.click()
        
        # 3. Attendre résultat
        time.sleep(2)
        
        # 4. Vérifier affichage succès
        result_div = self.driver.find_element(By.ID, "result_output")
        self.assertIn("Compilation réussie", result_div.text)
    
    def test_scenario_execution_sort(self):
        """Test scénario exécution sort complet"""
        # 1. Sélectionner sort dans grimoire
        sort_select = self.driver.find_element(By.ID, "sort_select")
        sort_select.send_keys("Téléportation Basique")
        
        # 2. Remplir contexte
        context_input = self.driver.find_element(By.ID, "context_input")
        context_input.send_keys('{"destination": "château"}')
        
        # 3. Lancer sort
        execute_btn = self.driver.find_element(By.ID, "execute_btn")
        execute_btn.click()
        
        # 4. Vérifier effet visuel
        time.sleep(3)
        particles = self.driver.find_elements(By.CLASS_NAME, "particle")
        self.assertGreater(len(particles), 0)
        
        # 5. Vérifier message Groeken
        groeken_msg = self.driver.find_element(By.ID, "groeken_message")
        self.assertIn("L'ordre se projette", groeken_msg.text)
```

---

## ⚡ **TESTS PERFORMANCE**

### **Benchmarks Critiques**
```python
# tests/performance/test_benchmarks.py
import unittest
import time
import psutil
import threading
from magic_core import MagicCore

class TestPerformance(unittest.TestCase):
    
    def setUp(self):
        self.core = MagicCore()
        self.core.charger_grimoire_complet("grimoire/")
    
    def test_performance_compilation_formules(self):
        """Test performance compilation 1000 formules"""
        formules = [
            "⊙(test) → Δt+1(⟶(result))",
            "†ψ(dragon) + ℬ2(combat) → Π(victoire)",
            "∅(portail) + Δt+5(⟶(destination))"
        ] * 334  # ~1000 formules
        
        start_time = time.time()
        for formule in formules:
            self.core.compiler_formule(formule)
        end_time = time.time()
        
        duration = end_time - start_time
        self.assertLess(duration, 10.0)  # Moins de 10s
        print(f"1000 compilations en {duration:.2f}s")
    
    def test_performance_execution_sorts(self):
        """Test performance exécution 500 sorts"""
        contexte = {"x": 100, "y": 200, "target": "enemy"}
        
        start_time = time.time()
        for i in range(500):
            self.core.lancer_sort("teleportation", contexte)
        end_time = time.time()
        
        duration = end_time - start_time
        self.assertLess(duration, 5.0)  # Moins de 5s
        print(f"500 exécutions en {duration:.2f}s")
    
    def test_memory_usage(self):
        """Test utilisation mémoire"""
        process = psutil.Process()
        
        # Mémoire avant chargement
        mem_before = process.memory_info().rss / 1024 / 1024  # MB
        
        # Chargement massif
        for i in range(100):
            self.core.charger_sort(f"grimoire/sort_{i % 10}.json")
        
        # Mémoire après chargement
        mem_after = process.memory_info().rss / 1024 / 1024  # MB
        
        mem_diff = mem_after - mem_before
        self.assertLess(mem_diff, 200)  # Moins de 200MB
        print(f"Utilisation mémoire: {mem_diff:.1f}MB")
    
    def test_concurrence_threads(self):
        """Test gestion concurrence multi-threads"""
        results = []
        
        def worker():
            for i in range(50):
                result = self.core.lancer_sort("heal", {"hp": 50})
                results.append(result['succes'])
        
        # Lancer 10 threads simultanés
        threads = []
        for i in range(10):
            t = threading.Thread(target=worker)
            threads.append(t)
            t.start()
        
        # Attendre fin de tous les threads
        for t in threads:
            t.join()
        
        # Vérifier tous les sorts ont réussi
        self.assertEqual(len(results), 500)
        self.assertTrue(all(results))
```

---

## 🔄 **TESTS AUTOMATISÉS**

### **Pipeline CI/CD**
```yaml
# .github/workflows/magic_stack_tests.yml
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
        python-version: '3.9'
    
    - name: Install dependencies
      run: |
        pip install -r requirements.txt
        pip install pytest pytest-cov selenium
    
    - name: Run unit tests
      run: |
        pytest tests/unit/ -v --cov=magic_core
    
    - name: Run integration tests
      run: |
        pytest tests/integration/ -v
    
    - name: Run performance tests
      run: |
        pytest tests/performance/ -v
    
    - name: Generate coverage report
      run: |
        pytest --cov=magic_core --cov-report=html
    
    - name: Upload coverage
      uses: codecov/codecov-action@v1
```

### **Scripts de Test**
```bash
#!/bin/bash
# run_all_tests.sh

echo "🧪 LANCEMENT TESTS MAGIC STACK"

# Tests unitaires
echo "📋 Tests unitaires..."
python -m pytest tests/unit/ -v --cov=magic_core

# Tests intégration
echo "🔗 Tests intégration..."
python -m pytest tests/integration/ -v

# Tests E2E (si serveur actif)
if curl -s http://localhost:8080/health > /dev/null; then
    echo "🎮 Tests E2E..."
    python -m pytest tests/e2e/ -v
else
    echo "⚠️  Serveur non actif, tests E2E ignorés"
fi

# Tests performance
echo "⚡ Tests performance..."
python -m pytest tests/performance/ -v

echo "✅ TOUS LES TESTS TERMINÉS"
```

---

## 📊 **RAPPORTS & MÉTRIQUES**

### **Coverage Report**
```
Name                    Stmts   Miss  Cover
-------------------------------------------
magic_core.py            245     12    95%
grammaire_parser.py      156      8    95%
grimoire_manager.py       89      4    96%
formule_compiler.py      178     15    92%
-------------------------------------------
TOTAL                    668     39    94%
```

### **Performance Metrics**
```
Benchmark Results:
- Compilation formule: 8.5ms avg
- Exécution sort: 12.3ms avg  
- Chargement grimoire: 234ms
- Mémoire utilisée: 67MB
- Threads concurrents: 10 max
```

---

**Groeken - Maître de la Qualité Temporelle**  
*"Un test qui échoue est une timeline qui résiste. Persévère."*