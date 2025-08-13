// @ts-nocheck
/**
 * 🎮 PLAY MAP BRIDGE
 * Fait le pont entre l'éditeur unifié et le mode jeu
 * Charge la map actuelle dans le GameView
 */

import React, { useEffect, useState } from 'react';
import { useUnifiedMapStore } from '../../shared/store/unifiedMapStore';
import { HexGrid } from '../../shared/components/HexGrid';
import { ResourceBar } from '../../shared/components/ResourceBar';
import { TemporalDisplay } from '../../shared/components/TemporalDisplay';
import { AssetsService } from '../../services/AssetsService';

interface GameEntity {
  id: string;
  type: 'hero' | 'creature' | 'artifact' | 'building' | 'portal';
  position: { x: number; y: number; z: number };
  icon: string;
  name: string;
  owner: number; // ID du joueur
  stats?: any;
  destination?: string; // Pour les portails
}

interface GameState {
  entities: GameEntity[];
  resources: {
    gold: number;
    crystals: number;
    energy: number;
    temporal: number;
    quantum: number;
  };
  temporal: {
    tw: number;
    te: number;
    drift: number;
    debt: number;
    currentDay: number;
  };
  turn: number;
  activePlayer: number;
}

export function PlayMapBridge(): React.ReactElement {
  const {
    currentWorld,
    currentMap,
    temporal,
    setMode,
  } = useUnifiedMapStore();

  const [gameState, setGameState] = useState<GameState>({
    entities: [],
    resources: currentMap?.initial_state.resources || {
      gold: 1000,
      crystals: 100,
      energy: 50,
      temporal: 25,
      quantum: 10,
    },
    temporal: {
      ...temporal,
      tw: currentMap?.initial_state.tw || 0,
      te: currentMap?.initial_state.te || 0,
    },
    turn: 1,
    activePlayer: 0,
  });

  const [selectedEntity, setSelectedEntity] = useState<GameEntity | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Initialiser les assets
  useEffect(() => {
    AssetsService.initialize();
  }, []);

  // Convertir les resources de la map en entités de jeu
  useEffect(() => {
    if (!currentMap) return;

    const entities: GameEntity[] = currentMap.resources.map(resource => {
      // Récupérer les infos depuis AssetsService
      let stats = undefined;
      
      if (resource.type === 'hero') {
        const heroData = AssetsService.getHero(resource.subtype);
        if (heroData) {
          stats = heroData.stats;
        }
      } else if (resource.type === 'creature') {
        const creatureData = AssetsService.getCreature(resource.subtype);
        if (creatureData) {
          stats = { tier: creatureData.tier };
        }
      }

      return {
        id: resource.id,
        type: resource.type as GameEntity['type'],
        position: {
          x: resource.position_6d.x,
          y: resource.position_6d.y,
          z: resource.position_6d.z,
        },
        icon: resource.emoji,
        name: resource.name,
        owner: 0, // Joueur 0 par défaut
        stats,
      };
    });

    setGameState(prev => ({ ...prev, entities }));
  }, [currentMap]);

  // Gérer les événements temporels
  useEffect(() => {
    if (!currentMap) return;

    const activeEvents = currentMap.timeline.events.filter(event => {
      if (event.day === gameState.temporal.currentDay) return true;
      
      // Check répétitions
      if (event.repeat) {
        const daysSince = gameState.temporal.currentDay - event.day;
        if (daysSince > 0 && daysSince % event.repeat.interval === 0) {
          if (!event.repeat.times || daysSince / event.repeat.interval <= event.repeat.times) {
            return true;
          }
        }
      }
      
      return false;
    });

    // Appliquer les événements
    activeEvents.forEach(event => {
      console.log(`🎯 Événement jour ${gameState.temporal.currentDay}: ${event.name}`);
      
      if (event.action?.spawn) {
        // Ajouter de nouvelles entités
        const newEntities = event.action.spawn.map(spawn => ({
          id: spawn.id,
          type: spawn.type as GameEntity['type'],
          position: {
            x: spawn.position_6d.x,
            y: spawn.position_6d.y,
            z: spawn.position_6d.z,
          },
          icon: spawn.emoji,
          name: spawn.name,
          owner: 0,
        }));
        
        setGameState(prev => ({
          ...prev,
          entities: [...prev.entities, ...newEntities],
        }));
      }
    });
  }, [gameState.temporal.currentDay, currentMap]);

  // Fin de tour
  const endTurn = () => {
    setGameState(prev => ({
      ...prev,
      turn: prev.turn + 1,
      temporal: {
        ...prev.temporal,
        currentDay: prev.temporal.currentDay + 1,
        tw: prev.temporal.tw + 1,
        te: prev.temporal.te + 0.95,
        drift: Math.abs((prev.temporal.tw + 1) - (prev.temporal.te + 0.95)),
      },
      resources: {
        ...prev.resources,
        gold: prev.resources.gold + 100,
        crystals: prev.resources.crystals + 10,
        energy: Math.min(100, prev.resources.energy + 10),
      },
    }));
  };

  // Déplacer une entité
  const moveEntity = (entityId: string, newX: number, newY: number) => {
    setGameState(prev => ({
      ...prev,
      entities: prev.entities.map(e =>
        e.id === entityId
          ? { ...e, position: { ...e.position, x: newX, y: newY }}
          : e
      ),
    }));
  };

  if (!currentWorld || !currentMap) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1d3a 100%)',
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>Aucune map à jouer !</h2>
          <button
            onClick={() => setMode('structure')}
            style={{
              marginTop: 20,
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              border: 'none',
              borderRadius: 8,
              color: 'white',
              cursor: 'pointer',
              fontSize: 16,
            }}
          >
            Retour à l'éditeur
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#0a0e1a',
    }}>
      {/* Header avec ressources */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        background: 'linear-gradient(180deg, rgba(20, 24, 36, 0.95) 0%, rgba(26, 31, 46, 0.9) 100%)',
        borderBottom: '1px solid rgba(102, 126, 234, 0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <h2 style={{
            margin: 0,
            fontSize: 20,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            🎮 {currentMap.name}
          </h2>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
            Tour {gameState.turn} • Jour {gameState.temporal.currentDay}
          </span>
        </div>
        
        <TemporalDisplay
          temporal={gameState.temporal}
          variant="compact"
          showEnergy={true}
        />
      </header>
      
      {/* Barre de ressources */}
      <div style={{
        padding: '0 20px',
        background: 'rgba(20, 24, 36, 0.5)',
      }}>
        <ResourceBar
          resources={gameState.resources}
          maxValues={{
            gold: 9999,
            crystals: 999,
            energy: 100,
            temporal: 100,
            quantum: 50,
          }}
          variant="horizontal"
        />
      </div>
      
      {/* Zone de jeu principale */}
      <main style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
      }}>
        {/* Canvas de jeu */}
        <div style={{
          flex: 1,
          position: 'relative',
          background: 'radial-gradient(circle at center, rgba(102, 126, 234, 0.05) 0%, rgba(0, 0, 0, 0.3) 100%)',
        }}>
          {/* Grille hexagonale en fond */}
          {currentWorld && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.3 }}>
              <HexGrid
                width={currentWorld.dimensions.width}
                height={currentWorld.dimensions.height}
                hexes={new Map()}
                onHexClick={(q, r) => {
                  if (selectedEntity) {
                    // Convertir coordonnées hex en pixel pour le déplacement
                    moveEntity(selectedEntity.id, q * 60, r * 60);
                    setSelectedEntity(null);
                  }
                }}
              />
            </div>
          )}
          
          {/* Entités */}
          {gameState.entities.map(entity => (
            <div
              key={entity.id}
              onClick={() => setSelectedEntity(entity)}
              style={{
                position: 'absolute',
                left: entity.position.x,
                top: entity.position.y,
                width: 50,
                height: 50,
                fontSize: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: selectedEntity?.id === entity.id 
                  ? 'radial-gradient(circle, rgba(102, 126, 234, 0.5), transparent)'
                  : 'transparent',
                border: selectedEntity?.id === entity.id 
                  ? '2px solid #667eea'
                  : 'none',
                borderRadius: '50%',
                transition: 'all 0.2s',
                transform: entity.position.z ? `translateZ(${entity.position.z * 10}px)` : undefined,
              }}
              title={entity.name}
            >
              {entity.icon}
            </div>
          ))}
        </div>
        
        {/* Panneau latéral */}
        <aside style={{
          width: 300,
          background: 'linear-gradient(180deg, #1a1a2e, #16213e)',
          padding: 20,
          borderLeft: '2px solid rgba(102, 126, 234, 0.3)',
          overflowY: 'auto',
        }}>
          {selectedEntity ? (
            <div>
              <h3 style={{
                fontSize: 18,
                marginBottom: 15,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {selectedEntity.icon} {selectedEntity.name}
              </h3>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                <div>Type: {selectedEntity.type}</div>
                <div>Position: ({selectedEntity.position.x}, {selectedEntity.position.y})</div>
                {selectedEntity.stats && (
                  <div style={{ marginTop: 10 }}>
                    <div>Stats:</div>
                    {Object.entries(selectedEntity.stats).map(([key, value]) => (
                      <div key={key} style={{ marginLeft: 10 }}>
                        {key}: {value}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedEntity(null)}
                style={{
                  marginTop: 15,
                  padding: '8px 16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 6,
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 12,
                  width: '100%',
                }}
              >
                Désélectionner
              </button>
            </div>
          ) : (
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
              Cliquez sur une entité pour la sélectionner
            </div>
          )}
          
          {/* Conditions de victoire */}
          {currentMap.victory_conditions.length > 0 && (
            <div style={{ marginTop: 30 }}>
              <h4 style={{ fontSize: 14, marginBottom: 10 }}>Conditions de victoire</h4>
              {currentMap.victory_conditions.map((condition, i) => (
                <div key={i} style={{
                  padding: 8,
                  background: 'rgba(72, 187, 120, 0.1)',
                  borderRadius: 6,
                  marginBottom: 8,
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.8)',
                }}>
                  {condition.description}
                </div>
              ))}
            </div>
          )}
        </aside>
      </main>
      
      {/* Footer avec actions */}
      <footer style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        background: 'rgba(20, 24, 36, 0.9)',
        borderTop: '1px solid rgba(102, 126, 234, 0.3)',
      }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={endTurn}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #48bb78, #38a169)',
              border: 'none',
              borderRadius: 8,
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: 14,
            }}
          >
            ⏭️ Fin de Tour
          </button>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              padding: '10px 20px',
              background: isPlaying
                ? 'linear-gradient(135deg, #f56565, #e53e3e)'
                : 'linear-gradient(135deg, #4299e1, #3182ce)',
              border: 'none',
              borderRadius: 8,
              color: 'white',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            {isPlaying ? '⏸ Pause' : '▶️ Reprendre'}
          </button>
        </div>
        
        <button
          onClick={() => setMode('resources')}
          style={{
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 8,
            color: 'white',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          ✏️ Retour à l'éditeur
        </button>
      </footer>
    </div>
  );
}
