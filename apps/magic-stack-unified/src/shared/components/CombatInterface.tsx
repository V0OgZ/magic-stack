/**
 * ⚔️ CombatInterface - Interface de combat immersive
 * 
 * L'expérience de combat façon Hearthstone avec les mécaniques temporelles
 */

import React, { useState, useEffect } from 'react';
import { Hero } from '../../data/heroes';
import { Creature } from '../../data/creatures';
import { Spell } from '../../data/spells';

interface CombatState {
  playerHero: Hero;
  enemyHero: Hero | Creature;
  playerHealth: number;
  enemyHealth: number;
  playerMana: number;
  enemyMana: number;
  turn: number;
  isPlayerTurn: boolean;
  timeline: 'past' | 'present' | 'future';
  paradoxLevel: number;
  hand: Card[];
  board: {
    player: Creature[];
    enemy: Creature[];
  };
  history: CombatEvent[];
}

interface Card {
  id: string;
  type: 'creature' | 'spell' | 'artifact';
  cost: number;
  entity: Creature | Spell;
}

interface CombatEvent {
  turn: number;
  type: 'attack' | 'spell' | 'summon' | 'death' | 'paradox';
  source: string;
  target?: string;
  damage?: number;
  description: string;
}

interface Props {
  initialState: CombatState;
  onEndCombat?: (winner: 'player' | 'enemy') => void;
  onAction?: (action: any) => void;
}

