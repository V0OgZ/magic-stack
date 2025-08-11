/**
 * 📦 ASSETS SERVICE
 * Service unifié pour charger tous les assets depuis VECTOR_DB_ASSETS
 */

// Types pour les assets
export interface HeroAsset {
  id: string;
  name: string;
  icon: string;
  category: string;
  sound_hover?: string;
  sound_activate?: string;
  voice_type?: string;
  theme_color?: string;
  visual_effects?: string[];
  backstory?: string;
  stats?: {
    power: number;
    knowledge: number;
    temporal: number;
    quantum: number;
  };
}

export interface CreatureAsset {
  id: string;
  name: string;
  icon: string;
  category: string;
  tier: number;
  sound_hover?: string;
  sound_activate?: string;
  theme_color?: string;
  visual_effects?: string[];
  abilities?: string[];
}

export interface ArtifactAsset {
  id: string;
  name: string;
  icon: string;
  category: string;
  tier: number;
  sound_hover?: string;
  sound_activate?: string;
  theme_color?: string;
  visual_effects?: string[];
  effects?: string[];
}

export interface Formula {
  id: string;
  name: string;
  category: 'temporal' | 'quantum' | 'causal' | 'dimensional' | 'energy';
  formula: string;
  description?: string;
  cost?: number;
}

export interface AudioMapping {
  [key: string]: {
    icon: string;
    sound_hover?: string;
    sound_activate?: string;
    theme_color?: string;
    visual_effects?: string[];
  };
}

class AssetsServiceClass {
  private heroes: Map<string, HeroAsset> = new Map();
  private creatures: Map<string, CreatureAsset> = new Map();
  private artifacts: Map<string, ArtifactAsset> = new Map();
  private formulas: Map<string, Formula> = new Map();
  private audioMappings: AudioMapping = {};
  private loaded = false;

