/**
 * 🔮 SORTS CENTRALISÉS - 869 Formules Magiques
 * 
 * Source de vérité unique pour tous les sorts de Heroes of Time
 * Compilé depuis : docs/FORMULA_REFERENCE.md et backend
 */

export interface Spell {
  id: string;
  name: string;
  category: 'elemental' | 'energy' | 'temporal' | 'spatial' | 'necromancy' | 'nature' | 'illusion' | 'protection' | 'non-euclidean';
  cost: {
    mana: number;
    cooldown?: number;
    special?: Record<string, number>;
  };
  level?: number;
  damage?: number | 'all';
  heal?: number;
  effect?: string;
  description: string;
  icon?: string;
  fx_preset?: string;
  sound_event?: string;
}

// === SORTS PAR CATÉGORIE (869 au total!) ===

// === SORTS ÉLÉMENTAIRES (200 formules) ===
export const ELEMENTAL_SPELLS: Record<string, Spell> = {
  fireball: {
    id: 'fireball',
    name: 'Boule de Feu',
    category: 'elemental',
    cost: { mana: 3 },
    damage: 30,
    description: 'Projectile de feu infligeant des dégâts directs',
    icon: '🔥',
    fx_preset: 'fire_burst',
    sound_event: 'fireball_cast'
  },
  ice_shield: {
    id: 'ice_shield',
    name: 'Bouclier de Glace',
    category: 'elemental',
    cost: { mana: 2 },
    effect: 'defense +20',
    description: 'Barrière de glace défensive',
    icon: '🧊',
    fx_preset: 'frost_shield',
    sound_event: 'ice_form'
  },
  earthquake: {
    id: 'earthquake',
    name: 'Tremblement de Terre',
    category: 'elemental',
    cost: { mana: 5 },
    damage: 'all',
    description: 'Dégâts de zone par séisme',
    icon: '🌍',
    fx_preset: 'earth_shake',
    sound_event: 'earthquake_rumble'
  },
  wind_walk: {
    id: 'wind_walk',
    name: 'Marche du Vent',
    category: 'elemental',
    cost: { mana: 2 },
    effect: 'movement +3',
    description: 'Amélioration de mouvement par le vent',
    icon: '💨',
    fx_preset: 'wind_rush',
    sound_event: 'wind_whoosh'
  },
  meteor_storm: {
    id: 'meteor_storm',
    name: 'Pluie de Météores',
    category: 'elemental',
    cost: { mana: 8 },
    damage: 50,
    description: 'Bombardement céleste dévastateur',
    icon: '☄️',
    fx_preset: 'meteor_impact',
    sound_event: 'meteor_fall'
  },
  lava_burst: {
    id: 'lava_burst',
    name: 'Éruption de Lave',
    category: 'elemental',
    cost: { mana: 4 },
    damage: 35,
    effect: 'burn 2 turns',
    description: 'Jet de lave en fusion',
    icon: '🌋',
    fx_preset: 'lava_flow',
    sound_event: 'lava_bubble'
  }
  // ... 194 autres sorts élémentaires
};

// === SORTS D'ÉNERGIE (150 formules) ===
export const ENERGY_SPELLS: Record<string, Spell> = {
  lightning_bolt: {
    id: 'lightning_bolt',
    name: 'Éclair',
    category: 'energy',
    cost: { mana: 4 },
    damage: 40,
    description: 'Attaque d\'énergie pure directe',
    icon: '⚡',
    fx_preset: 'lightning_strike',
    sound_event: 'thunder_crack'
  },
  mana_drain: {
    id: 'mana_drain',
    name: 'Drain de Mana',
    category: 'energy',
    cost: { mana: 3 },
    effect: 'steal 20 mana',
    description: 'Absorption d\'énergie magique',
    icon: '💫',
    fx_preset: 'mana_siphon',
    sound_event: 'energy_drain'
  },
  power_surge: {
    id: 'power_surge',
    name: 'Surge de Puissance',
    category: 'energy',
    cost: { mana: 2 },
    effect: 'all stats +5',
    description: 'Boost temporaire de puissance',
    icon: '⚡',
    fx_preset: 'power_up',
    sound_event: 'energy_surge'
  },
  energy_shield: {
    id: 'energy_shield',
    name: 'Bouclier d\'Énergie',
    category: 'energy',
    cost: { mana: 3 },
    effect: 'absorb 30 damage',
    description: 'Barrière d\'énergie protectrice',
    icon: '🛡️',
    fx_preset: 'energy_barrier',
    sound_event: 'shield_up'
  },
  chain_lightning: {
    id: 'chain_lightning',
    name: 'Chaîne d\'Éclairs',
    category: 'energy',
    cost: { mana: 6 },
    damage: 25,
    effect: 'jumps to 3 targets',
    description: 'Éclair rebondissant entre ennemis',
    icon: '⛓️',
    fx_preset: 'lightning_chain',
    sound_event: 'electric_arc'
  }
  // ... 145 autres sorts d'énergie
};

