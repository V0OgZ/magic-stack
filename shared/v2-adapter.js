/**
 * 🔮 V2 Adapter - Module d'intégration universel
 * Utilisable dans tous les HTML et le futur React unifié
 */

class V2Adapter {
    constructor(config = {}) {
        this.endpoints = {
            rust: config.rustUrl || 'http://localhost:3001',
            java: config.javaUrl || 'http://localhost:8080',
            python: config.pythonUrl || 'http://localhost:7500'
        };
        
        this.cache = new Map();
        this.listeners = new Map();
        this.ws = null;
    }
    
    // ========== CORE V2 METHODS ==========
    
    /**
     * Tick V2 universel - appelable depuis n'importe quel mode
     */
    async tick(state) {
        try {
            const response = await fetch(`${this.endpoints.rust}/api/v2/tick`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    current_tw: state.temporal?.tw || 0,
                    current_te: state.temporal?.te || 0,
                    entities: this.extractEntities(state),
                    resources: state.resources,
                    regulators: state.regulators
                })
            });
            
            if (!response.ok) throw new Error(`V2 tick failed: ${response.status}`);
            
            const result = await response.json();
            this.emit('tick', result);
            return result;
        } catch (error) {
            console.error('V2 Tick Error:', error);
            return this.fallbackTick(state);
        }
    }
    
    /**
     * Calcul du drift temporel
     */
    calculateDrift(tw, te) {
        return tw - te;
    }
    
    /**
     * Calcul de l'énergie complexe E = A + iΦ
     */
    calculateComplexEnergy(amplitude, phase) {
        return {
            real: amplitude * Math.cos(phase),
            imaginary: amplitude * Math.sin(phase),
            magnitude: amplitude,
            phase: phase,
            toString() {
                return `${this.real.toFixed(1)} + ${this.imaginary.toFixed(1)}i`;
            }
        };
    }
    
    /**
     * Calcul de l'interférence quantique
     */
    calculateInterference(entity1, entity2) {
        if (!entity1.energy_complex || !entity2.energy_complex) return 0;
        const p1 = (entity1.energy_complex.phi ?? entity1.energy_complex.phase ?? 0);
        const p2 = (entity2.energy_complex.phi ?? entity2.energy_complex.phase ?? 0);
        const phaseDiff = p1 - p2;
        const distance = this.getDistance(entity1.position, entity2.position);
        if (distance > 10) return 0;
        return Math.cos(phaseDiff) * (1 - distance / 10);
    }
    
    /**
     * Détection de paradoxes
     */
    detectParadoxes(state) {
        const paradoxes = [];
        
        // Paradoxe de drift excessif
        if (Math.abs(state.temporal.tw - state.temporal.te) > 10) {
            paradoxes.push({
                type: 'excessive_drift',
                severity: 'major',
                entities: ['global']
            });
        }
        
        // Paradoxe de dette temporelle
        if (state.temporal.debt > 50) {
            paradoxes.push({
                type: 'temporal_debt',
                severity: 'critical',
                debt: state.temporal.debt
            });
        }
        
        // Paradoxe d'overload
        if (state.regulators?.overload?.stack >= 10) {
            paradoxes.push({
                type: 'overload_explosion',
                severity: 'critical'
            });
        }
        
        return paradoxes;
    }
    
    /**
     * Upsert d'une entité V2 (pour éditeur jouable)
     */
    async upsertEntity(entity) {
        const res = await fetch(`${this.endpoints.rust}/api/v2/entity`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entity)
        });
        return res.json();
    }

    // ========== REGULATORS ==========
    
    async activateVince(position, intensity = 1) {
        return fetch(`${this.endpoints.rust}/api/v2/regulators/vince`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ position, intensity })
        }).then(r => r.json());
    }
    
    async activateAnna(decayRate = 5, zone = null) {
        return fetch(`${this.endpoints.rust}/api/v2/regulators/anna`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ decay_rate: decayRate, zone })
        }).then(r => r.json());
    }
    
    async triggerOverload() {
        return fetch(`${this.endpoints.rust}/api/v2/regulators/overload`, {
            method: 'POST'
        }).then(r => r.json());
    }
    
    // ========== UI HELPERS ==========
    
    /**
     * Génère l'HTML pour l'affichage temporel
     */
    renderTemporalDisplay(tw, te, debt = 0) {
        const drift = Math.abs(tw - te);
        const driftClass = drift > 5 ? 'danger' : drift > 2 ? 'warning' : '';
        const debtClass = debt > 50 ? 'critical' : debt > 20 ? 'warning' : '';
        
        return `
            <div class="v2-temporal-display">
                <div class="time-values">
                    <span class="tw">TW: ${tw.toFixed(1)}</span>
                    <span class="te">TE: ${te.toFixed(1)}</span>
                    <span class="drift ${driftClass}">Δt: ${drift.toFixed(1)}</span>
                </div>
                ${debt > 0 ? `
                    <div class="debt ${debtClass}">
                        💸 Dette: ${debt.toFixed(1)}
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    /**
     * Génère l'HTML pour l'énergie complexe
     */
    renderEnergyComplex(energy) {
        if (!energy) return '';
        
        const complex = this.calculateComplexEnergy(
            energy.amplitude || energy.A || 0,
            energy.phase || energy.phi || 0
        );
        
        return `
            <div class="v2-energy-complex">
                <div class="energy-value">${complex.toString()}</div>
                <div class="energy-bar">
                    <div class="real-part" style="width: ${complex.real}%"></div>
                    <div class="imaginary-part" style="width: ${complex.imaginary}%"></div>
                </div>
            </div>
        `;
    }
    
    /**
     * Génère l'HTML pour les régulateurs
     */
    renderRegulators(regulators) {
        if (!regulators) return '';
        
        return `
            <div class="v2-regulators">
                ${regulators.vince ? `
                    <div class="regulator vince ${regulators.vince.active ? 'active' : ''}">
                        <span class="name">Vince</span>
                        <span class="status">${regulators.vince.active ? '⚡' : '💤'}</span>
                    </div>
                ` : ''}
                ${regulators.anna ? `
                    <div class="regulator anna ${regulators.anna.active ? 'active' : ''}">
                        <span class="name">Anna</span>
                        <span class="decay">-${regulators.anna.decayRate || 5}%</span>
                    </div>
                ` : ''}
                ${regulators.overload ? `
                    <div class="regulator overload">
                        <span class="name">Overload</span>
                        <span class="stack">${regulators.overload.stack || 0}/10</span>
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    // ========== WEBSOCKET ==========
    
    connectWebSocket(port = 8001) {
        if (this.ws) return;
        
        this.ws = new WebSocket(`ws://localhost:${port}`);
        
        this.ws.onopen = () => {
            console.log('✅ V2 WebSocket connected');
            this.emit('ws:connected');
        };
        
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.emit('ws:message', data);
            
            // Auto-update basé sur le type de message
            if (data.type === 'tick') {
                this.emit('tick', data.payload);
            } else if (data.type === 'paradox') {
                this.emit('paradox', data.payload);
            }
        };
        
        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.emit('ws:error', error);
        };
        
        this.ws.onclose = () => {
            console.log('WebSocket disconnected');
            this.ws = null;
            this.emit('ws:disconnected');
        };
    }
    
    // ========== EVENT SYSTEM ==========
    
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }
    
    off(event, callback) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            const index = callbacks.indexOf(callback);
            if (index > -1) callbacks.splice(index, 1);
        }
    }
    
    emit(event, data) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.forEach(cb => cb(data));
        }
    }
    
    // ========== UTILITIES ==========
    
    extractEntities(state) {
        const entities = [];
        
        // Extraction depuis différents formats possibles
        if (state.temporal?.entities) {
            // Format Map
            if (state.temporal.entities instanceof Map) {
                state.temporal.entities.forEach((data, id) => {
                    entities.push({ id, ...data });
                });
            }
            // Format Array
            else if (Array.isArray(state.temporal.entities)) {
                entities.push(...state.temporal.entities);
            }
        }
        
        // Format legacy (hero direct dans state)
        if (state.heroPosition && !entities.find(e => e.id === 'hero')) {
            entities.push({
                id: 'hero',
                position: state.heroPosition,
                te: state.temporal?.te || 0,
                energy_complex: state.energy || { A: 50, phi: 0 }
            });
        }
        
        return entities;
    }
    
    getDistance(pos1, pos2) {
        if (!pos1 || !pos2) return Infinity;
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    fallbackTick(state) {
        // Simulation locale si backend non disponible
        console.warn('Using fallback tick (backend unavailable)');
        
        const newState = JSON.parse(JSON.stringify(state));
        
        // Simulation basique
        if (newState.temporal) {
            newState.temporal.tw += 1;
            newState.temporal.te += 0.95;
            
            // Accumulation de dette
            const drift = Math.abs(newState.temporal.tw - newState.temporal.te);
            if (drift > 5) {
                newState.temporal.debt = (newState.temporal.debt || 0) + 0.1;
            }
        }
        
        return {
            new_tw: newState.temporal?.tw || 0,
            new_te: newState.temporal?.te || 0,
            debt: newState.temporal?.debt || 0,
            paradoxes: this.detectParadoxes(newState)
        };
    }
    
    // ========== CSS INJECTION ==========
    
    injectStyles() {
        if (document.getElementById('v2-adapter-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'v2-adapter-styles';
        style.textContent = `
            .v2-temporal-display {
                background: linear-gradient(135deg, #1a1d3a, #2a2d4a);
                border: 1px solid #4a4d6a;
                border-radius: 8px;
                padding: 10px;
                margin: 10px 0;
                font-family: monospace;
            }
            
            .v2-temporal-display .time-values {
                display: flex;
                justify-content: space-around;
                gap: 15px;
            }
            
            .v2-temporal-display .tw { color: #667eea; }
            .v2-temporal-display .te { color: #48bb78; }
            .v2-temporal-display .drift { color: #ed8936; }
            .v2-temporal-display .drift.warning { color: #f6ad55; }
            .v2-temporal-display .drift.danger { color: #fc8181; }
            
            .v2-temporal-display .debt {
                margin-top: 8px;
                text-align: center;
                padding: 4px;
                border-radius: 4px;
                background: rgba(255,100,100,0.1);
            }
            
            .v2-temporal-display .debt.warning { background: rgba(255,200,100,0.2); }
            .v2-temporal-display .debt.critical { 
                background: rgba(255,50,50,0.3);
                animation: pulse 1s infinite;
            }
            
            .v2-energy-complex {
                background: #1a1d3a;
                border: 1px solid #4a4d6a;
                border-radius: 6px;
                padding: 8px;
                margin: 8px 0;
            }
            
            .v2-energy-complex .energy-bar {
                display: flex;
                height: 20px;
                border-radius: 4px;
                overflow: hidden;
                margin-top: 5px;
            }
            
            .v2-energy-complex .real-part {
                background: linear-gradient(90deg, #667eea, #764ba2);
            }
            
            .v2-energy-complex .imaginary-part {
                background: linear-gradient(90deg, #f093fb, #f5576c);
            }
            
            .v2-regulators {
                display: flex;
                gap: 10px;
                margin: 10px 0;
            }
            
            .v2-regulators .regulator {
                background: #2a2d4a;
                border: 1px solid #4a4d6a;
                border-radius: 6px;
                padding: 8px 12px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .v2-regulators .regulator.active {
                border-color: #667eea;
                box-shadow: 0 0 10px rgba(102,126,234,0.5);
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Export pour HTML classique
if (typeof window !== 'undefined') {
    window.V2Adapter = V2Adapter;
}

// Export pour modules ES6 / CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = V2Adapter;
}

// Export pour TypeScript / ES6
export default V2Adapter;
