import React from 'react';
import { vectorDB } from '../services/vectorDB';
import { useEditorStore } from '../state/useEditorStore';

type ClippyProps = { 
  messages?: string[];
  context?: string;
};

export function Clippy({ messages = [], context }: ClippyProps): React.ReactElement {
  const [tips, setTips] = React.useState<string[]>([]);
  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const [isConnected, setIsConnected] = React.useState(false);
  const selectedHex = useEditorStore(s => s.selectedHex);
  const currentTool = useEditorStore(s => s.currentTool);
  
  // Initialisation et connexion au Vector DB
  React.useEffect(() => {
    const init = async () => {
      const connected = await vectorDB.checkConnection();
      setIsConnected(connected);
      
      if (connected) {
        // Charger des tips contextuels depuis le Vector DB
        const contextualTips = await vectorDB.getClippyTips(context || 'éditeur monde Heroes of Time');
        if (contextualTips.length > 0) {
          setTips(contextualTips);
        }
      } else {
        // Fallback sur des tips locaux si pas de connexion
        setTips([
          '🔮 Bienvenue dans l\'éditeur de monde Heroes of Time!',
          '⚡ Le Vector DB n\'est pas connecté - lance ./h-profondeur vector',
          '🗺️ Utilise la palette de terrains pour peindre ta carte',
          '⏳ Les régulateurs maintiennent l\'équilibre temporel',
          '✨ Hexagon is the bestagon! Les hexagones sont parfaits pour les cartes',
        ]);
      }
    };
    
    init();
  }, [context]);
  
  // Mise à jour contextuelle basée sur l'état de l'éditeur
  React.useEffect(() => {
    if (!isConnected) return;
    
    const updateContextualTips = async () => {
      const contextInfo = {
        selectedHex,
        currentTool,
        terrain: selectedHex ? undefined : undefined, // TODO: get terrain at selected hex
      };
      
      const response = await vectorDB.searchContextual(contextInfo);
      if (response?.results && response.results.length > 0) {
        const newTips = response.results.map(r => {
          // Extraire un tip court du contenu
          const lines = r.content.split('\n').filter(l => l.trim());
          return lines[0]?.substring(0, 150) || 'Découvre les secrets du multivers...';
        });
        
        if (newTips.length > 0) {
          setTips(prev => [...newTips, ...prev].slice(0, 10)); // Garder max 10 tips
        }
      }
    };
    
    const debounceTimer = setTimeout(updateContextualTips, 1000);
    return () => clearTimeout(debounceTimer);
  }, [selectedHex, currentTool, isConnected]);
  
  // Rotation des tips
  React.useEffect(() => {
    if (tips.length === 0) return;
    
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % tips.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    }, 8000);
    
    // Afficher le premier tip
    setVisible(true);
    setTimeout(() => setVisible(false), 4000);
    
    return () => clearInterval(interval);
  }, [tips.length]);
  
  const handleClick = () => {
    setIndex((i + 1) % tips.length);
    setVisible(true);
    setTimeout(() => setVisible(false), 4000);
  };
  
  const currentTip = tips[index] || 'Chargement...';
  
  return (
    <>
      {/* Clippy Icon */}
      <div 
        style={{ 
          position: 'fixed', 
          bottom: 20, 
          right: 20, 
          fontSize: 48, 
          cursor: 'pointer', 
          zIndex: 2000,
          filter: isConnected ? 'none' : 'grayscale(50%)',
          animation: 'bounce 2s infinite',
        }} 
        onClick={handleClick}
        title={isConnected ? 'Clippy (Vector DB connecté)' : 'Clippy (mode hors ligne)'}
      >
        📎
      </div>
      
      {/* Tip Bubble */}
      <div 
        style={{ 
          position: 'fixed', 
          bottom: 80, 
          right: 20, 
          background: isConnected 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
            : 'linear-gradient(135deg, #868f96 0%, #596164 100%)',
          color: '#fff', 
          padding: '12px 16px', 
          borderRadius: 16, 
          border: '2px solid rgba(255,255,255,0.2)', 
          maxWidth: 350, 
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)', 
          display: visible ? 'block' : 'none', 
          zIndex: 2000,
          fontSize: '14px',
          lineHeight: '1.4',
          animation: visible ? 'slideIn 0.3s ease-out' : '',
        }}
      >
        {currentTip}
        {isConnected && (
          <div style={{ fontSize: '10px', marginTop: '8px', opacity: 0.8 }}>
            ✨ Alimenté par Vector DB 6D
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateY(10px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}