  // Données intégrées depuis VECTOR_DB_ASSETS
  private readonly ASSETS_DATA = {
    heroes: {
      jean_grofignon_complete: {
        id: 'jean_grofignon_complete',
        name: 'Jean Grofignon',
        icon: '🚬',
        category: 'COSMIC',
        sound_hover: 'deep_magic',
        sound_activate: 'quantum_beep',
        voice_type: 'cosmic_chill',
        theme_color: '#FFD700',
        visual_effects: ['cosmic_particles', 'joint_smoke', 'canapé_glow'],
        backstory: 'Le fumeur cosmique qui comprend tout depuis son canapé',
        stats: { power: 99, knowledge: 99, temporal: 99, quantum: 99 }
      },
      arthur_pendragon: {
        id: 'arthur_pendragon',
        name: 'Arthur Pendragon',
        icon: '⚔️',
        category: 'LEGENDARY',
        sound_hover: 'metal_clang',
        sound_activate: 'power_up',
        voice_type: 'commanding_noble',
        theme_color: '#C0A080',
        visual_effects: ['golden_aura', 'excalibur_glow', 'royal_particles'],
        backstory: 'Le roi légendaire avec Excalibur Ultimate',
        stats: { power: 95, knowledge: 70, temporal: 60, quantum: 50 }
      },
      merlin_wizard: {
        id: 'merlin_wizard',
        name: 'Merlin',
        icon: '🧙‍♂️',
        category: 'LEGENDARY',
        sound_hover: 'mystical_harmonics',
        sound_activate: 'deep_magic',
        voice_type: 'ethereal_wise',
        theme_color: '#4A90E2',
        visual_effects: ['dragon_transformation', 'elemental_swirl', 'wisdom_glow'],
        backstory: 'Le mage légendaire qui peut se transformer en dragon',
        stats: { power: 80, knowledge: 99, temporal: 90, quantum: 85 }
      },
      grokaen_architect: {
        id: 'grokaen_architect',
        name: 'GROKÆN',
        icon: '🏗️',
        category: 'HOME_MAGES',
        sound_hover: 'electronic_buzz',
        sound_activate: 'hexagon_activation',
        voice_type: 'system_architect',
        theme_color: '#00FFFF',
        visual_effects: ['6d_architecture', 'magic_stack_build', 'formula_cascade'],
        backstory: 'L\'architecte temporel créateur de la Magic Stack',
        stats: { power: 75, knowledge: 95, temporal: 99, quantum: 90 }
      },
      anna_sorceress: {
        id: 'anna_sorceress',
        name: 'Anna',
        icon: '⏰',
        category: 'PARADOXAL',
        sound_hover: 'ice_crack',
        sound_activate: 'deep_magic',
        voice_type: 'temporal_power',
        theme_color: '#9932CC',
        visual_effects: ['time_nexus', 'power_swirl', 'temporal_aura'],
        backstory: 'La gardienne du Nexus Temporel',
        stats: { power: 85, knowledge: 80, temporal: 99, quantum: 70 }
      }
    },
    
    creatures: {
      red_dragon: {
        id: 'red_dragon',
        name: 'Dragon Rouge',
        icon: '🐲',
        category: 'EPIC',
        tier: 7,
        sound_hover: 'fire_whoosh',
        sound_activate: 'power_up',
        theme_color: '#FF0000',
        visual_effects: ['fire_breath', 'wing_flap', 'treasure_guard'],
        abilities: ['Fire Breath', 'Fear Aura', 'Fly']
      },
      phoenix: {
        id: 'phoenix',
        name: 'Phénix',
        icon: '🔥',
        category: 'QUANTUM',
        tier: 6,
        sound_hover: 'fire_whoosh',
        sound_activate: 'mystical_harmonics',
        theme_color: '#FF6347',
        visual_effects: ['fire_aura', 'rebirth_flames', 'eternal_flight'],
        abilities: ['Rebirth', 'Fire Immunity', 'Quantum Phase']
      },
      unicorn: {
        id: 'unicorn',
        name: 'Licorne',
        icon: '🦄',
        category: 'EPIC',
        tier: 5,
        sound_hover: 'crystalline',
        sound_activate: 'mystical_harmonics',
        theme_color: '#E6E6FA',
        visual_effects: ['horn_glow', 'purification_light', 'healing_aura'],
        abilities: ['Purify', 'Heal', 'Magic Resistance']
      },
      archangel: {
        id: 'archangel',
        name: 'Archange',
        icon: '👼',
        category: 'EPIC',
        tier: 7,
        sound_hover: 'ancient_resonance',
        sound_activate: 'crystalline',
        theme_color: '#FFD700',
        visual_effects: ['divine_light', 'golden_wings', 'resurrection_glow'],
        abilities: ['Resurrect', 'Divine Shield', 'Fly']
      }
    },
    
    artifacts: {
      excalibur_ultimate: {
        id: 'excalibur_ultimate',
        name: 'Excalibur Ultimate',
        icon: '⚔️',
        category: 'LEGENDARY',
        tier: 5,
        sound_hover: 'metal_clang',
        sound_activate: 'power_up',
        theme_color: '#FFD700',
        visual_effects: ['golden_glow', 'power_surge'],
        effects: ['+25 Power', 'Ignore Defense', 'Temporal Strike']
      },
      cosmic_chaos_resolution: {
        id: 'cosmic_chaos_resolution',
        name: 'Résolution du Chaos Cosmique',
        icon: '🌌',
        category: 'COSMIC',
        tier: 5,
        sound_hover: 'quantum_beep',
        sound_activate: 'deep_magic',
        theme_color: '#9400D3',
        visual_effects: ['reality_warp', 'cosmic_swirl'],
        effects: ['Reality Control', 'Paradox Immunity', 'Quantum Mastery']
      },
      tesseract_prison: {
        id: 'tesseract_prison',
        name: 'Prison Tesseract',
        icon: '🔷',
        category: 'QUATRIEME_MUR',
        tier: 4,
        sound_hover: 'electronic_buzz',
        sound_activate: 'quantum_beep',
        theme_color: '#00CED1',
        visual_effects: ['4d_rotation', 'spatial_lock'],
        effects: ['Dimensional Prison', 'Space Fold', 'Quantum Lock']
      }
    },
    
    formulas: {
      temporal_shift: {
        id: 'temporal_shift',
        name: 'Décalage Temporel',
        category: 'temporal',
        formula: 'Ψ(t) = Ψ₀ × e^(iωt) × R(Δt)',
        description: 'Déplace une entité dans le temps',
        cost: 20
      },
      quantum_collapse: {
        id: 'quantum_collapse',
        name: 'Effondrement Quantique',
        category: 'quantum',
        formula: '|Ψ⟩ = Σ(α_i|i⟩) → |n⟩',
        description: 'Force une superposition à s\'effondrer',
        cost: 30
      },
      causal_fork: {
        id: 'causal_fork',
        name: 'Fourche Causale',
        category: 'causal',
        formula: 'C(t₁→t₂) = ∫P(ξ)dξ × Θ(t₂-t₁)',
        description: 'Crée une bifurcation dans la causalité',
        cost: 40
      },
      energy_complex: {
        id: 'energy_complex',
        name: 'Énergie Complexe',
        category: 'energy',
        formula: 'E = A × e^(iΦ) + ∇²Ψ',
        description: 'Manipule l\'énergie en amplitude et phase',
        cost: 25
      }
    }
  };

