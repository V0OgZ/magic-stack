/**
 * AVALON TCG SDK - Version 1.0
 * SDK JavaScript pour intégration facile avec le backend AVALON TCG
 * Par MERLASH-TECHNOMANCIEN ⚡
 */

class AvalonTCG {
    constructor(backendUrl = 'http://localhost:8080') {
        this.baseUrl = backendUrl;
        this.apiUrl = `${backendUrl}/api`;
        this.debugMode = false;
        this.currentCombatId = null;
        this.currentPlayerId = null;
    }

    /**
     * Active le mode debug avec logs détaillés
     */
    enableDebugMode() {
        this.debugMode = true;
        console.log('⚡ AVALON TCG Debug Mode ACTIVATED ⚡');
        return this;
    }

    /**
     * Configure le joueur actuel
     */
    setPlayer(playerId) {
        this.currentPlayerId = playerId;
        this.log(`Player set: ${playerId}`);
        return this;
    }

    /**
     * Configure le combat actuel
     */
    setCombat(combatId) {
        this.currentCombatId = combatId;
        this.log(`Combat set: ${combatId}`);
        return this;
    }

    /**
     * Joue une carte (version simple)
     */
    async playCard(cardId, targetId = null) {
        try {
            this.log(`Playing card: ${cardId} on target: ${targetId}`);
            
            const response = await this.post('/combat/play', {
                playerId: this.currentPlayerId,
                combatId: this.currentCombatId,
                cardId: cardId,
                targetId: targetId
            });

            this.log('Card played successfully:', response);
            return response;
        } catch (error) {
            this.logError('Error playing card:', error);
            throw error;
        }
    }

    /**
     * Joue une carte (version complète avec options)
     */
    async playCardAdvanced(options) {
        const { cardId, targetId, playerId, combatId, metadata } = options;
        
        try {
            const payload = {
                playerId: playerId || this.currentPlayerId,
                combatId: combatId || this.currentCombatId,
                cardId: cardId,
                targetId: targetId,
                metadata: metadata
            };

            this.log('Playing card (advanced):', payload);
            
            const response = await this.post('/combat/play', payload);
            
            // Parse special effects
            if (response.effects) {
                response.parsedEffects = this.parseEffects(response.effects);
            }

            this.log('Card played (advanced):', response);
            return response;
        } catch (error) {
            this.logError('Error playing card (advanced):', error);
            throw error;
        }
    }

    /**
     * Récupère le deck d'un joueur
     */
    async getDeck(playerId = null) {
        const id = playerId || this.currentPlayerId;
        
        try {
            this.log(`Getting deck for player: ${id}`);
            const response = await this.get(`/combat/deck/${id}`);
            this.log('Deck retrieved:', response);
            return response;
        } catch (error) {
            this.logError('Error getting deck:', error);
            throw error;
        }
    }

    /**
     * Récupère l'état du combat
     */
    async getCombatState(combatId = null) {
        const id = combatId || this.currentCombatId;
        
        try {
            this.log(`Getting combat state: ${id}`);
            const response = await this.get(`/combat/state/${id}`);
            this.log('Combat state:', response);
            return response;
        } catch (error) {
            this.logError('Error getting combat state:', error);
            throw error;
        }
    }

    /**
     * Exécute une formule magique directement
     */
    async castFormula(formula, parameters = {}) {
        try {
            this.log(`Casting formula: ${formula}`);
            
            const response = await this.post('/magic/cast', {
                formula: formula,
                parameters: parameters,
                source: 'tcg-sdk'
            });

            this.log('Formula cast result:', response);
            return response;
        } catch (error) {
            this.logError('Error casting formula:', error);
            throw error;
        }
    }

    /**
     * Récupère toutes les formules disponibles
     */
    async getFormulas() {
        try {
            this.log('Getting all formulas...');
            const response = await this.get('/formulas');
            this.log(`Retrieved ${response.length} formulas`);
            return response;
        } catch (error) {
            this.logError('Error getting formulas:', error);
            throw error;
        }
    }

    /**
     * Parse les effets spéciaux pour l'UI
     */
    parseEffects(effects) {
        const parsed = {
            damage: 0,
            healing: 0,
            statusEffects: [],
            temporalEffects: [],
            special: []
        };

        effects.forEach(effect => {
            if (typeof effect === 'string') {
                // Effets simples
                if (effect.includes('damage')) {
                    const match = effect.match(/(\d+)/);
                    parsed.damage += match ? parseInt(match[1]) : 0;
                } else if (effect.includes('heal')) {
                    const match = effect.match(/(\d+)/);
                    parsed.healing += match ? parseInt(match[1]) : 0;
                } else if (['stun', 'freeze', 'burn', 'poison'].includes(effect)) {
                    parsed.statusEffects.push(effect);
                } else if (effect.includes('temporal') || effect.includes('time')) {
                    parsed.temporalEffects.push(effect);
                } else {
                    parsed.special.push(effect);
                }
            } else if (typeof effect === 'object') {
                // Effets complexes
                if (effect.type === 'damage') {
                    parsed.damage += effect.value || 0;
                } else if (effect.type === 'temporal') {
                    parsed.temporalEffects.push(effect);
                } else {
                    parsed.special.push(effect);
                }
            }
        });

        return parsed;
    }

    /**
     * Helpers pour animations UI
     */
    getEffectAnimation(effect) {
        const animations = {
            'damage': { color: '#ff0000', duration: 500, type: 'shake' },
            'heal': { color: '#00ff00', duration: 700, type: 'glow' },
            'stun': { color: '#ffff00', duration: 1000, type: 'rotate' },
            'temporal_shift': { color: '#9400d3', duration: 1500, type: 'warp' },
            'quantum_collapse': { color: '#00ffff', duration: 2000, type: 'implode' }
        };

        return animations[effect] || { color: '#ffffff', duration: 500, type: 'flash' };
    }

    /**
     * Méthodes HTTP internes
     */
    async get(endpoint) {
        const response = await fetch(`${this.apiUrl}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    async post(endpoint, data) {
        const response = await fetch(`${this.apiUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    /**
     * Logging helpers
     */
    log(...args) {
        if (this.debugMode) {
            console.log('⚡ [AVALON TCG]', ...args);
        }
    }

    logError(...args) {
        console.error('❌ [AVALON TCG ERROR]', ...args);
    }
}

/**
 * Helper pour créer rapidement une instance
 */
function createAvalonTCG(options = {}) {
    const tcg = new AvalonTCG(options.backendUrl);
    
    if (options.debug) {
        tcg.enableDebugMode();
    }
    
    if (options.playerId) {
        tcg.setPlayer(options.playerId);
    }
    
    if (options.combatId) {
        tcg.setCombat(options.combatId);
    }
    
    return tcg;
}

// Export pour différents environnements
if (typeof module !== 'undefined' && module.exports) {
    // Node.js
    module.exports = { AvalonTCG, createAvalonTCG };
} else if (typeof define === 'function' && define.amd) {
    // AMD
    define([], function() {
        return { AvalonTCG, createAvalonTCG };
    });
} else {
    // Browser
    window.AvalonTCG = AvalonTCG;
    window.createAvalonTCG = createAvalonTCG;
}

console.log('⚡ AVALON TCG SDK Loaded - Version 1.0 ⚡');
console.log('Usage: const tcg = new AvalonTCG(); tcg.enableDebugMode();');