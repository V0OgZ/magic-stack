/**
 * 📡 STATUS BAR
 * Barre de statut avec infos système
 */

import React, { useState, useEffect } from 'react';
import { useUnifiedMapStore } from '../../../shared/store/unifiedMapStore';

export function StatusBar(): React.ReactElement {
  const {
    mode,
    tool,
    currentWorld,
    currentMap,
    zoomLevel,
  } = useUnifiedMapStore();

  const [time, setTime] = useState(new Date());
  const [backends, setBackends] = useState({
    rust: 'checking',
    java: 'checking',
    vector: 'checking',
    ws: 'checking',
  });

  // Update time
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Check backends status
  useEffect(() => {
    const checkBackends = async () => {
      // Rust backend
      fetch('http://localhost:3001/health')
        .then(res => setBackends(b => ({ ...b, rust: res.ok ? 'online' : 'offline' })))
        .catch(() => setBackends(b => ({ ...b, rust: 'offline' })));
      
      // Java backend
      fetch('http://localhost:8080/api/health')
        .then(res => setBackends(b => ({ ...b, java: res.ok ? 'online' : 'offline' })))
        .catch(() => setBackends(b => ({ ...b, java: 'offline' })));
      
      // Vector DB
      fetch('http://localhost:5001/health')
        .then(res => setBackends(b => ({ ...b, vector: res.ok ? 'online' : 'offline' })))
        .catch(() => setBackends(b => ({ ...b, vector: 'offline' })));
      
      // WebSocket
      const ws = new WebSocket('ws://localhost:8001');
      ws.onopen = () => {
        setBackends(b => ({ ...b, ws: 'online' }));
        ws.close();
      };
      ws.onerror = () => setBackends(b => ({ ...b, ws: 'offline' }));
    };

    checkBackends();
    const interval = setInterval(checkBackends, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#48bb78';
      case 'offline': return '#f56565';
      case 'checking': return '#fbbf24';
      default: return '#a0aec0';
    }
  };

  return (
    <footer style={{
      height: 30,
      background: 'linear-gradient(180deg, rgba(20, 24, 36, 0.95) 0%, rgba(0, 0, 0, 0.9) 100%)',
      borderTop: '1px solid rgba(102, 126, 234, 0.2)',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: 11,
      color: 'rgba(255, 255, 255, 0.7)',
    }}>
      {/* Left: Mode & Tool */}
      <div style={{ display: 'flex', gap: 15 }}>
        <span>Mode: <strong style={{ color: '#667eea' }}>{mode}</strong></span>
        <span>Outil: <strong>{tool}</strong></span>
        <span>Zoom: <strong>{(zoomLevel * 100).toFixed(0)}%</strong></span>
      </div>
      
      {/* Center: Files */}
      <div style={{ display: 'flex', gap: 15 }}>
        {currentWorld && (
          <span>🌍 {currentWorld.name}</span>
        )}
        {currentMap && (
          <span>🗺️ {currentMap.name}</span>
        )}
      </div>
      
      {/* Right: Backends status */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {Object.entries(backends).map(([name, status]) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: getStatusColor(status),
                boxShadow: status === 'online' ? `0 0 4px ${getStatusColor(status)}` : 'none',
              }}
            />
            <span style={{ textTransform: 'uppercase', fontSize: 10 }}>
              {name}
            </span>
          </div>
        ))}
        <span style={{ marginLeft: 10, color: 'rgba(255, 255, 255, 0.5)' }}>
          {time.toLocaleTimeString()}
        </span>
      </div>
    </footer>
  );
}
