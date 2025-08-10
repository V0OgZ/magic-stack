/**
 * 🎮 UNIFIED GAME EXPERIENCE - Heroes of Time Ultimate
 * 
 * Le mélange parfait de HOMM3 + Warcraft 3 + WoW
 * Avec des personnages vivants grâce à l'IA !
 */

import React, { useState, useEffect, useRef } from 'react';
import { HeroProfileView } from '../../shared/components/HeroProfileView';
import { CombatInterface } from '../../shared/components/CombatInterface';
import { SpatioTemporalMapEditor } from '../../shared/components/SpatioTemporalMapEditor';
import { SpeechBubble, SpeechBubbleContainer } from '../../shared/components/SpeechBubble';
import { HEROES, getHeroById } from '../../data/heroes';
import { CREATURES } from '../../data/creatures';
import { ARTIFACTS } from '../../data/artifacts';
import { SPELLS } from '../../data/spells';
import { aiService, useAICharacter, GameContext } from '../../services/AIService';

// Types pour l'expérience de jeu
interface GameWorld {
  name: string;
  currentMap: GameMap;
  player: PlayerState;
  npcs: NPC[];
  quests: Quest[];
  time: GameTime;
  weather: Weather;
}

interface GameMap {
  id: string;
  name: string;
  width: number;
  height: number;
  tiles: Tile[][];
  pointsOfInterest: POI[];
  encounters: Encounter[];
}

interface PlayerState {
  hero: any; // HeroProfile étendu
  position: { x: number; y: number; z: number };
  resources: {
    gold: number;
    crystals: number;
    temporalEnergy: number;
    reputation: Record<string, number>;
  };
  party: any[];
  questLog: Quest[];
  achievements: any[];
}

interface NPC {
  id: string;
  name: string;
  icon: string;
  position: { x: number; y: number };
  personality: string;
  dialogue: DialogueTree;
  faction: string;
  relationship: number; // -100 à 100
}

interface Quest {
  id: string;
  name: string;
  description: string;
  objectives: QuestObjective[];
  rewards: Reward[];
  giver: string;
  status: 'available' | 'active' | 'completed';
}

interface DialogueTree {
  greeting: string;
  options: DialogueOption[];
  personality: string;
}

interface Tile {
  terrain: 'grass' | 'forest' | 'mountain' | 'water' | 'desert' | 'snow';
  resource?: string;
  building?: string;
  visibility: 'hidden' | 'fog' | 'visible';
}

interface POI {
  id: string;
  name: string;
  type: 'castle' | 'dungeon' | 'temple' | 'market' | 'portal';
  position: { x: number; y: number };
  icon: string;
  description: string;
}

interface Encounter {
  id: string;
  type: 'monster' | 'treasure' | 'event' | 'boss';
  position: { x: number; y: number };
  triggered: boolean;
}

interface GameTime {
  day: number;
  hour: number;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  timeline: 'past' | 'present' | 'future';
}

interface Weather {
  current: 'sunny' | 'rainy' | 'stormy' | 'foggy' | 'snowy';
  effects: string[];
}

interface QuestObjective {
  id: string;
  description: string;
  completed: boolean;
  current?: number;
  required?: number;
}

interface Reward {
  type: 'xp' | 'gold' | 'item' | 'reputation';
  amount?: number;
  itemId?: string;
  faction?: string;
}

interface DialogueOption {
  text: string;
  response: string;
  action?: string;
  condition?: string;
}

// État du mode actuel
type GameMode = 'exploration' | 'combat' | 'dialogue' | 'inventory' | 'map' | 'quests';

