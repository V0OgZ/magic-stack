/**
 * 🧠 AI SERVICE - Communication avec Clippy Dev Server
 * 
 * Service central pour toutes les interactions IA :
 * - Dialogues dynamiques générés par LLM
 * - Stratégies de combat intelligentes
 * - Conversations entre personnages
 * - Narration contextuelle
 */

import { Hero } from '../data/heroes';
import { Creature } from '../data/creatures';

// === TYPES ===

export interface GameContext {
  // Stats vitales
  hp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  
  // État de bataille
  turn: number;
  winning: boolean;
  desperate: boolean;
  confident: boolean;
  
  // Historique
  lastAction?: string;
  lastDamage?: number;
  combo?: number;
  battleHistory?: string[];
  
  // Contexte spatial
  position?: { x: number; y: number; z: number };
  terrain?: 'grass' | 'forest' | 'mountain' | 'water' | 'desert' | 'snow';
  nearbyEnemies?: number;
  
  // Contexte temporel
  timePhase?: 'past' | 'present' | 'future';
  temporalDrift?: number;
  paradoxes?: number;
  timeline?: string;
  day?: number;
  
  // Relations
  playerName?: string;
  relationship?: number; // -100 à 100
  faction?: string;
  
  // Équipement notable
  weapon?: string;
  artifact?: string;
  
  // État émotionnel dérivé
  criticalHit?: boolean;
  justGotHit?: boolean;
  justMissed?: boolean;
  justKilled?: boolean;
}

export interface CharacterResponse {
  character: string;
  response: string;
  emotion?: 'angry' | 'confident' | 'desperate' | 'happy' | 'sad' | 'neutral';
  personality?: {
    archetype: string;
    traits: string[];
  };
}

export interface AIStrategy {
  thought: string;
  action: string;
  confidence: number;
  reasoning?: string;
}

export interface DialogueTurn {
  character: string;
  text: string;
  emotion?: string;
}

// === SERVICE PRINCIPAL ===

class AIService {
  private baseUrl = 'http://localhost:8889';
  private cache = new Map<string, { response: any; timestamp: number }>();
  private cacheTimeout = 30000; // 30 secondes
  
  // Fallback si le serveur IA est offline
  private fallbackDialogues: Record<string, string[]> = {
    'arthur_pendragon': [
      "Pour Camelot et l'honneur !",
      "Excalibur guide ma lame !",
      "Un roi protège son peuple à travers toutes les timelines.",
      "La justice transcende le temps lui-même.",
      "Même dans la défaite, l'honneur demeure."
    ],
    'merlin': [
      "Le temps n'est pas ce qu'il semble être...",
      "J'ai vu votre futur... ou était-ce votre passé ?",
      "Les paradoxes temporels sont dangereux, faites attention.",
      "La magie coule à travers les époques.",
      "Votre destin est écrit dans les étoiles d'hier."
    ],
    'groeken': [
      "HAHAHA! J'ai hacké le temps lui-même !",
      "Git push --force sur la timeline, YOLO !",
      "J'ai créé ce bug exprès en 1985 !",
      "Ctrl+Z sur la réalité, GG EZ !",
      "Le code source de l'univers a des failles..."
    ],
    'jean_grofignon': [
      "Mais qu'est-ce que le temps, au fond ?",
      "Si hier est demain, alors quand sommes-nous ?",
      "L'existence précède l'essence... sauf le mardi.",
      "La philosophie quantique est ma passion.",
      "Être ou ne pas être ? Les deux, simultanément !"
    ],
    'dude': [
      "Yeah, well, that's just like, your temporal opinion, man.",
      "This aggression across timelines will not stand.",
      "Sometimes you eat the timeline, sometimes the timeline eats you.",
      "The Dude abides... in all dimensions.",
      "That rug really tied the spacetime continuum together."
    ],
    'dragon_rouge_temporel': [
      "JE SUIS L'ALPHA ET L'OMEGA DES TIMELINES !",
      "Mille ans de fureur dans mes flammes !",
      "Tu oses défier un gardien du temps ?!",
      "Mes écailles ont vu naître et mourir des univers !",
      "BRÛLE DANS LES FLAMMES DE L'ÉTERNITÉ !"
    ],
    'default': [
      "...",
      "Intéressant.",
      "Je vois.",
      "Continue.",
      "Hmm."
    ]
  };
  
