/**
 * 🌻 GardenSystem - Système de jardinage et culture
 * Planter, cultiver, récolter - avec effets temporels !
 */

import { resourceSystem } from './ResourceSystem';

export interface Plant {
  id: string;
  name: string;
  icon: string;
  seedResource: string;
  harvestResource: string;
  growthStages: {
    seed: string;
    sprout: string;
    growing: string;
    mature: string;
    harvest: string;
  };
  growthTime: number;  // Ticks nécessaires
  yield: { min: number; max: number };
  conditions?: {
    soil?: 'normal' | 'mystique' | 'quantum' | 'temporal';
    water?: number;  // Quantité d'eau par tick
    sunlight?: boolean;
    temperature?: { min: number; max: number };
  };
  specialEffects?: string[];
}

export interface GardenPlot {
  id: string;
  position: { x: number; y: number };
  soil: 'normal' | 'mystique' | 'quantum' | 'temporal';
  plant?: {
    type: Plant;
    stage: keyof Plant['growthStages'];
    growth: number;  // 0-100%
    health: number;  // 0-100%
    watered: boolean;
    timeEffects?: {
      accelerated?: number;  // Multiplicateur de vitesse
      reversed?: boolean;    // Pousse à l'envers !
      frozen?: boolean;      // Stase temporelle
    };
  };
  enhancements?: {
    fertilizer?: string;
    protection?: string;
    quantum?: boolean;  // Superposition quantique
  };
}

class GardenSystem {
  private static instance: GardenSystem;
  
  // Catalogue des plantes
  private plants: Map<string, Plant> = new Map([
    ['crystal_flower', {
      id: 'crystal_flower',
      name: 'Fleur de Cristal',
      icon: '🌸',
      seedResource: 'crystal_seed',
      harvestResource: 'flower_crystal',
      growthStages: {
        seed: '🌰',
        sprout: '🌱',
        growing: '🌿',
        mature: '🌺',
        harvest: '🌸'
      },
      growthTime: 10,
      yield: { min: 1, max: 3 },
      conditions: {
        soil: 'normal',
        water: 1,
        sunlight: true
      }
    }],
    
    ['temporal_lily', {
      id: 'temporal_lily',
      name: 'Lys Temporel',
      icon: '🌺',
      seedResource: 'temporal_seed',
      harvestResource: 'temporal_lily',
      growthStages: {
        seed: '⏳',
        sprout: '🌱',
        growing: '🍀',
        mature: '🌷',
        harvest: '🌺'
      },
      growthTime: 30,
      yield: { min: 1, max: 2 },
      conditions: {
        soil: 'temporal',
        water: 2,
        temperature: { min: 15, max: 25 }
      },
      specialEffects: ['time_distortion', 'paradox_chance']
    }],
    
    ['quantum_moss', {
      id: 'quantum_moss',
      name: 'Mousse Quantique',
      icon: '🌿',
      seedResource: 'quantum_spore',
      harvestResource: 'quantum_moss',
      growthStages: {
        seed: '🟢',
        sprout: '🌾',
        growing: '🌿',
        mature: '🍃',
        harvest: '🌿'
      },
      growthTime: 5,
      yield: { min: 3, max: 10 },
      conditions: {
        soil: 'quantum',
        water: 0,  // N'a pas besoin d'eau !
        sunlight: false  // Pousse dans le noir
      },
      specialEffects: ['superposition', 'entanglement']
    }],
    
    ['explosive_mushroom', {
      id: 'explosive_mushroom',
      name: 'Champignon Explosif',
      icon: '🍄',
      seedResource: 'mushroom_spore',
      harvestResource: 'explosive_cap',
      growthStages: {
        seed: '🟫',
        sprout: '🍄‍🟫',
        growing: '🍄',
        mature: '🔴',
        harvest: '💥'
      },
      growthTime: 15,
      yield: { min: 2, max: 4 },
      conditions: {
        soil: 'normal',
        water: 3,
        sunlight: false,
        temperature: { min: 10, max: 20 }
      },
      specialEffects: ['volatile', 'chain_reaction']
    }],
    
    ['golden_wheat', {
      id: 'golden_wheat',
      name: 'Blé Doré',
      icon: '🌾',
      seedResource: 'wheat_seed',
      harvestResource: 'golden_grain',
      growthStages: {
        seed: '🌰',
        sprout: '🌱',
        growing: '🌾',
        mature: '✨',
        harvest: '🌾'
      },
      growthTime: 20,
      yield: { min: 5, max: 15 },
      conditions: {
        soil: 'normal',
        water: 2,
        sunlight: true,
        temperature: { min: 20, max: 30 }
      }
    }]
  ]);
  
  // Jardins actifs
  private gardens: Map<string, GardenPlot> = new Map();
  
  // Temps global (pour la croissance)
  private globalTick: number = 0;
  
  private constructor() {
    // Démarrer le système de ticks
    this.startGrowthSystem();
    console.log('🌻 GardenSystem initialized!');
  }
  
  static getInstance(): GardenSystem {
    if (!GardenSystem.instance) {
      GardenSystem.instance = new GardenSystem();
    }
    return GardenSystem.instance;
  }
  
