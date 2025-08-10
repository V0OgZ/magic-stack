/**
 * 💬 SPEECH BUBBLE - Bulles de dialogue animées pour l'IA
 * 
 * Affiche les dialogues générés dynamiquement par le LLM
 * avec animations et effets visuels selon l'émotion
 */

import React, { useState, useEffect, useRef } from 'react';

interface SpeechBubbleProps {
  character: string;
  text: string;
  emotion?: 'angry' | 'confident' | 'desperate' | 'happy' | 'sad' | 'neutral';
  position?: { x: number; y: number };
  avatar?: string; // Emoji ou image
  color?: string; // Couleur du personnage
  isTyping?: boolean; // Affichage progressif
  duration?: number; // Durée d'affichage (ms)
  onComplete?: () => void;
  style?: React.CSSProperties;
}

export function SpeechBubble({
  character,
  text,
  emotion = 'neutral',
  position = { x: 50, y: 50 },
  avatar = '🗣️',
  color = '#667eea',
  isTyping = true,
  duration = 5000,
  onComplete,
  style = {}
}: SpeechBubbleProps): React.ReactElement | null {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [animationClass, setAnimationClass] = useState('bubble-enter');
  const timeoutRef = useRef<NodeJS.Timeout>();
  const typingRef = useRef<NodeJS.Timeout>();
  
  // Effet de typing
  useEffect(() => {
    if (!isTyping) {
      setDisplayedText(text);
      return;
    }
    
    setDisplayedText('');
    const words = text.split(' ');
    let currentIndex = 0;
    
    const typeWord = () => {
      if (currentIndex < words.length) {
        setDisplayedText(prev => {
          const newText = prev + (prev ? ' ' : '') + words[currentIndex];
          currentIndex++;
          return newText;
        });
        typingRef.current = setTimeout(typeWord, 100); // 100ms entre mots
      }
    };
    
    typeWord();
    
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [text, isTyping]);
  
  // Auto-hide après duration
  useEffect(() => {
    if (duration && duration > 0) {
      timeoutRef.current = setTimeout(() => {
        setAnimationClass('bubble-exit');
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 300);
      }, duration);
    }
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [duration, onComplete]);
  
  if (!isVisible) return null;
  
  // Styles selon l'émotion
  const emotionStyles = getEmotionStyles(emotion, color);
  
  return (
    <div
      className={`speech-bubble ${animationClass}`}
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -100%)',
        zIndex: 1000,
        ...style
      }}
    >
      {/* Avatar du personnage */}
      <div style={{
        position: 'absolute',
        top: -40,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${color}, ${adjustColor(color, -20)})`,
        border: `3px solid ${emotionStyles.borderColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 32,
        boxShadow: emotionStyles.avatarShadow,
        animation: emotionStyles.avatarAnimation
      }}>
        {avatar}
      </div>
      
      {/* Bulle principale */}
      <div style={{
        background: emotionStyles.background,
        border: `2px solid ${emotionStyles.borderColor}`,
        borderRadius: 16,
        padding: '15px 20px',
        minWidth: 200,
        maxWidth: 400,
        boxShadow: emotionStyles.bubbleShadow,
        position: 'relative',
        animation: emotionStyles.bubbleAnimation,
        ...emotionStyles.additionalStyles
      }}>
        {/* Nom du personnage */}
        <div style={{
          fontWeight: 'bold',
          fontSize: 14,
          color: emotionStyles.nameColor,
          marginBottom: 8,
          textTransform: 'uppercase',
          letterSpacing: 1
        }}>
          {character}
        </div>
        
        {/* Texte du dialogue */}
        <div style={{
          fontSize: 16,
          lineHeight: 1.5,
          color: emotionStyles.textColor,
          fontStyle: emotion === 'desperate' ? 'italic' : 'normal'
        }}>
          {displayedText}
          {isTyping && displayedText !== text && (
            <span style={{
              animation: 'blink 1s infinite',
              marginLeft: 3,
              opacity: 0.6
            }}>▌</span>
          )}
        </div>
        
        {/* Indicateur d'émotion */}
        {emotion !== 'neutral' && (
          <div style={{
            position: 'absolute',
            top: -10,
            right: -10,
            fontSize: 20,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
          }}>
            {getEmotionEmoji(emotion)}
          </div>
        )}
        
        {/* Queue de la bulle */}
        <div style={{
          position: 'absolute',
          bottom: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: `10px solid ${emotionStyles.borderColor}`,
        }}/>
        <div style={{
          position: 'absolute',
          bottom: -7,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: `8px solid ${emotionStyles.background}`,
        }}/>
      </div>
      
      {/* Particles d'émotion */}
      {emotion === 'angry' && <AngryParticles />}
      {emotion === 'happy' && <HappyParticles />}
      {emotion === 'desperate' && <DesperateParticles />}
      
      <style>{`
        @keyframes bubble-in {
          from {
            opacity: 0;
            transform: translate(-50%, -90%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -100%) scale(1);
          }
        }
        
        @keyframes bubble-out {
          from {
            opacity: 1;
            transform: translate(-50%, -100%) scale(1);
          }
          to {
            opacity: 0;
            transform: translate(-50%, -110%) scale(0.8);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        
        .bubble-enter {
          animation: bubble-in 0.3s ease-out forwards;
        }
        
        .bubble-exit {
          animation: bubble-out 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
}

// === MULTI-BUBBLE CONTAINER ===

interface SpeechBubbleContainerProps {
  bubbles: Array<{
    id: string;
    character: string;
    text: string;
    emotion?: SpeechBubbleProps['emotion'];
    position?: { x: number; y: number };
    avatar?: string;
    color?: string;
  }>;
  stagger?: number; // Délai entre bulles (ms)
}

export function SpeechBubbleContainer({
  bubbles,
  stagger = 500
}: SpeechBubbleContainerProps): React.ReactElement {
  const [visibleBubbles, setVisibleBubbles] = useState<string[]>([]);
  
  useEffect(() => {
    bubbles.forEach((bubble, index) => {
      setTimeout(() => {
        setVisibleBubbles(prev => [...prev, bubble.id]);
      }, index * stagger);
    });
  }, [bubbles, stagger]);
  
  return (
    <>
      {bubbles.map((bubble, index) => (
        visibleBubbles.includes(bubble.id) && (
          <SpeechBubble
            key={bubble.id}
            {...bubble}
            position={bubble.position || { 
              x: 50 + (index % 2 === 0 ? -20 : 20), 
              y: 30 + index * 15 
            }}
          />
        )
      ))}
    </>
  );
}

// === UTILITAIRES ===

function getEmotionStyles(emotion: SpeechBubbleProps['emotion'], baseColor: string) {
  const styles: Record<string, any> = {
    angry: {
      background: 'linear-gradient(135deg, #1a0808, #2a0a0a)',
      borderColor: '#ff4444',
      textColor: '#ffffff',
      nameColor: '#ff6666',
      bubbleShadow: '0 4px 20px rgba(255, 68, 68, 0.3)',
      avatarShadow: '0 0 20px rgba(255, 68, 68, 0.5)',
      bubbleAnimation: 'shake 0.1s infinite',
      avatarAnimation: 'pulse 0.5s infinite',
      additionalStyles: {
        border: '2px solid #ff4444',
        background: 'linear-gradient(135deg, rgba(255, 68, 68, 0.1), rgba(139, 0, 0, 0.2))'
      }
    },
    confident: {
      background: 'linear-gradient(135deg, #0a1a0a, #0f2a0f)',
      borderColor: '#44ff44',
      textColor: '#ffffff',
      nameColor: '#66ff66',
      bubbleShadow: '0 4px 20px rgba(68, 255, 68, 0.3)',
      avatarShadow: '0 0 20px rgba(68, 255, 68, 0.5)',
      bubbleAnimation: 'bounce 2s ease-in-out infinite',
      avatarAnimation: 'none',
      additionalStyles: {}
    },
    desperate: {
      background: 'linear-gradient(135deg, #0a0a1a, #0f0f2a)',
      borderColor: '#4444ff',
      textColor: '#aaaaff',
      nameColor: '#6666ff',
      bubbleShadow: '0 4px 20px rgba(68, 68, 255, 0.2)',
      avatarShadow: '0 0 10px rgba(68, 68, 255, 0.3)',
      bubbleAnimation: 'none',
      avatarAnimation: 'none',
      additionalStyles: {
        opacity: 0.9
      }
    },
    happy: {
      background: 'linear-gradient(135deg, #1a1a0a, #2a2a0f)',
      borderColor: '#ffff44',
      textColor: '#ffffff',
      nameColor: '#ffff66',
      bubbleShadow: '0 4px 20px rgba(255, 255, 68, 0.3)',
      avatarShadow: '0 0 20px rgba(255, 255, 68, 0.5)',
      bubbleAnimation: 'bounce 1s ease-in-out infinite',
      avatarAnimation: 'bounce 1.5s ease-in-out infinite',
      additionalStyles: {}
    },
    sad: {
      background: 'linear-gradient(135deg, #0a0a0a, #0f0f0f)',
      borderColor: '#666666',
      textColor: '#999999',
      nameColor: '#aaaaaa',
      bubbleShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
      avatarShadow: '0 0 10px rgba(100, 100, 100, 0.3)',
      bubbleAnimation: 'none',
      avatarAnimation: 'none',
      additionalStyles: {
        opacity: 0.8
      }
    },
    neutral: {
      background: `linear-gradient(135deg, rgba(26, 31, 46, 0.95), rgba(20, 24, 36, 0.95))`,
      borderColor: baseColor,
      textColor: '#ffffff',
      nameColor: baseColor,
      bubbleShadow: `0 4px 20px ${baseColor}33`,
      avatarShadow: `0 0 15px ${baseColor}66`,
      bubbleAnimation: 'none',
      avatarAnimation: 'none',
      additionalStyles: {}
    }
  };
  
  return styles[emotion || 'neutral'] || styles.neutral;
}

function getEmotionEmoji(emotion: SpeechBubbleProps['emotion']): string {
  const emojis = {
    angry: '😤',
    confident: '😎',
    desperate: '😰',
    happy: '😄',
    sad: '😢',
    neutral: '😐'
  };
  return emojis[emotion || 'neutral'];
}

function adjustColor(color: string, amount: number): string {
  // Ajuste la luminosité d'une couleur hex
  const clamp = (num: number) => Math.min(255, Math.max(0, num));
  const hex = color.replace('#', '');
  const r = clamp(parseInt(hex.substr(0, 2), 16) + amount);
  const g = clamp(parseInt(hex.substr(2, 2), 16) + amount);
  const b = clamp(parseInt(hex.substr(4, 2), 16) + amount);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// === PARTICULES D'ÉMOTION ===

function AngryParticles() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${20 + i * 15}%`,
            top: `${10 + i * 10}%`,
            fontSize: 12,
            animation: `float-up 2s infinite ${i * 0.2}s`
          }}
        >
          🔥
        </div>
      ))}
      <style>{`
        @keyframes float-up {
          from {
            transform: translateY(0) scale(0);
            opacity: 1;
          }
          to {
            transform: translateY(-30px) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function HappyParticles() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${25 + i * 15}%`,
            top: `${15 + i * 10}%`,
            fontSize: 16,
            animation: `sparkle 1.5s infinite ${i * 0.3}s`
          }}
        >
          ✨
        </div>
      ))}
      <style>{`
        @keyframes sparkle {
          0%, 100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

function DesperateParticles() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${30 + i * 20}%`,
            bottom: -10,
            fontSize: 14,
            animation: `drip 2s infinite ${i * 0.5}s`
          }}
        >
          💧
        </div>
      ))}
      <style>{`
        @keyframes drip {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(20px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
