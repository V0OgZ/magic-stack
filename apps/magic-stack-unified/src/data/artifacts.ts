/**
 * 🗡️ ARTEFACTS CENTRALISÉS - Tous les artefacts du jeu
 * 
 * Source de vérité unique pour tous les artefacts de Heroes of Time
 * Compilé depuis : hot/items/artifacts.json et Treasures/
 */

export interface Artifact {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'temporal' | 'quantum' | 'navigation' | 'grofi' | 
        'container' | 'vision' | 'stabilizer' | 'knowledge' | 'key' | 'tool' | 
        'power_source' | 'light' | 'consumable' | 'magic' | 'utility' | 'buff';
  tier: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  cost: number;
  effects: Record<string, any>;
  description: string;
  flavor?: string;
  set?: string;
  icon_id: string;
  fx_preset: string;
  sound_event: string;
  theme_color: string;
  output_modes: {
    literary: string;
    runic: string;
    iconic: string;
  };
  formula?: string;  // Pour les artefacts avec formules HOTS
  category?: string;
  rarity?: string;   // Alternative à tier pour certains artefacts
}

// === LES ARTEFACTS COMPLETS (30+) ===
export const ARTIFACTS: Record<string, Artifact> = {
  
  // === ARTEFACTS MYTHIQUES ===
  excalibur_quantum: {
    id: 'excalibur_quantum',
    name: 'Excalibur Quantique',
    type: 'weapon',
    tier: 'mythic',
    cost: 7,
    effects: {
      attack_bonus: 5,
      reality_cut: true,
      king_authority: true
    },
    description: 'L\'épée légendaire forgée dans le feu quantique',
    flavor: 'Seul le vrai roi peut la brandir',
    set: 'arthurian',
    icon_id: '⚔️',
    fx_preset: 'excalibur_shine',
    sound_event: 'excalibur_draw',
    theme_color: '#FFD700',
    output_modes: {
      literary: 'L\'épée légendaire forgée dans le feu quantique',
      runic: 'ᛖᛉᚲᚨᛚᛁᛒᚢᚱ᛫ᚲᚢᚨᚾᛏᛁᚲᚢᛖ',
      iconic: '⚔️✨👑'
    }
  },

  infinity_codex: {
    id: 'infinity_codex',
    name: 'Codex de l\'Infini',
    type: 'knowledge',
    tier: 'mythic',
    cost: 10,
    effects: {
      all_spells: true,
      infinite_knowledge: true,
      madness_risk: 0.3
    },
    description: 'Contient tout le savoir de toutes les timelines',
    flavor: 'Certaines connaissances ne sont pas faites pour les mortels',
    set: 'forbidden',
    icon_id: '📖',
    fx_preset: 'knowledge_aura',
    sound_event: 'book_open',
    theme_color: '#4B0082',
    output_modes: {
      literary: 'Contient tout le savoir de toutes les timelines',
      runic: 'ᚲᛟᛞᛖᛉ᛫ᛞᛖ᛫ᛚ\'ᛁᚾᚠᛁᚾᛁ',
      iconic: '📖♾️🧠'
    }
  },

  infinity_core: {
    id: 'infinity_core',
    name: 'Cœur de l\'Infini',
    type: 'power_source',
    tier: 'mythic',
    cost: 15,
    effects: {
      infinite_energy: true,
      master_of_time: true,
      reality_rewrite: true
    },
    description: 'La source de pouvoir ultime',
    flavor: 'Au commencement était le Cœur, et le Cœur était Temps',
    set: 'endgame',
    icon_id: '💎',
    fx_preset: 'infinity_pulse',
    sound_event: 'power_surge',
    theme_color: '#FF00FF',
    output_modes: {
      literary: 'La source de pouvoir ultime',
      runic: 'ᚲœᚢᚱ᛫ᛞᛖ᛫ᛚ\'ᛁᚾᚠᛁᚾᛁ',
      iconic: '💎♾️⚡'
    }
  },

  grofi_omega: {
    id: 'grofi_omega',
    name: 'Omega Final',
    type: 'grofi',
    tier: 'mythic',
    cost: 8,
    effects: {
      absolute_control: true,
      timeline_mastery: true,
      end_game: true
    },
    description: 'Contrôle absolu sur la fin des temps',
    flavor: 'La fin justifie les moyens temporels',
    set: 'grofi',
    icon_id: 'Ω',
    fx_preset: 'omega_wave',
    sound_event: 'reality_end',
    theme_color: '#8B0000',
    output_modes: {
      literary: 'Contrôle absolu sur la fin des temps',
      runic: 'ᛟᛗᛖᚷᚨ᛫ᚠᛁᚾᚨᛚ',
      iconic: 'Ω⏳💀'
    }
  },

  // === ARTEFACTS LÉGENDAIRES ===
  chrono_crystal: {
    id: 'chrono_crystal',
    name: 'Cristal Chronologique',
    type: 'temporal',
    tier: 'legendary',
    cost: 5,
    effects: {
      drift_reduction: 0.2,
      tw_bonus: 2,
      energy_complex: {
        A: 20,
        phi: 0.1
      }
    },
    description: 'Réduit la dérive temporelle et synchronise les timelines',
    flavor: 'Le temps s\'écoule différemment autour de ce cristal',
    set: 'core',
    icon_id: '💎',
    fx_preset: 'crystal_glow',
    sound_event: 'crystal_chime',
    theme_color: '#00CED1',
    output_modes: {
      literary: 'Réduit la dérive temporelle et synchronise les timelines',
      runic: 'ᚲᚱᛁᛊᛏᚨᛚ᛫ᚲᚺᚱᛟᚾᛟᛚᛟᚷᛁᚲᚢ',
      iconic: '💎⏳✨'
    }
  },

  grofi_sigma: {
    id: 'grofi_sigma',
    name: 'Sigma de Jean',
    type: 'grofi',
    tier: 'legendary',
    cost: 6,
    effects: {
      chaos_reduction: 0.5,
      philosophy_bonus: 3,
      question_reality: true
    },
    description: 'Réduit le chaos quantique par la philosophie',
    flavor: 'Mais au fond, qu\'est-ce que le chaos?',
    set: 'grofi',
    icon_id: 'Σ',
    fx_preset: 'philosophy_aura',
    sound_event: 'hmm',
    theme_color: '#8B4513',
    output_modes: {
      literary: 'Réduit le chaos quantique par la philosophie',
      runic: 'ᛊᛁᚷᛗᚨ᛫ᛞᛖ᛫ᛃᛖᚨᚾ',
      iconic: 'Σ🤔💭'
    }
  },

  schrodinger_box: {
    id: 'schrodinger_box',
    name: 'Boîte de Schrödinger',
    type: 'container',
    tier: 'legendary',
    cost: 5,
    effects: {
      superposition: true,
      alive_dead: '50/50',
      paradox_generator: true
    },
    description: 'Contient un état indéterminé jusqu\'à observation',
    flavor: 'Ne l\'ouvrez pas... ou ouvrez-la?',
    set: 'quantum',
    icon_id: '📦',
    fx_preset: 'quantum_blur',
    sound_event: 'box_mystery',
    theme_color: '#9370DB',
    output_modes: {
      literary: 'Contient un état indéterminé jusqu\'à observation',
      runic: 'ᛒᛟîᛏᛖ᛫ᛞᛖ᛫ᛊᚲᚺᚱöᛞᛁᚾᚷᛖᚱ',
      iconic: '📦🐱❓'
    }
  },

  paradox_resolver: {
    id: 'paradox_resolver',
    name: 'Résolveur de Paradoxes',
    type: 'tool',
    tier: 'legendary',
    cost: 6,
    effects: {
      auto_resolve: true,
      debt_reduction: 0.5,
      timeline_repair: true
    },
    description: 'Résout automatiquement les paradoxes mineurs',
    flavor: 'Parfois, la meilleure solution est de ne pas y penser',
    set: 'core',
    icon_id: '🔧',
    fx_preset: 'paradox_fix',
    sound_event: 'problem_solve',
    theme_color: '#FF6347',
    output_modes: {
      literary: 'Résout automatiquement les paradoxes mineurs',
      runic: 'ᚱéᛊᛟᛚᚹᛖᚢᚱ᛫ᛞᛖ᛫ᛈᚨᚱᚨᛞᛟᛉ',
      iconic: '🔧♾️✅'
    }
  },

  mother_stone: {
    id: 'mother_stone',
    name: 'Mother Stone',
    type: 'power_source',
    tier: 'legendary',
    cost: 8,
    effects: {
      reality_anchor: true,
      all_elements: true,
      creation_power: true
    },
    description: 'La pierre originelle de création',
    flavor: 'Avant le temps, il y avait la Pierre',
    set: 'primordial',
    icon_id: '🗿',
    fx_preset: 'primordial_energy',
    sound_event: 'ancient_power',
    theme_color: '#2F4F4F',
    output_modes: {
      literary: 'La pierre originelle de création',
      runic: 'ᛗᛟᛏᚺᛖᚱ᛫ᛊᛏᛟᚾᛖ',
      iconic: '🗿🌍✨'
    }
  },

  // === ARTEFACTS ÉPIQUES ===
  quantum_lens: {
    id: 'quantum_lens',
    name: 'Lentille Quantique',
    type: 'quantum',
    tier: 'epic',
    cost: 4,
    effects: {
      coherence_boost: 0.1,
      phi_multiplier: 1.2,
      vision_range: 5
    },
    description: 'Augmente la cohérence quantique et révèle les probabilités',
    flavor: 'Voir à travers les voiles de la réalité',
    set: 'core',
    icon_id: '🔍',
    fx_preset: 'quantum_vision',
    sound_event: 'lens_focus',
    theme_color: '#4169E1',
    output_modes: {
      literary: 'Augmente la cohérence quantique et révèle les probabilités',
      runic: 'ᛚᛖᚾᛏᛁᛚᛚᛖ᛫ᚲᚢᚨᚾᛏᛁᚲᚢᛖ',
      iconic: '🔍⚛️👁️'
    }
  },

  causal_compass: {
    id: 'causal_compass',
    name: 'Boussole Causale',
    type: 'navigation',
    tier: 'epic',
    cost: 3,
    effects: {
      fog_vision: 10,
      paradox_immunity: 0.5,
      pathfinding: true
    },
    description: 'Navigue à travers le brouillard de causalité',
    flavor: 'Pointe toujours vers le destin',
    set: 'core',
    icon_id: '🧭',
    fx_preset: 'compass_spin',
    sound_event: 'compass_click',
    theme_color: '#DAA520',
    output_modes: {
      literary: 'Navigue à travers le brouillard de causalité',
      runic: 'ᛒᛟᚢᛊᛊᛟᛚᛖ᛫ᚲᚨᚢᛊᚨᛚᛖ',
      iconic: '🧭🗺️✨'
    }
  },

  wigner_eye: {
    id: 'wigner_eye',
    name: 'Œil de Wigner',
    type: 'vision',
    tier: 'epic',
    cost: 4,
    effects: {
      observer_effect: true,
      collapse_wave: true,
      true_sight: 15
    },
    description: 'L\'observation modifie la réalité',
    flavor: 'L\'ami de Wigner voit tout différemment',
    set: 'quantum',
    icon_id: '👁️',
    fx_preset: 'observer_gaze',
    sound_event: 'reality_shift',
    theme_color: '#8A2BE2',
    output_modes: {
      literary: 'L\'observation modifie la réalité',
      runic: 'Œᛁᛚ᛫ᛞᛖ᛫ᚹᛁᚷᚾᛖᚱ',
      iconic: '👁️⚛️🌀'
    }
  },

  temporal_key: {
    id: 'temporal_key',
    name: 'Clé Temporelle',
    type: 'key',
    tier: 'epic',
    cost: 4,
    effects: {
      portal_access: true,
      timeline_shift: true,
      unlock_hidden: true
    },
    description: 'Ouvre les portes entre les époques',
    flavor: 'Toutes les serrures, à travers tous les temps',
    set: 'core',
    icon_id: '🗝️',
    fx_preset: 'key_glow',
    sound_event: 'lock_open',
    theme_color: '#B8860B',
    output_modes: {
      literary: 'Ouvre les portes entre les époques',
      runic: 'ᚲᛚé᛫ᛏᛖᛗᛈᛟᚱᛖᛚᛚᛖ',
      iconic: '🗝️🚪⏳'
    }
  },

  time_anchor: {
    id: 'time_anchor',
    name: 'Ancre Temporelle',
    type: 'stabilizer',
    tier: 'epic',
    cost: 5,
    effects: {
      no_drift: true,
      time_freeze: 3,
      temporal_shield: true
    },
    description: 'Gèle le temps local pendant 3 tours',
    flavor: 'Le temps s\'arrête pour ceux qui savent l\'ancrer',
    set: 'core',
    icon_id: '⚓',
    fx_preset: 'time_stop',
    sound_event: 'clock_stop',
    theme_color: '#4682B4',
    output_modes: {
      literary: 'Gèle le temps local pendant 3 tours',
      runic: 'ᚨᚾᚲᚱᛖ᛫ᛏᛖᛗᛈᛟᚱᛖᛚᛚᛖ',
      iconic: '⚓⏱️🛡️'
    }
  },

  teleport_ring: {
    id: 'teleport_ring',
    name: 'Anneau de Téléportation',
    type: 'utility',
    tier: 'epic',
    cost: 4,
    effects: {
      instant_teleport: true,
      range: 'unlimited',
      cooldown: 3
    },
    description: 'Téléporte le héros instantanément',
    formula: 'TELEPORT_HERO(hero, target_x, target_y) + CREATE_EFFECT(teleport_flash, 1)',
    set: 'magic',
    icon_id: '💍',
    fx_preset: 'teleport_flash',
    sound_event: 'teleport_sound',
    theme_color: '#9932CC',
    output_modes: {
      literary: 'Téléporte instantanément n\'importe où',
      runic: 'ᚨᚾᚾᛖᚨᚢ᛫ᛏéᛚéᛈᛟᚱᛏ',
      iconic: '💍🌀✨'
    }
  },

  experience_amulet: {
    id: 'experience_amulet',
    name: 'Amulette d\'Expérience',
    type: 'buff',
    tier: 'epic',
    cost: 3,
    effects: {
      xp_multiplier: 2,
      duration: 5,
      wisdom_bonus: true
    },
    description: 'Double l\'expérience gagnée pendant 5 tours',
    formula: 'APPLY_BUFF(hero, double_xp, 5) + CREATE_EFFECT(wisdom_aura, 5)',
    set: 'progression',
    icon_id: '📿',
    fx_preset: 'wisdom_aura',
    sound_event: 'level_up',
    theme_color: '#FFD700',
    output_modes: {
      literary: 'Accélère l\'apprentissage et la progression',
      runic: 'ᚨᛗᚢᛚᛖᛏᛏᛖ᛫ᛖᛉᛈ',
      iconic: '📿📈✨'
    }
  },

  // === ARTEFACTS RARES ===
  reality_anchor: {
    id: 'reality_anchor',
    name: 'Ancre de Réalité',
    type: 'stabilizer',
    tier: 'rare',
    cost: 3,
    effects: {
      no_drift: true,
      stability: 1.0,
      paradox_resistance: 0.8
    },
    description: 'Fixe la réalité locale contre les dérives',
    flavor: 'Un point fixe dans l\'océan du chaos',
    set: 'core',
    icon_id: '⚓',
    fx_preset: 'stability_field',
    sound_event: 'anchor_drop',
    theme_color: '#708090',
    output_modes: {
      literary: 'Fixe la réalité locale contre les dérives',
      runic: 'ᚨᚾᚲᚱᛖ᛫ᛞᛖ᛫ᚱéᚨᛚᛁᛏé',
      iconic: '⚓🌍🔒'
    }
  },

  causality_flame: {
    id: 'causality_flame',
    name: 'Flamme de Causalité',
    type: 'light',
    tier: 'rare',
    cost: 3,
    effects: {
      reveal_paths: true,
      burn_paradoxes: true,
      light_radius: 8
    },
    description: 'Brûle les paradoxes et révèle les chemins causaux',
    flavor: 'La lumière qui montre ce qui doit être',
    set: 'core',
    icon_id: '🔥',
    fx_preset: 'causality_burn',
    sound_event: 'fire_crackle',
    theme_color: '#FF4500',
    output_modes: {
      literary: 'Brûle les paradoxes et révèle les chemins causaux',
      runic: 'ᚠᛚᚨᛗᛗᛖ᛫ᛞᛖ᛫ᚲᚨᚢᛊᚨᛚᛁᛏé',
      iconic: '🔥🔀💡'
    }
  },

  magic_shield: {
    id: 'magic_shield',
    name: 'Bouclier Magique',
    type: 'armor',
    tier: 'rare',
    cost: 3,
    effects: {
      magic_resistance: 0.5,
      reflect_damage: 0.2,
      barrier_hp: 30
    },
    description: 'Protège contre les attaques magiques',
    formula: 'CREATE_PROTECTIVE_BARRIER(hero, 3) + REFLECT_DAMAGE(0.2)',
    set: 'defense',
    icon_id: '🛡️',
    fx_preset: 'magic_barrier',
    sound_event: 'shield_up',
    theme_color: '#4169E1',
    output_modes: {
      literary: 'Barrière mystique contre la magie',
      runic: 'ᛒᛟᚢᚲᛚᛁᛖᚱ᛫ᛗᚨᚷᛁᚲᚢᛖ',
      iconic: '🛡️✨🔮'
    }
  },

  fireball_scroll: {
    id: 'fireball_scroll',
    name: 'Parchemin Boule de Feu',
    type: 'magic',
    tier: 'rare',
    cost: 3,
    effects: {
      damage: 40,
      area: 2,
      burn: true
    },
    description: 'Lance une boule de feu destructrice',
    formula: 'AREA_DAMAGE(target, 2, 40) + CREATE_EFFECT(fire_explosion, 3)',
    set: 'spells',
    icon_id: '📜',
    fx_preset: 'fireball_cast',
    sound_event: 'fire_whoosh',
    theme_color: '#FF6347',
    output_modes: {
      literary: 'Parchemin ancien d\'un sort de feu',
      runic: 'ᛈᚨᚱᚲᚺᛖᛗᛁᚾ᛫ᚠᛖᚢ',
      iconic: '📜🔥💥'
    }
  },

  resurrection_gem: {
    id: 'resurrection_gem',
    name: 'Gemme de Résurrection',
    type: 'consumable',
    tier: 'rare',
    cost: 5,
    effects: {
      resurrect: true,
      hp_restored: 0.5,
      one_use: true
    },
    description: 'Ramène un héros tombé avec 50% de vie',
    formula: 'RESURRECT_HERO(target) + HEAL(target, 0.5) + DESTROY_SELF()',
    set: 'life',
    icon_id: '💎',
    fx_preset: 'resurrection_light',
    sound_event: 'angel_choir',
    theme_color: '#98FB98',
    output_modes: {
      literary: 'Cristal contenant l\'essence de vie',
      runic: 'ᚷᛖᛗᛗᛖ᛫ᚱᛖᛊᚢᚱᚱᛖᚲᛏᛁᛟᚾ',
      iconic: '💎💚✨'
    }
  },

  // === ARTEFACTS COMMUNS ===
  iron_sword: {
    id: 'iron_sword',
    name: 'Épée de Fer',
    type: 'weapon',
    tier: 'common',
    cost: 1,
    effects: {
      attack_bonus: 2,
      durability: 100
    },
    description: 'Arme basique de guerrier',
    formula: 'MODIFY_ENERGY(target, -30) + CREATE_EFFECT(slash_damage, 1)',
    set: 'basic',
    icon_id: '🗡️',
    fx_preset: 'sword_swing',
    sound_event: 'sword_slash',
    theme_color: '#C0C0C0',
    output_modes: {
      literary: 'Simple épée forgée en fer',
      runic: 'éᛈéᛖ᛫ᚠᛖᚱ',
      iconic: '🗡️⚔️'
    }
  },

  healing_potion: {
    id: 'healing_potion',
    name: 'Potion de Soin',
    type: 'consumable',
    tier: 'common',
    cost: 1,
    effects: {
      heal: 50,
      instant: true,
      one_use: true
    },
    description: 'Restaure la santé du héros',
    formula: 'MODIFY_ENERGY(hero, 50) + CREATE_EFFECT(healing_glow, 2)',
    set: 'consumables',
    icon_id: '🧪',
    fx_preset: 'heal_sparkle',
    sound_event: 'potion_drink',
    theme_color: '#FF69B4',
    output_modes: {
      literary: 'Fiole remplie d\'élixir de vie',
      runic: 'ᛈᛟᛏᛁᛟᚾ᛫ᛊᛟᛁᚾ',
      iconic: '🧪❤️✨'
    }
  },

  // === ARTEFACTS GROFI SPÉCIAUX ===
  grofi_chaos: {
    id: 'grofi_chaos',
    name: 'Chaos de Vince',
    type: 'grofi',
    tier: 'epic',
    cost: 5,
    effects: {
      chaos_amplification: 2.0,
      random_effects: true,
      unpredictable: true
    },
    description: 'Amplifie le chaos et l\'imprévisibilité',
    flavor: 'Le chaos n\'est qu\'un ordre incompris',
    set: 'grofi',
    icon_id: '🌀',
    fx_preset: 'chaos_storm',
    sound_event: 'reality_tear',
    theme_color: '#8B008B',
    output_modes: {
      literary: 'Artefact qui embrasse le chaos total',
      runic: 'ᚲᚺᚨᛟᛊ᛫ᚹᛁᚾᛊᛖ',
      iconic: '🌀💥❓'
    }
  },

  grofi_dagger: {
    id: 'grofi_dagger',
    name: 'Dague de Renaissance',
    type: 'grofi',
    tier: 'legendary',
    cost: 6,
    effects: {
      instant_kill: true,
      resurrect_self: true,
      paradox_cost: 3
    },
    description: 'Tue et ressuscite dans le même instant',
    flavor: 'La mort n\'est qu\'un nouveau début',
    set: 'grofi',
    icon_id: '🗡️',
    fx_preset: 'death_rebirth',
    sound_event: 'soul_transfer',
    theme_color: '#2F4F4F',
    output_modes: {
      literary: 'Dague paradoxale de mort et renaissance',
      runic: 'ᛞᚨᚷᚢᛖ᛫ᚱᛖᚾᚨᛁᛊᛊᚨᚾᚲᛖ',
      iconic: '🗡️💀🔄'
    }
  },

  quantum_destroyer: {
    id: 'quantum_destroyer',
    name: 'Destructeur Quantique',
    type: 'weapon',
    tier: 'legendary',
    cost: 7,
    effects: {
      interference_destruction: true,
      collapse_superposition: true,
      erase_probability: true
    },
    description: 'Détruit par interférence destructive',
    flavor: 'Annule l\'existence même des possibilités',
    set: 'quantum',
    icon_id: '💥',
    fx_preset: 'quantum_collapse',
    sound_event: 'reality_shatter',
    theme_color: '#DC143C',
    output_modes: {
      literary: 'Arme qui efface les probabilités',
      runic: 'ᛞᛖᛊᛏᚱᚢᚲᛏᛖᚢᚱ',
      iconic: '💥⚛️🚫'
    }
  },

  quantum_amplifier: {
    id: 'quantum_amplifier',
    name: 'Amplificateur Quantique',
    type: 'tool',
    tier: 'epic',
    cost: 4,
    effects: {
      amplify_states: true,
      probability_boost: 2.0,
      coherence_time: 5
    },
    description: 'Amplifie les états quantiques',
    set: 'quantum',
    icon_id: '📡',
    fx_preset: 'quantum_boost',
    sound_event: 'energy_surge',
    theme_color: '#00CED1',
    output_modes: {
      literary: 'Amplifie les probabilités quantiques',
      runic: 'ᚨᛗᛈᛚᛁᚠᛁᚲᚨᛏᛖᚢᚱ',
      iconic: '📡⚛️⬆️'
    }
  }
};

