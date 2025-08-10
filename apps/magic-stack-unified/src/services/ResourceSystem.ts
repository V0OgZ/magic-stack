/**
 * 🧪 ResourceSystem - Système de ressources et crafting façon Dr Stone
 * Collecte, transformation, chimie magique !
 */

export interface Resource {
  id: string;
  name: string;
  icon: string;
  category: 'raw' | 'refined' | 'compound' | 'magical' | 'quantum';
  properties: {
    state?: 'solid' | 'liquid' | 'gas' | 'plasma' | 'quantum';
    temperature?: number;
    energy?: number;
    temporal?: number;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  };
  sources?: string[];  // Où/comment l'obtenir
  uses?: string[];     // À quoi ça sert
}

export interface Recipe {
  id: string;
  name: string;
  icon: string;
  inputs: { resourceId: string; quantity: number }[];
  outputs: { resourceId: string; quantity: number }[];
  conditions?: {
    temperature?: { min?: number; max?: number };
    pressure?: { min?: number; max?: number };
    catalyst?: string;
    timeRequired?: number;
    energyRequired?: number;
  };
  discoveredBy?: 'observation' | 'experimentation' | 'recipe' | 'accident';
}

class ResourceSystem {
  private static instance: ResourceSystem;
  
  // Base de données des ressources
  private resources: Map<string, Resource> = new Map([
    // ====== RESSOURCES NATURELLES (Cueillette) ======
    ['flower_crystal', {
      id: 'flower_crystal',
      name: 'Fleur de Cristal',
      icon: '🌸',
      category: 'raw',
      properties: {
        state: 'solid',
        energy: 10,
        rarity: 'common'
      },
      sources: ['Prairie mystique', 'Cueillette manuelle'],
      uses: ['Potions', 'Cristallisation']
    }],
    
    ['temporal_lily', {
      id: 'temporal_lily',
      name: 'Lys Temporel',
      icon: '🌺',
      category: 'raw',
      properties: {
        state: 'solid',
        temporal: 5,
        rarity: 'rare'
      },
      sources: ['Zones de distorsion temporelle'],
      uses: ['Manipulation du temps', 'Paradoxes contrôlés']
    }],
    
    ['quantum_moss', {
      id: 'quantum_moss',
      name: 'Mousse Quantique',
      icon: '🌿',
      category: 'raw',
      properties: {
        state: 'quantum',
        energy: 3,
        temporal: 2,
        rarity: 'uncommon'
      },
      sources: ['Rochers humides près des nexus'],
      uses: ['Superposition quantique', 'Téléportation']
    }],
    
    // ====== MINÉRAUX ======
    ['sulfur', {
      id: 'sulfur',
      name: 'Soufre',
      icon: '🟡',
      category: 'raw',
      properties: {
        state: 'solid',
        temperature: 115,
        rarity: 'common'
      },
      sources: ['Volcans', 'Sources chaudes'],
      uses: ['Poudre à canon', 'Alchimie']
    }],
    
    ['saltpeter', {
      id: 'saltpeter',
      name: 'Salpêtre',
      icon: '⚪',
      category: 'raw',
      properties: {
        state: 'solid',
        rarity: 'uncommon'
      },
      sources: ['Grottes', 'Décomposition organique'],
      uses: ['Explosifs', 'Conservation']
    }],
    
    ['charcoal', {
      id: 'charcoal',
      name: 'Charbon de bois',
      icon: '⚫',
      category: 'refined',
      properties: {
        state: 'solid',
        energy: 20,
        rarity: 'common'
      },
      sources: ['Combustion contrôlée du bois'],
      uses: ['Combustible', 'Filtration', 'Poudre à canon']
    }],
    
    // ====== LIQUIDES ======
    ['pure_water', {
      id: 'pure_water',
      name: 'Eau Pure',
      icon: '💧',
      category: 'refined',
      properties: {
        state: 'liquid',
        temperature: 20,
        rarity: 'common'
      },
      sources: ['Distillation', 'Sources naturelles'],
      uses: ['Base pour potions', 'Réactions chimiques']
    }],
    
    ['mercury', {
      id: 'mercury',
      name: 'Mercure',
      icon: '🫧',
      category: 'raw',
      properties: {
        state: 'liquid',
        temperature: -39,
        rarity: 'rare'
      },
      sources: ['Minerai de cinabre'],
      uses: ['Alchimie avancée', 'Instruments de mesure']
    }],
    
    // ====== COMPOSÉS AVANCÉS ======
    ['gunpowder', {
      id: 'gunpowder',
      name: 'Poudre à Canon',
      icon: '💥',
      category: 'compound',
      properties: {
        state: 'solid',
        energy: 100,
        rarity: 'uncommon'
      },
      sources: ['Crafting: Soufre + Salpêtre + Charbon'],
      uses: ['Explosifs', 'Propulsion']
    }],
    
    ['temporal_essence', {
      id: 'temporal_essence',
      name: 'Essence Temporelle',
      icon: '⏳',
      category: 'magical',
      properties: {
        state: 'liquid',
        temporal: 50,
        rarity: 'epic'
      },
      sources: ['Distillation de Lys Temporel'],
      uses: ['Voyage temporel', 'Stase']
    }],
    
    ['quantum_crystal', {
      id: 'quantum_crystal',
      name: 'Cristal Quantique',
      icon: '💎',
      category: 'quantum',
      properties: {
        state: 'quantum',
        energy: 100,
        temporal: 100,
        rarity: 'legendary'
      },
      sources: ['Cristallisation d\'énergie pure'],
      uses: ['Superposition', 'Téléportation instantanée']
    }]
  ]);
  
