#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🔮 SPELL TRANSLATION SERVICE - MAGIC STACK INTEGRATION
Système de traduction des sorts selon les classes de personnages

@author: PRIMUS - Premier Disciple
@date: DAY 7 - Mission Spéciale Vincent
@integration: Magic Stack Core
"""

import json
import re
from enum import Enum
from dataclasses import dataclass, asdict
from typing import Dict, List, Optional, Any
from abc import ABC, abstractmethod

class CharacterClass(Enum):
    """🎭 Classes de personnages supportées"""
    WARRIOR = "WARRIOR"      # 🗡️ Guerriers → Icônes
    MAGE = "MAGE"           # 🔮 Mages → Quantique  
    DRUID = "DRUID"         # 🌲 Druides → Runique
    PALADIN = "PALADIN"     # ⚔️ Paladins → Littéraire
    BEAR = "BEAR"           # 🐻 Ours → Runique (comme Druide)
    TECHNOMANCER = "TECHNOMANCER"  # 🔧 Technomanciens → Quantique
    DEFAULT = "DEFAULT"     # 🎯 Défaut → Simple

@dataclass
class SpellDisplayResult:
    """📱 Résultat formaté d'un sort"""
    display_mode: str
    primary_content: str
    effects: List[Dict[str, Any]]
    animation: str
    visual_theme: str
    metadata: Dict[str, Any]

@dataclass
class MagicCastResponse:
    """🌟 Réponse après exécution d'un sort (simulée)"""
    success: bool
    message: str
    formula_type: str
    formula_executed: str
    effects: List[str]
    metadata: Dict[str, Any]
    quantum_state: Optional[Dict] = None
    execution_time_ms: Optional[int] = None

class FormatCapillary(ABC):
    """🧬 Interface des capillaires de formatage"""
    
    @abstractmethod
    def format(self, response: MagicCastResponse) -> SpellDisplayResult:
        """Formate la réponse selon le style de la classe"""
        pass
    
    def extract_power_level(self, formula: str) -> str:
        """Extrait le niveau de puissance de la formule"""
        if "ULTIMATE" in formula.upper():
            return "ULTIMATE"
        elif "LEGENDARY" in formula.upper():
            return "LEGENDARY"
        elif "EPIC" in formula.upper():
            return "EPIC"
        elif "BOOTSTRAP" in formula.upper():
            return "BOOTSTRAP"
        else:
            return "NORMAL"

class IconicCapillary(FormatCapillary):
    """🗡️ Capillaire Guerrier - Format Iconique"""
    
    WEAPON_ICONS = {
        "SWORD": "⚔️", "AXE": "🪓", "HAMMER": "🔨", 
        "BOW": "🏹", "SHIELD": "🛡️", "SPEAR": "🗡️"
    }
    
    EFFECT_ICONS = {
        "DAMAGE": "💥", "HEAL": "💚", "BUFF": "⚡",
        "TELEPORT": "🌀", "SUMMON": "👹", "PROTECT": "🛡️",
        "FIRE": "🔥", "ICE": "❄️", "LIGHTNING": "⚡"
    }
    
    def format(self, response: MagicCastResponse) -> SpellDisplayResult:
        # Déterminer l'icône principale
        primary_icon = self._get_primary_icon(response.formula_executed)
        
        # Convertir les effets en icônes
        icon_effects = []
        for effect in response.effects:
            icon_effects.append({
                "icon": self.EFFECT_ICONS.get(effect.upper(), "✨"),
                "intensity": self._get_intensity(response.metadata),
                "color": self._get_color(effect)
            })
        
        return SpellDisplayResult(
            display_mode="ICONIC",
            primary_content=primary_icon,
            effects=icon_effects,
            animation=self._get_animation(response.formula_executed),
            visual_theme="WARRIOR_STEEL",
            metadata={
                "weapon_type": self._detect_weapon(response.formula_executed),
                "combat_style": "DIRECT",
                "power_level": self.extract_power_level(response.formula_executed)
            }
        )
    
    def _get_primary_icon(self, formula: str) -> str:
        formula_upper = formula.upper()
        for weapon, icon in self.WEAPON_ICONS.items():
            if weapon in formula_upper:
                return icon
        return "⚔️"  # Défaut
    
    def _get_intensity(self, metadata: Dict) -> str:
        damage = metadata.get("damage", 0)
        if damage > 80:
            return "EXTREME"
        elif damage > 50:
            return "HIGH"
        elif damage > 20:
            return "MEDIUM"
        else:
            return "LOW"
    
    def _get_color(self, effect: str) -> str:
        color_map = {
            "DAMAGE": "#FF4444", "HEAL": "#44FF44",
            "FIRE": "#FF8800", "ICE": "#4488FF",
            "LIGHTNING": "#FFFF44"
        }
        return color_map.get(effect.upper(), "#FFFFFF")
    
    def _get_animation(self, formula: str) -> str:
        if "CHARGE" in formula.upper():
            return "CHARGE_SLASH"
        elif "COMBO" in formula.upper():
            return "MULTI_STRIKE"
        else:
            return "SINGLE_STRIKE"
    
    def _detect_weapon(self, formula: str) -> str:
        formula_upper = formula.upper()
        for weapon in self.WEAPON_ICONS.keys():
            if weapon in formula_upper:
                return weapon
        return "SWORD"