// === SORTS TEMPORELS (100 formules) ===
export const TEMPORAL_SPELLS: Record<string, Spell> = {
  time_stop: {
    id: 'time_stop',
    name: 'Arrêt du Temps',
    category: 'temporal',
    cost: { mana: 8, cooldown: 5 },
    effect: 'freeze all for 1 turn',
    description: 'Gèle le temps brièvement',
    icon: '⏱️',
    fx_preset: 'time_freeze',
    sound_event: 'clock_stop'
  },
  haste: {
    id: 'haste',
    name: 'Hâte',
    category: 'temporal',
    cost: { mana: 3 },
    effect: 'double actions',
    description: 'Accélération temporelle',
    icon: '⏩',
    fx_preset: 'speed_boost',
    sound_event: 'time_accelerate'
  },
  slow: {
    id: 'slow',
    name: 'Ralentissement',
    category: 'temporal',
    cost: { mana: 2 },
    effect: 'half enemy speed',
    description: 'Ralentit les ennemis',
    icon: '🐌',
    fx_preset: 'time_slow',
    sound_event: 'time_decelerate'
  },
  rewind: {
    id: 'rewind',
    name: 'Rembobinage',
    category: 'temporal',
    cost: { mana: 5 },
    effect: 'undo last turn',
    description: 'Annule les dégâts récents',
    icon: '⏪',
    fx_preset: 'time_rewind',
    sound_event: 'clock_reverse'
  },
  temporal_echo: {
    id: 'temporal_echo',
    name: 'Écho Temporel',
    category: 'temporal',
    cost: { mana: 4 },
    effect: 'repeat last action',
    description: 'Répète votre dernière action',
    icon: '🔁',
    fx_preset: 'echo_wave',
    sound_event: 'time_echo'
  },
  paradox: {
    id: 'paradox',
    name: 'Paradoxe',
    category: 'temporal',
    cost: { mana: 7 },
    effect: 'swap positions with past self',
    description: 'Échange avec votre position passée',
    icon: '♾️',
    fx_preset: 'paradox_rift',
    sound_event: 'reality_tear'
  }
  // ... 94 autres sorts temporels
};

// === SORTS SPATIAUX (120 formules) ===
export const SPATIAL_SPELLS: Record<string, Spell> = {
  teleport: {
    id: 'teleport',
    name: 'Téléportation',
    category: 'spatial',
    cost: { mana: 4 },
    effect: 'instant movement',
    description: 'Déplacement instantané',
    icon: '🌀',
    fx_preset: 'teleport_flash',
    sound_event: 'teleport_sound'
  },
  portal: {
    id: 'portal',
    name: 'Portail',
    category: 'spatial',
    cost: { mana: 5 },
    effect: 'create doorway',
    description: 'Crée un passage dimensionnel',
    icon: '🚪',
    fx_preset: 'portal_open',
    sound_event: 'portal_whoosh'
  },
  dimension_door: {
    id: 'dimension_door',
    name: 'Porte Dimensionnelle',
    category: 'spatial',
    cost: { mana: 3 },
    effect: 'short-range teleport',
    description: 'Téléportation courte distance',
    icon: '🚪',
    fx_preset: 'dimension_shift',
    sound_event: 'space_warp'
  },
  spatial_lock: {
    id: 'spatial_lock',
    name: 'Verrou Spatial',
    category: 'spatial',
    cost: { mana: 3 },
    effect: 'prevent movement',
    description: 'Empêche tout déplacement',
    icon: '🔒',
    fx_preset: 'space_lock',
    sound_event: 'lock_click'
  },
  blink: {
    id: 'blink',
    name: 'Clignotement',
    category: 'spatial',
    cost: { mana: 2 },
    effect: 'micro-teleport',
    description: 'Téléportation très courte',
    icon: '✨',
    fx_preset: 'blink_effect',
    sound_event: 'blink_sound'
  }
  // ... 115 autres sorts spatiaux
};

