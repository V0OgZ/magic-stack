/**
 * 🦸 HÉROS CENTRALISÉS - Tous les 25 héros du jeu
 * 
 * Source de vérité unique pour tous les héros de Heroes of Time
 * Compilé depuis : hot/entities/ALL_HEROES_COMPLETE.json
 */

export interface Hero {
  id: string;
  name: string;
  title: string;
  class: string;
  tier: 'LEGENDARY' | 'EPIC' | 'RARE' | 'COMMON';
  icon_id: string;
  fx_preset: string;
  sound_event: string;
  theme_color: string;
  output_modes: {
    literary: string;
    runic: string;
    iconic: string;
  };
  stats: {
    attack: number;
    defense: number;
    health: number;
    mana: number;
    temporal_energy?: number;
    quantum_affinity?: number;
  };
  abilities: Array<{
    id: string;
    name: string;
    cost: number;
    description: string;
  }>;
  description?: string;
  flavor?: string;
}

// === LES 25 HÉROS COMPLETS ===
export const HEROES: Record<string, Hero> = {
  // === HÉROS LÉGENDAIRES PRINCIPAUX (6) ===
  arthur_pendragon: {
    id: 'arthur_pendragon',
    name: 'Arthur Pendragon',
    title: 'Le Roi Temporel',
    class: 'Roi-Chevalier',
    tier: 'LEGENDARY',
    icon_id: '👑',
    fx_preset: 'artifact_shine',
    sound_event: 'excalibur_draw',
    theme_color: '#FFD700',
    output_modes: {
      literary: 'Le noble roi aux cheveux d\'or, porteur d\'Excalibur',
      runic: 'ᚨᚱᚦᚢᚱ᛫ᚱᛖᚷᚾᚨᚾᛏ',
      iconic: '👑⚔️⏳'
    },
    stats: {
      attack: 20,
      defense: 18,
      health: 180,
      mana: 150,
      temporal_energy: 100,
      quantum_affinity: 0.9
    },
    abilities: [
      {
        id: 'excalibur',
        name: 'Excalibur Quantique',
        cost: 3,
        description: 'Double les dégâts pour ce tour'
      },
      {
        id: 'table_ronde',
        name: 'Table Ronde',
        cost: 6,
        description: 'Invoque 3 chevaliers aléatoires'
      }
    ],
    flavor: 'Le temps plie devant ma volonté'
  },

  merlin: {
    id: 'merlin',
    name: 'Merlin',
    title: 'L\'Archimage Temporel',
    class: 'Mage',
    tier: 'LEGENDARY',
    icon_id: '🧙‍♂️',
    fx_preset: 'quantum_phase',
    sound_event: 'magic_cast',
    theme_color: '#9932CC',
    output_modes: {
      literary: 'Le vénérable archimage qui vit à rebours dans le temps',
      runic: 'ᛗᛖᚱᛚᛁᚾ᛫ᛏᛖᛗᛈᛟᚱᛖᛚ',
      iconic: '🧙‍♂️⏳✨'
    },
    stats: {
      attack: 15,
      defense: 12,
      health: 120,
      mana: 250,
      temporal_energy: 200,
      quantum_affinity: 0.95
    },
    abilities: [
      {
        id: 'time_reverse',
        name: 'Inversion Temporelle',
        cost: 4,
        description: 'Annule le dernier tour de l\'adversaire'
      },
      {
        id: 'prophecy',
        name: 'Prophétie',
        cost: 2,
        description: 'Révèle les 3 prochaines cartes'
      }
    ],
    description: 'Vit à rebours dans le temps, connaît le futur'
  },

  morgana: {
    id: 'morgana',
    name: 'Morgana',
    title: 'Tisseuse de Réalités',
    class: 'Sorcière',
    tier: 'LEGENDARY',
    icon_id: '🌙',
    fx_preset: 'temporal_glitch',
    sound_event: 'artifact_activate',
    theme_color: '#8B008B',
    output_modes: {
      literary: 'La mystérieuse conseillère des ombres',
      runic: 'ᛗᛟᚱᚷᚨᚾᚨ',
      iconic: '🌙🕸️✨'
    },
    stats: {
      attack: 18,
      defense: 14,
      health: 140,
      mana: 200,
      temporal_energy: 150,
      quantum_affinity: 0.85
    },
    abilities: [
      {
        id: 'illusion',
        name: 'Illusion Quantique',
        cost: 3,
        description: 'Crée 2 copies d\'une unité'
      },
      {
        id: 'shadow_realm',
        name: 'Royaume des Ombres',
        cost: 5,
        description: 'Cache toutes vos unités pour 1 tour'
      }
    ]
  },

  lysandrel: {
    id: 'lysandrel',
    name: 'Lysandrel',
    title: 'Le Forgeron de Réalité',
    class: 'Reality Forger',
    tier: 'LEGENDARY',
    icon_id: '🔮',
    fx_preset: 'reality_distortion',
    sound_event: 'reality_forge',
    theme_color: '#FF6B6B',
    output_modes: {
      literary: 'Forge une seule réalité dominante parmi les possibles',
      runic: 'ᛚᚤᛊᚨᚾᛞᚱᛖᛚ',
      iconic: '🔮🔨🌌'
    },
    stats: {
      attack: 25,
      defense: 20,
      health: 180,
      mana: 300,
      temporal_energy: 300,
      quantum_affinity: 0.9
    },
    abilities: [
      {
        id: 'reality_forge',
        name: 'Forge de Réalité',
        cost: 6,
        description: 'Remplace le terrain par votre choix'
      },
      {
        id: 'collapse',
        name: 'Effondrement',
        cost: 4,
        description: 'Détruit toutes les illusions et copies'
      }
    ],
    description: 'Une seule réalité doit survivre'
  },

  ragnar_lothbrok: {
    id: 'ragnar_lothbrok',
    name: 'Ragnar Lothbrok',
    title: 'Le Chef de Guerre Temporel',
    class: 'Guerrier',
    tier: 'LEGENDARY',
    icon_id: '⚔️',
    fx_preset: 'blood_rage',
    sound_event: 'battle_cry',
    theme_color: '#8B0000',
    output_modes: {
      literary: 'Le guerrier viking qui traverse les époques',
      runic: 'ᚱᚨᚷᚾᚨᚱ᛫ᛚᛟᚦᛒᚱᛟᚲ',
      iconic: '⚔️🛡️🔥'
    },
    stats: {
      attack: 28,
      defense: 22,
      health: 200,
      mana: 80,
      temporal_energy: 50,
      quantum_affinity: 0.6
    },
    abilities: [
      {
        id: 'berserker',
        name: 'Rage du Berserker',
        cost: 3,
        description: '+10 attaque, -5 défense pour 2 tours'
      },
      {
        id: 'valhalla',
        name: 'Appel du Valhalla',
        cost: 5,
        description: 'Ressuscite une unité tombée'
      }
    ]
  },

  claudius_memento: {
    id: 'claudius_memento',
    name: 'Claudius Memento',
    title: 'L\'Architecte du Multivers',
    class: 'Architecte',
    tier: 'LEGENDARY',
    icon_id: '💻',
    fx_preset: 'digital_matrix',
    sound_event: 'code_compile',
    theme_color: '#00CED1',
    output_modes: {
      literary: 'L\'architecte qui code la réalité elle-même',
      runic: 'ᚲᛚᚨᚢᛞᛁᚢᛊ',
      iconic: '💻🏗️🌐'
    },
    stats: {
      attack: 16,
      defense: 16,
      health: 160,
      mana: 180,
      temporal_energy: 250,
      quantum_affinity: 1.0
    },
    abilities: [
      {
        id: 'debug',
        name: 'Mode Debug',
        cost: 2,
        description: 'Révèle toutes les cartes cachées'
      },
      {
        id: 'refactor',
        name: 'Refactoring',
        cost: 4,
        description: 'Réorganise le plateau de jeu'
      }
    ]
  },

  // === HÉROS ÉPIQUES (10) ===
  lancelot: {
    id: 'lancelot',
    name: 'Lancelot',
    title: 'Le Chevalier Parfait',
    class: 'Chevalier',
    tier: 'EPIC',
    icon_id: '🛡️',
    fx_preset: 'holy_light',
    sound_event: 'sword_draw',
    theme_color: '#4169E1',
    output_modes: {
      literary: 'Le plus noble des chevaliers de la Table Ronde',
      runic: 'ᛚᚨᚾᛊᛖᛚᛟᛏ',
      iconic: '🛡️⚔️✨'
    },
    stats: {
      attack: 22,
      defense: 24,
      health: 160,
      mana: 100,
      temporal_energy: 60
    },
    abilities: [
      {
        id: 'perfect_defense',
        name: 'Défense Parfaite',
        cost: 2,
        description: 'Bloque toute attaque ce tour'
      }
    ]
  },

  alice_prime: {
    id: 'alice_prime',
    name: 'Alice Prime',
    title: 'L\'Exploratrice Quantique',
    class: 'Exploratrice',
    tier: 'EPIC',
    icon_id: '🦸',
    fx_preset: 'quantum_jump',
    sound_event: 'portal_open',
    theme_color: '#FF69B4',
    output_modes: {
      literary: 'Traverse les mondes parallèles avec aisance',
      runic: 'ᚨᛚᛁᛊᛖ',
      iconic: '🦸🌀🎭'
    },
    stats: {
      attack: 18,
      defense: 16,
      health: 140,
      mana: 150,
      temporal_energy: 180,
      quantum_affinity: 0.88
    },
    abilities: [
      {
        id: 'quantum_leap',
        name: 'Saut Quantique',
        cost: 3,
        description: 'Téléporte n\'importe où sur la carte'
      },
      {
        id: 'temporal_echo',
        name: 'Écho Temporel',
        cost: 4,
        description: 'Répète votre dernière action'
      }
    ]
  },

  vincent_vega: {
    id: 'vincent_vega',
    name: 'Vincent Vega',
    title: 'Le Philosophe Armé',
    class: 'Gunslinger',
    tier: 'EPIC',
    icon_id: '🔫',
    fx_preset: 'bullet_time',
    sound_event: 'gun_shot',
    theme_color: '#2F4F4F',
    output_modes: {
      literary: 'Maître du timing et de la philosophie appliquée',
      runic: 'ᚹᛁᚾᛊᛖᚾᛏ',
      iconic: '🔫🎯⏱️'
    },
    stats: {
      attack: 30,
      defense: 15,
      health: 120,
      mana: 90,
      temporal_energy: 70
    },
    abilities: [
      {
        id: 'gun_perdu',
        name: 'Gun Perdu',
        cost: 3,
        description: 'Tir garanti critique'
      }
    ]
  },

  nyx_lua: {
    id: 'nyx_lua',
    name: 'Nyx-Lua',
    title: 'Tisseuse de Mondes Latents',
    class: 'World Weaver',
    tier: 'EPIC',
    icon_id: '🌌',
    fx_preset: 'dimensional_weave',
    sound_event: 'reality_shift',
    theme_color: '#191970',
    output_modes: {
      literary: 'Tisse des mondes parallèles dans l\'ombre',
      runic: 'ᚾᚤᛪ᛫ᛚᚢᚨ',
      iconic: '🌌🕸️🌙'
    },
    stats: {
      attack: 20,
      defense: 15,
      health: 140,
      mana: 400,
      temporal_energy: 400,
      quantum_affinity: 0.95
    },
    abilities: [
      {
        id: 'world_weaving',
        name: 'Tissage de Mondes',
        cost: 5,
        description: 'Crée une zone avec règles alternatives'
      }
    ],
    description: 'Tous les mondes possibles ont le droit d\'exister'
  },

  jean_grofignon: {
    id: 'jean_grofignon',
    name: 'Jean-Grofignon',
    title: 'L\'Ontologique',
    class: 'Philosophe',
    tier: 'EPIC',
    icon_id: '🤔',
    fx_preset: 'existential_crisis',
    sound_event: 'hmm',
    theme_color: '#8B4513',
    output_modes: {
      literary: 'Questionne l\'existence même de la bataille',
      runic: 'ᚷᚱᛟᚠᛁᚷᚾᛟᚾ',
      iconic: '🤔💭❓'
    },
    stats: {
      attack: 14,
      defense: 14,
      health: 140,
      mana: 140,
      temporal_energy: 140
    },
    abilities: [
      {
        id: 'ontological_doubt',
        name: 'Doute Ontologique',
        cost: 2,
        description: 'L\'ennemi passe son tour à réfléchir'
      }
    ]
  },

  the_dude: {
    id: 'the_dude',
    name: 'The Dude',
    title: 'Le Philosophe Décontracté',
    class: 'Philosophe',
    tier: 'EPIC',
    icon_id: '😎',
    fx_preset: 'chill_vibes',
    sound_event: 'yeah_man',
    theme_color: '#D2691E',
    output_modes: {
      literary: 'Aborde chaque combat avec une zen attitude',
      runic: 'ᛞᚢᛞᛖ',
      iconic: '😎🎳🍺'
    },
    stats: {
      attack: 16,
      defense: 20,
      health: 150,
      mana: 100,
      temporal_energy: 80
    },
    abilities: [
      {
        id: 'abide',
        name: 'The Dude Abides',
        cost: 1,
        description: 'Immunité aux effets négatifs pour 1 tour'
      }
    ]
  },

  christian_mckinsey: {
    id: 'christian_mckinsey',
    name: 'Christian McKinsey',
    title: 'Le Consultant Quantique',
    class: 'Consultant',
    tier: 'EPIC',
    icon_id: '💼',
    fx_preset: 'excel_quantum',
    sound_event: 'powerpoint',
    theme_color: '#708090',
    output_modes: {
      literary: 'Optimise les flux temporels avec des tableaux Excel',
      runic: 'ᛗᚲᚲᛁᚾᛊᛖᚤ',
      iconic: '💼📊📈'
    },
    stats: {
      attack: 22,
      defense: 22,
      health: 150,
      mana: 130,
      temporal_energy: 100
    },
    abilities: [
      {
        id: 'excel_quantum',
        name: 'Excel Quantique',
        cost: 3,
        description: 'Optimise toutes les stats de +20%'
      }
    ]
  },

  marie_basilisk: {
    id: 'marie_basilisk',
    name: 'Marie/Basilisk',
    title: 'La Pétrificatrice',
    class: 'Assassin',
    tier: 'EPIC',
    icon_id: '🐍',
    fx_preset: 'petrification',
    sound_event: 'hiss',
    theme_color: '#228B22',
    output_modes: {
      literary: 'Son regard transforme les ennemis en pierre',
      runic: 'ᛒᚨᛊᛁᛚᛁᛊᚲ',
      iconic: '🐍👁️🗿'
    },
    stats: {
      attack: 35,
      defense: 10,
      health: 110,
      mana: 120,
      temporal_energy: 90
    },
    abilities: [
      {
        id: 'petrify',
        name: 'Pétrification',
        cost: 4,
        description: 'Paralyse un ennemi pour 2 tours'
      }
    ]
  },

  axis: {
    id: 'axis',
    name: 'Axis',
    title: 'Le Voyageur Linéaire',
    class: 'Voyageur',
    tier: 'EPIC',
    icon_id: '🧭',
    fx_preset: 'linear_path',
    sound_event: 'whoosh',
    theme_color: '#4682B4',
    output_modes: {
      literary: 'Voyage uniquement sur les axes cardinaux du temps',
      runic: 'ᚨᛪᛁᛊ',
      iconic: '🧭➡️⬆️'
    },
    stats: {
      attack: 20,
      defense: 20,
      health: 145,
      mana: 145,
      temporal_energy: 145
    },
    abilities: [
      {
        id: 'linear_travel',
        name: 'Voyage Linéaire',
        cost: 2,
        description: 'Déplacement instantané en ligne droite'
      }
    ]
  },

  // === HÉROS RARES (6) ===
  gauvain: {
    id: 'gauvain',
    name: 'Gauvain',
    title: 'Le Chevalier Solaire',
    class: 'Chevalier',
    tier: 'RARE',
    icon_id: '☀️',
    fx_preset: 'solar_flare',
    sound_event: 'light_burst',
    theme_color: '#FFD700',
    output_modes: {
      literary: 'Sa force croît avec le soleil',
      runic: 'ᚷᚨᚢᚹᚨᛁᚾ',
      iconic: '☀️⚔️🛡️'
    },
    stats: {
      attack: 18,
      defense: 16,
      health: 130,
      mana: 80,
      temporal_energy: 40
    },
    abilities: [
      {
        id: 'solar_power',
        name: 'Pouvoir Solaire',
        cost: 2,
        description: '+5 attaque en journée'
      }
    ]
  },

  perceval: {
    id: 'perceval',
    name: 'Perceval',
    title: 'Le Chevalier du Graal',
    class: 'Chevalier',
    tier: 'RARE',
    icon_id: '🏆',
    fx_preset: 'holy_grail',
    sound_event: 'choir',
    theme_color: '#FFD700',
    output_modes: {
      literary: 'Chercheur éternel du Saint Graal',
      runic: 'ᛈᛖᚱᛊᛖᚹᚨᛚ',
      iconic: '🏆⚔️✨'
    },
    stats: {
      attack: 16,
      defense: 18,
      health: 135,
      mana: 90,
      temporal_energy: 50
    },
    abilities: [
      {
        id: 'grail_quest',
        name: 'Quête du Graal',
        cost: 3,
        description: 'Pioche 2 cartes artefact'
      }
    ]
  },

  kay: {
    id: 'kay',
    name: 'Kay',
    title: 'Le Sénéchal',
    class: 'Soutien',
    tier: 'RARE',
    icon_id: '🗝️',
    fx_preset: 'support_aura',
    sound_event: 'buff',
    theme_color: '#B8860B',
    output_modes: {
      literary: 'Frère adoptif et fidèle soutien d\'Arthur',
      runic: 'ᚲᚨᚤ',
      iconic: '🗝️🛡️👥'
    },
    stats: {
      attack: 14,
      defense: 20,
      health: 140,
      mana: 100,
      temporal_energy: 60
    },
    abilities: [
      {
        id: 'rally',
        name: 'Ralliement',
        cost: 2,
        description: '+2/+2 à toutes les unités alliées'
      }
    ]
  },

  bedivere: {
    id: 'bedivere',
    name: 'Bedivere',
    title: 'Le Fidèle',
    class: 'Chevalier',
    tier: 'RARE',
    icon_id: '🤝',
    fx_preset: 'loyalty',
    sound_event: 'oath',
    theme_color: '#4B0082',
    output_modes: {
      literary: 'Le dernier chevalier fidèle jusqu\'à la fin',
      runic: 'ᛒᛖᛞᛁᚹᛖᚱᛖ',
      iconic: '🤝⚔️💜'
    },
    stats: {
      attack: 17,
      defense: 17,
      health: 125,
      mana: 85,
      temporal_energy: 45
    },
    abilities: [
      {
        id: 'last_stand',
        name: 'Dernier Rempart',
        cost: 3,
        description: 'Gagne +10/+10 si seul en jeu'
      }
    ]
  },

  mordred: {
    id: 'mordred',
    name: 'Mordred',
    title: 'Le Traître',
    class: 'Chevalier Noir',
    tier: 'RARE',
    icon_id: '💀',
    fx_preset: 'dark_energy',
    sound_event: 'dark_laugh',
    theme_color: '#8B0000',
    output_modes: {
      literary: 'Le fils renégat qui causa la chute de Camelot',
      runic: 'ᛗᛟᚱᛞᚱᛖᛞ',
      iconic: '💀⚔️🔥'
    },
    stats: {
      attack: 24,
      defense: 12,
      health: 120,
      mana: 70,
      temporal_energy: 30
    },
    abilities: [
      {
        id: 'betrayal',
        name: 'Trahison',
        cost: 4,
        description: 'Vole le contrôle d\'une unité ennemie'
      }
    ]
  },

  viviane: {
    id: 'viviane',
    name: 'Viviane',
    title: 'La Dame du Lac',
    class: 'Enchanteresse',
    tier: 'RARE',
    icon_id: '💧',
    fx_preset: 'water_magic',
    sound_event: 'water_splash',
    theme_color: '#00CED1',
    output_modes: {
      literary: 'Gardienne d\'Excalibur dans les eaux mystiques',
      runic: 'ᚹᛁᚹᛁᚨᚾᛖ',
      iconic: '💧🗡️🌊'
    },
    stats: {
      attack: 15,
      defense: 15,
      health: 130,
      mana: 160,
      temporal_energy: 80,
      quantum_affinity: 0.7
    },
    abilities: [
      {
        id: 'water_blessing',
        name: 'Bénédiction Aquatique',
        cost: 3,
        description: 'Soigne 30 PV à toutes les unités'
      }
    ]
  },

  // === HÉROS COMMUNS (3) ===
  chlamydius: {
    id: 'chlamydius',
    name: 'Chlamydius',
    title: 'Le Mystérieux',
    class: 'Inconnu',
    tier: 'COMMON',
    icon_id: '❓',
    fx_preset: 'mystery',
    sound_event: 'question',
    theme_color: '#696969',
    output_modes: {
      literary: 'Un héros dont l\'origine reste inconnue',
      runic: 'ᚲᛚᚨᛗᚤᛞᛁᚢᛊ',
      iconic: '❓🎭💫'
    },
    stats: {
      attack: 12,
      defense: 12,
      health: 100,
      mana: 100,
      temporal_energy: 50
    },
    abilities: [
      {
        id: 'random',
        name: 'Effet Aléatoire',
        cost: 2,
        description: 'Effet complètement aléatoire'
      }
    ]
  },

  nexus_guardian: {
    id: 'nexus_guardian',
    name: 'Gardien du Nexus',
    title: 'Le Protecteur',
    class: 'Gardien',
    tier: 'COMMON',
    icon_id: '🛡️',
    fx_preset: 'shield_wall',
    sound_event: 'shield_up',
    theme_color: '#4682B4',
    output_modes: {
      literary: 'Protège les portails entre les mondes',
      runic: 'ᚾᛖᛪᚢᛊ',
      iconic: '🛡️🌀🚪'
    },
    stats: {
      attack: 10,
      defense: 25,
      health: 150,
      mana: 60,
      temporal_energy: 40
    },
    abilities: [
      {
        id: 'guardian_stance',
        name: 'Position de Garde',
        cost: 1,
        description: 'Taunt et +5 défense'
      }
    ]
  },

  grofi_scout: {
    id: 'grofi_scout',
    name: 'Éclaireur Grofi',
    title: 'L\'Éclaireur',
    class: 'Scout',
    tier: 'COMMON',
    icon_id: '🏃',
    fx_preset: 'speed_boost',
    sound_event: 'footsteps',
    theme_color: '#228B22',
    output_modes: {
      literary: 'Éclaireur rapide de la faction Grofi',
      runic: 'ᚷᚱᛟᚠᛁ',
      iconic: '🏃👁️🗺️'
    },
    stats: {
      attack: 14,
      defense: 8,
      health: 80,
      mana: 50,
      temporal_energy: 60
    },
    abilities: [
      {
        id: 'scout',
        name: 'Reconnaissance',
        cost: 1,
        description: 'Révèle 3 cases adjacentes'
      }
    ]
  }
};