class QuantumCapillary(FormatCapillary):
    """🔮 Capillaire Mage - Format Quantique"""
    
    QUANTUM_SYMBOLS = {
        "SUPERPOSITION": "⊙", "COLLAPSE": "†ψ", "OBSERVATION": "Π",
        "TEMPORAL": "Δt", "BRANCH": "ℬ", "PROJECTION": "⟶",
        "BOOTSTRAP": "⚡", "INFINITY": "∞", "RECURSION": "⟲"
    }
    
    def format(self, response: MagicCastResponse) -> SpellDisplayResult:
        # Convertir la formule en notation quantique
        quantum_formula = self._convert_to_quantum(response.formula_executed)
        
        # Créer les effets quantiques
        quantum_effects = []
        for effect in response.effects:
            quantum_effects.append({
                "type": "QUANTUM_BURST",
                "amplitude": self._calculate_amplitude(effect),
                "phase": self._calculate_phase(effect),
                "frequency": self._get_frequency(effect)
            })
        
        return SpellDisplayResult(
            display_mode="QUANTUM",
            primary_content=quantum_formula,
            effects=quantum_effects,
            animation="PARTICLE_WAVE_COLLAPSE",
            visual_theme="MAGE_ETHEREAL",
            metadata={
                "quantum_state": response.quantum_state or self._generate_quantum_state(),
                "probability": self._calculate_success_probability(response),
                "entanglement": self._detect_entanglement(response.formula_executed),
                "power_level": self.extract_power_level(response.formula_executed)
            }
        )
    
    def _convert_to_quantum(self, formula: str) -> str:
        """Convertit une formule en notation quantique"""
        # Patterns de conversion
        conversions = {
            r"FIREBALL\(([^)]+)\)": r"⊙(Δt+0 ⟶ ψ_FIRE([\1]))",
            r"TELEPORT\(([^)]+)\)": r"⊙(∅ ⟶ ψ_POSITION([\1]))",
            r"HEAL\(([^)]+)\)": r"⊙(†ψ_LIFE ⟶ [\1])",
            r"DAMAGE\(([^)]+)\)": r"⊙(†ψ_HARM ⟶ [\1])",
            r"SUMMON\(([^)]+)\)": r"⊙(∅ + ψ_CREATE ⟶ [\1])"
        }
        
        result = formula
        for pattern, replacement in conversions.items():
            result = re.sub(pattern, replacement, result, flags=re.IGNORECASE)
        
        # Si pas de conversion, format quantique générique
        if result == formula:
            result = f"⊙(Δt+0 ⟶ ψ_SPELL([{formula}]))"
        
        return result
    
    def _calculate_amplitude(self, effect: str) -> float:
        amplitude_map = {
            "DAMAGE": 0.9, "HEAL": 0.7, "TELEPORT": 0.8,
            "SUMMON": 0.6, "BUFF": 0.5
        }
        return amplitude_map.get(effect.upper(), 0.5)
    
    def _calculate_phase(self, effect: str) -> str:
        phase_map = {
            "DAMAGE": "0", "HEAL": "π/2", "TELEPORT": "π",
            "SUMMON": "3π/2", "BUFF": "π/4"
        }
        return phase_map.get(effect.upper(), "0")
    
    def _get_frequency(self, effect: str) -> str:
        return f"ω_{effect.lower()}"
    
    def _generate_quantum_state(self) -> Dict:
        return {
            "psi_id": "ψ_AUTO",
            "state": "SUPERPOSITION",
            "probability": 0.85,
            "coherence": "HIGH"
        }
    
    def _calculate_success_probability(self, response: MagicCastResponse) -> float:
        if response.success:
            return 0.95
        else:
            return 0.3
    
    def _detect_entanglement(self, formula: str) -> List[str]:
        entangled = []
        if "BOOTSTRAP" in formula.upper():
            entangled.append("SELF_REFERENCE")
        if "TEMPORAL" in formula.upper():
            entangled.append("TIME_STREAM")
        return entangled