export function UnifiedGameExperience(): React.ReactElement {
  const [gameMode, setGameMode] = useState<GameMode>('exploration');
  const [world, setWorld] = useState<GameWorld>({
    name: 'Chronos Prime',
    currentMap: generateMap(),
    player: initializePlayer(),
    npcs: generateNPCs(),
    quests: generateQuests(),
    time: { day: 1, hour: 12, season: 'summer', timeline: 'present' },
    weather: { current: 'sunny', effects: [] },
  });
  
  const [selectedNPC, setSelectedNPC] = useState<NPC | null>(null);
  const [combatState, setCombatState] = useState<any>(null);
  const [showDialogue, setShowDialogue] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [currentBubbles, setCurrentBubbles] = useState<any[]>([]);
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, zoom: 1 });
  
  // Référence pour le rendu 3D/2.5D
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Hooks IA pour les personnages
  const merlinAI = useAICharacter('merlin');
  const arthurAI = useAICharacter('arthur_pendragon');
  const dragonAI = useAICharacter('dragon_rouge_temporel');
  
  // Construire le contexte de jeu enrichi pour l'IA
  const buildGameContext = (npc?: NPC): GameContext => {
    const playerHp = world.player.hero.stats.health;
    const maxHp = world.player.hero.stats.health;
    const isWinning = playerHp > 70;
    const isDesperate = playerHp < 30;
    
    return {
      hp: playerHp,
      maxHp: maxHp,
      mana: world.player.hero.stats.mana,
      maxMana: world.player.hero.stats.mana,
      
      turn: world.time.day,
      winning: isWinning,
      desperate: isDesperate,
      confident: isWinning && world.player.resources.gold > 2000,
      
      position: world.player.position,
      terrain: world.currentMap.tiles[world.player.position.y]?.[world.player.position.x]?.terrain,
      
      timePhase: world.time.timeline,
      timeline: world.time.timeline,
      day: world.time.day,
      temporalDrift: world.player.resources.temporalEnergy,
      
      playerName: world.player.hero.name,
      relationship: npc?.relationship || 50,
      faction: npc?.faction,
      
      weapon: world.player.hero.equippedItems?.weapon?.name,
      artifact: world.player.hero.equippedItems?.armor?.name,
    };
  };
  
  // Système de dialogue IA amélioré
  const getAIDialogue = async (npc: NPC, message?: string) => {
    const context = buildGameContext(npc);
    
    try {
      const response = await aiService.getCharacterSpeech(
        npc.name.toLowerCase().replace(' ', '_'),
        context,
        message
      );
      
      return response;
    } catch (error) {
      console.error('Erreur IA:', error);
      return {
        character: npc.name,
        response: npc.dialogue.greeting,
        emotion: 'neutral' as const
      };
    }
  };
  
  // Interaction avec un NPC
  const interactWithNPC = async (npc: NPC) => {
    setSelectedNPC(npc);
    setShowDialogue(true);
    
    // Obtenir la réponse de l'IA
    const response = await getAIDialogue(npc, 'greeting');
    
    // Créer une bulle de dialogue
    const newBubble = {
      id: `bubble-${Date.now()}`,
      character: npc.name,
      text: response.response,
      emotion: response.emotion,
      position: { x: 50, y: 70 },
      avatar: npc.icon,
      color: '#667eea'
    };
    
    setCurrentBubbles([newBubble]);
    setAiResponse(response.response);
    
    // Améliorer la relation
    setWorld(prev => ({
      ...prev,
      npcs: prev.npcs.map(n => 
        n.id === npc.id 
          ? { ...n, relationship: Math.min(100, n.relationship + 5) }
          : n
      )
    }));
  };
  
  // Déplacer le joueur (style HOMM3)
  const movePlayer = (dx: number, dy: number) => {
    const newX = world.player.position.x + dx;
    const newY = world.player.position.y + dy;
    
    // Vérifier les limites et obstacles
    if (newX >= 0 && newX < world.currentMap.width && 
        newY >= 0 && newY < world.currentMap.height) {
      
      setWorld(prev => ({
        ...prev,
        player: {
          ...prev.player,
          position: { ...prev.player.position, x: newX, y: newY }
        }
      }));
      
      // Vérifier les rencontres
      checkEncounters(newX, newY);
      
      // Révéler la carte (fog of war)
      revealMap(newX, newY);
    }
  };
  
  // Vérifier les rencontres
  const checkEncounters = (x: number, y: number) => {
    const encounter = world.currentMap.encounters.find(
      e => e.position.x === x && e.position.y === y && !e.triggered
    );
    
    if (encounter) {
      if (encounter.type === 'monster') {
        // Lancer un combat
        startCombat(encounter);
      } else if (encounter.type === 'treasure') {
        // Donner trésor
        findTreasure();
      } else if (encounter.type === 'event') {
        // Événement narratif
        triggerEvent(encounter);
      }
    }
  };
  
  // Démarrer un combat (style Warcraft 3)
  const startCombat = (encounter: any) => {
    const enemy = CREATURES.dragon_rouge_temporel; // Boss épique !
    
    setCombatState({
      playerHero: world.player.hero,
      enemyHero: enemy,
      playerHealth: world.player.hero.stats.health,
      enemyHealth: enemy.health,
      playerMana: world.player.hero.stats.mana,
      enemyMana: 10,
      turn: 1,
      isPlayerTurn: true,
      timeline: world.time.timeline,
      paradoxLevel: 0,
      hand: generateHand(),
      board: { player: [], enemy: [] },
      history: []
    });
    
    setGameMode('combat');
  };
  
  // Révéler la carte
  const revealMap = (x: number, y: number) => {
    const radius = 3; // Vision radius
    
    setWorld(prev => {
      const newTiles = [...prev.currentMap.tiles];
      
      for (let i = -radius; i <= radius; i++) {
        for (let j = -radius; j <= radius; j++) {
          const tileX = x + i;
          const tileY = y + j;
          
          if (tileX >= 0 && tileX < prev.currentMap.width &&
              tileY >= 0 && tileY < prev.currentMap.height) {
            const distance = Math.sqrt(i * i + j * j);
            if (distance <= radius) {
              newTiles[tileY][tileX] = {
                ...newTiles[tileY][tileX],
                visibility: distance <= radius - 1 ? 'visible' : 'fog'
              };
            }
          }
        }
      }
      
      return {
        ...prev,
        currentMap: {
          ...prev.currentMap,
          tiles: newTiles
        }
      };
    });
  };
  
  // Interface principale
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1d3a 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* HUD Principal (style WoW) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.8), transparent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 100,
      }}>
        {/* Portrait du héros */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 15,
        }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${world.player.hero.theme_color}, #764ba2)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            border: '3px solid gold',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
          }}>
            {world.player.hero.icon_id}
          </div>
          <div>
            <div style={{ fontWeight: 'bold' }}>{world.player.hero.name}</div>
            <div style={{ fontSize: 14, color: '#a0aec0' }}>
              Niveau {world.player.hero.level} • {world.player.hero.class}
            </div>
            <div style={{
              display: 'flex',
              gap: 10,
              marginTop: 5,
            }}>
              <HealthBar 
                current={world.player.hero.stats.health} 
                max={world.player.hero.stats.health}
                color="#95e77e"
                icon="❤️"
              />
              <HealthBar 
                current={world.player.hero.stats.mana} 
                max={world.player.hero.stats.mana}
                color="#bb85ff"
                icon="💫"
              />
            </div>
          </div>
        </div>
        
        {/* Ressources (style HOMM3) */}
        <div style={{
          display: 'flex',
          gap: 20,
          background: 'rgba(0,0,0,0.5)',
          padding: '10px 20px',
          borderRadius: 10,
        }}>
          <ResourceDisplay icon="🪙" value={world.player.resources.gold} color="#FFD700" />
          <ResourceDisplay icon="💎" value={world.player.resources.crystals} color="#00CED1" />
          <ResourceDisplay icon="⏳" value={world.player.resources.temporalEnergy} color="#9932CC" />
        </div>
        
        {/* Infos du monde */}
        <div style={{
          textAlign: 'right',
        }}>
          <div style={{ fontSize: 14 }}>
            📅 Jour {world.time.day} • {world.time.season}
          </div>
          <div style={{ fontSize: 12, color: '#a0aec0' }}>
            {world.currentMap.name} • {world.weather.current}
          </div>
          <div style={{ fontSize: 12, color: '#667eea' }}>
            Timeline: {world.time.timeline}
          </div>
        </div>
      </div>
      
      {/* Zone de jeu principale */}
      {gameMode === 'exploration' && (
        <ExplorationView 
          world={world}
          onMove={movePlayer}
          onInteract={interactWithNPC}
          onOpenMap={() => setGameMode('map')}
          onOpenInventory={() => setGameMode('inventory')}
          onOpenQuests={() => setGameMode('quests')}
        />
      )}
      
      {gameMode === 'combat' && combatState && (
        <CombatInterface 
          initialState={combatState}
          onEndCombat={(winner) => {
            setGameMode('exploration');
            if (winner === 'player') {
              // Récompenses
              setWorld(prev => ({
                ...prev,
                player: {
                  ...prev.player,
                  resources: {
                    ...prev.player.resources,
                    gold: prev.player.resources.gold + 100,
                    crystals: prev.player.resources.crystals + 10,
                  }
                }
              }));
            }
          }}
        />
      )}
      
      {gameMode === 'inventory' && (
        <HeroProfileView 
          hero={world.player.hero}
          onEquipItem={(item, slot) => {
            console.log(`Équiper ${item.name} dans ${slot}`);
          }}
        />
      )}
      
      {gameMode === 'map' && (
        <SpatioTemporalMapEditor 
          mapWidth={world.currentMap.width}
          mapHeight={world.currentMap.height}
          currentDay={world.time.day}
        />
      )}
      
      {/* Dialogue avec NPC (style WoW) */}
      {showDialogue && selectedNPC && (
        <DialogueInterface 
          npc={selectedNPC}
          message={aiResponse}
          onClose={() => {
            setShowDialogue(false);
            setSelectedNPC(null);
          }}
          onOption={async (option) => {
            const response = await getAIDialogue(selectedNPC, option);
            setAiResponse(response);
          }}
        />
      )}
      
      {/* Barre d'action rapide (style WoW) */}
      <ActionBar 
        onAction={(action) => {
          if (action === 'inventory') setGameMode('inventory');
          if (action === 'map') setGameMode('map');
          if (action === 'quests') setGameMode('quests');
          if (action === 'escape') setGameMode('exploration');
        }}
      />
      
      {/* Notifications flottantes */}
      <NotificationSystem />
    </div>
  );
}

