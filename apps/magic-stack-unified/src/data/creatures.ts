/**
 * 🐉 CRÉATURES CENTRALISÉES - Toutes les créatures du jeu
 * 
 * Source de vérité unique pour toutes les créatures de Heroes of Time
 * Compilé depuis : hot/entities/creatures.json
 */

export interface Creature {
  id: string;
  name: string;
  tier: number;
  cost: number;
  attack: number;
  defense: number;
  health: number;
  abilities: string[];
  energy_complex?: {
    A: number;
    phi: number;
  };
  quantum_state?: string;
  special?: string;
  flavor?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  set: string;
  icon_id: string;
  fx_preset: string;
  sound_event: string;
  theme_color: string;
  output_modes: {
    literary: string;
    runic: string;
    iconic: string;
  };
}

// === LES 20 CRÉATURES COMPLÈTES ===
export const CREATURES: Record<string, Creature> = {
  // === CRÉATURES LÉGENDAIRES ===
  dragon_rouge_temporel: {
    id: 'dragon_rouge_temporel',
    name: 'Dragon Rouge Temporel',
    tier: 4,
    cost: 12,
    attack: 50,
    defense: 40,
    health: 500,  // 500 HP !!
    abilities: ['vol', 'souffle_temporel', 'paradoxe_draconique'],
    energy_complex: {
      A: 500,
      phi: 0.95
    },
    quantum_state: 'collapsed',
    special: 'Peut attaquer dans le passé, présent et futur simultanément',
    flavor: 'L\'apex prédateur de toutes les timelines',
    rarity: 'legendary',
    set: 'temporal',
    icon_id: '🐲',
    fx_preset: 'fire_breath',
    sound_event: 'dragon_roar',
    theme_color: '#DC143C',
    output_modes: {
      literary: 'Dragon ancestral maîtrisant les flammes temporelles',
      runic: 'ᛞᚱᚨᚷᛟᚾ᛫ᚱᛟᚢᚷᛖ',
      iconic: '🐲🔥⏳'
    }
  },

  quantum_phoenix: {
    id: 'quantum_phoenix',
    name: 'Phoenix Quantique',
    tier: 3,
    cost: 8,
    attack: 6,
    defense: 4,
    health: 6,
    abilities: ['renaissance_infinie', 'flammes_probabilistes'],
    energy_complex: {
      A: 100,
      phi: 0.9
    },
    quantum_state: 'superposition',
    special: 'Ressuscite avec probabilité inversée à chaque mort',
    flavor: 'Meurt et renaît dans toutes les dimensions simultanément',
    rarity: 'legendary',
    set: 'quantum',
    icon_id: '🔥',
    fx_preset: 'phoenix_rebirth',
    sound_event: 'phoenix_cry',
    theme_color: '#FF4500',
    output_modes: {
      literary: 'Oiseau de feu transcendant la mort elle-même',
      runic: 'ᛈᚺᛟᛖᚾᛁᛪ',
      iconic: '🔥🦅♾️'
    }
  },

  quantum_lich: {
    id: 'quantum_lich',
    name: 'Liche Quantique',
    tier: 3,
    cost: 9,
    attack: 7,
    defense: 5,
    health: 8,
    abilities: ['nécromancie_quantique', 'phylactère_superposé'],
    energy_complex: {
      A: 120,
      phi: 0.85
    },
    quantum_state: 'entangled',
    special: 'Son phylactère existe dans 7 dimensions parallèles',
    flavor: 'Mort-vivant persistant dans l\'effondrement de la fonction d\'onde',
    rarity: 'epic',
    set: 'quantum',
    icon_id: '💀',
    fx_preset: 'death_aura',
    sound_event: 'lich_whisper',
    theme_color: '#4B0082',
    output_modes: {
      literary: 'Seigneur mort-vivant défiant les lois de la réalité',
      runic: 'ᛚᛁᚲᚺᛖ᛫ᚲᚢᚨᚾᛏᛁᚲᚢᛖ',
      iconic: '💀⚛️🔮'
    }
  },

  // === CRÉATURES ÉPIQUES ===
  quantum_knight: {
    id: 'quantum_knight',
    name: 'Chevalier Quantique',
    tier: 2,
    cost: 4,
    attack: 4,
    defense: 4,
    health: 4,
    abilities: ['superposition_défensive', 'frappe_probabiliste'],
    energy_complex: {
      A: 30,
      phi: 0.7
    },
    special: 'Peut parer et attaquer dans le même instant quantique',
    flavor: 'Guerrier existant dans plusieurs états de combat simultanément',
    rarity: 'rare',
    set: 'quantum',
    icon_id: '⚔️',
    fx_preset: 'pulse',
    sound_event: 'sword_clash',
    theme_color: '#4169E1',
    output_modes: {
      literary: 'Guerrier existant dans plusieurs états de combat simultanément',
      runic: 'ᚲᚺᛖᚹᚨᛚᛁᛖᚱ᛫ᚲᚢᚨᚾᛏᛁᚲᚢᛖ',
      iconic: '⚔️🛡️⚛️'
    }
  },

  phase_dragon: {
    id: 'phase_dragon',
    name: 'Dragon de Phase',
    tier: 2,
    cost: 5,
    attack: 5,
    defense: 3,
    health: 5,
    abilities: ['phase_shift', 'souffle_dimensionnel'],
    energy_complex: {
      A: 40,
      phi: 0.75
    },
    special: 'Traverse les dimensions pour éviter les attaques',
    flavor: 'Ses écailles scintillent entre les réalités',
    rarity: 'epic',
    set: 'quantum',
    icon_id: '🐉',
    fx_preset: 'phase_shift',
    sound_event: 'dragon_breath',
    theme_color: '#9370DB',
    output_modes: {
      literary: 'Dragon glissant entre les dimensions',
      runic: 'ᛞᚱᚨᚷᛟᚾ᛫ᛞᛖ᛫ᛈᚺᚨᛊᛖ',
      iconic: '🐉🌀✨'
    }
  },

  probability_spider: {
    id: 'probability_spider',
    name: 'Araignée de Probabilité',
    tier: 1,
    cost: 3,
    attack: 3,
    defense: 2,
    health: 2,
    abilities: ['toile_causale', 'vision_futurs'],
    energy_complex: {
      A: 15,
      phi: 0.6
    },
    special: 'Prédit 3 futurs possibles au début du tour',
    flavor: 'Ses toiles prédisent 1024 futurs simultanés',
    rarity: 'common',
    set: 'quantum',
    icon_id: '🕷️',
    fx_preset: 'web_spread',
    sound_event: 'spider_hiss',
    theme_color: '#808080',
    output_modes: {
      literary: 'Ses toiles prédisent 1024 futurs simultanés',
      runic: 'ᚨᚱᚨᛁᚷᚾéᛖ᛫ᛞᛖ᛫ᛈᚱᛟᛒᚨᛒᛁᛚ',
      iconic: '🕷️🕸️🎲'
    }
  },

  // === CRÉATURES RARES ===
  temporal_griffin: {
    id: 'temporal_griffin',
    name: 'Griffon Temporel',
    tier: 2,
    cost: 6,
    attack: 6,
    defense: 5,
    health: 6,
    abilities: ['vol', 'vision_temporelle'],
    energy_complex: {
      A: 50,
      phi: 0.8
    },
    special: 'Voit 2 tours dans le futur',
    flavor: 'Gardien des portes temporelles',
    rarity: 'rare',
    set: 'temporal',
    icon_id: '🦅',
    fx_preset: 'wing_flap',
    sound_event: 'eagle_cry',
    theme_color: '#FFD700',
    output_modes: {
      literary: 'Créature majestueuse gardant les passages temporels',
      runic: 'ᚷᚱᛁᚠᚠᛟᚾ',
      iconic: '🦅⏳👁️'
    }
  },

  quantum_hydra: {
    id: 'quantum_hydra',
    name: 'Hydre Quantique',
    tier: 3,
    cost: 7,
    attack: 3,
    defense: 6,
    health: 9,
    abilities: ['régénération_quantique', 'têtes_multiples'],
    special: 'Gagne une tête dans une dimension parallèle quand blessée',
    flavor: 'Chaque tête coupée se régénère dans une autre timeline',
    rarity: 'rare',
    set: 'quantum',
    icon_id: '🐉',
    fx_preset: 'regeneration',
    sound_event: 'hydra_hiss',
    theme_color: '#228B22',
    output_modes: {
      literary: 'Monstre à plusieurs têtes défiant la mort',
      runic: 'ᚺᚤᛞᚱᛖ',
      iconic: '🐉🐉🐉'
    }
  },

  stone_golem: {
    id: 'stone_golem',
    name: 'Golem de Pierre',
    tier: 2,
    cost: 5,
    attack: 4,
    defense: 8,
    health: 8,
    abilities: ['immobilité', 'peau_de_pierre'],
    special: 'Immunité aux sorts de tier 1',
    flavor: 'Gardien ancestral des temples oubliés',
    rarity: 'rare',
    set: 'ancient',
    icon_id: '🗿',
    fx_preset: 'earth_shake',
    sound_event: 'stone_rumble',
    theme_color: '#8B7355',
    output_modes: {
      literary: 'Colosse de pierre animé par magie ancienne',
      runic: 'ᚷᛟᛚᛖᛗ',
      iconic: '🗿💎⛰️'
    }
  },

  fire_elemental: {
    id: 'fire_elemental',
    name: 'Élémentaire de Feu',
    tier: 2,
    cost: 4,
    attack: 6,
    defense: 2,
    health: 4,
    abilities: ['immolation', 'immunité_feu'],
    special: 'Inflige 1 dégât à tous les ennemis adjacents',
    flavor: 'Incarnation vivante de la flamme primordiale',
    rarity: 'rare',
    set: 'elemental',
    icon_id: '🔥',
    fx_preset: 'fire_aura',
    sound_event: 'fire_crackle',
    theme_color: '#FF4500',
    output_modes: {
      literary: 'Être de pure flamme consumant tout sur son passage',
      runic: 'ᛖᛚᛖᛗᛖᚾᛏᚨᛁᚱᛖ',
      iconic: '🔥🔥🔥'
    }
  },

  // === CRÉATURES COMMUNES ===
  quantum_wisp: {
    id: 'quantum_wisp',
    name: 'Luciole Quantique',
    tier: 1,
    cost: 2,
    attack: 2,
    defense: 1,
    health: 1,
    abilities: ['vol', 'phase_shift'],
    energy_complex: {
      A: 10,
      phi: 0.5
    },
    quantum_state: 'superposition',
    flavor: 'Fragments de lumière consciente naviguant entre les époques',
    rarity: 'common',
    set: 'quantum',
    icon_id: '✨',
    fx_preset: 'sparkle',
    sound_event: 'wisp_float',
    theme_color: '#ADD8E6',
    output_modes: {
      literary: 'Fragments de lumière consciente naviguant entre les époques',
      runic: 'ᛚᚢᚲᛁᛟᛚᛖ',
      iconic: '✨💫🌟'
    }
  },

  temporal_rat: {
    id: 'temporal_rat',
    name: 'Rat Temporel',
    tier: 1,
    cost: 1,
    attack: 1,
    defense: 1,
    health: 1,
    abilities: ['bond_temporel'],
    special: 'Peut revenir 1 tour dans le passé une fois',
    flavor: 'Rongeur sautant entre les secondes',
    rarity: 'common',
    set: 'temporal',
    icon_id: '🐀',
    fx_preset: 'quick_move',
    sound_event: 'rat_squeak',
    theme_color: '#696969',
    output_modes: {
      literary: 'Petit rongeur bondissant à travers le temps',
      runic: 'ᚱᚨᛏ',
      iconic: '🐀⏰💨'
    }
  },

  ghost_warrior: {
    id: 'ghost_warrior',
    name: 'Guerrier Fantôme',
    tier: 1,
    cost: 3,
    attack: 3,
    defense: 2,
    health: 3,
    abilities: ['intangible', 'frappe_spectrale'],
    special: '50% de chance d\'éviter les attaques physiques',
    flavor: 'Écho d\'un guerrier tombé au combat',
    rarity: 'common',
    set: 'spectral',
    icon_id: '👻',
    fx_preset: 'fade_in_out',
    sound_event: 'ghost_whisper',
    theme_color: '#B0C4DE',
    output_modes: {
      literary: 'Esprit guerrier errant entre les mondes',
      runic: 'ᚠᚨᚾᛏᛟᛗᛖ',
      iconic: '👻⚔️💨'
    }
  },

  crystal_beetle: {
    id: 'crystal_beetle',
    name: 'Scarabée de Cristal',
    tier: 1,
    cost: 2,
    attack: 1,
    defense: 3,
    health: 2,
    abilities: ['carapace_cristalline'],
    special: 'Gagne +1/+1 pour chaque cristal que vous possédez',
    flavor: 'Se nourrit d\'énergie cristalline pure',
    rarity: 'common',
    set: 'crystal',
    icon_id: '🪲',
    fx_preset: 'crystal_shine',
    sound_event: 'crystal_chime',
    theme_color: '#9370DB',
    output_modes: {
      literary: 'Insecte aux reflets cristallins',
      runic: 'ᛊᚲᚨᚱᚨᛒᛖᛖ',
      iconic: '🪲💎✨'
    }
  },

  shadow_wolf: {
    id: 'shadow_wolf',
    name: 'Loup des Ombres',
    tier: 1,
    cost: 3,
    attack: 4,
    defense: 2,
    health: 2,
    abilities: ['célérité', 'morsure_ténébreuse'],
    special: 'Invisible dans l\'obscurité',
    flavor: 'Prédateur silencieux des royaumes sombres',
    rarity: 'common',
    set: 'shadow',
    icon_id: '🐺',
    fx_preset: 'shadow_step',
    sound_event: 'wolf_howl',
    theme_color: '#2F4F4F',
    output_modes: {
      literary: 'Loup chassant dans les ténèbres',
      runic: 'ᛚᛟᚢᛈ',
      iconic: '🐺🌑💨'
    }
  },

  sky_eagle: {
    id: 'sky_eagle',
    name: 'Aigle Céleste',
    tier: 1,
    cost: 2,
    attack: 2,
    defense: 1,
    health: 2,
    abilities: ['vol', 'vue_perçante'],
    special: 'Révèle les cartes cachées de l\'adversaire',
    flavor: 'Messager des cieux',
    rarity: 'common',
    set: 'sky',
    icon_id: '🦅',
    fx_preset: 'soar',
    sound_event: 'eagle_cry',
    theme_color: '#87CEEB',
    output_modes: {
      literary: 'Rapace majestueux survolant les champs de bataille',
      runic: 'ᚨᛁᚷᛚᛖ',
      iconic: '🦅☁️👁️'
    }
  },

  swamp_troll: {
    id: 'swamp_troll',
    name: 'Troll des Marais',
    tier: 2,
    cost: 4,
    attack: 5,
    defense: 4,
    health: 5,
    abilities: ['régénération', 'puanteur'],
    special: 'Régénère 2 PV par tour',
    flavor: 'La puanteur arrive avant lui',
    rarity: 'common',
    set: 'swamp',
    icon_id: '👹',
    fx_preset: 'stench',
    sound_event: 'troll_grunt',
    theme_color: '#556B2F',
    output_modes: {
      literary: 'Créature putride des marécages',
      runic: 'ᛏᚱᛟᛚᛚ',
      iconic: '👹🦠💚'
    }
  },

  ice_sprite: {
    id: 'ice_sprite',
    name: 'Esprit de Glace',
    tier: 1,
    cost: 2,
    attack: 2,
    defense: 2,
    health: 2,
    abilities: ['gel', 'immunité_glace'],
    special: 'Ralentit les ennemis touchés',
    flavor: 'Né des premiers flocons de l\'hiver éternel',
    rarity: 'common',
    set: 'ice',
    icon_id: '❄️',
    fx_preset: 'frost',
    sound_event: 'ice_crack',
    theme_color: '#B0E0E6',
    output_modes: {
      literary: 'Esprit élémentaire de glace pure',
      runic: 'ᛖᛊᛈᚱᛁᛏ',
      iconic: '❄️👻💨'
    }
  },

  lightning_serpent: {
    id: 'lightning_serpent',
    name: 'Serpent de Foudre',
    tier: 2,
    cost: 4,
    attack: 5,
    defense: 2,
    health: 3,
    abilities: ['célérité', 'frappe_foudroyante'],
    special: 'Attaque en chaîne sur 3 ennemis',
    flavor: 'Né d\'un éclair frappant la terre',
    rarity: 'common',
    set: 'storm',
    icon_id: '🐍',
    fx_preset: 'lightning_strike',
    sound_event: 'thunder',
    theme_color: '#FFD700',
    output_modes: {
      literary: 'Serpent fait de pure électricité',
      runic: 'ᛊᛖᚱᛈᛖᚾᛏ',
      iconic: '🐍⚡💥'
    }
  },

  basilisk: {
    id: 'basilisk',
    name: 'Basilic',
    tier: 2,
    cost: 5,
    attack: 4,
    defense: 3,
    health: 4,
    abilities: ['regard_pétrifiant', 'venin_mortel'],
    special: 'Tue instantanément les créatures de tier 1',
    flavor: 'Un seul regard suffit',
    rarity: 'rare',
    set: 'ancient',
    icon_id: '🐍',
    fx_preset: 'petrify',
    sound_event: 'basilisk_hiss',
    theme_color: '#8B4513',
    output_modes: {
      literary: 'Serpent légendaire au regard mortel',
      runic: 'ᛒᚨᛊᛁᛚᛁᛊᚲ',
      iconic: '🐍👁️🗿'
    }
  }
};

