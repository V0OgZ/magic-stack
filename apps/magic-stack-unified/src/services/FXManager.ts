// @ts-nocheck
/**
 * ✨ FXManager - Gestionnaire d'effets visuels
 * Utilise les presets de fx_presets.json créés par l'Archéologue
 */

// Import des FX depuis les assets de l'autre Claude
let fxPresets: any = { presets: [], categories: [] };

interface FXAnimation {
  id: string;
  element: HTMLElement;
  startTime: number;
  duration: number;
  preset: any;
}

class FXManager {
  private static instance: FXManager;
  private activeAnimations: Map<string, FXAnimation> = new Map();
  private enabled: boolean = true;
  private quality: 'low' | 'medium' | 'high' = 'high';
  
  private constructor() {
    this.init();
  }
  
  static getInstance(): FXManager {
    if (!FXManager.instance) {
      FXManager.instance = new FXManager();
    }
    return FXManager.instance;
  }
  
  private init() {
    // Injecter les styles CSS pour les animations
    this.injectStyles();
    console.log('✨ FXManager initialized with', fxPresets.presets.length, 'presets');
  }
  
  private injectStyles() {
    if (document.getElementById('fx-manager-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'fx-manager-styles';
    style.textContent = `
      @keyframes fx-glow {
        0%, 100% { filter: drop-shadow(0 0 10px var(--fx-color, #667eea)); }
        50% { filter: drop-shadow(0 0 30px var(--fx-color, #667eea)); }
      }
      
      @keyframes fx-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
      
      @keyframes fx-shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      @keyframes fx-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      @keyframes fx-flash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      
      @keyframes fx-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes fx-fade-in {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
      }
      
      @keyframes fx-fade-out {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.8); }
      }
      
      @keyframes fx-ripple {
        from {
          transform: scale(0);
          opacity: 1;
        }
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      @keyframes fx-quantum {
        0% { filter: hue-rotate(0deg) brightness(1); }
        33% { filter: hue-rotate(120deg) brightness(1.5); }
        66% { filter: hue-rotate(240deg) brightness(0.8); }
        100% { filter: hue-rotate(360deg) brightness(1); }
      }
      
      .fx-particle {
        position: absolute;
        pointer-events: none;
        animation: fx-particle-float 2s ease-out forwards;
      }
      
      @keyframes fx-particle-float {
        from {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        to {
          transform: translateY(-100px) scale(0);
          opacity: 0;
        }
      }
      
      .fx-trail {
        position: absolute;
        pointer-events: none;
        background: linear-gradient(90deg, transparent, var(--fx-color, #667eea), transparent);
        animation: fx-trail-fade 0.5s ease-out forwards;
      }
      
      @keyframes fx-trail-fade {
        from { opacity: 0.8; width: 100px; }
        to { opacity: 0; width: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  /**
   * Jouer un effet visuel
   * @param presetId ID du preset depuis fx_presets.json
   * @param target Element HTML cible ou position {x, y}
   */
  play(presetId: string, target: HTMLElement | { x: number; y: number }): string | null {
    if (!this.enabled) return null;
    
    // Trouver le preset
    const preset = fxPresets.presets.find(p => p.id === presetId);
    if (!preset) {
      console.warn(`FX preset not found: ${presetId}`);
      return null;
    }
    
    // Ajuster selon la qualité
    if (this.quality === 'low' && preset.performance_impact === 'high') {
      return null; // Skip heavy effects on low quality
    }
    
    // Créer l'élément cible si c'est une position
    let element: HTMLElement;
    if (target instanceof HTMLElement) {
      element = target;
    } else {
      element = this.createEffectElement(target.x, target.y);
    }
    
    // Appliquer l'effet selon le type
    const animationId = `fx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    switch (preset.type) {
      case 'glow':
        this.applyGlow(element, preset);
        break;
      case 'pulse':
        this.applyPulse(element, preset);
        break;
      case 'shake':
        this.applyShake(element, preset);
        break;
      case 'particle':
        this.createParticles(element, preset);
        break;
      case 'trail':
        this.createTrail(element, preset);
        break;
      case 'transform':
        this.applyTransform(element, preset);
        break;
      case 'filter':
        this.applyFilter(element, preset);
        break;
      case 'combo':
        this.playCombo(element, preset);
        break;
    }
    
    // Enregistrer l'animation
    this.activeAnimations.set(animationId, {
      id: animationId,
      element,
      startTime: Date.now(),
      duration: preset.duration,
      preset
    });
    
    // Nettoyer après la durée
    setTimeout(() => {
      this.cleanup(animationId);
    }, preset.duration);
    
    return animationId;
  }
  
  private applyGlow(element: HTMLElement, preset: any) {
    element.style.setProperty('--fx-color', preset.params.color);
    element.style.animation = `fx-glow ${preset.duration}ms ${preset.params.easing || 'ease-in-out'}`;
    if (preset.params.intensity) {
      element.style.filter = `brightness(${1 + preset.params.intensity * 0.5})`;
    }
  }
  
  private applyPulse(element: HTMLElement, preset: any) {
    element.style.animation = `fx-pulse ${preset.duration}ms ${preset.params.easing || 'ease-in-out'}`;
    if (preset.params.count && preset.params.count > 1) {
      element.style.animationIterationCount = preset.params.count.toString();
    }
  }
  
  private applyShake(element: HTMLElement, preset: any) {
    element.style.animation = `fx-shake ${preset.duration}ms ${preset.params.easing || 'linear'}`;
    if (preset.params.intensity) {
      element.style.setProperty('--fx-shake-amount', `${preset.params.intensity * 10}px`);
    }
  }
  
  private createParticles(element: HTMLElement, preset: any) {
    const count = preset.params.count || 10;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'fx-particle';
      particle.style.left = `${rect.left + rect.width / 2}px`;
      particle.style.top = `${rect.top + rect.height / 2}px`;
      particle.style.width = `${preset.params.size || 4}px`;
      particle.style.height = `${preset.params.size || 4}px`;
      particle.style.background = preset.params.color || '#667eea';
      particle.style.borderRadius = '50%';
      particle.style.animationDelay = `${i * 50}ms`;
      
      // Direction aléatoire
      const angle = (Math.PI * 2 * i) / count;
      particle.style.setProperty('--fx-dx', `${Math.cos(angle) * 50}px`);
      particle.style.setProperty('--fx-dy', `${Math.sin(angle) * 50}px`);
      
      document.body.appendChild(particle);
      
      // Nettoyer après animation
      setTimeout(() => particle.remove(), preset.duration);
    }
  }
  
  private createTrail(element: HTMLElement, preset: any) {
    const trail = document.createElement('div');
    trail.className = 'fx-trail';
    const rect = element.getBoundingClientRect();
    trail.style.left = `${rect.left}px`;
    trail.style.top = `${rect.top + rect.height / 2}px`;
    trail.style.height = '2px';
    trail.style.setProperty('--fx-color', preset.params.color || '#667eea');
    
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 500);
  }
  