export function CombatInterface({ 
  initialState, 
  onEndCombat,
  onAction 
}: Props): React.ReactElement {
  const [combat, setCombat] = useState<CombatState>(initialState);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);
  const [combatLog, setCombatLog] = useState<string[]>([]);
  
  // Effets visuels
  const [effects, setEffects] = useState<Array<{
    id: string;
    type: 'damage' | 'heal' | 'spell' | 'paradox';
    x: number;
    y: number;
    value?: number;
  }>>([]);

  // Fin de tour
  const endTurn = () => {
    setCombat(prev => ({
      ...prev,
      isPlayerTurn: false,
      turn: prev.turn + 1,
      playerMana: Math.min(10, prev.turn + 1),
    }));
    
    // IA joue
    setTimeout(() => {
      enemyTurn();
    }, 1000);
  };

  // Tour de l'ennemi (IA simple)
  const enemyTurn = () => {
    // Logique IA simple
    const damage = Math.floor(Math.random() * 10) + 5;
    
    setCombat(prev => ({
      ...prev,
      playerHealth: prev.playerHealth - damage,
      isPlayerTurn: true,
    }));
    
    addCombatLog(`${combat.enemyHero.name} attaque pour ${damage} dégâts !`);
    
    // Vérifier victoire/défaite
    if (combat.playerHealth - damage <= 0) {
      onEndCombat?.('enemy');
    }
  };

  // Jouer une carte
  const playCard = (card: Card, target?: string) => {
    if (card.cost > combat.playerMana) return;
    
    setAnimating(true);
    
    if (card.type === 'creature') {
      // Invoquer créature
      const creature = card.entity as Creature;
      setCombat(prev => ({
        ...prev,
        board: {
          ...prev.board,
          player: [...prev.board.player, creature],
        },
        playerMana: prev.playerMana - card.cost,
        hand: prev.hand.filter(c => c.id !== card.id),
      }));
      
      addCombatLog(`Vous invoquez ${creature.name} !`);
      showEffect('summon', 400, 300);
      
    } else if (card.type === 'spell') {
      // Lancer sort
      const spell = card.entity as Spell;
      
      if (spell.damage && target === 'enemy') {
        setCombat(prev => ({
          ...prev,
          enemyHealth: prev.enemyHealth - (spell.damage as number),
          playerMana: prev.playerMana - card.cost,
          hand: prev.hand.filter(c => c.id !== card.id),
        }));
        
        addCombatLog(`${spell.name} inflige ${spell.damage} dégâts !`);
        showEffect('spell', 600, 200, spell.damage as number);
        
        if (combat.enemyHealth - (spell.damage as number) <= 0) {
          onEndCombat?.('player');
        }
      }
    }
    
    setTimeout(() => setAnimating(false), 500);
  };

  // Attaquer avec une créature
  const creatureAttack = (attacker: Creature, targetId: string) => {
    setAnimating(true);
    
    if (targetId === 'enemy-hero') {
      setCombat(prev => ({
        ...prev,
        enemyHealth: prev.enemyHealth - attacker.attack,
      }));
      
      addCombatLog(`${attacker.name} attaque pour ${attacker.attack} dégâts !`);
      showEffect('damage', 600, 200, attacker.attack);
      
      if (combat.enemyHealth - attacker.attack <= 0) {
        onEndCombat?.('player');
      }
    }
    
    setTimeout(() => setAnimating(false), 500);
  };

  // Ajouter au log de combat
  const addCombatLog = (message: string) => {
    setCombatLog(prev => [`[Tour ${combat.turn}] ${message}`, ...prev]);
  };

  // Afficher un effet visuel
  const showEffect = (type: any, x: number, y: number, value?: number) => {
    const id = `effect_${Date.now()}`;
    setEffects(prev => [...prev, { id, type, x, y, value }]);
    
    setTimeout(() => {
      setEffects(prev => prev.filter(e => e.id !== id));
    }, 1000);
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1d3a 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      position: 'relative',
    }}>
      {/* Zone de combat principale */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
        {/* Héros ennemi */}
        <div style={{
          height: 200,
          background: 'linear-gradient(180deg, rgba(139, 0, 0, 0.3), transparent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <div 
            id="enemy-hero"
            onClick={() => selectedCard && playCard(selectedCard, 'enemy')}
            style={{
              padding: 20,
              background: 'rgba(20, 24, 36, 0.8)',
              borderRadius: 16,
              border: '3px solid #DC143C',
              cursor: selectedCard ? 'pointer' : 'default',
              transition: 'all 0.3s',
              transform: selectedTarget === 'enemy-hero' ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 64 }}>{combat.enemyHero.icon_id}</div>
              <div style={{ fontSize: 18, marginTop: 10 }}>{combat.enemyHero.name}</div>
              <div style={{
                display: 'flex',
                gap: 20,
                justifyContent: 'center',
                marginTop: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span>❤️</span>
                  <span style={{ fontSize: 24, fontWeight: 'bold' }}>
                    {combat.enemyHealth}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span>💫</span>
                  <span style={{ fontSize: 24, fontWeight: 'bold' }}>
                    {combat.enemyMana}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plateau de jeu */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 20,
          gap: 20,
        }}>
          {/* Créatures ennemies */}
          <div style={{
            flex: 1,
            display: 'flex',
            gap: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {combat.board.enemy.map(creature => (
              <CreatureCard 
                key={creature.id}
                creature={creature}
                isEnemy={true}
                onClick={() => {}}
              />
            ))}
          </div>

          {/* Ligne de séparation */}
          <div style={{
            height: 2,
            background: 'linear-gradient(90deg, transparent, #764ba2, transparent)',
          }}/>

          {/* Créatures du joueur */}
          <div style={{
            flex: 1,
            display: 'flex',
            gap: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {combat.board.player.map(creature => (
              <CreatureCard 
                key={creature.id}
                creature={creature}
                isEnemy={false}
                onClick={() => creatureAttack(creature, 'enemy-hero')}
                canAttack={combat.isPlayerTurn}
              />
            ))}
          </div>
        </div>

        {/* Héros du joueur */}
        <div style={{
          height: 200,
          background: 'linear-gradient(180deg, transparent, rgba(102, 126, 234, 0.3))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            padding: 20,
            background: 'rgba(20, 24, 36, 0.8)',
            borderRadius: 16,
            border: '3px solid #667eea',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 64 }}>{combat.playerHero.icon_id}</div>
              <div style={{ fontSize: 18, marginTop: 10 }}>{combat.playerHero.name}</div>
              <div style={{
                display: 'flex',
                gap: 20,
                justifyContent: 'center',
                marginTop: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span>❤️</span>
                  <span style={{ fontSize: 24, fontWeight: 'bold' }}>
                    {combat.playerHealth}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span>💫</span>
                  <span style={{ fontSize: 24, fontWeight: 'bold' }}>
                    {combat.playerMana}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main du joueur */}
        <div style={{
          height: 150,
          background: 'rgba(20, 24, 36, 0.8)',
          borderTop: '2px solid #764ba2',
          display: 'flex',
          gap: 10,
          padding: 20,
          justifyContent: 'center',
          overflowX: 'auto',
        }}>
          {combat.hand.map(card => (
            <HandCard 
              key={card.id}
              card={card}
              selected={selectedCard?.id === card.id}
              onClick={() => setSelectedCard(card)}
              disabled={card.cost > combat.playerMana || !combat.isPlayerTurn}
            />
          ))}
        </div>
      </div>

      {/* Panneau droit - Infos et contrôles */}
      <div style={{
        width: 350,
        background: 'linear-gradient(180deg, #1a1a2e, #16213e)',
        borderLeft: '3px solid #764ba2',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Infos de combat */}
        <div style={{
          padding: 20,
          borderBottom: '2px solid #764ba2',
        }}>
          <h2 style={{ marginBottom: 15 }}>⚔️ Combat</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Tour</span>
              <span style={{ fontWeight: 'bold', color: '#667eea' }}>
                {combat.turn}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Phase</span>
              <span style={{ fontWeight: 'bold', color: combat.isPlayerTurn ? '#4CAF50' : '#FF6B6B' }}>
                {combat.isPlayerTurn ? 'Votre tour' : 'Tour ennemi'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Timeline</span>
              <span style={{ fontWeight: 'bold', color: '#764ba2' }}>
                {combat.timeline}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Paradoxe</span>
              <span style={{ fontWeight: 'bold', color: '#FF6B6B' }}>
                {combat.paradoxLevel}%
              </span>
            </div>
          </div>
        </div>

        {/* Bouton fin de tour */}
        {combat.isPlayerTurn && (
          <div style={{ padding: 20 }}>
            <button
              onClick={endTurn}
              disabled={animating}
              style={{
                width: '100%',
                padding: 15,
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: 8,
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                cursor: animating ? 'not-allowed' : 'pointer',
                opacity: animating ? 0.5 : 1,
              }}
            >
              Fin du tour
            </button>
          </div>
        )}

        {/* Log de combat */}
        <div style={{
          flex: 1,
          padding: 20,
          overflowY: 'auto',
        }}>
          <h3 style={{ marginBottom: 15 }}>📜 Historique</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            fontSize: 14,
          }}>
            {combatLog.map((log, i) => (
              <div 
                key={i}
                style={{
                  padding: 8,
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: 4,
                  borderLeft: '3px solid #667eea',
                  opacity: 1 - (i * 0.1),
                }}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Effets visuels */}
      {effects.map(effect => (
        <div
          key={effect.id}
          style={{
            position: 'absolute',
            left: effect.x,
            top: effect.y,
            fontSize: 48,
            fontWeight: 'bold',
            color: effect.type === 'damage' ? '#FF6B6B' :
                   effect.type === 'heal' ? '#4CAF50' :
                   effect.type === 'spell' ? '#764ba2' : '#FFD700',
            animation: 'floatUp 1s ease-out',
            pointerEvents: 'none',
          }}
        >
          {effect.value && `-${effect.value}`}
          {effect.type === 'spell' && '✨'}
          {effect.type === 'paradox' && '♾️'}
        </div>
      ))}
    </div>
  );
}

// Composants auxiliaires

function CreatureCard({ creature, isEnemy, onClick, canAttack }: any) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 120,
        padding: 15,
        background: isEnemy 
          ? 'linear-gradient(135deg, #8B0000, #DC143C)'
          : 'linear-gradient(135deg, #1e5f8e, #2e7d32)',
        borderRadius: 8,
        border: `2px solid ${canAttack ? '#4CAF50' : 'transparent'}`,
        cursor: canAttack ? 'pointer' : 'default',
        transition: 'all 0.3s',
        transform: canAttack ? 'translateY(-5px)' : 'translateY(0)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 32 }}>{creature.icon_id}</div>
        <div style={{ fontSize: 12, marginTop: 5 }}>{creature.name}</div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <span>⚔️</span>
            <span style={{ fontWeight: 'bold' }}>{creature.attack}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <span>❤️</span>
            <span style={{ fontWeight: 'bold' }}>{creature.health}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HandCard({ card, selected, onClick, disabled }: any) {
  const entity = card.entity;
  
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      style={{
        width: 120,
        padding: 10,
        background: selected 
          ? 'linear-gradient(135deg, #667eea, #764ba2)'
          : 'linear-gradient(135deg, #0f3460, #16213e)',
        borderRadius: 8,
        border: `2px solid ${selected ? '#4CAF50' : 'transparent'}`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.3s',
        transform: selected ? 'translateY(-10px)' : 'translateY(0)',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 8,
      }}>
        <span style={{
          padding: '2px 8px',
          background: '#667eea',
          borderRadius: 10,
          fontSize: 12,
        }}>
          💫 {card.cost}
        </span>
        <span style={{ fontSize: 10 }}>
          {card.type}
        </span>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 28 }}>{entity.icon_id || entity.icon || '❓'}</div>
        <div style={{ fontSize: 11, marginTop: 5 }}>{entity.name}</div>
      </div>
    </div>
  );
}

// Animation
const styles = `
@keyframes floatUp {
  0% { 
    transform: translateY(0);
    opacity: 1;
  }
  100% { 
    transform: translateY(-50px);
    opacity: 0;
  }
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