  /**
   * Créer un nouveau jardin
   */
  createGarden(id: string, position: { x: number; y: number }, soil: GardenPlot['soil'] = 'normal'): GardenPlot {
    const plot: GardenPlot = {
      id,
      position,
      soil
    };
    
    this.gardens.set(id, plot);
    console.log(`🏡 Created garden plot at (${position.x}, ${position.y}) with ${soil} soil`);
    
    return plot;
  }
  
  /**
   * Planter une graine
   */
  plant(gardenId: string, plantId: string): boolean {
    const plot = this.gardens.get(gardenId);
    const plant = this.plants.get(plantId);
    
    if (!plot || !plant) {
      console.warn('Garden or plant not found');
      return false;
    }
    
    if (plot.plant) {
      console.warn('Garden already has a plant!');
      return false;
    }
    
    // Vérifier qu'on a la graine
    const seedCount = resourceSystem.getInventory().get(plant.seedResource) || 0;
    if (seedCount < 1) {
      console.warn(`No ${plant.seedResource} available`);
      return false;
    }
    
    // Vérifier la compatibilité du sol
    if (plant.conditions?.soil && plant.conditions.soil !== plot.soil && plot.soil !== 'mystique') {
      console.warn(`${plant.name} needs ${plant.conditions.soil} soil`);
      return false;
    }
    
    // Planter !
    plot.plant = {
      type: plant,
      stage: 'seed',
      growth: 0,
      health: 100,
      watered: false
    };
    
    // Consommer la graine (non implémenté car resourceSystem est externe)
    console.log(`🌱 Planted ${plant.name} in garden ${gardenId}`);
    
    // Effet visuel
    this.showPlantEffect(plot.position, plant.growthStages.seed);
    
    return true;
  }
  
  /**
   * Arroser une plante
   */
  water(gardenId: string): boolean {
    const plot = this.gardens.get(gardenId);
    if (!plot || !plot.plant) {
      console.warn('No plant to water');
      return false;
    }
    
    plot.plant.watered = true;
    plot.plant.health = Math.min(100, plot.plant.health + 10);
    
    console.log(`💧 Watered ${plot.plant.type.name}`);
    
    // Effet visuel
    this.showWaterEffect(plot.position);
    
    return true;
  }
  
  /**
   * Appliquer un effet temporel
   */
  applyTemporalEffect(gardenId: string, effect: 'accelerate' | 'reverse' | 'freeze'): void {
    const plot = this.gardens.get(gardenId);
    if (!plot || !plot.plant) return;
    
    plot.plant.timeEffects = plot.plant.timeEffects || {};
    
    switch (effect) {
      case 'accelerate':
        plot.plant.timeEffects.accelerated = (plot.plant.timeEffects.accelerated || 1) * 2;
        console.log(`⚡ Time accelerated for ${plot.plant.type.name}!`);
        break;
      case 'reverse':
        plot.plant.timeEffects.reversed = true;
        console.log(`⏪ Time reversed for ${plot.plant.type.name}!`);
        break;
      case 'freeze':
        plot.plant.timeEffects.frozen = true;
        console.log(`⏸️ Time frozen for ${plot.plant.type.name}!`);
        break;
    }
  }
  
  /**
   * Appliquer la superposition quantique
   */
  applyQuantumSuperposition(gardenId: string): void {
    const plot = this.gardens.get(gardenId);
    if (!plot || !plot.plant) return;
    
    plot.enhancements = plot.enhancements || {};
    plot.enhancements.quantum = true;
    
    console.log(`🌀 ${plot.plant.type.name} is now in quantum superposition!`);
    console.log('   It exists in all growth stages simultaneously until observed!');
  }
  
  /**
   * Récolter
   */
  harvest(gardenId: string): { resource: string; quantity: number } | null {
    const plot = this.gardens.get(gardenId);
    if (!plot || !plot.plant) {
      console.warn('Nothing to harvest');
      return null;
    }
    
    const plant = plot.plant;
    
    // Superposition quantique - résultat aléatoire !
    if (plot.enhancements?.quantum) {
      plant.growth = Math.random() * 100;
      console.log(`🎲 Quantum collapse: Growth was ${plant.growth.toFixed(0)}%`);
    }
    
    // Vérifier si prêt
    if (plant.growth < 100) {
      console.warn(`Not ready to harvest (${plant.growth.toFixed(0)}% grown)`);
      return null;
    }
    
    // Calculer le rendement
    const healthMultiplier = plant.health / 100;
    const baseYield = plant.type.yield.min + 
      Math.random() * (plant.type.yield.max - plant.type.yield.min);
    const finalYield = Math.floor(baseYield * healthMultiplier);
    
    // Récolter
    const result = {
      resource: plant.type.harvestResource,
      quantity: finalYield
    };
    
    // Collecter dans l'inventaire
    resourceSystem.collect(result.resource, result.quantity, plot.position);
    
    // Nettoyer le jardin
    plot.plant = undefined;
    plot.enhancements = undefined;
    
    console.log(`🌾 Harvested ${result.quantity}x ${plant.type.harvestResource}!`);
    
    return result;
  }
  