// Fonctions utilitaires
export function getHeroById(id: string): Hero | undefined {
  return HEROES[id];
}

export function getHeroesByTier(tier: Hero['tier']): Hero[] {
  return Object.values(HEROES).filter(hero => hero.tier === tier);
}

export function getHeroesByClass(heroClass: string): Hero[] {
  return Object.values(HEROES).filter(hero => hero.class === heroClass);
}

export function getAllHeroes(): Hero[] {
  return Object.values(HEROES);
}

export function getHeroCount(): number {
  return Object.keys(HEROES).length;
}

// Export des catégories pour faciliter l'import
export const LEGENDARY_HEROES = getHeroesByTier('LEGENDARY');
export const EPIC_HEROES = getHeroesByTier('EPIC');
export const RARE_HEROES = getHeroesByTier('RARE');
export const COMMON_HEROES = getHeroesByTier('COMMON');

// Stats globales
export const HEROES_STATS = {
  total: getHeroCount(),
  legendary: LEGENDARY_HEROES.length,
  epic: EPIC_HEROES.length,
  rare: RARE_HEROES.length,
  common: COMMON_HEROES.length,
  classes: [...new Set(Object.values(HEROES).map(h => h.class))],
  averageStats: {
    attack: Math.round(Object.values(HEROES).reduce((acc, h) => acc + h.stats.attack, 0) / getHeroCount()),
    defense: Math.round(Object.values(HEROES).reduce((acc, h) => acc + h.stats.defense, 0) / getHeroCount()),
    health: Math.round(Object.values(HEROES).reduce((acc, h) => acc + h.stats.health, 0) / getHeroCount()),
    mana: Math.round(Object.values(HEROES).reduce((acc, h) => acc + h.stats.mana, 0) / getHeroCount())
  }
};
