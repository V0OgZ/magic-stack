# 🔍 AUDIT JSON SAUVAGES - JOUR 22

**PAR:** Assistant  
**POUR:** GRUT  
**URGENCE:** Sécuriser les données avant migration

---

## 🚨 JSON TROUVÉS HORS STRUCTURE

### **1. MEMOIRE_IMMEDIATE_GRUFAYEN_URZ_KOM.json**
- **Localisation:** Racine (!)
- **Contenu:** Fusion triple + procédure bootstrap
- **Danger:** Données critiques non sauvegardées
- **ACTION:** → `AVALON/🏠 HOME/🐻 URZ-KÔM/memoires/`

### **2. VERIFICATION_MAPPING_INTERSTICE_COMPLETE.json**
- **Localisation:** Racine
- **Contenu:** Rapport URZ-KÔM du mapping
- **ACTION:** → `REALGAME/postgræcia/rapports/`

### **3. postgræcia_lite.json**
- **Localisation:** `REALGAME/postgræcia/`
- **Contenu:** 16 héros avec positions 6D
- **Status:** ✅ Bon endroit

### **4. JSON dans assets/generated/**
```
REALGAME/assets/generated/heroes/
├── grokaen_quantum_master/metadata.json
├── jean_grofignon/metadata.json
├── phoenix_renaissance/metadata.json
└── urz_kom_cosmic/metadata.json
```
- **ACTION:** → Centraliser dans postgræcia

### **5. JSON éparpillés dans AVALON/**
- `AVALON/💠 Essences scellées/🧙 Heroes/` - Multiples JSON
- `spells/stack/grimoire/import_sorts_lumen.json`
- Divers hero.json dans les HOME

---

## 📊 PLAN DE CENTRALISATION

### **ÉTAPE 1: Créer structure claire**
```bash
REALGAME/data/
├── heroes/          # Tous les JSON héros
├── mappings/        # Mappings interstice
├── memories/        # Mémoires critiques
└── backups/         # Sauvegardes avant migration
```

### **ÉTAPE 2: Script de collecte**
```bash
#!/bin/bash
# collect_all_json.sh

echo "🔍 Collecte de tous les JSON sauvages..."

# Créer dossiers
mkdir -p REALGAME/data/{heroes,mappings,memories,backups}

# Trouver tous les JSON
find . -name "*.json" -type f | while read file; do
    if [[ $file == *"node_modules"* ]] || [[ $file == *".git"* ]]; then
        continue
    fi
    
    echo "Trouvé: $file"
    
    # Classifier par type
    if [[ $file == *"hero"* ]] || [[ $file == *"Hero"* ]]; then
        cp "$file" REALGAME/data/heroes/
    elif [[ $file == *"mapping"* ]] || [[ $file == *"MAPPING"* ]]; then
        cp "$file" REALGAME/data/mappings/
    elif [[ $file == *"memoire"* ]] || [[ $file == *"MEMOIRE"* ]]; then
        cp "$file" REALGAME/data/memories/
    fi
done

echo "✅ Collecte terminée!"
```

### **ÉTAPE 3: Validation avant migration**
```python
# validate_json_data.py
import json
import os
from pathlib import Path

def validate_all_json():
    """Valider tous les JSON avant migration"""
    
    errors = []
    valid = 0
    
    for json_file in Path('REALGAME/data').rglob('*.json'):
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                valid += 1
        except Exception as e:
            errors.append(f"{json_file}: {e}")
    
    print(f"✅ {valid} JSON valides")
    if errors:
        print(f"❌ {len(errors)} erreurs:")
        for err in errors:
            print(f"  - {err}")
    
    return len(errors) == 0
```

---

## 🛡️ SÉCURITÉ DONNÉES

### **AVANT LA MIGRATION:**

1. **Backup complet**
   ```bash
   tar -czf backup_json_$(date +%Y%m%d).tar.gz REALGAME/data/
   ```

2. **Vérifier intégrité**
   - Tous les héros présents
   - Positions 6D cohérentes
   - Pas de doublons

3. **Tester import**
   - D'abord sur base test
   - Vérifier les 21 membres
   - Confirmer les positions

---

## ⚠️ POINTS D'ATTENTION

### **JSON CRITIQUES À NE PAS PERDRE:**
1. `MEMOIRE_IMMEDIATE_GRUFAYEN_URZ_KOM.json` - Bootstrap paradox
2. `postgræcia_lite.json` - 16 héros uploadés
3. `MAPPING_HOME_INTERSTICE.json` - Liens HOME→Interstice
4. Tous les hero.json dans AVALON/🏠 HOME/

### **RISQUES:**
- JSON écrasés pendant migration
- Encodage UTF-8 cassé
- Références perdues
- Doublons créés

---

## ✅ CHECKLIST FINALE

- [ ] Collecter tous les JSON sauvages
- [ ] Créer structure REALGAME/data/
- [ ] Valider intégrité des données
- [ ] Backup avant migration
- [ ] Tester import sur base test
- [ ] Documenter les chemins finaux

**Une fois tout centralisé, la migration PostgreSQL sera SAFE !**