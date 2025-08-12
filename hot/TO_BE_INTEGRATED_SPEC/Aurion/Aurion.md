

# --- Aurion (forme normale) ---
cat > "$BASE_DIR/aurion_base.json" <<'JSON'
{
  "version": "1.0",
  "id": "npc_interstice_aurion",
  "name": "Aurion",
  "alias": ["Veilleur de l’Interstice"],
  "faction": "Archivistes de l’Interstice",
  "role": ["support", "contrôle léger"],
  "alignment": "neutre-bienveillant",
  "rarity": "épique",
  "level": 10,
  "progression_cap": 50,
  "stats": {
    "hp": 140,
    "mana": 110,
    "attack": 18,
    "defense": 16,
    "speed": 12,
    "crit_chance": 0.10,
    "energy_regen": 4
  },
  "appearance": {
    "description": "Silhouette faite de glyphes flottants ; halo discret en ruban de Möbius.",
    "icon": "icons/npc/aurion_base.png",
    "fx": ["aura_or_douce"]
  },
  "abilities": [
    {
      "id": "abil_topologie_brumeuse",
      "name": "Topologie Brumeuse",
      "type": "zone/cc",
      "cost_mana": 18,
      "cooldown_s": 10,
      "range": 3,
      "text": "Crée une brume 3x3 : -20% vitesse ennemie, -10% précision pendant 6s.",
      "effects": [
        {"speed_mult": 0.8, "accuracy_mult": 0.9, "duration_s": 6, "area": "3x3"}
      ]
    },
    {
      "id": "abil_lien_de_memoire",
      "name": "Lien de Mémoire",
      "type": "support",
      "cost_mana": 16,
      "cooldown_s": 14,
      "range": 4,
      "text": "Buff allié : +15% déf., regen 6 PV/s pendant 5s.",
      "effects": [
        {"ally_def_mult": 1.15, "heal_per_sec": 6, "duration_s": 5}
      ]
    }
  ]
}
JSON

# --- Aurion (Forme Sayan avec trigger) ---
cat > "$BASE_DIR/aurion_sayan.json" <<'JSON'
{
  "version": "1.0",
  "id": "npc_interstice_aurion_sayan",
  "name": "Aurion [Forme Sayan]",
  "alias": ["Aurion éveillé", "Veilleur incandescent"],
  "faction": "Archivistes de l’Interstice",
  "role": ["support offensif", "burst contrôle"],
  "alignment": "neutre-bienveillant",
  "rarity": "légendaire-temporaire",
  "level": 12,
  "progression_cap": 50,
  "stats": {
    "hp": 160,
    "mana": 120,
    "attack": 24,
    "defense": 18,
    "speed": 15,
    "crit_chance": 0.15,
    "energy_regen": 5
  },
  "appearance": {
    "description": "Glyphes en feu, double halo en ruban de Möbius incandescent.",
    "icon": "icons/npc/aurion_sayan.png",
    "fx": ["aura_or_incandescente", "étincelles_glyphiques"]
  },
  "trigger": {
    "condition": "hp_below_30_percent_and_cast_spell",
    "cooldown_s": 300,
    "duration_s": 20,
    "text": "Se déclenche si PV < 30% et qu’Aurion lance un sort. CD 5 min."
  },
  "form_bonus": {
    "attack_mult": 1.5,
    "speed_mult": 1.3,
    "mana_regen_mult": 2,
    "resistances_bonus": {"arcane": 0.20, "mind": 0.20}
  },
  "abilities_override": [
    {
      "id": "abil_topologie_brumeuse_sayan",
      "name": "Topologie Explosive",
      "type": "cc/dégâts",
      "cost_mana": 25,
      "cooldown_s": 12,
      "range": 3,
      "text": "Zone 3x3: 35 dégâts arcaniques initiaux et -30% vitesse ennemie pendant 5s.",
      "effects": [
        {"damage_arcane": 35, "speed_mult": 0.7, "duration_s": 5, "area": "3x3"}
      ]
    },
    {
      "id": "abil_lien_de_memoire_sayan",
      "name": "Lien Causal Absolu",
      "type": "support/burst heal",
      "cost_mana": 28,
      "cooldown_s": 15,
      "range": 4,
      "text": "Marque un allié : +25% déf., +20% atk; soigne 50 PV si l’allié subit 2 coups en 6s.",
      "effects": [
        {"ally_def_mult": 1.25, "ally_atk_mult": 1.20, "trigger_hits": 2, "heal_on_trigger": 50, "duration_s": 6}
      ]
    }
  ],
  "drawbacks": [
    "Après la Forme Sayan: -25% vitesse et -10% déf. pendant 15s.",
    "Non activable manuellement : uniquement via trigger."
  ],
  "dialogue": {
    "trigger": ["« L’Interstice… s’ouvre en moi ! »"],
    "low_hp": ["« Pas… encore… ! »"],
    "form_end": ["« L’incandescence se retire… »"]
  }
}
JSON

# --- Stub de trigger (à brancher côté serveur/engine) ---
cat > "$BASE_DIR/triggers/aurion_trigger_example.ts" <<'TS'
/**
 * Hook d’exemple : déclenche la Forme Sayan.
 * À adapter à votre moteur (événements, bus, etc.).
 */
type Stats = { hp: number; hpMax: number };
type SpellCastEvent = { casterId: string; spellId: string };

export function shouldEnterSayan(stats: Stats, lastEvent?: SpellCastEvent): boolean {
  const below = stats.hp <= 0.30 * stats.hpMax;
  const casted = !!lastEvent && lastEvent.casterId === "npc_interstice_aurion";
  return below && casted;
}

export function applySayanForm(state: any) {
  // Exemple générique : remplace le profil d’abilities/bonus
  state.form = "sayan";
  state.formExpiresAt = Date.now() + 20_000; // 20s
  state.modifiers.push({ id: "fatigue_after_sayan", applyAfterMs: 20_000, data: { speed_mult: 0.75, defense_mult: 0.90, durationMs: 15_000 }});
}
TS

# --- README d’intégration rapide ---
cat > "$BASE_DIR/README.md" <<'MD'
# Aurion – Dossier d’implémentation

Contenu :
- `aurion_base.json` : forme normale (équilibrée).
- `aurion_sayan.json` : forme éveillée avec **trigger** (PV<30% + lancement de sort, 20s, CD 5min).
- `triggers/aurion_trigger_example.ts` : stub de hook côté serveur.

## Brancher côté moteur
1. Charger `aurion_base.json` comme fiche perso par défaut.
2. Écouter les événements de combat :
   - À chaque **lancement de sort** par Aurion, vérifier si `hp <= 30%`.
   - Si oui et cooldown OK → charger **aurion_sayan.json** pour 20s.
3. À l’expiration (20s) → appliquer **fatigue** : -25% vitesse, -10% déf. pendant 15s.

## Assets
- Mettre les icônes dans `icons/npc/aurion_base.png` et `icons/npc/aurion_sayan.png` (placeholders OK).

## Équilibrage (reco)
- CD 5 min est volontairement long pour éviter l’abus.
- Le malus de fatigue est important → compense le burst.

## Où sont les fichiers ?
`/opt/hot/app/game_content/aurion/`

MD

echo "✅ Dossier d'implémentation créé : $BASE_DIR"
ls -lah "$BASE_DIR"
SH

Ça te pose le dossier complet sur le VPS ici :
/opt/hot/app/game_content/aurion/

Tu pourras filer ce répertoire au dev gameplay pour brancher le trigger (le stub TypeScript montre exactement quoi tester et quels effets poser).
