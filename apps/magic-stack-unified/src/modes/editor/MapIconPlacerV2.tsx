/**
 * 🗺️ MAP_ICON_PLACER V2 - Migration depuis HTML magnifique
 * Intégration complète avec v2-adapter.js + WebSocket + Orchestrateur
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
// @ts-ignore
import V2Adapter from '../../../../../shared/v2-adapter.js';
import './MapIconPlacerV2.css';

// NOUVEAUX IMPORTS - Composants exportables!
import { MiniMap } from '../../shared/components/MiniMap';
import { useUndoRedo } from '../../shared/hooks/useUndoRedo';
import { useMapLayers } from '../../shared/hooks/useMapLayers';
import * as MapUtils from '../../shared/utils/mapUtils';

// CATALOGUE D'ICÔNES - Exactement comme dans HTML
const ICON_CATALOG = {
  "🏞️ Terrains": {
    mountain: "⛰️",
    volcano: "🌋", 
    forest: "🌲",
    desert: "🏜️",
    ocean: "🌊",
    island: "🏝️",
    cave: "🕳️",
    snow: "❄️",
    swamp: "🌿",
    plains: "🌾",
    castle: "🏰",
    city: "🏙️"
  },
  "⚔️ Combats": {
    sword: "⚔️",
    shield: "🛡️",
    bow: "🏹",
    axe: "🪓",
    spear: "🔱",
    dagger: "🗡️",
    bomb: "💣",
    explosion: "💥",
    fire: "🔥",
    ice: "🧊",
    lightning: "⚡",
    skull: "💀"
  },
  "🏗️ Bâtiments": {
    castle: "🏰",
    tower: "🗼",
    house: "🏠",
    hut: "🛖",
    temple: "⛩️",
    church: "⛪",
    mosque: "🕌",
    synagogue: "🕍",
    ruins: "🏚️",
    pyramid: "🔺",
    tent: "⛺",
    fortress: "🏯"
  },
  "💎 Ressources": {
    gold: "🪙",
    gem: "💎",
    crystal: "🔮",
    chest: "📦",
    key: "🗝️",
    potion: "🧪",
    scroll: "📜",
    book: "📖",
    herb: "🌿",
    mushroom: "🍄",
    apple: "🍎",
    bread: "🍞"
  },
  "🐉 Créatures": {
    dragon: "🐉",
    unicorn: "🦄",
    phoenix: "🦅",
    wolf: "🐺",
    bear: "🐻",
    spider: "🕷️",
    snake: "🐍",
    bat: "🦇",
    goblin: "👺",
    troll: "👹",
    ghost: "👻",
    skeleton: "🦴"
  },
  "📍 Marqueurs": {
    flag: "🚩",
    pin: "📍",
    compass: "🧭",
    telescope: "🔭",
    torch: "🔦",
    campfire: "🔥",
    signpost: "🪧",
    question: "❓",
    exclamation: "❗",
    checkpoint: "✅",
    waypoint: "🎯",
    spawn: "🏁"
  },
  "⏰ Temporel": {
    clock: "⏰",
    hourglass: "⌛",
    pendulum: "🕰️",
    calendar: "📅",
    moon: "🌙",
    sun: "☀️",
    timestar: "⭐",
    paradox: "🌀"
  }
};

interface PlacedIcon {
  id: string;
  emoji: string;
  name: string;
  category: string;
  position_6d: {
    x: number;
    y: number;
    z: number;
    t: number;    // Temps
    c: number;    // Causalité
    psi: number;  // Quantum
  };
  size: number;
  rotation: number;
  opacity: number;
  tags?: string;
  notes?: string;
  // Nouvelles propriétés V2
  energy_complex?: {
    A: number;    // Amplitude
    phi: number;  // Phase
  };
  temporal?: {
    tw: number;   // Temps monde
    te: number;   // Temps entité
    cycle?: number; // Cycle temporel
  };
}

interface Connection {
  id: string;
  from: string;
  to: string;
  type: 'temporal' | 'causal' | 'spatial';
  strength: number;
  interference?: number; // Interférence quantique
}

type MapIconPlacerCallbacks = {
  onPlace?: (resource: {
    id: string;
    emoji: string;
    name: string;
    category: string;
    position_6d: { x: number; y: number; z: number; t: number; c: number; psi: number };
    size: number;
    rotation: number;
    opacity: number;
  }) => void;
  onUpdate?: (id: string, updates: Partial<{
    position_6d: { x?: number; y?: number; z?: number; t?: number; c?: number; psi?: number };
    energy_complex: { A?: number; phi?: number };
    size?: number; rotation?: number; opacity?: number; name?: string;
  }>) => void;
  onDelete?: (id: string) => void;
  onConnect?: (from: string, to: string, type: 'temporal' | 'causal' | 'spatial') => void;
}

export function MapIconPlacerV2(props: MapIconPlacerCallbacks = {}): React.ReactElement {
  // État principal avec UNDO/REDO!
  const {
    state: placedIcons,
    setState: setPlacedIcons,
    undo,
    redo,
    canUndo,
    canRedo,
    handleKeyPress,
  } = useUndoRedo<PlacedIcon[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<{emoji: string, name: string, category: string} | null>(null);
  const [selectedPlaced, setSelectedPlaced] = useState<PlacedIcon | null>(null);
  const [currentTool, setCurrentTool] = useState<'place' | 'connect' | 'delete'>('place');
  const [connections, setConnections] = useState<Connection[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(new Set(Object.keys(ICON_CATALOG)));
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  
  // État V2
  const [wsConnected, setWsConnected] = useState(false);
  const [orchestratorStatus, setOrchestratorStatus] = useState<'offline' | 'online'>('offline');
  const [temporalState, setTemporalState] = useState({
    tw: 0,
    te: 0,
    drift: 0,
    debt: 0
  });
  const [paradoxes, setParadoxes] = useState<any[]>([]);
  const [regulators, setRegulators] = useState({
    vince: { active: false, intensity: 0 },
    anna: { active: false, decayRate: 5 },
    overload: { stack: 0 }
  });
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const v2AdapterRef = useRef<any>(null);
  const tickIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // Viewport pour la mini-map
  const [viewport, setViewport] = useState({ x: 0, y: 0, width: 800, height: 600 });
  
  // Raccourcis clavier pour undo/redo
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
  
  // Initialisation V2 Adapter avec WebSocket
  useEffect(() => {
    console.log('🚀 Initialisation V2 Adapter...');
    v2AdapterRef.current = new V2Adapter({
      rustUrl: 'http://localhost:3001',
      javaUrl: 'http://localhost:8082',
      pythonUrl: 'http://localhost:5001'
    });
    
    const adapter = v2AdapterRef.current;
    
    // Injection des styles V2
    adapter.injectStyles();
    
    // Connexion WebSocket
    adapter.connectWebSocket(8001);
    
    // Listeners WebSocket
    adapter.on('ws:connected', () => {
      console.log('✅ WebSocket connecté');
      setWsConnected(true);
    });
    
    adapter.on('ws:disconnected', () => {
      console.log('❌ WebSocket déconnecté');
      setWsConnected(false);
    });
    
    adapter.on('tick', (data: any) => {
      setTemporalState({
        tw: data.new_tw || 0,
        te: data.new_te || 0,
        drift: Math.abs((data.new_tw || 0) - (data.new_te || 0)),
        debt: data.debt || 0
      });
    });
    
    adapter.on('paradox', (newParadoxes: any[]) => {
      setParadoxes(newParadoxes);
      if (newParadoxes.length > 0) {
        console.warn('⚠️ Paradoxes détectés:', newParadoxes);
      }
    });
    
    // Test de connexion orchestrateur
    fetch(`${adapter.endpoints.rust}/health`)
      .then(res => res.ok && setOrchestratorStatus('online'))
      .catch(() => setOrchestratorStatus('offline'));
    
    return () => {
      if (adapter.ws) {
        adapter.ws.close();
      }
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current);
      }
    };
  }, []);
  
  // Tick V2 automatique toutes les 100ms
  useEffect(() => {
    if (!v2AdapterRef.current || !wsConnected) return;
    
    tickIntervalRef.current = setInterval(async () => {
      const state = {
        temporal: {
          tw: temporalState.tw + 0.1,
          te: temporalState.te + 0.095, // Légère dérive
          entities: placedIcons.map(icon => ({
            id: icon.id,
            position: icon.position_6d,
            energy_complex: icon.energy_complex || { A: 50, phi: 0 },
            te: icon.temporal?.te || temporalState.te
          }))
        },
        resources: {},
        regulators
      };
      
      try {
        const result = await v2AdapterRef.current.tick(state);
        
        // Détection de paradoxes
        const detectedParadoxes = v2AdapterRef.current.detectParadoxes({
          temporal: {
            tw: result.new_tw,
            te: result.new_te,
            debt: result.debt
          },
          regulators
        });
        
        if (detectedParadoxes.length > 0) {
          setParadoxes(detectedParadoxes);
        }
      } catch (err) {
        // Fallback local si backend non disponible
        const fallback = v2AdapterRef.current.fallbackTick(state);
        setTemporalState({
          tw: fallback.new_tw,
          te: fallback.new_te,
          drift: Math.abs(fallback.new_tw - fallback.new_te),
          debt: fallback.debt
        });
      }
    }, 100);
    
    return () => {
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current);
      }
    };
  }, [wsConnected, placedIcons, temporalState, regulators]);
  
  // Placer une icône avec position 6D complète
  const placeIcon = useCallback((x: number, y: number) => {
    if (!selectedIcon || currentTool !== 'place') return;
    
    const newIcon: PlacedIcon = {
      id: `icon_${Date.now()}_${nextId.current++}`,
      emoji: selectedIcon.emoji,
      name: selectedIcon.name,
      category: selectedIcon.category,
      position_6d: {
        x: x,
        y: y,
        z: 0,
        t: temporalState.tw,      // Temps monde actuel
        c: 1,                      // Causalité normale
        psi: Math.random()         // Quantum aléatoire
      },
      size: 60,
      rotation: 0,
      opacity: 1,
      energy_complex: {
        A: 50 + Math.random() * 50,  // Amplitude 50-100
        phi: Math.random() * Math.PI * 2  // Phase aléatoire
      },
      temporal: {
        tw: temporalState.tw,
        te: temporalState.te,
        cycle: selectedIcon.category === "⏰ Temporel" ? 7 : undefined
      }
    };
    
    setPlacedIcons([...placedIcons, newIcon]);
    props.onPlace?.({
      id: newIcon.id,
      emoji: newIcon.emoji,
      name: newIcon.name,
      category: newIcon.category,
      position_6d: newIcon.position_6d,
      size: newIcon.size,
      rotation: newIcon.rotation,
      opacity: newIcon.opacity,
    });
    // Upsert côté serveur (éditeur jouable)
    try {
      v2AdapterRef.current?.upsertEntity({
        id: newIcon.id,
        position: { x: newIcon.position_6d.x, y: newIcon.position_6d.y },
        te: newIcon.temporal?.te ?? temporalState.te,
        energy_complex: { A: newIcon.energy_complex?.A, phi: newIcon.energy_complex?.phi }
      });
    } catch (e) {
      console.warn('Upsert entity failed (placeIcon):', e);
    }
    
    // Notification via WebSocket si connecté
    if (v2AdapterRef.current && wsConnected) {
      v2AdapterRef.current.ws.send(JSON.stringify({
        type: 'entity_placed',
        payload: newIcon
      }));
    }
  }, [selectedIcon, currentTool, placedIcons, temporalState, wsConnected, props]);
  
  // Créer une connexion entre icônes
  const createConnection = useCallback((fromId: string, toId: string) => {
    const fromIcon = placedIcons.find(i => i.id === fromId);
    const toIcon = placedIcons.find(i => i.id === toId);
    
    if (!fromIcon || !toIcon) return;
    
    const distance = v2AdapterRef.current?.getDistance(
      fromIcon.position_6d,
      toIcon.position_6d
    ) || 0;
    
    // Calcul de l'interférence quantique
    const interference = v2AdapterRef.current?.calculateInterference(
      { position: fromIcon.position_6d, energy_complex: fromIcon.energy_complex },
      { position: toIcon.position_6d, energy_complex: toIcon.energy_complex }
    ) || 0;
    
    const newConnection: Connection = {
      id: `conn_${Date.now()}`,
      from: fromId,
      to: toId,
      type: distance < 100 ? 'spatial' : 
            Math.abs(fromIcon.position_6d.t - toIcon.position_6d.t) > 1 ? 'temporal' : 
            'causal',
      strength: Math.max(0.3, 1 - distance / 500),
      interference
    };
    
    setConnections([...connections, newConnection]);
    props.onConnect?.(fromId, toId, newConnection.type);
  }, [placedIcons, connections, props]);
  
  // Gérer le clic sur le canvas
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (currentTool === 'connect' && connectionStart) {
      // Trouver l'icône cliquée
      const clickedIcon = placedIcons.find(icon => {
        const dx = Math.abs(icon.position_6d.x - x);
        const dy = Math.abs(icon.position_6d.y - y);
        return dx < icon.size/2 && dy < icon.size/2;
      });
      
      if (clickedIcon && clickedIcon.id !== connectionStart) {
        createConnection(connectionStart, clickedIcon.id);
        setConnectionStart(null);
        setCurrentTool('place');
      }
    } else if (currentTool === 'place') {
      placeIcon(x, y);
    }
  }, [currentTool, connectionStart, placedIcons, placeIcon, createConnection]);
  
  // Sauvegarder avec Interstice Upload V2
  const saveMapV2 = async () => {
    const mapData = {
      entity_type: 'MAP_6D',
      name: `Map_${Date.now()}`,
      position_6d: { x: 0, y: 0, z: 0, t: temporalState.tw, c: 1, psi: 0.5 },
      icons: placedIcons,
      connections: connections,
      temporal_state: temporalState,
      regulators: regulators
    };
    
    try {
      const javaBase = v2AdapterRef.current?.endpoints?.java || 'http://localhost:8082';
      const response = await fetch(`${javaBase}/api/interstice/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mapData)
      });
      const result = await response.json();
      alert(`✅ Map sauvegardée! ID: ${result.interstice_id}`);
    } catch (err) {
      console.error('❌ Erreur sauvegarde:', err);
      alert('Erreur de sauvegarde - Vérifiez que l\'orchestrateur est lancé');
    }
  };
  
  // Activer les régulateurs
  const activateRegulator = async (type: 'vince' | 'anna' | 'overload') => {
    if (!v2AdapterRef.current) return;
    
    try {
      if (type === 'vince') {
        await v2AdapterRef.current.activateVince(
          selectedPlaced?.position_6d || { x: 0, y: 0, z: 0 },
          1
        );
        setRegulators({ ...regulators, vince: { active: true, intensity: 1 }});
      } else if (type === 'anna') {
        await v2AdapterRef.current.activateAnna(10);
        setRegulators({ ...regulators, anna: { active: true, decayRate: 10 }});
      } else if (type === 'overload') {
        await v2AdapterRef.current.triggerOverload();
        setRegulators({ ...regulators, overload: { stack: regulators.overload.stack + 1 }});
      }
    } catch (err) {
      console.error(`Erreur activation ${type}:`, err);
    }
  };
  
  // Exporter JSON local
  const exportMap = () => {
    const data = {
      version: 'v2_6d',
      timestamp: new Date().toISOString(),
      icons: placedIcons,
      connections: connections,
      temporal: temporalState,
      regulators: regulators
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `map_v2_6d_${Date.now()}.json`;
    a.click();
  };
  
  return (
    <div style={{ display: 'flex', height: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      
      {/* PANNEAU GAUCHE - Palette d'icônes */}
      <div style={{
        width: 320,
        background: 'linear-gradient(180deg, #1a1a2e, #16213e)',
        padding: 20,
        overflowY: 'auto',
        borderRight: '3px solid #764ba2',
        boxShadow: '5px 0 20px rgba(0,0,0,0.5)',
      }}>
        {/* Header avec statut V2 */}
        <div style={{
          marginBottom: 20,
          textAlign: 'center',
          position: 'sticky',
          top: -20,
          background: 'linear-gradient(180deg, #1a1a2e, #16213e)',
          padding: '10px 0',
          zIndex: 100,
        }}>
          <h2 style={{
            fontSize: '1.8em',
            marginBottom: 10,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            🎨 Palette d'Icônes V2
          </h2>
          
          {/* Statuts des services */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 10 }}>
            <span style={{ 
              fontSize: 12, 
              padding: '4px 8px',
              borderRadius: 15,
              background: wsConnected ? 'rgba(72, 187, 120, 0.3)' : 'rgba(255, 100, 100, 0.3)',
              border: `1px solid ${wsConnected ? '#48bb78' : '#ff6464'}`,
              color: wsConnected ? '#48bb78' : '#ff6464'
            }}>
              {wsConnected ? '🟢' : '🔴'} WebSocket
            </span>
            <span style={{ 
              fontSize: 12, 
              padding: '4px 8px',
              borderRadius: 15,
              background: orchestratorStatus === 'online' ? 'rgba(72, 187, 120, 0.3)' : 'rgba(255, 100, 100, 0.3)',
              border: `1px solid ${orchestratorStatus === 'online' ? '#48bb78' : '#ff6464'}`,
              color: orchestratorStatus === 'online' ? '#48bb78' : '#ff6464'
            }}>
              {orchestratorStatus === 'online' ? '🟢' : '🔴'} Orchestrateur
            </span>
          </div>
          
          {/* Affichage temporel V2 */}
          <div style={{
            background: 'rgba(102, 126, 234, 0.1)',
            border: '1px solid #667eea',
            borderRadius: 10,
            padding: 8,
            marginBottom: 10,
            fontSize: 11,
            fontFamily: 'monospace'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 5 }}>
              <span style={{ color: '#667eea' }}>TW: {temporalState.tw.toFixed(1)}</span>
              <span style={{ color: '#48bb78' }}>TE: {temporalState.te.toFixed(1)}</span>
              <span style={{ color: temporalState.drift > 5 ? '#ff6464' : '#ed8936' }}>
                Δt: {temporalState.drift.toFixed(1)}
              </span>
            </div>
            {temporalState.debt > 0 && (
              <div style={{ 
                color: temporalState.debt > 50 ? '#ff6464' : '#f6ad55',
                textAlign: 'center'
              }}>
                💸 Dette: {temporalState.debt.toFixed(1)}
              </div>
            )}
            {paradoxes.length > 0 && (
              <div style={{ color: '#ff6464', textAlign: 'center', marginTop: 5 }}>
                ⚠️ {paradoxes.length} paradoxe(s)
              </div>
            )}
          </div>
          
          <input
            type="text"
            placeholder="🔍 Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: 10,
              border: '2px solid #764ba2',
              background: 'rgba(15, 52, 96, 0.8)',
              color: 'white',
              borderRadius: 10,
              fontSize: 16,
            }}
          />
        </div>
        
        {/* Catégories d'icônes */}
        {Object.entries(ICON_CATALOG).map(([category, icons]) => {
          const filteredIcons = Object.entries(icons).filter(([name]) => 
            searchTerm === '' || name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          
          if (filteredIcons.length === 0 && searchTerm !== '') return null;
          
          return (
            <div key={category} style={{
              marginBottom: 25,
              background: 'rgba(15, 52, 96, 0.3)',
              borderRadius: 10,
              padding: 10,
              border: '1px solid rgba(118, 75, 162, 0.3)',
            }}>
              <div
                onClick={() => {
                  const newExpanded = new Set(expandedCategories);
                  if (newExpanded.has(category)) {
                    newExpanded.delete(category);
                  } else {
                    newExpanded.add(category);
                  }
                  setExpandedCategories(newExpanded);
                }}
                style={{
                  background: 'linear-gradient(90deg, #0f3460, #1e5f8e)',
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 10,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontWeight: 'bold',
                }}
              >
                <span>{category}</span>
                <span>{expandedCategories.has(category) ? '▼' : '▶'}</span>
              </div>
              
              {expandedCategories.has(category) && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 8,
                  padding: 5,
                }}>
                  {filteredIcons.map(([name, emoji]) => (
                    <div
                      key={name}
                      onClick={() => setSelectedIcon({ emoji, name, category })}
                      style={{
                        width: 60,
                        height: 60,
                        background: selectedIcon?.name === name ? 'rgba(102, 126, 234, 0.5)' : 'rgba(15, 52, 96, 0.5)',
                        border: selectedIcon?.name === name ? '2px solid #667eea' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.background = 'rgba(102, 126, 234, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.background = selectedIcon?.name === name ? 'rgba(102, 126, 234, 0.5)' : 'rgba(15, 52, 96, 0.5)';
                      }}
                      title={name}
                    >
                      <span style={{ fontSize: 30 }}>{emoji}</span>
                      <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
                        {name.slice(0, 8)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* ZONE CENTRALE - Canvas de placement */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* Barre d'outils */}
        <div style={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)',
          borderRadius: 25,
          padding: '10px 20px',
          display: 'flex',
          gap: 15,
          zIndex: 100,
        }}>
          <button
            onClick={() => setCurrentTool('place')}
            style={{
              padding: '8px 20px',
              background: currentTool === 'place' ? '#667eea' : 'transparent',
              border: '2px solid #667eea',
              borderRadius: 20,
              color: 'white',
              cursor: 'pointer',
            }}
          >
            ✏️ Placer
          </button>
          <button
            onClick={() => setCurrentTool('connect')}
            style={{
              padding: '8px 20px',
              background: currentTool === 'connect' ? '#667eea' : 'transparent',
              border: '2px solid #667eea',
              borderRadius: 20,
              color: 'white',
              cursor: 'pointer',
            }}
          >
            🔗 Connecter
          </button>
          <button
            onClick={() => setCurrentTool('delete')}
            style={{
              padding: '8px 20px',
              background: currentTool === 'delete' ? '#ff4444' : 'transparent',
              border: '2px solid #ff4444',
              borderRadius: 20,
              color: 'white',
              cursor: 'pointer',
            }}
          >
            🗑️ Supprimer
          </button>
          <button
            onClick={saveMapV2}
            style={{
              padding: '8px 20px',
              background: 'linear-gradient(135deg, #48bb78, #38a169)',
              border: 'none',
              borderRadius: 20,
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            💾 Sauvegarder V2
          </button>
          <button
            onClick={exportMap}
            style={{
              padding: '8px 20px',
              background: 'linear-gradient(135deg, #ed8936, #dd6b20)',
              border: 'none',
              borderRadius: 20,
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            📥 Exporter
          </button>
        </div>
        
        {/* Régulateurs V2 */}
        <div style={{
          position: 'absolute',
          top: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.6)',
          borderRadius: 15,
          padding: '8px 15px',
          display: 'flex',
          gap: 10,
          zIndex: 99,
        }}>
          <button
            onClick={() => activateRegulator('vince')}
            style={{
              padding: '5px 15px',
              background: regulators.vince.active ? '#667eea' : 'transparent',
              border: '1px solid #667eea',
              borderRadius: 10,
              color: 'white',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            ⚡ Vince {regulators.vince.active && `(${regulators.vince.intensity})`}
          </button>
          <button
            onClick={() => activateRegulator('anna')}
            style={{
              padding: '5px 15px',
              background: regulators.anna.active ? '#48bb78' : 'transparent',
              border: '1px solid #48bb78',
              borderRadius: 10,
              color: 'white',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            🌀 Anna {regulators.anna.active && `(-${regulators.anna.decayRate}%)`}
          </button>
          <button
            onClick={() => activateRegulator('overload')}
            style={{
              padding: '5px 15px',
              background: regulators.overload.stack > 0 ? '#ff6464' : 'transparent',
              border: '1px solid #ff6464',
              borderRadius: 10,
              color: 'white',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            💥 Overload ({regulators.overload.stack}/10)
          </button>
        </div>
        
        {/* Canvas de la carte */}
        <div
          ref={canvasRef}
          onClick={handleCanvasClick}
          style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, rgba(102, 126, 234, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
            cursor: currentTool === 'place' && selectedIcon ? 'crosshair' : 
                   currentTool === 'connect' ? 'cell' :
                   currentTool === 'delete' ? 'not-allowed' : 'default',
            position: 'relative',
          }}
        >
          {/* Icônes placées */}
          {placedIcons.map(icon => (
            <div
              key={icon.id}
              onClick={(e) => {
                e.stopPropagation();
                if (currentTool === 'delete') {
                  setPlacedIcons(placedIcons.filter(i => i.id !== icon.id));
                  setConnections(connections.filter(c => c.from !== icon.id && c.to !== icon.id));
                } else if (currentTool === 'connect') {
                  if (!connectionStart) {
                    setConnectionStart(icon.id);
                  } else if (connectionStart !== icon.id) {
                    createConnection(connectionStart, icon.id);
                    setConnectionStart(null);
                  }
                } else {
                  setSelectedPlaced(icon);
                }
              }}
              style={{
                position: 'absolute',
                left: icon.position_6d.x - icon.size / 2,
                top: icon.position_6d.y - icon.size / 2,
                width: icon.size,
                height: icon.size,
                fontSize: icon.size * 0.7,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `rotate(${icon.rotation}deg) scale(${1 + icon.position_6d.z * 0.1})`,
                opacity: icon.opacity * (1 - icon.position_6d.psi * 0.3), // Effet quantum
                cursor: 'pointer',
                background: selectedPlaced?.id === icon.id ? 'rgba(102, 126, 234, 0.3)' : 
                           connectionStart === icon.id ? 'rgba(72, 187, 120, 0.3)' : 'transparent',
                border: selectedPlaced?.id === icon.id ? '2px solid #667eea' : 
                       connectionStart === icon.id ? '2px solid #48bb78' : 'none',
                borderRadius: 10,
                transition: 'all 0.2s',
                animation: icon.temporal?.cycle ? `pulse ${icon.temporal.cycle}s infinite` : undefined,
              }}
            >
              {icon.emoji}
              {/* Indicateur temporel pour les icônes temporelles */}
              {icon.category === "⏰ Temporel" && (
                <div style={{
                  position: 'absolute',
                  bottom: -5,
                  right: -5,
                  fontSize: 10,
                  background: 'rgba(102, 126, 234, 0.8)',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  {Math.floor(icon.position_6d.t)}
                </div>
              )}
            </div>
          ))}
          
          {/* Lignes de connexion avec effets V2 */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <defs>
              <linearGradient id="temporal-gradient">
                <stop offset="0%" stopColor="#667eea" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#764ba2" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#667eea" stopOpacity="0.8"/>
              </linearGradient>
              <linearGradient id="causal-gradient">
                <stop offset="0%" stopColor="#48bb78" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#38a169" stopOpacity="0.3"/>
              </linearGradient>
            </defs>
            
            {connections.map((conn) => {
              const fromIcon = placedIcons.find(i => i.id === conn.from);
              const toIcon = placedIcons.find(i => i.id === conn.to);
              if (!fromIcon || !toIcon) return null;
              
              return (
                <g key={conn.id}>
                  <line
                    x1={fromIcon.position_6d.x}
                    y1={fromIcon.position_6d.y}
                    x2={toIcon.position_6d.x}
                    y2={toIcon.position_6d.y}
                    stroke={conn.type === 'temporal' ? 'url(#temporal-gradient)' :
                           conn.type === 'causal' ? 'url(#causal-gradient)' : 
                           'rgba(237, 137, 54, 0.5)'}
                    strokeWidth={2 + (conn.interference || 0) * 3}
                    strokeDasharray={conn.type === 'temporal' ? '10,5' : 
                                    conn.type === 'causal' ? '5,3' : '0'}
                    opacity={conn.strength}
                  />
                  {/* Effet d'interférence quantique */}
                  {conn.interference && conn.interference > 0.5 && (
                    <circle
                      cx={(fromIcon.position_6d.x + toIcon.position_6d.x) / 2}
                      cy={(fromIcon.position_6d.y + toIcon.position_6d.y) / 2}
                      r={5 + conn.interference * 10}
                      fill="none"
                      stroke="#f093fb"
                      strokeWidth="1"
                      opacity={conn.interference}
                    >
                      <animate attributeName="r" 
                               from={5 + conn.interference * 10} 
                               to={10 + conn.interference * 15}
                               dur="2s" 
                               repeatCount="indefinite"/>
                      <animate attributeName="opacity" 
                               from={conn.interference} 
                               to="0"
                               dur="2s" 
                               repeatCount="indefinite"/>
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        
        {/* Minimap améliorée */}
        <div style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 200,
          height: 150,
          background: 'rgba(0,0,0,0.8)',
          border: '2px solid #667eea',
          borderRadius: 10,
          padding: 5,
        }}>
          <div style={{ color: 'white', fontSize: 11, marginBottom: 5, display: 'flex', justifyContent: 'space-between' }}>
            <span>Minimap</span>
            <span style={{ fontSize: 9, color: '#667eea' }}>
              {placedIcons.length} icônes | {connections.length} liens
            </span>
          </div>
          <div style={{
            width: '100%',
            height: 'calc(100% - 20px)',
            background: 'rgba(102, 126, 234, 0.1)',
            position: 'relative',
          }}>
            {/* Connexions sur minimap */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              {connections.map((conn) => {
                const fromIcon = placedIcons.find(i => i.id === conn.from);
                const toIcon = placedIcons.find(i => i.id === conn.to);
                if (!fromIcon || !toIcon) return null;
                
                return (
                  <line
                    key={conn.id}
                    x1={`${(fromIcon.position_6d.x / window.innerWidth) * 100}%`}
                    y1={`${(fromIcon.position_6d.y / window.innerHeight) * 100}%`}
                    x2={`${(toIcon.position_6d.x / window.innerWidth) * 100}%`}
                    y2={`${(toIcon.position_6d.y / window.innerHeight) * 100}%`}
                    stroke={conn.type === 'temporal' ? '#667eea' :
                           conn.type === 'causal' ? '#48bb78' : '#ed8936'}
                    strokeWidth="0.5"
                    opacity="0.5"
                  />
                );
              })}
            </svg>
            
            {/* Icônes sur minimap */}
            {placedIcons.map(icon => (
              <div
                key={icon.id}
                style={{
                  position: 'absolute',
                  left: `${(icon.position_6d.x / window.innerWidth) * 100}%`,
                  top: `${(icon.position_6d.y / window.innerHeight) * 100}%`,
                  width: 4,
                  height: 4,
                  background: icon.category === "⏰ Temporel" ? '#f093fb' :
                             icon.category === "🐉 Créatures" ? '#ff6464' :
                             icon.category === "💎 Ressources" ? '#ffd700' : '#667eea',
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </div>
        </div>
        
        {/* MINI-MAP */}
        <MiniMap
          mapWidth={2000}
          mapHeight={2000}
          entities={placedIcons.map(icon => ({
            x: icon.position_6d.x,
            y: icon.position_6d.y,
            icon: icon.emoji,
            size: icon.size,
          }))}
          viewportX={viewport.x}
          viewportY={viewport.y}
          viewportWidth={viewport.width}
          viewportHeight={viewport.height}
          onViewportChange={(x, y) => setViewport(prev => ({ ...prev, x, y }))}
          style={{ top: 70 }}
        />
        
        {/* UNDO/REDO Controls */}
        <div style={{
          position: 'absolute',
          top: 20,
          left: 340,
          display: 'flex',
          gap: 10,
          zIndex: 1000,
        }}>
          <button
            onClick={undo}
            disabled={!canUndo}
            title="Undo (Cmd+Z)"
            style={{
              padding: '8px 16px',
              background: canUndo ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(0,0,0,0.3)',
              border: 'none',
              borderRadius: 8,
              color: 'white',
              cursor: canUndo ? 'pointer' : 'not-allowed',
              opacity: canUndo ? 1 : 0.5,
              fontSize: 16,
            }}
          >
            ↩️ Undo
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            title="Redo (Cmd+Shift+Z)"
            style={{
              padding: '8px 16px',
              background: canRedo ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(0,0,0,0.3)',
              border: 'none',
              borderRadius: 8,
              color: 'white',
              cursor: canRedo ? 'pointer' : 'not-allowed',
              opacity: canRedo ? 1 : 0.5,
              fontSize: 16,
            }}
          >
            ↪️ Redo
          </button>
        </div>
      </div>
      
      {/* PANNEAU DROIT - Propriétés V2 améliorées */}
      {selectedPlaced && (
        <div style={{
          width: 300,
          background: 'linear-gradient(180deg, #16213e, #1a1a2e)',
          padding: 20,
          borderLeft: '3px solid #764ba2',
          overflowY: 'auto',
        }}>
          <h3 style={{ color: '#667eea', marginBottom: 20 }}>Propriétés 6D</h3>
          
          <div style={{ marginBottom: 20, padding: 10, background: 'rgba(102, 126, 234, 0.1)', borderRadius: 10 }}>
            <div style={{ fontSize: 24, textAlign: 'center', marginBottom: 10 }}>
              {selectedPlaced.emoji}
            </div>
            <div style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
              {selectedPlaced.name}
            </div>
            <div style={{ textAlign: 'center', color: '#667eea', fontSize: 12 }}>
              {selectedPlaced.category}
            </div>
          </div>
          
          {/* Position 6D complète */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Position 6D</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
              <div>
                <label style={{ color: '#667eea', fontSize: 10 }}>X (Spatial)</label>
                <input
                  type="number"
                  value={Math.round(selectedPlaced.position_6d.x)}
                    onChange={(e) => {
                    const updated = placedIcons.map(i => 
                      i.id === selectedPlaced.id 
                        ? { ...i, position_6d: { ...i.position_6d, x: Number(e.target.value) }}
                        : i
                    );
                    setPlacedIcons(updated);
                      // Sync serveur
                      const nx = Number(e.target.value);
                      try { v2AdapterRef.current?.upsertEntity({ id: selectedPlaced.id, position: { x: nx, y: selectedPlaced.position_6d.y }, te: selectedPlaced.temporal?.te ?? temporalState.te, energy_complex: { A: selectedPlaced.energy_complex?.A, phi: selectedPlaced.energy_complex?.phi } }); } catch {}
                      props.onUpdate?.(selectedPlaced.id, { position_6d: { x: nx } });
                  }}
                  style={{
                    width: '100%',
                    padding: 5,
                    background: 'rgba(15, 52, 96, 0.8)',
                    border: '1px solid #667eea',
                    borderRadius: 5,
                    color: 'white',
                  }}
                />
              </div>
              <div>
                <label style={{ color: '#667eea', fontSize: 10 }}>Y (Spatial)</label>
                <input
                  type="number"
                  value={Math.round(selectedPlaced.position_6d.y)}
                    onChange={(e) => {
                    const updated = placedIcons.map(i => 
                      i.id === selectedPlaced.id 
                        ? { ...i, position_6d: { ...i.position_6d, y: Number(e.target.value) }}
                        : i
                    );
                    setPlacedIcons(updated);
                      // Sync serveur
                      const ny = Number(e.target.value);
                      try { v2AdapterRef.current?.upsertEntity({ id: selectedPlaced.id, position: { x: selectedPlaced.position_6d.x, y: ny }, te: selectedPlaced.temporal?.te ?? temporalState.te, energy_complex: { A: selectedPlaced.energy_complex?.A, phi: selectedPlaced.energy_complex?.phi } }); } catch {}
                      props.onUpdate?.(selectedPlaced.id, { position_6d: { y: ny } });
                  }}
                  style={{
                    width: '100%',
                    padding: 5,
                    background: 'rgba(15, 52, 96, 0.8)',
                    border: '1px solid #667eea',
                    borderRadius: 5,
                    color: 'white',
                  }}
                />
              </div>
              <div>
                <label style={{ color: '#48bb78', fontSize: 10 }}>Z (Altitude)</label>
                <input
                  type="number"
                  value={selectedPlaced.position_6d.z}
                  step="0.1"
                  onChange={(e) => {
                    const updated = placedIcons.map(i => 
                      i.id === selectedPlaced.id 
                        ? { ...i, position_6d: { ...i.position_6d, z: Number(e.target.value) }}
                        : i
                    );
                    setPlacedIcons(updated);
                  }}
                  style={{
                    width: '100%',
                    padding: 5,
                    background: 'rgba(15, 52, 96, 0.8)',
                    border: '1px solid #48bb78',
                    borderRadius: 5,
                    color: 'white',
                  }}
                />
              </div>
              <div>
                <label style={{ color: '#f093fb', fontSize: 10 }}>T (Temps)</label>
                <input
                  type="number"
                  value={selectedPlaced.position_6d.t.toFixed(1)}
                  step="0.1"
                  onChange={(e) => {
                    const updated = placedIcons.map(i => 
                      i.id === selectedPlaced.id 
                        ? { ...i, position_6d: { ...i.position_6d, t: Number(e.target.value) }}
                        : i
                    );
                    setPlacedIcons(updated);
                  }}
                  style={{
                    width: '100%',
                    padding: 5,
                    background: 'rgba(15, 52, 96, 0.8)',
                    border: '1px solid #f093fb',
                    borderRadius: 5,
                    color: 'white',
                  }}
                />
              </div>
              <div>
                <label style={{ color: '#ed8936', fontSize: 10 }}>C (Causalité)</label>
                <input
                  type="number"
                  value={selectedPlaced.position_6d.c}
                  step="0.1"
                  onChange={(e) => {
                    const updated = placedIcons.map(i => 
                      i.id === selectedPlaced.id 
                        ? { ...i, position_6d: { ...i.position_6d, c: Number(e.target.value) }}
                        : i
                    );
                    setPlacedIcons(updated);
                  }}
                  style={{
                    width: '100%',
                    padding: 5,
                    background: 'rgba(15, 52, 96, 0.8)',
                    border: '1px solid #ed8936',
                    borderRadius: 5,
                    color: 'white',
                  }}
                />
              </div>
              <div>
                <label style={{ color: '#ffd700', fontSize: 10 }}>Ψ (Quantum)</label>
                <input
                  type="number"
                  value={selectedPlaced.position_6d.psi.toFixed(2)}
                  step="0.01"
                  min="0"
                  max="1"
                  onChange={(e) => {
                    const updated = placedIcons.map(i => 
                      i.id === selectedPlaced.id 
                        ? { ...i, position_6d: { ...i.position_6d, psi: Number(e.target.value) }}
                        : i
                    );
                    setPlacedIcons(updated);
                  }}
                  style={{
                    width: '100%',
                    padding: 5,
                    background: 'rgba(15, 52, 96, 0.8)',
                    border: '1px solid #ffd700',
                    borderRadius: 5,
                    color: 'white',
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Énergie complexe */}
          {selectedPlaced.energy_complex && (
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Énergie Complexe (E = A + iΦ)</label>
              <div style={{ marginTop: 10, padding: 10, background: 'rgba(240, 147, 251, 0.1)', borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ color: '#f093fb', fontSize: 11 }}>Amplitude (A)</span>
                  <span style={{ color: 'white' }}>{selectedPlaced.energy_complex.A.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={selectedPlaced.energy_complex.A}
                  onChange={(e) => {
                    const updated = placedIcons.map(i => 
                      i.id === selectedPlaced.id 
                        ? { ...i, energy_complex: { ...i.energy_complex!, A: Number(e.target.value) }}
                        : i
                    );
                    setPlacedIcons(updated);
                    // Sync serveur
                    try { v2AdapterRef.current?.upsertEntity({ id: selectedPlaced.id, position: { x: selectedPlaced.position_6d.x, y: selectedPlaced.position_6d.y }, te: selectedPlaced.temporal?.te ?? temporalState.te, energy_complex: { A: Number(e.target.value), phi: selectedPlaced.energy_complex?.phi } }); } catch {}
                    props.onUpdate?.(selectedPlaced.id, { energy_complex: { A: Number(e.target.value) } });
                  }}
                  style={{ width: '100%' }}
                />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, marginTop: 10 }}>
                  <span style={{ color: '#f093fb', fontSize: 11 }}>Phase (Φ)</span>
                  <span style={{ color: 'white' }}>{(selectedPlaced.energy_complex.phi * 180 / Math.PI).toFixed(0)}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.PI * 2}
                  step="0.01"
                  value={selectedPlaced.energy_complex.phi}
                  onChange={(e) => {
                    const updated = placedIcons.map(i => 
                      i.id === selectedPlaced.id 
                        ? { ...i, energy_complex: { ...i.energy_complex!, phi: Number(e.target.value) }}
                        : i
                    );
                    setPlacedIcons(updated);
                    // Sync serveur
                    try { v2AdapterRef.current?.upsertEntity({ id: selectedPlaced.id, position: { x: selectedPlaced.position_6d.x, y: selectedPlaced.position_6d.y }, te: selectedPlaced.temporal?.te ?? temporalState.te, energy_complex: { A: selectedPlaced.energy_complex?.A, phi: Number(e.target.value) } }); } catch {}
                    props.onUpdate?.(selectedPlaced.id, { energy_complex: { phi: Number(e.target.value) } });
                  }}
                  style={{ width: '100%' }}
                />
                
                {/* Visualisation de l'énergie complexe */}
                <div style={{ marginTop: 10, textAlign: 'center', fontSize: 14, color: '#f093fb', fontFamily: 'monospace' }}>
                  {v2AdapterRef.current?.calculateComplexEnergy(
                    selectedPlaced.energy_complex.A,
                    selectedPlaced.energy_complex.phi
                  ).toString()}
                </div>
              </div>
            </div>
          )}
          
          {/* Propriétés visuelles */}
          <div style={{ marginBottom: 15 }}>
            <label style={{ color: 'white', fontSize: 12 }}>Taille: {selectedPlaced.size}px</label>
            <input
              type="range"
              min="20"
              max="200"
              value={selectedPlaced.size}
              onChange={(e) => {
                const updated = placedIcons.map(i => 
                  i.id === selectedPlaced.id 
                    ? { ...i, size: Number(e.target.value) }
                    : i
                );
                setPlacedIcons(updated);
              }}
              style={{ width: '100%', marginTop: 5 }}
            />
          </div>
          
          <div style={{ marginBottom: 15 }}>
            <label style={{ color: 'white', fontSize: 12 }}>Rotation: {selectedPlaced.rotation}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={selectedPlaced.rotation}
              onChange={(e) => {
                const updated = placedIcons.map(i => 
                  i.id === selectedPlaced.id 
                    ? { ...i, rotation: Number(e.target.value) }
                    : i
                );
                setPlacedIcons(updated);
              }}
              style={{ width: '100%', marginTop: 5 }}
            />
          </div>
          
          <button
            onClick={() => {
              setPlacedIcons(placedIcons.filter(i => i.id !== selectedPlaced.id));
              setConnections(connections.filter(c => c.from !== selectedPlaced.id && c.to !== selectedPlaced.id));
              setSelectedPlaced(null);
              props.onDelete?.(selectedPlaced.id);
            }}
            style={{
              width: '100%',
              padding: 10,
              background: '#ff4444',
              border: 'none',
              borderRadius: 5,
              color: 'white',
              cursor: 'pointer',
              marginTop: 20,
            }}
          >
            🗑️ Supprimer
          </button>
        </div>
      )}
      
      {/* Style pour l'animation pulse */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}