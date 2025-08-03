# visual_magic_translator.py
"""
Visual Magic Translator - Intégration Magic Stack + Services de Traduction
Mission Spéciale Vincent - Day 7
Responsable : LOUMEN/PHOENIX
"""

import json
import requests
import os
from typing import Dict, Any, Optional
from magic_core import MagicCore

class VisualMagicTranslator:
    """Système de traduction visuelle des sorts selon les classes de héros"""
    
    def __init__(self, backend_url: str = "http://localhost:8080"):
        self.magic_core = MagicCore()
        self.backend_url = backend_url
        self.class_mapping = self._load_class_mapping()
        print("🎨 VisualMagicTranslator initialisé - Prêt pour la magie visuelle !")
    
    def _load_class_mapping(self) -> Dict:
        """Charge le mapping des classes vers les modes de traduction"""
        try:
            with open('class_translation_mapping.json', 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"⚠️ Erreur chargement mapping: {e}")
            return {"fallback_rules": {"default_mode": "literary"}}
    
    def determine_translation_mode(self, hero_class: str) -> str:
        """Détermine le mode de traduction selon la classe du héros"""
        hero_class = hero_class.lower()
        
        # Recherche dans le mapping explicite
        for category, config in self.class_mapping.get("class_mapping", {}).items():
            classes = [c.lower() for c in config.get("classes", [])]
            if any(hero_class in class_name or class_name in hero_class for class_name in classes):
                mode = config.get("translation_mode", "literary")
                print(f"🎯 Classe '{hero_class}' → Catégorie '{category}' → Mode '{mode}'")
                return mode
        
        # Règles de fallback
        fallback_rules = self.class_mapping.get("fallback_rules", {}).get("rules", [])
        for rule in fallback_rules:
            if "guard" in rule and "guard" in hero_class:
                return "icons"
            elif ("mage" in rule or "wizard" in rule) and ("mage" in hero_class or "wizard" in hero_class):
                return "runes"
            elif ("temporal" in rule or "quantum" in rule) and ("temporal" in hero_class or "quantum" in hero_class):
                return "runes"
            elif ("nature" in rule or "druid" in rule) and ("nature" in hero_class or "druid" in hero_class):
                return "literary"
            elif ("paladin" in rule or "knight" in rule) and ("paladin" in hero_class or "knight" in hero_class):
                return "literary"
        
        # Mode par défaut
        default_mode = self.class_mapping.get("fallback_rules", {}).get("default_mode", "literary")
        print(f"🔄 Classe inconnue '{hero_class}' → Mode par défaut '{default_mode}'")
        return default_mode
    
    def cast_spell_with_visual_effects(self, spell_name: str, hero_class: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        """Lance un sort avec effets visuels selon la classe du héros"""
        print(f"\n🔮 Lancement sort '{spell_name}' par classe '{hero_class}'")
        
        # 1. Lancer le sort avec Magic Core
        magic_result = self.magic_core.lancer_sort(spell_name, context or {})
        
        if not magic_result.get("succes", False):
            return magic_result
        
        # 2. Déterminer le mode de traduction
        translation_mode = self.determine_translation_mode(hero_class)
        
        # 3. Traduire la formule avec le service backend
        visual_translation = self._translate_formula_with_backend(
            magic_result.get("formule", ""),
            translation_mode,
            hero_class
        )
        
        # 4. Enrichir le résultat avec les effets visuels
        enhanced_result = {
            **magic_result,
            "visual_effects": {
                "translation_mode": translation_mode,
                "hero_class": hero_class,
                "visual_formula": visual_translation.get("translated", magic_result.get("formule", "")),
                "mode_info": self._get_mode_info(translation_mode),
                "effects_description": self._generate_effects_description(spell_name, translation_mode)
            }
        }
        
        print(f"✨ Sort casté avec succès en mode '{translation_mode}' !")
        return enhanced_result
    
    def _translate_formula_with_backend(self, formula: str, mode: str, hero_class: str) -> Dict[str, Any]:
        """Traduit une formule via le service backend"""
        try:
            # Construire la requête pour le service de traduction
            payload = {
                "formula": formula,
                "context": {
                    "translation_mode": mode,
                    "hero_class": hero_class,
                    "format": mode
                }
            }
            
            # Tenter l'appel au backend
            response = requests.post(
                f"{self.backend_url}/api/translate",
                json=payload,
                timeout=5
            )
            
            if response.status_code == 200:
                result = response.json()
                print(f"🌐 Traduction backend réussie : {mode}")
                return result
            else:
                print(f"⚠️ Backend indisponible ({response.status_code}), fallback local")
                
        except Exception as e:
            print(f"⚠️ Erreur backend: {e}, fallback local")
        
        # Fallback local si backend indisponible
        return self._translate_formula_local(formula, mode)
    
    def _translate_formula_local(self, formula: str, mode: str) -> Dict[str, Any]:
        """Traduction locale de fallback"""
        translations = {
            "literary": f"✨ D'anciennes énergies s'éveillent alors que la formule '{formula}' se manifeste dans les méandres du temps",
            "icons": f"🔮⚡ {formula} ⚡🔮",
            "runes": f"ᛟ{formula}ᛞ ⚡ ᚺᛒᚲ"
        }
        
        return {
            "translated": translations.get(mode, formula),
            "mode": mode,
            "source": "local_fallback"
        }
    
    def _get_mode_info(self, mode: str) -> Dict[str, str]:
        """Récupère les informations du mode de traduction"""
        modes = self.class_mapping.get("translation_modes", {})
        return modes.get(mode, {
            "name": mode.title(),
            "icon": "🔮",
            "description": f"Mode {mode}"
        })
    
    def _generate_effects_description(self, spell_name: str, mode: str) -> str:
        """Génère une description des effets selon le mode"""
        effects = {
            "literary": f"Les mots anciens résonnent tandis que '{spell_name}' prend forme dans un éclat de magie pure...",
            "icons": f"⚡🔥💫 {spell_name} ⚡🔥💫",
            "runes": f"ᛟ Les runes s'illuminent : {spell_name} ᛞ"
        }
        return effects.get(mode, f"Effet magique : {spell_name}")
    
    def simulate_spell_casting(self, hero_name: str, hero_class: str, spell_name: str) -> Dict[str, Any]:
        """Simule un lancement de sort complet avec affichage"""
        print(f"\n🎭 === SIMULATION DE LANCEMENT DE SORT ===")
        print(f"🧙 Héros: {hero_name}")
        print(f"🏷️ Classe: {hero_class}")
        print(f"🔮 Sort: {spell_name}")
        print("=" * 50)
        
        # Lancer le sort avec effets visuels
        result = self.cast_spell_with_visual_effects(spell_name, hero_class, {
            "hero_name": hero_name,
            "casting_location": "Champ de bataille temporel"
        })
        
        if result.get("succes", False):
            visual = result.get("visual_effects", {})
            mode_info = visual.get("mode_info", {})
            
            print(f"\n🎨 Mode de traduction: {mode_info.get('name', 'Inconnu')} {mode_info.get('icon', '🔮')}")
            print(f"📜 Formule originale: {result.get('formule', 'N/A')}")
            print(f"✨ Formule visuelle: {visual.get('visual_formula', 'N/A')}")
            print(f"🎭 Effets: {visual.get('effects_description', 'N/A')}")
            print(f"💬 Groeken dit: '{result.get('groeken_dit', 'La magie opère...')}'")
        else:
            print(f"❌ Échec: {result.get('erreur', 'Erreur inconnue')}")
        
        print("=" * 50)
        return result

# Exemples et tests
if __name__ == "__main__":
    print("🔥 Démarrage du Visual Magic Translator - Mission Vincent Day 7")
    
    translator = VisualMagicTranslator()
    
    # Charger quelques sorts dans la Magic Stack
    translator.magic_core.charger_grimoire_complet()
    
    # Tests avec différentes classes
    test_cases = [
        ("Marcus Bouclier de Fer", "tank_guardian", "teleportation"),
        ("Lysandrel", "Reality Forger", "invocation"), 
        ("Gardien Zephyr", "Nexus Guardian", "protection"),
        ("Anna Martel", "TIME_KEEPER", "memoire_persistante"),
        ("Arthur", "Paladin", "teleportation")
    ]
    
    print("\n🧪 === TESTS DES TRADUCTIONS PAR CLASSE ===")
    for hero_name, hero_class, spell_name in test_cases:
        translator.simulate_spell_casting(hero_name, hero_class, spell_name)
        print()
    
    print("✅ Tests terminés - Le système de traduction visuelle est opérationnel !")