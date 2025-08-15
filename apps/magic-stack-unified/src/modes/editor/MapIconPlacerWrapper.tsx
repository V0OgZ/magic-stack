import React, { useEffect, useRef, useState } from 'react';

export function MapIconPlacerWrapper() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [apiStatus, setApiStatus] = useState({ rust: false, java: false, vectorDB: false });

  useEffect(() => {
    // Vérifier les APIs au démarrage
    checkAPIs();

    // Communication bidirectionnelle avec le HTML
    const handleMessage = async (event: MessageEvent) => {
      const { type, data } = event.data;

      switch(type) {
        case 'SAVE_MAP':
          // Sauvegarde vers Interstice (Java 8082)
          try {
            const payload = {
              type: 'unified_map',
              name: `map_export_${Date.now()}`,
              data,
              metadata: {
                totalIcons: Array.isArray(data?.icons) ? data.icons.length : undefined,
                totalConnections: Array.isArray(data?.connections) ? data.connections.length : undefined,
                created: data?.created,
                version: data?.version,
              },
            };
            const apiBase = ['localhost','127.0.0.1'].includes(window.location.hostname) ? 'http://localhost:8082' : '';
            const response = await fetch(`${apiBase}/api/interstice/upload`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });
            if (response.ok) {
              const json = await response.json().catch(() => ({}));
              sendToIframe({ type: 'SAVE_SUCCESS', message: 'Map sauvegardée!', data: json });
            } else {
              sendToIframe({ type: 'SAVE_ERROR', message: `HTTP ${response.status}` });
            }
          } catch (error) {
            sendToIframe({ type: 'SAVE_ERROR', message: 'Erreur sauvegarde' });
          }
          break;

        case 'LOAD_MAP':
          // Chargement depuis Interstice (Java)
          try {
            const apiBase = ['localhost','127.0.0.1'].includes(window.location.hostname) ? 'http://localhost:8082' : '';
            const response = await fetch(`${apiBase}/api/interstice/download`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ entityId: data.mapId })
            });
            if (response.ok) {
              const mapWrapper = await response.json();
              const mapData = mapWrapper?.entityData ?? mapWrapper?.data ?? mapWrapper;
              sendToIframe({ type: 'MAP_LOADED', data: mapData });
            } else {
              sendToIframe({ type: 'LOAD_ERROR', message: `HTTP ${response.status}` });
            }
          } catch (error) {
            sendToIframe({ type: 'LOAD_ERROR', message: 'Erreur chargement' });
          }
          break;

        case 'CALCULATE_6D':
          // Calcul 6D via Rust
          try {
            const response = await fetch('http://localhost:3001/api/v2/calculate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            if (response.ok) {
              const result = await response.json();
              sendToIframe({ type: '6D_RESULT', data: result });
            }
          } catch (error) {
            console.error('Erreur calcul 6D:', error);
          }
          break;

        case 'SEARCH_LORE':
          // Recherche dans Vector DB
          try {
            const response = await fetch('http://localhost:7500/search', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ query: data.query })
            });
            if (response.ok) {
              const results = await response.json();
              sendToIframe({ type: 'LORE_RESULTS', data: results });
            }
          } catch (error) {
            console.error('Erreur recherche lore:', error);
          }
          break;

        case 'ASK_CLIPPY':
          // Question à Clippy
          try {
            const response = await fetch('http://localhost:7501/api/clippy/ask', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ question: data.question, context: data.context })
            });
            if (response.ok) {
              const answer = await response.json();
              sendToIframe({ type: 'CLIPPY_ANSWER', data: answer });
            }
          } catch (error) {
            console.error('Erreur Clippy:', error);
          }
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const sendToIframe = (message: any) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(message, '*');
    }
  };

  const checkAPIs = async () => {
    // Vérifier chaque backend
    const isLocal = ['localhost','127.0.0.1'].includes(window.location.hostname);
    const checks = [
      { url: isLocal ? 'http://localhost:3001/health' : '/engine/health', key: 'rust' },
      { url: isLocal ? 'http://localhost:8082/health' : '/api/health', key: 'java' },
      { url: isLocal ? 'http://localhost:7500/health' : '/vector/health', key: 'vectorDB' }
    ];

    for (const check of checks) {
      try {
        const response = await fetch(check.url);
        setApiStatus(prev => ({ ...prev, [check.key]: response.ok }));
      } catch {
        setApiStatus(prev => ({ ...prev, [check.key]: false }));
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* Barre de statut des APIs */}
      <div style={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '10px',
        borderRadius: '8px',
        display: 'flex',
        gap: '10px'
      }}>
        <span style={{ color: apiStatus.rust ? '#4ade80' : '#ef4444' }}>
          Rust {apiStatus.rust ? '✓' : '✗'}
        </span>
        <span style={{ color: apiStatus.java ? '#4ade80' : '#ef4444' }}>
          Java {apiStatus.java ? '✓' : '✗'}
        </span>
        <span style={{ color: apiStatus.vectorDB ? '#4ade80' : '#ef4444' }}>
          Vector {apiStatus.vectorDB ? '✓' : '✗'}
        </span>
      </div>

      {/* Le chef-d'œuvre HTML */}
      <iframe
        ref={iframeRef}
        src="/assets/MAP_ICON_PLACER_ADVANCED.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        title="Map Icon Placer HD"
        onLoad={() => {
          // Envoyer la config initiale au HTML
          const isLocal = ['localhost','127.0.0.1'].includes(window.location.hostname);
          sendToIframe({
            type: 'INIT',
            apis: {
              rust: isLocal ? 'http://localhost:3001' : '/engine',
              java: isLocal ? 'http://localhost:8082' : '/api',
              vectorDB: isLocal ? 'http://localhost:7500' : '/vector',
              clippy: isLocal ? 'http://localhost:7501' : '/clippy'
            }
          });
        }}
      />
    </div>
  );
}