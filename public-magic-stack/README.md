# 🔮 Magic Stack - Universal Magic System

A powerful and flexible magic system for creating games with temporal mechanics, quantum states, and narrative-driven gameplay.

## 🌟 Features

- **Universal Magic Core** - Execute spells and formulas with temporal grammar
- **6D Pathfinding** - Navigate through causal, temporal, spatial, quantum, identity, and narrative dimensions
- **Causal Fog** - Implement "unobserved actions are mutable" mechanics
- **Modular Design** - Use only what you need
- **Language Agnostic** - Examples in Python, with easy ports to other languages

## 🚀 Quick Start

```python
from magic_stack import MagicCore

# Initialize the magic system
magic = MagicCore()

# Cast a spell
result = magic.cast_spell('teleportation', {
    'target': 'player',
    'destination': 'castle'
})

print(result['message'])  # "Spatial coordinates realigning..."
```

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/magic-stack.git

# Install dependencies
pip install -r requirements.txt

# Run example game
python examples/simple_game.py
```

## 🏗️ Architecture

```
magic-stack/
├── core/               # Core magic engine
│   ├── magic_core.py   # Main magic system
│   └── grammar.json    # Temporal grammar rules
├── modules/            # Optional modules
│   ├── pathfinding/    # Q* 6D pathfinding
│   ├── causal_fog/     # Mutable reality system
│   └── visual_effects/ # Spell visualization
├── examples/           # Example implementations
└── docs/              # Documentation
```

## 🎮 Core Concepts

### Magic Formulas

Magic Stack uses a temporal grammar system for spells:

```
⊙(entity) + †ψ(action) → Δt+n(result)
```

- `⊙` - Quantum superposition
- `†ψ` - Wave function collapse
- `Δt` - Temporal delta
- `→` - Transformation

### 6D Navigation

Navigate through six dimensions:
1. **Causal** - Cause and effect chains
2. **Temporal** - Time flow
3. **Spatial** - Physical space
4. **Quantum** - Probability states
5. **Identity** - Entity essence
6. **Narrative** - Story coherence

### Causal Fog

Actions remain mutable until observed:

```python
# Record an unobserved action
fog.record_action({'type': 'move', 'from': 'A', 'to': 'B'})

# Action can be modified until...
fog.observe_action(action_id, 'observer')  # Now it's locked
```

## 📚 Examples

### Simple Spell Casting

```python
from magic_stack import MagicCore

magic = MagicCore()

# Define a spell
spell = {
    'name': 'fireball',
    'formula': '⊙(energy) + †ψ(heat) → Δt+1(explosion)',
    'effect': 'Creates a fiery explosion'
}

magic.loaded_spells['fireball'] = spell
result = magic.cast_spell('fireball')
```

### Pathfinding Example

```python
from magic_stack.modules.pathfinding import QStar6D

pathfinder = QStar6D()
result = pathfinder.find_path('START', 'GOAL', search_object='time_crystal')

if result['success']:
    print(f"Path found: {' → '.join(result['path'])}")
    print(f"Objects found: {result['found_objects']}")
```

### Causal Fog Game Mechanic

```python
from magic_stack.modules.causal_fog import CausalFogEngine

fog = CausalFogEngine()
fog.enable('player1')

# Player performs action (unobserved)
action_id = fog.record_action({
    'type': 'steal',
    'item': 'golden_key',
    'from': 'guard'
})

# Later, another player observes...
fog.observe_action(action_id, 'player2')
# Action is now permanent and cannot be changed
```

## 🔧 Configuration

Configure Magic Stack behavior:

```python
config = {
    'verbose': True,              # Enable logging
    'default_caster': 'System',   # Default spell caster
    'grammar_file': 'grammar.json', # Grammar rules file
    'max_unobserved_actions': 50  # Causal fog limit
}

magic = MagicCore(config)
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by quantum mechanics and temporal paradoxes
- Built for creative developers who want to add magic to their games
- Special thanks to the temporal grammar research community

## 🌐 Community

- [Discord Server](#) - Join our community
- [Forum](#) - Discuss implementations
- [Wiki](#) - Detailed documentation

---

**Build your own magical universe with Magic Stack!** ✨🎮🔮