# magic_core.py
"""
MagicCore - Universal Magic Interpretation Engine
A powerful system for executing magical formulas and spells
"""

import json
import os
from datetime import datetime
from typing import Dict, Any, List, Optional

class MagicCore:
    """The beating heart of the Magic Stack"""
    
    def __init__(self, config: Dict[str, Any] = None):
        self.config = config or {}
        self.grammar = self._load_grammar()
        self.loaded_spells = {}
        self.global_context = {
            "dimension": 0,  # Default dimension
            "caster": self.config.get("default_caster", "System"),
            "timestamp": datetime.now().isoformat()
        }
        if self.config.get("verbose", True):
            print("🌀 MagicCore initialized")
    
    def _load_grammar(self) -> Dict:
        """Load the temporal grammar from JSON"""
        grammar_file = self.config.get("grammar_file", "grammar.json")
        try:
            with open(grammar_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            if self.config.get("verbose", True):
                print(f"⚠️ Error loading grammar: {e}")
            return {"verbs": [], "tenses": []}
    
    def load_spell(self, spell_path: str) -> bool:
        """Load a spell from a JSON file"""
        try:
            with open(spell_path, 'r', encoding='utf-8') as f:
                spell = json.load(f)
                name = spell.get('name', 'unknown')
                self.loaded_spells[name] = spell
                if self.config.get("verbose", True):
                    print(f"✨ Spell '{name}' loaded successfully")
                return True
        except Exception as e:
            if self.config.get("verbose", True):
                print(f"❌ Error loading spell: {e}")
            return False
    
    def load_grimoire(self, directory: str = 'grimoire') -> int:
        """Load all spells from a directory"""
        count = 0
        try:
            for file in os.listdir(directory):
                if file.endswith('.json'):
                    path = os.path.join(directory, file)
                    if self.load_spell(path):
                        count += 1
            if self.config.get("verbose", True):
                print(f"📚 Grimoire loaded: {count} spells available")
        except Exception as e:
            if self.config.get("verbose", True):
                print(f"⚠️ Error loading grimoire: {e}")
        return count
    
    def cast_spell(self, spell_name: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        """Cast a spell with given context"""
        if spell_name not in self.loaded_spells:
            return {
                "success": False,
                "error": f"Spell '{spell_name}' not found",
                "message": "The spell is not in the grimoire..."
            }
        
        spell = self.loaded_spells[spell_name]
        full_context = {**self.global_context, **(context or {})}
        
        # Symbolic spell execution
        result = {
            "success": True,
            "spell": spell_name,
            "effect": spell.get('effect', 'Mysterious effect'),
            "formula": spell.get('formula', '⊙(?) + †ψ(?) → Δt+?(?)'),
            "context": full_context,
            "timestamp": datetime.now().isoformat(),
            "message": self._generate_message(spell_name)
        }
        
        # Log execution if enabled
        if self.config.get("logging", True):
            self._log_execution(result)
        
        return result
    
    def _generate_message(self, spell_name: str) -> str:
        """Generate a message based on the spell"""
        messages = {
            "teleportation": "Spatial coordinates realigning...",
            "invocation": "Calling from the depths...",
            "protection": "Quantum shield materializing...",
            "concealment": "Fading into the shadows...",
            "persistent_memory": "Knowledge anchoring in eternity...",
            "default": "Magic operates according to ancient laws..."
        }
        return messages.get(spell_name, messages["default"])
    
    def _log_execution(self, result: Dict[str, Any]):
        """Log spell execution"""
        log_file = self.config.get("log_file", "magic_core.log")
        log_entry = f"[{result['timestamp']}] Spell: {result['spell']} - Success: {result['success']}\n"
        try:
            with open(log_file, 'a', encoding='utf-8') as f:
                f.write(log_entry)
        except:
            pass  # Silent on log errors
    
    def compile_formula(self, formula_str: str) -> Dict[str, Any]:
        """Compile a formula using temporal grammar"""
        # Basic parser for formulas like: ⊙(action) + †ψ(effect) → Δt+n(result)
        parts = formula_str.split('→')
        if len(parts) != 2:
            return {"error": "Malformed formula"}
        
        left = parts[0].strip()
        right = parts[1].strip()
        
        return {
            "input": left,
            "output": right,
            "compiled": True,
            "executable": True
        }
    
    def auto_evolution(self) -> Dict[str, Any]:
        """Autonomous evolution of MagicCore"""
        new_spells = []
        
        # Auto-detect new spells in grimoire
        grimoire_dir = self.config.get("grimoire_dir", "grimoire")
        try:
            for file in os.listdir(grimoire_dir):
                if file.endswith('.json'):
                    spell_name = file.replace('.json', '').replace('spell_', '')
                    if spell_name not in self.loaded_spells:
                        if self.load_spell(os.path.join(grimoire_dir, file)):
                            new_spells.append(spell_name)
        except:
            pass
        
        # Auto-optimize performance
        if len(self.loaded_spells) > 10:
            self.global_context["performance"] = "optimized"
        
        return {
            "new_spells": new_spells,
            "evolution": "autonomous",
            "status": "enhanced",
            "message": "The system evolves..."
        }
    
    def system_status(self) -> Dict[str, Any]:
        """Return current magic system status"""
        return {
            "core": "MagicCore v2.0-universal",
            "caster": self.global_context.get("caster", "Unknown"),
            "loaded_spells": len(self.loaded_spells),
            "grammar_active": bool(self.grammar),
            "current_dimension": self.global_context["dimension"],
            "mode": "autonomous" if datetime.now().hour >= 23 or datetime.now().hour <= 7 else "normal",
            "status": "Operational"
        }


# Entry point for quick tests
if __name__ == "__main__":
    print("🔮 Testing MagicCore...")
    
    # Initialize with config
    config = {
        "verbose": True,
        "logging": True,
        "default_caster": "TestMage"
    }
    core = MagicCore(config)
    
    # Test system status
    status = core.system_status()
    print(f"📊 Status: {json.dumps(status, indent=2)}")
    
    # Test formula compilation
    test_formula = "⊙(test) + †ψ(magic) → Δt+1(success)"
    result = core.compile_formula(test_formula)
    print(f"🧪 Compilation: {json.dumps(result, indent=2)}")
    
    print("\n✅ MagicCore ready for the Magic Stack!")