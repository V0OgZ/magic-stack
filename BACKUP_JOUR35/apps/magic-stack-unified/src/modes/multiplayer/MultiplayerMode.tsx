import React, { useState, useEffect, useCallback } from 'react';
import { HEROES } from '../../data/heroes';
import { SPELLS } from '../../data/spells';

interface Position {
  x: number;
  y: number;
}

interface Player {
  id: string;
  name: string;
  hero: typeof HEROES.alice;
  position: Position;
  resources: {
    energy: number;
    phase: number;
    drift: number;
    crystals: number;
    spells: number;
    artifacts: number;
    hp: number;
    mana: number;
  };
}

interface Tile {
  terrain: string;
  entity: any;
  treasure: string | null;
  portal: any;
  fog: 'none' | 'partial' | 'total';
}

interface CombatCard {
  name: string;
  cost: number;
  damage?: number;
  defense?: number;
  heal?: number;
  special?: string;
  icon: string;
}

export const MultiplayerMode: React.FC = () => {
  const [mapSize] = useState(12);
  const [map, setMap] = useState<Tile[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<'player1' | 'player2'>('player1');
  const [turn, setTurn] = useState(1);
  const [inCombat, setInCombat] = useState(false);
  const [selectedTile, setSelectedTile] = useState<Position | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [victoryScreen, setVictoryScreen] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const [players, setPlayers] = useState<Record<string, Player>>({
    player1: {
      id: 'player1',
      name: 'Alice',
      hero: HEROES.alice,
      position: { x: 0, y: 0 },
      resources: {
        energy: 100,
        phase: 50,
        drift: 0,
        crystals: 5,
        spells: 3,
        artifacts: 1,
        hp: 100,
        mana: 8
      }
    },
    player2: {
      id: 'player2',
      name: 'Vincent',
      hero: HEROES.vincent,
      position: { x: 11, y: 11 },
      resources: {
        energy: 100,
        phase: 50,
        drift: 0,
        crystals: 5,
        spells: 3,
        artifacts: 1,
        hp: 100,
        mana: 8
      }
    }
  });

  const terrainTypes = ['grass', 'mountain', 'water', 'forest', 'mystique', 'quantum', 'nexus'];

  const cards: CombatCard[] = [
    { name: 'Boule de Feu', cost: 3, damage: 30, icon: '🔥' },
    { name: 'Bouclier Temporel', cost: 2, defense: 20, icon: '🛡️' },
    { name: 'Soin Quantique', cost: 2, heal: 25, icon: '💚' },
    { name: 'Fork Reality', cost: 5, special: 'clone', icon: '🔀' },
    { name: 'Collapse', cost: 4, damage: 40, icon: '💥' },
    { name: 'Shift', cost: 3, special: 'time', icon: '⏭️' }
  ];

  // Initialisation de la carte
  useEffect(() => {
    initializeMap();
  }, []);

  const initializeMap = () => {
    const newMap: Tile[][] = [];
    for (let y = 0; y < mapSize; y++) {
      newMap[y] = [];
      for (let x = 0; x < mapSize; x++) {
        let terrain = terrainTypes[Math.floor(Math.random() * terrainTypes.length)];
        
        // Centre est toujours Nexus
        if (x === 6 && y === 6) {
          terrain = 'nexus';
        }
        
        // Calcul du brouillard initial
        const distance = Math.abs(x - 0) + Math.abs(y - 0);
        let fog: 'none' | 'partial' | 'total' = 'none';
        if (distance > 3) fog = 'total';
        else if (distance > 2) fog = 'partial';
        
        newMap[y][x] = {
          terrain,
          entity: null,
          treasure: null,
          portal: null,
          fog
        };
      }
    }
    
    // Placer des trésors
    const treasures = ['💎', '📜', '🗝️', '🏺', '⚗️', '🎁'];
    for (let i = 0; i < 8; i++) {
      const x = Math.floor(Math.random() * mapSize);
      const y = Math.floor(Math.random() * mapSize);
      if (!(x === 0 && y === 0) && !(x === 11 && y === 11)) {
        newMap[y][x].treasure = treasures[Math.floor(Math.random() * treasures.length)];
      }
    }
    
    // Placer des portails
    newMap[3][3].portal = { icon: '🌀', destination: 'mystique' };
    newMap[8][8].portal = { icon: '🌌', destination: 'quantum' };
    
    setMap(newMap);
  };

  const getTerrainStyle = (terrain: string) => {
    const styles: Record<string, string> = {
      grass: 'bg-gradient-to-br from-green-800 to-green-600',
      mountain: 'bg-gradient-to-br from-gray-700 to-gray-500',
      water: 'bg-gradient-to-br from-blue-800 to-blue-600',
      forest: 'bg-gradient-to-br from-green-900 to-green-700',
      mystique: 'bg-gradient-to-br from-purple-800 to-purple-600',
      quantum: 'bg-gradient-to-br from-cyan-800 to-cyan-600',
      nexus: 'bg-gradient-to-br from-yellow-600 to-yellow-400 animate-pulse'
    };
    return styles[terrain] || 'bg-gray-800';
  };

  const handleTileClick = (x: number, y: number) => {
    const tile = map[y]?.[x];
    if (!tile || tile.fog === 'total') return;
    
    const player = players[currentPlayer];
    const distance = Math.abs(player.position.x - x) + Math.abs(player.position.y - y);
    
    if (distance <= 3 && player.resources.energy >= 3) {
      moveHeroTo(x, y);
    } else {
      setSelectedTile({ x, y });
      showMessage(`Distance: ${distance} cases. Portée max: 3`);
    }
  };

  const moveHeroTo = (x: number, y: number) => {
    const player = players[currentPlayer];
    const newMap = [...map];
    
    // Révéler le brouillard autour de la nouvelle position
    revealFog(x, y, 3, newMap);
    
    // Collecter trésor
    const tile = newMap[y][x];
    if (tile.treasure) {
      collectTreasure(tile.treasure);
      tile.treasure = null;
    }
    
    // Entrer dans un portail
    if (tile.portal) {
      showMessage(`🌀 Portail vers ${tile.portal.destination} activé!`);
    }
    
    // Mettre à jour la position
    setPlayers(prev => ({
      ...prev,
      [currentPlayer]: {
        ...prev[currentPlayer],
        position: { x, y },
        resources: {
          ...prev[currentPlayer].resources,
          energy: prev[currentPlayer].resources.energy - 3
        }
      }
    }));
    
    setMap(newMap);
    
    // Chance de combat
    if (Math.random() < 0.3) {
      setInCombat(true);
    }
    
    // Vérifier victoire
    if (x === 6 && y === 6) {
      checkVictory();
    }
  };

  const revealFog = (centerX: number, centerY: number, radius: number, mapRef: Tile[][]) => {
    for (let y = 0; y < mapSize; y++) {
      for (let x = 0; x < mapSize; x++) {
        const distance = Math.abs(x - centerX) + Math.abs(y - centerY);
        
        if (distance <= radius) {
          mapRef[y][x].fog = 'none';
        } else if (distance <= radius + 1 && mapRef[y][x].fog === 'total') {
          mapRef[y][x].fog = 'partial';
        }
      }
    }
  };

  const collectTreasure = (treasure: string) => {
    const player = players[currentPlayer];
    let msg = '';
    
    setPlayers(prev => {
      const resources = { ...prev[currentPlayer].resources };
      
      switch(treasure) {
        case '💎':
          resources.crystals += 3;
          msg = '💎 +3 Cristaux trouvés!';
          break;
        case '📜':
          resources.spells += 1;
          msg = '📜 Nouveau sort appris!';
          break;
        case '🗝️':
          resources.artifacts += 1;
          msg = '🗝️ Artefact découvert!';
          break;
        case '🏺':
          resources.energy = Math.min(100, resources.energy + 20);
          msg = '🏺 +20 Énergie restaurée!';
          break;
        case '⚗️':
          resources.phase += 10;
          msg = '⚗️ +10 Phase gagnée!';
          break;
        case '🎁':
          resources.hp = Math.min(100, resources.hp + 30);
          msg = '🎁 +30 HP soignés!';
          break;
      }
      
      return {
        ...prev,
        [currentPlayer]: {
          ...prev[currentPlayer],
          resources
        }
      };
    });
    
    showMessage(msg);
  };

  const checkVictory = () => {
    const player = players[currentPlayer];
    if (player.resources.crystals >= 20 || player.resources.artifacts >= 5) {
      setWinner(player.name);
      setVictoryScreen(true);
    } else {
      showMessage('⚠️ Nexus atteint! Il faut 20 cristaux ou 5 artefacts pour gagner!');
    }
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  const endTurn = () => {
    const nextPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
    setCurrentPlayer(nextPlayer);
    setTurn(prev => prev + 1);
    
    // Régénération
    setPlayers(prev => ({
      ...prev,
      [nextPlayer]: {
        ...prev[nextPlayer],
        resources: {
          ...prev[nextPlayer].resources,
          energy: Math.min(100, prev[nextPlayer].resources.energy + 10),
          mana: Math.min(10, prev[nextPlayer].resources.mana + 2)
        }
      }
    }));
    
    showMessage(`Tour ${turn + 1} - Joueur: ${players[nextPlayer].name}`);
  };

  const player = players[currentPlayer];

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      {/* Map Panel */}
      <div className="flex-1 relative bg-black/50 overflow-hidden">
        {/* Turn Indicator */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 px-6 py-3 rounded-lg border-2 border-yellow-500 z-10">
          <span className="text-white text-xl">
            ⏱️ Tour: {turn} | Joueur: {player.name}
          </span>
        </div>

        {/* Map Grid */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div 
            className="grid gap-0.5 border-4 border-yellow-500"
            style={{
              gridTemplateColumns: `repeat(${mapSize}, 60px)`,
              gridTemplateRows: `repeat(${mapSize}, 60px)`
            }}
          >
            {map.map((row, y) => 
              row.map((tile, x) => {
                const isPlayerHere = player.position.x === x && player.position.y === y;
                const otherPlayer = currentPlayer === 'player1' ? players.player2 : players.player1;
                const isOtherPlayerHere = otherPlayer.position.x === x && otherPlayer.position.y === y;
                
                return (
                  <div
                    key={`${x}-${y}`}
                    onClick={() => handleTileClick(x, y)}
                    className={`
                      relative w-[60px] h-[60px] border border-white/10 cursor-pointer
                      transition-all duration-300 hover:scale-110 hover:z-10
                      flex items-center justify-center text-2xl
                      ${getTerrainStyle(tile.terrain)}
                      ${tile.fog === 'total' ? 'bg-black opacity-90' : ''}
                      ${tile.fog === 'partial' ? 'opacity-50 blur-sm' : ''}
                      ${selectedTile?.x === x && selectedTile?.y === y ? 'ring-2 ring-yellow-400' : ''}
                    `}
                  >
                    {tile.fog === 'none' && (
                      <>
                        {x === 6 && y === 6 && '🌟'}
                        {isPlayerHere && <span className="animate-bounce drop-shadow-glow">{player.hero.icon_id}</span>}
                        {isOtherPlayerHere && tile.fog === 'none' && <span className="animate-bounce drop-shadow-glow">{otherPlayer.hero.icon_id}</span>}
                        {!isPlayerHere && !isOtherPlayerHere && tile.treasure && <span className="animate-pulse">{tile.treasure}</span>}
                        {!isPlayerHere && !isOtherPlayerHere && tile.portal && <span className="animate-spin">{tile.portal.icon}</span>}
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                          bg-black/90 text-yellow-400 px-8 py-4 rounded-lg border-2 border-yellow-500
                          text-2xl font-bold z-50 animate-fadeInOut">
            {message}
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div className="w-96 bg-gradient-to-b from-gray-900 to-black border-l-4 border-yellow-500 flex flex-col">
        {/* Player Info */}
        <div className="p-5 border-b-2 border-gray-700">
          <div className="text-2xl font-bold text-yellow-400 mb-4">
            👑 {player.name} - {player.hero.name}
          </div>
          
          {/* Resources */}
          <div className="grid grid-cols-3 gap-3">
            <ResourceDisplay icon="⚡" value={player.resources.energy} max={100} label="Énergie" />
            <ResourceDisplay icon="🌀" value={player.resources.phase} label="Phase" />
            <ResourceDisplay icon="⏰" value={player.resources.drift} label="Drift" />
            <ResourceDisplay icon="💎" value={player.resources.crystals} label="Cristaux" />
            <ResourceDisplay icon="📜" value={player.resources.spells} label="Sorts" />
            <ResourceDisplay icon="🗝️" value={player.resources.artifacts} label="Artefacts" />
          </div>
        </div>

        {/* Hero Stats */}
        <div className="p-5 border-b-2 border-gray-700">
          <h3 className="text-xl font-bold text-white mb-3">⚔️ Héros Actif</h3>
          
          <StatBar 
            label="❤️ Points de Vie" 
            value={player.resources.hp} 
            max={100} 
            color="bg-gradient-to-r from-red-600 to-red-400" 
          />
          
          <StatBar 
            label="🔵 Mana" 
            value={player.resources.mana} 
            max={10} 
            color="bg-gradient-to-r from-blue-600 to-cyan-400" 
          />
          
          <StatBar 
            label="🕐 Cohérence Temporelle" 
            value={Math.max(0, 100 - player.resources.drift * 10)} 
            max={100} 
            color="bg-gradient-to-r from-purple-600 to-pink-400" 
          />
        </div>

        {/* Actions */}
        <div className="flex-1 p-5 overflow-y-auto">
          <h3 className="text-xl font-bold text-white mb-4">🎮 Actions</h3>
          
          <ActionButton 
            onClick={() => showMessage('🚶 Cliquez sur une case (portée: 3)')}
            disabled={player.resources.energy < 3}
          >
            🚶 Déplacer (3 ⚡)
          </ActionButton>
          
          <ActionButton 
            onClick={() => {
              if (player.resources.energy >= 2 && player.resources.phase >= 1) {
                const newMap = [...map];
                revealFog(player.position.x, player.position.y, 5, newMap);
                setMap(newMap);
                setPlayers(prev => ({
                  ...prev,
                  [currentPlayer]: {
                    ...prev[currentPlayer],
                    resources: {
                      ...prev[currentPlayer].resources,
                      energy: prev[currentPlayer].resources.energy - 2,
                      phase: prev[currentPlayer].resources.phase - 1
                    }
                  }
                }));
                showMessage('🔍 Zone explorée!');
              }
            }}
            disabled={player.resources.energy < 2 || player.resources.phase < 1}
          >
            🔍 Explorer (2 ⚡ + 1 🌀)
          </ActionButton>
          
          <ActionButton 
            onClick={() => {
              if (player.resources.spells > 0) {
                setPlayers(prev => ({
                  ...prev,
                  [currentPlayer]: {
                    ...prev[currentPlayer],
                    resources: {
                      ...prev[currentPlayer].resources,
                      spells: prev[currentPlayer].resources.spells - 1,
                      energy: Math.min(100, prev[currentPlayer].resources.energy + 30)
                    }
                  }
                }));
                showMessage('✨ Sort lancé! +30 Énergie');
              }
            }}
            disabled={player.resources.spells === 0}
          >
            ✨ Lancer Sort
          </ActionButton>
          
          <ActionButton onClick={endTurn}>
            ⏩ Fin de Tour
          </ActionButton>
          
          <ActionButton 
            onClick={() => {
              const msg = `
🎯 OBJECTIF:
━━━━━━━━━━━━
1️⃣ Nexus Central (6,6)
2️⃣ 20 Cristaux (${player.resources.crystals}/20)
3️⃣ 5 Artefacts (${player.resources.artifacts}/5)
              `;
              showMessage(msg);
            }}
            className="bg-gradient-to-r from-pink-600 to-red-600"
          >
            🎯 Objectif
          </ActionButton>
        </div>
      </div>

      {/* Combat Overlay */}
      {inCombat && (
        <CombatOverlay 
          player={player}
          cards={cards}
          onClose={() => setInCombat(false)}
          onPlayCard={(card) => {
            showMessage(`${card.icon} ${card.name} joué!`);
            setInCombat(false);
          }}
        />
      )}

      {/* Victory Screen */}
      {victoryScreen && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-800 to-pink-800 flex items-center justify-center z-50">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-yellow-400 mb-8 animate-pulse">
              🏆 VICTOIRE ! 🏆
            </h1>
            <h2 className="text-3xl text-white mb-8">
              {winner} a conquis le Nexus Temporel!
            </h2>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl rounded-lg hover:scale-105 transition-all"
            >
              🔄 Nouvelle Partie
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Composants auxiliaires
const ResourceDisplay: React.FC<{ icon: string; value: number; max?: number; label: string }> = ({ 
  icon, value, max, label 
}) => (
  <div className="bg-black/50 p-3 rounded-lg text-center">
    <div className="text-2xl mb-1">{icon}</div>
    <div className="text-xl font-bold text-white">
      {value}{max && `/${max}`}
    </div>
    <div className="text-xs text-gray-400">{label}</div>
  </div>
);

const StatBar: React.FC<{ label: string; value: number; max: number; color: string }> = ({ 
  label, value, max, color 
}) => (
  <div className="mb-3">
    <div className="text-sm text-gray-300 mb-1">{label}</div>
    <div className="bg-gray-800 h-5 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-500`}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
    <div className="text-xs text-gray-400 mt-1">{value}/{max}</div>
  </div>
);

const ActionButton: React.FC<{ 
  onClick: () => void; 
  disabled?: boolean; 
  children: React.ReactNode;
  className?: string;
}> = ({ onClick, disabled, children, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      w-full px-4 py-3 mb-3 rounded-lg font-bold text-white
      transition-all duration-300 
      ${disabled 
        ? 'bg-gray-700 opacity-50 cursor-not-allowed' 
        : `bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 hover:shadow-lg ${className}`
      }
    `}
  >
    {children}
  </button>
);

const CombatOverlay: React.FC<{
  player: Player;
  cards: CombatCard[];
  onClose: () => void;
  onPlayCard: (card: CombatCard) => void;
}> = ({ player, cards, onClose, onPlayCard }) => {
  const [enemyHp, setEnemyHp] = useState(80);
  const enemies = [
    { name: 'Gardien Quantique', icon: '👾', hp: 80 },
    { name: 'Dragon du Nexus', icon: '🐉', hp: 120 },
    { name: 'Spectre Causal', icon: '👻', hp: 70 }
  ];
  const enemy = enemies[Math.floor(Math.random() * enemies.length)];

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-900 to-purple-900 border-4 border-yellow-500 rounded-2xl p-8 max-w-4xl w-full">
        <h2 className="text-4xl font-bold text-yellow-400 text-center mb-8">⚔️ COMBAT TCG ⚔️</h2>
        
        {/* Combat Field */}
        <div className="flex justify-around items-center mb-8">
          <div className="text-center">
            <div className="text-6xl mb-4">{player.hero.icon_id}</div>
            <div className="text-xl text-white">{player.hero.name}</div>
            <div className="text-2xl font-bold text-red-400">❤️ {player.resources.hp}</div>
          </div>
          
          <div className="text-5xl text-yellow-400">VS</div>
          
          <div className="text-center">
            <div className="text-6xl mb-4">{enemy.icon}</div>
            <div className="text-xl text-white">{enemy.name}</div>
            <div className="text-2xl font-bold text-red-400">❤️ {enemyHp}</div>
          </div>
        </div>
        
        {/* Cards */}
        <div className="flex justify-center gap-4 mb-6">
          {cards.slice(0, 4).map((card, i) => (
            <div
              key={i}
              onClick={() => {
                if (player.resources.mana >= card.cost) {
                  onPlayCard(card);
                }
              }}
              className={`
                bg-gradient-to-br from-gray-800 to-gray-700 border-2 border-gray-600
                rounded-lg p-4 cursor-pointer transition-all duration-300
                hover:scale-105 hover:border-yellow-500 hover:shadow-xl
                ${player.resources.mana < card.cost ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{card.icon}</div>
                <div className="font-bold text-white">{card.name}</div>
                <div className="text-cyan-400 text-sm">Coût: {card.cost}</div>
                <div className="text-gray-400 text-xs mt-2">
                  {card.damage && `Dégâts: ${card.damage}`}
                  {card.heal && `Soin: ${card.heal}`}
                  {card.defense && `Défense: ${card.defense}`}
                  {card.special && `Spécial`}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg hover:scale-105 transition-all"
          >
            Fuir (-20 HP)
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiplayerMode;
