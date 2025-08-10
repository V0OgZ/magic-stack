/**
 * 🎭 CastingManager - Gestionnaire de casting de sorts avec traduction
 * Gère les différents modes d'affichage selon les classes
 */

import { MagicStack } from '../api/MagicStackAPI';
import { fxManager } from './FXManager';
import { audioManager } from './AudioManager';

export type OutputMode = 'iconic' | 'literary' | 'runic' | 'quantum';
export type CharacterClass = 'warrior' | 'mage' | 'rogue' | 'priest' | 'temporal' | 'quantum';

interface CastResult {
  formula: string;
  output: {
    iconic?: string;    // Emojis/icônes
    literary?: string;  // Texte narratif
    runic?: string;     // Runes
    quantum?: string;   // Formules |ψ⟩
  };
  effects?: string[];  // FX à jouer
  sounds?: string[];   // Sons à jouer
}

class CastingManager {
  private static instance: CastingManager;
  
  // Configuration par classe
  private classConfig: Record<CharacterClass, {
    preferredMode: OutputMode;
    iconStyle: string;
    effectIntensity: number;
    signature: string;
  }> = {
    warrior: {
      preferredMode: 'iconic',
      iconStyle: 'bold',
      effectIntensity: 0.8,
      signature: '⚔️'
    },
    mage: {
      preferredMode: 'runic',
      iconStyle: 'mystical',
      effectIntensity: 1.0,
      signature: '🧙'
    },
    rogue: {
      preferredMode: 'iconic',
      iconStyle: 'subtle',
      effectIntensity: 0.3,
      signature: '🗡️'
    },
    priest: {
      preferredMode: 'literary',
      iconStyle: 'holy',
      effectIntensity: 0.6,
      signature: '✨'
    },
    temporal: {
      preferredMode: 'quantum',
      iconStyle: 'temporal',
      effectIntensity: 0.7,
      signature: '⏰'
    },
    quantum: {
      preferredMode: 'quantum',
      iconStyle: 'quantum',
      effectIntensity: 0.9,
      signature: '🌀'
    }
  };
  
  private constructor() {}
  
  static getInstance(): CastingManager {
    if (!CastingManager.instance) {
      CastingManager.instance = new CastingManager();
    }
    return CastingManager.instance;
  }
  
  /**
   * Lancer un sort avec traduction selon la classe
   */
  async cast(
    formula: string,
    caster: {
      class: CharacterClass;
      position: { x: number; y: number };
      level?: number;
    },
    target?: { x: number; y: number },
    options?: {
      forceMode?: OutputMode;
      silent?: boolean;
      subtle?: boolean;
    }
  ): Promise<CastResult> {
    const config = this.classConfig[caster.class];
    const mode = options?.forceMode || config.preferredMode;
    
    // Appel au backend Java pour la traduction
    const result = await MagicStack.java.castFormula(formula, {
      mode,
      caster_class: caster.class,
      caster_level: caster.level || 1,
      target_position: target,
      request_modes: ['iconic', 'literary', 'runic', 'quantum'] // On demande tous les modes
    });
    
    // Affichage sur la map selon le mode et la classe
    await this.displayCast(result, caster, target, config, options);
    
    return result;
  }
  
  /**
   * Afficher le cast sur la map
   */
  private async displayCast(
    result: CastResult,
    caster: { class: CharacterClass; position: { x: number; y: number } },
    target: { x: number; y: number } | undefined,
    config: any,
    options?: { silent?: boolean; subtle?: boolean }
  ) {
    // 1. Afficher l'icône du sort au-dessus du caster
    if (result.output.iconic) {
      this.showSpellIcon(caster.position, result.output.iconic, config);
    }
    
    // 2. Effet visuel selon la classe (TRÈS LÉGER comme demandé)
    if (!options?.subtle) {
      const intensity = options?.subtle ? 0.1 : config.effectIntensity;
      await this.playClassEffect(caster.class, caster.position, intensity);
    }
    
    // 3. Si il y a une cible, tracer la trajectoire
    if (target) {
      await this.showTrajectory(caster.position, target, caster.class);
    }
    
    // 4. Son selon la classe (si pas silencieux)
    if (!options?.silent) {
      this.playClassSound(caster.class);
    }
    
    // 5. Afficher le texte selon le mode préféré
    this.displayOutput(result, config.preferredMode, caster.position);
  }
  