  async initialize(): Promise<void> {
    if (this.loaded) return;

    // Charger les héros
    Object.entries(this.ASSETS_DATA.heroes).forEach(([id, hero]) => {
      this.heroes.set(id, hero);
    });

    // Charger les créatures
    Object.entries(this.ASSETS_DATA.creatures).forEach(([id, creature]) => {
      this.creatures.set(id, creature);
    });

    // Charger les artefacts
    Object.entries(this.ASSETS_DATA.artifacts).forEach(([id, artifact]) => {
      this.artifacts.set(id, artifact);
    });

    // Charger les formules
    Object.entries(this.ASSETS_DATA.formulas).forEach(([id, formula]) => {
      this.formulas.set(id, formula as Formula);
    });

    this.loaded = true;
    console.log('✅ Assets loaded:', {
      heroes: this.heroes.size,
      creatures: this.creatures.size,
      artifacts: this.artifacts.size,
      formulas: this.formulas.size
    });
  }

  // Getters pour les assets
  getHero(id: string): HeroAsset | undefined {
    return this.heroes.get(id);
  }

  getAllHeroes(): HeroAsset[] {
    return Array.from(this.heroes.values());
  }

  getCreature(id: string): CreatureAsset | undefined {
    return this.creatures.get(id);
  }

  getAllCreatures(): CreatureAsset[] {
    return Array.from(this.creatures.values());
  }

  getArtifact(id: string): ArtifactAsset | undefined {
    return this.artifacts.get(id);
  }

  getAllArtifacts(): ArtifactAsset[] {
    return Array.from(this.artifacts.values());
  }

  getFormula(id: string): Formula | undefined {
    return this.formulas.get(id);
  }

  getAllFormulas(): Formula[] {
    return Array.from(this.formulas.values());
  }

  getFormulasByCategory(category: Formula['category']): Formula[] {
    return Array.from(this.formulas.values()).filter(f => f.category === category);
  }

  // Obtenir toutes les icônes pour l'éditeur
  getAllIcons(): { emoji: string; name: string; category: string }[] {
    const icons: { emoji: string; name: string; category: string }[] = [];
    
    // Héros
    this.heroes.forEach(hero => {
      icons.push({
        emoji: hero.icon,
        name: hero.name,
        category: '👥 Héros'
      });
    });
    
    // Créatures
    this.creatures.forEach(creature => {
      icons.push({
        emoji: creature.icon,
        name: creature.name,
        category: '🐉 Créatures'
      });
    });
    
    // Artefacts
    this.artifacts.forEach(artifact => {
      icons.push({
        emoji: artifact.icon,
        name: artifact.name,
        category: '💎 Artefacts'
      });
    });
    
    return icons;
  }

  // Recherche par texte
  search(query: string): {
    heroes: HeroAsset[];
    creatures: CreatureAsset[];
    artifacts: ArtifactAsset[];
    formulas: Formula[];
  } {
    const q = query.toLowerCase();
    
    return {
      heroes: Array.from(this.heroes.values()).filter(h => 
        h.name.toLowerCase().includes(q) || 
        h.backstory?.toLowerCase().includes(q)
      ),
      creatures: Array.from(this.creatures.values()).filter(c => 
        c.name.toLowerCase().includes(q) ||
        c.abilities?.some(a => a.toLowerCase().includes(q))
      ),
      artifacts: Array.from(this.artifacts.values()).filter(a => 
        a.name.toLowerCase().includes(q) ||
        a.effects?.some(e => e.toLowerCase().includes(q))
      ),
      formulas: Array.from(this.formulas.values()).filter(f => 
        f.name.toLowerCase().includes(q) ||
        f.description?.toLowerCase().includes(q)
      )
    };
  }
}

// Singleton
export const AssetsService = new AssetsServiceClass();
