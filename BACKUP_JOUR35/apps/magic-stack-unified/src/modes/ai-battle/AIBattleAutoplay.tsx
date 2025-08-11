import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IAState {
  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  wins: number;
  position: { x: number; y: number };
  stats: {
    damage: number;
    spells: number;
    hits: number;
    misses: number;
  };
}

interface GameState {
  running: boolean;
  paused: boolean;
  round: number;
  speed: number;
  scenario: 'classic' | 'temporal' | 'quantum' | '6d';
  ia1: IAState;
  ia2: IAState;
}

interface Spell {
  name: string;
  formula: string;
  damage: number;
  cost: number;
  color: string;
  effect?: string;
}

export const AIBattleAutoplay: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    running: false,
    paused: false,
    round: 1,
    speed: 1,
    scenario: 'quantum',
    ia1: {
      hp: 100,
      maxHp: 100,
      energy: 100,
      maxEnergy: 100,
      wins: 0,
      position: { x: 2, y: 5 },
      stats: { damage: 0, spells: 0, hits: 0, misses: 0 }
    },
    ia2: {
      hp: 100,
      maxHp: 100,
      energy: 100,
      maxEnergy: 100,
      wins: 0,
      position: { x: 7, y: 5 },
      stats: { damage: 0, spells: 0, hits: 0, misses: 0 }
    }
  });

  const [combatLog, setCombatLog] = useState<{ ia: 1 | 2; message: string; type: string; time: number }[]>([]);
  const [showVictory, setShowVictory] = useState(false);
  const [winner, setWinner] = useState<1 | 2 | null>(null);
  const [showFormula, setShowFormula] = useState<{ ia: 1 | 2; formula: string } | null>(null);
  const [explosions, setExplosions] = useState<{ id: string; x: number; y: number; ia: 1 | 2 }[]>([]);

  const battleInterval = useRef<NodeJS.Timeout | null>(null);

  const spells: Record<string, Spell> = {
    temporal_shift: { 
      name: "TEMPORAL_SHIFT", 
      formula: "Ψ(t) = Ψ₀ × e^(iωt)", 
      damage: 15, 
      cost: 20,
      color: "from-purple-600 to-pink-600",
      effect: "temporal"
    },
    quantum_split: { 
      name: "QUANTUM_SPLIT", 
      formula: "|Ψ⟩ → |Ψ₁⟩ + |Ψ₂⟩", 
      damage: 10, 
      cost: 15,
      color: "from-cyan-600 to-blue-600",
      effect: "quantum"
    },
    dimension_shift: { 
      name: "DIM_SHIFT", 
      formula: "D⁶ = X³ × T × C × Ψ", 
      damage: 20, 
      cost: 25,
      color: "from-yellow-600 to-orange-600",
      effect: "dimensional"
    },
    causal_attack: { 
      name: "CAUSAL_FORK", 
      formula: "C(t₁→t₂)", 
      damage: 18, 
      cost: 22,
      color: "from-red-600 to-pink-600",
      effect: "causal"
    },
    chrono_blast: { 
      name: "CHRONO_BLAST", 
      formula: "Δt × E = ħω", 
      damage: 12, 
      cost: 18,
      color: "from-indigo-600 to-purple-600",
      effect: "temporal"
    },
    superposition: { 
      name: "SUPERPOSITION", 
      formula: "⊙(entity) = Σ|ψᵢ⟩", 
      damage: 8, 
      cost: 12,
      color: "from-green-600 to-teal-600",
      effect: "quantum"
    }
  };

  const strategies = {
    classic: {
      actions: ['attack', 'defend', 'move', 'heal'],
      weights: [0.4, 0.2, 0.2, 0.2]
    },
    temporal: {
      actions: ['temporal_shift', 'chrono_blast', 'defend', 'heal'],
      weights: [0.3, 0.3, 0.2, 0.2]
    },
    quantum: {
      actions: ['quantum_split', 'superposition', 'dimension_shift', 'defend'],
      weights: [0.25, 0.25, 0.25, 0.25]
    },
    '6d': {
      actions: ['dimension_shift', 'causal_attack', 'temporal_shift', 'quantum_split'],
      weights: [0.25, 0.25, 0.25, 0.25]
    }
  };

  const startBattle = () => {
    setGameState(prev => ({
      ...prev,
      running: true,
      paused: false,
      round: 1,
      ia1: { ...prev.ia1, hp: prev.ia1.maxHp, energy: prev.ia1.maxEnergy },
      ia2: { ...prev.ia2, hp: prev.ia2.maxHp, energy: prev.ia2.maxEnergy }
    }));
    setCombatLog([]);
    setShowVictory(false);
    setWinner(null);
    
    addLog(1, `🚀 Bataille démarrée - Scénario: ${gameState.scenario.toUpperCase()}`, 'system');
    addLog(2, `🚀 Prêt au combat!`, 'system');
  };

  const pauseBattle = () => {
    setGameState(prev => ({ ...prev, paused: !prev.paused }));
  };

  const stopBattle = () => {
    setGameState(prev => ({ ...prev, running: false, paused: false }));
    if (battleInterval.current) {
      clearInterval(battleInterval.current);
      battleInterval.current = null;
    }
  };

  const changeSpeed = (speed: number) => {
    setGameState(prev => ({ ...prev, speed }));
  };

  const selectScenario = (scenario: GameState['scenario']) => {
    setGameState(prev => ({ ...prev, scenario }));
    if (gameState.running) {
      stopBattle();
      setTimeout(startBattle, 100);
    }
  };

  const addLog = (ia: 1 | 2, message: string, type: string) => {
    setCombatLog(prev => [{
      ia,
      message,
      type,
      time: Date.now()
    }, ...prev].slice(0, 20));
  };

  const executeAction = (ia: 1 | 2, action: string) => {
    const iaState = ia === 1 ? gameState.ia1 : gameState.ia2;
    const enemyIa = ia === 1 ? 2 : 1;
    const enemy = ia === 1 ? gameState.ia2 : gameState.ia1;

    if (spells[action]) {
      // Cast spell
      const spell = spells[action];
      if (iaState.energy >= spell.cost) {
        const damage = spell.damage + Math.floor(Math.random() * 10);
        
        setGameState(prev => {
          const newState = { ...prev };
          const attacker = ia === 1 ? 'ia1' : 'ia2';
          const defender = ia === 1 ? 'ia2' : 'ia1';
          
          newState[attacker].energy -= spell.cost;
          newState[attacker].stats.spells++;
          newState[attacker].stats.damage += damage;
          newState[defender].hp = Math.max(0, newState[defender].hp - damage);
          
          return newState;
        });

        addLog(ia, `✨ ${spell.name}: ${damage} dégâts`, 'spell');
        setShowFormula({ ia, formula: `${spell.name}\n${spell.formula}` });
        setTimeout(() => setShowFormula(null), 2000);

        // Add explosion effect
        const explosion = {
          id: `exp-${Date.now()}`,
          x: Math.random() * 10,
          y: Math.random() * 10,
          ia: enemyIa as 1 | 2
        };
        setExplosions(prev => [...prev, explosion]);
        setTimeout(() => {
          setExplosions(prev => prev.filter(e => e.id !== explosion.id));
        }, 1000);
      }
    } else {
      // Basic actions
      switch (action) {
        case 'attack':
          const damage = Math.floor(Math.random() * 15) + 10;
          setGameState(prev => {
            const newState = { ...prev };
            const attacker = ia === 1 ? 'ia1' : 'ia2';
            const defender = ia === 1 ? 'ia2' : 'ia1';
            
            newState[attacker].stats.damage += damage;
            newState[attacker].stats.hits++;
            newState[defender].hp = Math.max(0, newState[defender].hp - damage);
            
            return newState;
          });
          addLog(ia, `⚔️ Attaque basique: ${damage} dégâts`, 'attack');
          break;

        case 'defend':
          addLog(ia, "🛡️ Position défensive", 'defend');
          break;

        case 'move':
          setGameState(prev => {
            const newState = { ...prev };
            const iaKey = ia === 1 ? 'ia1' : 'ia2';
            newState[iaKey].position.x = Math.floor(Math.random() * 10);
            newState[iaKey].position.y = Math.floor(Math.random() * 10);
            return newState;
          });
          addLog(ia, `📍 Déplacement tactique`, 'move');
          break;

        case 'heal':
          if (iaState.energy >= 15) {
            const heal = Math.floor(Math.random() * 15) + 10;
            setGameState(prev => {
              const newState = { ...prev };
              const iaKey = ia === 1 ? 'ia1' : 'ia2';
              newState[iaKey].hp = Math.min(newState[iaKey].maxHp, newState[iaKey].hp + heal);
              newState[iaKey].energy -= 15;
              return newState;
            });
            addLog(ia, `💚 Soin: +${heal} HP`, 'heal');
          }
          break;
      }
    }
  };

  // Game loop
  useEffect(() => {
    if (!gameState.running || gameState.paused) return;

    const interval = setInterval(() => {
      // IA turns
      const strategy = strategies[gameState.scenario];
      
      // IA 1 action
      const action1 = chooseAction(strategy);
      executeAction(1, action1);

      // IA 2 action
      setTimeout(() => {
        const action2 = chooseAction(strategy);
        executeAction(2, action2);
      }, 500 / gameState.speed);

      // Energy regeneration
      setGameState(prev => ({
        ...prev,
        ia1: { ...prev.ia1, energy: Math.min(prev.ia1.maxEnergy, prev.ia1.energy + 5) },
        ia2: { ...prev.ia2, energy: Math.min(prev.ia2.maxEnergy, prev.ia2.energy + 5) },
        round: prev.round + 1
      }));

      // Check victory
      if (gameState.ia1.hp <= 0 || gameState.ia2.hp <= 0) {
        const winnerIa = gameState.ia1.hp > 0 ? 1 : 2;
        setWinner(winnerIa);
        setShowVictory(true);
        setGameState(prev => {
          const newState = { ...prev, running: false };
          if (winnerIa === 1) {
            newState.ia1.wins++;
          } else {
            newState.ia2.wins++;
          }
          return newState;
        });
        stopBattle();
      }
    }, 1000 / gameState.speed);

    battleInterval.current = interval;
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState.running, gameState.paused, gameState.speed, gameState.scenario, gameState.ia1.hp, gameState.ia2.hp]);

  const chooseAction = (strategy: typeof strategies.classic): string => {
    const random = Math.random();
    let sum = 0;
    
    for (let i = 0; i < strategy.actions.length; i++) {
      sum += strategy.weights[i];
      if (random < sum) {
        return strategy.actions[i];
      }
    }
    
    return strategy.actions[0];
  };

  const GridCell: React.FC<{ ia: 1 | 2; index: number }> = ({ ia, index }) => {
    const iaState = ia === 1 ? gameState.ia1 : gameState.ia2;
    const x = index % 10;
    const y = Math.floor(index / 10);
    const isHere = iaState.position.x === x && iaState.position.y === y;
    const explosion = explosions.find(e => e.ia === ia && Math.floor(e.x) === x && Math.floor(e.y) === y);

    return (
      <motion.div
        className={`
          relative border transition-all duration-300
          ${ia === 1 
            ? 'border-green-900/30 bg-green-900/5' 
            : 'border-red-900/30 bg-red-900/5'
          }
          ${isHere ? (ia === 1 ? 'bg-green-500/30' : 'bg-red-500/30') : ''}
        `}
        whileHover={{ scale: 1.1 }}
      >
        {isHere && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-2xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            🤖
          </motion.div>
        )}
        {explosion && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-2xl"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            💥
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900">
      {/* Header */}
      <div className="bg-black/80 p-4 text-center border-b-2 border-yellow-500">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          ⚔️ IA vs IA - BATAILLE AUTOMATIQUE ⚔️
        </h1>
        
        {/* Controls */}
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <button
            onClick={startBattle}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:scale-105 transition-all font-bold"
          >
            ▶️ DÉMARRER
          </button>
          
          <button
            onClick={pauseBattle}
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg hover:scale-105 transition-all font-bold"
          >
            {gameState.paused ? '▶️ REPRENDRE' : '⏸️ PAUSE'}
          </button>
          
          <button
            onClick={stopBattle}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:scale-105 transition-all font-bold"
          >
            ⏹️ STOP
          </button>
          
          {/* Speed Control */}
          <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-lg">
            <span className="text-white">Vitesse:</span>
            {[0.5, 1, 2, 5].map(speed => (
              <button
                key={speed}
                onClick={() => changeSpeed(speed)}
                className={`
                  w-12 h-12 rounded-full border-2 transition-all
                  ${gameState.speed === speed 
                    ? 'border-yellow-400 bg-yellow-900/50 text-yellow-400' 
                    : 'border-gray-600 hover:border-yellow-600 text-white'
                  }
                `}
              >
                {speed}x
              </button>
            ))}
          </div>
          
          {/* Scenario Selector */}
          <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-lg">
            <span className="text-white">Scénario:</span>
            {(['classic', 'temporal', 'quantum', '6d'] as const).map(scenario => (
              <button
                key={scenario}
                onClick={() => selectScenario(scenario)}
                className={`
                  px-4 py-2 rounded-lg border transition-all font-bold
                  ${gameState.scenario === scenario 
                    ? 'border-yellow-400 bg-yellow-900/50 text-yellow-400' 
                    : 'border-gray-600 hover:border-yellow-600 text-white'
                  }
                `}
              >
                {scenario.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Battle Container */}
      <div className="grid grid-cols-2 gap-2 p-2">
        {/* IA 1 View */}
        <motion.div 
          className="bg-gradient-to-br from-green-900/20 to-black border-2 border-green-500 rounded-lg overflow-hidden"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-black/50 p-4 border-b border-green-500">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-green-400">
                🤖 IA ALPHA (Temporelle)
              </h2>
              <div className="text-xl text-yellow-400">
                🏆 Victoires: {gameState.ia1.wins}
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex gap-6 mt-3">
              <div className="flex items-center gap-2">
                <span className="text-red-400">❤️</span>
                <div className="w-32 h-3 bg-red-900/50 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-red-600 to-red-400"
                    animate={{ width: `${(gameState.ia1.hp / gameState.ia1.maxHp) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-white">{gameState.ia1.hp}/{gameState.ia1.maxHp}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-blue-400">⚡</span>
                <div className="w-32 h-3 bg-blue-900/50 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                    animate={{ width: `${(gameState.ia1.energy / gameState.ia1.maxEnergy) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-white">{gameState.ia1.energy}/{gameState.ia1.maxEnergy}</span>
              </div>
            </div>
          </div>
          
          {/* Game Grid */}
          <div className="p-4">
            <div className="grid grid-cols-10 gap-1 aspect-square max-w-md mx-auto">
              {Array.from({ length: 100 }).map((_, i) => (
                <GridCell key={i} ia={1} index={i} />
              ))}
            </div>
          </div>
          
          {/* Action Log */}
          <div className="bg-black/50 border-t border-green-500 p-4 h-48 overflow-y-auto">
            <h3 className="text-green-400 font-bold mb-2">📜 Actions</h3>
            <div className="space-y-1">
              {combatLog.filter(log => log.ia === 1).slice(0, 10).map((log, i) => (
                <motion.div
                  key={`${log.time}-${i}`}
                  className={`text-sm p-1 border-l-2 pl-2 ${
                    log.type === 'attack' ? 'border-red-500 text-red-400' :
                    log.type === 'spell' ? 'border-yellow-500 text-yellow-400' :
                    log.type === 'defend' ? 'border-green-500 text-green-400' :
                    log.type === 'heal' ? 'border-pink-500 text-pink-400' :
                    'border-gray-500 text-gray-400'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span className="text-gray-600">[{new Date(log.time).toLocaleTimeString()}]</span> {log.message}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* IA 2 View */}
        <motion.div 
          className="bg-gradient-to-br from-red-900/20 to-black border-2 border-red-500 rounded-lg overflow-hidden"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-black/50 p-4 border-b border-red-500">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-red-400">
                🤖 IA BETA (Quantique)
              </h2>
              <div className="text-xl text-yellow-400">
                🏆 Victoires: {gameState.ia2.wins}
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex gap-6 mt-3">
              <div className="flex items-center gap-2">
                <span className="text-red-400">❤️</span>
                <div className="w-32 h-3 bg-red-900/50 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-red-600 to-red-400"
                    animate={{ width: `${(gameState.ia2.hp / gameState.ia2.maxHp) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-white">{gameState.ia2.hp}/{gameState.ia2.maxHp}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-blue-400">⚡</span>
                <div className="w-32 h-3 bg-blue-900/50 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                    animate={{ width: `${(gameState.ia2.energy / gameState.ia2.maxEnergy) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-white">{gameState.ia2.energy}/{gameState.ia2.maxEnergy}</span>
              </div>
            </div>
          </div>
          
          {/* Game Grid */}
          <div className="p-4">
            <div className="grid grid-cols-10 gap-1 aspect-square max-w-md mx-auto">
              {Array.from({ length: 100 }).map((_, i) => (
                <GridCell key={i} ia={2} index={i} />
              ))}
            </div>
          </div>
          
          {/* Action Log */}
          <div className="bg-black/50 border-t border-red-500 p-4 h-48 overflow-y-auto">
            <h3 className="text-red-400 font-bold mb-2">📜 Actions</h3>
            <div className="space-y-1">
              {combatLog.filter(log => log.ia === 2).slice(0, 10).map((log, i) => (
                <motion.div
                  key={`${log.time}-${i}`}
                  className={`text-sm p-1 border-l-2 pl-2 ${
                    log.type === 'attack' ? 'border-red-500 text-red-400' :
                    log.type === 'spell' ? 'border-yellow-500 text-yellow-400' :
                    log.type === 'defend' ? 'border-green-500 text-green-400' :
                    log.type === 'heal' ? 'border-pink-500 text-pink-400' :
                    'border-gray-500 text-gray-400'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span className="text-gray-600">[{new Date(log.time).toLocaleTimeString()}]</span> {log.message}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Round Display */}
      <AnimatePresence>
        {gameState.running && !gameState.paused && gameState.round % 10 === 0 && (
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       bg-black/90 border-3 border-yellow-500 rounded-2xl p-8 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <div className="text-6xl font-bold text-yellow-400">ROUND {gameState.round}</div>
            <div className="text-2xl text-white mt-2">Scénario: {gameState.scenario.toUpperCase()}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Formula Display */}
      <AnimatePresence>
        {showFormula && (
          <motion.div
            className={`
              fixed z-50 bg-black/90 border-2 rounded-xl p-6
              ${showFormula.ia === 1 
                ? 'top-1/4 left-1/4 border-green-400 shadow-2xl shadow-green-400/50' 
                : 'top-1/4 right-1/4 border-red-400 shadow-2xl shadow-red-400/50'
              }
            `}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <pre className={`text-2xl font-mono text-center whitespace-pre ${
              showFormula.ia === 1 ? 'text-green-400' : 'text-red-400'
            }`}>
              {showFormula.formula}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Victory Screen */}
      <AnimatePresence>
        {showVictory && winner && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-purple-900 to-black border-4 border-yellow-500 rounded-2xl p-12 text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <h2 className={`text-6xl font-bold mb-8 ${
                winner === 1 ? 'text-green-400' : 'text-red-400'
              }`}>
                🏆 VICTOIRE {winner === 1 ? 'IA ALPHA' : 'IA BETA'} ! 🏆
              </h2>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="text-left">
                  <h3 className="text-2xl text-green-400 mb-4">IA ALPHA</h3>
                  <div className="space-y-2 text-white">
                    <div>Dégâts infligés: <span className="text-yellow-400">{gameState.ia1.stats.damage}</span></div>
                    <div>Sorts lancés: <span className="text-yellow-400">{gameState.ia1.stats.spells}</span></div>
                    <div>Efficacité: <span className="text-yellow-400">
                      {gameState.ia1.stats.hits > 0 
                        ? Math.round((gameState.ia1.stats.damage / (gameState.ia1.stats.hits * 20)) * 100) 
                        : 0}%
                    </span></div>
                  </div>
                </div>
                
                <div className="text-left">
                  <h3 className="text-2xl text-red-400 mb-4">IA BETA</h3>
                  <div className="space-y-2 text-white">
                    <div>Dégâts infligés: <span className="text-yellow-400">{gameState.ia2.stats.damage}</span></div>
                    <div>Sorts lancés: <span className="text-yellow-400">{gameState.ia2.stats.spells}</span></div>
                    <div>Efficacité: <span className="text-yellow-400">
                      {gameState.ia2.stats.hits > 0 
                        ? Math.round((gameState.ia2.stats.damage / (gameState.ia2.stats.hits * 20)) * 100) 
                        : 0}%
                    </span></div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setShowVictory(false);
                  setGameState(prev => ({
                    ...prev,
                    ia1: { ...prev.ia1, stats: { damage: 0, spells: 0, hits: 0, misses: 0 } },
                    ia2: { ...prev.ia2, stats: { damage: 0, spells: 0, hits: 0, misses: 0 } }
                  }));
                  startBattle();
                }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl rounded-lg hover:scale-105 transition-all"
              >
                🔄 NOUVELLE BATAILLE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIBattleAutoplay;
