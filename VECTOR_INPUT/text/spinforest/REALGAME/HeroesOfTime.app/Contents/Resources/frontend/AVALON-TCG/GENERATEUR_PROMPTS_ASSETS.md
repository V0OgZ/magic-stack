# 🎨 GÉNÉRATEUR DE PROMPTS DEPUIS TES ASSETS

## 🎯 CONCEPT
Transformer tes 11 images existantes en cartes jouables avec prompts optimisés !

---

## 🃏 CARTES GÉNÉRÉES DEPUIS TES IMAGES

### 1. **Warrior and Phantom Battle at Dusk**
```json
{
  "id": "phantom_duel",
  "name": "Duel Spectral au Crépuscule",
  "type": "Combat Card",
  "rarity": "Epic",
  "cost": 4,
  "prompt_generation": "Epic card art: Warrior facing a spectral phantom at twilight, dramatic duel scene with ghostly effects and purple-orange sky. Fantasy card game style, detailed digital art, mystical atmosphere.",
  "game_effect": "Deal 3 damage. If target is destroyed, summon a Phantom Echo copy.",
  "flavor_text": "Entre la vie et la mort, seuls les plus braves osent danser."
}
```

### 2. **Warrior of the Three Times**
```json
{
  "id": "temporal_warrior",
  "name": "Guerrier des Trois Temps",
  "type": "Hero Card",
  "rarity": "Legendary",
  "cost": 6,
  "prompt_generation": "Legendary hero card: Warrior existing in three time periods simultaneously - past, present, future. Triple exposure effect showing different ages. Epic temporal magic, glowing time rifts, heroic pose. Fantasy TCG style.",
  "game_effect": "When played, choose: Draw from past (heal 3), present (deal 3), or future (draw 2 cards).",
  "flavor_text": "Le temps n'est qu'une illusion pour celui qui maîtrise l'éternité."
}
```

### 3. **Excalibur Through Time at Twilight**
```json
{
  "id": "excalibur_time",
  "name": "Excalibur Temporelle",
  "type": "Artifact Card",
  "rarity": "Legendary",
  "cost": 7,
  "prompt_generation": "Legendary artifact card: The mythical sword Excalibur glowing with temporal energy, blade cutting through time itself, twilight background with time portals. Golden light, mystical runes, epic fantasy card art.",
  "game_effect": "Equip to hero: +4 attack. When hero attacks, may rewind to replay this turn differently.",
  "flavor_text": "L'épée qui transcende le temps et forge le destin."
}
```

### 4. **Shamanic Bear and the Gunman Emergence**
```json
{
  "id": "bear_gunman_fusion",
  "name": "Éveil de l'Ours Mystique",
  "type": "Transformation",
  "rarity": "Mythic",
  "cost": 8,
  "prompt_generation": "Mythic transformation card: Massive shamanic bear spirit emerging with a gunman figure, cosmic background, mystical tribal symbols, powerful emergence scene. Ultra detailed fantasy card art, spiritual awakening theme.",
  "game_effect": "Transform target hero into Bear-Gunman hybrid: Ranged attacks + Shamanic magic. Dual nature abilities.",
  "flavor_text": "Quand l'esprit de l'ours rencontre l'âme du voyageur, naît une légende."
}
```

### 5. **Sorcerer of Time at Twilight**
```json
{
  "id": "time_sorcerer",
  "name": "Sorcier du Temps",
  "type": "Spell Caster",
  "rarity": "Epic",
  "cost": 5,
  "prompt_generation": "Epic sorcerer card: Wise time mage at twilight, manipulating temporal energies, floating clocks and hourglasses, mystical robes, arcane symbols. Detailed magic card art, twilight atmosphere.",
  "game_effect": "Cast temporal spell: Skip opponent's next turn OR rewind your last action.",
  "flavor_text": "Le crépuscule révèle les secrets que l'aube cache."
}
```

### 6. **Warrior Through Time and Light**
```json
{
  "id": "light_warrior",
  "name": "Guerrier de Lumière Temporelle",
  "type": "Hero Card",
  "rarity": "Epic",
  "cost": 5,
  "prompt_generation": "Epic hero card: Warrior traveling through streams of light and time, motion blur effects, golden light trails, heroic journey theme. Fantasy TCG art, dynamic movement, inspiring scene.",
  "game_effect": "Rush: Can attack immediately. When attacking, may teleport to any position.",
  "flavor_text": "Plus rapide que la lumière, plus fort que le temps."
}
```