  // Recettes de transformation
  private recipes: Map<string, Recipe> = new Map([
    ['make_charcoal', {
      id: 'make_charcoal',
      name: 'Carbonisation du bois',
      icon: '🔥',
      inputs: [
        { resourceId: 'wood', quantity: 5 }
      ],
      outputs: [
        { resourceId: 'charcoal', quantity: 3 }
      ],
      conditions: {
        temperature: { min: 300 },
        timeRequired: 60
      },
      discoveredBy: 'observation'
    }],
    
    ['make_gunpowder', {
      id: 'make_gunpowder',
      name: 'Fabrication de poudre à canon',
      icon: '💥',
      inputs: [
        { resourceId: 'sulfur', quantity: 1 },
        { resourceId: 'saltpeter', quantity: 7 },
        { resourceId: 'charcoal', quantity: 2 }
      ],
      outputs: [
        { resourceId: 'gunpowder', quantity: 10 }
      ],
      conditions: {
        energyRequired: 10
      },
      discoveredBy: 'recipe'
    }],
    
    ['distill_temporal', {
      id: 'distill_temporal',
      name: 'Distillation temporelle',
      icon: '⚗️',
      inputs: [
        { resourceId: 'temporal_lily', quantity: 5 },
        { resourceId: 'pure_water', quantity: 10 }
      ],
      outputs: [
        { resourceId: 'temporal_essence', quantity: 1 }
      ],
      conditions: {
        temperature: { min: 80, max: 100 },
        catalyst: 'quantum_moss',
        timeRequired: 300,
        energyRequired: 50
      },
      discoveredBy: 'experimentation'
    }],
    
    ['crystallize_quantum', {
      id: 'crystallize_quantum',
      name: 'Cristallisation quantique',
      icon: '🔮',
      inputs: [
        { resourceId: 'temporal_essence', quantity: 3 },
        { resourceId: 'flower_crystal', quantity: 10 },
        { resourceId: 'mercury', quantity: 1 }
      ],
      outputs: [
        { resourceId: 'quantum_crystal', quantity: 1 }
      ],
      conditions: {
        pressure: { min: 1000 },
        temperature: { min: -273 },  // Zéro absolu !
        energyRequired: 1000
      },
      discoveredBy: 'accident'
    }]
  ]);
  
  // Inventaire du joueur
  private inventory: Map<string, number> = new Map();
  
  // Recettes découvertes
  private discoveredRecipes: Set<string> = new Set(['make_charcoal']);
  
  private constructor() {
    console.log('🧪 ResourceSystem initialized - Dr Stone mode activated!');
  }
  
  static getInstance(): ResourceSystem {
    if (!ResourceSystem.instance) {
      ResourceSystem.instance = new ResourceSystem();
    }
    return ResourceSystem.instance;
  }
  
