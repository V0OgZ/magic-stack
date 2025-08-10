# Frontend — Client Orchestrateur (JS)

Ce module propose un client minimal pour l'orchestrateur Rust.

## API
```js
export function createOrchestrator(base = `http://localhost:${process.env.RUST_PORT||3001}`) {
  let sessionId = null;
  const headers = { 'Content-Type': 'application/json' };
  const nonce = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return {
    async startSession(heroId = 'hero:alice', clientVersion = 'frontend-homm3') {
      const res = await fetch(`${base}/orchestrator/session`, {
        method: 'POST', headers, body: JSON.stringify({ heroId, clientVersion })
      });
      const j = await res.json();
      sessionId = j.sessionId; return j;
    },
    async sendIntent(intent, idemKey = nonce()) {
      if (!sessionId) throw new Error('no session');
      const res = await fetch(`${base}/orchestrator/intent`, {
        method: 'POST', headers: { ...headers, 'Idempotency-Key': idemKey },
        body: JSON.stringify({ sessionId, intent })
      });
      return res.json();
    },
    async getPolicy() {
      const r = await fetch(`${base}/orchestrator/decision-policy`);
      return r.json();
    },
    async pollSnapshot(sinceTick = 0) {
      const r = await fetch(`${base}/orchestrator/snapshot?sinceTick=${sinceTick}`);
      return r.json();
    },
    // TCG helpers
    async tcgDecide(state, prefs) {
      const r = await fetch(`${base}/tcg/ai/decide`, { method: 'POST', headers, body: JSON.stringify({ state, ai_prefs: prefs }) });
      return r.json();
    },
    async tcgCoach(state, question) {
      const r = await fetch(`${base}/tcg/ai/coach`, { method: 'POST', headers, body: JSON.stringify({ state, question }) });
      return r.json();
    }
  };
}
```

## Exemples d'intents
```js
// OBSERVE
await client.sendIntent({ type: 'OBSERVE', heroId: 'hero:alice', center: { x:10,y:20,z:0,t:0,c:1,psi:0.4 }, radius: 6 });

// REQUEST_RESOLVE
await client.sendIntent({ type: 'REQUEST_RESOLVE', mode: 'AUTO', center: { x:10,y:20,z:0,t:0,c:1,psi:0.4 }, radius: 5 });

// COLLECT
await client.sendIntent({ type: 'COLLECT', heroId: 'hero:alice', spotId: 'spot_10_20' });
```

## Polling snapshot
```js
let since = 0;
setInterval(async () => {
  const s = await client.pollSnapshot(since);
  // TODO: appliquer STATE_DELTA
  since = s.tick;
}, 400);
```