// Fonctions utilitaires
export function getCreatureById(id: string): Creature | undefined {
  return CREATURES[id];
}

export function getCreaturesByTier(tier: number): Creature[] {
  return Object.values(CREATURES).filter(creature => creature.tier === tier);
}

export function getCreaturesByRarity(rarity: Creature['rarity']): Creature[] {
  return Object.values(CREATURES).filter(creature => creature.rarity === rarity);
}

export function getCreaturesBySet(set: string): Creature[] {
  return Object.values(CREATURES).filter(creature => creature.set === set);
}

export function getAllCreatures(): Creature[] {
  return Object.values(CREATURES);
}

export function getCreatureCount(): number {
  return Object.keys(CREATURES).length;
}

// Export des catégories
export const LEGENDARY_CREATURES = getCreaturesByRarity('legendary');
export const EPIC_CREATURES = getCreaturesByRarity('epic');
export const RARE_CREATURES = getCreaturesByRarity('rare');
export const COMMON_CREATURES = getCreaturesByRarity('common');

// Stats globales
export const CREATURES_STATS = {
  total: getCreatureCount(),
  legendary: LEGENDARY_CREATURES.length,
  epic: EPIC_CREATURES.length,
  rare: RARE_CREATURES.length,
  common: COMMON_CREATURES.length,
  sets: [...new Set(Object.values(CREATURES).map(c => c.set))],
  averageStats: {
    attack: Math.round(Object.values(CREATURES).reduce((acc, c) => acc + c.attack, 0) / getCreatureCount()),
    defense: Math.round(Object.values(CREATURES).reduce((acc, c) => acc + c.defense, 0) / getCreatureCount()),
    health: Math.round(Object.values(CREATURES).reduce((acc, c) => acc + c.health, 0) / getCreatureCount()),
    cost: Math.round(Object.values(CREATURES).reduce((acc, c) => acc + c.cost, 0) / getCreatureCount())
  }
};
