/**
 * 🏠 HomePage - Page d'accueil déplacée dans son propre fichier
 */

import React from 'react';
import { Link } from 'react-router-dom';

export function HomePage(): React.ReactElement {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: 32,
      padding: 20,
    }}>
      <h1 style={{
        fontSize: 48,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: 16,
      }}>
        🎮 Magic Stack Unified
      </h1>
      
      <p style={{
        fontSize: 18,
        color: '#a0aec0',
        textAlign: 'center',
        maxWidth: 600,
      }}>
        Un seul code, tous les modes. Jeu, Éditeur, Chasse Temporelle.
        Architecture unifiée avec composants partagés.
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 20,
        width: '100%',
        maxWidth: 1200,
      }}>
        <ModeCard
          to="/game"
          icon="🎮"
          title="Heroes of Time"
          description="Le jeu principal avec combat, exploration et paradoxes temporels"
          color="#667eea"
        />
        
        <ModeCard
          to="/editor"
          icon="🗺️"
          title="World Editor"
          description="Créez vos propres cartes et scénarios"
          color="#48bb78"
        />
        
        <ModeCard
          to="/chasse"
          icon="🏹"
          title="Chasse Temporelle"
          description="Mode aventure 120x120 avec 4 difficultés"
          color="#f6ad55"
        />
        
        <ModeCard
          to="/multiplayer"
          icon="🎭"
          title="Multijoueur HOMM3"
          description="Combat TCG, exploration et conquête du Nexus"
          color="#e53e3e"
        />
        
        <ModeCard
          to="/ai-battle"
          icon="🤖"
          title="IA vs IA Autoplay"
          description="Batailles automatiques avec formules quantiques"
          color="#9f7aea"
        />
        
        <ModeCard
          to="/spectator"
          icon="👁️"
          title="God Mode Spectateur"
          description="Observez tout le multivers en temps réel"
          color="#38b2ac"
        />
        
        <ModeCard
          to="/backstory-editor"
          icon="📝"
          title="Éditeur de Backstory"
          description="Personnalisez les histoires et personnalités des héros IA"
          color="#f6e05e"
        />
        
        <ModeCard
          to="/unified"
          icon="🎮"
          title="✨ Unified Map System"
          description="L'ÉDITEUR EST LE JEU ! Structure, Resources, Timeline - tout unifié"
          color="#FF1493"
          featured={true}
        />
      </div>
      
      <div style={{
        display: 'flex',
        gap: 16,
        marginTop: 32,
      }}>
        <StatusIndicator label="Rust" port={3001} />
        <StatusIndicator label="Java" port={8082} />
        <StatusIndicator label="Vector" port={7500} />
      </div>
    </div>
  );
}

// Carte de mode
function ModeCard({ to, icon, title, description, color, featured }: {
  to: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  featured?: boolean;
}): React.ReactElement {
  return (
    <Link
      to={to}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 24,
        background: featured 
          ? `linear-gradient(135deg, ${color}20, ${color}10)`
          : 'rgba(255, 255, 255, 0.05)',
        border: featured ? `2px solid ${color}` : `1px solid ${color}40`,
        borderRadius: 12,
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.3s',
        cursor: 'pointer',
        boxShadow: featured ? `0 0 20px ${color}40` : 'none',
        animation: featured ? 'pulse 2s infinite' : 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 10px 30px ${color}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontSize: 20, color, marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 14, color: '#a0aec0' }}>{description}</p>
    </Link>
  );
}

// Indicateur de status backend
function StatusIndicator({ label, port }: { label: string; port: number }): React.ReactElement {
  const [isOnline, setIsOnline] = React.useState(false);
  
  React.useEffect(() => {
    fetch(`http://localhost:${port}/health`)
      .then(() => setIsOnline(true))
      .catch(() => setIsOnline(false));
  }, [port]);
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 12px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: 8,
      fontSize: 12,
    }}>
      <div style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: isOnline ? '#48bb78' : '#fc8181',
      }} />
      <span>{label}</span>
      <span style={{ color: '#718096' }}>:{port}</span>
    </div>
  );
}
