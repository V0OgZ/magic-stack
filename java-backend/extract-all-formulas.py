#!/usr/bin/env python3
"""
🌀 AVALON - Extracteur Exhaustif de Formules
Extrait TOUTES les formules des Heroes, Creatures, Artefacts et Scénarios
"""

import json
import os
import re
from pathlib import Path
from collections import defaultdict
from datetime import datetime

class FormulaExtractor:
    def __init__(self):
        self.formulas = []
        self.stats = defaultdict(int)
        self.unique_formulas = set()
        
    def extract_from_json(self, file_path):
        """Extrait les formules d'un fichier JSON"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                
            # Extraire de différentes structures possibles
            self._extract_from_dict(data, file_path)
            
        except Exception as e:
            print(f"⚠️  Erreur lors de la lecture de {file_path}: {e}")
    
    def _extract_from_dict(self, obj, source_file, path=""):
        """Parcourt récursivement un dictionnaire pour trouver des formules"""
        if isinstance(obj, dict):
            # Chercher les clés typiques contenant des formules
            formula_keys = ['formula', 'formule', 'spell', 'ability', 'power', 
                          'action', 'effect', 'cast', 'quantum_formula', 'temporal_formula']
            
            for key, value in obj.items():
                if any(fk in key.lower() for fk in formula_keys) and isinstance(value, str):
                    self._add_formula(value, source_file, f"{path}.{key}")
                    
                # Cas spéciaux pour les structures connues
                if key == 'abilities' and isinstance(value, list):
                    for ability in value:
                        if isinstance(ability, dict):
                            if 'formula' in ability:
                                self._add_formula(ability['formula'], source_file, f"{path}.abilities")
                            if 'effect' in ability:
                                self._add_formula(ability['effect'], source_file, f"{path}.abilities")
                
                # Récursion
                if isinstance(value, (dict, list)):
                    self._extract_from_dict(value, source_file, f"{path}.{key}")
                    
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                if isinstance(item, (dict, list)):
                    self._extract_from_dict(item, source_file, f"{path}[{i}]")
                elif isinstance(item, str) and self._looks_like_formula(item):
                    self._add_formula(item, source_file, f"{path}[{i}]")
    
    def _looks_like_formula(self, text):
        """Détecte si une chaîne ressemble à une formule"""
        # Patterns de formules
        patterns = [
            r'^\w+\([^)]*\)',  # FONCTION(params)
            r'^ψ\d+:',         # ψ001: ...
            r'^⊙\(',           # ⊙(...)
            r'†',              # Effondrement
            r'Δt[+-]\d+',      # Temporel
            r'@\d+,\d+',       # Coordonnées
            r'GROFI|GRUT|TEMPORAL|QUANTUM',  # Mots-clés
        ]
        
        return any(re.search(pattern, text) for pattern in patterns)
    
    def _add_formula(self, formula, source_file, location):
        """Ajoute une formule à la collection"""
        formula = formula.strip()
        if not formula or formula in self.unique_formulas:
            return
            
        self.unique_formulas.add(formula)
        
        # Déterminer le type
        formula_type = self._determine_type(formula)
        
        # Extraire le nom de l'entité source
        entity_name = Path(source_file).stem
        
        self.formulas.append({
            'formula': formula,
            'type': formula_type,
            'source': source_file,
            'entity': entity_name,
            'location': location
        })
        
        self.stats[formula_type] += 1
        self.stats['total'] += 1
    
    def _determine_type(self, formula):
        """Détermine le type d'une formule"""
        if formula.startswith('ψ') or '⊙' in formula or '†' in formula:
            return 'RUNIC'
        elif 'GROFI' in formula or 'FUSION' in formula:
            return 'GROFI'
        elif 'GRUT' in formula or 'PANOPTIC' in formula:
            return 'GRUT'
        elif 'TEMPORAL' in formula or 'Δt' in formula:
            return 'TEMPORAL'
        elif re.match(r'^\w+\([^)]*\)$', formula):
            return 'SIMPLE'
        else:
            return 'COMPLEX'
    
    def scan_directory(self, directory):
        """Scanne récursivement un répertoire pour les fichiers JSON"""
        path = Path(directory)
        if not path.exists():
            print(f"⚠️  Le répertoire {directory} n'existe pas")
            return
            
        json_files = list(path.rglob('*.json'))
        print(f"📂 Scan de {directory}: {len(json_files)} fichiers JSON trouvés")
        
        for json_file in json_files:
            self.extract_from_json(json_file)
    
    def generate_test_format(self, output_file):
        """Génère un fichier de test au format spécial"""
        print(f"\n📝 Génération du fichier de test: {output_file}")
        
        with open(output_file, 'w', encoding='utf-8') as f:
            # En-tête
            f.write("# 🌀 AVALON - Test Exhaustif des Formules\n")
            f.write(f"# Généré le: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"# Total formules: {self.stats['total']}\n")
            f.write("#\n")
            f.write("# Format: TYPE|FORMULA|SOURCE|EXPECTED_RESULT\n")
            f.write("# Types: SIMPLE, RUNIC, GROFI, GRUT, TEMPORAL, COMPLEX\n")
            f.write("#\n\n")
            
            # Statistiques
            f.write("# === STATISTIQUES ===\n")
            for type_name, count in sorted(self.stats.items()):
                if type_name != 'total':
                    f.write(f"# {type_name}: {count} formules\n")
            f.write("\n")
            
            # Formules groupées par type
            formulas_by_type = defaultdict(list)
            for formula in self.formulas:
                formulas_by_type[formula['type']].append(formula)
            
            # Écrire les formules
            for formula_type in ['SIMPLE', 'RUNIC', 'GROFI', 'GRUT', 'TEMPORAL', 'COMPLEX']:
                if formula_type in formulas_by_type:
                    f.write(f"\n# === {formula_type} FORMULAS ===\n")
                    for formula in formulas_by_type[formula_type]:
                        # Format: TYPE|FORMULA|SOURCE|EXPECTED
                        source_short = Path(formula['source']).name
                        f.write(f"{formula_type}|{formula['formula']}|{source_short}|SUCCESS\n")
    
    def generate_avalon_test_script(self, output_file):
        """Génère un script de test AVALON spécial"""
        print(f"\n🔮 Génération du script de test AVALON: {output_file}")
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("// 🌀 AVALON Test Script - Format Spécial\n")
            f.write("// Ce script teste TOUTES les formules extraites\n")
            f.write(f"// Généré le: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            
            f.write("INIT_TEST {\n")
            f.write("  name: \"Test Exhaustif AVALON\"\n")
            f.write(f"  total_formulas: {self.stats['total']}\n")
            f.write("  test_mode: \"VALIDATION_COMPLETE\"\n")
            f.write("}\n\n")
            
            # Grouper par type pour les tests
            formulas_by_type = defaultdict(list)
            for formula in self.formulas:
                formulas_by_type[formula['type']].append(formula)
            
            # Tests par type
            test_id = 1
            for formula_type, formulas in formulas_by_type.items():
                f.write(f"// === Tests {formula_type} ({len(formulas)} formules) ===\n")
                f.write(f"TEST_GROUP \"{formula_type}\" {{\n")
                
                for formula in formulas[:50]:  # Limiter pour la lisibilité
                    f.write(f"  TEST_{test_id}: {{\n")
                    f.write(f"    type: \"{formula_type}\"\n")
                    f.write(f"    formula: \"{formula['formula']}\"\n")
                    f.write(f"    source: \"{Path(formula['source']).name}\"\n")
                    f.write(f"    expect: \"SUCCESS\"\n")
                    f.write(f"  }}\n")
                    test_id += 1
                
                if len(formulas) > 50:
                    f.write(f"  // ... et {len(formulas) - 50} autres formules {formula_type}\n")
                
                f.write("}\n\n")
            
            # Test de stress final
            f.write("// === Test de Stress Quantique ===\n")
            f.write("STRESS_TEST {\n")
            f.write("  // Créer 100 superpositions simultanées\n")
            runic_formulas = [f for f in self.formulas if f['type'] == 'RUNIC'][:100]
            for i, formula in enumerate(runic_formulas[:10]):
                f.write(f"  QUANTUM_{i}: \"{formula['formula']}\"\n")
            f.write("  // ... répéter pour les 100 formules\n")
            f.write("}\n\n")
            
            f.write("// Fin du script de test\n")
            f.write("END_TEST\n")

def main():
    extractor = FormulaExtractor()
    
    # Répertoires à scanner
    directories = [
        "../AVALON/💠 Essences scellées/🧙 Heroes",
        "../AVALON/💠 Essences scellées/🧜‍♂️ Creatures", 
        "../AVALON/💠 Essences scellées/🪙Artefacts",
        "../AVALON/📖 Histoires vivantes"
    ]
    
    print("🌀 AVALON - Extraction Exhaustive des Formules")
    print("=" * 50)
    
    # Scanner tous les répertoires
    for directory in directories:
        extractor.scan_directory(directory)
    
    # Générer les fichiers de sortie
    extractor.generate_test_format("all-formulas-test.txt")
    extractor.generate_avalon_test_script("avalon-test-script.avt")
    
    # Rapport final
    print("\n📊 RAPPORT FINAL")
    print("=" * 50)
    print(f"Total formules extraites: {extractor.stats['total']}")
    print("\nRépartition par type:")
    for type_name, count in sorted(extractor.stats.items()):
        if type_name != 'total':
            print(f"  - {type_name}: {count}")
    
    print("\n✅ Extraction terminée!")
    print("📄 Fichiers générés:")
    print("  - all-formulas-test.txt (format de test)")
    print("  - avalon-test-script.avt (script AVALON)")

if __name__ == "__main__":
    main()