// === COMPOSANTS AUXILIAIRES ===

function ExplorationView({ world, onMove, onInteract, onOpenMap, onOpenInventory, onOpenQuests }: any) {
  // Contrôles clavier
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w') onMove(0, -1);
      if (e.key === 'ArrowDown' || e.key === 's') onMove(0, 1);
      if (e.key === 'ArrowLeft' || e.key === 'a') onMove(-1, 0);
      if (e.key === 'ArrowRight' || e.key === 'd') onMove(1, 0);
      if (e.key === 'i') onOpenInventory();
      if (e.key === 'm') onOpenMap();
      if (e.key === 'q') onOpenQuests();
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      {/* Vue isométrique de la carte (style HOMM3) */}
      <div style={{
        width: '80%',
        height: '80%',
        position: 'relative',
        transform: 'rotateX(45deg)',
        transformStyle: 'preserve-3d',
      }}>
        {world.currentMap.tiles.map((row: any, y: number) => (
          <div key={y} style={{ display: 'flex' }}>
            {row.map((tile: any, x: number) => (
              <MapTile 
                key={`${x}-${y}`}
                tile={tile}
                isPlayer={world.player.position.x === x && world.player.position.y === y}
                hasNPC={world.npcs.some((npc: any) => npc.position.x === x && npc.position.y === y)}
                onClick={() => {
                  const npc = world.npcs.find((n: any) => n.position.x === x && n.position.y === y);
                  if (npc) onInteract(npc);
                }}
              />
            ))}
          </div>
        ))}
      </div>
      
      {/* Mini-map */}
      <MiniMap 
        world={world}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      />
    </div>
  );
}