  /**
   * Collecter une ressource (cueillette, minage, etc.)
   */
  collect(resourceId: string, quantity: number = 1, position?: { x: number; y: number }): boolean {
    const resource = this.resources.get(resourceId);
    if (!resource) {
      console.warn(`Resource ${resourceId} not found`);
      return false;
    }
    
    const current = this.inventory.get(resourceId) || 0;
    this.inventory.set(resourceId, current + quantity);
    
    // Effet visuel de collecte
    if (position) {
      this.showCollectEffect(resource, position, quantity);
    }
    
    // Découverte automatique de recettes liées
    this.checkRecipeDiscovery(resourceId);
    
    console.log(`🌿 Collected ${quantity}x ${resource.name} ${resource.icon}`);
    return true;
  }
  
  /**
   * Transformer des ressources selon une recette
   */
  craft(recipeId: string, multiplier: number = 1): boolean {
    const recipe = this.recipes.get(recipeId);
    if (!recipe) {
      console.warn(`Recipe ${recipeId} not found`);
      return false;
    }
    
    if (!this.discoveredRecipes.has(recipeId)) {
      console.warn(`Recipe ${recipe.name} not yet discovered!`);
      return false;
    }
    
    // Vérifier les inputs
    for (const input of recipe.inputs) {
      const required = input.quantity * multiplier;
      const available = this.inventory.get(input.resourceId) || 0;
      if (available < required) {
        console.warn(`Not enough ${input.resourceId}: need ${required}, have ${available}`);
        return false;
      }
    }
    
    // Vérifier le catalyseur si nécessaire
    if (recipe.conditions?.catalyst) {
      if (!this.inventory.has(recipe.conditions.catalyst)) {
        console.warn(`Missing catalyst: ${recipe.conditions.catalyst}`);
        return false;
      }
    }
    
    // Consommer les inputs
    for (const input of recipe.inputs) {
      const current = this.inventory.get(input.resourceId) || 0;
      this.inventory.set(input.resourceId, current - (input.quantity * multiplier));
    }
    
    // Produire les outputs
    for (const output of recipe.outputs) {
      const current = this.inventory.get(output.resourceId) || 0;
      this.inventory.set(output.resourceId, current + (output.quantity * multiplier));
      
      const resource = this.resources.get(output.resourceId);
      if (resource) {
        console.log(`⚗️ Created ${output.quantity * multiplier}x ${resource.name} ${resource.icon}`);
      }
    }
    
    // Animation de crafting
    this.showCraftingAnimation(recipe);
    
    return true;
  }
  
  /**
   * Expérimenter pour découvrir de nouvelles recettes
   */
  experiment(resourceIds: string[]): string | null {
    // Chercher une recette qui correspond
    for (const [id, recipe] of this.recipes) {
      if (this.discoveredRecipes.has(id)) continue;
      
      const inputIds = recipe.inputs.map(i => i.resourceId).sort();
      const testIds = resourceIds.sort();
      
      if (JSON.stringify(inputIds) === JSON.stringify(testIds)) {
        // Découverte !
        this.discoveredRecipes.add(id);
        console.log(`🔬 EUREKA! Discovered: ${recipe.name}`);
        this.showDiscoveryEffect(recipe);
        return id;
      }
    }
    
    // Pas de recette trouvée, mais peut-être une réaction intéressante
    if (Math.random() < 0.1) {
      console.log('💥 Interesting reaction! But no useful result...');
      this.showExplosionEffect();
    }
    
    return null;
  }
  
  /**
   * Analyser une ressource (comme Senku!)
   */
  analyze(resourceId: string): string {
    const resource = this.resources.get(resourceId);
    if (!resource) return 'Unknown substance';
    
    let analysis = `📊 ANALYSIS: ${resource.name}\n`;
    analysis += `Category: ${resource.category}\n`;
    analysis += `State: ${resource.properties.state || 'solid'}\n`;
    
    if (resource.properties.energy) {
      analysis += `Energy: ${resource.properties.energy} units\n`;
    }
    if (resource.properties.temporal) {
      analysis += `Temporal charge: ${resource.properties.temporal} units\n`;
    }
    
    analysis += `\nSources: ${resource.sources?.join(', ') || 'Unknown'}\n`;
    analysis += `Uses: ${resource.uses?.join(', ') || 'Unknown'}\n`;
    
    // Suggérer des expériences
    const suggestions = this.suggestExperiments(resourceId);
    if (suggestions.length > 0) {
      analysis += `\n💡 Try combining with: ${suggestions.join(', ')}`;
    }
    
    return analysis;
  }
  