  /**
   * Fait parler un personnage avec contexte complet
   */
  async getCharacterSpeech(
    character: string,
    context: GameContext,
    message?: string
  ): Promise<CharacterResponse> {
    // Vérifier le cache
    const cacheKey = `${character}-${JSON.stringify(context)}`;
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.response;
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/character/speak`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          character,
          message: message || this.generateContextMessage(context),
          context
        })
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      
      // Ajouter l'émotion déduite du contexte
      data.emotion = this.detectEmotion(context, data.response);
      
      // Mettre en cache
      this.cache.set(cacheKey, { response: data, timestamp: Date.now() });
      
      return data;
    } catch (error) {
      console.warn('IA Service offline, using fallback:', error);
      return this.getFallbackResponse(character, context);
    }
  }
  
  /**
   * L'IA réfléchit à sa stratégie
   */
  async getAIStrategy(
    gameState: any,
    difficulty: 'easy' | 'medium' | 'hard' = 'medium'
  ): Promise<AIStrategy> {
    try {
      const response = await fetch(`${this.baseUrl}/ai/think`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_state: gameState,
          difficulty
        })
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      return await response.json();
    } catch (error) {
      console.warn('IA Strategy offline, using fallback');
      return this.getFallbackStrategy(gameState);
    }
  }
  
  /**
   * Génère un dialogue entre deux personnages
   */
  async generateDialogue(
    character1: string,
    character2: string,
    topic: string,
    turns: number = 3
  ): Promise<DialogueTurn[]> {
    try {
      const response = await fetch(`${this.baseUrl}/dialogue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          character1,
          character2,
          topic,
          turns
        })
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      return await response.json();
    } catch (error) {
      console.warn('Dialogue generation offline');
      return this.getFallbackDialogue(character1, character2, topic, turns);
    }
  }
  
  /**
   * Narration contextuelle (pour événements de jeu)
   */
  async getNarration(event: string, context: any): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/narrate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, context })
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      return data.narration;
    } catch (error) {
      return this.getFallbackNarration(event, context);
    }
  }
  
  // === MÉTHODES PRIVÉES ===
  
  private generateContextMessage(context: GameContext): string {
    const parts = [];
    
    if (context.justGotHit && context.lastDamage) {
      parts.push(`Just took ${context.lastDamage} damage`);
    }
    if (context.criticalHit) {
      parts.push('Critical hit!');
    }
    if (context.hp < context.maxHp * 0.3) {
      parts.push('Low on health');
    }
    if (context.winning) {
      parts.push('Currently winning');
    }
    if (context.combo && context.combo > 2) {
      parts.push(`${context.combo} hit combo!`);
    }
    if (context.weapon) {
      parts.push(`Player using ${context.weapon}`);
    }
    if (context.paradoxes && context.paradoxes > 0) {
      parts.push(`${context.paradoxes} temporal paradoxes active`);
    }
    
    return parts.join(', ') || 'Battle continues';
  }
  
  private detectEmotion(context: GameContext, response: string): CharacterResponse['emotion'] {
    // Analyse du contexte pour déduire l'émotion
    if (context.hp < context.maxHp * 0.2) return 'desperate';
    if (context.justGotHit && context.lastDamage && context.lastDamage > 30) return 'angry';
    if (context.winning && context.hp > context.maxHp * 0.7) return 'confident';
    if (context.justKilled) return 'happy';
    
    // Analyse du texte de la réponse
    const lowerResponse = response.toLowerCase();
    if (lowerResponse.includes('haha') || lowerResponse.includes('!')) return 'confident';
    if (lowerResponse.includes('...') || lowerResponse.includes('impossible')) return 'sad';
    if (lowerResponse.includes('grr') || lowerResponse.includes('rage')) return 'angry';
    
    return 'neutral';
  }
  
  private getFallbackResponse(character: string, context: GameContext): CharacterResponse {
    const dialogues = this.fallbackDialogues[character] || this.fallbackDialogues.default;
    
    // Sélectionner une phrase basée sur le contexte
    let index = 0;
    if (context.hp < context.maxHp * 0.3) {
      index = dialogues.length - 1; // Dernière phrase (désespérée)
    } else if (context.winning) {
      index = 0; // Première phrase (confiante)
    } else {
      index = Math.floor(Math.random() * dialogues.length);
    }
    
    return {
      character,
      response: dialogues[index],
      emotion: this.detectEmotion(context, dialogues[index])
    };
  }
  
  private getFallbackStrategy(gameState: any): AIStrategy {
    // Stratégie simple basée sur l'état
    if (gameState.ai_hp < 30) {
      return {
        thought: "Je suis en danger, je dois me défendre !",
        action: "defend",
        confidence: 0.9
      };
    } else if (gameState.player_hp < 30) {
      return {
        thought: "L'ennemi est faible, j'attaque !",
        action: "attack_aggressive",
        confidence: 0.85
      };
    } else {
      return {
        thought: "Combat équilibré, je reste prudent.",
        action: "attack_balanced",
        confidence: 0.7
      };
    }
  }
  
  private getFallbackDialogue(
    character1: string,
    character2: string,
    topic: string,
    turns: number
  ): DialogueTurn[] {
    const dialogue: DialogueTurn[] = [];
    
    for (let i = 0; i < turns; i++) {
      const char1Lines = this.fallbackDialogues[character1] || this.fallbackDialogues.default;
      const char2Lines = this.fallbackDialogues[character2] || this.fallbackDialogues.default;
      
      dialogue.push({
        character: character1,
        text: char1Lines[i % char1Lines.length],
        emotion: 'neutral'
      });
      
      dialogue.push({
        character: character2,
        text: char2Lines[(i + 1) % char2Lines.length],
        emotion: 'neutral'
      });
    }
    
    return dialogue;
  }
  
  private getFallbackNarration(event: string, context: any): string {
    const narrations: Record<string, string> = {
      'combat_start': "Le combat commence ! Les destins s'entrechoquent !",
      'critical_hit': "Un coup dévastateur traverse les défenses !",
      'low_health': "Les forces s'amenuisent, la fin approche...",
      'victory': "Victoire ! Le vainqueur se dresse, triomphant !",
      'defeat': "Défaite... Les ténèbres engloutissent le guerrier.",
      'temporal_paradox': "Un paradoxe temporel déchire la réalité !",
      'treasure_found': "Un trésor ancien révèle ses secrets !",
      'quest_complete': "Quête accomplie ! La légende grandit !",
      'default': "L'aventure continue..."
    };
    
    return narrations[event] || narrations.default;
  }
  
  /**
   * Test de connexion au serveur IA
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
  
  /**
   * Streaming de réponse (affichage progressif)
   */
  async* streamCharacterSpeech(
    character: string,
    context: GameContext
  ): AsyncGenerator<string> {
    const fullResponse = await this.getCharacterSpeech(character, context);
    const words = fullResponse.response.split(' ');
    
    for (const word of words) {
      yield word + ' ';
      await new Promise(resolve => setTimeout(resolve, 50)); // Délai entre mots
    }
  }
}

