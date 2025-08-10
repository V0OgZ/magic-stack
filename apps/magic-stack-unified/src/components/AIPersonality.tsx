import React, { useState, useEffect, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';

interface CharacterSpeechProps {
  characterId: string;
  onSpeak?: (text: string) => void;
}

// Configuration des personnalités
const CHARACTER_EMOJIS: Record<string, string> = {
  merlin: '🧙‍♂️',
  arthur: '👑',
  groeken: '💻',
  vince: '🎮',
  anna: '⏰',
  overload: '💥',
  dragon: '🐉',
  clippy: '📎'
};

// API pour les personnalités IA
const AI_API_URL = 'http://localhost:8889';

export const AIPersonality: React.FC<CharacterSpeechProps> = ({ 
  characterId, 
  onSpeak 
}) => {
  const [speech, setSpeech] = useState<string>('');
  const [isThinking, setIsThinking] = useState(false);
  const [isLLMAvailable, setIsLLMAvailable] = useState(false);
  
  const gameState = useGameStore();

  // Vérifier si le LLM est disponible
  useEffect(() => {
    fetch(`${AI_API_URL}/health`)
      .then(res => res.ok && setIsLLMAvailable(true))
      .catch(() => setIsLLMAvailable(false));
  }, []);

  // Faire parler le personnage
  const makeCharacterSpeak = useCallback(async (
    context: string = '',
    playerMessage: string = ''
  ) => {
    if (!isLLMAvailable) {
      // Fallback sur des phrases scriptées
      const fallbackPhrases: Record<string, string[]> = {
        merlin: [
          "Le temps n'est qu'une illusion...",
          "J'ai déjà vu ta défaite... demain !",
          "Les paradoxes sont mes amis."
        ],
        arthur: [
          "Pour Camelot !",
          "Excalibur guide ma main.",
          "L'honneur avant tout."
        ],
        groeken: [
          "J'ai codé ça en BASIC !",
          "C'est un feature, pas un bug !",
          "GG EZ NOOB !"
        ],
        dragon: [
          "*Grondement menaçant*",
          "Tu brûleras dans l'éternité !",
          "Mille ans de rage !"
        ]
      };
      
      const phrases = fallbackPhrases[characterId] || ["..."];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setSpeech(randomPhrase);
      onSpeak?.(randomPhrase);
      return;
    }

    setIsThinking(true);
    
    try {
      // Construire le contexte de jeu
      const gameContext = {
        turn: gameState.currentTurn,
        playerHp: gameState.playerHp,
        enemyHp: gameState.enemyHp,
        lastAction: gameState.lastAction,
        winning: gameState.enemyHp > gameState.playerHp
      };

      const response = await fetch(`${AI_API_URL}/character/speak`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          character: characterId,
          message: playerMessage,
          context: JSON.stringify(gameContext)
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSpeech(data.response);
        onSpeak?.(data.response);
      }
    } catch (error) {
      console.error('AI speech error:', error);
      setSpeech("...");
    } finally {
      setIsThinking(false);
    }
  }, [characterId, gameState, isLLMAvailable, onSpeak]);

  // Auto-parler selon les événements du jeu
  useEffect(() => {
    // Début de partie
    if (gameState.currentTurn === 1 && !speech) {
      makeCharacterSpeak("Battle starts");
    }
    
    // Premier sang
    if (gameState.firstBlood && !speech.includes("First")) {
      makeCharacterSpeak("First blood taken");
    }
    
    // Low HP
    if (gameState.enemyHp < 20 && !speech.includes("desperate")) {
      makeCharacterSpeak("Low HP, desperate situation");
    }
  }, [gameState, makeCharacterSpeak, speech]);

  return (
    <div className="ai-personality-container">
      <div className="character-avatar">
        <span className="emoji">{CHARACTER_EMOJIS[characterId] || '🤖'}</span>
        <span className="name">{characterId}</span>
      </div>
      
      {isThinking && (
        <div className="thinking-bubble">
          <span className="dots">...</span>
        </div>
      )}
      
      {speech && !isThinking && (
        <div className="speech-bubble">
          <p>{speech}</p>
        </div>
      )}
      
      {!isLLMAvailable && (
        <div className="llm-status">
          <small>💡 Active le LLM avec ./llm start pour des dialogues dynamiques !</small>
        </div>
      )}
      
      <style jsx>{`
        .ai-personality-container {
          position: relative;
          padding: 10px;
          margin: 10px 0;
        }
        
        .character-avatar {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        
        .emoji {
          font-size: 32px;
        }
        
        .name {
          font-weight: bold;
          text-transform: capitalize;
        }
        
        .speech-bubble {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 12px 16px;
          border-radius: 18px;
          position: relative;
          animation: fadeIn 0.3s ease-in;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .speech-bubble::before {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 20px;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid #764ba2;
        }
        
        .thinking-bubble {
          background: rgba(255,255,255,0.1);
          padding: 8px 12px;
          border-radius: 12px;
          display: inline-block;
        }
        
        .dots {
          animation: pulse 1.5s infinite;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        
        .llm-status {
          margin-top: 8px;
          color: #666;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
};

// Hook pour utiliser les personnalités dans le jeu
export const useAIPersonality = (characterId: string) => {
  const [llmAvailable, setLlmAvailable] = useState(false);
  
  useEffect(() => {
    // Check LLM availability
    fetch(`${AI_API_URL}/health`)
      .then(res => setLlmAvailable(res.ok))
      .catch(() => setLlmAvailable(false));
  }, []);
  
  const speak = async (context: string): Promise<string> => {
    if (!llmAvailable) return '';
    
    try {
      const response = await fetch(`${AI_API_URL}/character/speak`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          character: characterId,
          context
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.response;
      }
    } catch (error) {
      console.error('AI speak error:', error);
    }
    
    return '';
  };
  
  const think = async (gameState: any): Promise<{ thought: string; action: string }> => {
    if (!llmAvailable) {
      return { thought: 'Calculating...', action: 'attack' };
    }
    
    try {
      const response = await fetch(`${AI_API_URL}/ai/think`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_state: gameState,
          difficulty: 'normal'
        })
      });
      
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('AI think error:', error);
    }
    
    return { thought: 'Attack!', action: 'attack' };
  };
  
  return {
    speak,
    think,
    isAvailable: llmAvailable
  };
};

export default AIPersonality;
