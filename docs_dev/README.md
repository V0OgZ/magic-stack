# 🛠️ DOCS DEV - MAGIC STACK DEVELOPMENT

**Pour** : Développeurs & Intégrateurs  
**Version** : 2.0  
**Date** : Jour 7  

---

## 🚀 **QUICK START**

### **Installation**
```bash
cd spells/stack/
pip install -r requirements.txt
python magic_core.py
```

### **Test Rapide**
```python
from magic_core import MagicCore

# Initialisation
core = MagicCore()

# Test basique
resultat = core.lancer_sort("teleportation_basique", {
    "origine": "A", 
    "destination": "B"
})
print(resultat)
```

---

## 📚 **API REFERENCE**

### **Classe MagicCore**

#### **Constructeur**
```python
def __init__(self):
    """
    Initialise le moteur magique
    - Charge grammaire_temporelle.json
    - Initialise système de logs
    - Prépare cache formules
    """
```

#### **Méthodes Principales**

##### **charger_sort(chemin_sort: str) → bool**
```python
def charger_sort(self, chemin_sort: str) -> bool:
    """
    Charge un sort depuis fichier JSON
    
    Args:
        chemin_sort: Chemin vers fichier .json
        
    Returns:
        bool: True si succès, False sinon
        
    Exemple:
        core.charger_sort("grimoire/teleportation.json")
    """
```

##### **charger_grimoire_complet(dossier: str) → int**
```python
def charger_grimoire_complet(self, dossier: str) -> int:
    """
    Charge tous les sorts d'un dossier
    
    Args:
        dossier: Chemin vers dossier grimoire
        
    Returns:
        int: Nombre de sorts chargés
        
    Exemple:
        nb_sorts = core.charger_grimoire_complet("grimoire/")
    """
```

##### **lancer_sort(nom_sort: str, contexte: Dict) → Dict**
```python
def lancer_sort(self, nom_sort: str, contexte: Dict) -> Dict:
    """
    Lance un sort avec contexte donné
    
    Args:
        nom_sort: Nom du sort à lancer
        contexte: Variables d'environnement
        
    Returns:
        Dict: Résultat avec succès/erreur/effet
        
    Exemple:
        resultat = core.lancer_sort("heal", {"cible": "player1"})
    """
```

##### **compiler_formule(formule_str: str) → Dict**
```python
def compiler_formule(self, formule_str: str) -> Dict:
    """
    Compile une formule temporelle brute
    
    Args:
        formule_str: Formule en syntaxe temporelle
        
    Returns:
        Dict: AST compilé ou erreurs
        
    Exemple:
        ast = core.compiler_formule("⊙(héros) + Δt+1 → ⟶(destination)")
    """
```

---

## 🏗️ **ARCHITECTURE INTERNE**

### **Structure des Fichiers**
```
spells/stack/
├── magic_core.py          # Moteur principal
├── grammaire_temporelle.json  # Définitions syntaxe
├── interface.html         # Interface web
├── grimoire/             # Sorts JSON
│   ├── teleportation.json
│   ├── invocation.json
│   └── protection.json
├── docs_*/              # Documentation
└── tests/               # Tests unitaires
```

### **Classes & Modules**

#### **MagicCore (magic_core.py)**
- **Responsabilité** : Moteur d'exécution principal
- **Dependencies** : json, logging, datetime
- **State** : grammaire, sorts_charges, logs

#### **Parser Temporel (intégré)**
- **Responsabilité** : Analyse syntaxique formules
- **Input** : String formule temporelle
- **Output** : AST exécutable

#### **Grimoire Manager (intégré)**
- **Responsabilité** : Gestion sorts JSON
- **Fonctions** : Chargement, validation, cache

---

## 🔌 **INTÉGRATIONS**

### **Avec Backend Java Spring Boot**

#### **Option 1 : API REST**
```python
# Serveur Flask pour Magic Stack
from flask import Flask, request, jsonify
from magic_core import MagicCore

app = Flask(__name__)
core = MagicCore()

@app.route('/api/magic/cast', methods=['POST'])
def cast_spell():
    data = request.json
    result = core.lancer_sort(data['spell'], data['context'])
    return jsonify(result)

@app.route('/api/magic/compile', methods=['POST'])
def compile_formula():
    formula = request.json['formula']
    result = core.compiler_formule(formula)
    return jsonify(result)
```

#### **Option 2 : Bridge Python-Java**
```java
// Java side - ProcessBuilder
ProcessBuilder pb = new ProcessBuilder(
    "python", "magic_core.py", 
    "--spell", spellName,
    "--context", contextJson
);
Process p = pb.start();
String result = readOutput(p);
```

#### **Option 3 : Message Queue**
```python
# RabbitMQ/Redis integration
import redis
r = redis.Redis()

def process_magic_requests():
    while True:
        request = r.blpop('magic_queue')[1]
        data = json.loads(request)
        result = core.lancer_sort(data['spell'], data['context'])
        r.lpush('magic_results', json.dumps(result))
```

