# Formula Reference

## Overview

The Magic Stack contains 869 magical formulas organized by category.

## Categories

### 🔥 Elemental (200 formulas)
Basic elemental magic manipulating fire, water, earth, and air.

**Examples:**
- `FIREBALL` - Projectile fire damage
- `ICE_SHIELD` - Defensive ice barrier
- `EARTHQUAKE` - Area earth damage
- `WIND_WALK` - Movement enhancement

### ⚡ Energy (150 formulas)
Pure energy manipulation and transformation.

**Examples:**
- `LIGHTNING_BOLT` - Direct energy attack
- `MANA_DRAIN` - Energy absorption
- `POWER_SURGE` - Temporary boost
- `ENERGY_SHIELD` - Protective barrier

### 🕐 Temporal (100 formulas)
Time manipulation and temporal effects.

**Examples:**
- `TIME_STOP` - Pause time briefly
- `HASTE` - Speed up actions
- `SLOW` - Reduce enemy speed
- `REWIND` - Undo recent damage

### 🌌 Spatial (120 formulas)
Space manipulation and dimensional magic.

**Examples:**
- `TELEPORT` - Instant movement
- `PORTAL` - Create doorways
- `DIMENSION_DOOR` - Short-range teleport
- `SPATIAL_LOCK` - Prevent movement

### 💀 Necromancy (80 formulas)
Death magic and undead manipulation.

**Examples:**
- `RAISE_DEAD` - Animate corpses
- `LIFE_DRAIN` - Steal life force
- `BONE_ARMOR` - Defensive spell
- `DEATH_COIL` - Damage/heal undead

### 🌿 Nature (100 formulas)
Natural magic and druid spells.

**Examples:**
- `ENTANGLE` - Root enemies
- `CALL_LIGHTNING` - Nature's wrath
- `BARK_SKIN` - Natural armor
- `WILD_GROWTH` - Area healing

### 💫 Illusion (69 formulas)
Mind tricks and false reality.

**Examples:**
- `INVISIBILITY` - Become unseen
- `MIRROR_IMAGE` - Create duplicates
- `CONFUSION` - Disorient enemies
- `PHANTASM` - Create illusions

### 🛡️ Protection (50 formulas)
Defensive and warding magic.

**Examples:**
- `SANCTUARY` - Protection zone
- `MAGIC_SHIELD` - Spell resistance
- `WARD` - Area protection
- `DISPEL_MAGIC` - Remove effects

## Formula Structure

Each formula contains:
```json
{
  "id": "FORMULA_ID",
  "name": "Display Name",
  "category": "ELEMENTAL",
  "power": 10,
  "cost": 5,
  "cooldown": 3000,
  "effects": ["damage", "burn"],
  "description": "Formula description",
  "components": ["gesture", "word", "material"]
}
```

## Casting Formulas

### Basic Cast
```bash
POST /api/magic/cast
{
  "formula": "FIREBALL",
  "target": "enemy_1",
  "power": 10
}
```

### Advanced Cast
```bash
POST /api/magic/cast
{
  "formula": "TIME_STOP",
  "target": "self",
  "power": 20,
  "modifiers": {
    "duration": 5000,
    "radius": 10
  }
}
```

## Formula Combinations

Some formulas can be combined:
- `FIRE` + `WIND` = `FIRESTORM`
- `ICE` + `SHIELD` = `FROST_ARMOR`
- `TELEPORT` + `ATTACK` = `BLINK_STRIKE`

## Power Scaling

Formula power scales with:
- Caster level
- Magic affinity
- Environmental factors
- Temporal alignment

## Cooldowns

- **Instant**: No cooldown
- **Short**: 1-5 seconds
- **Medium**: 5-30 seconds
- **Long**: 30+ seconds
- **Ultimate**: Once per session

## Special Formulas

### Forbidden Magic
Requires special permission:
- `SOUL_BURN`
- `TIME_FRACTURE`
- `REALITY_TEAR`

### Collaborative Magic
Requires multiple casters:
- `GRAND_SUMMONING`
- `WORLD_SHIELD`
- `MASS_TELEPORT`

## Tips

1. Start with basic formulas
2. Practice combinations
3. Monitor cooldowns
4. Consider environment
5. Track mana costs

---

*For complete formula list, query: `GET /api/magic/formulas`*