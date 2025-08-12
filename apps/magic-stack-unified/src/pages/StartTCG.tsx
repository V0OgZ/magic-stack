import React, { useState } from 'react';

type Mode = 'AI_VS_AI' | 'PVA' | 'PVP';

const DECKS = [
  { id: 'agro', name: 'Deck Aggro' },
  { id: 'control', name: 'Deck Contrôle' },
  { id: 'random', name: 'Deck Aléatoire' },
];

export function StartTCG(): React.ReactElement {
  const [mode, setMode] = useState<Mode>('AI_VS_AI');
  const [deck, setDeck] = useState('random');
  const [gameId, setGameId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');

  const start = async () => {
    try {
      const resp = await fetch('http://localhost:8082/api/combat/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player1: 'P1', player2: 'AI', seed: Date.now().toString() })
      });
      const json = await resp.json();
      setGameId(json.gameId);
      setStatus('Partie créée');
    } catch (e) {
      setStatus('Erreur démarrage');
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>⚔️ Start TCG</h1>
      <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
        <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
          <option value="AI_VS_AI">AI vs AI</option>
          <option value="PVA">Joueur vs AI</option>
          <option value="PVP">PvP (WIP)</option>
        </select>
        <select value={deck} onChange={(e) => setDeck(e.target.value)}>
          {DECKS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        <button onClick={start}>▶️ Démarrer</button>
      </div>
      {status && <div>{status}</div>}
      {gameId && (
        <div>
          <div>Game ID: {gameId}</div>
          <div style={{ marginTop: 10 }}>
            <a href="/combat" style={{ color: '#7dd3fc' }}>Ouvrir l’écran Combat</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default StartTCG;