  /**
   * Afficher l'icône du sort
   */
  private showSpellIcon(
    position: { x: number; y: number },
    icons: string,
    config: any
  ) {
    // Créer un élément pour l'icône
    const iconElement = document.createElement('div');
    iconElement.className = 'spell-icon';
    iconElement.style.cssText = `
      position: fixed;
      left: ${position.x}px;
      top: ${position.y - 30}px;
      font-size: 24px;
      z-index: 1000;
      animation: spell-icon-appear 0.5s ease-out;
      filter: drop-shadow(0 0 4px rgba(102, 126, 234, 0.6));
    `;
    iconElement.textContent = icons;
    
    document.body.appendChild(iconElement);
    
    // Animation de rotation légère selon la classe
    if (config.iconStyle === 'mystical') {
      iconElement.style.animation += ', rotate-slow 2s linear infinite';
    } else if (config.iconStyle === 'quantum') {
      iconElement.style.animation += ', pulse-quantum 1s ease-in-out infinite';
    }
    
    // Retirer après 2 secondes
    setTimeout(() => iconElement.remove(), 2000);
  }
  
  /**
   * Jouer l'effet visuel de la classe
   */
  private async playClassEffect(
    charClass: CharacterClass,
    position: { x: number; y: number },
    intensity: number
  ) {
    const effects: Record<CharacterClass, string> = {
      warrior: 'combat_slash',
      mage: 'magic_glow',
      rogue: 'stealth_fade',
      priest: 'holy_light',
      temporal: 'time_ripple',
      quantum: 'quantum_phase'
    };
    
    // Effet très léger comme demandé
    const element = document.createElement('div');
    element.style.cssText = `
      position: fixed;
      left: ${position.x}px;
      top: ${position.y}px;
      width: 40px;
      height: 40px;
      pointer-events: none;
      opacity: ${intensity * 0.5};
    `;
    document.body.appendChild(element);
    
    fxManager.play(effects[charClass], element);
    
    setTimeout(() => element.remove(), 1000);
  }
  
  /**
   * Montrer la trajectoire du sort
   */
  private async showTrajectory(
    from: { x: number; y: number },
    to: { x: number; y: number },
    charClass: CharacterClass
  ) {
    const colors: Record<CharacterClass, string> = {
      warrior: '#fc8181',
      mage: '#9f7aea',
      rogue: '#4a5568',
      priest: '#ffd700',
      temporal: '#63b3ed',
      quantum: '#48bb78'
    };
    
    // Créer une ligne de trajectoire
    const line = document.createElement('div');
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    const distance = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
    
    line.style.cssText = `
      position: fixed;
      left: ${from.x}px;
      top: ${from.y}px;
      width: ${distance}px;
      height: 2px;
      background: linear-gradient(90deg, 
        transparent, 
        ${colors[charClass]}, 
        transparent
      );
      transform-origin: 0 50%;
      transform: rotate(${angle}rad);
      opacity: 0;
      animation: trajectory-show 0.5s ease-out;
      pointer-events: none;
      z-index: 999;
    `;
    
    document.body.appendChild(line);
    setTimeout(() => line.remove(), 500);
  }
  
  /**
   * Jouer le son de la classe
   */
  private playClassSound(charClass: CharacterClass) {
    const sounds: Record<CharacterClass, string> = {
      warrior: 'combat_sword',
      mage: 'magic_cast',
      rogue: 'stealth_attack',
      priest: 'holy_heal',
      temporal: 'time_warp',
      quantum: 'quantum_shift'
    };
    
    audioManager.play(sounds[charClass]);
  }
  
