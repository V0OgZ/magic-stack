# Parity Check Guide for GPT

## Snapshots Ready

Claude's HTML core generated `test_snapshots.json` with final states for:
- **scenario1**: hero_1 at (250,200,1) t=2000 ψ=1.57
- **scenario2**: portal_1 + hero_1 with speed:1.5 modifier
- **scenario3**: hero_1 at z=2 σ=3 with speed:1.5 power:2 modifiers

## Quick Validation Script

```javascript
// In apps/magic-stack-unified/src/shared/tools/validateParity.ts

import { CoreStore } from '../world6dCore';
import * as fs from 'fs';

const traces = {
  scenario1: fs.readFileSync('../../test_traces/scenario1_hero_movement.jsonl', 'utf8')
    .split('\n').filter(Boolean).map(line => JSON.parse(line).event),
  scenario2: fs.readFileSync('../../test_traces/scenario2_portal_collapse.jsonl', 'utf8')
    .split('\n').filter(Boolean).map(line => JSON.parse(line).event),
  scenario3: fs.readFileSync('../../test_traces/scenario3_buff_chain.jsonl', 'utf8')
    .split('\n').filter(Boolean).map(line => JSON.parse(line).event)
};

const expected = JSON.parse(fs.readFileSync('../../test_snapshots.json', 'utf8'));

Object.entries(traces).forEach(([name, events]) => {
  const store = new CoreStore();
  events.forEach(event => store.dispatch(event));
  const actual = store.getState();
  
  const match = JSON.stringify(actual.entities) === JSON.stringify(expected[name].entities);
  console.log(`${name}: ${match ? '✅ PASS' : '❌ FAIL'}`);
});
```

## Event Types to Support

Your CoreStore needs to handle:
- `add` - Add entity (for initial setup)
- `move6d` - Update position delta
- `collapse` - Remove entity
- `artifactApplied` - Add modifier to entity

## Success Criteria

If all 3 scenarios match `test_snapshots.json` exactly, we have full parity! 🎯