// === SORTS DE NÉCROMANCIE (80 formules) ===
export const NECROMANCY_SPELLS: Record<string, Spell> = {
  raise_dead: {
    id: 'raise_dead',
    name: 'Animation des Morts',
    category: 'necromancy',
    cost: { mana: 5 },
    effect: 'resurrect unit',
    description: 'Anime les cadavres',
    icon: '💀',
    fx_preset: 'undead_rise',
    sound_event: 'bones_rattle'
  },
  life_drain: {
    id: 'life_drain',
    name: 'Drain de Vie',
    category: 'necromancy',
    cost: { mana: 4 },
    damage: 25,
    heal: 25,
    description: 'Vole la force vitale',
    icon: '🩸',
    fx_preset: 'life_siphon',
    sound_event: 'soul_drain'
  },
  bone_armor: {
    id: 'bone_armor',
    name: 'Armure d\'Os',
    category: 'necromancy',
    cost: { mana: 3 },
    effect: 'defense +15',
    description: 'Protection macabre',
    icon: '🦴',
    fx_preset: 'bone_shield',
    sound_event: 'bones_form'
  },
  death_coil: {
    id: 'death_coil',
    name: 'Spirale de Mort',
    category: 'necromancy',
    cost: { mana: 4 },
    effect: 'damage living, heal undead',
    description: 'Blesse ou soigne selon la cible',
    icon: '💀',
    fx_preset: 'death_spiral',
    sound_event: 'death_whisper'
  }
  // ... 76 autres sorts de nécromancie
};

// === SORTS DE NATURE (100 formules) ===
export const NATURE_SPELLS: Record<string, Spell> = {
  entangle: {
    id: 'entangle',
    name: 'Enchevêtrement',
    category: 'nature',
    cost: { mana: 3 },
    effect: 'root enemy',
    description: 'Immobilise avec des racines',
    icon: '🌿',
    fx_preset: 'vines_grow',
    sound_event: 'roots_emerge'
  },
  call_lightning: {
    id: 'call_lightning',
    name: 'Appel de la Foudre',
    category: 'nature',
    cost: { mana: 5 },
    damage: 45,
    description: 'La colère de la nature',
    icon: '⛈️',
    fx_preset: 'storm_strike',
    sound_event: 'thunder_boom'
  },
  bark_skin: {
    id: 'bark_skin',
    name: 'Peau d\'Écorce',
    category: 'nature',
    cost: { mana: 2 },
    effect: 'armor +10',
    description: 'Armure naturelle',
    icon: '🌳',
    fx_preset: 'bark_growth',
    sound_event: 'wood_creak'
  },
  wild_growth: {
    id: 'wild_growth',
    name: 'Croissance Sauvage',
    category: 'nature',
    cost: { mana: 4 },
    heal: 30,
    effect: 'area heal',
    description: 'Soins de zone naturels',
    icon: '🌱',
    fx_preset: 'nature_bloom',
    sound_event: 'plants_grow'
  }
  // ... 96 autres sorts de nature
};

// === SORTS D'ILLUSION (69 formules) ===
export const ILLUSION_SPELLS: Record<string, Spell> = {
  invisibility: {
    id: 'invisibility',
    name: 'Invisibilité',
    category: 'illusion',
    cost: { mana: 3 },
    effect: 'become unseen',
    description: 'Devient invisible',
    icon: '👻',
    fx_preset: 'fade_out',
    sound_event: 'vanish'
  },
  mirror_image: {
    id: 'mirror_image',
    name: 'Image Miroir',
    category: 'illusion',
    cost: { mana: 4 },
    effect: 'create 2 copies',
    description: 'Crée des duplicatas',
    icon: '🪞',
    fx_preset: 'duplicate',
    sound_event: 'mirror_sound'
  },
  confusion: {
    id: 'confusion',
    name: 'Confusion',
    category: 'illusion',
    cost: { mana: 3 },
    effect: 'random enemy actions',
    description: 'Désoriente les ennemis',
    icon: '😵',
    fx_preset: 'dizzy_stars',
    sound_event: 'mind_warp'
  },
  phantasm: {
    id: 'phantasm',
    name: 'Fantasme',
    category: 'illusion',
    cost: { mana: 5 },
    effect: 'create powerful illusion',
    description: 'Crée une illusion puissante',
    icon: '🎭',
    fx_preset: 'illusion_cast',
    sound_event: 'reality_shift'
  }
  // ... 65 autres sorts d'illusion
};

// === SORTS DE PROTECTION (50 formules) ===
export const PROTECTION_SPELLS: Record<string, Spell> = {
  sanctuary: {
    id: 'sanctuary',
    name: 'Sanctuaire',
    category: 'protection',
    cost: { mana: 4 },
    effect: 'protection zone',
    description: 'Zone de protection',
    icon: '⛪',
    fx_preset: 'holy_aura',
    sound_event: 'bell_ring'
  },
  magic_shield: {
    id: 'magic_shield',
    name: 'Bouclier Magique',
    category: 'protection',
    cost: { mana: 3 },
    effect: 'spell resistance',
    description: 'Résistance aux sorts',
    icon: '🛡️',
    fx_preset: 'magic_barrier',
    sound_event: 'shield_cast'
  },
  ward: {
    id: 'ward',
    name: 'Protection',
    category: 'protection',
    cost: { mana: 2 },
    effect: 'area protection',
    description: 'Protection de zone',
    icon: '🔰',
    fx_preset: 'ward_glow',
    sound_event: 'ward_place'
  },
  dispel_magic: {
    id: 'dispel_magic',
    name: 'Dissipation de la Magie',
    category: 'protection',
    cost: { mana: 3 },
    effect: 'remove all effects',
    description: 'Supprime les effets magiques',
    icon: '🚫',
    fx_preset: 'dispel_wave',
    sound_event: 'magic_cancel'
  }
  // ... 46 autres sorts de protection
};

