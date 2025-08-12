/**
 * Adaptateur pour les API V2
 * Pont entre le frontend et les backends Rust/Java/Python
 */

export interface V2Config {
    rustBackend: string;
    javaBackend: string;
    pythonBackend: string;
    wsEndpoint: string;
}

const DEFAULT_CONFIG: V2Config = {
    // Use proxied paths in production; fall back to localhost in dev via VITE_* envs elsewhere
    rustBackend: '/engine',
    javaBackend: '/api',
    pythonBackend: '/vector',
    wsEndpoint: 'ws://localhost:8001'
};

class V2AdapterClass {
    private config: V2Config;
    private ws: WebSocket | null = null;
    private wsConnected = false;
    private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

    constructor(config: V2Config = DEFAULT_CONFIG) {
        this.config = config;
    }

    /**
     * Connexion WebSocket pour les événements temps réel
     */
    async connectWebSocket(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.ws = new WebSocket(this.config.wsEndpoint);
                
                this.ws.onopen = () => {
                    console.log('✅ WebSocket V2 connecté');
                    this.wsConnected = true;
                    resolve();
                };

                this.ws.onerror = (error) => {
                    console.error('❌ Erreur WebSocket:', error);
                    this.wsConnected = false;
                    reject(error);
                };

                this.ws.onclose = () => {
                    console.log('🔌 WebSocket déconnecté');
                    this.wsConnected = false;
                    this.scheduleReconnect();
                };

                this.ws.onmessage = (event) => {
                    this.handleWebSocketMessage(event.data);
                };
            } catch (error) {
                reject(error);
            }
        });
    }

    private scheduleReconnect() {
        if (this.reconnectTimeout) return;
        
        this.reconnectTimeout = setTimeout(() => {
            console.log('🔄 Tentative de reconnexion...');
            this.connectWebSocket().catch(console.error);
            this.reconnectTimeout = null;
        }, 5000);
    }

    private handleWebSocketMessage(data: string) {
        try {
            const message = JSON.parse(data);
            console.log('📨 Message V2:', message);
            // Dispatcher les événements selon le type
            window.dispatchEvent(new CustomEvent('v2-event', { detail: message }));
        } catch (error) {
            console.error('Erreur parsing message:', error);
        }
    }

    /**
     * API Rust - Tick temporel et calculs 6D
     */
    async tick(position: { x: number; y: number; z: number; t: number; c: number; psi: number }) {
        const response = await fetch(`${this.config.rustBackend}/api/v2/tick`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ position, timestamp: Date.now() })
        });
        return response.json();
    }

    async calculateDrift(positions: any[]) {
        const response = await fetch(`${this.config.rustBackend}/api/v2/drift`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ positions })
        });
        return response.json();
    }

    async calculateComplexEnergy(entity: any) {
        const response = await fetch(`${this.config.rustBackend}/api/v2/energy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entity })
        });
        return response.json();
    }

    async detectParadoxes(timeline: any[]) {
        const response = await fetch(`${this.config.rustBackend}/api/v2/paradoxes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ timeline })
        });
        return response.json();
    }

    /**
     * Crée ou met à jour une entité V2 côté serveur
     */
    async upsertEntity(entity: {
        id: string;
        position: { x: number; y: number; z?: number; t?: number; c?: number; psi?: number };
        te?: number;
        energy_complex?: { A?: number; amplitude?: number; phi?: number; phase?: number };
    }) {
        const response = await fetch(`${this.config.rustBackend}/api/v2/entity`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entity)
        });
        return response.json();
    }

    /**
     * API Java - Interstice et persistance
     */
    async uploadToInterstice(data: any) {
        const response = await fetch(`${this.config.javaBackend}/api/v2/interstice/upload`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async downloadFromInterstice(id: string) {
        const response = await fetch(`${this.config.javaBackend}/api/v2/interstice/${id}`);
        return response.json();
    }

    /**
     * API Python - Vector DB et LLM
     */
    async searchVectorDB(query: string, filters?: any) {
        const response = await fetch(`${this.config.pythonBackend}/api/v2/search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, filters })
        });
        return response.json();
    }

    async extractEntities(text: string) {
        const response = await fetch(`${this.config.pythonBackend}/api/v2/entities`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        return response.json();
    }

    /**
     * Régulateurs temporels
     */
    async activateVince(params: any) {
        const response = await fetch(`${this.config.rustBackend}/api/v2/regulators/vince`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
        return response.json();
    }

    async activateAnna(params: any) {
        const response = await fetch(`${this.config.rustBackend}/api/v2/regulators/anna`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
        return response.json();
    }

    async triggerOverload(params: any) {
        const response = await fetch(`${this.config.rustBackend}/api/v2/regulators/overload`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
        return response.json();
    }

    /**
     * Envoi d'événements via WebSocket
     */
    sendEvent(event: any) {
        if (this.ws && this.wsConnected) {
            this.ws.send(JSON.stringify(event));
        } else {
            console.warn('WebSocket non connecté, événement non envoyé:', event);
        }
    }

    /**
     * Déconnexion
     */
    disconnect() {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.wsConnected = false;
    }

    /**
     * Statut de connexion
     */
    isConnected(): boolean {
        return this.wsConnected;
    }
}

// Export singleton
export const V2Adapter = new V2AdapterClass();

// Export pour usage dans les composants React
export default V2Adapter;