  private applyTransform(element: HTMLElement, preset: any) {
    const { scale, rotate, translate } = preset.params;
    let transform = '';
    
    if (scale) transform += `scale(${scale}) `;
    if (rotate) transform += `rotate(${rotate}deg) `;
    if (translate) transform += `translate(${translate.x}px, ${translate.y}px)`;
    
    element.style.transform = transform;
    element.style.transition = `transform ${preset.duration}ms ${preset.params.easing || 'ease'}`;
    
    // Reset après l'animation
    setTimeout(() => {
      element.style.transform = '';
    }, preset.duration);
  }
  
  private applyFilter(element: HTMLElement, preset: any) {
    const filters = [];
    if (preset.params.blur) filters.push(`blur(${preset.params.blur}px)`);
    if (preset.params.brightness) filters.push(`brightness(${preset.params.brightness})`);
    if (preset.params.hue) filters.push(`hue-rotate(${preset.params.hue}deg)`);
    
    element.style.filter = filters.join(' ');
    element.style.transition = `filter ${preset.duration}ms ${preset.params.easing || 'ease'}`;
    
    // Reset après l'animation
    setTimeout(() => {
      element.style.filter = '';
    }, preset.duration);
  }
  
  private playCombo(element: HTMLElement, preset: any) {
    const effects = preset.params.effects || [];
    let delay = 0;
    
    effects.forEach((effectId: string) => {
      setTimeout(() => {
        this.play(effectId, element);
      }, delay);
      
      const effectPreset = fxPresets.presets.find(p => p.id === effectId);
      if (effectPreset) {
        delay += effectPreset.duration * (preset.params.overlap || 0.5);
      }
    });
  }
  
  private createEffectElement(x: number, y: number): HTMLElement {
    const element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.pointerEvents = 'none';
    element.style.zIndex = '9999';
    document.body.appendChild(element);
    return element;
  }
  
  private cleanup(animationId: string) {
    const animation = this.activeAnimations.get(animationId);
    if (animation) {
      // Reset styles
      animation.element.style.animation = '';
      animation.element.style.transform = '';
      animation.element.style.filter = '';
      
      // Remove if it was created for effect
      if (animation.element.style.pointerEvents === 'none') {
        animation.element.remove();
      }
      
      this.activeAnimations.delete(animationId);
    }
  }
  
  /**
   * Arrêter un effet en cours
   */
  stop(animationId: string) {
    this.cleanup(animationId);
  }
  
  /**
   * Arrêter tous les effets
   */
  stopAll() {
    this.activeAnimations.forEach((_, id) => this.cleanup(id));
  }
  
  /**
   * Régler la qualité des effets
   */
  setQuality(quality: 'low' | 'medium' | 'high') {
    this.quality = quality;
    console.log(`✨ FX quality set to ${quality}`);
  }
  
  /**
   * Activer/désactiver les effets
   */
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) this.stopAll();
    console.log(`✨ FX ${enabled ? 'enabled' : 'disabled'}`);
  }
  
  /**
   * Obtenir les catégories d'effets
   */
  getCategories(): string[] {
    return fxPresets.categories;
  }
  
  /**
   * Obtenir les effets par catégorie
   */
  getEffectsByCategory(category: string) {
    return fxPresets.presets.filter(p => p.category === category);
  }
}

// Export singleton
export const fxManager = FXManager.getInstance();

// Exposer globalement pour debug
if (typeof window !== 'undefined') {
  (window as any).FXManager = fxManager;
  console.log('✨ FXManager available as window.FXManager');
}