### **Avec Frontend React/Vue**

#### **WebSocket Connection**
```javascript
// Frontend JS
const ws = new WebSocket('ws://localhost:8080/magic');

function castSpell(spellName, context) {
    ws.send(JSON.stringify({
        action: 'cast',
        spell: spellName,
        context: context
    }));
}

ws.onmessage = (event) => {
    const result = JSON.parse(event.data);
    displayMagicEffect(result);
};
```

---

## 🧪 **TESTING**

### **Tests Unitaires**
```python
import unittest
from magic_core import MagicCore

class TestMagicCore(unittest.TestCase):
    def setUp(self):
        self.core = MagicCore()
    
    def test_charger_sort(self):
        result = self.core.charger_sort("grimoire/test_sort.json")
        self.assertTrue(result)
    
    def test_compiler_formule_valide(self):
        formule = "⊙(test) → Δt+1"
        result = self.core.compiler_formule(formule)
        self.assertIn('ast', result)
    
    def test_lancer_sort_basique(self):
        self.core.charger_sort("grimoire/teleportation.json")
        result = self.core.lancer_sort("teleportation", {"x": 10, "y": 20})
        self.assertTrue(result['succes'])

if __name__ == '__main__':
    unittest.main()
```

### **Tests d'Intégration**
```python
def test_integration_complete():
    """Test du workflow complet"""
    core = MagicCore()
    
    # 1. Chargement grimoire
    nb_sorts = core.charger_grimoire_complet("grimoire/")
    assert nb_sorts > 0
    
    # 2. Compilation formule custom
    formule = "⊙(héros) + †ψ(dragon) → Δt+5(combat)"
    ast = core.compiler_formule(formule)
    assert 'erreur' not in ast
    
    # 3. Exécution avec contexte
    contexte = {"héros": "Vince", "position": [100, 200]}
    result = core.lancer_sort("combat_dragon", contexte)
    assert result['succes']
```

### **Tests Performance**
```python
import time

def test_performance():
    core = MagicCore()
    core.charger_grimoire_complet("grimoire/")
    
    # Test 1000 sorts en série
    start = time.time()
    for i in range(1000):
        core.lancer_sort("teleportation", {"x": i, "y": i})
    end = time.time()
    
    print(f"1000 sorts en {end-start:.2f}s")
    assert (end-start) < 10  # Moins de 10s pour 1000 sorts
```

---

## 📊 **MONITORING & LOGS**

### **Système de Logs**
```python
# Configuration logging
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('magic_core.log'),
        logging.StreamHandler()
    ]
)
```

### **Métriques Importantes**
- **Temps compilation** formule
- **Temps exécution** sort
- **Taux succès/échec** par sort
- **Utilisation mémoire** cache
- **Nombre sorts** actifs simultanément

### **Health Check Endpoint**
```python
@app.route('/health')
def health_check():
    return jsonify({
        'status': 'ok',
        'sorts_charges': len(core.sorts_charges),
        'uptime': get_uptime(),
        'memory_usage': get_memory_usage()
    })
```

---

## 🔧 **CONFIGURATION**

### **Variables d'Environnement**
```bash
# .env
MAGIC_STACK_DEBUG=true
GRIMOIRE_PATH=./grimoire
LOG_LEVEL=INFO
MAX_EXECUTION_TIME=30
CACHE_SIZE=1000
GROEKEN_MODE=false
```

### **Fichier Config**
```python
# config.py
class Config:
    DEBUG = os.getenv('MAGIC_STACK_DEBUG', False)
    GRIMOIRE_PATH = os.getenv('GRIMOIRE_PATH', './grimoire')
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
    MAX_EXECUTION_TIME = int(os.getenv('MAX_EXECUTION_TIME', 30))
    CACHE_SIZE = int(os.getenv('CACHE_SIZE', 1000))
    GROEKEN_MODE = os.getenv('GROEKEN_MODE', 'false').lower() == 'true'
```

---

## 🚨 **TROUBLESHOOTING**

### **Erreurs Communes**

#### **"Grammaire non trouvée"**
```
Solution: Vérifier que grammaire_temporelle.json existe
cd spells/stack && ls -la grammaire_temporelle.json
```

#### **"Sort non compilé"**
```
Solution: Vérifier syntaxe formule temporelle
Utiliser compiler_formule() en mode debug
```

#### **"Timeout exécution"**
```
Solution: Réduire complexité formule ou augmenter MAX_EXECUTION_TIME
```

### **Debug Mode**
```python
# Activer debug complet
core = MagicCore()
core.debug = True
result = core.lancer_sort("problematic_spell", context)
print(core.get_debug_trace())
```

---

**Groeken - Maître du Code Temporel**  
*"Debug comme si ta timeline en dépendait"*