// Export singleton
export const aiService = new AIService();

// === HOOKS REACT ===

export function useAICharacter(characterId: string) {
  const [isThinking, setIsThinking] = React.useState(false);
  const [lastResponse, setLastResponse] = React.useState<CharacterResponse | null>(null);
  const [emotion, setEmotion] = React.useState<CharacterResponse['emotion']>('neutral');
  
  const speak = React.useCallback(async (context: GameContext, message?: string) => {
    setIsThinking(true);
    try {
      const response = await aiService.getCharacterSpeech(characterId, context, message);
      setLastResponse(response);
      setEmotion(response.emotion || 'neutral');
      return response;
    } finally {
      setIsThinking(false);
    }
  }, [characterId]);
  
  const think = React.useCallback(async (gameState: any) => {
    setIsThinking(true);
    try {
      return await aiService.getAIStrategy(gameState);
    } finally {
      setIsThinking(false);
    }
  }, []);
  
  return {
    speak,
    think,
    isThinking,
    lastResponse,
    emotion
  };
}

// Hook pour les dialogues streamés
export function useStreamedDialogue() {
  const [currentText, setCurrentText] = React.useState('');
  const [isStreaming, setIsStreaming] = React.useState(false);
  
  const stream = React.useCallback(async (
    character: string,
    context: GameContext
  ) => {
    setIsStreaming(true);
    setCurrentText('');
    
    try {
      for await (const chunk of aiService.streamCharacterSpeech(character, context)) {
        setCurrentText(prev => prev + chunk);
      }
    } finally {
      setIsStreaming(false);
    }
  }, []);
  
  return {
    currentText,
    isStreaming,
    stream
  };
}

import React from 'react';
