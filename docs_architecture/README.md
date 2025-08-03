# 🏗️ DOCS ARCHITECTURE - MAGIC STACK

**Responsable** : Groeken  
**Version** : 2.0  
**Date** : Jour 7  

---

## 🎯 **ARCHITECTURE GÉNÉRALE**

### **Vue d'ensemble**
```
MAGIC STACK ARCHITECTURE
┌─────────────────────────────────────────┐
│              INTERFACE LAYER            │
│  ┌─────────────┐    ┌─────────────────┐ │
│  │interface.html│    │  API REST       │ │
│  │   (Web UI)   │    │ (à développer)  │ │
│  └─────────────┘    └─────────────────┘ │
├─────────────────────────────────────────┤
│               CORE LAYER                │
│  ┌─────────────────────────────────────┐ │
│  │         magic_core.py               │ │
│  │    - MagicCore class                │ │
│  │    - Compilation formules           │ │
│  │    - Exécution sorts                │ │
│  │    - Système de logs                │ │
│  └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│              DATA LAYER                 │
│  ┌─────────────┐    ┌─────────────────┐ │
│  │grammaire_   │    │   grimoire/     │ │
│  │temporelle   │    │   (sorts JSON)  │ │
│  │.json        │    │                 │ │
│  └─────────────┘    └─────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 🧩 **MODULES DÉTAILLÉS**

### **1. MAGIC CORE (magic_core.py)**

#### **Classe MagicCore**
```python
class MagicCore:
    def __init__(self)
    def _charger_grammaire(self) -> Dict
    def charger_sort(self, chemin_sort: str) -> bool
    def charger_grimoire_complet(self, dossier: str) -> int
    def lancer_sort(self, nom_sort: str, contexte: Dict) -> Dict
    def compiler_formule(self, formule_str: str) -> Dict
    def auto_evolution(self) -> Dict
```

#### **Fonctionnalités Core**
- ✅ **Chargement dynamique** de sorts JSON
- ✅ **Compilation** de formules temporelles
- ✅ **Exécution** avec contexte global
- ✅ **Logging automatique** dans magic_core.log
- ✅ **Messages Groeken** contextuels
- ✅ **Auto-évolution** (mode secret)

### **2. GRAMMAIRE TEMPORELLE**

#### **Structure JSON**
```json
{
  "symboles": {
    "superposition": "⊙",
    "collapse": "†ψ", 
    "observation": "Π",
    "delta_temporel": "Δt",
    "branche": "ℬ",
    "projection": "⟶",
    "interstice": "∅"
  },
  "verbes": {...},
  "temps": {...},
  "structures": {...}
}
```

#### **Parser de Formules**
- **Format** : `⊙(action) + †ψ(effet) → Δt+n(résultat)`
- **Validation** syntaxique
- **Compilation** en structure exécutable

### **3. INTERFACE WEB**

#### **Composants**
- **Console de compilation** interactive
- **Grimoire** de sorts disponibles
- **Sortie temps réel** avec logs
- **Particules quantiques** animées
- **Messages Groeken** contextuels

#### **API JavaScript**
```javascript
// Fonctions principales
compilerFormule()
executerFormule()
chargerSort(nomSort)
chargerGrimoire()
```

---

## 🔄 **FLUX D'EXÉCUTION**

### **Séquence Standard**
```
1. Initialisation MagicCore
   ↓
2. Chargement grammaire_temporelle.json
   ↓
3. Chargement grimoire/ (sorts JSON)
   ↓
4. Interface prête (web ou API)
   ↓
5. Réception formule utilisateur
   ↓
6. Compilation via parser
   ↓
7. Validation syntaxique
   ↓
8. Exécution avec contexte
   ↓
9. Logging résultat
   ↓
10. Retour effet/message
```

---

## 🔌 **INTERFACES & ROUTAGES**

### **Interfaces Actuelles**
- ✅ **Web Interface** : `interface.html`
- ✅ **Python API** : `MagicCore` class
- ⏳ **REST API** : À développer

### **Routages Prévus**
```
FRONTEND (React/Vue) 
    ↓ HTTP
MAGIC STACK (Python)
    ↓ Bridge
BACKEND (Java Spring Boot)
    ↓ Database
PERSISTENCE LAYER
```

### **Points d'Extension**
1. **API REST** pour intégration backend
2. **WebSocket** pour temps réel
3. **GraphQL** pour requêtes complexes
4. **gRPC** pour haute performance

---

## 📊 **PERFORMANCE & SCALABILITÉ**

### **Métriques Actuelles**
- **Temps compilation** : ~10ms par formule
- **Mémoire** : ~50MB base + grimoire
- **Concurrence** : Single-threaded (Python)

### **Optimisations Prévues**
- **Cache formules** compilées
- **Pool de workers** pour exécution
- **Compression grimoire** JSON
- **Index symboles** pour recherche rapide

---

## 🔒 **SÉCURITÉ**

### **Validation Entrées**
- **Sanitization** formules utilisateur
- **Whitelist** symboles autorisés
- **Timeout** exécution (prevent loops)
- **Rate limiting** API calls

### **Isolation**
- **Sandbox** Python pour exécution
- **Permissions** fichiers grimoire
- **Audit logs** toutes actions

---

## 🚀 **DÉPLOIEMENT**

### **Environnements**
- **DEV** : Local avec interface.html
- **TEST** : Docker container + tests auto
- **PROD** : K8s pod + monitoring

### **Configuration**
```python
# config.py
GRIMOIRE_PATH = "grimoire/"
LOG_LEVEL = "INFO"
MAX_EXECUTION_TIME = 30
CACHE_SIZE = 1000
```

---

**Groeken - Architecte de la Magie**  
*"Ce que tu codes projette l'ordre"*