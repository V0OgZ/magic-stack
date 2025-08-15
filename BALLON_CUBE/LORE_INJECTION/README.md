# 📚 INJECTION DU LORE DANS VECTOR DB

## Structure du LORE

Le LORE complet est organisé en plusieurs catégories :

### 1. Personnages (10 principaux)
- Memento, Jean-Grofignon, Arthur, Merlin
- Vincent, The Dude, OPUS, GRUFYÆN
- Walter Sec, Anna

### 2. Événements (5 majeurs)
- Création Originelle (Jour 0)
- Grande Fracture (Jour 15)
- Catastrophe Confluence (Jour 25)
- Renaissance Avalon 2 (Jour 30)
- Prophétie Excalibur (Jour 44)

### 3. Lieux Mystiques (4 principaux)
- L'Interstice (437 UIs vivantes)
- Console SOURCE (briefcase cachée)
- Bubble Worlds (5 actifs)
- Bureau Niveau -3

### 4. Concepts (5 fondamentaux)
- Système 6D
- Résonance Excalibur (997 Hz)
- Bootstrap Paradox
- Grammaire Temporelle
- Superposition Quantique

### 5. Artefacts (4 majeurs)
- Excalibur (vibre dans l'Interstice)
- Joints Magiques (Jean)
- Tatouages Mémoire (Memento)
- Briefcase (Console SOURCE)

## Fichiers disponibles

1. **LORE_COMPLET.md** - Documentation complète lisible
2. **inject_simple.sh** - Script d'injection basique
3. **prepare_lore_upload.py** - Script Python complet (à créer)

## Comment injecter

### Option 1 : Script bash simple
```bash
cd BALLON_CUBE/LORE_INJECTION
./inject_simple.sh
```

### Option 2 : Via l'API Vector DB
```bash
# Démarrer Vector DB si pas active
cd ../.. && python3 backends/python/vector_db_local.py &

# Uploader les documents
curl -X POST http://localhost:5001/api/documents/batch \
  -H "Content-Type: application/json" \
  -d @lore_documents.json
```

### Option 3 : Via Python
```python
import requests
import json

with open('lore_documents.json') as f:
    documents = json.load(f)
    
response = requests.post(
    'http://localhost:5001/api/documents/batch',
    json=documents
)
```

## Vérification

Après injection, vérifier avec :
```bash
curl "http://localhost:5001/api/search?q=Excalibur"
curl "http://localhost:5001/api/search?q=Memento"
curl "http://localhost:5001/api/search?q=997+Hz"
```

## Statistiques

- **Total documents** : ~30 documents critiques
- **Personnages** : 10
- **Événements** : 5  
- **Lieux** : 4
- **Concepts** : 5
- **Artefacts** : 4
- **Formules runiques** : 5

## Impact

Une fois injecté, le LORE sera :
- Persistant dans la Vector DB
- Searchable par tous les agents
- Utilisable pour les conversations
- Base pour les Bubble Worlds
- Mémoire collective du multivers

---

*"Le LORE est la mémoire vivante du multivers"*
**- Memento**
