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
import { audioManager } from '../../services/AudioManager';

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
  const [inventory, setInventory] = useState<any>({ wood: 0, stone: 0, herbs: 0, flowers: 0, gold: 0, crystals: 0, energy: 0, temporal: 0, xp: 0 });
  const [activeBuffs, setActiveBuffs] = useState<Array<{ id: string; name: string; expiresAt: number; params?: any }>>([]);

  // Initialiser les assets
  useEffect(() => {
    AssetsService.initialize();
    // Load inventory once
    syncInventory();
  }, []);

  // Helpers
  const getApiBase = () => (window.location.hostname === 'localhost' ? 'http://127.0.0.1:8082' : '');
  const syncInventory = async () => {
    try {
      const r = await fetch(`${getApiBase()}/api/game/inventory/local`);
      if (r.ok) {
        const data = await r.json();
        setInventory({ xp: 0, ...data });
      }
    } catch {}
  };
  useEffect(() => {
    const i = setInterval(() => {
      const now = Date.now();
      setActiveBuffs(prev => prev.filter(b => b.expiresAt > now));
    }, 1000);
    return () => clearInterval(i);
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

    // Spawners journaliers (basique): growth_rules + spawners
    try {
      const day = gameState.temporal.currentDay;
      const newEntities: GameEntity[] = [];
      // growth_rules → ressources globales
      if ((currentMap as any).growth_rules) {
        for (const gr of (currentMap as any).growth_rules) {
          const spawnCount = Math.floor(gr.dailySpawn || 0);
          for (let i = 0; i < spawnCount; i++) {
            newEntities.push({
              id: `grow_${gr.kind}_${day}_${i}`,
              type: 'resource',
              position: { x: Math.random() * 800, y: Math.random() * 600, z: 0 },
              icon: gr.kind === 'wood' ? '🪵' : gr.kind === 'stone' ? '🪨' : gr.kind === 'flower' ? '🌸' : '🌿',
              name: gr.kind,
              owner: 0,
            });
          }
        }
      }
      if ((currentMap as any).spawners) {
        for (const sp of (currentMap as any).spawners) {
          if (sp.rateDays && sp.rateDays > 0 && day % sp.rateDays === 0) {
            newEntities.push({
              id: `sp_${sp.type}_${day}_${Math.random().toString(36).slice(2,6)}`,
              type: (sp.type as any) || 'resource',
              position: { x: sp.area ? sp.area.x + Math.random() * sp.area.width : Math.random() * 800, y: sp.area ? sp.area.y + Math.random() * sp.area.height : Math.random() * 600, z: 0 },
              icon: sp.emoji || '✨',
              name: sp.name || sp.subtype || sp.type,
              owner: 0,
            });
          }
        }
      }
      if (newEntities.length > 0) {
        setGameState(prev2 => ({ ...prev2, entities: [...prev2.entities, ...newEntities] }));
      }
    } catch {}
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
    setGameState(prev => {
      // Déplacer l'entité
      const movedEntities = prev.entities.map(e =>
        e.id === entityId
          ? { ...e, position: { ...e.position, x: newX, y: newY }}
          : e
      );

      // Auto-pickup des artefacts/ressources proches
      const pickupRadius = 40; // px
      const isNear = (a: { x: number; y: number }, b: { x: number; y: number }) =>
        Math.hypot(a.x - b.x, a.y - b.y) <= pickupRadius;

      const moved = movedEntities.find(e => e.id === entityId);
      if (!moved) {
        return { ...prev, entities: movedEntities };
      }

      const pickups = movedEntities.filter(e =>
        (e.type === 'artifact' || e.type === 'resource' || e.type === 'creature') && e.id !== entityId && isNear(e.position, { x: newX, y: newY })
      );

      if (pickups.length === 0) {
        return { ...prev, entities: movedEntities };
      }

      // Appliquer les effets de ramassage
      let goldDelta = 0;
      let crystalsDelta = 0;
      let energyDelta = 0;
      let temporalDelta = 0;
      // Dr. Stone style
      let woodDelta = 0;
      let stoneDelta = 0;
      let herbsDelta = 0;
      let flowersDelta = 0;

      const resourceName = (name?: string) => (name || '').toLowerCase();

      const creatures: GameEntity[] = [];
      for (const p of pickups) {
        const n = resourceName(p.name);
        if (p.type === 'resource') {
          if (n.includes('gold') || n.includes('coin') || n.includes('🪙')) goldDelta += 100;
          else if (n.includes('crystal') || n.includes('🔮') || n.includes('gem')) crystalsDelta += 5;
          else if (n.includes('potion') || n.includes('energy')) energyDelta += 10;
          else temporalDelta += 1;
          // Classer herbes/fleurs
          if (n.includes('herb') || n.includes('mushroom')) herbsDelta += 1;
          if (n.includes('flower') || n.includes('🌸')) flowersDelta += 1;
        } else if (p.type === 'artifact') {
          // Bonus léger par défaut
          crystalsDelta += 3;
          energyDelta += 5;
        } else if (p.type === 'creature') {
          creatures.push(p);
        }
      }

      const remaining = movedEntities.filter(e => !pickups.some(p => p.id === e.id));

      const updatedResources = {
        ...prev.resources,
        gold: (prev.resources as any).gold !== undefined ? (prev.resources as any).gold + goldDelta : goldDelta,
        crystals: prev.resources.crystals + crystalsDelta,
        energy: Math.min(100, prev.resources.energy + energyDelta),
        temporal: prev.resources.temporal + temporalDelta,
      } as typeof prev.resources;

      // Log simple
      if (pickups.length > 0) {
        console.log(`🎁 Pickup x${pickups.length} → +${goldDelta} gold, +${crystalsDelta} crystals, +${energyDelta} energy, +${temporalDelta} temporal`);
      }

      // Effets: son + bulles
      try { audioManager.play('pickup_item'); } catch {}
      const mkBubble = (text: string, color: string) => {
        try {
          const el = document.createElement('div');
          el.textContent = text;
          el.style.cssText = `
            position: fixed; left: ${newX}px; top: ${newY - 10}px;
            color: ${color}; font-weight: bold; font-size: 14px;
            text-shadow: 0 0 6px rgba(0,0,0,0.6);
            transform: translate(-50%, -50%);
            pointer-events: none; z-index: 10000; opacity: 0.95;
            transition: transform 0.6s ease-out, opacity 0.6s ease-out;
          `;
          document.body.appendChild(el);
          requestAnimationFrame(() => {
            el.style.transform = 'translate(-50%, -90%)';
            el.style.opacity = '0';
          });
          setTimeout(() => el.remove(), 650);
        } catch {}
      };
      if (goldDelta) mkBubble(`+${goldDelta} gold`, '#ffd700');
      if (crystalsDelta) mkBubble(`+${crystalsDelta} crystals`, '#7dd3fc');
      if (energyDelta) mkBubble(`+${energyDelta} energy`, '#34d399');
      if (temporalDelta) mkBubble(`+${temporalDelta} time`, '#a78bfa');
      if (herbsDelta) mkBubble(`+${herbsDelta} herbs`, '#86efac');
      if (flowersDelta) mkBubble(`+${flowersDelta} flowers`, '#f9a8d4');

      // Push backend (Java) pour inventaire Dr Stone + économie
      try {
        const base = getApiBase();
        fetch(`${base}/api/game/resources/pickup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            playerId: 'local',
            woodDelta,
            stoneDelta,
            herbsDelta,
            flowersDelta,
            goldDelta,
            crystalsDelta,
            energyDelta,
            temporalDelta,
          }),
        }).then(() => syncInventory()).catch(() => {});
      } catch {}

      // Encounters: auto-resolve for nearby creatures, then grant rewards
      if (creatures.length > 0) {
        const base = getApiBase();
        for (const c of creatures) {
          // Try derive creatureId from name (fallback) or stats.id if present
          const cid = (c as any).stats?.id || (c.name || '').toLowerCase().replace(/\s+/g, '_');
          try {
            const ac = new AbortController();
            const t = setTimeout(() => ac.abort(), 800);
            fetch(`${base}/api/encounter/resolve`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ playerId: 'local', creatureId: cid, stack: 1 }),
              signal: ac.signal,
            })
              .then(r => r.ok ? r.json() : null)
              .then(data => {
                if (!data || data.status !== 'OK') return;
                const rw = data.rewards || {};
                setGameState(prev2 => ({
                  ...prev2,
                  resources: {
                    ...prev2.resources,
                    gold: (prev2.resources as any).gold + (rw.gold || 0),
                    crystals: prev2.resources.crystals + (rw.crystals || 0),
                    energy: Math.min(100, prev2.resources.energy + (rw.energy || 0)),
                    temporal: prev2.resources.temporal + (rw.temporal || 0),
                  },
                }));
                syncInventory();
                if (rw.gold) mkBubble(`+${rw.gold} gold`, '#ffd700');
                if (rw.crystals) mkBubble(`+${rw.crystals} crystals`, '#7dd3fc');
              })
              .catch(() => {})
              .finally(() => clearTimeout(t));
          } catch {}
        }
      }

      return {
        ...prev,
        entities: remaining,
        resources: updatedResources,
      };
    });
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
              {/* Treasure opening if chest */}
              {(selectedEntity.type === 'artifact' && (selectedEntity.name?.toLowerCase().includes('chest') || selectedEntity.icon === '📦')) && (
                <button
                  onClick={async () => {
                    try {
                      const r = await fetch(`${getApiBase()}/api/treasure/open`, {
                        method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ playerId: 'local', treasureType: 'chest_common' })
                      });
                      if (r.ok) {
                        const data = await r.json();
                        const rw = data.rewards || {};
                        setGameState(prev2 => ({
                          ...prev2,
                          resources: {
                            ...prev2.resources,
                            gold: (prev2.resources as any).gold + (rw.gold || 0),
                            crystals: prev2.resources.crystals + (rw.crystals || 0),
                            energy: Math.min(100, prev2.resources.energy + (rw.energy || 0)),
                            temporal: prev2.resources.temporal + (rw.temporal || 0),
                          },
                          entities: prev2.entities.filter(e => e.id !== selectedEntity.id),
                        }));
                        syncInventory();
                        (data.buffs || []).forEach((b: any) => setActiveBuffs(prev => [...prev, { id: b.id, name: b.name, expiresAt: Date.now() + (b.durationSec || 30) * 1000, params: b.params }]));
                        setSelectedEntity(null);
                        try { audioManager.play('success'); } catch {}
                      }
                    } catch {}
                  }}
                  style={{
                    marginTop: 12,
                    padding: '8px 12px',
                    background: 'linear-gradient(135deg, #f6ad55, #ed8936)',
                    border: 'none', borderRadius: 6, color: 'white', cursor: 'pointer', fontSize: 12,
                  }}
                >
                  Ouvrir le coffre
                </button>
              )}
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

      {/* Inventory HUD */}
      <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(102,126,234,0.4)', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
        <div style={{ display: 'flex', gap: 10, color: 'white' }}>
          <span>🪵 {inventory.wood ?? 0}</span>
          <span>🪨 {inventory.stone ?? 0}</span>
          <span>🌿 {inventory.herbs ?? 0}</span>
          <span>🌸 {inventory.flowers ?? 0}</span>
          <span>🪙 {inventory.gold ?? 0}</span>
          <span>💠 {inventory.crystals ?? 0}</span>
          <span>⚡ {inventory.energy ?? 0}</span>
          <span>⏱ {inventory.temporal ?? 0}</span>
          {'xp' in inventory ? <span>XP {inventory.xp}</span> : null}
        </div>
        {activeBuffs.length > 0 && (
          <div style={{ marginTop: 6, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {activeBuffs.map(b => (
              <span key={`${b.id}-${b.expiresAt}`} style={{ padding: '2px 6px', borderRadius: 6, background: 'rgba(102,126,234,0.3)', color: 'white', border: '1px solid rgba(102,126,234,0.5)' }}>
                {b.name} ({Math.max(0, Math.ceil((b.expiresAt - Date.now())/1000))}s)
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