class RunicCapillary(FormatCapillary):
    """🌲 Capillaire Druide - Format Runique"""
    
    ELDER_RUNES = {
        "FIRE": "ᚠ", "WATER": "ᚢ", "EARTH": "ᚦ", "AIR": "ᚨ",
        "LIFE": "ᚱ", "DEATH": "ᚲ", "TIME": "ᚷ", "SPACE": "ᚹ",
        "LIGHT": "ᚺ", "SHADOW": "ᚾ", "NATURE": "ᛁ", "SPIRIT": "ᛃ"
    }
    
    NATURE_ELEMENTS = {
        "FOREST": "🌲", "STONE": "🗿", "STORM": "⛈️", 
        "RIVER": "🌊", "MOUNTAIN": "⛰️", "MOON": "🌙"
    }
    
    def format(self, response: MagicCastResponse) -> SpellDisplayResult:
        # Convertir en séquence runique
        rune_sequence = self._convert_to_runes(response.formula_executed)
        
        # Effets naturels
        nature_effects = []
        for effect in response.effects:
            nature_effects.append({
                "rune": self._get_effect_rune(effect),
                "element": self._get_element(effect),
                "power": self._get_natural_power(effect),
                "resonance": self._calculate_resonance(effect)
            })
        
        return SpellDisplayResult(
            display_mode="RUNIC",
            primary_content=" ".join(rune_sequence),
            effects=nature_effects,
            animation="RUNE_SPIRAL_GLOW",
            visual_theme="DRUID_PRIMAL",
            metadata={
                "elements": self._detect_elements(response.formula_executed),
                "natural_force": self._get_natural_force(response.formula_executed),
                "ancient_power": self._is_ancient_power(response.formula_executed),
                "power_level": self.extract_power_level(response.formula_executed)
            }
        )
    
    def _convert_to_runes(self, formula: str) -> List[str]:
        runes = []
        formula_upper = formula.upper()
        
        # Détecter les éléments dans la formule
        for element, rune in self.ELDER_RUNES.items():
            if element in formula_upper:
                runes.append(rune)
        
        # Si aucune rune détectée, séquence générique
        if not runes:
            runes = ["ᚾ", "ᚨ", "ᛏ", "ᚢ", "ᚱ", "ᚨ"]  # "NATURA"
        
        return runes
    
    def _get_effect_rune(self, effect: str) -> str:
        effect_runes = {
            "DAMAGE": "ᚲ", "HEAL": "ᚱ", "TELEPORT": "ᚹ",
            "SUMMON": "ᛁ", "BUFF": "ᚺ", "PROTECT": "ᚦ"
        }
        return effect_runes.get(effect.upper(), "ᚾ")
    
    def _get_element(self, effect: str) -> str:
        element_map = {
            "DAMAGE": "FIRE", "HEAL": "LIFE", "TELEPORT": "SPACE",
            "SUMMON": "NATURE", "BUFF": "LIGHT"
        }
        return element_map.get(effect.upper(), "NATURE")
    
    def _get_natural_power(self, effect: str) -> str:
        power_map = {
            "DAMAGE": "STORM", "HEAL": "GROWTH", "TELEPORT": "WIND",
            "SUMMON": "EARTH", "BUFF": "SUN"
        }
        return power_map.get(effect.upper(), "ANCIENT")
    
    def _calculate_resonance(self, effect: str) -> float:
        return 0.8  # Résonance naturelle élevée
    
    def _detect_elements(self, formula: str) -> List[str]:
        detected = []
        formula_upper = formula.upper()
        for element in self.ELDER_RUNES.keys():
            if element in formula_upper:
                detected.append(element)
        return detected or ["NATURE"]
    
    def _get_natural_force(self, formula: str) -> str:
        if "STORM" in formula.upper():
            return "TEMPEST_CALL"
        elif "GROWTH" in formula.upper():
            return "LIFE_SURGE"
        else:
            return "PRIMAL_FORCE"
    
    def _is_ancient_power(self, formula: str) -> bool:
        ancient_keywords = ["ANCIENT", "ELDER", "PRIMAL", "DRUID"]
        return any(keyword in formula.upper() for keyword in ancient_keywords)

