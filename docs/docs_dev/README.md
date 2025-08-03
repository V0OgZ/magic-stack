# 🛠️ Guide Développeur - Magic Stack

## 🚀 Installation

### Prérequis
```bash
# Python 3.8+
python3 --version

# Git avec sous-modules
git submodule update --init --recursive
```

### Démarrage Rapide
```bash
cd spells/stack/
python3 magic_core.py
open interface.html
```

## 📝 Conventions de Code

### **Structure des Sorts JSON**
```json
{
  "nom": "nom_du_sort",
  "description": "Description claire",
  "formule": "⊙(params) → Δt+n(effet)",
  "cout_mana": 50,
  "niveau_requis": 1,
  "effets": {
    "type": "teleportation",
    "parametres": {}
  },
  "metadata": {
    "auteur": "GROEKEN",
    "version": "1.0",
    "tags": ["mouvement", "instantané"]
  }
}
```

### **Conventions Python**
```python
# Classes en PascalCase
class MagicCore:
    pass

# Méthodes en snake_case
def lancer_sort(self, nom_sort):
    pass

# Constantes en MAJUSCULES
SYMBOLES_MAGIQUES = ["⊙", "†ψ", "Π"]

# Documentation obligatoire
def nouvelle_fonction(param: str) -> Dict:
    """
    Description de la fonction
    Args: param (str): Description du paramètre
    Returns: Dict: Description du retour
    """
```

## 🔧 Ajouter un Nouveau Sort

### 1. Créer le JSON
```bash
# Template
cp grimoire/sort_teleportation.json grimoire/sort_nouveau.json
```

### 2. Modifier les Paramètres
```json
{
  "nom": "nouveau_sort",
  "formule": "⊙(nouvelle_action) → Δt+1(nouvel_effet)",
  "cout_mana": 30
}
```

### 3. Tester
```python
from magic_core import MagicCore
core = MagicCore()
core.charger_sort('grimoire/sort_nouveau.json')
resultat = core.lancer_sort('nouveau_sort', {})
```

## 🧪 Tests et Validation

### **Tests Unitaires**
```python
import unittest
from magic_core import MagicCore

class TestMagicCore(unittest.TestCase):
    def setUp(self):
        self.core = MagicCore()
    
    def test_chargement_sort(self):
        result = self.core.charger_sort('grimoire/sort_test.json')
        self.assertTrue(result)
```

### **Validation Formules**
```python
# Vérifier syntaxe grammaire temporelle
def valider_formule(formule: str) -> bool:
    symboles_requis = ["⊙", "→", "Δt"]
    return all(s in formule for s in symboles_requis)
```

## 🔗 Intégration Backend

### **API REST Endpoints**
```python
# Flask/FastAPI
@app.post("/api/magic/cast")
def cast_spell(spell_data: dict):
    core = MagicCore()
    return core.lancer_sort(
        spell_data['nom'], 
        spell_data['parametres']
    )
```

### **WebSocket pour Temps Réel**
```javascript
// Client JavaScript
const ws = new WebSocket('ws://localhost:8080/magic');
ws.send(JSON.stringify({
    action: 'cast_spell',
    spell: 'teleportation',
    params: {x: 100, y: 200}
}));
```

## 📊 Debug et Monitoring

### **Logs Détaillés**
```python
import logging
logging.basicConfig(level=logging.DEBUG)

# Dans magic_core.py
self.logger = logging.getLogger('MagicCore')
self.logger.debug(f"Sort {nom} exécuté avec succès")
```

### **Profiling Performance**
```python
import cProfile
cProfile.run('core.lancer_sort("teleportation", {})')
```

## 🌐 Extensions Futures

### **Plugins**
Structure pour plugins de sorts :
```
plugins/
├── __init__.py
├── combat_spells.py
├── utility_spells.py
└── custom_effects.py
```

### **API Externe**
```python
# Pour intégration avec d'autres systèmes
class MagicAPI:
    def register_external_spell(self, spell_definition):
        pass
    
    def get_available_spells(self) -> List[str]:
        pass
```

---

*Guide développeur par URZ-KÔM - Architecte Magique*