  /**
   * Afficher le texte de sortie
   */
  private displayOutput(
    result: CastResult,
    mode: OutputMode,
    position: { x: number; y: number }
  ) {
    let text = '';
    
    switch (mode) {
      case 'iconic':
        text = result.output.iconic || '';
        break;
      case 'literary':
        text = result.output.literary || '';
        break;
      case 'runic':
        text = result.output.runic || '';
        break;
      case 'quantum':
        text = result.output.quantum || '';
        break;
    }
    
    if (!text) return;
    
    // Créer une bulle de texte discrète
    const bubble = document.createElement('div');
    bubble.className = 'cast-output';
    bubble.style.cssText = `
      position: fixed;
      left: ${position.x + 50}px;
      top: ${position.y - 20}px;
      padding: 8px 12px;
      background: rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(102, 126, 234, 0.5);
      border-radius: 8px;
      color: #e8ecff;
      font-size: 12px;
      max-width: 200px;
      opacity: 0;
      animation: bubble-appear 0.3s ease-out forwards;
      z-index: 1001;
      pointer-events: none;
    `;
    bubble.textContent = text;
    
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 3000);
  }
  
  /**
   * Exemple spécifique : Warrior avec gun + wormhole
   */
  async castWarriorCombo(
    position: { x: number; y: number },
    target: { x: number; y: number }
  ) {
    // Icône gun
    this.showSpellIcon(position, '🔫', this.classConfig.warrior);
    
    // Attendre un peu
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Icône wormhole
    this.showSpellIcon(target, '🌀', this.classConfig.warrior);
    
    // Trajectoire entre les deux
    await this.showTrajectory(position, target, 'warrior');
    
    // Sons
    audioManager.play('weapon_gun');
    setTimeout(() => audioManager.play('magic_portal'), 300);
    
    // Effet léger de portal à la cible
    const portalElement = document.createElement('div');
    portalElement.style.cssText = `
      position: fixed;
      left: ${target.x - 20}px;
      top: ${target.y - 20}px;
      width: 40px;
      height: 40px;
      border: 2px solid #9f7aea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      opacity: 0.5;
      pointer-events: none;
    `;
    document.body.appendChild(portalElement);
    
    setTimeout(() => portalElement.remove(), 1500);
  }
}

// Injecter les styles CSS pour les animations
if (typeof document !== 'undefined' && !document.getElementById('casting-manager-styles')) {
  const style = document.createElement('style');
  style.id = 'casting-manager-styles';
  style.textContent = `
    @keyframes spell-icon-appear {
      from {
        opacity: 0;
        transform: translateY(10px) scale(0.5);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    @keyframes rotate-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes pulse-quantum {
      0%, 100% { 
        transform: scale(1); 
        filter: hue-rotate(0deg) drop-shadow(0 0 4px rgba(72, 187, 120, 0.6));
      }
      50% { 
        transform: scale(1.1); 
        filter: hue-rotate(180deg) drop-shadow(0 0 8px rgba(159, 122, 234, 0.8));
      }
    }
    
    @keyframes trajectory-show {
      from { opacity: 0; width: 0; }
      to { opacity: 0.6; width: 100%; }
    }
    
    @keyframes bubble-appear {
      from { 
        opacity: 0; 
        transform: translateX(-10px);
      }
      to { 
        opacity: 1; 
        transform: translateX(0);
      }
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

// Export singleton
export const castingManager = CastingManager.getInstance();

// Exposer globalement pour tests
if (typeof window !== 'undefined') {
  (window as any).CastingManager = castingManager;
  console.log('🎭 CastingManager available as window.CastingManager');
  console.log('Example: CastingManager.castWarriorCombo({x:100,y:100}, {x:300,y:200})');
}
