#!/usr/bin/env python3
"""
🔮 IMPORT & CONVERSION - TOUT LE CONTENU VERS HOT V2
"""

import os
import json
import shutil
from pathlib import Path
from datetime import datetime
import hashlib
import re

# Chemins de base
BASE_PATH = Path("/Volumes/HOT_DEV/Magic/magic-stack")
HOT_PATH = BASE_PATH / "hot"
TREASURES_PATH = BASE_PATH / "Treasures"
GRIMOIRE_PATH = BASE_PATH / "grimoire"

# Couleurs pour l'affichage
class Colors:
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BLUE = '\033[94m'
    PURPLE = '\033[95m'
    ENDC = '\033[0m'

def generate_ulid():
    """Génère un ULID simple"""
    timestamp = int(datetime.now().timestamp() * 1000)
    random_part = hashlib.md5(os.urandom(16)).hexdigest()[:12]
    return f"01{timestamp:x}{random_part}".upper()[:26]

def slugify(text):
    """Convertit en slug kebab-case"""
    text = re.sub(r'[^\w\s-]', '', text.lower())
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')

class ContentImporter:
    def __init__(self):
        self.stats = {
            'heroes': 0,
            'spells': 0,
            'artifacts': 0,
            'creatures': 0,
            'scenarios': 0,
            'maps': 0,
            'errors': []
        }
        self.manifest = {
            'version': '2.0.0',
            'imported_at': datetime.now().isoformat(),
            'mappings': []
        }

    def import_heroes(self):
        """Importe tous les héros depuis Treasures"""
        print(f"{Colors.BLUE}📦 Import des HÉROS...{Colors.ENDC}")
        
        heroes_dir = TREASURES_PATH / "💠 Essences scellées" / "🧙 Heroes"
        if not heroes_dir.exists():
            print(f"{Colors.RED}❌ Dossier heroes non trouvé{Colors.ENDC}")
            return
        
        for hero_file in heroes_dir.rglob("*.json"):
            try:
                with open(hero_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                # Déterminer la faction
                faction = "unknown"
                if "chronomancer" in str(hero_file).lower():
                    faction = "chronomancers"
                elif "warrior" in str(hero_file).lower():
                    faction = "warriors"
                elif "mystic" in str(hero_file).lower():
                    faction = "mystics"
                elif "cosmic" in str(hero_file).lower():
                    faction = "cosmic"
                else:
                    faction = "visionaries"
                
                # Créer le dossier de faction
                faction_dir = HOT_PATH / "content" / "heroes" / faction
                faction_dir.mkdir(parents=True, exist_ok=True)
                
                # Générer ID si manquant
                if 'id' not in data:
                    data['id'] = generate_ulid()
                
                # Générer slug
                slug = slugify(data.get('name', hero_file.stem))
                data['slug'] = slug
                
                # Ajouter le schéma
                data['$schema'] = "../../core/schemas/hero.schema.json"
                
                # Convertir en format HEP
                output_file = faction_dir / f"{slug}.hep.json"
                with open(output_file, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                
                self.stats['heroes'] += 1
                self.manifest['mappings'].append({
                    'from': str(hero_file.relative_to(BASE_PATH)),
                    'to': str(output_file.relative_to(BASE_PATH)),
                    'type': 'hero',
                    'id': data['id']
                })
                
                print(f"  {Colors.GREEN}✅ {slug}{Colors.ENDC}")
                
            except Exception as e:
                self.stats['errors'].append(f"Hero {hero_file.name}: {e}")
                print(f"  {Colors.RED}❌ {hero_file.name}: {e}{Colors.ENDC}")

    def import_spells(self):
        """Importe tous les sorts depuis grimoire"""
        print(f"\n{Colors.PURPLE}🔮 Import des SORTS...{Colors.ENDC}")
        
        for spell_file in GRIMOIRE_PATH.rglob("*.json"):
            try:
                with open(spell_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                # Si c'est une bibliothèque, traiter chaque sort
                if isinstance(data, list):
                    for spell in data:
                        self._process_spell(spell, spell_file)
                elif 'spells' in data:
                    for spell in data['spells']:
                        self._process_spell(spell, spell_file)
                else:
                    self._process_spell(data, spell_file)
                    
            except Exception as e:
                self.stats['errors'].append(f"Spell {spell_file.name}: {e}")
                print(f"  {Colors.RED}❌ {spell_file.name}: {e}{Colors.ENDC}")

    def _process_spell(self, spell_data, source_file):
        """Traite un sort individuel"""
        try:
            # Déterminer l'école
            school = "unknown"
            if "causalit" in str(source_file).lower():
                school = "causality"
            elif "speed" in str(source_file).lower():
                school = "speedforce"
            elif "quantum" in str(source_file).lower() or "superposition" in str(source_file).lower():
                school = "quantum"
            elif "geometr" in str(source_file).lower():
                school = "geometry"
            elif "tcg" in str(source_file).lower():
                school = "tcg"
            else:
                school = "temporal"
            
            school_dir = HOT_PATH / "content" / "spells" / "schools" / school
            school_dir.mkdir(parents=True, exist_ok=True)
            
            # Générer ID et slug
            if 'id' not in spell_data:
                spell_data['id'] = generate_ulid()
            
            slug = slugify(spell_data.get('name', spell_data.get('nom', source_file.stem)))
            spell_data['slug'] = slug
            spell_data['$schema'] = "../../../core/schemas/spell.schema.json"
            
            # Format HOTS
            output_file = school_dir / f"{slug}.hots.json"
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(spell_data, f, indent=2, ensure_ascii=False)
            
            self.stats['spells'] += 1
            print(f"  {Colors.GREEN}✅ {school}/{slug}{Colors.ENDC}")
            
        except Exception as e:
            print(f"  {Colors.YELLOW}⚠️ Spell error: {e}{Colors.ENDC}")

    def import_artifacts(self):
        """Importe tous les artefacts"""
        print(f"\n{Colors.YELLOW}🏆 Import des ARTEFACTS...{Colors.ENDC}")
        
        artifacts_dir = TREASURES_PATH / "💠 Essences scellées" / "🪙Artefacts"
        if not artifacts_dir.exists():
            return
        
        output_dir = HOT_PATH / "content" / "artifacts"
        output_dir.mkdir(parents=True, exist_ok=True)
        
        for artifact_file in artifacts_dir.rglob("*.json"):
            try:
                with open(artifact_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                # Traiter les listes d'artefacts
                if isinstance(data, list):
                    for item in data:
                        self._process_artifact(item, artifact_file, output_dir)
                else:
                    self._process_artifact(data, artifact_file, output_dir)
                    
            except Exception as e:
                self.stats['errors'].append(f"Artifact {artifact_file.name}: {e}")

    def _process_artifact(self, artifact_data, source_file, output_dir):
        """Traite un artefact individuel"""
        try:
            if 'id' not in artifact_data:
                artifact_data['id'] = generate_ulid()
            
            slug = slugify(artifact_data.get('name', source_file.stem))
            artifact_data['slug'] = slug
            
            # Déterminer le tier
            tier = artifact_data.get('tier', 'common')
            tier_dir = output_dir / str(tier)
            tier_dir.mkdir(exist_ok=True)
            
            output_file = tier_dir / f"{slug}.json"
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(artifact_data, f, indent=2, ensure_ascii=False)
            
            self.stats['artifacts'] += 1
            print(f"  {Colors.GREEN}✅ {tier}/{slug}{Colors.ENDC}")
            
        except Exception as e:
            print(f"  {Colors.YELLOW}⚠️ Artifact error: {e}{Colors.ENDC}")

    def import_scenarios(self):
        """Importe les scénarios et maps"""
        print(f"\n{Colors.BLUE}🗺️ Import des SCÉNARIOS et MAPS...{Colors.ENDC}")
        
        # Scénarios depuis Treasures
        scenarios_dir = TREASURES_PATH / "📖 Histoires vivantes"
        if scenarios_dir.exists():
            for scenario_file in scenarios_dir.rglob("*.hsp"):
                self._process_scenario(scenario_file)
            
            for scenario_file in scenarios_dir.rglob("*.json"):
                if "visualizer" in str(scenario_file):
                    self._process_scenario(scenario_file)

    def _process_scenario(self, scenario_file):
        """Traite un fichier scénario"""
        try:
            # Lire le contenu
            content = scenario_file.read_text(encoding='utf-8')
            
            # Créer la structure du scénario
            slug = slugify(scenario_file.stem)
            scenario_data = {
                "$schema": "../../core/schemas/scenario.schema.json",
                "id": generate_ulid(),
                "slug": slug,
                "name": scenario_file.stem.replace('_', ' ').title(),
                "source_file": str(scenario_file.name),
                "content": content if scenario_file.suffix == '.hsp' else None
            }
            
            # Si c'est un JSON, essayer de le parser
            if scenario_file.suffix == '.json':
                try:
                    scenario_data['data'] = json.loads(content)
                except:
                    scenario_data['raw_content'] = content
            
            # Créer dans un monde par défaut
            world_dir = HOT_PATH / "content" / "multiverses" / "prime" / "worlds" / "mystique" / "scenarios"
            world_dir.mkdir(parents=True, exist_ok=True)
            
            output_file = world_dir / f"{slug}.hsc.json"
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(scenario_data, f, indent=2, ensure_ascii=False)
            
            self.stats['scenarios'] += 1
            print(f"  {Colors.GREEN}✅ scenario: {slug}{Colors.ENDC}")
            
        except Exception as e:
            print(f"  {Colors.RED}❌ Scenario {scenario_file.name}: {e}{Colors.ENDC}")

    def create_multiverse_structure(self):
        """Crée la structure de base multiverse/worlds"""
        print(f"\n{Colors.PURPLE}🌌 Création du MULTIVERSE...{Colors.ENDC}")
        
        # Multiverse principal
        multiverse_data = {
            "$schema": "../../core/schemas/multiverse.schema.json",
            "id": "01MV_PRIME",
            "slug": "prime",
            "name": "Prime Multiverse",
            "policies": {
                "overlay_order": ["core", "packs", "content", "map-local", "session"],
                "regulators_default": ["anna", "vince", "overload"],
                "ai_default": True
            },
            "defaults": {
                "causal_fog": {
                    "baseline": 0.3,
                    "growth": "linear"
                },
                "time": {
                    "tick_rate": 20,
                    "drift_base": 0.01
                }
            }
        }
        
        multiverse_file = HOT_PATH / "content" / "multiverses" / "prime" / "multiverse.json"
        multiverse_file.parent.mkdir(parents=True, exist_ok=True)
        with open(multiverse_file, 'w') as f:
            json.dump(multiverse_data, f, indent=2)
        
        print(f"  {Colors.GREEN}✅ Multiverse PRIME créé{Colors.ENDC}")
        
        # Créer les mondes de base
        worlds = [
            ("mystique", "Monde Mystique", ["chronomancers", "mystics"]),
            ("nexus", "Nexus Temporel", ["visionaries", "cosmic"]),
            ("quantum-realm", "Royaume Quantique", ["warriors", "gunfighters"]),
            ("cave-of-platon", "Cave de Platon", ["philosophers", "reality"]),
        ]
        
        for slug, name, factions in worlds:
            world_data = {
                "$schema": "../../../core/schemas/world.schema.json",
                "id": f"01WD_{slug.upper().replace('-', '_')}",
                "slug": slug,
                "name": name,
                "chronology": {
                    "timescale": 1.0,
                    "drift": {
                        "base": 0.02,
                        "variance": 0.01
                    },
                    "decay_profile": "standard"
                },
                "pool": {
                    "heroes_allowed": factions,
                    "schools_allowed": ["causality", "quantum", "speedforce", "geometry"]
                }
            }
            
            world_dir = HOT_PATH / "content" / "multiverses" / "prime" / "worlds" / slug
            world_dir.mkdir(parents=True, exist_ok=True)
            
            with open(world_dir / "world.json", 'w') as f:
                json.dump(world_data, f, indent=2)
            
            # Créer un graphe basique
            graph_data = {
                "$schema": "../../../core/schemas/graph.schema.json",
                "world_id": world_data['id'],
                "nodes": [
                    {"id": "N1", "label": "Spawn", "cid": [0, 0, 0], "tags": ["spawn"]},
                    {"id": "N2", "label": "Center", "cid": [5, 5, 0], "tags": ["objective"]},
                    {"id": "N3", "label": "Portal", "cid": [10, 10, 0], "tags": ["portal"]}
                ],
                "edges": [
                    {"id": "E1", "from": "N1", "to": "N2", "type": "road", "cost": 1},
                    {"id": "E2", "from": "N2", "to": "N3", "type": "portal", "cost": 2}
                ]
            }
            
            with open(world_dir / "graph.json", 'w') as f:
                json.dump(graph_data, f, indent=2)
            
            # Créer les dossiers maps
            (world_dir / "maps" / "solo").mkdir(parents=True, exist_ok=True)
            (world_dir / "maps" / "multiplayer").mkdir(parents=True, exist_ok=True)
            (world_dir / "scenarios").mkdir(parents=True, exist_ok=True)
            
            print(f"  {Colors.GREEN}✅ World: {name}{Colors.ENDC}")

    def create_schemas(self):
        """Crée les JSON schemas de base"""
        print(f"\n{Colors.YELLOW}📐 Création des SCHEMAS...{Colors.ENDC}")
        
        schemas_dir = HOT_PATH / "core" / "schemas"
        
        # Schema Hero
        hero_schema = {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["id", "slug", "name", "faction", "stats"],
            "properties": {
                "id": {"type": "string", "pattern": "^01[A-Z0-9]{24}$"},
                "slug": {"type": "string", "pattern": "^[a-z0-9-]+$"},
                "name": {"type": "string"},
                "faction": {"type": "string"},
                "stats": {
                    "type": "object",
                    "properties": {
                        "health": {"type": "number"},
                        "mana": {"type": "number"},
                        "speed": {"type": "number"}
                    }
                }
            }
        }
        
        with open(schemas_dir / "hero.schema.json", 'w') as f:
            json.dump(hero_schema, f, indent=2)
        
        # Schema Spell
        spell_schema = {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["id", "slug", "name", "school", "cost"],
            "properties": {
                "id": {"type": "string"},
                "slug": {"type": "string"},
                "name": {"type": "string"},
                "school": {"type": "string"},
                "cost": {
                    "type": "object",
                    "properties": {
                        "mana": {"type": "number"},
                        "cooldown": {"type": "number"}
                    }
                }
            }
        }
        
        with open(schemas_dir / "spell.schema.json", 'w') as f:
            json.dump(spell_schema, f, indent=2)
        
        print(f"  {Colors.GREEN}✅ Schemas créés{Colors.ENDC}")

    def save_manifest(self):
        """Sauvegarde le manifest d'import"""
        manifest_file = HOT_PATH / "IMPORT_MANIFEST.json"
        with open(manifest_file, 'w') as f:
            json.dump(self.manifest, f, indent=2)
        
        print(f"\n{Colors.BLUE}📋 Manifest sauvegardé{Colors.ENDC}")

    def print_summary(self):
        """Affiche le résumé"""
        print(f"\n{Colors.PURPLE}{'='*60}{Colors.ENDC}")
        print(f"{Colors.PURPLE}📊 RÉSUMÉ DE L'IMPORT{Colors.ENDC}")
        print(f"{Colors.PURPLE}{'='*60}{Colors.ENDC}")
        print(f"  Héros importés    : {self.stats['heroes']}")
        print(f"  Sorts importés    : {self.stats['spells']}")
        print(f"  Artefacts importés: {self.stats['artifacts']}")
        print(f"  Scénarios importés: {self.stats['scenarios']}")
        print(f"  Erreurs           : {len(self.stats['errors'])}")
        
        if self.stats['errors']:
            print(f"\n{Colors.RED}Erreurs rencontrées:{Colors.ENDC}")
            for error in self.stats['errors'][:10]:
                print(f"  - {error}")

    def run(self):
        """Lance l'import complet"""
        print(f"{Colors.PURPLE}{'='*60}{Colors.ENDC}")
        print(f"{Colors.PURPLE}🚀 IMPORT COMPLET VERS HOT V2{Colors.ENDC}")
        print(f"{Colors.PURPLE}{'='*60}{Colors.ENDC}\n")
        
        self.create_schemas()
        self.create_multiverse_structure()
        self.import_heroes()
        self.import_spells()
        self.import_artifacts()
        self.import_scenarios()
        self.save_manifest()
        self.print_summary()

if __name__ == "__main__":
    importer = ContentImporter()
    importer.run()
    print(f"\n{Colors.GREEN}✨ Import terminé !{Colors.ENDC}")
    print(f"Voir: /hot/IMPORT_MANIFEST.json pour les détails")