// Fonctions utilitaires
export function getArtifactById(id: string): Artifact | undefined {
  return ARTIFACTS[id];
}

export function getArtifactsByTier(tier: Artifact['tier']): Artifact[] {
  return Object.values(ARTIFACTS).filter(artifact => artifact.tier === tier);
}

export function getArtifactsByType(type: Artifact['type']): Artifact[] {
  return Object.values(ARTIFACTS).filter(artifact => artifact.type === type);
}

export function getArtifactsBySet(set: string): Artifact[] {
  return Object.values(ARTIFACTS).filter(artifact => artifact.set === set);
}

export function getAllArtifacts(): Artifact[] {
  return Object.values(ARTIFACTS);
}

export function getArtifactCount(): number {
  return Object.keys(ARTIFACTS).length;
}

// Export des catégories
export const MYTHIC_ARTIFACTS = getArtifactsByTier('mythic');
export const LEGENDARY_ARTIFACTS = getArtifactsByTier('legendary');
export const EPIC_ARTIFACTS = getArtifactsByTier('epic');
export const RARE_ARTIFACTS = getArtifactsByTier('rare');
export const COMMON_ARTIFACTS = getArtifactsByTier('common');

// Artefacts spéciaux GROFI
export const GROFI_ARTIFACTS = getArtifactsBySet('grofi');

// Stats globales
export const ARTIFACTS_STATS = {
  total: getArtifactCount(),
  mythic: MYTHIC_ARTIFACTS.length,
  legendary: LEGENDARY_ARTIFACTS.length,
  epic: EPIC_ARTIFACTS.length,
  rare: RARE_ARTIFACTS.length,
  common: COMMON_ARTIFACTS.length,
  types: [...new Set(Object.values(ARTIFACTS).map(a => a.type))],
  sets: [...new Set(Object.values(ARTIFACTS).filter(a => a.set).map(a => a.set!))],
  averageCost: Math.round(
    Object.values(ARTIFACTS).reduce((acc, a) => acc + a.cost, 0) / getArtifactCount()
  )
};