  /**
   * Suggérer des expériences possibles
   */
  private suggestExperiments(resourceId: string): string[] {
    const suggestions: string[] = [];
    
    for (const recipe of this.recipes.values()) {
      if (this.discoveredRecipes.has(recipe.id)) continue;
      
      if (recipe.inputs.some(i => i.resourceId === resourceId)) {
        // Cette ressource fait partie d'une recette non découverte
        const otherInputs = recipe.inputs
          .filter(i => i.resourceId !== resourceId)
          .map(i => this.resources.get(i.resourceId)?.name || i.resourceId);
        
        suggestions.push(...otherInputs);
      }
    }
    
    return [...new Set(suggestions)].slice(0, 3);
  }
  
  /**
   * Vérifier si on découvre de nouvelles recettes
   */
  private checkRecipeDiscovery(resourceId: string) {
    // Découverte par observation
    if (resourceId === 'charcoal' && !this.discoveredRecipes.has('make_gunpowder')) {
      if (this.inventory.has('sulfur') && this.inventory.has('saltpeter')) {
        this.discoveredRecipes.add('make_gunpowder');
        console.log('💡 Idea: These materials could make something explosive...');
      }
    }
  }
  
  /**
   * Effets visuels
   */
  private showCollectEffect(resource: Resource, position: { x: number; y: number }, quantity: number) {
    const element = document.createElement('div');
    element.style.cssText = `
      position: fixed;
      left: ${position.x}px;
      top: ${position.y}px;
      font-size: 24px;
      animation: collect-float 1s ease-out forwards;
      pointer-events: none;
      z-index: 1000;
    `;
    element.textContent = `+${quantity} ${resource.icon}`;
    document.body.appendChild(element);
    setTimeout(() => element.remove(), 1000);
  }
  
  private showCraftingAnimation(recipe: Recipe) {
    console.log(`⚗️ Crafting ${recipe.name}... *bubbling sounds*`);
  }
  
  private showDiscoveryEffect(recipe: Recipe) {
    console.log(`💡 NEW DISCOVERY: ${recipe.name} ${recipe.icon}`);
  }
  
  private showExplosionEffect() {
    console.log('💥 BOOM! The mixture exploded!');
  }
  
  /**
   * Getters utiles
   */
  getInventory(): Map<string, number> {
    return new Map(this.inventory);
  }
  
  getResource(id: string): Resource | undefined {
    return this.resources.get(id);
  }
  
  getDiscoveredRecipes(): Recipe[] {
    return Array.from(this.discoveredRecipes)
      .map(id => this.recipes.get(id))
      .filter(r => r !== undefined) as Recipe[];
  }
  
  /**
   * Système de roadmap façon Dr Stone
   */
  getRoadmap(): string {
    return `
    🗺️ ROADMAP TO CIVILIZATION:
    
    1. [✓] Fire & Basic Tools
    2. [✓] Charcoal Production
    3. [${this.discoveredRecipes.has('make_gunpowder') ? '✓' : ' '}] Gunpowder
    4. [${this.inventory.has('temporal_essence') ? '✓' : ' '}] Temporal Manipulation
    5. [${this.inventory.has('quantum_crystal') ? '✓' : ' '}] Quantum Technology
    6. [ ] Time Machine
    7. [ ] Multiverse Portal
    
    Progress: ${this.discoveredRecipes.size}/${this.recipes.size} recipes discovered
    `;
  }
}

// CSS pour les animations
if (typeof document !== 'undefined' && !document.getElementById('resource-system-styles')) {
  const style = document.createElement('style');
  style.id = 'resource-system-styles';
  style.textContent = `
    @keyframes collect-float {
      from {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      to {
        opacity: 0;
        transform: translateY(-50px) scale(1.5);
      }
    }
  `;
  document.head.appendChild(style);
}

// Export singleton
export const resourceSystem = ResourceSystem.getInstance();

// Exposer globalement pour tests
if (typeof window !== 'undefined') {
  (window as any).ResourceSystem = resourceSystem;
  console.log('🧪 ResourceSystem available as window.ResourceSystem');
  console.log('Try: ResourceSystem.collect("flower_crystal", 5)');
  console.log('     ResourceSystem.analyze("sulfur")');
  console.log('     ResourceSystem.experiment(["sulfur", "saltpeter", "charcoal"])');
}
