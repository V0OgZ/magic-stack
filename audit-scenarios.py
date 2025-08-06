#!/usr/bin/env python3
"""
🔮 AUDIT COMPLET DES SCÉNARIOS MAGIC STACK
Mage Claude - Analyse de l'implémentation réelle vs documentation

Vérifie:
- Formats de fichiers (.hots, .json, .hsp, .hep)
- Endpoints disponibles vs utilisés
- Héros/Artefacts référencés vs existants
- Tests fonctionnels vs mocks
"""

import os
import json
import glob
import re
from pathlib import Path
from datetime import datetime

class ScenarioAuditor:
    def __init__(self):
        self.workspace = "/workspace"
        self.results = {
            "timestamp": datetime.now().isoformat(),
            "scenarios": {},
            "heroes": {},
            "artifacts": {},
            "endpoints": {},
            "formats": {},
            "implementation_status": {}
        }
        
    def audit_all(self):
        print("🔮✨ AUDIT COMPLET DES SCÉNARIOS ✨🔮")
        print("=" * 50)
        
        self.scan_scenario_files()
        self.scan_heroes()
        self.scan_artifacts()
        self.check_endpoints()
        self.analyze_formats()
        self.generate_report()
        
    def scan_scenario_files(self):
        print("\n📜 SCAN DES FICHIERS SCÉNARIOS...")
        
        scenario_patterns = [
            "**/*.hots",    # Heroes of Time Script
            "**/*.hsp",     # Heroes of Time Scenario Package  
            "**/*.hep",     # Heroes of Time Episode
            "**/visualizer/*.json",  # Visualizer scenarios
            "**/scenarios/*.json"    # JSON scenarios
        ]
        
        for pattern in scenario_patterns:
            files = list(Path(self.workspace).glob(pattern))
            format_name = pattern.split('.')[-1].upper()
            
            if format_name == "JSON":
                if "visualizer" in pattern:
                    format_name = "JSON_VISUALIZER"
                else:
                    format_name = "JSON_SCENARIO"
                    
            self.results["formats"][format_name] = {
                "count": len(files),
                "files": [str(f.relative_to(Path(self.workspace))) for f in files]
            }
            
            # Analyser chaque fichier
            for file_path in files:
                self.analyze_scenario_file(file_path, format_name)
                
        print(f"  📊 Formats trouvés: {list(self.results['formats'].keys())}")
        
    def analyze_scenario_file(self, file_path, format_type):
        """Analyse un fichier de scénario spécifique"""
        rel_path = str(file_path.relative_to(Path(self.workspace)))
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            scenario_info = {
                "format": format_type,
                "size": len(content),
                "lines": len(content.split('\n')),
                "heroes_referenced": [],
                "endpoints_used": [],
                "implementation_clues": []
            }
            
            # Chercher des références à des héros
            hero_patterns = [
                r'HERO\s+(\w+)',
                r'"(\w+)":\s*{[^}]*"type":\s*"HERO"',
                r'Jean-Grofignon|Arthur|Merlin|GRUT|Ragnar|Claude|Vince',
                r'Lysandrel|Nyx-Lua|Claudius|Anna'
            ]
            
            for pattern in hero_patterns:
                matches = re.findall(pattern, content, re.IGNORECASE)
                scenario_info["heroes_referenced"].extend(matches)
                
            # Chercher des endpoints
            endpoint_patterns = [
                r'/api/(\w+)/(\w+)',
                r'localhost:(\d+)',
                r'http://[^/]+/(\w+)'
            ]
            
            for pattern in endpoint_patterns:
                matches = re.findall(pattern, content)
                scenario_info["endpoints_used"].extend(matches)
                
            # Indices d'implémentation réelle
            implementation_indicators = [
                ("API_CALLS", r'curl|requests\.|fetch\(|axios'),
                ("BACKEND_REF", r'localhost:\d+|127\.0\.0\.1'),
                ("FORMULAS", r'⊙|Ψ|∆|Ξ|Æ|Ω'),
                ("EXECUTABLE", r'#!/|python3|cargo run|mvn'),
                ("MOCK_INDICATORS", r'mock|fake|TODO|FIXME|placeholder')
            ]
            
            for indicator_name, pattern in implementation_indicators:
                if re.search(pattern, content, re.IGNORECASE):
                    scenario_info["implementation_clues"].append(indicator_name)
                    
            self.results["scenarios"][rel_path] = scenario_info
            
        except Exception as e:
            self.results["scenarios"][rel_path] = {
                "error": str(e),
                "format": format_type
            }
            
    def scan_heroes(self):
        print("\n🧙 SCAN DES HÉROS...")
        
        hero_files = list(Path(self.workspace).glob("**/Heroes/**/*.json"))
        hero_files.extend(list(Path(self.workspace).glob("**/*hero*.json")))
        
        for hero_file in hero_files:
            try:
                with open(hero_file, 'r', encoding='utf-8') as f:
                    hero_data = json.load(f)
                    
                hero_name = hero_data.get('name', hero_file.stem)
                self.results["heroes"][hero_name] = {
                    "file": str(hero_file.relative_to(Path(self.workspace))),
                    "has_abilities": "abilities" in hero_data or "powers" in hero_data,
                    "has_stats": any(key in hero_data for key in ['hp', 'mana', 'level', 'stats']),
                    "implementation_ready": self.check_hero_implementation(hero_data)
                }
                
            except Exception as e:
                pass
                
        print(f"  🧙 Héros trouvés: {len(self.results['heroes'])}")
        
    def check_hero_implementation(self, hero_data):
        """Vérifie si un héros semble implémenté ou juste documenté"""
        implementation_indicators = [
            "position" in hero_data,
            "coordinates" in hero_data,
            any(key.startswith("api_") for key in hero_data.keys()),
            "test_scenarios" in hero_data,
            "backend_integration" in hero_data
        ]
        return sum(implementation_indicators) >= 2
        
    def scan_artifacts(self):
        print("\n🪙 SCAN DES ARTEFACTS...")
        
        artifact_files = list(Path(self.workspace).glob("**/Artefacts/**/*.json"))
        artifact_files.extend(list(Path(self.workspace).glob("**/*artifact*.json")))
        
        for artifact_file in artifact_files:
            try:
                with open(artifact_file, 'r', encoding='utf-8') as f:
                    artifact_data = json.load(f)
                    
                if isinstance(artifact_data, dict):
                    # Fichier avec un seul artefact
                    name = artifact_data.get('name', artifact_file.stem)
                    self.results["artifacts"][name] = {
                        "file": str(artifact_file.relative_to(Path(self.workspace))),
                        "type": "single",
                        "has_effects": "effects" in artifact_data or "abilities" in artifact_data
                    }
                elif isinstance(artifact_data, list):
                    # Fichier avec plusieurs artefacts
                    for item in artifact_data:
                        if isinstance(item, dict) and "name" in item:
                            self.results["artifacts"][item["name"]] = {
                                "file": str(artifact_file.relative_to(Path(self.workspace))),
                                "type": "collection",
                                "has_effects": "effects" in item or "abilities" in item
                            }
                            
            except Exception as e:
                pass
                
        print(f"  🪙 Artefacts trouvés: {len(self.results['artifacts'])}")
        
    def check_endpoints(self):
        print("\n📡 VÉRIFICATION DES ENDPOINTS...")
        
        # Endpoints théoriques des contrôleurs Java
        java_endpoints = [
            "/api/magic/health",
            "/api/magic/cast", 
            "/api/magic/translate",
            "/api/magic/shift",
            "/api/magic/fork",
            "/api/magic/merge",
            "/api/interstice/upload",
            "/api/interstice/download",
            "/api/interstice/search",
            "/api/mage/self-update",
            "/api/panopticon/world-state-graph"
        ]
        
        # Test des endpoints (sans faire de vraies requêtes)
        for endpoint in java_endpoints:
            self.results["endpoints"][endpoint] = {
                "status": "theoretical",  # On ne peut pas tester sans backend Java
                "backend": "java",
                "implemented": "unknown"
            }
            
        # Endpoints Rust
        rust_endpoints = ["/health", "/search", "/qstar"]
        for endpoint in rust_endpoints:
            self.results["endpoints"][endpoint] = {
                "status": "theoretical",
                "backend": "rust", 
                "implemented": "likely"  # Le backend Rust fonctionne
            }
            
    def analyze_formats(self):
        print("\n📋 ANALYSE DES FORMATS...")
        
        format_analysis = {}
        
        for format_name, format_data in self.results["formats"].items():
            total_scenarios = len(format_data["files"])
            
            if total_scenarios == 0:
                continue
                
            # Analyser l'âge approximatif des fichiers
            recent_count = 0
            for file_path in format_data["files"]:
                full_path = Path(self.workspace) / file_path
                if full_path.exists():
                    # Fichier récent si modifié dans les derniers jours
                    mtime = full_path.stat().st_mtime
                    age_days = (datetime.now().timestamp() - mtime) / 86400
                    if age_days < 7:  # Moins d'une semaine
                        recent_count += 1
                        
            format_analysis[format_name] = {
                "total": total_scenarios,
                "recent": recent_count,
                "old": total_scenarios - recent_count,
                "freshness": "recent" if recent_count > total_scenarios/2 else "old"
            }
            
        self.results["format_analysis"] = format_analysis
        
    def generate_report(self):
        print("\n" + "=" * 60)
        print("📊 RAPPORT D'AUDIT COMPLET")
        print("=" * 60)
        
        # Résumé des formats
        print("\n📋 FORMATS DE SCÉNARIOS:")
        for format_name, analysis in self.results.get("format_analysis", {}).items():
            freshness_icon = "🟢" if analysis["freshness"] == "recent" else "🟡"
            print(f"  {freshness_icon} {format_name}: {analysis['total']} fichiers "
                  f"({analysis['recent']} récents, {analysis['old']} anciens)")
                  
        # Top scénarios par taille
        print("\n📜 TOP SCÉNARIOS (par taille):")
        scenarios_by_size = sorted(
            [(name, data) for name, data in self.results["scenarios"].items() 
             if "size" in data],
            key=lambda x: x[1]["size"], 
            reverse=True
        )[:5]
        
        for name, data in scenarios_by_size:
            impl_clues = len(data.get("implementation_clues", []))
            impl_icon = "🟢" if impl_clues >= 3 else "🟡" if impl_clues >= 1 else "🔴"
            print(f"  {impl_icon} {name} ({data['lines']} lignes, {data['size']} chars)")
            
        # Héros les plus référencés
        print("\n🧙 HÉROS DÉTECTÉS:")
        hero_count = len(self.results["heroes"])
        ready_heroes = sum(1 for h in self.results["heroes"].values() 
                          if h.get("implementation_ready", False))
        print(f"  📊 Total: {hero_count} héros trouvés")
        print(f"  ✅ Implémentés: {ready_heroes}")
        print(f"  📝 Documentation seule: {hero_count - ready_heroes}")
        
        # Artefacts
        print(f"\n🪙 ARTEFACTS: {len(self.results['artifacts'])} trouvés")
        
        # Endpoints
        print(f"\n📡 ENDPOINTS: {len(self.results['endpoints'])} identifiés")
        
        # Recommandations
        print("\n💡 RECOMMANDATIONS:")
        
        if self.results["format_analysis"].get("HOTS", {}).get("total", 0) > 0:
            print("  🔧 Format .hots détecté - Besoin d'un parser/interpréteur")
            
        if ready_heroes < 5:
            print("  🧙 Peu de héros implémentés - Prioriser l'implémentation")
            
        java_endpoints = sum(1 for e in self.results["endpoints"].values() 
                           if e["backend"] == "java")
        if java_endpoints > 0:
            print(f"  ☕ {java_endpoints} endpoints Java - Backend Java requis")
            
        print("\n✅ AUDIT TERMINÉ!")
        
        # Sauvegarder le rapport
        with open(f"{self.workspace}/audit-report.json", "w") as f:
            json.dump(self.results, f, indent=2, ensure_ascii=False)
        print(f"📄 Rapport sauvé: audit-report.json")

if __name__ == "__main__":
    auditor = ScenarioAuditor()
    auditor.audit_all()