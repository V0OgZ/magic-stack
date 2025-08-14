import React, { useEffect, useState } from 'react';
import { coreStore, getStableSnapshot } from '../shared/world6dCore';
import { replayJsonl } from '../shared/tools/replayTraces';

function hash(obj: any): string {
  try { return btoa(unescape(encodeURIComponent(JSON.stringify(obj)))).slice(0, 16); } catch { return 'NA'; }
}

export default function ParityPage(): React.ReactElement {
  const [results, setResults] = useState<Array<{ name: string; ok: boolean; snapshot: any; hash: string }>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const base = 'http://localhost:8000/test_traces';
        const scenarios = [
          { name: 'scenario1_hero_movement', url: `${base}/scenario1_hero_movement.jsonl` },
          { name: 'scenario2_portal_collapse', url: `${base}/scenario2_portal_collapse.jsonl` },
          { name: 'scenario3_buff_chain', url: `${base}/scenario3_buff_chain.jsonl` },
        ];
        const out: Array<{ name: string; ok: boolean; snapshot: any; hash: string }> = [];
        for (const s of scenarios) {
          coreStore.reset();
          await replayJsonl(s.url);
          const snap = getStableSnapshot();
          out.push({ name: s.name, ok: true, snapshot: snap, hash: hash(snap) });
        }
        setResults(out);
      } catch (e: any) {
        setError(e?.message || 'Failed to run parity');
      }
    })();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Parity Runner</h1>
      {error && <div style={{ color: 'tomato' }}>Error: {error}</div>}
      <ul>
        {results.map(r => (
          <li key={r.name} style={{ marginBottom: 8 }}>
            <strong>{r.name}</strong>: {r.ok ? 'OK' : 'KO'} — {r.hash}
          </li>
        ))}
      </ul>
      <p style={{ color: '#8892b0' }}>Fetches traces from http://localhost:8000/test_traces/*.jsonl and replays in the shared 6D core.</p>
    </div>
  );
}