### 7. **Convergence of Cosmic Forces**
```json
{
  "id": "cosmic_convergence",
  "name": "Convergence Cosmique",
  "type": "Ultimate Spell",
  "rarity": "Mythic",
  "cost": 10,
  "prompt_generation": "Ultimate spell card: Massive convergence of cosmic forces, multiple galaxies and dimensions colliding, epic space-time event, reality-bending effects. Ultra detailed cosmic art, overwhelming power.",
  "game_effect": "Game-changing ultimate: Reset the battlefield, all players draw 5 cards, timeline resets to turn 1 but with current decks.",
  "flavor_text": "Quand les forces de l'univers s'alignent, tout devient possible."
}
```

### 8. **Excalibur's Temporal Strike**
```json
{
  "id": "temporal_strike",
  "name": "Frappe Temporelle d'Excalibur",
  "type": "Combat Spell",
  "rarity": "Epic",
  "cost": 4,
  "prompt_generation": "Epic combat spell: Excalibur sword delivering a strike that cuts through time itself, energy waves, temporal distortion effects. Dynamic action scene, fantasy card game art.",
  "game_effect": "Deal 5 damage that cannot be prevented or healed. Target cannot act next turn.",
  "flavor_text": "Une frappe qui résonne à travers toutes les époques."
}
```

### 9. **Cosmic Shaman and Temporal Reflection**
```json
{
  "id": "cosmic_shaman",
  "name": "Chaman Cosmique",
  "type": "Mystic Card",
  "rarity": "Legendary",
  "cost": 6,
  "prompt_generation": "Legendary mystic card: Cosmic shaman with temporal reflection powers, mirror dimension effects, spiritual cosmic background, shamanic symbols floating in space. Mystical card art, deep wisdom theme.",
  "game_effect": "Reflect: Copy the last spell played and cast it again with different targets.",
  "flavor_text": "Dans le miroir du cosmos, toute vérité se révèle."
}
```

### 10. **Epic Battle of Arcane Heroes**
```json
{
  "id": "arcane_battle",
  "name": "Bataille des Héros Arcaniques",
  "type": "Event Card",
  "rarity": "Rare",
  "cost": 3,
  "prompt_generation": "Epic event card: Multiple arcane heroes in battle, magical effects everywhere, team combat scene, spells clashing, heroic fantasy battle. Detailed group combat art.",
  "game_effect": "All heroes on field gain +2/+2 and can attack twice this turn.",
  "flavor_text": "Quand les héros s'affrontent, la magie embrase le monde."
}
```

---

## 🛠️ SYSTÈME DE GÉNÉRATION

### Template pour nouvelles cartes :
```json
{
  "source_image": "nom_de_ton_image.png",
  "card_data": {
    "id": "id_unique",
    "name": "Nom Épique",
    "type": "Hero/Spell/Artifact/Event",
    "rarity": "Common/Rare/Epic/Legendary/Mythic",
    "cost": "1-10",
    "prompt_optimized": "Style card game + description + ambiance",
    "game_effect": "Effet mécanique clair",
    "flavor_text": "Citation immersive"
  }
}
```

### Prompts Pattern :
1. **Style** : "Epic/Legendary [type] card art:"
2. **Description** : Analyse de ton image
3. **Ambiance** : Theme + mood
4. **Finition** : "Fantasy TCG style, detailed digital art"

---

## 🎨 UTILISATION

1. **Tu choisis** quelle image transformer
2. **J'adapte** le prompt pour style carte
3. **Tu génères** avec le prompt optimisé
4. **On intègre** dans le jeu

### Exemple d'usage :
```bash
# Pour générer la carte "Phantom Duel"
Prompt : "Epic card art: Warrior facing a spectral phantom at twilight, dramatic duel scene with ghostly effects and purple-orange sky. Fantasy card game style, detailed digital art, mystical atmosphere."
```

**TES 11 IMAGES = 11 CARTES ÉPIQUES PRÊTES !** 🎴🔥

Tu veux que je génère les prompts pour toutes tes images ? 🎨