class LiteraryCapillary(FormatCapillary):
    """⚔️ Capillaire Paladin - Format Littéraire"""
    
    NARRATIVE_STYLES = {
        "EPIC": "épique", "DIVINE": "divin", "SACRED": "sacré",
        "HEROIC": "héroïque", "NOBLE": "noble", "RIGHTEOUS": "juste"
    }
    
    def format(self, response: MagicCastResponse) -> SpellDisplayResult:
        # Générer la narration
        narrative = self._generate_narrative(response)
        
        # Effets littéraires
        literary_effects = []
        for effect in response.effects:
            literary_effects.append({
                "description": self._get_literary_description(effect),
                "intensity": self._get_literary_intensity(effect),
                "style": self._get_literary_style(effect),
                "metaphor": self._generate_metaphor(effect)
            })
        
        return SpellDisplayResult(
            display_mode="LITERARY",
            primary_content=narrative,
            effects=literary_effects,
            animation="TEXT_ILLUMINATE_SCROLL",
            visual_theme="PALADIN_DIVINE",
            metadata={
                "literary_style": self._determine_style(response.formula_executed),
                "moral_alignment": "LAWFUL_GOOD",
                "divine_favor": self._calculate_divine_favor(response),
                "power_level": self.extract_power_level(response.formula_executed)
            }
        )
    
    def _generate_narrative(self, response: MagicCastResponse) -> str:
        formula = response.formula_executed.upper()
        
        if "DAMAGE" in formula:
            return "La lame sacrée s'élève, baignée de lumière divine, et frappe avec la force de la justice éternelle."
        elif "HEAL" in formula:
            return "Une douce lueur dorée enveloppe la cible, portant en elle la bénédiction des cieux et la promesse de guérison."
        elif "TELEPORT" in formula:
            return "Dans un éclat de lumière pure, le champion disparaît et réapparaît là où le devoir l'appelle."
        elif "SUMMON" in formula:
            return "Un appel résonne dans les sphères célestes, et un allié divin répond à l'invocation du juste."
        else:
            return "Les forces du bien se rassemblent, guidées par la volonté inébranlable du champion de la lumière."
    
    def _get_literary_description(self, effect: str) -> str:
        descriptions = {
            "DAMAGE": "Éclat de justice aveuglant",
            "HEAL": "Bénédiction de lumière réparatrice", 
            "TELEPORT": "Translation divine instantanée",
            "SUMMON": "Manifestation d'un allié céleste",
            "BUFF": "Bénédiction de force sacrée"
        }
        return descriptions.get(effect.upper(), "Manifestation de la grâce divine")
    
    def _get_literary_intensity(self, effect: str) -> str:
        intensity_map = {
            "DAMAGE": "DIVINE", "HEAL": "SACRED", "TELEPORT": "MIRACULOUS",
            "SUMMON": "CELESTIAL", "BUFF": "BLESSED"
        }
        return intensity_map.get(effect.upper(), "HOLY")
    
    def _get_literary_style(self, effect: str) -> str:
        return "EPIC_PROSE"
    
    def _generate_metaphor(self, effect: str) -> str:
        metaphors = {
            "DAMAGE": "comme l'épée de l'archange",
            "HEAL": "tel le souffle de vie divine",
            "TELEPORT": "à la vitesse de la prière",
            "SUMMON": "des portes du paradis"
        }
        return metaphors.get(effect.upper(), "par la grâce divine")
    
    def _determine_style(self, formula: str) -> str:
        if "ULTIMATE" in formula.upper():
            return "EPIC"
        elif "DIVINE" in formula.upper():
            return "DIVINE"
        else:
            return "HEROIC"
    
    def _calculate_divine_favor(self, response: MagicCastResponse) -> float:
        return 0.9 if response.success else 0.5

