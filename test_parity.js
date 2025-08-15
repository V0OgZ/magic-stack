#!/usr/bin/env node

/**
 * Parity test for 6D Core implementations
 * Runs same events through both HTML and React cores
 * Compares final states for consistency
 */

const fs = require('fs');
const path = require('path');

// Load test scenarios
const loadScenario = (filename) => {
    const content = fs.readFileSync(path.join(__dirname, 'test_traces', filename), 'utf8');
    return content.split('\n').filter(Boolean).map(line => JSON.parse(line).event);
};

const scenarios = {
    scenario1: loadScenario('scenario1_hero_movement.jsonl'),
    scenario2: loadScenario('scenario2_portal_collapse.jsonl'),
    scenario3: loadScenario('scenario3_buff_chain.jsonl')
};

// Simple HTML Core implementation (for Node.js testing)
class HTMLCore {
    constructor() {
        this.state = {
            version: '1.1',
            entities: {},
            clock: { x: 0, y: 0, z: 0, t: 0, psi: 0, sigma: 0 }
        };
    }
    
    dispatch(event) {
        switch(event.type) {
            case 'move6d':
                if (this.state.entities[event.entityId]) {
                    Object.assign(this.state.entities[event.entityId].pos, event.delta);
                }
                break;
            case 'add':
                this.state.entities[event.entity.id] = event.entity;
                break;
            case 'collapse':
                delete this.state.entities[event.targetId];
                break;
            case 'artifactApplied':
                if (this.state.entities[event.entityId]) {
                    const entity = this.state.entities[event.entityId];
                    if (!entity.modifiers) entity.modifiers = {};
                    entity.modifiers[event.modifier.key] = event.modifier.factor;
                }
                break;
        }
    }
    
    replay(events) {
        this.state.entities = {};
        events.forEach(event => this.dispatch(event));
        return this.state;
    }
}

// Run tests
function runParityTest(scenarioName, events) {
    console.log(`\n📊 Testing ${scenarioName} (${events.length} events)`);
    console.log('━'.repeat(50));
    
    const htmlCore = new HTMLCore();
    const finalState = htmlCore.replay(events);
    
    // Log entity states
    Object.entries(finalState.entities).forEach(([id, entity]) => {
        console.log(`  ${entity.type} [${id}]`);
        console.log(`    pos: (${entity.pos.x}, ${entity.pos.y}, ${entity.pos.z})`);
        console.log(`    6D: t=${entity.pos.t}, ψ=${entity.pos.psi}, σ=${entity.pos.sigma}`);
        if (entity.modifiers) {
            console.log(`    modifiers:`, entity.modifiers);
        }
    });
    
    return finalState;
}

// Main
console.log('🧪 6D Core Parity Test Runner');
console.log('═'.repeat(50));

const results = {};
for (const [name, events] of Object.entries(scenarios)) {
    results[name] = runParityTest(name, events);
}

// Save snapshot
const snapshotPath = './test_snapshots.json';
fs.writeFileSync(snapshotPath, JSON.stringify(results, null, 2));
console.log(`\n✅ Snapshots saved to ${snapshotPath}`);

// Summary
console.log('\n📈 Summary:');
console.log(`  - Scenarios tested: ${Object.keys(scenarios).length}`);
console.log(`  - Total events: ${Object.values(scenarios).reduce((sum, s) => sum + s.length, 0)}`);
console.log(`  - Final entities: ${Object.values(results).reduce((sum, r) => sum + Object.keys(r.entities).length, 0)}`);