  /**
   * Système de croissance automatique
   */
  private startGrowthSystem() {
    setInterval(() => this.growthTick(), 1000); // Tick toutes les secondes
  }
  
  private growthTick() {
    this.globalTick++;
    
    for (const plot of this.gardens.values()) {
      if (!plot.plant) continue;
      
      const plant = plot.plant;
      
      // Vérifier la stase temporelle
      if (plant.timeEffects?.frozen) continue;
      
      // Calculer la vitesse de croissance
      let growthRate = 100 / plant.type.growthTime;
      
      // Modificateurs
      if (plant.timeEffects?.accelerated) {
        growthRate *= plant.timeEffects.accelerated;
      }
      if (plant.timeEffects?.reversed) {
        growthRate *= -1;
      }
      if (!plant.watered && plant.type.conditions?.water) {
        growthRate *= 0.5;
        plant.health -= 5;
      }
      
      // Appliquer la croissance
      plant.growth = Math.max(0, Math.min(100, plant.growth + growthRate));
      
      // Mettre à jour le stade
      const oldStage = plant.stage;
      if (plant.growth === 0) plant.stage = 'seed';
      else if (plant.growth < 25) plant.stage = 'sprout';
      else if (plant.growth < 50) plant.stage = 'growing';
      else if (plant.growth < 75) plant.stage = 'mature';
      else plant.stage = 'harvest';
      
      // Notification de changement de stade
      if (oldStage !== plant.stage) {
        console.log(`🌱 ${plant.type.name} evolved to ${plant.stage} stage ${plant.type.growthStages[plant.stage]}`);
        this.showGrowthEffect(plot.position, plant.type.growthStages[plant.stage]);
      }
      
      // Reset arrosage
      plant.watered = false;
      
      // Effets spéciaux
      if (plant.type.specialEffects?.includes('volatile') && plant.growth > 90) {
        if (Math.random() < 0.05) {
          console.log(`💥 ${plant.type.name} exploded spontaneously!`);
          plot.plant = undefined;
        }
      }
    }
  }
  
  /**
   * Effets visuels
   */
  private showPlantEffect(position: { x: number; y: number }, icon: string) {
    const element = document.createElement('div');
    element.style.cssText = `
      position: fixed;
      left: ${position.x}px;
      top: ${position.y}px;
      font-size: 32px;
      animation: plant-grow 0.5s ease-out;
      pointer-events: none;
    `;
    element.textContent = icon;
    document.body.appendChild(element);
    setTimeout(() => element.remove(), 500);
  }
  
  private showWaterEffect(position: { x: number; y: number }) {
    const drops = ['💧', '💦', '💧'];
    drops.forEach((drop, i) => {
      setTimeout(() => {
        const element = document.createElement('div');
        element.style.cssText = `
          position: fixed;
          left: ${position.x + (i - 1) * 15}px;
          top: ${position.y - 20}px;
          font-size: 16px;
          animation: water-drop 0.5s ease-in;
          pointer-events: none;
        `;
        element.textContent = drop;
        document.body.appendChild(element);
        setTimeout(() => element.remove(), 500);
      }, i * 100);
    });
  }
  
  private showGrowthEffect(position: { x: number; y: number }, icon: string) {
    const element = document.createElement('div');
    element.style.cssText = `
      position: fixed;
      left: ${position.x}px;
      top: ${position.y}px;
      font-size: 24px;
      animation: growth-pulse 1s ease-out;
      pointer-events: none;
    `;
    element.textContent = `✨${icon}✨`;
    document.body.appendChild(element);
    setTimeout(() => element.remove(), 1000);
  }
  
  /**
   * Obtenir l'état d'un jardin
   */
  getGarden(id: string): GardenPlot | undefined {
    return this.gardens.get(id);
  }
  
  getAllGardens(): GardenPlot[] {
    return Array.from(this.gardens.values());
  }
}

// CSS pour les animations
if (typeof document !== 'undefined' && !document.getElementById('garden-system-styles')) {
  const style = document.createElement('style');
  style.id = 'garden-system-styles';
  style.textContent = `
    @keyframes plant-grow {
      from {
        transform: scale(0) rotate(0deg);
        opacity: 0;
      }
      to {
        transform: scale(1) rotate(360deg);
        opacity: 1;
      }
    }
    
    @keyframes water-drop {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      to {
        transform: translateY(20px);
        opacity: 0;
      }
    }
    
    @keyframes growth-pulse {
      0% {
        transform: scale(0.8);
        opacity: 0;
      }
      50% {
        transform: scale(1.2);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Export singleton
export const gardenSystem = GardenSystem.getInstance();

// Exposer globalement
if (typeof window !== 'undefined') {
  (window as any).GardenSystem = gardenSystem;
  console.log('🌻 GardenSystem available as window.GardenSystem');
  console.log('Try: GardenSystem.createGarden("test", {x:100, y:100})');
  console.log('     GardenSystem.plant("test", "crystal_flower")');
  console.log('     GardenSystem.water("test")');
  console.log('     GardenSystem.applyTemporalEffect("test", "accelerate")');
}
