import React from 'react';
import { wsService, type TickPayload, type ParadoxPayload } from '../services/websocket';
import { useEditorStore } from '../state/useEditorStore';

export function LivePreviewPanel(): React.ReactElement {
  const [isConnected, setIsConnected] = React.useState(false);
  const [isLive, setIsLive] = React.useState(false);
  const [lastTick, setLastTick] = React.useState<TickPayload | null>(null);
  const [paradoxes, setParadoxes] = React.useState<ParadoxPayload[]>([]);
  const [autoTick, setAutoTick] = React.useState(false);
  
  const scenario = useEditorStore(s => s.scenario);
  
  React.useEffect(() => {
    // Listeners WebSocket
    const handleConnected = () => setIsConnected(true);
    const handleDisconnected = () => {
      setIsConnected(false);
      setIsLive(false);
    };
    
    const handleTick = (payload: TickPayload) => {
      setLastTick(payload);
      
      // Mise à jour de l'état local si en mode live
      if (isLive) {
        // Ici on pourrait mettre à jour le store avec les nouvelles valeurs
        console.log('🔄 Tick reçu:', payload);
      }
    };
    
    const handleParadox = (payload: ParadoxPayload) => {
      setParadoxes(prev => [...prev.slice(-4), payload]); // Garder les 5 derniers
    };
    
    // S'abonner aux événements
    wsService.on('connected', handleConnected);
    wsService.on('disconnected', handleDisconnected);
    wsService.on('tick', handleTick);
    wsService.on('paradox', handleParadox);
    
    // Connexion initiale
    wsService.connect();
    
    // Nettoyage
    return () => {
      wsService.off('connected', handleConnected);
      wsService.off('disconnected', handleDisconnected);
      wsService.off('tick', handleTick);
      wsService.off('paradox', handleParadox);
      
      if (isLive) {
        wsService.stopLivePreview();
      }
    };
  }, [isLive]);
  
  React.useEffect(() => {
    if (!autoTick) return;
    
    const interval = setInterval(() => {
      wsService.requestTick();
    }, 1000);
    
    return () => clearInterval(interval);
  }, [autoTick]);
  
  const toggleLivePreview = () => {
    if (isLive) {
      wsService.stopLivePreview();
      setIsLive(false);
    } else {
      wsService.startLivePreview(scenario.id);
      wsService.syncState(scenario);
      setIsLive(true);
    }
  };
  
  const formatDrift = (drift: number) => {
    if (drift < 2) return { text: drift.toFixed(1), color: 'var(--accent-success)' };
    if (drift < 5) return { text: drift.toFixed(1), color: 'var(--accent-warning)' };
    return { text: drift.toFixed(1), color: 'var(--accent-danger)' };
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'var(--accent-info)';
      case 'medium': return 'var(--accent-warning)';
      case 'high': return 'var(--accent-danger)';
      case 'critical': return '#ff0000';
      default: return 'var(--text-secondary)';
    }
  };
  
  return (
    <div style={{
      position: 'fixed',
      left: 20,
      bottom: 80,
      width: 350,
      maxHeight: 400,
      background: 'linear-gradient(135deg, rgba(20, 24, 36, 0.98) 0%, rgba(26, 31, 46, 0.95) 100%)',
      border: '1px solid var(--border-secondary)',
      borderRadius: 12,
      padding: 16,
      backdropFilter: 'blur(20px)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      zIndex: 1400,
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid var(--border-primary)',
        paddingBottom: 8,
      }}>
        <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>
          🔮 Live Preview V2
        </h4>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8,
          fontSize: 12,
        }}>
          <span style={{ 
            width: 8, 
            height: 8, 
            borderRadius: '50%',
            background: isConnected ? 'var(--accent-success)' : 'var(--accent-danger)',
          }} />
          <span style={{ color: 'var(--text-muted)' }}>
            {isConnected ? 'Connecté' : 'Déconnecté'}
          </span>
        </div>
      </div>
      
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={toggleLivePreview}
          disabled={!isConnected}
          className={`btn ${isLive ? 'btn-danger' : 'btn-primary'}`}
          style={{ flex: 1, padding: '8px 12px', fontSize: 13 }}
        >
          {isLive ? '⏸️ Arrêter' : '▶️ Démarrer'}
        </button>
        
        <button
          onClick={() => wsService.requestTick()}
          disabled={!isConnected || !isLive}
          className="btn"
          style={{ padding: '8px 12px', fontSize: 13 }}
        >
          ⏭️ Tick
        </button>
        
        <button
          onClick={() => setAutoTick(!autoTick)}
          disabled={!isConnected || !isLive}
          className={`btn ${autoTick ? 'btn-warning' : ''}`}
          style={{ padding: '8px 12px', fontSize: 13 }}
        >
          {autoTick ? '⏹️' : '🔄'} Auto
        </button>
      </div>
      
      {/* Temporal Display */}
      {lastTick && (
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 8,
          padding: 12,
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>
            ÉTAT TEMPOREL
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 8,
            textAlign: 'center',
          }}>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>TW</div>
              <div style={{ fontSize: 18, fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                {lastTick.tw.toFixed(1)}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>TE</div>
              <div style={{ fontSize: 18, fontWeight: 'bold', color: 'var(--accent-secondary)' }}>
                {lastTick.te.toFixed(1)}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Δt</div>
              <div style={{ 
                fontSize: 18, 
                fontWeight: 'bold', 
                color: formatDrift(lastTick.drift).color 
              }}>
                {formatDrift(lastTick.drift).text}
              </div>
            </div>
          </div>
          
          {lastTick.debt > 0 && (
            <div style={{
              marginTop: 8,
              padding: '4px 8px',
              background: 'rgba(255, 100, 100, 0.1)',
              border: '1px solid rgba(255, 100, 100, 0.3)',
              borderRadius: 4,
              fontSize: 12,
              textAlign: 'center',
              color: 'var(--accent-danger)',
            }}>
              💸 Dette: {lastTick.debt.toFixed(1)}
            </div>
          )}
        </div>
      )}
      
      {/* Entities */}
      {lastTick?.entities && lastTick.entities.length > 0 && (
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 8,
          padding: 12,
          maxHeight: 100,
          overflow: 'auto',
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>
            ENTITÉS ({lastTick.entities.length})
          </div>
          
          {lastTick.entities.slice(0, 3).map(entity => (
            <div key={entity.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 12,
              padding: '2px 0',
              color: 'var(--text-secondary)',
            }}>
              <span>{entity.id}</span>
              <span>TE: {entity.te.toFixed(1)}</span>
              <span>({entity.position.x},{entity.position.y})</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Paradoxes */}
      {paradoxes.length > 0 && (
        <div style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--accent-warning)',
          borderRadius: 8,
          padding: 12,
          maxHeight: 100,
          overflow: 'auto',
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>
            ⚠️ PARADOXES
          </div>
          
          {paradoxes.map((paradox, i) => (
            <div key={i} style={{
              fontSize: 12,
              padding: '2px 0',
              color: getSeverityColor(paradox.severity),
            }}>
              {paradox.type.replace(/_/g, ' ')} - {paradox.severity}
            </div>
          ))}
        </div>
      )}
      
      {/* Help */}
      {!isConnected && (
        <div style={{
          fontSize: 11,
          color: 'var(--text-muted)',
          textAlign: 'center',
          padding: 8,
          background: 'var(--bg-panel)',
          borderRadius: 6,
        }}>
          WebSocket non connecté. Lance le backend Rust<br/>
          <code>./h-profondeur websocket</code>
        </div>
      )}
      
      {isConnected && !isLive && (
        <div style={{
          fontSize: 11,
          color: 'var(--text-muted)',
          textAlign: 'center',
          padding: 8,
        }}>
          Clique sur Démarrer pour observer les ticks V2 en temps réel
        </div>
      )}
    </div>
  );
}
