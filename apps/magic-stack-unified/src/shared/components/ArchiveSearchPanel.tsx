import React, { useState } from 'react';

type Result = {
  score: number;
  file: string;
  content: string;
  metadata: Record<string, any>;
};

export function ArchiveSearchPanel(): React.ReactElement {
  const [q, setQ] = useState('Excalibur');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isLocal = ['localhost','127.0.0.1'].includes(window.location.hostname);
  const base = isLocal ? 'http://localhost:3001' : '/engine';

  const runSearch = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${base}/api/archives/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, top_k: 10 })
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error || `HTTP ${res.status}`);
      setResults(Array.isArray(json.results) ? json.results : []);
    } catch (e: any) {
      setError(e.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid #667eea', borderRadius: 8, padding: 12 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search archives..."
               style={{ flex: 1, padding: 8, background: 'rgba(15,52,96,0.8)', border: '1px solid #667eea', borderRadius: 6, color: 'white' }} />
        <button onClick={runSearch} disabled={loading} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #667eea', background: loading ? 'rgba(102,126,234,0.3)' : '#667eea', color: 'white' }}>Search</button>
      </div>
      {error && <div style={{ color: '#ff6464', marginBottom: 8 }}>⚠️ {error}</div>}
      <div style={{ maxHeight: 260, overflow: 'auto', display: 'grid', gap: 8 }}>
        {results.map((r, i) => (
          <div key={i} style={{ background: 'rgba(15,52,96,0.5)', border: '1px solid rgba(102,126,234,0.3)', borderRadius: 6, padding: 8 }}>
            <div style={{ color: '#a0aec0', fontSize: 12, marginBottom: 4 }}>{r.file}</div>
            <div style={{ whiteSpace: 'pre-wrap', color: '#e8ecff', fontSize: 13 }}>{(r.content || '').slice(0, 400)}</div>
            <div style={{ color: '#48bb78', fontSize: 11, marginTop: 6 }}>score: {r.score.toFixed(3)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