class SpellTranslationService:
    """🔮 Service Principal de Traduction des Sorts"""
    
    def __init__(self):
        self.capillaries = {
            CharacterClass.WARRIOR: IconicCapillary(),
            CharacterClass.MAGE: QuantumCapillary(),
            CharacterClass.DRUID: RunicCapillary(),
            CharacterClass.PALADIN: LiteraryCapillary(),
            CharacterClass.BEAR: RunicCapillary(),  # Comme Druide
            CharacterClass.TECHNOMANCER: QuantumCapillary(),  # Comme Mage
            CharacterClass.DEFAULT: IconicCapillary()  # Défaut
        }
    
    def translate_spell(self, response: MagicCastResponse, 
                       caster_class: CharacterClass) -> SpellDisplayResult:
        """🎯 Traduit un sort selon la classe du lanceur"""
        capillary = self.capillaries.get(caster_class, self.capillaries[CharacterClass.DEFAULT])
        return capillary.format(response)
    
    def get_supported_classes(self) -> List[CharacterClass]:
        """📋 Retourne les classes supportées"""
        return list(self.capillaries.keys())
    
    def simulate_cast_and_translate(self, formula: str, formula_type: str, 
                                  caster_class: CharacterClass) -> SpellDisplayResult:
        """🎮 Simule un lancement et traduit le résultat"""
        # Simulation d'une réponse MagicCastResponse
        simulated_response = MagicCastResponse(
            success=True,
            message=f"{formula} lancé avec succès!",
            formula_type=formula_type,
            formula_executed=formula,
            effects=self._extract_effects(formula),
            metadata=self._generate_metadata(formula),
            execution_time_ms=150
        )
        
        return self.translate_spell(simulated_response, caster_class)
    
    def _extract_effects(self, formula: str) -> List[str]:
        """Extrait les effets d'une formule"""
        effects = []
        formula_upper = formula.upper()
        
        if "DAMAGE" in formula_upper or "FIREBALL" in formula_upper:
            effects.append("DAMAGE")
        if "HEAL" in formula_upper:
            effects.append("HEAL")
        if "TELEPORT" in formula_upper:
            effects.append("TELEPORT")
        if "SUMMON" in formula_upper:
            effects.append("SUMMON")
        if "BUFF" in formula_upper or "HASTE" in formula_upper:
            effects.append("BUFF")
        
        return effects or ["MAGIC"]
    
    def _generate_metadata(self, formula: str) -> Dict[str, Any]:
        """Génère des métadonnées pour la formule"""
        metadata = {}
        
        if "DAMAGE" in formula.upper():
            metadata["damage"] = 50
        if "HEAL" in formula.upper():
            metadata["healing"] = 30
        if "TELEPORT" in formula.upper():
            metadata["destination"] = {"x": 10, "y": 10}
        
        return metadata

# 🧪 TESTS ET DÉMONSTRATIONS
def demonstrate_translation_system():
    """🎮 Démonstration du système de traduction"""
    service = SpellTranslationService()
    
    test_formulas = [
        ("FIREBALL(target, 50)", "SIMPLE"),
        ("⊙(Δt+0 ⟶ ψ_FIRE([Target]))", "QUANTUM"),
        ("TELEPORT_HERO(hero, x, y)", "SIMPLE"),
        ("HEAL(ally, 30)", "SIMPLE")
    ]
    
    print("🔮 DÉMONSTRATION SYSTÈME DE TRADUCTION DES SORTS")
    print("=" * 60)
    
    for formula, formula_type in test_formulas:
        print(f"\n📜 FORMULE: {formula}")
        print("-" * 40)
        
        for char_class in [CharacterClass.WARRIOR, CharacterClass.MAGE, 
                          CharacterClass.DRUID, CharacterClass.PALADIN]:
            result = service.simulate_cast_and_translate(formula, formula_type, char_class)
            
            print(f"\n{char_class.value} ({result.display_mode}):")
            print(f"  Content: {result.primary_content}")
            print(f"  Animation: {result.animation}")
            print(f"  Effects: {len(result.effects)} effets")

if __name__ == "__main__":
    demonstrate_translation_system()