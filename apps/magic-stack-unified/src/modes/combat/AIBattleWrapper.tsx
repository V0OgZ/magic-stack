import React, { useEffect, useRef, useState } from 'react';
import './AIBattleWrapper.css';

interface BattleEvent {
    type: 'attack' | 'spell' | 'move' | 'defend' | 'heal';
    source: 'ia1' | 'ia2';
    target?: 'ia1' | 'ia2';
    damage?: number;
    spell?: string;
    formula?: string;
    position?: { x: number; y: number; z?: number; t?: number; c?: number; psi?: number };
}

interface BattleState {
    round: number;
    scenario: 'classic' | 'temporal' | 'quantum' | '6d';
    ia1: {
        hp: number;
        energy: number;
        position: { x: number; y: number };
        wins: number;
    };
    ia2: {
        hp: number;
        energy: number;
        position: { x: number; y: number };
        wins: number;
    };
}

export const AIBattleWrapper: React.FC = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [battleState, setBattleState] = useState<BattleState | null>(null);
    const [useV2API, setUseV2API] = useState(false);
    const [wsStatus, setWsStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

    // Chemin vers le fichier HTML original
    const htmlPath = '/demos/experimental/IA_VS_IA_AUTOPLAY.html';

    useEffect(() => {
        if (!iframeRef.current) return;

        // Écouter les messages de l'iframe
        const handleMessage = async (event: MessageEvent) => {
            if (event.data.type === 'battle-event') {
                const battleEvent = event.data.payload as BattleEvent;
                
                if (useV2API) {
                    // Envoyer l'événement au backend V2
                    await sendToV2Backend(battleEvent);
                }

                // Mettre à jour l'état local
                console.log('Battle Event:', battleEvent);
            } else if (event.data.type === 'battle-state') {
                setBattleState(event.data.payload);
            }
        };

        window.addEventListener('message', handleMessage);

        // Injecter du code dans l'iframe pour intercepter les événements
        const injectBridge = () => {
            const iframe = iframeRef.current;
            if (!iframe?.contentWindow) return;

            try {
                // Attendre que l'iframe soit chargée
                iframe.onload = () => {
                    const iframeWindow = iframe.contentWindow;
                    if (!iframeWindow) return;

                    // Injecter un script pour intercepter les actions
                    const script = iframeWindow.document.createElement('script');
                    script.textContent = `
                        // Sauvegarder les fonctions originales
                        const originalPerformAttack = window.performAttack;
                        const originalPerformSpell = window.performSpecialSpell;
                        const originalGameTick = window.gameTick;
                        
                        // Surcharger pour envoyer des messages au parent
                        window.performAttack = function(iaNumber, type) {
                            const result = originalPerformAttack.apply(this, arguments);
                            
                            // Envoyer l'événement au parent React
                            window.parent.postMessage({
                                type: 'battle-event',
                                payload: {
                                    type: 'attack',
                                    source: iaNumber === 1 ? 'ia1' : 'ia2',
                                    target: iaNumber === 1 ? 'ia2' : 'ia1',
                                    spell: type
                                }
                            }, '*');
                            
                            return result;
                        };
                        
                        window.performSpecialSpell = function(iaNumber, spellType) {
                            const result = originalPerformSpell.apply(this, arguments);
                            
                            // Envoyer l'événement au parent React
                            window.parent.postMessage({
                                type: 'battle-event',
                                payload: {
                                    type: 'spell',
                                    source: iaNumber === 1 ? 'ia1' : 'ia2',
                                    spell: spellType,
                                    formula: window.spells[spellType]?.formula
                                }
                            }, '*');
                            
                            return result;
                        };
                        
                        // Envoyer l'état à chaque tick
                        window.gameTick = function() {
                            const result = originalGameTick.apply(this, arguments);
                            
                            window.parent.postMessage({
                                type: 'battle-state',
                                payload: window.gameState
                            }, '*');
                            
                            return result;
                        };
                        
                        console.log('🌉 Bridge V2 API injecté avec succès');
                    `;
                    iframeWindow.document.head.appendChild(script);
                    setIsConnected(true);
                };
            } catch (error) {
                console.error('Erreur injection bridge:', error);
            }
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
                
                // Se connecter au WebSocket
                await V2Adapter.connectWebSocket();
                setWsStatus('connected');
                
                console.log('✅ Connecté aux API V2');
            } catch (error) {
                console.error('Erreur connexion V2:', error);
                setWsStatus('disconnected');
            }
        };

        connectToV2();
    }, [useV2API]);

    // Envoyer les événements au backend V2
    const sendToV2Backend = async (event: BattleEvent) => {
        try {
            // Formater pour l'API V2
            const v2Event = {
                type: 'COMBAT_ACTION',
                timestamp: Date.now(),
                data: {
                    action: event.type,
                    source: event.source,
                    target: event.target,
                    value: event.damage,
                    formula: event.formula,
                    position: event.position || { x: 0, y: 0, z: 0, t: Date.now(), c: 0, psi: 0 }
                }
            };

            // Envoyer au backend Rust (port 3001)
            const response = await fetch('http://localhost:3001/api/v2/combat/action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(v2Event)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('V2 Response:', result);
                
                // Si le backend renvoie une action IA, l'exécuter dans l'iframe
                if (result.ai_action) {
                    executeAIAction(result.ai_action);
                }
            }
        } catch (error) {
            console.error('Erreur envoi V2:', error);
        }
    };

    // Exécuter une action renvoyée par l'IA backend
    const executeAIAction = (action: any) => {
        if (!iframeRef.current?.contentWindow) return;
        
        // Envoyer la commande à l'iframe
        iframeRef.current.contentWindow.postMessage({
            type: 'execute-action',
            payload: action
        }, '*');
    };

    // Contrôles pour démarrer avec V2 ou en local
    const handleStartWithV2 = () => {
        setUseV2API(true);
        if (iframeRef.current?.contentWindow) {
            // Démarrer la bataille dans l'iframe
            (iframeRef.current.contentWindow as any).startBattle?.();
        }
    };

    const handleStartLocal = () => {
        setUseV2API(false);
        if (iframeRef.current?.contentWindow) {
            (iframeRef.current.contentWindow as any).startBattle?.();
        }
    };

    return (
        <div className="ai-battle-wrapper">
            <div className="battle-controls">
                <div className="control-panel">
                    <h2>🤖 Mode Combat IA vs IA</h2>
                    
                    <div className="mode-selector">
                        <button 
                            className={`mode-btn ${!useV2API ? 'active' : ''}`}
                            onClick={() => setUseV2API(false)}
                        >
                            Mode Local (HTML Original)
                        </button>
                        <button 
                            className={`mode-btn ${useV2API ? 'active' : ''}`}
                            onClick={() => setUseV2API(true)}
                        >
                            Mode V2 API (Backend Rust)
                        </button>
                    </div>

                    {useV2API && (
                        <div className="v2-status">
                            <span className={`status-indicator ${wsStatus}`}>
                                {wsStatus === 'connected' ? '🟢' : wsStatus === 'connecting' ? '🟡' : '🔴'}
                            </span>
                            <span>Backend V2: {wsStatus}</span>
                        </div>
                    )}

                    <div className="action-buttons">
                        <button 
                            className="action-btn start"
                            onClick={handleStartWithV2}
                            disabled={useV2API && wsStatus !== 'connected'}
                        >
                            ▶️ Démarrer avec V2
                        </button>
                        <button 
                            className="action-btn start-local"
                            onClick={handleStartLocal}
                        >
                            ▶️ Démarrer en Local
                        </button>
                    </div>

                    {battleState && (
                        <div className="battle-info">
                            <h3>État du Combat</h3>
                            <div className="info-grid">
                                <div>Round: {battleState.round}</div>
                                <div>Scénario: {battleState.scenario}</div>
                                <div>IA1 HP: {battleState.ia1.hp}</div>
                                <div>IA2 HP: {battleState.ia2.hp}</div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bridge-status">
                    <span className={`bridge-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
                        {isConnected ? '🌉 Bridge actif' : '🚫 Bridge inactif'}
                    </span>
                </div>
            </div>

            <div className="battle-iframe-container">
                <iframe
                    ref={iframeRef}
                    src={htmlPath}
                    title="IA vs IA Battle"
                    className="battle-iframe"
                    sandbox="allow-same-origin allow-scripts"
                />
            </div>
        </div>
    );
};

export default AIBattleWrapper;
