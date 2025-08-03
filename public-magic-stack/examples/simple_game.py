#!/usr/bin/env python3
"""
Simple Game Example using Magic Stack
Shows how to create a basic magical game
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core.magic_core import MagicCore
from modules.pathfinding.qstar_6d import QStar6D
from modules.causal_fog.fog_engine import CausalFogEngine

class SimpleMagicGame:
    """A simple game demonstrating Magic Stack capabilities"""
    
    def __init__(self):
        # Initialize magic system
        self.magic = MagicCore({
            'verbose': True,
            'default_caster': 'Player'
        })
        
        # Initialize pathfinding
        self.pathfinder = QStar6D()
        
        # Initialize causal fog
        self.fog = CausalFogEngine({
            'max_unobserved_actions': 20
        })
        
        # Game state
        self.player_position = "HOME"
        self.player_inventory = []
        self.game_running = True
        
        print("🎮 Simple Magic Game initialized!")
        print("Type 'help' for commands\n")
    
    def run(self):
        """Main game loop"""
        while self.game_running:
            command = input(f"[{self.player_position}]> ").strip().lower()
            self.process_command(command)
    
    def process_command(self, command):
        """Process player commands"""
        if command == 'help':
            self.show_help()
        elif command == 'quit':
            self.game_running = False
            print("Thanks for playing!")
        elif command.startswith('cast '):
            spell_name = command[5:]
            self.cast_spell(spell_name)
        elif command.startswith('go '):
            destination = command[3:]
            self.move_player(destination)
        elif command == 'search':
            self.search_area()
        elif command == 'status':
            self.show_status()
        elif command == 'fog on':
            self.enable_fog()
        elif command == 'fog off':
            self.fog.enabled = False
            print("🌫️ Causal fog disabled")
        else:
            print("Unknown command. Type 'help' for available commands.")
    
    def show_help(self):
        """Display help information"""
        print("\n📚 Available Commands:")
        print("  cast <spell>  - Cast a magic spell")
        print("  go <place>    - Move to a location")
        print("  search        - Search for objects in current area")
        print("  status        - Show game status")
        print("  fog on/off    - Toggle causal fog")
        print("  help          - Show this help")
        print("  quit          - Exit game\n")
    
    def cast_spell(self, spell_name):
        """Cast a spell"""
        # Create a simple spell if it doesn't exist
        if spell_name not in self.magic.loaded_spells:
            self.magic.loaded_spells[spell_name] = {
                'name': spell_name,
                'effect': f"Creates a magical {spell_name} effect",
                'formula': f"⊙({spell_name}) → Δt+1(effect)"
            }
        
        result = self.magic.cast_spell(spell_name, {
            'location': self.player_position,
            'caster': 'Player'
        })
        
        print(f"✨ {result['message']}")
        
        # Record in causal fog if enabled
        if self.fog.enabled:
            action_id = self.fog.record_action({
                'type': 'spell_cast',
                'spell': spell_name,
                'location': self.player_position
            })
            print(f"🌫️ Action recorded in fog (ID: {action_id})")
    
    def move_player(self, destination):
        """Move player using pathfinding"""
        print(f"🗺️ Finding path from {self.player_position} to {destination.upper()}...")
        
        result = self.pathfinder.find_path(
            self.player_position,
            destination.upper(),
            'temporal_gear'  # Look for items while moving
        )
        
        if result['success']:
            self.player_position = destination.upper()
            print(f"✅ Arrived at {self.player_position}")
            print(f"   Path: {' → '.join(result['path'])}")
            print(f"   Cost: {result['cost']:.2f}")
            
            if result['found_objects']:
                for obj in result['found_objects']:
                    print(f"   📦 Found {obj['object']} in {obj['dimension']}!")
                    self.player_inventory.append(obj['object'])
        else:
            print(f"❌ Cannot find path to {destination}")
    
    def search_area(self):
        """Search current area for objects"""
        print(f"🔍 Searching {self.player_position}...")
        
        # Use pathfinder to search nearby
        result = self.pathfinder.find_path(
            self.player_position,
            f"{self.player_position}_SEARCHED",
            'time_crystal'
        )
        
        if result['found_objects']:
            for obj in result['found_objects']:
                print(f"📦 Found {obj['object']}!")
                self.player_inventory.append(obj['object'])
        else:
            print("Nothing found here.")
    
    def enable_fog(self):
        """Enable causal fog"""
        self.fog.enable('Player')
        print("🌫️ Causal fog enabled - your unobserved actions can be modified!")
    
    def show_status(self):
        """Show game status"""
        print("\n📊 Game Status:")
        print(f"  Location: {self.player_position}")
        print(f"  Inventory: {', '.join(self.player_inventory) if self.player_inventory else 'Empty'}")
        
        # Magic status
        magic_status = self.magic.system_status()
        print(f"  Magic System: {magic_status['status']}")
        print(f"  Loaded Spells: {magic_status['loaded_spells']}")
        
        # Fog status
        if self.fog.enabled:
            fog_status = self.fog.get_fog_status()
            print(f"  Causal Fog: Active")
            print(f"  Unobserved Actions: {fog_status['unobserved_actions']}")
        else:
            print(f"  Causal Fog: Inactive")
        print()


def main():
    """Run the game"""
    print("🌟 Welcome to Simple Magic Game!")
    print("=" * 40)
    
    game = SimpleMagicGame()
    
    # Load some example spells
    example_spells = {
        'teleport': {
            'name': 'teleport',
            'effect': 'Instantly move to another location',
            'formula': '⊙(position) + †ψ(destination) → Δt+0(arrival)'
        },
        'light': {
            'name': 'light',
            'effect': 'Create a magical light',
            'formula': '⊙(darkness) → Δt+1(illumination)'
        },
        'heal': {
            'name': 'heal',
            'effect': 'Restore health',
            'formula': '⊙(wounded) + †ψ(vitality) → Δt+1(healed)'
        }
    }
    
    for spell_data in example_spells.values():
        game.magic.loaded_spells[spell_data['name']] = spell_data
    
    print(f"Loaded {len(example_spells)} example spells")
    print()
    
    # Start game
    game.run()


if __name__ == "__main__":
    main()