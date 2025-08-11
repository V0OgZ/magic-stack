#!/usr/bin/env python3
"""
Script d'audit des assets pour Heroes of Time
Rôle: Archéologue du Contenu
"""

import json
import os
from pathlib import Path
import csv
from typing import Dict, List, Any, Tuple

# Champs obligatoires selon les specs
MANDATORY_FIELDS = [
    "icon_id",
    "fx_preset", 
    "sound_event",
    "theme_color",
    "output_modes"
]

# Chemins à auditer
CONTENT_PATHS = [
    "hot/content/",
    "hot/entities/",
    "hot/items/",
    "hot/cards/",
    "hot/scenarios/",
    "hot/events/"
]

class AssetAuditor:
    def __init__(self, base_path: Path = Path("/Volumes/HOT_DEV/Magic/magic-stack")):
        self.base_path = base_path
        self.catalog_path = base_path / "hot/assets/assets_catalog.json"
        self.catalog = self.load_catalog()
        self.audit_results = []
        self.stats = {
            "total_files": 0,
            "total_entries": 0,
            "complete_entries": 0,
            "incomplete_entries": 0,
            "missing_icons": 0,
            "missing_sounds": 0,
            "missing_fx": 0,
            "missing_colors": 0,
            "missing_modes": 0
        }
    
    def load_catalog(self) -> Dict:
        """Charge le catalogue d'assets"""
        if self.catalog_path.exists():
            with open(self.catalog_path, 'r') as f:
                return json.load(f)
        return {}
    
    def check_mandatory_fields(self, entry: Dict, path: str, entry_id: str) -> Tuple[bool, List[str]]:
        """Vérifie la présence des champs obligatoires"""
        missing = []
        for field in MANDATORY_FIELDS:
            if field not in entry:
                missing.append(field)
                self.stats[f"missing_{field.split('_')[0]}"] += 1
        
        # Vérifier que output_modes contient "iconic"
        if "output_modes" in entry and "iconic" not in entry.get("output_modes", []):
            missing.append("iconic_in_output_modes")
        
        return len(missing) == 0, missing
    
    def check_asset_exists(self, asset_id: str, asset_type: str) -> str:
        """Vérifie si un asset existe dans le catalogue"""
        if not self.catalog:
            return "no_catalog"
        
        if asset_type == "icon":
            # Chercher dans les icônes lore et combat
            if ":" in asset_id:
                category, item_id = asset_id.split(":", 1)
                if category in ["lore", "combat"]:
                    icons = self.catalog.get("categories", {}).get("icons", {}).get(category, {}).get("items", {})
                    if item_id in [icon["id"].split(":")[1] for icon in icons.values()]:
                        status = next(icon["status"] for icon in icons.values() if icon["id"].split(":")[1] == item_id)
                        return status
            return "not_found"
        
        elif asset_type == "sound":
            # Chercher dans les sons
            for category in ["cast", "hit", "aura", "ambient"]:
                sounds = self.catalog.get("categories", {}).get("sounds", {}).get("categories", {}).get(category, {}).get("items", {})
                if asset_id in sounds:
                    return sounds[asset_id].get("status", "pending")
            return "not_found"
        
        elif asset_type == "fx":
            # Chercher dans les presets FX
            fx_presets = self.catalog.get("categories", {}).get("fx_presets", {}).get("items", {})
            if asset_id in fx_presets:
                return "ready"
            return "not_found"
        
        return "unknown_type"
    
    def audit_json_file(self, file_path: Path):
        """Audite un fichier JSON"""
        try:
            with open(file_path, 'r') as f:
                data = json.load(f)
            
            self.stats["total_files"] += 1
            
            # Si c'est un fichier avec plusieurs entrées
            if isinstance(data, list):
                for entry in data:
                    self.audit_entry(entry, str(file_path), entry.get("id", "unknown"))
            # Si c'est un fichier avec une structure imbriquée
            elif isinstance(data, dict):
                # Chercher les entrées dans diverses structures possibles
                if "items" in data:
                    for item_id, item in data["items"].items():
                        self.audit_entry(item, str(file_path), item_id)
                elif "content" in data and isinstance(data["content"], str):
                    # Certains fichiers ont le contenu JSON en string
                    try:
                        content = json.loads(data["content"])
                        self.audit_entry(content, str(file_path), data.get("id", "unknown"))
                    except:
                        pass
                else:
                    # Fichier avec une seule entrée
                    self.audit_entry(data, str(file_path), data.get("id", "unknown"))
                    
                # Auditer aussi les abilities/spells imbriqués
                for key in ["abilities", "spells", "skills", "powers"]:
                    if key in data:
                        for ability in data[key]:
                            self.audit_entry(ability, str(file_path), f"{data.get('id', 'unknown')}.{key}.{ability.get('id', 'unknown')}")
        
        except Exception as e:
            print(f"Erreur lors de l'audit de {file_path}: {e}")
    
    def audit_entry(self, entry: Dict, file_path: str, entry_id: str):
        """Audite une entrée individuelle"""
        self.stats["total_entries"] += 1
        
        # Vérifier les champs obligatoires
        is_complete, missing_fields = self.check_mandatory_fields(entry, file_path, entry_id)
        
        # Vérifier l'existence des assets
        icon_status = self.check_asset_exists(entry.get("icon_id", ""), "icon") if "icon_id" in entry else "missing"
        sound_status = self.check_asset_exists(entry.get("sound_event", ""), "sound") if "sound_event" in entry else "missing"
        fx_status = self.check_asset_exists(entry.get("fx_preset", ""), "fx") if "fx_preset" in entry else "missing"
        
        if is_complete:
            self.stats["complete_entries"] += 1
        else:
            self.stats["incomplete_entries"] += 1
        
        # Ajouter au rapport
        self.audit_results.append({
            "file_path": file_path.replace(str(self.base_path) + "/", ""),
            "entry_id": entry_id,
            "icon_id": entry.get("icon_id", "MISSING"),
            "icon_status": icon_status,
            "sound_event": entry.get("sound_event", "MISSING"),
            "sound_status": sound_status,
            "fx_preset": entry.get("fx_preset", "MISSING"),
            "fx_status": fx_status,
            "theme_color": entry.get("theme_color", "MISSING"),
            "output_modes": ",".join(entry.get("output_modes", [])) if "output_modes" in entry else "MISSING",
            "has_iconic": "iconic" in entry.get("output_modes", []),
            "missing_fields": ",".join(missing_fields) if missing_fields else "COMPLETE",
            "status": "READY" if is_complete and all(s == "ready" for s in [icon_status, sound_status, fx_status]) else "PENDING"
        })
    
    def run_audit(self):
        """Lance l'audit complet"""
        print("🔍 Démarrage de l'audit des assets...")
        
        for content_path in CONTENT_PATHS:
            full_path = self.base_path / content_path
            if full_path.exists():
                print(f"  Audit de {content_path}...")
                for json_file in full_path.rglob("*.json"):
                    # Ignorer les schemas et le catalogue lui-même
                    if "schema" not in str(json_file) and "assets_catalog" not in str(json_file):
                        self.audit_json_file(json_file)
        
        print(f"\n✅ Audit terminé!")
        print(f"  - Fichiers analysés: {self.stats['total_files']}")
        print(f"  - Entrées analysées: {self.stats['total_entries']}")
        print(f"  - Entrées complètes: {self.stats['complete_entries']}")
        print(f"  - Entrées incomplètes: {self.stats['incomplete_entries']}")
    
    def save_csv_report(self, output_path: str = "REPORT_assets_audit.csv"):
        """Sauvegarde le rapport CSV"""
        output_file = self.base_path / "hot" / output_path
        
        with open(output_file, 'w', newline='') as csvfile:
            fieldnames = [
                "file_path", "entry_id", 
                "icon_id", "icon_status",
                "sound_event", "sound_status",
                "fx_preset", "fx_status",
                "theme_color", "output_modes", "has_iconic",
                "missing_fields", "status"
            ]
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            writer.writeheader()
            for row in self.audit_results:
                writer.writerow(row)
        
        print(f"\n📊 Rapport CSV sauvegardé: {output_file}")
    
    def save_markdown_summary(self, output_path: str = "SUMMARY_assets_audit.md"):
        """Sauvegarde le résumé Markdown"""
        output_file = self.base_path / "hot" / output_path
        
        completion_rate = (self.stats["complete_entries"] / max(self.stats["total_entries"], 1)) * 100
        
        content = f"""# 📊 Rapport d'Audit des Assets - Heroes of Time

## 📈 Statistiques Globales

| Métrique | Valeur |
|----------|--------|
| **Fichiers analysés** | {self.stats['total_files']} |
| **Entrées totales** | {self.stats['total_entries']} |
| **Entrées complètes** | {self.stats['complete_entries']} |
| **Entrées incomplètes** | {self.stats['incomplete_entries']} |
| **Taux de complétude** | {completion_rate:.1f}% |

## ❌ Champs Manquants

| Champ | Nombre d'absences |
|-------|-------------------|
| `icon_id` | {self.stats['missing_icons']} |
| `sound_event` | {self.stats['missing_sounds']} |
| `fx_preset` | {self.stats['missing_fx']} |
| `theme_color` | {self.stats['missing_colors']} |
| `output_modes` | {self.stats['missing_modes']} |

## 🔴 Entrées Critiques à Corriger

"""
        # Ajouter les 10 premières entrées incomplètes
        incomplete = [r for r in self.audit_results if r["status"] == "PENDING"][:10]
        
        if incomplete:
            content += "| Fichier | ID | Champs Manquants |\n"
            content += "|---------|-----|------------------|\n"
            for entry in incomplete:
                content += f"| {entry['file_path'].split('/')[-1]} | {entry['entry_id']} | {entry['missing_fields']} |\n"
        
        content += f"""

## ✅ Prochaines Étapes

1. [ ] Ajouter les champs manquants aux {self.stats['incomplete_entries']} entrées incomplètes
2. [ ] Télécharger et intégrer les icônes manquantes
3. [ ] Créer/normaliser les sons manquants
4. [ ] Valider tous les fx_presets
5. [ ] S'assurer que tous les output_modes incluent "iconic"

---

*Rapport généré automatiquement par l'Archéologue du Contenu*
*Date: 2025-08-10*
"""
        
        with open(output_file, 'w') as f:
            f.write(content)
        
        print(f"📄 Résumé Markdown sauvegardé: {output_file}")
    
def main():
    auditor = AssetAuditor()
    auditor.run_audit()
    auditor.save_csv_report()
    auditor.save_markdown_summary()
    
    print("\n🎉 Audit complet terminé!")
    print(f"  Taux de complétude global: {(auditor.stats['complete_entries'] / max(auditor.stats['total_entries'], 1)) * 100:.1f}%")

if __name__ == "__main__":
    main()
