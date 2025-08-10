/**
 * 🗺️ EditorView - Éditeur de cartes AVANCÉ intégré
 * Utilise l'éditeur HTML créé par l'Archéologue du Contenu
 */

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export function EditorView(): React.ReactElement {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mapData, setMapData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Écouter les messages de l'éditeur
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'MAP_EDITOR_EVENT') {
        console.log('Message de l\'éditeur:', event.data);
        
        if (event.data.action === 'SAVE_MAP') {
          setMapData(event.data.data);
          // Sauvegarder dans localStorage pour l'instant
          localStorage.setItem('currentMap', JSON.stringify(event.data.data));
          console.log('Carte sauvegardée:', event.data.data);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Vérifier que l'iframe est chargée
    const checkIframeLoaded = () => {
      if (iframeRef.current?.contentWindow) {
        setIsLoading(false);
      }
    };

    setTimeout(checkIframeLoaded, 1000);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Envoyer des données à l'éditeur
  const sendToEditor = (action: string, data: any) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'REACT_TO_EDITOR',
        action,
        data
      }, '*');
    }
  };

  const loadSavedMap = () => {
    const saved = localStorage.getItem('currentMap');
    if (saved) {
      const data = JSON.parse(saved);
      sendToEditor('LOAD_MAP', data);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      {/* Header avec contrôles */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <Link
            to="/"
            style={{
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 8,
              textDecoration: 'none',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            ← Retour
          </Link>
          
          <h1 style={{ 
            fontSize: 24, 
            color: 'white',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            🗺️ Éditeur de Carte Avancé
          </h1>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={loadSavedMap}
            style={{
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #2e7d32, #4CAF50)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            📂 Charger Dernière Carte
          </button>

          <button
            onClick={() => sendToEditor('EXPORT', {})}
            style={{
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #1976d2, #2196F3)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            💾 Exporter
          </button>

          {mapData && (
            <div style={{
              padding: '8px 16px',
              background: 'rgba(76, 175, 80, 0.2)',
              color: '#4CAF50',
              border: '1px solid #4CAF50',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}>
              ✅ Carte sauvegardée
            </div>
          )}
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>⏳</div>
          <p style={{ color: 'white', fontSize: 18 }}>Chargement de l'éditeur...</p>
        </div>
      )}

      {/* Iframe avec l'éditeur HTML */}
      <iframe
        ref={iframeRef}
        src="/assets/MAP_ICON_PLACER_ADVANCED.html"
        style={{
          flex: 1,
          width: '100%',
          border: 'none',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s',
        }}
        title="Map Editor"
        onLoad={() => setIsLoading(false)}
      />

      {/* Barre de statut */}
      <div style={{
        padding: '10px 20px',
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'white',
        fontSize: 12,
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <div>
          📦 88+ icônes OpenMoji disponibles
        </div>
        <div>
          🎨 10 catégories : Terrain, Structures, Ressources, Trésors, Dangers...
        </div>
        <div>
          ⚡ Drag & Drop, Connexions, Layers, Mini-map, Zoom
        </div>
      </div>
    </div>
  );
}