// === SORTS NON-EUCLIDIENS (Spéciaux) ===
export const NON_EUCLIDEAN_SPELLS: Record<string, Spell> = {
  klein_bottle_reality: {
    id: 'klein_bottle_reality',
    name: 'Réalité en Bouteille de Klein',
    category: 'non-euclidean',
    level: 85,
    cost: { 
      mana: 300,
      special: { paradox_tokens: 3 }
    },
    description: 'L\'intérieur devient l\'extérieur',
    icon: '🍾',
    fx_preset: 'reality_inversion',
    sound_event: 'dimension_twist'
  },
  mobius_battlefield: {
    id: 'mobius_battlefield',
    name: 'Champ de Bataille de Möbius',
    category: 'non-euclidean',
    level: 80,
    cost: { 
      mana: 250,
      special: { topology_tokens: 1 }
    },
    description: 'Combat sur ruban de Möbius',
    icon: '♾️',
    fx_preset: 'mobius_twist',
    sound_event: 'space_fold'
  },
  tesseract_prison: {
    id: 'tesseract_prison',
    name: 'Prison Tesseract',
    category: 'non-euclidean',
    level: 95,
    cost: { 
      mana: 500,
      special: { dimensional_anchors: 8 }
    },
    description: 'Prison 4D inescapable',
    icon: '🔲',
    fx_preset: 'tesseract_trap',
    sound_event: '4d_lock'
  },
  hyperbolic_space_warp: {
    id: 'hyperbolic_space_warp',
    name: 'Distorsion Hyperbolique',
    category: 'non-euclidean',
    level: 75,
    cost: { 
      mana: 200,
      special: { quantum_charges: 5 }
    },
    description: 'Déformation hyperbolique de l\'espace',
    icon: '〰️',
    fx_preset: 'hyperbolic_bend',
    sound_event: 'space_curve'
  },
  fractal_dimension_cascade: {
    id: 'fractal_dimension_cascade',
    name: 'Cascade Dimensionnelle Fractale',
    category: 'non-euclidean',
    level: 90,
    cost: { 
      mana: 400,
      special: { computation_crystals: 10 }
    },
    description: 'Dimensions fractales infinies',
    icon: '🌀',
    fx_preset: 'fractal_explosion',
    sound_event: 'dimension_cascade'
  }
};

// === AGRÉGATION DE TOUS LES SORTS ===
export const ALL_SPELLS: Record<string, Spell> = {
  ...ELEMENTAL_SPELLS,
  ...ENERGY_SPELLS,
  ...TEMPORAL_SPELLS,
  ...SPATIAL_SPELLS,
  ...NECROMANCY_SPELLS,
  ...NATURE_SPELLS,
  ...ILLUSION_SPELLS,
  ...PROTECTION_SPELLS,
  ...NON_EUCLIDEAN_SPELLS
};

// Fonctions utilitaires
export function getSpellById(id: string): Spell | undefined {
  return ALL_SPELLS[id];
}

export function getSpellsByCategory(category: Spell['category']): Spell[] {
  return Object.values(ALL_SPELLS).filter(spell => spell.category === category);
}

export function getSpellsByCost(maxMana: number): Spell[] {
  return Object.values(ALL_SPELLS).filter(spell => spell.cost.mana <= maxMana);
}

export function getDamageSpells(): Spell[] {
  return Object.values(ALL_SPELLS).filter(spell => spell.damage !== undefined);
}

export function getHealingSpells(): Spell[] {
  return Object.values(ALL_SPELLS).filter(spell => spell.heal !== undefined);
}

export function getAllSpells(): Spell[] {
  return Object.values(ALL_SPELLS);
}

// Stats globales
export const SPELLS_STATS = {
  total: 869,  // Total documenté
  implemented: Object.keys(ALL_SPELLS).length,  // Implémentés dans ce fichier
  categories: {
    elemental: 200,
    energy: 150,
    temporal: 100,
    spatial: 120,
    necromancy: 80,
    nature: 100,
    illusion: 69,
    protection: 50,
    non_euclidean: 5
  },
  averageCost: Math.round(
    Object.values(ALL_SPELLS).reduce((acc, s) => acc + s.cost.mana, 0) / Object.keys(ALL_SPELLS).length
  )
};

// Note: Ce fichier contient un échantillon représentatif des 869 sorts.
// Les sorts complets sont dans la base de données backend.
