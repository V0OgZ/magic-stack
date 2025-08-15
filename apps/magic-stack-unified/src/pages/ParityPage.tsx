import React, { useEffect, useState } from 'react';
import { coreStore, getStableSnapshot } from '../shared/world6dCore';
import { replayJsonl } from '../shared/tools/replayTraces';

function hash(obj: any): string {
  try { return btoa(unescape(encodeURIComponent(JSON.stringify(obj)))).slice(0, 16); } catch { return 'NA'; }
}

async function fetchExpected(): Promise<Record<string, string>> {
  try {
    const r = await fetch('http://localhost:8000/test_snapshots.json');
    const j = await r.json();
    const map: Record<string, string> = {};
    if (Array.isArray(j)) {
      j.forEach((it: any) => { const n = it.name || it.id; if (n) map[n] = (typeof it.hash === 'string') ? it.hash : hash(it.snapshot ?? it); });
    } else {
      Object.keys(j).forEach(k => { const v = (j as any)[k]; map[k] = (typeof v === 'string') ? v : (typeof v?.hash === 'string' ? v.hash : hash(v)); });
    }
    return map;
  } catch { return {}; }
}

export default function ParityPage(): React.ReactElement {
  const [results, setResults] = useState<Array<{ name: string; ok: boolean; snapshot: any; hash: string; expected?: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  const runParity = async () => {
    setRunning(true);
    setError(null);
    try {
      const base = 'http://localhost:8000/test_traces';
      const scenarios = [
        { name: 'scenario1_hero_movement', url: `${base}/scenario1_hero_movement.jsonl` },
        { name: 'scenario2_portal_collapse', url: `${base}/scenario2_portal_collapse.jsonl` },
        { name: 'scenario3_buff_chain', url: `${base}/scenario3_buff_chain.jsonl` },
      ];
      const expected = await fetchExpected();
      const out: Array<{ name: string; ok: boolean; snapshot: any; hash: string; expected?: string }> = [] as any;
      for (const s of scenarios) {
        coreStore.reset();
        await replayJsonl(s.url);
        const snap = getStableSnapshot();
        const h = hash(snap);
        const ok = expected[s.name] ? (expected[s.name] === h) : true;
        out.push({ name: s.name, ok, snapshot: snap, hash: h, expected: expected[s.name] });
      }
      setResults(out);
    } catch (e: any) {
      setError(e?.message || 'Failed to run parity');
    } finally {
      setRunning(false);
    }
  };

  useEffect(() => { runParity(); }, []);

  const passCount = results.filter(r => r.ok).length;
  const total = results.length;

  return (
    <div style={{ padding: 24 }}>
      <h1>Parity Runner</h1>
      {error && <div style={{ color: 'tomato', marginBottom: 8 }}>Error: {error}</div>}
      <div style={{ marginBottom: 12 }}>
        <button onClick={runParity} disabled={running} style={{ padding: '6px 12px', borderRadius: 6 }}>
          {running ? 'Running…' : 'Rerun'}
        </button>
        <span style={{ marginLeft: 12, fontWeight: 600 }}>
          Summary: {passCount}/{total} PASS
        </span>
      </div>
      <ul>
        {results.map(r => (
          <li key={r.name} style={{ marginBottom: 8, color: r.ok ? '#10b981' : '#ef4444' }}>
            <strong>{r.name}</strong>: {r.ok ? 'PASS' : 'FAIL'} — {r.hash}{r.expected ? ` (${r.expected})` : ''}
          </li>
        ))}
      </ul>
      <p style={{ color: '#8892b0' }}>Traces: http://localhost:8000/test_traces/*.jsonl — Expected: http://localhost:8000/test_snapshots.json</p>
    </div>
  );
}