function MapTile({ tile, isPlayer, hasNPC, onClick }: any) {
  const terrainColors = {
    grass: '#4CAF50',
    forest: '#2E7D32',
    mountain: '#795548',
    water: '#2196F3',
    desert: '#FDD835',
    snow: '#ECEFF1',
  };
  
  return (
    <div
      onClick={onClick}
      style={{
        width: 40,
        height: 40,
        background: tile.visibility === 'hidden' ? '#000' :
                   tile.visibility === 'fog' ? `${terrainColors[tile.terrain]}88` :
                   terrainColors[tile.terrain],
        border: '1px solid rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: hasNPC ? 'pointer' : 'default',
        position: 'relative',
      }}
    >
      {isPlayer && <span style={{ fontSize: 20 }}>🦸</span>}
      {hasNPC && !isPlayer && <span style={{ fontSize: 20 }}>👤</span>}
      {tile.resource && <span style={{ fontSize: 16, position: 'absolute', top: 0, right: 0 }}>💎</span>}
      {tile.building && <span style={{ fontSize: 16 }}>🏰</span>}
    </div>
  );
}

function DialogueInterface({ npc, message, onClose, onOption }: any) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 100,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 600,
      background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.98), rgba(20, 24, 36, 0.98))',
      borderRadius: 16,
      border: '2px solid #764ba2',
      padding: 30,
      boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
      zIndex: 200,
    }}>
      <div style={{
        display: 'flex',
        gap: 20,
        marginBottom: 20,
      }}>
        <div style={{
          fontSize: 48,
          filter: 'drop-shadow(0 0 10px rgba(118, 75, 162, 0.5))',
        }}>
          {npc.icon}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: 5 }}>{npc.name}</h3>
          <div style={{ fontSize: 14, color: '#a0aec0' }}>
            {npc.faction} • Relation: {npc.relationship}/100
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: 24,
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>
      
      <div style={{
        padding: 20,
        background: 'rgba(0,0,0,0.3)',
        borderRadius: 8,
        marginBottom: 20,
        minHeight: 100,
      }}>
        <p style={{ lineHeight: 1.6 }}>{message}</p>
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        {npc.dialogue.options.map((option: any, i: number) => (
          <button
            key={i}
            onClick={() => onOption(option.text)}
            style={{
              padding: 12,
              background: 'rgba(102, 126, 234, 0.2)',
              border: '1px solid #667eea',
              borderRadius: 8,
              color: 'white',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(102, 126, 234, 0.2)';
            }}
          >
            {i + 1}. {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

function ActionBar({ onAction }: any) {
  const actions = [
    { key: 'I', icon: '🎒', action: 'inventory', tooltip: 'Inventaire' },
    { key: 'M', icon: '🗺️', action: 'map', tooltip: 'Carte' },
    { key: 'Q', icon: '📜', action: 'quests', tooltip: 'Quêtes' },
    { key: 'C', icon: '👤', action: 'character', tooltip: 'Personnage' },
    { key: 'ESC', icon: '🏃', action: 'escape', tooltip: 'Retour' },
  ];
  
  return (
    <div style={{
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 10,
      background: 'rgba(0,0,0,0.8)',
      padding: 10,
      borderRadius: 10,
      border: '2px solid #764ba2',
      zIndex: 100,
    }}>
      {actions.map(action => (
        <button
          key={action.key}
          onClick={() => onAction(action.action)}
          style={{
            width: 50,
            height: 50,
            background: 'linear-gradient(135deg, #0f3460, #16213e)',
            border: '2px solid #667eea',
            borderRadius: 8,
            color: 'white',
            fontSize: 24,
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.3s',
          }}
          title={`${action.tooltip} (${action.key})`}
        >
          {action.icon}
          <span style={{
            position: 'absolute',
            top: -5,
            right: -5,
            fontSize: 10,
            background: '#764ba2',
            padding: '2px 4px',
            borderRadius: 4,
          }}>
            {action.key}
          </span>
        </button>
      ))}
    </div>
  );
}

function MiniMap({ world, style }: any) {
  return (
    <div style={{
      width: 200,
      height: 200,
      background: 'rgba(0,0,0,0.8)',
      border: '2px solid #764ba2',
      borderRadius: 10,
      padding: 10,
      ...style,
    }}>
      <h4 style={{ margin: '0 0 10px 0', fontSize: 14 }}>Mini-carte</h4>
      <div style={{
        width: '100%',
        height: 'calc(100% - 30px)',
        position: 'relative',
        background: '#0a0e1a',
      }}>
        {/* Simplified minimap */}
        <div style={{
          position: 'absolute',
          left: `${(world.player.position.x / world.currentMap.width) * 100}%`,
          top: `${(world.player.position.y / world.currentMap.height) * 100}%`,
          width: 8,
          height: 8,
          background: '#4CAF50',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
        }}/>
      </div>
    </div>
  );
}

function HealthBar({ current, max, color, icon }: any) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <span>{icon}</span>
      <div style={{
        width: 100,
        height: 8,
        background: 'rgba(0,0,0,0.5)',
        borderRadius: 4,
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${(current / max) * 100}%`,
          height: '100%',
          background: color,
          transition: 'width 0.3s',
        }}/>
      </div>
      <span style={{ fontSize: 12 }}>{current}/{max}</span>
    </div>
  );
}

function ResourceDisplay({ icon, value, color }: any) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <span style={{ fontWeight: 'bold', color }}>{value}</span>
    </div>
  );
}

function NotificationSystem() {
  // Système de notifications pour les événements
  return null; // À implémenter
}

// === GÉNÉRATION DE DONNÉES ===

function generateMap(): GameMap {
  const width = 20;
  const height = 20;
  const tiles: Tile[][] = [];
  
  for (let y = 0; y < height; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < width; x++) {
      row.push({
        terrain: ['grass', 'forest', 'mountain', 'water'][Math.floor(Math.random() * 4)] as any,
        visibility: 'hidden',
        resource: Math.random() > 0.9 ? 'crystal' : undefined,
        building: Math.random() > 0.95 ? 'castle' : undefined,
      });
    }
    tiles.push(row);
  }
  
  return {
    id: 'map_001',
    name: 'Vallée de Chronos',
    width,
    height,
    tiles,
    pointsOfInterest: [
      { id: 'poi_1', name: 'Château d\'Arthur', type: 'castle', position: { x: 5, y: 5 }, icon: '🏰', description: 'Le château légendaire' },
      { id: 'poi_2', name: 'Temple du Temps', type: 'temple', position: { x: 15, y: 15 }, icon: '⛪', description: 'Un lieu mystique' },
    ],
    encounters: [
      { id: 'enc_1', type: 'monster', position: { x: 10, y: 10 }, triggered: false },
      { id: 'enc_2', type: 'treasure', position: { x: 7, y: 12 }, triggered: false },
    ],
  };
}

function initializePlayer(): PlayerState {
  const arthur = HEROES.arthur_pendragon;
  return {
    hero: {
      ...arthur,
      level: 1,
      experience: 0,
      experienceToNext: 100,
      inventory: [ARTIFACTS.excalibur_quantum],
      equippedItems: { weapon: ARTIFACTS.excalibur_quantum },
      learnedSpells: [],
      achievements: [],
      temporalStats: {
        paradoxesResolved: 0,
        timelinesVisited: 1,
        temporalDebt: 0,
      }
    },
    position: { x: 10, y: 10, z: 0 },
    resources: {
      gold: 1000,
      crystals: 50,
      temporalEnergy: 100,
      reputation: { 'Camelot': 100, 'Grofi': 0 },
    },
    party: [],
    questLog: [],
    achievements: [],
  };
}

function generateNPCs(): NPC[] {
  return [
    {
      id: 'npc_merlin',
      name: 'Merlin',
      icon: '🧙‍♂️',
      position: { x: 5, y: 5 },
      personality: 'Sage et mystérieux, parle souvent en énigmes',
      dialogue: {
        greeting: 'Le temps n\'est pas linéaire, jeune héros...',
        options: [
          { text: 'Parlez-moi du temps', response: 'Le temps est comme une rivière...' },
          { text: 'J\'ai besoin d\'aide', response: 'L\'aide vient à ceux qui la méritent...' },
          { text: 'Au revoir', response: 'Nous nous reverrons... ou nous sommes-nous déjà vus ?' },
        ],
        personality: 'wise_mystic'
      },
      faction: 'Camelot',
      relationship: 50,
    },
    {
      id: 'npc_grofi',
      name: 'Jean-Grofignon',
      icon: '🤔',
      position: { x: 12, y: 8 },
      personality: 'Philosophe existentialiste, questionne tout',
      dialogue: {
        greeting: 'Mais qu\'est-ce que l\'existence, au fond ?',
        options: [
          { text: 'Qui êtes-vous ?', response: 'La question est plutôt : qui suis-je vraiment ?' },
          { text: 'Avez-vous une quête ?', response: 'La vie elle-même est une quête, non ?' },
          { text: 'Je dois partir', response: 'Partir... mais vers où ? Et pourquoi ?' },
        ],
        personality: 'philosopher'
      },
      faction: 'Grofi',
      relationship: 30,
    },
  ];
}

function generateQuests(): Quest[] {
  return [
    {
      id: 'quest_001',
      name: 'La Quête d\'Excalibur',
      description: 'Retrouvez les fragments d\'Excalibur à travers les timelines',
      objectives: [
        { id: 'obj_1', description: 'Parler à Merlin', completed: false },
        { id: 'obj_2', description: 'Trouver le premier fragment', completed: false, current: 0, required: 3 },
      ],
      rewards: [
        { type: 'xp', amount: 500 },
        { type: 'item', itemId: 'excalibur_complete' },
      ],
      giver: 'Merlin',
      status: 'available',
    },
  ];
}

function generateHand(): any[] {
  // Générer une main de cartes pour le combat
  return [
    { id: 'card_1', type: 'spell', cost: 3, entity: SPELLS.fireball },
    { id: 'card_2', type: 'creature', cost: 4, entity: CREATURES.quantum_knight },
    { id: 'card_3', type: 'spell', cost: 2, entity: SPELLS.lightning_bolt },
  ];
}

function findTreasure() {
  // Logique pour trouver un trésor
  console.log('Trésor trouvé !');
}

function triggerEvent(encounter: any) {
  // Logique pour déclencher un événement
  console.log('Événement déclenché:', encounter);
}
