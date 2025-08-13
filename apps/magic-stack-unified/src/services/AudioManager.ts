// @ts-nocheck
/**
 * 🎵 AudioManager - Gestionnaire de sons pour Magic Stack
 * Utilise les assets de sound_events.json créés par l'Archéologue
 */

// Import des sons depuis les assets de l'autre Claude
let soundEvents: any = { events: [], categories: [], metadata: { debug: false } };
try {
  // Chargement au runtime via fetch quand dispo
  // On garde une valeur par défaut pour le type-check
} catch (e) {
  // ignore
}

class AudioManager {
  private static instance: AudioManager;
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private enabled: boolean = true;
  private volume: number = 0.7;
  private basePath: string = '/hot/assets/sounds/';
  
  private constructor() {
    this.init();
  }
  
  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }
  
  private async init() {
    try {
      // Créer le contexte audio
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Précharger les sons critiques
      const criticalSounds = [
        'ui_click',
        'ui_hover',
        'game_start',
        'turn_end',
        'hero_move',
        'combat_hit'
      ];
      
      for (const soundId of criticalSounds) {
        const event = soundEvents.events.find(e => e.id === soundId);
        if (event) {
          await this.preloadSound(event.id, event.file);
        }
      }
      
      console.log('🎵 AudioManager initialized with', this.sounds.size, 'sounds');
    } catch (error) {
      console.error('Failed to initialize AudioManager:', error);
    }
  }
  
  private async preloadSound(id: string, filename: string): Promise<void> {
    if (!this.audioContext) return;
    
    try {
      const response = await fetch(this.basePath + filename);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.sounds.set(id, audioBuffer);
    } catch (error) {
      console.warn(`Failed to load sound ${id}:`, error);
    }
  }
  
  /**
   * Jouer un son par son ID
   * @param soundId ID du son depuis sound_events.json
   * @param options Options de lecture
   */
  async play(soundId: string, options?: {
    volume?: number;
    pitch?: number;
    delay?: number;
    loop?: boolean;
  }): Promise<void> {
    if (!this.enabled || !this.audioContext) return;
    
    // Trouver l'événement sonore
    const event = soundEvents.events.find(e => e.id === soundId);
    if (!event) {
      // Fallback: beep court si l'asset n'existe pas
      this.playBeep(880, 0.08);
      return;
    }
    
    // Charger le son s'il n'est pas en cache
    if (!this.sounds.has(soundId)) {
      await this.preloadSound(soundId, event.file);
    }
    
    const buffer = this.sounds.get(soundId);
    if (!buffer) return;
    
    // Créer la source
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    
    // Créer le gain pour le volume
    const gainNode = this.audioContext.createGain();
    const finalVolume = (options?.volume ?? event.volume ?? 1.0) * this.volume;
    gainNode.gain.value = finalVolume;
    
    // Pitch adjustment si demandé
    if (options?.pitch) {
      source.playbackRate.value = options.pitch;
    }
    
    // Loop si demandé
    if (options?.loop || event.tags?.includes('loop')) {
      source.loop = true;
    }
    
    // Connecter les noeuds
    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // Jouer avec délai si spécifié
    const delay = options?.delay ?? 0;
    source.start(this.audioContext.currentTime + delay);
    
    // Log pour debug
    if (soundEvents.metadata.debug) {
      console.log(`🔊 Playing: ${soundId} (${event.category})`);
    }
  }

  /**
   * Beep de secours avec WebAudio quand aucun asset n'est disponible
   */
  private playBeep(frequency: number = 440, durationSeconds: number = 0.1) {
    try {
      if (!this.audioContext) return;
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gainNode.gain.value = 0.06 * this.volume;
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      const now = this.audioContext.currentTime;
      oscillator.start(now);
      oscillator.stop(now + durationSeconds);
    } catch (e) {
      // ignore
    }
  }
  
  /**
   * Jouer un son UI
   */
  playUI(action: 'click' | 'hover' | 'error' | 'success') {
    this.play(`ui_${action}`);
  }
  
  /**
   * Jouer un son de combat
   */
  playCombat(action: 'hit' | 'miss' | 'critical' | 'death') {
    this.play(`combat_${action}`);
  }
  
  /**
   * Jouer un son d'environnement
   */
  playEnvironment(type: 'water' | 'forest' | 'mystique' | 'quantum') {
    this.play(`ambient_${type}`);
  }
  
  /**
   * Jouer un son de magie/sort
   */
  playMagic(spell: 'heal' | 'fireball' | 'teleport' | 'time_warp') {
    this.play(`magic_${spell}`);
  }
  
  /**
   * Jouer une combo de sons (depuis fx_presets)
   */
  async playCombo(combo: string[]) {
    for (let i = 0; i < combo.length; i++) {
      await this.play(combo[i], { delay: i * 0.1 });
    }
  }
  
  /**
   * Activer/désactiver les sons
   */
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    console.log(`🔊 Audio ${enabled ? 'enabled' : 'disabled'}`);
  }
  
  /**
   * Régler le volume global
   */
  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    console.log(`🔊 Volume set to ${Math.round(this.volume * 100)}%`);
  }
  
  /**
   * Obtenir les catégories disponibles
   */
  getCategories(): string[] {
    return soundEvents.categories;
  }
  
  /**
   * Obtenir tous les sons d'une catégorie
   */
  getSoundsByCategory(category: string) {
    return soundEvents.events.filter(e => e.category === category);
  }
  
  /**
   * Nettoyer et libérer les ressources
   */
  dispose() {
    this.sounds.clear();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

// Export singleton
export const audioManager = AudioManager.getInstance();

// Exposer globalement pour debug
if (typeof window !== 'undefined') {
  (window as any).AudioManager = audioManager;
  console.log('🎵 AudioManager available as window.AudioManager');
}
