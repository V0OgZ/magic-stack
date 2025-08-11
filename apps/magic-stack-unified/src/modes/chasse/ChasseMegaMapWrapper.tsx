import React, { useEffect, useRef, useState } from 'react';
import './ChasseMegaMapWrapper.css';

interface MapPosition {
    x: number;
    y: number;
    z: number;
    t: number;  // Dimension temporelle
    c: number;  // Causalité
    psi: number; // Quantique
}

interface GameEvent {
    type: 'move' | 'collect' | 'battle' | 'portal' | 'temporal_shift';
    position: MapPosition;
    entity?: string;
    value?: any;
}

export const ChasseMegaMapWrapper: React.FC = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [currentPosition, setCurrentPosition] = useState<MapPosition>({
        x: 0, y: 0, z: 0, t: 0, c: 0, psi: 0
    });
    const [useV2API, setUseV2API] = useState(false);
    const [wsStatus, setWsStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
    const [gameState, setGameState] = useState({
        day: 1,
        week: 1,
        month: 1,
        resources: {
            gold: 1000,
            wood: 20,
            ore: 20,
            gems: 10,
            temporalEnergy: 100
        }
    });

    // Chemin vers le HTML original
    const htmlPath = '/CHASSE_TEMPORELLE_MEGA_MAP.html';

    useEffect(() => {
        if (!iframeRef.current) return;

        // Écouter les messages de l'iframe
        const handleMessage = async (event: MessageEvent) => {
            if (event.data.type === 'map-event') {
                const gameEvent = event.data.payload as GameEvent;
                
                if (useV2API) {
                    // Envoyer au backend V2 pour calculs 6D
                    await sendToV2Backend(gameEvent);
                }

                // Mettre à jour la position locale
                if (gameEvent.position) {
                    setCurrentPosition(gameEvent.position);
                }

                console.log('Map Event:', gameEvent);
            } else if (event.data.type === 'game-state') {
                setGameState(event.data.payload);
            }
        };

        window.addEventListener('message', handleMessage);

        // Injecter le bridge dans l'iframe
        const injectBridge = () => {
            const iframe = iframeRef.current;
            if (!iframe?.contentWindow) return;

            iframe.onload = () => {
                const iframeWindow = iframe.contentWindow;
                if (!iframeWindow) return;

                // Injecter le script bridge
                const script = iframeWindow.document.createElement('script');
                script.textContent = `
                    // Bridge V2 pour CHASSE TEMPORELLE
                    console.log('🌉 Bridge Chasse Temporelle V2 initialisé');
                    
                    // Intercepter les mouvements de la map
                    const originalHandleHexClick = window.handleHexClick || function() {};
                    window.handleHexClick = function(x, y) {
                        const result = originalHandleHexClick.apply(this, arguments);
                        
                        // Envoyer l'événement au parent React
                        window.parent.postMessage({
                            type: 'map-event',
                            payload: {
                                type: 'move',
                                position: {
                                    x: x,
                                    y: y,
                                    z: 0,
                                    t: Date.now(),
                                    c: 0,
                                    psi: Math.random()
                                }
                            }
                        }, '*');
                        
                        return result;
                    };
                    
                    // Intercepter les portails temporels
                    const originalOpenPortal = window.openPortal || function() {};
                    window.openPortal = function(portalData) {
                        const result = originalOpenPortal.apply(this, arguments);
                        
                        window.parent.postMessage({
                            type: 'map-event',
                            payload: {
                                type: 'portal',
                                position: portalData.position,
                                value: portalData
                            }
                        }, '*');
                        
                        return result;
                    };
                    
                    // Envoyer l'état du jeu périodiquement
                    setInterval(() => {
                        if (window.gameState) {
                            window.parent.postMessage({
                                type: 'game-state',
                                payload: window.gameState
                            }, '*');
                        }
                    }, 1000);
                `;
                iframeWindow.document.head.appendChild(script);
                setIsConnected(true);
            };
        };

        injectBridge();

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [useV2API]);

    // Connexion aux API V2
    useEffect(() => {
        if (!useV2API) return;

        const connectToV2 = async () => {
            setWsStatus('connecting');
            
            try {
                // Importer l'adaptateur V2
                const { V2Adapter } = await import('../../shared/v2-adapter');
                
                // Se connecter au WebSocket et au système de tick
                await V2Adapter.connectWebSocket();
                
                // Démarrer le tick temporel
                const tickInterval = setInterval(async () => {
                    const tickResult = await V2Adapter.tick(currentPosition);
                    console.log('⏰ Tick V2:', tickResult);
                    
                    // Calculer la dérive temporelle
                    if (tickResult.drift) {
                        const driftResult = await V2Adapter.calculateDrift([currentPosition]);
                        console.log('🌀 Dérive temporelle:', driftResult);
                    }
                }, 100); // Tick toutes les 100ms comme requis par V2
                
                setWsStatus('connected');
                console.log('✅ Connecté aux API V2 avec tick temporel');
                
                return () => clearInterval(tickInterval);
            } catch (error) {
                console.error('Erreur connexion V2:', error);
                setWsStatus('disconnected');
            }
        };

        connectToV2();
    }, [useV2API, currentPosition]);

    // Envoyer les événements au backend V2
    const sendToV2Backend = async (event: GameEvent) => {
        try {
            const { V2Adapter } = await import('../../shared/v2-adapter');
            
            // Formater pour l'API V2
            const v2Event = {
                type: 'MAP_ACTION',
                timestamp: Date.now(),
                data: {
                    action: event.type,
                    position: event.position,
                    entity: event.entity,
                    value: event.value
                }
            };

            // Calculer l'énergie complexe de la position
            const energyResult = await V2Adapter.calculateComplexEnergy({
                position: event.position,
                type: 'hero'
            });
            console.log('⚡ Énergie complexe:', energyResult);

            // Détecter les paradoxes temporels
            if (event.type === 'temporal_shift') {
                const paradoxResult = await V2Adapter.detectParadoxes([event.position]);
                console.log('⚠️ Détection paradoxes:', paradoxResult);
                
                if (paradoxResult.paradoxes?.length > 0) {
                    // Activer le régulateur Vince
                    await V2Adapter.activateVince({
                        position: event.position,
                        severity: 'high'
                    });
                }
            }

            // Envoyer au backend Rust
            const response = await fetch('http://localhost:3001/api/v2/map/action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(v2Event)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('V2 Response:', result);
            }
        } catch (error) {
            console.error('Erreur envoi V2:', error);
        }
    };

    // Téléporter à une position spécifique
    const teleportTo = (x: number, y: number, t?: number) => {
        if (!iframeRef.current?.contentWindow) return;
        
        iframeRef.current.contentWindow.postMessage({
            type: 'teleport',
            payload: { x, y, t: t || Date.now() }
        }, '*');
        
        setCurrentPosition(prev => ({ ...prev, x, y, t: t || prev.t }));
    };

    // Activer le mode voyage temporel
    const activateTimeTravel = () => {
        if (!iframeRef.current?.contentWindow) return;
        
        iframeRef.current.contentWindow.postMessage({
            type: 'time-travel',
            payload: { active: true }
        }, '*');
    };

    return (
        <div className="chasse-mega-wrapper">
            <div className="chasse-controls">
                <div className="control-header">
                    <h2>⚔️ CHASSE TEMPORELLE - Map Méga 6x6</h2>
                    
                    <div className="mode-selector">
                        <button 
                            className={`mode-btn ${!useV2API ? 'active' : ''}`}
                            onClick={() => setUseV2API(false)}
                        >
                            Mode Local
                        </button>
                        <button 
                            className={`mode-btn ${useV2API ? 'active' : ''}`}
                            onClick={() => setUseV2API(true)}
                        >
                            Mode V2 API (Navigation 6D)
                        </button>
                    </div>

                    {useV2API && (
                        <div className="v2-indicators">
                            <span className={`indicator ${wsStatus}`}>
                                {wsStatus === 'connected' ? '🟢' : wsStatus === 'connecting' ? '🟡' : '🔴'}
                            </span>
                            <span>WebSocket: {wsStatus}</span>
                            <span className="tick-indicator">⏰ Tick 100ms</span>
                        </div>
                    )}
                </div>

                <div className="position-display">
                    <h3>Position 6D</h3>
                    <div className="coords-grid">
                        <div>X: {currentPosition.x}</div>
                        <div>Y: {currentPosition.y}</div>
                        <div>Z: {currentPosition.z}</div>
                        <div>T: {new Date(currentPosition.t).toLocaleTimeString()}</div>
                        <div>C: {currentPosition.c.toFixed(2)}</div>
                        <div>Ψ: {currentPosition.psi.toFixed(3)}</div>
                    </div>
                </div>

                <div className="game-stats">
                    <h3>État du Jeu</h3>
                    <div className="stats-grid">
                        <div>🗓️ Jour {gameState.day}, Semaine {gameState.week}</div>
                        <div>💰 Or: {gameState.resources.gold}</div>
                        <div>🌲 Bois: {gameState.resources.wood}</div>
                        <div>⛏️ Minerai: {gameState.resources.ore}</div>
                        <div>💎 Gemmes: {gameState.resources.gems}</div>
                        <div>⚡ Énergie: {gameState.resources.temporalEnergy}</div>
                    </div>
                </div>

                <div className="quick-actions">
                    <button 
                        className="action-btn"
                        onClick={() => teleportTo(0, 0)}
                    >
                        🏠 Retour Base
                    </button>
                    <button 
                        className="action-btn temporal"
                        onClick={activateTimeTravel}
                    >
                        ⏳ Voyage Temporel
                    </button>
                    <button 
                        className="action-btn portal"
                        onClick={() => teleportTo(50, 50, Date.now() - 86400000)}
                    >
                        🌀 Portail -1 Jour
                    </button>
                </div>

                <div className="bridge-status">
                    <span className={`bridge-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
                        {isConnected ? '🌉 Bridge actif' : '🚫 Bridge inactif'}
                    </span>
                </div>
            </div>

            <div className="chasse-iframe-container">
                <iframe
                    ref={iframeRef}
                    src={htmlPath}
                    title="Chasse Temporelle Mega Map"
                    className="chasse-iframe"
                    sandbox="allow-same-origin allow-scripts"
                />
            </div>
        </div>
    );
};

export default ChasseMegaMapWrapper;
