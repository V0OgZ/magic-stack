import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HEROES } from '../../data/heroes';

interface Player {
  id: number;
  name: string;
  icon: string;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  psi: number;
  timeline: string;
  dimension: {
    x: number;
    y: number;
    z: number;
    t: number;
    c: number;
    psi: number;
  };
}

interface GameEvent {
  id: string;
  type: 'combat' | 'temporal' | 'quantum' | 'paradox' | 'causal';
  message: string;
  timestamp: number;
  player?: string;
  severity?: 'info' | 'warning' | 'critical';
}

interface ParticleEffect {
  id: string;
  x: number;
  y: number;
  type: 'quantum' | 'temporal' | 'causal';
  lifetime: number;
}

export const SpectatorGodMode: React.FC = () => {
  const [serverTime, setServerTime] = useState(1025);
  const [timeSpeed, setTimeSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [quantumView, setQuantumView] = useState(true);
  const [causalView, setCausalView] = useState(false);
  const [autoFollow, setAutoFollow] = useState(true);
  const [mainPlayer, setMainPlayer] = useState(0);
  const [paradoxCount, setParadoxCount] = useState(0);
  const [showParadoxAlert, setShowParadoxAlert] = useState(false);
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [particles, setParticles] = useState<ParticleEffect[]>([]);
  const [showFormula, setShowFormula] = useState<{ player: number; formula: string } | null>(null);

  const [players, setPlayers] = useState<Player[]>([
    {
      id: 0,
      name: 'ARTHUR',
      icon: '👑',
      x: 10,
      y: 10,
      hp: 80,
      maxHp: 100,
      energy: 60,
      maxEnergy: 100,
      psi: 0.85,
      timeline: 'main',
      dimension: { x: 10, y: 15, z: 5, t: 1025, c: 0.75, psi: 0.85 }
    },
    {
      id: 1,
      name: 'MERLIN',
      icon: '🔮',
      x: 5,
      y: 15,
      hp: 95,
      maxHp: 100,
      energy: 85,
      maxEnergy: 100,
      psi: -0.2,
      timeline: 'past',
      dimension: { x: 5, y: 15, z: 3, t: 1020, c: 0.9, psi: -0.2 }
    },
    {
      id: 2,
      name: 'MORGANA',
      icon: '🌙',
      x: 15,
      y: 5,
      hp: 70,
      maxHp: 100,
      energy: 90,
      maxEnergy: 100,
      psi: 0.5,
      timeline: 'alt-1',
      dimension: { x: 15, y: 5, z: 7, t: 1030, c: 0.6, psi: 0.5 }
    },
    {
      id: 3,
      name: 'LANCELOT',
      icon: '⚔️',
      x: 8,
      y: 12,
      hp: 85,
      maxHp: 100,
      energy: 70,
      maxEnergy: 100,
      psi: 0.33,
      timeline: 'alt-2',
      dimension: { x: 8, y: 12, z: 4, t: 1025, c: 0.8, psi: 0.33 }
    }
  ]);

  const formulas = [
    'TEMPORAL_SHIFT\nΨ(t) = Ψ₀ × e^(iωt)',
    'QUANTUM_COLLAPSE\n|Ψ⟩ → |n⟩',
    'CAUSAL_FORK\nC(t₁→t₂) = ∫ P(τ)dτ',
    'ENERGY_COMPLEX\nE = A × e^(iΦ)',
    'DIMENSION_SHIFT\nD⁶ = X³ × T × C × Ψ',
    'PARADOX\nΨ → -Ψ ⊕ Ψ*'
  ];

  // Game simulation
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setServerTime(prev => prev + timeSpeed);

      // Random player movements
      if (Math.random() < 0.3) {
        setPlayers(prev => {
          const newPlayers = [...prev];
          const playerIdx = Math.floor(Math.random() * 4);
          const player = newPlayers[playerIdx];
          
          player.x = Math.max(0, Math.min(19, player.x + Math.floor(Math.random() * 3) - 1));
          player.y = Math.max(0, Math.min(19, player.y + Math.floor(Math.random() * 3) - 1));
          
          // Update dimension values
          player.dimension.x = player.x;
          player.dimension.y = player.y;
          player.dimension.t = serverTime;
          player.dimension.psi = Math.max(-1, Math.min(1, player.dimension.psi + (Math.random() * 0.2 - 0.1)));
          
          addEvent('combat', `${player.name} moved to (${player.x}, ${player.y})`);
          
          return newPlayers;
        });
      }

      // Random events
      if (Math.random() < 0.15) {
        const eventTypes = [
          { type: 'combat' as const, msg: 'FIREBALL cast! 20 damage dealt' },
          { type: 'temporal' as const, msg: 'TEMPORAL_SHIFT activated: Δt = -5' },
          { type: 'quantum' as const, msg: 'Quantum superposition: 3 states' },
          { type: 'causal' as const, msg: 'Causal chain modified' }
        ];
        
        const event = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        addEvent(event.type, event.msg);

        // Show formula sometimes
        if (Math.random() < 0.3) {
          const formula = formulas[Math.floor(Math.random() * formulas.length)];
          setShowFormula({ player: mainPlayer, formula });
          setTimeout(() => setShowFormula(null), 3000);
        }
      }

      // Update stats
      setPlayers(prev => prev.map(p => ({
        ...p,
        hp: Math.max(0, Math.min(p.maxHp, p.hp + Math.floor(Math.random() * 10) - 5)),
        energy: Math.max(0, Math.min(p.maxEnergy, p.energy + Math.floor(Math.random() * 10) - 3)),
        psi: Math.max(-1, Math.min(1, p.psi + (Math.random() * 0.2 - 0.1)))
      })));

      // Generate particles
      if (quantumView && Math.random() < 0.2) {
        const newParticle: ParticleEffect = {
          id: `p-${Date.now()}-${Math.random()}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          type: ['quantum', 'temporal', 'causal'][Math.floor(Math.random() * 3)] as any,
          lifetime: 5000
        };
        setParticles(prev => [...prev, newParticle]);
      }

    }, 1000 / timeSpeed);

    return () => clearInterval(interval);
  }, [isPaused, timeSpeed, mainPlayer, quantumView]);

  // Clean up particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.filter(p => {
        p.lifetime -= 100;
        return p.lifetime > 0;
      }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const addEvent = (type: GameEvent['type'], message: string) => {
    const event: GameEvent = {
      id: `evt-${Date.now()}-${Math.random()}`,
      type,
      message,
      timestamp: Date.now()
    };
    setEvents(prev => [event, ...prev].slice(0, 20));
  };

  const createParadox = () => {
    setParadoxCount(prev => prev + 1);
    setShowParadoxAlert(true);
    setTimeout(() => setShowParadoxAlert(false), 3000);
    addEvent('paradox', '⚠️ PARADOX CREATED! Timeline instability detected!');
    setShowFormula({ player: mainPlayer, formula: 'PARADOX\nΨ → -Ψ ⊕ Ψ*' });
    setTimeout(() => setShowFormula(null), 3000);
  };

  const PlayerView: React.FC<{ player: Player; isMain?: boolean }> = ({ player, isMain }) => {
    const gridSize = isMain ? 30 : 15;
    
    return (
      <motion.div
        className={`
          relative overflow-hidden rounded-lg
          ${isMain 
            ? 'col-span-2 row-span-2 border-4 border-yellow-400 shadow-2xl shadow-yellow-400/30' 
            : 'border-2 border-green-400/50'
          }
          bg-gradient-to-br from-black via-gray-900 to-black
        `}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-3 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{player.icon}</span>
              <span className={`font-bold ${isMain ? 'text-yellow-400 text-lg' : 'text-green-400'}`}>
                {player.name}
              </span>
            </div>
            <div className="flex gap-3 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-red-400">❤️</span>
                <div className="w-16 h-2 bg-red-900/50 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-red-600 to-red-400"
                    animate={{ width: `${(player.hp / player.maxHp) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-xs text-gray-400">{player.hp}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-blue-400">⚡</span>
                <div className="w-16 h-2 bg-blue-900/50 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                    animate={{ width: `${(player.energy / player.maxEnergy) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-xs text-gray-400">{player.energy}</span>
              </div>
              <div className="text-xs text-purple-400">
                Ψ: {player.psi.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="relative h-full flex items-center justify-center p-12">
          <div 
            className="grid gap-px"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              gridTemplateRows: `repeat(${gridSize}, 1fr)`,
              width: isMain ? '600px' : '300px',
              height: isMain ? '600px' : '300px'
            }}
          >
            {Array.from({ length: gridSize * gridSize }).map((_, i) => {
              const x = i % gridSize;
              const y = Math.floor(i / gridSize);
              const isPlayerHere = Math.floor(player.x * gridSize / 20) === x && 
                                   Math.floor(player.y * gridSize / 20) === y;
              const isEnemy = !isPlayerHere && Math.random() < 0.02;
              const isPortal = !isPlayerHere && !isEnemy && Math.random() < 0.01;
              
              return (
                <div
                  key={i}
                  className={`
                    relative border border-green-900/20
                    ${isPlayerHere 
                      ? 'bg-yellow-400/30 animate-pulse' 
                      : isEnemy 
                        ? 'bg-red-600/20' 
                        : isPortal
                          ? 'bg-purple-600/30 animate-spin-slow'
                          : 'bg-green-900/5'
                    }
                    ${isMain ? 'hover:bg-green-400/10' : ''}
                    transition-all duration-300
                  `}
                >
                  {isPlayerHere && <span className="absolute inset-0 flex items-center justify-center text-lg">{player.icon}</span>}
                  {isEnemy && <span className="absolute inset-0 flex items-center justify-center text-xs opacity-50">👹</span>}
                  {isPortal && <span className="absolute inset-0 flex items-center justify-center text-xs">🌀</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dimension Indicator */}
        {isMain && (
          <div className="absolute top-3 right-3 bg-black/80 border border-green-400/50 rounded-lg px-3 py-2 text-xs">
            <span className="text-green-400 font-bold">6D:</span>
            {Object.entries(player.dimension).map(([key, value]) => (
              <span key={key} className="ml-2 text-cyan-400">
                {key.toUpperCase()}:{typeof value === 'number' ? value.toFixed(1) : value}
              </span>
            ))}
          </div>
        )}

        {/* Timeline View */}
        {isMain && (
          <div className="absolute bottom-3 left-3 right-3 h-8 bg-black/80 border border-green-400/50 rounded-lg p-1">
            <div className="relative h-full flex gap-px">
              {[0, 1, 2, 3, 4].map(i => (
                <div 
                  key={i} 
                  className="flex-1 bg-gradient-to-r from-green-900/50 to-green-800/30 rounded"
                />
              ))}
              <motion.div 
                className="absolute top-0 bottom-0 w-1 bg-yellow-400 shadow-lg shadow-yellow-400/50"
                animate={{ left: `${(serverTime % 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        )}

        {/* Quantum Particles */}
        {quantumView && isMain && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                className={`
                  absolute w-2 h-2 rounded-full
                  ${particle.type === 'quantum' ? 'bg-cyan-400' : 
                    particle.type === 'temporal' ? 'bg-purple-400' : 'bg-pink-400'}
                  shadow-lg
                `}
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  boxShadow: `0 0 20px currentColor`
                }}
                animate={{
                  x: [0, 50, -50, 0],
                  y: [0, -50, 50, 0],
                  opacity: [1, 0.5, 0.5, 0]
                }}
                transition={{
                  duration: particle.lifetime / 1000,
                  ease: "linear",
                  repeat: Infinity
                }}
              />
            ))}
          </div>
        )}

        {/* Causal Lines */}
        {causalView && isMain && (
          <svg className="absolute inset-0 pointer-events-none">
            {players.map((p1, i) => 
              players.slice(i + 1).map(p2 => (
                <motion.line
                  key={`${p1.id}-${p2.id}`}
                  x1={`${(p1.x / 20) * 100}%`}
                  y1={`${(p1.y / 20) * 100}%`}
                  x2={`${(p2.x / 20) * 100}%`}
                  y2={`${(p2.y / 20) * 100}%`}
                  stroke="url(#causalGradient)"
                  strokeWidth="1"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              ))
            )}
            <defs>
              <linearGradient id="causalGradient">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#ff00ff" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Formula Overlay */}
        <AnimatePresence>
          {showFormula && showFormula.player === player.id && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="bg-black/90 border-2 border-cyan-400 rounded-xl px-6 py-4 shadow-2xl shadow-cyan-400/50">
                <pre className="text-cyan-400 text-xl font-mono text-center whitespace-pre">
                  {showFormula.formula}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs animate-matrix-fall"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          >
            {Array.from({ length: 50 }).map((_, j) => (
              <div key={j}>{Math.random() > 0.5 ? '1' : '0'}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Paradox Alert */}
      <AnimatePresence>
        {showParadoxAlert && (
          <motion.div
            className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-4 text-2xl font-bold z-50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
          >
            ⚠️ PARADOXE TEMPOREL DÉTECTÉ ⚠️
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid */}
      <div className="grid grid-cols-4 grid-rows-3 gap-1 h-screen p-1">
        {/* Player Views */}
        <PlayerView player={players[mainPlayer]} isMain={true} />
        {players.filter((_, i) => i !== mainPlayer).map(player => (
          <PlayerView key={player.id} player={player} />
        ))}

        {/* Control Panel & Event Log */}
        <div className="col-span-1 row-span-3 bg-black/90 border-2 border-green-400/50 rounded-lg p-4 flex flex-col gap-4">
          {/* God Mode Controls */}
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-400/30">
            <h3 className="text-yellow-400 font-bold text-lg mb-3 flex items-center gap-2">
              <span className="text-2xl">🎮</span> God Mode Controls
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <ControlButton
                onClick={() => setIsPaused(!isPaused)}
                active={isPaused}
                icon={isPaused ? "▶️" : "⏸️"}
              >
                {isPaused ? "Resume" : "Pause"}
              </ControlButton>
              
              <ControlButton
                onClick={() => setTimeSpeed(prev => prev === 5 ? 0.5 : prev * 2)}
                icon="⏩"
              >
                Speed x{timeSpeed}
              </ControlButton>
              
              <ControlButton
                onClick={() => setQuantumView(!quantumView)}
                active={quantumView}
                icon="🌀"
              >
                Quantum
              </ControlButton>
              
              <ControlButton
                onClick={() => setCausalView(!causalView)}
                active={causalView}
                icon="🔗"
              >
                Causal
              </ControlButton>
              
              <ControlButton
                onClick={createParadox}
                icon="⚠️"
                danger
              >
                Paradox
              </ControlButton>
              
              <ControlButton
                onClick={() => setMainPlayer((mainPlayer + 1) % 4)}
                icon="🔄"
              >
                Switch
              </ControlButton>
              
              <ControlButton
                onClick={() => setAutoFollow(!autoFollow)}
                active={autoFollow}
                icon="👁️"
              >
                Auto
              </ControlButton>
            </div>
          </div>

          {/* Event Stream */}
          <div className="flex-1 bg-green-900/20 rounded-lg p-4 border border-green-400/30 overflow-hidden">
            <h3 className="text-yellow-400 font-bold text-lg mb-3 flex items-center gap-2">
              <span className="text-2xl">📜</span> Event Stream
            </h3>
            <div className="space-y-2 overflow-y-auto max-h-96">
              <AnimatePresence mode="popLayout">
                {events.map(event => (
                  <motion.div
                    key={event.id}
                    className={`
                      p-2 rounded border-l-4 text-xs
                      ${event.type === 'combat' ? 'border-red-500 bg-red-900/20' :
                        event.type === 'temporal' ? 'border-cyan-500 bg-cyan-900/20' :
                        event.type === 'quantum' ? 'border-purple-500 bg-purple-900/20' :
                        event.type === 'paradox' ? 'border-yellow-500 bg-yellow-900/20' :
                        'border-pink-500 bg-pink-900/20'}
                    `}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    layout
                  >
                    <div className="text-gray-500">
                      [{new Date(event.timestamp).toLocaleTimeString()}]
                    </div>
                    <div className="text-green-400">{event.message}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* World Stats */}
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-400/30">
            <h3 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
              <span className="text-2xl">🌍</span> World Stats
            </h3>
            <div className="space-y-2 text-sm">
              <StatRow label="Server Time" value={`T:${serverTime}`} />
              <StatRow label="Active Timelines" value="4" />
              <StatRow label="Paradoxes" value={paradoxCount.toString()} danger={paradoxCount > 0} />
              <StatRow label="Causal Weight" value="Σ C = 2.83" />
              <StatRow label="Quantum Coherence" value={`⟨Ψ⟩ = ${players.reduce((acc, p) => acc + p.psi, 0) / 4}`} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes matrix-fall {
          from {
            transform: translateY(-100vh);
          }
          to {
            transform: translateY(100vh);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        .animate-matrix-fall {
          animation: matrix-fall linear infinite;
        }
      `}</style>
    </div>
  );
};

// Composants auxiliaires
const ControlButton: React.FC<{
  onClick: () => void;
  active?: boolean;
  danger?: boolean;
  icon: string;
  children: React.ReactNode;
}> = ({ onClick, active, danger, icon, children }) => (
  <button
    onClick={onClick}
    className={`
      px-3 py-2 rounded-lg border transition-all duration-300
      flex items-center justify-center gap-1 text-xs font-bold
      ${danger 
        ? 'border-red-500 bg-red-900/30 hover:bg-red-800/50 text-red-400' 
        : active 
          ? 'border-yellow-400 bg-yellow-900/30 text-yellow-400'
          : 'border-green-400/50 bg-green-900/30 hover:bg-green-800/50 text-green-400'
      }
      hover:scale-105 active:scale-95
    `}
  >
    <span className="text-lg">{icon}</span>
    <span>{children}</span>
  </button>
);

const StatRow: React.FC<{ label: string; value: string; danger?: boolean }> = ({ 
  label, value, danger 
}) => (
  <div className="flex justify-between items-center">
    <span className="text-green-400/70">{label}:</span>
    <span className={`font-bold ${danger ? 'text-red-400' : 'text-cyan-400'}`}>
      {value}
    </span>
  </div>
);

export default SpectatorGodMode;
